from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_getAllBooks():
    response = client.get("/api/getAllBooks")
    assert response.status_code == 200
