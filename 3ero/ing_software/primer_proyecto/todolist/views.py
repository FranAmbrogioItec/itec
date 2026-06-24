from django.shortcuts import render
from django.http import HttpResponse
from .models import Tarea

# Create your views here.
def tareas(request):
    tareas = Tarea.objects.first()
    return HttpResponse(tareas.titulo + " y " + tareas.descripcion)