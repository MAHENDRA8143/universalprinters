import { MessageCircle } from "lucide-react";

function WhatsAppButton() {
  const message = encodeURIComponent("Hello Universal Printers, I need help with my print order.");

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/917675996511?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={18} /> WhatsApp
    </a>
  );
}

export default WhatsAppButton;
