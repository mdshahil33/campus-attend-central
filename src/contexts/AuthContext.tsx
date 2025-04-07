
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Role } from "@/types";
import { getUserByEmail } from "@/lib/dummy-data";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem("campusUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulated authentication
      // In a real application, this would make an API call to verify credentials
      
      // For demo purposes, any non-empty password works, and we check if the email exists in our dummy data
      if (!password.trim()) {
        toast({
          title: "Login Failed",
          description: "Please enter a password",
          variant: "destructive",
        });
        return false;
      }

      const foundUser = getUserByEmail(email);
      
      if (foundUser) {
        // Store user in state and localStorage
        setUser(foundUser);
        localStorage.setItem("campusUser", JSON.stringify(foundUser));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "User not found. Please check your email",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("campusUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
