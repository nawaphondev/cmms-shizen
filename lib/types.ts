import type React from "react";

export type UserRole = "admin" | "technician" | "supervisor" | "user";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}
