//@/utils/formatDate.ts

/**
 * Format a date to a readable string in French locale
 * @param date Date object or string to format
 * @returns Formatted date string (e.g. "15 janvier 2023 à 14:30")
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/**
 * Truncate text to a specified length and add ellipsis if needed
 * @param text Text to truncate
 * @param length Maximum length before truncation
 * @returns Truncated text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Generate a gradient color based on a string input (for avatars, etc.)
 * @param str Input string
 * @returns CSS gradient string
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return `linear-gradient(135deg, hsl(${h}, 80%, 65%), hsl(${
    h + 30
  }, 80%, 65%))`;
}

/**
 * Capitalize the first letter of a string
 * @param str String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get the initials from a full name
 * @param name Full name
 * @returns Initials (e.g. "John Doe" → "JD")
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
}

/**
 * Convert a string to a URL-friendly slug
 * @param text Text to convert
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get the domain from a URL
 * @param url Full URL
 * @returns Domain name
 */
export function getDomain(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
  } catch {
    return "";
  }
}

/**
 * Format a number with space as thousand separator (French style)
 * @param num Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("fr-FR").format(num);
}

/**
 * Debounce a function
 * @param func Function to debounce
 * @param wait Debounce delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
