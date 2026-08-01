const iconClass = "h-6 w-6 transition-transform duration-300";

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="#1877F2" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35C16.18 4.3 15.1 4.2 13.85 4.2c-2.6 0-4.35 1.58-4.35 4.5V10.5H7v3h2.5V21h4Z" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className={iconClass} fill="#25D366" aria-hidden="true">
      <path d="M16.004 5.333c-5.891 0-10.671 4.78-10.671 10.671 0 1.883.494 3.72 1.432 5.338l-1.523 5.564a.833.833 0 0 0 1.022 1.022l5.564-1.523a10.63 10.63 0 0 0 5.339 1.432h.004c5.89 0 10.67-4.78 10.67-10.671 0-2.85-1.11-5.53-3.125-7.546a10.6 10.6 0 0 0-7.546-3.125Zm0 1.777c2.376 0 4.606.926 6.284 2.605a8.827 8.827 0 0 1 2.604 6.286c0 4.905-3.99 8.894-8.895 8.894a8.86 8.86 0 0 1-4.51-1.23.888.888 0 0 0-.656-.09l-3.44.942.943-3.443a.889.889 0 0 0-.09-.66 8.86 8.86 0 0 1-1.226-4.507c0-4.906 3.99-8.895 8.894-8.895Zm-3.86 4.088c-.166 0-.437.062-.665.313-.229.25-.874.854-.874 2.083s.895 2.417 1.02 2.585c.126.167 1.75 2.673 4.264 3.665 2.101.83 2.528.664 2.984.622.457-.041 1.474-.6 1.68-1.18.208-.577.208-1.073.146-1.178-.062-.104-.229-.167-.478-.292-.25-.125-1.474-.727-1.703-.81-.229-.083-.395-.125-.562.126-.166.25-.644.81-.79.976-.146.167-.291.188-.541.063-.25-.126-1.054-.389-2.008-1.24-.742-.663-1.243-1.482-1.389-1.732-.146-.25-.016-.386.11-.51.112-.111.25-.292.375-.438.126-.146.166-.25.25-.418.083-.167.041-.313-.021-.438-.062-.125-.562-1.365-.77-1.87-.204-.49-.412-.423-.562-.43a10 10 0 0 0-.487-.008Z" />
    </svg>
  );
}

export function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="#000000" aria-hidden="true">
      <path d="M16.5 3h-2.4v11.3a2.4 2.4 0 1 1-1.8-2.32V9.45a4.8 4.8 0 1 0 4.2 4.76V8.1c.83.6 1.86.97 3 .97V6.68c-1.6 0-2.7-.84-3-2.1V3Z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ig-gradient" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="45%" stopColor="#d62976" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="url(#ig-gradient)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.6" stroke="url(#ig-gradient)" strokeWidth="2" />
      <circle cx="17.8" cy="6.2" r="1.3" fill="url(#ig-gradient)" />
    </svg>
  );
}
