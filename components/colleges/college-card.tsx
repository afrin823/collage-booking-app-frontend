"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, BookOpen, MapPin, Star } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"
import { useState } from "react"
import { AuthModal } from "@/components/auth/auth-modal"

interface College {
  id: number
  name: string
  image: string
  rating: number
  admissionDate: string
  researchCount: number
  location: string
  type: string
  students: string
  description: string
}

interface CollegeCardProps {
  college: College
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleDetailsClick = () => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    // Navigate to details page
    window.location.href = `/colleges/${college.id}`
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img src={college.image || "/placeholder.svg"} alt={college.name} className="w-full h-48 object-cover" />
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            <Star className="h-3 w-3 mr-1" />
            {college.rating}
          </Badge>
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">{college.type}</Badge>
        </div>

        <CardHeader>
          <CardTitle className="font-serif text-xl">{college.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {college.location}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{college.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <div>
                <p className="font-medium">Admission</p>
                <p className="text-muted-foreground">{college.admissionDate}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <div>
                <p className="font-medium">Students</p>
                <p className="text-muted-foreground">{college.students}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <BookOpen className="h-4 w-4 mr-2 text-primary" />
            <span className="font-medium">Research Projects:</span>
            <span className="ml-1 text-muted-foreground">{college.researchCount.toLocaleString()}</span>
          </div>

          <Button onClick={handleDetailsClick} className="w-full">
            {user ? "View Details" : "Login to View Details"}
          </Button>
        </CardContent>
      </Card>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode="login" />
    </>
  )
}
