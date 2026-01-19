import sgMail from '@sendgrid/mail'

const sgApiKey = process.env.SENDGRID_API_KEY

if (sgApiKey) {
  sgMail.setApiKey(sgApiKey)
}

export default async (request) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers })
  }

  try {
    const bodyText = await request.text()
    const body = JSON.parse(bodyText)
    const { name, email, tel, subject, message } = body

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers }
      )
    }

    // Send email via SendGrid
    if (sgApiKey) {
      try {
        await sgMail.send({
          to: 'chris@hogben.solutions',
          from: 'chris@hogben.solutions',
          replyTo: email,
          subject: `New Contact Form Submission: ${subject || 'No subject'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${tel || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        })

        console.log('Email sent successfully to chris@hogben.solutions')
      } catch (emailError) {
        console.error('SendGrid email error:', emailError.message)
        console.error('SendGrid error status:', emailError.code || emailError.status)
        console.error('SendGrid full error:', JSON.stringify(emailError, null, 2))
        console.error('API Key first 10 chars:', sgApiKey?.substring(0, 10))
        
        // Extract more user-friendly error message
        let userMessage = emailError.message
        if (emailError.response?.body?.errors?.[0]?.message) {
          userMessage = emailError.response.body.errors[0].message
        }
        
        return new Response(
          JSON.stringify({ 
            error: `Email service error: ${userMessage}`,
            code: emailError.code || emailError.status
          }),
          { status: 500, headers }
        )
      }
    } else {
      console.error('SENDGRID_API_KEY is not configured')
      return new Response(
        JSON.stringify({ error: 'Email service is not configured' }),
        { status: 500, headers }
      )
    }

    console.log('Contact form submission:', { name, email, tel, subject, message })

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { status: 200, headers }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers }
    )
  }
}
