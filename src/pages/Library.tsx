
import { useState, useEffect } from "react";
import BookGrid from "@/components/BookGrid";
import { getAllBooks } from "@/services/bookService";
import { Book } from "@/types/book";

const Library = () => {
  // In a real app, we'd fetch this from an API or database
  const [books, setBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    setBooks(getAllBooks());
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Book Catalog</h1>
      <BookGrid books={books} />
    </div>
  );
};

export default Library;
