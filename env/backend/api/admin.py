from django.contrib import admin
from .models import Person, Product, Category, Company, ProductImage

class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'name', 'age', 'gender', 'is_trainer', 'is_active', 'is_admin')
    list_filter = ('is_trainer', 'is_active', 'is_admin')
    search_fields = ('username', 'email', 'name')

    # If you want to display cart and wishlist items, you can add custom methods
    def cart_items_count(self, obj):
        return obj.cart_items.count()
    cart_items_count.short_description = 'Cart Items'

    def wishlist_items_count(self, obj):
        return obj.wishlist_items.count()
    wishlist_items_count.short_description = 'Wishlist Items'

    # Add these methods to list_display if you want to show the counts
    list_display += ('cart_items_count', 'wishlist_items_count')

admin.site.register(Person, PersonAdmin)

# Register other models
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Company)
admin.site.register(ProductImage)
