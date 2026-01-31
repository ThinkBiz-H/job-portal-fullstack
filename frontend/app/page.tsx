"use client";

import Image from "next/image";
import CompanySlider from "@/components/CompanySlider";
import TestimonialSlider from "@/components/TestimonialSlider";
import PopularSearches from "@/components/PopularSearches";
import JobSearchBar from "@/components/JobSearchBar";
import TopCompaniesSlider from "@/components/TopCompaniesSlider";
import TrendingRolesSlider from "@/components/TrendingRolesSlider";
import EmployerSection from "@/components/EmployerSection";

export default function Home() {
  return (
    <>
    <main className="bg-[#fafafa]">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-orange-400 text-4xl font-semibold mb-3">
              INDIA&apos;S #1 JOB PLATFORM
            </p>

            <h1 className="text-4xl md:text-6xl text-black font-bold leading-tight mb-4">
              Your job search ends here
            </h1>

            <p className="text-gray-900 text-xl font-semibold mb-8">
              Discover 50 lakh+ career opportunities
            </p>

            {/* SEARCH BAR */}
            <JobSearchBar />

            {/* SUPPORT */}
            <p className="font-semibold mt-8 text-black text-xl" >Proud to Support</p>

            <div className="flex flex-wrap gap-4 mt-8">

              <img src="	https://cdn.apna.co/apna-learn/Support%20Icons/DPIIT-header-new.png" className="h-18" />
              <img src="	https://cdn.apna.co/apna-learn/Support%20Icons/aicte-seeklogo.png" className="h-18" />
               <img src="		https://cdn.apna.co/apna-learn/Support%20Icons/ministry-of-labour-and-employment-logo.png" className="h-18" />

            </div>

            {/* TRUSTED */}
            <p className="font-semibold mt-8 text-orange-500 text-xl">
              Trusted by 1000+ enterprises and 7 lakh+ MSMEs for hiring
            </p>

    <CompanySlider />

</div>


          {/* RIGHT IMAGE */}
          <div className="flex justify-center">

            <Image
              src="/images/hero1.png"   // 👈 Apni image yahan daal
              alt="Job Model"
              width={420}
              height={520}
              priority
              className="object-contain"
            />

          </div>

        </div>

      </section>

    </main>
    <PopularSearches />
    <TopCompaniesSlider />
    <TrendingRolesSlider/>
    <TestimonialSlider />
     <EmployerSection />
    </>
  );
}
