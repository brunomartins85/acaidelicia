from rest_framework import viewsets
from .models import Store
from .serializers import StoreSerializer


class StoreViewSet(viewsets.ModelViewSet):
    # TODAS as ações de crud serão criadas com esse viewset
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    lookup_field = 'slug'