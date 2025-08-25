"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  university?: string
  address?: string
  profileImage?: string
  authProvider?: 'google' | 'github' | 'email'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  loginWithGithub: () => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email: email,
        university: "",
        address: "",
        authProvider: 'email'
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        university: "",
        address: "",
        authProvider: 'email'
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      setIsLoading(false)
      return true
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In a real app, this would redirect to Google OAuth or use a popup
      // For demo purposes, we'll simulate the process
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Mock Google user data
      const googleUser: User = {
        id: "google_" + Date.now().toString(),
        name: "Google User",
        email: "user@gmail.com",
        university: "",
        address: "",
        authProvider: 'google'
      }

      setUser(googleUser)
      localStorage.setItem("user", JSON.stringify(googleUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Google login failed:", error)
      setIsLoading(false)
      return false
    }
  }

  const loginWithGithub = async (): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In a real app, this would redirect to GitHub OAuth or use a popup
      // For demo purposes, we'll simulate the process
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Mock GitHub user data
      const githubUser: User = {
        id: "github_" + Date.now().toString(),
        name: "GitHub User",
        email: "user@github.com",
        university: "",
        address: "",
        authProvider: 'github'
      }

      setUser(githubUser)
      localStorage.setItem("user", JSON.stringify(githubUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("GitHub login failed:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loginWithGoogle,
        loginWithGithub,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}