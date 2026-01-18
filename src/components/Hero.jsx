import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="kicker">
            <span className="dot"></span>
            <span className="chip">MERN Stack Developer</span>
          </div>

          <h1 className="hero-title">
            Full-stack web applications
            <span className="gradient"> that scale</span>
          </h1>

          <p className="hero-lead">
            I build production-ready web applications using MongoDB, Express, React, and Node.js. From concept to deployment, I handle the entire stack to create reliable, performant solutions for startups and businesses.
          </p>

          <div className="hero-cta">
            <a href="#contact" className="btn accent">
              Start a Project
            </a>
            <a href="#projects" className="btn ghost">
              See My Work
            </a>
          </div>

          <div className="hero-tech">
            <p className="tech-label">Core Stack</p>
            <div className="tech-badges">
              <span className="badge">MongoDB</span>
              <span className="badge">Express</span>
              <span className="badge">React</span>
              <span className="badge">Node.js</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-block">
            <div className="code-header">
              <span>mern-app/</span>
            </div>
            <pre><code>{`const buildApp = () => {
  const backend = express()
    .use(mongooseDB)
    .use(authentication)
  
  const frontend = &lt;App /&gt;
    .render(backend.api)
  
  return deploy(frontend)
}`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  )
}
