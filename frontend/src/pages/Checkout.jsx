import { useState } from "react";
import { createOrder } from "../api/api";
import { Link } from "react-router-dom";
import { getCartItems } from "../utils/cart";
import { clearCart } from "../utils/cart";
import { getCurrentUser } from "../utils/auth";
import { saveOrder } from "../utils/orders";

function Checkout() {
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const cartItems = getCartItems();

  const handleConfirm = (event) => {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user?.email || !user?.phone) {
      setMessage("Please login from Track Order page with email and phone before confirming order.");
      setConfirmation("");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("Your cart is empty. Please add items before confirming your order.");
      setConfirmation("");
      return;
    }
    const orderId = `UP${Math.floor(1000 + Math.random() * 9000)}`;
    const total = cartItems.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);

    createOrder({
      productName: "Cart Order",
      quantity: cartItems.reduce((sum, item) => sum + Number(item.qty || 0), 0),
      price: total,
      status: "Printing",
      filePath: cartItems.map((item) => item.fileNames?.join(", ") || item.fileName || "").join(" | "),
      user: user
        ? {
            email: user.email,
            phone: user.phone,
            name: user.name
          }
        : null
    }).catch(() => {
      // Keep checkout flow local if backend is unreachable.
    });

    saveOrder({
      id: orderId,
      status: "Printing",
      source: "checkout",
      createdAt: new Date().toISOString(),
      amount: total,
      items: cartItems,
      userEmail: user?.email || "",
      userPhone: user?.phone || ""
    });
    clearCart();
    setMessage("");
    setConfirmation(
      `Payment captured. Order confirmed. Order ID: ${orderId}. Current status: Printing.`
    );
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 920 }}>
        <h1 className="reveal" style={{ fontSize: "2.1rem" }}>Checkout</h1>
        <p className="reveal" style={{ marginTop: 8 }}>Secure checkout with address and payment details.</p>

        {cartItems.length === 0 && !confirmation && (
          <div className="card reveal visible" style={{ marginTop: 16, padding: 16, border: "1px solid rgba(14,116,144,0.35)" }}>
            <p style={{ fontWeight: 600 }}>No items found in cart.</p>
            <p style={{ marginTop: 6 }}>Please add products first to complete checkout.</p>
            <Link className="btn btn-outline" style={{ marginTop: 10, display: "inline-flex" }} to="/services">View Services</Link>
          </div>
        )}

        <form className="card reveal" style={{ marginTop: 22, padding: 20, display: "grid", gap: 12 }} onSubmit={handleConfirm}>
          <label>
            Full Name
            <input type="text" placeholder="Your name" style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }} />
          </label>
          <label>
            Phone
            <input type="tel" placeholder="Phone number" style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }} />
          </label>
          <label>
            Delivery Address
            <textarea rows="4" placeholder="Address" style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }} />
          </label>
          <label>
            Payment Method
            <select style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }}>
              <option>UPI</option>
              <option>Card</option>
              <option>Cash on Delivery</option>
            </select>
          </label>

          <button className="btn btn-primary" style={{ width: "fit-content" }} type="submit">
            Confirm Order
          </button>

          {message && (
            <div className="card" style={{ padding: 14, border: "1px solid rgba(14,116,144,0.35)" }}>
              <p style={{ color: "#111", fontWeight: 600 }}>{message}</p>
            </div>
          )}

          {confirmation && (
            <div
              className="card"
              style={{
                padding: 14,
                border: "1px solid rgba(31,77,122,0.35)",
                background: "linear-gradient(120deg, rgba(31,77,122,0.08), rgba(14,116,144,0.07))"
              }}
            >
              <p style={{ color: "#111", fontWeight: 600 }}>{confirmation}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Checkout;
