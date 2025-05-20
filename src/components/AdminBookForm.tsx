
import BookForm from "./BookForm";

interface AdminBookFormProps {
  onSubmit: (bookData: any) => void;
  initialData?: any;
  buttonText?: string;
  isSubmitting?: boolean;
}

export const AdminBookForm = ({
  onSubmit,
  initialData = {},
  buttonText = "Add Book",
  isSubmitting = false
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
      isSubmitting={isSubmitting}
    />
  );
};
