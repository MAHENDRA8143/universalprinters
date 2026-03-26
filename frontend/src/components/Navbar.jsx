import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MapPin, Menu, Search, ShoppingCart, X } from "lucide-react";
import { getCartCount, onCartUpdated } from "../utils/cart";
import { clearCurrentUser, getCurrentUser } from "../utils/auth";
import { useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/upload-print", label: "Upload & Print" },
  { to: "/orders", label: "Track Order" },
  { to: "/contact", label: "Contact" }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const navigate = useNavigate();
  const [deliveryLocation, setDeliveryLocation] = useState(
    () => window.localStorage.getItem("universal_printers_delivery_location") || "Visakhapatnam - 530003"
  );

  useEffect(() => {
    const unsubscribe = onCartUpdated(() => setCartCount(getCartCount()));
    const syncFromStorage = () => {
      setCartCount(getCartCount());
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("auth-updated", syncFromStorage);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("auth-updated", syncFromStorage);
    };
  }, []);

  const handleAuthAction = () => {
    if (currentUser) {
      clearCurrentUser();
      setCurrentUser(null);
      navigate("/orders");
      return;
    }

    navigate("/login");
  };

  const handleChangeLocation = () => {
    const input = window.prompt("Enter delivery location (example: Visakhapatnam - 530003)", deliveryLocation);
    if (!input) {
      return;
    }
    const value = input.trim();
    if (!value) {
      return;
    }
    setDeliveryLocation(value);
    window.localStorage.setItem("universal_printers_delivery_location", value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    const trimmedText = searchText.trim();

    if (trimmedText) {
      params.set("query", trimmedText);
    }
    if (searchCategory !== "All") {
      params.set("category", searchCategory);
    }

    navigate(`/services${params.toString() ? `?${params.toString()}` : ""}`);
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-top">
        <div className="container nav-top-inner">
          <Link to="/" aria-label="Universal Printers home" className="brand-wrap">
            <img src="/logo.png" alt="Universal Printers logo" height="52" />
          </Link>

          <button className="nav-location" aria-label="Service location" type="button" onClick={handleChangeLocation}>
            <MapPin size={15} />
            <span>Delivering to {deliveryLocation}</span>
          </button>

          <form className="nav-search" onSubmit={handleSearchSubmit}>
            <select
              aria-label="Search category"
              value={searchCategory}
              onChange={(event) => setSearchCategory(event.target.value)}
            >
              <option>All</option>
              <option>Cards</option>
              <option>Documents</option>
              <option>Invitations</option>
            </select>
            <input
              type="text"
              placeholder="Search printing services"
              aria-label="Search printing services"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button type="submit" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          <div className="nav-actions">
            <button type="button" className="btn btn-outline" onClick={handleAuthAction}>
              {currentUser ? "Logout" : "Login"}
            </button>
            <Link to="/cart" className="nav-action-link nav-cart-link">
              <ShoppingCart size={18} />
              Cart ({cartCount})
            </Link>
            <Link to="/cart?source=order-now" className="btn btn-primary nav-order-btn">
              Order Now
            </Link>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`nav-bottom ${open ? "open" : ""}`}>
        <div className="container nav-bottom-inner">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
