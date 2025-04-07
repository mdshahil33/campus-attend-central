
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function Layout({ children, requireAuth = true }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Redirect to login if auth is required and user is not authenticated
    if (!isLoading && requireAuth && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate, requireAuth]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  // If requireAuth is true and user is not authenticated, don't render content
  if (requireAuth && !user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar onMenuToggle={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out",
            sidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          <div className="container mx-auto p-4 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
