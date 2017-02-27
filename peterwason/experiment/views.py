import json
from django.shortcuts import render
from django.http import HttpResponse
from django.forms.models import model_to_dict
from .models import Settings, Task

def index(request):
    return render(request, "peterwason.html")

def settings(request):
    dict = model_to_dict(Settings.objects.get())
    return HttpResponse(json.dumps(dict))

def tasks(request):
    dict = [model_to_dict(task) for task in Task.objects.all()]
    return HttpResponse(json.dumps(dict))
