from http.client import responses

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_sort_mixed_case():
    response = client.post("/webhook/sort-word", json={"data": "Cba"})
    assert response.status_code == 200
    assert response.json() == {"word": ["a", "b", "c"]}

def test_sort_with_special_characters():
    response = client.post("/webhook/sort-word", json={"data": "b@a!"})
    assert response.status_code == 200
    assert response.json() == {"word": ["!", "@", "a", "b"]}

def test_missing_data_key():
    response = client.post("/webhook/sort-word", json={})
    assert response.status_code == 422

def test_data_none():
    response = client.post("/webhook/sort-word", json={"word": None})
    assert response.status_code == 422

def test_data_is_not_string():
    response = client.post("/webhook/sort-word", json={"data": 123})
    assert response.status_code == 422

def test_unicode_data():
    response = client.post("/webhook/sort-word", json={"data": "café"})
    assert response.status_code == 200
    assert response.json() == {"word": ["a", "c", "f", "é"]}

def test_long_data():
    long_data = "z" * 5000 + "a" * 5000
    response = client.post("/webhook/sort-word", json={"data": long_data})
    assert response.status_code == 200
    assert response.json()["word"][0] == "a"
    assert response.json()["word"][-1] == "z"
    assert len(response.json()["word"]) == 10000