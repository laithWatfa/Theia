"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { getTreatments } from "@/lib/users"; 

// --------------------
// Types
// --------------------
type Treatment = {
  id: string;
  diagnosis: string;
  doctor: number;
  medication: string;
  instructions: string;
  created_at: string;
  patient_name: string;
};

const mockTreatments: Treatment[] = [
  {
    id: "1",
    diagnosis: "Flu",
    doctor: 5,
    medication: "Paracetamol",
    instructions: "Take 1 tablet every 8 hours after meals",
    created_at: "2025-09-06T10:30:00Z",
    patient_name: "Majd Hindi",
  },
  {
    id: "2",
    diagnosis: "Back Pain",
    doctor: 8,
    medication: "Ibuprofen",
    instructions: "Take with water, avoid lifting heavy objects",
    created_at: "2025-09-07T15:45:00Z",
    patient_name: "May Dalloul",
  },
  {
    id: "3",
    diagnosis: "Migraine",
    doctor: 3,
    medication: "Sumatriptan",
    instructions: "Take as soon as symptoms appear. Rest in a dark room.",
    created_at: "2025-09-08T09:15:00Z",
    patient_name: "Omar Khaled",
  },
  {
    id: "4",
    diagnosis: "Sprained Ankle",
    doctor: 4,
    medication: "Ice + Elevation",
    instructions: "Apply ice 15 minutes every 2 hours, keep foot elevated.",
    created_at: "2025-09-08T13:25:00Z",
    patient_name: "Sarah Mahmoud",
  },
  {
    id: "5",
    diagnosis: "Hypertension",
    doctor: 7,
    medication: "Amlodipine",
    instructions: "Take daily in the morning, monitor blood pressure regularly.",
    created_at: "2025-09-08T18:10:00Z",
    patient_name: "Hadi Nasser",
  },
];


// --------------------
// Component
// --------------------
export default function TreatmentsPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);
  const [loading, setLoading] = useState(true);

  // Fetch from API
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
        <div className="relative mb-6 max-w-md">
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
            const formattedDate = date.toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            return (
              <li
                key={treat.id}
                className="flex flex-col gap-2 border rounded px-4 py-2 shadow-sm bg-white"
              >
                <h3 className="font-bold text-text-700">{treat.patient_name}</h3>
                <p className="text-sm text-gray-500">{formattedDate}</p>
                <p className="text-sm">
                  <strong>Medication:</strong> {treat.medication}
                </p>
                <p className="text-sm">
                  <strong>Instructions:</strong> {treat.instructions}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
