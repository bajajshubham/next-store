'use client';

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, ControllerFieldState, ControllerRenderProps, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import slugify from 'slugify'
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { UploadButton } from "@/lib/uploadthing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image"

const ProductForm = ({ type, product, productId }: { type: 'Create' | 'Update', product?: Product, productId?: string }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(type === "Update" ? updateProductSchema : insertProductSchema) as Resolver<z.infer<typeof insertProductSchema>>,
    defaultValues: product && type === 'Update' ? product : productDefaultValues,
  });

  // Handle form submit
  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values
  ) => {
    if (type === 'Create') {
      const res = await createProduct(values);

      if (!res.success) {
        toast.error(res.message, {
          className: "text-destructive"
        })
      } else {
        toast.success(res.message, {
          className: "hover:!bg-secondary",
        });
        router.push(`/admin/products`);
      }
    }
    if (type === 'Update') {
      if (!productId) {
        router.push(`/admin/products`);
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.error(res.message, {
          className: "text-destructive"
        })
      } else {
        toast.success(res.message, {
          className: "hover:!bg-secondary",
        });
        router.push(`/admin/products`);
      }
    }
  };

  const images = form.watch('images');

  return (
    <Form {...form}>
      <form className='space-y-8' method='post' onSubmit={form.handleSubmit(onSubmit)}>
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
          <Controller
            name="images"
            control={form.control}
            render={() => (
              <Field>
                <FieldLabel htmlFor="images">Images</FieldLabel>
                <Card>
                  <CardContent className='space-y-2 mt-2 min-h-48'>
                    <div className='flex-start space-x-2'>
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt='product image'
                          className='w-20 h-20 object-cover object-center rounded-sm'
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                        className=""
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue('images', [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`, {
                              className: '!text-destructive',
                            });
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                
              </Field>
            )}
          />
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
                  className="resize-none h-40"
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