import { JSX } from "react";
import { useAuth } from "../features/hooks/useAuth";
import { Navigate } from "react-router-dom";

// This component is a wrapper that protects routes by checking if the user is logged in.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;