from django.db import models
import uuid
from django.utils import timezone
from users.models import User
from providers.models import Provider


class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='messages')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'chats'
        ordering = ['created_at']
        indexes = [
            models.Index(fields=['sender', 'receiver', 'provider']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.sender.full_name} -> {self.receiver.full_name}: {self.message[:50]}..."

    def mark_as_read(self):
        self.is_read = True
        self.save(update_fields=['is_read'])
