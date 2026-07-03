import { useEffect, useRef } from "react"
import { Sparkles, Droplets, Palette, Hand, Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Plan {
  Icon: LucideIcon
  name: string
  price: string
  desc: string
  features: string[]
  popular: boolean
  color: string
}

const plans: Plan[] = [
  {
    Icon: Sparkles,
    name: "Uñas Acrílicas",
    price: "$350",
    desc: "Duraderas y resistentes, con la forma y largo ideal.",
    features: [
      "Largo a elección",
      "Forma personalizada",
      "Esmaltado incluye",
      "Duración 3-4 semanas",
    ],
    popular: false,
    color: "from-primary to-secondary",
  },
  {
    Icon: Palette,
    name: "Nail Art Premium",
    price: "$450",
    desc: "Diseños personalizados con acabados de lujo.",
    features: [
      "Diseño único",
      "Cromados / 3D",
      "Tendencias virales",
      "Incluye mantenimiento",
    ],
    popular: true,
    color: "from-gold to-yellow-500",
  },
  {
    Icon: Droplets,
    name: "Gel Semipermante",
    price: "$280",
    desc: "Esmaltado de larga duración con brillo espectacular.",
    features: [
      "Brillo intenso",
      "Sin daño a la uña",
      "Dura 2-3 semanas",
      "Retiro sin acetona",
    ],
    popular: false,
    color: "from-secondary to-accent",
  },
  {
    Icon: Hand,
    name: "Spa de Manos",
    price: "$220",
    desc: "Cuidado completo con masaje relajante.",
    features: [
      "Exfoliación",
      "Hidratación profunda",
      "Masaje relajante",
      "Cutículas perfectas",
    ],
    popular: false,
    color: "from-accent to-primary",
  },
]

function PricingCard({ Icon, name, price, desc, features, popular, color, index }: Plan & { index: number }) {
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
      className={`section-hidden relative bg-white rounded-2xl border card-shadow hover:card-shadow-hover transition-all duration-500 hover:-translate-y-2 ${
        popular ? "border-gold/30 ring-1 ring-gold/20" : "border-gray-100"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-dark text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
          Más popular
        </div>
      )}
      <div className="p-6 sm:p-8">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold font-display text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-4">{desc}</p>
        <div className="mb-5">
          <span className="text-3xl sm:text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-400 text-sm ml-1">/ sesión</span>
        </div>
        <ul className="space-y-2.5 mb-6">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Check className="w-4 h-4 text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <a
          href="https://wa.me/5215636241895"
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${
            popular
              ? "bg-gradient-gold text-dark hover:shadow-lg hover:shadow-gold/30"
              : `bg-gradient-to-r ${color} text-white hover:shadow-lg hover:shadow-rose-500/20`
          }`}
        >
          Reservar ahora
        </a>
      </div>
    </div>
  )
}

export default function Pricing() {
  const titleRef = useRef<HTMLDivElement>(null)

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
    <section id="precios" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-rose-extra-light to-white">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="section-hidden text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-widest text-dark uppercase">
            Precios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mt-3 sm:mt-4 mb-4 sm:mb-6 text-gray-900">
            Inversión para tu{" "}
            <span className="text-gradient-animated">belleza</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Calidad profesional a precios accesibles. Todas nuestras sesiones incluyen
            atención personalizada y productos hipoalergénicos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
