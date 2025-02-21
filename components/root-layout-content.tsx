"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  const isAuthPage = pathname === "/login" || pathname === "/help";

  return (
    <div className="flex h-screen">
      {!isAuthPage && <Sidebar />}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
