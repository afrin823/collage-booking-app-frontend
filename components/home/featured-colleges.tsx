"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"

const featuredColleges = [
  {
    id: 1,
    name: "Harvard University",
    image: "/harvard-campus.png",
    admissionDate: "Dec 1, 2024",
    events: ["Science Fair", "Cultural Festival", "Sports Meet"],
    research: "Advanced AI Research, Medical Innovations",
    sports: ["Basketball", "Swimming", "Tennis"],
    rating: 4.9,
    students: "23,000+",
  },
  {
    id: 2,
    name: "Stanford University",
    image: "/stanford-university-campus.png",
    admissionDate: "Jan 15, 2025",
    events: ["Tech Symposium", "Entrepreneurship Summit", "Art Exhibition"],
    research: "Computer Science, Bioengineering",
    sports: ["Football", "Soccer", "Track & Field"],
    rating: 4.8,
    students: "17,000+",
  },
  {
    id: 3,
    name: "MIT",
    image: "/mit-campus-building.png",
    admissionDate: "Jan 1, 2025",
    events: ["Innovation Challenge", "Robotics Competition", "Hackathon"],
    research: "Robotics, Quantum Computing, Clean Energy",
    sports: ["Rowing", "Sailing", "Cross Country"],
    rating: 4.9,
    students: "11,000+",
  },
]

export function FeaturedColleges() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Featured Colleges
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Explore our top-rated institutions offering world-class education and opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredColleges.map((college) => (
            <Card key={college.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={college.image || "/placeholder.svg"}
                  alt={college.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <Badge className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-primary text-primary-foreground text-xs sm:text-sm">
                  ★ {college.rating}
                </Badge>
              </div>

              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-serif text-lg sm:text-xl">{college.name}</CardTitle>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {college.students} students
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="flex items-center text-xs sm:text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
                  <span className="font-medium">Admission:</span>
                  <span className="ml-1 truncate">{college.admissionDate}</span>
                </div>

                <div>
                  <div className="flex items-center text-xs sm:text-sm font-medium mb-2">
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                    Research Areas
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{college.research}</p>
                </div>

                <div>
                  <div className="flex items-center text-xs sm:text-sm font-medium mb-2">
                    <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                    Sports
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {college.sports.slice(0, 3).map((sport) => (
                      <Badge key={sport} variant="secondary" className="text-xs">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/colleges/${college.id}`}>
                  <Button className="w-full mt-3 sm:mt-4 text-sm sm:text-base">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
