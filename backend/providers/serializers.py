from rest_framework import serializers
from .models import Provider, ProviderPhoto, ProviderCertificate, Service, Pricing, Booking
from users.models import User
from django.utils import timezone


class ProviderPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderPhoto
        fields = ['id', 'photo_url', 'is_primary', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class ProviderCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProviderCertificate
        fields = ['id', 'certificate_name', 'certificate_url', 'issued_by',
                 'issued_date', 'expiry_date', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pricing
        fields = [
            'id', 'pricing_type', 'price', 'currency', 'description',
            'min_sessions', 'max_sessions', 'is_active', 'valid_from',
            'valid_until', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ServiceSerializer(serializers.ModelSerializer):
    pricings = PricingSerializer(many=True, read_only=True)
    duration_display = serializers.CharField(read_only=True)

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'description', 'service_type', 'duration_hours',
            'duration_minutes', 'max_participants', 'is_active', 'pricings',
            'duration_display', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        # Ensure duration is reasonable
        duration_hours = attrs.get('duration_hours', 0)
        duration_minutes = attrs.get('duration_minutes', 0)

        if duration_hours == 0 and duration_minutes == 0:
            raise serializers.ValidationError("Service must have a duration greater than 0.")

        if duration_minutes >= 60:
            raise serializers.ValidationError("Duration minutes must be less than 60.")

        return attrs


class ProviderSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    photos = ProviderPhotoSerializer(many=True, read_only=True)
    certificates = ProviderCertificateSerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Provider
        fields = [
            'id', 'user', 'name', 'description', 'category', 'subcategory',
            'address', 'latitude', 'longitude',
            'contact_email', 'contact_phone', 'website', 'pricing_info',
            'is_approved', 'subscription_status', 'profile_views', 'photos',
            'certificates', 'services', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_approved', 'subscription_status',
                          'profile_views', 'created_at', 'updated_at']
        extra_kwargs = {
            'name': {'required': False}
        }

    def validate(self, attrs):
        user = self.context['request'].user
        if user.user_type != 'provider':
            raise serializers.ValidationError("Only provider users can create provider profiles.")

        # Check if user already has a provider profile
        if Provider.objects.filter(user=user).exists() and not self.instance:
            raise serializers.ValidationError("User already has a provider profile.")

        # Set default name if not provided
        if 'name' not in attrs or not attrs.get('name'):
            attrs['name'] = f"{user.first_name} {user.last_name}"

        return attrs


class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'name', 'description', 'service_type', 'duration_hours',
            'duration_minutes', 'max_participants'
        ]

    def validate(self, attrs):
        # Ensure duration is reasonable
        duration_hours = attrs.get('duration_hours', 0)
        duration_minutes = attrs.get('duration_minutes', 0)

        if duration_hours == 0 and duration_minutes == 0:
            raise serializers.ValidationError("Service must have a duration greater than 0.")

        if duration_minutes >= 60:
            raise serializers.ValidationError("Duration minutes must be less than 60.")

        return attrs


class PricingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pricing
        fields = [
            'pricing_type', 'price', 'currency', 'description',
            'min_sessions', 'max_sessions', 'valid_from', 'valid_until'
        ]

    def validate(self, attrs):
        price = attrs.get('price', 0)
        if price <= 0:
            raise serializers.ValidationError("Price must be greater than 0.")

        min_sessions = attrs.get('min_sessions', 1)
        max_sessions = attrs.get('max_sessions')

        if max_sessions and min_sessions > max_sessions:
            raise serializers.ValidationError("Minimum sessions cannot be greater than maximum sessions.")

        return attrs


class ProviderListSerializer(serializers.ModelSerializer):
    photos = ProviderPhotoSerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    distance = serializers.SerializerMethodField()

    class Meta:
        model = Provider
        fields = [
            'id', 'name', 'category', 'subcategory', 'address',
            'latitude', 'longitude', 'pricing_info', 'photos',
            'services', 'distance', 'is_approved'
        ]

    def get_distance(self, obj):
        # This would be calculated based on user's location
        # For now, return None
        return None


class ProviderAdminListSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    services_count = serializers.SerializerMethodField()

    class Meta:
        model = Provider
        fields = [
            'id', 'user_email', 'user_name', 'name', 'category', 'subcategory',
            'address', 'contact_email', 'contact_phone', 'website',
            'is_approved', 'subscription_status', 'profile_views',
            'services_count', 'created_at'
        ]

    def get_services_count(self, obj):
        return obj.services.count()


class ProviderCreateSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    category = serializers.CharField(required=False)
    subcategory = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    # Remove city, region, country

    class Meta:
        model = Provider
        fields = [
            'user', 'name', 'description', 'category', 'subcategory',
            'address', 'latitude', 'longitude', 'contact_email', 'contact_phone',
            'website', 'pricing_info'
        ]

    def validate(self, attrs):
        user = self.context['request'].user

        if 'name' not in attrs or not attrs.get('name'):
            attrs['name'] = f"{user.first_name} {user.last_name}"

        if 'description' not in attrs or not attrs.get('description'):
            attrs['description'] = f"Services provided by {user.first_name} {user.last_name}"

        if 'category' not in attrs or not attrs.get('category'):
            attrs['category'] = 'education'

        if 'address' not in attrs or not attrs.get('address'):
            attrs['address'] = 'Address not provided'

        return attrs


class BookingSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    provider_name = serializers.CharField(source='service.provider.name', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'service', 'pricing', 'booking_date', 'booking_time',
            'duration_hours', 'duration_minutes', 'participants', 'total_amount',
            'currency', 'special_requests', 'status', 'payment_status',
            'service_name', 'provider_name', 'user_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'total_amount', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Calculate total amount
        booking = Booking(**validated_data)
        booking.total_amount = booking.calculate_total()
        booking.save()
        return booking


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'service', 'pricing', 'booking_date', 'booking_time',
            'duration_hours', 'duration_minutes', 'participants', 'special_requests'
        ]

    def validate(self, attrs):
        service = attrs.get('service')
        pricing = attrs.get('pricing')

        # Validate that pricing belongs to the service
        if pricing and pricing.service != service:
            raise serializers.ValidationError("Pricing does not belong to the selected service.")

        # Validate booking date is not in the past
        booking_date = attrs.get('booking_date')
        if booking_date and booking_date < timezone.now().date():
            raise serializers.ValidationError("Booking date cannot be in the past.")

        return attrs
