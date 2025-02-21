import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (username: string, password: string) => {
        // จำลองการเรียก API (simulate API call)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // ตรวจสอบข้อมูลผู้ใช้และอัปเดต state
        if (username === "Bill" && password === "12345678") {
          const user = { id: "1", name: "Bill", role: "admin" };
          set({ user });
          return user;
        } else if (username === "John" && password === "password123") {
          const user = { id: "2", name: "John", role: "technician" };
          set({ user });
          return user;
        } else if (username === "Sarah" && password === "pass456") {
          const user = { id: "3", name: "Sarah", role: "supervisor" };
          set({ user });
          return user;
        } else if (username === "Mike" && password === "userpass") {
          const user = { id: "4", name: "Mike", role: "user" };
          set({ user });
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    }
  )
);
