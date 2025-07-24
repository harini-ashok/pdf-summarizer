'use server'

import { auth, currentUser } from "@clerk/nextjs/server"
import { getStripeSession, stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export async function createSubscription() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return redirect('/sign-in?redirect_url=/dashboard')
  }

  let databaseUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true }
  })

  if (!databaseUser) {
    throw new Error('DatabaseUser Not Found')
  }

  const email = user?.primaryEmailAddress?.emailAddress
  
  if (!databaseUser.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: email
    })

    databaseUser = await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
      select: { stripeCustomerId: true }
    })
  }

  if (!databaseUser.stripeCustomerId) {
    throw new Error('Failed to set stripeCustomerId for the user')
  }

  // Debug environment variables
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    PRODUCTION_URL: process.env.PRODUCTION_URL
  })

  const domainUrl = process.env.NODE_ENV === 'production' 
    ? (process.env.PRODUCTION_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'https://pdf-summarizer-plxi6ct9q-harini-ashoks-projects.vercel.app')
    : 'http://localhost:3000'

  console.log('Using domain URL:', domainUrl)

  const subscriptionUrl = await getStripeSession({
    customerId: databaseUser.stripeCustomerId,
    domainUrl,
    priceId: process.env.STRIPE_YEARLY_PRICE_ID as string
  })

  console.log('🚀 Redirecting to Stripe URL:', subscriptionUrl)
  
  // Validate the session URL before redirecting
  if (!subscriptionUrl || !subscriptionUrl.startsWith('https://checkout.stripe.com')) {
    console.error('❌ Invalid Stripe session URL:', subscriptionUrl)
    throw new Error(`Invalid Stripe session URL: ${subscriptionUrl}`)
  }

  return redirect(subscriptionUrl)
}