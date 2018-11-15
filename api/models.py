from django.db import models

# Create your models here.


class Device(models.Model):
    pass


class TrainingSession(models.Model):

    start = models.DateTimeField(null=False)
    end = models.DateTimeField(null=False)


class TraineeTraining(models.Model):
    pass

class Trainee(models.Model):
    pass


class Trainer(models.Model):
    pass

