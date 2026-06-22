# core/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario, Resena

class UsuarioRegistroForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = Usuario
        fields = ('username', 'email', 'first_name', 'last_name')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs.update({
                'class': 'w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-700 shadow-sm'
            })

class ResenaForm(forms.ModelForm):
    class Meta:
        model = Resena
        fields = ['calificacion', 'comentario']
        widgets = {
            'calificacion': forms.Select(attrs={
                'class': 'w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 shadow-sm'
            }),
            'comentario': forms.Textarea(attrs={
                'class': 'w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 shadow-sm', 
                'rows': 3, 
                'placeholder': '¿Qué te pareció este plato?'
            }),
        }
        labels = {
            'calificacion': 'Puntuación',
            'comentario': 'Tu reseña'
        }