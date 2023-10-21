import base64
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.core.signing import TimestampSigner



def send_reset_password(email,name):
    subject = 'Your password reset link is: '
    email_from = 'support@smartpost.com'
    # email_from = settings.EMAIL_HOST_USER
    message = (f'Hi {name}, Click on the link to reset your account password https://localhost:8000/Resetpassword')
    send_mail(subject, message, email_from, [email])

def send_reset_password_success(email,name):
    subject = 'Your Password changed'
    email_from = settings.EMAIL_HOST_USER
    message = (f'Hi {name}, Your Password has been successfully changed ')
    send_mail(subject, message, email_from, [email])


def send_activation_success(email,name):
    subject = 'Your Password changed'
    email_from = settings.EMAIL_HOST_USER
    message = (f'Hi {name}, Your Plan has been successfully Activated ')
    send_mail(subject, message, email_from, [email])