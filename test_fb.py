import facebook
import requests
import datetime
# page_id = 117342494722762
# access_token = "EAAJUnY5vBsgBO4QHtjM32Y92EdSV1BpXUtNNBczblludmflZA1cGbVLUFw1buofTvomOZCaRoIiG4DUCqHg0uLhHj4ULhs1fKYL6GQgghSvHZAp4Xv8TJMZCBLDX2ZAJJij8yXRL9HNgXONZC7ssHgTqfarnP3Ew8F9Xh0utBi9CoOYbjjn8LlBJtt416ZBicBwbNEEtHN6s8TrZAMB0jvk7BjlCYlVrRuAZD"
# graph = facebook.GraphAPI(access_token)
# caption = 'new api scheduled post'
# image = 'testfb.jpeg'
# time_stamp = '1691761200'
# imageContent = image


# # post = graph.put_photo(image=open(image, 'rb') ,message=caption, profile_id=f'{page_id}')
# # attached_media = [{'media_fbid': post['id']}]



# scheduled_time = datetime.datetime.now() + datetime.timedelta(minutes=10)  # Schedule 2 hours from now
# print(int(scheduled_time.timestamp()))
# # graph.put_object(parent_object=page_id, connection_name='feed', scheduled_publish_time=int(scheduled_time.timestamp()), message=caption, attached_media=[{'media_fbid': attached_media},])

# # scheduled_post = graph.put_object(parent_object=page_id, connection_name='feed', scheduled_publish_time=int(scheduled_time.timestamp()), message=caption)
    
#     # Step 2: Upload the image
# photo = graph.put_photo(image=open(image, 'rb'), message=caption)
    
#     # Step 3: Attach the image to the scheduled post
# attachment_data = {"media_fbid": photo["id"]}
# graph.put_object(parent_object=page_id, connection_name="attachments", scheduled_publish_time=int(scheduled_time.timestamp()), attachment_media=attachment_data)
    
data = {'pagesData': [{'name': 'Fand2', 'access_token': 'EAAJUnY5vBsgBO3qkPCEzLRiZAvQkDKtZBk2olES1nfx48HpJyDdS7zbfSKI3OZAwFCwrZC90Po4c6mU7oLy1UjiKilKyZCcdnqKKbbmVakj7fDnQ8zXIVE7JBsRrihJqop1aocNd3a7sM8S8lD8nhKUpZAFQ7NKQdTtVOn5BYXZCLkOzqiLRKcXhIKixvZA864jZAJpVhn08ZD', 'picture': {'data': {'height': 50, 'is_silhouette': False, 'url': 'https://scontent.fbho4-3.fna.fbcdn.net/v/t39.30808-1/354247469_112639168531114_6961101929318860516_n.png?stp=cp0_dst-png_p50x50&_nc_cat=104&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=2fLoMNOItB0AX-206ps&_nc_ht=scontent.fbho4-3.fna&edm=AGaHXAAEAAAA&oh=00_AfDD_yy6THH-h7aBxT5mYQiSLDkPZCXLk-JH1jlJNx-ysg&oe=64EBA171', 'width': 50}}, 'id': '117342494722762'}, {'name': 'Fandom', 'access_token': 'EAAJUnY5vBsgBOxEqyauoZC0TMp1ItuncxfDxpms1q33GLeDGQLxXsZCG8REqRNskbcfOergmZCt7b1ZBZCys4u6hEUGcUXmRuZChV5RBVTSYZBNgHcAyeYBsYs6A9JBpUuTSmRQpZBhLzziTilJT69yticqiXoZCaWi4qumE0YL7ZBrB4uJWkYcTegSKqZA11fLFgD5RtNykGUZD', 'picture': {'data': {'height': 50, 'is_silhouette': False, 'url': 'https://scontent.fbho4-1.fna.fbcdn.net/v/t39.30808-1/356105356_109034445572640_8193452767890575090_n.jpg?stp=c0.6.50.50a_cp0_dst-jpg_p50x50&_nc_cat=108&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=2Chnq3MEUlYAX_tQmR_&_nc_ht=scontent.fbho4-1.fna&edm=AGaHXAAEAAAA&oh=00_AfA1UWspN18_Jw5X0iC2UIK-ijO4F8SzcLHvh3VrcNHrrw&oe=64EB5FAD', 'width': 50}}, 'id': '106913345775547'}]}

print(data)