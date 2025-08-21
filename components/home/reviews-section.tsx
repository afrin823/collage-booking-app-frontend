"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Review {
  id: number
  name: string
  college: string
  rating: number
  comment: string
  avatar: string
  submittedAt: string
}

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Alex Johnson",
    college: "Harvard University",
    rating: 5,
    comment:
      "The application process was seamless and the campus facilities exceeded my expectations. The research opportunities are incredible!",
    avatar: "/student-profile.png",
    submittedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Maria Garcia",
    college: "Stanford University",
    rating: 5,
    comment:
      "Amazing faculty and cutting-edge technology. The entrepreneurship program helped me launch my startup during my studies.",
    avatar: "/female-student-profile.png",
    submittedAt: "2024-01-10T14:20:00Z",
  },
  {
    id: 3,
    name: "David Chen",
    college: "MIT",
    rating: 4,
    comment:
      "Challenging academics but incredibly rewarding. The innovation culture here is unmatched. Highly recommend for STEM students.",
    avatar: "/male-student-profile.png",
    submittedAt: "2024-01-05T09:15:00Z",
  },
  {
    id: 4,
    name: "Sarah Williams",
    college: "Yale University",
    rating: 5,
    comment:
      "The liberal arts program is exceptional. Small class sizes and personalized attention from professors made all the difference.",
    avatar: "/placeholder-41hwi.png",
    submittedAt: "2024-01-01T16:45:00Z",
  },
]

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]")

    // Combine saved reviews with default reviews, with saved reviews first
    const allReviews = [...savedReviews, ...defaultReviews]

    // Sort by submission date (newest first) and take the most recent 6
    const sortedReviews = allReviews
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 6)

    setReviews(sortedReviews)
  }, [])

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Student Reviews</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our students about their college experiences and academic journeys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="flex-shrink-0">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{review.name}</h4>
                        <p className="text-sm text-primary font-medium">{review.college}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">"{review.comment}"</p>

                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(review.submittedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-serif text-xl font-semibold mb-2">Share Your Experience</h3>
            <p className="text-muted-foreground mb-4">
              Have you attended one of these colleges? Share your experience to help future students make informed
              decisions.
            </p>
            <p className="text-sm text-primary font-medium">
              Apply to a college and leave a review in your "My College" dashboard after acceptance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
