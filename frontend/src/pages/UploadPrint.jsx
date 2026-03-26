import { useState } from "react";
import { createOrder } from "../api/api";
import UploadBox from "../components/UploadBox";
import PriceCalculator from "../components/PriceCalculator";
import { getCurrentUser } from "../utils/auth";
import { saveOrder } from "../utils/orders";

function UploadPrint() {
  const [files, setFiles] = useState([]);
  const [price, setPrice] = useState(0);
  const [confirmation, setConfirmation] = useState("");
  const [options, setOptions] = useState({
    size: "A4",
    colorMode: "bw",
    paperType: "matte",
    quantity: 30
  });

  const update = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirmOrder = () => {
    const user = getCurrentUser();
    if (!user?.email || !user?.phone) {
      setConfirmation("Please login from Track Order page using email and phone before confirming the order.");
      return;
    }

    if (files.length === 0) {
      setConfirmation("Please upload at least one file before confirming the order.");
      return;
    }

    const orderId = `UP${Math.floor(1000 + Math.random() * 9000)}`;

    createOrder({
      productName: "Custom Print Upload",
      quantity: Number(options.quantity || 1),
      price: Number(price || 0),
      status: "Printing",
      filePath: files.map((selected) => selected.name).join(", "),
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
      source: "upload",
      createdAt: new Date().toISOString(),
      amount: price,
      options,
      fileName: files[0]?.name || "",
      fileNames: files.map((file) => file.name),
      userEmail: user?.email || "",
      userPhone: user?.phone || ""
    });
    setConfirmation(
      `Order confirmed successfully for ${files.length} file(s). Order ID: ${orderId}. Status: Printing. We will contact you shortly.`
    );
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <h1 className="reveal" style={{ fontSize: "2.1rem" }}>Upload &amp; Print</h1>
        <p className="reveal" style={{ marginTop: 10 }}>
          Upload your design, choose print settings, and get an instant quote.
        </p>

        <div className="grid" style={{ marginTop: 22 }}>
          <UploadBox files={files} onFilesChange={setFiles} multiple />

          <div className="card reveal" style={{ padding: 20 }}>
            <h3>Quick Settings</h3>
            <div className="grid" style={{ marginTop: 14, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              <label>
                Size
                <select value={options.size} onChange={(e) => update("size", e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}>
                  <option>A4</option>
                  <option>A5</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
              <label>
                Color
                <select value={options.colorMode} onChange={(e) => update("colorMode", e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}>
                  <option value="bw">B/W</option>
                  <option value="color">Color</option>
                </select>
              </label>
              <label>
                Paper
                <select value={options.paperType} onChange={(e) => update("paperType", e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}>
                  <option value="matte">Matte</option>
                  <option value="glossy">Glossy</option>
                </select>
              </label>
              <label>
                Quantity
                <input
                  type="number"
                  min="1"
                  value={options.quantity}
                  onChange={(e) => update("quantity", e.target.value)}
                  style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}
                />
              </label>
            </div>
          </div>

          <PriceCalculator options={options} onPriceChange={setPrice} />
          <button
            className="btn btn-primary reveal"
            style={{ width: "fit-content" }}
            type="button"
            onClick={handleConfirmOrder}
          >
            Confirm Print Order - ₹{price}
          </button>

          {confirmation && (
            <div
              className="card reveal visible"
              style={{
                padding: 16,
                border: "1px solid rgba(31,77,122,0.32)",
                background: "linear-gradient(120deg, rgba(31,77,122,0.08), rgba(14,116,144,0.07))"
              }}
            >
              <p style={{ color: "#111", fontWeight: 600 }}>{confirmation}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UploadPrint;
