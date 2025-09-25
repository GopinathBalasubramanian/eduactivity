from django.db import models
import uuid
from django.utils import timezone
from users.models import User


class SearchAlert(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='search_alerts')
    search_query = models.JSONField()  # Store search parameters as JSON
    alert_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    last_notified = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'search_alerts'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.full_name}: {self.alert_name}"
