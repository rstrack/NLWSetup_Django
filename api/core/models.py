from django.db import models

class WeekDays(models.IntegerChoices):
    MONDAY = 0
    TUESDAY = 1
    WEDNESDAY = 2
    THURSDAY = 3
    FRIDAY = 4
    SATURDAY = 5
    SUNDAY = 6


class Habit(models.Model):
    title = models.CharField(max_length=64)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class Day(models.Model):
    date = models.DateField(unique=True)
    week_day = models.IntegerField()
    habits = models.ManyToManyField(Habit, related_name='days')

    def __str__(self) -> str:
        return str(self.date)


class HabitWeekDay(models.Model):
    habit = models.ForeignKey(Habit, related_name='habitweekdays', on_delete=models.CASCADE)
    week_day = models.IntegerField(choices=WeekDays.choices)

    class Meta:
        unique_together = [['habit', 'week_day']]

    def __str__(self) -> str:
        return f'{self.habit} - {self.week_day}'
