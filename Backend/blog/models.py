from django.db import models
from django.utils import timezone
import uuid
from django.conf import settings
from ckeditor.fields import RichTextField


class FeedbackReview(models.Model):
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    value = models.PositiveIntegerField()  # The rating value (e.g., 1 to 5 stars)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)



class RichTextReview(models.Model):
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
    content = RichTextField()


class Category(models.Model):
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4)
    category_name = models.CharField(max_length=120)
    
    def __str__(self):
        return self.category_name
    
class HashTags(models.Model):
    pass


class BlogText(models.Model):
    pass
'''
heading
author
published date
reading time
banner image
image desc
views count
category (our choice)
tags
richtext

'''