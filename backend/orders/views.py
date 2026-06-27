from django.shortcuts import render
from rest_framework import viewsets
from .models import Order, OrderItem, OrderItemExtra
from .serializers import OrderSerializer, OrderItemSerializers, OrderItemExtraSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializers
    
class OrderItemExtraViewSet(viewsets.ModelViewSet):
    queryset = OrderItemExtra.objects.all()
    serializer_class = OrderItemExtraSerializer