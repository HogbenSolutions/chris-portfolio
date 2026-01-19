import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', tel: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        console.error('Form submission failed:', data.error)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const scrollToForm = () => {
    setTimeout(() => {
      const form = document.querySelector('.contact-form')
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' })
        form.querySelector('input')?.focus()
      }
    }, 100)
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-head">
          <h2>Let's Build Something Great</h2>
          <p className="sub">
            Tell me about your project, timeline, and goals. I'll get back to you with a clear plan and estimate.
          </p>
        </div>

        <div className="contact-grid">
          <div className="info-card reveal">
            <h3>Why Choose Me?</h3>
            <ul className="benefits">
              <li>
                <span className="icon" aria-label="Lightning bolt icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </span>
                <div>
                  <strong>Fast & Responsive</strong>
                  <p>Quick communication and rapid development cycles</p>
                </div>
              </li>
              <li>
                <span className="icon">
                  <svg viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1L3 5v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                </span>
                <div>
                  <strong>Solid Architecture</strong>
                  <p>Scalable, maintainable code that grows with your business</p>
                </div>
              </li>
              <li>
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <div>
                  <strong>Security First</strong>
                  <p>JWT auth, secure APIs, and best-practice data handling</p>
                </div>
              </li>
              <li>
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <line x1="1" y1="3" x2="23" y2="3" />
                    <path d="M10 12v4M14 12v4M6 12v4M18 12v4" />
                  </svg>
                </span>
                <div>
                  <strong>Results Focused</strong>
                  <p>Building applications that deliver real business value</p>
                </div>
              </li>
            </ul>
          </div>

          <form 
            className="contact-form reveal"
            onSubmit={handleSubmit}
          >
            <img
              src="https://res.cloudinary.com/dy8oze8dn/image/upload/v1755921732/Self_Portrait_qdcjdd.jpg"
              alt="Christopher Hogben"
              className="form-avatar"
            />
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your name *"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address *"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="tel"
                placeholder="Phone number"
                value={formData.tel}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Project title or goal"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <textarea
                name="message"
                placeholder="Tell me about your project and what you're looking to build *"
                required
                rows="6"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn accent">
              Send Message
            </button>

            {submitted && (
              <div className="success-message">
                ✓ Thanks! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
