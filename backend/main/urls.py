from django.urls import path, include
from .views import RegisterView, LoginView, AdminPanelView, AdminLoginView

urlpatterns = [
    path('signup', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('admin-login', AdminLoginView.as_view()),
    path('admin-panel', AdminPanelView.as_view()),
]