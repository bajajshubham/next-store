'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { USER_ROLES } from '@/lib/constants';
import { updateUserSchema } from '@/lib/validators';
import { ControllerRenderProps, Controller, ControllerFieldState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

const updateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  return (
    <Form {...form}>
      <form className='space-y-4'>
        <div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'email'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter user email"
                  autoComplete="off"
                  disabled
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'name'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the user name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div>
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }: { field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'role'>, fieldState: ControllerFieldState }) => (
              <Field data-invalid={fieldState.invalid} className='items-center'>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Select name={field.name} value={field.value.toString()} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="role"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        <span className="capitalize">
                          {role}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className='flex-between'>
          <Button
            type='submit'
            className='w-full'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Submitting...' : `Update User `}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default updateUserForm;