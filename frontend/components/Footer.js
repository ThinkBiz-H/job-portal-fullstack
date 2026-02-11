"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Briefcase,
  Users,
  Smartphone,
  Shield,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Bell,
  Globe,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 bg-[#0F2A44] rounded-2xl p-8 md:p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Get Job Alerts in Your Inbox
              </h3>
              <p className="text-blue-100">
                Never miss an opportunity. Subscribe for daily job updates.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex gap-3 w-full md:w-auto"
            >
              <div className="flex-1 md:flex-none">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full md:w-80 pl-12 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-blue-600 text-gray-900"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-orange-400 text-[#0F2A44] font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* FIND JOBS */}
          <FooterSection
            title="Find Jobs"
            icon={<MapPin className="w-5 h-5" />}
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
            icon={<Building2 className="w-5 h-5" />}
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
            icon={<Briefcase className="w-5 h-5" />}
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
            icon={<Users className="w-5 h-5" />}
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
        </div>

        {/* Bottom Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pt-8 border-t border-gray-300">
          <BottomCol
            title="Quick Links"
            icon={<Smartphone className="w-5 h-5" />}
            items={[
              { text: "Download App", icon: <Download className="w-4 h-4" /> },
              { text: "Free Job Alerts", icon: <Bell className="w-4 h-4" /> },
              { text: "Help Center", icon: <HelpCircle className="w-4 h-4" /> },
            ]}
          />

          <BottomCol
            title="Legal"
            icon={<Shield className="w-5 h-5" />}
            items={[
              { text: "Privacy Policy" },
              { text: "Terms & Conditions" },
              { text: "Refund Policy" },
            ]}
          />

          <BottomCol
            title="Resources"
            icon={<FileText className="w-5 h-5" />}
            items={[{ text: "Blog" }, { text: "Sitemap" }, { text: "Guides" }]}
          />

          <BottomCol
            title="Company"
            icon={<Building2 className="w-5 h-5" />}
            items={[
              { text: "About Us" },
              { text: "Careers" },
              { text: "Contact Us" },
            ]}
          />
        </div>

        {/* App Download & Contact */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">
                  Get the Apna App
                </h4>
                <p className="text-gray-600 text-sm">Find jobs on the go</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                <span>Google Play</span>
              </button>
              <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                <span>App Store</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5" />
                <span className="font-medium">1800-123-4567</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5" />
                <span className="font-medium">support@apna.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <p className="font-semibold text-gray-900">
              © 2024 CAREER LINKER. All rights reserved.
            </p>

            <p className="text-sm text-gray-600">
              Empowering millions to find meaningful employment
            </p>

            <p className="font-semibold text-gray-900">
              Developed by <span className="text-orange-500">ThinkBiz</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===== FOOTER SECTION WITH TOGGLE ===== */
function FooterSection({ title, icon, items }) {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-300 pb-6 last:border-b-0 md:border-b-0">
      {/* TITLE */}
      <div
        className="flex items-center justify-between mb-4 cursor-pointer md:cursor-auto"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center text-blue-600">
            {icon}
          </div>
          <h3 className="font-bold text-xl text-gray-900">{title}</h3>
        </div>
        <button className="md:hidden">
          {open ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* LINKS - Visible on desktop, toggle on mobile */}
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.slice(0, isExpanded ? items.length : 6).map((item, i) => (
            <Link
              key={i}
              href="#"
              className="text-gray-600 hover:text-blue-600 hover:font-medium transition-all duration-200 py-1.5 pl-2 rounded-lg hover:bg-blue-50 flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500"></div>
              {item}
            </Link>
          ))}
        </div>

        {/* VIEW MORE */}
        {items.length > 6 && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
            >
              {isExpanded ? "View Less" : "View More"}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== BOTTOM COLUMN ===== */
function BottomCol({ title, icon, items }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center text-gray-700">
          {icon}
        </div>
        <h4 className="font-bold text-lg text-gray-900">{title}</h4>
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 hover:font-medium transition-all duration-200 flex items-center gap-2 py-1.5 group"
            >
              {item.icon && (
                <span className="text-gray-400 group-hover:text-blue-500">
                  {item.icon}
                </span>
              )}
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
