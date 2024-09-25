from rest_framework import serializers
from django.contrib.auth.models import User


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
