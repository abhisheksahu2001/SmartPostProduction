from rest_framework import serializers
from payments.serializers import UserPlanDetailsSerializers
from accounts.models import Plans, User, MainData
from django.contrib.sessions.models import Session

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['email',  'name', 'password', 'phone_num']
        extra_kwargs={
        'password':{'write_only':True}
        }

    def validate(self, attrs):
        if 'email' in attrs:
            user = User.objects.filter(email = attrs['email'])
            if user.exists():
                raise serializers.ValidationError('email is already taken')
        return attrs

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)

class UserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(required=False)
    class Meta:
        model = User
        # fields = '__all__'
        exclude = ['is_admin', 'is_active', 'password']

class UserUpdate(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ['email','name', 'profile_pic']


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

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['admin'] = UserSerializer(instance.admin).data
        response['plan_id'] = PlansSerializer(instance.plan_id).data
        response['user_active'] = UserPlanDetailsSerializers(instance.user_active).data
        return response

# class ActiveUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ActiveUser
#         fields = '__all__'

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user_active'] = MainDataSerializer(instance.user_active).data
#         response['plan_id'] = PlansSerializer(instance.plan_id).data
#         return response

# class ScheduledPostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ScheduledPost
#         fields = '__all__'

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['admin'] = MainDataSerializer(instance.admin).data
#         return response


# class AllDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AllData
#         fields = '__all__'

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['admin'] = MainDataSerializer(instance.admin).data['id']
#         response['plan_id'] = PlansSerializer(instance.plan_id).data['plan_type']
#         response['active_user'] = ActiveUserSerializer(instance.active_user).data['user_active']['id']
#         response['scheduled_data'] = ScheduledPostSerializer(instance.scheduled_data).data
#         return response



class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','password']

class MainSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainData
        fields = '__all__'