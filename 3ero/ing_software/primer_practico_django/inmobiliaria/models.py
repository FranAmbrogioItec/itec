from django.db import models

# Create your models here.

class Inmueble(models.Model):
    direccion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    metros_cuadrados = models.IntegerField()
    numero_habitaciones = models.IntegerField()
    numero_banos = models.IntegerField()
    tipo = models.CharField(max_length=100)
    disponible = models.BooleanField(default=True)
    
    def __str__(self):
        return self.direccion