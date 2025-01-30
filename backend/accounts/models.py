from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)  # Auto-increment Primary Key
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    user_weight = models.FloatField()
    user_height = models.FloatField()
    target_weight = models.FloatField()
    gender = models.CharField(max_length=10)

    class Meta:
        db_table = 'Users'  # Explicitly map this model to your SQL Workbench `Users` table
