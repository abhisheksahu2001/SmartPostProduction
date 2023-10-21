import time
import calendar
from datetime import datetime
from django.shortcuts import redirect
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from datetime import timedelta
import facebook
from facebookapi.helpers import *
from accounts.models import *
from accounts.serializers import *
from payments.serializers import *
from payments.models import *
from urllib.parse import urlencode
from rest_framework.decorators import action
from django.db.models import Q
import uuid
from django.views.decorators.csrf import csrf_exempt

app_id = settings.FACEBOOK_APP_ID
app_secret = settings.FACEBOOK_SECRET_KEY
FB_APP_TOKEN = f'{app_id}|{app_secret}'

def get_facebook_login_url(redirect_uri):
    random_uuid = uuid.uuid4()
    params = {
        'client_id': app_id,
        'redirect_uri': redirect_uri,
        'scope': ['email','public_profile'],  # Adjust scopes as needed
        'response_type': 'code',
        'state': random_uuid
    }
    login_url = 'https://www.facebook.com/v18.0/dialog/oauth?' + urlencode(params)
    return login_url


def exchange_code_for_access_token(code, redirect_uri):
    # Define the token URL
    token_url = 'https://graph.facebook.com/v18.0/oauth/access_token'

    # Create the data to send in the POST request
    data = {
        'code': code,
        'client_id': app_id,
        'client_secret': app_secret,
        'redirect_uri': redirect_uri,
    }

    try:
        # Send a POST request to exchange the code for an access token
        response = requests.post(token_url, data=data)
        response_data = response.json()
        # Check if the response contains an access token
        if 'access_token' in response_data:
            return response_data['access_token']

    except requests.exceptions.RequestException as e:
        print(f"Request to Facebook failed: {e}")

    return None

class FBLoginViewSet(viewsets.ViewSet):
    # @csrf_exempt
    def  create(self, request):
        data = request.data['code']
        user = request.data['user']
        redirect_uri = 'https://localhost:8000/channels/'
        user_info = exchange_code_for_access_token(code=data, redirect_uri=redirect_uri)

        ch_url = f'https://graph.facebook.com/debug_token?input_token={user_info}&access_token={FB_APP_TOKEN}'
        response = requests.get(f'https://graph.facebook.com/v13.0/me/accounts?fields=name,access_token,picture&access_token={user_info}')
        
        ch_get = requests.get(ch_url)
        ch_data = ch_get.json()


        ch_getdata = ch_data.get('data')
        ch_userid = ch_getdata.get('user_id')


        get_data_url = f'https://graph.facebook.com/{ch_userid}?fields=id,name,email&access_token={user_info}'
        get_url_data = requests.get(get_data_url)
        get_user_data = get_url_data.json()
                      
        pages_data = response.json()

        # print(pages_data)

        ac_token_expiry = ch_data['data']['data_access_expires_at']
        debug_ext_time = datetime.utcfromtimestamp(ac_token_expiry).strftime('%Y-%m-%d %H:%M:%S') + " " + calendar.day_name[datetime.utcfromtimestamp(ac_token_expiry).weekday()]
        save_data = {
            "admin_id": user, 
            "user_access_token": user_info,
            "user_extended_token": user_info,
            "user_access_token_expiry": str(ac_token_expiry),                 
            "user_extended_token_expiry": str(debug_ext_time),              
            "user_id": int(get_user_data['id']),              
        }

        # print(save_data)
        api_url = 'https://localhost:8000/facebook-access/facebook-token/'
        post_api_url_data = requests.post(api_url, data=save_data, verify=False)
        print(post_api_url_data)
        return Response({'res':data, 'token':user_info})
    
    def list(self, request):
        # Method : GET 
        # url : https://localhost:8000/
        redirect_uri = 'https://localhost:8000/channels/'  # Replace with your callback URL
        facebook_login_url = get_facebook_login_url(redirect_uri)
        # print("Redirect the user to this URL:", facebook_login_url)
        return Response(facebook_login_url)



@csrf_exempt
def callback(request):
    if 'code' in request.GET:

        authorization_code = request.GET['code']
        
        redirect_uri = 'https://localhost:8000/channels/'  # Replace with your callback URL
                # user_info = handle_facebook_callback(authorization_code, redirect_uri)
        user_info = exchange_code_for_access_token(code=authorization_code, redirect_uri=redirect_uri)
        ch_url = f'https://graph.facebook.com/debug_token?input_token={user_info}&access_token={FB_APP_TOKEN}'
        response = requests.get(f'https://graph.facebook.com/v13.0/me/accounts?fields=name,access_token,picture&access_token={user_info}')
        
        ch_get = requests.get(ch_url)
        ch_data = ch_get.json()


        ch_getdata = ch_data.get('data')
        ch_userid = ch_getdata.get('user_id')


        get_data_url = f'https://graph.facebook.com/{ch_userid}?fields=id,name,email&access_token={user_info}'
        get_url_data = requests.get(get_data_url)
        get_user_data = get_url_data.json()
                      
        pages_data = response.json()

        print(pages_data)

        ac_token_expiry = ch_data['data']['data_access_expires_at']
        debug_ext_time = datetime.utcfromtimestamp(ac_token_expiry).strftime('%Y-%m-%d %H:%M:%S') + " " + calendar.day_name[datetime.utcfromtimestamp(ac_token_expiry).weekday()]
        save_data = {
            "admin_id": request.user.id, 
            "user_access_token": user_info,
            "user_extended_token": user_info,
            "user_access_token_expiry": str(ac_token_expiry),                 
            "user_extended_token_expiry": str(debug_ext_time),              
            "user_id": int(get_user_data['id']),              
        }


        api_url = 'https://localhost:8000/facebook-access/facebook-token/'
        post_api_url_data = requests.post(api_url, data=save_data, verify=False)
        print(post_api_url_data)
        getUser = FaceBookUser.objects.filter(admin_id=request.user.id)

        if getUser.exists():
            getUserData = FaceBookUser.objects.get(admin_id=request.user.id)
            up_serializer = TokensFaceBookSerializer(instance=getUserData, data=save_data, partial=True)
            up_serializer.is_valid()
            up_serializer.save()
        else:
            serializer = TokensFaceBookSerializer(data=save_data, partial=True)
            serializer.is_valid()
            serializer.save()

        fb_user_data = FaceBookUser.objects.get(admin_id = request.user.id)  
        for data in pages_data['data']:
            name = data['name']
            accessToken = data['access_token']
            token = extend_accessToken(accessToken)
            id = data['id']
            url = data['picture']['data']['url']
            check_id = FaceBookPage.objects.filter(page_id=id, fb_user_id=fb_user_data )
            # check_id = FaceBookPage.objects.filter(fb_user_id=fb_user_data)
            if check_id.exists():
                user_instance = FaceBookUser.objects.get(admin_id=request.user.id)
                page_instance = FaceBookPage.objects.filter(fb_user_id=user_instance.id, page_id=id)
                page_instance.update(fb_user_id = fb_user_data, page_id=id, page_extended_access_token = token['access_token'], page_profile_pic_url=url,page_name=name)
                print(user_instance, page_instance)
            else:
                FaceBookPage.objects.bulk_create([
                    FaceBookPage(fb_user_id = fb_user_data, page_id=id, page_extended_access_token = token['access_token'], page_profile_pic_url=url,page_name=name)
                ])
        
        url = redirect('Frontend:channels')
        return HttpResponse(request.data)  
 
            


def extend_accessToken(ac_token):
    # user_access_token = 'USER_ACCESS_TOKEN' # initially generated client-side
    # Create fb graph object
    graph = facebook.GraphAPI(ac_token)
    # Now extend it with the extend_access_token method
    extended_token = graph.extend_access_token(app_id=app_id, app_secret=app_secret)
    return extended_token


class CheckViewset(viewsets.ViewSet):
    def create(self, request):
        return JsonResponse({"res": request.user.id})

class FacebookViewset(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        print('token api', data)
        # user = request.user
        ac_token = data['user_access_token']
        # ac_token_expiry = data['user_access_token_expiry']
        # fb_user_id = data['user_id']

        # ext_token = extend_accessToken(ac_token=ac_token)
        # ac_ext_token = ext_token['access_token']
        # graph = facebook.GraphAPI(ac_token)
    

        # debug_token = graph.debug_access_token(token=ac_ext_token,app_id=app_id, app_secret=app_secret )
        # ts = int(debug_token['data']['data_access_expires_at'])
        
        # debug_ext_time = datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S') + " " + calendar.day_name[datetime.utcfromtimestamp(ts).weekday()]
        # save_data = {
        #         "admin_id": request.user.id, 
        #         "user_access_token": ac_token,
        #         "user_extended_token": ext_token["access_token"],
        #         "user_access_token_expiry": str(ac_token_expiry),                 
        #         "user_extended_token_expiry": str(debug_ext_time),              
        #         "user_id": int(fb_user_id),              
        #     }
        save_data = {
                "admin_id": data['admin_id'], 
                "user_access_token": data['user_access_token'],
                "user_extended_token": data['user_extended_token'],
                "user_access_token_expiry": data['user_access_token_expiry'],                 
                "user_extended_token_expiry": data['user_extended_token_expiry'],              
                "user_id": data['user_id'],              
            }
        print(save_data)
        response = requests.get(f'https://graph.facebook.com/v13.0/me/accounts?fields=name,access_token,picture&access_token={ac_token}')
        pages_data = response.json()

        print(pages_data)
        getUser = FaceBookUser.objects.filter(admin_id=data['admin_id'])
        if getUser.exists():
            getUserData = FaceBookUser.objects.get(admin_id=data['admin_id'])
            up_serializer = TokensFaceBookSerializer(instance=getUserData, data=save_data, partial=True)
            if up_serializer.is_valid():
                up_serializer.save()
                return Response({'status':status.HTTP_206_PARTIAL_CONTENT, 'pages':pages_data})
            else:
                return Response({
                            'status' : status.HTTP_404_NOT_FOUND,
                            'message':'Something Went Wrong',
                            }),
        else:
            serializer = TokensFaceBookSerializer(data=save_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status':status.HTTP_201_CREATED , 'pages':pages_data})
            else:
                print(serializer.errors)
                return Response({
                            'status' : status.HTTP_404_NOT_FOUND,
                            'message':'Something Went Wrong',
                            }),

    def list(self, request):
        # Method : GET 
        # url : https://localhost:8000/
        user = request.user
        fb_user_data = FaceBookUser.objects.get(admin_id = user) 
        print(fb_user_data)
        ac_token = fb_user_data.user_access_token
        response = requests.get(f'https://graph.facebook.com/v13.0/me/accounts?fields=name,access_token,picture&access_token={ac_token}')
        if not response:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            pages_data = response.json()
            print(pages_data)
            return Response({'status':status.HTTP_200_OK, 'pages': pages_data})
        

class FacebookDataViewset(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        # print(data)
        user = request.user
        fb_user_data = FaceBookUser.objects.get(admin_id = user)  
        for data in data['pagesData']:
            name = data['name']
            accessToken = data['access_token']
            token = extend_accessToken(accessToken)
            id = data['id']
            url = data['picture']['data']['url']
            check_id = FaceBookPage.objects.filter(page_id=id)
            print(check_id)
            # check_id = FaceBookPage.objects.filter(fb_user_id=fb_user_data)
            if check_id.exists():
                user_instance = FaceBookUser.objects.get(admin_id=request.user.id)
                page_instance = FaceBookPage.objects.filter(fb_user_id=user_instance.id, page_id=id)
                page_instance.update(fb_user_id = fb_user_data, page_id=id, page_extended_access_token = token['access_token'], page_profile_pic_url=url,page_name=name)
                print(user_instance, page_instance)
            else:
                FaceBookPage.objects.bulk_create([
                    FaceBookPage(fb_user_id = fb_user_data, page_id=id, page_extended_access_token = token['access_token'], page_profile_pic_url=url,page_name=name)
                ])

        return Response({'status':status.HTTP_206_PARTIAL_CONTENT})


    def list(self, request):

        '''
        Request type: GET
        '''
        user = request.user.id
        fbuser_queryset = FaceBookUser.objects.filter(admin_id = user)
        if fbuser_queryset.exists():
            queryset = FaceBookUser.objects.get(admin_id = user)
            page_queryset = FaceBookPage.objects.filter(fb_user_id =queryset)
            serializer = FaceBookPageSerializer(page_queryset, many=True)
            data = serializer.data
        else:
            data = {'err' : 'None'}
        return Response({
            'status' : status.HTTP_200_OK,
            'data': data,
        })

class FacebookPostViewset(viewsets.ViewSet):
    def create(self,request):
        data = request.data 
        user = request.user
        api_type = data['type']

        maindata_instance = MainData.objects.get(admin=user)

        if maindata_instance.plan_status == False:
            return Response({'status':status.HTTP_204_NO_CONTENT, 
                            'res':'Choose Your Plan To Continue Posting...!!'
                            })
        else:
            datetime_object = datetime.strptime(maindata_instance.plan_expiry, '%Y-%m-%d %H:%M:%S.%f')
            plan_instance = Plans.objects.get(plan_id=maindata_instance.plan_id)
            userplan_instance = UserPlanDetails.objects.get(user=user)
            if datetime_object <= datetime.now():
                maindata_instance.plan_status = False
                userplan_instance.plan_status = False
                userplan_instance.user_post_count = 0
                userplan_instance.user_post_schedule_count = 0
                maindata_instance.save()
                userplan_instance.save()
                print('expired')
                return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'Oops Your Plan Has Expired Kindly Choose A Plan...!!'
                                })
            else:
                if userplan_instance.user_post_count == plan_instance.plan_post_limit and userplan_instance.user_post_schedule_count == plan_instance.plan_post_schedule:
                    # userplan_instance.user_post_count = 0
                    # userplan_instance.user_post_schedule_count = 0
                    # userplan_instance.save()
                    print('Used completely')
                    return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'You Have Completely Used Your Plan..!!!'
                                })
                else:
                    if api_type == '0':
                        page_id = data['page_id']
                        caption = data['caption']
                        if userplan_instance.user_post_count == plan_instance.plan_post_limit:
                            # userplan_instance.user_post_count = 0
                            # userplan_instance.save()
                            print('limit reached')
                            return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'You Have Reached Your Plan Limit Of Posting..!!!'
                                })
                        else:
                            get_page_data = FaceBookPage.objects.filter(page_id=page_id)
                            if get_page_data.exists():
                                page_data = FaceBookPage.objects.get(page_id=page_id)
                                access_token_page = page_data.page_extended_access_token
                                contextImg = {'page_id' : page_id,
                                                'caption' : caption,
                                                'accessToken' : access_token_page,
                                                }
                            print(contextImg)
                            # fb_post_0(contextImg)
                            userplan_instance.user_post_count += 1
                            userplan_instance.save()
                            return Response({'status':status.HTTP_200_OK, 
                                'res':'Your Post Has Been POSTED...!!!!'
                                })


                    elif api_type == '1':
                        page_id = data['page_id']
                        image = data['image']
                        if userplan_instance.user_post_count == plan_instance.plan_post_limit:
                            # userplan_instance.user_post_count = 0
                            # userplan_instance.save()
                            print('limit reached')
                            return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'You Have Reached Your Plan Limit Of Posting..!!!'
                                })
                        else:
                            get_page_data = FaceBookPage.objects.filter(page_id=page_id)
                            if get_page_data.exists():
                                page_data = FaceBookPage.objects.get(page_id=page_id)
                                access_token_page = page_data.page_extended_access_token
                                contextImg = {'page_id' : page_id,
                                                'accessToken' : access_token_page,
                                                'image': image,
                                                }
                            print(contextImg)
                            # fb_post_1(contextImg)
                            userplan_instance.user_post_count += 1
                            userplan_instance.save()
                            return Response({'status':status.HTTP_200_OK, 
                                'res':'Your Post Has Been POSTED...!!!!'
                                })

                    elif api_type == '2':
                        page_id = data['page_id']
                        image = data['image']
                        caption = data['caption']
                        if userplan_instance.user_post_count == plan_instance.plan_post_limit:
                            # userplan_instance.user_post_count = 0
                            # userplan_instance.save()
                            print('limit reached')
                            return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'You Have Reached Your Plan Limit Of Posting..!!!'
                                })
                        else:
                            get_page_data = FaceBookPage.objects.filter(page_id=page_id)
                            if get_page_data.exists():
                                page_data = FaceBookPage.objects.get(page_id=page_id)
                                access_token_page = page_data.page_extended_access_token
                                contextImg = {'page_id' : page_id,
                                                'caption' : caption,
                                                'accessToken' : access_token_page,
                                                'image': image,
                                                }
                            print(contextImg)
                            # fb_post_2(contextImg)
                            userplan_instance.user_post_count += 1
                            userplan_instance.save()
                            return Response({'status':status.HTTP_200_OK, 
                                'res':'Your Post Has Been POSTED...!!!!'
                                })



                    elif api_type == '3':
                        page_id = data['page_id']
                        time_stamp = data['time_stamp']
                        caption = data['caption']
                        if userplan_instance.user_post_schedule_count == plan_instance.plan_post_schedule:
                            # userplan_instance.user_post_schedule_count = 0
                            # userplan_instance.save()
                            print('limit reached')
                            return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'You Have Reached Your Plan Limit Of Posting..!!!'
                                })
                        else:
                            get_page_data = FaceBookPage.objects.filter(page_id=page_id)
                            if get_page_data.exists():
                                page_data = FaceBookPage.objects.get(page_id=page_id)
                                access_token_page = page_data.page_extended_access_token
                                contextImg = {'page_id' : page_id,
                                                'caption' : caption,
                                                'accessToken' : access_token_page,
                                                'time_stamp': time_stamp
                                                }
                            print(contextImg)
                            sch_time = datetime.fromtimestamp(int(time_stamp), tz = None).strftime('%Y-%m-%d %I:%M %p')
                            # sch_time = datetime.utcfromtimestamp(int(time_stamp)).strftime('%Y-%m-%d %H:%M:%S')

                            # fb_post_3(contextImg)
                            userplan_instance.user_post_schedule_count += 1
                            userplan_instance.save()
                            return Response({'status':status.HTTP_200_OK, 
                                'res':f'Your Post Has Been Scheduled On {sch_time} ...!!'
                                })

                    elif api_type == '4':
                        page_id = data['page_id']
                        image = data['image']
                        time_stamp = data['time_stamp']
                        if userplan_instance.user_post_schedule_count == plan_instance.plan_post_schedule:
                            # userplan_instance.user_post_schedule_count = 0
                            # userplan_instance.save()
                            print('limit reached')
                            return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'You Have Reached Your Plan Limit Of Posting..!!!'
                                })
                        else:
                            get_page_data = FaceBookPage.objects.filter(page_id=page_id)
                            if get_page_data.exists():
                                page_data = FaceBookPage.objects.get(page_id=page_id)
                                access_token_page = page_data.page_extended_access_token
                                contextImg = {'page_id' : page_id,
                                                'accessToken' : access_token_page,
                                                'image': image,
                                                'time_stamp': time_stamp
                                                }
                            print(contextImg)
                            # fb_post_4(contextImg)
                            sch_time = datetime.fromtimestamp(int(time_stamp), tz = None).strftime('%Y-%m-%d %I:%M %p')
                            # sch_time = datetime.utcfromtimestamp(int(time_stamp)).strftime('%Y-%m-%d %H:%M:%S')

                            userplan_instance.user_post_schedule_count += 1
                            userplan_instance.save()
                            return Response({'status':status.HTTP_200_OK, 
                                'res':f'Your Post Has Been Scheduled On {sch_time} ...!!'
                                })

                    elif api_type == '5':
                        caption = data['caption']
                        page_id = data['page_id']    
                        image = data['image']
                        time_stamp = data['time_stamp']
                        if userplan_instance.user_post_schedule_count == plan_instance.plan_post_schedule:
                            # userplan_instance.user_post_schedule_count = 0
                            # userplan_instance.save()
                            print('limit reached')
                            return Response({'status':status.HTTP_204_NO_CONTENT, 
                                'res':'You Have Reached Your Plan Limit Of Posting..!!!'
                                })
                        else:
                            get_page_data = FaceBookPage.objects.filter(page_id=page_id)
                            if get_page_data.exists():
                                page_data = FaceBookPage.objects.get(page_id=page_id)
                                access_token_page = page_data.page_extended_access_token
                                contextImg = {'page_id' : page_id,
                                                'caption' : caption,
                                                'accessToken' : access_token_page,
                                                'image': image,
                                                'time_stamp': time_stamp
                                                }
                            print(contextImg)
                            sch_time = datetime.fromtimestamp(int(time_stamp), tz = None).strftime('%Y-%m-%d %I:%M %p')
                            # sch_time = datetime.utcfromtimestamp(int(time_stamp)).strftime('%Y-%m-%d %H:%M:%S')
                            # fb_post_5(contextImg)
                            userplan_instance.user_post_schedule_count += 1
                            userplan_instance.save()
                            return Response({'status':status.HTTP_200_OK, 
                                'res':f'Your Post Has Been Scheduled On {sch_time} ...!!'
                                })



        
        return Response({'status':status.HTTP_200_OK, 
                            'res':'POSTED'
                            })
    
"""
type 5 == teeno cheezien(img, txt, time)
type 4 == img, time
type 3 == txt,time
type 2 == txt, img
type 1 == img
type 0 == txt

"""