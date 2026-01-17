'use client';

import { useParams } from 'next/navigation';
import { PurchaseOrderDetail } from '@/components/buy/PurchaseOrderDetail';

export default function PurchaseOrderPage() {
    const params = useParams();
    const id = params.id as string;

    return <PurchaseOrderDetail id={id} />;
}
