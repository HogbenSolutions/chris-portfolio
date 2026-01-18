import './Skills.css'

export default function Skills() {
  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 95 },
        { name: 'JavaScript/ES6+', level: 92 },
        { name: 'CSS/Tailwind', level: 90 },
        { name: 'State Management', level: 88 },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js/Express', level: 94 },
        { name: 'RESTful APIs', level: 92 },
        { name: 'Authentication/JWT', level: 90 },
        { name: 'Middleware', level: 88 },
      ],
    },
    {
      category: 'Database',
      items: [
        { name: 'MongoDB', level: 93 },
        { name: 'Mongoose ODM', level: 92 },
        { name: 'Data Modeling', level: 90 },
        { name: 'Query Optimization', level: 87 },
      ],
    },
    {
      category: 'DevOps & Tools',
      items: [
        { name: 'Git/GitHub', level: 94 },
        { name: 'npm/yarn', level: 91 },
        { name: 'Deployment', level: 85 },
        { name: 'Debugging', level: 90 },
      ],
    },
  ]

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-head">
          <h2>Skills & Expertise</h2>
          <p className="sub">Complete MERN stack proficiency with modern development practices</p>
        </div>

        <div className="skills-grid">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="skill-group reveal">
              <h3 className="group-title">{skillGroup.category}</h3>

              <div className="skill-items">
                {skillGroup.items.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-highlight">
          <div className="highlight-card reveal">
            <h3>Full-Stack Development</h3>
            <p>
              From conceptualizing architecture to deploying production applications, I handle every layer of the MERN stack. I write clean, maintainable code with best practices for scalability and performance.
            </p>
          </div>

          <div className="highlight-card reveal">
            <h3>Real-Time Applications</h3>
            <p>
              Building applications with WebSockets, real-time data synchronization, and live collaboration features. Experience with Socket.io and event-driven architecture.
            </p>
          </div>

          <div className="highlight-card reveal">
            <h3>Secure & Scalable</h3>
            <p>
              Implementing JWT authentication, role-based access control, secure API design, and database optimization. Building systems designed to grow with your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
