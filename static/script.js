// DOM Elements
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const bookList = document.getElementById("books");

// Fetch books from the backend and update UI
async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:5000/api/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books = await response.json();
    console.log("Books fetched:", books); // Debugging
    renderBooks(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Render books in the UI
function renderBooks(books) {
  bookList.innerHTML = ""; // Clear previous list
  if (books.length === 0) {
    bookList.innerHTML = "<p>No books found. Add some books!</p>";
    return;
  }

  books.forEach((book) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${book.title}</strong> by ${book.author}</span>
      <button onclick="deleteBook(${book.id})" style="background:red;color:white;border:none;padding:5px;cursor:pointer;">❌</button>
    `;
    bookList.appendChild(li);
  });
}

// Add a new book
async function addBook(title, author) {
  try {
    const response = await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    console.log("Book added successfully! Refreshing list...");
    await fetchBooks(); // Refresh list after adding book
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

// Delete a book
async function deleteBook(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    console.log("Book deleted successfully! Refreshing list...");
    await fetchBooks(); // Refresh list after deleting book
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

// Event listener for the form submission
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    addBook(title, author);
    titleInput.value = "";
    authorInput.value = "";
  }
});

// Fetch books on page load
fetchBooks();
