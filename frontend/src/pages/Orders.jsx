import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRecentOrders } from "../api/api";
import { clearCurrentUser, getCurrentUser } from "../utils/auth";
import { getOrderById, getOrders } from "../utils/orders";

function Orders() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [recentFromApi, setRecentFromApi] = useState([]);

  useEffect(() => {
    const onAuthUpdated = () => setCurrentUser(getCurrentUser());
    window.addEventListener("auth-updated", onAuthUpdated);

    return () => window.removeEventListener("auth-updated", onAuthUpdated);
  }, []);

  useEffect(() => {
    if (!currentUser?.email) {
      setRecentFromApi([]);
      return;
    }

    fetchRecentOrders(currentUser.email)
      .then((orders) => setRecentFromApi(Array.isArray(orders) ? orders : []))
      .catch(() => setRecentFromApi([]));
  }, [currentUser]);

  const recent = useMemo(() => {
    if (recentFromApi.length > 0) {
      return recentFromApi;
    }

    if (!currentUser) {
      return [];
    }

    return getOrders()
      .filter(
        (order) =>
          order.userEmail?.toLowerCase() === currentUser.email.toLowerCase() &&
          order.userPhone === currentUser.phone
      )
      .slice(0, 4);
  }, [currentUser, recentFromApi]);

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
    setRecentFromApi([]);
  };

  const handleTrack = (event) => {
    event.preventDefault();
    const query = code.trim().toUpperCase();
    if (!query) {
      setResult({ found: false, message: "Please enter your order ID." });
      return;
    }

    const order = getOrderById(query);
    if (!order) {
      setResult({ found: false, message: "Order not found. Please check the order ID and try again." });
      return;
    }

    setResult({ found: true, order });
  };

  const orderValue = (value, fallback = "-") => {
    if (value === null || value === undefined || value === "") {
      return fallback;
    }
    return value;
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1 className="reveal" style={{ fontSize: "2.1rem" }}>Track Your Order</h1>
        <p className="reveal" style={{ marginTop: 8 }}>
          Enter your order ID to check current status.
        </p>

        <form className="card reveal" style={{ marginTop: 22, padding: 22 }} onSubmit={handleTrack}>
          <label>
            Order ID
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ width: "100%", marginTop: 8, padding: 11, borderRadius: 10 }}
              placeholder="UP1023"
            />
          </label>

          <button className="btn btn-primary" type="submit" style={{ marginTop: 14, width: "fit-content" }}>
            Track Order
          </button>

          {result && (
            <div className="card" style={{ marginTop: 16, padding: 14, border: "1px solid rgba(0,174,239,0.28)" }}>
              {!result.found ? (
                <p style={{ fontWeight: 600 }}>{result.message}</p>
              ) : (
                <>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>Current Status</p>
                  <h3 style={{ marginTop: 6, color: "#1F4D7A" }}>{result.order.status}</h3>
                  <p style={{ marginTop: 8 }}>Order ID: {result.order.id}</p>
                  <p>Created: {new Date(result.order.createdAt).toLocaleString()}</p>
                </>
              )}
            </div>
          )}
        </form>

        {!currentUser ? (
          <div className="card reveal" style={{ marginTop: 16, padding: 16, display: "grid", gap: 10 }}>
            <h3 style={{ fontSize: "1.05rem" }}>Recent Orders</h3>
            <p style={{ fontSize: "0.92rem" }}>Please login to view your recent orders.</p>
            <Link to="/login" className="btn btn-primary" style={{ width: "fit-content" }}>
              Go to Login
            </Link>
          </div>
        ) : (
          <div className="card reveal" style={{ marginTop: 16, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ fontWeight: 600 }}>
              Logged in as {currentUser.email} ({currentUser.phone})
            </p>
            <button type="button" className="btn btn-outline" onClick={handleLogout}>Logout</button>
          </div>
        )}

        {currentUser && recent.length > 0 && (
          <div className="card reveal" style={{ marginTop: 16, padding: 16 }}>
            <h3 style={{ fontSize: "1.05rem" }}>Recent Orders</h3>
            <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
              {recent.map((order) => (
                <article key={order.id} className="card" style={{ padding: 12, border: "1px solid rgba(0,174,239,0.2)" }}>
                  <p><strong>Order ID:</strong> {orderValue(order.id)}</p>
                  <p><strong>Status:</strong> {orderValue(order.status, "Printing")}</p>
                  <p><strong>Product:</strong> {orderValue(order.productName, order.items?.[0]?.productName)}</p>
                  <p><strong>Quantity:</strong> {orderValue(order.quantity, order.items?.reduce((sum, item) => sum + Number(item.qty || 0), 0))}</p>
                  <p><strong>Price:</strong> ₹{orderValue(order.price, order.amount)}</p>
                  <p><strong>Files:</strong> {orderValue(order.filePath, order.fileNames?.join(", ") || order.fileName)}</p>
                  <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</p>
                  <p><strong>Customer Email:</strong> {orderValue(order.customerEmail, order.userEmail)}</p>
                  <p><strong>Customer Mobile:</strong> {orderValue(order.customerPhone, order.userPhone)}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {currentUser && recent.length === 0 && (
          <div className="card reveal" style={{ marginTop: 16, padding: 16 }}>
            <p style={{ fontWeight: 600 }}>No recent orders found for this account.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
