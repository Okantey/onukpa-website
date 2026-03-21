import {
  ONUKPA_WHATSAPP_WA_ME_ID,
  ONUKPA_WA_RENTER_DEFAULT,
} from "../constants/whatsappContact";

export function openWhatsAppPrefilled(message: string): void {
  const whatsappUrl = `https://wa.me/${ONUKPA_WHATSAPP_WA_ME_ID}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
}

const handleWhatsAppClick = () => {
  openWhatsAppPrefilled(ONUKPA_WA_RENTER_DEFAULT);
};

export default handleWhatsAppClick;
