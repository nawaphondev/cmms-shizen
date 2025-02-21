"use client"

import Link from "next/link"
import { LogIn, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export function LoginSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white h-screen border-r">
      <nav className="flex-1">
        <ul className="p-4 space-y-2">
          <li>
            <Link
              href="/login"
              className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                pathname === "/login" ? "bg-primary text-primary-foreground" : "text-gray-700"
              }`}
            >
              <LogIn className="w-5 h-5 mr-3" />
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                pathname === "/help" ? "bg-primary text-primary-foreground" : "text-gray-700"
              }`}
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

