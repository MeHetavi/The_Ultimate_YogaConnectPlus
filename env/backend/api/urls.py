from django.urls import path, include
from .views import SignUp,SignIn, Dashboard, GetAllUsers,BecomeTrainee, UpdateProfile, GetAllProductsByCategory, ChangePasswordView

urlpatterns = [
    path('signUp/', SignUp.as_view(), name='signUp'),
    path('signIn/', SignIn.as_view(), name='signIn'),
    path('dashboard/', Dashboard.as_view(), name='dashboard'),
    path('allUsers/', GetAllUsers.as_view(), name='allusers'),
    path('becomeTrainee/', BecomeTrainee.as_view(), name='becomeTrainee'),
    path('updateProfile/', UpdateProfile.as_view(), name='updateProfile'),
    path('products/', GetAllProductsByCategory.as_view(), name='get_all_products_by_category'),
    path('changePassword/', ChangePasswordView.as_view(), name='change_password'),
]