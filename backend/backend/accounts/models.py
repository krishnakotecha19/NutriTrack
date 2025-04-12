from django.contrib.auth.models import User 
from django.db import models

class customuser(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    user_weight = models.FloatField(null=True, blank=True)
    user_height = models.FloatField(null=True, blank=True)
    target_weight = models.FloatField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], null=True, blank=True)
    first_name = None  # Remove first_name
    last_name = None  # Remove last_name

    class Meta:
        db_table = 'Users'  # Explicitly map this model to your SQL Workbench `Users` table
from django.db import models



class Food(models.Model):
    id = models.AutoField(primary_key=True)
    food_name = models.CharField(max_length=255)
    calories_kcal = models.FloatField()
    class Meta:
        db_table = 'food'   



from django.db import models
from django.utils.timezone import now

from django.db import models
from django.contrib.auth.models import User

class SelectedFood(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id',null=True)  # ✅ Map to existing user_id column
    food_name = models.CharField(max_length=255)
    calories_kcal = models.FloatField()
    selected_at = models.DateTimeField(default=now)
    session_key = models.CharField(max_length=40, null=True, blank=True)  

    class Meta:
        db_table = 'selectedfood'  # ✅ Ensure it maps to the correct table
        ordering = ['selected_at']

    def __str__(self):
        return f"{self.user.username} - {self.food_name} ({self.calories_kcal} kcal)"
    
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Refers to user_id
    date = models.DateField(default=now)  # Date column
    total_calories = models.IntegerField(default=0)  # Default 0 if not provided

    class Meta:
        unique_together = ('user', 'date') 
        db_table = "history" # Ensures only one entry per user per date

    def __str__(self):
        return f"{self.user.username} - {self.date}: {self.total_calories} kcal"
