'use client';

import { useState, useTransition } from 'react';
import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '../ui/alert-dialog'
import { Button } from '../ui/button';
import { toast } from 'sonner';

export default function DeleteDialog({ id, action, }: {
  id: string, action: (id: string) => Promise<{ success: boolean; message: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteClick = () => {
    startTransition(async () => {
      const res = await action(id);
      if (!res.success) {
        toast.error(res.message, {
          className: "!text-destructive"
        })
      } else {
        setOpen(false);
        toast.success(res.message, {
          className: "hover:!bg-secondary",
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='outline' className='text-red-600'>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='my-auto'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant='destructive' disabled={isPending} onClick={handleDeleteClick}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );;
}