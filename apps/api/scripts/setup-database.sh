#!/bin/bash

# Database setup script for Nari Sangha API
# This script creates the PostgreSQL user, database, and grants necessary privileges

set -e

echo "🚀 Setting up PostgreSQL database for Nari Sangha API..."

# Find psql command
PSQL_CMD=""
if command -v psql &> /dev/null; then
    PSQL_CMD="psql"
elif [ -f "/opt/homebrew/opt/postgresql@16/bin/psql" ]; then
    PSQL_CMD="/opt/homebrew/opt/postgresql@16/bin/psql"
elif [ -f "/usr/local/opt/postgresql@16/bin/psql" ]; then
    PSQL_CMD="/usr/local/opt/postgresql@16/bin/psql"
else
    echo "❌ Error: psql command not found. Please ensure PostgreSQL is installed and in your PATH."
    echo "   Try: export PATH=\"/opt/homebrew/opt/postgresql@16/bin:\$PATH\""
    exit 1
fi

# Parse DATABASE_URL from .env file
ENV_FILE=".env"
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: .env file not found. Please create it from .env.example first."
    exit 1
fi

# Extract database connection details from .env
DATABASE_URL=$(grep DATABASE_URL "$ENV_FILE" | cut -d '=' -f2 | tr -d '"')

if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL not found in .env file"
    exit 1
fi

# Parse connection string (format: postgresql://user:password@host:port/database?schema=public)
# Extract user, password, host, port, and database name
DB_USER=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
DB_HOST=$(echo "$DATABASE_URL" | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo "$DATABASE_URL" | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo "$DATABASE_URL" | sed -n 's/.*\/\([^?]*\).*/\1/p')

echo "📋 Database Configuration:"
echo "   User: $DB_USER"
echo "   Host: $DB_HOST"
echo "   Port: ${DB_PORT:-5432}"
echo "   Database: $DB_NAME"
echo ""

# Check if PostgreSQL is running
PG_ISREADY_CMD=""
if command -v pg_isready &> /dev/null; then
    PG_ISREADY_CMD="pg_isready"
elif [ -f "/opt/homebrew/opt/postgresql@16/bin/pg_isready" ]; then
    PG_ISREADY_CMD="/opt/homebrew/opt/postgresql@16/bin/pg_isready"
elif [ -f "/usr/local/opt/postgresql@16/bin/pg_isready" ]; then
    PG_ISREADY_CMD="/usr/local/opt/postgresql@16/bin/pg_isready"
fi

if [ -n "$PG_ISREADY_CMD" ]; then
    if ! $PG_ISREADY_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" > /dev/null 2>&1; then
        echo "⚠️  PostgreSQL doesn't seem to be running. Starting PostgreSQL..."
        brew services start postgresql@16 || echo "Please start PostgreSQL manually: brew services start postgresql@16"
        sleep 2
    fi
else
    echo "⚠️  Could not check PostgreSQL status. Please ensure PostgreSQL is running."
    echo "   Start with: brew services start postgresql@16"
fi

# Connect to PostgreSQL and create user and database
echo "📦 Creating database user and database..."

# Try to connect as current user first, then try postgres
PG_USER=""
if $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$(whoami)" -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    PG_USER="$(whoami)"
elif $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -U postgres -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    PG_USER="postgres"
else
    echo "⚠️  Could not connect to PostgreSQL. Trying without specifying user..."
    PG_USER=""
fi

# Create user (ignore error if user already exists)
if [ -n "$PG_USER" ]; then
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$PG_USER" -d postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || echo "   User '$DB_USER' already exists, skipping..."
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$PG_USER" -d postgres -c "ALTER USER $DB_USER CREATEDB;" 2>/dev/null || true
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$PG_USER" -d postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || echo "   Database '$DB_NAME' already exists, skipping..."
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$PG_USER" -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null || true
else
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -d postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || echo "   User '$DB_USER' already exists, skipping..."
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -d postgres -c "ALTER USER $DB_USER CREATEDB;" 2>/dev/null || true
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -d postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || echo "   Database '$DB_NAME' already exists, skipping..."
    $PSQL_CMD -h "$DB_HOST" -p "${DB_PORT:-5432}" -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null || true
fi

echo ""
echo "✅ Database setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Run: npm run prisma:generate"
echo "   2. Run: npm run prisma:migrate"
echo ""

