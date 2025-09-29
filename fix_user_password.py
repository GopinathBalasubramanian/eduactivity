#!/usr/bin/env python
import os
import sys
import django

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eduactivity.settings')
django.setup()

from backend.users.models import User

def fix_user_password():
    """Fix the password for arun@gmail.com user"""
    try:
        user = User.objects.get(email='arun@gmail.com')
        print(f"Found user: {user.email}")
        print(f"Current password hash: {user.password}")

        # Set a new password and hash it properly
        new_password = '123456'
        user.set_password(new_password)
        user.save()

        print(f"Password updated successfully!")
        print(f"New password hash: {user.password}")

        # Verify the password works
        is_valid = user.check_password(new_password)
        print(f"Password verification: {is_valid}")

        # Also test with the email as password (common issue)
        email_password = user.email
        is_valid_email = user.check_password(email_password)
        print(f"Email as password verification: {is_valid_email}")

        return True

    except User.DoesNotExist:
        print("User 'arun@gmail.com' not found")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == '__main__':
    print("=== FIXING USER PASSWORD ===")
    success = fix_user_password()
    if success:
        print("\nPassword fixed successfully! Try logging in with:")
        print("Email: arun@gmail.com")
        print("Password: 123456")
    else:
        print("\nFailed to fix password")
