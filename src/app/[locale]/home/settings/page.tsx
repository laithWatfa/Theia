"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getUserProfile } from "@/lib/users";

type Profile = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  spicialzaton: string;
  phone: string;
};

const staticProfile = {
    "id": 8,
    "username": "John 2727",
    "first_name": "Magd",
    "last_name": "Hndi",
    "email": "doctor.new@example.com",
    "spicialzaton": "Eyes",
    "phone": "1234567890"
}

export default function SettingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";
  const [selected, setSelected] = useState(currentLocale);

  const [profile, setProfile] = useState<Profile | null>(staticProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(); 
        setProfile(data);
        // setProfile(staticProfile);
    } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLocale = event.target.value;
    setSelected(newLocale);

    localStorage.setItem("preferredLocale", newLocale);
    document.cookie = `preferredLocale=${newLocale}; path=/; max-age=31536000`;

    const newPath = [segments[0], newLocale, ...segments.slice(2)].join("/");
    router.push(newPath);
  };

  return (
    <div className="mx-auto px-6">
      {/* Profile Section */}
      {loading ? (
        <p className="text-text-700">{t("loading")}...</p>
      ) : error ? (
        <p className="text-red-800">{error}</p>
      ) : profile ? (
        <div className="mb-4 border-b pb-4">
          <h2 className="text-xl font-semibold mb-2 w-fit border-b-2 border-primary-700">{t("profileInfo")}</h2>
          <div className="py-2 border-b-1 border-text-300">
            <span className="font-bold py-2">{t("fullName")}:</span>{" "}
            {profile.first_name} {profile.last_name}
          </div>
          <div className="py-2 border-b-1 border-text-300">
            <span className="font-bold">{t("username")}:</span>{" "}
            {profile.username}
          </div>
          <div className="py-2 border-b-1 border-text-300">
            <span className="font-bold">{t("email")}:</span> {profile.email}
          </div>
          <div className="py-2 border-b-1 border-text-300">
            <span className="font-bold">{t("specialization")}:</span>{" "}
            {profile.spicialzaton}
          </div>
          <div className="py-2 ">
            <span className="font-bold">{t("phone")}:</span> {profile.phone}
          </div>
        </div>
      ) : null}

      {/* Language Settings */}
      <p className="mb-2 text-gray-700 font-bold">{t("chooseLanguage")}</p>

      <form className="flex items-center gap-5">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="language"
            value="en"
            checked={selected === "en"}
            onChange={handleChange}
          />
          {t("english")}
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="language"
            value="ar"
            checked={selected === "ar"}
            onChange={handleChange}
          />
          {t("arabic")}
        </label>
      </form>
    </div>
  );
}
