from django.urls import path,include
from rest_framework.routers import DefaultRouter
from instagramapi import views 
# from Frontend.urls import *


router = DefaultRouter()
# router.register(r'user', views.FBLoginViewSet, basename='user')




urlpatterns = [
    path('user/', views.testing, name='user'),
    # path('share-token/', views.shareToken, name='share-token'),
    path('getToken/<str:token>/', views.getToken, name='getToken'),
    path('callback/', views.callback, name='callback'),

]





urlpatterns += router.urls