from django import forms
from .models import Propiedad

class PropiedadForm(forms.ModelForm):
    class Meta:
        model = Propiedad
        fields = ['titulo', 'direccion', 'precio', 'propietario', 'imagen'] 
        
        widgets = {
            'titulo': forms.TextInput(attrs={'class': 'w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-gray-700 text-white'}),
            'direccion': forms.TextInput(attrs={'class': 'w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-gray-700 text-white'}),
            'precio': forms.NumberInput(attrs={'class': 'w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-gray-700 text-white'}),
            'propietario': forms.Select(attrs={'class': 'w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-gray-700 text-white'}),
            'imagen': forms.FileInput(attrs={
                'class': 'w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-400 bg-gray-700 rounded-md border border-gray-600 cursor-pointer'
            }),
        }