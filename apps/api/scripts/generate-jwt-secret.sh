#!/bin/bash

# Script to generate a secure JWT_SECRET
# Usage: ./scripts/generate-jwt-secret.sh

echo "🔐 Generating secure JWT_SECRET..."

# Generate a 32-byte (64 hex characters) random secret
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

echo ""
echo "Generated JWT_SECRET:"
echo "$JWT_SECRET"
echo ""
echo "📝 To update your .env file, run:"
echo "   sed -i '' 's|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|' .env"
echo ""
echo "Or manually update JWT_SECRET in your .env file with the value above."
echo ""

