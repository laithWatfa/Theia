"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { newTreatment } from "@/lib/users"; 

type Props = {
  diagnosisId: string; 
  onClose: () => void;
  onSuccess: () => void;
};

export default function NewTreatmentForm({
  diagnosisId,
  onClose,
  onSuccess,
}: Props) {
  const t = useTranslations();

  const [medication, setMedication] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dosage, setDosage] = useState("");
  const [surgicalInterventions, setSurgicalInterventions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosisId || !medication || !instructions) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        diagnosis: diagnosisId,
        medication,
        instructions,
        dosage,
        surgical_interventions: surgicalInterventions,
      };

      await newTreatment(payload); 
      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 relative">
        <h2 className="text-lg w-fit font-bold mb-4 border-b-2 border-primary-800">
          {t("newTreatment")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Medication */}
          <div>
            <label className="block font-semibold mb-1">{t("medication")}</label>
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="e.g., Cetamol"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Dosage */}
          <div>
            <label className="block font-semibold mb-1">{t("dosage")}</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g., 500mg twice daily"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block font-semibold mb-1">{t("instructions")}</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter instructions for the patient"
              className="w-full border rounded-md px-3 py-2"
              rows={3}
              required
            />
          </div>

          {/* Surgical Interventions */}
          <div>
            <label className="block font-semibold mb-1">
              {t("surgicalInterventions")}
            </label>
            <textarea
              value={surgicalInterventions}
              onChange={(e) => setSurgicalInterventions(e.target.value)}
              placeholder="Enter surgical interventions if any"
              className="w-full border rounded-md px-3 py-2"
              rows={2}
            />
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
              {loading ? t("saving") + "..." : "+ " + t("add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
