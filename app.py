import json
import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="static")
CORS(app)

BOOKS_FILE = "books.json"

# Load books from a file (if it exists)
def load_books():
    if os.path.exists(BOOKS_FILE):
        with open(BOOKS_FILE, "r") as file:
            return json.load(file)
    return []  # Return an empty list if no file exists

# Save books to a file
def save_books():
    with open(BOOKS_FILE, "w") as file:
        json.dump(books, file, indent=4)

# Initialize books list from file
books = load_books()

@app.route('/api/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/api/books', methods=['POST'])
def add_book():
    new_book = request.json
    if not new_book or not new_book.get("title") or not new_book.get("author"):
        return jsonify({"error": "Title and author are required"}), 400

    new_book["id"] = max([book["id"] for book in books], default=0) + 1
    books.append(new_book)
    save_books()  # Save to file
    return jsonify(new_book), 201

@app.route('/api/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    global books
    book_to_delete = next((book for book in books if book["id"] == id), None)
    if not book_to_delete:
        return jsonify({"error": "Book not found"}), 404

    books = [book for book in books if book["id"] != id]
    save_books()  # Save updated list to file
    return jsonify({"message": "Book deleted successfully"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
