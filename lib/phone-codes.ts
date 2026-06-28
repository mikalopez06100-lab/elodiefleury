export type PhoneCode = {
  dial: string;
  flag: string;
  label: string;
};

export const phoneCodes: PhoneCode[] = [
  { dial: "+33", flag: "🇫🇷", label: "France" },
  { dial: "+34", flag: "🇪🇸", label: "España" },
  { dial: "+44", flag: "🇬🇧", label: "United Kingdom" },
  { dial: "+1", flag: "🇺🇸", label: "USA / Canada" },
  { dial: "+32", flag: "🇧🇪", label: "Belgique" },
  { dial: "+41", flag: "🇨🇭", label: "Suisse" },
  { dial: "+352", flag: "🇱🇺", label: "Luxembourg" },
  { dial: "+351", flag: "🇵🇹", label: "Portugal" },
  { dial: "+39", flag: "🇮🇹", label: "Italia" },
  { dial: "+49", flag: "🇩🇪", label: "Deutschland" },
  { dial: "+212", flag: "🇲🇦", label: "Maroc" },
  { dial: "+52", flag: "🇲🇽", label: "México" },
  { dial: "+54", flag: "🇦🇷", label: "Argentina" },
  { dial: "+56", flag: "🇨🇱", label: "Chile" },
  { dial: "+57", flag: "🇨🇴", label: "Colombia" },
  { dial: "+51", flag: "🇵🇪", label: "Perú" },
  { dial: "+55", flag: "🇧🇷", label: "Brasil" },
  { dial: "+593", flag: "🇪🇨", label: "Ecuador" },
  { dial: "+598", flag: "🇺🇾", label: "Uruguay" },
];

export function defaultDialCode(locale: string): string {
  if (locale === "es") return "+34";
  if (locale === "en") return "+44";
  return "+33";
}

export function formatFullPhone(dial: string, number: string): string {
  const digits = number.replace(/\D/g, "");
  return `${dial}${digits}`;
}
