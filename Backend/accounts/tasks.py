from celery import shared_task
from Backend.celery import app
from .models import *
from .utils import *
from django.core.mail import send_mail
from django.conf import settings

@shared_task(bind=True)
def test_func(self,email):
    #operations
    #timezone.localtime(users.date_time) + timedelta(days=2)
    
    # send_test_activation_success()
    subject = "Hi! Celery Testing"
    message = "If you are liking my content, please hit the like button and do subscribe to my channel"
    email_from =settings.EMAIL_HOST_USER,
    send_mail(subject,message, email_from, [email])
    return email


# @app.task(bind=True)
# def add_func(self, email):
#     send_test_activation_success(email)
#     return "Sent"


# @app.task(bind=True)
# def add_func(self, x,y):
#     return x+y