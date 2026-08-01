type IconProps = { size?: number; className?: string };

function Svg({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** מרכזי מידע — info center */
export function InfoCenterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** מחלקות המועצה — council departments */
export function DepartmentsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20V9.5L12 4l8 5.5V20" />
      <path d="M4 20h16" />
      <path d="M10 20v-5h4v5" />
    </Svg>
  );
}

/** שירות לתושב — resident service */
export function ResidentServiceIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.5c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8" />
    </Svg>
  );
}

/** ביטחון וחירום — security & emergency */
export function SecurityIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6.5v5c0 4.4-2.9 7.2-7 8.5-4.1-1.3-7-4.1-7-8.5v-5L12 3.5Z" />
      <path d="m9.3 12 1.9 1.9L15 10" />
    </Svg>
  );
}
