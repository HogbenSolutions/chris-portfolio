import './Projects.css'

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce application with product catalog, shopping cart, secure checkout, and admin dashboard for inventory management.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT Auth'],
      features: ['User Authentication', 'Product Search', 'Real-time Cart', 'Order History', 'Admin Panel'],
    },
    {
      id: 2,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics platform with interactive charts, data visualization, and role-based access control for team collaboration.',
      tech: ['React', 'Express', 'MongoDB', 'Chart.js', 'WebSockets'],
      features: ['Live Data', 'Custom Reports', 'User Roles', 'Data Export', 'Notifications'],
    },
    {
      id: 3,
      title: 'Content Management System',
      description: 'Headless CMS with rich content editor, media management, and REST API for publishing across multiple platforms.',
      tech: ['React', 'Node.js', 'MongoDB', 'Multer', 'REST API'],
      features: ['WYSIWYG Editor', 'Media Library', 'Content Versioning', 'API Keys', 'Webhooks'],
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'Collaborative task management system with real-time updates, team workspaces, and project tracking capabilities.',
      tech: ['React', 'Express', 'MongoDB', 'Socket.io', 'Redux'],
      features: ['Team Collaboration', 'Real-time Updates', 'Custom Workflows', 'File Attachments', 'Comments'],
    },
    {
      id: 5,
      title: 'Booking & Scheduling',
      description: 'Appointment booking system with calendar integration, automated reminders, and payment processing for service businesses.',
      tech: ['React', 'Node.js', 'MongoDB', 'Nodemailer', 'Google Calendar'],
      features: ['Calendar View', 'Auto Reminders', 'Payment Integration', 'Client Portal', 'Availability Management'],
    },
    {
      id: 6,
      title: 'Social Network Platform',
      description: 'Social platform with user profiles, real-time messaging, activity feeds, and community engagement tools.',
      tech: ['React', 'Express', 'MongoDB', 'Socket.io', 'Cloudinary'],
      features: ['User Profiles', 'Real-time Chat', 'Activity Feed', 'File Uploads', 'Friend System'],
    },
  ]

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-head">
          <h2>Featured MERN Projects</h2>
          <p className="sub">Production-ready applications showcasing full-stack capabilities</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card reveal">
              <div className="card-header">
                <h3>{project.title}</h3>
                <span className="badge-mern">MERN</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-section">
                <p className="section-title">Stack</p>
                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-section">
                <p className="section-title">Features</p>
                <ul className="features-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
