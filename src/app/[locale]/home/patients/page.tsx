"use client";
import { useState, useMemo, useEffect, use } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { FaPhone } from "react-icons/fa6";
import AddPatientForm from "@/components/AddPatientForm";
import { MdEmail } from "react-icons/md";
import { useApi } from "@/hooks/useApi";
import { addNewPatient, getPatients } from "@/lib/users";
import { useTranslations } from "next-intl";
import { error } from "console";

const FakePatients: Patient[] = [ 
    { id: "1", personal_photo: null,
    full_name: "Magd Hndi",
    date_of_birth: "2002-11-16", 
    gender: "MALE", age: 22, 
    clinic: { id: "c1",
            name: "Majd Clinic", 
            location: "Homs, Alarman", 
            created_at: "2025-07-17T15:43:07.545455Z",
            }, 
    address: "Damascus, Syria", 
    phone: "095-123-4567", 
    insurance_info: "", 
    contact_info: "magd@example.com", 
    doctors: [5], 
    },
    { id: "2", 
    personal_photo: null, 
    full_name: "May Dalloul", 
    date_of_birth: "2003-11-26", 
    gender: "FEMALE", 
    age: 21, 
    clinic: { id: "c1", 
            name: "Majd Clinic", 
            location: "Homs, Alarman", 
            created_at: "2025-07-17T15:43:07.545455Z", 
            }, address: "Homs, Syria", 
            phone: "093-222-4444", 
            insurance_info: "", 
            contact_info: "may@example.com", 
            doctors: [5], 
    }, ];

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

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reload,setReload] = useState(true);
  const t = useTranslations();

  // const { data, loading, error, refetch } = useApi<[]>("/api/users/users/patients/");
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {

    async function loadPatients() {
      try {
        const p = await getPatients();
        setPatients(p);
      }catch(err){
        console.log(err)
      }
    }
    loadPatients();
  }, [reload]);

  //  useEffect(() => {
  //   setPatients(FakePatients);
  // }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, patients]);

  const handleAddPatient = async (patient:FormData) => {
    try {
      const newPatient: Patient = await addNewPatient(patient);
      setReload(false)
    } catch (err) {
      console.error("Failed to add patient:", err);
    }
  };

//   if (loading) return <p className="p-6">Loading patients...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div>
      {/* Search + Add Button */}
      <div className="flex justify-between gap-2 mb-6 px-6">
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchByName")}
            className="text-sm w-full pl-10 pr-3 rtl:pl-3 rtl:pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <button onClick={() => setIsFormOpen(true)} className="text-sm btn shadow transition">
          + {t("addPatient")}
        </button>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow mx-6">
        <table className="w-full text-left rtl:text-right border-collapse">
          <thead className="bg-primary-900 text-text-200 text-xs">
            <tr>
              <th className="p-3">{t("patientName")}</th>
              <th className="p-3">{t("phone")}</th>
              <th className="p-3">{t("contact")}</th>
              <th className="p-3">{t("dateOfBirth")}</th>
              <th className="p-3">{t("gender")}</th>
              <th className="p-3">{t("address")}</th>
              <th className="p-3">{t("insurance")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-t border-text-300 hover:bg-gray-50 transition text-[8px] md:text-xs">
                <td className="p-3 flex items-center gap-3">
                  <Image
                    src={
                      patient.personal_photo ||
                      (patient.gender.toLowerCase() === "female" ? "/images/female.png" : "/images/male.png")
                    }
                    alt={patient.full_name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  {patient.full_name}
                </td>
                <td className="p-3">
                    <div className="flex items-center gap-2">
                        <FaPhone size={16} className="text-text-700" />
                        {patient.phone || "—"}
                    </div>
                  
                </td>
                <td className="p-3">
                    <div className="flex items-center gap-2">
                        <MdEmail size={16} className="text-text-700" />
                        {patient.contact_info || "—"}
                    </div></td>
                <td className="p-3">{patient.date_of_birth}</td>
                <td className="p-3">{patient.gender}</td>
                <td className="p-3">{patient.address || "—"}</td>
                <td className="p-3">{patient.insurance_info || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay Form */}
      {isFormOpen && (
        <AddPatientForm onClose={() => setIsFormOpen(false)} onAdd={handleAddPatient} />
      )}
    </div>
  );
}
