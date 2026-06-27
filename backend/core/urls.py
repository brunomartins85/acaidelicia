from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tenants.urls')),
    path('api/inventory', include('inventory.urls')),
    path('api/orders', include('orders.urls')),
]
