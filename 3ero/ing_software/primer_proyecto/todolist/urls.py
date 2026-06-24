from django.urls import path, include
from . import views

urlpatterns = [
    path("tareas", views.tareas, name="tareas"),
]