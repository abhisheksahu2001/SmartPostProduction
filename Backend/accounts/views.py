import os
from django.shortcuts import redirect
from rest_framework import viewsets
from rest_framework.response import Response
from Backend.settings import BASE_DIR
from accounts.models import *
from payments.models import *
from accounts.serializers import *
from payments.serializers import *
from rest_framework import status
from django.contrib.sessions.models import Session
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate,logout, login
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from .utils import *
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_exempt
# Create your views here.

def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    response["Access-Control-Allow-Origin"] = settings.HOST_IP
    response["Access-Control-Allow-Methods"] = 'GET, OPTIONS'
    response["Access-Control-Max-Age"] = '1000'
    response["Access-Control-Allow-Headers"] = 'Special-Request-Header'
    return response

@ensure_csrf_cookie
def session_view(request):
    session_data = request.session.session_key
    session_exp = dict(request.session)
    print(session_exp)
    return JsonResponse({'session' : session_data  , 'session_exp' : session_exp })
    # if not request.user.is_authenticated:
    #     response = JsonResponse({'isAuthenticated': False})
        # response["Access-Control-Allow-Origin"] = 'https://127.0.0.1:3000'
        # response["Access-Control-Allow-Methods"] = 'GET, OPTIONS'
        # response["Access-Control-Max-Age"] = '1000'
        # response["Access-Control-Allow-Headers"] = 'Special-Request-Header'
        # return response

    # return JsonResponse({'isAuthenticated': True})



class UserViewSet(viewsets.ViewSet):
    def create(self, request):
        '''
        Request Type: POST 
        For user registration
        '''
        data = request.data
        req_data = {
            'name': data['name'],
            'email': data['email'],
            'password': data['password'],
            'phone_num': str(123456789)
        }
        print(data)
        try:
            user = User.objects.filter(email = data['email'])
            if user.exists():
                return Response({
                            'status' : status.HTTP_403_FORBIDDEN ,
                            'message' : 'Email is already taken',
                            })
            
            else:
                serializer = UserRegistrationSerializer(data = data)
                if serializer.is_valid():
                    print('1')
                    serializer.save()
                        
                    return Response({
                                'status' : status.HTTP_201_CREATED ,
                                'message' : 'Account Created',
                                'data' : serializer.data,
                                })
                print('2')
                return Response({
                                'status' : status.HTTP_405_METHOD_NOT_ALLOWED ,
                                'message' : 'INVALID DATA',
                                'err' : serializer.errors
                                })

                            
        except Exception as e:
            return Response({
                            'status' : status.HTTP_404_NOT_FOUND,
                            'message':'Something Went Wrong',
                            'Error' : e
                            })
        

    
    def partial_update(self, request, pk=None, *args, **kwargs):
        '''
        Request type: PATCH
        Send uid with url and access token as headers
        email,name,profile pic as data 
        Disable email field in frontend but send the value in request 
        '''
        queryset = User.objects.get(id=pk)
        serializer = UserUpdate(instance=queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':status.HTTP_201_CREATED,
                             'res':'Your profile has been updated...!!'}) 
        else:
            return Response({'status':status.HTTP_400_BAD_REQUEST,
                             'res': 'Something went wrong'})   
        
    def destroy(self, request, pk=None):
        '''
        Request type: DELETE 
        send user id with url and token as headers
        '''
        queryset = User.objects.get(id=pk)
        try:
            if queryset:
                queryset.profile_pic.delete()
                return Response({'status':status.HTTP_200_OK})
            else:
                return Response({'status':status.HTTP_404_NOT_FOUND})
        except Exception as e:
            return Response({'status':status.HTTP_400_BAD_REQUEST})



    def list(self,request):


        user_details = MainData.objects.filter(admin=request.user.id)
        serializer = MainDataSerializer(user_details, many=True) 



        send_data = {
            'user_id':serializer.data[0]['admin']['id'],
            'user_email':serializer.data[0]['admin']['email'],
            'user_pic':serializer.data[0]['admin']['profile_pic'],
            'user_name':serializer.data[0]['admin']['name'],
            'user_contact':serializer.data[0]['admin']['phone_num'],
            'user_last_login':serializer.data[0]['admin']['last_login'],
            'user_created_at':serializer.data[0]['admin']['created_at'],
            'user_plan':{       
                'plan_type':serializer.data[0]['plan_id']['plan_type'],
                'plan_id': serializer.data[0]['plan_id']['plan_id'],
                'plan_details': serializer.data[0]['plan_id']['plan_details'],
                'plan_post_limit': serializer.data[0]['plan_id']['plan_post_limit'],
                'plan_post_schedule' : serializer.data[0]['plan_id']['plan_post_schedule'],
                'user_active':serializer.data[0]['user_active'],
                'user_plan_status':serializer.data[0]['plan_status'],
                'user_plan_activate_date':serializer.data[0]['plan_activate'],
                'user_plan_expiry_date':serializer.data[0]['plan_expiry'],
                                 },
        }

        return Response({ 
                        'status' : status.HTTP_200_OK,
                        'data': send_data,
                    })
    


class UserLoginViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    def create(self, request):
        # try:
            data = request.data                                   
            serializer = UserLoginSerializer(data = data)
            serializer.is_valid()
            email = serializer.data['email']
            password = serializer.data['password']
            user_obj = User.objects.filter(email = email)
            if not user_obj.exists():
                return Response({ 
                        'status' : status.HTTP_401_UNAUTHORIZED,
                        'message': 'Account not found'
                    })
            user_data = authenticate(email = email , password=password)
            # getUserId = User.objects.get(email=email)
            if user_data:
                login(request, user_data)
                # request.session['data'] = serializer.data
                # request.session['data'] = getUserId.id
                request.session.set_expiry(604800)
                session_id = request.session.session_key
                requestId = request.user.id
                user_main_data = {'admin':requestId,'session':session_id}
                querysetMD = MainData.objects.filter(admin=requestId)
                if querysetMD.exists():
                    getMDid = MainData.objects.get(admin=requestId)
                    mdSerializer = MainSerializer(instance=getMDid, data=user_main_data, partial=True)
                    mdSerializer.is_valid()
                    mdSerializer.save()
                else:
                    mdSerializer = MainSerializer(data=user_main_data, partial=True)
                    mdSerializer.is_valid()
                    mdSerializer.save()
            # cache.set()        
                return Response({ 
                    'status' : status.HTTP_200_OK,
                    'session':session_id,
                    'user':request.user.id,
                    'message':'Welcome Back'
                })
            
            return Response({
                'status':status.HTTP_403_FORBIDDEN,
                'message':'Invalid Credentials'
            })
        # except Exception as e:
        #     return Response({
        #         'status':status.HTTP_404_NOT_FOUND,
        #         'message':'Something went wrong',
        #     })

class ActiveUserViewSet(viewsets.ViewSet):
    def create(self, request):
        '''
        data = MD id, PlanID
        request = POST
        '''
        data = request.data 
        MId = data['MId']
        PlanID = data['PlanId']
        timezone_now = timezone.localtime(timezone.now())
        try:
            if request.user.is_authenticated:
                verifyPlan = Plans.objects.filter(id=PlanID) 
                if verifyPlan.exists():
                    verifyMId = MainData.objects.filter(id=MId)
                    if verifyMId.exists():
                        getPlan = Plans.objects.get(id=PlanID)
                        getMId = MainData.objects.get(id=MId)
                        q_data = {'user_active':getMId.id,
                                'plan_id':getPlan.id,
                                'plan_status':True,
                                'plan_activate': timezone_now,
                                'plan_expiry': timezone_now
                                }
                        verifyUser = ActiveUser.objects.filter(user_active=getMId)
                        if verifyUser:
                            getMDid = ActiveUser.objects.get(user_active=getMId)
                            acSerializer = ActiveUserSerializer(instance=getMDid, data=q_data)
                            acSerializer.is_valid()
                            acSerializer.save()
                        else:
                            serializer = ActiveUserSerializer(data=q_data)
                            serializer.is_valid()
                            serializer.save()

                        email = getMId.admin.email
                        name = getMId.admin.name
                        print(email,name)
                        # send_activation_success(email, name)
                        return Response({ 
                                'status' : status.HTTP_200_OK,
                                'msg':'Your Plan Activated',
                            })
                    return Response({ 
                                'status' : status.HTTP_403_FORBIDDEN,
                                'msg':'Invalid Data',
                            })
                return Response({ 
                                'status' : status.HTTP_400_BAD_REQUEST,
                                'msg':'Plan does not exist',
                            })
            return Response({ 
                                'status' : status.HTTP_400_BAD_REQUEST,
                                'msg':'Not Logged in',
                            })
        except Exception as e:
            return Response({ 
                        'status' : status.HTTP_400_BAD_REQUEST,
                        'msg':'Something went wrong',
                        'err':e
                    })

class LogoutView(viewsets.ViewSet):
    def create(self,request):
        data = request.data
        user = request.user
        print(data, user)
        # print(Session.objects.all().delete())
        print(request.session.delete())
        # del request.session
        # # request.session['data'] = None
        # # request.session.flush()
        # # request.session['data'] = None
        logout(request)
        request.session.clear_expired()
        return Response({ 
                        'status' : status.HTTP_200_OK,
                    })
    
@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')

        get_email = User.objects.filter(email=email)
        if get_email.exists():     
            get_details =  User.objects.get(email=email)
            name = get_details.name
            id = get_details.id
            send_reset_password(email,name)
            return JsonResponse({
                'status' : status.HTTP_200_OK,
                'msg':f'Email has been sent to your mail id: {email}',
                'id': id
                })
        else:
            return JsonResponse({
                'status' : status.HTTP_404_NOT_FOUND,
                'msg':'Email does not exist',
                                 })
    return JsonResponse({
                'status' : status.HTTP_500_INTERNAL_SERVER_ERROR,
                'msg':'Something Went Wrong',
                                 })
        
@csrf_exempt
def change_password(request, id):
    if request.method == 'POST':
        new_password = request.POST.get('password')
        print(new_password)
        check_user = User.objects.filter(id=id)
        if check_user:
            get_user = User.objects.get(id=id)
            print(get_user)
            get_user.set_password(new_password)
            get_user.save()
            send_reset_password_success(get_user.email, get_user.name)
            return JsonResponse({
                "status":status.HTTP_200_OK,
                "msg":"Password has been changed..!!!"})
        return JsonResponse({
                "status":status.HTTP_406_NOT_ACCEPTABLE ,
                "msg":"Please try again...!!!"})
    return JsonResponse({
            "status":status.HTTP_403_FORBIDDEN,
            "msg":"Something went wrong..!!"})
