import {
  Landmark,
  GraduationCap,
  IdCard,
  MessagesSquare,
  Megaphone,
  ShieldAlert,
  Gavel,
  Headset,
  FileText,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

function Badge({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return (
    <span
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-105 sm:h-14 sm:w-14"
      style={{
        background: `linear-gradient(155deg, ${color}22 0%, ${color}0a 100%)`,
        boxShadow: `0 4px 14px ${color}26, inset 0 0 0 1px ${color}29`,
      }}
    >
      <Icon size={22} strokeWidth={1.75} color={color} aria-hidden="true" />
    </span>
  );
}

/** 1. תשלום ארנונה — municipal building/landmark — bronze */
export function PropertyTaxIcon() {
  return <Badge icon={Landmark} color="#a8641f" />;
}

/** 2. רישום לחינוך — graduation cap — green */
export function EducationIcon() {
  return <Badge icon={GraduationCap} color="#1fa15a" />;
}

/** 3. אישור תושב — resident ID card — blue */
export function ResidentCertificateIcon() {
  return <Badge icon={IdCard} color="#2f6fed" />;
}

/** 4. פניות הציבור — messages — purple */
export function PublicInquiriesIcon() {
  return <Badge icon={MessagesSquare} color="#8b5cf6" />;
}

/** 5. תלונות הציבור — megaphone — orange */
export function PublicComplaintsIcon() {
  return <Badge icon={Megaphone} color="#e2711d" />;
}

/** 6. ביטחון וחירום — shield alert — red (emergency) */
export function SecurityEmergencyIcon() {
  return <Badge icon={ShieldAlert} color="#dc2626" />;
}

/** 7. מכרזים — gavel — indigo-navy */
export function TendersIcon() {
  return <Badge icon={Gavel} color="#4f5b93" />;
}

/** 8. מוקד שירות — support headset — cyan */
export function ServiceCenterIcon() {
  return <Badge icon={Headset} color="#0ea5b7" />;
}

/** 9. טפסים — document/form — slate */
export function FormsIcon() {
  return <Badge icon={FileText} color="#64748b" />;
}

/** 10. תשלומים — payment card — pink */
export function PaymentsIcon() {
  return <Badge icon={CreditCard} color="#db2777" />;
}
