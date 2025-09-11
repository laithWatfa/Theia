"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { newBill } from "@/lib/users";

type Props = {
  appointmentId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function NewBillForm({ appointmentId, onClose, onSuccess }: Props) {
  const t = useTranslations();
  const [amount, setAmount] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      setError("Please enter an amount");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const payload = {
        appointment: appointmentId,
        amount,
        is_paid: isPaid,
      };

      console.log("Submitting Bill:", payload);
      await newBill(payload);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
        <h2 className="text-lg font-bold mb-4 border-b-2 border-primary-800">
          {t("newBill")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label className="block font-semibold mb-1">{t("amount")}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter amount"
            />
          </div>

          {/* Paid / Unpaid */}
          <div>
            <label className="block font-semibold mb-1">{t("status")}</label>
            <select
              value={isPaid ? "paid" : "unpaid"}
              onChange={(e) => setIsPaid(e.target.value === "paid")}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="unpaid">{t("unpaid")}</option>
              <option value="paid">{t("paid")}</option>
            </select>
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
