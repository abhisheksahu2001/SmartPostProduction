import os
from django.shortcuts import redirect, render
from django.urls import reverse
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
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_exempt
from rest_framework.decorators import action
from django.http import HttpResponseRedirect
import requests
import json
# Create your views here.
from urllib.parse import urlencode
from Frontend.urls import *

# Replace with your Facebook App credentials
APP_ID = '655985629660872'
APP_SECRET = '07323d6bbf1b6739059c3d893781f0af'

# Step 1: Generate a Facebook login URL
def get_facebook_login_url(redirect_uri):
    params = {
        'client_id': APP_ID,
        'redirect_uri': redirect_uri,
        'scope': 'email',  # Adjust scopes as needed
        'response_type': 'code',
    }
    login_url = 'https://www.facebook.com/v18.0/dialog/oauth?' + urlencode(params)
    return login_url


def exchange_code_for_access_token(code, redirect_uri):
    APP_ID = '655985629660872'
    APP_SECRET = '07323d6bbf1b6739059c3d893781f0af'
    # Define the token URL
    token_url = 'https://graph.facebook.com/v18.0/oauth/access_token'

    # Create the data to send in the POST request
    data = {
        'code': code,
        'client_id': APP_ID,
        'client_secret': APP_SECRET,
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

# Example usage after receiving the callback with the 'code' parameter
# user_info = handle_facebook_callback('code_from_callback', redirect_uri)
# print("User Info:", user_info)


# token = response_data['access_token']
#             get_url = f'https://graph.facebook.com/${APP_ID}?fields=id,name,email&access_token=${token}'
#             get_response = requests.get(get_url)
#             print(get_response)
#             get_response_data = get_response.json()
#             print(get_response_data)

# class FBLoginViewSet(viewsets.ViewSet):
#     def list(self, request):
#         # Method : GET 
#         # url : https://localhost:8000/
#         redirect_uri = 'https://localhost:8000/instagram-access/callback'  # Replace with your callback URL
#         # redirect_uri = 'https://localhost:8000/fbcallback'  # Replace with your callback URL
#         facebook_login_url = get_facebook_login_url(redirect_uri)
#         print("Redirect the user to this URL:", facebook_login_url)
#         return Response(facebook_login_url)


def testing(request):
    # Step 2: Redirect the user to the Facebook login URL
    
    redirect_uri = 'https://localhost:8000/instagram-access/callback'  # Replace with your callback URL
    # redirect_uri = 'https://localhost:8000/fbcallback'  # Replace with your callback URL
    facebook_login_url = get_facebook_login_url(redirect_uri)
    print("Redirect the user to this URL:", facebook_login_url)
    
    
    # return redirect('Frontend:fbcallback')
    return JsonResponse(facebook_login_url, safe=False)




def callback(request):
    
    if 'code' in request.GET:
        authorization_code = request.GET['code']
        print(authorization_code)
        redirect_uri = 'https://localhost:8000/instagram-access/callback'  # Replace with your callback URL
            # user_info = handle_facebook_callback(authorization_code, redirect_uri)
        user_info = exchange_code_for_access_token(code=authorization_code, redirect_uri=redirect_uri)
        
        print('info', user_info)
    

    # return token_instance
    return redirect('getToken', token=user_info)


def getToken(request, token):
    token_instance = shareToken(token)
    return redirect('Frontend:fbcallback')
    
def shareToken(ac_token):
    print(ac_token)

    APP_ID = '655985629660872'
    APP_SECRET = '07323d6bbf1b6739059c3d893781f0af'
    FB_APP_TOKEN = f'{APP_ID}|{APP_SECRET}'

    ch_url = f'https://graph.facebook.com/debug_token?input_token={ac_token}&access_token={FB_APP_TOKEN}'
    ch_get = requests.get(ch_url)
    print('ch data', ch_get.json())
    ch_data = ch_get.json()
    ch_getdata = ch_data.get('data')
    ch_userid = ch_getdata.get('user_id')
    get_data_url = f'https://graph.facebook.com/{ch_userid}?fields=id,name,email&access_token={ac_token}'
    get_url_data = requests.get(get_data_url)
            # print("User Info:", user_info)

    response = requests.get(f'https://graph.facebook.com/v13.0/me/accounts?access_token={ac_token}')

    pages_data = response.json()
    print('page data', pages_data)




    data = {
            "userInfo": ac_token,
            'ch_data':ch_data,
            'user_data':get_url_data.json(),
            'pages_data': pages_data['data']}
    return JsonResponse(data)
