from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', views.password_reset, name='password-reset'),
    path('password-reset-confirm/', views.password_reset_confirm, name='password-reset-confirm'),
    path('verify-email/', views.verify_email, name='verify-email'),
    # Admin views
    path('admin/users/', views.AdminUserListView.as_view(), name='admin-users'),
    path('admin/providers/', views.AdminProviderListView.as_view(), name='admin-providers'),
]
