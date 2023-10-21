from django.urls import path,include
from rest_framework.routers import DefaultRouter
from accounts import views 


router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'login', views.UserLoginViewSet, basename='login')
router.register(r'activate', views.ActiveUserViewSet, basename='activate')
router.register(r'logout', views.LogoutView, basename='logout')





urlpatterns = [
    path('csrf/', views.get_csrf, name='csrf'),
    path('session/', views.session_view, name='session'),
    path('forgot-password/', views.forgot_password, name='forgot-password'),
    path('change_password/', views.change_password, name='change_password'),



]





urlpatterns += router.urls