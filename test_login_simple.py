#!/usr/bin/env python
import os
import sys
import django
import json

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eduactivity.settings')
django.setup()

from django.test import Client
from backend.users.models import User

def test_login_api():
    print("=== TESTING LOGIN API ===")

    # Create a test client
    client = Client()

    # Test data
    test_cases = [
        {
            'email': 'arun@gmail.com',
            'password': '123456'
        },
        {
            'email': 'arun@gmail.com',
            'password': 'arun@gmail.com'
        }
    ]

    for i, test_data in enumerate(test_cases, 1):
        print(f"\nTest {i}: {test_data['email']} / {test_data['password']}")
        try:
            response = client.post(
                '/api/users/login/',
                data=json.dumps(test_data),
                content_type='application/json'
            )

            print(f"Status Code: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print("SUCCESS! Login worked.")
                print(f"User: {data.get('user', {}).get('email', 'Unknown')}")
                print(f"Tokens received: {bool(data.get('tokens', {}))}")
            else:
                print(f"FAILED: {response.content.decode()}")

        except Exception as e:
            print(f"Error: {e}")

def test_database():
    print("\n=== TESTING DATABASE ===")
    try:
        user = User.objects.get(email='arun@gmail.com')
        print(f"User found: {user.email}")
        print(f"User active: {user.is_active}")
        print(f"Password hash: {user.password[:30]}...")

        # Test password validation
        passwords_to_test = ['123456', 'arun@gmail.com', user.email]
        for pwd in passwords_to_test:
            is_valid = user.check_password(pwd)
            print(f"Password '{pwd}' valid: {is_valid}")

    except User.DoesNotExist:
        print("User 'arun@gmail.com' not found in database")
    except Exception as e:
        print(f"Database error: {e}")

if __name__ == '__main__':
    test_database()
    test_login_api()
