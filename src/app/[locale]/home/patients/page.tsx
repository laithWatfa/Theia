"use client";
import { useState, useMemo, useEffect, use } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbTrashXFilled } from "react-icons/tb";import { useApi } from "@/hooks/useApi";
import AddPatientForm from "@/components/AddPatientForm";
import DeleteConfirmPopUP from "@/components/DeletetConfirmPopUp";
import { addNewPatient, deletePatient, getPatients } from "@/lib/users";
import { useTranslations } from "next-intl";
import { Patient } from "@/types/users";
import { mockPatients } from "@/mockdata";
import Spinner from "@/components/Spinner";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedId,setSelectedId] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [reload,setReload] = useState(true);
  const t = useTranslations();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading,setLoading] =  useState(true);

  useEffect(() => {
    const fetchData = async () => {
          try {
            const patientsData = await getPatients();
            setPatients(patientsData);
          } catch (err) {
            console.error("Error fetching patients", err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
  }, [reload]);



  const filteredPatients = useMemo(() => {
    return patients.filter((p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, patients]);

  const handleAddPatient = async (patient:FormData) => {
    try {
      const newPatient: Patient = await addNewPatient(patient);
      setReload(!reload)
    } catch (err) {
      console.error("Failed to add patient:", err);
    }
  };

  const handleDeletePatient = (id:string) => {
    deletePatient(id).then(() => {
    setPatients((prev) => prev.filter((item) => item.id !== id));
  })
  .catch(() => {
    setReload(!reload);
  });
  };


  if (loading) return <Spinner/>;
  // if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div>
      {/* Search + Add Button */}
      <div className="flex justify-between gap-2 mb-6 px-6">
        <div className="relative mb-6 max-w-md shadow-md">
          <Search className="absolute left-3 rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchByName")}
            className="text-sm w-full pl-10 pr-3 rtl:pl-3 rtl:pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <button onClick={() => setIsFormOpen(true)} className="text-sm btn shadow-md transition">
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
              <tr key={patient.id} className="relative border-t border-text-300 hover:bg-gray-50 transition text-[8px] md:text-xs">
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
                <button onClick={()=>{setShowPopUp(true);setSelectedId(patient.id)}} 
                className="absolute right-2 rtl:left-2 rtl:right-auto bottom-1/2 translate-y-1/2 bg-red-900 hover:bg-red-800 p-1 text-text-100 rounded-md transition">
                  <TbTrashXFilled/>
                  </button>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay Form */}
      {isFormOpen && (
        <AddPatientForm onClose={() => setIsFormOpen(false)} onAdd={handleAddPatient} />
      )}

      {showPopUp && (
        <DeleteConfirmPopUP 
        onClose={() =>{setShowPopUp(false);setSelectedId("")}} 
        onDelete={() => handleDeletePatient(selectedId) }
        onSuccess={async () => {
                    setShowPopUp(false);
                    setSelectedId("")
                    const patientData = await getPatients();
                    setPatients(patientData);
                  }}
        recordType="patient" />
      )}
    </div>
  );
}
