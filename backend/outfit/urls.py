from django.urls import path, include
from .views import OutfitSelection, OutfitPromptList, OutfitList

urlpatterns = [
    path("select-outfit", OutfitSelection.as_view()),
    path("prompt-outfit", OutfitPromptList.as_view()),
    path("", OutfitList.as_view()),
]
