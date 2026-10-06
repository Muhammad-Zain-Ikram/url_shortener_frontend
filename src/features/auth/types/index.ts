export interface User {
  id: string;
  email: string;
  name?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  user: User;
  isAuthenticated: boolean;
}

export interface AuthResponse {
  user: User;
  message?: string;
}
