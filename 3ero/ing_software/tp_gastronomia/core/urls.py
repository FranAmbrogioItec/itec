# core/urls.py
from django.urls import path
from .views import (
    IndexView, 
    PlatoListView, 
    PlatoCreateView, 
    PlatoUpdateView, 
    PlatoDeleteView
)

app_name = 'core'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    
    # crud platos
    path('platos/', PlatoListView.as_view(), name='plato_list'),
    path('platos/nuevo/', PlatoCreateView.as_view(), name='plato_create'),
    path('platos/<int:pk>/editar/', PlatoUpdateView.as_view(), name='plato_update'),
    path('platos/<int:pk>/eliminar/', PlatoDeleteView.as_view(), name='plato_delete'),
]