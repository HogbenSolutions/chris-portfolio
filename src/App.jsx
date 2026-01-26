import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hosting from './pages/Hosting'
import Preview from './pages/Preview'
import './App.css'

function MainLayout({ showCta }) {
  const ctaRef = useRef(null)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    if (showCta && isAnimatingOut) {
      // Reset animation when scrolling back up
      setIsAnimatingOut(false)
    } else if (!showCta && !isAnimatingOut) {
      // Trigger animation when scrolling into contact section
      setIsAnimatingOut(true)
    }
  }, [showCta, isAnimatingOut])

  const scrollToForm = (e) => {
    e.preventDefault()
    setTimeout(() => {
      const form = document.querySelector('.contact-form')
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' })
        form.querySelector('input')?.focus()
      }
    }, 100)
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {showCta && !isAnimatingOut && (
        <a
          ref={ctaRef}
          href="#contact"
          onClick={scrollToForm}
          className={`sticky-cta btn outline ${isAnimatingOut ? 'envelope-out' : ''}`}
          aria-label="Contact"
        >
          Get in Touch
        </a>
      )}
      {isAnimatingOut && (
        <a
          ref={ctaRef}
          href="#contact"
          onClick={scrollToForm}
          className="sticky-cta btn outline envelope-out"
          aria-label="Contact"
        >
          Get in Touch
        </a>
      )}
    </>
  )
}

function AppContent() {
  const [showCta, setShowCta] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const contactElement = document.getElementById('contact')
    if (!contactElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCta(!entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    observer.observe(contactElement)
    return () => observer.unobserve(contactElement)
  }, [])

  return (
    <div className="app">
      <div className="aurora" aria-hidden="true"></div>
      <Routes>
        <Route path="/" element={<MainLayout showCta={showCta} />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/preview/:clientName" element={<Preview />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
