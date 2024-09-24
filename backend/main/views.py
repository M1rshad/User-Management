from django.shortcuts import render
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class RegisterView(APIView):
    def post(self, request):
        _data = request.data 
        serializer = RegisterSerializer(data = _data)

        if not serializer.is_valid():
            return Response({'message':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({'message':'User created successfully'}, status=status.HTTP_201_CREATED)
        