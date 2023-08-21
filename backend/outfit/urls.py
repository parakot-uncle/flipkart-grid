from django.urls import path, include
from .views import OutfitSelection, OutfitPromptList, OutfitList, OutfitPreview

urlpatterns = [
    path("select-outfit", OutfitSelection.as_view()),
    path("prompt-outfit", OutfitPromptList.as_view()),
    path("<int:pk>/", OutfitPreview.as_view()),
    path("", OutfitList.as_view()),
]
