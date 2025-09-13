"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbTrashXFilled } from "react-icons/tb";import { useApi } from "@/hooks/useApi";


type Props = {
  onClose: () => void;
  onSuccess: () => void;
  onDelete: () => void;
  recordType: string;
};

export default function DeleteConfirmPopUP({ onClose, onSuccess,onDelete,recordType}: Props) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      onDelete();
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-fit max-w-3xl mx-4 p-6 relative">
        <h2 className="w-fit flex flex-col gap-2 justify-center items-center text-lg font-bold mb-4 border-primary-800">
          <TbTrashXFilled className="rounded-full bg-red-800  text-white shadow-md w-12 h-12 p-2"/>
        {t('confirm_delete', { type: t(`record.${recordType}`) })}


        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-evenly">
            
            <button type="submit" disabled={loading} className="btn !bg-red-800 hover:!bg-red-900">
              {loading ? t("loading") : t("delete")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
    </div>
    </div>
  );
}
