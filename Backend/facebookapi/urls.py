from django.urls import path,include
from rest_framework.routers import DefaultRouter
from facebookapi import views 


router = DefaultRouter()
router.register(r'facebook-token', views.FacebookViewset, basename='facebookToken')
router.register(r'facebook-channels-update', views.FacebookDataViewset, basename='facebookChannels')
router.register(r'check', views.CheckViewset, basename='check')
router.register(r'facebook-post', views.FacebookPostViewset, basename='facebookPost')
router.register(r'facebook-login', views.FBLoginViewSet, basename='facebook-login')



urlpatterns = [
    # path('csrf/', views.get_csrf, name='csrf'),
    path('facebook-callback/', views.callback, name='facebook-callback'),

]





urlpatterns += router.urls