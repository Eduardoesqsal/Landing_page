import { useState, useEffect } from "react"
import { Sparkles, ArrowRight, ChevronDown, Shield, Star, Palette } from "lucide-react"

interface Stat {
  target: number
  suffix: string
  label: string
}

function AnimatedNumber({ target, suffix }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 40)
    return () => clearInterval(timer)
  }, [target])

  return <>{count}{suffix ?? ""}</>
}

export default function Hero() {
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    if (!showStats && window.scrollY < window.innerHeight * 0.8) {
      setShowStats(true)
    }
    const onScroll = () => {
      if (!showStats && window.scrollY < window.innerHeight * 0.8) {
        setShowStats(true)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [showStats])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const stats: Stat[] = [
    { target: 500, suffix: "+", label: "Clientas" },
    { target: 1000, suffix: "+", label: "Diseños" },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-extra-light via-white to-white"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-primary/20 rounded-full" />
        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-secondary/20 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-accent/20 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-28 sm:py-32">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6 sm:mb-8">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Experta en uñas acrílicas
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-[1.1] mb-4 sm:mb-6">
              Tu estilo,
              <br />
              <span className="text-gradient">nuestra pasión</span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
              Transformo tus uñas en obras de arte con diseños únicos y
              tendencias internacionales. Calidad profesional en cada detalle.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-10 sm:mb-12">
              <button
                onClick={() => scrollTo("#galeria")}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:shadow-xl hover:shadow-rose-500/25 transition-all duration-300 hover:scale-105"
              >
                Ver Galería
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollTo("#contacto")}
                className="flex items-center justify-center gap-2 bg-dark text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold border border-dark hover:bg-dark-2 transition-all duration-300 hover:shadow-lg"
              >
                Contáctanos
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8 justify-center lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gradient">
                    {showStats ? <AnimatedNumber target={stat.target} suffix={stat.suffix} /> : "0"}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-md xl:max-w-lg">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/10">
                <img
                  src="/images/7.jpg"
                  alt="Manicura profesional en Nails Saris"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 xl:w-20 xl:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float border border-rose-100">
                <Star className="w-6 h-6 xl:w-8 xl:h-8 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="absolute -bottom-3 -left-5 w-14 h-14 xl:w-18 xl:h-18 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float-delayed border border-rose-100">
                <Palette className="w-5 h-5 xl:w-6 xl:h-6 text-primary" />
              </div>
              <div className="absolute top-1/3 -right-8 w-12 h-12 xl:w-14 xl:h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float border border-rose-100" style={{ animationDelay: "1s" }}>
                <Shield className="w-5 h-5 xl:w-6 xl:h-6 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("#servicios")}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 hover:text-primary transition-colors"
        aria-label="Ver más"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </section>
  )
}
