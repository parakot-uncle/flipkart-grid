from django.urls import path, include
from .views import OutfitSelection, OutfitPromptList

urlpatterns = [
    path("select-outfit", OutfitSelection.as_view()),
    path("prompt-outfit", OutfitPromptList.as_view())
]
