"""
Django settings for abdal project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-(5)xa9d&u1)+#rnd_mrw@0_e6g87z(i!d$8+06orf&9of(30y5'

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True



ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    "corsheaders",
    'doc',
    'django_extensions',
    'after_response',
    'rest_framework'
    ]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    # 'doc.middleware_logger',
    #'doc.middleware_logger.logger_middleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1",
    "https://irhooshyar.com"
]

ROOT_URLCONF = 'abdal.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
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

WSGI_APPLICATION = 'abdal.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASE_ROUTERS = ['routers.db_routers.FarsiRouter', 'routers.db_routers.EnglishRouter']


DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': str(BASE_DIR / 'db.sqlite3'),
    # }
    'default': {},
    'Fa_DataBase': {
        'ENGINE': 'django.db.backends.mysql',
        'CONN_MAX_AGE': 60,
        'NAME': 'CyberMapDB_v4' if os.environ.get('DB_FA_NAME') is None else os.environ.get('DB_FA_NAME'),
        # 'NAME': 'StandardDB_v1',
        'USER': 'dbadmin',
        'PASSWORD': '123456789',
        'HOST': 'localhost' if os.environ.get('DB_URL') is None else
        os.environ.get('DB_URL'),  # Or an IP Address that your DB is hosted on
        'PORT': '3306' if os.environ.get('DB_PORT') is None else os.environ.get('DB_PORT')
        ,
        'TEST': {
            "DEPENDENCIES": []
        }
        # 'OPTIONS': {
        #     'charset': 'utf8mb4'  # This is the important line
        # }
    },
    # 'En_DataBase': {
    #         'ENGINE': 'django.db.backends.mysql',
    #         'CONN_MAX_AGE': 60,
    #         'NAME': 'CyberMapDB_En_v1' if os.environ.get('DB_EN_NAME') is None else os.environ.get('DB_EN_NAME'),
    #         'USER': 'dbadmin',
    #         'PASSWORD': '123456789',
    #         'HOST': 'localhost' if os.environ.get('DB_URL') is None else
    #         os.environ.get('DB_URL'),  # Or an IP Address that your DB is hosted on
    #         'PORT': '3306' if os.environ.get('DB_PORT') is None else os.environ.get('DB_PORT')
    #         ,
    #         # 'OPTIONS': {
    #         #     'charset': 'utf8mb4'  # This is the important line
    #         # }
    #     },
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Tehran'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'


MEDIA_ROOT = os.path.join(BASE_DIR, 'media_cdn')
MEDIA_URL = '/media/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


LOCAL_SETTING = {
    'ENABLE_BERT' : False,
    'NUMBER_OF_THREAD': 15
}

# ELASTICSEARCH_DSL={
#     'default': {
#         'hosts': 'http://37.156.144.109:9200'
#     },
# }
