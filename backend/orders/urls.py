from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, OrderItemViewSet, OrderItemExtraViewSet


router = DefaultRouter()
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)
router.register(r'order-item-extras', OrderItemExtraViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
