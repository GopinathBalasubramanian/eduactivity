#!/usr/bin/env python
import os
import sys
import django
import requests
import json

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eduactivity.settings')
django.setup()

from backend.users.models import User

def test_database():
    print("=== DATABASE TEST ===")
    try:
        user = User.objects.get(email='arun@gmail.com')
        print(f'User found: {user.email}')
        print(f'User is active: {user.is_active}')
        print(f'Hashed password: {user.password[:50]}...')

        # Test password check
        test_password = '123456'
        is_valid = user.check_password(test_password)
        print(f'Password "{test_password}" is valid: {is_valid}')

        # List all users
        print('\nAll users in database:')
        all_users = User.objects.all()
        for u in all_users:
            print(f'- {u.email}: {u.first_name} {u.last_name}, active: {u.is_active}, password hash: {u.password[:20]}...')

    except User.DoesNotExist:
        print('User arun@gmail.com not found')
    except Exception as e:
        print(f'Error: {e}')

def test_api():
    print("\n=== API TEST ===")
    # Test the login API directly
    login_url = 'http://localhost:8000/api/users/login/'

    test_credentials = [
        {'email': 'arun@gmail.com', 'password': '123456'},
        {'email': 'arun@gmail.com', 'password': 'arun@gmail.com'},
    ]

    for i, creds in enumerate(test_credentials, 1):
        print(f"\nTest {i}: {creds}")
        try:
            response = requests.post(login_url, json=creds)
            print(f'Status Code: {response.status_code}')
            print(f'Response: {response.text[:200]}...')
        except Exception as e:
            print(f'Error: {e}')

if __name__ == '__main__':
    test_database()
    test_api()
