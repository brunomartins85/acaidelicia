from django.db import models
from django.utils.translation import gettext_lazy as _
from tenants.models import Store
from inventory.models import Size, Item


class Order(models.Model):
    
    class StatusChoices(models.TextChoices):
        PENDING = 'PENDING', _('Novo')
        PREPARING = 'PREPARING', _('Preparando')
        OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', _('Saiu para entrega')
        DELIVERED = 'DELIVERED', _('Entregue')
        CANCELED = 'CANCELED', _('Cancelado')
        
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='orders')
    customer_name = models.CharField(_("Nome do Cliente"), max_length=100)
    customer_phone = models.CharField(_("WhatsApp do Cliente"), max_length=20)
    delivery_address = models.TextField(_("Endereço de Entrega"), blank=True, null=True, help_text="Deixe em branco se for Retirada")
    status = models.CharField(_("Status"), max_length=20, choices=StatusChoices.choices, default=StatusChoices.PENDING)
    total_price = models.DecimalField(_("Valor Total"), max_digits=8, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
        
    def __str__(self):
        return f"Pedido #{self.id} - {self.customer_name}"
    
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    size = models.ForeignKey(Size, on_delete=models.SET_NULL, null=True, verbose_name=_("Tamanho"))
    item_total = models.DecimalField(_("Total do Item"), max_digits=6, decimal_places=2, default=0.00)
    
    class Meta:
        verbose_name = "Item do Pedido"
        verbose_name_plural = "Itens do Pedido"
        
    def __str__(self):
        size_name = self.size.name if self.size else 'Tamanho Removido'
        return f"{size_name} - Pedido #{self.order.id}"
    

class OrderItemExtra(models.Model):
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name='extras')
    item = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, verbose_name=_("Extras"))
    charged_price = models.DecimalField(_("Valor Cobrado"), max_digits=5, decimal_places=2, default=0.00)
    
    class Meta:
        verbose_name = "Extra do Item"
        verbose_name_plural = "Extras do Item"
        
    def __str__(self):
        item_name = self.item.name if self.item else 'Item Removido'
        return f"{item_name} (+R$ {self.charged_price})"    