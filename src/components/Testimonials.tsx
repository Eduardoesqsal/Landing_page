import { useEffect, useRef, useState } from "react"
import { Star, MessageSquare, Send, User, ThumbsUp, ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    text: "¡Me encantó el resultado! Llevo un mes con mis uñas acrílicas y están perfectas. El diseño superó mis expectativas.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ana Martínez",
    text: "La atención es increíble y el trabajo impecable. Siempre salgo feliz de mi cita. ¡Altamente recomendado!",
    rating: 5,
  },
  {
    id: 3,
    name: "Carolina López",
    text: "Hacen unos diseños espectaculares. Me hicieron exactamente lo que quería y duraron semanas sin perder el brillo.",
    rating: 5,
  },
]

function StarRating({
  rating,
  interactive,
  onChange,
}: {
  rating: number
  interactive?: boolean
  onChange?: (r: number) => void
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => onChange?.(i + 1) : undefined}
          disabled={!interactive}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-all duration-150`}
        >
          <Star
            className={`w-4 h-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function TestimonialCard({ name, text, rating }: Testimonial) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 card-shadow h-full">
      <Quote className="w-8 h-8 text-primary/20 mb-3" />
      <StarRating rating={rating} />
      <p className="text-gray-600 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base italic">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-4 sm:mt-6">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-sm sm:text-base font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-400">Cliente satisfecha</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [form, setForm] = useState({ name: "", text: "", rating: 5 })
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const titleRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lenRef = useRef(testimonials.length)
  lenRef.current = testimonials.length

  useEffect(() => {
    const tick = () => {
      setCarouselIndex((prev) => (prev + 1) % lenRef.current)
    }
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, 4000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const resetAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(
      () => setCarouselIndex((prev) => (prev + 1) % lenRef.current),
      4000
    )
  }

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + lenRef.current) % lenRef.current)
    resetAutoRotate()
  }

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % lenRef.current)
    resetAutoRotate()
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim()) return
    const newTestimonial: Testimonial = {
      id: Date.now(),
      name: form.name.trim(),
      text: form.text.trim(),
      rating: form.rating,
    }
    setTestimonials((prev) => [newTestimonial, ...prev])
    setForm({ name: "", text: "", rating: 5 })
    setSubmitted(true)
    setShowForm(false)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="section-hidden text-center mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-widest text-dark uppercase">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mt-3 sm:mt-4 mb-4 sm:mb-6 text-gray-900">
            Lo que dicen{" "}
            <span className="text-gradient">mis clientas</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            La satisfacción de mis clientas es mi mejor carta de presentación.
          </p>
        </div>

        {submitted && (
          <div className="max-w-md mx-auto mb-6 sm:mb-8 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm flex items-center gap-2 justify-center animate-fade-in">
            <ThumbsUp className="w-4 h-4" />
            ¡Gracias por tu opinión! Tu testimonio ha sido publicado.
          </div>
        )}

        <div className="flex justify-center mb-10 sm:mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
              showForm
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-rose-500/25"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            {showForm ? "Cerrar" : "Deja tu opinión"}
          </button>
        </div>

        {showForm && (
          <div className="max-w-lg mx-auto mb-10 sm:mb-12 animate-fade-in">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 card-shadow"
            >
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-5">
                Comparte tu experiencia
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                    required
                  />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <textarea
                    rows={3}
                    placeholder="Escribe tu opinión..."
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
                    required
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Tu calificación:</span>
                  <StarRating rating={form.rating} interactive onChange={(r) => setForm({ ...form, rating: r })} />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  Publicar opinión
                </button>
              </div>
            </form>
          </div>
        )}

        {testimonials.length > 0 && (
          <div className="max-w-xl mx-auto">
            <div className="animate-fade-in" key={testimonials[carouselIndex].id}>
              <TestimonialCard {...testimonials[carouselIndex]} />
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCarouselIndex(i); resetAutoRotate() }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === carouselIndex
                        ? "bg-primary w-5"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              {carouselIndex + 1} de {testimonials.length} testimonios
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
