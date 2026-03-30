from django.shortcuts import render

# Create your views here.

def saludar_dos(request):
    return HttpResponse("hola mundo desde saludar2")
