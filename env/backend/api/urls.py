from django.urls import path, include
from .views import SignUp,SignIn, Dashboard, GetAllUsers,BecomeTrainee, RemoveTrainee, UpdateProfile, GetAllProductsByCategory, ChangePasswordView, videoCall, SaveVideoCallURL, AddToCart, RemoveFromCart, PlaceOrder

urlpatterns = [
    path('signUp/', SignUp.as_view(), name='signUp'),
    path('signIn/', SignIn.as_view(), name='signIn'),
    path('dashboard/', Dashboard.as_view(), name='dashboard'),
    path('allUsers/', GetAllUsers.as_view(), name='allusers'),
    path('becomeTrainee/', BecomeTrainee.as_view(), name='becomeTrainee'),
    path('removeTrainee/', RemoveTrainee.as_view(), name='removeTrainee'),
    path('updateProfile/', UpdateProfile.as_view(), name='updateProfile'),
    path('products/', GetAllProductsByCategory.as_view(), name='get_all_products_by_category'),
    path('changePassword/', ChangePasswordView.as_view(), name='change_password'),
    path('videoCall/', videoCall, name='videoCall'),
    path('videoCallURL/', SaveVideoCallURL.as_view(), name='saveVideoCallURL'),
    path('addToCart/', AddToCart.as_view(), name='addToCart'),
    path('removeFromCart/', RemoveFromCart.as_view(), name='removeFromCart'),
    path('placeOrder/', PlaceOrder.as_view(), name='placeOrder'),
]