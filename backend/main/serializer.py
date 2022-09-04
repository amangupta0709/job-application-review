from rest_framework import serializers

from main.models import Candidate

# PRIMARY_ROLE_CHOICES = (
#     ("Full-Stack Engineer", "full-stack-engineer"),
#     ("Frontend Engineer", "frontend-engineer"),
#     ("Backend Engineer", "backend-engineer"),
#     ("DevOps Engineer", "devops-engineer"),
#     ("Mobile Developer", "mobile-developer"),
#     ("Data Engineer", "data-engineer"),
#     ("Data Scientist", "data-scientist"),
# )

# STATUS_CHOICES = (
#     ("applied", "Applied"),
#     ("accepted", "Accepted"),
#     ("rejected", "Rejected"),
# )


class ApplicationListSerializer(serializers.ModelSerializer):
    # candidate_id = serializers.IntegerField()
    # first_name = serializers.CharField()
    # last_name = serializers.CharField()
    # primary_role = serializers.ChoiceField(choices=PRIMARY_ROLE_CHOICES)
    # # resume = serializers.FileField()
    # # updated_at = serializers.DateTimeField()
    # # status = serializers.ChoiceField(choices=STATUS_CHOICES)

    class Meta:
        model = Candidate
        fields = (
            "id",
            "first_name",
            "last_name",
            "primary_role",
            "resume",
            "updated_at",
            "status",
        )


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = "__all__"
