# PostgreSQL Setup for EduActivityFinder

This guide will help you set up PostgreSQL database for the EduActivityFinder project.

## Prerequisites

- Windows 10/11
- Administrative privileges

## Step 1: Install PostgreSQL

1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Choose the latest version (recommended: PostgreSQL 15 or 16)
3. Run the installer as Administrator
4. During installation:
   - Choose your installation directory
   - Set password for `postgres` superuser (you can use any password)
   - Keep default port `5432`
   - Select all components to install

## Step 2: Configure PostgreSQL

1. After installation, PostgreSQL should be running as a Windows service
2. Open pgAdmin (installed with PostgreSQL) or use command line

### Using pgAdmin (GUI):

1. Open pgAdmin
2. Connect to your PostgreSQL server (usually `localhost:5432`)
3. Right-click on "Databases" → Create → Database
4. Name: `edu-activity`
5. Owner: `postgres`
6. Click Save

### Using Command Line:

1. Open Command Prompt as Administrator
2. Navigate to PostgreSQL bin directory (usually `C:\Program Files\PostgreSQL\15\bin`)
3. Run: `psql -U postgres -h localhost`
4. Enter the password you set during installation
5. Run the setup script:

```sql
-- Create the database
CREATE DATABASE "edu-activity";

-- Create the user with the password from .env
CREATE USER postgres WITH PASSWORD '12345';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE "edu-activity" TO postgres;
```

## Step 3: Verify Configuration

1. Test the connection:
   ```bash
   psql -U postgres -d edu-activity -h localhost -p 5432
   ```

2. Enter password: `12345`

3. If connected successfully, you should see the PostgreSQL prompt

## Step 4: Run Django Migrations

1. In your project directory:
   ```bash
   cd backend
   python manage.py makemigrations
   python manage.py migrate
   ```

2. Create superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

## Step 5: Test the Application

1. Start the Django server:
   ```bash
   python manage.py runserver
   ```

2. The application should now connect to PostgreSQL and store data there

## Troubleshooting

### Connection Issues:
- Make sure PostgreSQL service is running (check Windows Services)
- Verify the credentials in `.env` match your PostgreSQL setup
- Check if port 5432 is not blocked by firewall

### Permission Issues:
- Ensure the `postgres` user has the correct password
- Make sure the database `edu-activity` exists and the user has access

### Migration Issues:
- If you get migration errors, try resetting the database:
  ```bash
  python manage.py flush
  python manage.py migrate
  ```

## Environment Variables

The application reads database credentials from these environment variables (set in `.env`):

```
DB_DATABASE=edu-activity
DB_USERNAME=postgres
DB_PASSWORD=12345
DB_HOST=localhost
DB_PORT=5432
```

Make sure these match your PostgreSQL setup.
