from rest_framework import serializers 
from .models import Person

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

