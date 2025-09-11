import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations()

  return (
    <section className="relative h-screen bg-text-100  justify-center overflow-hidden">
      <header className="h-10 w-4/5 mx-auto  py-2.5  bg-transparent flex items-center justify-between">
      <Link
          href="/"
          className="h-full"
        >
          <Image src="/images/dark.png" alt="Vision test" width={300} height={300} className="w-full h-8 object-cover" />
        </Link>
        <nav className="flex gap-2 items-center text-[10px] sm:text-[12px]">
          <Link href="/login" className="text-primary-400">
            {t("login")}        
            </Link>

          <Link
            href="/signup"
            className="btn"
          >
          {t("signup")} 
          </Link>
        </nav>
        
      </header>
      <main className="relative z-10 flex text-center flex-col lg:flex-row  pt-5 items-center sm:justify-between h-full w-4/5 m-auto gap-4">
        {/* Left Text Content */}
        <div className="max-w-xl text-center lg:text-start">
          <h1 className="text-2xl md:text-4xl md:text-5xl font-bold text-text-900 leading-tight">
            <span className="text-primary-400">{t("theia")} </span> {t("heroH1")} <br />
            {t("heroH2")} 
          </h1>
          <p className="mt-6 text-md md:text-lg text-text-900/80">{t("heroP")}</p>
          <div className="hidden lg:block justify-self-end mt-4 mr-6 w-24 h-24 rounded-full border-4 border-primary-400 overflow-hidden">
            <Image src="/images/doctor5.png" alt="Optometrist with patient" width={200} height={200} className="w-full h-full object-cover" />
          </div>

        </div>

        {/* Right Image Grid */}
        <div className="sm:flex-1 mt-8 grid grid-cols-3 lg:grid-cols-2 gap-4 md:gap-6 place-items-center">
          <div className=" w-28 h-28 md:w-48 md:h-48 lg:w-32 lg:h-32  xl:w-36 xl:h-36 rounded-full border-4 border-primary-400 overflow-hidden">
            <Image src="/images/doctor1.png" alt="Doctor using equipment" width={300} height={300} className="w-full h-full object-cover" />
          </div>
          <div className="w-40 h-40 md:w-64 md:h-64 lg:w-48 lg:h-48  xl:w-56 xl:h-56  rounded-full border-4 border-primary-400 overflow-hidden">
            <Image src="/images/doctor2.png" alt="Eye exam" width={200} height={200} className="w-full h-full object-cover" />
          </div>
          <div className="w-28 h-28 md:w-48 md:h-48 lg:w-32  lg:h-32 xl:w-48 xl:h-48 rounded-full border-4 border-primary-400 overflow-hidden">
            <Image src="/images/doctor3.png" alt="Optometrist with patient" width={200} height={200} className="w-full h-full object-cover" />
          </div>
          <div className="hidden lg:block w-40 h-40 md:w-48 md:h-48 xl:w-64 xl:h-64 rounded-full border-4 border-primary-400 overflow-hidden">
            <Image src="/images/doctor4.png" alt="Vision test" width={300} height={300} className="w-full h-full object-cover" />
          </div>
        </div>
      </main>
      <Image src="/images/patternB.png" alt="" width={300} height={600} className="absolute z-8  bottom-[-10px] lg:top-[100px] left-[15%] md:left-[-20px] lg:left-[-160px] aspect-[5/2] h-[360px] md:opacity-60"/>
      <Image src="/images/patternB.png" alt="" width={300} height={600} className="hidden md:block absolute z-8  bottom-[-100px] right-[20px] h-[200px] md:h-[360px]"/>
    </section>
  );
}
