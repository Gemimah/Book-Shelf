
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarWrapper } from "@/components/Sidebar";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import BorrowedBooks from "./pages/BorrowedBooks";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeProvider";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Check if user is admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
      
      <Route path="/" element={<ProtectedRoute><SidebarWrapper><Index /></SidebarWrapper></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><SidebarWrapper><Dashboard /></SidebarWrapper></ProtectedRoute>} />
      <Route path="/books" element={<ProtectedRoute><SidebarWrapper><Library /></SidebarWrapper></ProtectedRoute>} />
      <Route path="/books/add" element={<ProtectedRoute><SidebarWrapper><AddBook /></SidebarWrapper></ProtectedRoute>} />
      <Route path="/books/borrowed" element={<ProtectedRoute><SidebarWrapper><BorrowedBooks /></SidebarWrapper></ProtectedRoute>} />
      <Route path="/books/:id" element={<ProtectedRoute><SidebarWrapper><BookDetail /></SidebarWrapper></ProtectedRoute>} />
      <Route path="/admin" element={<AdminRoute><SidebarWrapper><AdminPanel /></SidebarWrapper></AdminRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
