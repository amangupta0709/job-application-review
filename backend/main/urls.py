from backend.main.views import AllApplicationAPIView, CandidateApplicationAPIView
from django.urls import path

urlpatterns = [
    path("", AllApplicationAPIView.as_view(), name="all-application-view"),
    path(
        "<int:pk>/",
        CandidateApplicationAPIView.as_view(),
        name="candidate-application-view",
    ),
]
