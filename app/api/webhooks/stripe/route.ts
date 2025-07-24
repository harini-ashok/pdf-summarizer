import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'

// Test endpoint accessibility
export async function GET() {
  console.log('🔍 Webhook endpoint GET test')
  return NextResponse.json({ 
    status: 'Webhook endpoint is accessible',
    timestamp: new Date().toISOString()
  })
}

export async function POST(req: Request) {
  console.log('🔔 Webhook received!')
  
  const body = await req.text()
  const signature = (await headers()).get("Stripe-Signature") as string

  console.log('📝 Webhook details:', {
    hasBody: !!body,
    hasSignature: !!signature,
    webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET
  })

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log('✅ Webhook verified! Event type:', event.type)

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('💳 Processing checkout.session.completed')
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        console.log('✅ Checkout completed handled')
        break

      case 'customer.subscription.updated':
        console.log('🔄 Processing customer.subscription.updated')
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        console.log('✅ Subscription updated handled')
        break

      case 'customer.subscription.deleted':
        console.log('❌ Processing customer.subscription.deleted')
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        console.log('✅ Subscription deleted handled')
        break

      case 'invoice.payment_succeeded':
        console.log('💰 Processing invoice.payment_succeeded')
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        console.log('✅ Payment succeeded handled')
        break

      default:
        console.log('⚠️ Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true }, { status: 200 })

  } catch (err) {
    const error = err as Error
    console.error(`Stripe webhook error: ${error.message}`)
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('🔍 Checkout session details:', {
    id: session.id,
    hasSubscription: !!session.subscription,
    hasCustomer: !!session.customer
  })

  if (!session.subscription || !session.customer) {
    console.log('❌ Missing subscription or customer in session')
    return
  }

  console.log('📞 Retrieving subscription from Stripe...')
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  console.log('📋 Subscription data:', {
    id: subscription.id,
    status: subscription.status,
    customerId: subscription.customer
  })

  console.log('🔍 Looking for user with stripeCustomerId:', session.customer)
  
  try {
    const result = await prisma.user.update({
      where: { stripeCustomerId: session.customer as string },
      data: {
        subscription: {
          upsert: {
            create: mapSubscriptionData(subscription),
            update: mapSubscriptionData(subscription),
          },
        },
      },
    })
    console.log('✅ User updated successfully:', result.id)
  } catch (error) {
    console.error('❌ Database error:', error)
    throw error
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      interval: subscription.items.data[0].price.recurring?.interval || 'month',
      planId: subscription.items.data[0].price.id,
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.delete({
    where: { stripeSubscriptionId: subscription.id },
  })
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!invoice.subscription) return

  
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  )

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })
}

function mapSubscriptionData(subscription: Stripe.Subscription) {
  return {
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodStart: new Date(subscription.current_period_start * 1000),
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    interval: subscription.items.data[0].price.recurring?.interval || 'month',
    planId: subscription.items.data[0].price.id,
  }
}