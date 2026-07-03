import { Sparkles, Camera, MessageCircle, Music2, Hash } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SocialLink {
  icon: LucideIcon
  href: string
  label: string
}

interface FooterLink {
  label: string
  href: string
}

const socialLinks: SocialLink[] = [
  { icon: Camera, href: "https://www.instagram.com/nails_by_sariis", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Facebook" },
  { icon: Music2, href: "#", label: "TikTok" },
  { icon: Hash, href: "#", label: "Twitter" },
]

const footerLinks: FooterLink[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <div>
          <a
            href="#hero"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold font-display mb-4"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="text-gradient">Nails</span>
            <span className="text-dark">Saris</span>
          </a>
          <p className="text-gray-400 text-sm leading-relaxed">
            Transformamos tus uñas en arte. Calidad profesional y diseños
            exclusivos para cada estilo.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Enlaces</h4>
          <ul className="space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Contacto</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>+52 1 563 624 1895</li>
            <li>Calle Texcalatlaco N° 8, San Miguel Xicalco</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Síguenos</h4>
          <div className="flex gap-2.5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-rose-50 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 py-5 sm:py-6">
        <p className="text-center text-xs text-gray-400">
          &copy; {year} Nails Saris. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
