'use client';

import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: React.ReactNode;
    actionLabel?: string;
    cancelLabel?: string;
}

export function DeleteConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    actionLabel = "Delete",
    cancelLabel = "Cancel"
}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-md bg-[#1a1a18] border-[#3a3a38] text-[#faf9f5] p-0 overflow-hidden shadow-2xl"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader className="px-5 pt-5 pb-2 text-left">
                    <DialogTitle className="text-lg font-semibold tracking-tight">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="px-5 pt-1 pb-4 space-y-3">
                    <div className="text-[13px] text-[#faf9f5] leading-relaxed">
                        {description}
                    </div>
                </div>

                <div className="flex justify-end gap-3 px-5 py-4 bg-[#1a1a18]">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="h-8 px-4 text-sm font-medium border border-[#3a3a38] hover:bg-white/[0.05] text-[#faf9f5]"
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        className="h-8 px-3 bg-[#d97371] hover:bg-[#d97371]/90 text-white text-sm font-medium shadow-sm transition-colors"
                    >
                        {actionLabel}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
