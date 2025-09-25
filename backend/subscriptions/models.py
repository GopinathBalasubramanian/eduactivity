from django.db import models
import uuid
from django.utils import timezone
from providers.models import Provider


class Subscription(models.Model):
    PLAN_TYPES = [
        ('yearly', 'Yearly'),
        ('half_yearly', 'Half Yearly'),
    ]

    STATUSES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='subscriptions')
    plan_type = models.CharField(max_length=20, choices=PLAN_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    payment_id = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUSES, default='active')
    auto_renewal = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'subscriptions'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.provider.name} - {self.plan_type} ({self.status})"

    @property
    def is_active(self):
        return self.status == 'active' and self.end_date >= timezone.now().date()
