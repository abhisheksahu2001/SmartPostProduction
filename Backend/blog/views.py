from django.shortcuts import render,redirect
import os
from rest_framework import viewsets
from rest_framework.response import Response
from blog.models import *
from blog.serializers import *
from rest_framework import status
from django.contrib.sessions.models import Session
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from .utils import *
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_exempt

# Create your views here.
class FeedBackViewSet(viewsets.ViewSet):
    def create(self, request):
        '''
        Request Type: POST 
        For Feedback collection
        '''
        data = request.data
        print(data)
        req_data = {
            'value': int(data['value']),
            'text': data['text'],
        }
        try:
            feedback_instance = FeedbackReview.objects.filter(user = request.user)
            if feedback_instance.exists():
                feedback_serializer = FeedBackSerializer(instance=feedback_instance, data=req_data, partial=True)
                feedback_serializer.is_valid()
                feedback_serializer.save()
                return Response({
                            'status' : status.HTTP_200_OK,
                            'res' : 'Thanks For The Feedback..!!!',
                            })
            
            else:
                feedback_serializer = FeedBackSerializer(data=req_data, partial=True)
                if feedback_serializer.is_valid():
                    print('1')
                    feedback_serializer.save()
                        
                    return Response({
                                'status' : status.HTTP_200_OK,
                                'res' : 'Your Feedback Has Been Saved..!!!',
                                'data' : feedback_serializer.data,
                                })
                print('2')
                return Response({
                                'status' : status.HTTP_405_METHOD_NOT_ALLOWED ,
                                'message' : 'INVALID',
                                'err' : feedback_serializer.errors
                                })

                            
        except Exception as e:
            return Response({
                            'status' : status.HTTP_404_NOT_FOUND,
                            'message':'Something Went Wrong',
                            'Error' : e
                            })
          
        
    def destroy(self, request, pk=None):
        '''
        Request type: DELETE 
        send user id with url and token as headers
        '''
        # queryset = User.objects.get(id=pk)
        # try:
        #     if queryset:
        #         queryset.profile_pic.delete()
        #         return Response({'status':status.HTTP_200_OK})
        #     else:
        #         return Response({'status':status.HTTP_404_NOT_FOUND})
        # except Exception as e:
        #     return Response({'status':status.HTTP_400_BAD_REQUEST})



    def list(self,request):


        return Response({ 
                        'status' : status.HTTP_200_OK,
                        
                    })
    


class FeedBackViewSet(viewsets.ViewSet):
    @csrf_exempt
    def create(self, request):
        '''
        Request Type: POST 
        For Content collection
        https://localhost:8000/blog/richtext
        '''
        data = request.POST
        print(data)
        richtext_serializer = RichTextSerializer(data=data)
        if richtext_serializer.is_valid():
            richtext_serializer.save()
            return Response({ 
                            'status' : status.HTTP_200_OK,
                        })
        else:
            return Response({ 
                            'status' : data
                        })

@csrf_exempt
def datapost(request):
    if request.method == 'POST':
    
        data = request.POST.get('formData')
        print(data)
        instance = RichTextReview.objects.create(content=data)
        instance.save()
        # richtext_serializer = RichTextSerializer(data=data)
        # if richtext_serializer.is_valid():
        #     richtext_serializer.save()
        return JsonResponse({ 
                                'status' : status.HTTP_200_OK,
                            })
        # else:
        #     return JsonResponse({ 
        #                         'status' : data
        #                     })

        

