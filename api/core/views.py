import datetime

from django.db.transaction import atomic
from django.db.models import Q

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from core.models import Day, Habit
from core.serializers.habitSerializer import HabitSerializer
from core.serializers.habitWeekDaySerializer import HabitWeekDaySerializer
from core.serializers.summarySerializer import SummarySerializer

class HabitViewSet(ViewSet):

    @atomic
    def create(self, request):
        habitSerializer = HabitSerializer(data={'title':request.data['title']})
        habitSerializer.is_valid(raise_exception=True)
        habit = habitSerializer.save()
        print(habit)
        for wd in request.data['weekDays']:
            hwdSerializer = HabitWeekDaySerializer(data={'habit':habit.id, 'week_day': wd})
            hwdSerializer.is_valid(raise_exception=True)
            hwdSerializer.save()
        return Response(None, status.HTTP_201_CREATED)


class HabitToggleView(ViewSet):

    #não está seguindo os princícios dos métodos http, visto que cria ou deleta uma linha na tabela pivô
    @atomic
    def partial_update(self, request, pk):
        day = (
            datetime.datetime.strptime(request.data['day'], '%Y-%m-%d').date()
            if 'day' in request.data 
            else datetime.date.today()
        )
        weekday = day.weekday()
        habit_instance = Habit.objects.get(pk=pk)
        try:
            day_instance = Day.objects.get(Q(date=day))
        except Day.DoesNotExist:
            day_instance = Day(date=day, week_day=weekday)
            day_instance.save()
        try:
            day_query = Day.objects.get(Q(date=day) & Q(habits__id=pk))
            day_query.habits.remove(habit_instance)
        except Day.DoesNotExist:
            day_instance.habits.add(habit_instance)
        return Response(None, status.HTTP_200_OK)
    
    
class DayViewSet(ViewSet):

    @atomic
    def list(self, request, date):
        try:
            _date = datetime.datetime.strptime(date, '%Y-%m-%d').date()
            possibleHabits = Habit.objects.filter(Q(created_at__lte=_date) & Q(habitweekdays__week_day__exact=_date.weekday()))
            possibleHabitsSerializer = HabitSerializer(possibleHabits, many=True)
            try:
                _day = Day.objects.get(date=_date)
                completedHabits = Habit.objects.filter(Q(days__id=_day.id))
            except Day.DoesNotExist:
                completedHabits = None
            completedHabitsSerializer = HabitSerializer(completedHabits, many=True)
            response = {
                'possibleHabits':possibleHabitsSerializer.data,
                'completedHabits': completedHabitsSerializer.data
            }
            return Response(response, status.HTTP_200_OK)
        except Exception as e:
            return Response([], status.HTTP_404_NOT_FOUND)
        

class SummaryViewSet(ViewSet):

    @atomic
    def list(self, request):
        day = request.data['day'] \
            if 'day' in request.data \
            else (datetime.date.today()-datetime.timedelta(15)).strftime("%Y-%m-%d") 
        query = Day.objects.raw(
            f'''
            SELECT 
                D.id,
                D.date,
                (
                    SELECT 
                        COUNT(*) 
                    FROM core_day_habits DH
                    WHERE DH.day_id = D.id
                ) as completed_habits,
                (
                    SELECT 
                        COUNT(*) 
                    FROM core_habitweekday HWD
                    JOIN core_habit H
                        ON H.id = HWD.habit_id
                    WHERE
                        HWD.week_day = D.week_day
                        AND H.created_at <= D.date
                ) as total_habits 
            FROM core_day D
            WHERE
                D.date >= {day}
            '''
        )
        serializer = SummarySerializer(query, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

