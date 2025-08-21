"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CollegeReviews } from "@/components/colleges/college-reviews"
import { useAuth } from "@/components/auth/auth-context"
import {
  ArrowLeft,
  Calendar,
  Users,
  BookOpen,
  MapPin,
  Star,
  Trophy,
  Microscope,
  GraduationCap,
  Building,
} from "lucide-react"

const collegeDetails = {
  1: {
    id: 1,
    name: "Harvard University",
    image: "/harvard-campus.png",
    rating: 4.9,
    admissionDate: "Dec 1, 2024",
    researchCount: 1250,
    location: "Cambridge, MA",
    type: "Private",
    students: "23,000+",
    description:
      "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, Harvard is the oldest institution of higher education in the United States and among the most prestigious in the world.",
    admissionProcess:
      "Harvard uses a holistic admissions process, considering academic excellence, extracurricular activities, personal qualities, and potential contributions to the Harvard community. The application includes essays, recommendations, and standardized test scores.",
    events: [
      {
        name: "Harvard Science Fair",
        date: "March 15, 2025",
        description: "Annual showcase of student research projects",
      },
      {
        name: "Cultural Festival",
        date: "April 20, 2025",
        description: "Celebration of diversity and international cultures",
      },
      { name: "Innovation Summit", date: "May 10, 2025", description: "Entrepreneurship and startup showcase" },
    ],
    researchWorks: [
      "Advanced AI and Machine Learning Research",
      "Medical Innovations and Drug Discovery",
      "Climate Change and Environmental Studies",
      "Quantum Computing and Physics Research",
    ],
    sportsCategories: [
      { category: "Team Sports", sports: ["Basketball", "Football", "Soccer", "Hockey"] },
      { category: "Individual Sports", sports: ["Swimming", "Tennis", "Track & Field", "Golf"] },
      { category: "Water Sports", sports: ["Rowing", "Sailing", "Water Polo"] },
    ],
    facilities: [
      "State-of-the-art laboratories",
      "World-class library system",
      "Modern dormitories",
      "Athletic facilities",
    ],
  },
  2: {
    id: 2,
    name: "Stanford University",
    image: "/stanford-university-campus.png",
    rating: 4.8,
    admissionDate: "Jan 15, 2025",
    researchCount: 980,
    location: "Stanford, CA",
    type: "Private",
    students: "17,000+",
    description:
      "Stanford University is a private research university in Stanford, California. Known for its academic strength, wealth, proximity to Silicon Valley, and ranking as one of the world's top universities.",
    admissionProcess:
      "Stanford seeks students who have demonstrated intellectual vitality, leadership potential, and personal context. The application process includes academic transcripts, standardized tests, essays, and letters of recommendation.",
    events: [
      {
        name: "Tech Symposium",
        date: "February 28, 2025",
        description: "Latest innovations in technology and engineering",
      },
      {
        name: "Entrepreneurship Summit",
        date: "March 25, 2025",
        description: "Startup pitches and venture capital networking",
      },
      { name: "Art Exhibition", date: "April 15, 2025", description: "Student and faculty artistic works showcase" },
    ],
    researchWorks: [
      "Computer Science and Artificial Intelligence",
      "Bioengineering and Medical Technology",
      "Sustainable Energy Solutions",
      "Human-Computer Interaction",
    ],
    sportsCategories: [
      { category: "Team Sports", sports: ["Football", "Basketball", "Soccer", "Volleyball"] },
      { category: "Individual Sports", sports: ["Swimming", "Tennis", "Golf", "Track & Field"] },
      { category: "Olympic Sports", sports: ["Gymnastics", "Fencing", "Cycling"] },
    ],
    facilities: ["Silicon Valley connections", "Innovation labs", "Research centers", "Athletic complexes"],
  },
  3: {
    id: 3,
    name: "MIT",
    image: "/mit-campus-building.png",
    rating: 4.9,
    admissionDate: "Jan 1, 2025",
    researchCount: 1100,
    location: "Cambridge, MA",
    type: "Private",
    students: "11,000+",
    description:
      "The Massachusetts Institute of Technology is a private land-grant research university in Cambridge, Massachusetts. MIT has played a key role in the development of modern technology and science.",
    admissionProcess:
      "MIT looks for students who show they can handle the rigor of MIT academics and who will contribute to the MIT community. The process includes academic performance, standardized tests, essays, and extracurricular activities.",
    events: [
      {
        name: "Innovation Challenge",
        date: "March 10, 2025",
        description: "Student-led innovation and problem-solving competition",
      },
      { name: "Robotics Competition", date: "April 5, 2025", description: "International robotics championship" },
      { name: "Hackathon", date: "May 1, 2025", description: "48-hour coding and development marathon" },
    ],
    researchWorks: [
      "Robotics and Autonomous Systems",
      "Quantum Computing and Information",
      "Clean Energy and Sustainability",
      "Biotechnology and Life Sciences",
    ],
    sportsCategories: [
      { category: "Water Sports", sports: ["Rowing", "Sailing", "Swimming"] },
      { category: "Team Sports", sports: ["Basketball", "Soccer", "Volleyball"] },
      { category: "Individual Sports", sports: ["Cross Country", "Track & Field", "Tennis"] },
    ],
    facilities: ["Advanced research laboratories", "Maker spaces", "Innovation centers", "Athletic facilities"],
  },
}

export default function CollegeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [college, setCollege] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      router.push("/colleges")
      return
    }

    const collegeId = Number.parseInt(params.id as string)
    const collegeData = collegeDetails[collegeId as keyof typeof collegeDetails]

    if (collegeData) {
      setCollege(collegeData)
    } else {
      router.push("/colleges")
    }
  }, [params.id, user, router])

  if (!user) {
    return null
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading college details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Colleges
          </Button>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src={college.image || "/placeholder.svg"}
                alt={college.name}
                className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">{college.name}</h1>
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  {college.rating}
                </Badge>
              </div>

              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {college.location} • {college.type}
              </div>

              <p className="text-muted-foreground leading-relaxed">{college.description}</p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Admission Deadline</p>
                    <p className="text-sm text-muted-foreground">{college.admissionDate}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Students</p>
                    <p className="text-sm text-muted-foreground">{college.students}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admission Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center font-serif text-2xl">
                <GraduationCap className="h-6 w-6 mr-3 text-primary" />
                Admission Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{college.admissionProcess}</p>
            </CardContent>
          </Card>

          {/* Events */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center font-serif text-2xl">
                <Calendar className="h-6 w-6 mr-3 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {college.events.map((event: any, index: number) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{event.name}</h4>
                    <p className="text-sm text-primary font-medium mb-2">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Research Works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center font-serif text-2xl">
                <Microscope className="h-6 w-6 mr-3 text-primary" />
                Research Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {college.researchWorks.map((research: string, index: number) => (
                  <div key={index} className="flex items-center p-3 border border-border rounded-lg">
                    <BookOpen className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span className="text-foreground">{research}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sports Categories */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center font-serif text-2xl">
                <Trophy className="h-6 w-6 mr-3 text-primary" />
                Sports & Athletics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {college.sportsCategories.map((category: any, index: number) => (
                  <div key={index}>
                    <h4 className="font-semibold text-foreground mb-3">{category.category}</h4>
                    <div className="space-y-2">
                      {category.sports.map((sport: string, sportIndex: number) => (
                        <Badge key={sportIndex} variant="secondary" className="mr-2 mb-2">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Facilities */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center font-serif text-2xl">
                <Building className="h-6 w-6 mr-3 text-primary" />
                Campus Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {college.facilities.map((facility: string, index: number) => (
                  <div key={index} className="flex items-center p-3 border border-border rounded-lg">
                    <Building className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                    <span className="text-foreground">{facility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* College Reviews */}
          <CollegeReviews collegeName={college.name} />
        </div>
      </main>
    </div>
  )
}
