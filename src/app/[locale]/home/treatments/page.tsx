"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { MdToday as Appointments } from "react-icons/md";
import { FaUserInjured as Patient } from "react-icons/fa";
import IconCare from "@/components/IconCare";
import IconSurgery from "@/components/IconSurgery";
import { FaPrescriptionBottleMedical as Medication , FaSyringe as Dosage ,  } from "react-icons/fa6";
import { getTreatments } from "@/lib/users"; 
import { usePathname } from "next/navigation";
import { Treatment } from "@/types/users";
import { mockTreatments } from "@/mockdata";



export default function TreatmentsPage() {
  const pathname = usePathname()
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const treatmentsData = await getTreatments();
        setTreatments(treatmentsData);
      } catch (err) {
        console.error("Error fetching treatments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter by patient name
  const filteredTreatments = useMemo(() => {
    return treatments.filter((treat) =>
      treat.patient_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [treatments, search]);

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

      {/* Treatments List */}
      {loading ? (
        <p>{t("loading")}...</p>
      ) : filteredTreatments.length === 0 ? (
        <p className="text-gray-500">{t("noResults")}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTreatments.map((treat) => {
            const date = new Date(treat.created_at);
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
                key={treat.id}
                className="text-sm relative flex flex-col bg-text-600 rounded-md px-4 py-2 shadow transition hover:translate-y-[-2px] hover:shadow-lg bg-white"
              >
                <p className="absolute top-1 right-2 rtl:left-2 rtl:right-auto flex items-center gap-1 rtl:flex-row-reverse text-[12px] text-primary-800">
                  <Appointments/>{formattedDate}
                  </p>
                <h3 className="text-primary-800 flex items-center gap-1 font-bold text-md">
                  <Patient className="" />{treat.patient_name}
                </h3>
                
                <p className="flex gap-1 items-center border-b border-text-500 py-[2px]">
                  <Medication className="text-primary-400"/><strong>{t("medication")}:</strong> {treat.medication}
                </p>
                <p className="flex gap-1 items-center border-b border-text-500 py-[2px]">
                  <Dosage className="text-primary-400"/><strong>{t("dosage")}:</strong> {treat.dosage}
                </p>
                <p className="flex gap-1 items-center border-b border-text-500 py-[2px]">
                  <IconCare className="text-primary-400"/><strong>{t("instructions")}:</strong> {treat.instructions}
                </p>
                
                <p className="flex gap-1 items-center py-[2px]">
                  <IconSurgery className="text-primary-400"/><strong>{t("surgicalInterventions")}:</strong>{" "}{treat.surgical_interventions}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
