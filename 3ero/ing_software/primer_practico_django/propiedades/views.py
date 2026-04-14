from django.shortcuts import render
from .models import Propiedad

def listado_propiedades(request):
    propiedades = Propiedad.objects.all()
    return render(request, 'propiedades/lista.html', {'propiedades': propiedades})