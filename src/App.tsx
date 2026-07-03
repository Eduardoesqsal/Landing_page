import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Pricing from "./components/Pricing"
import Gallery from "./components/Gallery"
import About from "./components/About"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import BackToTop from "./components/BackToTop"
import ScrollProgress from "./components/ScrollProgress"

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  )
}
