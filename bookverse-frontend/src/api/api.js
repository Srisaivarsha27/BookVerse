import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/xml",
    Accept: "application/xml",
  },
});

// XML Parser Function
const parseXML = (xmlString) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/xml");

  const booksContainer = xml.getElementsByTagName("books")[0]; // Root <books> wrapper
  if (!booksContainer) return [];

  return Array.from(booksContainer.getElementsByTagName("book")).map((book) => ({
    title: book.getElementsByTagName("title")[0]?.textContent,
    author: book.getElementsByTagName("author")[0]?.textContent,
    rating: book.getElementsByTagName("rating")[0]?.textContent,
    image: book.getElementsByTagName("image_url")[0]?.textContent,
  }));
};

// Convert JSON to XML format
const convertToXML = (json) => {
  let xml = `<book>`;
  for (const key in json) {
    xml += `<${key}>${json[key]}</${key}>`;
  }
  xml += `</book>`;
  return xml;
};

/* ================================
   📌 MongoDB CRUD Operations 
================================ */

// Get all books
export const getBooks = async () => {
  try {
    const response = await api.get("/books", { responseType: "text" });
    return parseXML(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const getBookByTitle = async (title) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/books/${title}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch book: ${title}`);
    }

    const xmlText = await response.text(); // Get XML response as text
    console.log("API Response (XML):", xmlText); // Debugging

    // Convert XML to JavaScript Object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Extract Book Details
    const bookNode = xmlDoc.getElementsByTagName("book")[0];
    if (!bookNode) {
      console.error("No book data found in XML!");
      return null;
    }

    // Extract multiple <genre> elements
    const genreNodes = bookNode.getElementsByTagName("genre");
    const genres = Array.from(genreNodes).map((genre) => genre.textContent);

    const bookData = {
      title: bookNode.getElementsByTagName("title")[0]?.textContent || "Unknown",
      author: bookNode.getElementsByTagName("author")[0]?.textContent || "Unknown",
      price: bookNode.getElementsByTagName("price")[0]?.textContent || "N/A",
      rating: bookNode.getElementsByTagName("rating")[0]?.textContent || "N/A",
      genres: genres, // Fixed genres extraction
      fiction: bookNode.getElementsByTagName("fiction")[0]?.textContent === "true",
      pacing: bookNode.getElementsByTagName("pacing")[0]?.textContent || "Unknown",
      image: bookNode.getElementsByTagName("image_url")[0]?.textContent || "",
    };

    console.log("Parsed Book Data:", bookData); // Debugging
    return bookData;
  } catch (error) {
    console.error("Error in getBookByTitle:", error);
    return null;
  }
};


// Add a new book
export const addBook = async (bookData) => {
  try {
    const xmlData = convertToXML(bookData);
    const response = await api.post("/books", xmlData);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    return null;
  }
};

// Update a book by title
export const updateBookByTitle = async (title, updatedData) => {
  try {
    const xmlData = convertToXML(updatedData);
    const response = await api.put(`/books/${encodeURIComponent(title)}`, xmlData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book "${title}":`, error);
    return null;
  }
};

// Delete a book by title
export const deleteBookByTitle = async (title) => {
  try {
    await api.delete(`/books/${encodeURIComponent(title)}`);
    return true;
  } catch (error) {
    console.error(`Error deleting book "${title}":`, error);
    return false;
  }
};

/* ================================
   📌 Neo4j Relationships 
================================ */

// WRITTEN_BY Relationship (Book → Author)
export const createWrittenBy = async (bookTitle, authorName) => {
  try {
    const response = await api.post(`/books/author/`, null, {
      params: { book_title: bookTitle, author_name: authorName },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating WRITTEN_BY relationship:", error);
    return null;
  }
};

export const getBooksBySameAuthor = async (bookTitle) => {
  try {
    const response = await api.get(`/books/same-author/`, { params: { book_title: bookTitle } });
    return response.data.books_by_same_author?.length ? response.data.books_by_same_author : [];
  } catch (error) {
    console.error("Error fetching books by the same author:", error);
    return [];
  }
};


export const updateWrittenBy = async (bookTitle, oldAuthor, newAuthor) => {
  try {
    const response = await api.put(`/books/author/`, null, {
      params: { book_title: bookTitle, old_author: oldAuthor, new_author: newAuthor },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating WRITTEN_BY relationship:", error);
    return null;
  }
};

export const deleteWrittenBy = async (bookTitle, authorName) => {
  try {
    const response = await api.delete(`/books/author/`, {
      params: { book_title: bookTitle, author_name: authorName },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting WRITTEN_BY relationship:", error);
    return null;
  }
};

// BELONGS_TO Relationship (Book → Genre)
export const createBelongsTo = async (bookTitle, genreName) => {
  try {
    const response = await api.post(`/books/genre/`, null, {
      params: { book_title: bookTitle, genre_name: genreName },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating BELONGS_TO relationship:", error);
    return null;
  }
};

export const getRelatedBooksByGenre = async (bookTitle) => {
  try {
    const response = await api.get(`/books/genre/related`, { params: { book_title: bookTitle } });
    return response.data.related_books?.length ? response.data.related_books : []; // Ensure it's an array
  } catch (error) {
    console.error("Error fetching related books by genre:", error);
    return []; // Return an empty array instead of null
  }
};


export const updateBelongsTo = async (bookTitle, oldGenre, newGenre) => {
  try {
    const response = await api.put(`/books/genre/`, null, {
      params: { book_title: bookTitle, old_genre: oldGenre, new_genre: newGenre },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating BELONGS_TO relationship:", error);
    return null;
  }
};

export const deleteBelongsTo = async (bookTitle, genreName) => {
  try {
    const response = await api.delete(`/books/genre/`, {
      params: { book_title: bookTitle, genre_name: genreName },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting BELONGS_TO relationship:", error);
    return null;
  }
};

// SIMILAR_TO Relationship (Book → Similar Book)
export const getSimilarBooks = async (title) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/books/similar/${title}`);
    if (!response.ok) throw new Error(`No similar books found for "${title}".`);

    const xmlText = await response.text();
    console.log("API Response (XML - Similar Books):", xmlText);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const bookNodes = xmlDoc.getElementsByTagName("book");
    let books = [];
    for (let i = 0; i < bookNodes.length; i++) {
      books.push(bookNodes[i].textContent);
    }

    return books.length > 0 ? books : ["No similar books found"];
  } catch (error) {
    console.error("Error fetching similar books:", error);
    return ["No similar books found"];
  }
};


export const createSimilarRelationship = async (book1, book2, weight) => {
  try {
    const response = await api.post(`/books/similar/`, null, {
      params: { book1, book2, weight },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating similar relationship:", error);
    return null;
  }
};

export const updateSimilarRelationship = async (book1, book2, new_weight) => {
  try {
    const response = await api.put(`/books/similar/`, null, {
      params: { book1, book2, new_weight },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating similar relationship:", error);
    return null;
  }
};

export const deleteSimilarRelationship = async (book1, book2) => {
  try {
    const response = await api.delete(`/books/similar/`, {
      params: { book1, book2 },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting similar relationship:", error);
    return null;
  }
};

export default api;
