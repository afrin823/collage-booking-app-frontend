"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { CollegeCard } from "@/components/colleges/college-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const colleges = [
  {
    id: 1,
    name: "Harvard University",
    image: "/harvard-campus.png",
    rating: 4.9,
    admissionDate: "Dec 1, 2024",
    researchCount: 1250,
    location: "Cambridge, MA",
    type: "Private",
    students: "23,000+",
    description: "World-renowned institution known for academic excellence and research innovation.",
  },
  {
    id: 2,
    name: "Stanford University",
    image: "/stanford-university-campus.png",
    rating: 4.8,
    admissionDate: "Jan 15, 2025",
    researchCount: 980,
    location: "Stanford, CA",
    type: "Private",
    students: "17,000+",
    description: "Leading university in technology, entrepreneurship, and innovation.",
  },
  {
    id: 3,
    name: "MIT",
    image: "/mit-campus-building.png",
    rating: 4.9,
    admissionDate: "Jan 1, 2025",
    researchCount: 1100,
    location: "Cambridge, MA",
    type: "Private",
    students: "11,000+",
    description: "Premier institution for science, technology, engineering, and mathematics.",
  },
  {
    id: 4,
    name: "Yale University",
    image: "/yale-university-campus.png",
    rating: 4.7,
    admissionDate: "Jan 2, 2025",
    researchCount: 850,
    location: "New Haven, CT",
    type: "Private",
    students: "13,000+",
    description: "Historic Ivy League university with strong liberal arts and research programs.",
  },
  {
    id: 5,
    name: "Princeton University",
    image: "/princeton-university-campus.png",
    rating: 4.8,
    admissionDate: "Jan 1, 2025",
    researchCount: 720,
    location: "Princeton, NJ",
    type: "Private",
    students: "8,500+",
    description: "Prestigious university known for undergraduate education and research excellence.",
  },
  {
    id: 6,
    name: "University of California, Berkeley",
    image: "/uc-berkeley-campus.png",
    rating: 4.6,
    admissionDate: "Nov 30, 2024",
    researchCount: 1400,
    location: "Berkeley, CA",
    type: "Public",
    students: "45,000+",
    description: "Top public research university with diverse academic programs and innovation.",
  },
]

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredColleges, setFilteredColleges] = useState(colleges)

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredColleges(colleges)
      return
    }

    const filtered = colleges.filter(
      (college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredColleges(filtered)
  }

  const handleReset = () => {
    setSearchQuery("")
    setFilteredColleges(colleges)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Explore Colleges</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover top universities and colleges that match your academic goals and interests
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search colleges by name, location, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSearch}>Search</Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredColleges.length} of {colleges.length} colleges
            </p>
          </div>

          {/* College Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No colleges found matching your search criteria.</p>
              <Button onClick={handleReset} className="mt-4">
                View All Colleges
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
