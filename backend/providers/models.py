from django.db import models
import uuid
from django.utils import timezone
from users.models import User


class Provider(models.Model):
    SUBSCRIPTION_STATUSES = [
        ('inactive', 'Inactive'),
        ('active', 'Active'),
        ('expired', 'Expired'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='provider_profile')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100)
    subcategory = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField()
    latitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    pricing_info = models.TextField(blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    subscription_status = models.CharField(max_length=20, choices=SUBSCRIPTION_STATUSES, default='inactive')
    profile_views = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'providers'

    def __str__(self):
        return self.name


class ProviderPhoto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='photos')
    photo_url = models.URLField()
    is_primary = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'provider_photos'

    def __str__(self):
        return f"Photo for {self.provider.name}"


class ProviderCertificate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='certificates')
    certificate_name = models.CharField(max_length=255)
    certificate_url = models.URLField()
    issued_by = models.CharField(max_length=255, blank=True, null=True)
    issued_date = models.DateField(blank=True, null=True)
    expiry_date = models.DateField(blank=True, null=True)
    uploaded_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'provider_certificates'

    def __str__(self):
        return f"{self.certificate_name} - {self.provider.name}"


class Service(models.Model):
    SERVICE_TYPES = [
        ('individual', 'Individual Session'),
        ('group', 'Group Session'),
        ('package', 'Package Deal'),
        ('consultation', 'Consultation'),
        ('assessment', 'Assessment'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES, default='individual')
    duration_hours = models.IntegerField(default=1)  # Duration in hours
    duration_minutes = models.IntegerField(default=0)  # Additional minutes
    max_participants = models.IntegerField(default=1)  # For group sessions
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'services'

    def __str__(self):
        return f"{self.name} - {self.provider.name}"

    @property
    def duration_display(self):
        """Return formatted duration string"""
        if self.duration_hours == 0:
            return f"{self.duration_minutes} minutes"
        elif self.duration_minutes == 0:
            return f"{self.duration_hours} hour{'s' if self.duration_hours > 1 else ''}"
        else:
            return f"{self.duration_hours} hour{'s' if self.duration_hours > 1 else ''} {self.duration_minutes} minutes"


class Pricing(models.Model):
    PRICING_TYPES = [
        ('per_session', 'Per Session'),
        ('per_hour', 'Per Hour'),
        ('per_participant', 'Per Participant'),
        ('fixed', 'Fixed Price'),
        ('package', 'Package Price'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='pricings')
    pricing_type = models.CharField(max_length=20, choices=PRICING_TYPES, default='per_session')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    description = models.CharField(max_length=255, blank=True, null=True)  # e.g., "Introductory rate", "Group discount"
    min_sessions = models.IntegerField(default=1)  # For packages
    max_sessions = models.IntegerField(blank=True, null=True)  # For packages
    is_active = models.BooleanField(default=True)
    valid_from = models.DateField(blank=True, null=True)
    valid_until = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'pricings'

    def __str__(self):
        return f"{self.service.name} - {self.price} {self.currency}"

    def is_valid(self):
        """Check if pricing is currently valid"""
        now = timezone.now().date()
        if self.valid_from and now < self.valid_from:
            return False
        if self.valid_until and now > self.valid_until:
            return False
        return self.is_active


class Booking(models.Model):
    BOOKING_STATUSES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='bookings')
    pricing = models.ForeignKey(Pricing, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    booking_date = models.DateField()
    booking_time = models.TimeField()
    duration_hours = models.IntegerField(default=1)
    duration_minutes = models.IntegerField(default=0)
    participants = models.IntegerField(default=1)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, default='USD')
    special_requests = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=BOOKING_STATUSES, default='pending')
    payment_status = models.CharField(max_length=20, default='pending')  # pending, paid, refunded
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bookings'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.full_name} - {self.service.name} ({self.booking_date})"

    @property
    def provider(self):
        return self.service.provider

    def calculate_total(self):
        """Calculate total amount based on pricing"""
        if not self.pricing:
            return 0

        if self.pricing.pricing_type == 'per_session':
            return self.pricing.price
        elif self.pricing.pricing_type == 'per_hour':
            total_hours = self.duration_hours + (self.duration_minutes / 60)
            return self.pricing.price * total_hours
        elif self.pricing.pricing_type == 'per_participant':
            return self.pricing.price * self.participants
        elif self.pricing.pricing_type == 'fixed':
            return self.pricing.price
        elif self.pricing.pricing_type == 'package':
            return self.pricing.price

        return 0
