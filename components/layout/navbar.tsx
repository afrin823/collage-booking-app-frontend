"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-context"
import { AuthModal } from "@/components/auth/auth-modal"
import { GraduationCap, Menu, X, User, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/firebase/store/useAuthStore"

export function Navbar() {
  // const { user, logout } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
 const { user,  logout } =  useAuthStore();
 console.log(user);
 
  const handleAuthClick = (mode: "login" | "register") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  } 
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/colleges", label: "Colleges" },
    { href: "/admission", label: "Admission" },
    { href: "/my-college", label: "My College" },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl font-bold text-primary">CampusWay</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{user.displayName}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-college" className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        My College
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => handleAuthClick("login")}>
                    Login
                  </Button>
                  <Button onClick={() => handleAuthClick("register")}>Sign Up</Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {user ? (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 text-foreground hover:text-primary px-2 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/my-college"
                      className="flex items-center space-x-2 text-foreground hover:text-primary px-2 py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>My College</span>
                    </Link>
                    <Button variant="outline" onClick={logout} className="mx-2 bg-transparent">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <Button variant="outline" onClick={() => handleAuthClick("login")} className="mx-2">
                      Login
                    </Button>
                    <Button onClick={() => handleAuthClick("register")} className="mx-2 ">
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultMode={authMode} />
    </>
  )
}
