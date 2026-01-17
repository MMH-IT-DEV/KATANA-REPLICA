'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createStockAdjustment } from '@/lib/katana-actions';

function NewAdjustmentContent() {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isCreating) return;

        async function create() {
            setIsCreating(true);
            setError(null);

            try {
                console.log('[Stock Adjustments] Creating new adjustment...');
                const id = await createStockAdjustment();

                if (id) {
                    console.log('[Stock Adjustments] Adjustment created with ID:', id);
                    // Redirect to the new adjustment page (placeholder)
                    router.replace(`/stock/adjustments/${id}`);
                } else {
                    setError('Failed to create stock adjustment - no ID returned');
                    setIsCreating(false);
                }
            } catch (err) {
                console.error('[Stock Adjustments] Error creating adjustment:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setIsCreating(false);
            }
        }

        create();
    }, [router]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background">
                <div className="text-red-500 mb-4 bg-red-500/10 px-4 py-2 rounded border border-red-500/20">
                    Error: {error}
                </div>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-secondary text-foreground rounded hover:bg-secondary/80 transition-colors"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground text-sm font-medium">Creating new stock adjustment...</p>
            </div>
        </div>
    );
}

export default function NewAdjustmentPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-background">Loading...</div>}>
            <NewAdjustmentContent />
        </Suspense>
    );
}
