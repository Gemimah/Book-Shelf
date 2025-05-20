
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BookForm from "@/components/BookForm";
import { api } from "@/services/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AddBook = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddBook = async (bookData: any) => {
    setIsSubmitting(true);
    setError(null);
    
    const response = await api.addBook(bookData);
    
    if (response.error) {
      setError(response.error);
      toast.error("Failed to add book");
    } else {
      toast.success("Book added successfully!");
      navigate("/books");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Add New Book</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="bg-card rounded-lg shadow-sm p-6">
        <BookForm 
          onSubmit={handleAddBook} 
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default AddBook;
