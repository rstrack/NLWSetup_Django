from rest_framework import serializers

class SummarySerializer(serializers.Serializer):
    '''
    day_id, day_date, total_habits, completed_habits
    '''

    id = serializers.IntegerField()
    date = serializers.DateField()
    total_habits = serializers.IntegerField()
    completed_habits = serializers.IntegerField()