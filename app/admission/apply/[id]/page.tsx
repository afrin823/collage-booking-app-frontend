"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth/auth-context"
import { ArrowLeft, Upload, User, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const collegeData = {
  1: { name: "Harvard University", programs: ["Medicine", "Law", "Business", "Engineering", "Liberal Arts"] },
  2: {
    name: "Stanford University",
    programs: ["Computer Science", "Engineering", "Business", "Medicine", "Liberal Arts"],
  },
  3: { name: "MIT", programs: ["Engineering", "Computer Science", "Physics", "Mathematics", "Economics"] },
  4: { name: "Yale University", programs: ["Liberal Arts", "Law", "Medicine", "Drama", "Music"] },
  5: {
    name: "Princeton University",
    programs: ["Liberal Arts", "Engineering", "Public Policy", "Economics", "Physics"],
  },
}

interface ApplicationData {
  candidateName: string
  subject: string
  candidateEmail: string
  candidatePhone: string
  address: string
  dateOfBirth: string
  profileImage: File | null
  collegeId: number
  collegeName: string
}

export default function ApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<ApplicationData>({
    candidateName: "",
    subject: "",
    candidateEmail: "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
    profileImage: null,
    collegeId: 0,
    collegeName: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/admission")
      return
    }

    const collegeId = Number.parseInt(params.id as string)
    const college = collegeData[collegeId as keyof typeof collegeData]

    if (!college) {
      router.push("/admission")
      return
    }

    setFormData((prev) => ({
      ...prev,
      candidateName: user.name || "",
      candidateEmail: user.email || "",
      collegeId,
      collegeName: college.name,
    }))
  }, [params.id, user, router])

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store application in localStorage (in real app, this would be sent to backend)
      const existingApplications = JSON.parse(localStorage.getItem("applications") || "[]")
      const newApplication = {
        ...formData,
        id: Date.now(),
        status: "submitted",
        submittedAt: new Date().toISOString(),
        profileImageUrl: formData.profileImage ? URL.createObjectURL(formData.profileImage) : null,
      }

      existingApplications.push(newApplication)
      localStorage.setItem("applications", JSON.stringify(existingApplications))

      toast({
        title: "Application Submitted Successfully!",
        description: `Your application to ${formData.collegeName} has been submitted and is under review.`,
      })

      router.push("/my-college")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return null
  }

  const college = collegeData[formData.collegeId as keyof typeof collegeData]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-6 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="outline" onClick={() => router.back()} className="mb-4 sm:mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admissions
          </Button>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              College Application
            </h1>
            <p className="text-base sm:text-lg text-primary font-medium">{formData.collegeName}</p>
            <p className="text-sm sm:text-base text-muted-foreground">Complete your application to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-serif text-lg sm:text-xl">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidateName" className="text-sm sm:text-base">
                      Full Name *
                    </Label>
                    <Input
                      id="candidateName"
                      type="text"
                      value={formData.candidateName}
                      onChange={(e) => handleInputChange("candidateName", e.target.value)}
                      placeholder="Enter your full name"
                      className="h-10 sm:h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="candidateEmail" className="text-sm sm:text-base">
                      Email Address *
                    </Label>
                    <Input
                      id="candidateEmail"
                      type="email"
                      value={formData.candidateEmail}
                      onChange={(e) => handleInputChange("candidateEmail", e.target.value)}
                      placeholder="Enter your email"
                      className="h-10 sm:h-11"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="candidatePhone" className="text-sm sm:text-base">
                      Phone Number *
                    </Label>
                    <Input
                      id="candidatePhone"
                      type="tel"
                      value={formData.candidatePhone}
                      onChange={(e) => handleInputChange("candidatePhone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="h-10 sm:h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm sm:text-base">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="h-10 sm:h-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm sm:text-base">
                    Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                    className="resize-none"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-serif text-lg sm:text-xl">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm sm:text-base">
                    Preferred Program/Subject *
                  </Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder="Select your preferred program" />
                    </SelectTrigger>
                    <SelectContent>
                      {college?.programs.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Profile Image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center font-serif text-lg sm:text-xl">
                  <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary" />
                  Profile Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
                    <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                    <Label htmlFor="profileImage" className="cursor-pointer">
                      <span className="text-primary hover:underline text-sm sm:text-base">Click to upload</span>
                      <span className="text-sm sm:text-base"> or drag and drop your photo</span>
                    </Label>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">PNG, JPG up to 5MB</p>
                  </div>
                  {formData.profileImage && (
                    <p className="text-xs sm:text-sm text-primary">Selected: {formData.profileImage.name}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-4 sm:pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 sm:px-12 h-11 sm:h-12 text-sm sm:text-base"
              >
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
