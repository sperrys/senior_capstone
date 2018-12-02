
import uuid

from django.db import models

# Create your models here.


class Device(models.Model):

    trainee = models.ForeignKey("Trainee", null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)


class Sensor(models.Model):

    serial_id = models.CharField(primary_key=True, max_length=32, null=False, default=uuid.uuid4())
    device = models.ForeignKey("Device", null=True, blank=True, on_delete=models.CASCADE)
    type = models.CharField(null=False, max_length=40, default="")

    def __str__(self):
        return self.serial_id

class Trainee(models.Model):

    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Recording(models.Model):

    time_posted = models.DateTimeField(null=False)
    sensor = models.ForeignKey("Sensor", null=True, on_delete=models.CASCADE)


class TrainingSession(models.Model):

    time_start = models.DateTimeField(null=False)
    time_end = models.DateTimeField(null=False)

    distance = models.IntegerField(null=True)
    description = models.TextField(max_length=500, blank=True, default="")

    notes = models.TextField(max_length=500, blank=True, default="")
    sensor = models.ForeignKey("Sensor", null=True, on_delete=models.CASCADE)

    trainees = models.ManyToManyField("Trainee")
