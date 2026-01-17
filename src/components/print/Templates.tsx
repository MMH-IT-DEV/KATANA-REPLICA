import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { SalesOrder } from '@/lib/mock-data';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#333' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  subTitle: { fontSize: 12, color: '#666' },

  // Amazon Specific
  barcodeBox: { marginVertical: 10, alignItems: 'center' },
  barcodeStrip: { width: 200, height: 30, backgroundColor: '#000', marginBottom: 5 },

  // Layout
  columns: { flexDirection: 'row', gap: 40, marginBottom: 20 },
  column: { flex: 1 },
  label: { fontSize: 8, color: '#666', marginBottom: 2, fontWeight: 'bold', textTransform: 'uppercase' },
  value: { fontSize: 10, marginBottom: 8 },

  // Address specific
  address: { fontSize: 10, lineHeight: 1.4 },

  // Meta Row for Packing List
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },

  // Table
  table: { marginTop: 20, borderTop: '1px solid #000' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f9f9f9', padding: 8, borderBottom: '1px solid #eee' },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottom: '1px solid #eee' },
  colItem: { flex: 4 },
  colQty: { flex: 1, textAlign: 'right' },
  colPrice: { flex: 1, textAlign: 'right' },
  colTotal: { flex: 1, textAlign: 'right' },

  // Footer
  totalSection: { marginTop: 20, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', width: 200, justifyContent: 'space-between', paddingVertical: 4 },

  // Barcode Label Specific
  labelPage: { padding: 10 },
  labelContainer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ccc' },
  labelTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  labelSku: { fontSize: 10, fontFamily: 'Courier', marginBottom: 10 },
});

interface PDFProps {
  order: SalesOrder;
}

// --- Packing List (Standard) ---
export const PackingListPDF = ({ order }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={[styles.header, { alignItems: 'baseline' }]}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Packing list: {order.order_no}</Text>
        <Text style={{ fontSize: 9, color: '#666' }}>Created: {order.created_at}</Text>
      </View>

      {/* Meta Info */}
      <View style={styles.columns}>
        <View style={styles.column}>
          <Text style={styles.label}>Customer:</Text>
          <Text style={[styles.value, { fontSize: 14, fontWeight: 'bold' }]}>{order.customer?.name}</Text>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Bill to:</Text>
            <Text style={styles.address}>{order.billing_address?.name}</Text>
            <Text style={styles.address}>{order.billing_address?.line1}</Text>
            <Text style={styles.address}>{order.billing_address?.phone}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.metaRow}>
            <View>
              <Text style={styles.label}>Delivery deadline:</Text>
              <Text style={styles.value}>{order.delivery_date}</Text>
            </View>
            <View>
              <Text style={styles.label}>Customer reference:</Text>
              <Text style={styles.value}>{order.customer_ref || '-'}</Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Ship to:</Text>
            <Text style={styles.address}>{order.shipping_address?.name}</Text>
            <Text style={styles.address}>{order.shipping_address?.line1}</Text>
            <Text style={styles.address}>{order.shipping_address?.phone}</Text>
          </View>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.label, styles.colItem]}>Item</Text>
          <Text style={[styles.label, styles.colQty]}>Quantity</Text>
        </View>
        {order.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.colItem}>{item.name}</Text>
            <Text style={styles.colQty}>{item.quantity} pcs</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.totalSection}>
        <View style={[styles.totalRow, { borderTop: '1px solid #eee', paddingTop: 10 }]}>
          <Text style={styles.label}>Total units:</Text>
          <Text style={styles.value}>{order.items.reduce((acc, i) => acc + i.quantity, 0)} pcs</Text>
        </View>
      </View>

    </Page>
  </Document>
);

// --- Amazon Packing Slip ---
export const AmazonPackingSlipPDF = ({ order }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Packing Slip</Text>
          <Text style={styles.subTitle}>Order ID: {order.order_no}</Text>
        </View>
        {/* Mock Barcode representation */}
        <View style={styles.barcodeBox}>
          <View style={[styles.barcodeStrip, { height: 10, width: 150, marginBottom: 2 }]} />
          <View style={[styles.barcodeStrip, { height: 20, width: 150 }]} />
          <Text style={{ fontSize: 8, marginTop: 2 }}>{order.order_no}</Text>
        </View>
      </View>

      <View style={styles.columns}>
        <View style={styles.column}>
          <Text style={styles.label}>Ship To:</Text>
          <Text style={styles.value}>{order.shipping_address?.name}</Text>
          <Text style={styles.value}>{order.shipping_address?.line1}</Text>
          <Text style={styles.value}>{order.shipping_address?.phone}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Bill To:</Text>
          <Text style={styles.value}>{order.billing_address?.name}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, { borderBottom: '2px solid #000' }]}>
          <Text style={styles.colItem}>Item Description</Text>
          <Text style={styles.colQty}>Qty</Text>
        </View>
        {order.items.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colItem}>{item.name}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 40 }}>
        <Text style={styles.label}>Note to customer:</Text>
        <Text style={{ fontSize: 10, fontStyle: 'italic', marginTop: 5 }}>
          Thank you for your order!
        </Text>
      </View>
    </Page>
  </Document>
);

// --- Sales Order ---
export const SalesOrderPDF = ({ order }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: '#d97757' }]}>SALES ORDER</Text>
          <Text style={styles.subTitle}>#{order.order_no}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.value}>{order.created_at}</Text>
          <Text style={styles.label}>Status: {order.status}</Text>
        </View>
      </View>

      <View style={[styles.columns, { backgroundColor: '#f9f9f9', padding: 15 }]}>
        <View style={styles.column}>
          <Text style={styles.label}>Customer</Text>
          <Text style={[styles.value, { fontWeight: 'bold' }]}>{order.customer?.name}</Text>
          <Text style={styles.value}>{order.customer?.email}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Ship To</Text>
          <Text style={styles.value}>{order.shipping_address?.line1}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: '#eee', borderBottom: 'none' }]}>
          <Text style={styles.colItem}>Item</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colPrice}>Rate</Text>
          <Text style={styles.colTotal}>Amount</Text>
        </View>
        {order.items.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colItem}>{item.name}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>{item.price.toFixed(2)}</Text>
            <Text style={styles.colTotal}>{item.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>{(order.total_amount * 0.95).toFixed(2)} {order.currency}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.label}>Tax (5%):</Text>
          <Text style={styles.value}>{(order.total_amount * 0.05).toFixed(2)} {order.currency}</Text>
        </View>
        <View style={[styles.totalRow, { borderTop: '1px solid #000', paddingTop: 5 }]}>
          <Text style={[styles.label, { fontSize: 12, color: '#000' }]}>TOTAL:</Text>
          <Text style={[styles.value, { fontSize: 12, fontWeight: 'bold' }]}>{order.total_amount.toFixed(2)} {order.currency}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// --- Barcode Label (New) ---
export const BarcodeLabelPDF = ({ order }: PDFProps) => (
  <Document>
    {order.items.map((item, idx) => (
      <Page key={idx} size={[200, 100]} style={styles.labelPage}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>{item.name.substring(0, 20)}...</Text>
          <View style={[styles.barcodeStrip, { width: 150, height: 25, marginVertical: 5 }]} />
          <Text style={styles.labelSku}>{item.id.toUpperCase()}</Text>
          <Text style={{ fontSize: 8 }}>Order: {order.order_no}</Text>
        </View>
      </Page>
    ))}
  </Document>
);
