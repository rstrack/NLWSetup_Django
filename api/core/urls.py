from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import DayViewSet, HabitToggleView, HabitViewSet, SummaryViewSet

router = DefaultRouter()
router.register('habits', HabitViewSet, basename='habits')
router.register(r'day/(?P<date>.+)', DayViewSet, basename='day')
router.register('habits', HabitToggleView, basename='toggle-habit')
router.register('summary', SummaryViewSet, basename='summary')


urlpatterns = [
    
    path('', include(router.urls)),
    
]