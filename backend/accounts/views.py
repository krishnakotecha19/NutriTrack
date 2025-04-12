from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from .models import Food
from .serializers import UserSerializer, FoodSerializer
from django.db.models.functions import Lower 
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User





# ----------------------------- USER AUTHENTICATION ---------------------------- #

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view


from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def signup_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            email = data.get("email")
            password = data.get("password")

            if not username or not email or not password:
                return JsonResponse({"error": "All fields are required"}, status=400)

            # Check if the user already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already registered"}, status=400)

            # ✅ Create user in Django's built-in `auth_user` model
            user = User.objects.create_user(
                username=username, 
                email=email, 
                password=password  # `create_user()` automatically hashes password
            )

            return JsonResponse({"message": "User registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def custom_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # ✅ Get user from Django's `User` model
            user = User.objects.filter(email=email).first()

            if user is not None:
                # ✅ Authenticate using Django’s built-in authentication
                authenticated_user = authenticate(username=user.username, password=password)

                if authenticated_user:
                    return JsonResponse({
                        "message": "Login successful",
                        "user_id": user.id  # ✅ Return user_id for frontend storage
                    }, status=200)
                else:
                    return JsonResponse({"error": "Invalid email or password"}, status=401)
            else:
                return JsonResponse({"error": "User not found"}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    return JsonResponse({"csrfToken": get_token(request)})



# Get Logged-in User API
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json

# Assuming you are storing weight & height in a custom User model
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

def get_logged_in_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not logged in"}, status=401)
    
    return JsonResponse({
        "username": request.user.username,
        "email": request.user.email,
        "user_weight": getattr(request.user, "user_weight", "Not Set"),
        "user_height": getattr(request.user, "user_height", "Not Set"),
    }, status=200)



@csrf_exempt
def update_user_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = request.user

        if not user.is_authenticated:
            return JsonResponse({"error": "User not logged in"}, status=401)

        if "weight" in data:
            user.user_weight = data["weight"]

        if "height" in data:
            user.user_height = data["height"]

        user.save()
        return JsonResponse({"message": "User data updated successfully!"})

    return JsonResponse({"error": "Invalid request"}, status=400)


# ----------------------------- FOOD MANAGEMENT ---------------------------- #
from django.http import JsonResponse
from django.db.models.functions import Lower
from .models import Food
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_food_list(request):
    search_query = request.GET.get('search', '')
    if search_query:
        foods = Food.objects.annotate(lower_name=Lower('food_name')).filter(lower_name__icontains=search_query)
    else:
        foods = Food.objects.all()

    if not foods.exists():
        return JsonResponse({"message": "No food found"}, status=404)

    food_list = list(foods.values('food_name', 'calories_kcal'))
    return JsonResponse(food_list, safe=False)



@api_view(["POST"])
def add_food(request):
    print("Received POST request:", request.data)  # ✅ Check if the request reaches Django
    
    serializer = FoodSerializer(data=request.data)
    if serializer.is_valid():
        food = serializer.save()
        print("Food saved:", food.food_name, food.calories_kcal)  # ✅ Check if the data is stored
        return Response({"message": "Food item added successfully!"}, status=status.HTTP_201_CREATED)
    
    print("Validation errors:", serializer.errors)  # ✅ If data is invalid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Food List View (no changes needed)
class FoodList(APIView):
    def get(self, request):
        food_items = Food.objects.all()  # Fetch all food items
        serializer = FoodSerializer(food_items, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def add_custom_food(request):
    try:
        # ✅ Correct way to access request data in Django REST Framework
        data = request.data

        # ✅ Ensure correct field names match your model
        food = Food.objects.create(
            food_name=data.get('food_name'),
            calories_kcal=data.get('calories_kcal'),

        )

        return Response({
            "message": "Food added successfully",
            "id": food.id,
            "food_name": food.food_name,
            "calories_kcal": food.calories_kcal
        }, status=201)

    except Exception as e:
        print("Error:", str(e))  # ✅ Print error in Django logs
        return Response({"error": str(e)}, status=500)
  
    return JsonResponse({"error": "Invalid request method"}, status=405)
@api_view(['GET'])
def get_user_details(request):
    user_id = request.GET.get('user_id')  # Fetch user_id from query parameter
    if user_id:
        try:
            user = User.objects.get(id=user_id)
            return Response({"username": user.username, "email": user.email})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import SelectedFood, User

@csrf_exempt
def add_selected_food(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")  # ✅ Get user_id from frontend
            food_name = data.get("food_name")
            calories_kcal = data.get("calories_kcal")

            if not user_id:
                return JsonResponse({"error": "User ID is required"}, status=400)

            user = User.objects.get(id=user_id)  # ✅ Fetch user from database

            # ✅ Store food along with user_id
            selected_food = SelectedFood.objects.create(
                user=user,
                food_name=food_name,
                calories_kcal=calories_kcal
            )
            return JsonResponse({"message": "Food added successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

   


@csrf_exempt
def get_selected_food(request):
    if request.method == "GET":
        user_id = request.GET.get("user_id")  # Get user_id from query params

        if not user_id:
            return JsonResponse({"error": "User ID is required"}, status=400)

        try:
            user_id = int(user_id)
            if not User.objects.filter(id=user_id).exists():
                return JsonResponse({"error": "User not found"}, status=404)

            selected_foods = SelectedFood.objects.filter(user_id=user_id).values("food_name", "calories_kcal", "selected_at")

            # Format the datetime for JSON
            selected_foods_list = [
                {
                    "food_name": food["food_name"],
                    "calories_kcal": food["calories_kcal"],
                    "selected_at": food["selected_at"].isoformat(),
                }
                for food in selected_foods
            ]

            return JsonResponse({"selected_foods": selected_foods_list}, status=200, safe=False)

        except ValueError:
            return JsonResponse({"error": "Invalid user ID format"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


from django.http import JsonResponse
from django.utils.timezone import now
from django.db.models import Sum, DateField
from django.db.models.functions import Cast
from django.contrib.auth.models import User
from .models import SelectedFood, History

def update_history(user_id):
    today = now().date()  # safer than localdate()

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None

    # ✅ Filter food entries where selected_at (converted to date) = today
    foods_today = SelectedFood.objects.filter(
        user=user
    ).annotate(
        selected_date=Cast("selected_at", output_field=DateField())
    ).filter(
        selected_date=today
    )

    print("🧾 Food items today:", foods_today.count())
    for f in foods_today:
        print(f.food_name, "|", f.selected_at)

    # ✅ Sum total calories
    total_calories = foods_today.aggregate(Sum("calories_kcal"))["calories_kcal__sum"] or 0
    total_calories = int(total_calories)

    # ✅ Get or create today's history record
    history, created = History.objects.get_or_create(
        user=user,
        date=today,
        defaults={"total_calories": total_calories}
    )

    if not created:
        history.total_calories = total_calories
        history.save()
        print("✏️ Updated existing history record.")

    print(f"✅ Total Calories saved in history: {history.total_calories}")
    return history


# ✅ 2. API endpoint to manually trigger history update
def update_history_view(request):
    user_id = request.GET.get("user_id")

    if not user_id:
        return JsonResponse({"error": "Missing user_id"}, status=400)

    try:
        user_id = int(user_id)
    except ValueError:
        return JsonResponse({"error": "Invalid user_id"}, status=400)

    history = update_history(user_id)

    if history is None:
        return JsonResponse({"error": "User not found"}, status=404)

    return JsonResponse({
        "message": "History updated",
        "total_calories": history.total_calories
    })

from django.utils.timezone import localdate

# ✅ 3. API to get today’s calories after updating
def get_calories(request):
    user_id = request.GET.get("user_id")

    if not user_id:
        return JsonResponse({"error": "Missing user_id"}, status=400)

    try:
        user_id = int(user_id)
    except ValueError:
        return JsonResponse({"error": "Invalid user_id"}, status=400)

    today = localdate()
    print("🔥 update_history called for user:", user_id)

    # 🔄 Always refresh the history before fetching
    history = update_history(user_id)

    if history:
        print(f"📊 Calories for User {user_id} on {today}: {history.total_calories}")
        return JsonResponse({"total_calories": history.total_calories})
    else:
        print(f"⚠️ No history found for User {user_id} on {today}")
        return JsonResponse({"total_calories": 0})
 
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_full_history(request):
    user_id = request.GET.get("user_id")

    if not user_id:
        return JsonResponse({"error": "Missing user_id"}, status=400)

    try:
        user_id = int(user_id)
        user = User.objects.get(id=user_id)
    except (ValueError, User.DoesNotExist):
        return JsonResponse({"error": "Invalid or non-existent user_id"}, status=404)

    # 🔄 Optional: Update today's history before fetching all
    update_history(user_id)

    # 📅 Get all history entries for the user, sorted by date (latest first)
    history_entries = History.objects.filter(user=user).order_by("-date")

    print("📚 Fetched history entries:", history_entries.count())

    data = [
        {
            "date": entry.date.strftime("%Y-%m-%d"),
            "total_calories": entry.total_calories
        }
        for entry in history_entries
    ]

    return JsonResponse({"history": data})
