import { en } from "./en";

export const translations = {
  en
} as const;

export type Language = "en";
export type TranslationType = typeof en;
