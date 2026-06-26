from django.db import models
from django.utils.translation import gettext_lazy as _
from tenants.models import Store


class Size(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='sizes')
    name = models.CharField(_("Nome do Tamanho"), max_length=50, help_text="Ex: 500ml, Barca 1L")
    price = models.DecimalField(_("Preço Base"), max_digits=6, decimal_places=2)
    order = models.PositiveIntegerField(_("Ordem de Exibição"), default=0)
    is_active = models.BooleanField(_("Ativo"), default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = "Tamanho"
        verbose_name_plural = "Tamanhos"
        
    def __str__(self):
        return f"{self.name} - {self.store.name}"
    
    
class Category(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(_("Nome da Categoria"), max_length=100)
    max_free_limits = models.PositiveIntegerField(
        _("Máximo de Itens"),
        default=0,
        help_text="Quantos itens o cliente pode escolher?"
    )
    order = models.PositiveIntegerField(_("Ordem de exibição"), default=0)
    is_active = models.BooleanField(_("Ativo"), default=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
    
    def __str__(self):
        return f"{self.name} - {self.store.name}"
    
    
class Item(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(_("Nome do Ingrediente"), max_length=100)
    extra_price = models.DecimalField(
        _("Preço Adicional"),
        max_digits=5,
        decimal_places=2,
        default=0.00,
        help_text="Valor cobrado em extras adicionais"
    )
    is_active = models.BooleanField(_("Ativo"), default=True)
    
    class Meta:
        verbose_name = "Ingrediente"
        verbose_name_plural = "Ingredientes"
        
    def __str__(self):
        return f"{self.name} - {self.category.name}"
    