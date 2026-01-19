"use client";

import { formatRelative } from "date-fns";
import { useMemo } from "react";

type LastUpdatedProps = {
  lastModifiedISO: string;
};

export function LastUpdated({ lastModifiedISO }: LastUpdatedProps) {
  const lastModified = useMemo(() => new Date(lastModifiedISO), [lastModifiedISO]);
  const relative = useMemo(() => formatRelative(lastModified, new Date(), { weekStartsOn: 1 }), [lastModified]);

  return (
    <p className="text-sm text-muted-foreground" aria-label="Last updated timestamp" title={lastModified.toLocaleString()}>
      Last updated <time dateTime={lastModifiedISO}>{relative}</time>
    </p>
  );
}
