# 📚 BookVerse — Intelligent Book Explorer

BookVerse is a full-stack web application for book lovers that combines the power of MongoDB and Neo4j to create a rich, interconnected book browsing experience. It allows users to explore books, view metadata like rating and genre, and get recommendations based on similarity, sequels, or shared authorship.

---

## 🔧 Tech Stack

- 🧠 Backend: FastAPI (Python)
- 📦 Content Database: MongoDB
- 🕸️ Graph Database: Neo4j
- 🎨 Frontend: React.js (basic interface for browsing)
- 📂 Data Format: XML input/output for REST APIs

---

## ✨ Features

### MongoDB-Powered (Content Layer)
- Stores metadata such as:
  - Title, Author, Rating, Genre (as a list), Image URL
- CRUD operations for managing book entries

### Neo4j-Powered (Recommendation Layer)
- Graph relationships:
  - SIMILAR_TO (for similar books)
  - BELONGS_TO (book → genre)
  - WRITTEN_BY (book → author)
- Graph-based queries:
  - Get similar books
  - Find books by the same author
  - Fetch books from the same genre

---

## 🚀 API Endpoints

### 📦 MongoDB Routes (XML)
| Method | Route                     | Description                |
|--------|---------------------------|----------------------------|
| POST   | /books                    | Add a new book (XML)       |
| GET    | /books                    | Get all books              |
| GET    | /books/{title}           | Get book by title          |
| PUT    | /books/{title}           | Update book by title       |
| DELETE | /books/{title}           | Delete book by title       |

### 🕸️ Neo4j Routes (JSON)
| Method | Route                            | Description                                |
|--------|----------------------------------|--------------------------------------------|
| GET    | /books/similar/{book_name}       | Get books similar to a given book          |
| POST   | /books/similar/                  | Create SIMILAR_TO relationship             |
| PUT    | /books/similar/                  | Update SIMILAR_TO relationship             |
| DELETE | /books/similar/                  | Delete SIMILAR_TO relationship             |
| POST   | /books/genre/                    | Add BELONGS_TO relationship                |
| GET    | /books/genre/related/            | Get books related by genre                 |
| PUT    | /books/genre/                    | Update genre relationship                  |
| DELETE | /books/genre/                    | Delete genre relationship                  |
| POST   | /books/author/                   | Add WRITTEN_BY relationship                |
| GET    | /books/same-author/              | Get books by same author                   |
| PUT    | /books/author/                   | Update author relationship                 |
| DELETE | /books/author/                   | Delete author relationship                 |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/bookverse.git
cd bookverse
````

### 2️⃣ MongoDB Setup

* Ensure MongoDB is running locally (default URI: `mongodb://localhost:27017`)
* Create a database named `bookverse` with a collection `books`

### 3️⃣ Neo4j Setup

* Install and run Neo4j Desktop or Docker version
* Connect to: `bolt://localhost:7687`
* Default credentials:

  * Username: neo4j
  * Password: bookverse

### 4️⃣ Python Backend Setup

```bash
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 5️⃣ Frontend (Optional)

```bash
cd frontend
npm install
npm start
```

📝 Note: Currently, the frontend only supports browsing. CRUD operations are handled via the backend APIs.

---

## 🧪 Sample XML Payload

Use this for POST/PUT requests to /books:

```xml
<book>
  <title>Omniscient Reader's Viewpoint</title>
  <author>SingNSong</author>
  <rating>4.8</rating>
  <image>https://example.com/orv.jpg</image>
  <genre>
    <item>Fantasy</item>
    <item>New Adult</item>
  </genre>
</book>
```

---

## 🗂 Project Structure

```
bookverse/
│
├── app/
│   ├── main.py                # FastAPI app
│   ├── mongodb_routes.py      # MongoDB CRUD APIs
│   ├── neo4j_routes.py        # Neo4j recommendation APIs
│   └── neo4j_queries/
│       └── queries.py         # Graph query logic
│
├── frontend/                  # React frontend (optional)
├── requirements.txt
└── README.md
```

## 🧠 Future Improvements

* Add frontend CRUD support
* Search and filter capabilities
* User accounts and favorites
* Book rating analytics

---

💡 Designed with ❤️ for book lovers who want both metadata and meaningful relationships.

