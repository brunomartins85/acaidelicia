from rest_framework import serializers
from .models import Store, Subscription


class SubscriptionSerializers(serializers.ModelSerializer):
    plan_display = serializers.CharField(source='get_plan_display', read_only=True)
    
    class Meta:
        model = Subscription
        fields = ['id', 'plan', 'plan_display', 'is_active', 'pagarme_subscription_id']


class StoreSerializer(serializers.ModelSerializer):
    subscription = SubscriptionSerializers(read_only=True)
    estimated_delivery_time_display = serializers.CharField(source='get_estimated_delivery_time_display', read_only=True)
    
    class Meta:
        model = Store
        fields = [
            'id', 'name', 'slug', 'whatsapp', 'address',
            'min_order_value', 'standard_delivery_fee',
            'estimated_delivery_time', 'estimated_delivery_time_display',
            'is_open', 'subscription', 'created_at', 'updated_at'
        ]