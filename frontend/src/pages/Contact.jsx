function Contact() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 980 }}>
        <h1 className="reveal" style={{ fontSize: "2.1rem" }}>Contact Universal Printers</h1>
        <p className="reveal" style={{ marginTop: 10 }}>
          Quality &amp; Service is Our Motto. Reach us for quick printing support.
        </p>

        <div className="grid contact-layout" style={{ marginTop: 22, gridTemplateColumns: "1fr 1fr" }}>
          <div className="card reveal" style={{ padding: 20 }}>
            <h3>Reach Us</h3>
            <p style={{ marginTop: 10 }}>Phone 1: +91 7675996511</p>
            <p>Phone 2: +91 9966325680</p>
            <p>Email: support@universalprinters.in</p>
            <p>Address: Universal Printers, Visakhapatnam, India</p>
            <a className="btn btn-primary" style={{ marginTop: 14, display: "inline-flex" }} href="https://wa.me/917675996511" target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>

          <div className="card reveal" style={{ padding: 10 }}>
            <iframe
              title="Universal Printers map"
              style={{ width: "100%", height: 280, border: 0, borderRadius: 14 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=Universal%20Printers%20Visakhapatnam%20India&output=embed"
            />
          </div>
        </div>

        <form className="card reveal" style={{ marginTop: 22, padding: 20, display: "grid", gap: 12 }}>
          <h3>Send an Inquiry</h3>
          <label>
            Name
            <input type="text" placeholder="Your full name" style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }} />
          </label>
          <label>
            Phone
            <input type="tel" placeholder="Your phone number" style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }} />
          </label>
          <label>
            Message
            <textarea rows="4" placeholder="Tell us what you want to print" style={{ width: "100%", marginTop: 6, padding: 11, borderRadius: 10 }} />
          </label>
          <button className="btn btn-primary" type="button" style={{ width: "fit-content" }}>
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
