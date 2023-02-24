from rest_framework.serializers import ModelSerializer
from core.models import HabitWeekDay


class HabitWeekDaySerializer(ModelSerializer):
    class Meta:
        model = HabitWeekDay
        fields = '__all__'