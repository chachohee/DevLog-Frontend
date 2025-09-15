import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  loading: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);