import { useEffect, useRef } from "react"
import { Phone, MapPin, Camera, Clock, MessageCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ContactItem {
  icon: LucideIcon
  label: string
  value: string
  href?: string
  color: string
  bg: string
}

export default function Contact() {
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

  const contactInfo: ContactItem[] = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+52 1 563 624 1895",
      href: "https://wa.me/5215636241895",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Calle Texcalatlaco N° 8, San Miguel Xicalco",
      color: "text-dark",
      bg: "bg-gray-100",
    },
    {
      icon: Camera,
      label: "Instagram",
      value: "@nailssaris",
      href: "https://instagram.com/nailssaris",
      color: "text-fuchsia-500",
      bg: "bg-fuchsia-50",
    },
    {
      icon: Clock,
      label: "Horario",
      value: "Lun - Sáb: 10:00 - 19:00",
      color: "text-dark",
      bg: "bg-gray-100",
    },
  ]

  return (
    <section id="contacto" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-rose-extra-light" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <div className="animate-item section-hidden text-center mb-10 sm:mb-16">
          <span className="text-xs font-semibold tracking-widest text-dark uppercase">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mt-3 sm:mt-4 mb-4 sm:mb-6 text-gray-900">
            Reserva tu{" "}
            <span className="text-gradient">cita ahora</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            Contáctanos por WhatsApp y agenda tu sesión de belleza.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-start">
          <div className="animate-item section-hidden space-y-3 sm:space-y-4 lg:col-span-3">
            {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
              <div
                key={label}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 card-shadow hover:card-shadow-hover hover:border-rose-100 transition-all duration-300 flex items-center gap-3 sm:gap-4"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-400">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-medium text-gray-900 hover:text-primary transition-colors truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-sm sm:text-base font-medium text-gray-900 truncate">
                      {value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="animate-item section-hidden lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-gray-100 card-shadow">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mb-3">
                Escríbenos ahora
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Responde rápido y te ayudamos a elegir el diseño perfecto para ti.
              </p>
              <a
                href="https://wa.me/5215636241895"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 sm:px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
