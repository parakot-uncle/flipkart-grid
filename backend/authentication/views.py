from rest_framework import generics
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import AccountSerializer
from .models import Account
import json


class Login(APIView):
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")

        result_set = Account.objects.filter(username=username, password=password)

        if result_set.exists():
            user = result_set.first()
            return JsonResponse(
                {
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "gender": user.gender,
                    }
                }
            )

        return JsonResponse({"message": "Invalid credentials"}, status=401)


class SignUp(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
