import requests

BASE_URL = "http://localhost:5000"

def test_get_books():
    response = requests.get(f"{BASE_URL}/api/books")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_add_book():
    new_book = {"id": 3, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"}
    response = requests.post(f"{BASE_URL}/api/books", json=new_book)
    assert response.status_code == 200
    assert response.json()["message"] == "Book added successfully!"