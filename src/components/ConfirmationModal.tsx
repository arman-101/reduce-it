"use client"

import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card p-8 rounded-lg shadow-2xl max-w-md text-center border border-border">
        <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-6 py-2 rounded-md bg-secondary text-secondary-foreground font-semibold">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-6 py-2 rounded-md bg-destructive text-destructive-foreground font-semibold">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
