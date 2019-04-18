
import uuid
from datetime import datetime
import json
from dateutil.parser import *

from django.db import models
from django.core.serializers import serialize
from datetime import timedelta


# Create your models here.


class Device(models.Model):

    trainee = models.ForeignKey("Trainee", null=True, blank=True, on_delete=models.CASCADE, related_name='device')

    def __str__(self):
        return "{}-device-{}".format(self.trainee.last_name, str(self.pk))


class Sensor(models.Model):

    SENSOR_CHOICES = [("{}L".format(str(i)), "{}L".format(str(i))) for i in range(1, 11)]
    SENSOR_CHOICES += [("{}R".format(str(i)), "{}R".format(str(i))) for i in range(1, 11)]
    SENSOR_CHOICES += [ ('AR','AR'), ('AL', 'AL')]


    serial_id = models.CharField(primary_key=True, max_length=36, null=False, default=uuid.uuid4)
    device = models.ForeignKey("Device", null=True, blank=True, on_delete=models.CASCADE, related_name="sensors")
    type = models.CharField(null=False, max_length=40, default="", choices=SENSOR_CHOICES)

    def __str__(self):
        return self.serial_id + ":" + self.type


class Trainee(models.Model):

    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)

    def __str__(self):
        return self.first_name + " " + self.last_name

    @property
    def well_being(self):
        return 1


    @property
    def lines(self):

        recordings = Recording.objects.filter(sensor__device__trainee=self.id)

        lines = []

        days = list(set([str(r['time_posted'].date()) for r in recordings.values('time_posted')]))

        for d in days:
            print(d)

            datetime_day = parse(d)

            day_recordings = recordings.filter(time_posted__gt=datetime_day,
                                               time_posted__lt=datetime_day + timedelta(days=1))

            sum = 0
            avg = 0
            l = []
            json_obj = {}

            for record in day_recordings:

                if record.sensor.type == 'AL':
                    l.append(record.value)
                elif record.sensor.type == 'AR':
                    l.append(record.value)

                json_obj[record.sensor.type] = record.value
                sum += record.value

            if len(day_recordings) > 0:
                avg = float(sum) / len(recordings)

            lines.append(dict(date=d, load=avg, asymmmetry=abs(l[1] - l[0])))

        return lines


    @property
    def data(self):
        recordings = Recording.objects.filter(sensor__device__trainee=self.id)

        json_res = []
        json_days = []

        days = list(set([str(r['time_posted'].date()) for r in recordings.values('time_posted')]))


        for d in days:
            print(d)

            datetime_day = parse(d)

            day_recordings = recordings.filter(time_posted__gt=datetime_day,
                             time_posted__lt=datetime_day + timedelta(days=1))

            sum = 0
            avg = 0
            bar = []
            json_obj = {}

            for record in day_recordings:

                if record.sensor.type == 'AL':
                    bar.append(dict({"foot": "Left Foot", "stride": record.value}))
                elif record.sensor.type == 'AR':
                    bar.append(dict({"foot": "Right Foot", "stride": record.value}))


                json_obj[record.sensor.type] = record.value
                sum += record.value

            if len(day_recordings) > 0:
                avg = float(sum) / len(recordings)

            json_days.append(dict(date=d, avg=avg, points=json_obj, bar=bar))

        return json_days



class Recording(models.Model):

    time_posted = models.DateTimeField(null=False, default=datetime.now)
    sensor = models.ForeignKey("Sensor", null=True, on_delete=models.CASCADE, related_name='recordings')
    value = models.FloatField()

    def __str__(self):
        return str(self.sensor)


class TrainingSession(models.Model):

    time_start = models.DateTimeField(null=False)
    time_end = models.DateTimeField(null=False)

    name = models.CharField(default="", null=False, max_length=50)
    distance = models.IntegerField(null=True)
    description = models.TextField(max_length=500, blank=True, default="")

    notes = models.TextField(max_length=500, blank=True, default="")
    trainees = models.ManyToManyField("Trainee")

    def __str__(self):
        return self.name