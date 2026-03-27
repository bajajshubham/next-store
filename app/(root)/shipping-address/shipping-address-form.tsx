'use client'
import type { ShippingAddress } from "@/types"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"
import { shippingAddressSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, ControllerFieldState, ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { Form } from "@/components/ui/form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader } from "lucide-react"

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: any) => {
    console.log(values)
  }


  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Shipping Address</h1>
        <p className="text-sm text-muted-foreground"> Please enter the address to ship the order to</p>
        <Form {...form}>
          <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-5">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName'>, fieldState: ControllerFieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="full-name">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="full-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Firstname and Lastname"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <Controller
                name="streetAddress"
                control={form.control}
                render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'streetAddress'>, fieldState: ControllerFieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="street">
                      Street Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="street"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Street name and number"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <Controller
                name="postalCode"
                control={form.control}
                render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'postalCode'>, fieldState: ControllerFieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="postal">
                      Postal code
                    </FieldLabel>
                    <Input
                      {...field}
                      id="postal"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Postal or Area code"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'city'>, fieldState: ControllerFieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="city">
                      City
                    </FieldLabel>
                    <Input
                      {...field}
                      id="city"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter City"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <Controller
                name="country"
                control={form.control}
                render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'country'>, fieldState: ControllerFieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="country">
                      Country
                    </FieldLabel>
                    <Input
                      {...field}
                      id="country"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Country"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (<Loader className="w-4 h-4 animate-spin" />) : (<ArrowRight className="w-4 h-4" />)}{' '}Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default ShippingAddressForm