import { useEffect } from "react";

function PriceCalculator({ options, onPriceChange }) {
  const sizeFactor = options.size === "A5" ? 0.7 : options.size === "custom" ? 1.35 : 1;
  const colorFactor = options.colorMode === "color" ? 1.45 : 1;
  const paperFactor = options.paperType === "glossy" ? 1.3 : 1;
  const quantityFactor = Number(options.quantity || 1);

  const base = 2.5;
  const total = Math.max(40, Math.round(base * sizeFactor * colorFactor * paperFactor * quantityFactor));

  useEffect(() => {
    onPriceChange(total);
  }, [total, onPriceChange]);

  return (
    <div className="card" style={{ padding: 18 }}>
      <h4>Live Price Estimate</h4>
      <p style={{ marginTop: 10, fontSize: "1.6rem", fontWeight: 800, color: "#1F4D7A" }}>₹{total}</p>
      <p style={{ marginTop: 8, fontSize: "0.9rem" }}>Price updates instantly based on your print options.</p>
    </div>
  );
}

export default PriceCalculator;
