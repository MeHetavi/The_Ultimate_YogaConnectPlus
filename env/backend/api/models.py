from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db.models import JSONField
from django.conf import settings


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
    is_trainer = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    trainees = models.ManyToManyField('self',symmetrical=False, related_name='trainee_set')

    objects = PersonManager()

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

