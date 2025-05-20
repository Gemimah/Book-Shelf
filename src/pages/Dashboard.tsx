
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import StatsCard from "@/components/StatsCard";
import { Book, BookCheck, BookPlus, Calendar, AlertCircle, Clock } from "lucide-react";
import { getAllBooks, getBorrowedBooks, getBookStatistics } from "@/services/bookService";
import { Book as BookType } from "@/types/book";
import { useAuth } from "@/contexts/AuthContext";
import { BookStatusChart, MonthlyActivityChart } from "@/components/DashboardCharts";

const Dashboard = () => {
  const { user } = useAuth();
  
  // In a real app, this would come from a database or API
  const [recentBooks, setRecentBooks] = useState<BookType[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BookType[]>([]);
  const [stats, setStats] = useState({
    totalBooks: 0,
    available: 0,
    borrowed: 0,
    overdue: 0,
    reading: 0,
    completed: 0,
    wishlist: 0,
  });
  
  useEffect(() => {
    // Get all books for recent display
    const allBooks = getAllBooks();
    setRecentBooks(allBooks);
    
    // Get borrowed books
    const borrowed = getBorrowedBooks();
    setBorrowedBooks(borrowed);
    
    // Get statistics
    const statistics = getBookStatistics();
    setStats(statistics);
  }, []);

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 md:mb-0">
          Welcome{user ? `, ${user.name}` : ''}
        </h1>
        <div className="flex gap-3">
          <Button className="bg-book-amber hover:bg-amber-600" asChild>
            <Link to="/books/add">
              <BookPlus className="mr-2 h-4 w-4" />
              Add New Book
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/books/borrowed">
              <Calendar className="mr-2 h-4 w-4" />
              Borrowed Books
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-10">
        <StatsCard 
          title="Total Books" 
          value={stats.totalBooks} 
          icon={<Book className="h-4 w-4" />}
        />
        <StatsCard 
          title="Available" 
          value={stats.available} 
          icon={<BookCheck className="h-4 w-4" />}
          description="Books ready to borrow"
        />
        <StatsCard 
          title="Borrowed" 
          value={stats.borrowed} 
          icon={<Calendar className="h-4 w-4" />}
          description="Currently checked out"
        />
        <StatsCard 
          title="Overdue" 
          value={stats.overdue}
          description="Need attention"
          icon={<AlertCircle className="h-4 w-4 text-destructive" />}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-4 mb-10">
        <BookStatusChart 
          available={stats.available}
          borrowed={stats.borrowed}
          reading={stats.reading || 0}
          overdue={stats.overdue}
        />
        <MonthlyActivityChart />
      </div>
      
      <div className="space-y-8">
        {borrowedBooks.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-serif font-bold flex items-center">
                <Clock className="mr-2 h-5 w-5 text-book-amber" />
                Currently Borrowed
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/books/borrowed">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {borrowedBooks.slice(0, 4).map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </div>
        )}
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold flex items-center">
              <Book className="mr-2 h-5 w-5 text-book-amber" />
              Recently Added
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/books">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} {...book} showProgress={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
