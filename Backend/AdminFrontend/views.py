from django.shortcuts import render

def show_admin(request, *args, **kwargs):
    return render(request,'adminfrontend/index.html')