
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import StatsCard from "@/components/StatsCard";
import { Book, BookCheck, BookOpen, BookPlus } from "lucide-react";

// Mock data for the dashboard
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
];

const Dashboard = () => {
  // In a real app, this would come from a database or API
  const [recentBooks] = useState(mockBooks);
  
  const statsData = {
    totalBooks: 24,
    reading: 3,
    completed: 16,
    wishlist: 5,
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 md:mb-0">
          My Bookshelf
        </h1>
        <Button className="bg-book-amber hover:bg-amber-600">
          <BookPlus className="mr-2 h-4 w-4" />
          <Link to="/books/add">Add New Book</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatsCard 
          title="Total Books" 
          value={statsData.totalBooks} 
          icon={<Book className="h-4 w-4" />}
        />
        <StatsCard 
          title="Currently Reading" 
          value={statsData.reading} 
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatsCard 
          title="Completed" 
          value={statsData.completed} 
          icon={<BookCheck className="h-4 w-4" />}
        />
        <StatsCard 
          title="Want to Read" 
          value={statsData.wishlist} 
          icon={<BookPlus className="h-4 w-4" />}
        />
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold">Recently Added</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/books">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
