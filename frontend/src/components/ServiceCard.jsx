import { Link } from "react-router-dom";

function ServiceCard({ icon, title, description, image, badge, link }) {
  const content = (
    <article
      className="card reveal service-hover"
      style={{ overflow: "hidden", transition: "all 0.26s ease", border: "1px solid transparent" }}
    >
      {image && (
        <div style={{ position: "relative" }}>
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: 150, objectFit: "cover" }}
          />
          {badge && (
            <span
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                background: "#FFF200",
                color: "#111111",
                fontWeight: 700,
                fontSize: "0.76rem",
                borderRadius: 999,
                padding: "6px 10px"
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: 22 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          display: "grid",
          placeItems: "center",
          background: "rgba(0, 174, 239, 0.1)",
          color: "#00AEEF"
        }}
      >
        {icon}
      </div>
      <h3 style={{ marginTop: 16, fontSize: "1.2rem" }}>{title}</h3>
      <p style={{ marginTop: 10 }}>{description}</p>
      </div>
    </article>
  );

  if (link) {
    return (
      <Link to={link} aria-label={`Open ${title}`}>
        {content}
      </Link>
    );
  }

  return content;
}

export default ServiceCard;
