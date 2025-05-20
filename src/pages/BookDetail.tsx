
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  Book,
} from "lucide-react";

// Mock book data - in a real app, this would come from an API
const mockBook = {
  id: "1",
  title: "The Midnight Library",
  author: "Matt Haig",
  coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  status: "reading" as const,
  progress: 45,
  isbn: "9780525559474",
  genre: "Fiction, Fantasy, Contemporary",
  publisher: "Viking",
  publishedYear: "2020",
  pages: "304",
  description:
    "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
};

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // In a real app, you would fetch the book data based on the ID
  const [book] = useState(mockBook);

  const statusColors = {
    reading: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    wishlist: "bg-amber-100 text-amber-800",
  };

  const statusLabels = {
    reading: "Currently Reading",
    completed: "Completed",
    wishlist: "Want to Read",
  };

  const statusIcons = {
    reading: <BookOpen className="h-4 w-4 mr-1" />,
    completed: <BookCheck className="h-4 w-4 mr-1" />,
    wishlist: <BookPlus className="h-4 w-4 mr-1" />,
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
              <CardFooter className="flex justify-between p-4">
                <Button variant="outline" asChild>
                  <Link to={`/books/${id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
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

            {book.status === "reading" && (
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
