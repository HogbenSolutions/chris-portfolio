export const handler = async (event) => {
  const { url } = event.queryStringParameters || {};

  console.log('Proxy handler called with URL:', url);

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL parameter required' }),
    };
  }

  try {
    // Validate that URL is allowed (optional - add your domain whitelist)
    const allowedDomains = ['r-e-solutions.netlify.app'];
    const urlObj = new URL(url);
    
    if (!allowedDomains.includes(urlObj.hostname)) {
      console.error('Domain not allowed:', urlObj.hostname);
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Domain not allowed' }),
      };
    }

    console.log('Fetching URL:', url);
    const response = await fetch(url);
    console.log('Fetch response status:', response.status);
    
    let body = await response.text();
    console.log('Fetched body length:', body.length);

    // Only rewrite URLs if it's HTML content
    const contentType = response.headers.get('content-type') || '';
    console.log('Content-Type:', contentType);
    
    if (contentType.includes('text/html')) {
      try {
        const baseUrl = urlObj.origin;
        console.log('Rewriting URLs with base:', baseUrl);
        
        let rewritten = body;
        
        // More comprehensive regex patterns that handle edge cases
        // 1. src="/" -> src="https://.../"
        const srcMatches = rewritten.match(/src=["']\/[^"']*/g) || [];
        console.log('Found src=/ patterns:', srcMatches.slice(0, 3));
        rewritten = rewritten.replace(/src=["']\/(?!\/)/g, `src="${baseUrl}/`);
        
        // 2. href="/" -> href="https://.../" (but not href="#")
        const hrefMatches = rewritten.match(/href=["']\/[^"']*/g) || [];
        console.log('Found href=/ patterns:', hrefMatches.slice(0, 3));
        rewritten = rewritten.replace(/href=["']\/(?!\/|#)/g, `href="${baseUrl}/`);
        
        // 3. srcset="/" 
        rewritten = rewritten.replace(/srcset=["']\/(?!\/)/g, `srcset="${baseUrl}/`);
        
        // 4. Handle relative URLs (no protocol, no /)
        rewritten = rewritten.replace(/src=["'](?!(?:https?:|\/\/|\/|data:|blob:))/g, `src="${baseUrl}/`);
        rewritten = rewritten.replace(/href=["'](?!(?:https?:|\/\/|\/|#|data:|blob:))/g, `href="${baseUrl}/`);
        rewritten = rewritten.replace(/srcset=["'](?!(?:https?:|\/\/|\/|data:))/g, `srcset="${baseUrl}/`);
        
        const srcAfterMatches = rewritten.match(/src=["']\/[^"']*/g) || [];
        const hrefAfterMatches = rewritten.match(/href=["']\/[^"']*/g) || [];
        
        console.log('Remaining src=/ patterns:', srcAfterMatches.length);
        console.log('Remaining href=/ patterns:', hrefAfterMatches.length);
        
        body = rewritten;
      } catch (rewriteError) {
        console.error('Error rewriting URLs:', rewriteError);
      }
    }

    // Remove or modify X-Frame-Options header
    const headers = {
      'Content-Type': contentType || 'text/html',
      'X-Frame-Options': 'ALLOWALL',
    };

    console.log('Returning response with status 200');
    return {
      statusCode: 200,
      headers,
      body,
    };
  } catch (error) {
    console.error('Proxy error:', error.message, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch URL', details: error.message }),
    };
  }
};
