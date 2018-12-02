

from rest_framework import viewsets

from .models import *
from .serializers import *
from rest_framework.views import APIView


class DeviceViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


class TraineeViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Trainee.objects.all()
    serializer_class = TraineeSerializer



class SensorViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer


class TrainingSessionsViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer



class RecordingViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Recording.objects.all()
    serializer_class = RecordingSerializer


class DataIngress(APIView):
    pass