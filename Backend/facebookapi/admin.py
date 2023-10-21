from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import FaceBookUser,FaceBookPage

# Register your models here.
@admin.register(FaceBookUser)
class FaceBookUserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'admin_id', 'user_id',)
    list_filter = ('admin_id', 'user_id',)
    fieldsets = (
      ('User Credentials', {'fields': ('id','admin_id', 'user_id',  'user_token_status', )}),
      ('Access Token info', {'fields': ('user_access_token','user_access_token_expiry', )}),
      ('Extended Token info', {'fields': ('user_extended_token', 'user_extended_token_expiry', )}), 
    )

    add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('admin_id', 'user_id', 'user_token_status','user_access_token','user_access_token_expiry','user_extended_token', 'user_extended_token_expiry',),
      }),
    )
    search_fields = ('admin_id', 'user_id', )
    ordering = ('id',)
    filter_horizontal = ()
@admin.register(FaceBookPage)
class FaceBookPageModelAdmin(BaseUserAdmin):
    list_display = ('id', 'page_name',)
    list_filter = ('page_name', 'fb_user_id',)
    fieldsets = (
      ('User Credentials', {'fields': ('id', 'fb_user_id', 'page_name', 'page_profile_pic_url',)}),
      # ('Access Token info', {'fields': ()}),
      ('Extended Token info', {'fields': ('page_extended_access_token', 'page_extended_token_expiry', )}), 
    )

    add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('fb_user_id', 'page_name', 'page_profile_pic_url', 'page_extended_access_token', 'page_extended_token_expiry',),
      }),
    )
    search_fields = ('admin_id','page_name', 'fb_user_id', )
    ordering = ('id',)
    filter_horizontal = ()
