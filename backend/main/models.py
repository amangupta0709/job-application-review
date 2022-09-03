from django.db import models

PRIMARY_ROLE_CHOICES = (
    ("Full-Stack Engineer", "full-stack-engineer"),
    ("Frontend Engineer", "frontend-engineer"),
    ("Backend Engineer", "backend-engineer"),
    ("DevOps Engineer", "devops-engineer"),
    ("Mobile Developer", "mobile-developer"),
    ("Data Engineer", "data-engineer"),
    ("Data Scientist", "data-scientist"),
)

STATUS_CHOICES = (
    ("applied", "Applied"),
    ("accepted", "Accepted"),
    ("rejected", "Rejected"),
)


class Candidate(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    primary_role = models.CharField(
        max_length=50, choices=PRIMARY_ROLE_CHOICES, default="full-stack-engineer"
    )
    experience = models.CharField(max_length=1024, blank=True)
    skills = models.TextField(max_length=1024, blank=True, null=True)
    education = models.CharField(max_length=500, blank=True)
    bio = models.TextField(max_length=200, blank=True, null=True)

    email = models.EmailField(max_length=100, unique=True)
    mobile = models.CharField(max_length=15, unique=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    zipcode = models.CharField(max_length=10, blank=True, null=True)
    country = models.CharField(max_length=100)

    website = models.URLField(max_length=1000, blank=True)
    linkedln = models.URLField(max_length=1000, blank=True)
    github = models.URLField(max_length=1000, blank=True)

    resume = models.FileField(upload_to="uploads/resume/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="applied")

    def __str__(self):
        return self.first_name
