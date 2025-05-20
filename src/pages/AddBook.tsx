
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BookForm from "@/components/BookForm";

const AddBook = () => {
  const navigate = useNavigate();

  const handleAddBook = (bookData: any) => {
    console.log("Adding new book:", bookData);
    // In a real app, you would send this data to your API or database
    
    toast.success("Book added successfully!");
    navigate("/books");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Add New Book</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <BookForm onSubmit={handleAddBook} />
      </div>
    </div>
  );
};

export default AddBook;
