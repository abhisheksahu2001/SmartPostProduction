from django.shortcuts import render, redirect
import requests

def index(request, *args, **kwargs):
    return render(request,'frontend/index.html')


# def check(request, *args, **kwargs):
#     authorization_code = request.GET['code']
#     print(authorization_code)
#     context = {'code': authorization_code}
#     return render(request,'frontend/index.html', context)



def fb_index(request):
    if 'code' in request.GET:
        user = request.user
        url = 'https://localhost:8000/facebook-access/facebook-login/'
        code = request.GET['code']
        data = {'code':code,
                'user': user}
        r = requests.post(url, data=data, verify=False, )


    return redirect('Frontend:dashboard', auth='True', channel_name='facebook' )



# def fb_channels(request, auth):
#     if auth == True:
#         return redirect('Frontend:channels')
#     else:
#         return redirect('Frontend:channels')