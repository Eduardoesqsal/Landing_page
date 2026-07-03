import { useState, useEffect } from "react"
import { Menu, X, Sparkles, Calendar } from "lucide-react"

interface Link {
  label: string
  href: string
}

const links: Link[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Servicios", href: "#servicios" },
  { label: "Precios", href: "#precios" },
  { label: "Galería", href: "#galeria" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-rose-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 sm:h-18">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick("#hero") }}
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold font-display"
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          <span className="text-gradient">Nails</span>
          <span className="text-dark">Saris</span>
        </a>

        <div className="hidden lg:flex items-center gap-8 ml-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
              className={`text-sm font-medium transition-colors relative group ${
                activeSection === link.href.slice(1)
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); handleClick("#contacto") }}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:scale-105"
          >
            <Calendar className="w-4 h-4" />
            Agendar Cita
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex items-center justify-center ml-auto w-10 h-10 text-gray-700 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
          <div className="bg-white/95 backdrop-blur-lg border-b border-rose-100 px-4 sm:px-6 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
              className={`text-sm font-medium py-2 transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); handleClick("#contacto") }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-rose-500/25"
          >
            <Calendar className="w-4 h-4" />
            Agendar Cita
          </a>
        </div>
      </div>
    </nav>
  )
}
