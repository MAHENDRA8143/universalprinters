const CART_KEY = "universal_printers_cart";
const CART_EVENT = "universal-printers-cart-updated";

function parseCart(raw) {
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

function emitCartUpdate(items) {
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: items }));
}

export function getCartItems() {
  return parseCart(window.localStorage.getItem(CART_KEY));
}

export function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

export function saveCart(items) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitCartUpdate(items);
  return items;
}

export function addToCart(item) {
  const items = getCartItems();
  const existing = items.find(
    (entry) =>
      entry.productName === item.productName &&
      entry.options?.size === item.options?.size &&
      entry.options?.colorMode === item.options?.colorMode &&
      entry.options?.paperType === item.options?.paperType
  );

  if (existing) {
    existing.qty = Number(existing.qty) + Number(item.qty || 0);
    existing.subtotal = Number(existing.subtotal) + Number(item.subtotal || 0);
  } else {
    items.push({
      id: item.id || `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...item
    });
  }

  return saveCart(items);
}

export function removeCartItem(id) {
  return saveCart(getCartItems().filter((item) => item.id !== id));
}

export function clearCart() {
  return saveCart([]);
}

export function onCartUpdated(handler) {
  const wrapped = (event) => handler(event.detail);
  window.addEventListener(CART_EVENT, wrapped);
  return () => window.removeEventListener(CART_EVENT, wrapped);
}
