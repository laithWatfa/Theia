"use client";
import { useTranslations } from "next-intl";

export default function Spinner() {
    const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-20 text-primary-800">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-primary-800 border-t-transparent rounded-full animate-spin translate-y-30" />

      {/* Label */}
      <p className="mt-4 font-semibold text-lg text-primary-800 animate-pulse translate-y-30">
        {t("loading")}...
      </p>
    </div>
  );
}
