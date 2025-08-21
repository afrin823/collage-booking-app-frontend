"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { HeroSearch } from "@/components/home/hero-search"
import { FeaturedColleges } from "@/components/home/featured-colleges"
import { CollegeGallery } from "@/components/home/college-gallery"
import { ResearchPapers } from "@/components/home/research-papers"
import { ReviewsSection } from "@/components/home/reviews-section"

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    setSearchResults(query)
    // In a real app, this would trigger a search API call
    console.log("Searching for:", query)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSearch onSearch={handleSearch} />

        {searchResults && (
          <div className="py-8 px-4 bg-muted/50">
            <div className="max-w-7xl mx-auto">
              <p className="text-center text-muted-foreground">
                Showing results for: <span className="font-semibold text-foreground">"{searchResults}"</span>
              </p>
            </div>
          </div>
        )}

        <FeaturedColleges />
        <CollegeGallery />
        <ResearchPapers />
        <ReviewsSection />
      </main>

      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="font-serif text-2xl font-bold mb-4">EduConnect</h3>
          <p className="text-primary-foreground/80 mb-4">Connecting students with their dream colleges since 2024</p>
          <p className="text-sm text-primary-foreground/60">© 2024 EduConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
