import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

type User = {
  name: string;
  email: string;
} | null;

interface AuthContextType {
  user: User;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const login = (email: string, name: string = "Dardan") => {
    setUser({ email, name });
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    });
    setLocation("/dashboard");
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Signed out",
      description: "You have been signed out of your account.",
    });
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
