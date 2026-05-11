from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from .models import Propiedad
from .forms import PropiedadForm

# Read (Listar)
class PropiedadListView(ListView):
    model = Propiedad
    template_name = 'propiedades/lista.html'
    context_object_name = 'propiedades'

# Create (Crear)
class PropiedadCreateView(CreateView):
    model = Propiedad
    form_class = PropiedadForm
    template_name = 'propiedades/form.html'
    success_url = reverse_lazy('lista_propiedades')

# Update (Actualizar)
class PropiedadUpdateView(UpdateView):
    model = Propiedad
    form_class = PropiedadForm
    template_name = 'propiedades/form.html'
    success_url = reverse_lazy('lista_propiedades')

# Delete (Eliminar)
class PropiedadDeleteView(DeleteView):
    model = Propiedad
    template_name = 'propiedades/confirm_delete.html'
    success_url = reverse_lazy('lista_propiedades')