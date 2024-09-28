# This script sets up a PostgreSQL container for the Next.js starter application.
# It uses the official PostgreSQL image and configures the database with a password and name.
# The database will be accessible on port 5432.

docker run --name nextjs-starter \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=nextjs-starter \
  -p 5432:5432 \
  -d postgres