import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not defined!')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handler = async (request) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  try {
    // Handle different request formats
    let body = {}
    
    // Local dev passes body as object directly
    if (request.body && typeof request.body === 'object') {
      body = request.body
    } else if (request.body && typeof request.body === 'string') {
      try {
        body = JSON.parse(request.body)
      } catch (e) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid JSON' }),
        }
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Empty body' }),
      }
    }
    
    const { priceId, email, domainName, successUrl, cancelUrl } = body

    if (!priceId || !email || !domainName || !successUrl || !cancelUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters' }),
      }
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: email,
      metadata: {
        email: email,
        domain_name: domainName,
      },
      return_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ clientSecret: session.client_secret }),
    }
  } catch (error) {
    console.error('Stripe error:', error.message)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
