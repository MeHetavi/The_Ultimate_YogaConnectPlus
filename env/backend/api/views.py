from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Person, Category, Product, ProductImage
from .serializers import (
    GetAllUsersSeializer, PersonRegistrationSerializer, SignInSerializer, 
    PersonDashboardSerializer, UpdateUserProfileSerializer,
    CategorySerializer, ProductSerializer, ProductImageSerializer,ChangePasswordSerializer
)
from django.contrib.auth import authenticate
from .renderers import PersonRenderer
from rest_framework_simplejwt.tokens import RefreshToken

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

        products = Product.objects.filter(id__in=data['items_in_cart'])
        serializer = ProductSerializer(products, many=True)
        data['items_in_cart'] = serializer.data

        orders = Product.objects.filter(id__in=data['orders'])
        serializer = ProductSerializer(orders, many=True)
        data['orders'] = serializer.data

        return Response(data, status=status.HTTP_200_OK)

class GetAllUsers(APIView):
    renderer_classes = [PersonRenderer]
    permission_classes = []
    def get(self, request, format=None):
        # Filter trainers and exclude the current user
        if request.user:
            trainers = Person.objects.filter(is_trainer=True)
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
        profile_username = request.data.get('profile_username')
        profile = Person.objects.get(username=profile_username)
        profile.trainees.add(request.user)
        return Response( status=status.HTTP_200_OK)
    
class RemoveTrainee(APIView):
    renderer_classes = [PersonRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        profile_username = request.data.get('profile_username')
        profile = Person.objects.get(username=profile_username)
        profile.trainees.remove(request.user)
        return Response(status=status.HTTP_200_OK)

class UpdateProfile(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PersonRenderer]

    def put(self, request, format=None):
        serializer = UpdateUserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            response_data = serializer.data
            response_data['avatar_removed'] = 'remove_avatar' in request.data and request.data['remove_avatar']
            return Response(response_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAllProductsByCategory(APIView):
    def get(self, request, format=None):
        categories = Category.objects.all()
        data = []

        for category in categories:
            category_data = CategorySerializer(category).data
            products = Product.objects.filter(category=category)
            product_data = []

            for product in products:
                product_serializer = ProductSerializer(product).data
                images = ProductImage.objects.filter(product=product)
                image_data = ProductImageSerializer(images, many=True).data
                product_serializer['images'] = image_data
                product_data.append(product_serializer)

            category_data['products'] = product_data
            data.append(category_data)

        return Response(data, status=status.HTTP_200_OK)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PersonRenderer]

    def put(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            # Change the password
            user.set_password(new_password)
            user.save()

            return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
def videoCall(request):
    # if access_token:
    # print(access_token)
    context = {
        'username': request.user.username,
        'user_id': str(request.user.id)  # Convert to string to ensure it's JSON serializable
    }
    return render(request, 'VideoCall.html', context)

class SaveVideoCallURL(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PersonRenderer]

    def post(self, request, format=None):
        url = request.data.get('url')
        request.user.video_call_url = url
        request.user.save()
        return Response(status=status.HTTP_200_OK)
    
    def put(self, request, format=None):
        request.user.video_call_url = None
        request.user.save()
        return Response(status=status.HTTP_200_OK)
    

class AddToCart(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PersonRenderer]

    def post(self, request, format=None):
        product_id = request.data.get('product_id')
        product = Product.objects.get(id=product_id)
        request.user.items_in_cart.add(product)
        return Response(status=status.HTTP_200_OK)  
    
class RemoveFromCart(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [PersonRenderer]

    def post(self, request, format=None):
        product_id = request.data.get('product_id')
        product = Product.objects.get(id=product_id)
        request.user.items_in_cart.remove(product)
        return Response(status=status.HTTP_200_OK) 
    
class PlaceOrder(APIView):  
    permission_classes = [IsAuthenticated]
    renderer_classes = [PersonRenderer]

    def post(self, request, format=None):
        items = request.data.get('items')
        user = request.user
        
        # Reduce stock quantity for each ordered item
        for item in items:
            product_id = item.get('id')
            quantity = 1  # Default to 1 if quantity is not provided
            
            try:
                product = Product.objects.get(id=product_id)
                product.stock_quantity -= quantity
                product.save()
            except Product.DoesNotExist:
                return Response({"error": f"Product with id {product_id} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Add items to user's orders
        user.orders.add(*[item['id'] for item in items])
        
        # Clear the user's cart
        user.items_in_cart.clear()
        
        return Response({"message": "Order placed successfully"}, status=status.HTTP_200_OK)