from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tarea(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    completada = models.BooleanField(default=False)
    responsable = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='responsable', default=1, null=True, blank=True)
    
    def __str__(self):
        return self.titulo
    

#si creo o modifico un modelo, debo correr:
#python manage.py makemigrations
#python manage.py migrate