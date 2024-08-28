from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import Person

class PersonAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    list_display = ('username', 'email', 'name', 'age', 'gender', 'is_trainer', 'is_active','is_admin', 'avatar')
    list_filter = ('is_admin', 'is_trainer')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('name', 'age', 'gender', 'is_trainer')}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'name', 'age', 'gender', 'is_trainer', 'password1', 'password2')}
        ),
    )
    search_fields = ('email', 'username', 'name')
    ordering = ('username',)
    filter_horizontal = ()

    def follower_count(self, obj):
        return obj.followers.count()
    follower_count.short_description = 'Followers'

    def following_count(self, obj):
        return obj.following.count()
    following_count.short_description = 'Following'

    def trainee_count(self, obj):
        return obj.trainees.count()
    trainee_count.short_description = 'Trainees'

# Register the new PersonAdmin...
admin.site.register(Person, PersonAdmin)

# Unregister the Group model from admin as we're not using Django's built-in permissions
admin.site.unregister(Group)
