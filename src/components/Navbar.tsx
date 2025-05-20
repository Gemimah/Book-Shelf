
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-book-navy">
            <BookOpen className="h-6 w-6 text-book-amber" />
            <span className="text-xl font-serif font-bold">BookShelf</span>
          </Link>
          
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-8 bg-muted/50 border-none"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/books">My Library</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/stats">Stats</Link>
          </Button>
          <Button className="bg-book-amber hover:bg-amber-600" size="sm">
            <Link to="/books/add">Add Book</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
