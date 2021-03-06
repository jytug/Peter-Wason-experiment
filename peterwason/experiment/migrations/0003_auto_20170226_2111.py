# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-26 21:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('experiment', '0002_auto_20170226_2013'),
    ]

    operations = [
        migrations.CreateModel(
            name='CardClick',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TimeField()),
                ('card', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CardResult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('externalTaskNo', models.IntegerField()),
                ('correct', models.BooleanField()),
                ('cardOrder', models.CharField(max_length=100)),
                ('workTime', models.IntegerField()),
                ('solvingTime', models.IntegerField()),
                ('lastChoiceTime', models.CharField(max_length=100)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='experiment.Task')),
            ],
        ),
        migrations.CreateModel(
            name='GILResult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.AddField(
            model_name='cardclick',
            name='result',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='experiment.CardResult'),
        ),
    ]
