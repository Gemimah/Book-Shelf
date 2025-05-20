
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Trash2,
  Search,
  BookPlus,
  Filter,
  AlertCircle
} from "lucide-react";
import { Book } from "@/types/book";
import { api } from "@/services/api";
import { AdminBookForm } from "@/components/AdminBookForm";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminPanel = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is admin
  useEffect(() => {
    if (!user || user.email !== "admin@example.com") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive"
      });
      navigate("/dashboard");
    }
  }, [user, navigate, toast]);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    
    const response = await api.getAllBooks();
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setBooks(response.data);
      setFilteredBooks(response.data);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = books.filter(
        book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.isbn?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };

  const handleDeleteBook = (id: string) => {
    // In a real application, you would call an API to delete the book
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    
    toast({
      title: "Book deleted",
      description: "The book has been removed from the catalog."
    });
  };

  const handleBookFormSubmit = (bookData: any) => {
    // In a real application, you would call an API to update the book
    if (currentBook) {
      // Update existing book
      const updatedBooks = books.map(book => 
        book.id === currentBook.id ? { ...book, ...bookData } : book
      );
      setBooks(updatedBooks);
      toast({
        title: "Book updated",
        description: "The book details have been updated."
      });
    } else {
      // Add new book (handled by AddBook component)
      toast({
        title: "Book added",
        description: "A new book has been added to the catalog."
      });
    }
    
    setIsEditing(false);
    setCurrentBook(null);
  };

  const handleRetry = () => {
    fetchBooks();
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Admin Panel - Book Management</h1>
        <Button 
          onClick={() => navigate("/books/add")}
          className="bg-book-amber hover:bg-amber-600"
        >
          <BookPlus className="mr-2 h-4 w-4" />
          Add New Book
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>{error}</p>
            <Button onClick={handleRetry} variant="outline" size="sm" className="self-start">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {isEditing ? (
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif font-bold">Edit Book</h2>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
          <AdminBookForm 
            onSubmit={handleBookFormSubmit}
            initialData={currentBook || {}}
            buttonText="Save Changes"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, author or ISBN"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-lg border bg-card shadow-sm">
            {loading ? (
              <div className="p-4">
                <div className="flex items-center justify-center p-8">
                  <div className="space-y-4 w-full">
                    <Skeleton className="h-10 w-full" />
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cover</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBooks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No books found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBooks.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell>
                          <img 
                            src={book.coverImg} 
                            alt={`Cover of ${book.title}`} 
                            className="w-12 h-16 object-cover rounded shadow-sm"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.isbn || "N/A"}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            book.status === "available" 
                              ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300" 
                              : book.status === "borrowed" 
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
                          }`}>
                            {book.status === "available" ? "Available" : 
                             book.status === "borrowed" ? "Borrowed" :
                             book.status === "reading" ? "Reading" :
                             book.status === "completed" ? "Completed" : 
                             "Want to Read"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEditBook(book)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
