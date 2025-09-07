"use client";
import { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import Image from "next/image";
import { useTranslations } from "next-intl";

type AddPatientFormProps = {
  onClose: () => void;
  onAdd: (patient: {
    personal_photo: string | null;
    full_name: string;
    date_of_birth: string;
    gender: string;
    address: string;
    phone: string;
    insurance_info: string;
    contact_info: string;
    clinic_id: string;
  }) => void;
};

export default function AddPatientForm({ onClose, onAdd }: AddPatientFormProps) {
  const t = useTranslations(); // namespace e.g. addPatient.fullName, addPatient.phone
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    insurance_info: "",
    contact_info: "",
    date_of_birth: "",
    gender: "",
    address: "",
    clinic_id: "1b29f62c-1304-448a-a325-98ff2b68c11b",
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.full_name.trim()) newErrors.full_name = t("errors.nameRequired");
    if (!/^\d{9,15}$/.test(formData.phone)) newErrors.phone = t("errors.invalidPhone");
    if (formData.contact_info && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_info))
      newErrors.contact_info = t("errors.invalidEmail");
    if (formData.date_of_birth) {
      const dob = new Date(formData.date_of_birth);
      if (dob > new Date()) newErrors.date_of_birth = t("errors.invalidDOB");
    } else {
      newErrors.date_of_birth = t("errors.dobRequired");
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAdd({ personal_photo: photoPreview, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-text-100 rounded-lg shadow-lg w-full max-w-3xl max-h-screen mx-4 p-3 md:p-6 relative">
        <h2 className="w-fit text-md md:text-lg font-semibold mb-4 border-b-2 border-primary-800">
          {t("addPatient")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-md"
        >
          {/* Upload Photo */}
          <div className="md:col-span-2 flex justify-center">
            <label className="flex flex-col items-center justify-center w-16 h-16 md:w-32 md:h-32 border rounded-full cursor-pointer overflow-hidden transition hover:bg-primary-100">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt={t("photoPreview")}
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                />
              ) : (
                <span className="flex flex-col justify-center items-center text-[6px] md:text-xs text-text-700">
                  <HiUserAdd className="w-3 h-3 md:w-6 md:h-6" />
                  {t("uploadPatientPhoto")}
                </span>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium">
              {t("fullName")}
            </label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder={t("usernamePlaceHolder")}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
            {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              {t("phone")}
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="09**-***-***"
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>

          {/* Insurance */}
          <div>
            <label htmlFor="insurance_info" className="block text-sm font-medium">
              {t("insurance")}
            </label>
            <input
              id="insurance_info"
              type="text"
              name="insurance_info"
              value={formData.insurance_info}
              onChange={handleChange}
              placeholder={t("insurancePlaceHolder")}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact_info" className="block text-sm font-medium">
              {t("contact")}
            </label>
            <input
              id="contact_info"
              type="text"
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder={t("contactPlaceHolder")}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
            {errors.contact_info && <p className="text-red-500 text-xs">{errors.contact_info}</p>}
          </div>

          {/* DOB */}
          <div>
            <label htmlFor="date_of_birth" className="block text-sm font-medium">
              {t("dateOfBirth")}
            </label>
            <input
              id="date_of_birth"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
            {errors.date_of_birth && <p className="text-red-500 text-xs">{errors.date_of_birth}</p>}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              {t("gender")}
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1"
            >
              <option value="MALE">{t("male")}</option>
              <option value="FEMALE">{t("female")}</option>
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium">
              {t("address")}
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder={t("addressPlaceHolder")}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-between mt-4">
            <button type="button" onClick={onClose} className="btn !bg-red-800 !hover:bg-red-900">
              {t("cancel")}
            </button>
            <button type="submit" className="btn">
              {t("add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
