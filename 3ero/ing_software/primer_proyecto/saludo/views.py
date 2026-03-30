from django.shortcuts import render
from django.http import HttpResponse

# en views vamos a tener la LOGICA, no templates.

def saludo(request):
    return HttpResponse("hola mundo")

def despedir(request):
    return HttpResponse("chau mundo")

def inicio(request):
    return HttpResponse("<h1>Estoy en root. (localhost:8000)</h1>")