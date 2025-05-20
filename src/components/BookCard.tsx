
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface BookProps {
  id: string;
  title: string;
  author: string;
  coverImg: string;
  status: "reading" | "completed" | "wishlist";
  progress?: number;
}

const BookCard = ({ id, title, author, coverImg, status, progress }: BookProps) => {
  const statusColors = {
    reading: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    wishlist: "bg-amber-100 text-amber-800",
  };

  const statusLabels = {
    reading: "Reading",
    completed: "Completed",
    wishlist: "Want to Read",
  };

  return (
    <Link to={`/books/${id}`}>
      <Card className="book-card overflow-hidden h-full flex flex-col">
        <div className="relative pt-[140%] overflow-hidden">
          <img
            src={coverImg}
            alt={`${title} cover`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge 
            className={`absolute top-2 right-2 ${statusColors[status]}`}
            variant="outline"
          >
            {statusLabels[status]}
          </Badge>
        </div>
        <CardContent className="flex flex-col flex-grow p-4">
          <h3 className="font-serif font-bold text-lg line-clamp-2 mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{author}</p>
        </CardContent>
        {status === "reading" && progress !== undefined && (
          <CardFooter className="p-4 pt-0">
            <div className="w-full">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-book-amber h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default BookCard;
