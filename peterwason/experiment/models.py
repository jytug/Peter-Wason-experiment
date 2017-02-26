from django.db import models
from experiment.singleton import SingletonClass

class Settings(SingletonClass):
    welcome = models.TextField("The welcome message", null=True)
    RMBTimeout = models.IntegerField("How long before the red screen comes", null=True)
    trainingGilMessage = models.TextField("Instructions for the training GIL session", null=True)
    trainingGilTime = models.IntegerField("Training GIL session time", null=True)
    measuredGilMessage = models.TextField("Instructions for the measured GIL session", null=True)
    measuredGilTime = models.IntegerField("Measured GIL session time", null=True)
    trainingCardMessage = models.TextField(
            "Instructions for the training GIL session with cards",
            null=True
            )
    trainingCardTime = models.IntegerField("Training GIL + cards session time", null=True)
    measuredCardMessage = models.TextField(
            "Instructions for the measured GIL session with cards",
            null=True)
    measuredCardTime = models.IntegerField("Measured GIL + cards session time", null=True)
    thankYouMessage = models.TextField("A thank you message for the subject", null=True)
    def __str__(self):
        return "Settings"

class Task(models.Model):
    intro = models.TextField("Introduction to the task")
    rule = models.TextField("Rule specified for this task")
    furtherExplanation = models.TextField("Further explanation of the task")
    command = models.TextField("Instruction on what to do")
    card1 = models.CharField(max_length=100)
    card2 = models.CharField(max_length=100)
    card3 = models.CharField(max_length=100)
    card4 = models.CharField(max_length=100)

class CardResult(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    externalTaskNo = models.IntegerField()                  # the number as which the task came
    correct = models.BooleanField()
    cardOrder = models.CharField(max_length=100)
    workTime = models.IntegerField()
    solvingTime = models.IntegerField()
    lastChoiceTime = models.CharField(max_length=100)       # time of last card click

class CardClick(models.Model):
    result = models.ForeignKey(CardResult, on_delete=models.CASCADE)
    time = models.TimeField()
    card = models.IntegerField()
    

class GILResult(models.Model):
    x = 1
    
