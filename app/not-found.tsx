"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-12 pb-12 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-primary/20 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="h-24 w-24 text-primary animate-bounce" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground">Oops! Page Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Looks like you've wandered off the campus map. The page you're looking for doesn't exist or has been
              moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/colleges">
                <Search className="h-5 w-5 mr-2" />
                Browse Colleges
              </Link>
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Need help finding what you're looking for?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
              <Link href="/colleges" className="text-primary hover:underline">
                Colleges
              </Link>
              <Link href="/admission" className="text-primary hover:underline">
                Admissions
              </Link>
              <Link href="/profile" className="text-primary hover:underline">
                Profile
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
