
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-!106hpg1xl48qg5li4x4x3^7x8x(uwn8@p01)r8w@ro96svshm'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['192.168.230.140', 'localhost', '127.0.0.1']




# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'backend',
    'accounts',
    'corsheaders',
    'rest_framework',

    
]


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # ✅ Add this at the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]




# settings.py
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000", 
     "http://127.0.0.1:3000", # Add your frontend URL
]
CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
    "x-csrftoken",  # ✅ Allow CSRF token to be sent in headers
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
       "http://127.0.0.1:3000",  # Allow frontend
]

CORS_ALLOW_CREDENTIALS = True  
ROOT_URLCONF = "backend.urls"


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'





# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # MySQL engine
        'NAME': 'calorietracker',          # Replace with the actual database name
        'USER': 'root',               # MySQL username
        'PASSWORD': 'root',           # MySQL password
        'HOST': 'localhost',                   # Or your database server's IP
        'PORT': '3306',                        # Default MySQL port
    }
}



# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', 
        
    ]
}
REST_FRAMEWORK = {
    'DATETIME_FORMAT': "%Y-%m-%d %H:%M:%S",
}

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",  # Add your frontend URL
]
CORS_ALLOW_ALL_ORIGINS = True 
CSRF_COOKIE_NAME = "csrftoken"
SESSION_COOKIE_SECURE = False  # Keep this False in development
SESSION_COOKIE_HTTPONLY = False
SESSION_COOKIE_SAMESITE = "None" 
CSRF_COOKIE_SAMESITE = "Lax"  # Allow requests from the frontend
 # Important for cross-origin requests
# AUTHENTICATION_BACKENDS = ['accounts.backends.EmailBackend']
# Disable CSRF validation in development for testing

# Allow for cross-origin requests

DEBUG=True
USE_TZ = True  # Ensure this is set
TIME_ZONE = 'Asia/Kolkata'  # Change to your timezone if needed



