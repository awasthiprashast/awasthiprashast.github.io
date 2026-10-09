"use client";

import { useEffect, useState } from "react";

// Resolved on the client so the statically built page never goes stale.
export function Year() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);
  return <span suppressHydrationWarning>{year ?? ""}</span>;
}
