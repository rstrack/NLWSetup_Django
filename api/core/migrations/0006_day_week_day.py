# Generated by Django 4.1.7 on 2023-02-24 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_habit_days_day_habits_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='day',
            name='week_day',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]