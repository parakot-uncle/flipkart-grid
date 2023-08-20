from django.db import models

GENDER_CHOICES = (("girl", "girl"), ("boy", "boy"), ("man", "man"), ("woman", "woman"))

class Account(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=8)
    gender = models.CharField(max_length=15, choices=GENDER_CHOICES)
    username = models.CharField(max_length=20)

    def __str__(self):
        return self.username