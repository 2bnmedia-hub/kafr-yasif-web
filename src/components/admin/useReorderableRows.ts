"use client";

import { useState, useTransition } from "react";

/** Reorders `fullOrder` so the relative order of the ids in `newSubOrder` matches, keeping every other id's position untouched. */
function mergeReorder(fullOrder: number[], newSubOrder: number[]): number[] {
  const subset = new Set(newSubOrder);
  const positions: number[] = [];
  fullOrder.forEach((id, i) => {
    if (subset.has(id)) positions.push(i);
  });
  const result = [...fullOrder];
  positions.forEach((pos, i) => {
    result[pos] = newSubOrder[i];
  });
  return result;
}

export function useReorderableRows(initialIds: number[], allIds: number[], reorderAction: (orderedIds: number[]) => Promise<void>) {
  const [order, setOrder] = useState(initialIds);
  const [knownIds, setKnownIds] = useState(initialIds);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  const incomingKey = initialIds.join(",");
  if (incomingKey !== knownIds.join(",")) {
    setKnownIds(initialIds);
    setOrder(initialIds);
  }

  function handleDragEnter(overId: number) {
    if (draggingId === null || draggingId === overId) return;
    setOrder((prev) => {
      const from = prev.indexOf(draggingId);
      const to = prev.indexOf(overId);
      if (from === -1 || to === -1) return prev;
      const next = [...prev];
      next.splice(from, 1);
      next.splice(to, 0, draggingId);
      return next;
    });
  }

  function handleDrop() {
    if (draggingId === null) return;
    const merged = mergeReorder(allIds, order);
    startTransition(() => {
      reorderAction(merged);
    });
    setDraggingId(null);
  }

  function rowProps(id: number) {
    return {
      className: draggingId === id ? "opacity-40" : "",
      onDragEnter: (e: React.DragEvent) => {
        e.preventDefault();
        handleDragEnter(id);
      },
      onDragOver: (e: React.DragEvent) => e.preventDefault(),
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        handleDrop();
      },
    };
  }

  function handleProps(id: number) {
    return {
      onDragStart: () => setDraggingId(id),
      onDragEnd: () => setDraggingId(null),
    };
  }

  return { order, rowProps, handleProps };
}
