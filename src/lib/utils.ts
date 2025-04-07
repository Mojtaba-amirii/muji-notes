import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  return error instanceof Error
    ? { errorMessage: error.message }
    : { errorMessage: "An unknown error occurred." };
};
