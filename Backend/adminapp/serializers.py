from rest_framework import serializers
from accounts.models import *
from facebookapi.models import *
from payments.models import *
from django.contrib.sessions.models import Session

class DynamicModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = None  # We will set this dynamically
        fields = '__all__'  # Or specify the fields you want to include

    def __init__(self, *args, **kwargs):
        if 'model' in kwargs:
            self.Meta.model = kwargs.pop('model')
        super().__init__(*args, **kwargs)



class UserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields= '__all__'

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

class PlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plans
        fields = '__all__'

class MainDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainData
        fields = '__all__'