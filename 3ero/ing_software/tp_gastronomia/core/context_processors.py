# core/context_processors.py
from .models import Categoria

def restaurante_context(request):
    return {
        'categorias_globales': Categoria.objects.all(),
        'telefono_contacto': '+54 9 358 4123456',
        'direccion_resto': 'Av. Principal 123, Ciudad',
    }