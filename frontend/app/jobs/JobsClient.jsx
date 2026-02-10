"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  Filter,
  X,
  ChevronDown,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  Building,
  Clock,
  Globe,
  SortAsc,
  Search,
  Briefcase,
  Check,
  ChevronRight,
} from "lucide-react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  // URL से parameters पढ़ें
  const jobFromURL = searchParams.get("job") || "";
  const expFromURL = searchParams.get("exp") || "";
  const cityFromURL = searchParams.get("city") || "";

  // Search states
  const [job, setJob] = useState(jobFromURL);
  const [exp, setExp] = useState(expFromURL);
  const [city, setCity] = useState(cityFromURL);

  // All filters state
  const [salary, setSalary] = useState(150000);
  const [workModes, setWorkModes] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [datePosted, setDatePosted] = useState("All");
  const [sortBy, setSortBy] = useState("Relevant");

  // Applied filters (Search ke baad use honge)
  const [appliedJob, setAppliedJob] = useState("");
  const [appliedExp, setAppliedExp] = useState("");
  const [appliedCity, setAppliedCity] = useState("");

  // UI state - फिल्टर open/close के लिए (MOBILE ONLY)
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterCount, setFilterCount] = useState(0);

  // UI state - Desktop के लिए
  const [showJob, setShowJob] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [showCity, setShowCity] = useState(false);

  // Filtered jobs
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to normalize work mode
  const normalizeWorkMode = (workMode = "") => {
    const m = workMode.toLowerCase().replace(/\s+/g, "");

    if (m.includes("home") || m.includes("remote") || m.includes("wfh"))
      return "home";

    if (m.includes("office") || m.includes("onsite")) return "office";

    if (m.includes("hybrid")) return "hybrid";

    return "";
  };

  // Helper function to normalize job type
  const normalizeJobType = (jobType = "") => {
    const t = jobType.toLowerCase().replace(/\s+/g, "");

    if (t.includes("full")) return "full";
    if (t.includes("part")) return "part";
    if (t.includes("intern")) return "intern";
    if (t.includes("contract")) return "contract";

    return "";
  };

  // Filter options (MOBILE)
  const filterOptions = {
    experience: [
      "All",
      "Fresher",
      "1 Years",
      "2 Years",
      "3 Years",
      "4 Years",
      "5 Years",
      "6+ Years",
      "7+ Years",
      "8+ Years",
      "9+ Years",
      "10+ Years",
      "11+ Years",
      "12+ Years",
      "13+ Years",
      "14+ Years",
      "15+ Years",
    ],

    datePosted: [
      "All",
      "Last 24 hours",
      "Last 3 days",
      "Last 7 days",
      "Last 15 days",
      "Last 30 days",
    ],

    salaryRanges: [
      "All",
      "₹10,000 - ₹20,000",
      "₹20,000 - ₹30,000",
      "₹30,000 - ₹40,000",
      "₹40,000 - ₹50,000",
      "₹50,000 - ₹60,000",
      "₹60,000 - ₹70,000",
      "₹70,000+",
    ],

    workMode: ["Work from home", "Work from office", "Hybrid"],

    workType: ["Full time", "Part time", "Internship", "Contract"],

    // ✅ ADD THIS
    sortBy: ["Relevant", "Salary - High to low", "Date posted - New to Old"],
  };

  // Filter chips data (MOBILE)
  const filterChips = [
    { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
    { key: "datePosted", label: "Date posted", icon: <Calendar size={16} /> },
    { key: "salary", label: "Salary", icon: <DollarSign size={16} /> },
    { key: "workMode", label: "Work mode", icon: <Building size={16} /> },
    { key: "workType", label: "Work type", icon: <Clock size={16} /> },
  ];

  /* SUGGESTION DATA - Desktop के लिए */
  const jobTitles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Node Developer",
    "MERN Stack Developer",
    "Java Developer",
    "Python Developer",
    "PHP Developer",
    "Android Developer",
    "iOS Developer",
    "UI UX Designer",
    "Graphic Designer",
    "Software Engineer",
    "QA Tester",
    "DevOps Engineer",
    "Data Analyst",
    "Data Scientist",
    "ML Engineer",
    "Cloud Engineer",
    "System Engineer",
    "IT Support",
    "Network Engineer",
    "Game Developer",
    "Blockchain Developer",
    "Cyber Security Engineer",
    "SEO Executive",
    "Digital Marketer",
    "Content Writer",
  ];

  const experiences = Array.from({ length: 16 }, (_, i) =>
    i === 0 ? "Fresher" : i === 15 ? "15+ Years" : `${i} Years`,
  );

  const cities = [
    "Delhi",
    "Mumbai",
    "Pune",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Noida",
    "Gurgaon",
    "Faridabad",
    "Ghaziabad",
    "Jaipur",
    "Ajmer",
    "Udaipur",
    "Jodhpur",
    "Kota",
    "Bhopal",
    "Indore",
    "Gwalior",
    "Kanpur",
    "Lucknow",
    "Prayagraj",
    "Varanasi",
    "Patna",
    "Ranchi",
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Asansol",
    "Siliguri",
    "Guwahati",
    "Shillong",
    "Imphal",
    "Aizawl",
    "Agartala",
    "Chandigarh",
    "Mohali",
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Dehradun",
    "Haridwar",
    "Roorkee",
    "Shimla",
    "Manali",
    "Panaji",
    "Margao",
    "Surat",
    "Vadodara",
    "Ahmedabad",
    "Rajkot",
    "Bhavnagar",
  ];

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // When URL params change, update state
  useEffect(() => {
    setJob(jobFromURL);
    setExp(expFromURL);
    setCity(cityFromURL);
    if (jobFromURL || expFromURL || cityFromURL) {
      handleSearch();
    }
  }, [jobFromURL, expFromURL, cityFromURL]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/jobs`);

      const jobs = Array.isArray(res.data?.data) ? res.data.data : [];

      setJobsData(jobs);
      setFilteredJobs(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);

      setJobsData([]);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate active filter count (MOBILE)
  useEffect(() => {
    let count = 0;
    if (exp !== "" && exp !== "All") count++;
    if (datePosted !== "All") count++;
    if (salary < 150000) count++;
    if (workModes.length > 0) count++;
    if (workTypes.length > 0) count++;
    setFilterCount(count);
  }, [exp, datePosted, salary, workModes, workTypes]);

  // Apply filters whenever filter states change
  useEffect(() => {
    if (jobsData.length > 0) {
      applyFilters();
    }
  }, [
    appliedJob,
    appliedExp,
    appliedCity,
    datePosted,
    salary,
    workModes,
    workTypes,
    sortBy,
  ]);

  // ================= SEARCH FUNCTION =================
  const handleSearch = () => {
    const j = job.trim();
    const e = exp.trim();
    const c = city.trim();

    setAppliedJob(j);
    setAppliedExp(e);
    setAppliedCity(c);

    const params = new URLSearchParams();

    if (j) params.set("job", j);
    if (e) params.set("exp", e);
    if (c) params.set("city", c);

    router.push(`/jobs?${params.toString()}`);
  };

  const applyFilters = () => {
    if (!jobsData.length) return;

    let filtered = [...jobsData];

    const finalJob = appliedJob.toLowerCase();
    const finalCity = appliedCity.toLowerCase();
    const finalExp = appliedExp;

    /* ===== JOB ===== */
    if (finalJob) {
      filtered = filtered.filter((j) =>
        j.title?.toLowerCase().includes(finalJob),
      );
    }

    /* ===== CITY ===== */
    if (finalCity) {
      filtered = filtered.filter((j) =>
        j.location?.toLowerCase().includes(finalCity),
      );
    }

    /* ===== EXPERIENCE ===== */
    if (finalExp && finalExp !== "All") {
      const expNum = parseInt(finalExp);

      filtered = filtered.filter((j) => {
        const min = j.experience?.min || 0;
        const max = j.experience?.max || 99;

        return expNum >= min && expNum <= max;
      });
    }

    /* ===== DATE ===== */
    if (datePosted !== "All") {
      const now = new Date();

      filtered = filtered.filter((j) => {
        const d = new Date(j.createdAt);
        const days = (now - d) / (1000 * 60 * 60 * 24);

        if (datePosted === "Last 24 hours") return days <= 1;
        if (datePosted === "Last 3 days") return days <= 3;
        if (datePosted === "Last 7 days") return days <= 7;
        if (datePosted === "Last 15 days") return days <= 15;
        if (datePosted === "Last 30 days") return days <= 30;

        return true;
      });
    }

    /* ===== SALARY ===== */
    if (salary < 150000) {
      filtered = filtered.filter((j) => (j.salary?.max || 0) <= salary);
    }

    /* ===== WORK MODE ===== */
    /* ===== WORK MODE ===== */
    if (workModes.length > 0) {
      filtered = filtered.filter((j) => {
        const jobMode = normalizeWorkMode(j.workMode);

        return workModes.some((m) => normalizeWorkMode(m) === jobMode);
      });
    }

    /* ===== WORK TYPE ===== */
    /* ===== WORK TYPE ===== */
    if (workTypes.length > 0) {
      filtered = filtered.filter((j) => {
        const type = normalizeJobType(j.jobType);

        return workTypes.some((t) => normalizeJobType(t) === type);
      });
    }

    /* ===== SORT ===== */
    if (sortBy === "Salary - High to low") {
      filtered.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
    } else if (sortBy === "Date posted - New to Old") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredJobs(filtered);
  };

  // Enter key press handle करें
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setJob("");
    setExp("");
    setCity("");
    setAppliedJob("");
    setAppliedExp("");
    setAppliedCity("");
    setDatePosted("All");
    setSalary(150000);
    setWorkModes([]);
    setWorkTypes([]);
    setSortBy("Relevant");
    router.push("/jobs");
    setFilteredJobs(jobsData);
  };

  // ================= MOBILE SPECIFIC FUNCTIONS =================
  const getFilterDisplayValue = (filterKey) => {
    switch (filterKey) {
      case "experience":
        return exp === "" || exp === "All" ? "Experience" : exp;
      case "datePosted":
        return datePosted === "All" ? "Date posted" : datePosted;
      case "salary":
        return salary === 150000 ? "Salary" : `₹${salary.toLocaleString()}`;
      case "workMode":
        return workModes.length === 0
          ? "Work mode"
          : `${workModes.length} selected`;
      case "workType":
        return workTypes.length === 0
          ? "Work type"
          : `${workTypes.length} selected`;
      default:
        return filterKey;
    }
  };

  const isFilterActive = (filterKey) => {
    switch (filterKey) {
      case "experience":
        return exp !== "" && exp !== "All";
      case "datePosted":
        return datePosted !== "All";
      case "salary":
        return salary < 150000;
      case "workMode":
        return workModes.length > 0;
      case "workType":
        return workTypes.length > 0;
      default:
        return false;
    }
  };

  const closeActiveFilter = () => {
    setActiveFilter(null);
    applyFilters();
  };

  // Render mobile filter dropdown content
  const renderMobileFilterContent = () => {
    if (!activeFilter) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
          {/* Filter Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {filterChips.find((f) => f.key === activeFilter)?.icon}
              <h3 className="font-semibold text-lg">
                {filterChips.find((f) => f.key === activeFilter)?.label}
              </h3>
            </div>
            <button onClick={closeActiveFilter} className="p-2">
              <X size={24} />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeFilter === "experience" && (
              <div className="space-y-2">
                {filterOptions.experience.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setExp(option === "All" ? "" : option);
                      setTimeout(closeActiveFilter, 200);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                      exp === (option === "All" ? "" : option)
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>{option}</span>
                    {exp === (option === "All" ? "" : option) && (
                      <Check size={20} className="text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeFilter === "datePosted" && (
              <div className="space-y-2">
                {filterOptions.datePosted.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setDatePosted(option);
                      setTimeout(closeActiveFilter, 200);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
                      datePosted === option
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span>{option}</span>
                    {datePosted === option && (
                      <Check size={20} className="text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeFilter === "salary" && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹10,000</span>
                  <span>₹1.5 Lakhs</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                />
                <div className="text-center font-medium text-lg">
                  ₹{salary.toLocaleString()}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.salaryRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        if (range === "All") setSalary(150000);
                        else if (range === "₹70,000+") setSalary(70000);
                        setTimeout(closeActiveFilter, 200);
                      }}
                      className={`px-4 py-3 rounded-lg border text-sm font-medium ${
                        salary === 150000 && range === "All"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeFilter === "workMode" && (
              <div className="space-y-3">
                {filterOptions.workMode.map((option) => (
                  <label
                    key={option}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="font-medium">{option}</span>
                    <input
                      type="checkbox"
                      checked={workModes.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setWorkModes([...workModes, option]);
                        } else {
                          setWorkModes(
                            workModes.filter((item) => item !== option),
                          );
                        }
                      }}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            )}

            {activeFilter === "workType" && (
              <div className="space-y-3">
                {filterOptions.workType.map((option) => (
                  <label
                    key={option}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="font-medium">{option}</span>
                    <input
                      type="checkbox"
                      checked={workTypes.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setWorkTypes([...workTypes, option]);
                        } else {
                          setWorkTypes(
                            workTypes.filter((item) => item !== option),
                          );
                        }
                      }}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Filter Footer */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  switch (activeFilter) {
                    case "experience":
                      setExp("");
                      break;
                    case "datePosted":
                      setDatePosted("All");
                      break;
                    case "salary":
                      setSalary(150000);
                      break;
                    case "workMode":
                      setWorkModes([]);
                      break;
                    case "workType":
                      setWorkTypes([]);
                      break;
                  }
                }}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={closeActiveFilter}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden lg:block">
        {/* ================= SEARCH BAR ================= */}
        <div className="bg-white border-b py-6 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-4">
              {/* JOB TITLE */}
              <div className="relative flex-1">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
                  <Search size={20} className="text-gray-400 mr-3" />
                  <input
                    placeholder="Job title, keywords, or company"
                    value={job}
                    onChange={(e) => {
                      setJob(e.target.value);
                      setShowJob(true);
                    }}
                    onFocus={() => setShowJob(true)}
                    onBlur={() => setTimeout(() => setShowJob(false), 150)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>

                {/* SUGGESTION */}
                {showJob && job && (
                  <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium text-gray-700">
                        Suggestions
                      </p>
                    </div>
                    {jobTitles
                      .filter((j) =>
                        j.toLowerCase().includes(job.toLowerCase()),
                      )
                      .slice(0, 8)
                      .map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setJob(item);
                            setShowJob(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center justify-between"
                        >
                          <span>{item}</span>
                          <ChevronRight size={16} className="text-gray-400" />
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* EXPERIENCE */}
              <div className="relative w-48">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
                  <Briefcase size={20} className="text-gray-400 mr-3" />
                  <input
                    placeholder="Experience"
                    value={exp}
                    onChange={(e) => {
                      setExp(e.target.value);
                      setShowExp(true);
                    }}
                    onFocus={() => setShowExp(true)}
                    onBlur={() => setTimeout(() => setShowExp(false), 150)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>

                {showExp && (
                  <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
                    {experiences
                      .filter(
                        (e) =>
                          exp === "" ||
                          e.toLowerCase().includes(exp.toLowerCase()),
                      )
                      .map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setExp(item);
                            setShowExp(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0"
                        >
                          {item}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* LOCATION */}
              <div className="relative w-56">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
                  <MapPin size={20} className="text-gray-400 mr-3" />
                  <input
                    placeholder="City, state, or zip"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setShowCity(true);
                    }}
                    onFocus={() => setShowCity(true)}
                    onBlur={() => setTimeout(() => setShowCity(false), 150)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>

                {showCity && city && (
                  <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium text-gray-700">
                        Popular Cities
                      </p>
                    </div>
                    {cities
                      .filter((c) =>
                        c.toLowerCase().includes(city.toLowerCase()),
                      )
                      .slice(0, 8)
                      .map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setCity(item);
                            setShowCity(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center"
                        >
                          <MapPin size={16} className="mr-3 text-gray-400" />
                          <span>{item}</span>
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* SEARCH BTN */}
              <button
                onClick={handleSearch}
                className="bg-[#0F2A44] hover:bg-orange-400 text-white px-8 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-[#0F2A44] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : (
            <div className="flex gap-8">
              {/* ================= FILTERS SIDEBAR ================= */}
              <div className="w-64 flex-shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6 sticky top-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                    {filterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* DATE POSTED */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar size={16} />
                      Date posted
                    </h4>
                    <div className="space-y-2">
                      {[
                        "All",
                        "Last 24 hours",
                        "Last 3 days",
                        "Last 7 days",
                        "Last 30 days",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="date"
                              checked={datePosted === item}
                              onChange={() => {
                                setDatePosted(item);
                              }}
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          <span className="text-gray-600 group-hover:text-gray-800">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* SALARY */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <DollarSign size={16} />
                      Monthly Salary
                    </h4>
                    <div className="space-y-3">
                      <div className="px-1">
                        <input
                          type="range"
                          min="10000"
                          max="150000"
                          step="5000"
                          value={salary}
                          onChange={(e) => {
                            setSalary(Number(e.target.value));
                          }}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>₹10K</span>
                        <span>₹{salary.toLocaleString()}</span>
                        <span>₹1.5L</span>
                      </div>
                    </div>
                  </div>

                  {/* WORK MODE */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Building size={16} />
                      Work Mode
                    </h4>
                    <div className="space-y-2">
                      {["Work from home", "Work from office", "Hybrid"].map(
                        (item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={workModes.includes(item)}
                              onChange={() => {
                                setWorkModes((prev) =>
                                  prev.includes(item)
                                    ? prev.filter((m) => m !== item)
                                    : [...prev, item],
                                );
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-600 group-hover:text-gray-800">
                              {item}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  {/* WORK TYPE */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Clock size={16} />
                      Work Type
                    </h4>
                    <div className="space-y-2">
                      {["Full time", "Part time", "Internship", "Contract"].map(
                        (item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={workTypes.includes(item)}
                              onChange={() => {
                                setWorkTypes((prev) =>
                                  prev.includes(item)
                                    ? prev.filter((t) => t !== item)
                                    : [...prev, item],
                                );
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-600 group-hover:text-gray-800">
                              {item}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  {/* SORT BY */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <SortAsc size={16} />
                      Sort By
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Relevant",
                        "Salary - High to low",
                        "Date posted - New to Old",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name="sort"
                              checked={sortBy === item}
                              onChange={() => {
                                setSortBy(item);
                              }}
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          <span className="text-gray-600 group-hover:text-gray-800">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= JOB LIST ================= */}
              <div className="flex-1">
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                  <h2 className="font-bold text-xl text-gray-800 mb-2">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  {(job || exp || city) && (
                    <p className="text-gray-600">
                      {job && `"${job}"`}
                      {exp && ` • ${exp}`}
                      {city && ` • ${city}`}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((jobItem) => (
                      <JobCard key={jobItem._id} job={jobItem} />
                    ))
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        No jobs found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your search criteria or filters
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="px-6 py-3 bg-[#0F2A44] text-white rounded-lg font-medium hover:bg-orange-400 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="lg:hidden">
        {/* ================= HEADER ================= */}
        <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
          <div className="p-4">
            {/* ================= SEARCH BAR ================= */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    placeholder="Job title, skills"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input
                    placeholder="City, state"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="bg-[#0F2A44] hover:bg-[#0F2A44] text-white px-4 py-3 rounded-lg flex justify-center items-center transition-colors"
              >
                <Search size={20} />
              </button>
            </div>

            {/* ================= SEARCH TITLE ================= */}
            <div className="mb-2">
              <h2 className="font-bold text-lg">
                {job || city
                  ? `${job}${job && city ? ", " : ""}${city}`
                  : "All Jobs"}
                <span className="text-gray-600 text-sm ml-2">
                  ({filteredJobs.length} jobs)
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* ================= FILTERS BAR ================= */}
        <div className="bg-white border-b px-4 py-3 sticky top-[140px] z-20 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Filter size={18} />
              <span className="font-bold">Filters</span>
              {filterCount > 0 && (
                <span className="bg-blue-100 text-orange-400 text-xs font-medium px-2 py-1 rounded-full">
                  {filterCount} Applied
                </span>
              )}
            </div>

            {filterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-red-600 text-sm font-medium flex items-center gap-1"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>

          {/* ================= FILTER CHIPS ROW ================= */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterChips.map((chip) => {
              const isActive = isFilterActive(chip.key);
              const displayValue = getFilterDisplayValue(chip.key);

              return (
                <button
                  key={chip.key}
                  onClick={() =>
                    setActiveFilter(activeFilter === chip.key ? null : chip.key)
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  {chip.icon}
                  <span className="text-sm font-medium">{displayValue}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      activeFilter === chip.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= SORT BY ================= */}
        <div className="bg-white border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <SortAsc size={18} className="text-gray-600" />
            <span className="font-medium text-gray-700">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none font-medium"
            >
              {(filterOptions.sortBy || []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= FILTER DROPDOWN ================= */}
        {renderMobileFilterContent()}

        {/* ================= JOB LIST ================= */}
        <div className="p-4">
          {loading ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-4 text-gray-800">
                {filteredJobs.length} Jobs Found
              </h3>

              {filteredJobs.length > 0 ? (
                <div className="space-y-3">
                  {filteredJobs.map((jobItem) => (
                    <MobileJobCard key={jobItem._id} job={jobItem} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-6 text-center mt-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try changing your search criteria
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium w-full"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================= DESKTOP JOB CARD ================= */
function JobCard({ job }) {
  // Safely extract values with fallbacks
  const jobTitle = job?.title || "Job Title";
  const company = job?.company || "Company Name";
  const location = job?.location || "Location Not Specified";

  // Salary handling - MongoDB format
  const salaryMin = job?.salary?.min || 0;
  const salaryMax = job?.salary?.max || 0;

  // Experience handling - MongoDB format
  const expMin = job?.experience?.min || 0;
  const expMax = job?.experience?.max || 0;

  const jobType = job?.jobType || "Full Time";
  const workMode = job?.workMode || "Office";
  const category = job?.category || "General";
  const description = job?.description || "";

  // Skills access
  const skills = job?.skillsRequired || job?.skills || [];

  // Benefits
  const benefits = Array.isArray(job?.benefits)
    ? job.benefits
    : job?.benefits
      ? [job.benefits]
      : [];

  // Calculate days ago
  const daysAgo = Math.floor(
    (new Date() - new Date(job?.createdAt || new Date())) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white p-6 rounded-xl shadow-sm border hover:border-[#0F2A44] cursor-pointer hover:shadow-md transition-all duration-200 group">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-[#0F2A44]  mb-1">
              {jobTitle}
            </h3>
            <p className="text-gray-600 font-medium mb-2">{company}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1 uppercase">
                <MapPin size={14} />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={14} />
                {expMin} years
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-orange-400">
              {salaryMin} - {salaryMax} LPA
            </p>
            <p className="text-gray-500 text-sm">per month</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        {description && (
          <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
        )}

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap mb-4">
          <span className="bg-blue-50 text-[#0F2A44] px-3 py-1 rounded-full text-sm font-medium uppercase">
            {jobType}
          </span>
          <span className="bg-purple-50 text-orange-500 px-3 py-1 rounded-full text-sm font-medium uppercase">
            {workMode}
          </span>
          {/* {category && (
            <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
              
            </span>
          )} */}
        </div>

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
            <div className="flex gap-2 flex-wrap">
              {skills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="text-gray-500 text-sm">
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* BENEFITS */}
        {benefits.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
            <div className="flex gap-2 flex-wrap">
              {benefits.slice(0, 3).map((benefit, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-[#0F2A44] px-3 py-1 rounded-full text-base"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {daysAgo === 0
                ? "Today"
                : daysAgo === 1
                  ? "Yesterday"
                  : `${daysAgo} days ago`}
            </span>
            {job?.isUrgent && (
              <span className="text-red-600 font-medium">🔥 Urgent</span>
            )}
            {job?.isFeatured && (
              <span className="text-yellow-600 font-medium">⭐ Featured</span>
            )}
          </div>
          <button className="text-[#0F2A44] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}

/* ================= MOBILE JOB CARD ================= */
function MobileJobCard({ job }) {
  // Safely extract values - MongoDB format
  const title = job?.title || "Job Title";
  const company = job?.company || "Company";
  const location = job?.location || "Location";

  // Salary - MongoDB format
  const salaryMin = job?.salary?.min || 0;
  const salaryMax = job?.salary?.max || 0;

  const jobType = job?.jobType || "Full Time";

  // Experience - MongoDB format
  const expMin = job?.experience?.min || 0;
  const expMax = job?.experience?.max || 0;

  // Skills access
  const skills = job?.skillsRequired || job?.skills || [];

  const daysAgo = Math.floor(
    (new Date() - new Date(job?.createdAt || new Date())) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl border p-4 hover:border-blue-400 transition-colors active:bg-gray-50">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 font-medium text-sm">{company}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">
              {salaryMin} - {salaryMax} LPA
            </p>
            {/* <p className="text-gray-500 text-xs uppercase">annual</p> */}
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex items-center text-gray-600 text-sm mb-3 uppercase">
          <MapPin size={14} className="mr-2" />
          {location}
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full uppercase">
            {jobType}
          </span>
          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
            {expMin} Year
          </span>
          {job?.workMode && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
              {job.workMode}
            </span>
          )}
          {job?.category && (
            <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-full">
              {job.category}
            </span>
          )}
        </div>

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            {daysAgo === 0
              ? "Today"
              : daysAgo === 1
                ? "Yesterday"
                : `${daysAgo} days ago`}
          </div>
          <span className="text-blue-600 font-medium">View →</span>
        </div>
      </div>
    </Link>
  );
}
