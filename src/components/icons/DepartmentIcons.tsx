type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

function StarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3.5 2.4 5 5.4.6-4 3.8 1 5.6-4.8-2.6-4.8 2.6 1-5.6-4-3.8 5.4-.6Z" />
    </Svg>
  );
}
function BriefcaseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="8" width="17" height="11" rx="1.8" />
      <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
      <path d="M3.5 13.5h17" />
    </Svg>
  );
}
function BuildingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.2" />
      <path d="M8.5 7.5h1M14.5 7.5h1M8.5 11.5h1M14.5 11.5h1M8.5 15.5h1M14.5 15.5h1" />
      <path d="M10 20.5v-3.2h4v3.2" />
    </Svg>
  );
}
function AuditIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 3.5h7l3 3v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5v3h3" />
      <circle cx="10.3" cy="14" r="2.2" />
      <path d="m12 15.8 1.7 1.7" />
    </Svg>
  );
}
function EngineeringIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4 20 6.5-13 3 6-3 6H4Z" />
      <path d="M13.5 13 17 6l3.5 7" />
      <path d="M8.7 11h3.6" />
    </Svg>
  );
}
function CoinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5v9M9.7 9.5c0-1 1-1.7 2.3-1.7 1.5 0 2.4.8 2.4 1.7 0 2.3-4.7 1-4.7 3.3 0 1 1 1.9 2.4 1.9s2.4-.7 2.4-1.7" />
    </Svg>
  );
}
function HouseCoinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5" />
      <circle cx="12" cy="15" r="2.1" />
    </Svg>
  );
}
function BookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5c2-1 5-1.3 8 0 3-1.3 6-1 8 0v13c-2-1-5-1.3-8 0-3-1.3-6-1-8 0v-13Z" />
      <path d="M12 5.5v13" />
    </Svg>
  );
}
function OpenBookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 6.5c-1.6-1.3-4-1.8-7.5-1.5v13c3.5-.3 5.9.2 7.5 1.5 1.6-1.3 4-1.8 7.5-1.5v-13c-3.5-.3-5.9.2-7.5 1.5Z" />
      <path d="M12 6.5v13" />
    </Svg>
  );
}
function BroomIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m14 4-8.5 8.5" />
      <path d="M12.5 6.5 17.5 11.5" />
      <path d="M5.5 12.5 3 20l7.5-2.5c1.2-1.2 1.2-3.1 0-4.3-1.2-1.2-3.1-1.2-4.3 0Z" />
    </Svg>
  );
}
function CartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 4.5h2l2.3 11.2a1.5 1.5 0 0 0 1.5 1.3h7a1.5 1.5 0 0 0 1.5-1.2l1.4-7.3H6.3" />
      <circle cx="9.5" cy="19.5" r="1.2" />
      <circle cx="17" cy="19.5" r="1.2" />
    </Svg>
  );
}
function HeartHandsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 19s-6.5-3.9-6.5-8.6c0-2.2 1.7-3.7 3.6-3.7 1.2 0 2.3.6 2.9 1.6.6-1 1.7-1.6 2.9-1.6 1.9 0 3.6 1.5 3.6 3.7C18.5 15.1 12 19 12 19Z" />
    </Svg>
  );
}
function ScaleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5v17M7 6.5h10" />
      <path d="M7 6.5 4 12.5h6L7 6.5ZM17 6.5l-3 6h6l-3-6Z" />
      <path d="M4 12.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5M14 12.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5" />
      <path d="M8.5 20.5h7" />
    </Svg>
  );
}
function MindIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9.5" r="6" />
      <path d="M12 3.5a4 4 0 0 1 3 6.7" />
      <path d="m9.5 9 1.7 1.7 3-3" />
    </Svg>
  );
}
function GroupIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="8.5" cy="8.5" r="2.6" />
      <circle cx="16" cy="9.5" r="2.1" />
      <path d="M3.5 19c0-2.9 2.2-5 5-5s5 2.1 5 5" />
      <path d="M14.5 14.7c2.2.3 3.8 2.1 3.8 4.3" />
    </Svg>
  );
}
function BallIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 4.5v15M4.5 12h15M6.5 6.8c2.8 2.6 8.2 2.6 11 0M6.5 17.2c2.8-2.6 8.2-2.6 11 0" />
    </Svg>
  );
}
function ShieldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6.5v5c0 4.4-2.9 7.2-7 8.5-4.1-1.3-7-4.1-7-8.5v-5L12 3.5Z" />
    </Svg>
  );
}
function ShieldCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6.5v5c0 4.4-2.9 7.2-7 8.5-4.1-1.3-7-4.1-7-8.5v-5L12 3.5Z" />
      <path d="m9.3 12 1.9 1.9L15 10" />
    </Svg>
  );
}
function FolderIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-11Z" />
    </Svg>
  );
}
function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 4.5h3l1.3 3.3-1.7 1.7a10 10 0 0 0 5.4 5.4l1.7-1.7 3.3 1.3v3a1 1 0 0 1-1 1.1C10.5 19.3 4.7 13.5 4.4 6.5a1 1 0 0 1 1.1-2Z" />
    </Svg>
  );
}
function TenderIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h7l4 4v12.5a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-15.5a1 1 0 0 1 1-1Z" />
      <path d="M13.5 3.5v4h4" />
      <path d="M9 17.5 15 11" />
      <circle cx="9.6" cy="11.6" r="0.9" />
      <circle cx="14.4" cy="16.9" r="0.9" />
    </Svg>
  );
}
function FormIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.2" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
    </Svg>
  );
}
function CreditCardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="1.6" />
      <path d="M3.5 10h17" />
      <path d="M6.5 14.5h4" />
    </Svg>
  );
}
function ChatIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4 3.5v-3.5H4.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
    </Svg>
  );
}
function MegaphoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10.5v3a1 1 0 0 0 1 1h1.5l7 3.5v-12l-7 3.5H5a1 1 0 0 0-1 1Z" />
      <path d="M13.5 8.2a4.3 4.3 0 0 1 0 7.6" />
      <path d="M7.2 14.5 8 19h-2l-1.3-4.3" />
    </Svg>
  );
}
function CertificateIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m9.5 9.3 1.7 1.7 3-3.2" />
      <path d="m9 14.3-1.3 6 4.3-2.3 4.3 2.3-1.3-6" />
    </Svg>
  );
}
function LinkIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 7.5 12.7 5.8a3 3 0 0 1 4.2 4.2L15.2 11.7" />
      <path d="M13 16.5 11.3 18.2a3 3 0 0 1-4.2-4.2L8.8 12.3" />
    </Svg>
  );
}
function SirenIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 13.5a6 6 0 0 1 12 0v3H6v-3Z" />
      <path d="M12 5v2M7 6.5l1 1.5M17 6.5l-1 1.5" />
      <path d="M5 19.5h14" />
    </Svg>
  );
}
function InfoCircleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}
function HandshakeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 10.5 8 7l3.2 2.4L14 7l6.5 3.5" />
      <path d="m9 11 2.6 2.6c.6.6 1.6.6 2.2 0 .6-.6.6-1.6 0-2.2" />
      <path d="M4 14v-3.5M20 14v-3.5" />
    </Svg>
  );
}
function HistoryIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 8.5A8 8 0 1 1 4 14" />
      <path d="M4.5 4.5v4h4" />
      <path d="M12 8.5V12l3 2" />
    </Svg>
  );
}
function EyeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Svg>
  );
}
function ReportIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.2" />
      <path d="M8.5 16v-3M12 16v-5M15.5 16v-2" />
    </Svg>
  );
}
function MinutesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5.5" y="4.5" width="13" height="16" rx="1.2" />
      <path d="M9 4.5V3.5h6v1" />
      <path d="m8.5 12 1.7 1.7L13.5 10.5" />
      <path d="M8.5 16.5h7" />
    </Svg>
  );
}
function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3.2 2" />
    </Svg>
  );
}
function OrgChartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M12 7.5v4M12 11.5H6v4.5M12 11.5h6v4.5" />
    </Svg>
  );
}

const RULES: [RegExp, React.ComponentType<IconProps>][] = [
  [/לשכת ראש/, StarIcon],
  [/מנכ|מזכיר/, BriefcaseIcon],
  [/הנהלת/, BuildingIcon],
  [/מבקר/, AuditIcon],
  [/הנדסה/, EngineeringIcon],
  [/גזברות/, CoinIcon],
  [/ארנונה/, HouseCoinIcon],
  [/הספרי/, OpenBookIcon],
  [/חינוך/, BookIcon],
  [/תברואה/, BroomIcon],
  [/רכש/, CartIcon],
  [/רווחה/, HeartHandsIcon],
  [/משפטית/, ScaleIcon],
  [/פסיכולוגי/, MindIcon],
  [/נוער|צעירים/, GroupIcon],
  [/ספורט/, BallIcon],
  [/שיטור/, ShieldIcon],
  [/ביטחון/, ShieldCheckIcon],
  [/טלפונים/, PhoneIcon],
  [/מכרזים/, TenderIcon],
  [/טפסים/, FormIcon],
  [/תשלומים/, CreditCardIcon],
  [/פניות/, ChatIcon],
  [/תלונות/, MegaphoneIcon],
  [/אישור/, CertificateIcon],
  [/קישורים/, LinkIcon],
  [/פיקוד העורף|הנחיות/, SirenIcon],
  [/הסברה/, InfoCircleIcon],
  [/נעים להכיר/, HandshakeIcon],
  [/על המועצה/, BuildingIcon],
  [/היסטוריה/, HistoryIcon],
  [/חזון/, EyeIcon],
  [/מידע כללי/, InfoCircleIcon],
  [/חוקי עזר/, ScaleIcon],
  [/דו.?חות/, ReportIcon],
  [/פרוטוקול|ישיבות/, MinutesIcon],
  [/שעות קבלה/, ClockIcon],
  [/מבנה הארגוני|ארגוני/, OrgChartIcon],
];

export function departmentIcon(label: string): React.ComponentType<IconProps> {
  for (const [pattern, Icon] of RULES) {
    if (pattern.test(label)) return Icon;
  }
  return FolderIcon;
}
