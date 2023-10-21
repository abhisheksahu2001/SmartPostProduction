from django.db import models
from accounts.models import User
import uuid
from django.utils import timezone
# Create your models here.


class FaceBookUser(models.Model):  
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4) 
    admin_id = models.ForeignKey(User, on_delete=models.CASCADE)
    user_access_token = models.TextField()
    user_access_token_expiry = models.CharField(max_length=100)
    user_extended_token = models.TextField()
    user_extended_token_expiry = models.CharField(max_length=100)
    user_token_status = models.BooleanField(default=False)
    user_id = models.CharField(max_length=100)  
    # created_at = models.DateTimeField(default=timezone.now)
    # updated_at = models.DateTimeField(default=timezone.now)

    # USERNAME_FIELD = 'admin_id'
    
class FaceBookPage(models.Model):
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
    fb_user_id = models.ForeignKey(FaceBookUser, on_delete=models.CASCADE)
    page_id = models.CharField(max_length=100)
    page_extended_access_token = models.TextField()
    page_extended_token_expiry = models.CharField(max_length=100)
    page_profile_pic_url = models.TextField()
    page_name = models.CharField(max_length=100)
    # created_at = models.DateTimeField(default=timezone.now)
    # updated_at = models.DateTimeField(default=timezone.now)

    # USERNAME_FIELD = 'fb_user_id'



