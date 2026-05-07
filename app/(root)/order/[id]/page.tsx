import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getOrderById } from '@/lib/actions/order.actions'
import type { ShippingAddress } from '@/types'
import OrderDetailsTable from './order-details-table'
import { auth } from '@/auth'
import Stripe from 'stripe'

export const metada: Metadata = {
  title: "Order Details"
}

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params
  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth();

  let client_secret = null

  if (order.paymentMethod === 'Stripe' && !order.isPaid) {
    // Initialize Stripe instance
    const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create a new payment intent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: 'EUR',
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }

  return (
    <OrderDetailsTable
      order={{ ...order, shippingAddress: order.shippingAddress as ShippingAddress }}
      stripeClientSecret={client_secret}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      isAdmin={session?.user.role === 'admin' || false}
    />
  )
}

export default OrderDetailsPage