# core/views.py
from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Plato

class IndexView(TemplateView):
    template_name = 'core/index.html'

# --- CRUD DE PLATOS ---

class PlatoListView(ListView):
    model = Plato
    template_name = 'core/plato_list.html'
    context_object_name = 'platos'

class PlatoCreateView(CreateView):
    model = Plato
    template_name = 'core/plato_form.html'
    fields = ['nombre', 'descripcion', 'precio', 'categoria', 'imagen']
    success_url = reverse_lazy('core:plato_list')
    
class PlatoUpdateView(UpdateView):
    model = Plato
    template_name = 'core/plato_form.html'
    fields = ['nombre', 'descripcion', 'precio', 'categoria', 'imagen']
    success_url = reverse_lazy('core:plato_list')

class PlatoDeleteView(DeleteView):
    model = Plato
    template_name = 'core/plato_confirm_delete.html'
    success_url = reverse_lazy('core:plato_list')