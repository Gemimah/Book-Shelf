
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { BookOpen, Book, BookPlus, BookType, BookCheck, LogOut, User, Calendar, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <BookSidebar />
        <div className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const BookSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  // Check if user is admin (in a real app, this would be based on user role)
  const isAdmin = user && user.email === "admin@example.com";

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-sidebar-primary" />
            <span className="font-serif font-bold text-xl text-sidebar-foreground">
              BookShelf
            </span>
          </Link>
          <ThemeToggle />
        </div>

        {user ? (
          <div className="py-4 px-4 border-b flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center">
              <User className="h-5 w-5 text-sidebar-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="py-4 px-4 border-b">
            <Link to="/login">
              <Button variant="outline" className="w-full">Log In</Button>
            </Link>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>My Books</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard">
                    <Book />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books">
                    <BookType />
                    <span>Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books/borrowed">
                    <Calendar />
                    <span>Borrowed Books</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books/reading">
                    <BookCheck />
                    <span>Currently Reading</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books/add">
                    <BookPlus />
                    <span>Add New Book</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/admin">
                      <Settings />
                      <span>Manage Books</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {user && (
          <div className="mt-auto border-t p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default BookSidebar;
