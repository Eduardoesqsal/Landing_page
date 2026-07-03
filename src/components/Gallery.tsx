import { useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  tag: string
}

const galleryImages: GalleryImage[] = [
  { src: "/images/1.jfif", alt: "Diseño de uñas acrílicas 1", tag: "Acrílicas" },
  { src: "/images/2.jfif", alt: "Diseño de uñas acrílicas 2", tag: "Nail Art" },
  { src: "/images/3.jpg", alt: "Diseño de uñas acrílicas 3", tag: "Gel" },
  { src: "/images/4.jpg", alt: "Diseño de uñas acrílicas 4", tag: "Acrílicas" },
  { src: "/images/5.jpg", alt: "Diseño de uñas acrílicas 5", tag: "Nail Art" },
  { src: "/images/6.jpg", alt: "Diseño de uñas acrílicas 6", tag: "Gel" },
  { src: "/images/7.jpg", alt: "Diseño de uñas acrílicas 7", tag: "Acrílicas" },
  { src: "/images/8.jpg", alt: "Diseño de uñas acrílicas 8", tag: "Nail Art" },
  { src: "/images/9.jpg", alt: "Diseño de uñas acrílicas 9", tag: "Gel" },
  { src: "/images/10.jpg", alt: "Diseño de uñas acrílicas 10", tag: "Acrílicas" },
  { src: "/images/11.jpg", alt: "Diseño de uñas acrílicas 11", tag: "Nail Art" },
  { src: "/images/12.jpg", alt: "Diseño de uñas acrílicas 12", tag: "Gel" },
  { src: "/images/13.jpg", alt: "Diseño de uñas acrílicas 13", tag: "Acrílicas" },
  { src: "/images/14.jpg", alt: "Diseño de uñas acrílicas 14", tag: "Nail Art" },
  { src: "/images/15.jpg", alt: "Diseño de uñas acrílicas 15", tag: "Gel" },
]

const tags = ["Todas", "Acrílicas", "Nail Art", "Gel"]

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div className={`absolute inset-0 ${loaded ? "" : "shimmer-bg"}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default function Gallery() {
  const [activeTag, setActiveTag] = useState("Todas")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  const filtered = activeTag === "Todas"
    ? galleryImages
    : galleryImages.filter((img) => img.tag === activeTag)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === "Escape") return setSelectedImage(null)
      if (e.key === "ArrowLeft") {
        const i = filtered.indexOf(selectedImage)
        if (i > 0) setSelectedImage(filtered[i - 1])
      }
      if (e.key === "ArrowRight") {
        const i = filtered.indexOf(selectedImage)
        if (i < filtered.length - 1) setSelectedImage(filtered[i + 1])
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedImage, filtered])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("section-visible")
      },
      { threshold: 0.1 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="galeria" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-rose-extra-light">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="section-hidden text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-widest text-dark uppercase">
            Galería
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mt-3 sm:mt-4 mb-4 sm:mb-6 text-gray-900">
            Nuestro{" "}
            <span className="text-gradient">trabajo</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Cada diseño es único y refleja la personalidad de nuestra clienta.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeTag === tag
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-rose-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((img) => (
            <button
              key={img.src}
              onClick={() => setSelectedImage(img)}
              className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 card-shadow hover:card-shadow-hover transition-all duration-300 hover:scale-[1.02]"
            >
              <LazyImage src={img.src} alt={img.alt} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <span className="text-xs sm:text-sm font-medium text-white">Ver diseño</span>
              </div>
            </button>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-4 sm:p-6 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-xl overflow-hidden bg-gray-100 mb-4 max-h-[70vh] flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain max-h-[65vh]"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-rose-50 text-primary px-3 py-1 rounded-full font-medium">
                  {selectedImage.tag}
                </span>
                <span className="text-gray-500 text-sm">{selectedImage.alt}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); const i = filtered.indexOf(selectedImage); if (i > 0) setSelectedImage(filtered[i - 1]) }}
                  disabled={filtered.indexOf(selectedImage) === 0}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-gray-400">
                  {filtered.indexOf(selectedImage) + 1} / {filtered.length}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); const i = filtered.indexOf(selectedImage); if (i < filtered.length - 1) setSelectedImage(filtered[i + 1]) }}
                  disabled={filtered.indexOf(selectedImage) === filtered.length - 1}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:bg-rose-50 hover:text-primary transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
