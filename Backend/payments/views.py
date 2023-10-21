from rest_framework import viewsets
from rest_framework.response import Response
from accounts.models import *
from accounts.serializers import *
from rest_framework import status
from django.contrib.sessions.models import Session
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate,logout, login
from django.conf import settings
from django.http import JsonResponse, HttpResponseRedirect
from .serializers import *
from django.shortcuts import render,redirect
from .models import *
import json
from django.views.decorators.csrf import csrf_exempt
import razorpay
from datetime import datetime, timedelta  
# Create your views here.


RAZORPAY_API_KEY = settings.RAZORPAY_API_KEY
RAZORPAY_API_SECRET_KEY = settings.RAZORPAY_API_SECRET_KEY

# Get the Razorpay API key and API secret key
client = razorpay.Client(auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET_KEY))


class CreateSubscriptionViewSet(viewsets.ViewSet):    
    # Method : POST 
    @csrf_exempt
    def create(self, request):
        data = request.data
        cust_name = request.user.name
        cust_email = request.user.email
        # print(cust_name, cust_email)
        contact_number = request.user.phone_num
        plan_id = data['plan_id']
        plan_name = data['plan_name']
        plan_amount = data['plan_amount']

        check_customer = Subscription.objects.filter(user=request.user)
        if check_customer.exists():
            print('1')
            get_customer = Subscription.objects.get(user=request.user)
            old_subscription = client.subscription.fetch(get_customer.subscription_id)
            # print(old_subscription)
            customer = client.customer.fetch(get_customer.customer_id)
            # print(customer)
            subscription = client.subscription.create(
                    {
                        'plan_id': plan_id,
                        'customer_id': old_subscription['customer_id'], 
                        'customer_notify': 1,
                        'quantity': 1,
                        'total_count': old_subscription["total_count"],
                        # 'addons': [{
                        #         'item': {
                        #             'name': plan_name,
                        #             'currency': 'INR',
                        #             # 'amount': int(plan_amount),
                        #             }
                        #         }],
                        })
            context_data = {
                'user': User.objects.get(id=request.user),
                'subscription_id':subscription['id'],
                'customer_id': old_subscription['customer_id'],
                'plan_id':plan_id,
                'status': subscription['status'],
                'start_at': str(subscription['start_at']),
                'end_at': str(subscription['end_at']),
                }
            
            serializer = SubscriptionSerializer(instance=get_customer, data=context_data)
            serializer.is_valid()
            serializer.save()
            return JsonResponse({'status': subscription['status'] , 'Redirect':'Checkout page'})
        else:
            print('2')
            cust_data = {
                'name': cust_name,
                'contact': contact_number,
                'email': cust_email
            }
            customer = client.customer.create(data=cust_data)
            subscription = client.subscription.create({
                            'plan_id': plan_id,
                            'customer_id': customer['id'],
                            'customer_notify': 1,
                            'quantity': 1,
                            'total_count': 6,
                            # 'addons': [{
                            #         'item': {
                            #             'name': plan_name,
                            #             'currency': 'INR',
                            #             # 'amount': int(plan_amount),
                            #             }
                            #         }],
                            })
           

            context_data = {
                'user': User.objects.get(id=request.user),
                'subscription_id':subscription['id'],
                'customer_id': customer['id'],
                'plan_id':plan_id,
                'status': subscription['status'],
                'start_at': str(subscription['start_at']),
                'end_at': str(subscription['end_at']),
                }
            serializer = SubscriptionSerializer(data=context_data)
            serializer.is_valid()
            serializer.save()
            return JsonResponse({'status': subscription['status'], 'Redirect':'Checkout page'})
    

    @csrf_exempt
    def list(self, request):
        # Method : GET 
        all_plans = client.plan.all()
        return JsonResponse({"res": all_plans['items']})



class SubscriptionCheckoutViewSet(viewsets.ViewSet):
    @csrf_exempt
    def list(self, request):
        # Method : GET 
        user = Subscription.objects.get(user=request.user)
        user_plan = client.plan.fetch(user.plan_id)
        subscription = client.subscription.fetch(user.subscription_id)



        context = {
            'user_plan':user_plan,
            'key': RAZORPAY_API_KEY,
            'email' : request.user.email,
            'name' : request.user.name,
            'amount': user_plan['item']['amount'],
            'subscription_id': subscription['id'],
            }

        return JsonResponse({"res": context})


class PaymentDataViewSet(viewsets.ViewSet):
    def list(self, request):
        # Method : GET 
        user = request.user
        # raz_id = PaymentDetails.objects.filter(admin=request.user.id)
        latest_record = PaymentDetails.objects.filter(admin=user).order_by('-created_at').first()
        # raz_pay_id = PaymentDetails.objects.filter(admin=request.user.id)
        # print(raz_id)
        # print(latest_record.raz_payment_id)
        # serializer = PaymentDetailsSerializers(raz_id, many=True)
        # print(serializer.data)

        payment_details = client.payment.fetch(latest_record.raz_payment_id)
        return Response({
                         "payment_details" : payment_details
                         })
    @csrf_exempt
    def create(self, request):
        '''
        Request type: POST
        Send payment id with url 
        url :  https://localhost:8000/payments/subscription-payment/[id]/
        '''
        data = request.data
        print(data)
        payment = client.invoice.fetch(data['data'])
        url = payment['short_url']
        return Response({"url": url })
        # return HttpResponseRedirect('https://rzp.io/i/AOEw80Uk')
    

class PaymentHistoryViewSet(viewsets.ViewSet):
    def list(self, request):
        # Method : GET 
        # url : https://localhost:8000/payments/subscription-payment-history
        raz_id = PaymentDetails.objects.filter(admin=request.user.id)
        if raz_id.exists():
            serializer = PaymentDetailsSerializers(raz_id, many=True)
            data = serializer.data
        else:
            data =  None
        return Response(data)







@csrf_exempt
def raz_callback(request):
    # Method : POST 
    # Type : CALLBACK API
    if request.method == "POST":
        subscription_id = request.POST.get('razorpay_subscription_id')
        payment_id = request.POST.get('razorpay_payment_id')
        if "razorpay_signature" in request.POST:
            payment_verification = client.utility.verify_subscription_payment_signature(request.POST)
            if payment_verification:
                        
                subscription = client.subscription.fetch(subscription_id)
                payment = client.payment.fetch(payment_id)
                success_context = {'status' : 'Active', 'payment_details': payment}
                # print(success_context)
                get_customer = Subscription.objects.get(subscription_id=subscription['id'])
                get_plan = Plans.objects.get(plan_id=subscription['plan_id'])
                user_profile = User.objects.get(email= request.user.email)
                check_user = UserPlanDetails.objects.filter(user=request.user)

                start_time = datetime.utcfromtimestamp(int(subscription['start_at'])).strftime('%Y-%m-%d %H:%M:%S')
                end_time = datetime.utcfromtimestamp(int(subscription['end_at'])).strftime('%Y-%m-%d %H:%M:%S')


                if check_user.exists():
                    print('1')
                    check_user_queryset = UserPlanDetails.objects.get(user=request.user)
                    check_main_user_queryset = MainData.objects.get(admin=request.user)
                    context_subs_data = {
                        'status': subscription['status'],
                        'start_at': str(subscription['current_start']),
                        'end_at': str(subscription['current_end']),
                    }
                    context_data = {
                        'user' : user_profile,
                        'plan_type' : get_plan.plan_type,
                        'plan_status': True,
                        'start_at' : str(start_time),
                        'end_at' : str(end_time)
                    } 
                    main_data = {
                        # 'user_active': check_user_queryset,
                        'plan_id': get_plan.id,
                        'plan_status': True,
                        'plan_activate':str(start_time),
                        'plan_expiry': str(end_time),
                    }
                    serializer = SubscriptionSerializer(instance=get_customer, data=context_subs_data, partial=True)
                    trial_serializer = UserPlanDetailsSerializers(instance=check_user_queryset,data=context_data, partial=True)
                    user_serializer = MainDataSerializer(instance=check_main_user_queryset, data=main_data, partial=True)

                    serializer.is_valid()
                    trial_serializer.is_valid()
                    user_serializer.is_valid()

                    serializer.save()
                    trial_serializer.save()
                    user_serializer.save()
                    id_data = {
                        'admin' : user_profile,
                        'raz_customer_id' : payment['customer_id'],
                        'raz_order_id' : payment['order_id'],
                        'raz_payment_id' : payment['id'],
                        'raz_invoice_id' : payment['invoice_id'],
                        'raz_plan_type' : get_plan.plan_type,
                        'raz_plan_start' : str(start_time),

                    }
                    id_serializer = PaymentDetailsSerializers(data=id_data, partial=True)
                    id_serializer.is_valid()
                    id_serializer.save()

                else: 
                    print('2')
                    context_subs_data = {
                        'status': subscription['status'],
                        'start_at': str(subscription['current_start']),
                        'end_at': str(subscription['current_end']),
                    }
                    serializer = SubscriptionSerializer(instance=get_customer, data=context_subs_data, partial=True)
                    serializer.is_valid()
                    serializer.save()

                    context_data = {
                        'user' : user_profile,
                        'plan_type' : get_plan.plan_type,
                        'plan_status': True,
                        'start_at' : str(start_time),
                        'end_at' : str(end_time)
                    } 
                    trial_serializer = UserPlanDetailsSerializers(data=context_data, partial=True)
                    trial_serializer.is_valid()
                    trial_serializer.save()


                    queryset = MainData.objects.get(admin=request.user.id)
                    user_plan_queryset = UserPlanDetails.objects.get(user=request.user)
                    main_data = {
                        'user_active': user_plan_queryset.id,
                        'plan_id': get_plan.id,
                        'plan_status': True,
                        'plan_activate':str(start_time),
                        'plan_expiry': str(end_time),
                    }
                    user_serializer = MainDataSerializer(instance=queryset, data=main_data, partial=True)
                    user_serializer.is_valid()
                    user_serializer.save()

                    id_data = {
                        'admin' : user_profile,
                        'raz_customer_id' : payment['customer_id'],
                        'raz_order_id' : payment['order_id'],
                        'raz_payment_id' : payment['id'],
                        'raz_invoice_id' : payment['invoice_id'],
                        'raz_plan_type' : get_plan.plan_type,
                        'raz_plan_start' : str(start_time),


                    }
                    id_serializer = PaymentDetailsSerializers(data=id_data, partial=True)
                    id_serializer.is_valid()
                    id_serializer.save()
                    
                    
                # response = redirect(f'{settings.HOST_IP}{settings.CALLBACK_REDIRECT_URL}')
                # response.set_cookie('paymentid', payment_id)
                # return response

                # return JsonResponse({"res":"Subscription is now active", "payment_details": payment , "subscription_details":subscription})
                return redirect(f'{settings.HOST_IP}{settings.CALLBACK_REDIRECT_URL}')
                # return redirect('https://localhost:8000/payments/subscription-payment-history')
                
                # Logic to perform is payment is successful
                # Activate logic

            else:
                fail_context = {'status' : 'Not Activated'}
                return JsonResponse({"res":"Failed", "data":fail_context})
                # return redirect('https://localhost:8000/payments/Confirm')

@csrf_exempt
def free_trial_logic(request):
    if request.user:
        check_user = UserPlanDetails.objects.filter(user=request.user)
        if check_user.exists():
            return JsonResponse({'status': status.HTTP_208_ALREADY_REPORTED, 
                                 'Redirect': 'payment page',
                                 'message': 'You have already used your free trial.'})

        else:
            user_profile = User.objects.get(email= request.user.email)
            start_time = datetime.now()
            end_time =  start_time + timedelta(minutes=20)
            plan_get_id = Plans.objects.get(plan_id = 'Free') 
            context_data = {
                'user' : user_profile,
                'plan_type' : 'Free',
                'plan_status': True,
                'start_at' : str(start_time),
                'end_at' : str(end_time)
            } 
            
            queryset = MainData.objects.get(admin=request.user.id)
            trial_serializer = UserPlanDetailsSerializers(data=context_data, partial=True)
            trial_serializer.is_valid()
            trial_serializer.save()

            user_plan_queryset = UserPlanDetails.objects.get(user=request.user)
            main_data = {
                'user_active': user_plan_queryset.id,
                'plan_id': plan_get_id.id,
                'plan_status': True,
                'plan_activate':str(start_time),
                'plan_expiry': str(end_time),
            }
            user_serializer = MainDataSerializer(instance=queryset, data=main_data, partial=True)
            user_serializer.is_valid()
            user_serializer.save()


            return JsonResponse({'status': status.HTTP_200_OK, 
                                 'Redirect': 'Posting Page'})
    else:
        return JsonResponse({'status' : status.HTTP_401_UNAUTHORIZED , 
                             'Redirect':'Login page',
                             'message': 'You are not Logged In.'}) 
