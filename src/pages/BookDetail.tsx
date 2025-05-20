
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Edit,
  Trash,
  BookCheck,
  BookPlus,
  Calendar,
  ArrowDown,
  Check,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { getBookById, borrowBook, returnBook } from "@/services/bookService";
import { Book } from "@/types/book";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const foundBook = getBookById(id);
      setBook(foundBook);
    }
  }, [id]);

  const handleBorrow = () => {
    if (!id) return;
    
    setLoading(true);
    const updatedBook = borrowBook(id);
    
    if (updatedBook) {
      setBook(updatedBook);
      toast.success("Book borrowed successfully!");
      toast.info(`Return by: ${format(parseISO(updatedBook.dueDate!), "MMMM dd, yyyy")}`);
    } else {
      toast.error("Failed to borrow book");
    }
    setLoading(false);
  };

  const handleReturn = () => {
    if (!id) return;
    
    setLoading(true);
    const updatedBook = returnBook(id);
    
    if (updatedBook) {
      setBook(updatedBook);
      toast.success("Book returned successfully!");
    } else {
      toast.error("Failed to return book");
    }
    setLoading(false);
  };
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      console.log("Deleting book:", id);
      // In a real app, you would call your API to delete the book
      navigate("/books");
    }
  };

  if (!book) {
    return <div className="container py-8">Book not found</div>;
  }

  const statusColors = {
    available: "bg-green-100 text-green-800",
    borrowed: book.isOverdue ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800",
    reading: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    wishlist: "bg-amber-100 text-amber-800",
  };

  const statusLabels = {
    available: "Available",
    borrowed: book.isOverdue ? "Overdue" : "Borrowed",
    reading: "Currently Reading",
    completed: "Completed",
    wishlist: "Want to Read",
  };

  const statusIcons = {
    available: <BookPlus className="h-4 w-4 mr-1" />,
    borrowed: <Calendar className="h-4 w-4 mr-1" />,
    reading: <BookOpen className="h-4 w-4 mr-1" />,
    completed: <BookCheck className="h-4 w-4 mr-1" />,
    wishlist: <BookPlus className="h-4 w-4 mr-1" />,
  };

  return (
    <div className="container py-8">
      <div className="mb-4">
        <Link
          to="/books"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to Library
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="overflow-hidden">
              <div className="aspect-[2/3] relative overflow-hidden">
                <img
                  src={book.coverImg}
                  alt={`${book.title} cover`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <CardFooter className="flex flex-col gap-3 p-4">
                {book.status === "available" ? (
                  <Button 
                    className="w-full bg-book-amber hover:bg-amber-600" 
                    onClick={handleBorrow}
                    disabled={loading}
                  >
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Borrow Book
                  </Button>
                ) : book.status === "borrowed" ? (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleReturn}
                    disabled={loading}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Return Book
                  </Button>
                ) : null}
                
                <div className="flex w-full justify-between gap-2">
                  <Button variant="outline" asChild className="flex-1">
                    <Link to={`/books/${id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={handleDelete} className="flex-1">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground">{book.author}</p>
              <div className="flex items-center mt-4">
                <Badge
                  className={`${statusColors[book.status]} flex items-center`}
                  variant="outline"
                >
                  {statusIcons[book.status]}
                  {statusLabels[book.status]}
                </Badge>
              </div>
            </div>

            {book.status === "borrowed" && book.dueDate && (
              <Card className={book.isOverdue ? "border-red-200 bg-red-50" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg ${book.isOverdue ? "text-red-700" : ""}`}>
                    {book.isOverdue ? "Book Overdue" : "Borrowing Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Borrowed Date:</span>
                      <span>{format(new Date(book.borrowedDate!), "MMMM dd, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Due Date:</span>
                      <span className={book.isOverdue ? "text-red-600 font-semibold" : ""}>
                        {format(new Date(book.dueDate), "MMMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                </CardContent>
                {book.isOverdue && (
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={handleReturn}
                      disabled={loading}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Return Book Now
                    </Button>
                  </CardFooter>
                )}
              </Card>
            )}
            
            {book.status === "reading" && book.progress !== undefined && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reading Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{book.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-book-amber h-3 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-book-amber hover:bg-amber-600">
                    Update Progress
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{book.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {book.isbn && (
                    <div>
                      <p className="font-medium">ISBN</p>
                      <p className="text-muted-foreground">{book.isbn}</p>
                    </div>
                  )}
                  {book.genre && (
                    <div>
                      <p className="font-medium">Genre</p>
                      <p className="text-muted-foreground">{book.genre}</p>
                    </div>
                  )}
                  {book.publisher && (
                    <div>
                      <p className="font-medium">Publisher</p>
                      <p className="text-muted-foreground">{book.publisher}</p>
                    </div>
                  )}
                  {book.publishedYear && (
                    <div>
                      <p className="font-medium">Published</p>
                      <p className="text-muted-foreground">{book.publishedYear}</p>
                    </div>
                  )}
                  {book.pages && (
                    <div>
                      <p className="font-medium">Pages</p>
                      <p className="text-muted-foreground">{book.pages}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
