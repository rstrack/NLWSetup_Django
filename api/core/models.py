from django.db import models

class Habit(models.Model):
    title = models.CharField(max_length=64)
    created_at = models.DateField(auto_now_add=True)


class Day(models.Model):
    date = models.DateField(unique=True)
    habits = models.ManyToManyField(Habit)


class HabitWeekDay(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    week_day = models.IntegerField()

    class Meta:
        unique_together = [['habit', 'week_day']]

