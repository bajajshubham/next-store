'use client'

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"
import { paymentMethodSchema } from "@/lib/validators"
import { Controller, ControllerFieldState, ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants"
import { Form } from "@/components/ui/form"
import { Field, FieldContent, FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { updateUserPaymentMethod } from "@/lib/actions/user.actions"


const PaymentMethodForm = ({ preferredPaymentMethod }: { preferredPaymentMethod: string | null }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD
    }
  })
  const [isPending, startTransition] = useTransition()

  const onSubmit: SubmitHandler<z.infer<typeof paymentMethodSchema>> = async (values: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values)
      if (!res.success) {
        toast.error(`${res.message}`, {
          className: "!text-destructive",
        })
        return
      }

      router.push('/place-order')
    })
  }

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Payment Method</h1>
        <p className="text-sm text-muted-foreground"> Please select the payment method</p>
        <Form {...form}>
          <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-5">
              <Controller
                control={form.control}
                name="type"
                render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof paymentMethodSchema>, 'type'>, fieldState: ControllerFieldState }) => (
                  <FieldSet>
                    <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-0">
                      {PAYMENT_METHODS.map((paymentMethod) => (
                        <FieldLabel className="flex items-center space-y-0 space-x-3" key={paymentMethod} htmlFor={`form-rhf-radiogroup-${paymentMethod}`}>
                          <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                            <RadioGroupItem
                              value={paymentMethod}
                              checked={field.value === paymentMethod}
                              id={`form-rhf-radiogroup-${paymentMethod}`}
                              aria-invalid={fieldState.invalid}
                            />
                            <FieldContent>{paymentMethod}</FieldContent>
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </FieldSet>
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

export default PaymentMethodForm