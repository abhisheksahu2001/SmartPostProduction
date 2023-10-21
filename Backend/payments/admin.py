from django.contrib import admin
from .models import Subscription, UserPlanDetails
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.


# @admin.register(Subscription)
# class SubscriptionModelAdmin(BaseUserAdmin):
#     list_display = ('user', 'subscription_id', 'status', 'start_at', 'end_at','created_at', 'updated_at',)
#     list_filter = ('subscription_id', 'plan_id', 'status', )
#     fieldsets = (
#       ('User Credentials', {'fields': ('user','subscription_id', 'plan_id', 'customer_id', )}),
#       ('Personal info', {'fields': ('status', 'start_at', 'end_at',)}),
#       # ('Server Timmings', {'fields': ('created_at', 'updated_at',)}), 
#     )

#     add_fieldsets = (
#       (None, {
#           'classes': ('wide',),
#           'fields': ('user','subscription_id', 'plan_id', 'customer_id', 'status', 'start_at', 'end_at',),
#       }),
#     )
#     search_fields = ('user','subscription_id', 'plan_id', 'customer_id', )
#     ordering = ('id',)
#     filter_horizontal = ()


@admin.register(UserPlanDetails)
class SubscriptionModelAdmin(BaseUserAdmin):
    list_display = ('user', 'plan_type', 'plan_status', 'start_at', 'end_at',)
    list_filter = ('user', 'plan_status', )
    fieldsets = (
      ('User Data', {'fields': ('user', 'plan_type', 'plan_status', )}),
      ('Personal info', {'fields': ('start_at', 'end_at',)}),
      ('Plan info', {'fields': ('user_post_count', 'user_post_schedule_count',)}),
       
    )

    add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('user', 'plan_type', 'plan_status', 'start_at', 'end_at','created_at','updated_at',),
      }),
    )
    search_fields = ('user', 'plan_type', 'plan_status', )
    ordering = ('id',)
    filter_horizontal = ()
