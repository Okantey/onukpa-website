const phoneNumber = "+233245095569";
const message = "Hi";

const handleWhatsAppClick = () => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export default handleWhatsAppClick;
