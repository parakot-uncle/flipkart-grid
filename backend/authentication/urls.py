from django.urls import path, include
from .views import Login, SignUp

urlpatterns = [
    path("login/", Login.as_view()),
    path("signup/", SignUp.as_view()),
]
