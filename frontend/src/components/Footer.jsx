import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/logo.png" alt="Universal Printers logo" height="52" />
          <p style={{ marginTop: 12 }}>
            Quality &amp; Service is Our Motto. Premium printing for businesses,
            events, and everyday document needs.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/services">Services</Link></p>
          <p><Link to="/upload-print">Upload &amp; Print</Link></p>
          <p><Link to="/orders">Order Tracking</Link></p>
        </div>

        <div>
          <h4>Contact</h4>
          <p><Phone size={14} /> +91 7675996511</p>
          <p><Phone size={14} /> +91 9966325680</p>
          <p><Mail size={14} /> support@universalprinters.in</p>
          <p><MapPin size={14} /> Universal Printers, Visakhapatnam, India</p>
          <p style={{ marginTop: 8, display: "flex", gap: 10 }}>
            <Facebook size={16} />
            <Instagram size={16} />
            <Linkedin size={16} />
          </p>
        </div>

        <div>
          <h4>Find Us</h4>
          <iframe
            className="footer-map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Universal%20Printers%20Visakhapatnam%20India&output=embed"
            title="Universal Printers location"
          />
        </div>
      </div>
      <div className="container" style={{ marginTop: 24, fontSize: "0.9rem", opacity: 0.75 }}>
        © {new Date().getFullYear()} Universal Printers. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
