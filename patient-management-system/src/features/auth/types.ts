export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
}
//Assign Roles feature
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
