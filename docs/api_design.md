# EduActivity Finder API Design

## Overview
The API is built with Django REST Framework, using JWT authentication. All endpoints are prefixed with `/api/`.

## Authentication Endpoints

### POST /api/auth/token/
Obtain JWT token pair.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### POST /api/auth/token/refresh/
Refresh access token.

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

## User Management

### POST /api/users/register/
Register new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "user_type": "student"
}
```

### GET /api/users/profile/
Get current user profile.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "user_type": "student",
  "is_verified": true
}
```

### PUT /api/users/profile/
Update user profile.

## Provider Management

### POST /api/providers/
Create provider profile (for provider users).

**Request Body:**
```json
{
  "name": "ABC Tuition Center",
  "description": "Best NEET coaching in Delhi",
  "category": "education",
  "subcategory": "NEET",
  "address": "123 Main St, Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "contact_email": "info@abc.com",
  "contact_phone": "+911234567890",
  "website": "https://abc.com",
  "pricing_info": "₹5000/month"
}
```

### GET /api/providers/
List providers (with filters).

**Query Parameters:**
- `category`: education/sports
- `subcategory`: NEET, swimming, etc.
- `location`: city name or lat,lng
- `radius`: search radius in km
- `min_rating`: minimum rating
- `max_price`: maximum price

**Response:**
```json
{
  "count": 100,
  "next": "http://api.example.com/api/providers/?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "name": "ABC Tuition Center",
      "category": "education",
      "subcategory": "NEET",
      "address": "123 Main St, Delhi",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "rating": 4.5,
      "review_count": 25,
      "pricing_info": "₹5000/month",
      "photos": [
        {
          "photo_url": "https://example.com/photo1.jpg",
          "is_primary": true
        }
      ],
      "is_approved": true
    }
  ]
}
```

### GET /api/providers/{id}/
Get provider details.

**Response:**
```json
{
  "id": "uuid",
  "name": "ABC Tuition Center",
  "description": "Best NEET coaching in Delhi",
  "category": "education",
  "subcategory": "NEET",
  "address": "123 Main St, Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "contact_email": "info@abc.com",
  "contact_phone": "+911234567890",
  "website": "https://abc.com",
  "pricing_info": "₹5000/month",
  "rating": 4.5,
  "review_count": 25,
  "photos": [...],
  "certificates": [...],
  "reviews": [...]
}
```

### PUT /api/providers/{id}/
Update provider profile (owner only).

## Search

### GET /api/search/
Search providers.

**Query Parameters:**
- `q`: search query
- `category`: filter by category
- `subcategory`: filter by subcategory
- `location`: location search
- `lat`, `lng`: coordinates
- `radius`: search radius
- `sort`: relevance/distance/popularity/rating

**Response:** Same as providers list.

## Reviews

### GET /api/reviews/?provider={id}
Get reviews for a provider.

### POST /api/reviews/
Create review (verified users only).

**Request Body:**
```json
{
  "provider": "uuid",
  "rating": 5,
  "review_text": "Excellent coaching center!"
}
```

## Bookmarks

### GET /api/bookmarks/
Get user's bookmarks.

### POST /api/bookmarks/
Add bookmark.

**Request Body:**
```json
{
  "provider": "uuid"
}
```

### DELETE /api/bookmarks/{id}/
Remove bookmark.

## Chats

### GET /api/chats/
Get user's conversations.

### POST /api/chats/
Send message.

**Request Body:**
```json
{
  "receiver": "uuid",
  "provider": "uuid",
  "message": "Hello, I'm interested in your services."
}
```

## Subscriptions

### POST /api/subscriptions/
Create subscription.

**Request Body:**
```json
{
  "plan_type": "yearly",
  "payment_method": "razorpay"
}
```

### GET /api/subscriptions/
Get user's subscriptions.

## Notifications

### GET /api/notifications/
Get user's notifications.

### PUT /api/notifications/{id}/
Mark notification as read.

## Categories

### GET /api/categories/
Get all categories and subcategories.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Education",
    "subcategories": [
      {"id": "uuid", "name": "NEET"},
      {"id": "uuid", "name": "JEE"}
    ]
  },
  {
    "id": "uuid",
    "name": "Sports",
    "subcategories": [
      {"id": "uuid", "name": "Swimming"},
      {"id": "uuid", "name": "Badminton"}
    ]
  }
]
```

## Admin Endpoints

### GET /api/admin/providers/
List all providers (admin only).

### PUT /api/admin/providers/{id}/approve/
Approve provider.

### GET /api/admin/reports/
Get usage reports.

## Error Responses

All endpoints return standard HTTP status codes. Error responses include:

```json
{
  "error": "Error message",
  "details": {...}
}
```

## Pagination

List endpoints support pagination:

```json
{
  "count": 100,
  "next": "http://api.example.com/api/providers/?page=2",
  "previous": null,
  "results": [...]
}
```

## Rate Limiting

- 100 requests per hour for unauthenticated users
- 1000 requests per hour for authenticated users
- 10000 requests per hour for providers
