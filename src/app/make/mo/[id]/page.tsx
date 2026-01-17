
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { ManufacturingOrderDetail } from '@/components/make/ManufacturingOrderDetail';
import { fetchManufacturingOrder, ManufacturingOrderDetails } from '@/lib/katana-data-provider';
import { MAKE_NAV_GROUPS } from '../../constants';
import { Loader2 } from 'lucide-react';

export default function ManufacturingOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<ManufacturingOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      if (id === 'new') {
        // Initialize draft order for creation
        setOrder({
          id: 'new',
          orderNo: 'MO-#',
          productName: '',
          productSku: '',
          customer: '',
          plannedQuantity: 1,
          completedQuantity: 0,
          uom: 'pcs',
          creationDate: new Date().toISOString(),
          productionDeadline: new Date().toISOString().split('T')[0],
          productionStatus: 'not_started',
          variant_id: undefined,
          ingredients: [],
          operations: []
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchManufacturingOrder(id);
        if (!data) {
          setError('Order not found');
        } else {
          setOrder(data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load order');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <Shell activeTab="Make" activePage="Schedule" sidebarGroups={MAKE_NAV_GROUPS}>
        <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin" size={32} />
            <span>Loading order details...</span>
          </div>
        </div>
      </Shell>
    );
  }

  if (error || !order) {
    return (
      <Shell activeTab="Make" activePage="Schedule" sidebarGroups={MAKE_NAV_GROUPS}>
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
          <h2 className="text-xl font-medium mb-2">Order not found</h2>
          <p>The manufacturing order could not be found or an error occurred.</p>
          <p className="text-xs mt-2 text-red-400">{error}</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell activeTab="Make" activePage="Schedule" sidebarGroups={MAKE_NAV_GROUPS}>
      <div className="flex-1 min-h-0 overflow-auto bg-background">
        <ManufacturingOrderDetail initialOrder={order} />
      </div>
    </Shell>
  );
}











