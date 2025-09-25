-- PostgreSQL Setup Script for EduActivityFinder
-- Run this script as PostgreSQL superuser (usually 'postgres')

-- Create the database
CREATE DATABASE "edu-activity";

-- Create the user
CREATE USER postgres WITH PASSWORD '12345';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE "edu-activity" TO postgres;

-- Connect to the database and grant schema privileges
\c "edu-activity"
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
