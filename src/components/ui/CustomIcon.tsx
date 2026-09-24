import React from "react";

export type CustomIconName = 
  | "dokument-umowa"
  | "dom-serce"
  | "gwiazdka-ocena"
  | "lapa-duzy-kot"
  | "lista-oczekujacych"
  | "miska-zywienie"
  | "ogrod-wybieg"
  | "pinezka-lokalizacja"
  | "rodzina-dzieci"
  | "serce"
  | "tarcza-zdrowie"
  | "telefon"
  | "waga"
  | "wideo"
  | "wykres-wzrost"
  | "zegar-godziny";

const ICON_PATHS: Record<CustomIconName, React.ReactNode> = {
  "dokument-umowa": (
    <>
      <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
  <path d="M14 3v4h4"/>
  <path d="M8.5 13l2 2 4-4"/>
    </>
  ),
  "dom-serce": (
    <>
      <path d="M4 11.2L12 4l8 7.2"/>
  <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"/>
  <path d="M12 17.4c-1.9-1.2-3.5-2.5-3.5-4.3 0-1.1.9-2 2-2 .9 0 1.5.5 1.5 .5s.6-.5 1.5-.5c1.1 0 2 .9 2 2 0 1.8-1.6 3.1-3.5 4.3z"/>
    </>
  ),
  "gwiazdka-ocena": (
    <>
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>
    </>
  ),
  "lapa-duzy-kot": (
    <>
      <ellipse cx="12" cy="16.2" rx="5" ry="4"/>
  <circle cx="5.8" cy="9.3" r="2"/>
  <circle cx="10.6" cy="6.2" r="2"/>
  <circle cx="15.4" cy="6.2" r="2"/>
  <circle cx="18.2" cy="9.3" r="2"/>
    </>
  ),
  "lista-oczekujacych": (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2"/>
  <path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1z"/>
  <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4"/>
    </>
  ),
  "miska-zywienie": (
    <>
      <path d="M3.5 12h17a7.5 6 0 0 1-17 0z"/>
  <path d="M6 12c0-3 2.5-5 6-5s6 2 6 5"/>
    </>
  ),
  "ogrod-wybieg": (
    <>
      <path d="M12 21c0-6.2 3-9.4 8.2-10.4-1 6.2-4.2 9.4-8.2 10.4z"/>
  <path d="M12 21c0-6.2-3-9.4-8.2-10.4 1 6.2 4.2 9.4 8.2 10.4z"/>
  <path d="M12 21V8.5"/>
    </>
  ),
  "pinezka-lokalizacja": (
    <>
      <path d="M12 21s7-7.2 7-12a7 7 0 0 0-14 0c0 4.8 7 12 7 12z"/>
  <circle cx="12" cy="9" r="2.3"/>
    </>
  ),
  "rodzina-dzieci": (
    <>
      <circle cx="8" cy="7" r="2.6"/>
  <path d="M3.2 19.2c0-3.2 2.1-5.4 4.8-5.4s4.8 2.2 4.8 5.4"/>
  <circle cx="17.2" cy="9.4" r="2"/>
  <path d="M13.4 19.2c0-2.7 1.7-4.3 3.8-4.3s3.8 1.6 3.8 4.3"/>
    </>
  ),
  "serce": (
    <>
      <path d="M12 20s-7.2-4.5-9.5-9C1.1 8 2.6 4.8 5.8 4.8c1.9 0 3.3 1 4.2 2.3 0.9-1.3 2.3-2.3 4.2-2.3 3.2 0 4.7 3.2 3.3 6.2-2.3 4.5-9.5 9-9.5 9z"/>
    </>
  ),
  "tarcza-zdrowie": (
    <>
      <path d="M12 3.2l7 2.8v5c0 4.6-3 8.2-7 10-4-1.8-7-5.4-7-10v-5l7-2.8z"/>
  <path d="M8.8 12.2l2.1 2.1 4.3-4.3"/>
    </>
  ),
  "telefon": (
    <>
      <path d="M5 4h3.2l1.3 4-2 1.4a12 12 0 0 0 5.1 5.1l1.4-2 4 1.3V17a2 2 0 0 1-2.2 2C10.6 18.6 5.4 13.4 5 8.2A2 2 0 0 1 5 4z"/>
    </>
  ),
  "waga": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3"/>
  <path d="M12 15l3-4"/>
  <circle cx="12" cy="15" r="1"/>
    </>
  ),
  "wideo": (
    <>
      <rect x="3" y="6.5" width="12" height="11" rx="2"/>
  <path d="M15 10.2l6-3v9.6l-6-3z"/>
    </>
  ),
  "wykres-wzrost": (
    <>
      <path d="M4 17l5-5 3 3 7-8"/>
  <path d="M15 6h4v4"/>
    </>
  ),
  "zegar-godziny": (
    <>
      <circle cx="12" cy="12" r="8.5"/>
  <path d="M12 7.5V12l3.2 2"/>
    </>
  )
};

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  name: CustomIconName;
  className?: string;
  size?: number | string;
}

export default function CustomIcon({ name, className = "w-5 h-5", size, ...props }: CustomIconProps) {
  const content = ICON_PATHS[name];
  if (!content) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      {...props}
    >
      {content}
    </svg>
  );
}
