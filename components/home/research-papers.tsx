import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Calendar } from "lucide-react"

const researchPapers = [
  {
    title: "Artificial Intelligence in Modern Education Systems",
    authors: "Dr. Sarah Johnson, Prof. Michael Chen",
    university: "Stanford University",
    date: "March 2024",
    abstract:
      "This paper explores the integration of AI technologies in educational frameworks and their impact on student learning outcomes.",
    link: "#",
  },
  {
    title: "Sustainable Energy Solutions for Campus Infrastructure",
    authors: "Dr. Emily Rodriguez, Dr. James Wilson",
    university: "MIT",
    date: "February 2024",
    abstract:
      "A comprehensive study on implementing renewable energy systems in university campuses to achieve carbon neutrality.",
    link: "#",
  },
  {
    title: "Digital Transformation in Higher Education",
    authors: "Prof. David Kim, Dr. Lisa Thompson",
    university: "Harvard University",
    date: "January 2024",
    abstract:
      "Analyzing the shift towards digital learning platforms and their effectiveness in post-pandemic educational environments.",
    link: "#",
  },
  {
    title: "Mental Health Support Systems in Academic Institutions",
    authors: "Dr. Rachel Green, Prof. Mark Davis",
    university: "Yale University",
    date: "December 2023",
    abstract:
      "Research on developing comprehensive mental health programs to support student wellbeing and academic success.",
    link: "#",
  },
]

export function ResearchPapers() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Research Papers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover groundbreaking research from our partner institutions and their contributions to academia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchPapers.map((paper, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="font-serif text-lg mb-2 leading-tight">{paper.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-1">{paper.authors}</p>
                    <p className="text-sm font-medium text-primary">{paper.university}</p>
                  </div>
                  <FileText className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {paper.date}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{paper.abstract}</p>

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href={paper.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Full Paper
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
