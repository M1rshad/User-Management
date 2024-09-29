from django.urls import path, include
from .views import RegisterView, LoginView, UserManagementView

urlpatterns = [
    path('signup', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user-management', UserManagementView.as_view()),
]