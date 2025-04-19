
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent





SECRET_KEY = 'django-insecure-!106hpg1xl48qg5li4x4x3^7x8x(uwn8@p01)r8w@ro96svshm'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = ['*']




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
    'corsheaders.middleware.CorsMiddleware', 
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
     "http://127.0.0.1:3000", 
]
CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
    "x-csrftoken",  
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
       "http://127.0.0.1:3000", 
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







DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'railway',
        'USER': 'root',
        'PASSWORD': 'paCscHxwBJMBLGislBFMpbDqIDuhlVQk',
        'HOST': 'switchyard.proxy.rlwy.net',
        'PORT': '14794',
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




LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True




STATIC_URL = 'static/'



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
    "http://localhost:3000", 
]
CORS_ALLOW_ALL_ORIGINS = True 
CSRF_COOKIE_NAME = "csrftoken"
SESSION_COOKIE_SECURE = False 
SESSION_COOKIE_HTTPONLY = False
SESSION_COOKIE_SAMESITE = "None" 
CSRF_COOKIE_SAMESITE = "Lax" 

DEBUG=True
USE_TZ = True 
TIME_ZONE = 'Asia/Kolkata'  



