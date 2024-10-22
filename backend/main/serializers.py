from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password



# Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    def validate(self, data):
        # Check if username already exists
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('Username already exists')

        # Check if email already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError('Email already exists')
            
        return data

    def create(self, validated_data):
        # Create user with hashed password
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

    class Meta:
        model = User
        fields = ['username', 'email', 'password']


# Login Serializer
class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User
        fields = ['username', 'password']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_superuser', 'password']


class UserViewSets(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = [TokenAuthentication]

    def partial_update(self, request, *args, **kwargs):
        # Get the user instance
        user = self.get_object()

        # Check if the password is being updated
        if 'password' in request.data:
            # Hash the new password
            new_password = make_password(request.data['password'])
            request.data['password'] = new_password

        return super().partial_update(request, *args, **kwargs)


