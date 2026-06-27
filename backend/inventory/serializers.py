from rest_framework import serializers
from .models import Size, Category, Item


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = '__all__'
        
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model: Item
        fields: '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'store', 'name', 'max_free_items', 'order', 'is_active', 'items']