from django.contrib import admin
from .models import Person, Product, Category, Company

class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'name', 'age', 'gender', 'is_trainer', 'is_active', 'is_admin')
    list_filter = ('is_trainer', 'is_active', 'is_admin')
    search_fields = ('username', 'email', 'name')

admin.site.register(Person, PersonAdmin)

# Register other models
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Company)
