from rest_framework import serializers
from .models import *





class TraineeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainee
        fields = '__all__'







class RecordingSerializer(serializers.ModelSerializer):


    class Meta:
        model = Recording
        depth = 2
        fields = ('time_posted', 'value', 'sensor')


class SensorSerializer(serializers.ModelSerializer):

    recordings = RecordingSerializer(many=True)

    class Meta:
        model = Sensor
        fields = ('type', 'recordings')


class DeviceSerializer(serializers.ModelSerializer):

    sensors = SensorSerializer(many=True, read_only=True)

    class Meta:
        model = Device
        depth = 2
        fields = ('sensors',)




class TrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingSession
        fields = '__all__'


class PostTraineeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainee
        fields = 'first_name'


class ListRecordingsSerializer(serializers.ListSerializer):

    def create(self, validated_data):
        recordings = [Recording(**item) for item in validated_data]
        print(recordings)
        return Recording.objects.bulk_create(recordings)


    def many_init(cls, *args, **kwargs):
        # Instantiate the child serializer.
        kwargs['child'] = cls()
        # Instantiate the parent list serializer.
        return ListRecordingsSerializer(*args, **kwargs)



class TraineeDetailSerializer(serializers.Serializer):
    trainee = TraineeSerializer()
    device = DeviceSerializer()


class IngresSerializer(serializers.Serializer):


    class Meta:
        list_serializer_class = ListRecordingsSerializer

