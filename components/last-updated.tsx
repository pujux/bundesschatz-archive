"use client";

import { formatRelative } from "date-fns";
import { useMemo, useSyncExternalStore } from "react";

type LastUpdatedProps = {
  lastModifiedISO: string;
};

const emptySubscribe = () => () => {};

export function LastUpdated({ lastModifiedISO }: LastUpdatedProps) {
  const lastModified = useMemo(() => new Date(lastModifiedISO), [lastModifiedISO]);

  // The relative wording depends on the reader's clock and timezone, so it can
  // only be rendered after hydration — the prerendered fallback must be
  // deterministic or hydration fails.
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <p
      className="text-sm text-muted-foreground"
      aria-label="Last updated timestamp"
      title={hydrated ? lastModified.toLocaleString() : undefined}
    >
      Last updated{" "}
      <time dateTime={lastModifiedISO}>
        {hydrated ? formatRelative(lastModified, new Date(), { weekStartsOn: 1 }) : lastModifiedISO.slice(0, 10)}
      </time>
    </p>
  );
}
