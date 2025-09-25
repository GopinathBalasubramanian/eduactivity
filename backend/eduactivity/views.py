from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from providers.models import Provider
from .serializers import ProviderListSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProviderListView(generics.ListAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderListSerializer
    pagination_class = StandardResultsSetPagination
