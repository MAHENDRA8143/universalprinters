import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { simpleLogin } from "../api/api";
import { saveCurrentUser } from "../utils/auth";

function Login() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = form.email.trim();
    const phone = form.phone.trim();
    const name = form.name.trim();

    if (!email || !phone) {
      setMessage("Please enter your email and phone number.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const response = await simpleLogin({
        name: name || "Customer",
        email,
        phone
      });

      saveCurrentUser(response.user);
      navigate("/orders");
    } catch {
      setMessage("Login failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 620 }}>
        <h1 className="reveal" style={{ fontSize: "2.1rem" }}>Login</h1>
        <p className="reveal" style={{ marginTop: 8 }}>
          Enter your phone number and email to access your recent orders.
        </p>

        <form className="card reveal" style={{ marginTop: 20, padding: 20, display: "grid", gap: 12 }} onSubmit={handleSubmit}>
          <label>
            Name (optional)
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Your name"
              style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@example.com"
              style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }}
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              placeholder="9876543210"
              style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }}
            />
          </label>

          <button className="btn btn-primary" style={{ width: "fit-content" }} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <div className="card" style={{ padding: 12, border: "1px solid rgba(0,174,239,0.25)" }}>
              <p style={{ fontWeight: 600 }}>{message}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Login;
