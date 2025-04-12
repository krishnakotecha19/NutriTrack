from django.urls import path
from .views import (
    get_logged_in_user, get_food_list, 
    add_food, add_custom_food, get_user_details, 
     get_csrf_token, custom_login, signup_view,add_selected_food,
    get_selected_food,update_history,get_calories,get_full_history
)

urlpatterns = [
    path("signup/", signup_view, name="signup"), 
    path("login/", custom_login, name="custom_login"),
    path("get-user/", get_logged_in_user, name="get-user"),  
    path("food/", get_food_list, name="get_food_list"),  # Search food
    path("add-food/", add_food, name="add_food"),  # Add food
    path("add-custom-food/", add_custom_food, name="add_custom_food"),  # Add custom food
   
  path('user/', get_user_details, name='get-user'), 

    path("csrf/", get_csrf_token, name="csrf"),
    path("selected-food/", add_selected_food, name="add_selected_food"),
path("selected-food/history/", get_selected_food, name="fetch_selected_food"),  
    path("update_history/", update_history, name="update_history"),  
    path('get_calories/', get_calories, name='get_calories'),
     path("get_full_history/", get_full_history, name="get_full_history"),

]
