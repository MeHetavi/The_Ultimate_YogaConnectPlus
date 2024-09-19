from rest_framework import serializers 
from .models import Category, Company, Person, Product, ProductImage
from django.contrib.auth.password_validation import validate_password

def get_trainers(obj):
    return list(Person.objects.filter(trainees=obj).values_list('username', flat=True))

class PersonRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = Person
    fields=['username', 'name', 'age', 'gender', 'email','password','password2','is_trainer']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration.
  def validate(self, attrs):

    password = attrs.get('password')
    password2 = attrs.get('password2')
    username = attrs.get('username')
    if " " in username:
      raise serializers.ValidationError("No spaces are allowed in username.")

    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return Person.objects.create_user(**validate_data)

class SignInSerializer(serializers.ModelSerializer):
  username = serializers.CharField(max_length=30)
  class Meta:
    model = Person
    fields = ['username', 'password']

class PersonDashboardSerializer(serializers.ModelSerializer):
    trainers = serializers.SerializerMethodField()
    
    class Meta:
        model = Person
        fields = ['username', 'email', 'name', 'age', 'gender', 'is_trainer', 'trainees', 'avatar', 'trainers', 'description','video_call_url']

    def get_trainers(self, obj):
        return get_trainers(obj)

class GetAllUsersSeializer(serializers.ModelSerializer) :
  class Meta:
    model = Person
    fields = ['username', 'email', 'name','is_trainer','trainees','age','gender','avatar','video_call_url','description']

class UpdateUserProfileSerializer(serializers.ModelSerializer):
    # avatar = serializers.ImageField(required=False, allow_null=True)
    remove_avatar = serializers.BooleanField(required=False, write_only=True)

    class Meta:
        model = Person
        fields = ['name', 'age', 'gender', 'email', 'username', 'avatar', 'remove_avatar', 'description']

    def validate_email(self, value):
        user = self.instance
        if Person.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def validate_username(self, value):
        user = self.instance
        if Person.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already in use.")
        return value

    def validate(self, attrs):
        if 'password' in attrs:
            old_password = attrs.get('old_password')
            if not old_password:
                raise serializers.ValidationError({"old_password": "Old password is required to set a new password."})
            if not self.instance.check_password(old_password):
                raise serializers.ValidationError({"old_password": "Old password is incorrect."})
            password = attrs['password']
            try:
                validate_password(password, self.instance)
            except serializers.ValidationError as e:
                raise serializers.ValidationError({"password": list(e.messages)})

        return attrs

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        old_password = validated_data.pop('old_password', None)
        remove_avatar = validated_data.pop('remove_avatar', False)
        print(remove_avatar)
        for attr, value in validated_data.items():
            print(attr, value)
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        if validated_data.get('remove_avatar', False):
            instance.avatar = ''
        elif 'avatar' in validated_data:
            instance.avatar = validated_data['avatar']
        
        instance.save()
        return instance


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'slug', 'website']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_primary', 'alt_text']

class ProductSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'category', 'company', 'sku', 'stock_quantity', 'is_available']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError({"new_password": "New passwords don't match."})
        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def validate_new_password(self, value):
        user = self.context['request'].user
        try:
            validate_password(value, user)
        except serializers.ValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return value