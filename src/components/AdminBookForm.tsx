
import BookForm from "./BookForm";

interface AdminBookFormProps {
  onSubmit: (bookData: any) => void;
  initialData?: any;
  buttonText?: string;
}

export const AdminBookForm = ({
  onSubmit,
  initialData = {},
  buttonText = "Add Book"
}: AdminBookFormProps) => {
  // In a real application, you might want to add admin-specific fields here
  // or additional validation for admin-only operations

  const handleSubmit = (bookData: any) => {
    // Here you could add admin-specific processing before submitting
    onSubmit(bookData);
  };

  return (
    <BookForm
      onSubmit={handleSubmit}
      initialData={initialData}
      buttonText={buttonText}
    />
  );
};
