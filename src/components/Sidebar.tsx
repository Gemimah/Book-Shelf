
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

import { BookOpen, Book, BookPlus, BookType, BookCheck, LogOut, User, Calendar, Settings, Shield } from "lucide-react";
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
  const { user, isAdmin, logout } = useAuth();
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

  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-b from-sidebar to-sidebar-accent">
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-sidebar-primary" />
            <span className="font-serif font-bold text-xl text-sidebar-foreground">
              BookShelf
            </span>
          </Link>
          <ThemeToggle />
        </div>

        {user ? (
          <div className="py-4 px-4 border-b border-sidebar-border flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center ring-2 ring-sidebar-primary/30">
              <User className="h-5 w-5 text-sidebar-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
              {isAdmin && (
                <span className="inline-flex items-center mt-1 bg-sidebar-primary/20 text-sidebar-primary text-xs px-1.5 py-0.5 rounded">
                  <Shield className="h-3 w-3 mr-1" /> Admin
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="py-4 px-4 border-b border-sidebar-border">
            <Link to="/login">
              <Button variant="outline" className="w-full bg-sidebar-accent text-sidebar-foreground border-sidebar-border">Log In</Button>
            </Link>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">My Books</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard" className="text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/80">
                    <Book />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books" className="text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/80">
                    <BookType />
                    <span>Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books/borrowed" className="text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/80">
                    <Calendar />
                    <span>Borrowed Books</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books/reading" className="text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/80">
                    <BookCheck />
                    <span>Currently Reading</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/books/add" className="text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/80">
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
            <SidebarGroupLabel className="text-sidebar-foreground/80">Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/admin" className="text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/80">
                      <Settings className="text-sidebar-primary" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {user && (
          <div className="mt-auto border-t border-sidebar-border p-4">
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
