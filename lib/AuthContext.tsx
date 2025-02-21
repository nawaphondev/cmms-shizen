"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "./types";
import { getUserDataAction, loginAction, logoutAction } from "@/actions/auth";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUserFromCookie() {
      const cookieData = await getUserDataAction();
      setUser(cookieData);
    }

    getUserFromCookie();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginAction(username, password);
    if (!data) return null;
    setUser(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    logoutAction();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
