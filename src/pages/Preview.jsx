import { useParams, useNavigate } from 'react-router-dom'
import '../styles/Preview.css'

export default function Preview() {
  const { clientName } = useParams()
  const navigate = useNavigate()

  // Mapping of client names to their URLs
  const clientMap = {
    'r-e-solutions': 'https://r-e-solutions.netlify.app',
    // Add more clients like this:
    // 'client-name': 'https://client-url.netlify.app',
  }

  const clientUrl = clientMap[clientName]

  if (!clientUrl) {
    return (
      <div className="preview-container">
        <div className="preview-header">
          <button 
            className="preview-back-btn"
            onClick={() => navigate('/')}
          >
            ← Back
          </button>
          <h1>Client Not Found</h1>
        </div>
        <div className="preview-content">
          <p>The requested client preview is not available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <button 
          className="preview-back-btn"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>
        <div className="preview-info">
          <h1>{clientName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Preview</h1>
        </div>
      </div>
      
      <div className="preview-content">
        <p>Open in new window to view:</p>
        <a 
          href={clientUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="preview-link"
        >
          {clientUrl}
        </a>
        <p className="preview-note">The site is being accessed directly for best compatibility.</p>
      </div>
    </div>
  )
}
