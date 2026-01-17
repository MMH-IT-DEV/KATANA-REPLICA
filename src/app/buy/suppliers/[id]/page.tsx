'use client';

import { useParams } from 'next/navigation';
import { SupplierDetail } from '@/components/buy/SupplierDetail';

export default function SupplierPage() {
    const params = useParams();
    const id = params.id as string;
    return <SupplierDetail id={id} />;
}
