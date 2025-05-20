
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImg: string;
  status: "available" | "borrowed" | "reading" | "completed" | "wishlist";
  progress?: number;
  borrowedDate?: string;
  dueDate?: string;
  isOverdue?: boolean;
  description?: string;
  isbn?: string;
  genre?: string;
  publisher?: string;
  publishedYear?: string;
  pages?: string;
}
