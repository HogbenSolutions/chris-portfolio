import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import './Hosting.css'

const stripePromise = loadStripe('pk_live_51SquHFDiDvWrDSRL7s4KT5WcIkM5i9h4s2QkVgJ8DoLCXQnhwb5T0gluIcupUrtaSsdF0S5Qz8dgaFnd7BiSULpa00z58Jp1zL')

export default function Hosting() {
  const [clientSecret, setClientSecret] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    // Check for success/canceled query params
    const params = new URLSearchParams(window.location.search)
    if (params.get('success')) {
      setStatus('success')
      // Clear the query param from URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } else if (params.get('canceled')) {
      setStatus('canceled')
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // Set info item stripe colors to match card background
    const infoItems = document.querySelectorAll('.info-item')
    infoItems.forEach((item) => {
      // Use accent-3 (darker accent) for the stripe to blend better
      item.style.setProperty('--info-stripe-color', 'var(--accent-3)')
    })
  }, [])

  const handleCheckout = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1SqvNnDiDvWrDSRLhAt1uVhU',
          successUrl: window.location.origin + '/hosting?success=true',
          cancelUrl: window.location.origin + '/hosting?canceled=true',
        }),
      })

      const data = await response.json()
      if (data.error) {
        alert('Error: ' + data.error)
        return
      }
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to start checkout. Please try again.')
    }
  }

  return (
    <div className="hosting-page">
      {status === 'success' && (
        <div className="success-banner">
          <div className="banner-content">
            <h3>✓ Thank you for subscribing!</h3>
            <p>If your website is not currently live, please allow up to 24 hours for it to become active.</p>
          </div>
          <button className="banner-close" onClick={() => setStatus(null)}>×</button>
        </div>
      )}
      {status === 'canceled' && (
        <div className="canceled-banner">
          <div className="banner-content">
            <h3>Payment Cancelled</h3>
            <p>No charges were made. Feel free to try again whenever you're ready.</p>
          </div>
          <button className="banner-close" onClick={() => setStatus(null)}>×</button>
        </div>
      )}
      <div className="container">
        <div className="hosting-header">
          <h1>Web Hosting Solutions</h1>
          <p className="sub">Professional hosting for your projects</p>
        </div>

        <div className="hosting-grid">
          <div className="hosting-card">
            <h2>Shared Hosting</h2>
            <div className="price">
              <span className="amount">£20</span>
              <span className="period">/month</span>
            </div>

            <ul className="features">
              <li>✓ Your site loads instantly worldwide for every visitor</li>
              <li>✓ 99.99% uptime guarantee - your site is always online</li>
              <li>✓ Contact form to capture customer inquiries</li>
              <li>✓ Automatic backups protect your data</li>
              <li>✓ Built-in security with free SSL certificates</li>
              <li>✓ Priority email support when you need help</li>
            </ul>

            {clientSecret ? (
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            ) : (
              <button onClick={handleCheckout} className="btn accent full-width">
                Subscribe Now
              </button>
            )}
          </div>

          <div className="hosting-info">
            <h3>Why Choose Our Hosting?</h3>
            <div className="info-list">
              <div className="info-item">
                <h4>Lightning Fast</h4>
                <p>Global CDN ensures your site loads quickly for visitors worldwide</p>
              </div>
              <div className="info-item">
                <h4>Secure</h4>
                <p>SSL certificates, DDoS protection, and regular security updates included</p>
              </div>
              <div className="info-item">
                <h4>Scalable</h4>
                <p>Automatically scales to handle traffic spikes without downtime</p>
              </div>
              <div className="info-item">
                <h4>Developer Friendly</h4>
                <p>Git-based deployments, environment variables, and advanced configuration options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
