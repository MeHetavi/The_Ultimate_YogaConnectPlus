from django.urls import path, include
from .views import SignUp,SignIn, Dashboard, GetAllUsers

urlpatterns = [
    path('signUp/', SignUp.as_view(), name='signUp'),
    path('signIn/', SignIn.as_view(), name='signIn'),
    path('dashboard/', Dashboard.as_view(), name='dashboard'),
    path('allUsers/', GetAllUsers.as_view(), name='allusers')
]