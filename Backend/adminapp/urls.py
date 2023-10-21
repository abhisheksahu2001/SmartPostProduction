from django.urls import path,include
from rest_framework.routers import DefaultRouter
from adminapp import views 


router = DefaultRouter()
router.register(r'admin-user', views.UserViewSet, basename='admin-user')
router.register(r'admin-plan', views.PlanViewSet, basename='admin-plan')
router.register(r'admin-data', views.MainDataViewSet, basename='admin-data')
# router.register(r'adminget', views.ConvertQuerysetToJsonView, basename='adminget')






urlpatterns = [
    path('show_models/', views.show_models, name='show_models'),
    path('table_detail/<str:app_name>/<str:model_name>/', views.table_detail, name='table_detail'),
    path('get_tables/<str:app_name>/<str:model_name>/', views.get_tables, name='get_tables'),
    # path('table_get/<model_name>/', views.table_get, name='table_get'),




]





urlpatterns += router.urls