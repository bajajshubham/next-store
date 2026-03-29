'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'
import { Order } from '@/types'
import Link from 'next/link'
import Image from "next/image"

const OrderDetailsTable = ({ order }: { order: Order }) => {
  const {
    shippingAddress,
    shippingPrice,
    orderItems,
    itemsPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered, isPaid, id, paidAt, deliveredAt
  } = order
  return (
    <>
      <h1 className="py-4 text-2xl">Order {formatId(id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-4 overflow-x-auto">
          <Card>
            <CardContent className='px-4 gap-4'>
              <h2 className="text-xl pb-4 font-bold">Payment Method</h2>
              <p className='pb-1'>{paymentMethod}</p>
              {isPaid ? (<Badge variant='secondary'>Paid at {formatDateTime(paidAt!).dateTime}</Badge>) : (<Badge variant='destructive'>Not paid</Badge>)}
            </CardContent>
          </Card>
          <Card>
            <CardContent className='px-4 gap-4'>
              <h2 className="text-xl pb-4 font-bold">Shipping Address</h2>
              <p className='pb-1'>{shippingAddress.fullName}</p>
              <p className='pb-1'>{shippingAddress.streetAddress},</p>
              <p className='pb-1'>{shippingAddress.postalCode} {shippingAddress.city},</p>
              <p className='pb-1'>{shippingAddress.country}</p>
              {isDelivered ? (<Badge variant='secondary'>Delivered at {formatDateTime(paidAt!).dateTime}</Badge>) : (<Badge variant='destructive'>Not yet delivered</Badge>)}
            </CardContent>
          </Card>
          <Card>
            <CardContent className='px-4 gap-4'>
              <h2 className="text-xl pb-4 font-bold">Ordered Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link href={`/product/${item.slug}`} className="flex items-center">
                          <Image src={item.image} alt={item.name} width={50} height={50} />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="px-2">€{item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="px-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className="flex justify-between font-bold">
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default OrderDetailsTable