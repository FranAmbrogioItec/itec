# core/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class Usuario(AbstractUser):
    pass

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Plato(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='platos')
    #1er requisito: al menos un image field
    imagen = models.ImageField(upload_to='platos/', blank=True, null=True) 

    def __str__(self):
        return self.nombre

class Mesa(models.Model):
    numero = models.IntegerField(unique=True)
    capacidad = models.IntegerField()

    def __str__(self):
        return f"Mesa {self.numero} (Capacidad: {self.capacidad})"

class Reserva(models.Model):
    ESTADOS = [
        ('Pendiente', 'Pendiente'),
        ('Confirmada', 'Confirmada'),
        ('Cancelada', 'Cancelada'),
    ]
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reservas')
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE)
    fecha = models.DateField()
    hora = models.TimeField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='Pendiente')

    def __str__(self):
        return f"{self.usuario.username} - Mesa {self.mesa.numero} - {self.fecha}"

class Resena(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plato = models.ForeignKey(Plato, on_delete=models.CASCADE, related_name='resenas')
    calificacion = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)]) # 1 a 5 estrellas
    comentario = models.TextField()

    def __str__(self):
        return f"Reseña de {self.usuario.username} para {self.plato.nombre}"