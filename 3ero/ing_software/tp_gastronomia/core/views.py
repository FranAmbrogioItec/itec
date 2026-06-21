# core/views.py
from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from .models import Plato, Reserva
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



# --- CRUD DE RESERVAS (Para el cliente) ---

class ReservaListView(LoginRequiredMixin, ListView):
    model = Reserva
    template_name = 'core/reserva_list.html'
    context_object_name = 'reservas'

    def get_queryset(self):
        # Un usuario normal solo ve sus propias reservas
        return Reserva.objects.filter(usuario=self.request.user).order_by('-fecha', '-hora')

class ReservaCreateView(LoginRequiredMixin, CreateView):
    model = Reserva
    template_name = 'core/reserva_form.html'
    # Solo pedimos estos datos; el usuario y el estado se asignan por detrás
    fields = ['mesa', 'fecha', 'hora'] 
    success_url = reverse_lazy('core:reserva_list')

    def form_valid(self, form):
        # Asignamos el usuario logueado a la reserva antes de guardar
        form.instance.usuario = self.request.user
        return super().form_valid(form)

class ReservaDeleteView(LoginRequiredMixin, DeleteView):
    model = Reserva
    template_name = 'core/reserva_confirm_delete.html'
    success_url = reverse_lazy('core:reserva_list')
    
    def get_queryset(self):
        # Medida de seguridad: solo puede eliminar si es su propia reserva
        return Reserva.objects.filter(usuario=self.request.user)