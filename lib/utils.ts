import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeStamp(date: Date): string {
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.floor(secondsPast)} seconds ago`;
  } else if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  } else if (secondsPast <= 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  } else if (secondsPast <= 2592000) {
    return `${Math.floor(secondsPast / 86400)} days ago`;
  } else if (secondsPast <= 31104000) {
    return `${Math.floor(secondsPast / 2592000)} months ago`;
  } else {
    return `${Math.floor(secondsPast / 31104000)} years ago`;
  }
}

export function pluralize(count: number, word: string) {
  return `${count} ${count === 1 ? word : word + "s"}`;
}
