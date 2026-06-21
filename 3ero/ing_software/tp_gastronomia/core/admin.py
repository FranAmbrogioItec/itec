# core/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario, Categoria, Plato, Mesa, Reserva, Resena

admin.site.register(Usuario, UserAdmin)
admin.site.register(Categoria)
admin.site.register(Mesa)

@admin.register(Plato)
class PlatoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('categoria',)
    ordering = ('nombre',)

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'mesa', 'fecha', 'hora', 'estado')
    search_fields = ('usuario__username',)
    list_filter = ('estado', 'fecha')
    ordering = ('-fecha', '-hora')

@admin.register(Resena)
class ResenaAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'plato', 'calificacion')
    list_filter = ('calificacion', 'plato')