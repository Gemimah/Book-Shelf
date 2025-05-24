
import { useState, useEffect } from "react";
import BookGrid from "@/components/BookGrid";
import { Book } from "@/types/book";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Library = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    
    const response = await api.getAllBooks();
    
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setBooks(response.data);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRetry = () => {
    fetchBooks();
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Book Catalog</h1>
      
      {isLoading && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-[250px]" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-[240px] w-full rounded-md" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
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
      
      {!isLoading && !error && <BookGrid books={books} />}
    </div>
  );
};

export default Library;
