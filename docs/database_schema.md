# EduActivity Finder Database Schema

## Overview
The database uses PostgreSQL with a relational schema to manage users, providers, subscriptions, reviews, chats, and notifications.

## Tables

### 1. users
Stores all user types: students/parents, providers, admins.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email |
| phone | VARCHAR(20) | UNIQUE | User phone number |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password |
| first_name | VARCHAR(100) | NOT NULL | First name |
| last_name | VARCHAR(100) | NOT NULL | Last name |
| user_type | VARCHAR(20) | NOT NULL | 'student', 'provider', 'admin' |
| is_verified | BOOLEAN | DEFAULT FALSE | Email/phone verification status |
| is_active | BOOLEAN | DEFAULT TRUE | Account active status |
| created_at | TIMESTAMP | DEFAULT NOW() | Account creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |
| last_login | TIMESTAMP | NULL | Last login time |

### 2. providers
Extended profile for provider users.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY(users.id) | Reference to users table |
| name | VARCHAR(255) | NOT NULL | Provider name |
| description | TEXT | NULL | Provider description |
| category | VARCHAR(100) | NOT NULL | 'education', 'sports', etc. |
| subcategory | VARCHAR(100) | NULL | 'NEET', 'swimming', etc. |
| address | TEXT | NOT NULL | Full address |
| latitude | DECIMAL(10,8) | NULL | Geographic latitude |
| longitude | DECIMAL(11,8) | NULL | Geographic longitude |
| contact_email | VARCHAR(255) | NULL | Contact email |
| contact_phone | VARCHAR(20) | NULL | Contact phone |
| website | VARCHAR(255) | NULL | Website URL |
| pricing_info | TEXT | NULL | Pricing details |
| is_approved | BOOLEAN | DEFAULT FALSE | Admin approval status |
| subscription_status | VARCHAR(20) | DEFAULT 'inactive' | 'active', 'expired', 'inactive' |
| profile_views | INTEGER | DEFAULT 0 | Number of profile views |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

### 3. provider_photos
Photos for provider profiles.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| provider_id | UUID | FOREIGN KEY(providers.id) | Reference to providers |
| photo_url | VARCHAR(500) | NOT NULL | Photo URL/path |
| is_primary | BOOLEAN | DEFAULT FALSE | Primary photo flag |
| uploaded_at | TIMESTAMP | DEFAULT NOW() | Upload time |

### 4. provider_certificates
Certificates for providers.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| provider_id | UUID | FOREIGN KEY(providers.id) | Reference to providers |
| certificate_name | VARCHAR(255) | NOT NULL | Certificate name |
| certificate_url | VARCHAR(500) | NOT NULL | Certificate file URL |
| issued_by | VARCHAR(255) | NULL | Issuing authority |
| issued_date | DATE | NULL | Issue date |
| expiry_date | DATE | NULL | Expiry date |
| uploaded_at | TIMESTAMP | DEFAULT NOW() | Upload time |

### 5. subscriptions
Subscription plans and payments.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| provider_id | UUID | FOREIGN KEY(providers.id) | Reference to providers |
| plan_type | VARCHAR(20) | NOT NULL | 'yearly', 'half_yearly' |
| amount | DECIMAL(10,2) | NOT NULL | Subscription amount |
| currency | VARCHAR(3) | DEFAULT 'USD' | Currency code |
| payment_id | VARCHAR(255) | NULL | Payment gateway transaction ID |
| start_date | DATE | NOT NULL | Subscription start date |
| end_date | DATE | NOT NULL | Subscription end date |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| auto_renewal | BOOLEAN | DEFAULT FALSE | Auto-renewal enabled |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

### 6. reviews
User reviews and ratings for providers.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY(users.id) | Reviewer user ID |
| provider_id | UUID | FOREIGN KEY(providers.id) | Reviewed provider ID |
| rating | INTEGER | NOT NULL, CHECK (rating >=1 AND rating <=5) | Rating 1-5 |
| review_text | TEXT | NULL | Review content |
| is_verified | BOOLEAN | DEFAULT FALSE | Verified review flag |
| created_at | TIMESTAMP | DEFAULT NOW() | Review creation time |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update time |

### 7. chats
In-app messaging between users and providers.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| sender_id | UUID | FOREIGN KEY(users.id) | Sender user ID |
| receiver_id | UUID | FOREIGN KEY(users.id) | Receiver user ID |
| provider_id | UUID | FOREIGN KEY(providers.id) | Related provider ID |
| message | TEXT | NOT NULL | Message content |
| is_read | BOOLEAN | DEFAULT FALSE | Read status |
| created_at | TIMESTAMP | DEFAULT NOW() | Message time |

### 8. notifications
System notifications.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY(users.id) | Target user ID |
| title | VARCHAR(255) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification content |
| notification_type | VARCHAR(50) | NOT NULL | 'email', 'push', 'in_app' |
| is_read | BOOLEAN | DEFAULT FALSE | Read status |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation time |

### 9. bookmarks
User bookmarks/favorites.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY(users.id) | User ID |
| provider_id | UUID | FOREIGN KEY(providers.id) | Bookmarked provider ID |
| created_at | TIMESTAMP | DEFAULT NOW() | Bookmark time |

### 10. search_alerts
Saved searches and alerts.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| user_id | UUID | FOREIGN KEY(users.id) | User ID |
| search_query | JSONB | NOT NULL | Search parameters as JSON |
| alert_name | VARCHAR(255) | NOT NULL | Alert name |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| last_notified | TIMESTAMP | NULL | Last notification time |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation time |

### 11. categories
Provider categories and subcategories.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Category name |
| description | TEXT | NULL | Category description |
| parent_id | UUID | FOREIGN KEY(categories.id) | Parent category for subcategories |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation time |

## Indexes
- users: email, phone, user_type
- providers: user_id, category, subcategory, latitude, longitude, is_approved
- subscriptions: provider_id, is_active
- reviews: provider_id, user_id, rating
- chats: sender_id, receiver_id, provider_id, created_at
- notifications: user_id, is_read, created_at
- bookmarks: user_id, provider_id
- search_alerts: user_id, is_active

## Relationships
- users (1) -> providers (1): One user can have one provider profile
- providers (1) -> provider_photos (M): One provider can have multiple photos
- providers (1) -> provider_certificates (M): One provider can have multiple certificates
- providers (1) -> subscriptions (M): One provider can have multiple subscriptions
- providers (1) -> reviews (M): One provider can have multiple reviews
- users (1) -> reviews (M): One user can write multiple reviews
- users (1) -> chats (M): Users can send/receive multiple messages
- users (1) -> notifications (M): Users can receive multiple notifications
- users (1) -> bookmarks (M): Users can bookmark multiple providers
- users (1) -> search_alerts (M): Users can have multiple search alerts
- categories (1) -> categories (M): Self-referencing for subcategories
