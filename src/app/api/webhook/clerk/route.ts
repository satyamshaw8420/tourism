import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

type WebhookEvent = {
  data: {
    id: string
    email_addresses: Array<{
      email_address: string
      id: string
    }>
    first_name: string
    last_name: string
    image_url: string
    phone_numbers?: Array<{
      phone_number: string
    }>
  }
  object: 'event'
  type: 'user.created' | 'user.updated' | 'user.deleted'
}

export async function POST(req: NextRequest) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  // Handle the webhook
  const { type, data } = evt
  const userId = data.id
  const email = data.email_addresses[0]?.email_address
  const firstName = data.first_name
  const lastName = data.last_name
  const imageUrl = data.image_url
  const phone = data.phone_numbers?.[0]?.phone_number

  try {
    switch (type) {
      case 'user.created':
        await prisma.user.create({
          data: {
            id: userId,
            email,
            name: `${firstName} ${lastName}`.trim(),
            avatar: imageUrl,
            phone: phone || undefined,
            password: '', // Not needed with Clerk
            kycStatus: 'PENDING',
          },
        })
        console.log(`User ${userId} created successfully`)
        break

      case 'user.updated':
        await prisma.user.update({
          where: { id: userId },
          data: {
            email,
            name: `${firstName} ${lastName}`.trim(),
            avatar: imageUrl,
            phone: phone || undefined,
          },
        })
        console.log(`User ${userId} updated successfully`)
        break

      case 'user.deleted':
        await prisma.user.delete({
          where: { id: userId },
        })
        console.log(`User ${userId} deleted successfully`)
        break

      default:
        console.log(`Unknown webhook type: ${type}`)
    }

    return NextResponse.json({ message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}