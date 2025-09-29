from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from .models import User
from .serializers import (
    UserSerializer, UserProfileSerializer, LoginSerializer,
    ChangePasswordSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer,
    UserListSerializer
)
from providers.models import Provider
from providers.serializers import ProviderAdminListSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            'user': UserProfileSerializer(user).data,
            'message': 'User registered successfully. Please login to continue.'
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'error': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Authenticate user
        try:
            user = User.objects.get(email=email)
            print(f"Login attempt for user: {user.email}")
            print(f"User active: {user.is_active}")
            print(f"Password hash: {user.password[:50]}...")
            print(f"Attempted password: {password}")

            if user.check_password(password):
                print("Password check passed!")
                if not user.is_active:
                    return Response(
                        {'error': 'User account is disabled.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                # Generate tokens
                refresh = RefreshToken.for_user(user)
                user_serializer = UserProfileSerializer(user)
                print(f"Login successful for user: {user.email}")
                return Response({
                    'user': user_serializer.data,
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                })
            else:
                print("Password check failed!")
                return Response(
                    {'error': 'Invalid credentials.'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        except User.DoesNotExist:
            print(f"User {email} does not exist")
            return Response(
                {'error': 'Invalid credentials.'},
                status=status.HTTP_401_UNAUTHORIZED
            )


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'old_password': 'Wrong password.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({'message': 'Password changed successfully.'})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset(request):
    serializer = PasswordResetSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data['email']
    try:
        user = User.objects.get(email=email)
        # Generate token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Send email
        reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
        send_mail(
            'Password Reset',
            f'Click here to reset your password: {reset_url}',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return Response({'message': 'Password reset email sent.'})
    except User.DoesNotExist:
        # Don't reveal if email exists or not
        return Response({'message': 'Password reset email sent.'})


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset_confirm(request):
    serializer = PasswordResetConfirmSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    try:
        uid = force_str(urlsafe_base64_decode(serializer.validated_data['token']))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({'token': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

    if not default_token_generator.check_token(user, serializer.validated_data['token']):
        return Response({'token': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(serializer.validated_data['new_password'])
    user.save()

    return Response({'message': 'Password reset successfully.'})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def verify_email(request):
    user = request.user
    # In a real implementation, you'd send a verification email
    # For now, just mark as verified
    user.is_verified = True
    user.save()

    return Response({'message': 'Email verified successfully.'})


class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow admin users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.user_type == 'admin'


class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserListSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None  # No pagination for admin lists


class AdminProviderListView(generics.ListAPIView):
    queryset = Provider.objects.all().order_by('-created_at')
    serializer_class = ProviderAdminListSerializer
    permission_classes = [IsAdminUser]
    pagination_class = None  # No pagination for admin lists
