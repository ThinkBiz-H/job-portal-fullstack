    "use client";

import Image from "next/image";
import Link from "next/link";

export default function EmployerSection() {
  return (
    <section className="py-14 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        <div
          className="bg-[#eefaf5] rounded-3xl
          flex flex-col lg:flex-row
          items-center justify-between
          px-6 md:px-12 py-10
          gap-8"
        >

          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/images/employer.png"
              width={420}
              height={420}
              alt="Employer"
              className="object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">

            <span className="inline-block mb-4
              text-green-700 font-semibold
              bg-green-100 px-4 py-1 rounded-full text-sm"
            >
              APNA FOR EMPLOYERS
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to hire?
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Find the best candidate from 5 crore+ active job seekers!
            </p>

            <Link
              href="/employer/post-job"
              className="inline-flex items-center gap-2
              border border-green-600 text-green-700
              px-8 py-3 rounded-lg
              hover:bg-green-600 hover:text-white transition"
            >
              Post job →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
