from django.db import models

GENDER_CHOICES = (("girl", "girl"), ("boy", "boy"), ("man", "man"), ("woman", "woman"))

OCCASION_CHOICES = (
    ("formal", "formal"), 
    ("casual", "casual"), 
    ("sports", "sports"), 
    ("ethnic", "ethnic"), 
    ("smart casual", "smart casual"), 
    ("travel", "travel"), 
    ("party", "party"), 
    ("home", "home"))

class Outfit(models.Model):
    topwear = models.IntegerField()
    bottomwear = models.IntegerField()
    footwear = models.IntegerField()
    gender = models.CharField(choices=GENDER_CHOICES, max_length=15)


class Outfit_Accessory(models.Model):
    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)
    accessory = models.IntegerField()

class Outfit_Occasion(models.Model):
    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)
    occasion = models.CharField(choices=OCCASION_CHOICES, max_length=15)

