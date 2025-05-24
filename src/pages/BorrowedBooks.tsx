
import { useState, useEffect } from "react";
import BookGrid from "@/components/BookGrid";
import { Book } from "@/types/book";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Book as BookIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, differenceInDays } from "date-fns";

const BorrowedBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBorrowedBooks = async () => {
    setIsLoading(true);
    setError(null);
    
    const response = await api.getBorrowedBooks();
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setBooks(response.data);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const handleRetry = () => {
    fetchBorrowedBooks();
  };

  // Group books by due date status
  const overdueBooks = books.filter(book => book.isOverdue);
  const dueSoonBooks = books.filter(book => {
    if (!book.isOverdue && book.dueDate) {
      const daysRemaining = differenceInDays(new Date(book.dueDate), new Date());
      return daysRemaining <= 3;
    }
    return false;
  });
  const otherBooks = books.filter(book => !book.isOverdue && !dueSoonBooks.includes(book));

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Borrowed Books</h1>
      
      {isLoading && (
        <div className="space-y-8">
          <Skeleton className="h-[120px] w-full rounded-md" />
          <Skeleton className="h-[400px] w-full rounded-md" />
        </div>
      )}
      
      {!isLoading && error && (
        <Alert variant="destructive" className="mb-8">
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
      
      {!isLoading && !error && (
        books.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground text-lg">You haven't borrowed any books yet.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {overdueBooks.length > 0 && (
              <div>
                <Card className="mb-6 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <CardTitle className="text-lg text-red-700 dark:text-red-400">Overdue Books</CardTitle>
                    </div>
                    <CardDescription className="text-red-700 dark:text-red-400">
                      These books are past their return date. Please return them as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {overdueBooks.map(book => (
                        <li key={book.id} className="flex justify-between items-center">
                          <span>{book.title}</span>
                          <span className="text-red-600 dark:text-red-400 font-semibold">
                            Due: {format(new Date(book.dueDate!), "MMM dd, yyyy")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <BookGrid books={overdueBooks} title="Overdue Books" />
              </div>
            )}
            
            {dueSoonBooks.length > 0 && (
              <div>
                <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <BookIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <CardTitle className="text-lg text-amber-700 dark:text-amber-400">Due Soon</CardTitle>
                    </div>
                    <CardDescription className="text-amber-700 dark:text-amber-400">
                      These books are due within the next 3 days.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {dueSoonBooks.map(book => (
                        <li key={book.id} className="flex justify-between items-center">
                          <span>{book.title}</span>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">
                            Due: {format(new Date(book.dueDate!), "MMM dd, yyyy")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <BookGrid books={dueSoonBooks} title="Due Soon" />
              </div>
            )}
            
            {otherBooks.length > 0 && (
              <div>
                <BookGrid books={otherBooks} title="Other Borrowed Books" />
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default BorrowedBooks;
