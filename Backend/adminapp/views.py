import os, json
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from accounts.models import *
from rest_framework import status
from django.contrib.sessions.models import Session
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_exempt
from django.apps import apps
from accounts.models import *
from adminapp.serializers import *
from django.shortcuts import get_object_or_404
from django.core.serializers import serialize
from django.contrib.contenttypes.models import ContentType

installed_apps = apps.get_app_configs()







@csrf_exempt
def show_models(request):
    '''
    URL: https://localhost:8000/admin/show_models
    Request Type: GET 
    For getting appname,modelname, tables
    '''
    if request.method == 'GET':
        app_name = []
        model_name = []
        table_name = []
        for app in installed_apps:
            app_models = app.get_models()
            for model in app_models:
                
                print(f"App: {app.name}, Model: {model.__name__}, Table: {model._meta.db_table}")
                app_name.append(app.name)
                model_name.append(model.__name__)
                table_name.append(model._meta.db_table)
        
        return JsonResponse({
            "AppName" : app_name,
            "Models" : model_name,
            "Tables" : table_name,
            "res": "DONE",
            "status" : status.HTTP_200_OK
        })
    else:
        return JsonResponse({
            "status" : status.HTTP_403_FORBIDDEN,
            "res": "FAIL"
        })
    
def table_detail(request, app_name, model_name):
    '''
    URL: https://localhost:8000/admin/table_detail/(app name)/(model name)/
    Request Type: GET 
    Data: App name & model name in url
    '''
    if request.method == 'GET':
        data =  ContentType.objects.all()
        # app_label = 'accounts'
        # model_label = 'User'
        model = ContentType.objects.get(app_label=app_name, model= model_name).model_class()
        model_data = model.objects.all()
        a = serialize('json', model_data)
        print(a)

        return JsonResponse({
                "status" : status.HTTP_200_OK,
                "res": "SUCCESS",
                "table": a
            })
    else:
        return JsonResponse({
            "status" : status.HTTP_403_FORBIDDEN,
            "res": "FAIL"
        })

# def table_get(request, model_name):
#     '''
#     URL: https://localhost:8000/admin/table_get/(model name)/
#     Request Type: GET 
#     Data: model name in url
#     '''
#     if request.method == 'GET':
#         model = model_name  # Get the model based on the model_name
#         queryset = model.objects.all()
            
#         serializer = DynamicModelSerializer(model=model, many=True)
#         serialized_data = serializer.to_representation(queryset)
#         return JsonResponse({
#             "status" : status.HTTP_200_OK,
#             "res": "SUCCESS",
#             "table": serialized_data
#             })
#     else:
#         return JsonResponse({
#             "status" : status.HTTP_403_FORBIDDEN,
#             "res": "FAIL"
#         })

def get_tables(request,app_name, model_name):
    '''
    (PREFERED)
    URL: https://localhost:8000/admin/get_tables/(app name)/(model name)/
    Request Type: GET 
    Data: App name & model name in url
    '''

    if request.method == 'GET':
    # model_types = ContentType.objects.all()
        model_types = ContentType.objects.get(app_label=app_name, model=model_name).model_class()
        queryset = model_types.objects.all()
        serializer = DynamicModelSerializer(model=model_types, many=True)
        data = serializer.to_representation(queryset)
                

        return JsonResponse({
            "status" : status.HTTP_200_OK,
            "res": "SUCCESS",
            "table": data
            })
    else:
        return JsonResponse({
            "status" : status.HTTP_403_FORBIDDEN,
            "res": "FAIL"
        })


class UserViewSet(viewsets.ViewSet):
    def create(self, request):
        '''
        Request Type: POST 
        For adding user data
        '''
        data = request.data
        try:
            user = User.objects.filter(email = data['email'])
            if user.exists():
                return Response({
                            'status' : status.HTTP_403_FORBIDDEN ,
                            'message' : 'Email is already taken',
                            })
            
            else:
                serializer = UserSerializer(data = data)
                if serializer.is_valid():
                    serializer.save()
                        
                    return Response({
                                'status' : status.HTTP_201_CREATED ,
                                'message' : 'Account Created',
                                'data' : serializer.data,
                                })
                return Response({
                                'status' : status.HTTP_405_METHOD_NOT_ALLOWED ,
                                'message' : 'INVALID DATA',
                                })            
                            
        except Exception as e:
            return Response({
                            'status' : status.HTTP_404_NOT_FOUND,
                            'message':'Something Went Wrong',
                            'Error' : e
                            }),
        

    
    def partial_update(self, request, pk=None, *args, **kwargs):
        '''
        Request type: PATCH
        Send uid with url and access token as headers
        full data as data  
        '''
        queryset = User.objects.get(id=pk)
        serializer = UserSerializer(instance=queryset, data=request.data, partial=True)
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
                # queryset.profile_pic.delete()
                queryset.delete()
                return Response({'status':status.HTTP_200_OK})
            else:
                return Response({'status':status.HTTP_404_NOT_FOUND})
        except Exception as e:
            return Response({'status':status.HTTP_400_BAD_REQUEST})



    def list(self,request):
        '''
        Request type: GET 
        '''
        user_details = User.objects.all()
        user_serializer = UserSerializer(user_details, many=True)


        return Response({ 
                        'status' : status.HTTP_200_OK,
                        'data': user_serializer.data,
                    })


class PlanViewSet(viewsets.ViewSet):
    def create(self, request):
        '''
        Request Type: POST 
        For adding plan data
        '''
        data = request.data
        print(data)
        try:
            
            serializer = PlansSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                            
                return Response({
                                'status' : status.HTTP_201_CREATED ,
                                'message' : 'Plan Created',
                                })
            return Response({
                                'status' : status.HTTP_405_METHOD_NOT_ALLOWED ,
                                'message' : 'INVALID DATA',
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
        full data as data 
        '''
        queryset = Plans.objects.get(id=pk)
        serializer = PlansSerializer(instance=queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':status.HTTP_201_CREATED,
                             'res':'Your Plan has been updated...!!'}) 
        else:
            return Response({'status':status.HTTP_400_BAD_REQUEST,
                             'res': 'Something went wrong'})   
        
    def destroy(self, request, pk=None):
        '''
        Request type: DELETE 
        send id with url and token as headers
        '''
        queryset = Plans.objects.get(id=pk)
        try:
            if queryset:
                # queryset.profile_pic.delete()
                queryset.delete()
                return Response({'status':status.HTTP_200_OK})
            else:
                return Response({'status':status.HTTP_404_NOT_FOUND})
        except Exception as e:
            return Response({'status':status.HTTP_400_BAD_REQUEST})



    def list(self,request):
        '''
        Request type: GET 
        '''

        plan = Plans.objects.all()
        plan_serializer = PlansSerializer(plan, many=True)


        return Response({ 
                        'status' : status.HTTP_200_OK,
                        'data': plan_serializer.data,
                    })





class MainDataViewSet(viewsets.ViewSet):
    def create(self, request):
        '''
        Request Type: POST 
        For adding user data
        '''
        data = request.data
        try:
            
            serializer = MainDataSerializer(data = data)
            if serializer.is_valid():
                serializer.save()
                        
                return Response({
                                'status' : status.HTTP_201_CREATED ,
                                'message' : 'Plan Created',
                                })
            return Response({
                                'status' : status.HTTP_405_METHOD_NOT_ALLOWED ,
                                'message' : 'INVALID DATA',
                                })            
                            
        except Exception as e:
            return Response({
                            'status' : status.HTTP_404_NOT_FOUND,
                            'message':'Something Went Wrong',
                            'Error' : e
                            }),
        

    
    def partial_update(self, request, pk=None, *args, **kwargs):
        '''
        Request type: PATCH
        Send uid with url and access token as headers
        full data as data
        '''
        queryset = MainData.objects.get(id=pk)
        serializer = MainDataSerializer(instance=queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':status.HTTP_201_CREATED,
                             'res':'Your data has been updated...!!'}) 
        else:
            return Response({'status':status.HTTP_400_BAD_REQUEST,
                             'res': 'Something went wrong'})   
        
    def destroy(self, request, pk=None):
        '''
        Request type: DELETE 
        send user id with url and token as headers
        '''
        queryset = MainData.objects.get(id=pk)
        try:
            if queryset:
                # queryset.profile_pic.delete()
                queryset.delete()
                return Response({'status':status.HTTP_200_OK})
            else:
                return Response({'status':status.HTTP_404_NOT_FOUND})
        except Exception as e:
            return Response({'status':status.HTTP_400_BAD_REQUEST})



    def list(self,request):
        '''
        Request type: GET 
        '''
        user_details = MainData.objects.all()
        serializer = MainDataSerializer(user_details, many=True)


        return Response({ 
                        'status' : status.HTTP_200_OK,
                        'data': serializer.data,
                    })
