from .models import Account
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("id", "username", "email", "gender")

    def validate(self, attrs):
        email_set = Account.objects.filter(email=attrs["email"])
        if email_set.exists():
            raise serializers.ValidationError({"email": "Email is already in use"})
        
        username_set = Account.objects.filter(username=attrs["username"])
        if username_set.exists():
            raise serializers.ValidationError({"username": "Username already exists"})
        
        return attrs