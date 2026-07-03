import { useEffect, useRef } from "react"
import { Award, Heart, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Badge {
  icon: LucideIcon
  label: string
  color: string
  bg: string
}

const badges: Badge[] = [
  { icon: Award, label: "Productos Hipoalergénicos", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: Sparkles, label: "Certificada", color: "text-fuchsia-500", bg: "bg-fuchsia-50" },
  { icon: Heart, label: "Tendencias Globales", color: "text-pink-500", bg: "bg-pink-50" },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".animate-item").forEach((el, i) => {
            setTimeout(() => el.classList.add("section-visible"), i * 150)
          })
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="nosotros" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-rose-extra-light to-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="animate-item section-hidden">
            <span className="text-xs font-semibold tracking-widest text-dark uppercase">
              Sobre Mí
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mt-3 sm:mt-4 mb-5 sm:mb-6 text-gray-900">
              Pasión por el{" "}
              <span className="text-gradient">arte de las uñas</span>
            </h2>

            <div className="space-y-4 text-gray-500 leading-relaxed text-sm sm:text-base">
              <p>
                En <strong className="text-gray-900">Nails Saris</strong> creo
                que unas manos bien cuidadas hablan de ti. Soy una profesional
                apasionada por el nail art y la belleza.
              </p>
              <p>
                Cada diseño lo creamos pensando en ti, usando productos de la más
                alta calidad para garantizar durabilidad, brillo y salud en tus
                uñas naturales.
              </p>
              <p>
                Me mantengo actualizada con las tendencias internacionales para
                ofrecerte siempre lo último en moda y estilo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              {badges.map(({ icon: Icon, label, color, bg }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 ${bg} ${color} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-50 via-fuchsia-50 to-accent/10 border border-rose-100 flex items-center justify-center animate-item section-hidden card-shadow">
            <div className="text-center p-8 sm:p-12">
              <div className="text-7xl sm:text-8xl mb-4 sm:mb-6">💅</div>
              <div className="text-gradient font-display text-xl sm:text-2xl font-bold">
                Nails Saris
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mt-2">
                Donde el arte y la elegancia se encuentran
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
