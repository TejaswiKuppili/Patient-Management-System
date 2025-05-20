import { useAuthContext } from "../auth/AuthProvider";

// This is a custom hook that provides the authentication context to components
// It allows components to access the authentication state and methods without needing to import the context directly
export const useAuth = () => {
  return useAuthContext();
};
