from django.shortcuts import render
from django.http import HttpResponse

# en views vamos a tener la LOGICA, no templates.

def saludo(request):
    contexto = {
        "nombre": "Francisco",
        "edad": 17,
        "cursos": ["Python", "Django", "HTML", "CSS"],
    }
    return render(request, "saludo/index.html", contexto)

def despedir(request):
    return render(request, "saludo/despedir.html")

def inicio(request):
    return render(request, "saludo/index.html")