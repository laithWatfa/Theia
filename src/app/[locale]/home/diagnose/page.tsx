"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import NewDiagnoseForm from "@/components/NewDiagnoseForm";
import NewTreatmentForm from "@/components/NewTreatmentForm";
import { Search,X } from "lucide-react";
import { FaRegEye as Eye } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { deleteDiagnosis, getDiagnoses, getPatients, getTreatments } from "@/lib/users";
import IconBook from "@/components/IconBook";
import Image from "next/image";
import { mockDiagnoses,mockPatients,mockTreatments } from "@/mockdata";
import { Diagnose,Patient,Treatment } from "@/types/users";
import Spinner from "@/components/Spinner";
import DeleteConfirmPopUP from "@/components/DeletetConfirmPopUp";


const placeholderImg = "/images/fundusPlaceHolder.jpg";

export default function DiagnosePage() {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showTreatmentForm, setShowTreatmentForm] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedDiagnoseID,setSelectedDiagnoseID] =useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null
  );
  const [selectedId,setSelectedId] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diagnosisData, patientsData, treatmentsData] = await Promise.all([
          getDiagnoses(),
          getPatients(),
          getTreatments(),
        ]);
        setDiagnoses(diagnosisData);
        setPatients(patientsData);
        setTreatments(treatmentsData);
      } catch (err) {
        console.error("Error fetching diagnoses, patients or treatments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteDiagnose =  (id:string) => {
      deleteDiagnosis(id).then(() => {
      setDiagnoses((prev) => prev.filter((item) => item.id !== id));
    })
    .catch(() => {
    });
    };
  

  const successfulDiagnoses = useMemo(() => {
    const getMaxKey = (obj: Record<string, number>) =>
      Object.entries(obj)?.reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    return diagnoses
      .filter((d) => d.status === "SUCCESS")
      .map((d) => {
        const patient = patients.find((p) => String(p.id) === String(d.patient));

        const leftMax =
          d.result?.evidence_vector?.left_fundus_diagnose
            ? getMaxKey(d.result.evidence_vector.left_fundus_diagnose)
            : "-";
        const rightMax =
          d.result?.evidence_vector?.right_fundus_diagnose
            ? getMaxKey(d.result.evidence_vector.right_fundus_diagnose)
            : "-";

        return {
          ...d,
          patient_name: patient ? patient.full_name : `ID: ${d.patient}`,
          patient_age: patient?.age,
          patient_photo: patient?.personal_photo || null,
          patient_gender: patient?.gender,
          left_diagnostic: leftMax,
          right_diagnostic: rightMax,
        };
      });
  }, [diagnoses, patients]);

  // Filter by patient name
  const filteredDiagnoses = successfulDiagnoses.filter((d) =>
    d.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-full">
      {/* Search + Add Button */}
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
        <button onClick={() => setShowForm(true)} className="btn shadow-md">
          + {t("addDiagnose")}
        </button>
      </div>

      {/* Diagnoses List */}
      {loading ? (
        <Spinner/>
      ) : filteredDiagnoses.length === 0 ? (
        <p className="text-text-700">{t("noResults")}</p>
      ) : (
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredDiagnoses.map((d) => {
            const treatment = treatments.find((t) => t.diagnosis === d.id); // 🔹 check treatment
            return (
              <li
                key={d.id}
                className="relative rounded-md shadow hover:shadow-primary-400 transition px-4 py-2 shadow-sm bg-white"
              >
                <span className="absolute  rtl:left-2 right-2 rtl:right-auto text-[8px] md:text-sm text-primary-800 ">
                  {new Date(d.created_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                  </span>
                {/* Patient Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={
                      d.patient_photo ||
                      (d.patient_gender?.toLowerCase().includes("female")
                        ? "/images/female.png"
                        : "/images/male.png")
                    }
                    alt={d.patient_name}
                    width={40}
                    height={40}
                    className="w-10 h-10 border-2 border-primary-700 rounded-full object-cover border"
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
                  <div className="lg:w-1/3"> 
                    <p>
                      <span className="font-semibold">{t("leftEyeResult")}:</span>{" "}
                      {t(d.left_diagnostic) || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">{t("rightEyeResult")}:</span>{" "}
                      {t(d.right_diagnostic) || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">{t("notes")}:</span>{" "}
                      {d.medical_notes || t("noNotes")}
                    </p>
                  </div>

                  {/* Fundus Images */}
                  <div className="flex justify-evenly lg:w-2/3 rtl:flex-row-reverse gap-6 mb-3">
                  
                  {/* left Fundus */}
                    <div className="text-center">
                      <div className="rounded-full overflow-hidden border-3 border-primary-800 b">
                        <Image
                        src={d.left_fundus_image||placeholderImg}
                        onError={()=>d.left_fundus_image = null}
                        alt="Left Fundus"
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover"
                      />

                      </div>
                      
                      <div className="flex rtl:flex-row-reverse items-center justify-center gap-1">
                        <Eye className="text-primary-400"/>
                        <Eye/>
                      </div>

                      <p className="text-xs mt-1 font-bold">
                        {t("leftEye")}</p>
                    </div>
                    <span className="block h-30 w-[2px] bg-text-400"></span>
                    {/* right Fundus */}
                    <div className="text-center">
                      <div className="w-fit rounded-full overflow-hidden border-3 border-primary-800">
                          <Image
                            src={d.right_fundus_image||placeholderImg}
                            alt="Right Fundus"
                            onError={()=>d.right_fundus_image = null}
                            width={96}
                            height={96}
                            className="w-24 h-24 object-cover"
                          />
                      </div>
                      <div className="flex rtl:flex-row-reverse items-center justify-center gap-1">
                        <Eye />
                        <Eye className="text-primary-400"/>
                      </div>
                      <p className="text-xs mt-1 font-bold">{t("rightEye")}</p>
                    </div>
                  </div>
                </div>
                    {/*buttons*/}
                <div className="flex justify-between gap-2 mt-2">
                  {/*treatment button*/}
                  <div className="">
                  {treatment ? (
                    <button
                      onClick={() =>{
                                    setSelectedTreatment(
                                      // mockTreatments.find((t) =>t.diagnosis === d.id) || null
                                      treatments.find((t) =>t.diagnosis === d.id) || null
                                    );
                                    
                      }
                    }
                      className="btn"
                    >
                      <IconBook/>
                      {t("viewTreatment")}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedDiagnoseID(d.id)
                        setShowTreatmentForm(true)
                      }}
                      className="btn"
                    >
                      + {t("addTreatment")}
                    </button>
                  )}
                </div>
                  {/*delete button*/}
                <button onClick={()=>{setShowPopUp(true);setSelectedId(d.id)}} 
                className=" btn !bg-red-900 hover:!bg-red-800 text-text-100 rounded-md transition">
                  <TbTrashXFilled/>
                  </button>

                </div>

              
        
                
              </li>
            );
          })}
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

      {showTreatmentForm && (
        <NewTreatmentForm
          diagnosisId = {selectedDiagnoseID}
          onClose={() => {setShowTreatmentForm(false);setSelectedDiagnoseID("")}}
          onSuccess={async () => {
            setShowTreatmentForm(false);
            const diagnosisData = await getDiagnoses();
            const TreatmentData = await getTreatments();
            setSelectedDiagnoseID("")
            setDiagnoses(diagnosisData);
            setTreatments(TreatmentData);
          }}
        />
      )}

       {selectedTreatment && (
        <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50">
          <div className="border-2  border-primary-600 bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative">
            <button
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-2 right-2 rtl:left-2 rtl:right-auto w-fit rounded rtl:right bg-red-800 p-1 text-text-100 transition hover:text-text-100 hover:bg-red-900"
            >
              <X size={20} className="" />
            </button>
            <h2 className="text-xl font-bold ">
              {t("treatmentFor")} {selectedTreatment.patient_name}
            </h2>
            <p className="text-sm text-text-500 mb-2">
              {t("createdAt")}:{" "}
              {new Date(selectedTreatment.created_at).toLocaleString()}
            </p>
            <p className="border-b-2 border-primary-200 py-[2px]">
              <strong>{t("medication")}:</strong> {selectedTreatment.medication}
            </p>
            <p className="border-b-2 border-primary-200 py-[2px]">
              <strong>{t("dosage")}:</strong> {selectedTreatment.dosage}
            </p>
            <p className="border-b-2 border-primary-200 py-[2px]">
              <strong>{t("instructions")}:</strong> {selectedTreatment.instructions}
            </p>
            <p className="p-[2px]">
              <strong>{t("surgicalInterventions")}:</strong>{" "}
              {selectedTreatment.surgical_interventions}
            </p>
            
          </div>
        </div>
      )}

      {showPopUp && (
              <DeleteConfirmPopUP 
              onClose={() =>{setShowPopUp(false);setSelectedId("")}} 
              onDelete={() => handleDeleteDiagnose(selectedId) }
              onSuccess={async () => {
                          setShowPopUp(false);
                          setSelectedId("")
                          const diagnosisData = await getDiagnoses();
                          const treatmentsData = await getTreatments();
                          setDiagnoses(diagnosisData);
                          setTreatments(treatmentsData)
                        }}
              recordType="diagnosis" />
            )}
    </div>
  );
}
