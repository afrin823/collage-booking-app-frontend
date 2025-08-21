"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-context"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, MapPin, GraduationCap, Edit, Save, X, Camera } from "lucide-react"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
    profileImage: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    setFormData({
      name: user.name || "",
      email: user.email || "",
      university: user.university || "",
      address: user.address || "",
      profileImage: user.profileImage || "",
    })
  }, [user, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateProfile({
        name: formData.name,
        email: formData.email,
        university: formData.university,
        address: formData.address,
        profileImage: formData.profileImage,
      })

      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      university: user?.university || "",
      address: user?.address || "",
      profileImage: user?.profileImage || "",
    })
    setIsEditing(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }))
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Card */}
            <div className="xl:col-span-1">
              <Card>
                <CardContent className="pt-4 sm:pt-6">
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mx-auto">
                        <AvatarImage src={formData.profileImage || "/placeholder.svg"} alt={formData.name} />
                        <AvatarFallback className="text-lg sm:text-2xl">
                          {formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 sm:p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                          <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-semibold">{formData.name}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground break-all">{formData.email}</p>
                    </div>
                    {formData.university && (
                      <div className="flex items-center justify-center text-xs sm:text-sm text-muted-foreground">
                        <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        <span className="text-center">{formData.university}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-4 sm:mt-6">
                <CardHeader>
                  <CardTitle className="font-serif text-base sm:text-lg">Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Member Since</span>
                    <span className="text-xs sm:text-sm font-medium">2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Applications</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {JSON.parse(localStorage.getItem("applications") || "[]").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">Reviews</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {JSON.parse(localStorage.getItem("reviews") || "[]").length}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Information */}
            <div className="xl:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle className="font-serif text-lg sm:text-xl lg:text-2xl">Personal Information</CardTitle>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full sm:w-auto">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleSave} size="sm" className="w-full sm:w-auto">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto bg-transparent"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center text-sm sm:text-base">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="h-10 sm:h-11"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-foreground bg-muted/30 p-2 sm:p-3 rounded-md">
                        {formData.name || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center text-sm sm:text-base">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className="h-10 sm:h-11"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-foreground bg-muted/30 p-2 sm:p-3 rounded-md break-all">
                        {formData.email || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* University */}
                  <div className="space-y-2">
                    <Label htmlFor="university" className="flex items-center text-sm sm:text-base">
                      <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                      University/College
                    </Label>
                    {isEditing ? (
                      <Input
                        id="university"
                        type="text"
                        value={formData.university}
                        onChange={(e) => handleInputChange("university", e.target.value)}
                        placeholder="Enter your university or college"
                        className="h-10 sm:h-11"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-foreground bg-muted/30 p-2 sm:p-3 rounded-md">
                        {formData.university || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center text-sm sm:text-base">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary" />
                      Address
                    </Label>
                    {isEditing ? (
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter your complete address"
                        rows={3}
                        className="resize-none"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-foreground bg-muted/30 p-2 sm:p-3 rounded-md">
                        {formData.address || "Not provided"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="mt-4 sm:mt-6">
                <CardHeader>
                  <CardTitle className="font-serif text-base sm:text-lg lg:text-xl">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/my-college")}
                      className="w-full h-10 sm:h-11"
                    >
                      <GraduationCap className="h-4 w-4 mr-2" />
                      My Applications
                    </Button>
                    <Button variant="outline" onClick={() => router.push("/admission")} className="w-full h-10 sm:h-11">
                      <User className="h-4 w-4 mr-2" />
                      Apply to Colleges
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
