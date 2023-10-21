from rest_framework import serializers
from payments.serializers import UserPlanDetailsSerializers
from blog.models import *

class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackReview
        # fields = '__all__'
        exclude = ['created_at']

class RichTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = RichTextReview
        fields = '__all__'