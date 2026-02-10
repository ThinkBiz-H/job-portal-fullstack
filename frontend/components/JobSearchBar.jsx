
"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

/* DATA */
const JOBS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Web Developer",
  "App Developer",
  "UI UX Designer",
  "Graphic Designer",
  "Digital Marketer",
  "Data Analyst",
  "Software Engineer",
  "Sales Executive",
  "HR Manager",
  "Delivery Boy",
  "Office Assistant",
];

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Chennai",
  "Hyderabad",
  "Jaipur",
  "Indore",
  "Bhopal",
  "Lucknow",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Kolkata",
  "Patna",
  "Ranchi",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Nagpur",
  "Nashik",
  "Thane",
  "Navi Mumbai",
  "Chandigarh",
  "Ludhiana",
  "Amritsar",
];

export default function JobSearchBar() {
  const router = useRouter();
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [exp, setExp] = useState("");
  const [showJob, setShowJob] = useState(false);
  const [showCity, setShowCity] = useState(false);

  const jobResults = JOBS.filter((j) =>
    j.toLowerCase().includes(job.toLowerCase()),
  );

  const cityResults = CITIES.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase()),
  );

  const handleSearch = () => {
    // URL parameters create करें
    const params = new URLSearchParams();
    if (job) params.set("job", job);
    if (exp) params.set("exp", exp);
    if (city) params.set("city", city);

    // JobsPage पर redirect करें with parameters
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-white text-black shadow-xl rounded-2xl flex flex-col md:flex-row items-stretch relative overflow-visible border w-full max-w-5xl mx-auto">
      {/* JOB */}
      <div className="relative flex-1 border-b md:border-b-0 md:border-r">
        <div className="flex items-center px-4 gap-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Job title, skills, company"
            value={job}
            onChange={(e) => {
              setJob(e.target.value);
              setShowJob(true);
            }}
            onFocus={() => setShowJob(true)}
            onBlur={() => setTimeout(() => setShowJob(false), 150)}
            className="w-full py-3 outline-none"
          />
        </div>

        {showJob && job && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-xl mt-1 z-40 max-h-48 overflow-auto">
            {jobResults.length ? (
              jobResults.map((item) => (
                <p
                  key={item}
                  onClick={() => {
                    setJob(item);
                    setShowJob(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                >
                  {item}
                </p>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-400 text-sm">No results</p>
            )}
          </div>
        )}
      </div>

      {/* EXPERIENCE */}
      <div className="flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r">
        <Briefcase size={18} className="text-gray-400" />
        <select
          value={exp}
          onChange={(e) => setExp(e.target.value)}
          className="w-full py-3 outline-none bg-white"
        >
          <option value="">Experience</option>
          {[...Array(16)].map((_, i) => (
            <option key={i} value={i}>
              {i === 0 ? "Fresher" : `${i}+ Years`}
            </option>
          ))}
        </select>
      </div>

      {/* CITY */}
      <div className="relative flex-1">
        <div className="flex items-center px-4 gap-2">
          <MapPin size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowCity(true);
            }}
            onFocus={() => setShowCity(true)}
            onBlur={() => setTimeout(() => setShowCity(false), 150)}
            className="w-full py-3 outline-none"
          />
        </div>

        {showCity && city && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-xl mt-1 z-40 max-h-48 overflow-auto">
            {cityResults.length ? (
              cityResults.map((item) => (
                <p
                  key={item}
                  onClick={() => {
                    setCity(item);
                    setShowCity(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                >
                  {item}
                </p>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-400 text-sm">No results</p>
            )}
          </div>
        )}
      </div>

      {/* SEARCH BUTTON */}
      <button
        onClick={handleSearch}
        className="bg-[#0F2A44] text-white px-6 py-3 font-semibold rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none transition"
      >
        Search
      </button>
    </div>
  );
}
