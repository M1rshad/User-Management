from django.shortcuts import render
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.authentication import TokenAuthentication   
from django.http import JsonResponse
from django.contrib.auth.models import User



class RegisterView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        _data = request.data 
        serializer = RegisterSerializer(data = _data)

        if not serializer.is_valid():
            errors = serializer.errors
    
            if 'non_field_errors' in errors:
                return Response({'message': errors['non_field_errors'][0]}, status=status.HTTP_400_BAD_REQUEST)
    
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)


        serializer.save()
        return Response({'message':'User created successfully'}, status=status.HTTP_201_CREATED)
        

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        _data = request.data 
        serializer = LoginSerializer(data=_data)

        if not serializer.is_valid():
            return Response({'message' : serializer.errors }, status=status.HTTP_400_BAD_REQUEST)
        
        username=serializer.validated_data['username']
        password=serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if not user:
            return Response({'message' : 'Invalid Credentials' }, status=status.HTTP_400_BAD_REQUEST)
        
        token,_ = Token.objects.get_or_create(user=user)
        
        return Response({'message': 'Login successfull','username': user.username, 'is_admin': user.is_superuser,  'token': str(token)}, status=status.HTTP_200_OK)
    

class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        _data = request.data 
        serializer = LoginSerializer(data=_data)

        if not serializer.is_valid():
            return Response({'message' : serializer.errors }, status=status.HTTP_400_BAD_REQUEST)
        
        username=serializer.validated_data['username']
        password=serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if not user :
            return Response({'message' : 'Invalid Credentials' }, status=status.HTTP_400_BAD_REQUEST)
        
        if user.is_superuser: 
            token,_ = Token.objects.get_or_create(user=user)    
            return Response({'message': 'Login successfull','username': user.username, 'is_admin': user.is_superuser,  'token': str(token)}, status=status.HTTP_200_OK)
        else:
            return Response({'message' : 'Please enter the correct username and password for a staff account.' }, status=status.HTTP_403_FORBIDDEN)

class AdminPanelView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    def get(self, request):
        users  = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    

