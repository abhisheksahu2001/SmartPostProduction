from datetime import datetime, timedelta  
import time
import facebook
import calendar

print(datetime.now() + timedelta(days=7))
print(datetime.now().strftime("%D, %H:%M:%S"))
print(datetime.today())
print(calendar.day_name[datetime.today().weekday() ])
now = datetime.now()
print('Date and Time is:', now) 


exts = '2023-08-23 00:05'
sam = time.mktime(datetime.strptime(exts, "%Y-%m-%d  %H:%M" ).timetuple())
# timestamp = datetime.timestamp(int(exts))
print(sam)


# if ts1 == ts1 + diff_add:
#     print(datetime.utcfromtimestamp(ts2).strftime('%Y-%m-%d %H:%M:%S'))
# else:
#     print(datetime.utcfromtimestamp(ts1).strftime('%Y-%m-%d %H:%M:%S'))


# FOR FB SCHEDULING
# FB.api(
#   '/117342494722762/feed',
#   'POST',
#   {"published":"false","message":"A scheduled post","scheduled_publish_time":"1691342100"},
#   function(response) {
#       // Insert your code here
#   }
# );




# ts = int("1695233595")
# print(datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S') + " " + calendar.day_name[datetime.utcfromtimestamp(ts).weekday()])




# Wed Jun    21  2023  01:13:35 GMT+0530
# day month date year  time

# time.struct_time((d.year, d.month, d.day, 0, 0, 0, d.weekday(), yday, -1))

# app_id = "655985629660872"
# app_secret = "07323d6bbf1b6739059c3d893781f0af"
# image_url1 = "test.jpg"
# image_url2 = "test.jpg"
# image_url3 = "test.jpg"
# image_url4 = "test.jpg"
# post_type = "photos"
# caption = "test post like check"
# access_token = "EAAJUnY5vBsgBO6Es7PJX31KIXDd89BR1iREtxgA2Bs4EDQ7JH0jMZCOP4lE8Wd1eOURbkFwFZB7xEUdMsrzC6Ln1ula8yvVX66vLguNqitycxi3cTjAYHPbBhYtxZAx4BqM7xgAls9KxXiY6vRTpVyJc8P3i1UO9nWeTNlOIpP1LXrRIpPom4dsKPIuqDa6ZCOzsAubfT5Fp5NdL9bi6cKEA25XW782gYUwZD"






# data = {
#     'image': [image_url1,image_url2,image_url3,image_url4],
#     'caption' : caption,
#     'access_token' : access_token
# }
# img = []
# def fb_post(ac_token):
#     graph = facebook.GraphAPI(ac_token)
#     # ext_token = graph.extend_access_token(app_id=app_id, app_secret=app_secret)
#     # print(ext_token)
#     # debug_token = graph.debug_access_token(token=ac_token,app_id=app_id, app_secret=app_secret )
#     # print(debug_token)
#     photo = open(image_url, "rb")
#     # graph.put_object("me", post_type, message=caption, source=photo.read())
#     graph.put_object("me", post_type, message=caption, source=photo.read())
#     photo.close()
#     graph.put_photo()
#     return "Done"


  

# execute = fb_post(access_token)



import requests
#Your Access Keys
# page_id_1 = 100093550939614   
page_id_1 = 117342494722762
# facebook_access_token_1 = access_token
# graph = facebook.GraphAPI(access_token)
# post_url = f'https://graph.facebook.com/{page_id_1}/feed?fields=roles&access_token={access_token}'
# for img in data['image']:
#     post = graph.put_photo(image=open(img, "rb"),message=caption, profile_id=f'{page_id_1}')
# post = graph.get
# print(post['id'])
# post = graph.put_photo(image=image_url ,message=caption, profile_id=f'{page_id_1}')

# payload = {
# 'message': caption,
# }

# r = requests.post(post_url, data=post)
# print(r.text)


# returns all the pages of User 
# {userID}/accounts?fields=name,access_token,picture&access_token=${fbToken}


# data = {'pagesData': [{'name': 'Fand2', 'access_token': 'EAAJUnY5vBsgBO4L62HS4yxlzDjutiOFpy8C4oC7FiDNhqGBNSvqJmvZCP4WcPkfeX6cNeVSGIYZCgZCR5fGZAfi7AYcwno3Y6ZBYUNNEZBwo0ZAOxIDd3ztqtWjwOQxiVIND99j85MzZAV3ZAkIQpYcPFSD4uqbCXFjUdpYRnGLbdYJloq5ZBdLXcTOqZAOQbtdyBt79CSfnZAZAEfP0ZD', 'picture': {'data': {'height': 50, 'is_silhouette': False, 'url': 'https://scontent.fbho4-3.fna.fbcdn.net/v/t39.30808-1/354247469_112639168531114_6961101929318860516_n.png?stp=cp0_dst-png_p50x50&_nc_cat=104&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=Pv7FI9qQAzoAX_Jgecz&_nc_ht=scontent.fbho4-3.fna&edm=AGaHXAAEAAAA&oh=00_AfDYjh_zpHnKipTD-31S8pJ0wLRRXpkGFRD7lw4W36fb7g&oe=64CBFD71', 'width': 50}}, 'id': '117342494722762'}, {'name': 'Fandom', 'access_token': 'EAAJUnY5vBsgBO2Ad5jSyeQZAQqcSnwL1sANMZC8s4ZAc54zepHM7ajSlziVkpj7YifSya202h3k7ZBAIO5yQl2ZCgdZBotF6iwKVsZB7zVt520mkSmwZBh8NKYMCNMfta8Ygoi3BxSibXwpSp13A9wDkBU8EoZAMwbTtalKGPZBf0o1ri92Vt2M5r2KznRB9S0WqvDZBov1IpLuiEgZD', 'picture': {'data': {'height': 50, 'is_silhouette': False, 'url': 'https://scontent.fbho4-1.fna.fbcdn.net/v/t39.30808-1/356105356_109034445572640_8193452767890575090_n.jpg?stp=c0.6.50.50a_cp0_dst-jpg_p50x50&_nc_cat=108&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=JprILc6AVEAAX9V10OE&_nc_ht=scontent.fbho4-1.fna&edm=AGaHXAAEAAAA&oh=00_AfAR19N9nYtUM80Ua6Xl0bMtznxOOFhmienkCHEdBO4wcg&oe=64CBBBAD', 'width': 50}}, 'id': '106913345775547'}]}

# print(data['pagesData'][0:])


# for data in data['pagesData']:
    
#     print(data['name'])
#     name = data['name']
#     print(data['access_token'])
#     tok = data['access_token']
#     print(data['picture']['data']['url'])
#     pic = data['picture']['data']['url']
#     print(data['id'])
#     id = data['id']




# for i in data:
#     singlepage = data[i]
#     name = data[i].name
#     acessToken = data[i].access_token
#     id  = data[i].id
#     url = data[i].picture.data.url
#     print(i)





# def post_images_to_facebook(access_token, message, media_urls):
#     # Prepare the post data
#     post_data = {
#         'message': message,
#         'access_token': access_token
#     }

#     # Determine the post URL for photos
#     post_url = f'https://graph.facebook.com/{page_id_1}/feed'
#     # post_url = f'https://graph.facebook.com/{page_id_1}/feed?fields=roles&access_token={access_token}'

#     for media_url in media_urls:
#         # Check if the media URL is an image
#         if media_url.endswith('.jpg') or media_url.endswith('.png'):
#             post_data['url'] = media_url
#         else:
#             print(f"Unsupported media format for URL: {media_url}")
#             continue

#         # Send the request to post the photo
#         response = requests.post(post_url, data=post_data)

#         # Check the response
#         if response.status_code == 200:
#             print("Post successful!")
#         else:
#             print("Failed to post. Status code:", response.status_code)
#             print("Response:", response.json())

# # Usage example:
# access_token = access_token
# message = 'Check out these carousel-like images!'
# media_urls = ['test.jpg', 'test.jpg', 'test.jpg']

# post_images_to_facebook(access_token, message, media_urls)


# def post_carousel_to_facebook(access_token, message, image_urls):
#     post_url = f'https://graph.facebook.com/{page_id_1}/feed'

#     carousel_media = []
#     for image_url in image_urls:
#         carousel_media.append({
#             'media_url': image_url,
#             'type': 'image'
#         })

#     carousel_data = {
#         'message': message,
#         'access_token': access_token,
#         'attached_media': carousel_media
#     }

#     response = requests.post(post_url, json=carousel_data)

#     if response.status_code == 200:
#         print("Carousel post successful!")
#     else:
#         print("Failed to post carousel. Status code:", response.status_code)
#         print("Response:", response.json())

# Usage example:
# access_token = 'YOUR_FACEBOOK_PAGE_ACCESS_TOKEN'
# page_id = 'YOUR_FACEBOOK_PAGE_ID'
# message = 'Check out this carousel post!'
# image_urls = [
#     'https://images.unsplash.com/photo-1690722410513-ff89e9ceb825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
#     'https://images.unsplash.com/photo-1689878210188-da9ac2da32d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
#     # 'https://example.com/image3.jpg',
#     # Add more image URLs as needed
# ]
# image_urls = ["D:/Projects/Django Projects/SmartPost-v1/testfb.jpeg", "D:/Projects/Django Projects/SmartPost-v1/test.jpg"]

# post_carousel_to_facebook(access_token, message, image_urls)