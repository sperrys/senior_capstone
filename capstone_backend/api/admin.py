from django.contrib import admin

# Register your models here.
from .models import *


class DeviceAdmin(admin.ModelAdmin):
    pass


class TraineeAdmin(admin.ModelAdmin):
    pass



admin.site.register(Device, DeviceAdmin)
admin.site.register(Trainee, TraineeAdmin)