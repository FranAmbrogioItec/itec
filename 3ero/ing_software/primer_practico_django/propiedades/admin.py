from django.contrib import admin 
from .models import Propiedad, Propietario

@admin.register(Propietario)
class PropietarioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'email')
    search_fields = ('nombre', 'apellido', 'email')

@admin.register(Propiedad)
class PropiedadAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'direccion', 'precio', 'propietario')
    search_fields = ('titulo', 'direccion') 
    list_filter = ('propietario',) 