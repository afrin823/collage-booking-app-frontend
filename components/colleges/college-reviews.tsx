"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare } from "lucide-react"

interface Review {
  id: number
  name: string
  college: string
  rating: number
  comment: string
  avatar: string
  submittedAt: string
}

interface CollegeReviewsProps {
  collegeName: string
}

export function CollegeReviews({ collegeName }: CollegeReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    // Load reviews for this specific college
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    const collegeReviews = allReviews.filter(
      (review: Review) => review.college.toLowerCase() === collegeName.toLowerCase(),
    )

    // Sort by date (newest first)
    const sortedReviews = collegeReviews.sort(
      (a: Review, b: Review) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    )

    setReviews(sortedReviews)
  }, [collegeName])

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-serif text-xl">
            <MessageSquare className="h-5 w-5 mr-3 text-primary" />
            Student Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reviews yet for {collegeName}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Be the first to share your experience after getting accepted!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-serif text-xl">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-3 text-primary" />
            Student Reviews ({reviews.length})
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
            {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
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
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-2">"{review.comment}"</p>

                <p className="text-xs text-muted-foreground">
                  {new Date(review.submittedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {reviews.length > 3 && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
