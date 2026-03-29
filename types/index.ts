import { z } from "zod"
import { insertProductSchema, insertCartSchema, cartItemSchema, shippingAddressSchema, insertOrderItemsSchema, insertOrderSchema } from "@/lib/validators"

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
}

export type Cart = z.infer<typeof insertCartSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type ShippingAddress = z.infer<typeof shippingAddressSchema>
export type OrderItem = z.infer<typeof insertOrderItemsSchema>
export type Order = z.infer<typeof insertOrderSchema & {
  id: string,
  createdAt: Date,
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  orderItems: OrderItem[],
  user: {
    name: string,
    email: string
  }
}>