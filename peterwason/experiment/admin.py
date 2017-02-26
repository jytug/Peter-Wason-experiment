from django.contrib import admin

from .models import Settings, Task

admin.site.register(Settings)
admin.site.register(Task)
