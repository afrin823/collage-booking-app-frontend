export function CollegeGallery() {
  const galleryImages = [
    {
      src: "/college-graduation.png",
      alt: "Graduation Ceremony",
      title: "Class of 2024 Graduation",
    },
    {
      src: "/library-study-group.png",
      alt: "Students Studying",
      title: "Academic Excellence",
    },
    {
      src: "/college-sports-event.png",
      alt: "Sports Event",
      title: "Athletic Achievements",
    },
    {
      src: "/college-research-laboratory.png",
      alt: "Research Lab",
      title: "Innovation & Research",
    },
    {
      src: "/college-cultural-festival.png",
      alt: "Cultural Festival",
      title: "Cultural Celebrations",
    },
    {
      src: "/college-students-group.png",
      alt: "Student Life",
      title: "Campus Community",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Campus Life Gallery
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Experience the vibrant college life through our graduates' memorable moments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
