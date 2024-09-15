from django.urls import path, include
from .views import SignUp,SignIn, Dashboard, GetAllUsers,BecomeTrainee, UpdateProfile

urlpatterns = [
    path('signUp/', SignUp.as_view(), name='signUp'),
    path('signIn/', SignIn.as_view(), name='signIn'),
    path('dashboard/', Dashboard.as_view(), name='dashboard'),
    path('allUsers/', GetAllUsers.as_view(), name='allusers'),
    path('becomeTrainee/', BecomeTrainee.as_view(), name='becomeTrainee'),
    path('updateProfile/', UpdateProfile.as_view(), name='updateProfile')
    
]