const ORDERS_KEY = "universal_printers_orders";

function parseOrders(raw) {
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getOrders() {
  return parseOrders(window.localStorage.getItem(ORDERS_KEY));
}

export function saveOrder(order) {
  const orders = getOrders();
  const next = [order, ...orders].slice(0, 200);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  return order;
}

export function getOrderById(orderId) {
  if (!orderId) {
    return null;
  }
  return getOrders().find((order) => order.id?.toUpperCase() === orderId.toUpperCase()) || null;
}
