'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Shell } from '@/components/layout/Shell';
import { OrderDetail } from '@/components/sell/OrderDetail';
import { fetchSalesOrder } from '@/lib/katana-data-provider';
import { SalesOrder } from '@/lib/mock-data';
import { SELL_NAV_GROUPS } from '../constants';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<SalesOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;
      setLoading(true);
      const data = await fetchSalesOrder(orderId);
      setOrder(data);
      setLoading(false);
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Shell activeTab="Sell" activePage="Sales orders" sidebarGroups={SELL_NAV_GROUPS}>
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Shell>
    );
  }

  if (!order) {
    return (
      <Shell activeTab="Sell" activePage="Sales orders" sidebarGroups={SELL_NAV_GROUPS}>
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
          <h2 className="text-xl font-medium mb-2">Order not found</h2>
          <p>The order ID {orderId} could not be found in the database.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell activeTab="Sell" activePage="Sales orders" sidebarGroups={SELL_NAV_GROUPS}>
      <div className="flex-1 min-h-0 overflow-auto bg-background">
        <OrderDetail order={order} />
      </div>
    </Shell>
  );
}


















