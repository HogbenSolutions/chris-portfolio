export const handler = async (event) => {
  const { url } = event.queryStringParameters || {};

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
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Domain not allowed' }),
      };
    }

    const response = await fetch(url);
    let body = await response.text();

    // Rewrite relative URLs to absolute URLs
    const urlObj = new URL(url);
    const baseUrl = urlObj.origin;
    
    // Replace relative src and href attributes with absolute URLs
    body = body.replace(/src="(?!(?:https?:|\/|data:))/g, `src="${baseUrl}/`);
    body = body.replace(/href="(?!(?:https?:|\/|#|data:))/g, `href="${baseUrl}/`);

    // Remove or modify X-Frame-Options header
    const headers = {
      'Content-Type': response.headers.get('content-type') || 'text/html',
      'X-Frame-Options': 'ALLOWALL',
    };

    return {
      statusCode: 200,
      headers,
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch URL' }),
    };
  }
};
