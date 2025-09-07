"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { getAppointments, getPatients } from "@/lib/users";
import NewAppointmentForm from "@/components/NewAppointmentForm";


// Types
type Clinic = {
  id: string;
  name: string;
  location: string;
  created_at: string;
};

type Patient = {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  personal_photo: string | null;
  clinic: Clinic;
};

type Appointment = {
  appointment_id: number;
  patient: number;
  appointment_datetime: string;
  doctor: number;
};


const mockPatients: Patient[] = [
  {
    id: "1",
    full_name: "Majd Hindi",
    age: 22,
    gender: "Male",
    personal_photo: null,
    clinic: { id: "1", name: "Clinic A", location: "City", created_at: "2023" },
  },
  {
    id: "2",
    full_name: "May Dalloul",
    age: 21,
    gender: "Female",
    personal_photo: null,
    clinic: { id: "2", name: "Clinic B", location: "Town", created_at: "2023" },
  },
];

const mockAppointments: Appointment[] = [
  { appointment_id: 201, patient: 1, appointment_datetime: "2025-09-06 10:30", doctor: 8 },
  { appointment_id: 202, patient: 2, appointment_datetime: "2025-09-06 12:00", doctor: 8 },
];

// --------------------
// Component
// --------------------
export default function AppointmentsPage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [loading, setLoading] = useState(true);

  // Fetch from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, patientsData] = await Promise.all([
          getAppointments(),
          getPatients(),
        ]);
        setAppointments(appointmentsData);
        setPatients(patientsData);
      } catch (err) {
        console.error("Error fetching appointments or patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Map patient_id → patient data
  const appointmentsWithPatient = useMemo(() => {
    return appointments.map((a) => {
      const patient = patients.find((p) => String(p.id) === String(a.patient));
      return {
        ...a,
        patient_name: patient ? patient.full_name : `ID: ${a.patient}`,
        patient_age: patient?.age,
        patient_gender: patient?.gender,
        patient_photo: patient?.personal_photo || null,
      };
    });
  }, [appointments, patients]);

  // Filter by patient name
  const filteredAppointments = appointmentsWithPatient.filter((a) =>
    a.patient_name.toLowerCase().includes(search.toLowerCase())
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
          + {t("newAppointment")}
        </button>
      </div>

      {/* Appointments List */}
      {loading ? (
        <p>{t("loading")}...</p>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-gray-500">{t("noResults")}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((a) => 
            {
            const date = new Date(a.appointment_datetime);
            // Day of the week (e.g., Sunday)
const weekday = date.toLocaleString('en-US', { weekday: 'short' });

// Day of the month (e.g., 7)
const dayOfMonth = date.getDate();

// Year (e.g., 2025)
const year = date.getFullYear();

// Time of day in 12-hour format (e.g., 2:16 AM)
const time12hr = date.toLocaleString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
});


            return <li
              key={a.appointment_id}
              className="flex gap-2 border rounded px-4 py-2 shadow-sm bg-white"
            >
              {/*Day*/}
              
                <div className="flex flex-col justify-center items-center 
                ltr:pr-2 ltr:border-r-2 rtl:pl-2 rtl:border-l-2 border-primary-400
                text-primary-400">
                    <span className="font-bold">{weekday.toUpperCase()}</span>
                    <span className="font-bold">{dayOfMonth}</span>
                </div>
                
             

              {/* Name and time */}
              <div>
                <div>
                  <h3 className="font-bold text-text-700">{a.patient_name}</h3>
                </div>
                <p>
                  <span className="text-sm text-text-700">{time12hr}</span>
                </p>
              </div>
            </li>;
})}
        </ul>
      )}

      {/* Overlay Form */}
      {showForm && (
        <NewAppointmentForm
          onClose={() => setShowForm(false)}
          onSuccess={async () => {
            setShowForm(false);
            const appointmentsData = await getAppointments();
            setAppointments(appointmentsData);
          }}
        />
      )}
    </div>
  );
}
