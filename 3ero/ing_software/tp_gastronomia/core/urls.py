# core/urls.py
from django.urls import path
from .views import (
    IndexView, 
    PlatoListView, 
    PlatoCreateView, 
    PlatoUpdateView, 
    PlatoDeleteView,
    ReservaListView,
    ReservaCreateView,
    ReservaDeleteView,
    PlatoDetailView,  
)

app_name = 'core'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    
    # crud platos
    path('platos/', PlatoListView.as_view(), name='plato_list'),
    path('platos/nuevo/', PlatoCreateView.as_view(), name='plato_create'),
    path('platos/<int:pk>/editar/', PlatoUpdateView.as_view(), name='plato_update'),
    path('platos/<int:pk>/eliminar/', PlatoDeleteView.as_view(), name='plato_delete'),

    # detalle plato con reseñas
    path('platos/<int:pk>/', PlatoDetailView.as_view(), name='plato_detail'),
    
    path('platos/<int:pk>/editar/', PlatoUpdateView.as_view(), name='plato_update'),

    # crud reservas
    path('mis-reservas/', ReservaListView.as_view(), name='reserva_list'),
    path('mis-reservas/nueva/', ReservaCreateView.as_view(), name='reserva_create'),
    path('mis-reservas/<int:pk>/cancelar/', ReservaDeleteView.as_view(), name='reserva_delete'),

]