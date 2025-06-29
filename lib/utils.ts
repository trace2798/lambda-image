import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeText(text: string) {
  return (
    text
      // remove any leftover function‐call placeholder
      .replace("<has_function_call>", "")
      // strip out standalone ![alt](url) image tags
      .replace(/!\[[^\]]*\]\((?:https?:\/\/[^\s)]+)\)/g, "")
      // collapse any accidental double‐spaces or leading/trailing whitespace
      .trim()
      .replace(/ {2,}/g, " ")
  );
}
