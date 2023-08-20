from rest_framework import generics
from django.http import JsonResponse
from rest_framework.views import APIView
from .serializers import AccountSerializer
from .models import Account
import json


class Login(generics.ListAPIView):
    # def post(self, request, format=None):
    #     username = request.data.get("username")
    #     password = request.data.get("password")

    #     print(Account.objects.all().first())
    #     result_set = Account.objects.filter(username=username, password=password)

    #     if result_set.exists():
    #         return JsonResponse({"user": json.dumps(result_set.first())})

    #     return JsonResponse({"message": "Invalid credentials"}, status=401)

    serializer_class = AccountSerializer
    
    def get_queryset(self):
        username = self.request.data.get("username")
        password = self.request.data.get("password")
        return Account.objects.filter(username=username, password=password)


class SignUp(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    