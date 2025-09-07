"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import { useTranslations } from "next-intl";
export default function LoginPage() {
  const t = useTranslations()
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(username, password); // sets access token
      router.push("/home/patients");
    } catch (err: unknown) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <Image
            src="/images/dark.png"
            alt="Vision test"
            width={300}
            height={300}
            className="w-32 h-11 object-cover"
          />

          {/* Welcome Text */}
          <h2 className="text-text-900 text-2xl font-bold mb-2 text-center">
            {t("welcomeBack")}
          </h2>
          <p className="text-text-900 text-center text-sm mb-6">
            {t("newToTheia")}?{" "}
            <Link href="/signup" className="text-primary-400 font-medium">
              {t("createAnAccount")}.
            </Link>
          </p>
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-text-900">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold mb-1">{t("username")}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("usernamePlaceHolder")}
                required
                className="w-full py-2 px-3 border border-primary-400 rounded-md outline-none"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1">{t("password")}</label>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  required
                  className="w-full py-2 outline-none"
                />
              </div>
              <div className="flex justify-between text-xs mt-2">
              
                <a href="#" className="text-primary-400">
                  {t("forgetPass")}
                </a>
              </div>
            </div>
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn py-2 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : t("login")}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Pattern */}
      <div className="hidden md:flex w-1/2 bg-text-100 items-center justify-center">
        <Image
          src="/images/backgroundPatternB.png"
          alt="pattern"
          width={1200}
          height={1000}
          className="w-[800px] h-full"
        />
      </div>
    </div>
  );
}
