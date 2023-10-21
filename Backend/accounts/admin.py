from django.contrib import admin
from .models import User, MainData, Plans
from django.contrib.sessions.models import Session
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
@admin.register(User)
class UserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'name', 'is_admin', 'created_at', 'updated_at')
    list_filter = ('is_admin', 'is_active', 'email', )
    fieldsets = (
      ('User Credentials', {'fields': ('id','email', 'password',)}),
      ('Personal info', {'fields': ('name', 'profile_pic','last_login', )}),
      ('Permissions', {'fields': ('is_admin', 'is_active', )}),
      ('Server Timmings', {'fields': ('created_at', 'updated_at',)}), 
    )

    add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'name', 'password1', 'password2'),
      }),
    )
    search_fields = ('email', 'name')
    ordering = ('id',)
    filter_horizontal = ()



@admin.register(MainData)
class MainDataModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'admin',)
    list_filter = ( 'admin', )
    fieldsets = (
      ('User Info', {'fields': ('admin', 'user_active',)}),
      ('Session Info', {'fields': ('session',  )}), 
      ('Plan Info', {'fields': ('plan_id', 'plan_status', 'plan_activate', 'plan_expiry',  )}), 
      ('Creation Info', {'fields': ('created_at', 'updated_at', )}), 
    )

    add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('admin','session', 'plan_id', 'plan_status', 'plan_activate', 'plan_expiry','created_at', 'updated_at',),
      }),
    )
    search_fields = ('admin', )
    ordering = ('admin',)
    filter_horizontal = ()


@admin.register(Session)
class SessionModelAdmin(admin.ModelAdmin):
    list_display = ('session_key','expire_date',)
    list_filter = ( 'session_key', )
    fieldsets = (
      ('Session Info', {'fields': ('session_key','expire_date', 'session_data', )}), 
    )

    add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('session_key','expire_date', 'session_data',),
      }),
    )
    search_fields = ('session_key', )
    ordering = ('session_key',)
    filter_horizontal = ()

@admin.register(Plans)
class PlansModelAdmin(admin.ModelAdmin):
    list_display = ('id','plan_type', 'plan_post_limit', )
    list_filter = ( 'plan_type', )
    fieldsets = (
      ('Plan Info', {'fields': ('id','plan_type','plan_details', 'plan_post_limit', 'plan_post_schedule', )}), 
      ('Creation Info', {'fields': ('created_at', 'updated_at', )}), 
    )

    add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('plan_type','plan_details', 'plan_post_limit', 'plan_post_schedule', 'created_at', 'updated_at',),
      }),
    )
    search_fields = ('plan_type', )
    ordering = ('plan_type',)
    filter_horizontal = ()


# @admin.register(ActiveUser)
# class ActiveUserModelAdmin(admin.ModelAdmin):
#     list_display = ('id','user_active', 'plan_id', 'plan_status', )
#     list_filter = ( 'user_active', )
#     fieldsets = (
#       ('User Info', {'fields': ('user_active', 'plan_id', 'plan_status', )}), 
#       ('Plan Validity', {'fields': ('plan_activate', 'plan_expiry', )}), 
#       ('Creation Info', {'fields': ('created_at', 'updated_at', )}), 
#     )

#     add_fieldsets = (
#       (None, {
#           'classes': ('wide',),
#           'fields': ('user_active', 'plan_id', 'plan_status','plan_activate', 'plan_expiry', 'created_at', 'updated_at',),
#       }),
#     )
#     search_fields = ('user_active',)
#     ordering = ('plan_status',)
#     filter_horizontal = ()


# @admin.register(ScheduledPost)
# class ScheduledPostModelAdmin(admin.ModelAdmin):
#     list_display = ('id','admin', 'scheduled_time',)
#     list_filter = ( 'scheduled_time', )
#     fieldsets = (
#       ('Post Info', {'fields': ('admin',)}), 
#       ('Post Data', {'fields': ('caption', )}), 
#       ('Post Time', {'fields': ('scheduled_time', )}), 
#       ('Post Platform', {'fields': ('fb_access_token', )}), 
#       ('Creation Info', {'fields': ('created_at', 'updated_at', )}), 
#     )

#     add_fieldsets = (
#       (None, {
#           'classes': ('wide',),
#           'fields': ('admin', 'scheduled_time', 'caption', 'scheduled_time', 'fb_access_token', 'created_at', 'updated_at',),
#       }),
#     )
#     search_fields = ('admin',)
#     ordering = ('scheduled_time',)
#     filter_horizontal = ()


# @admin.register(AllData)
# class AllDataModelAdmin(admin.ModelAdmin):
#     list_display = ('id','admin','user_email','plan_name',)
#     list_filter = ( 'plan_id', )
#     fieldsets = (
#       ('User Info', {'fields': ('admin', 'profile_pic',)}), 
#       ('Plan Data', {'fields': ('plan_id', )}), 
#       ('Active Status', {'fields': ('active_user', )}), 
#       ('Post Scheduled', {'fields': ('scheduled_data', )}), 
#       ('Creation Info', {'fields': ('created_at', 'updated_at', )}), 
#     )

#     add_fieldsets = (
#       (None, {
#           'classes': ('wide',),
#           'fields': ('admin','profile_pic', 'plan_id', 'active_user', 'scheduled_data', 'created_at', 'updated_at',),
#       }),
#     )
#     search_fields = ('admin',)
#     ordering = ('admin',)
#     filter_horizontal = ()
#     def user_email(self, obj):
#         return str(obj.admin.admin.email)
    
#     def plan_name(self, obj):
#         return str(obj.plan_id.plan_type)
    