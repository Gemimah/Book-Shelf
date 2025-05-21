
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "user" | "admin";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("bookshelf_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.email === "admin@example.com" || parsedUser.role === "admin");
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call to authenticate
    // Mock login for demo
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if admin login
      const isAdminLogin = email === "admin@example.com";
      
      // Mock user data - in a real app this would come from your backend
      const userData: User = {
        id: isAdminLogin ? "admin1" : "user1",
        name: isAdminLogin ? "Admin User" : "John Doe",
        email,
        role: isAdminLogin ? "admin" : "user",
        lastLogin: new Date().toISOString()
      };
      
      setUser(userData);
      setIsAdmin(isAdminLogin || userData.role === "admin");
      localStorage.setItem("bookshelf_user", JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call to register a new user
    // Mock signup for demo
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if admin registration (this would normally be controlled by admin invites)
      const isAdminRegistration = email === "admin@example.com";
      
      // Mock user data - in a real app this would come from your backend
      const userData: User = {
        id: "user" + Math.floor(Math.random() * 1000),
        name,
        email,
        role: isAdminRegistration ? "admin" : "user",
        lastLogin: new Date().toISOString()
      };
      
      setUser(userData);
      setIsAdmin(isAdminRegistration || userData.role === "admin");
      localStorage.setItem("bookshelf_user", JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("bookshelf_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
