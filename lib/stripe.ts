import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export const getStripeSession = async ({
    priceId,
    domainUrl,
    customerId,
} : {
    priceId: string;
    domainUrl: string;
    customerId: string;
}) => {
    console.log('🎯 getStripeSession received:', {
        priceId,
        domainUrl,
        customerId,
        successUrl: `${domainUrl}/payment/success`,
        cancelUrl: `${domainUrl}/payment/cancelled`
    })

    // Validate domainUrl
    if (!domainUrl || typeof domainUrl !== 'string' || !domainUrl.startsWith('http')) {
        console.error('❌ Invalid domainUrl:', domainUrl)
        throw new Error(`Invalid domainUrl: ${domainUrl}`)
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        customer_update: { name:"auto", address: "auto"},
        success_url: `${domainUrl}/payment/success`,
        cancel_url: `${domainUrl}/payment/cancelled`
    })

    console.log('✅ Stripe session created:', session.id)
    return session.url as string
}