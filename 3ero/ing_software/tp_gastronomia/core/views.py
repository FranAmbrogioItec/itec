# core/views.py
from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from .models import Plato
from .forms import UsuarioRegistroForm

class IndexView(TemplateView):
    template_name = 'core/index.html'

# --- REGISTRO DE USUARIOS ---
class RegistroView(CreateView):
    form_class = UsuarioRegistroForm
    template_name = 'registration/registro.html'
    success_url = reverse_lazy('login') # Redirige al login tras registrarse exitosamente

# --- CRUD DE PLATOS PROTEGIDO ---

# LoginRequiredMixin: Solo usuarios logueados pueden ver la lista (Requisito "read")
class PlatoListView(LoginRequiredMixin, ListView):
    model = Plato
    template_name = 'core/plato_list.html'
    context_object_name = 'platos'

# PermissionRequiredMixin: Requieren permisos específicos del panel de admin
class PlatoCreateView(PermissionRequiredMixin, CreateView):
    model = Plato
    template_name = 'core/plato_form.html'
    fields = ['nombre', 'descripcion', 'precio', 'categoria', 'imagen']
    success_url = reverse_lazy('core:plato_list')
    permission_required = 'core.add_plato'

class PlatoUpdateView(PermissionRequiredMixin, UpdateView):
    model = Plato
    template_name = 'core/plato_form.html'
    fields = ['nombre', 'descripcion', 'precio', 'categoria', 'imagen']
    success_url = reverse_lazy('core:plato_list')
    permission_required = 'core.change_plato'

class PlatoDeleteView(PermissionRequiredMixin, DeleteView):
    model = Plato
    template_name = 'core/plato_confirm_delete.html'
    success_url = reverse_lazy('core:plato_list')
    permission_required = 'core.delete_plato'