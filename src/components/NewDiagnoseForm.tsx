"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { getPatients, newDiagnose } from "@/lib/users";
import { Patient } from "@/types/users";
import { mockPatients } from "@/mockdata";


type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function NewDiagnoseForm(    { onClose, onSuccess }: Props) {
const t = useTranslations();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [leftImage, setLeftImage] = useState<File | null>(null);
  const [rightImage, setRightImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch patients list
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = (await getPatients()) as Patient[];
        setPatients(data)
      } catch (err: any) {
        console.error(err);
        setError("Could not load patients");
      }
    };
    fetchPatients();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      setError("Please select a patient");
      return;
    }
    setLoading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append("patient_id", selectedPatient.id);
        if (leftImage) formData.append("left_fundus_image", leftImage);
        if (rightImage) formData.append("right_fundus_image", rightImage);
        await newDiagnose(formData);
        onSuccess();
    } catch (err: any) {
        setError(err.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
};

  const filteredPatients = patients.filter((p) =>
    p.full_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-100 mx-4 p-6 relative">
        <h2 className="text-lg font-bold mb-4 w-fit border-b-2 border-b-primary-800">{t("addDiagnose")}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Search */}
          <div className="relative">
            <label className="block font-semibold mb-1">{t("choosePatient")}</label>
            <input
              type="text"
              value={selectedPatient ? selectedPatient.full_name : query}
              onChange={(e) => {
                setSelectedPatient(null);
                setQuery(e.target.value);
              }}
              placeholder={t("choosePatientPlaceHolder")}
              className="w-full md:w-1/2 border rounded-md px-3 py-2"
            />

            {/* Dropdown */}
            {query && !selectedPatient && (
              <ul className="absolute left-0 right-0 bg-white border rounded-md mt-1 max-h-40 overflow-y-auto shadow-md z-10">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((p) => (
                    <li
                      key={p.id}
                      onClick={() => {
                        setSelectedPatient(p);
                        setQuery("");
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {p.full_name} ({p.age} yrs)
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-500">No results</li>
                )}
              </ul>
            )}
          </div>

          {/* Fundus images */}
          <div className="flex justify-center rtl:flex-reverse gap-6">
            {/* Left Fundus */}
            <div className="flex flex-col items-center">
              <label className="border-2 border-primary-700 hover:border-primary-400 flex flex-col items-center justify-center w-32 h-32 bg-text-300 
              hover:bg-primary-200  hover:text-primary-400 transition rounded-full cursor-pointer overflow-hidden">
                {leftImage ? (
                  <img
                    src={URL.createObjectURL(leftImage)}
                    alt="Left Fundus"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center justify-content text-sm font-semibold">
                    <FaRegEye className="w-10 h-6"/>
                    {t("uploadImage")}
                    </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setLeftImage)}
                />
              </label>
              <p className="mt-2 font-bold">{t("leftEye")}</p>
            </div>

            {/* Right Fundus */}
            <div className="flex flex-col items-center">
              <label className="border-2 border-primary-700 
              hover:text-primary-400 hover:border-primary-400 flex flex-col items-center justify-center w-32 h-32 bg-text-300 hover:bg-primary-200 transition rounded-full cursor-pointer overflow-hidden">
                {rightImage ? (
                  <img
                    src={URL.createObjectURL(rightImage)}
                    alt="Right Fundus"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex flex-col items-center justify-content text-sm font-semibold">
                    <FaRegEye className="w-10 h-6" />
                    {t("uploadImage")}
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setRightImage)}
                />
              </label>
              <p className="mt-2 font-bold">
                {t("rightEye")}
                
                </p>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn !bg-red-800 hover:!bg-red-900"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn"
            >
              {loading ? "Saving..." : "+ "+t("diagnose")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
