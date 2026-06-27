from rest_framework import serializers
from .models import Order, OrderItem, OrderItemExtra


class OrderItemExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemExtra
        fields = '__all__'

class OrderItemSerializers(serializers.ModelSerializer):
    extras = OrderItemExtraSerializer(many=True, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'size', 'item_total', 'extras']
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializers(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'store', 'customer_name', 'customer_phone',
            'delivery_address', 'status', 'status_display',
            'total_price', 'created_at', 'updated_at', 'items'
        ]