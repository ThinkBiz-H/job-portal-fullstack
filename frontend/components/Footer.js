"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f9] border-t py-14 text-sm">

      <div className="max-w-7xl mx-auto px-4">

        {/* FIND JOBS */}
        <FooterSection
          title="Find Jobs"
          items={[
            "Jobs in Agra",
            "Jobs in Ajmer",
            "Jobs in Asansol",
            "Jobs in Belagavi",
            "Jobs in Bhopal",
            "Jobs in Jaipur",
            "Jobs in Delhi",
            "Jobs in Mumbai",
            "Jobs in Pune",
            "Jobs in Surat",
            "Jobs in Indore",
            "Jobs in Kanpur",
          ]}
        />

        {/* START HIRING */}
        <FooterSection
          title="Start Hiring"
          items={[
            "Hire in Agra",
            "Hire in Ajmer",
            "Hire in Asansol",
            "Hire in Belagavi",
            "Hire in Ahmedabad",
            "Hire in Bangalore",
            "Hire in Delhi",
            "Hire in Mumbai",
          ]}
        />

        {/* POPULAR JOBS */}
        <FooterSection
          title="Popular Jobs"
          items={[
            "Delivery Person Jobs",
            "Telecaller / BPO",
            "Accounts Jobs",
            "Work From Home",
            "Night Shift Jobs",
            "Freshers Jobs",
            "Part Time Jobs",
            "Jobs for Women",
          ]}
        />

        {/* JOBS BY DEPARTMENT */}
        <FooterSection
          title="Jobs by Department"
          items={[
            "Admin / Back Office",
            "Banking Jobs",
            "Customer Support",
            "Advertising",
            "Beauty & Fitness",
            "Data Science",
            "Aviation Jobs",
            "Construction Jobs",
            "Delivery Jobs",
          ]}
        />

        {/* BOTTOM */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 text-black border-t">

          <BottomCol
            title="Links"
            items={["Download App", "Free Job Alerts", "Help Center"]}
          />

          <BottomCol
            title="Legal"
            items={["Privacy Policy", "Terms & Conditions", "Refund Policy"]}
          />

          <BottomCol
            title="Resources"
            items={["Blog", "Sitemap", "Guides"]}
          />

          <BottomCol
            title="Company"
            items={["About Us", "Careers", "Contact"]}
          />

        </div>

      </div>

    </footer>
  );
}

/* ===== FOOTER SECTION WITH TOGGLE ===== */

function FooterSection({ title, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-6 text-black">

      {/* TITLE */}
      <h3 className="font-semibold text-2xl mb-4">
        {title}
      </h3>

      {/* LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {items
          .slice(0, open ? items.length : 4)
          .map((item, i) => (
            <Link
              key={i}
              href="#"
              className="text-gray-400 text-base hover:text-black"
            >
              {item}
            </Link>
          ))}

      </div>

      {/* VIEW MORE */}
      {items.length > 4 && (
       <div className="flex justify-center mt-3">
  <button
    onClick={() => setOpen(!open)}
    className="text-black text-base font-medium "
  >
    {open ? "View Less ▲" : "View More ▼"}
  </button>
</div>
      )}

    </div>
  );
}

/* ===== BOTTOM COLUMN ===== */

function BottomCol({ title, items }) {
  return (
    <div>

      <h4 className="font-semibold  text-2xl black mb-3">
        {title}
      </h4>

      <ul className="space-y-2">

        {items.map((item, i) => (
          <li key={i}>
            <Link
              href="#"
              className="text-gray-900 text-xl"
            >
              {item}
            </Link>
          </li>
        ))}

      </ul>

    </div>
  );
}
