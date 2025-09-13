"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { TbTrashXFilled } from "react-icons/tb";
import { getAppointments, getPatients, getBills, deleteAppointment } from "@/lib/users";
import NewAppointmentForm from "@/components/NewAppointmentForm";
import NewBillForm from "@/components/NewBillForm";
import { usePathname } from "next/navigation";
import { FaMoneyBills } from "react-icons/fa6";
import { Bill,Appointment } from "@/types/users";
import { mockBills,mockAppointments } from "@/mockdata";
import DeleteConfirmPopUP from "@/components/DeletetConfirmPopUp";
import Spinner from "@/components/Spinner";


export default function AppointmentsPage() {
  const currentDate = new Date();
  const pathname = usePathname();
  const t = useTranslations();
  const [monthYear,setMonthYear] = useState(`${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}`);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [billFormFor, setBillFormFor] = useState<string | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedId,setSelectedId] = useState("")


  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, billsData] = await Promise.all([
          getAppointments(),
          getBills(),
        ]);
        setAppointments(appointmentsData);
        setBills(billsData);
      } catch (err) {
        console.error("Error fetching appointments/bills", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteAppointment = (id:string) => {
      deleteAppointment(id).then(() => {
      setAppointments((prev) => prev.filter((item) => item.id !== id));
    })
    .catch(() => {
      
    });
    };

  const filteredAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.appointment_datetime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const formatted = `${year}-${month.toString().padStart(2, '0')}`;
    return formatted === monthYear;
  }).filter((a) =>
    a.patient_name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    return new Date(a.appointment_datetime).getTime() - new Date(b.appointment_datetime).getTime();
  });

  return (
    <div className="p-4 max-w-full">
      {/* Search + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
        <div className="relative max-w-md shadow-md">
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
        <input
        type="month"
        id="monthYear"
        name="monthYear"
        value={monthYear}
        onChange={(e)=>setMonthYear(e.target.value)}
        className="text-md w-56 md:w-1/4 px-2 py-1 border shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
        <button onClick={() => setShowForm(true)} className="btn shadow-md">
          + {t("newAppointment")}
        </button>
      </div>

      {/* Appointments List */}
      {loading ? (
        <Spinner/>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-text-600">{t("noResults")}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {filteredAppointments.map((a) => {
            const date = new Date(a.appointment_datetime);
            const weekday = date.toLocaleString(pathname.split("/")[1], {
              weekday: "short",
            });
            const dayOfMonth = date.getDate();
            const time12hr = date.toLocaleString(pathname.split("/")[1], {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            // Find bill for this appointment
            const bill = bills.find((b) => b.appointment === a.id);

            return (
              <li
                key={a.id}
                className="relative flex flex-col gap-2 transition hover:translate-y-[-2px] rounded-md px-4 py-2 shadow-sm hover:shadow-md bg-white"
              >
                {/* Day */}
                <div className="flex gap-2 items-center">
                  <div className="h-full w-14 flex flex-col justify-center items-center ltr:pr-4  ltr:border-r-2 rtl:pl-4 rtl:border-l-2 border-primary-400 text-primary-400">
                    <span className="font-bold">{weekday.toUpperCase()}</span>
                    <span className="font-bold">{dayOfMonth}</span>
                  </div>

                  {/* Patient + Time */}
                  <div>
                    <h3 className="font-bold text-text-700">{a.patient_name}</h3>
                    <span className="text-sm text-text-700">{" "}{time12hr}</span>
                    <p className="text-xs">
                      <span className="text-sm font-bold text-text-700">
                        {t("notes")}:
                      </span>{" "}
                      {a.notes}
                    </p>
                  </div>
                </div>

                {/* Bill section */}
                <div className="mt-2 absolute rtl:left-0 ltr:right-0 text-sm md:text-xs">
                  {bill ? (
                    <p className={"flex items-center gap-1 text-text-100  p-1 rounded-l-md rtl:rounded-r-md rtl:rounded-l-none "+ (bill.is_paid ? "bg-mid" : "bg-gold-900") }>
                      <FaMoneyBills/>{bill.amount}
                    </p>
                  ) : (
                    <button
                      onClick={() => setBillFormFor(a.id)}
                      className="bg-primary-400 text-text-100  p-1 rounded-l-md rtl:rounded-r-md rtl:rounded-l-none"
                    >
                      + {t("addBill")}
                    </button>
                  )}
                </div>
                <button onClick={()=>{setShowPopUp(true);setSelectedId(a.id)}} 
                                className="absolute right-0 rounded-r-none rtl:left-0 rtl:rounded-l-none rtl:rounded-r rtl:right-auto bottom-2 bg-red-900 hover:bg-red-800 p-1 text-text-100 rounded-md transition">
                                  <TbTrashXFilled/>
                                  </button>
                <div>
                  
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Appointment Form */}
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

      {/* Bill Form */}
      {billFormFor && (
        <NewBillForm
          appointmentId={billFormFor}
          onClose={() => setBillFormFor(null)}
          onSuccess={async () => {
            setBillFormFor(null);
            const billsData = await getBills();
            setBills(billsData);
          }}
        />
      )}

      {showPopUp && (
              <DeleteConfirmPopUP 
              onClose={() =>{setShowPopUp(false);setSelectedId("")}} 
              onDelete={() => handleDeleteAppointment(selectedId) }
              onSuccess={async () => {
                          setShowPopUp(false);
                          setSelectedId("")
                          const appointmentData = await getAppointments();
                          const billsData = await getBills();
                          setAppointments(appointmentData);
                          setBills(billsData);
                        }}
              recordType="appointment" />
            )}
    </div>
  );
}
