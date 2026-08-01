const STATUS_LABEL: Record<string, string> = {
  draft: "טיוטה",
  published: "פורסם",
  hidden: "מוסתר",
  scheduled: "מתוזמן",
};

const STATUS_DOT: Record<string, string> = {
  draft: "bg-zinc-400",
  published: "bg-olive-500",
  hidden: "bg-red-500",
  scheduled: "bg-gold-500",
};

const STATUS_BG: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-700",
  published: "bg-olive-500/12 text-olive-700",
  hidden: "bg-red-50 text-red-600",
  scheduled: "bg-gold-100 text-gold-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BG[status] ?? STATUS_BG.draft}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status] ?? STATUS_DOT.draft}`} aria-hidden="true" />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
