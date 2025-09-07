"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getPatients, newAppointment } from "@/lib/users";

type Patient = {
  id: string;
  full_name: string;
  age: number;
};

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function NewAppointmentForm({ onClose, onSuccess }: Props) {
  const t = useTranslations();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch patients list
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data: Patient[] = await getPatients();
        setPatients(data);
      } catch (err: any) {
        console.error(err);
        setError("Could not load patients");
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !appointmentDateTime) {
      setError("Please select a patient and date/time");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const payload = {
        patient_id: selectedPatient.id,
        appointment_datetime: appointmentDateTime,
      };
      await newAppointment(payload);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Filter patients by query
  const filteredPatients = patients.filter((p) =>
    p.full_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 p-6 relative">
        <h2 className="text-lg font-bold mb-4 border-b-2 border-primary-800">
          {t("newAppointment")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
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
              className="w-full  border rounded-md px-3 py-2"
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
                  <li className="px-3 py-2 text-gray-500">{t("noResults")}</li>
                )}
              </ul>
            )}
          </div>

          {/* Date/Time Picker */}
          <div>
            <label className="block font-semibold mb-1">{t("appointmentDateTime")}</label>
            <input
              type="datetime-local"
              value={appointmentDateTime}
              onChange={(e) => setAppointmentDateTime(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          </div>

          {/* Error */}
          {error && <p className="text-red-700 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn !bg-red-800 hover:!bg-red-900"
            >
              {t("cancel")}
            </button>
            <button type="submit" disabled={loading} className="btn">
              {loading ? "Saving..." : "+ " + t("add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
