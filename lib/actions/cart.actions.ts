"use server"

import type { CartItem } from "@/types"
import { cookies } from "next/headers"
import { convertToPlainObject, formatError } from "../utils"
import { auth } from "@/auth"
import { prisma } from "@/db/prisma"
import { cartItemSchema } from "../validators"

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value

    if (!sessionCartId) throw new Error('Cart session not found')

    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined

    const cart = await getMyCart()

    const item = cartItemSchema.parse(data)

    const product = await prisma.product.findFirst({
      where: { id: item.productId }
    })

    console.log({ 'CART SESSION': sessionCartId, 'USER ID': userId, 'ITEM REQUESTED': item, 'PRODUCT FOUND': product })

    return {
      success: true,
      message: "Item added to the cart"
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    }
  }
}

export async function getMyCart() {

  const sessionCartId = (await cookies()).get('sessionCartId')?.value

  if (!sessionCartId) throw new Error('Cart session not found')

  const session = await auth()
  const userId = session?.user?.id ? (session.user.id as string) : undefined

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
  })

  if (!cart) return undefined

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  })
}