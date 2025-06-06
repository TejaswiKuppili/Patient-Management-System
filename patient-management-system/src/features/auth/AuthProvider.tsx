// features/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, logout as logoutApi } from "./api/authApi";
import { AuthContextType, LoginResponse, User } from "./types";
import { useNavigate } from "react-router-dom";

// Create the AuthContext with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/*
  AuthProvider component that wraps the application and provides authentication context
  This component manages user state, loading status, and authentication methods.
*/
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    await loginApi({ email, password });
  };
  
  // Simulate loading user on initial load (e.g., from localStorage or a refresh endpoint)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // const login = async (email: string, password: string) => {
  //   setLoading(true);
  //   try {
  //     const response: LoginResponse = await loginApi({ email, password });
  //     const user: User = { id: response.userId };

  //     setUser(user); // ✅ Correct type: User
  //     localStorage.setItem("user", JSON.stringify(user));
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const logout = () => {
    logoutApi();
    navigate("/login");
    setUser(null);
    setLoading(false);
  };

  return (
    //Provides the authentication context to children components
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*
  Hook used in useAuth.ts
  This hook allows components to access the authentication context easily.
*/
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};