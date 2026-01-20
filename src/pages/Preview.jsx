import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/Preview.css'

export default function Preview() {
  const { clientName } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const [deviceView, setDeviceView] = useState('desktop')

  const deviceSizes = {
    mobile: { width: '375px', height: '667px', name: 'Mobile' },
    tablet: { width: '768px', height: '1024px', name: 'Tablet' },
    desktop: { width: '100%', height: '100%', name: 'Desktop' },
  }

  // Mapping of client names to their URLs
  // Easy to add more clients here
  const clientMap = {
    'r-e-solutions': 'https://r-e-solutions.netlify.app',
    // Add more clients like this:
    // 'client-name': 'https://client-url.netlify.app',
  }

  const clientUrl = clientMap[clientName]
  const proxyUrl = clientUrl ? `/.netlify/functions/proxy?url=${encodeURIComponent(clientUrl)}` : null

  useEffect(() => {
    if (!clientUrl) {
      // Redirect to home if client not found
      navigate('/')
    }
  }, [clientName, clientUrl, navigate])

  if (!clientUrl) {
    return null
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <div className="preview-info">
          <h1>{clientName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Preview</h1>
        </div>
      </div>
      
      <div className="preview-iframe-wrapper">
        {isLoading && (
          <div className="preview-loading">
            <div className="spinner"></div>
            <p>Loading preview...</p>
          </div>
        )}
        <div 
          className={`preview-device-frame preview-device-${deviceView}`}
          style={{
            width: deviceSizes[deviceView].width,
            height: deviceSizes[deviceView].height,
          }}
        >
          <iframe
            key={iframeKey}
            src={proxyUrl}
            title={`Preview of ${clientName}`}
            className="preview-iframe"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      </div>

      <div className="preview-footer">
        <div className="preview-device-buttons">
          <button
            className={`preview-device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceView('mobile')}
            title="Mobile view"
            aria-label="Mobile view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12" y2="18.01"/>
            </svg>
          </button>
          <button
            className={`preview-device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
            onClick={() => setDeviceView('tablet')}
            title="Tablet view"
            aria-label="Tablet view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12" y2="18.01"/>
            </svg>
          </button>
          <button
            className={`preview-device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
            onClick={() => setDeviceView('desktop')}
            title="Desktop view"
            aria-label="Desktop view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </button>
        </div>
        <button 
          className="preview-reload-btn"
          onClick={() => {
            setIsLoading(true)
            setIframeKey(prev => prev + 1)
          }}
          title="Reload preview"
          aria-label="Reload preview"
        >
          Reload Preview
        </button>
      </div>
    </div>
  )
}
