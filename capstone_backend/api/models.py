
import uuid
from datetime import datetime

from django.db import models

# Create your models here.


class Device(models.Model):

    trainee = models.ForeignKey("Trainee", null=True, blank=True, on_delete=models.CASCADE, related_name='device')

    def __str__(self):
        return "{}-device-{}".format(self.trainee.last_name, str(self.pk))


class Sensor(models.Model):

    SENSOR_CHOICES = [("PL{}".format(str(i)), "PL{}".format(str(i))) for i in range(1, 11)]
    SENSOR_CHOICES += [("PR{}".format(str(i)), "PR{}".format(str(i))) for i in range(1, 11)]

    serial_id = models.CharField(primary_key=True, max_length=36, null=False, default=uuid.uuid4)
    device = models.ForeignKey("Device", null=True, blank=True, on_delete=models.CASCADE, related_name="sensors")
    type = models.CharField(null=False, max_length=40, default="", choices=SENSOR_CHOICES)

    def __str__(self):
        return self.serial_id


class Trainee(models.Model):

    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Recording(models.Model):

    time_posted = models.DateTimeField(null=False, default=lambda: datetime.now().date())
    sensor = models.ForeignKey("Sensor", null=True, on_delete=models.CASCADE, related_name='recordings')
    value = models.FloatField()


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