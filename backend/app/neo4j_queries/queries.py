from neo4j import GraphDatabase

# Connect to Neo4j
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "bookverse"

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# 📌 1️⃣ Get similar books
def get_similar_books_from_db(book_name):
    query = """
    MATCH (:Book {title: $book_name})-[:SIMILAR_TO]->(similar:Book)
    RETURN similar.title
    """
    with driver.session() as session:
        result = session.run(query, book_name=book_name)
        return [record["similar.title"] for record in result]

# 📌 2️⃣ Create a SIMILAR_TO relationship
def create_similar_relationship(book1, book2, weight):
    query = """
    MATCH (b1:Book {title: $book1}), (b2:Book {title: $book2})
    MERGE (b1)-[r:SIMILAR_TO]->(b2)
    SET r.weight = $weight
    RETURN r
    """
    with driver.session() as session:
        result = session.run(query, book1=book1, book2=book2, weight=weight)
        return result.single() is not None

# 📌 3️⃣ Update a SIMILAR_TO relationship
def update_similar_relationship(book1, book2, new_weight):
    query = """
    MATCH (b1:Book {title: $book1})-[r:SIMILAR_TO]->(b2:Book {title: $book2})
    SET r.weight = $new_weight
    RETURN r
    """
    with driver.session() as session:
        result = session.run(query, book1=book1, book2=book2, new_weight=new_weight)
        return result.single() is not None

# 📌 4️⃣ Delete a SIMILAR_TO relationship
def delete_similar_relationship(book1, book2):
    query = """
    MATCH (b1:Book {title: $book1})-[r:SIMILAR_TO]->(b2:Book {title: $book2})
    DELETE r
    RETURN COUNT(r) AS deletedCount
    """
    with driver.session() as session:
        result = session.run(query, book1=book1, book2=book2)
        return result.single()["deletedCount"] > 0



class Neo4jQueries:
    def __init__(self):
        self.driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

    def close(self):
        self.driver.close()

    # 📌 1️⃣ Get Similar Books
    def get_similar_books(self, book_name):
        query = "MATCH (:Book {title: $book_name})-[:SIMILAR_TO]->(similar:Book) RETURN similar.title"
        with self.driver.session() as session:
            return [record["similar.title"] for record in session.run(query, book_name=book_name)]

    # 📌 2️⃣ Create SIMILAR_TO Relationship
    def create_similar_relationship(self, book1, book2, weight):
        query = """
        MATCH (b1:Book {title: $book1}), (b2:Book {title: $book2})
        MERGE (b1)-[r:SIMILAR_TO]->(b2) SET r.weight = $weight RETURN r
        """
        with self.driver.session() as session:
            return session.run(query, book1=book1, book2=book2, weight=weight).single() is not None

    # 📌 3️⃣ Update SIMILAR_TO Relationship
    def update_similar_relationship(self, book1, book2, new_weight):
        query = "MATCH (b1:Book {title: $book1})-[r:SIMILAR_TO]->(b2:Book {title: $book2}) SET r.weight = $new_weight RETURN r"
        with self.driver.session() as session:
            return session.run(query, book1=book1, book2=book2, new_weight=new_weight).single() is not None

    # 📌 4️⃣ Delete SIMILAR_TO Relationship
    def delete_similar_relationship(self, book1, book2):
        query = "MATCH (b1:Book {title: $book1})-[r:SIMILAR_TO]->(b2:Book {title: $book2}) DELETE r RETURN COUNT(r) AS deletedCount"
        with self.driver.session() as session:
            return session.run(query, book1=book1, book2=book2).single()["deletedCount"] > 0

    # 📌 5️⃣ BELONGS_TO Relationship
    def create_belongs_to_relationship(self, book_title, genre_name):
        query = "MERGE (b:Book {title: $book_title}) MERGE (g:Genre {name: $genre_name}) MERGE (b)-[:BELONGS_TO]->(g) RETURN g.name"
        with self.driver.session() as session:
            return session.run(query, book_title=book_title, genre_name=genre_name).single()

    def get_related_books_by_genre(self, book_title):
        query = "MATCH (b:Book {title: $book_title})-[:BELONGS_TO]->(g:Genre)<-[:BELONGS_TO]-(other:Book) RETURN other.title AS related_books"
        with self.driver.session() as session:
            return [record["related_books"] for record in session.run(query, book_title=book_title)]

    def update_belongs_to_relationship(self, book_title, old_genre, new_genre):
        query = """
        MATCH (b:Book {title: $book_title})-[r:BELONGS_TO]->(g:Genre {name: $old_genre})
        DELETE r
        MERGE (new_g:Genre {name: $new_genre})
        MERGE (b)-[:BELONGS_TO]->(new_g)
        RETURN new_g.name
        """
        with self.driver.session() as session:
            return session.run(query, book_title=book_title, old_genre=old_genre, new_genre=new_genre).single()

    def delete_belongs_to_relationship(self, book_title, genre_name):
        query = """
        MATCH (b:Book {title: $book_title})-[r:BELONGS_TO]->(g:Genre {name: $genre_name})
        DELETE r
        RETURN COUNT(r) AS deletedCount
        """
        with self.driver.session() as session:
            return session.run(query, book_title=book_title, genre_name=genre_name).single()["deletedCount"] > 0
    def create_written_by_relationship(self, book_title, author_name):
        query = """
        MERGE (b:Book {title: $book_title})
        MERGE (a:Author {name: $author_name})
        MERGE (b)-[:WRITTEN_BY]->(a)
        RETURN a.name
        """
        with self.driver.session() as session:
            return session.run(query, book_title=book_title, author_name=author_name).single()
        
    def get_books_by_same_author(self, book_title):
        query = """
        MATCH (b:Book {title: $book_title})-[:WRITTEN_BY]->(a:Author)<-[:WRITTEN_BY]-(other:Book)
        RETURN other.title AS related_books
        """
        with self.driver.session() as session:
            return [record["related_books"] for record in session.run(query, book_title=book_title)]

    def update_written_by_relationship(self, book_title, old_author, new_author):
        query = """
        MATCH (b:Book {title: $book_title})-[r:WRITTEN_BY]->(a:Author {name: $old_author})
        DELETE r
        MERGE (new_a:Author {name: $new_author})
        MERGE (b)-[:WRITTEN_BY]->(new_a)
        RETURN new_a.name
        """
        with self.driver.session() as session:
            return session.run(query, book_title=book_title, old_author=old_author, new_author=new_author).single()

    def delete_written_by_relationship(self, book_title, author_name):
        query = """
        MATCH (b:Book {title: $book_title})-[r:WRITTEN_BY]->(a:Author {name: $author_name})
        DELETE r
        RETURN COUNT(r) AS deletedCount
        """
        with self.driver.session() as session:
            return session.run(query, book_title=book_title, author_name=author_name).single()["deletedCount"] > 0


neo4j_db = Neo4jQueries()
