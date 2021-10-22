export type DataResponse = {
  Shopify: ShopifyOrder[];
  Woocommerce: WooCommerceOrder[];
};

export type ShopifyOrder = {
  channel: number;
  cancel_reason?: string;
  created_at: string;
  currency: string;
  gateway: string;
  id: number;
  language: string;
  location_id: string;
  name: string;
  owner_note: string;
  payment_status: string;
  status: string;
  subtotal: string;
  token: string;
  discount: string;
  price: string;
  price_usd: string;
  weight: string;
  updated_at: string;
  shipped_at: string;
  number: number;
  products: ShopifyProduct[];
  storefront: string;
  customer: ShopifyCustomer;
};

type ShopifyProduct = {
  depth: string;
  height: string;
  price: string;
  product_id: number;
  quantity: number;
  free_shipping: boolean;
  variant_id: number;
  weight: string;
  width: string;
};

type ShopifyCustomer = {
  created_at?: string;
  email: string;
  id: number;
  last_order_id?: number;
  name: string;
  total_spent?: string;
  total_spent_currency?: string;
  updated_at?: string;
};

export type WooCommerceOrder = {
  channel: number;
  "cancel-reason": null;
  "created-at": string;
  currency: string;
  gateway: string;
  id: number;
  language: string;
  "location-id": null;
  name: string;
  "owner-note": null;
  "payment-stats": string;
  stats: string;
  subtotal: string;
  token: string;
  discount: string;
  money: string;
  "money-usd": string;
  weight: string;
  "updated-at": string;
  "shipped-at": string;
  number: number;
  products: WooCommerceProduct[];
  storefront: string;
  customer: WooCommerceCustomer;
};

type WooCommerceCustomer = {
  "created-at": string;
  email: string;
  id: number;
  "last-order-id": number;
  name: string;
  "total-spent": string;
  "total-spent-currency": string;
  "updated-at": string;
};

type WooCommerceProduct = {
  depth: null;
  height: null;
  money: string;
  "product-id": number;
  quantity: number;
  "free-shipping": boolean;
  "variant-id": number;
  weight: string;
  width: null;
};
