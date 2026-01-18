import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import './Hosting.css'

const stripePromise = loadStripe('pk_live_51SquHFDiDvWrDSRL7s4KT5WcIkM5i9h4s2QkVgJ8DoLCXQnhwb5T0gluIcupUrtaSsdF0S5Qz8dgaFnd7BiSULpa00z58Jp1zL')

export default function Hosting() {
  const [clientSecret, setClientSecret] = useState(null)

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
      <div className="container">
        <div className="hosting-header">
          <h1>Web Hosting Solutions</h1>
          <p className="sub">Professional hosting for your projects, powered by Netlify infrastructure</p>
        </div>

        <div className="hosting-grid">
          <div className="hosting-card">
            <h2>Shared Hosting</h2>
            <div className="price">
              <span className="amount">£20</span>
              <span className="period">/month</span>
            </div>

            <ul className="features">
              <li>✓ Unlimited bandwidth</li>
              <li>✓ Global CDN</li>
              <li>✓ SSL certificate included</li>
              <li>✓ Automatic Git deployments</li>
              <li>✓ Form handling & submissions</li>
              <li>✓ Environment variables</li>
              <li>✓ Analytics & monitoring</li>
              <li>✓ Email support</li>
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
