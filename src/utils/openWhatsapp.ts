const phoneNumber = "+233245095569";
const message = "Hi Onukpa! I need help finding a place to rent";

const handleWhatsAppClick = () => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export default handleWhatsAppClick;
