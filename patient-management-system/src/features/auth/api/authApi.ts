import apiClient from "./apiClient";
import { RegisterRequest, LoginRequest, AuthResponse } from "../types";

// API call to register a new user
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/register", data);
  return response.data;
};

// API call to login a user
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/login", data);
  return response.data;
};
