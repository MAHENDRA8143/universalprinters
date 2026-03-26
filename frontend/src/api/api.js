const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

async function parseResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Something went wrong");
  }
  return response.json();
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  return parseResponse(response);
}

export async function createOrder(payload) {
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse(response);
}

export async function simpleLogin(payload) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse(response);
}

export async function fetchRecentOrders(email) {
  const response = await fetch(`${API_BASE}/orders/recent?email=${encodeURIComponent(email)}`);
  return parseResponse(response);
}

export async function trackOrder(orderId) {
  const response = await fetch(`${API_BASE}/orders/${orderId}`);
  return parseResponse(response);
}

export async function uploadDesign(file) {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch(`${API_BASE}/uploads`, {
    method: "POST",
    body
  });

  return parseResponse(response);
}
