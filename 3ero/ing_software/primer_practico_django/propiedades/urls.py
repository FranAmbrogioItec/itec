from django.urls import path
from .views import PropiedadListView, PropiedadCreateView, PropiedadUpdateView, PropiedadDeleteView

urlpatterns = [
    # Ruta principal que lista las propiedades
    path('', PropiedadListView.as_view(), name='lista_propiedades'),
    
    # Rutas para Crear, Editar y Eliminar
    path('nueva/', PropiedadCreateView.as_view(), name='crear_propiedad'),
    path('editar/<int:pk>/', PropiedadUpdateView.as_view(), name='editar_propiedad'),
    path('eliminar/<int:pk>/', PropiedadDeleteView.as_view(), name='eliminar_propiedad'),
]