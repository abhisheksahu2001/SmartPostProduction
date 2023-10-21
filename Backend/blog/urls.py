from django.urls import path,include
from rest_framework.routers import DefaultRouter
from blog import views


router = DefaultRouter()
router.register(r'feedback', views.FeedBackViewSet, basename='feedback')
router.register(r'richtext', views.FeedBackViewSet, basename='richtext')




urlpatterns = [
    path('datapost/', views.datapost, name='datapost'),

]





urlpatterns += router.urls