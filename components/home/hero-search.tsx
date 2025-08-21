"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface HeroSearchProps {
  onSearch: (query: string) => void
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
          Find Your Perfect
          <span className="text-primary block mt-2">College Match</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
          Discover top colleges, explore programs, and take the next step toward your educational journey with our
          comprehensive platform.
        </p>

        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:gap-4 max-w-2xl mx-auto px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                type="text"
                placeholder="Search for colleges by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base rounded-lg"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base whitespace-nowrap"
            >
              Search Colleges
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
