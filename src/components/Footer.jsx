import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Christopher Hogben</h4>
            <p>Full-stack MERN developer building modern web applications</p>
          </div>

          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:hello@hogben.solutions">Email</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Christopher Hogben. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
