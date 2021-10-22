export enum PaymentStatus {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
}

export type MetricsItem = {
  totalBilling: number;
  people: Person[];
};

export type Person = {
  providerId: number;
  name: string;
  email: string;
  avg_ticket: number;
  quantity_orders: number;
  total_billing: number;
};

export type Order = {
  channel: number;
  cancel_reason?: string;
  created_at?: string;
  currency: string;
  gateway: string;
  id: number;
  language: string;
  location_id?: string;
  name: string;
  owner_note?: string;
  payment_status?: PaymentStatus;
  status?: string;
  subtotal: string;
  token: string;
  discount: string;
  price?: string;
  price_usd?: string;
  weight: string;
  updated_at?: string;
  shipped_at?: string;
  number: number;
  products: Product[];
  storefront: string;
  customer: Customer;
  stats?: string;
  money?: string;
};

export type Customer = {
  created_at?: string;
  email: string;
  id: number;
  last_order_id?: number;
  name: string;
  total_spent?: string;
  total_spent_currency?: string;
  updated_at?: string;
};

export type Product = {
  depth?: string;
  height?: string;
  price?: string;
  product_id?: number;
  quantity: number;
  free_shipping?: boolean;
  variant_id?: number;
  weight?: string;
  width?: string;
  money?: string;
};
