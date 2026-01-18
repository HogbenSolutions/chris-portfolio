import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async (request) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  try {
    // In Netlify Functions v2, the event is a Request object
    const bodyText = await request.text()
    
    if (!bodyText) {
      return new Response(JSON.stringify({ error: 'Empty body' }), {
        status: 400,
        headers,
      })
    }
    
    let body
    try {
      body = JSON.parse(bodyText)
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON', length: bodyText.length }), {
        status: 400,
        headers,
      })
    }
    
    const { priceId, successUrl, cancelUrl } = body

    if (!priceId || !successUrl || !cancelUrl) {
      return new Response(JSON.stringify({ error: 'Missing required parameters', body }), {
        status: 400,
        headers,
      })
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
      return_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
    })

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers,
    })
  }
}
