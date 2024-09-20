from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.validators import MinValueValidator
from django.utils.text import slugify


class PersonManager(BaseUserManager):
    def create_user(self, username, email, name, age, gender, is_trainer, password=None, password2=None):
        """
        Creates and saves a User with the given username, email, name, age, gender, and password.
        """
        if not email:
            raise ValueError("Users must have an email address")
        
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            name=name,
            age=age,
            gender=gender,
            is_trainer=is_trainer
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, name, age, gender, is_trainer, password=None, password2=None):
        """
        Creates and saves a superuser with the given username, email, name, age, gender, and password.
        """
        user = self.create_user(
            username=username,
            email=email,
            name=name,
            age=age,
            gender=gender,
            password=password,
            is_trainer=is_trainer
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    
# Person model.
class Person(AbstractBaseUser):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(verbose_name="Email", max_length=255, unique=True)
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)
    description = models.CharField(max_length=1000, null=True, blank=True)
    is_trainer = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    items_in_cart = models.ManyToManyField('Product', symmetrical=False, related_name='cart_set')
    orders = models.ManyToManyField('Product', symmetrical=False, related_name='order_set')
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)
    trainees = models.ManyToManyField('self',symmetrical=False, related_name='trainee_set')
    
    objects = PersonManager()
    video_call_url = models.CharField(max_length=1000, null=True, blank=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name", "age", "gender", "is_trainer"]
    
    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    def get_avatar(self):
        if self.avatar:
            return settings.WEBSITE_URL + self.avatar.url  
        else:
            return ''

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

# class Product(models.Model):
#     name = models.CharField(max_length=100)
#     price = models.IntegerField()
#     image = models.ImageField(upload_to='products/', null=False, blank=False)
#     wishlistedBy = models.ManyToManyField('self',symmetrical=False, related_name='Wishlist')
#     addedToCartBy = models.ManyToManyField('self',symmetrical=False, related_name='Cart')
# #   colors = models.ManyToManyField('self',symmetrical=False, related_name='Colors')
#     category = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, related_name='products')
    company = models.ForeignKey('Company', on_delete=models.SET_NULL, null=True, related_name='products')
    sku = models.CharField(max_length=100, unique=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')
    is_primary = models.BooleanField(default=False)
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Image for {self.product.name}"

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name