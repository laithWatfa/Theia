"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import NewDiagnoseForm from "@/components/NewDiagnoseForm";
import { Search } from "lucide-react";
import { getDiagnoses, getPatients } from "@/lib/users";
import Image from "next/image";

// --------------------
// Types
// --------------------
type Clinic = {
  id: string;
  name: string;
  location: string;
  created_at: string;
};

type Patient = {
  id: string;
  personal_photo: string | null;
  full_name: string;
  date_of_birth: string;
  gender: string;
  age: number;
  clinic: Clinic;
  address: string;
  phone: string;
  insurance_info: string;
  contact_info: string;
  doctors: number[];
};

type Diagnose = {
  record_id: number;
  patient: number;
  left_fundus: string | null;
  right_fundus: string | null;
  left_diagnostic: string;
  right_diagnostic: string;
  doctor: number;
  medical_notes: string;
};

// --------------------
// Mock Data (for styling/dev only)
// --------------------
const mockPatients: Patient[] = [
  {
    id: "1",
    personal_photo: null,
    full_name: "Majd Hindi",
    date_of_birth: "2002-01-01",
    gender: "Male",
    age: 22,
    clinic: { id: "1", name: "Clinic A", location: "City", created_at: "2023" },
    address: "Somewhere",
    phone: "123456",
    insurance_info: "Aetna",
    contact_info: "Contact A",
    doctors: [],
  },
  {
    id: "2",
    personal_photo: null,
    full_name: "May Dalloul",
    date_of_birth: "2003-05-05",
    gender: "Female",
    age: 21,
    clinic: { id: "2", name: "Clinic B", location: "Town", created_at: "2023" },
    address: "Somewhere Else",
    phone: "987654",
    insurance_info: "Cigna",
    contact_info: "Contact B",
    doctors: [],
  },
];

const mockDiagnoses: Diagnose[] = [
  {
    record_id: 101,
    patient: 1,
    left_fundus: null,
    right_fundus: null,
    left_diagnostic: "Normal",
    right_diagnostic: "Mild Retinopathy",
    doctor: 8,
    medical_notes: "Follow up in 6 months.",
  },
  {
    record_id: 102,
    patient: 2,
    left_fundus: null,
    right_fundus: null,
    left_diagnostic: "Glaucoma",
    right_diagnostic: "Glaucoma",
    doctor: 8,
    medical_notes: "Requires surgery.",
  },
];

const placeholderImg = "/images/doctor1.png";

// --------------------
// Component
// --------------------
export default function DiagnosePage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>(mockDiagnoses);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [loading, setLoading] = useState(true);

  // Fetch from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diagnosisData, patientsData] = await Promise.all([
          getDiagnoses(),
          getPatients(),
        ]);
        setDiagnoses(diagnosisData);
        setPatients(patientsData);
      } catch (err) {
        console.error("Error fetching diagnoses or patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Map patient_id → patient data
  const diagnosesWithPatient = useMemo(() => {
    return diagnoses.map((d) => {
      const patient = patients.find((p) => String(p.id) === String(d.patient));
      return {
        ...d,
        patient_name: patient ? patient.full_name : `ID: ${d.patient}`,
        patient_age: patient?.age,
        patient_photo: patient?.personal_photo || null,
        patient_gender: patient?.gender,
      };
    });
  }, [diagnoses, patients]);

  // Filter by patient name
  const filteredDiagnoses = diagnosesWithPatient.filter((d) =>
    d.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-full">
      {/* Search + Add Button */}
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
        <button onClick={() => setShowForm(true)} className="btn">
          + {t("addDiagnose")}
        </button>
      </div>

      {/* Diagnoses List */}
      {loading ? (
        <p>{t("loading")}...</p>
      ) : filteredDiagnoses.length === 0 ? (
        <p className="text-gray-500">{t("noResults")}</p>
      ) : (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredDiagnoses.map((d) => (
            <li
              key={d.record_id}
              className="border rounded px-4 py-2 shadow-sm bg-white"
            >
              {/* Patient Info */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={d.patient_photo || (d.patient_gender?.toLowerCase().includes("female") ? "/images/female.png" : "/images/male.png") }
                  alt={d.patient_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-bold">{d.patient_name}</h3>
                  {d.patient_age && (
                    <p className="text-xs text-gray-500">
                      {d.patient_age + " " + t("yrs")}
                    </p>
                  )}
                </div>
              </div>

              {/* Diagnostics + Notes */}
              <div className="flex flex-col gap-2 md:flex-row justify-between">
                <div>
                  <p>
                    <span className="font-semibold">{t("leftEye")}:</span>{" "}
                    {d.left_diagnostic || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">{t("rightEye")}:</span>{" "}
                    {d.right_diagnostic || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">{t("notes")}:</span>{" "}
                    {d.medical_notes || t("noNotes")}
                  </p>
                </div>

                {/* Fundus Images */}
                <div className="flex rtl:flex-row-reverse gap-6 mb-3">
                  <div className="text-center">
                    <Image
                      src={d.left_fundus || placeholderImg}
                      alt="Left Fundus"
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <p className="text-xs mt-1 font-bold">{t("leftEye")}</p>
                  </div>
                  <div className="text-center">
                    <Image
                      src={d.right_fundus || placeholderImg}
                      alt="Right Fundus"
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <p className="text-xs mt-1 font-bold">{t("rightEye")}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Overlay Form */}
      {showForm && (
        <NewDiagnoseForm
          onClose={() => setShowForm(false)}
          onSuccess={async () => {
            setShowForm(false);
            const diagnosisData = await getDiagnoses();
            setDiagnoses(diagnosisData);
          }}
        />
      )}
    </div>
  );
}
