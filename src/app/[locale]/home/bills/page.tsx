"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { MdToday as DateIcon } from "react-icons/md";
import { FaUser as Patient } from "react-icons/fa";
import { FaMoneyBillWave as BillIcon } from "react-icons/fa";
import { FaCheckCircle as PaidIcon, FaTimesCircle as UnpaidIcon } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { getBills } from "@/lib/users"; 
import { mockBills } from "@/mockdata";
import { Bill } from "@/types/users";

export default function BillsPage() {
  const pathname = usePathname();
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billsData = await getBills();
        setBills(billsData);
      } catch (err) {
        console.error("Error fetching bills", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBills = useMemo(() => {
    return bills.filter((bill) =>
      bill.patient_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [bills, search]);

  return (
    <div className="p-4 max-w-full">
      {/* Search */}
      <div className="flex justify-between items-start gap-2 mb-4">
        <div className="relative mb-6 max-w-md shadow-md">
          <Search
            className="absolute left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchByName")}
            className="text-sm w-full pl-10 pr-3 rtl:pl-3 rtl:pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
      </div>

      {/* Bills List */}
      {loading ? (
        <p>{t("loading")}...</p>
      ) : filteredBills.length === 0 ? (
        <p className="text-gray-500">{t("noResults")}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBills.map((bill) => {
            const date = new Date(bill.created_at);
            const formattedDate = date.toLocaleString(pathname.split("/")[1], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            return (
              <li
                key={bill.id}
                className="text-sm relative flex flex-col bg-white rounded-md px-4 py-2 shadow transition hover:translate-y-[-2px] hover:shadow-lg"
              >

                <h3 className="justify-center border-b border-text-500 w-full text-primary-800 flex items-center gap-1 font-bold text-md mb-2">
                  <Patient /> {bill.patient_name}
                </h3>
                <div className="flex justify-between items center">
                  <p className="font-bold text-lg text-text-600 flex gap-1 text items-center border-text-500 py-[2px]">
                  <BillIcon className="text-mid" />
                  {bill.amount}
                </p>

                <p className={" text-sm flex gap-1 items-center  px-4 rounded-full "+(bill.is_paid ? "bg-light text-green ":"bg-red-700 text-red-900")}>
                  
                  {bill.is_paid ? t("paid") : t("unpaid")}

                </p>

                </div>
                

                
                <p className="flex items-center gap-1  text-[12px] text-primary-800">
                  <DateIcon /> {formattedDate}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
