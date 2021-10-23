import { ShopifyOrder, WooCommerceOrder } from "../types/commerceTypes";
import {
  Customer,
  Order,
  PaymentStatus,
  Person,
  Product,
} from "../types/commons";

/**
 * Map Shopify orders to normalized Order object.
 * Shopify Orders are almost the same as normalized orders.
 * We just need to correct payment status
 */
export function mapShopifyOrders(orders: ShopifyOrder[]): Order[] {
  return orders.map((order) => {
    return {
      ...order,
      payment_status:
        order.payment_status === "payed"
          ? PaymentStatus.COMPLETED
          : PaymentStatus.PENDING,
    };
  });
}

// Map Woo commerce orders to normalized Order object
export function mapWooCommerceOrders(orders: WooCommerceOrder[]): Order[] {
  return orders.map((order) => {
    const { products: rawProds, customer: rawCustomer } = order;
    const products = rawProds.map((prod): Product => {
      return {
        ...prod,
        product_id: prod["product-id"],
        free_shipping: prod["free-shipping"],
        variant_id: prod["variant-id"],
      };
    });
    const customer: Customer = {
      ...rawCustomer,
      created_at: rawCustomer["updated-at"],
      last_order_id: rawCustomer["last-order-id"],
      total_spent: rawCustomer["total-spent"],
      total_spent_currency: rawCustomer["total-spent-currency"],
      updated_at: rawCustomer["updated-at"],
    };
    return {
      ...order,
      cancel_reason: order["cancel-reason"],
      created_at: order["created-at"],
      location_id: order["location-id"],
      owner_note: order["owner-note"],
      payment_status:
        order["payment-stats"] === "completed"
          ? PaymentStatus.COMPLETED
          : PaymentStatus.PENDING,
      price: order.money,
      price_usd: order["money-usd"],
      updated_at: order["updated-at"],
      shipped_at: order["shipped-at"],
      products,
      customer,
    };
  });
}

export function mapCustomerToPerson(
  customer: Customer,
  totalBill: number
): Person {
  return {
    name: customer.name,
    email: customer.email,
    providerId: customer.id,
    total_billing: totalBill,
    avg_ticket: totalBill,
    quantity_orders: 1,
  };
}
