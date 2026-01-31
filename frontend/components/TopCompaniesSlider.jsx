"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const companies = [
  {
    name: "Bajaj Allianz Life Insurance",
    logo: "/logos/bajaj.png",
    desc: "Provider of life insurance and financial services.",
    slug: "bajaj",
  },
  {
    name: "Paytm Service Pvt. Ltd.",
    logo: "/logos/paytm.png",
    desc: "Digital payment and e-commerce facilitator.",
    slug: "paytm",
  },
  {
    name: "Zomato",
    logo: "/logos/zomato.png",
    desc: "Online food delivery marketplace.",
    slug: "zomato",
  },
  {
    name: "Swiggy",
    logo: "/logos/swigee.png",
    desc: "Food delivery and ordering platform.",
    slug: "swiggy",
  },
  {
    name: "Kotak Life",
    logo: "/logos/kotak.png",
    desc: "Life insurance company.",
    slug: "kotak",
  },
  {
    name: "Amazon",
    logo: "/logos/amazon.png",
    desc: "E-commerce platform.",
    slug: "amazon",
  },
];

export default function TopCompaniesSlider() {
  const sliderRef = useRef(null);

  return (
    <section className="bg-[#f7f7f9] py-6">

      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Job Openings in Top Companies
        </h2>

        {/* SLIDER */}
<div
  ref={sliderRef}
  className="flex gap-5 overflow-x-auto scroll-smooth
  pb-2 px-1 snap-x snap-mandatory
  scrollbar-hide"
>

          {companies.map((item, i) => (
            <div
              key={i}
             className="snap-start min-w-[280px] md:min-w-[320px]
bg-white rounded-2xl border border-gray-200
p-7 shadow-sm transition-all duration-300
hover:shadow-xl
flex flex-col min-h-[420px]"

            >

              {/* LOGO */}
              <div className="h-32 mb-5 relative">
                <Image
                  src={item.logo}
                  fill
                  alt={item.name}
                  className="object-contain"
                />
              </div>

              {/* NAME */}
              <h3 className="font-semibold text-black text-xl mb-2">
                {item.name}
              </h3>

              {/* DESC */}
              <p className="text-lg text-gray-600 mb-6 leading-relaxed line-clamp-3">

                {item.desc}
              </p>

              {/* BUTTON */}
             <Link
  href={`/jobs?company=${item.slug}`}
  className="mt-auto inline-flex items-center gap-2
  text-green-700 font-medium text-lg
  px-4 py-2 rounded-lg
  border border-green-700
  transition-all duration-300
  hover:bg-green-700 hover:text-white"
>
  View jobs →
</Link>


            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
