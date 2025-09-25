# EduActivity Finder

A comprehensive web platform connecting students/parents with educational institutions, tuition centers, freelance teachers, and sports/activity providers.

## Features

- **User Roles**: Students/Parents, Providers, Admins
- **Search & Discovery**: Location-based search with filters
- **Provider Profiles**: Detailed profiles with photos, reviews, ratings
- **Subscription System**: Yearly/half-yearly plans with payment integration
- **Communication**: In-app chat, email, phone contacts
- **Admin Dashboard**: Provider approval, analytics, reports

## Tech Stack

- **Backend**: Django REST Framework, PostgreSQL
- **Frontend**: React.js, Redux Toolkit
- **Authentication**: JWT with social login
- **Payments**: Razorpay/Stripe integration
- **Maps**: Google Maps API
- **Notifications**: Email and push notifications

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis (optional, for caching)

### Backend Setup

1. **Clone and navigate**:
   ```bash
   cd EduActivityFinder/backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Database setup**:
   ```bash
   createdb eduactivity_db
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**:
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

## API Documentation

API endpoints are documented in `docs/api_design.md`. The API is available at `http://localhost:8000/api/`.

## Database Schema

Complete database schema is available in `docs/database_schema.md`.

## Deployment

See `docs/non_functional_requirements.md` for deployment strategies and infrastructure setup.

## Project Structure

```
EduActivityFinder/
├── backend/                 # Django REST API
│   ├── eduactivity/        # Main Django project
│   ├── users/              # User management
│   ├── providers/          # Provider management
│   └── [other apps...]
├── frontend/               # React web application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── features/      # Redux slices
│   │   └── utils/         # Utilities
│   └── public/
└── docs/                   # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@eduactivity.com or create an issue in this repository.
