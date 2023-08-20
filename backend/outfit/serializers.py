from rest_framework import serializers
from .models import Outfit, Outfit_Accessory, Outfit_Occasion

class OutfitSerializer(serializers.ModelSerializer):
  class Meta:
    model = Outfit
    fields = ("id", "topwear", "bottomwear", "footwear", "gender")

class OutfitAccessorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Outfit_Accessory
    fields = ("id", "accessory", "outfit")

class OutfitOccasionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Outfit_Occasion
    fields = ("id", "occasion", "outfit")
