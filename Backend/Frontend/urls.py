from django.urls import path, re_path
from . import views
from AdminFrontend.views import *
app_name = 'Frontend'
urlpatterns = [
    path('',views.index),
    path('login',views.index),
    path('signup',views.index),
    path('dashboard',views.index),
    path('crafter',views.index),
    path('dashboard/schedular',views.index  ),
    path('plans',views.index),



    path(f'channel/<str:channel_name>_auth=<str:auth>/',views.index , name='dashboard' ),
    # path('channels/auth=<str:auth>/',views.fb_channels, name='fb_channels'),
    path('channels/',views.fb_index, name='channels'),


    # path('channel/',views.index),
    # path('channels/',views.index, name='redirect_channel'),
    path('payments/confirm',views.index),
    path('Rrecoveraccount', views.index),
    path('resetpassword/' , views.index),
    path('setting',views.index),
    path('adminauth',show_admin),
    path('adminpanel/<str:name>',show_admin),
    path('setting/<str:id>' , views.index ),
    path('adminpanel',show_admin),
    # re_path(r'.*', views.index)
    # re_path(r'^foo$', views.index, name='url_name')

]
