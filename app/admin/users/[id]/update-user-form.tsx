'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
      <form className='space-y-4'>form</form>
    </Form>
  );
};

export default updateUserForm;