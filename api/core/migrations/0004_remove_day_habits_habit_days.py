# Generated by Django 4.1.7 on 2023-02-22 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_remove_habit_days_day_habits_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='day',
            name='habits',
        ),
        migrations.AddField(
            model_name='habit',
            name='days',
            field=models.ManyToManyField(to='core.day'),
        ),
    ]