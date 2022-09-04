from django.urls import path

from main.views import AllApplicationAPIView, CandidateApplicationAPIView

urlpatterns = [
    path("", AllApplicationAPIView.as_view(), name="all-application-view"),
    path(
        "<int:pk>/",
        CandidateApplicationAPIView.as_view(),
        name="candidate-application-view",
    ),
]
