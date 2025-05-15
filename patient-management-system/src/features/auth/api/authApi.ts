import axios from "axios";
import { RegisterRequest, AuthResponse, LoginRequest } from "../types";

const API_URL = "http://localhost:8080/api/v1/auth"; //Have to change this to the backend URL

// Function to handle user register
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
  //   localStorage.setItem("token", response.token);
  return response.data;
};

// Function to handle user login
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
  return response.data;
};
