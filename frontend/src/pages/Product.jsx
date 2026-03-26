import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import PriceCalculator from "../components/PriceCalculator";
import { addToCart } from "../utils/cart";

const labels = {
  "visiting-cards": "Visiting Cards",
  flyers: "Flyers",
  "wedding-cards": "Wedding Cards",
  "spiral-binding": "Spiral Binding"
};

function Product() {
  const { slug } = useParams();
  const [files, setFiles] = useState([]);
  const [price, setPrice] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [options, setOptions] = useState({
    size: "A4",
    colorMode: "color",
    paperType: "matte",
    quantity: 100
  });

  const productName = useMemo(() => labels[slug] || "Custom Print Product", [slug]);

  const updateOption = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    if (files.length === 0) {
      setFeedback("Please upload at least one design file before adding this item to cart.");
      return;
    }

    addToCart({
      productName,
      qty: Number(options.quantity || 1),
      subtotal: Number(price),
      options,
      fileName: files[0]?.name || "",
      fileNames: files.map((file) => file.name)
    });

    setFeedback(`Item with ${files.length} file(s) added to cart successfully.`);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="reveal" style={{ fontSize: "2.2rem" }}>{productName}</h1>
        <p className="reveal" style={{ marginTop: 10 }}>Customize specs, upload your design, and confirm order instantly.</p>

        <div className="grid product-layout" style={{ marginTop: 24, gridTemplateColumns: "1.1fr 1fr" }}>
          <div className="card reveal" style={{ padding: 14 }}>
            <img
              src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&w=1200&q=80"
              alt={productName}
              style={{ width: "100%", borderRadius: 16, maxHeight: 460, objectFit: "cover" }}
            />
          </div>

          <div className="reveal" style={{ display: "grid", gap: 14 }}>
            <div className="card" style={{ padding: 20 }}>
              <h3>Print Options</h3>
              <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                <label>
                  Size
                  <select value={options.size} onChange={(e) => updateOption("size", e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}>
                    <option>A4</option>
                    <option>A5</option>
                    <option value="custom">Custom</option>
                  </select>
                </label>

                <label>
                  Color
                  <select value={options.colorMode} onChange={(e) => updateOption("colorMode", e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}>
                    <option value="bw">B/W</option>
                    <option value="color">Color</option>
                  </select>
                </label>

                <label>
                  Paper Type
                  <select value={options.paperType} onChange={(e) => updateOption("paperType", e.target.value)} style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}>
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
                    onChange={(e) => updateOption("quantity", e.target.value)}
                    style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 10 }}
                  />
                </label>
              </div>
            </div>

            <UploadBox files={files} onFilesChange={setFiles} multiple />
            <PriceCalculator options={options} onPriceChange={setPrice} />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn btn-primary" type="button" onClick={handleAddToCart}>Add to Cart - ₹{price}</button>
              <Link className="btn btn-outline" to="/cart">View Cart</Link>
              <Link className="btn btn-outline" to="/checkout">Proceed to Checkout</Link>
            </div>

            {feedback && (
              <div className="card" style={{ padding: 14, border: "1px solid rgba(31,77,122,0.3)" }}>
                <p style={{ fontWeight: 600 }}>{feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
