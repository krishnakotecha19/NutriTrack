from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Food

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password2', 'email']  # Add other fields if needed
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user
class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['food_id', 'food_name', 'calories_kcal']

        from rest_framework import serializers
from .models import SelectedFood

class SelectedFoodSerializer(serializers.ModelSerializer):
    selectedAt = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%SZ")
    class Meta:
        model = SelectedFood
        fields = ['id', 'food_name', 'calories_kcal', 'selected_at', 'session_key']
        read_only_fields = ['id', 'selected_at', 'session_key']
