from django.shortcuts import render

# Create your views here.

def listar_inmuebles(request):
    return render(request, "inmobiliaria/listar_inmuebles.html")
