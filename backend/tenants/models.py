from django.db import models
from django.utils.translation import gettext_lazy as _


class Store(models.Model):
    
    class DeliveryTimeChoices(models.TextChoices):
        MIN_15_30 = '15-30', _('15 a 30 minutos')
        MIN_30_45 = '30-45', _('30 a 45 minutos')
        MIN_45_60 = '45-60', _('45 a 60 minutos')
        MIN_60_90 = '60-90', _('60 a 90 minutos')
        MIN_90_PLUS = '90+', _('Acima de 90 minutos')
    
    name = models.CharField(_("Nome da Loja"), max_length=100)
    slug = models.SlugField(_("URL da Loja"), unique=True, help_text="Ex: acaisuperdelicia")
    whatsapp = models.CharField(_("WhatsApp para pedidos"), max_length=20)
    address = models.TextField(_("Endereço Completo"))
    
    #Regras Operacionais
    min_order_value = models.DecimalField(_("Pedido Mínimo"), max_digits=6, decimal_places=2, default=0.00)
    standard_delivery_fee = models.DecimalField(_("Taxa de Entrega"), max_digits=5, decimal_places=2, default=0.00)
    estimated_delivery_time = models.CharField(
        _("Tempo estimado"),
        max_length=10,
        choices=DeliveryTimeChoices.choices,
        default=DeliveryTimeChoices.MIN_15_30,
    )
    is_open = models.BooleanField(_("Loja Aberta"), default=False)
    
    #Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Loja"
        verbose_name_plural = "Lojas"
    
    def __str__(self):
        return self.name
    

class Subscription(models.Model):
    
    class PlanChoices(models.TextChoices):
        FREE = 'FREE', _('Grátis (Até R$1000/mês em vendas)')
        PLUS ='PLUS', _('Ilimitado')
        PREMIUM = 'PREMIUM', _('Premium + Dashboard')
    
    store = models.OneToOneField(Store, on_delete=models.CASCADE, related_name='subscription', verbose_name=_("Loja"))
    plan = models.CharField(_("Plano"), max_length=10, choices=PlanChoices.choices, default=PlanChoices.FREE)
    is_active = models.BooleanField(_("Assinatura Ativa"), default=True)
    
    #DADOS PAGAR.ME
    pagarme_subscription_id = models.CharField(_("ID Pagar.me"), max_length=100, blank=True, null=True)
    
    class Meta:
        verbose_name = "Assinatura"
        verbose_name_plural = "Assinaturas"
        
    def __str__(self):
        return f"{self.store.name} - {self.get_plan_display()}"