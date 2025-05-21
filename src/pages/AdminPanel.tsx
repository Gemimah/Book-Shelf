
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminBookForm } from "@/components/AdminBookForm";
import { BookUser, UsersRound, Settings, LayoutDashboard } from "lucide-react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Handler for adding new book
  const handleAddBook = (bookData: any) => {
    console.log("Adding new book:", bookData);
    // Here you would typically make an API call to save the new book
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your library system and view analytics</p>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="bg-muted/40 p-1 rounded-lg">
          <TabsList className="grid grid-cols-4 h-auto bg-transparent gap-2">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-200/50 data-[state=active]:to-amber-100/50 dark:data-[state=active]:from-amber-900/40 dark:data-[state=active]:to-amber-800/20 py-2"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger 
              value="books"
              className="flex items-center data-[state=active]:bg-gradient-to-br data-[state=active]:from-teal-200/50 data-[state=active]:to-teal-100/50 dark:data-[state=active]:from-teal-900/40 dark:data-[state=active]:to-teal-800/20 py-2"
            >
              <BookUser className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Books</span>
              <span className="sm:hidden">Books</span>
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="flex items-center data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-200/50 data-[state=active]:to-blue-100/50 dark:data-[state=active]:from-blue-900/40 dark:data-[state=active]:to-blue-800/20 py-2"
            >
              <UsersRound className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Users</span>
              <span className="sm:hidden">Users</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="flex items-center data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-200/50 data-[state=active]:to-purple-100/50 dark:data-[state=active]:from-purple-900/40 dark:data-[state=active]:to-purple-800/20 py-2"
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
              <span className="sm:hidden">Config</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="mt-6">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="books" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">Manage Books</h2>
              <Button className="bg-book-amber hover:bg-amber-600">Add New Book</Button>
            </div>
            <AdminBookForm onSubmit={handleAddBook} />
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">User Management</h2>
              <Button className="bg-book-amber hover:bg-amber-600">Add New User</Button>
            </div>
            <div className="border border-muted-foreground/20 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">User Management Features Coming Soon</h3>
              <p className="text-muted-foreground">This section is under development and will be available in a future update.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">System Settings</h2>
            <div className="border border-muted-foreground/20 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">Settings Features Coming Soon</h3>
              <p className="text-muted-foreground">This section is under development and will be available in a future update.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
