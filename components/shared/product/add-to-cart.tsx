"use client"

import type { CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { toast } from 'sonner';
import { addItemToCart } from "@/lib/actions/cart.actions"


const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter()
  const handleAddToCart = async () => {
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
  }
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}> <Plus />Add To Cart</Button>
  )
}

export default AddToCart