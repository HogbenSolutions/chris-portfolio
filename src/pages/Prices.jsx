import { Link } from 'react-router-dom'
import './Prices.css'

const tiers = [
  {
    id: 'landing',
    name: 'Static Landing Page',
    buildFrom: '£500',
    buildTo: '£1,200',
    badge: null,
    description: 'A clean, fast single or multi-page site — ideal for sole traders, events, or personal brands who need an online presence without the complexity.',
    includes: [
      'Up to 5 pages (Home, About, Services, Contact, etc.)',
      'Mobile-responsive design',
      'Contact form',
      'Basic SEO setup',
      'Free SSL certificate',
      'Delivered in 1–2 weeks',
    ],
    hosting: {
      label: 'Shared Hosting',
      price: '£20/month',
      note: 'Our shared hosting plan covers everything you need.',
      link: '/hosting',
    },
  },
  {
    id: 'business',
    name: 'Business Website',
    buildFrom: '£1,800',
    buildTo: '£5,000',
    badge: null,
    description: 'A content-managed multi-page site for established businesses. You get full control over your content without needing a developer for every update.',
    includes: [
      'Up to 20 pages',
      'CMS integration (edit content yourself)',
      'Blog / news section',
      'SEO optimisation',
      'Analytics setup (GA4)',
      'Delivered in 2–4 weeks',
    ],
    hosting: {
      label: 'Managed Cloud Hosting',
      price: 'from £35/month',
      note: 'Dedicated cloud resources with daily backups and monitoring.',
      link: null,
    },
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Store',
    buildFrom: '£3,500',
    buildTo: '£10,000',
    badge: 'Popular',
    description: 'A fully featured online shop with product listings, cart, checkout, and order management. Ready to take payments from day one.',
    includes: [
      'Product catalogue & stock management',
      'Shopping cart & checkout flow',
      'Payment gateway integration (Stripe / PayPal)',
      'Customer accounts & order history',
      'Discount codes & promotions',
      'Delivered in 4–8 weeks',
    ],
    hosting: {
      label: 'E-Commerce Hosting',
      price: 'from £60/month',
      note: 'High-availability hosting with enhanced security and PCI compliance support.',
      link: null,
    },
  },
  {
    id: 'crud',
    name: 'Custom Web Application',
    buildFrom: '£5,500',
    buildTo: '£15,000',
    badge: null,
    description: 'A bespoke CRUD application with a React frontend, REST API backend, and a relational or document database. Perfect for internal tools or SaaS MVPs.',
    includes: [
      'React (or Next.js) frontend',
      'Node.js / Express REST API',
      'Database design & implementation',
      'User authentication & roles',
      'Admin dashboard',
      'Delivered in 6–12 weeks',
    ],
    hosting: {
      label: 'Cloud Hosting',
      price: 'from £120/month',
      note: 'Dedicated cloud instances with autoscaling, CI/CD pipelines, and 24/7 uptime monitoring.',
      link: null,
    },
  },
  {
    id: 'mern',
    name: 'Full-Stack MERN Platform',
    buildFrom: '£12,000',
    buildTo: '£40,000+',
    badge: 'Most Complex',
    description: 'A production-grade platform built on the full MERN stack (MongoDB, Express, React, Node.js). Suits growing startups and businesses with complex, data-heavy requirements.',
    includes: [
      'Full MERN stack architecture',
      'Real-time features (WebSockets)',
      'Third-party API integrations',
      'Scalable microservices design',
      'Comprehensive admin & analytics panel',
      'Delivered in 12–24 weeks',
    ],
    hosting: {
      label: 'Scalable Cloud Infrastructure',
      price: 'from £250/month',
      note: 'Multi-service cloud setup with load balancing, managed databases, and infrastructure as code.',
      link: null,
    },
  },
]

export default function Prices() {
  const scrollToContact = () => {
    window.location.href = '/#contact'
  }

  return (
    <div className="prices-page">
      <div className="container">
        <div className="prices-header">
          <h1>Website Pricing</h1>
          <p className="sub">
            Transparent, honest pricing for every stage of your online journey.
            All builds are bespoke — every price below is a guide based on typical
            UK market rates for 2024&ndash;25.
          </p>
        </div>

        <div className="prices-grid">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`price-card${tier.badge ? ' featured' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tier.badge && (
                <span className="price-badge">{tier.badge}</span>
              )}

              <h2>{tier.name}</h2>
              <p className="tier-desc">{tier.description}</p>

              <div className="build-cost">
                <span className="from-label">Build cost</span>
                <div className="price-range">
                  <span className="price-from">{tier.buildFrom}</span>
                  <span className="price-sep"> – </span>
                  <span className="price-to">{tier.buildTo}</span>
                </div>
                <span className="price-note">one-off project fee</span>
              </div>

              <ul className="tier-features">
                {tier.includes.map((item) => (
                  <li key={item}>
                    <span className="check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="hosting-section">
                <div className="hosting-label-row">
                  <span className="hosting-label">Hosting required</span>
                </div>
                <div className="hosting-name">{tier.hosting.label}</div>
                <div className="hosting-price">{tier.hosting.price}</div>
                <p className="hosting-note">{tier.hosting.note}</p>
                {tier.hosting.link ? (
                  <Link
                    to={tier.hosting.link}
                    className="btn ghost hosting-btn"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    View Hosting Plan
                  </Link>
                ) : (
                  <span className="hosting-tag">Quoted per project</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="prices-disclaimer">
          <p>
            All prices are estimates based on typical UK agency and freelance rates. Final costs depend on
            scope, complexity, and your specific requirements. Get in touch for a free, no-obligation quote.
          </p>
        </div>

        <div className="prices-cta">
          <h2>Not sure which tier fits?</h2>
          <p>Describe your project and I&apos;ll give you an honest recommendation and a detailed quote — no jargon, no hard sell.</p>
          <button onClick={scrollToContact} className="btn accent">
            Get a Free Quote
          </button>
        </div>
      </div>
    </div>
  )
}
