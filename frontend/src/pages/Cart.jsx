import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { clearCart, getCartItems, onCartUpdated, removeCartItem } from "../utils/cart";

function Cart() {
  const location = useLocation();
  const [items, setItems] = useState(getCartItems());
  const fromOrderNow = useMemo(() => new URLSearchParams(location.search).get("source") === "order-now", [location.search]);
  const total = items.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);

  useEffect(() => {
    const unsubscribe = onCartUpdated((updated) => setItems(updated));
    return () => unsubscribe();
  }, []);

  const handleRemove = (id) => {
    setItems(removeCartItem(id));
  };

  const handleClear = () => {
    setItems(clearCart());
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 920 }}>
        <h1 className="reveal" style={{ fontSize: "2.1rem" }}>Your Cart</h1>

        <div className="grid" style={{ marginTop: 22 }}>
          {items.length === 0 ? (
            <div className="card reveal visible" style={{ padding: 24 }}>
              <h3>Your cart is empty.</h3>
              <p style={{ marginTop: 8 }}>
                {fromOrderNow
                  ? "Please add at least one item before placing an order."
                  : "Start adding products to continue to checkout."}
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                <Link className="btn btn-primary" to="/services">Browse Services</Link>
                <Link className="btn btn-outline" to="/upload-print">Upload &amp; Print</Link>
              </div>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <article key={item.id} className="card reveal" style={{ padding: 18, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <h3>{item.productName}</h3>
                    <p>Quantity: {item.qty}</p>
                    <p style={{ fontSize: "0.9rem" }}>
                      {item.options?.size} | {item.options?.colorMode?.toUpperCase()} | {item.options?.paperType}
                    </p>
                  </div>
                  <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
                    <h3>₹{item.subtotal}</h3>
                    <button className="btn btn-outline" type="button" onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </article>
              ))}

              <div className="card reveal" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <h3>Total: ₹{total}</h3>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button className="btn btn-outline" type="button" onClick={handleClear}>Clear Cart</button>
                  <Link className="btn btn-primary" to="/checkout">Checkout</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cart;
