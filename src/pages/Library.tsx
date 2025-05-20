
import { useState } from "react";
import BookGrid from "@/components/BookGrid";

// Mock data for the library
const mockBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    status: "reading" as const,
    progress: 45,
  },
  {
    id: "2",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverImg: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    status: "wishlist" as const,
  },
  {
    id: "4",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverImg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: "reading" as const,
    progress: 78,
  },
  {
    id: "5",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    coverImg: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc",
    status: "completed" as const,
  },
  {
    id: "6",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: "completed" as const,
  },
  {
    id: "7",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    status: "completed" as const,
  },
  {
    id: "8",
    title: "1984",
    author: "George Orwell",
    coverImg: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status: "wishlist" as const,
  },
];

const Library = () => {
  // In a real app, we'd fetch this from an API or database
  const [books] = useState(mockBooks);

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">My Library</h1>
      <BookGrid books={books} />
    </div>
  );
};

export default Library;
