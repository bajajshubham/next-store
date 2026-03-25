"use client"

import type { Cart, CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus, Minus, Loader } from "lucide-react"
import { toast } from 'sonner';
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { useTransition } from "react"


const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item)

      if (!res.success) {
        toast.error(`${res.message}`, {
          className: "!text-destructive",
        })
        return
      }

      toast.success(`${res.message}`, {
        className: "hover:!bg-secondary",
        action: {
          label: 'Go to cart',
          onClick: () => router.push("/cart"),
        },
      })
    })
  }

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(`${res.message}`, {
          className: "!text-destructive",
        })
        return
      }

      toast.success(`${res.message}`, {
        className: "hover:!bg-secondary",
      })
    })
  }

  // Check if item is in the cart
  const existItem = cart && cart.items.find((x) => x.productId === item.productId)


  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>{isPending ? (<Loader className="w-4 h-4 animate-spin" />) : (<Minus className="h-4 w-4" />)}</Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>{isPending ? (<Loader className="w-4 h-4 animate-spin" />) : (<Plus className="h-4 w-4" />)}</Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}> {isPending ? (<Loader className="w-4 h-4 animate-spin" />) : (<Plus />)}Add To Cart</Button >
  )
}

export default AddToCart