from django.urls import path
from rest_framework.routers import DefaultRouter
from payments import views


router = DefaultRouter()
router.register(r'subscription', views.CreateSubscriptionViewSet, basename='create_subscription')
router.register(r'subscription-checkout', views.SubscriptionCheckoutViewSet, basename='checkout_subscription')
router.register(r'subscription-payment', views.PaymentDataViewSet, basename='subscription_payment')
router.register(r'subscription-payment-history', views.PaymentHistoryViewSet, basename='subscription_payment_history')





# router.register(r'ulogin', LoginView.as_view(), basename='login')

urlpatterns = [
    # path('csrf/', views.get_csrf, name='csrf'),
    path('raz_callback/', views.raz_callback, name='raz_callback'),
    path('free-trial/', views.free_trial_logic, name='free_trial_logic'),
    # path('subscription-payment/', views.PaymentData, name='subscription_payment'),

]





urlpatterns += router.urls