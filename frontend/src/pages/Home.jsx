import { Link } from "react-router-dom";
import {
  BookOpenText,
  BookText,
  Brush,
  FileImage,
  FileText,
  Layers,
  Notebook,
  PaintBucket,
  PenTool,
  ScanText,
  Sparkles,
  Ticket,
  Upload,
  SlidersHorizontal,
  CircleCheck,
  Truck,
  Quote
} from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import ProductCard from "../components/ProductCard";

const services = [
  {
    icon: <BookOpenText size={22} />,
    title: "Brochures",
    description: "Premium brochure printing for marketing and company profiles.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    badge: "Popular",
    link: "/product/flyers"
  },
  {
    icon: <FileImage size={22} />,
    title: "Flyers",
    description: "High-impact flyer prints for promotions and local campaigns.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80",
    link: "/product/flyers"
  },
  {
    icon: <Ticket size={22} />,
    title: "Visiting Cards",
    description: "Sharp, elegant visiting cards with clean premium finishes.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
    link: "/product/visiting-cards"
  },
  {
    icon: <BookText size={22} />,
    title: "Booklets",
    description: "Neatly bound booklet printing for catalogs and guides.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    link: "/product/spiral-binding"
  },
  {
    icon: <Sparkles size={22} />,
    title: "Invitation Cards",
    description: "Elegant invitation card printing for events and occasions.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    badge: "Offer",
    link: "/product/wedding-cards"
  },
  {
    icon: <PenTool size={22} />,
    title: "Customized Invitation Cards",
    description: "Custom invitation designs and print combinations as requested.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80",
    link: "/product/wedding-cards"
  },
  {
    icon: <FileText size={22} />,
    title: "Textbook Printing",
    description: "Clear and durable textbook printing with quality paper options.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    link: "/product/spiral-binding"
  },
  {
    icon: <Notebook size={22} />,
    title: "Notebook Printing",
    description: "Custom notebook printing for schools, offices, and institutions.",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
    link: "/product/spiral-binding"
  },
  {
    icon: <ScanText size={22} />,
    title: "Digital Printing",
    description: "Fast digital printing for short runs with precise color output.",
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=80",
    link: "/product/flyers"
  },
  {
    icon: <Brush size={22} />,
    title: "Designing Services",
    description: "Professional print-ready design support for every service.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80",
    link: "/contact"
  },
  {
    icon: <PaintBucket size={22} />,
    title: "Custom Printing Solutions",
    description: "Tailored print solutions for unique sizes, stocks, and needs.",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    link: "/upload-print"
  }
];

const featuredServices = [
  {
    title: "Visiting Cards",
    description: "Premium card finishing options for professional first impressions.",
    priceFrom: 199,
    slug: "visiting-cards",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Invitation Cards",
    description: "Elegant invitation printing with custom layout and paper choices.",
    priceFrom: 499,
    slug: "wedding-cards",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Booklets",
    description: "Crisp multi-page booklet printing with reliable turnaround.",
    priceFrom: 299,
    slug: "spiral-binding",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Digital Printing",
    description: "High-speed digital output for urgent and short-run requirements.",
    priceFrom: 149,
    slug: "flyers",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1000&q=80"
  }
];

const testimonials = [
  {
    name: "Ananya R.",
    text: "Super quick turnaround and excellent print quality for our event materials."
  },
  {
    name: "Apex Interiors",
    text: "Our visiting cards and brochures looked premium. Great support team as well."
  },
  {
    name: "Vikram K.",
    text: "The upload process is simple and delivery was right on time."
  }
];

function Home() {
  return (
    <>
      <section className="section" style={{ position: "relative", background: "linear-gradient(180deg, #ffffff, #f5f5f5)" }}>
        <div className="arc-decoration">
          <span className="arc arc-cyan animate-drift" />
          <span className="arc arc-magenta animate-drift" />
          <span className="arc arc-yellow animate-drift" />
        </div>
        <div className="container hero-layout" style={{ position: "relative" }}>
          <div className="reveal" style={{ maxWidth: 680 }}>
            <p style={{ color: "#00AEEF", fontWeight: 700, marginBottom: 10 }}>
              Universal Printers
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.05 }}>
              Fast &amp; Reliable Printing Solutions
            </h1>
            <p style={{ marginTop: 18, fontSize: "1.12rem" }}>
              All Your Printing Needs in One Place.
            </p>
            <p style={{ marginTop: 8, color: "#EC008C", fontWeight: 600 }}>
              Quality &amp; Service is Our Motto
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <Link to="/upload-print" className="btn btn-primary">Upload &amp; Print Now</Link>
              <Link to="/services" className="btn btn-outline">View Services</Link>
            </div>

            <div className="hero-chip-row reveal visible" style={{ marginTop: 22 }}>
              <Link className="hero-chip" to="/product/flyers">Brochures</Link>
              <Link className="hero-chip" to="/product/visiting-cards">Visiting Cards</Link>
              <Link className="hero-chip" to="/product/wedding-cards">Invitation Cards</Link>
              <Link className="hero-chip" to="/product/flyers">Digital Printing</Link>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="hero-stat-card">
              <h3>10K+</h3>
              <p>Orders completed with quality assurance and on-time delivery.</p>
            </div>
            <div className="hero-stat-card">
              <h3>100+ Services</h3>
              <p>More than 100 printing and design services are live now.</p>
            </div>
            <div className="hero-gradient-orb" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="reveal" style={{ fontSize: "2rem" }}>Our Services</h2>
          <p className="reveal" style={{ marginTop: 10, maxWidth: 620 }}>
            Professional print solutions designed for speed, consistency, and brand impact.
          </p>
          <div className="grid" style={{ marginTop: 24, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {services.map((item) => (
              <ServiceCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fafafa" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontSize: "2rem" }}>How It Works</h2>
          <div className="grid" style={{ marginTop: 26, gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
            {[
              { icon: <Upload size={22} />, step: "Upload File" },
              { icon: <SlidersHorizontal size={22} />, step: "Choose Options" },
              { icon: <CircleCheck size={22} />, step: "Confirm Order" },
              { icon: <Truck size={22} />, step: "Get Printed" }
            ].map((node) => (
              <div className="card reveal" key={node.step} style={{ padding: 20, textAlign: "center" }}>
                <div style={{ color: "#EC008C" }}>{node.icon}</div>
                <h3 style={{ marginTop: 10, fontSize: "1.1rem" }}>{node.step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="reveal" style={{ fontSize: "2rem" }}>Featured Services</h2>
          <div className="grid" style={{ marginTop: 24, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {featuredServices.map((item) => (
              <ProductCard key={item.slug} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fafafa" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontSize: "2rem" }}>What Customers Say</h2>
          <div className="grid" style={{ marginTop: 24, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {testimonials.map((item) => (
              <div key={item.name} className="card reveal" style={{ padding: 20 }}>
                <Quote color="#00AEEF" />
                <p style={{ marginTop: 10 }}>{item.text}</p>
                <p style={{ marginTop: 12, fontWeight: 700, color: "#111" }}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card reveal" style={{
            padding: "32px 28px",
            background: "linear-gradient(120deg, rgba(0,174,239,0.12), rgba(236,0,140,0.08))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap"
          }}>
            <div>
              <h2>Need Bulk Printing?</h2>
              <p style={{ marginTop: 8 }}>Get custom business pricing and priority support.</p>
            </div>
            <a
              href="tel:+917675996511"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Contact Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
