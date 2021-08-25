import os

DB_URI = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/learn-spanish")

CORS_ALLOWED_ORIGINS = (
    "http://localhost:3000",
    "https://learn-spanish.herokuapp.com",
    "https://learn-spanish.onrender.com",
)
