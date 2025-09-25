from rest_framework import serializers
from providers.models import Provider


class ProviderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['id', 'name', 'description', 'category', 'subcategory', 'address', 'is_approved']
