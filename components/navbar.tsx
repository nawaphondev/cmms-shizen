"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Home, PenToolIcon, Monitor, Settings, Globe, LogOut, Shield, User, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/lib/AuthContext"
import React from "react"

// Create a constant for the roles
const USER_ROLES = {
  ADMIN: "admin",
}

const pageIcons: { [key: string]: any } = {
  "/dashboard": { icon: Home, label: "Dashboard" },
  "/repair-requests": { icon: PenToolIcon, label: "Repair Requests" },
  "/monitor": { icon: Monitor, label: "Monitor" },
  "/management/work-types": { icon: Settings, label: "Work Types" },
  "/management/staff": { icon: User, label: "Staff" },
  "/management/machines": { icon: Settings, label: "Machines" },
  "/management/spare-parts": { icon: Settings, label: "Spare Parts" },
  "/management/sensors": { icon: Monitor, label: "Sensors" },
  "/management/permissions": { icon: Shield, label: "Group Permissions" },
}

export function Navbar() {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"
  const router = useRouter()
  const { user, logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoginPage, setIsLoginPage] = useState(false)
  const [currentLang, setCurrentLang] = useState("en")
  const languages = [
    { code: "en", label: "English" },
    { code: "th", label: "ไทย" },
  ]

  useEffect(() => {
    setIsLoginPage(pathname === "/login")
  }, [pathname])

  const currentPage = pageIcons[pathname] || { icon: Home, label: "Dashboard" }
  const PageIcon = currentPage.icon

  const handleLogout = async () => {
    await logout()
    setShowLogoutConfirm(false)
    router.push("/login")
  }

  if (isLoginPage) {
    return (
      <div className="border-b bg-white font-roboto">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Image
              src="/shizen.jpeg"
              alt="Shizen Logo"
              width={250}
              height={32}
              className="mr-2"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                {currentLang.toUpperCase()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setCurrentLang(lang.code)}>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  return (
    <div className="border-b bg-white font-roboto">
      <div className="flex justify-between items-center h-16 px-4">
        {!user && (
          <div className="flex items-center gap-2 font-semibold">
            <Image
              src="/shizen.jpeg"
              alt="Shizen Logo"
              width={250}
              height={32}
              className="mr-2"
            />
          </div>
        )}
        {user && (
          <div className="flex items-center gap-2 font-semibold">
            <>
              {React.createElement(currentPage.icon, { className: "h-6 w-6" })}
              <span>{currentPage.label}</span>
            </>
          </div>
        )}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                {currentLang.toUpperCase()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setCurrentLang(lang.code)}>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {user && (
            <>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar ? user.avatar : "/Admin.png"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              {user.role === USER_ROLES.ADMIN && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      System Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings/security")}>
                      <Shield className="mr-2 h-4 w-4" />
                      Security Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          onClick={() => setShowLogoutConfirm(true)}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will end your current session and you will need to log in again to access the
                            system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setShowLogoutConfirm(false)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
