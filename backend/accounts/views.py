from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Signup View
class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        user = User.objects.create(
            username=username,
            email=email,
            password=password  # Storing password as plain text (no hashing)
        )
        user.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)  # Get user by email
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password!"}, status=status.HTTP_400_BAD_REQUEST)

        # Compare the plain text password with the one stored in the database
        if user.password == password:
            return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid email or password!"}, status=status.HTTP_400_BAD_REQUEST)
