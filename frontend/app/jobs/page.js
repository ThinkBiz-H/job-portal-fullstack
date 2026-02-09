// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { useSearchParams } from "next/navigation";
// // import {
// //   Filter,
// //   X,
// //   ChevronDown,
// //   MapPin,
// //   Calendar,
// //   DollarSign,
// //   GraduationCap,
// //   Building,
// //   Clock,
// //   Globe,
// //   SortAsc,
// //   Search,
// //   Briefcase,
// // } from "lucide-react";

// // /* DUMMY JOBS */
// // const jobsData = [
// //   {
// //     id: 1,
// //     title: "Frontend Developer",
// //     company: "Satsai Pvt Ltd",
// //     location: "New Delhi",
// //     salary: 28000,
// //     type: "Full time",
// //     mode: "Work from office",
// //     exp: "2 Years",
// //     postedDate: "2024-01-10",
// //     distance: 8,
// //     shift: "Day shift",
// //     education: "Bachelor's Degree",
// //     department: "Engineering",
// //     englishLevel: "Intermediate",
// //   },
// //   {
// //     id: 2,
// //     title: "Web Developer",
// //     company: "Dragons Consultancy",
// //     location: "Noida",
// //     salary: 20000,
// //     type: "Full time",
// //     mode: "Work from office",
// //     exp: "3 Years",
// //     postedDate: "2024-01-14",
// //     distance: 15,
// //     shift: "Day shift",
// //     education: "Diploma",
// //     department: "IT",
// //     englishLevel: "Basic",
// //   },
// //   {
// //     id: 3,
// //     title: "MERN Stack Developer",
// //     company: "Vastora Tech",
// //     location: "Noida",
// //     salary: 25000,
// //     type: "Full time",
// //     mode: "Work from office",
// //     exp: "Any Experience",
// //     postedDate: "2024-01-15",
// //     distance: 3,
// //     shift: "Night shift",
// //     education: "Bachelor's Degree",
// //     department: "Engineering",
// //     englishLevel: "Fluent",
// //   },
// //   {
// //     id: 4,
// //     title: "React Developer",
// //     company: "TechSoft",
// //     location: "Gurgaon",
// //     salary: 35000,
// //     type: "Full time",
// //     mode: "Work from home",
// //     exp: "1 Years",
// //     postedDate: "2024-01-12",
// //     distance: 25,
// //     shift: "Day shift",
// //     education: "Master's Degree",
// //     department: "Software Development",
// //     englishLevel: "Advanced",
// //   },
// //   {
// //     id: 5,
// //     title: "Backend Developer",
// //     company: "Infosys",
// //     location: "Bangalore",
// //     salary: 45000,
// //     type: "Full time",
// //     mode: "Work from office",
// //     exp: "4 Years",
// //     postedDate: "2024-01-09",
// //     distance: 45,
// //     shift: "Night shift",
// //     education: "Bachelor's Degree",
// //     department: "Engineering",
// //     englishLevel: "Fluent",
// //   },
// // ];

// // // 🔥 AUTO CREATE MORE (30+)
// // for (let i = 6; i <= 35; i++) {
// //   const daysAgo = i % 10;
// //   const postedDate = new Date();
// //   postedDate.setDate(postedDate.getDate() - daysAgo);

// //   const educations = [
// //     "High School",
// //     "Diploma",
// //     "Bachelor's Degree",
// //     "Master's Degree",
// //   ];
// //   const departments = [
// //     "Engineering",
// //     "IT",
// //     "Sales",
// //     "Marketing",
// //     "HR",
// //     "Finance",
// //   ];
// //   const englishLevels = ["Basic", "Intermediate", "Fluent", "Advanced"];

// //   jobsData.push({
// //     id: i,
// //     title: [
// //       "Frontend Developer",
// //       "React Developer",
// //       "Web Developer",
// //       "Node Developer",
// //       "Franchise Sales Manager",
// //       "Business Development Manager",
// //     ][i % 6],
// //     company: "Company " + i,
// //     location: ["Delhi", "Noida", "Gurgaon", "Pune", "Mumbai", "Bangalore"][
// //       i % 6
// //     ],
// //     salary: 15000 + i * 1000,
// //     type: ["Full time", "Part time", "Internship"][i % 3],
// //     mode: ["Work from office", "Work from home", "Hybrid"][i % 3],
// //     exp: `${i % 6} Years`,
// //     postedDate: postedDate.toISOString().split("T")[0],
// //     distance: (i % 50) + 1,
// //     shift: ["Day shift", "Night shift", "Flexible"][i % 3],
// //     education: educations[i % 4],
// //     department: departments[i % 6],
// //     englishLevel: englishLevels[i % 4],
// //   });
// // }

// // export default function JobsPage() {
// //   const searchParams = useSearchParams();

// //   // URL से parameters पढ़ें
// //   const jobFromURL = searchParams.get("job") || "";
// //   const expFromURL = searchParams.get("exp") || "";
// //   const cityFromURL = searchParams.get("city") || "";

// //   const [job, setJob] = useState(jobFromURL);
// //   const [exp, setExp] = useState(expFromURL);
// //   const [city, setCity] = useState(cityFromURL);

// //   // All filters state
// //   const [salary, setSalary] = useState(150000);
// //   const [workModes, setWorkModes] = useState([]);
// //   const [workTypes, setWorkTypes] = useState([]);
// //   const [workShifts, setWorkShifts] = useState([]);
// //   const [datePosted, setDatePosted] = useState("All");
// //   const [distance, setDistance] = useState("All");
// //   const [education, setEducation] = useState("All");
// //   const [department, setDepartment] = useState("All");
// //   const [englishLevel, setEnglishLevel] = useState("All");
// //   const [sortBy, setSortBy] = useState("Relevant");

// //   // UI state - फिल्टर open/close के लिए (MOBILE ONLY)
// //   const [activeFilter, setActiveFilter] = useState(null);
// //   const [filterCount, setFilterCount] = useState(0);

// //   // UI state - Desktop के लिए
// //   const [showJob, setShowJob] = useState(false);
// //   const [showExp, setShowExp] = useState(false);
// //   const [showCity, setShowCity] = useState(false);

// //   // Filtered jobs
// //   const [filteredJobs, setFilteredJobs] = useState(jobsData);

// //   // Filter options (MOBILE)
// //   const filterOptions = {
// //     experience: [
// //       "All",
// //       "Fresher",
// //       "1 Years",
// //       "2 Years",
// //       "3 Years",
// //       "4 Years",
// //       "5 Years",
// //       "6+ Years",
// //       "7+ Years",
// //       "8+ Years",
// //       "9+ Years",
// //       "10+ Years",
// //       "11+ Years",
// //       "12+ Years",
// //       "13+ Years",
// //       "14+ Years",
// //       "15+ Years",
// //     ],
// //     datePosted: [
// //       "All",
// //       "Last 24 hours",
// //       "Last 3 days",
// //       "Last 7 days",
// //       "Last 15 days",
// //       "Last 30 days",
// //     ],
// //     salaryRanges: [
// //       "All",
// //       "₹10,000 - ₹20,000",
// //       "₹20,000 - ₹30,000",
// //       "₹30,000 - ₹40,000",
// //       "₹40,000 - ₹50,000",
// //       "₹50,000 - ₹60,000",
// //       "₹60,000 - ₹70,000",
// //       "₹70,000+",
// //     ],
// //     education: [
// //       "All",
// //       "High School",
// //       "Diploma",
// //       "Bachelor's Degree",
// //       "Master's Degree",
// //       "PhD",
// //     ],
// //     workMode: ["Work from home", "Work from office", "Hybrid"],
// //     workType: ["Full time", "Part time", "Internship", "Contract"],
// //     department: [
// //       "All",
// //       "Engineering",
// //       "IT",
// //       "Sales",
// //       "Marketing",
// //       "HR",
// //       "Finance",
// //       "Operations",
// //       "Customer Service",
// //       "Management",
// //     ],
// //     englishLevel: ["All", "Basic", "Intermediate", "Fluent", "Advanced"],
// //     distance: [
// //       "All",
// //       "Within 5 km",
// //       "Within 10 km",
// //       "Within 20 km",
// //       "Within 50 km",
// //     ],
// //     workShift: ["Day shift", "Night shift", "Flexible", "Rotational"],
// //     sortBy: [
// //       "Relevant",
// //       "Salary - High to low",
// //       "Date posted - New to Old",
// //       "Distance - Near to Far",
// //     ],
// //   };

// //   // Filter chips data (MOBILE)
// //   const filterChips = [
// //     { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
// //     { key: "datePosted", label: "Date posted", icon: <Calendar size={16} /> },
// //     { key: "salary", label: "Salary", icon: <DollarSign size={16} /> },
// //     { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
// //     { key: "workMode", label: "Work mode", icon: <Building size={16} /> },
// //     { key: "workType", label: "Work type", icon: <Clock size={16} /> },
// //     { key: "department", label: "Department", icon: <Briefcase size={16} /> },
// //     { key: "englishLevel", label: "English level", icon: <Globe size={16} /> },
// //     { key: "distance", label: "Distance", icon: <MapPin size={16} /> },
// //     { key: "workShift", label: "Work shift", icon: <Clock size={16} /> },
// //   ];

// //   /* SUGGESTION DATA - Desktop के लिए */
// //   const jobTitles = [
// //     "Frontend Developer",
// //     "Backend Developer",
// //     "Full Stack Developer",
// //     "Web Developer",
// //     "React Developer",
// //     "Node Developer",
// //     "MERN Stack Developer",
// //     "Java Developer",
// //     "Python Developer",
// //     "PHP Developer",
// //     "Android Developer",
// //     "iOS Developer",
// //     "UI UX Designer",
// //     "Graphic Designer",
// //     "Software Engineer",
// //     "QA Tester",
// //     "DevOps Engineer",
// //     "Data Analyst",
// //     "Data Scientist",
// //     "ML Engineer",
// //     "Cloud Engineer",
// //     "System Engineer",
// //     "IT Support",
// //     "Network Engineer",
// //     "Game Developer",
// //     "Blockchain Developer",
// //     "Cyber Security Engineer",
// //     "SEO Executive",
// //     "Digital Marketer",
// //     "Content Writer",
// //   ];

// //   const experiences = Array.from({ length: 16 }, (_, i) =>
// //     i === 15 ? "15+ Years" : `${i} Years`,
// //   );

// //   const cities = [
// //     "Delhi",
// //     "Mumbai",
// //     "Pune",
// //     "Bangalore",
// //     "Chennai",
// //     "Hyderabad",
// //     "Noida",
// //     "Gurgaon",
// //     "Faridabad",
// //     "Ghaziabad",
// //     "Jaipur",
// //     "Ajmer",
// //     "Udaipur",
// //     "Jodhpur",
// //     "Kota",
// //     "Bhopal",
// //     "Indore",
// //     "Gwalior",
// //     "Kanpur",
// //     "Lucknow",
// //     "Prayagraj",
// //     "Varanasi",
// //     "Patna",
// //     "Ranchi",
// //     "Kolkata",
// //     "Howrah",
// //     "Durgapur",
// //     "Asansol",
// //     "Siliguri",
// //     "Guwahati",
// //     "Shillong",
// //     "Imphal",
// //     "Aizawl",
// //     "Agartala",
// //     "Chandigarh",
// //     "Mohali",
// //     "Ludhiana",
// //     "Amritsar",
// //     "Jalandhar",
// //     "Dehradun",
// //     "Haridwar",
// //     "Roorkee",
// //     "Shimla",
// //     "Manali",
// //     "Panaji",
// //     "Margao",
// //     "Surat",
// //     "Vadodara",
// //     "Ahmedabad",
// //     "Rajkot",
// //     "Bhavnagar",
// //   ];

// //   // Calculate active filter count (MOBILE)
// //   useEffect(() => {
// //     let count = 0;
// //     if (exp !== "" && exp !== "All") count++;
// //     if (datePosted !== "All") count++;
// //     if (salary < 150000) count++;
// //     if (education !== "All") count++;
// //     if (workModes.length > 0) count++;
// //     if (workTypes.length > 0) count++;
// //     if (department !== "All") count++;
// //     if (englishLevel !== "All") count++;
// //     if (distance !== "All") count++;
// //     if (workShifts.length > 0) count++;
// //     setFilterCount(count);
// //   }, [
// //     exp,
// //     datePosted,
// //     salary,
// //     education,
// //     workModes,
// //     workTypes,
// //     department,
// //     englishLevel,
// //     distance,
// //     workShifts,
// //   ]);

// //   // Filter function
// //   const applyFilters = () => {
// //     const filtered = jobsData.filter((jobItem) => {
// //       // Job title filter
// //       const titleMatch = jobItem.title
// //         .toLowerCase()
// //         .includes(job.toLowerCase());

// //       // Location filter
// //       const locationMatch = jobItem.location
// //         .toLowerCase()
// //         .includes(city.toLowerCase());

// //       // Experience filter
// //       const expMatch =
// //         exp === "All" ||
// //         exp === "" ||
// //         jobItem.exp.toLowerCase().includes(exp.toLowerCase());

// //       // Salary filter
// //       const salaryMatch = jobItem.salary <= salary;

// //       // Work mode filter
// //       const modeMatch =
// //         workModes.length === 0 || workModes.includes(jobItem.mode);

// //       // Work type filter
// //       const typeMatch =
// //         workTypes.length === 0 || workTypes.includes(jobItem.type);

// //       // Date Posted filter
// //       let dateMatch = true;
// //       if (datePosted !== "All") {
// //         const today = new Date();
// //         const jobDate = new Date(jobItem.postedDate);
// //         const diffDays = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

// //         if (datePosted === "Last 24 hours" && diffDays > 1) dateMatch = false;
// //         else if (datePosted === "Last 3 days" && diffDays > 3)
// //           dateMatch = false;
// //         else if (datePosted === "Last 7 days" && diffDays > 7)
// //           dateMatch = false;
// //         else if (datePosted === "Last 15 days" && diffDays > 15)
// //           dateMatch = false;
// //         else if (datePosted === "Last 30 days" && diffDays > 30)
// //           dateMatch = false;
// //       }

// //       // Distance filter
// //       let distanceMatch = true;
// //       if (distance !== "All") {
// //         const maxDistance = parseInt(
// //           distance.replace("Within ", "").replace(" km", ""),
// //         );
// //         if (jobItem.distance > maxDistance) distanceMatch = false;
// //       }

// //       // Education filter
// //       const educationMatch =
// //         education === "All" || jobItem.education === education;

// //       // Department filter
// //       const departmentMatch =
// //         department === "All" || jobItem.department === department;

// //       // English level filter
// //       const englishMatch =
// //         englishLevel === "All" || jobItem.englishLevel === englishLevel;

// //       // Work Shift filter
// //       const shiftMatch =
// //         workShifts.length === 0 || workShifts.includes(jobItem.shift);

// //       return (
// //         titleMatch &&
// //         locationMatch &&
// //         expMatch &&
// //         salaryMatch &&
// //         modeMatch &&
// //         typeMatch &&
// //         dateMatch &&
// //         distanceMatch &&
// //         educationMatch &&
// //         departmentMatch &&
// //         englishMatch &&
// //         shiftMatch
// //       );
// //     });

// //     // Apply sorting
// //     const sorted = [...filtered].sort((a, b) => {
// //       if (sortBy === "Salary - High to low") {
// //         return b.salary - a.salary;
// //       } else if (sortBy === "Date posted - New to Old") {
// //         return new Date(b.postedDate) - new Date(a.postedDate);
// //       } else if (sortBy === "Distance - Near to Far") {
// //         return a.distance - b.distance;
// //       }
// //       return a.id - b.id;
// //     });

// //     setFilteredJobs(sorted);
// //   };

// //   // Apply filters whenever filters change
// //   useEffect(() => {
// //     applyFilters();
// //   }, [
// //     job,
// //     city,
// //     exp,
// //     salary,
// //     workModes,
// //     workTypes,
// //     workShifts,
// //     datePosted,
// //     distance,
// //     education,
// //     department,
// //     englishLevel,
// //     sortBy,
// //   ]);

// //   // When URL params change, update state
// //   useEffect(() => {
// //     setJob(jobFromURL);
// //     setExp(expFromURL);
// //     setCity(cityFromURL);
// //   }, [jobFromURL, expFromURL, cityFromURL]);

// //   // Clear all filters
// //   const clearAllFilters = () => {
// //     setExp("");
// //     setDatePosted("All");
// //     setSalary(150000);
// //     setEducation("All");
// //     setWorkModes([]);
// //     setWorkTypes([]);
// //     setDepartment("All");
// //     setEnglishLevel("All");
// //     setDistance("All");
// //     setWorkShifts([]);
// //   };

// //   // ================= MOBILE SPECIFIC FUNCTIONS =================
// //   const getFilterDisplayValue = (filterKey) => {
// //     switch (filterKey) {
// //       case "experience":
// //         return exp === "" || exp === "All" ? "Experience" : exp;
// //       case "datePosted":
// //         return datePosted === "All" ? "Date posted" : datePosted;
// //       case "salary":
// //         return salary === 150000 ? "Salary" : `₹${salary.toLocaleString()}`;
// //       case "education":
// //         return education === "All" ? "Education" : education;
// //       case "workMode":
// //         return workModes.length === 0
// //           ? "Work mode"
// //           : `${workModes.length} selected`;
// //       case "workType":
// //         return workTypes.length === 0
// //           ? "Work type"
// //           : `${workTypes.length} selected`;
// //       case "department":
// //         return department === "All" ? "Department" : department;
// //       case "englishLevel":
// //         return englishLevel === "All" ? "English level" : englishLevel;
// //       case "distance":
// //         return distance === "All" ? "Distance" : distance;
// //       case "workShift":
// //         return workShifts.length === 0
// //           ? "Work shift"
// //           : `${workShifts.length} selected`;
// //       default:
// //         return filterKey;
// //     }
// //   };

// //   const isFilterActive = (filterKey) => {
// //     switch (filterKey) {
// //       case "experience":
// //         return exp !== "" && exp !== "All";
// //       case "datePosted":
// //         return datePosted !== "All";
// //       case "salary":
// //         return salary < 150000;
// //       case "education":
// //         return education !== "All";
// //       case "workMode":
// //         return workModes.length > 0;
// //       case "workType":
// //         return workTypes.length > 0;
// //       case "department":
// //         return department !== "All";
// //       case "englishLevel":
// //         return englishLevel !== "All";
// //       case "distance":
// //         return distance !== "All";
// //       case "workShift":
// //         return workShifts.length > 0;
// //       default:
// //         return false;
// //     }
// //   };

// //   const closeActiveFilter = () => {
// //     setActiveFilter(null);
// //   };

// //   // Render mobile filter dropdown content
// //   const renderMobileFilterContent = () => {
// //     if (!activeFilter) return null;

// //     return (
// //       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
// //         <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
// //           {/* Filter Header */}
// //           <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
// //             <div className="flex items-center gap-2">
// //               {filterChips.find((f) => f.key === activeFilter)?.icon}
// //               <h3 className="font-semibold text-lg">
// //                 {filterChips.find((f) => f.key === activeFilter)?.label}
// //               </h3>
// //             </div>
// //             <button onClick={closeActiveFilter} className="p-2">
// //               <X size={24} />
// //             </button>
// //           </div>

// //           {/* Filter Content */}
// //           <div className="p-4 overflow-y-auto max-h-[60vh]">
// //             {activeFilter === "experience" && (
// //               <div className="space-y-2">
// //                 {filterOptions.experience.map((option) => (
// //                   <button
// //                     key={option}
// //                     onClick={() => {
// //                       setExp(option === "All" ? "" : option);
// //                       setTimeout(closeActiveFilter, 200);
// //                     }}
// //                     className={`w-full text-left px-4 py-3 rounded-lg ${exp === (option === "All" ? "" : option) ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
// //                   >
// //                     {option}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}

// //             {activeFilter === "datePosted" && (
// //               <div className="space-y-2">
// //                 {filterOptions.datePosted.map((option) => (
// //                   <button
// //                     key={option}
// //                     onClick={() => {
// //                       setDatePosted(option);
// //                       setTimeout(closeActiveFilter, 200);
// //                     }}
// //                     className={`w-full text-left px-4 py-3 rounded-lg ${datePosted === option ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
// //                   >
// //                     {option}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}

// //             {activeFilter === "salary" && (
// //               <div className="space-y-4">
// //                 <div className="flex justify-between text-sm">
// //                   <span>₹10,000</span>
// //                   <span>₹1.5 Lakhs</span>
// //                 </div>
// //                 <input
// //                   type="range"
// //                   min="10000"
// //                   max="150000"
// //                   step="5000"
// //                   value={salary}
// //                   onChange={(e) => setSalary(Number(e.target.value))}
// //                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
// //                 />
// //                 <div className="text-center font-medium">
// //                   Selected: ₹{salary.toLocaleString()}
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-2">
// //                   {filterOptions.salaryRanges.map((range) => (
// //                     <button
// //                       key={range}
// //                       onClick={() => {
// //                         if (range === "All") setSalary(150000);
// //                         else if (range === "₹70,000+") setSalary(70000);
// //                         setTimeout(closeActiveFilter, 200);
// //                       }}
// //                       className={`px-4 py-2 rounded-lg border ${salary === 150000 && range === "All" ? "bg-blue-50 text-blue-600 border-blue-200" : "border-gray-200 hover:bg-gray-50"}`}
// //                     >
// //                       {range}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {["education", "department", "englishLevel", "distance"].includes(
// //               activeFilter,
// //             ) && (
// //               <div className="space-y-2">
// //                 {filterOptions[activeFilter].map((option) => (
// //                   <button
// //                     key={option}
// //                     onClick={() => {
// //                       const setters = {
// //                         education: setEducation,
// //                         department: setDepartment,
// //                         englishLevel: setEnglishLevel,
// //                         distance: setDistance,
// //                       };
// //                       setters[activeFilter](option);
// //                       setTimeout(closeActiveFilter, 200);
// //                     }}
// //                     className={`w-full text-left px-4 py-3 rounded-lg ${
// //                       {
// //                         education: education === option,
// //                         department: department === option,
// //                         englishLevel: englishLevel === option,
// //                         distance: distance === option,
// //                       }[activeFilter]
// //                         ? "bg-blue-50 text-blue-600 border border-blue-200"
// //                         : "hover:bg-gray-50"
// //                     }`}
// //                   >
// //                     {option}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}

// //             {["workMode", "workType", "workShift"].includes(activeFilter) && (
// //               <div className="space-y-3">
// //                 {filterOptions[activeFilter].map((option) => {
// //                   const currentArray = {
// //                     workMode: workModes,
// //                     workType: workTypes,
// //                     workShift: workShifts,
// //                   }[activeFilter];

// //                   return (
// //                     <label
// //                       key={option}
// //                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
// //                     >
// //                       <span className="font-medium">{option}</span>
// //                       <input
// //                         type="checkbox"
// //                         checked={currentArray.includes(option)}
// //                         onChange={(e) => {
// //                           const setters = {
// //                             workMode: setWorkModes,
// //                             workType: setWorkTypes,
// //                             workShift: setWorkShifts,
// //                           };
// //                           const setter = setters[activeFilter];

// //                           if (e.target.checked) {
// //                             setter([...currentArray, option]);
// //                           } else {
// //                             setter(
// //                               currentArray.filter((item) => item !== option),
// //                             );
// //                           }
// //                         }}
// //                         className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //                       />
// //                     </label>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </div>

// //           {/* Filter Footer */}
// //           <div className="sticky bottom-0 bg-white border-t p-4">
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => {
// //                   switch (activeFilter) {
// //                     case "experience":
// //                       setExp("");
// //                       break;
// //                     case "datePosted":
// //                       setDatePosted("All");
// //                       break;
// //                     case "salary":
// //                       setSalary(150000);
// //                       break;
// //                     case "education":
// //                       setEducation("All");
// //                       break;
// //                     case "workMode":
// //                       setWorkModes([]);
// //                       break;
// //                     case "workType":
// //                       setWorkTypes([]);
// //                       break;
// //                     case "department":
// //                       setDepartment("All");
// //                       break;
// //                     case "englishLevel":
// //                       setEnglishLevel("All");
// //                       break;
// //                     case "distance":
// //                       setDistance("All");
// //                       break;
// //                     case "workShift":
// //                       setWorkShifts([]);
// //                       break;
// //                   }
// //                 }}
// //                 className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
// //               >
// //                 Clear
// //               </button>
// //               <button
// //                 onClick={closeActiveFilter}
// //                 className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
// //               >
// //                 Apply
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section className="bg-gray-100 text-black min-h-screen">
// //       {/* ================= DESKTOP VIEW (ORIGINAL) ================= */}
// //       <div className="hidden lg:block">
// //         {/* ================= SEARCH BAR ================= */}
// //         <div className="bg-white border-b py-4">
// //           <div className="max-w-7xl mx-auto px-4 flex gap-3 relative">
// //             {/* JOB TITLE */}
// //             <div className="relative flex-1">
// //               <input
// //                 placeholder="Job Title"
// //                 value={job}
// //                 onChange={(e) => {
// //                   setJob(e.target.value);
// //                   setShowJob(true);
// //                 }}
// //                 onFocus={() => setShowJob(true)}
// //                 onBlur={() => setTimeout(() => setShowJob(false), 150)}
// //                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
// //               />

// //               {/* SUGGESTION */}
// //               {showJob && job && (
// //                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
// //                   {jobTitles
// //                     .filter((j) => j.toLowerCase().includes(job.toLowerCase()))
// //                     .slice(0, 10)
// //                     .map((item) => (
// //                       <p
// //                         key={item}
// //                         onClick={() => {
// //                           setJob(item);
// //                           setShowJob(false);
// //                         }}
// //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                       >
// //                         {item}
// //                       </p>
// //                     ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* EXPERIENCE */}
// //             <div className="relative w-48">
// //               <input
// //                 placeholder="Experience"
// //                 value={exp}
// //                 onChange={(e) => {
// //                   setExp(e.target.value);
// //                   setShowExp(true);
// //                 }}
// //                 onFocus={() => setShowExp(true)}
// //                 onBlur={() => setTimeout(() => setShowExp(false), 150)}
// //                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
// //               />

// //               {showExp && (
// //                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
// //                   {experiences
// //                     .filter(
// //                       (e) =>
// //                         exp === "" ||
// //                         e.toLowerCase().includes(exp.toLowerCase()),
// //                     )
// //                     .map((item) => (
// //                       <p
// //                         key={item}
// //                         onClick={() => {
// //                           setExp(item);
// //                           setShowExp(false);
// //                         }}
// //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                       >
// //                         {item}
// //                       </p>
// //                     ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* LOCATION */}
// //             <div className="relative w-56">
// //               <input
// //                 placeholder="Location"
// //                 value={city}
// //                 onChange={(e) => {
// //                   setCity(e.target.value);
// //                   setShowCity(true);
// //                 }}
// //                 onFocus={() => setShowCity(true)}
// //                 onBlur={() => setTimeout(() => setShowCity(false), 150)}
// //                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
// //               />

// //               {showCity && city && (
// //                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
// //                   {cities
// //                     .filter((c) => c.toLowerCase().includes(city.toLowerCase()))
// //                     .slice(0, 12)
// //                     .map((item) => (
// //                       <p
// //                         key={item}
// //                         onClick={() => {
// //                           setCity(item);
// //                           setShowCity(false);
// //                         }}
// //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                       >
// //                         {item}
// //                       </p>
// //                     ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* SEARCH BTN */}
// //             <button
// //               onClick={applyFilters}
// //               className="bg-orange-500 text-white px-6 rounded-lg hover:bg-orange-600 transition"
// //             >
// //               Search Jobs
// //             </button>
// //           </div>
// //         </div>

// //         {/* ================= MAIN ================= */}
// //         <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
// //           {/* ================= FILTERS SIDEBAR ================= */}
// //           <div className="bg-white p-4 rounded-xl shadow space-y-5 text-sm">
// //             <h3 className="font-semibold text-base">Filters</h3>

// //             {/* DATE POSTED */}
// //             <div>
// //               <p className="font-medium mb-2">Date posted</p>

// //               <div className="space-y-1">
// //                 {["All", "Last 24 hours", "Last 3 days", "Last 7 days"].map(
// //                   (item) => (
// //                     <label
// //                       key={item}
// //                       className="flex items-center gap-2 cursor-pointer"
// //                     >
// //                       <input
// //                         type="radio"
// //                         name="date"
// //                         checked={datePosted === item}
// //                         onChange={() => {
// //                           setDatePosted(item);
// //                         }}
// //                       />
// //                       {item}
// //                     </label>
// //                   ),
// //                 )}
// //               </div>
// //             </div>

// //             {/* DISTANCE */}
// //             <div>
// //               <p className="font-medium mb-2">Distance</p>

// //               <div className="space-y-1">
// //                 {[
// //                   "All",
// //                   "Within 5 km",
// //                   "Within 10 km",
// //                   "Within 20 km",
// //                   "Within 50 km",
// //                 ].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name="distance"
// //                       checked={distance === item}
// //                       onChange={() => {
// //                         setDistance(item);
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* SALARY */}
// //             <div>
// //               <p className="font-medium mb-2">Salary</p>

// //               <p className="text-xs text-gray-500 mb-1">
// //                 Minimum monthly salary
// //               </p>

// //               <div className="flex justify-between text-xs mb-1">
// //                 <span>₹0</span>
// //                 <span>₹1.5 Lakhs</span>
// //               </div>

// //               <input
// //                 type="range"
// //                 min="0"
// //                 max="150000"
// //                 step="5000"
// //                 value={salary}
// //                 onChange={(e) => {
// //                   setSalary(Number(e.target.value));
// //                 }}
// //                 className="w-full"
// //               />
// //             </div>

// //             {/* WORK MODE */}
// //             <div>
// //               <p className="font-medium mb-2">Work Mode</p>

// //               <div className="space-y-1">
// //                 {["Work from home", "Work from office", "Work from field"].map(
// //                   (item) => (
// //                     <label key={item} className="flex gap-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={workModes.includes(item)}
// //                         onChange={() => {
// //                           setWorkModes((prev) =>
// //                             prev.includes(item)
// //                               ? prev.filter((m) => m !== item)
// //                               : [...prev, item],
// //                           );
// //                         }}
// //                       />
// //                       {item}
// //                     </label>
// //                   ),
// //                 )}
// //               </div>
// //             </div>

// //             {/* WORK TYPE */}
// //             <div>
// //               <p className="font-medium mb-2">Work Type</p>

// //               <div className="space-y-1">
// //                 {["Full time", "Part time", "Internship"].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={workTypes.includes(item)}
// //                       onChange={() => {
// //                         setWorkTypes((prev) =>
// //                           prev.includes(item)
// //                             ? prev.filter((t) => t !== item)
// //                             : [...prev, item],
// //                         );
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* WORK SHIFT */}
// //             <div>
// //               <p className="font-medium mb-2">Work Shift</p>

// //               <div className="space-y-1">
// //                 {["Day shift", "Night shift"].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={workShifts.includes(item)}
// //                       onChange={() => {
// //                         setWorkShifts((prev) =>
// //                           prev.includes(item)
// //                             ? prev.filter((s) => s !== item)
// //                             : [...prev, item],
// //                         );
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* SORT BY */}
// //             <div>
// //               <p className="font-medium mb-2">Sort By</p>

// //               <div className="space-y-1">
// //                 {[
// //                   "Relevant",
// //                   "Salary - High to low",
// //                   "Date posted - New to Old",
// //                 ].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name="sort"
// //                       checked={sortBy === item}
// //                       onChange={() => {
// //                         setSortBy(item);
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* ================= JOB LIST ================= */}
// //           <div className="lg:col-span-2 space-y-4">
// //             <h3 className="font-semibold text-base mb-2">
// //               Showing {filteredJobs.length} jobs
// //               {(job || exp || city) && (
// //                 <span className="text-sm font-normal text-gray-600 ml-2">
// //                   {job && `for "${job}"`}
// //                   {exp && ` with ${exp} experience`}
// //                   {city && ` in ${city}`}
// //                 </span>
// //               )}
// //             </h3>

// //             {filteredJobs.length > 0 ? (
// //               filteredJobs.map((jobItem) => (
// //                 <JobCard key={jobItem.id} job={jobItem} />
// //               ))
// //             ) : (
// //               <div className="bg-white p-8 rounded-xl shadow text-center">
// //                 <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
// //                 <p className="text-gray-600">
// //                   Try changing your search criteria
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* ================= RIGHT SIDE ================= */}
// //           <div className="lg:col-span-1">
// //             {/* You can add right sidebar content here if needed */}
// //           </div>
// //         </div>
// //       </div>

// //       {/* ================= MOBILE VIEW (APNA.CO STYLE) ================= */}
// //       <div className="lg:hidden">
// //         {/* ================= HEADER ================= */}
// //         <div className="bg-white border-b sticky top-0 z-30">
// //           <div className="px-4 py-3">
// //             {/* ================= SEARCH BAR ================= */}
// //             <div className="flex flex-col sm:flex-row gap-2 mb-3">
// //               <input
// //                 placeholder="Job Title"
// //                 value={job}
// //                 onChange={(e) => setJob(e.target.value)}
// //                 className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
// //               />

// //               <input
// //                 placeholder="Location"
// //                 value={city}
// //                 onChange={(e) => setCity(e.target.value)}
// //                 className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
// //               />

// //               <button
// //                 onClick={applyFilters}
// //                 className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-lg flex justify-center items-center"
// //               >
// //                 <Search size={20} />
// //               </button>
// //             </div>

// //             {/* ================= SEARCH TITLE ================= */}
// //             <div className="mb-2">
// //               <h2 className="font-semibold text-sm sm:text-base">
// //                 {job || city
// //                   ? `${job}${job && city ? ", " : ""}${city}`
// //                   : "All Jobs"}
// //                 <span className="text-gray-600 text-xs sm:text-sm ml-2">
// //                   ({filteredJobs.length} jobs found)
// //                 </span>
// //               </h2>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= FILTERS BAR ================= */}
// //         <div className="bg-white border-b px-4 py-3 sticky top-[138px] z-20">
// //           <div className="flex justify-between items-center mb-3">
// //             <div className="flex items-center gap-2">
// //               <Filter size={18} />
// //               <span className="font-medium">Filters</span>
// //               {filterCount > 0 && (
// //                 <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
// //                   {filterCount} Applied
// //                 </span>
// //               )}
// //             </div>

// //             {filterCount > 0 && (
// //               <button
// //                 onClick={clearAllFilters}
// //                 className="text-red-600 text-sm font-medium flex items-center gap-1"
// //               >
// //                 <X size={16} />
// //                 Clear Filters
// //               </button>
// //             )}
// //           </div>

// //           {/* ================= FILTER CHIPS ROW ================= */}
// //           <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
// //             {filterChips.map((chip) => {
// //               const isActive = isFilterActive(chip.key);
// //               const displayValue = getFilterDisplayValue(chip.key);

// //               return (
// //                 <button
// //                   key={chip.key}
// //                   onClick={() =>
// //                     setActiveFilter(activeFilter === chip.key ? null : chip.key)
// //                   }
// //                   className={`flex items-center gap-2 px-3 py-2 rounded-full border whitespace-nowrap ${isActive ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-white text-gray-700 border-gray-200"}`}
// //                 >
// //                   {chip.icon}
// //                   <span className="text-sm">{displayValue}</span>
// //                   {isActive && (
// //                     <span className="bg-blue-100 text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
// //                       ✓
// //                     </span>
// //                   )}
// //                   <ChevronDown
// //                     size={16}
// //                     className={`transition-transform ${activeFilter === chip.key ? "rotate-180" : ""}`}
// //                   />
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* ================= SORT BY ================= */}
// //         <div className="bg-white border-b px-4 py-3">
// //           <div className="flex items-center gap-2">
// //             <SortAsc size={16} />
// //             <span className="font-medium">Sort By:</span>
// //             <select
// //               value={sortBy}
// //               onChange={(e) => setSortBy(e.target.value)}
// //               className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none"
// //             >
// //               <option value="Relevant">Relevant</option>
// //               <option value="Salary - High to low">Salary - High to low</option>
// //               <option value="Date posted - New to Old">
// //                 Date posted - New to Old
// //               </option>
// //               <option value="Distance - Near to Far">
// //                 Distance - Near to Far
// //               </option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* ================= FILTER DROPDOWN ================= */}
// //         {renderMobileFilterContent()}

// //         {/* ================= JOB LIST ================= */}
// //         <div className="px-4 py-3">
// //           <h3 className="font-semibold text-lg mb-4">
// //             {filteredJobs.length} Jobs: Explore based on your Filter
// //           </h3>

// //           {filteredJobs.length > 0 ? (
// //             filteredJobs.map((jobItem) => (
// //               <MobileJobCard key={jobItem.id} job={jobItem} />
// //             ))
// //           ) : (
// //             <div className="bg-white rounded-xl p-6 text-center">
// //               <div className="text-gray-400 mb-3">
// //                 <Briefcase size={40} className="mx-auto" />
// //               </div>
// //               <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
// //               <p className="text-gray-600 mb-4">
// //                 Try changing your search criteria
// //               </p>
// //               <button
// //                 onClick={clearAllFilters}
// //                 className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
// //               >
// //                 Clear All Filters
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         .no-scrollbar::-webkit-scrollbar {
// //           display: none;
// //         }
// //         .no-scrollbar {
// //           -ms-overflow-style: none;
// //           scrollbar-width: none;
// //         }
// //       `}</style>
// //     </section>
// //   );
// // }

// // /* ================= DESKTOP JOB CARD ================= */
// // function JobCard({ job }) {
// //   return (
// //     <Link href={`/jobs/${job.id}`}>
// //       <div className="bg-white p-4 rounded-xl shadow hover:border-green-500 border cursor-pointer hover:shadow-lg transition">
// //         <div className="flex justify-between">
// //           <div>
// //             <h3 className="font-semibold text-base">{job.title}</h3>
// //             <p className="text-sm text-gray-500">{job.company}</p>
// //             <p className="text-sm text-gray-500 mt-1">📍 {job.location}</p>
// //           </div>
// //           <p className="text-sm font-medium">₹{job.salary.toLocaleString()}</p>
// //         </div>
// //         <div className="flex gap-2 mt-3 flex-wrap text-xs">
// //           <span className="bg-gray-100 px-3 py-1 rounded-full">{job.mode}</span>
// //           <span className="bg-gray-100 px-3 py-1 rounded-full">{job.type}</span>
// //           <span className="bg-gray-100 px-3 py-1 rounded-full">{job.exp}</span>
// //           <span className="bg-gray-100 px-3 py-1 rounded-full">
// //             {job.shift}
// //           </span>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// // /* ================= MOBILE JOB CARD ================= */
// // function MobileJobCard({ job }) {
// //   const [isUrgent] = useState(Math.random() > 0.7);

// //   // Calculate days ago
// //   const daysAgo = Math.floor(
// //     (new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24),
// //   );

// //   return (
// //     <Link href={`/jobs/${job.id}`}>
// //       <div className="bg-white rounded-xl border p-4 mb-3 hover:border-blue-300 transition-colors">
// //         {/* Job Title and Salary */}
// //         <div className="flex justify-between items-start mb-2">
// //           <div className="flex-1">
// //             <h3 className="font-semibold text-base mb-1">{job.title}</h3>
// //             <p className="text-gray-700 font-medium text-sm">{job.company}</p>
// //           </div>
// //           <div className="text-right">
// //             <p className="font-bold">₹{job.salary.toLocaleString()}</p>
// //             <p className="text-gray-500 text-xs">monthly</p>
// //           </div>
// //         </div>

// //         {/* Location */}
// //         <div className="flex items-center text-gray-600 text-sm mb-3">
// //           <MapPin size={14} className="mr-1" />
// //           {job.location}
// //         </div>

// //         {/* Tags */}
// //         <div className="flex flex-wrap gap-2 mb-3">
// //           <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
// //             {job.mode}
// //           </span>
// //           <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
// //             {job.type}
// //           </span>
// //           <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
// //             Min. {job.exp}
// //           </span>
// //           <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
// //             {job.englishLevel}
// //           </span>
// //         </div>

// //         {/* Footer */}
// //         <div className="flex justify-between items-center text-xs text-gray-600">
// //           <div className="flex items-center">
// //             <Calendar size={12} className="mr-1" />
// //             {daysAgo === 0
// //               ? "Today"
// //               : daysAgo === 1
// //                 ? "Yesterday"
// //                 : `${daysAgo} days ago`}
// //           </div>

// //           {isUrgent && (
// //             <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
// //               Urgently hiring
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { useSearchParams, useRouter } from "next/navigation";
// // import axios from "axios";
// // import {
// //   Filter,
// //   X,
// //   ChevronDown,
// //   MapPin,
// //   Calendar,
// //   DollarSign,
// //   GraduationCap,
// //   Building,
// //   Clock,
// //   Globe,
// //   SortAsc,
// //   Search,
// //   Briefcase,
// // } from "lucide-react";

// // export default function JobsPage() {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();
// //   const API = "http://localhost:5000/api"; // 👈 YAHAN
// //   // URL से parameters पढ़ें
// //   const jobFromURL = searchParams.get("job") || "";
// //   const expFromURL = searchParams.get("exp") || "";
// //   const cityFromURL = searchParams.get("city") || "";

// //   const [job, setJob] = useState(jobFromURL);
// //   const [exp, setExp] = useState(expFromURL);
// //   const [city, setCity] = useState(cityFromURL);
// //   useEffect(() => {
// //     fetchJobs();
// //   }, []);

// //   const fetchJobs = async () => {
// //     try {
// //       const res = await axios.get(`${API}/jobs`);

// //       console.log("Jobs:", res.data.data); // ✅ Debug

// //       setJobsData(res.data.data);
// //       setFilteredJobs(res.data.data);
// //     } catch (err) {
// //       console.log(err);
// //       alert("Failed to load jobs");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchJobs();
// //   }, []);
// //   // All filters state
// //   const [salary, setSalary] = useState(150000);
// //   const [workModes, setWorkModes] = useState([]);
// //   const [workTypes, setWorkTypes] = useState([]);
// //   const [workShifts, setWorkShifts] = useState([]);
// //   const [datePosted, setDatePosted] = useState("All");
// //   const [distance, setDistance] = useState("All");
// //   const [education, setEducation] = useState("All");
// //   const [department, setDepartment] = useState("All");
// //   const [englishLevel, setEnglishLevel] = useState("All");
// //   const [sortBy, setSortBy] = useState("Relevant");

// //   // UI state - फिल्टर open/close के लिए (MOBILE ONLY)
// //   const [activeFilter, setActiveFilter] = useState(null);
// //   const [filterCount, setFilterCount] = useState(0);

// //   // UI state - Desktop के लिए
// //   const [showJob, setShowJob] = useState(false);
// //   const [showExp, setShowExp] = useState(false);
// //   const [showCity, setShowCity] = useState(false);

// //   // Filtered jobs
// //   const [jobsData, setJobsData] = useState([]);
// //   const [filteredJobs, setFilteredJobs] = useState([]);

// //   // Filter options (MOBILE)
// //   const filterOptions = {
// //     experience: [
// //       "All",
// //       "Fresher",
// //       "1 Years",
// //       "2 Years",
// //       "3 Years",
// //       "4 Years",
// //       "5 Years",
// //       "6+ Years",
// //       "7+ Years",
// //       "8+ Years",
// //       "9+ Years",
// //       "10+ Years",
// //       "11+ Years",
// //       "12+ Years",
// //       "13+ Years",
// //       "14+ Years",
// //       "15+ Years",
// //     ],
// //     datePosted: [
// //       "All",
// //       "Last 24 hours",
// //       "Last 3 days",
// //       "Last 7 days",
// //       "Last 15 days",
// //       "Last 30 days",
// //     ],
// //     salaryRanges: [
// //       "All",
// //       "₹10,000 - ₹20,000",
// //       "₹20,000 - ₹30,000",
// //       "₹30,000 - ₹40,000",
// //       "₹40,000 - ₹50,000",
// //       "₹50,000 - ₹60,000",
// //       "₹60,000 - ₹70,000",
// //       "₹70,000+",
// //     ],
// //     education: [
// //       "All",
// //       "High School",
// //       "Diploma",
// //       "Bachelor's Degree",
// //       "Master's Degree",
// //       "PhD",
// //     ],
// //     workMode: ["Work from home", "Work from office", "Hybrid"],
// //     workType: ["Full time", "Part time", "Internship", "Contract"],
// //     department: [
// //       "All",
// //       "Engineering",
// //       "IT",
// //       "Sales",
// //       "Marketing",
// //       "HR",
// //       "Finance",
// //       "Operations",
// //       "Customer Service",
// //       "Management",
// //     ],
// //     englishLevel: ["All", "Basic", "Intermediate", "Fluent", "Advanced"],
// //     distance: [
// //       "All",
// //       "Within 5 km",
// //       "Within 10 km",
// //       "Within 20 km",
// //       "Within 50 km",
// //     ],
// //     workShift: ["Day shift", "Night shift", "Flexible", "Rotational"],
// //     sortBy: [
// //       "Relevant",
// //       "Salary - High to low",
// //       "Date posted - New to Old",
// //       "Distance - Near to Far",
// //     ],
// //   };

// //   // Filter chips data (MOBILE)
// //   const filterChips = [
// //     { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
// //     { key: "datePosted", label: "Date posted", icon: <Calendar size={16} /> },
// //     { key: "salary", label: "Salary", icon: <DollarSign size={16} /> },
// //     { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
// //     { key: "workMode", label: "Work mode", icon: <Building size={16} /> },
// //     { key: "workType", label: "Work type", icon: <Clock size={16} /> },
// //     { key: "department", label: "Department", icon: <Briefcase size={16} /> },
// //     { key: "englishLevel", label: "English level", icon: <Globe size={16} /> },
// //     { key: "distance", label: "Distance", icon: <MapPin size={16} /> },
// //     { key: "workShift", label: "Work shift", icon: <Clock size={16} /> },
// //   ];

// //   /* SUGGESTION DATA - Desktop के लिए */
// //   const jobTitles = [
// //     "Frontend Developer",
// //     "Backend Developer",
// //     "Full Stack Developer",
// //     "Web Developer",
// //     "React Developer",
// //     "Node Developer",
// //     "MERN Stack Developer",
// //     "Java Developer",
// //     "Python Developer",
// //     "PHP Developer",
// //     "Android Developer",
// //     "iOS Developer",
// //     "UI UX Designer",
// //     "Graphic Designer",
// //     "Software Engineer",
// //     "QA Tester",
// //     "DevOps Engineer",
// //     "Data Analyst",
// //     "Data Scientist",
// //     "ML Engineer",
// //     "Cloud Engineer",
// //     "System Engineer",
// //     "IT Support",
// //     "Network Engineer",
// //     "Game Developer",
// //     "Blockchain Developer",
// //     "Cyber Security Engineer",
// //     "SEO Executive",
// //     "Digital Marketer",
// //     "Content Writer",
// //   ];

// //   const experiences = Array.from({ length: 16 }, (_, i) =>
// //     i === 15 ? "15+ Years" : `${i} Years`,
// //   );

// //   const cities = [
// //     "Delhi",
// //     "Mumbai",
// //     "Pune",
// //     "Bangalore",
// //     "Chennai",
// //     "Hyderabad",
// //     "Noida",
// //     "Gurgaon",
// //     "Faridabad",
// //     "Ghaziabad",
// //     "Jaipur",
// //     "Ajmer",
// //     "Udaipur",
// //     "Jodhpur",
// //     "Kota",
// //     "Bhopal",
// //     "Indore",
// //     "Gwalior",
// //     "Kanpur",
// //     "Lucknow",
// //     "Prayagraj",
// //     "Varanasi",
// //     "Patna",
// //     "Ranchi",
// //     "Kolkata",
// //     "Howrah",
// //     "Durgapur",
// //     "Asansol",
// //     "Siliguri",
// //     "Guwahati",
// //     "Shillong",
// //     "Imphal",
// //     "Aizawl",
// //     "Agartala",
// //     "Chandigarh",
// //     "Mohali",
// //     "Ludhiana",
// //     "Amritsar",
// //     "Jalandhar",
// //     "Dehradun",
// //     "Haridwar",
// //     "Roorkee",
// //     "Shimla",
// //     "Manali",
// //     "Panaji",
// //     "Margao",
// //     "Surat",
// //     "Vadodara",
// //     "Ahmedabad",
// //     "Rajkot",
// //     "Bhavnagar",
// //   ];

// //   // Calculate active filter count (MOBILE)
// //   useEffect(() => {
// //     let count = 0;
// //     if (exp !== "" && exp !== "All") count++;
// //     if (datePosted !== "All") count++;
// //     if (salary < 150000) count++;
// //     if (education !== "All") count++;
// //     if (workModes.length > 0) count++;
// //     if (workTypes.length > 0) count++;
// //     if (department !== "All") count++;
// //     if (englishLevel !== "All") count++;
// //     if (distance !== "All") count++;
// //     if (workShifts.length > 0) count++;
// //     setFilterCount(count);
// //   }, [
// //     exp,
// //     datePosted,
// //     salary,
// //     education,
// //     workModes,
// //     workTypes,
// //     department,
// //     englishLevel,
// //     distance,
// //     workShifts,
// //   ]);

// //   // ================= SEARCH FUNCTION =================
// //   const handleSearch = () => {
// //     // URL parameters update करें
// //     const params = new URLSearchParams();
// //     if (job) params.set("job", job);
// //     if (exp) params.set("exp", exp);
// //     if (city) params.set("city", city);

// //     // URL update करें
// //     router.push(`/jobs?${params.toString()}`, { scroll: false });

// //     // Filters apply करें
// //     applyFilters();
// //   };

// //   const applyFilters = () => {
// //     const filtered = jobsData.filter((jobItem) => {
// //       const titleMatch = jobItem.title
// //         ?.toLowerCase()
// //         .includes(job.toLowerCase());

// //       const locationMatch = jobItem.location
// //         ?.toLowerCase()
// //         .includes(city.toLowerCase());

// //       return titleMatch && locationMatch;
// //     });

// //     setFilteredJobs(filtered);
// //   };

// //   // Apply filters whenever filters change
// //   useEffect(() => {
// //     applyFilters();
// //   }, [
// //     job,
// //     city,
// //     exp,
// //     salary,
// //     workModes,
// //     workTypes,
// //     workShifts,
// //     datePosted,
// //     distance,
// //     education,
// //     department,
// //     englishLevel,
// //     sortBy,
// //   ]);

// //   // When URL params change, update state
// //   useEffect(() => {
// //     setJob(jobFromURL);
// //     setExp(expFromURL);
// //     setCity(cityFromURL);
// //   }, [jobFromURL, expFromURL, cityFromURL]);

// //   // Enter key press handle करें
// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       handleSearch();
// //     }
// //   };

// //   // Clear all filters
// //   const clearAllFilters = () => {
// //     setExp("");
// //     setDatePosted("All");
// //     setSalary(150000);
// //     setEducation("All");
// //     setWorkModes([]);
// //     setWorkTypes([]);
// //     setDepartment("All");
// //     setEnglishLevel("All");
// //     setDistance("All");
// //     setWorkShifts([]);
// //   };

// //   // ================= MOBILE SPECIFIC FUNCTIONS =================
// //   const getFilterDisplayValue = (filterKey) => {
// //     switch (filterKey) {
// //       case "experience":
// //         return exp === "" || exp === "All" ? "Experience" : exp;
// //       case "datePosted":
// //         return datePosted === "All" ? "Date posted" : datePosted;
// //       case "salary":
// //         return salary === 150000 ? "Salary" : `₹${salary.toLocaleString()}`;
// //       case "education":
// //         return education === "All" ? "Education" : education;
// //       case "workMode":
// //         return workModes.length === 0
// //           ? "Work mode"
// //           : `${workModes.length} selected`;
// //       case "workType":
// //         return workTypes.length === 0
// //           ? "Work type"
// //           : `${workTypes.length} selected`;
// //       case "department":
// //         return department === "All" ? "Department" : department;
// //       case "englishLevel":
// //         return englishLevel === "All" ? "English level" : englishLevel;
// //       case "distance":
// //         return distance === "All" ? "Distance" : distance;
// //       case "workShift":
// //         return workShifts.length === 0
// //           ? "Work shift"
// //           : `${workShifts.length} selected`;
// //       default:
// //         return filterKey;
// //     }
// //   };

// //   const isFilterActive = (filterKey) => {
// //     switch (filterKey) {
// //       case "experience":
// //         return exp !== "" && exp !== "All";
// //       case "datePosted":
// //         return datePosted !== "All";
// //       case "salary":
// //         return salary < 150000;
// //       case "education":
// //         return education !== "All";
// //       case "workMode":
// //         return workModes.length > 0;
// //       case "workType":
// //         return workTypes.length > 0;
// //       case "department":
// //         return department !== "All";
// //       case "englishLevel":
// //         return englishLevel !== "All";
// //       case "distance":
// //         return distance !== "All";
// //       case "workShift":
// //         return workShifts.length > 0;
// //       default:
// //         return false;
// //     }
// //   };

// //   const closeActiveFilter = () => {
// //     setActiveFilter(null);
// //   };

// //   // Render mobile filter dropdown content
// //   const renderMobileFilterContent = () => {
// //     if (!activeFilter) return null;

// //     return (
// //       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
// //         <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
// //           {/* Filter Header */}
// //           <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
// //             <div className="flex items-center gap-2">
// //               {filterChips.find((f) => f.key === activeFilter)?.icon}
// //               <h3 className="font-semibold text-lg">
// //                 {filterChips.find((f) => f.key === activeFilter)?.label}
// //               </h3>
// //             </div>
// //             <button onClick={closeActiveFilter} className="p-2">
// //               <X size={24} />
// //             </button>
// //           </div>

// //           {/* Filter Content */}
// //           <div className="p-4 overflow-y-auto max-h-[60vh]">
// //             {activeFilter === "experience" && (
// //               <div className="space-y-2">
// //                 {filterOptions.experience.map((option) => (
// //                   <button
// //                     key={option}
// //                     onClick={() => {
// //                       setExp(option === "All" ? "" : option);
// //                       setTimeout(closeActiveFilter, 200);
// //                       handleSearch(); // Search trigger करें
// //                     }}
// //                     className={`w-full text-left px-4 py-3 rounded-lg ${exp === (option === "All" ? "" : option) ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
// //                   >
// //                     {option}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}

// //             {activeFilter === "datePosted" && (
// //               <div className="space-y-2">
// //                 {filterOptions.datePosted.map((option) => (
// //                   <button
// //                     key={option}
// //                     onClick={() => {
// //                       setDatePosted(option);
// //                       setTimeout(closeActiveFilter, 200);
// //                       handleSearch(); // Search trigger करें
// //                     }}
// //                     className={`w-full text-left px-4 py-3 rounded-lg ${datePosted === option ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
// //                   >
// //                     {option}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}

// //             {activeFilter === "salary" && (
// //               <div className="space-y-4">
// //                 <div className="flex justify-between text-sm">
// //                   <span>₹10,000</span>
// //                   <span>₹1.5 Lakhs</span>
// //                 </div>
// //                 <input
// //                   type="range"
// //                   min="10000"
// //                   max="150000"
// //                   step="5000"
// //                   value={salary}
// //                   onChange={(e) => setSalary(Number(e.target.value))}
// //                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
// //                 />
// //                 <div className="text-center font-medium">
// //                   Selected: ₹{salary.toLocaleString()}
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-2">
// //                   {filterOptions.salaryRanges.map((range) => (
// //                     <button
// //                       key={range}
// //                       onClick={() => {
// //                         if (range === "All") setSalary(150000);
// //                         else if (range === "₹70,000+") setSalary(70000);
// //                         setTimeout(closeActiveFilter, 200);
// //                         handleSearch(); // Search trigger करें
// //                       }}
// //                       className={`px-4 py-2 rounded-lg border ${salary === 150000 && range === "All" ? "bg-blue-50 text-blue-600 border-blue-200" : "border-gray-200 hover:bg-gray-50"}`}
// //                     >
// //                       {range}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {["education", "department", "englishLevel", "distance"].includes(
// //               activeFilter,
// //             ) && (
// //               <div className="space-y-2">
// //                 {filterOptions[activeFilter].map((option) => (
// //                   <button
// //                     key={option}
// //                     onClick={() => {
// //                       const setters = {
// //                         education: setEducation,
// //                         department: setDepartment,
// //                         englishLevel: setEnglishLevel,
// //                         distance: setDistance,
// //                       };
// //                       setters[activeFilter](option);
// //                       setTimeout(closeActiveFilter, 200);
// //                       handleSearch(); // Search trigger करें
// //                     }}
// //                     className={`w-full text-left px-4 py-3 rounded-lg ${
// //                       {
// //                         education: education === option,
// //                         department: department === option,
// //                         englishLevel: englishLevel === option,
// //                         distance: distance === option,
// //                       }[activeFilter]
// //                         ? "bg-blue-50 text-blue-600 border border-blue-200"
// //                         : "hover:bg-gray-50"
// //                     }`}
// //                   >
// //                     {option}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}

// //             {["workMode", "workType", "workShift"].includes(activeFilter) && (
// //               <div className="space-y-3">
// //                 {filterOptions[activeFilter].map((option) => {
// //                   const currentArray = {
// //                     workMode: workModes,
// //                     workType: workTypes,
// //                     workShift: workShifts,
// //                   }[activeFilter];

// //                   return (
// //                     <label
// //                       key={option}
// //                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
// //                     >
// //                       <span className="font-medium">{option}</span>
// //                       <input
// //                         type="checkbox"
// //                         checked={currentArray.includes(option)}
// //                         onChange={(e) => {
// //                           const setters = {
// //                             workMode: setWorkModes,
// //                             workType: setWorkTypes,
// //                             workShift: setWorkShifts,
// //                           };
// //                           const setter = setters[activeFilter];

// //                           if (e.target.checked) {
// //                             setter([...currentArray, option]);
// //                           } else {
// //                             setter(
// //                               currentArray.filter((item) => item !== option),
// //                             );
// //                           }
// //                           handleSearch(); // Search trigger करें
// //                         }}
// //                         className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //                       />
// //                     </label>
// //                   );
// //                 })}
// //               </div>
// //             )}
// //           </div>

// //           {/* Filter Footer */}
// //           <div className="sticky bottom-0 bg-white border-t p-4">
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => {
// //                   switch (activeFilter) {
// //                     case "experience":
// //                       setExp("");
// //                       break;
// //                     case "datePosted":
// //                       setDatePosted("All");
// //                       break;
// //                     case "salary":
// //                       setSalary(150000);
// //                       break;
// //                     case "education":
// //                       setEducation("All");
// //                       break;
// //                     case "workMode":
// //                       setWorkModes([]);
// //                       break;
// //                     case "workType":
// //                       setWorkTypes([]);
// //                       break;
// //                     case "department":
// //                       setDepartment("All");
// //                       break;
// //                     case "englishLevel":
// //                       setEnglishLevel("All");
// //                       break;
// //                     case "distance":
// //                       setDistance("All");
// //                       break;
// //                     case "workShift":
// //                       setWorkShifts([]);
// //                       break;
// //                   }
// //                   handleSearch(); // Search trigger करें
// //                 }}
// //                 className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
// //               >
// //                 Clear
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   closeActiveFilter();
// //                   handleSearch(); // Search trigger करें
// //                 }}
// //                 className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
// //               >
// //                 Apply
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <section className="bg-gray-100 text-black min-h-screen">
// //       {/* ================= DESKTOP VIEW (ORIGINAL) ================= */}
// //       <div className="hidden lg:block">
// //         {/* ================= SEARCH BAR ================= */}
// //         <div className="bg-white border-b py-4">
// //           <div className="max-w-7xl mx-auto px-4 flex gap-3 relative">
// //             {/* JOB TITLE */}
// //             <div className="relative flex-1">
// //               <input
// //                 placeholder="Job Title"
// //                 value={job}
// //                 onChange={(e) => {
// //                   setJob(e.target.value);
// //                   setShowJob(true);
// //                 }}
// //                 onFocus={() => setShowJob(true)}
// //                 onBlur={() => setTimeout(() => setShowJob(false), 150)}
// //                 onKeyPress={handleKeyPress}
// //                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
// //               />

// //               {/* SUGGESTION */}
// //               {showJob && job && (
// //                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
// //                   {jobTitles
// //                     .filter((j) => j.toLowerCase().includes(job.toLowerCase()))
// //                     .slice(0, 10)
// //                     .map((item) => (
// //                       <p
// //                         key={item}
// //                         onClick={() => {
// //                           setJob(item);
// //                           setShowJob(false);
// //                           handleSearch(); // Search trigger करें
// //                         }}
// //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                       >
// //                         {item}
// //                       </p>
// //                     ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* EXPERIENCE */}
// //             <div className="relative w-48">
// //               <input
// //                 placeholder="Experience"
// //                 value={exp}
// //                 onChange={(e) => {
// //                   setExp(e.target.value);
// //                   setShowExp(true);
// //                 }}
// //                 onFocus={() => setShowExp(true)}
// //                 onBlur={() => setTimeout(() => setShowExp(false), 150)}
// //                 onKeyPress={handleKeyPress}
// //                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
// //               />

// //               {showExp && (
// //                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
// //                   {experiences
// //                     .filter(
// //                       (e) =>
// //                         exp === "" ||
// //                         e.toLowerCase().includes(exp.toLowerCase()),
// //                     )
// //                     .map((item) => (
// //                       <p
// //                         key={item}
// //                         onClick={() => {
// //                           setExp(item);
// //                           setShowExp(false);
// //                           handleSearch(); // Search trigger करें
// //                         }}
// //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                       >
// //                         {item}
// //                       </p>
// //                     ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* LOCATION */}
// //             <div className="relative w-56">
// //               <input
// //                 placeholder="Location"
// //                 value={city}
// //                 onChange={(e) => {
// //                   setCity(e.target.value);
// //                   setShowCity(true);
// //                 }}
// //                 onFocus={() => setShowCity(true)}
// //                 onBlur={() => setTimeout(() => setShowCity(false), 150)}
// //                 onKeyPress={handleKeyPress}
// //                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
// //               />

// //               {showCity && city && (
// //                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
// //                   {cities
// //                     .filter((c) => c.toLowerCase().includes(city.toLowerCase()))
// //                     .slice(0, 12)
// //                     .map((item) => (
// //                       <p
// //                         key={item}
// //                         onClick={() => {
// //                           setCity(item);
// //                           setShowCity(false);
// //                           handleSearch(); // Search trigger करें
// //                         }}
// //                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
// //                       >
// //                         {item}
// //                       </p>
// //                     ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* SEARCH BTN */}
// //             <button
// //               onClick={handleSearch} // handleSearch function use करें
// //               className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-lg transition"
// //             >
// //               Search Jobs
// //             </button>
// //           </div>
// //         </div>

// //         {/* ================= MAIN ================= */}
// //         <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
// //           {/* ================= FILTERS SIDEBAR ================= */}
// //           <div className="bg-white p-4 rounded-xl shadow space-y-5 text-sm">
// //             <h3 className="font-semibold text-base">Filters</h3>

// //             {/* DATE POSTED */}
// //             <div>
// //               <p className="font-medium mb-2">Date posted</p>

// //               <div className="space-y-1">
// //                 {["All", "Last 24 hours", "Last 3 days", "Last 7 days"].map(
// //                   (item) => (
// //                     <label
// //                       key={item}
// //                       className="flex items-center gap-2 cursor-pointer"
// //                     >
// //                       <input
// //                         type="radio"
// //                         name="date"
// //                         checked={datePosted === item}
// //                         onChange={() => {
// //                           setDatePosted(item);
// //                           handleSearch(); // Search trigger करें
// //                         }}
// //                       />
// //                       {item}
// //                     </label>
// //                   ),
// //                 )}
// //               </div>
// //             </div>

// //             {/* DISTANCE */}
// //             <div>
// //               <p className="font-medium mb-2">Distance</p>

// //               <div className="space-y-1">
// //                 {[
// //                   "All",
// //                   "Within 5 km",
// //                   "Within 10 km",
// //                   "Within 20 km",
// //                   "Within 50 km",
// //                 ].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name="distance"
// //                       checked={distance === item}
// //                       onChange={() => {
// //                         setDistance(item);
// //                         handleSearch(); // Search trigger करें
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* SALARY */}
// //             <div>
// //               <p className="font-medium mb-2">Salary</p>

// //               <p className="text-xs text-gray-500 mb-1">
// //                 Minimum monthly salary
// //               </p>

// //               <div className="flex justify-between text-xs mb-1">
// //                 <span>₹0</span>
// //                 <span>₹1.5 Lakhs</span>
// //               </div>

// //               <input
// //                 type="range"
// //                 min="0"
// //                 max="150000"
// //                 step="5000"
// //                 value={salary}
// //                 onChange={(e) => {
// //                   setSalary(Number(e.target.value));
// //                   handleSearch(); // Search trigger करें
// //                 }}
// //                 className="w-full"
// //               />
// //             </div>

// //             {/* WORK MODE */}
// //             <div>
// //               <p className="font-medium mb-2">Work Mode</p>

// //               <div className="space-y-1">
// //                 {["Work from home", "Work from office", "Work from field"].map(
// //                   (item) => (
// //                     <label key={item} className="flex gap-2">
// //                       <input
// //                         type="checkbox"
// //                         checked={workModes.includes(item)}
// //                         onChange={() => {
// //                           setWorkModes((prev) =>
// //                             prev.includes(item)
// //                               ? prev.filter((m) => m !== item)
// //                               : [...prev, item],
// //                           );
// //                           handleSearch(); // Search trigger करें
// //                         }}
// //                       />
// //                       {item}
// //                     </label>
// //                   ),
// //                 )}
// //               </div>
// //             </div>

// //             {/* WORK TYPE */}
// //             <div>
// //               <p className="font-medium mb-2">Work Type</p>

// //               <div className="space-y-1">
// //                 {["Full time", "Part time", "Internship"].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={workTypes.includes(item)}
// //                       onChange={() => {
// //                         setWorkTypes((prev) =>
// //                           prev.includes(item)
// //                             ? prev.filter((t) => t !== item)
// //                             : [...prev, item],
// //                         );
// //                         handleSearch(); // Search trigger करें
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* WORK SHIFT */}
// //             <div>
// //               <p className="font-medium mb-2">Work Shift</p>

// //               <div className="space-y-1">
// //                 {["Day shift", "Night shift"].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={workShifts.includes(item)}
// //                       onChange={() => {
// //                         setWorkShifts((prev) =>
// //                           prev.includes(item)
// //                             ? prev.filter((s) => s !== item)
// //                             : [...prev, item],
// //                         );
// //                         handleSearch(); // Search trigger करें
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* SORT BY */}
// //             <div>
// //               <p className="font-medium mb-2">Sort By</p>

// //               <div className="space-y-1">
// //                 {[
// //                   "Relevant",
// //                   "Salary - High to low",
// //                   "Date posted - New to Old",
// //                 ].map((item) => (
// //                   <label
// //                     key={item}
// //                     className="flex items-center gap-2 cursor-pointer"
// //                   >
// //                     <input
// //                       type="radio"
// //                       name="sort"
// //                       checked={sortBy === item}
// //                       onChange={() => {
// //                         setSortBy(item);
// //                         handleSearch(); // Search trigger करें
// //                       }}
// //                     />
// //                     {item}
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* ================= JOB LIST ================= */}
// //           <div className="lg:col-span-2 space-y-4">
// //             <h3 className="font-semibold text-base mb-2">
// //               Showing {filteredJobs.length} jobs
// //               {(job || exp || city) && (
// //                 <span className="text-sm font-normal text-gray-600 ml-2">
// //                   {job && `for "${job}"`}
// //                   {exp && ` with ${exp} experience`}
// //                   {city && ` in ${city}`}
// //                 </span>
// //               )}
// //             </h3>

// //             {filteredJobs.length > 0 ? (
// //               filteredJobs.map((jobItem) => (
// //                 <JobCard key={jobItem._id} job={jobItem} />
// //               ))
// //             ) : (
// //               <div className="bg-white p-8 rounded-xl shadow text-center">
// //                 <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
// //                 <p className="text-gray-600">
// //                   Try changing your search criteria
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* ================= RIGHT SIDE ================= */}
// //           <div className="lg:col-span-1">
// //             {/* You can add right sidebar content here if needed */}
// //           </div>
// //         </div>
// //       </div>

// //       {/* ================= MOBILE VIEW (APNA.CO STYLE) ================= */}
// //       <div className="lg:hidden">
// //         {/* ================= HEADER ================= */}
// //         <div className="bg-white border-b sticky top-0 z-30">
// //           <div className="px-4 py-3">
// //             {/* ================= SEARCH BAR ================= */}
// //             <div className="flex flex-col sm:flex-row gap-2 mb-3">
// //               <input
// //                 placeholder="Job Title"
// //                 value={job}
// //                 onChange={(e) => setJob(e.target.value)}
// //                 onKeyPress={handleKeyPress}
// //                 className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
// //               />

// //               <input
// //                 placeholder="Location"
// //                 value={city}
// //                 onChange={(e) => setCity(e.target.value)}
// //                 onKeyPress={handleKeyPress}
// //                 className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
// //               />

// //               <button
// //                 onClick={handleSearch} // handleSearch function use करें
// //                 className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex justify-center items-center transition-colors"
// //               >
// //                 <Search size={20} />
// //               </button>
// //             </div>

// //             {/* ================= SEARCH TITLE ================= */}
// //             <div className="mb-2">
// //               <h2 className="font-semibold text-sm sm:text-base">
// //                 {job || city
// //                   ? `${job}${job && city ? ", " : ""}${city}`
// //                   : "All Jobs"}
// //                 <span className="text-gray-600 text-xs sm:text-sm ml-2">
// //                   ({filteredJobs.length} jobs found)
// //                 </span>
// //               </h2>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ================= FILTERS BAR ================= */}
// //         <div className="bg-white border-b px-4 py-3 sticky top-[138px] z-20">
// //           <div className="flex justify-between items-center mb-3">
// //             <div className="flex items-center gap-2">
// //               <Filter size={18} />
// //               <span className="font-medium">Filters</span>
// //               {filterCount > 0 && (
// //                 <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
// //                   {filterCount} Applied
// //                 </span>
// //               )}
// //             </div>

// //             {filterCount > 0 && (
// //               <button
// //                 onClick={() => {
// //                   clearAllFilters();
// //                   handleSearch(); // Search trigger करें
// //                 }}
// //                 className="text-red-600 text-sm font-medium flex items-center gap-1"
// //               >
// //                 <X size={16} />
// //                 Clear Filters
// //               </button>
// //             )}
// //           </div>

// //           {/* ================= FILTER CHIPS ROW ================= */}
// //           <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
// //             {filterChips.map((chip) => {
// //               const isActive = isFilterActive(chip.key);
// //               const displayValue = getFilterDisplayValue(chip.key);

// //               return (
// //                 <button
// //                   key={chip.key}
// //                   onClick={() =>
// //                     setActiveFilter(activeFilter === chip.key ? null : chip.key)
// //                   }
// //                   className={`flex items-center gap-2 px-3 py-2 rounded-full border whitespace-nowrap ${isActive ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-white text-gray-700 border-gray-200"}`}
// //                 >
// //                   {chip.icon}
// //                   <span className="text-sm">{displayValue}</span>
// //                   {isActive && (
// //                     <span className="bg-blue-100 text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
// //                       ✓
// //                     </span>
// //                   )}
// //                   <ChevronDown
// //                     size={16}
// //                     className={`transition-transform ${activeFilter === chip.key ? "rotate-180" : ""}`}
// //                   />
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* ================= SORT BY ================= */}
// //         <div className="bg-white border-b px-4 py-3">
// //           <div className="flex items-center gap-2">
// //             <SortAsc size={16} />
// //             <span className="font-medium">Sort By:</span>
// //             <select
// //               value={sortBy}
// //               onChange={(e) => {
// //                 setSortBy(e.target.value);
// //                 handleSearch(); // Search trigger करें
// //               }}
// //               className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none"
// //             >
// //               <option value="Relevant">Relevant</option>
// //               <option value="Salary - High to low">Salary - High to low</option>
// //               <option value="Date posted - New to Old">
// //                 Date posted - New to Old
// //               </option>
// //               <option value="Distance - Near to Far">
// //                 Distance - Near to Far
// //               </option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* ================= FILTER DROPDOWN ================= */}
// //         {renderMobileFilterContent()}

// //         {/* ================= JOB LIST ================= */}
// //         <div className="px-4 py-3">
// //           <h3 className="font-semibold text-lg mb-4">
// //             {filteredJobs.length} Jobs: Explore based on your Filter
// //           </h3>

// //           {filteredJobs.length > 0 ? (
// //             filteredJobs.map((jobItem) => (
// //               <JobCard key={jobItem._id} job={jobItem} />
// //             ))
// //           ) : (
// //             <div className="bg-white rounded-xl p-6 text-center">
// //               <div className="text-gray-400 mb-3">
// //                 <Briefcase size={40} className="mx-auto" />
// //               </div>
// //               <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
// //               <p className="text-gray-600 mb-4">
// //                 Try changing your search criteria
// //               </p>
// //               <button
// //                 onClick={() => {
// //                   clearAllFilters();
// //                   handleSearch();
// //                 }}
// //                 className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
// //               >
// //                 Clear All Filters
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         .no-scrollbar::-webkit-scrollbar {
// //           display: none;
// //         }
// //         .no-scrollbar {
// //           -ms-overflow-style: none;
// //           scrollbar-width: none;
// //         }
// //       `}</style>
// //     </section>
// //   );
// // }

// // function JobCard({ job }) {
// //   return (
// //     <Link href={`/jobs/${job._id}`}>
// //       <div className="bg-white p-4 rounded-xl shadow border hover:border-green-500 cursor-pointer hover:shadow-lg transition space-y-2">
// //         {/* TITLE */}
// //         <h3 className="font-semibold text-lg">{job.title}</h3>

// //         {/* COMPANY */}
// //         <p className="text-sm text-gray-600 flex items-center gap-1">
// //           <Building size={14} /> {job.company}
// //         </p>

// //         {/* LOCATION */}
// //         <p className="text-sm text-gray-600 flex items-center gap-1">
// //           <MapPin size={14} /> {job.location}
// //         </p>

// //         {/* SALARY */}
// //         <p className="text-sm font-medium text-green-700">
// //           💰 ₹{job.salary?.min || 0} - ₹{job.salary?.max || 0} LPA
// //         </p>

// //         {/* EXPERIENCE */}
// //         <p className="text-sm text-gray-600">
// //           🎓 {job.experience?.min || 0} - {job.experience?.max || 0} Years
// //         </p>

// //         {/* JOB TYPE + MODE */}
// //         <div className="flex gap-2 flex-wrap text-xs mt-1">
// //           <span className="bg-blue-100 px-2 py-1 rounded-full">
// //             {job.jobType}
// //           </span>

// //           <span className="bg-purple-100 px-2 py-1 rounded-full">
// //             {job.workMode}
// //           </span>

// //           <span className="bg-yellow-100 px-2 py-1 rounded-full">
// //             {job.category}
// //           </span>
// //         </div>

// //         {/* DESCRIPTION */}
// //         {job.description && (
// //           <p className="text-sm text-gray-700 line-clamp-2">
// //             {job.description}
// //           </p>
// //         )}

// //         {/* SKILLS */}
// //         {job.skills?.length > 0 && (
// //           <div className="flex gap-2 flex-wrap mt-2">
// //             {job.skills.slice(0, 5).map((skill, i) => (
// //               <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
// //                 {skill}
// //               </span>
// //             ))}

// //             {job.skills.length > 5 && (
// //               <span className="text-xs text-gray-500">
// //                 +{job.skills.length - 5} more
// //               </span>
// //             )}
// //           </div>
// //         )}

// //         {/* BENEFITS */}
// //         {job.benefits && (
// //           <p className="text-xs text-gray-500 mt-1">
// //             🎁 Benefits: {job.benefits.slice(0, 60)}...
// //           </p>
// //         )}

// //         {/* CONTACT */}
// //         <div className="text-xs text-gray-500 mt-2 space-y-1">
// //           {job.contactEmail && <p>📧 {job.contactEmail}</p>}
// //           {job.contactPhone && <p>📞 {job.contactPhone}</p>}
// //         </div>

// //         {/* FOOTER */}
// //         <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t mt-2">
// //           <span>📅 {new Date(job.createdAt).toDateString()}</span>

// //           <div className="flex gap-2">
// //             {job.isUrgent && (
// //               <span className="text-red-600 font-medium">🔥 Urgent</span>
// //             )}

// //             {job.isFeatured && (
// //               <span className="text-yellow-600 font-medium">⭐ Featured</span>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }

// // function MobileJobCard({ job }) {
// //   const daysAgo = Math.floor(
// //     (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24),
// //   );

// //   return (
// //     <Link href={`/jobs/${job._id}`}>
// //       <div className="bg-white rounded-xl border p-4 mb-3 hover:border-blue-300 transition-colors">
// //         {/* Title */}
// //         <div className="flex justify-between items-start mb-2">
// //           <div className="flex-1">
// //             <h3 className="font-semibold text-base mb-1">{job.title}</h3>

// //             <p className="text-gray-700 font-medium text-sm">{job.company}</p>
// //           </div>

// //           <div className="text-right">
// //             <p className="font-bold">
// //               ₹{job.salary?.min} - ₹{job.salary?.max}
// //             </p>

// //             <p className="text-gray-500 text-xs">monthly</p>
// //           </div>
// //         </div>

// //         {/* Location */}
// //         <div className="flex items-center text-gray-600 text-sm mb-3">
// //           <MapPin size={14} className="mr-1" />
// //           {job.location}
// //         </div>

// //         {/* Tags */}
// //         <div className="flex flex-wrap gap-2 mb-3">
// //           <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
// //             {job.jobType}
// //           </span>

// //           <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
// //             {job.experience?.min} - {job.experience?.max} yrs
// //           </span>
// //         </div>

// //         {/* Footer */}
// //         <div className="flex justify-between items-center text-xs text-gray-600">
// //           <div className="flex items-center">
// //             <Calendar size={12} className="mr-1" />

// //             {daysAgo === 0
// //               ? "Today"
// //               : daysAgo === 1
// //                 ? "Yesterday"
// //                 : `${daysAgo} days ago`}
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   Filter,
//   X,
//   ChevronDown,
//   MapPin,
//   Calendar,
//   DollarSign,
//   GraduationCap,
//   Building,
//   Clock,
//   Globe,
//   SortAsc,
//   Search,
//   Briefcase,
//   Check,
//   ChevronRight,
// } from "lucide-react";

// export default function JobsPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const API = "http://localhost:5000/api";

//   // URL से parameters पढ़ें
//   const jobFromURL = searchParams.get("job") || "";
//   const expFromURL = searchParams.get("exp") || "";
//   const cityFromURL = searchParams.get("city") || "";

//   // Search states
//   const [job, setJob] = useState(jobFromURL);
//   const [exp, setExp] = useState(expFromURL);
//   const [city, setCity] = useState(cityFromURL);

//   // All filters state
//   const [salary, setSalary] = useState(150000);
//   const [workModes, setWorkModes] = useState([]);
//   const [workTypes, setWorkTypes] = useState([]);
//   const [workShifts, setWorkShifts] = useState([]);
//   const [datePosted, setDatePosted] = useState("All");
//   const [distance, setDistance] = useState("All");
//   const [education, setEducation] = useState("All");
//   const [department, setDepartment] = useState("All");
//   const [englishLevel, setEnglishLevel] = useState("All");
//   const [sortBy, setSortBy] = useState("Relevant");

//   // UI state - फिल्टर open/close के लिए (MOBILE ONLY)
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filterCount, setFilterCount] = useState(0);

//   // UI state - Desktop के लिए
//   const [showJob, setShowJob] = useState(false);
//   const [showExp, setShowExp] = useState(false);
//   const [showCity, setShowCity] = useState(false);

//   // Filtered jobs
//   const [jobsData, setJobsData] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   // Filter options (MOBILE)
//   const filterOptions = {
//     experience: [
//       "All",
//       "Fresher",
//       "1 Years",
//       "2 Years",
//       "3 Years",
//       "4 Years",
//       "5 Years",
//       "6+ Years",
//       "7+ Years",
//       "8+ Years",
//       "9+ Years",
//       "10+ Years",
//       "11+ Years",
//       "12+ Years",
//       "13+ Years",
//       "14+ Years",
//       "15+ Years",
//     ],
//     datePosted: [
//       "All",
//       "Last 24 hours",
//       "Last 3 days",
//       "Last 7 days",
//       "Last 15 days",
//       "Last 30 days",
//     ],
//     salaryRanges: [
//       "All",
//       "₹10,000 - ₹20,000",
//       "₹20,000 - ₹30,000",
//       "₹30,000 - ₹40,000",
//       "₹40,000 - ₹50,000",
//       "₹50,000 - ₹60,000",
//       "₹60,000 - ₹70,000",
//       "₹70,000+",
//     ],
//     education: [
//       "All",
//       "High School",
//       "Diploma",
//       "Bachelor's Degree",
//       "Master's Degree",
//       "PhD",
//     ],
//     workMode: ["Work from home", "Work from office", "Hybrid"],
//     workType: ["Full time", "Part time", "Internship", "Contract"],
//     department: [
//       "All",
//       "Engineering",
//       "IT",
//       "Sales",
//       "Marketing",
//       "HR",
//       "Finance",
//       "Operations",
//       "Customer Service",
//       "Management",
//     ],
//     englishLevel: ["All", "Basic", "Intermediate", "Fluent", "Advanced"],
//     distance: [
//       "All",
//       "Within 5 km",
//       "Within 10 km",
//       "Within 20 km",
//       "Within 50 km",
//     ],
//     workShift: ["Day shift", "Night shift", "Flexible", "Rotational"],
//     sortBy: [
//       "Relevant",
//       "Salary - High to low",
//       "Date posted - New to Old",
//       "Distance - Near to Far",
//     ],
//   };

//   // Filter chips data (MOBILE)
//   const filterChips = [
//     { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
//     { key: "datePosted", label: "Date posted", icon: <Calendar size={16} /> },
//     { key: "salary", label: "Salary", icon: <DollarSign size={16} /> },
//     { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
//     { key: "workMode", label: "Work mode", icon: <Building size={16} /> },
//     { key: "workType", label: "Work type", icon: <Clock size={16} /> },
//     { key: "department", label: "Department", icon: <Briefcase size={16} /> },
//     { key: "englishLevel", label: "English level", icon: <Globe size={16} /> },
//     { key: "distance", label: "Distance", icon: <MapPin size={16} /> },
//     { key: "workShift", label: "Work shift", icon: <Clock size={16} /> },
//   ];

//   /* SUGGESTION DATA - Desktop के लिए */
//   const jobTitles = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Web Developer",
//     "React Developer",
//     "Node Developer",
//     "MERN Stack Developer",
//     "Java Developer",
//     "Python Developer",
//     "PHP Developer",
//     "Android Developer",
//     "iOS Developer",
//     "UI UX Designer",
//     "Graphic Designer",
//     "Software Engineer",
//     "QA Tester",
//     "DevOps Engineer",
//     "Data Analyst",
//     "Data Scientist",
//     "ML Engineer",
//     "Cloud Engineer",
//     "System Engineer",
//     "IT Support",
//     "Network Engineer",
//     "Game Developer",
//     "Blockchain Developer",
//     "Cyber Security Engineer",
//     "SEO Executive",
//     "Digital Marketer",
//     "Content Writer",
//   ];

//   const experiences = Array.from({ length: 16 }, (_, i) =>
//     i === 0 ? "Fresher" : i === 15 ? "15+ Years" : `${i} Years`,
//   );

//   const cities = [
//     "Delhi",
//     "Mumbai",
//     "Pune",
//     "Bangalore",
//     "Chennai",
//     "Hyderabad",
//     "Noida",
//     "Gurgaon",
//     "Faridabad",
//     "Ghaziabad",
//     "Jaipur",
//     "Ajmer",
//     "Udaipur",
//     "Jodhpur",
//     "Kota",
//     "Bhopal",
//     "Indore",
//     "Gwalior",
//     "Kanpur",
//     "Lucknow",
//     "Prayagraj",
//     "Varanasi",
//     "Patna",
//     "Ranchi",
//     "Kolkata",
//     "Howrah",
//     "Durgapur",
//     "Asansol",
//     "Siliguri",
//     "Guwahati",
//     "Shillong",
//     "Imphal",
//     "Aizawl",
//     "Agartala",
//     "Chandigarh",
//     "Mohali",
//     "Ludhiana",
//     "Amritsar",
//     "Jalandhar",
//     "Dehradun",
//     "Haridwar",
//     "Roorkee",
//     "Shimla",
//     "Manali",
//     "Panaji",
//     "Margao",
//     "Surat",
//     "Vadodara",
//     "Ahmedabad",
//     "Rajkot",
//     "Bhavnagar",
//   ];

//   // Fetch jobs on mount
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(`${API}/jobs`);
//       setJobsData(res.data.data || []);
//       setFilteredJobs(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//     }
//   };

//   // Calculate active filter count (MOBILE)
//   useEffect(() => {
//     let count = 0;
//     if (exp !== "" && exp !== "All") count++;
//     if (datePosted !== "All") count++;
//     if (salary < 150000) count++;
//     if (education !== "All") count++;
//     if (workModes.length > 0) count++;
//     if (workTypes.length > 0) count++;
//     if (department !== "All") count++;
//     if (englishLevel !== "All") count++;
//     if (distance !== "All") count++;
//     if (workShifts.length > 0) count++;
//     setFilterCount(count);
//   }, [
//     exp,
//     datePosted,
//     salary,
//     education,
//     workModes,
//     workTypes,
//     department,
//     englishLevel,
//     distance,
//     workShifts,
//   ]);

//   // ================= SEARCH FUNCTION =================
//   const handleSearch = () => {
//     // URL parameters update करें
//     const params = new URLSearchParams();
//     if (job) params.set("job", job);
//     if (exp) params.set("exp", exp);
//     if (city) params.set("city", city);

//     // URL update करें
//     router.push(`/jobs?${params.toString()}`, { scroll: false });

//     // Filters apply करें
//     applyFilters();
//   };
//   const applyFilters = () => {
//     let filtered = [...jobsData];

//     // Job title filter
//     if (job) {
//       filtered = filtered.filter((jobItem) =>
//         jobItem.title?.toLowerCase().includes(job.toLowerCase()),
//       );
//     }

//     // Location filter
//     if (city) {
//       filtered = filtered.filter((jobItem) =>
//         jobItem.location?.toLowerCase().includes(city.toLowerCase()),
//       );
//     }

//     // Experience filter
//     if (exp && exp !== "All") {
//       filtered = filtered.filter((jobItem) => {
//         const expRange = jobItem.experience || {};
//         const minExp = expRange.min || 0;
//         const maxExp = expRange.max || 99;

//         // Parse experience from exp string (e.g., "3 Years" or "3")
//         const expValue =
//           parseInt(exp.replace(" Years", "").replace("+", "")) || 0;
//         return expValue >= minExp && expValue <= maxExp;
//       });
//     }

//     // Salary filter
//     if (salary < 150000) {
//       filtered = filtered.filter((jobItem) => {
//         const salaryRange = jobItem.salary || {};
//         const minSalary = salaryRange.min || 0;
//         const maxSalary = salaryRange.max || 9999999;
//         return salary >= minSalary && salary <= maxSalary;
//       });
//     }

//     // Date posted filter
//     if (datePosted !== "All") {
//       const now = new Date();
//       filtered = filtered.filter((jobItem) => {
//         const jobDate = new Date(jobItem.createdAt);
//         const daysDiff = Math.floor((now - jobDate) / (1000 * 60 * 60 * 24));

//         switch (datePosted) {
//           case "Last 24 hours":
//             return daysDiff <= 1;
//           case "Last 3 days":
//             return daysDiff <= 3;
//           case "Last 7 days":
//             return daysDiff <= 7;
//           case "Last 15 days":
//             return daysDiff <= 15;
//           case "Last 30 days":
//             return daysDiff <= 30;
//           default:
//             return true;
//         }
//       });
//     }

//     // Work mode filter
//     if (workModes.length > 0) {
//       filtered = filtered.filter((jobItem) =>
//         workModes.includes(jobItem.workMode),
//       );
//     }

//     // Work type filter
//     if (workTypes.length > 0) {
//       filtered = filtered.filter((jobItem) =>
//         workTypes.some((type) => jobItem.jobType?.includes(type)),
//       );
//     }

//     // Department filter
//     if (department !== "All") {
//       filtered = filtered.filter(
//         (jobItem) =>
//           jobItem.category === department || jobItem.department === department,
//       );
//     }

//     // Sort
//     if (sortBy === "Salary - High to low") {
//       filtered.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
//     } else if (sortBy === "Date posted - New to Old") {
//       filtered.sort(
//         (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
//       );
//     } else if (sortBy === "Distance - Near to Far") {
//       // You can implement distance-based sorting if you have coordinates
//       filtered.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
//     }

//     setFilteredJobs(filtered);
//   };
//   // const applyFilters = () => {
//   //   let filtered = [...jobsData];

//   //   // Job title filter
//   //   if (job) {
//   //     filtered = filtered.filter((jobItem) =>
//   //       jobItem.title?.toLowerCase().includes(job.toLowerCase()),
//   //     );
//   //   }

//   //   // Location filter
//   //   if (city) {
//   //     filtered = filtered.filter((jobItem) =>
//   //       jobItem.location?.toLowerCase().includes(city.toLowerCase()),
//   //     );
//   //   }

//   //   // Experience filter
//   //   if (exp && exp !== "All") {
//   //     filtered = filtered.filter((jobItem) => {
//   //       const expRange = jobItem.experience || {};
//   //       const minExp = expRange.min || 0;
//   //       const maxExp = expRange.max || 99;

//   //       // Parse experience from exp string (e.g., "3 Years")
//   //       const expValue = parseInt(exp) || 0;
//   //       return expValue >= minExp && expValue <= maxExp;
//   //     });
//   //   }

//   //   // Salary filter
//   //   if (salary < 150000) {
//   //     filtered = filtered.filter((jobItem) => {
//   //       const salaryRange = jobItem.salary || {};
//   //       const minSalary = salaryRange.min || 0;
//   //       const maxSalary = salaryRange.max || 9999999;
//   //       const monthlySalary = salary / 12; // Convert yearly to monthly if needed
//   //       return monthlySalary >= minSalary && monthlySalary <= maxSalary;
//   //     });
//   //   }

//   //   // Sort
//   //   if (sortBy === "Salary - High to low") {
//   //     filtered.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
//   //   } else if (sortBy === "Date posted - New to Old") {
//   //     filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   //   }

//   //   setFilteredJobs(filtered);
//   // };

//   // Apply filters whenever filters change
//   useEffect(() => {
//     if (jobsData.length > 0) {
//       applyFilters();
//     }
//   }, [
//     job,
//     city,
//     exp,
//     salary,
//     workModes,
//     workTypes,
//     workShifts,
//     datePosted,
//     distance,
//     education,
//     department,
//     englishLevel,
//     sortBy,
//     jobsData,
//   ]);

//   // When URL params change, update state
//   useEffect(() => {
//     setJob(jobFromURL);
//     setExp(expFromURL);
//     setCity(cityFromURL);
//   }, [jobFromURL, expFromURL, cityFromURL]);

//   // Enter key press handle करें
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setJob("");
//     setExp("");
//     setCity("");
//     setDatePosted("All");
//     setSalary(150000);
//     setEducation("All");
//     setWorkModes([]);
//     setWorkTypes([]);
//     setDepartment("All");
//     setEnglishLevel("All");
//     setDistance("All");
//     setWorkShifts([]);
//     setSortBy("Relevant");
//     router.push("/jobs");
//   };

//   // ================= MOBILE SPECIFIC FUNCTIONS =================
//   const getFilterDisplayValue = (filterKey) => {
//     switch (filterKey) {
//       case "experience":
//         return exp === "" || exp === "All" ? "Experience" : exp;
//       case "datePosted":
//         return datePosted === "All" ? "Date posted" : datePosted;
//       case "salary":
//         return salary === 150000 ? "Salary" : `₹${salary.toLocaleString()}`;
//       case "education":
//         return education === "All" ? "Education" : education;
//       case "workMode":
//         return workModes.length === 0
//           ? "Work mode"
//           : `${workModes.length} selected`;
//       case "workType":
//         return workTypes.length === 0
//           ? "Work type"
//           : `${workTypes.length} selected`;
//       case "department":
//         return department === "All" ? "Department" : department;
//       case "englishLevel":
//         return englishLevel === "All" ? "English level" : englishLevel;
//       case "distance":
//         return distance === "All" ? "Distance" : distance;
//       case "workShift":
//         return workShifts.length === 0
//           ? "Work shift"
//           : `${workShifts.length} selected`;
//       default:
//         return filterKey;
//     }
//   };

//   const isFilterActive = (filterKey) => {
//     switch (filterKey) {
//       case "experience":
//         return exp !== "" && exp !== "All";
//       case "datePosted":
//         return datePosted !== "All";
//       case "salary":
//         return salary < 150000;
//       case "education":
//         return education !== "All";
//       case "workMode":
//         return workModes.length > 0;
//       case "workType":
//         return workTypes.length > 0;
//       case "department":
//         return department !== "All";
//       case "englishLevel":
//         return englishLevel !== "All";
//       case "distance":
//         return distance !== "All";
//       case "workShift":
//         return workShifts.length > 0;
//       default:
//         return false;
//     }
//   };

//   const closeActiveFilter = () => {
//     setActiveFilter(null);
//     applyFilters();
//   };

//   // Render mobile filter dropdown content
//   const renderMobileFilterContent = () => {
//     if (!activeFilter) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
//         <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
//           {/* Filter Header */}
//           <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               {filterChips.find((f) => f.key === activeFilter)?.icon}
//               <h3 className="font-semibold text-lg">
//                 {filterChips.find((f) => f.key === activeFilter)?.label}
//               </h3>
//             </div>
//             <button onClick={closeActiveFilter} className="p-2">
//               <X size={24} />
//             </button>
//           </div>

//           {/* Filter Content */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {activeFilter === "experience" && (
//               <div className="space-y-2">
//                 {filterOptions.experience.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setExp(option === "All" ? "" : option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       exp === (option === "All" ? "" : option)
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {exp === (option === "All" ? "" : option) && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activeFilter === "datePosted" && (
//               <div className="space-y-2">
//                 {filterOptions.datePosted.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setDatePosted(option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       datePosted === option
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {datePosted === option && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activeFilter === "salary" && (
//               <div className="space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>₹10,000</span>
//                   <span>₹1.5 Lakhs</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="10000"
//                   max="150000"
//                   step="5000"
//                   value={salary}
//                   onChange={(e) => setSalary(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                 />
//                 <div className="text-center font-medium text-lg">
//                   ₹{salary.toLocaleString()}
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   {filterOptions.salaryRanges.map((range) => (
//                     <button
//                       key={range}
//                       onClick={() => {
//                         if (range === "All") setSalary(150000);
//                         else if (range === "₹70,000+") setSalary(70000);
//                         setTimeout(closeActiveFilter, 200);
//                       }}
//                       className={`px-4 py-3 rounded-lg border text-sm font-medium ${
//                         salary === 150000 && range === "All"
//                           ? "bg-blue-50 text-blue-600 border-blue-200"
//                           : "border-gray-200 hover:bg-gray-50"
//                       }`}
//                     >
//                       {range}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {["education", "department", "englishLevel", "distance"].includes(
//               activeFilter,
//             ) && (
//               <div className="space-y-2">
//                 {filterOptions[activeFilter].map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       const setters = {
//                         education: setEducation,
//                         department: setDepartment,
//                         englishLevel: setEnglishLevel,
//                         distance: setDistance,
//                       };
//                       setters[activeFilter](option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       {
//                         education: education === option,
//                         department: department === option,
//                         englishLevel: englishLevel === option,
//                         distance: distance === option,
//                       }[activeFilter]
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {{
//                       education: education === option,
//                       department: department === option,
//                       englishLevel: englishLevel === option,
//                       distance: distance === option,
//                     }[activeFilter] && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {["workMode", "workType", "workShift"].includes(activeFilter) && (
//               <div className="space-y-3">
//                 {filterOptions[activeFilter].map((option) => {
//                   const currentArray = {
//                     workMode: workModes,
//                     workType: workTypes,
//                     workShift: workShifts,
//                   }[activeFilter];

//                   return (
//                     <label
//                       key={option}
//                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
//                     >
//                       <span className="font-medium">{option}</span>
//                       <input
//                         type="checkbox"
//                         checked={currentArray.includes(option)}
//                         onChange={(e) => {
//                           const setters = {
//                             workMode: setWorkModes,
//                             workType: setWorkTypes,
//                             workShift: setWorkShifts,
//                           };
//                           const setter = setters[activeFilter];

//                           if (e.target.checked) {
//                             setter([...currentArray, option]);
//                           } else {
//                             setter(
//                               currentArray.filter((item) => item !== option),
//                             );
//                           }
//                         }}
//                         className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </label>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Filter Footer */}
//           <div className="sticky bottom-0 bg-white border-t p-4">
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   switch (activeFilter) {
//                     case "experience":
//                       setExp("");
//                       break;
//                     case "datePosted":
//                       setDatePosted("All");
//                       break;
//                     case "salary":
//                       setSalary(150000);
//                       break;
//                     case "education":
//                       setEducation("All");
//                       break;
//                     case "workMode":
//                       setWorkModes([]);
//                       break;
//                     case "workType":
//                       setWorkTypes([]);
//                       break;
//                     case "department":
//                       setDepartment("All");
//                       break;
//                     case "englishLevel":
//                       setEnglishLevel("All");
//                       break;
//                     case "distance":
//                       setDistance("All");
//                       break;
//                     case "workShift":
//                       setWorkShifts([]);
//                       break;
//                   }
//                   applyFilters();
//                 }}
//                 className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
//               >
//                 Clear
//               </button>
//               <button
//                 onClick={closeActiveFilter}
//                 className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="bg-gray-50 min-h-screen">
//       {/* ================= DESKTOP VIEW ================= */}
//       <div className="hidden lg:block">
//         {/* ================= SEARCH BAR ================= */}
//         <div className="bg-white border-b py-6 shadow-sm">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="flex gap-4">
//               {/* JOB TITLE */}
//               <div className="relative flex-1">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <Search size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="Job title, keywords, or company"
//                     value={job}
//                     onChange={(e) => {
//                       setJob(e.target.value);
//                       setShowJob(true);
//                     }}
//                     onFocus={() => setShowJob(true)}
//                     onBlur={() => setTimeout(() => setShowJob(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {/* SUGGESTION */}
//                 {showJob && job && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     <div className="p-3 border-b">
//                       <p className="text-sm font-medium text-gray-700">
//                         Suggestions
//                       </p>
//                     </div>
//                     {jobTitles
//                       .filter((j) =>
//                         j.toLowerCase().includes(job.toLowerCase()),
//                       )
//                       .slice(0, 8)
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setJob(item);
//                             setShowJob(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center justify-between"
//                         >
//                           <span>{item}</span>
//                           <ChevronRight size={16} className="text-gray-400" />
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* EXPERIENCE */}
//               <div className="relative w-48">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <Briefcase size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="Experience"
//                     value={exp}
//                     onChange={(e) => {
//                       setExp(e.target.value);
//                       setShowExp(true);
//                     }}
//                     onFocus={() => setShowExp(true)}
//                     onBlur={() => setTimeout(() => setShowExp(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {showExp && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     {experiences
//                       .filter(
//                         (e) =>
//                           exp === "" ||
//                           e.toLowerCase().includes(exp.toLowerCase()),
//                       )
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setExp(item);
//                             setShowExp(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0"
//                         >
//                           {item}
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* LOCATION */}
//               <div className="relative w-56">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <MapPin size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="City, state, or zip"
//                     value={city}
//                     onChange={(e) => {
//                       setCity(e.target.value);
//                       setShowCity(true);
//                     }}
//                     onFocus={() => setShowCity(true)}
//                     onBlur={() => setTimeout(() => setShowCity(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {showCity && city && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     <div className="p-3 border-b">
//                       <p className="text-sm font-medium text-gray-700">
//                         Popular Cities
//                       </p>
//                     </div>
//                     {cities
//                       .filter((c) =>
//                         c.toLowerCase().includes(city.toLowerCase()),
//                       )
//                       .slice(0, 8)
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setCity(item);
//                             setShowCity(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center"
//                         >
//                           <MapPin size={16} className="mr-3 text-gray-400" />
//                           <span>{item}</span>
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* SEARCH BTN */}
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
//               >
//                 <Search size={20} />
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex gap-8">
//             {/* ================= FILTERS SIDEBAR ================= */}
//             <div className="w-64 flex-shrink-0">
//               <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6 sticky top-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-bold text-lg text-gray-800">Filters</h3>
//                   {filterCount > 0 && (
//                     <button
//                       onClick={clearAllFilters}
//                       className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                     >
//                       Clear all
//                     </button>
//                   )}
//                 </div>

//                 {/* DATE POSTED */}
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <Calendar size={16} />
//                     Date posted
//                   </h4>
//                   <div className="space-y-2">
//                     {[
//                       "All",
//                       "Last 24 hours",
//                       "Last 3 days",
//                       "Last 7 days",
//                       "Last 30 days",
//                     ].map((item) => (
//                       <label
//                         key={item}
//                         className="flex items-center gap-3 cursor-pointer group"
//                       >
//                         <div className="relative">
//                           <input
//                             type="radio"
//                             name="date"
//                             checked={datePosted === item}
//                             onChange={() => {
//                               setDatePosted(item);
//                               handleSearch();
//                             }}
//                             className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                           />
//                         </div>
//                         <span className="text-gray-600 group-hover:text-gray-800">
//                           {item}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* SALARY */}
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <DollarSign size={16} />
//                     Monthly Salary
//                   </h4>
//                   <div className="space-y-3">
//                     <div className="px-1">
//                       <input
//                         type="range"
//                         min="10000"
//                         max="150000"
//                         step="5000"
//                         value={salary}
//                         onChange={(e) => {
//                           setSalary(Number(e.target.value));
//                           handleSearch();
//                         }}
//                         className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                       />
//                     </div>
//                     <div className="flex justify-between text-sm text-gray-500">
//                       <span>₹10K</span>
//                       <span>₹{salary.toLocaleString()}</span>
//                       <span>₹1.5L</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* WORK MODE */}
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <Building size={16} />
//                     Work Mode
//                   </h4>
//                   <div className="space-y-2">
//                     {["Work from home", "Work from office", "Hybrid"].map(
//                       (item) => (
//                         <label
//                           key={item}
//                           className="flex items-center gap-3 cursor-pointer group"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={workModes.includes(item)}
//                             onChange={() => {
//                               setWorkModes((prev) =>
//                                 prev.includes(item)
//                                   ? prev.filter((m) => m !== item)
//                                   : [...prev, item],
//                               );
//                               handleSearch();
//                             }}
//                             className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                           />
//                           <span className="text-gray-600 group-hover:text-gray-800">
//                             {item}
//                           </span>
//                         </label>
//                       ),
//                     )}
//                   </div>
//                 </div>

//                 {/* WORK TYPE */}
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <Clock size={16} />
//                     Work Type
//                   </h4>
//                   <div className="space-y-2">
//                     {["Full time", "Part time", "Internship", "Contract"].map(
//                       (item) => (
//                         <label
//                           key={item}
//                           className="flex items-center gap-3 cursor-pointer group"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={workTypes.includes(item)}
//                             onChange={() => {
//                               setWorkTypes((prev) =>
//                                 prev.includes(item)
//                                   ? prev.filter((t) => t !== item)
//                                   : [...prev, item],
//                               );
//                               handleSearch();
//                             }}
//                             className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                           />
//                           <span className="text-gray-600 group-hover:text-gray-800">
//                             {item}
//                           </span>
//                         </label>
//                       ),
//                     )}
//                   </div>
//                 </div>

//                 {/* SORT BY */}
//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                     <SortAsc size={16} />
//                     Sort By
//                   </h4>
//                   <div className="space-y-2">
//                     {[
//                       "Relevant",
//                       "Salary - High to low",
//                       "Date posted - New to Old",
//                     ].map((item) => (
//                       <label
//                         key={item}
//                         className="flex items-center gap-3 cursor-pointer group"
//                       >
//                         <div className="relative">
//                           <input
//                             type="radio"
//                             name="sort"
//                             checked={sortBy === item}
//                             onChange={() => {
//                               setSortBy(item);
//                               handleSearch();
//                             }}
//                             className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                           />
//                         </div>
//                         <span className="text-gray-600 group-hover:text-gray-800">
//                           {item}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ================= JOB LIST ================= */}
//             <div className="flex-1">
//               <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//                 <h2 className="font-bold text-xl text-gray-800 mb-2">
//                   {filteredJobs.length} Jobs Found
//                 </h2>
//                 {(job || exp || city) && (
//                   <p className="text-gray-600">
//                     {job && `"${job}"`}
//                     {exp && ` • ${exp}`}
//                     {city && ` • ${city}`}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 {filteredJobs.length > 0 ? (
//                   filteredJobs.map((jobItem) => (
//                     <JobCard key={jobItem._id} job={jobItem} />
//                   ))
//                 ) : (
//                   <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
//                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Briefcase size={32} className="text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-800 mb-2">
//                       No jobs found
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       Try adjusting your search criteria or filters
//                     </p>
//                     <button
//                       onClick={clearAllFilters}
//                       className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                     >
//                       Clear All Filters
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE VIEW ================= */}
//       <div className="lg:hidden">
//         {/* ================= HEADER ================= */}
//         <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
//           <div className="p-4">
//             {/* ================= SEARCH BAR ================= */}
//             <div className="flex gap-2 mb-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     placeholder="Job title, skills"
//                     value={job}
//                     onChange={(e) => setJob(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     placeholder="City, state"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
//                   />
//                 </div>
//               </div>
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex justify-center items-center transition-colors"
//               >
//                 <Search size={20} />
//               </button>
//             </div>

//             {/* ================= SEARCH TITLE ================= */}
//             <div className="mb-2">
//               <h2 className="font-bold text-lg">
//                 {job || city
//                   ? `${job}${job && city ? ", " : ""}${city}`
//                   : "All Jobs"}
//                 <span className="text-gray-600 text-sm ml-2">
//                   ({filteredJobs.length} jobs)
//                 </span>
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* ================= FILTERS BAR ================= */}
//         <div className="bg-white border-b px-4 py-3 sticky top-[140px] z-20 shadow-sm">
//           <div className="flex justify-between items-center mb-3">
//             <div className="flex items-center gap-2">
//               <Filter size={18} />
//               <span className="font-bold">Filters</span>
//               {filterCount > 0 && (
//                 <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
//                   {filterCount} Applied
//                 </span>
//               )}
//             </div>

//             {filterCount > 0 && (
//               <button
//                 onClick={clearAllFilters}
//                 className="text-red-600 text-sm font-medium flex items-center gap-1"
//               >
//                 <X size={16} />
//                 Clear
//               </button>
//             )}
//           </div>

//           {/* ================= FILTER CHIPS ROW ================= */}
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {filterChips.map((chip) => {
//               const isActive = isFilterActive(chip.key);
//               const displayValue = getFilterDisplayValue(chip.key);

//               return (
//                 <button
//                   key={chip.key}
//                   onClick={() =>
//                     setActiveFilter(activeFilter === chip.key ? null : chip.key)
//                   }
//                   className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap flex-shrink-0 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 border-blue-200"
//                       : "bg-white text-gray-700 border-gray-200"
//                   }`}
//                 >
//                   {chip.icon}
//                   <span className="text-sm font-medium">{displayValue}</span>
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       activeFilter === chip.key ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= SORT BY ================= */}
//         <div className="bg-white border-b px-4 py-3">
//           <div className="flex items-center gap-2">
//             <SortAsc size={18} className="text-gray-600" />
//             <span className="font-medium text-gray-700">Sort By:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => {
//                 setSortBy(e.target.value);
//                 handleSearch();
//               }}
//               className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none font-medium"
//             >
//               {filterOptions.sortBy.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* ================= FILTER DROPDOWN ================= */}
//         {renderMobileFilterContent()}

//         {/* ================= JOB LIST ================= */}
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-4 text-gray-800">
//             {filteredJobs.length} Jobs Found
//           </h3>

//           {filteredJobs.length > 0 ? (
//             <div className="space-y-3">
//               {filteredJobs.map((jobItem) => (
//                 <MobileJobCard key={jobItem._id} job={jobItem} />
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl p-6 text-center mt-8">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Briefcase size={32} className="text-gray-400" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-800 mb-2">
//                 No jobs found
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Try changing your search criteria
//               </p>
//               <button
//                 onClick={clearAllFilters}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium w-full"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
// function JobCard({ job }) {
//   // Safely extract values with fallbacks
//   const jobTitle = job?.title || "Job Title";
//   const company = job?.company || "Company Name";
//   const location = job?.location || "Location Not Specified";

//   // Salary handling - MongoDB format
//   const salaryMin = job?.salary?.min || 0;
//   const salaryMax = job?.salary?.max || 0;

//   // Experience handling - MongoDB format
//   const expMin = job?.experience?.min || 0;
//   const expMax = job?.experience?.max || 0;

//   const jobType = job?.jobType || "Full Time";
//   const workMode = job?.workMode || "Office";
//   const category = job?.category || "General";
//   const description = job?.description || "";
//   const skills = job?.skillsRequired || job?.skills || [];

//   // Benefits - array हो सकता है या string
//   const benefits = Array.isArray(job?.benefits)
//     ? job.benefits
//     : job?.benefits
//       ? [job.benefits]
//       : [];

//   // Calculate days ago
//   const daysAgo = Math.floor(
//     (new Date() - new Date(job?.createdAt || new Date())) /
//       (1000 * 60 * 60 * 24),
//   );

//   return (
//     <Link href={`/jobs/${job._id}`}>
//       <div className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-400 cursor-pointer hover:shadow-md transition-all duration-200 group">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-1">
//             <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 mb-1">
//               {jobTitle}
//             </h3>
//             <p className="text-gray-600 font-medium mb-2">{company}</p>
//             <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
//               <span className="flex items-center gap-1">
//                 <MapPin size={14} />
//                 {location}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Briefcase size={14} />
//                 {expMin} - {expMax} years
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="font-bold text-lg text-green-600">
//               ₹{salaryMin} - ₹{salaryMax} LPA
//             </p>
//             <p className="text-gray-500 text-sm">per month</p>
//           </div>
//         </div>

//         {/* DESCRIPTION */}
//         {description && (
//           <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
//         )}

//         {/* TAGS */}
//         <div className="flex gap-2 flex-wrap mb-4">
//           <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//             {jobType}
//           </span>
//           <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
//             {workMode}
//           </span>
//           {category && (
//             <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
//               {category}
//             </span>
//           )}
//         </div>

//         {/* SKILLS - skillsRequired field use कर रहे हैं */}
//         {skills.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
//             <div className="flex gap-2 flex-wrap">
//               {skills.slice(0, 4).map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {skills.length > 4 && (
//                 <span className="text-gray-500 text-sm">
//                   +{skills.length - 4} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* BENEFITS - अगर array में है तो show करें */}
//         {benefits.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
//             <div className="flex gap-2 flex-wrap">
//               {benefits.slice(0, 3).map((benefit, i) => (
//                 <span
//                   key={i}
//                   className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {benefit}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* FOOTER */}
//         <div className="flex justify-between items-center pt-4 border-t">
//           <div className="flex items-center gap-4 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <Calendar size={14} />
//               {daysAgo === 0
//                 ? "Today"
//                 : daysAgo === 1
//                   ? "Yesterday"
//                   : `${daysAgo} days ago`}
//             </span>
//             {job?.isUrgent && (
//               <span className="text-red-600 font-medium">🔥 Urgent</span>
//             )}
//             {job?.isFeatured && (
//               <span className="text-yellow-600 font-medium">⭐ Featured</span>
//             )}
//           </div>
//           <button className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
//             View Details
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }
// // function JobCard({ job }) {
// //   // Safely extract values with fallbacks
// //   const jobTitle = job?.title || "Job Title";
// //   const company = job?.company || "Company Name";
// //   const location = job?.location || "Location Not Specified";

// //   // Salary handling
// //   const salaryMin = job?.salary?.min || 0;
// //   const salaryMax = job?.salary?.max || 0;

// //   // Experience handling
// //   const expMin = job?.experience?.min || 0;
// //   const expMax = job?.experience?.max || 0;

// //   const jobType = job?.jobType || "Full Time";
// //   const workMode = job?.workMode || "Office";
// //   const category = job?.category || "General";
// //   const description = job?.description || "";
// //   const skills = job?.skillsRequired || job?.skills || [];
// //   const benefits = Array.isArray(job?.benefits) ? job.benefits : [];

// //   // Calculate days ago
// //   const daysAgo = Math.floor(
// //     (new Date() - new Date(job?.createdAt || new Date())) /
// //       (1000 * 60 * 60 * 24),
// //   );

// //   return (
// //     <Link href={`/jobs/${job._id}`}>
// //       <div className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-400 cursor-pointer hover:shadow-md transition-all duration-200 group">
// //         <div className="flex justify-between items-start mb-4">
// //           <div className="flex-1">
// //             <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 mb-1">
// //               {jobTitle}
// //             </h3>
// //             <p className="text-gray-600 font-medium mb-2">{company}</p>
// //             <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
// //               <span className="flex items-center gap-1">
// //                 <MapPin size={14} />
// //                 {location}
// //               </span>
// //               <span className="flex items-center gap-1">
// //                 <Briefcase size={14} />
// //                 {expMin} - {expMax} years
// //               </span>
// //             </div>
// //           </div>
// //           <div className="text-right">
// //             <p className="font-bold text-lg text-green-600">
// //               ₹{salaryMin} - ₹{salaryMax} LPA
// //             </p>
// //             <p className="text-gray-500 text-sm">per month</p>
// //           </div>
// //         </div>

// //         {/* DESCRIPTION */}
// //         {description && (
// //           <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
// //         )}

// //         {/* TAGS */}
// //         <div className="flex gap-2 flex-wrap mb-4">
// //           <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
// //             {jobType}
// //           </span>
// //           <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
// //             {workMode}
// //           </span>
// //           {category && (
// //             <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
// //               {category}
// //             </span>
// //           )}
// //         </div>

// //         {/* SKILLS */}
// //         {skills.length > 0 && (
// //           <div className="mb-4">
// //             <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
// //             <div className="flex gap-2 flex-wrap">
// //               {skills.slice(0, 4).map((skill, i) => (
// //                 <span
// //                   key={i}
// //                   className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
// //                 >
// //                   {skill}
// //                 </span>
// //               ))}
// //               {skills.length > 4 && (
// //                 <span className="text-gray-500 text-sm">
// //                   +{skills.length - 4} more
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* FOOTER */}
// //         <div className="flex justify-between items-center pt-4 border-t">
// //           <div className="flex items-center gap-4 text-sm text-gray-500">
// //             <span className="flex items-center gap-1">
// //               <Calendar size={14} />
// //               {daysAgo === 0
// //                 ? "Today"
// //                 : daysAgo === 1
// //                   ? "Yesterday"
// //                   : `${daysAgo} days ago`}
// //             </span>
// //             {job?.isUrgent && (
// //               <span className="text-red-600 font-medium">🔥 Urgent</span>
// //             )}
// //             {job?.isFeatured && (
// //               <span className="text-yellow-600 font-medium">⭐ Featured</span>
// //             )}
// //           </div>
// //           <button className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
// //             View Details
// //             <ChevronRight size={16} />
// //           </button>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }
// // function MobileJobCard({ job }) {
// //   const daysAgo = Math.floor(
// //     (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24),
// //   );

// //   return (
// //     <Link href={`/jobs/${job._id}`}>
// //       <div className="bg-white rounded-xl border p-4 hover:border-blue-400 transition-colors active:bg-gray-50">
// //         <div className="flex justify-between items-start mb-3">
// //           <div className="flex-1">
// //             <h3 className="font-bold text-gray-800 mb-1">{job.title}</h3>
// //             <p className="text-gray-600 font-medium text-sm">{job.company}</p>
// //           </div>
// //           <div className="text-right">
// //             <p className="font-bold text-green-600">
// //               ₹{job.salary?.min || 0} - ₹{job.salary?.max || 0}
// //             </p>
// //             <p className="text-gray-500 text-xs">monthly</p>
// //           </div>
// //         </div>

// //         {/* LOCATION */}
// //         <div className="flex items-center text-gray-600 text-sm mb-3">
// //           <MapPin size={14} className="mr-2" />
// //           {job.location}
// //         </div>

// //         {/* TAGS */}
// //         <div className="flex flex-wrap gap-2 mb-3">
// //           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
// //             {job.jobType || "Full Time"}
// //           </span>
// //           <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
// //             {job.experience?.min || 0} - {job.experience?.max || 0} yrs
// //           </span>
// //           <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
// //             {job.workMode || "Office"}
// //           </span>
// //         </div>

// //         {/* FOOTER */}
// //         <div className="flex justify-between items-center text-xs text-gray-500">
// //           <div className="flex items-center">
// //             <Calendar size={12} className="mr-1" />
// //             {daysAgo === 0
// //               ? "Today"
// //               : daysAgo === 1
// //                 ? "Yesterday"
// //                 : `${daysAgo} days ago`}
// //           </div>
// //           <span className="text-blue-600 font-medium">View →</span>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }
// // function MobileJobCard({ job }) {
// //   // Safely extract values
// //   const title = job?.title || "Job Title";
// //   const company = job?.company || "Company";
// //   const location = job?.location || "Location";
// //   const salaryMin = job?.salary?.min || 0;
// //   const salaryMax = job?.salary?.max || 0;
// //   const jobType = job?.jobType || "Full Time";
// //   const expMin = job?.experience?.min || 0;
// //   const expMax = job?.experience?.max || 0;

// //   const daysAgo = Math.floor(
// //     (new Date() - new Date(job?.createdAt || new Date())) /
// //       (1000 * 60 * 60 * 24),
// //   );

// //   return (
// //     <Link href={`/jobs/${job._id}`}>
// //       <div className="bg-white rounded-xl border p-4 hover:border-blue-400 transition-colors active:bg-gray-50">
// //         <div className="flex justify-between items-start mb-3">
// //           <div className="flex-1">
// //             <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
// //             <p className="text-gray-600 font-medium text-sm">{company}</p>
// //           </div>
// //           <div className="text-right">
// //             <p className="font-bold text-green-600">
// //               ₹{salaryMin} - ₹{salaryMax}
// //             </p>
// //             <p className="text-gray-500 text-xs">monthly</p>
// //           </div>
// //         </div>

// //         {/* LOCATION */}
// //         <div className="flex items-center text-gray-600 text-sm mb-3">
// //           <MapPin size={14} className="mr-2" />
// //           {location}
// //         </div>

// //         {/* TAGS */}
// //         <div className="flex flex-wrap gap-2 mb-3">
// //           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
// //             {jobType}
// //           </span>
// //           <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
// //             {expMin} - {expMax} yrs
// //           </span>
// //           {job?.workMode && (
// //             <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
// //               {job.workMode}
// //             </span>
// //           )}
// //         </div>

// //         {/* FOOTER */}
// //         <div className="flex justify-between items-center text-xs text-gray-500">
// //           <div className="flex items-center">
// //             <Calendar size={12} className="mr-1" />
// //             {daysAgo === 0
// //               ? "Today"
// //               : daysAgo === 1
// //                 ? "Yesterday"
// //                 : `${daysAgo} days ago`}
// //           </div>
// //           <span className="text-blue-600 font-medium">View →</span>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }
// function MobileJobCard({ job }) {
//   // Safely extract values - MongoDB format
//   const title = job?.title || "Job Title";
//   const company = job?.company || "Company";
//   const location = job?.location || "Location";

//   // Salary - MongoDB format
//   const salaryMin = job?.salary?.min || 0;
//   const salaryMax = job?.salary?.max || 0;

//   const jobType = job?.jobType || "Full Time";

//   // Experience - MongoDB format
//   const expMin = job?.experience?.min || 0;
//   const expMax = job?.experience?.max || 0;
//   const skills = job?.skillsRequired || job?.skills || [];
//   const daysAgo = Math.floor(
//     (new Date() - new Date(job?.createdAt || new Date())) /
//       (1000 * 60 * 60 * 24),
//   );

//   return (
//     <Link href={`/jobs/${job._id}`}>
//       <div className="bg-white rounded-xl border p-4 hover:border-blue-400 transition-colors active:bg-gray-50">
//         <div className="flex justify-between items-start mb-3">
//           <div className="flex-1">
//             <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
//             <p className="text-gray-600 font-medium text-sm">{company}</p>
//           </div>
//           <div className="text-right">
//             <p className="font-bold text-green-600">
//               ₹{salaryMin} - ₹{salaryMax} LPA
//             </p>
//             <p className="text-gray-500 text-xs">annual</p>
//           </div>
//         </div>

//         {/* LOCATION */}
//         <div className="flex items-center text-gray-600 text-sm mb-3">
//           <MapPin size={14} className="mr-2" />
//           {location}
//         </div>

//         {/* TAGS */}
//         <div className="flex flex-wrap gap-2 mb-3">
//           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
//             {jobType}
//           </span>
//           <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
//             {expMin} - {expMax} yrs
//           </span>
//           {job?.workMode && (
//             <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
//               {job.workMode}
//             </span>
//           )}
//           {job?.category && (
//             <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-full">
//               {job.category}
//             </span>
//           )}
//         </div>

//         {/* SKILLS (if any) */}
//         {job?.skillsRequired?.length > 0 && (
//           <div className="mb-3">
//             <div className="flex flex-wrap gap-1">
//               {job.skillsRequired.slice(0, 3).map((skill, i) => (
//                 <span
//                   key={i}
//                   className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {job.skillsRequired.length > 3 && (
//                 <span className="text-xs text-gray-500">
//                   +{job.skillsRequired.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* FOOTER */}
//         <div className="flex justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center">
//             <Calendar size={12} className="mr-1" />
//             {daysAgo === 0
//               ? "Today"
//               : daysAgo === 1
//                 ? "Yesterday"
//                 : `${daysAgo} days ago`}
//           </div>
//           <span className="text-blue-600 font-medium">View →</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";
// import {
//   Filter,
//   X,
//   ChevronDown,
//   MapPin,
//   Calendar,
//   DollarSign,
//   GraduationCap,
//   Building,
//   Clock,
//   Globe,
//   SortAsc,
//   Search,
//   Briefcase,
//   Check,
//   ChevronRight,
// } from "lucide-react";

// export default function JobsPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const API = "http://localhost:5000/api";

//   // URL से parameters पढ़ें
//   const jobFromURL = searchParams.get("job") || "";
//   const expFromURL = searchParams.get("exp") || "";
//   const cityFromURL = searchParams.get("city") || "";

//   // Search states
//   const [job, setJob] = useState(jobFromURL);
//   const [exp, setExp] = useState(expFromURL);
//   const [city, setCity] = useState(cityFromURL);

//   // All filters state
//   const [salary, setSalary] = useState(150000);
//   const [workModes, setWorkModes] = useState([]);
//   const [workTypes, setWorkTypes] = useState([]);
//   const [workShifts, setWorkShifts] = useState([]);
//   const [datePosted, setDatePosted] = useState("All");
//   const [distance, setDistance] = useState("All");
//   const [education, setEducation] = useState("All");
//   const [department, setDepartment] = useState("All");
//   const [englishLevel, setEnglishLevel] = useState("All");
//   const [sortBy, setSortBy] = useState("Relevant");
//   // Applied filters (Search ke baad use honge)
//   const [appliedJob, setAppliedJob] = useState("");
//   const [appliedExp, setAppliedExp] = useState("");
//   const [appliedCity, setAppliedCity] = useState("");

//   // UI state - फिल्टर open/close के लिए (MOBILE ONLY)
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filterCount, setFilterCount] = useState(0);

//   // UI state - Desktop के लिए
//   const [showJob, setShowJob] = useState(false);
//   const [showExp, setShowExp] = useState(false);
//   const [showCity, setShowCity] = useState(false);

//   // Filtered jobs
//   const [jobsData, setJobsData] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filter options (MOBILE)
//   const filterOptions = {
//     experience: [
//       "All",
//       "Fresher",
//       "1 Years",
//       "2 Years",
//       "3 Years",
//       "4 Years",
//       "5 Years",
//       "6+ Years",
//       "7+ Years",
//       "8+ Years",
//       "9+ Years",
//       "10+ Years",
//       "11+ Years",
//       "12+ Years",
//       "13+ Years",
//       "14+ Years",
//       "15+ Years",
//     ],
//     datePosted: [
//       "All",
//       "Last 24 hours",
//       "Last 3 days",
//       "Last 7 days",
//       "Last 15 days",
//       "Last 30 days",
//     ],
//     salaryRanges: [
//       "All",
//       "₹10,000 - ₹20,000",
//       "₹20,000 - ₹30,000",
//       "₹30,000 - ₹40,000",
//       "₹40,000 - ₹50,000",
//       "₹50,000 - ₹60,000",
//       "₹60,000 - ₹70,000",
//       "₹70,000+",
//     ],
//     education: [
//       "All",
//       "High School",
//       "Diploma",
//       "Bachelor's Degree",
//       "Master's Degree",
//       "PhD",
//     ],
//     workMode: ["Work from home", "Work from office", "Hybrid"],
//     workType: ["Full time", "Part time", "Internship", "Contract"],
//     department: [
//       "All",
//       "Engineering",
//       "IT",
//       "Sales",
//       "Marketing",
//       "HR",
//       "Finance",
//       "Operations",
//       "Customer Service",
//       "Management",
//     ],
//     englishLevel: ["All", "Basic", "Intermediate", "Fluent", "Advanced"],
//     distance: [
//       "All",
//       "Within 5 km",
//       "Within 10 km",
//       "Within 20 km",
//       "Within 50 km",
//     ],
//     workShift: ["Day shift", "Night shift", "Flexible", "Rotational"],
//     sortBy: [
//       "Relevant",
//       "Salary - High to low",
//       "Date posted - New to Old",
//       "Distance - Near to Far",
//     ],
//   };

//   // Filter chips data (MOBILE)
//   const filterChips = [
//     { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
//     { key: "datePosted", label: "Date posted", icon: <Calendar size={16} /> },
//     { key: "salary", label: "Salary", icon: <DollarSign size={16} /> },
//     { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
//     { key: "workMode", label: "Work mode", icon: <Building size={16} /> },
//     { key: "workType", label: "Work type", icon: <Clock size={16} /> },
//     { key: "department", label: "Department", icon: <Briefcase size={16} /> },
//     { key: "englishLevel", label: "English level", icon: <Globe size={16} /> },
//     { key: "distance", label: "Distance", icon: <MapPin size={16} /> },
//     { key: "workShift", label: "Work shift", icon: <Clock size={16} /> },
//   ];

//   /* SUGGESTION DATA - Desktop के लिए */
//   const jobTitles = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Web Developer",
//     "React Developer",
//     "Node Developer",
//     "MERN Stack Developer",
//     "Java Developer",
//     "Python Developer",
//     "PHP Developer",
//     "Android Developer",
//     "iOS Developer",
//     "UI UX Designer",
//     "Graphic Designer",
//     "Software Engineer",
//     "QA Tester",
//     "DevOps Engineer",
//     "Data Analyst",
//     "Data Scientist",
//     "ML Engineer",
//     "Cloud Engineer",
//     "System Engineer",
//     "IT Support",
//     "Network Engineer",
//     "Game Developer",
//     "Blockchain Developer",
//     "Cyber Security Engineer",
//     "SEO Executive",
//     "Digital Marketer",
//     "Content Writer",
//   ];

//   const experiences = Array.from({ length: 16 }, (_, i) =>
//     i === 0 ? "Fresher" : i === 15 ? "15+ Years" : `${i} Years`,
//   );

//   const cities = [
//     "Delhi",
//     "Mumbai",
//     "Pune",
//     "Bangalore",
//     "Chennai",
//     "Hyderabad",
//     "Noida",
//     "Gurgaon",
//     "Faridabad",
//     "Ghaziabad",
//     "Jaipur",
//     "Ajmer",
//     "Udaipur",
//     "Jodhpur",
//     "Kota",
//     "Bhopal",
//     "Indore",
//     "Gwalior",
//     "Kanpur",
//     "Lucknow",
//     "Prayagraj",
//     "Varanasi",
//     "Patna",
//     "Ranchi",
//     "Kolkata",
//     "Howrah",
//     "Durgapur",
//     "Asansol",
//     "Siliguri",
//     "Guwahati",
//     "Shillong",
//     "Imphal",
//     "Aizawl",
//     "Agartala",
//     "Chandigarh",
//     "Mohali",
//     "Ludhiana",
//     "Amritsar",
//     "Jalandhar",
//     "Dehradun",
//     "Haridwar",
//     "Roorkee",
//     "Shimla",
//     "Manali",
//     "Panaji",
//     "Margao",
//     "Surat",
//     "Vadodara",
//     "Ahmedabad",
//     "Rajkot",
//     "Bhavnagar",
//   ];

//   // Fetch jobs on mount
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${API}/jobs`);
//       console.log("Fetched Jobs:", res.data.data); // Debug
//       setJobsData(res.data.data || []);
//       setFilteredJobs(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate active filter count (MOBILE)
//   useEffect(() => {
//     let count = 0;
//     if (exp !== "" && exp !== "All") count++;
//     if (datePosted !== "All") count++;
//     if (salary < 150000) count++;
//     if (education !== "All") count++;
//     if (workModes.length > 0) count++;
//     if (workTypes.length > 0) count++;
//     if (department !== "All") count++;
//     if (englishLevel !== "All") count++;
//     if (distance !== "All") count++;
//     if (workShifts.length > 0) count++;
//     setFilterCount(count);
//   }, [
//     exp,
//     datePosted,
//     salary,
//     education,
//     workModes,
//     workTypes,
//     department,
//     englishLevel,
//     distance,
//     workShifts,
//   ]);

//   // ================= SEARCH FUNCTION =================
//   const handleSearch = () => {
//     // Save applied values
//     setAppliedJob(job.trim());
//     setAppliedExp(exp.trim());
//     setAppliedCity(city.trim());

//     const params = new URLSearchParams();

//     if (job) params.set("job", job);
//     if (exp) params.set("exp", exp);
//     if (city) params.set("city", city);

//     router.push(`/jobs?${params.toString()}`, { scroll: false });

//     applyFilters(job, exp, city);
//   };
//   const applyFilters = (jobValue, expValue, cityValue) => {
//     let filtered = [...jobsData];

//     const finalJob = (jobValue ?? appliedJob)?.toLowerCase().trim();
//     const finalExp = expValue ?? appliedExp;
//     const finalCity = (cityValue ?? appliedCity)?.toLowerCase().trim();

//     /* ================= JOB ================= */
//     if (finalJob) {
//       filtered = filtered.filter((item) =>
//         item.title?.toLowerCase().includes(finalJob),
//       );
//     }

//     /* ================= CITY ================= */
//     if (finalCity) {
//       filtered = filtered.filter((item) =>
//         item.location?.toLowerCase().includes(finalCity),
//       );
//     }

//     /* ================= EXPERIENCE ================= */
//     if (finalExp && finalExp !== "All") {
//       const expNum = parseInt(finalExp);

//       filtered = filtered.filter((item) => {
//         const min = item.experience?.min || 0;
//         const max = item.experience?.max || 99;

//         return expNum >= min && expNum <= max;
//       });
//     }

//     /* ================= DATE POSTED ================= */
//     if (datePosted !== "All") {
//       const now = new Date();

//       filtered = filtered.filter((item) => {
//         const jobDate = new Date(item.createdAt);
//         const diffDays = (now - jobDate) / (1000 * 60 * 60 * 24);

//         if (datePosted === "Last 24 hours") return diffDays <= 1;
//         if (datePosted === "Last 3 days") return diffDays <= 3;
//         if (datePosted === "Last 7 days") return diffDays <= 7;
//         if (datePosted === "Last 15 days") return diffDays <= 15;
//         if (datePosted === "Last 30 days") return diffDays <= 30;

//         return true;
//       });
//     }

//     /* ================= SALARY ================= */
//     if (salary < 150000) {
//       filtered = filtered.filter((item) => {
//         const maxSalary = item.salary?.max || 0;
//         return maxSalary <= salary;
//       });
//     }

//     /* ================= WORK MODE ================= */
//     if (workModes.length > 0) {
//       filtered = filtered.filter((item) => workModes.includes(item.workMode));
//     }

//     /* ================= WORK TYPE ================= */
//     if (workTypes.length > 0) {
//       filtered = filtered.filter((item) => workTypes.includes(item.jobType));
//     }

//     /* ================= SORT ================= */
//     if (sortBy === "Salary - High to low") {
//       filtered.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
//     }

//     if (sortBy === "Date posted - New to Old") {
//       filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }

//     setFilteredJobs(filtered);
//   };

//   // When URL params change, update state
//   useEffect(() => {
//     setJob(jobFromURL);
//     setExp(expFromURL);
//     setCity(cityFromURL);
//   }, [jobFromURL, expFromURL, cityFromURL]);

//   // Enter key press handle करें
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setJob("");
//     setExp("");
//     setCity("");
//     setDatePosted("All");
//     setSalary(150000);
//     setEducation("All");
//     setWorkModes([]);
//     setWorkTypes([]);
//     setDepartment("All");
//     setEnglishLevel("All");
//     setDistance("All");
//     setWorkShifts([]);
//     setSortBy("Relevant");
//     router.push("/jobs");
//   };

//   // ================= MOBILE SPECIFIC FUNCTIONS =================
//   const getFilterDisplayValue = (filterKey) => {
//     switch (filterKey) {
//       case "experience":
//         return exp === "" || exp === "All" ? "Experience" : exp;
//       case "datePosted":
//         return datePosted === "All" ? "Date posted" : datePosted;
//       case "salary":
//         return salary === 150000 ? "Salary" : `₹${salary.toLocaleString()}`;
//       case "education":
//         return education === "All" ? "Education" : education;
//       case "workMode":
//         return workModes.length === 0
//           ? "Work mode"
//           : `${workModes.length} selected`;
//       case "workType":
//         return workTypes.length === 0
//           ? "Work type"
//           : `${workTypes.length} selected`;
//       case "department":
//         return department === "All" ? "Department" : department;
//       case "englishLevel":
//         return englishLevel === "All" ? "English level" : englishLevel;
//       case "distance":
//         return distance === "All" ? "Distance" : distance;
//       case "workShift":
//         return workShifts.length === 0
//           ? "Work shift"
//           : `${workShifts.length} selected`;
//       default:
//         return filterKey;
//     }
//   };

//   const isFilterActive = (filterKey) => {
//     switch (filterKey) {
//       case "experience":
//         return exp !== "" && exp !== "All";
//       case "datePosted":
//         return datePosted !== "All";
//       case "salary":
//         return salary < 150000;
//       case "education":
//         return education !== "All";
//       case "workMode":
//         return workModes.length > 0;
//       case "workType":
//         return workTypes.length > 0;
//       case "department":
//         return department !== "All";
//       case "englishLevel":
//         return englishLevel !== "All";
//       case "distance":
//         return distance !== "All";
//       case "workShift":
//         return workShifts.length > 0;
//       default:
//         return false;
//     }
//   };

//   const closeActiveFilter = () => {
//     setActiveFilter(null);
//     applyFilters();
//   };

//   // Render mobile filter dropdown content
//   const renderMobileFilterContent = () => {
//     if (!activeFilter) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
//         <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
//           {/* Filter Header */}
//           <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               {filterChips.find((f) => f.key === activeFilter)?.icon}
//               <h3 className="font-semibold text-lg">
//                 {filterChips.find((f) => f.key === activeFilter)?.label}
//               </h3>
//             </div>
//             <button onClick={closeActiveFilter} className="p-2">
//               <X size={24} />
//             </button>
//           </div>

//           {/* Filter Content */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {activeFilter === "experience" && (
//               <div className="space-y-2">
//                 {filterOptions.experience.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setExp(option === "All" ? "" : option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       exp === (option === "All" ? "" : option)
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {exp === (option === "All" ? "" : option) && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activeFilter === "datePosted" && (
//               <div className="space-y-2">
//                 {filterOptions.datePosted.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setDatePosted(option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       datePosted === option
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {datePosted === option && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activeFilter === "salary" && (
//               <div className="space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>₹10,000</span>
//                   <span>₹1.5 Lakhs</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="10000"
//                   max="150000"
//                   step="5000"
//                   value={salary}
//                   onChange={(e) => setSalary(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                 />
//                 <div className="text-center font-medium text-lg">
//                   ₹{salary.toLocaleString()}
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   {filterOptions.salaryRanges.map((range) => (
//                     <button
//                       key={range}
//                       onClick={() => {
//                         if (range === "All") setSalary(150000);
//                         else if (range === "₹70,000+") setSalary(70000);
//                         setTimeout(closeActiveFilter, 200);
//                       }}
//                       className={`px-4 py-3 rounded-lg border text-sm font-medium ${
//                         salary === 150000 && range === "All"
//                           ? "bg-blue-50 text-blue-600 border-blue-200"
//                           : "border-gray-200 hover:bg-gray-50"
//                       }`}
//                     >
//                       {range}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {["education", "department", "englishLevel", "distance"].includes(
//               activeFilter,
//             ) && (
//               <div className="space-y-2">
//                 {filterOptions[activeFilter].map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       const setters = {
//                         education: setEducation,
//                         department: setDepartment,
//                         englishLevel: setEnglishLevel,
//                         distance: setDistance,
//                       };
//                       setters[activeFilter](option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       {
//                         education: education === option,
//                         department: department === option,
//                         englishLevel: englishLevel === option,
//                         distance: distance === option,
//                       }[activeFilter]
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {{
//                       education: education === option,
//                       department: department === option,
//                       englishLevel: englishLevel === option,
//                       distance: distance === option,
//                     }[activeFilter] && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {["workMode", "workType", "workShift"].includes(activeFilter) && (
//               <div className="space-y-3">
//                 {filterOptions[activeFilter].map((option) => {
//                   const currentArray = {
//                     workMode: workModes,
//                     workType: workTypes,
//                     workShift: workShifts,
//                   }[activeFilter];

//                   return (
//                     <label
//                       key={option}
//                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
//                     >
//                       <span className="font-medium">{option}</span>
//                       <input
//                         type="checkbox"
//                         checked={currentArray.includes(option)}
//                         onChange={(e) => {
//                           const setters = {
//                             workMode: setWorkModes,
//                             workType: setWorkTypes,
//                             workShift: setWorkShifts,
//                           };
//                           const setter = setters[activeFilter];

//                           if (e.target.checked) {
//                             setter([...currentArray, option]);
//                           } else {
//                             setter(
//                               currentArray.filter((item) => item !== option),
//                             );
//                           }
//                         }}
//                         className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </label>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Filter Footer */}
//           <div className="sticky bottom-0 bg-white border-t p-4">
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   switch (activeFilter) {
//                     case "experience":
//                       setExp("");
//                       break;
//                     case "datePosted":
//                       setDatePosted("All");
//                       break;
//                     case "salary":
//                       setSalary(150000);
//                       break;
//                     case "education":
//                       setEducation("All");
//                       break;
//                     case "workMode":
//                       setWorkModes([]);
//                       break;
//                     case "workType":
//                       setWorkTypes([]);
//                       break;
//                     case "department":
//                       setDepartment("All");
//                       break;
//                     case "englishLevel":
//                       setEnglishLevel("All");
//                       break;
//                     case "distance":
//                       setDistance("All");
//                       break;
//                     case "workShift":
//                       setWorkShifts([]);
//                       break;
//                   }
//                   applyFilters();
//                 }}
//                 className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
//               >
//                 Clear
//               </button>
//               <button
//                 onClick={closeActiveFilter}
//                 className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="bg-gray-50 min-h-screen">
//       {/* ================= DESKTOP VIEW ================= */}
//       <div className="hidden lg:block">
//         {/* ================= SEARCH BAR ================= */}
//         <div className="bg-white border-b py-6 shadow-sm">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="flex gap-4">
//               {/* JOB TITLE */}
//               <div className="relative flex-1">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <Search size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="Job title, keywords, or company"
//                     value={job}
//                     onChange={(e) => {
//                       setJob(e.target.value);
//                       setShowJob(true);
//                     }}
//                     onFocus={() => setShowJob(true)}
//                     onBlur={() => setTimeout(() => setShowJob(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {/* SUGGESTION */}
//                 {showJob && job && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     <div className="p-3 border-b">
//                       <p className="text-sm font-medium text-gray-700">
//                         Suggestions
//                       </p>
//                     </div>
//                     {jobTitles
//                       .filter((j) =>
//                         j.toLowerCase().includes(job.toLowerCase()),
//                       )
//                       .slice(0, 8)
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setJob(item);
//                             setShowJob(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center justify-between"
//                         >
//                           <span>{item}</span>
//                           <ChevronRight size={16} className="text-gray-400" />
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* EXPERIENCE */}
//               <div className="relative w-48">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <Briefcase size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="Experience"
//                     value={exp}
//                     onChange={(e) => {
//                       setExp(e.target.value);
//                       setShowExp(true);
//                     }}
//                     onFocus={() => setShowExp(true)}
//                     onBlur={() => setTimeout(() => setShowExp(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {showExp && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     {experiences
//                       .filter(
//                         (e) =>
//                           exp === "" ||
//                           e.toLowerCase().includes(exp.toLowerCase()),
//                       )
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setExp(item);
//                             setShowExp(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0"
//                         >
//                           {item}
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* LOCATION */}
//               <div className="relative w-56">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <MapPin size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="City, state, or zip"
//                     value={city}
//                     onChange={(e) => {
//                       setCity(e.target.value);
//                       setShowCity(true);
//                     }}
//                     onFocus={() => setShowCity(true)}
//                     onBlur={() => setTimeout(() => setShowCity(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {showCity && city && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     <div className="p-3 border-b">
//                       <p className="text-sm font-medium text-gray-700">
//                         Popular Cities
//                       </p>
//                     </div>
//                     {cities
//                       .filter((c) =>
//                         c.toLowerCase().includes(city.toLowerCase()),
//                       )
//                       .slice(0, 8)
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setCity(item);
//                             setShowCity(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center"
//                         >
//                           <MapPin size={16} className="mr-3 text-gray-400" />
//                           <span>{item}</span>
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* SEARCH BTN */}
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
//               >
//                 <Search size={20} />
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           {loading ? (
//             <div className="text-center py-20">
//               <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading jobs...</p>
//             </div>
//           ) : (
//             <div className="flex gap-8">
//               {/* ================= FILTERS SIDEBAR ================= */}
//               <div className="w-64 flex-shrink-0">
//                 <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6 sticky top-6">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-bold text-lg text-gray-800">Filters</h3>
//                     {filterCount > 0 && (
//                       <button
//                         onClick={clearAllFilters}
//                         className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                       >
//                         Clear all
//                       </button>
//                     )}
//                   </div>

//                   {/* DATE POSTED */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <Calendar size={16} />
//                       Date posted
//                     </h4>
//                     <div className="space-y-2">
//                       {[
//                         "All",
//                         "Last 24 hours",
//                         "Last 3 days",
//                         "Last 7 days",
//                         "Last 30 days",
//                       ].map((item) => (
//                         <label
//                           key={item}
//                           className="flex items-center gap-3 cursor-pointer group"
//                         >
//                           <div className="relative">
//                             <input
//                               type="radio"
//                               name="date"
//                               checked={datePosted === item}
//                               onChange={() => {
//                                 setDatePosted(item);
//                                 applyFilters();
//                               }}
//                               className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                           </div>
//                           <span className="text-gray-600 group-hover:text-gray-800">
//                             {item}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* SALARY */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <DollarSign size={16} />
//                       Monthly Salary
//                     </h4>
//                     <div className="space-y-3">
//                       <div className="px-1">
//                         <input
//                           type="range"
//                           min="10000"
//                           max="150000"
//                           step="5000"
//                           value={salary}
//                           onChange={(e) => {
//                             setSalary(Number(e.target.value));
//                             handleSearch();
//                           }}
//                           className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                         />
//                       </div>
//                       <div className="flex justify-between text-sm text-gray-500">
//                         <span>₹10K</span>
//                         <span>₹{salary.toLocaleString()}</span>
//                         <span>₹1.5L</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* WORK MODE */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <Building size={16} />
//                       Work Mode
//                     </h4>
//                     <div className="space-y-2">
//                       {["Work from home", "Work from office", "Hybrid"].map(
//                         (item) => (
//                           <label
//                             key={item}
//                             className="flex items-center gap-3 cursor-pointer group"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={workModes.includes(item)}
//                               onChange={() => {
//                                 setWorkModes((prev) =>
//                                   prev.includes(item)
//                                     ? prev.filter((m) => m !== item)
//                                     : [...prev, item],
//                                 );
//                                 handleSearch();
//                               }}
//                               className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                             <span className="text-gray-600 group-hover:text-gray-800">
//                               {item}
//                             </span>
//                           </label>
//                         ),
//                       )}
//                     </div>
//                   </div>

//                   {/* WORK TYPE */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <Clock size={16} />
//                       Work Type
//                     </h4>
//                     <div className="space-y-2">
//                       {["Full time", "Part time", "Internship", "Contract"].map(
//                         (item) => (
//                           <label
//                             key={item}
//                             className="flex items-center gap-3 cursor-pointer group"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={workTypes.includes(item)}
//                               onChange={() => {
//                                 setWorkTypes((prev) =>
//                                   prev.includes(item)
//                                     ? prev.filter((t) => t !== item)
//                                     : [...prev, item],
//                                 );
//                                 handleSearch();
//                               }}
//                               className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                             <span className="text-gray-600 group-hover:text-gray-800">
//                               {item}
//                             </span>
//                           </label>
//                         ),
//                       )}
//                     </div>
//                   </div>

//                   {/* SORT BY */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <SortAsc size={16} />
//                       Sort By
//                     </h4>
//                     <div className="space-y-2">
//                       {[
//                         "Relevant",
//                         "Salary - High to low",
//                         "Date posted - New to Old",
//                       ].map((item) => (
//                         <label
//                           key={item}
//                           className="flex items-center gap-3 cursor-pointer group"
//                         >
//                           <div className="relative">
//                             <input
//                               type="radio"
//                               name="sort"
//                               checked={sortBy === item}
//                               onChange={() => {
//                                 setSortBy(item);
//                                 handleSearch();
//                               }}
//                               className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                           </div>
//                           <span className="text-gray-600 group-hover:text-gray-800">
//                             {item}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ================= JOB LIST ================= */}
//               <div className="flex-1">
//                 <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//                   <h2 className="font-bold text-xl text-gray-800 mb-2">
//                     {filteredJobs.length} Jobs Found
//                   </h2>
//                   {(job || exp || city) && (
//                     <p className="text-gray-600">
//                       {job && `"${job}"`}
//                       {exp && ` • ${exp}`}
//                       {city && ` • ${city}`}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-4">
//                   {filteredJobs.length > 0 ? (
//                     filteredJobs.map((jobItem) => (
//                       <JobCard key={jobItem._id} job={jobItem} />
//                     ))
//                   ) : (
//                     <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Briefcase size={32} className="text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">
//                         No jobs found
//                       </h3>
//                       <p className="text-gray-600 mb-6">
//                         Try adjusting your search criteria or filters
//                       </p>
//                       <button
//                         onClick={clearAllFilters}
//                         className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                       >
//                         Clear All Filters
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================= MOBILE VIEW ================= */}
//       <div className="lg:hidden">
//         {/* ================= HEADER ================= */}
//         <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
//           <div className="p-4">
//             {/* ================= SEARCH BAR ================= */}
//             <div className="flex gap-2 mb-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     placeholder="Job title, skills"
//                     value={job}
//                     onChange={(e) => setJob(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     placeholder="City, state"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
//                   />
//                 </div>
//               </div>
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex justify-center items-center transition-colors"
//               >
//                 <Search size={20} />
//               </button>
//             </div>

//             {/* ================= SEARCH TITLE ================= */}
//             <div className="mb-2">
//               <h2 className="font-bold text-lg">
//                 {job || city
//                   ? `${job}${job && city ? ", " : ""}${city}`
//                   : "All Jobs"}
//                 <span className="text-gray-600 text-sm ml-2">
//                   ({filteredJobs.length} jobs)
//                 </span>
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* ================= FILTERS BAR ================= */}
//         <div className="bg-white border-b px-4 py-3 sticky top-[140px] z-20 shadow-sm">
//           <div className="flex justify-between items-center mb-3">
//             <div className="flex items-center gap-2">
//               <Filter size={18} />
//               <span className="font-bold">Filters</span>
//               {filterCount > 0 && (
//                 <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
//                   {filterCount} Applied
//                 </span>
//               )}
//             </div>

//             {filterCount > 0 && (
//               <button
//                 onClick={clearAllFilters}
//                 className="text-red-600 text-sm font-medium flex items-center gap-1"
//               >
//                 <X size={16} />
//                 Clear
//               </button>
//             )}
//           </div>

//           {/* ================= FILTER CHIPS ROW ================= */}
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {filterChips.map((chip) => {
//               const isActive = isFilterActive(chip.key);
//               const displayValue = getFilterDisplayValue(chip.key);

//               return (
//                 <button
//                   key={chip.key}
//                   onClick={() =>
//                     setActiveFilter(activeFilter === chip.key ? null : chip.key)
//                   }
//                   className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap flex-shrink-0 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 border-blue-200"
//                       : "bg-white text-gray-700 border-gray-200"
//                   }`}
//                 >
//                   {chip.icon}
//                   <span className="text-sm font-medium">{displayValue}</span>
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       activeFilter === chip.key ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= SORT BY ================= */}
//         <div className="bg-white border-b px-4 py-3">
//           <div className="flex items-center gap-2">
//             <SortAsc size={18} className="text-gray-600" />
//             <span className="font-medium text-gray-700">Sort By:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => {
//                 setSortBy(e.target.value);
//                 handleSearch();
//               }}
//               className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none font-medium"
//             >
//               {filterOptions.sortBy.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* ================= FILTER DROPDOWN ================= */}
//         {renderMobileFilterContent()}

//         {/* ================= JOB LIST ================= */}
//         <div className="p-4">
//           {loading ? (
//             <div className="text-center py-10">
//               <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading jobs...</p>
//             </div>
//           ) : (
//             <>
//               <h3 className="font-bold text-lg mb-4 text-gray-800">
//                 {filteredJobs.length} Jobs Found
//               </h3>

//               {filteredJobs.length > 0 ? (
//                 <div className="space-y-3">
//                   {filteredJobs.map((jobItem) => (
//                     <MobileJobCard key={jobItem._id} job={jobItem} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl p-6 text-center mt-8">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Briefcase size={32} className="text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-2">
//                     No jobs found
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     Try changing your search criteria
//                   </p>
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium w-full"
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ================= DESKTOP JOB CARD ================= */
// function JobCard({ job }) {
//   // Safely extract values with fallbacks
//   const jobTitle = job?.title || "Job Title";
//   const company = job?.company || "Company Name";
//   const location = job?.location || "Location Not Specified";

//   // Salary handling - MongoDB format
//   const salaryMin = job?.salary?.min || 0;
//   const salaryMax = job?.salary?.max || 0;

//   // Experience handling - MongoDB format
//   const expMin = job?.experience?.min || 0;
//   const expMax = job?.experience?.max || 0;

//   const jobType = job?.jobType || "Full Time";
//   const workMode = job?.workMode || "Office";
//   const category = job?.category || "General";
//   const description = job?.description || "";

//   // 🔴 FIXED: Skills access properly
//   const skills = job?.skillsRequired || job?.skills || [];

//   // Benefits - array हो सकता है या string
//   const benefits = Array.isArray(job?.benefits)
//     ? job.benefits
//     : job?.benefits
//       ? [job.benefits]
//       : [];

//   // Calculate days ago
//   const daysAgo = Math.floor(
//     (new Date() - new Date(job?.createdAt || new Date())) /
//       (1000 * 60 * 60 * 24),
//   );

//   return (
//     <Link href={`/jobs/${job._id}`}>
//       <div className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-400 cursor-pointer hover:shadow-md transition-all duration-200 group">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-1">
//             <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 mb-1">
//               {jobTitle}
//             </h3>
//             <p className="text-gray-600 font-medium mb-2">{company}</p>
//             <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
//               <span className="flex items-center gap-1">
//                 <MapPin size={14} />
//                 {location}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Briefcase size={14} />
//                 {expMin} years
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="font-bold text-lg text-green-600">
//               ₹{salaryMin} - ₹{salaryMax} LPA
//             </p>
//             <p className="text-gray-500 text-sm">per month</p>
//           </div>
//         </div>

//         {/* DESCRIPTION */}
//         {description && (
//           <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
//         )}

//         {/* TAGS */}
//         <div className="flex gap-2 flex-wrap mb-4">
//           <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//             {jobType}
//           </span>
//           <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
//             {workMode}
//           </span>
//           {category && (
//             <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
//               {category}
//             </span>
//           )}
//         </div>

//         {/* SKILLS - FIXED: Always show if skills exist */}
//         {skills.length > 0 ? (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
//             <div className="flex gap-2 flex-wrap">
//               {skills.slice(0, 4).map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {skills.length > 4 && (
//                 <span className="text-gray-500 text-sm">
//                   +{skills.length - 4} more
//                 </span>
//               )}
//             </div>
//           </div>
//         ) : null}

//         {/* BENEFITS - अगर array में है तो show करें */}
//         {benefits.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
//             <div className="flex gap-2 flex-wrap">
//               {benefits.slice(0, 3).map((benefit, i) => (
//                 <span
//                   key={i}
//                   className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {benefit}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* FOOTER */}
//         <div className="flex justify-between items-center pt-4 border-t">
//           <div className="flex items-center gap-4 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <Calendar size={14} />
//               {daysAgo === 0
//                 ? "Today"
//                 : daysAgo === 1
//                   ? "Yesterday"
//                   : `${daysAgo} days ago`}
//             </span>
//             {job?.isUrgent && (
//               <span className="text-red-600 font-medium">🔥 Urgent</span>
//             )}
//             {job?.isFeatured && (
//               <span className="text-yellow-600 font-medium">⭐ Featured</span>
//             )}
//           </div>
//           <button className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
//             View Details
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// /* ================= MOBILE JOB CARD ================= */
// function MobileJobCard({ job }) {
//   // Safely extract values - MongoDB format
//   const title = job?.title || "Job Title";
//   const company = job?.company || "Company";
//   const location = job?.location || "Location";

//   // Salary - MongoDB format
//   const salaryMin = job?.salary?.min || 0;
//   const salaryMax = job?.salary?.max || 0;

//   const jobType = job?.jobType || "Full Time";

//   // Experience - MongoDB format
//   const expMin = job?.experience?.min || 0;
//   const expMax = job?.experience?.max || 0;

//   // 🔴 FIXED: Skills access properly
//   const skills = job?.skillsRequired || job?.skills || [];

//   const daysAgo = Math.floor(
//     (new Date() - new Date(job?.createdAt || new Date())) /
//       (1000 * 60 * 60 * 24),
//   );

//   return (
//     <Link href={`/jobs/${job._id}`}>
//       <div className="bg-white rounded-xl border p-4 hover:border-blue-400 transition-colors active:bg-gray-50">
//         <div className="flex justify-between items-start mb-3">
//           <div className="flex-1">
//             <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
//             <p className="text-gray-600 font-medium text-sm">{company}</p>
//           </div>
//           <div className="text-right">
//             <p className="font-bold text-green-600">
//               ₹{salaryMin} - ₹{salaryMax} LPA
//             </p>
//             <p className="text-gray-500 text-xs">annual</p>
//           </div>
//         </div>

//         {/* LOCATION */}
//         <div className="flex items-center text-gray-600 text-sm mb-3">
//           <MapPin size={14} className="mr-2" />
//           {location}
//         </div>

//         {/* TAGS */}
//         <div className="flex flex-wrap gap-2 mb-3">
//           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
//             {jobType}
//           </span>
//           <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
//             {expMin} - {expMax} yrs
//           </span>
//           {job?.workMode && (
//             <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
//               {job.workMode}
//             </span>
//           )}
//           {job?.category && (
//             <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-full">
//               {job.category}
//             </span>
//           )}
//         </div>

//         {/* SKILLS - FIXED: Always show if skills exist */}
//         {skills.length > 0 && (
//           <div className="mb-3">
//             <div className="flex flex-wrap gap-1">
//               {skills.slice(0, 3).map((skill, i) => (
//                 <span
//                   key={i}
//                   className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {skills.length > 3 && (
//                 <span className="text-xs text-gray-500">
//                   +{skills.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* FOOTER */}
//         <div className="flex justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center">
//             <Calendar size={12} className="mr-1" />
//             {daysAgo === 0
//               ? "Today"
//               : daysAgo === 1
//                 ? "Yesterday"
//                 : `${daysAgo} days ago`}
//           </div>
//           <span className="text-blue-600 font-medium">View →</span>
//         </div>
//       </div>
//     </Link>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";
// const normalize = (str = "") => str.toLowerCase().replace(/[\s-]/g, "");
// import {
//   Filter,
//   X,
//   ChevronDown,
//   MapPin,
//   Calendar,
//   DollarSign,
//   GraduationCap,
//   Building,
//   Clock,
//   Globe,
//   SortAsc,
//   Search,
//   Briefcase,
//   Check,
//   ChevronRight,
// } from "lucide-react";

// export default function JobsPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const API = "http://localhost:5000/api";

//   // URL से parameters पढ़ें
//   const jobFromURL = searchParams.get("job") || "";
//   const expFromURL = searchParams.get("exp") || "";
//   const cityFromURL = searchParams.get("city") || "";

//   // Search states
//   const [job, setJob] = useState(jobFromURL);
//   const [exp, setExp] = useState(expFromURL);
//   const [city, setCity] = useState(cityFromURL);

//   // All filters state
//   const [salary, setSalary] = useState(150000);
//   const [workModes, setWorkModes] = useState([]);
//   const [workTypes, setWorkTypes] = useState([]);
//   const [workShifts, setWorkShifts] = useState([]);
//   const [datePosted, setDatePosted] = useState("All");
//   const [distance, setDistance] = useState("All");
//   const [education, setEducation] = useState("All");
//   const [department, setDepartment] = useState("All");
//   const [englishLevel, setEnglishLevel] = useState("All");
//   const [sortBy, setSortBy] = useState("Relevant");

//   // Applied filters (Search ke baad use honge)
//   const [appliedJob, setAppliedJob] = useState("");
//   const [appliedExp, setAppliedExp] = useState("");
//   const [appliedCity, setAppliedCity] = useState("");

//   // UI state - फिल्टर open/close के लिए (MOBILE ONLY)
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filterCount, setFilterCount] = useState(0);

//   // UI state - Desktop के लिए
//   const [showJob, setShowJob] = useState(false);
//   const [showExp, setShowExp] = useState(false);
//   const [showCity, setShowCity] = useState(false);

//   // Filtered jobs
//   const [jobsData, setJobsData] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filter options (MOBILE)
//   const filterOptions = {
//     experience: [
//       "All",
//       "Fresher",
//       "1 Years",
//       "2 Years",
//       "3 Years",
//       "4 Years",
//       "5 Years",
//       "6+ Years",
//       "7+ Years",
//       "8+ Years",
//       "9+ Years",
//       "10+ Years",
//       "11+ Years",
//       "12+ Years",
//       "13+ Years",
//       "14+ Years",
//       "15+ Years",
//     ],
//     datePosted: [
//       "All",
//       "Last 24 hours",
//       "Last 3 days",
//       "Last 7 days",
//       "Last 15 days",
//       "Last 30 days",
//     ],
//     salaryRanges: [
//       "All",
//       "₹10,000 - ₹20,000",
//       "₹20,000 - ₹30,000",
//       "₹30,000 - ₹40,000",
//       "₹40,000 - ₹50,000",
//       "₹50,000 - ₹60,000",
//       "₹60,000 - ₹70,000",
//       "₹70,000+",
//     ],
//     education: [
//       "All",
//       "High School",
//       "Diploma",
//       "Bachelor's Degree",
//       "Master's Degree",
//       "PhD",
//     ],
//     workMode: ["Work from home", "Work from office", "Hybrid"],
//     workType: ["Full time", "Part time", "Internship", "Contract"],
//     department: [
//       "All",
//       "Engineering",
//       "IT",
//       "Sales",
//       "Marketing",
//       "HR",
//       "Finance",
//       "Operations",
//       "Customer Service",
//       "Management",
//     ],
//     englishLevel: ["All", "Basic", "Intermediate", "Fluent", "Advanced"],
//     distance: [
//       "All",
//       "Within 5 km",
//       "Within 10 km",
//       "Within 20 km",
//       "Within 50 km",
//     ],
//     workShift: ["Day shift", "Night shift", "Flexible", "Rotational"],
//     sortBy: [
//       "Relevant",
//       "Salary - High to low",
//       "Date posted - New to Old",
//       "Distance - Near to Far",
//     ],
//   };

//   // Filter chips data (MOBILE)
//   const filterChips = [
//     { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
//     { key: "datePosted", label: "Date posted", icon: <Calendar size={16} /> },
//     { key: "salary", label: "Salary", icon: <DollarSign size={16} /> },
//     { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
//     { key: "workMode", label: "Work mode", icon: <Building size={16} /> },
//     { key: "workType", label: "Work type", icon: <Clock size={16} /> },
//     { key: "department", label: "Department", icon: <Briefcase size={16} /> },
//     { key: "englishLevel", label: "English level", icon: <Globe size={16} /> },
//     { key: "distance", label: "Distance", icon: <MapPin size={16} /> },
//     { key: "workShift", label: "Work shift", icon: <Clock size={16} /> },
//   ];

//   /* SUGGESTION DATA - Desktop के लिए */
//   const jobTitles = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Web Developer",
//     "React Developer",
//     "Node Developer",
//     "MERN Stack Developer",
//     "Java Developer",
//     "Python Developer",
//     "PHP Developer",
//     "Android Developer",
//     "iOS Developer",
//     "UI UX Designer",
//     "Graphic Designer",
//     "Software Engineer",
//     "QA Tester",
//     "DevOps Engineer",
//     "Data Analyst",
//     "Data Scientist",
//     "ML Engineer",
//     "Cloud Engineer",
//     "System Engineer",
//     "IT Support",
//     "Network Engineer",
//     "Game Developer",
//     "Blockchain Developer",
//     "Cyber Security Engineer",
//     "SEO Executive",
//     "Digital Marketer",
//     "Content Writer",
//   ];

//   const experiences = Array.from({ length: 16 }, (_, i) =>
//     i === 0 ? "Fresher" : i === 15 ? "15+ Years" : `${i} Years`,
//   );

//   const cities = [
//     "Delhi",
//     "Mumbai",
//     "Pune",
//     "Bangalore",
//     "Chennai",
//     "Hyderabad",
//     "Noida",
//     "Gurgaon",
//     "Faridabad",
//     "Ghaziabad",
//     "Jaipur",
//     "Ajmer",
//     "Udaipur",
//     "Jodhpur",
//     "Kota",
//     "Bhopal",
//     "Indore",
//     "Gwalior",
//     "Kanpur",
//     "Lucknow",
//     "Prayagraj",
//     "Varanasi",
//     "Patna",
//     "Ranchi",
//     "Kolkata",
//     "Howrah",
//     "Durgapur",
//     "Asansol",
//     "Siliguri",
//     "Guwahati",
//     "Shillong",
//     "Imphal",
//     "Aizawl",
//     "Agartala",
//     "Chandigarh",
//     "Mohali",
//     "Ludhiana",
//     "Amritsar",
//     "Jalandhar",
//     "Dehradun",
//     "Haridwar",
//     "Roorkee",
//     "Shimla",
//     "Manali",
//     "Panaji",
//     "Margao",
//     "Surat",
//     "Vadodara",
//     "Ahmedabad",
//     "Rajkot",
//     "Bhavnagar",
//   ];

//   // Fetch jobs on mount
//   useEffect(() => {
//     fetchJobs();
//   }, []);
//   useEffect(() => {
//     if (jobsData.length > 0) {
//       applyFilters();
//     }
//   }, [jobsData]);
//   // When URL params change, update state
//   useEffect(() => {
//     setJob(jobFromURL);
//     setExp(expFromURL);
//     setCity(cityFromURL);
//     // Apply filters when URL changes
//     if (jobFromURL || expFromURL || cityFromURL) {
//       applyFilters(jobFromURL, expFromURL, cityFromURL);
//     }
//   }, [jobFromURL, expFromURL, cityFromURL]);

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(`${API}/jobs`);

//       const cleaned = (res.data.data || []).map((job) => ({
//         ...job,

//         // ✅ normalize values for filtering
//         _jobTypeNorm: normalize(job.jobType),
//         _workModeNorm: normalize(job.workMode),
//       }));

//       setJobsData(cleaned);
//       setFilteredJobs(cleaned);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate active filter count (MOBILE)
//   useEffect(() => {
//     let count = 0;
//     if (exp !== "" && exp !== "All") count++;
//     if (datePosted !== "All") count++;
//     if (salary < 150000) count++;
//     if (education !== "All") count++;
//     if (workModes.length > 0) count++;
//     if (workTypes.length > 0) count++;
//     if (department !== "All") count++;
//     if (englishLevel !== "All") count++;
//     if (distance !== "All") count++;
//     if (workShifts.length > 0) count++;
//     setFilterCount(count);
//   }, [
//     exp,
//     datePosted,
//     salary,
//     education,
//     workModes,
//     workTypes,
//     department,
//     englishLevel,
//     distance,
//     workShifts,
//   ]);

//   // Apply filters whenever filter states change
//   useEffect(() => {
//     applyFilters();
//   }, [
//     appliedJob,
//     appliedExp,
//     appliedCity,
//     datePosted,
//     salary,
//     workModes,
//     workTypes,
//     workShifts,
//     education,
//     department,
//     englishLevel,
//     sortBy,
//   ]);

//   // ================= SEARCH FUNCTION =================
//   const handleSearch = () => {
//     const j = job.trim();
//     const e = exp.trim();
//     const c = city.trim();

//     setAppliedJob(j);
//     setAppliedExp(e);
//     setAppliedCity(c);

//     const params = new URLSearchParams();

//     if (j) params.set("job", j);
//     if (e) params.set("exp", e);
//     if (c) params.set("city", c);

//     router.push(`/jobs?${params.toString()}`);
//   };

//   const applyFilters = () => {
//     if (!jobsData.length) return;

//     let filtered = [...jobsData];

//     const finalJob = appliedJob.toLowerCase();
//     const finalCity = appliedCity.toLowerCase();
//     const finalExp = appliedExp;

//     /* ===== JOB ===== */
//     if (finalJob) {
//       filtered = filtered.filter((j) =>
//         j.title?.toLowerCase().includes(finalJob),
//       );
//     }

//     /* ===== CITY ===== */
//     if (finalCity) {
//       filtered = filtered.filter((j) =>
//         j.location?.toLowerCase().includes(finalCity),
//       );
//     }

//     /* ===== EXPERIENCE ===== */
//     if (finalExp && finalExp !== "All") {
//       const expNum = parseInt(finalExp);

//       filtered = filtered.filter((j) => {
//         const min = j.experience?.min || 0;
//         const max = j.experience?.max || 99;

//         return expNum >= min && expNum <= max;
//       });
//     }

//     /* ===== DATE ===== */
//     if (datePosted !== "All") {
//       const now = new Date();

//       filtered = filtered.filter((j) => {
//         const d = new Date(j.createdAt);
//         const days = (now - d) / (1000 * 60 * 60 * 24);

//         if (datePosted === "Last 24 hours") return days <= 1;
//         if (datePosted === "Last 3 days") return days <= 3;
//         if (datePosted === "Last 7 days") return days <= 7;
//         if (datePosted === "Last 15 days") return days <= 15;
//         if (datePosted === "Last 30 days") return days <= 30;

//         return true;
//       });
//     }

//     /* ===== SALARY ===== */
//     if (salary < 150000) {
//       filtered = filtered.filter((j) => (j.salary?.max || 0) <= salary);
//     }

//     /* ===== WORK MODE ===== */
//     if (workModes.length) {
//       filtered = filtered.filter((j) =>
//         workModes.some((mode) => normalize(mode) === j._workModeNorm),
//       );
//     }

//     /* ===== WORK TYPE ===== */
//     if (workTypes.length) {
//       filtered = filtered.filter((j) =>
//         workTypes.some((type) => normalize(type) === j._jobTypeNorm),
//       );
//     }

//     /* ===== SORT ===== */
//     if (sortBy === "Salary - High to low") {
//       filtered.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
//     }

//     if (sortBy === "Date posted - New to Old") {
//       filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }

//     setFilteredJobs(filtered);
//   };

//   // Enter key press handle करें
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSearch();
//     }
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setJob("");
//     setExp("");
//     setCity("");
//     setAppliedJob("");
//     setAppliedExp("");
//     setAppliedCity("");
//     setDatePosted("All");
//     setSalary(150000);
//     setEducation("All");
//     setWorkModes([]);
//     setWorkTypes([]);
//     setDepartment("All");
//     setEnglishLevel("All");
//     setDistance("All");
//     setWorkShifts([]);
//     setSortBy("Relevant");
//     router.push("/jobs");
//     setFilteredJobs(jobsData);
//   };

//   // ================= MOBILE SPECIFIC FUNCTIONS =================
//   const getFilterDisplayValue = (filterKey) => {
//     switch (filterKey) {
//       case "experience":
//         return exp === "" || exp === "All" ? "Experience" : exp;
//       case "datePosted":
//         return datePosted === "All" ? "Date posted" : datePosted;
//       case "salary":
//         return salary === 150000 ? "Salary" : `₹${salary.toLocaleString()}`;
//       case "education":
//         return education === "All" ? "Education" : education;
//       case "workMode":
//         return workModes.length === 0
//           ? "Work mode"
//           : `${workModes.length} selected`;
//       case "workType":
//         return workTypes.length === 0
//           ? "Work type"
//           : `${workTypes.length} selected`;
//       case "department":
//         return department === "All" ? "Department" : department;
//       case "englishLevel":
//         return englishLevel === "All" ? "English level" : englishLevel;
//       case "distance":
//         return distance === "All" ? "Distance" : distance;
//       case "workShift":
//         return workShifts.length === 0
//           ? "Work shift"
//           : `${workShifts.length} selected`;
//       default:
//         return filterKey;
//     }
//   };

//   const isFilterActive = (filterKey) => {
//     switch (filterKey) {
//       case "experience":
//         return exp !== "" && exp !== "All";
//       case "datePosted":
//         return datePosted !== "All";
//       case "salary":
//         return salary < 150000;
//       case "education":
//         return education !== "All";
//       case "workMode":
//         return workModes.length > 0;
//       case "workType":
//         return workTypes.length > 0;
//       case "department":
//         return department !== "All";
//       case "englishLevel":
//         return englishLevel !== "All";
//       case "distance":
//         return distance !== "All";
//       case "workShift":
//         return workShifts.length > 0;
//       default:
//         return false;
//     }
//   };

//   const closeActiveFilter = () => {
//     setActiveFilter(null);
//     applyFilters(appliedJob, appliedExp, appliedCity);
//   };

//   // Render mobile filter dropdown content
//   const renderMobileFilterContent = () => {
//     if (!activeFilter) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
//         <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col">
//           {/* Filter Header */}
//           <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               {filterChips.find((f) => f.key === activeFilter)?.icon}
//               <h3 className="font-semibold text-lg">
//                 {filterChips.find((f) => f.key === activeFilter)?.label}
//               </h3>
//             </div>
//             <button onClick={closeActiveFilter} className="p-2">
//               <X size={24} />
//             </button>
//           </div>

//           {/* Filter Content */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {activeFilter === "experience" && (
//               <div className="space-y-2">
//                 {filterOptions.experience.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setExp(option === "All" ? "" : option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       exp === (option === "All" ? "" : option)
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {exp === (option === "All" ? "" : option) && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activeFilter === "datePosted" && (
//               <div className="space-y-2">
//                 {filterOptions.datePosted.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setDatePosted(option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       datePosted === option
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {datePosted === option && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activeFilter === "salary" && (
//               <div className="space-y-4">
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>₹10,000</span>
//                   <span>₹1.5 Lakhs</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="10000"
//                   max="150000"
//                   step="5000"
//                   value={salary}
//                   onChange={(e) => setSalary(Number(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                 />
//                 <div className="text-center font-medium text-lg">
//                   ₹{salary.toLocaleString()}
//                 </div>
//                 <div className="grid grid-cols-2 gap-2">
//                   {filterOptions.salaryRanges.map((range) => (
//                     <button
//                       key={range}
//                       onClick={() => {
//                         if (range === "All") setSalary(150000);
//                         else if (range === "₹70,000+") setSalary(70000);
//                         setTimeout(closeActiveFilter, 200);
//                       }}
//                       className={`px-4 py-3 rounded-lg border text-sm font-medium ${
//                         salary === 150000 && range === "All"
//                           ? "bg-blue-50 text-blue-600 border-blue-200"
//                           : "border-gray-200 hover:bg-gray-50"
//                       }`}
//                     >
//                       {range}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {["education", "department", "englishLevel", "distance"].includes(
//               activeFilter,
//             ) && (
//               <div className="space-y-2">
//                 {filterOptions[activeFilter].map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       const setters = {
//                         education: setEducation,
//                         department: setDepartment,
//                         englishLevel: setEnglishLevel,
//                         distance: setDistance,
//                       };
//                       setters[activeFilter](option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
//                       {
//                         education: education === option,
//                         department: department === option,
//                         englishLevel: englishLevel === option,
//                         distance: distance === option,
//                       }[activeFilter]
//                         ? "bg-blue-50 text-blue-600 border border-blue-200"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <span>{option}</span>
//                     {{
//                       education: education === option,
//                       department: department === option,
//                       englishLevel: englishLevel === option,
//                       distance: distance === option,
//                     }[activeFilter] && (
//                       <Check size={20} className="text-blue-600" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {["workMode", "workType", "workShift"].includes(activeFilter) && (
//               <div className="space-y-3">
//                 {filterOptions[activeFilter].map((option) => {
//                   const currentArray = {
//                     workMode: workModes,
//                     workType: workTypes,
//                     workShift: workShifts,
//                   }[activeFilter];

//                   return (
//                     <label
//                       key={option}
//                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
//                     >
//                       <span className="font-medium">{option}</span>
//                       <input
//                         type="checkbox"
//                         checked={currentArray.includes(option)}
//                         onChange={(e) => {
//                           const setters = {
//                             workMode: setWorkModes,
//                             workType: setWorkTypes,
//                             workShift: setWorkShifts,
//                           };
//                           const setter = setters[activeFilter];

//                           if (e.target.checked) {
//                             setter([...currentArray, option]);
//                           } else {
//                             setter(
//                               currentArray.filter((item) => item !== option),
//                             );
//                           }
//                           setTimeout(() => {
//                             applyFilters(appliedJob, appliedExp, appliedCity);
//                           }, 100);
//                         }}
//                         className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </label>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Filter Footer */}
//           <div className="sticky bottom-0 bg-white border-t p-4">
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   switch (activeFilter) {
//                     case "experience":
//                       setExp("");
//                       break;
//                     case "datePosted":
//                       setDatePosted("All");
//                       break;
//                     case "salary":
//                       setSalary(150000);
//                       break;
//                     case "education":
//                       setEducation("All");
//                       break;
//                     case "workMode":
//                       setWorkModes([]);
//                       break;
//                     case "workType":
//                       setWorkTypes([]);
//                       break;
//                     case "department":
//                       setDepartment("All");
//                       break;
//                     case "englishLevel":
//                       setEnglishLevel("All");
//                       break;
//                     case "distance":
//                       setDistance("All");
//                       break;
//                     case "workShift":
//                       setWorkShifts([]);
//                       break;
//                   }
//                   setTimeout(() => {
//                     applyFilters(appliedJob, appliedExp, appliedCity);
//                   }, 100);
//                 }}
//                 className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
//               >
//                 Clear
//               </button>
//               <button
//                 onClick={closeActiveFilter}
//                 className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="bg-gray-50 min-h-screen">
//       {/* ================= DESKTOP VIEW ================= */}
//       <div className="hidden lg:block">
//         {/* ================= SEARCH BAR ================= */}
//         <div className="bg-white border-b py-6 shadow-sm">
//           <div className="max-w-7xl mx-auto px-6">
//             <div className="flex gap-4">
//               {/* JOB TITLE */}
//               <div className="relative flex-1">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <Search size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="Job title, keywords, or company"
//                     value={job}
//                     onChange={(e) => {
//                       setJob(e.target.value);
//                       setShowJob(true);
//                     }}
//                     onFocus={() => setShowJob(true)}
//                     onBlur={() => setTimeout(() => setShowJob(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {/* SUGGESTION */}
//                 {showJob && job && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     <div className="p-3 border-b">
//                       <p className="text-sm font-medium text-gray-700">
//                         Suggestions
//                       </p>
//                     </div>
//                     {jobTitles
//                       .filter((j) =>
//                         j.toLowerCase().includes(job.toLowerCase()),
//                       )
//                       .slice(0, 8)
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setJob(item);
//                             setShowJob(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center justify-between"
//                         >
//                           <span>{item}</span>
//                           <ChevronRight size={16} className="text-gray-400" />
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* EXPERIENCE */}
//               <div className="relative w-48">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <Briefcase size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="Experience"
//                     value={exp}
//                     onChange={(e) => {
//                       setExp(e.target.value);
//                       setShowExp(true);
//                     }}
//                     onFocus={() => setShowExp(true)}
//                     onBlur={() => setTimeout(() => setShowExp(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {showExp && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     {experiences
//                       .filter(
//                         (e) =>
//                           exp === "" ||
//                           e.toLowerCase().includes(exp.toLowerCase()),
//                       )
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setExp(item);
//                             setShowExp(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0"
//                         >
//                           {item}
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* LOCATION */}
//               <div className="relative w-56">
//                 <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-400 transition-colors">
//                   <MapPin size={20} className="text-gray-400 mr-3" />
//                   <input
//                     placeholder="City, state, or zip"
//                     value={city}
//                     onChange={(e) => {
//                       setCity(e.target.value);
//                       setShowCity(true);
//                     }}
//                     onFocus={() => setShowCity(true)}
//                     onBlur={() => setTimeout(() => setShowCity(false), 150)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
//                   />
//                 </div>

//                 {showCity && city && (
//                   <div className="absolute bg-white w-full shadow-lg rounded-lg mt-1 z-50 max-h-64 overflow-auto border border-gray-200">
//                     <div className="p-3 border-b">
//                       <p className="text-sm font-medium text-gray-700">
//                         Popular Cities
//                       </p>
//                     </div>
//                     {cities
//                       .filter((c) =>
//                         c.toLowerCase().includes(city.toLowerCase()),
//                       )
//                       .slice(0, 8)
//                       .map((item) => (
//                         <button
//                           key={item}
//                           onClick={() => {
//                             setCity(item);
//                             setShowCity(false);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-b-0 flex items-center"
//                         >
//                           <MapPin size={16} className="mr-3 text-gray-400" />
//                           <span>{item}</span>
//                         </button>
//                       ))}
//                   </div>
//                 )}
//               </div>

//               {/* SEARCH BTN */}
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
//               >
//                 <Search size={20} />
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           {loading ? (
//             <div className="text-center py-20">
//               <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading jobs...</p>
//             </div>
//           ) : (
//             <div className="flex gap-8">
//               {/* ================= FILTERS SIDEBAR ================= */}
//               <div className="w-64 flex-shrink-0">
//                 <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6 sticky top-6">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-bold text-lg text-gray-800">Filters</h3>
//                     {filterCount > 0 && (
//                       <button
//                         onClick={clearAllFilters}
//                         className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                       >
//                         Clear all
//                       </button>
//                     )}
//                   </div>

//                   {/* DATE POSTED */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <Calendar size={16} />
//                       Date posted
//                     </h4>
//                     <div className="space-y-2">
//                       {[
//                         "All",
//                         "Last 24 hours",
//                         "Last 3 days",
//                         "Last 7 days",
//                         "Last 30 days",
//                       ].map((item) => (
//                         <label
//                           key={item}
//                           className="flex items-center gap-3 cursor-pointer group"
//                         >
//                           <div className="relative">
//                             <input
//                               type="radio"
//                               name="date"
//                               checked={datePosted === item}
//                               onChange={() => {
//                                 setDatePosted(item);
//                               }}
//                               className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                           </div>
//                           <span className="text-gray-600 group-hover:text-gray-800">
//                             {item}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* SALARY */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <DollarSign size={16} />
//                       Monthly Salary
//                     </h4>
//                     <div className="space-y-3">
//                       <div className="px-1">
//                         <input
//                           type="range"
//                           min="10000"
//                           max="150000"
//                           step="5000"
//                           value={salary}
//                           onChange={(e) => {
//                             setSalary(Number(e.target.value));
//                           }}
//                           className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                         />
//                       </div>
//                       <div className="flex justify-between text-sm text-gray-500">
//                         <span>₹10K</span>
//                         <span>₹{salary.toLocaleString()}</span>
//                         <span>₹1.5L</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* WORK MODE */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <Building size={16} />
//                       Work Mode
//                     </h4>
//                     <div className="space-y-2">
//                       {["Work from home", "Work from office", "Hybrid"].map(
//                         (item) => (
//                           <label
//                             key={item}
//                             className="flex items-center gap-3 cursor-pointer group"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={workModes.includes(item)}
//                               onChange={() => {
//                                 setWorkModes((prev) =>
//                                   prev.includes(item)
//                                     ? prev.filter((m) => m !== item)
//                                     : [...prev, item],
//                                 );
//                               }}
//                               className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                             <span className="text-gray-600 group-hover:text-gray-800">
//                               {item}
//                             </span>
//                           </label>
//                         ),
//                       )}
//                     </div>
//                   </div>

//                   {/* WORK TYPE */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <Clock size={16} />
//                       Work Type
//                     </h4>
//                     <div className="space-y-2">
//                       {["Full time", "Part time", "Internship", "Contract"].map(
//                         (item) => (
//                           <label
//                             key={item}
//                             className="flex items-center gap-3 cursor-pointer group"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={workTypes.includes(item)}
//                               onChange={() => {
//                                 setWorkTypes((prev) =>
//                                   prev.includes(item)
//                                     ? prev.filter((t) => t !== item)
//                                     : [...prev, item],
//                                 );
//                               }}
//                               className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                             <span className="text-gray-600 group-hover:text-gray-800">
//                               {item}
//                             </span>
//                           </label>
//                         ),
//                       )}
//                     </div>
//                   </div>

//                   {/* SORT BY */}
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                       <SortAsc size={16} />
//                       Sort By
//                     </h4>
//                     <div className="space-y-2">
//                       {[
//                         "Relevant",
//                         "Salary - High to low",
//                         "Date posted - New to Old",
//                       ].map((item) => (
//                         <label
//                           key={item}
//                           className="flex items-center gap-3 cursor-pointer group"
//                         >
//                           <div className="relative">
//                             <input
//                               type="radio"
//                               name="sort"
//                               checked={sortBy === item}
//                               onChange={() => {
//                                 setSortBy(item);
//                               }}
//                               className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                             />
//                           </div>
//                           <span className="text-gray-600 group-hover:text-gray-800">
//                             {item}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ================= JOB LIST ================= */}
//               <div className="flex-1">
//                 <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//                   <h2 className="font-bold text-xl text-gray-800 mb-2">
//                     {filteredJobs.length} Jobs Found
//                   </h2>
//                   {(job || exp || city) && (
//                     <p className="text-gray-600">
//                       {job && `"${job}"`}
//                       {exp && ` • ${exp}`}
//                       {city && ` • ${city}`}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-4">
//                   {filteredJobs.length > 0 ? (
//                     filteredJobs.map((jobItem) => (
//                       <JobCard key={jobItem._id} job={jobItem} />
//                     ))
//                   ) : (
//                     <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Briefcase size={32} className="text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-800 mb-2">
//                         No jobs found
//                       </h3>
//                       <p className="text-gray-600 mb-6">
//                         Try adjusting your search criteria or filters
//                       </p>
//                       <button
//                         onClick={clearAllFilters}
//                         className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                       >
//                         Clear All Filters
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================= MOBILE VIEW ================= */}
//       <div className="lg:hidden">
//         {/* ================= HEADER ================= */}
//         <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
//           <div className="p-4">
//             {/* ================= SEARCH BAR ================= */}
//             <div className="flex gap-2 mb-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     placeholder="Job title, skills"
//                     value={job}
//                     onChange={(e) => setJob(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     placeholder="City, state"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg outline-none"
//                   />
//                 </div>
//               </div>
//               <button
//                 onClick={handleSearch}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex justify-center items-center transition-colors"
//               >
//                 <Search size={20} />
//               </button>
//             </div>

//             {/* ================= SEARCH TITLE ================= */}
//             <div className="mb-2">
//               <h2 className="font-bold text-lg">
//                 {job || city
//                   ? `${job}${job && city ? ", " : ""}${city}`
//                   : "All Jobs"}
//                 <span className="text-gray-600 text-sm ml-2">
//                   ({filteredJobs.length} jobs)
//                 </span>
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* ================= FILTERS BAR ================= */}
//         <div className="bg-white border-b px-4 py-3 sticky top-[140px] z-20 shadow-sm">
//           <div className="flex justify-between items-center mb-3">
//             <div className="flex items-center gap-2">
//               <Filter size={18} />
//               <span className="font-bold">Filters</span>
//               {filterCount > 0 && (
//                 <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
//                   {filterCount} Applied
//                 </span>
//               )}
//             </div>

//             {filterCount > 0 && (
//               <button
//                 onClick={clearAllFilters}
//                 className="text-red-600 text-sm font-medium flex items-center gap-1"
//               >
//                 <X size={16} />
//                 Clear
//               </button>
//             )}
//           </div>

//           {/* ================= FILTER CHIPS ROW ================= */}
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {filterChips.map((chip) => {
//               const isActive = isFilterActive(chip.key);
//               const displayValue = getFilterDisplayValue(chip.key);

//               return (
//                 <button
//                   key={chip.key}
//                   onClick={() =>
//                     setActiveFilter(activeFilter === chip.key ? null : chip.key)
//                   }
//                   className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap flex-shrink-0 ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600 border-blue-200"
//                       : "bg-white text-gray-700 border-gray-200"
//                   }`}
//                 >
//                   {chip.icon}
//                   <span className="text-sm font-medium">{displayValue}</span>
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       activeFilter === chip.key ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= SORT BY ================= */}
//         <div className="bg-white border-b px-4 py-3">
//           <div className="flex items-center gap-2">
//             <SortAsc size={18} className="text-gray-600" />
//             <span className="font-medium text-gray-700">Sort By:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => {
//                 setSortBy(e.target.value);
//               }}
//               className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none font-medium"
//             >
//               {filterOptions.sortBy.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* ================= FILTER DROPDOWN ================= */}
//         {renderMobileFilterContent()}

//         {/* ================= JOB LIST ================= */}
//         <div className="p-4">
//           {loading ? (
//             <div className="text-center py-10">
//               <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading jobs...</p>
//             </div>
//           ) : (
//             <>
//               <h3 className="font-bold text-lg mb-4 text-gray-800">
//                 {filteredJobs.length} Jobs Found
//               </h3>

//               {filteredJobs.length > 0 ? (
//                 <div className="space-y-3">
//                   {filteredJobs.map((jobItem) => (
//                     <MobileJobCard key={jobItem._id} job={jobItem} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="bg-white rounded-xl p-6 text-center mt-8">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Briefcase size={32} className="text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-2">
//                     No jobs found
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     Try changing your search criteria
//                   </p>
//                   <button
//                     onClick={clearAllFilters}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium w-full"
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ================= DESKTOP JOB CARD ================= */
// function JobCard({ job }) {
//   // Safely extract values with fallbacks
//   const jobTitle = job?.title || "Job Title";
//   const company = job?.company || "Company Name";
//   const location = job?.location || "Location Not Specified";

//   // Salary handling - MongoDB format
//   const salaryMin = job?.salary?.min || 0;
//   const salaryMax = job?.salary?.max || 0;

//   // Experience handling - MongoDB format
//   const expMin = job?.experience?.min || 0;
//   const expMax = job?.experience?.max || 0;

//   const jobType = job?.jobType || "Full Time";
//   const workMode = job?.workMode || "Office";
//   const category = job?.category || "General";
//   const description = job?.description || "";

//   // 🔴 FIXED: Skills access properly
//   const skills = job?.skillsRequired || job?.skills || [];

//   // Benefits - array हो सकता है या string
//   const benefits = Array.isArray(job?.benefits)
//     ? job.benefits
//     : job?.benefits
//       ? [job.benefits]
//       : [];

//   // Calculate days ago
//   const daysAgo = Math.floor(
//     (new Date() - new Date(job?.createdAt || new Date())) /
//       (1000 * 60 * 60 * 24),
//   );

//   return (
//     <Link href={`/jobs/${job._id}`}>
//       <div className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-400 cursor-pointer hover:shadow-md transition-all duration-200 group">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex-1">
//             <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 mb-1">
//               {jobTitle}
//             </h3>
//             <p className="text-gray-600 font-medium mb-2">{company}</p>
//             <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
//               <span className="flex items-center gap-1">
//                 <MapPin size={14} />
//                 {location}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Briefcase size={14} />
//                 {expMin} - {expMax} years
//               </span>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="font-bold text-lg text-green-600">
//               ₹{salaryMin} - ₹{salaryMax} LPA
//             </p>
//             <p className="text-gray-500 text-sm">per month</p>
//           </div>
//         </div>

//         {/* DESCRIPTION */}
//         {description && (
//           <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
//         )}

//         {/* TAGS */}
//         <div className="flex gap-2 flex-wrap mb-4">
//           <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//             {jobType}
//           </span>
//           <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
//             {workMode}
//           </span>
//           {category && (
//             <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
//               {category}
//             </span>
//           )}
//         </div>

//         {/* SKILLS - FIXED: Always show if skills exist */}
//         {skills.length > 0 ? (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
//             <div className="flex gap-2 flex-wrap">
//               {skills.slice(0, 4).map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {skills.length > 4 && (
//                 <span className="text-gray-500 text-sm">
//                   +{skills.length - 4} more
//                 </span>
//               )}
//             </div>
//           </div>
//         ) : null}

//         {/* BENEFITS - अगर array में है तो show करें */}
//         {benefits.length > 0 && (
//           <div className="mb-4">
//             <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
//             <div className="flex gap-2 flex-wrap">
//               {benefits.slice(0, 3).map((benefit, i) => (
//                 <span
//                   key={i}
//                   className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {benefit}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* FOOTER */}
//         <div className="flex justify-between items-center pt-4 border-t">
//           <div className="flex items-center gap-4 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <Calendar size={14} />
//               {daysAgo === 0
//                 ? "Today"
//                 : daysAgo === 1
//                   ? "Yesterday"
//                   : `${daysAgo} days ago`}
//             </span>
//             {job?.isUrgent && (
//               <span className="text-red-600 font-medium">🔥 Urgent</span>
//             )}
//             {job?.isFeatured && (
//               <span className="text-yellow-600 font-medium">⭐ Featured</span>
//             )}
//           </div>
//           <button className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
//             View Details
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// /* ================= MOBILE JOB CARD ================= */
// function MobileJobCard({ job }) {
//   // Safely extract values - MongoDB format
//   const title = job?.title || "Job Title";
//   const company = job?.company || "Company";
//   const location = job?.location || "Location";

//   // Salary - MongoDB format
//   const salaryMin = job?.salary?.min || 0;
//   const salaryMax = job?.salary?.max || 0;

//   const jobType = job?.jobType || "Full Time";

//   // Experience - MongoDB format
//   const expMin = job?.experience?.min || 0;
//   const expMax = job?.experience?.max || 0;

//   // 🔴 FIXED: Skills access properly
//   const skills = job?.skillsRequired || job?.skills || [];

//   const daysAgo = Math.floor(
//     (new Date() - new Date(job?.createdAt || new Date())) /
//       (1000 * 60 * 60 * 24),
//   );

//   return (
//     <Link href={`/jobs/${job._id}`}>
//       <div className="bg-white rounded-xl border p-4 hover:border-blue-400 transition-colors active:bg-gray-50">
//         <div className="flex justify-between items-start mb-3">
//           <div className="flex-1">
//             <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
//             <p className="text-gray-600 font-medium text-sm">{company}</p>
//           </div>
//           <div className="text-right">
//             <p className="font-bold text-green-600">
//               ₹{salaryMin} - ₹{salaryMax} LPA
//             </p>
//             <p className="text-gray-500 text-xs">annual</p>
//           </div>
//         </div>

//         {/* LOCATION */}
//         <div className="flex items-center text-gray-600 text-sm mb-3">
//           <MapPin size={14} className="mr-2" />
//           {location}
//         </div>

//         {/* TAGS */}
//         <div className="flex flex-wrap gap-2 mb-3">
//           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
//             {jobType}
//           </span>
//           <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
//             {expMin} - {expMax} yrs
//           </span>
//           {job?.workMode && (
//             <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
//               {job.workMode}
//             </span>
//           )}
//           {job?.category && (
//             <span className="px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-full">
//               {job.category}
//             </span>
//           )}
//         </div>

//         {/* SKILLS - FIXED: Always show if skills exist */}
//         {skills.length > 0 && (
//           <div className="mb-3">
//             <div className="flex flex-wrap gap-1">
//               {skills.slice(0, 3).map((skill, i) => (
//                 <span
//                   key={i}
//                   className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
//                 >
//                   {skill}
//                 </span>
//               ))}
//               {skills.length > 3 && (
//                 <span className="text-xs text-gray-500">
//                   +{skills.length - 3} more
//                 </span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* FOOTER */}

//         <div className="flex justify-between items-center text-xs text-gray-500">
//           <div className="flex items-center">
//             <Calendar size={12} className="mr-1" />
//             {daysAgo === 0
//               ? "Today"
//               : daysAgo === 1
//                 ? "Yesterday"
//                 : `${daysAgo} days ago`}
//           </div>
//           <span className="text-blue-600 font-medium">View →</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

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
  const API = "http://localhost:5000/api";

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
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
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
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex justify-center items-center transition-colors"
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
                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
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
      <div className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-400 cursor-pointer hover:shadow-md transition-all duration-200 group">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 mb-1">
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
            <p className="font-bold text-lg text-green-600">
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
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium uppercase">
            {jobType}
          </span>
          <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-medium uppercase">
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
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
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
          <button className="text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
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
