import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currency = (num: number) => {
  const numberCurrency = Number(num);
  const formattedValue = numberCurrency.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `GH₵ ${formattedValue}`;
};

// export const getFormattedDateTime = (utcDate: string) => {
//   if (!utcDate) {
//     return "Invalid Date";
//   }

//   const date = new Date(utcDate);

//   if (isNaN(date)) {
//     return "Invalid Date Format";
//   }

//   const options = {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     hour12: true,
//   };

//   const formattedDateTime = date.toLocaleString("en-US", options);
//   return formattedDateTime;
// };
