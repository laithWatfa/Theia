"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const t = useTranslations();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "DOCTOR",
    spicialzaton: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) newErrors.username = t("errors.usernameRequired");
    if (!formData.first_name.trim()) newErrors.first_name = t("errors.firstNameRequired");
    if (!formData.last_name.trim()) newErrors.last_name = t("errors.last_nameRequired");
    if (!formData.role.trim()) newErrors.role = t("errors.roleRequired");
    if (!formData.spicialzaton.trim())
      newErrors.spicialzaton = t("errors.specializationRequired");
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = t("errors.invalidEmail");
    }
    if (!formData.phone.match(/^\+?[0-9]{7,15}$/)) {
      newErrors.phone = t("errors.invalidPhone");
    }
    if (formData.password.length < 6) {
      newErrors.password = t("errors.passwordLength");
    }
    if (formData.password !== formData.password2) {
      newErrors.password2 = t("errors.passwordMismatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signup(formData);
      router.push("/login");
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const InputError = ({ error }: { error?: string }) =>
    error ? <p className="text-red-500 text-xs mt-1">{error}</p> : null;

  return (
    <div className="flex justify-center h-screen overflow-hidden">
      {/* Left Side */}
      <div
        className="hidden md:flex w-1/2 bg-gray-50 bg-center bg-cover"
        style={{ backgroundImage: "url('/images/backgroundPatternB.png')" }}
      ></div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <Image
            src="/images/dark.png"
            alt={t("alt.logo")}
            width={300}
            height={300}
            className="w-32 h-11 object-cover"
          />

          {/* Title */}
          <h2 className="text-text-900 text-2xl font-bold mb-2 text-center">
            {t("createYourAccount")}
          </h2>
          <p className="text-text-900 text-sm mb-2 text-center">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/login" className="text-primary-400 font-medium">
              {t("loginHere")}
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-2 text-text-800 text-sm">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold mb-[2px]">
                {t("username")}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t("placeholders.username")}
                className="w-full py-1 px-3 border border-primary-400 rounded-md outline-none"
              />
              <InputError error={errors.username} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-[2px]">
                {t("email")}
              </label>
              <div className="flex items-center border border-primary-400 rounded-md px-3">
                <Mail className="w-4 h-4 text-primary-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("placeholders.email")}
                  className="w-full py-1 outline-none"
                />
              </div>
              <InputError error={errors.email} />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-[2px]">
                {t("password")}
              </label>
              <div className="flex items-center border border-primary-400 rounded-md px-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-primary-400 mr-2" />
                  ) : (
                    <Eye className="w-4 h-4 text-primary-400 mr-2" />
                  )}
                </button>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("placeholders.password")}
                  className="w-full py-1 outline-none"
                />
              </div>
              <InputError error={errors.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-[2px]">
                {t("confirmPassword")}
              </label>
              <div className="flex items-center border border-primary-400 rounded-md px-3">
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="focus:outline-none"
                >
                  {showPassword2 ? (
                    <EyeOff className="w-4 h-4 text-primary-400 mr-2" />
                  ) : (
                    <Eye className="w-4 h-4 text-primary-400 mr-2" />
                  )}
                </button>
                <input
                  type={showPassword2 ? "text" : "password"}
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  placeholder={t("placeholders.confirmPassword")}
                  className="w-full py-1 outline-none"
                />
              </div>
              <InputError error={errors.password2} />
            </div>

            {/* First and Last Name */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-[2px]">
                  {t("firstName")}
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder={t("placeholders.firstName")}
                  className="w-full py-1 px-3 border border-primary-400 rounded-md outline-none"
                />
                <InputError error={errors.first_name} />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-[2px]">
                  {t("lastName")}
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder={t("placeholders.lastName")}
                  className="w-full py-1 px-3 border border-primary-400 rounded-md outline-none"
                />
                <InputError error={errors.last_name} />
              </div>
            </div>

            {/* Role and Specialization */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-[2px]">
                  {t("specialization")}
                </label>
                <input
                  type="text"
                  name="spicialzaton"
                  value={formData.spicialzaton}
                  onChange={handleChange}
                  placeholder={t("placeholders.specialization")}
                  className="w-full py-1 px-3 border border-primary-400 rounded-md outline-none"
                />
                <InputError error={errors.spicialzaton} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-[2px]">
                {t("phone")}
              </label>
              <div className="flex items-center border border-primary-400 rounded-md px-3">
                <PhoneIcon className="w-4 h-4 text-primary-400 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("placeholders.phone")}
                  className="w-full py-1 outline-none"
                />
              </div>
              <InputError error={errors.phone} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full btn font-semibold hover:bg-primary-600 transition"
            >
              {t("signup")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
