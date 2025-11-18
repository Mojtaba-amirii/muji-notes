import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  return error instanceof Error
    ? { errorMessage: error.message }
    : { errorMessage: "An unknown error occurred." };
};
