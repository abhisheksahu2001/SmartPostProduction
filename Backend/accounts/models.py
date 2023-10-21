from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.utils import timezone

from payments.models import UserPlanDetails
from .manager import *
import uuid
from django.contrib.sessions.models import Session
# Create your models here.
def upload_to(instance, filename):
    return f'{instance.id}/{filename}'


class User(AbstractBaseUser):
    id = models.CharField(max_length=300, primary_key=True,unique=True, default=uuid.uuid4)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=200)
    profile_pic = models.ImageField(upload_to=upload_to, blank=True, null=True)
    phone_num = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)


    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.id


    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    

class Plans(models.Model):
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
    plan_id = models.CharField(max_length=50,null=True)
    plan_type = models.CharField(max_length=50)
    plan_amount = models.CharField(max_length=50,null=True)
    plan_details = models.TextField(null=True)
    plan_post_limit = models.IntegerField()
    plan_post_schedule = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    objects=models.Manager()

    def __str__(self):
        return str(self.plan_id)


class MainData(models.Model):
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
    admin = models.OneToOneField(User, on_delete=models.CASCADE)
    session = models.ForeignKey(Session,on_delete=models.SET_NULL, null=True)
    user_active = models.ForeignKey(UserPlanDetails, on_delete=models.CASCADE,null=True)
    plan_id = models.ForeignKey(Plans, on_delete=models.CASCADE,null=True)
    plan_status = models.BooleanField(default=False)
    plan_activate = models.CharField(max_length=50,null=True)
    plan_expiry = models.CharField(max_length=50,null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    objects=models.Manager()

    # def __str__(self):
    #     return str(self.admin.email)

# class ActiveUser(models.Model):
#     id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
#     user_active = models.OneToOneField(MainData, on_delete=models.CASCADE,null=True)
#     plan_id = models.ForeignKey(Plans, on_delete=models.CASCADE)
#     plan_status = models.BooleanField(default=False)
#     plan_activate = models.DateTimeField(null=True)
#     plan_expiry = models.DateTimeField(null=True)
#     created_at = models.DateTimeField(default=timezone.now)
#     updated_at = models.DateTimeField(default=timezone.now)
#     objects=models.Manager()

#     def __str__(self):
#         return str(self.user_active)



# class AllData(models.Model):
#     id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
#     admin = models.OneToOneField(MainData, on_delete=models.CASCADE)
#     plan_id = models.ForeignKey(Plans, on_delete=models.SET_DEFAULT, default=None,null=True)
#     active_user = models.ForeignKey(ActiveUser, on_delete=models.CASCADE,null=True)
#     created_at = models.DateTimeField(default=timezone.now)
#     updated_at = models.DateTimeField(default=timezone.now)
#     objects=models.Manager()

#     def __str__(self):
#         return self.admin.admin.email