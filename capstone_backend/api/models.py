from django.db import models

# Create your models here.


class Device(models.Model):
    trainee = models.ForeignKey("Trainee", null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.pk


class Trainee(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)


