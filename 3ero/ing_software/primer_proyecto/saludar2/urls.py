from django.urls import path, include
from . import views

urlpatterns = [
    path("saludar", views.saludar_dos, name="saludar_dos"),
]   