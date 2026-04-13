'use client';

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, ControllerFieldState, ControllerRenderProps, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import slugify from 'slugify'
import { Textarea } from "@/components/ui/textarea";

const ProductForm = ({ type, product, productId }: { type: 'Create' | 'Update', product?: Product, productId?: string }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(type === "Update" ? updateProductSchema : insertProductSchema) as Resolver<z.infer<typeof insertProductSchema>>,
    defaultValues: product && type === 'Update' ? product : productDefaultValues,
  });

  return (
    <Form {...form}>
      <form className='space-y-8'>
        <div className='flex flex-col gap-5 md:flex-row'>
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the product name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Slug */}
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <div className=" flex relative">
                  <Input
                    {...field}
                    id="slug"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the product slug or gnerate from name"
                    autoComplete="off"
                  />
                  <Button type="button"
                    className='bg-gray-500 text-white px-4 py-1 ml-2 hover:bg-gray-600'
                    onClick={() => {
                      form.setValue('slug', slugify(form.getValues('name'), { lower: true }));
                    }}>
                    Generate slug
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          {/* Category */}
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'category'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Input
                  {...field}
                  id="category"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the product category"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Brand */}
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'brand'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="brand">Brand</FieldLabel>
                <Input
                  {...field}
                  id="brand"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the product brand"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          {/* Price */}
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'price'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  {...field}
                  id="price"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the product price"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Stock  */}
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'stock'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                <Input
                  {...field}
                  id="stock"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the product stock"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className='upload-field flex flex-col gap-5 md:flex-row'>
          {/* Images */}
        </div>
        <div className='upload-field'>{/* Is Featured */}</div>
        <div>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'description'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the product description"
                  autoComplete="off"
                  className="resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div>
          <Button type="submit" size='lg' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting..' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  )
};

export default ProductForm;