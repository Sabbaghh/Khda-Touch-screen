'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: string;
  author: string;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  quote,
  author,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You selected the following quote:
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 p-4 bg-muted rounded-lg">
          <p className="text-sm mb-2 italic">&quot;{quote}&quot;</p>
          <p className="text-xs text-muted-foreground text-right">— {author}</p>
        </div>
        <DialogFooter className="flex gap-5 ">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
