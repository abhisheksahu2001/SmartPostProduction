from rest_framework import serializers
from facebookapi.models import User, FaceBookUser,FaceBookPage
from accounts.serializers import UserSerializer




class TokensFaceBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceBookUser
        fields = '__all__'

class FaceBookPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceBookPage
        fields = '__all__'