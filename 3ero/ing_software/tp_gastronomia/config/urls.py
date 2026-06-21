# config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core.views import RegistroView # Importamos nuestra vista

urlpatterns = [
    path('admin/', admin.site.urls),
    # urls de autenticacion nativas de Django (login, logout, password reset)
    path('cuentas/', include('django.contrib.auth.urls')), 
    # vista de registro
    path('cuentas/registro/', RegistroView.as_view(), name='registro'),
    path('', include('core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)