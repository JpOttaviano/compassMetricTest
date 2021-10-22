import { DataResponse } from "../types/commerceTypes";
import { MetricsItem, Order, PaymentStatus, Person } from "../types/commons";
import {
  mapCustomerToPerson,
  mapShopifyOrders,
  mapWooCommerceOrders,
} from "./mappers";
import { parseMoneyToFloat } from "./utils";

function getMetricsFromOrders(orders: Order[]): MetricsItem {
  const customers: Person[] = [];
  let totalBilling = 0;
  for (const order of orders) {
    const { customer, price } = order;
    const orderBilling = parseMoneyToFloat(price);
    let existingCustomer = customers.find(
      //(cus) => cus.providerId === customer.id
      (cus) => cus.email === customer.email //&& cus.name === customer.name
    );
    if (!existingCustomer) {
      //const newCustomer = mapCustomerToPerson(customer,orderBilling)
      const newCustomer: Person = {
        name: customer.name,
        email: customer.email,
        providerId: customer.id,
        total_billing: orderBilling,
        quantity_orders: 1,
        avg_ticket: orderBilling,
      };
      customers.push(newCustomer);
    } else {
      const customerIndex = customers.indexOf(existingCustomer);
      existingCustomer.total_billing += orderBilling;
      existingCustomer.quantity_orders += 1;
      existingCustomer.avg_ticket =
        existingCustomer.total_billing / existingCustomer.quantity_orders;
      customers[customerIndex] = existingCustomer;
    }
    totalBilling += orderBilling;
  }
  return {
    totalBilling,
    people: customers,
  };
}

function getMappedOrders(data: DataResponse): Order[] {
  const { Shopify, Woocommerce } = data;

  const shopifyMappedOrders = mapShopifyOrders(Shopify);
  const wooMappedOrders = mapWooCommerceOrders(Woocommerce);

  return [...shopifyMappedOrders, ...wooMappedOrders];
}

export function getMetricData(
  data: DataResponse,
  filterOrders: boolean
): MetricsItem {
  let mappedOrders = getMappedOrders(data);
  if (filterOrders) {
    mappedOrders = mappedOrders.filter(
      (order) =>
        order.cancel_reason === null &&
        order.payment_status === PaymentStatus.COMPLETED
    );
  }
  return getMetricsFromOrders(mappedOrders);
}
