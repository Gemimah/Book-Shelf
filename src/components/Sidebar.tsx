
import { Link } from "react-router-dom";
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

import { BookOpen, Book, BookPlus, BookType, BookCheck } from "lucide-react";

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
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-sidebar-primary" />
            <span className="font-serif font-bold text-xl text-sidebar-foreground">
              BookShelf
            </span>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>My Books</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
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
      </SidebarContent>
    </Sidebar>
  );
};

export default BookSidebar;
