

from rest_framework import viewsets

import numpy as np
import json
import scipy.signal as sig

from .models import *
from .serializers import *

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404



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

    def get_serializer_class(self):
        if self.action == 'list':
            return TraineeSerializer
        if self.action == 'retrieve':
            return TraineeDetailSerializer
        return TraineeSerializer


    def retrieve(self, request, pk=None):
        queryset = Trainee.objects.all()
        trainee = get_object_or_404(queryset, pk=pk)

        device = Device.objects.get(trainee=pk)

        trainee = TraineeSerializer(trainee)
        device = DeviceSerializer(device)

        return Response({"device": device.data, "trainee": trainee.data})



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


class DataIngress(GenericAPIView):

     def post(self, request):

        data = json.loads(request.body.decode("utf-8"))['readings']

        readings = [list(r.values()) for r in data]
        stride_length = calculate_stride_length(readings)

        if not np.isnan(stride_length):
            r = Recording.objects.create(value=stride_length)
            r.save()
            return Response(status=201)
        else:
            return Response(status=400)



def calculate_stride_length(data):

    try:

        # convert the csv of 'vertical' strings in the file
        # to 'horizontal' arrays on ints
        AcXs, AcYs, AcZs, GyXs, GyYs, GyZs, times = \
            np.transpose(np.array(data)).astype(np.int)

        # convert times to milliseconds and start it at 0
        times = np.divide(np.subtract(times, min(times)), 1000)

        # find_peaks find the indices in the array that have peaks. Here
        # we extract the times at which those peaks happened
        def get_peaks (y, x) :
            return [x[i] for i in \
                    sig.find_peaks(y, height = 15000,  prominence=100)[0]]

        AcXs_peaks = get_peaks (AcXs, times)
        AcYs_peaks = get_peaks (AcYs, times)
        AxZs_peaks = get_peaks (AcZs, times)

        # get the difference between datapoints and get the
        # average of those differences
        len = np.mean(np.diff(AcXs_peaks))
        print(len)
        return len

    except Exception as e:
        print("Caught Exception: {} \n data: {}".format(e, data))

