"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-context"
import { AuthModal } from "@/components/auth/auth-modal"
import { GraduationCap, MapPin, Users, Calendar, Star } from "lucide-react"

const availableColleges = [
  {
    id: 1,
    name: "Harvard University",
    image: "/harvard-campus.png",
    location: "Cambridge, MA",
    type: "Private",
    rating: 4.9,
    admissionDate: "Dec 1, 2024",
    students: "23,000+",
    programs: ["Medicine", "Law", "Business", "Engineering", "Liberal Arts"],
  },
  {
    id: 2,
    name: "Stanford University",
    image: "/stanford-university-campus.png",
    location: "Stanford, CA",
    type: "Private",
    rating: 4.8,
    admissionDate: "Jan 15, 2025",
    students: "17,000+",
    programs: ["Computer Science", "Engineering", "Business", "Medicine", "Liberal Arts"],
  },
  {
    id: 3,
    name: "MIT",
    image: "/mit-campus-building.png",
    location: "Cambridge, MA",
    type: "Private",
    rating: 4.9,
    admissionDate: "Jan 1, 2025",
    students: "11,000+",
    programs: ["Engineering", "Computer Science", "Physics", "Mathematics", "Economics"],
  },
  {
    id: 4,
    name: "Yale University",
    image: "/yale-university-campus.png",
    location: "New Haven, CT",
    type: "Private",
    rating: 4.7,
    admissionDate: "Jan 2, 2025",
    students: "13,000+",
    programs: ["Liberal Arts", "Law", "Medicine", "Drama", "Music"],
  },
  {
    id: 5,
    name: "Princeton University",
    image: "/princeton-university-campus.png",
    location: "Princeton, NJ",
    type: "Private",
    rating: 4.8,
    admissionDate: "Jan 1, 2025",
    students: "8,500+",
    programs: ["Liberal Arts", "Engineering", "Public Policy", "Economics", "Physics"],
  },
]

export default function AdmissionPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleApplyClick = (collegeId: number) => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    router.push(`/admission/apply/${collegeId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">College Admissions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take the next step in your educational journey. Apply to your dream college and unlock your potential.
            </p>
          </div>

          {/* Application Status Banner */}
          {user && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
              <p className="text-center text-primary font-medium">
                Welcome back, {user.name}! Ready to apply to your dream college?
              </p>
            </div>
          )}

          {/* College Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableColleges.map((college) => (
              <Card key={college.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={college.image || "/placeholder.svg"}
                    alt={college.name}
                    className="w-full h-48 object-cover"
                  />
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
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">Deadline</p>
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

                  <div>
                    <p className="font-medium text-sm mb-2">Popular Programs:</p>
                    <div className="flex flex-wrap gap-1">
                      {college.programs.slice(0, 3).map((program) => (
                        <Badge key={program} variant="secondary" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {college.programs.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{college.programs.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button onClick={() => handleApplyClick(college.id)} className="w-full">
                    {user ? "Apply Now" : "Login to Apply"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Information Section */}
          <div className="mt-16 bg-muted/30 rounded-lg p-8">
            <h2 className="font-serif text-2xl font-bold text-center mb-6">Application Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold mb-2">Choose Your College</h3>
                <p className="text-sm text-muted-foreground">
                  Select from our partner institutions and review their programs and requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold mb-2">Complete Application</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the comprehensive application form with your personal and academic information.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your application status and receive updates in your personal dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode="login" />
    </div>
  )
}
