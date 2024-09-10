from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .models import Person
from .serializers import  GetAllUsersSeializer, PersonRegistrationSerializer,SignInSerializer,PersonDashboardSerializer
from django.contrib.auth import authenticate
from .renderers import PersonRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# For email.
from django.conf import settings
from django.core.mail import send_mail

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class SignUp(APIView):
    renderer_classes = [PersonRenderer]
    def post(self, request, format=None):
        serializer = PersonRegistrationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token':token,'msg':"Signed In Successfully."}, status = status.HTTP_201_CREATED)
        return Response({'msg':serializer.errors},  status = status.HTTP_400_BAD_REQUEST)
    
class SignIn(APIView):
    renderer_classes = [PersonRenderer]
    def post(self, request, format=None):
        serializer = SignInSerializer( data = request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            
            user = authenticate(username=username, password=password)

            if user:
                token = get_tokens_for_user(user)
                return Response({'token':token,'msg':"Signed In Successfully."}, status = status.HTTP_200_OK)
            return Response({'errors':{"non_field_errors":"Invalid Username Or Password."}}, status = status.HTTP_404_NOT_FOUND)
  

class Dashboard(APIView):
    renderer_classes = [PersonRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        person_serializer = PersonDashboardSerializer(request.user)
        data = person_serializer.data
        
        print(person_serializer.data)
        return Response(data, status=status.HTTP_200_OK)

class GetAllUsers(APIView):
    renderer_classes = [PersonRenderer]
    permission_classes = []
    def get(self, request, format=None):
        users = Person.objects.all()
        serializer = GetAllUsersSeializer(users,many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
