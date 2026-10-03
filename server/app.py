from flask import Flask
import psycopg
from db import get_connection

app = Flask(__name__)


@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.get("/api/health/db")
def database_health():
    try:
        with get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
                cursor.fetchone()

        return {"status": "ok"}

    except psycopg.Error:
        app.logger.exception("Database health check failed")
        return {"status": "error"}, 503