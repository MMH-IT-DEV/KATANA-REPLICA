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
    description: string;
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
                className="max-w-[320px] bg-[#1a1a18] border-[#3a3a38] rounded-xl p-4 gap-4 shadow-2xl"
                showCloseButton={false}
            >
                <DialogHeader className="gap-1 text-left">
                    <DialogTitle className="text-base font-semibold text-[#faf9f5] tracking-tight">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-[13px] text-[#7a7974] leading-normal font-normal">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end mt-1">
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="h-8 px-4 bg-[#1a1a18] border border-[#3a3a38] text-[#faf9f5] hover:bg-[#222221] hover:text-[#faf9f5] rounded-md text-xs font-medium transition-colors"
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        className="h-8 px-4 bg-[#ff7b6f] text-white hover:bg-[#ff7b6f]/90 rounded-md text-xs font-medium transition-colors border-0"
                    >
                        {actionLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
