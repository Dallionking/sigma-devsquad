
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SlidePresentation } from './SlidePresentation';

interface SlidePresentationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presentation: {
    id: string;
    title: string;
  } | null;
}

export const SlidePresentationModal = ({
  open,
  onOpenChange,
  presentation
}: SlidePresentationModalProps) => {
  if (!presentation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {presentation.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Slide presentation view
          </DialogDescription>
        </DialogHeader>
        
        <SlidePresentation 
          presentationId={presentation.id}
          onShare={() => {
            // Handle sharing logic
            console.log('Sharing presentation:', presentation.id);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
