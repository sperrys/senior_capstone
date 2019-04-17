from django.contrib import admin

# Register your models here.
from .models import Device, TrainingSession, Trainee, Recording, Sensor


class DeviceAdmin(admin.ModelAdmin):
    pass


class SensorAdmin(admin.ModelAdmin):
    list_display = ('serial_id', 'type', 'device')


class TraineeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')


class TrainingSessionAdmin(admin.ModelAdmin):
    list_display = ('name', 'time_start', 'time_end', 'distance')

class RecordingAdmin(admin.ModelAdmin):
    pass


admin.site.register(Recording, RecordingAdmin)
admin.site.register(Device, DeviceAdmin)
admin.site.register(Trainee, TraineeAdmin)
admin.site.register(TrainingSession, TrainingSessionAdmin)
admin.site.register(Sensor, SensorAdmin)
