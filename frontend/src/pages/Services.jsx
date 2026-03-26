import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BookOpenText,
  BookText,
  Brush,
  FileImage,
  FileText,
  Notebook,
  PaintBucket,
  PenTool,
  ScanText,
  Sparkles,
  Ticket
} from "lucide-react";
import ServiceCard from "../components/ServiceCard";

const serviceItems = [
  {
    icon: <BookOpenText size={20} />,
    title: "Brochures",
    desc: "Premium brochure prints for marketing and corporate communication.",
    category: "Documents",
    link: "/product/flyers",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    badge: "Popular"
  },
  {
    icon: <FileImage size={20} />,
    title: "Flyers",
    desc: "High-quality flyer printing for promotions and events.",
    category: "Documents",
    link: "/product/flyers",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: <Ticket size={20} />,
    title: "Visiting Cards",
    desc: "Professional visiting cards with modern finishing options.",
    category: "Cards",
    link: "/product/visiting-cards",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller"
  },
  {
    icon: <BookText size={20} />,
    title: "Booklets",
    desc: "Durable, clean booklet printing for catalogs and manuals.",
    category: "Documents",
    link: "/product/spiral-binding",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: <Sparkles size={20} />,
    title: "Invitation Cards",
    desc: "Premium invitation card printing for every occasion.",
    category: "Invitations",
    link: "/product/wedding-cards",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    badge: "Offer"
  },
  {
    icon: <PenTool size={20} />,
    title: "Customized Invitation Cards",
    desc: "Fully customized invitation design and print combinations.",
    category: "Invitations",
    link: "/product/wedding-cards",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: <FileText size={20} />,
    title: "Textbook Printing",
    desc: "Clear and long-lasting textbook printing solutions.",
    category: "Documents",
    link: "/product/spiral-binding",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: <Notebook size={20} />,
    title: "Notebook Printing",
    desc: "Custom notebook printing for schools and businesses.",
    category: "Documents",
    link: "/product/spiral-binding",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: <ScanText size={20} />,
    title: "Digital Printing",
    desc: "Fast digital printing for urgent and short-run jobs.",
    category: "Documents",
    link: "/product/flyers",
    image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: <Brush size={20} />,
    title: "Designing Services",
    desc: "Creative design support from concept to print-ready files.",
    category: "Documents",
    link: "/contact",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80"
  },
  {
    icon: <PaintBucket size={20} />,
    title: "Custom Printing Solutions",
    desc: "Special print jobs tailored to your exact requirements.",
    category: "Documents",
    link: "/upload-print",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80"
  }
];

function Services() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") || "").trim().toLowerCase();
  const category = (searchParams.get("category") || "All").trim();

  const filteredServiceItems = useMemo(() => {
    return serviceItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section className="section">
      <div className="container">
        <h1 className="reveal" style={{ fontSize: "2.4rem" }}>Print Services</h1>
        <p className="reveal" style={{ marginTop: 10, maxWidth: 650 }}>
          Choose a category and start your order in minutes with live pricing and upload support.
        </p>

        {(query || category !== "All") && (
          <p className="reveal" style={{ marginTop: 12, fontWeight: 600 }}>
            Showing {filteredServiceItems.length} result(s)
            {query ? ` for "${searchParams.get("query")}"` : ""}
            {category !== "All" ? ` in ${category}` : ""}
          </p>
        )}

        <div className="grid" style={{ marginTop: 28, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {filteredServiceItems.map((item) => (
            <div key={item.title}>
              <ServiceCard
                icon={item.icon}
                title={item.title}
                description={item.desc}
                image={item.image}
                badge={item.badge}
                link={item.link}
              />
              <Link className="btn btn-outline reveal" style={{ marginTop: 12, display: "inline-flex" }} to={item.link}>
                View Products
              </Link>
            </div>
          ))}
        </div>

        {filteredServiceItems.length === 0 && (
          <div className="card reveal" style={{ marginTop: 24, padding: 18 }}>
            <p style={{ fontWeight: 600 }}>No services matched your search.</p>
            <p style={{ marginTop: 6 }}>Try a different keyword or switch category to All.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
