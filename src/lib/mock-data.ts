
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  tax: string;
  location: string;
  delivery_status?: 'DELIVERED' | 'NOT_SHIPPED';
  status: {
    sales: 'In stock' | 'Not available' | 'Expected';
    ingredients: 'Picked' | 'Not applicable' | 'Not available' | 'In stock' | 'Expected';
    production: 'Done' | 'Not applicable' | 'In progress' | 'Not started';
  };
}

export interface Address {
  name: string;
  line1: string;
  phone: string;
}

export interface SalesOrder {
  id: string;
  order_no: string;
  customer: {
    name: string;
    email?: string;
    phone?: string
  } | null;
  customer_ref: string;
  total_amount: number;
  currency: string;
  delivery_date: string;
  created_at: string;
  source: 'SHOPIFY' | 'MANUAL';
  status: 'OPEN' | 'DONE';
  delivery_status: 'NOT_SHIPPED' | 'PARTIALLY_SHIPPED' | 'SHIPPED';
  ship_from: string;
  billing_address: Address;
  shipping_address: Address;
  items: OrderItem[];
}

export const MOCK_ORDERS: SalesOrder[] = [
  {
    id: '1',
    order_no: '#68029',
    customer: { name: 'Allison Chin' },
    customer_ref: 'Reference number',
    total_amount: 65.05,
    currency: 'CAD',
    delivery_date: '2025-08-27',
    created_at: '2025-08-13',
    source: 'SHOPIFY',
    status: 'OPEN',
    delivery_status: 'NOT_SHIPPED',
    ship_from: 'MMH Kelowna',
    billing_address: {
      name: 'Allison Chin',
      line1: 'Box 352, Onoway, Alberta, T0E 1V0, Canada',
      phone: '7804055391'
    },
    shipping_address: {
      name: 'Allison Chin',
      line1: 'Box 352, Onoway, Alberta, T0E 1V0, Canada',
      phone: '7804055391'
    },
    items: [
      {
        id: '1',
        name: '[ARCHIVED] [OP-195] Order Protection',
        quantity: 1,
        price: 1.95,
        discount: 0,
        total: 1.95,
        tax: '5% - GST',
        location: 'MMH Kelowna',
        status: {
          sales: 'Not available',
          ingredients: 'Not applicable',
          production: 'Not applicable'
        }
      },
      {
        id: '2',
        name: '[FG-MS-4] SHOPIFY / UNIVERSAL FLAT...',
        quantity: 1,
        price: 60.00,
        discount: 0,
        total: 60.00,
        tax: '5% - GST',
        location: 'MMH Kelowna',
        status: {
          sales: 'In stock',
          ingredients: 'Picked',
          production: 'Done'
        }
      }
    ]
  },
  {
    id: '2',
    order_no: '#71656',
    customer: { name: 'Elizabeth Dreon' },
    customer_ref: '',
    total_amount: 113.73,
    currency: 'CAD',
    delivery_date: '2025-09-16',
    created_at: '2025-09-02',
    source: 'SHOPIFY',
    status: 'DONE',
    delivery_status: 'SHIPPED',
    ship_from: 'MMH Kelowna',
    billing_address: { name: 'Elizabeth Dreon', line1: '', phone: '' },
    shipping_address: { name: 'Elizabeth Dreon', line1: '', phone: '' },
    items: [
      {
        id: '1',
        name: 'Product A',
        quantity: 10,
        price: 11.37,
        discount: 0,
        total: 113.73,
        tax: '5%',
        location: 'Main',
        status: { sales: 'In stock', ingredients: 'In stock', production: 'Done' }
      }
    ]
  },
  {
    id: '3',
    order_no: '#75126',
    customer: { name: 'Oscar Menjivar' },
    customer_ref: '',
    total_amount: 110.58,
    currency: 'CAD',
    delivery_date: '2025-10-06',
    created_at: '2025-09-22',
    source: 'SHOPIFY',
    status: 'DONE',
    delivery_status: 'SHIPPED',
    ship_from: 'MMH Kelowna',
    billing_address: { name: 'Oscar Menjivar', line1: '', phone: '' },
    shipping_address: { name: 'Oscar Menjivar', line1: '', phone: '' },
    items: [
      {
        id: '1',
        name: 'Product B',
        quantity: 10,
        price: 11.06,
        discount: 0,
        total: 110.58,
        tax: '5%',
        location: 'Main',
        status: { sales: 'In stock', ingredients: 'Picked', production: 'Done' }
      }
    ]
  },
  {
    id: '4',
    order_no: '#79498',
    customer: { name: 'Anhelina Demchuk' },
    customer_ref: '',
    total_amount: -1.51,
    currency: 'CAD',
    delivery_date: '2025-11-10',
    created_at: '2025-10-27',
    source: 'SHOPIFY',
    status: 'OPEN',
    delivery_status: 'NOT_SHIPPED',
    ship_from: 'MMH Kelowna',
    billing_address: { name: 'Anhelina Demchuk', line1: '', phone: '' },
    shipping_address: { name: 'Anhelina Demchuk', line1: '', phone: '' },
    items: [
      {
        id: '1',
        name: 'Product C',
        quantity: 1,
        price: -1.51,
        discount: 0,
        total: -1.51,
        tax: '5%',
        location: 'Main',
        status: { sales: 'Not available', ingredients: 'Not available', production: 'Not started' }
      }
    ]
  },
  {
    id: '5',
    order_no: '#82421',
    customer: { name: 'Helen McPherson' },
    customer_ref: '',
    total_amount: 52.66, // Sum of totals approx
    currency: 'USD',
    delivery_date: '2025-12-05',
    created_at: '2025-11-21',
    source: 'SHOPIFY',
    status: 'OPEN',
    delivery_status: 'PARTIALLY_SHIPPED',
    ship_from: 'MMH Kelowna',
    billing_address: { name: 'Helen McPherson', line1: '850 North 24th Street, Camden, NJ', phone: '+18566314364' },
    shipping_address: { name: 'Helen McPherson', line1: '1303 Chelsea Court, Voorhees Township, NJ', phone: '856-631-4364' },
    items: [
      {
        id: '1',
        name: '[ARCHIVED] [OP-195] Order Protection / $1.95',
        quantity: 1,
        price: 1.95,
        discount: 15.38,
        total: 1.65,
        tax: '0%',
        location: 'Main',
        delivery_status: 'DELIVERED',
        status: { sales: 'Not available', ingredients: 'Not applicable', production: 'Not applicable' }
      },
      {
        id: '2',
        name: '[FG-MS-4] SHOPIFY / UNIVERSAL FLARE CARE (PURPLE) / 1 OZ',
        quantity: 1,
        price: 60.00,
        discount: 14.98,
        total: 51.01,
        tax: '-',
        location: 'MMH Kelowna',
        delivery_status: 'NOT_SHIPPED',
        status: { sales: 'In stock', ingredients: 'Picked', production: 'Done' }
      }
    ]
  }
];

