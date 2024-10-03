from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, AdminPanelView, AdminLoginView
from .serializers import UserViewSets

router = DefaultRouter()
router.register(r'users', UserViewSets)

urlpatterns = [
    path('', include(router.urls)),
    path('signup', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('admin-login', AdminLoginView.as_view()),
    path('admin-panel', AdminPanelView.as_view()),

]