"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { IoLogOut } from "react-icons/io5";
import { FaPrescriptionBottleMedical as Treatments } from "react-icons/fa6";
import { MdToday as Appointments } from "react-icons/md";
import { TbEyeTable as Diagnose } from "react-icons/tb";
import { FaMoneyBills as Bills } from "react-icons/fa6";
import { RiSettings3Fill as Settings } from "react-icons/ri";
import { FaUserInjured as Patients } from "react-icons/fa";
import { clearAccessToken } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const sidebarLinks = [
  { path: "patients", label: "patients", icon: Patients },
  { path: "treatments", label: "treatments", icon: Treatments },
  { path: "appointments", label: "appointments", icon: Appointments },
  { path: "diagnose", label: "diagnose", icon: Diagnose },
  { path: "bills", label: "bills", icon: Bills },
  { path: "settings", label: "settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const locale = pathname.split("/")[1] || "en";
  const navRef = useRef<HTMLDivElement>(null);

  // detect RTL
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    setIsRTL(document?.dir === "rtl");
  }, []);

  useEffect(() => {
    const activeEl = navRef.current?.querySelector<HTMLAnchorElement>(
      "a[data-active='true']"
    );
    if (activeEl && navRef.current) {
      navRef.current.style.setProperty("--indicator-top", `${activeEl.offsetTop}px`);
      navRef.current.style.setProperty("--indicator-height", `${activeEl.offsetHeight}px`);
    }
  }, [pathname]);

  return (
    <aside className="w-12 md:w-64 bg-primary-800 text-white flex flex-col fixed inset-y-0 shadow">
      {/* Logo */}
      <div className="flex justify-center border-b border-text-100 px-2 mb-6 h-[45px]">
        <Image
          src="/images/light.png"
          width={300}
          height={300}
          alt="logo"
          className="h-11 w-32 object-cover hidden md:block"
        />
        <span className="flex items-center font-bold text-text-100 md:hidden ">
          T
        </span>
      </div>

      {/* Nav with moving indicator */}
      <nav ref={navRef} className="flex-1 relative">
        <div className="space-y-2">
          {sidebarLinks.map(({ path, label, icon: Icon }) => {
            const href = `/${locale}/home/${path}`;
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-3 px-3 py-2  text-[16px] font-bold transition-colors ${
                  isActive ? "text-primary-300" : "hover:bg-white/10"
                }`}
                data-active={isActive}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:block">{t(label)}</span>
              </Link>
            );
          })}
        </div>

        {/* animated border */}
        <span
          className={`absolute ${
            isRTL ? "right-0" : "left-0"
          } w-[5px] bg-primary-400 transition-all duration-300`}
          style={{
            top: "var(--indicator-top, 0px)",
            height: "var(--indicator-height, 0px)",
          }}
        />
      </nav>

      {/* Logout */}
      <button
        className="flex items-center gap-3 px-3 py-2 rounded-md text-[16px] font-bold hover:text-red-700"
        onClick={() => {
          clearAccessToken();
          router.replace("/", { scroll: false });
        }}
      >
        <IoLogOut className="w-5 h-5" />
        <span className="hidden md:block">{t("logout")}</span>
      </button>
    </aside>
  );
}
