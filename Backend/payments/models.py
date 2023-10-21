from django.db import models
from django.conf import settings
import uuid
# Create your models here.



class Subscription(models.Model):
    id = models.CharField(max_length=300, primary_key=True,unique=True, default=uuid.uuid4)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    subscription_id = models.CharField(max_length=100)
    plan_id = models.CharField(max_length=100)
    customer_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    start_at = models.CharField(max_length=20,null=True)
    end_at = models.CharField(max_length=20,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'user'

    def __str__(self):
        return self.subscription_id
    



class UserPlanDetails(models.Model):
    id = models.CharField(max_length=300, primary_key=True,unique=True, default=uuid.uuid4)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plan_type = models.CharField(max_length=100)
    plan_status = models.BooleanField(default=False)
    start_at = models.CharField(max_length=80,null=True)
    end_at = models.CharField(max_length=80,null=True)
    user_post_count = models.IntegerField(default=0)
    user_post_schedule_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.plan_type
    
class PaymentDetails(models.Model):
    id = models.CharField(max_length=300, primary_key=True,unique=True, default=uuid.uuid4)
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    raz_customer_id = models.CharField(max_length=80,null=True)
    raz_order_id = models.CharField(max_length=80,null=True)
    raz_payment_id = models.CharField(max_length=80,null=True)
    raz_invoice_id = models.CharField(max_length=80,null=True)
    raz_plan_type = models.CharField(max_length=80,null=True)
    raz_plan_start = models.CharField(max_length=80,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
 
    