from rest_framework import generics, status, permissions, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q, Avg
from .models import Provider, ProviderPhoto, ProviderCertificate, Service, Pricing, Booking
from .serializers import (
    ProviderSerializer, ProviderListSerializer, ProviderCreateSerializer,
    ProviderPhotoSerializer, ProviderCertificateSerializer,
    ServiceSerializer, ServiceCreateSerializer, PricingSerializer, PricingCreateSerializer,
    BookingSerializer, BookingCreateSerializer
)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 50


class IsProviderOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow providers to edit their own profiles.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the provider owner
        return obj.user == request.user


class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()  # Temporarily show all providers for testing
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'subcategory', 'is_approved']
    search_fields = ['name', 'description', 'address']
    ordering_fields = ['name', 'created_at', 'profile_views']
    ordering = ['-profile_views']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProviderCreateSerializer
        return ProviderListSerializer

    def get_queryset(self):
        queryset = Provider.objects.filter(is_approved=True)

        # Filter by location if provided
        lat = self.request.query_params.get('lat')
        lng = self.request.query_params.get('lng')
        radius = self.request.query_params.get('radius', 10)

        if lat and lng:
            # Simple distance calculation (in a real app, use PostGIS)
            # For now, just return all approved providers
            pass

        # Filter by rating
        min_rating = self.request.query_params.get('min_rating')
        if min_rating:
            try:
                min_rating = float(min_rating)
                # For now, we'll filter providers that have at least the minimum rating
                # In a real implementation, you'd calculate average ratings from reviews
                # For demo purposes, we'll assume all providers have ratings above the threshold
                pass
            except ValueError:
                pass

        return queryset

    def perform_create(self, serializer):
        provider = serializer.save()
        # Increment profile views when created
        provider.profile_views += 1
        provider.save()


class ProviderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    permission_classes = [IsProviderOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.user_type == 'provider':
            # Providers can see their own profiles even if not approved
            return Provider.objects.filter(
                Q(is_approved=True) | Q(user=self.request.user)
            )
        return Provider.objects.filter(is_approved=True)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment profile views
        instance.profile_views += 1
        instance.save(update_fields=['profile_views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class MyProviderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # For provider users, ensure they have a provider profile
        if request.user.user_type == 'provider':
            provider, created = Provider.objects.get_or_create(
                user=request.user,
                defaults={
                    'name': f"{request.user.first_name} {request.user.last_name}",
                    'description': f"Services provided by {request.user.first_name} {request.user.last_name}",
                    'category': 'education',
                    'address': 'Address not provided'
                }
            )
            serializer = ProviderSerializer(provider)
            return Response(serializer.data)
        else:
            return Response(
                {'detail': 'Only provider users can access this endpoint.'},
                status=status.HTTP_403_FORBIDDEN
            )

    def post(self, request):
        # Create or update provider profile
        provider, created = Provider.objects.get_or_create(user=request.user)
        serializer = ProviderCreateSerializer(provider, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def upload_provider_photo(request, provider_id):
    try:
        provider = Provider.objects.get(id=provider_id, user=request.user)
    except Provider.DoesNotExist:
        return Response(
            {'detail': 'Provider not found or access denied.'},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProviderPhotoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(provider=provider)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def upload_provider_certificate(request, provider_id):
    try:
        provider = Provider.objects.get(id=provider_id, user=request.user)
    except Provider.DoesNotExist:
        return Response(
            {'detail': 'Provider not found or access denied.'},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProviderCertificateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(provider=provider)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProviderSearchView(generics.ListAPIView):
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
        lat = self.request.query_params.get('lat', '')
        lng = self.request.query_params.get('lng', '')
        radius = self.request.query_params.get('radius', 10)
        min_reviews = self.request.query_params.get('min_reviews', '')
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

        # Reviews filter - temporarily disabled until Review model is created
        # if min_reviews:
        #     try:
        #         min_reviews = int(min_reviews)
        #         # Filter providers that have at least the specified number of reviews
        #         provider_ids = []
        #         for provider in queryset:
        #             review_count = provider.reviews.count()
        #             if review_count >= min_reviews:
        #                 provider_ids.append(provider.id)
        #         queryset = queryset.filter(id__in=provider_ids)
        #     except ValueError:
        #         pass

        # Price filter (if pricing_info contains numeric data)
        if max_price:
            try:
                max_price = float(max_price)
                # This would require parsing pricing_info - simplified for now
                # In a real implementation, you'd parse the price from provider.pricing_info
                pass
            except ValueError:
                pass

        # Location-based filtering (simplified - use PostGIS in production)
        if lat and lng:
            try:
                lat = float(lat)
                lng = float(lng)
                radius = float(radius)
                # Simple bounding box calculation
                # In production, use proper geospatial queries
                lat_min = lat - (radius / 111)  # Rough conversion: 1 degree ≈ 111 km
                lat_max = lat + (radius / 111)
                lng_min = lng - (radius / (111 * abs(lat))) if lat != 0 else lng - radius
                lng_max = lng + (radius / (111 * abs(lat))) if lat != 0 else lng + radius

                queryset = queryset.filter(
                    latitude__range=(lat_min, lat_max),
                    longitude__range=(lng_min, lng_max)
                )
            except ValueError:
                pass

        # Apply sorting
        if sort == 'distance' and lat and lng:
            # Distance sorting would require complex geospatial calculations
            pass
        elif sort == 'rating':
            # Rating sorting would require aggregation of review ratings
            # For now, we'll sort by profile views as a proxy for popularity
            queryset = queryset.order_by('-profile_views')
        elif sort == 'popularity':
            queryset = queryset.order_by('-profile_views')
        elif sort == 'newest':
            queryset = queryset.order_by('-created_at')
        elif sort == 'reviews':
            # Sort by number of reviews (highest first) - temporarily disabled
            # from django.db.models import Count
            # queryset = queryset.annotate(review_count=Count('reviews')).order_by('-review_count')
            pass

        return queryset


class IsProviderOwner(permissions.BasePermission):
    """
    Custom permission to only allow providers to manage their own services and pricing.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'provider'

    def has_object_permission(self, request, view, obj):
        # For services, check if the provider belongs to the user
        if hasattr(obj, 'provider'):
            return obj.provider.user == request.user
        # For pricing, check if the service's provider belongs to the user
        if hasattr(obj, 'service'):
            return obj.service.provider.user == request.user
        return False


class ServiceListCreateView(generics.ListCreateAPIView):
    serializer_class = ServiceCreateSerializer
    permission_classes = [IsProviderOwner]

    def get_queryset(self):
        # Ensure provider profile exists for provider users
        if self.request.user.user_type == 'provider':
            provider, created = Provider.objects.get_or_create(
                user=self.request.user,
                defaults={
                    'name': f"{self.request.user.first_name} {self.request.user.last_name}",
                    'description': f"Services provided by {self.request.user.first_name} {self.request.user.last_name}",
                    'category': 'education',
                    'address': 'Address not provided'
                }
            )
            return Service.objects.filter(provider=provider)
        return Service.objects.none()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ServiceSerializer
        return ServiceCreateSerializer

    def perform_create(self, serializer):
        # Ensure provider profile exists
        if self.request.user.user_type == 'provider':
            provider, created = Provider.objects.get_or_create(
                user=self.request.user,
                defaults={
                    'name': f"{self.request.user.first_name} {self.request.user.last_name}",
                    'description': f"Services provided by {self.request.user.first_name} {self.request.user.last_name}",
                    'category': 'education',
                    'address': 'Address not provided'
                }
            )
            serializer.save(provider=provider)
        else:
            raise serializers.ValidationError("Only provider users can create services.")


class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [IsProviderOwner]

    def get_queryset(self):
        # Ensure provider profile exists for provider users
        if self.request.user.user_type == 'provider':
            provider, created = Provider.objects.get_or_create(
                user=self.request.user,
                defaults={
                    'name': f"{self.request.user.first_name} {self.request.user.last_name}",
                    'description': f"Services provided by {self.request.user.first_name} {self.request.user.last_name}",
                    'category': 'education',
                    'address': 'Address not provided'
                }
            )
            return Service.objects.filter(provider=provider)
        return Service.objects.none()


class PricingListCreateView(generics.ListCreateAPIView):
    serializer_class = PricingCreateSerializer
    permission_classes = [IsProviderOwner]

    def get_queryset(self):
        service_id = self.kwargs.get('service_id')
        if service_id:
            # Ensure provider profile exists for provider users
            if self.request.user.user_type == 'provider':
                provider, created = Provider.objects.get_or_create(
                    user=self.request.user,
                    defaults={
                        'name': f"{self.request.user.first_name} {self.request.user.last_name}",
                        'description': f"Services provided by {self.request.user.first_name} {self.request.user.last_name}",
                        'category': 'education',
                        'address': 'Address not provided'
                    }
                )
                return Pricing.objects.filter(
                    service__id=service_id,
                    service__provider=provider
                )
        return Pricing.objects.none()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return PricingSerializer
        return PricingCreateSerializer

    def perform_create(self, serializer):
        service_id = self.kwargs.get('service_id')
        if not service_id:
            raise serializers.ValidationError("Service ID is required.")

        # Ensure provider profile exists
        if self.request.user.user_type == 'provider':
            provider, created = Provider.objects.get_or_create(
                user=self.request.user,
                defaults={
                    'name': f"{self.request.user.first_name} {self.request.user.last_name}",
                    'description': f"Services provided by {self.request.user.first_name} {self.request.user.last_name}",
                    'category': 'education',
                    'address': 'Address not provided'
                }
            )
            try:
                service = Service.objects.get(id=service_id, provider=provider)
                serializer.save(service=service)
            except Service.DoesNotExist:
                raise serializers.ValidationError("Service not found or access denied.")
        else:
            raise serializers.ValidationError("Only provider users can manage pricing.")


class PricingDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PricingSerializer
    permission_classes = [IsProviderOwner]

    def get_queryset(self):
        # Ensure provider profile exists for provider users
        if self.request.user.user_type == 'provider':
            provider, created = Provider.objects.get_or_create(
                user=self.request.user,
                defaults={
                    'name': f"{self.request.user.first_name} {self.request.user.last_name}",
                    'description': f"Services provided by {self.request.user.first_name} {self.request.user.last_name}",
                    'category': 'education',
                    'address': 'Address not provided'
                }
            )
            return Pricing.objects.filter(service__provider=provider)
        return Pricing.objects.none()


class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None  # Disable pagination for booking management

    def get_queryset(self):
        if self.request.user.user_type == 'provider':
            # Providers see bookings for their services
            try:
                provider = Provider.objects.get(user=self.request.user)
                return Booking.objects.filter(service__provider=provider)
            except Provider.DoesNotExist:
                return Booking.objects.none()
        else:
            # Students/parents see their own bookings
            return Booking.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return BookingSerializer
        return BookingCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.user_type == 'provider':
            # Providers can see bookings for their services
            try:
                provider = Provider.objects.get(user=self.request.user)
                return Booking.objects.filter(service__provider=provider)
            except Provider.DoesNotExist:
                return Booking.objects.none()
        else:
            # Students/parents can only see their own bookings
            return Booking.objects.filter(user=self.request.user)
