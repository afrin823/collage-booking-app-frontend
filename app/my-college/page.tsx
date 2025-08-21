"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth/auth-context"
import { useToast } from "@/hooks/use-toast"
import {
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface Application {
  id: number
  candidateName: string
  subject: string
  candidateEmail: string
  candidatePhone: string
  address: string
  dateOfBirth: string
  profileImageUrl: string | null
  collegeId: number
  collegeName: string
  status: "submitted" | "under-review" | "accepted" | "rejected"
  submittedAt: string
}

export default function MyCollegePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [applications, setApplications] = useState<Application[]>([])
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    // Load applications from localStorage
    const savedApplications = JSON.parse(localStorage.getItem("applications") || "[]")
    setApplications(savedApplications)
  }, [user, router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "under-review":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under-review":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedApplication || !reviewText || !reviewRating) {
      toast({
        title: "Missing Information",
        description: "Please fill in all review fields.",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store review in localStorage (in real app, this would be sent to backend)
      const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
      const newReview = {
        id: Date.now(),
        name: user?.name || "Anonymous",
        college: selectedApplication.collegeName,
        rating: Number.parseInt(reviewRating),
        comment: reviewText,
        avatar: "/placeholder.svg",
        submittedAt: new Date().toISOString(),
      }

      existingReviews.push(newReview)
      localStorage.setItem("reviews", JSON.stringify(existingReviews))

      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your experience. Your review has been added.",
      })

      setReviewText("")
      setReviewRating("")
      setSelectedApplication(null)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">My College Dashboard</h1>
            <p className="text-lg text-muted-foreground">Track your applications and share your experiences</p>
          </div>

          {applications.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any college applications. Start your journey today!
                </p>
                <Button onClick={() => router.push("/admission")}>Browse Colleges</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Applications List */}
              <div>
                <h2 className="font-serif text-2xl font-bold mb-6">Your Applications</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {applications.map((application) => (
                    <Card key={application.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="font-serif text-xl">{application.collegeName}</CardTitle>
                            <p className="text-muted-foreground">{application.subject}</p>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(application.status)}
                              {application.status.replace("-", " ").toUpperCase()}
                            </div>
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-primary" />
                            <span>{application.candidateName}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-primary" />
                            <span className="truncate">{application.candidateEmail}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-primary" />
                            <span>{application.candidatePhone}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span>{new Date(application.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{application.address}</span>
                        </div>

                        {application.status === "accepted" && (
                          <Button
                            onClick={() => setSelectedApplication(application)}
                            variant="outline"
                            className="w-full"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Write a Review
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Review Form */}
              {selectedApplication && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">
                      Write a Review for {selectedApplication.collegeName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rating">Rating *</Label>
                        <Select value={reviewRating} onValueChange={setReviewRating}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Stars - Excellent</SelectItem>
                            <SelectItem value="4">4 Stars - Very Good</SelectItem>
                            <SelectItem value="3">3 Stars - Good</SelectItem>
                            <SelectItem value="2">2 Stars - Fair</SelectItem>
                            <SelectItem value="1">1 Star - Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="review">Your Review *</Label>
                        <Textarea
                          id="review"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience with this college..."
                          rows={4}
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit">Submit Review</Button>
                        <Button type="button" variant="outline" onClick={() => setSelectedApplication(null)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
