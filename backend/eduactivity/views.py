from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q
from providers.models import Provider
from .serializers import ProviderListSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 50


class ProviderListView(generics.ListAPIView):
    queryset = Provider.objects.filter(is_approved=True)
    serializer_class = ProviderListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'subcategory']
    search_fields = ['name', 'description', 'address']
    ordering_fields = ['name', 'profile_views', 'created_at']
    ordering = ['-profile_views']

    def get_queryset(self):
        queryset = Provider.objects.filter(is_approved=True)

        # Get search parameters
        q = self.request.query_params.get('q', '')
        category = self.request.query_params.get('category', '')
        subcategory = self.request.query_params.get('subcategory', '')
        location = self.request.query_params.get('location', '')
        min_rating = self.request.query_params.get('min_rating', '')
        max_price = self.request.query_params.get('max_price', '')
        sort = self.request.query_params.get('sort', 'relevance')

        # Apply search filter
        if q:
            queryset = queryset.filter(
                Q(name__icontains=q) |
                Q(description__icontains=q) |
                Q(address__icontains=q)
            )

        # Apply category filter
        if category:
            queryset = queryset.filter(category=category)

        # Apply subcategory filter
        if subcategory:
            queryset = queryset.filter(subcategory=subcategory)

        # Apply location filter
        if location:
            queryset = queryset.filter(address__icontains=location)

        # Apply rating filter
        if min_rating:
            try:
                min_rating = float(min_rating)
                # For now, we'll assume all providers have ratings above the threshold
                # In a real implementation, you'd calculate average ratings from reviews
                # For demo purposes, we'll keep all providers when rating filter is applied
                pass
            except ValueError:
                pass

        # Apply sorting
        if sort == 'rating':
            # Rating sorting would require aggregation of review ratings
            # For now, we'll sort by profile views as a proxy for popularity
            queryset = queryset.order_by('-profile_views')
        elif sort == 'popularity':
            queryset = queryset.order_by('-profile_views')
        elif sort == 'newest':
            queryset = queryset.order_by('-created_at')

        return queryset
