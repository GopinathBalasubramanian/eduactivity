from django.urls import path
from . import views

app_name = 'providers'

urlpatterns = [
    path('', views.ProviderListCreateView.as_view(), name='provider-list-create'),
    path('my/', views.MyProviderView.as_view(), name='my-provider'),
    path('<uuid:pk>/', views.ProviderDetailView.as_view(), name='provider-detail'),
    path('<uuid:provider_id>/photos/', views.upload_provider_photo, name='upload-photo'),
    path('<uuid:provider_id>/certificates/', views.upload_provider_certificate, name='upload-certificate'),
    path('search/', views.ProviderSearchView.as_view(), name='provider-search'),

    # Service management URLs
    path('services/', views.ServiceListCreateView.as_view(), name='service-list-create'),
    path('services/<uuid:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),

    # Pricing management URLs
    path('services/<uuid:service_id>/pricing/', views.PricingListCreateView.as_view(), name='pricing-list-create'),
    path('pricing/<uuid:pk>/', views.PricingDetailView.as_view(), name='pricing-detail'),

    # Booking management URLs
    path('bookings/', views.BookingListCreateView.as_view(), name='booking-list-create'),
    path('bookings/<uuid:pk>/', views.BookingDetailView.as_view(), name='booking-detail'),
]
