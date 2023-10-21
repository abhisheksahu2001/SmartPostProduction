import requests
import facebook


def fb_post_0(data):
    page_id = data['page_id']
    caption = data['caption']
    accessToken = data['accessToken']
    graph = facebook.GraphAPI(accessToken)
    post_url = f'https://graph.facebook.com/{page_id}/feed?fields=roles&access_token={accessToken}'
    post = graph.put_object(parent_object='me', connection_name='feed',message=caption, profile_id=f'{page_id}')
    r = requests.post(post_url, data=post)
    print(r.text)
    return post


def fb_post_1(data):
    page_id = data['page_id']
    image = data['image']
    accessToken = data['accessToken']
    imageContent = image.read()
    graph = facebook.GraphAPI(accessToken)
    post_url = f'https://graph.facebook.com/{page_id}/feed?fields=roles&access_token={accessToken}'
    post = graph.put_photo(image = imageContent ,profile_id=f'{page_id}')
    r = requests.post(post_url, data=post)
    return post
    
def fb_post_2(data):
    page_id = data['page_id']
    image = data['image']
    caption = data['caption']
    accessToken = data['accessToken']
    imageContent = image.read()
    graph = facebook.GraphAPI(accessToken)
    post_url = f'https://graph.facebook.com/{page_id}/feed?fields=roles&access_token={accessToken}'
    post = graph.put_photo(image = imageContent ,message=caption,profile_id=f'{page_id}')
    r = requests.post(post_url, data=post)
    return post
    

def fb_post_3(data):
    page_id = data['page_id']
    time_stamp = data['time_stamp']
    caption = data['caption']
    accessToken = data['accessToken']
    graph = facebook.GraphAPI(accessToken)
    scheduled_url = f"https://graph.facebook.com/{page_id}/feed?published=false&message={caption}&scheduled_publish_time={time_stamp}&access_token={accessToken}"
    r = requests.post(scheduled_url)
    return r

def fb_post_4(data):
    page_id = data['page_id']
    image = data['image']
    imageContent = image.read()
    time_stamp = data['time_stamp']
    accessToken = data['accessToken']
    graph = facebook.GraphAPI(accessToken)
    post_url = f'https://graph.facebook.com/{page_id}/feed?fields=roles&published=false&scheduled_publish_time={time_stamp}&access_token={accessToken}'
    post = graph.put_photo(image = imageContent ,profile_id=f'{page_id}')
    r = requests.post(post_url, data=post)
    return r

    
# def fb_post_5(data):
#     caption = data['caption']
#     page_id = data['page_id'] 
#     accessToken = data['accessToken']
#     image = data['image']
#     imageContent = image.read()
#     time_stamp = data['time_stamp']
#     graph = facebook.GraphAPI(accessToken)
#     post_url = f'https://graph.facebook.com/{page_id}/feed?published=false&scheduled_publish_time={time_stamp}&access_token={accessToken}'
#     post = graph.put_photo(image = imageContent ,message=caption ,profile_id=f'{page_id}')
#     r = requests.post(post_url, data=post)
#     return post

def fb_post_5(data):
    caption = data['caption']
    page_id = data['page_id'] 
    accessToken = data['accessToken']
    image = data['image']
    imageContent = image.read()
    time_stamp = data['time_stamp']
    graph = facebook.GraphAPI(accessToken)
    # post_url = f'https://graph.facebook.com/{page_id}/feed?published=false&scheduled_publish_time={time_stamp}&access_token={accessToken}'
    post = graph.schedule_post(image = imageContent ,message=caption ,profile_id=f'{page_id}', scheduled_time=time_stamp)
    # r = requests.post(post_url, data=post)
    print(post)
    return post

# def schedule_post(self, image, album_path="me/photos", scheduled_time=None, **kwargs):
#         """
#         Upload an image using multipart/form-data and schedule a post.

#         image - A file object representing the image to be uploaded.
#         album_path - A path representing where the image should be uploaded.
#         scheduled_time - The datetime when the post should be scheduled.
#         **kwargs - Additional post arguments.

#         """
#         post_data = {"scheduled_publish_time": scheduled_time , "published": False } if scheduled_time else {}
#         return self.request(
#             "{0}/{1}".format(self.version, album_path),
#             post_args={**kwargs, **post_data},
#             files={"source": image},
#             method="POST",
#         )