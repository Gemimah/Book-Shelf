
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookPlus } from "lucide-react";

interface BookFormProps {
  onSubmit: (bookData: any) => void;
  initialData?: any;
  buttonText?: string;
}

const BookForm = ({ 
  onSubmit, 
  initialData = {}, 
  buttonText = "Add Book" 
}: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    isbn: initialData.isbn || "",
    coverImg: initialData.coverImg || "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: initialData.status || "wishlist",
    genre: initialData.genre || "",
    publisher: initialData.publisher || "",
    publishedYear: initialData.publishedYear || "",
    pages: initialData.pages || "",
    description: initialData.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="e.g. 9781234567897"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Reading Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wishlist">Want to Read</SelectItem>
              <SelectItem value="reading">Currently Reading</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g. Fiction, Science Fiction"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Publisher name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishedYear">Year Published</Label>
          <Input
            id="publishedYear"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            placeholder="e.g. 2023"
            type="number"
            min="1000"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pages">Number of Pages</Label>
          <Input
            id="pages"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            placeholder="e.g. 320"
            type="number"
            min="1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImg">Cover Image URL</Label>
        <Input
          id="coverImg"
          name="coverImg"
          value={formData.coverImg}
          onChange={handleChange}
          placeholder="https://example.com/book-cover.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter book description"
          className="h-32"
        />
      </div>

      <Button type="submit" className="bg-book-amber hover:bg-amber-600">
        <BookPlus className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
    </form>
  );
};

export default BookForm;
