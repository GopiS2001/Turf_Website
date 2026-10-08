"use client";

import { useSyncExternalStore } from "react";
import { toISODate } from "./pricing";

const subscribe = () => () => {};

/**
 * Today's date (yyyy-MM-dd) from the visitor's clock.
 * Returns null during server rendering and hydration so markup always matches.
 */
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, () => toISODate(new Date()), () => null);
}
