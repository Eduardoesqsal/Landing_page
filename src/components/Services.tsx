import { useEffect, useRef } from "react"
import { Sparkles, Brush, Droplets, Scissors, Palette, Hand } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Service {
  Icon: LucideIcon
  title: string
  desc: string
  color: string
  bg: string
}

const services: Service[] = [
  {
    Icon: Sparkles,
    title: "Uñas Acrílicas",
    desc: "Duraderas y resistentes, con la forma y largo que desees. Perfectas para cualquier ocasión.",
    color: "text-primary",
    bg: "bg-rose-50",
  },
  {
    Icon: Brush,
    title: "Diseños Personalizados",
    desc: "Desde francesa clásica hasta nail art avant-garde. Tu imaginación es el límite.",
    color: "text-secondary",
    bg: "bg-fuchsia-50",
  },
  {
    Icon: Droplets,
    title: "Gel Semipermante",
    desc: "Esmaltado de larga duración con brillo espectacular. Sin dañar tu uña natural.",
    color: "text-accent",
    bg: "bg-violet-50",
  },
  {
    Icon: Scissors,
    title: "Mantenimiento",
    desc: "Renovamos tus uñas acrílicas o de gel para que siempre luzcan impecables.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    Icon: Palette,
    title: "Nail Art",
    desc: "Decoraciones 3D, cromados, efectos espejo y las tendencias más virales del momento.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    Icon: Hand,
    title: "Cuidado de Manos",
    desc: "Spa de manos, cutículas hidratadas y masajes relajantes para completar tu experiencia.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
]

function ServiceCard({ Icon, title, desc, color, bg, index }: Service & { index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible")
        }
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="section-hidden group bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 card-shadow hover:card-shadow-hover hover:border-rose-200 transition-all duration-500 hover:-translate-y-1"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ring-1 ring-black/5`}>
        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${color}`} />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold font-display mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible")
        }
      },
      { threshold: 0.1 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="servicios" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-rose-extra-light">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="section-hidden text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-widest text-dark uppercase">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mt-3 sm:mt-4 mb-4 sm:mb-6 text-gray-900">
            Todo para tus{" "}
            <span className="text-gradient">uñas perfectas</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Ofrecemos una experiencia completa de belleza para tus manos, combinando
            técnica profesional con las últimas tendencias.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
