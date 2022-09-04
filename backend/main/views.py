from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from main.models import Candidate
from main.serializer import ApplicationListSerializer, ApplicationSerializer


class AllApplicationAPIView(APIView):
    def get(self, request, *args):

        objs = Candidate.objects.all()
        serializer = ApplicationListSerializer(objs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # create new application
    @transaction.atomic
    def post(self, request):
        data = request.data.get("data")
        try:
            obj = Candidate(**data)
            obj.save()
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "data created"}, status=status.HTTP_201_CREATED)


class CandidateApplicationAPIView(APIView):
    # get application detail view
    def get(self, request, *args, **kwargs):
        candidate_id = kwargs.get("pk")
        try:
            obj = Candidate.objects.get(id=candidate_id)
        except Exception as e:
            return Response(
                {"message": "invalid id"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ApplicationSerializer(obj)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # update application status
    def patch(self, request, *args, **kwargs):
        candidate_id = kwargs.get("pk")
        data = request.data.get("data")
        try:
            obj = Candidate.objects.get(id=candidate_id)
        except Exception as e:
            return Response(
                {"message": "invalid id"}, status=status.HTTP_400_BAD_REQUEST
            )

        obj.status = data["status"]
        obj.save()

        return Response({"message": "status updated"}, status=status.HTTP_202_ACCEPTED)
