"use client";

import { GripVertical } from "lucide-react";

export function DragHandle({ onDragStart, onDragEnd }: { onDragStart: () => void; onDragEnd: () => void }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnd={onDragEnd}
      aria-label="גרירה לשינוי סדר"
      className="cursor-grab touch-none rounded p-1 text-ink-300 transition-colors hover:bg-teal-100 hover:text-teal-900 active:cursor-grabbing"
    >
      <GripVertical size={16} aria-hidden="true" />
    </button>
  );
}
