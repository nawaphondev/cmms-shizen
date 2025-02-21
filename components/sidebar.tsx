"use client"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Home, Monitor, Settings, ChevronDown, ChevronRight } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import type { NavigationItem } from "@/lib/types"
import { useRouter } from "next/navigation"

const navItems: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home, roles: ["admin", "technician", "supervisor", "user"] },
  { name: "Monitor", href: "/monitor", icon: Monitor, roles: ["admin", "supervisor"] },
  {
    name: "Management",
    icon: Settings,
    href: "#",
    roles: ["admin"],
    subItems: [
      { name: "Work Types", href: "/management/work-types", roles: ["admin"] },
      { name: "Staff", href: "/management/staff", roles: ["admin"] },
      { name: "Machines", href: "/management/machines", roles: ["admin"] },
      { name: "Spare Parts", href: "/management/spare-parts", roles: ["admin"] },
      { name: "Sensors", href: "/management/sensors", roles: ["admin"] },
      { name: "Group Permissions", href: "/management/permissions", roles: ["admin"] },
    ],
  },
]

export function Sidebar() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const pathname = usePathname()
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Expand the Management section if any of its subitems are active
    if (pathname.startsWith("/management")) {
      setExpandedItem("Management")
    }
  }, [pathname])

  const toggleExpand = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name)
  }

  if (!user) return null

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b px-4">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shizen-DV5y0tAMI2QboMRqqMopIfKJC76cVa.jpeg"
          alt="SHIZEN"
          className="h-8 w-auto"
        />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {navItems.map((item) => {
            if (!item.roles.includes(user.role)) return null
            return (
              <li key={item.name}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className="flex items-center justify-between w-full p-2 text-gray-700 rounded hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </div>
                      {expandedItem === item.name ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {expandedItem === item.name && (
                      <ul className="pl-6 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <button
                              onClick={() => router.push(subItem.href)}
                              className={`block p-2 text-sm rounded ${
                                pathname === subItem.href
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {subItem.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => router.push(item.href)}
                    className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

