from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    # AbstractUser ya incluye username, email, password, first_name, last_name.
    # Agregamos un campo extra para demostrar que es un modelo personalizado:
    telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username