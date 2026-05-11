from django.contrib import admin
from django.urls import path, include
from core.views import home # Asegúrate de que así se llama la función en tu core/views.py

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 1. Restauramos tu página de inicio en la ruta raíz
    path('', home, name='home'), 
    
    # 2. Movemos todo el CRUD de propiedades a la sub-ruta 'propiedades/'
    path('propiedades/', include('propiedades.urls')), 
]