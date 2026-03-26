import { Link } from "react-router-dom";

function ProductCard({ title, description, priceFrom, slug, image }) {
  return (
    <article className="card reveal" style={{ overflow: "hidden" }}>
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />
      <div style={{ padding: 18 }}>
        <h3 style={{ fontSize: "1.1rem" }}>{title}</h3>
        <p style={{ marginTop: 8 }}>{description}</p>
        <p style={{ marginTop: 12, fontWeight: 700 }}>From ₹{priceFrom}</p>
        <Link className="btn btn-outline" style={{ marginTop: 14, display: "inline-flex" }} to={`/product/${slug}`}>
          Customize
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
