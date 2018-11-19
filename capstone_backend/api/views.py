
from rest_framework import viewsets


from .models import *
from .serializers import *

class DeviceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


class TraineeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = Trainee.objects.all()
    serializer_class = TraineeSerializer