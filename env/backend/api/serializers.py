from rest_framework import serializers 
from .models import Person
from django.contrib.auth.password_validation import validate_password

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
  class Meta:
    model = Person
    fields = ['username', 'email', 'name', 'age', 'gender','is_trainer','trainees']

class GetAllUsersSeializer(serializers.ModelSerializer) :
  class Meta:
    model = Person
    fields = ['username', 'email', 'name','is_trainer','trainees']

class UpdateUserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    old_password = serializers.CharField(write_only=True, required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = Person
        fields = ['name', 'age', 'gender', 'email', 'username', 'password', 'old_password', 'avatar']

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
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance

