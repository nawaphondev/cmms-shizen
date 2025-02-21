"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  role: "admin" | "user"
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating an API call to get the user data
    const fetchUser = async () => {
      try {
        // In a real application, you would make an API call here
        const response = await new Promise<User>((resolve) => {
          setTimeout(() => {
            resolve({
              id: "1",
              name: "John Doe",
              role: "admin",
            })
          }, 1000)
        })

        setUser(response)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    // Simulating a login API call
    setLoading(true)
    try {
      // In a real application, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: "1",
        name: "John Doe",
        role: "admin",
      })
    } catch (error) {
      console.error("Error logging in:", error)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    // Simulating a logout API call
    setLoading(true)
    try {
      // In a real application, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(null)
    } catch (error) {
      console.error("Error logging out:", error)
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, login, logout }
}

