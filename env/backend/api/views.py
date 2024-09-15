from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .models import Person
from .serializers import GetAllUsersSeializer, PersonRegistrationSerializer, SignInSerializer, PersonDashboardSerializer, UpdateUserProfileSerializer
from django.contrib.auth import authenticate
from .renderers import PersonRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

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
        data = person_serializer.data.copy()
        trainees = []
        for id in person_serializer.data['trainees']:
            trainees.append(Person.objects.get(id=id).username)
        data['trainees'] = trainees
        return Response(data, status=status.HTTP_200_OK)

class GetAllUsers(APIView):
    renderer_classes = [PersonRenderer]
    permission_classes = []  # Ensure the user is authenticated

    def get(self, request, format=None):
        # Filter trainers and exclude the current user
        if request.user:
            trainers = Person.objects.filter(is_trainer=True).exclude(username=request.user.username)
        else:
            trainers = Person.objects.filter(is_trainer=True)
        serializer = GetAllUsersSeializer(trainers, many=True)

        for trainer in serializer.data:
            trainees = []
            for trainee_id in trainer['trainees']:
                trainee = Person.objects.get(id=trainee_id)
                trainees.append(trainee.username)
            trainer['trainees'] = trainees

        return Response(serializer.data, status=status.HTTP_200_OK)

class BecomeTrainee(APIView):
    renderer_classes = [PersonRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        profile = request.data.get('profile')
        profile = Person.objects.get(username=profile['username'])
        profile.trainees.add(request.user)
        return Response( status=status.HTTP_200_OK)

class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PersonRenderer]

    def put(self, request, format=None):
        serializer = UpdateUserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            response_data = serializer.data
            response_data['password_updated'] = 'password' in request.data
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)