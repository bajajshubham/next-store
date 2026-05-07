import { z } from "zod"
import {
  insertReviewSchema,
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  insertOrderItemsSchema,
  insertOrderSchema,
  paymentResultSchema
} from "@/lib/validators"

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
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string,
  createdAt: Date,
  isPaid: Boolean,
  paidAt: Date | null,
  isDelivered: Boolean,
  deliveredAt: Date | null,
  orderItems: OrderItem[],
  user: {
    name: string,
    email: string
  }
}

export type PaymentResult = z.infer<typeof paymentResultSchema>

export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};