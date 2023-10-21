from rest_framework import serializers
from .models import Subscription, UserPlanDetails, PaymentDetails
from django.contrib.sessions.models import Session
# from accounts.serializers import UserSerializer


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        # fields = '__all__'
        exclude = ['created_at', 'updated_at']

    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['user'] = UserSerializer(instance.user).data
    #     return response

class UserPlanDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserPlanDetails
        exclude = ['created_at', 'updated_at']


class PaymentDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetails
        exclude = ['created_at', 'updated_at']
    
    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['admin'] = UserSerializer(instance.admin).data
    #     return response