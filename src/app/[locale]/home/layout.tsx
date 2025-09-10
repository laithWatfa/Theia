"use client"
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <div className="flex w-full">
      <Sidebar />

      <main className="flex-1   ml-12 md:ml-64 rtl:ml-0 rtl:mr-12 rtl:md:mr-64 w-[calc(100%-44px)] md:w-[calc(100%-256px)]">
        <Header pageName={t(pathname.split("/")[3])} />
        {children}
      </main>
    </div>
  );
}
