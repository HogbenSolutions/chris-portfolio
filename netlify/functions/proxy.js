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
    const body = await response.text();

    // Remove or modify X-Frame-Options header
    const headers = {
      'Content-Type': response.headers.get('content-type'),
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
