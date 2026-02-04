// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
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
// } from "lucide-react";

// /* DUMMY JOBS */
// const jobsData = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     company: "Satsai Pvt Ltd",
//     location: "New Delhi",
//     salary: 28000,
//     type: "Full time",
//     mode: "Work from office",
//     exp: "2 Years",
//     postedDate: "2024-01-10",
//     distance: 8,
//     shift: "Day shift",
//     education: "Bachelor's Degree",
//     department: "Engineering",
//     englishLevel: "Intermediate",
//   },
//   {
//     id: 2,
//     title: "Web Developer",
//     company: "Dragons Consultancy",
//     location: "Noida",
//     salary: 20000,
//     type: "Full time",
//     mode: "Work from office",
//     exp: "3 Years",
//     postedDate: "2024-01-14",
//     distance: 15,
//     shift: "Day shift",
//     education: "Diploma",
//     department: "IT",
//     englishLevel: "Basic",
//   },
//   {
//     id: 3,
//     title: "MERN Stack Developer",
//     company: "Vastora Tech",
//     location: "Noida",
//     salary: 25000,
//     type: "Full time",
//     mode: "Work from office",
//     exp: "Any Experience",
//     postedDate: "2024-01-15",
//     distance: 3,
//     shift: "Night shift",
//     education: "Bachelor's Degree",
//     department: "Engineering",
//     englishLevel: "Fluent",
//   },
//   {
//     id: 4,
//     title: "React Developer",
//     company: "TechSoft",
//     location: "Gurgaon",
//     salary: 35000,
//     type: "Full time",
//     mode: "Work from home",
//     exp: "1 Years",
//     postedDate: "2024-01-12",
//     distance: 25,
//     shift: "Day shift",
//     education: "Master's Degree",
//     department: "Software Development",
//     englishLevel: "Advanced",
//   },
//   {
//     id: 5,
//     title: "Backend Developer",
//     company: "Infosys",
//     location: "Bangalore",
//     salary: 45000,
//     type: "Full time",
//     mode: "Work from office",
//     exp: "4 Years",
//     postedDate: "2024-01-09",
//     distance: 45,
//     shift: "Night shift",
//     education: "Bachelor's Degree",
//     department: "Engineering",
//     englishLevel: "Fluent",
//   },
// ];

// // 🔥 AUTO CREATE MORE (30+)
// for (let i = 6; i <= 35; i++) {
//   const daysAgo = i % 10;
//   const postedDate = new Date();
//   postedDate.setDate(postedDate.getDate() - daysAgo);

//   const educations = [
//     "High School",
//     "Diploma",
//     "Bachelor's Degree",
//     "Master's Degree",
//   ];
//   const departments = [
//     "Engineering",
//     "IT",
//     "Sales",
//     "Marketing",
//     "HR",
//     "Finance",
//   ];
//   const englishLevels = ["Basic", "Intermediate", "Fluent", "Advanced"];

//   jobsData.push({
//     id: i,
//     title: [
//       "Frontend Developer",
//       "React Developer",
//       "Web Developer",
//       "Node Developer",
//       "Franchise Sales Manager",
//       "Business Development Manager",
//     ][i % 6],
//     company: "Company " + i,
//     location: ["Delhi", "Noida", "Gurgaon", "Pune", "Mumbai", "Bangalore"][
//       i % 6
//     ],
//     salary: 15000 + i * 1000,
//     type: ["Full time", "Part time", "Internship"][i % 3],
//     mode: ["Work from office", "Work from home", "Hybrid"][i % 3],
//     exp: `${i % 6} Years`,
//     postedDate: postedDate.toISOString().split("T")[0],
//     distance: (i % 50) + 1,
//     shift: ["Day shift", "Night shift", "Flexible"][i % 3],
//     education: educations[i % 4],
//     department: departments[i % 6],
//     englishLevel: englishLevels[i % 4],
//   });
// }

// export default function JobsPage() {
//   const searchParams = useSearchParams();

//   // URL से parameters पढ़ें
//   const jobFromURL = searchParams.get("job") || "";
//   const expFromURL = searchParams.get("exp") || "";
//   const cityFromURL = searchParams.get("city") || "";

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
//   const [filteredJobs, setFilteredJobs] = useState(jobsData);

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
//     i === 15 ? "15+ Years" : `${i} Years`,
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

//   // Filter function
//   const applyFilters = () => {
//     const filtered = jobsData.filter((jobItem) => {
//       // Job title filter
//       const titleMatch = jobItem.title
//         .toLowerCase()
//         .includes(job.toLowerCase());

//       // Location filter
//       const locationMatch = jobItem.location
//         .toLowerCase()
//         .includes(city.toLowerCase());

//       // Experience filter
//       const expMatch =
//         exp === "All" ||
//         exp === "" ||
//         jobItem.exp.toLowerCase().includes(exp.toLowerCase());

//       // Salary filter
//       const salaryMatch = jobItem.salary <= salary;

//       // Work mode filter
//       const modeMatch =
//         workModes.length === 0 || workModes.includes(jobItem.mode);

//       // Work type filter
//       const typeMatch =
//         workTypes.length === 0 || workTypes.includes(jobItem.type);

//       // Date Posted filter
//       let dateMatch = true;
//       if (datePosted !== "All") {
//         const today = new Date();
//         const jobDate = new Date(jobItem.postedDate);
//         const diffDays = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

//         if (datePosted === "Last 24 hours" && diffDays > 1) dateMatch = false;
//         else if (datePosted === "Last 3 days" && diffDays > 3)
//           dateMatch = false;
//         else if (datePosted === "Last 7 days" && diffDays > 7)
//           dateMatch = false;
//         else if (datePosted === "Last 15 days" && diffDays > 15)
//           dateMatch = false;
//         else if (datePosted === "Last 30 days" && diffDays > 30)
//           dateMatch = false;
//       }

//       // Distance filter
//       let distanceMatch = true;
//       if (distance !== "All") {
//         const maxDistance = parseInt(
//           distance.replace("Within ", "").replace(" km", ""),
//         );
//         if (jobItem.distance > maxDistance) distanceMatch = false;
//       }

//       // Education filter
//       const educationMatch =
//         education === "All" || jobItem.education === education;

//       // Department filter
//       const departmentMatch =
//         department === "All" || jobItem.department === department;

//       // English level filter
//       const englishMatch =
//         englishLevel === "All" || jobItem.englishLevel === englishLevel;

//       // Work Shift filter
//       const shiftMatch =
//         workShifts.length === 0 || workShifts.includes(jobItem.shift);

//       return (
//         titleMatch &&
//         locationMatch &&
//         expMatch &&
//         salaryMatch &&
//         modeMatch &&
//         typeMatch &&
//         dateMatch &&
//         distanceMatch &&
//         educationMatch &&
//         departmentMatch &&
//         englishMatch &&
//         shiftMatch
//       );
//     });

//     // Apply sorting
//     const sorted = [...filtered].sort((a, b) => {
//       if (sortBy === "Salary - High to low") {
//         return b.salary - a.salary;
//       } else if (sortBy === "Date posted - New to Old") {
//         return new Date(b.postedDate) - new Date(a.postedDate);
//       } else if (sortBy === "Distance - Near to Far") {
//         return a.distance - b.distance;
//       }
//       return a.id - b.id;
//     });

//     setFilteredJobs(sorted);
//   };

//   // Apply filters whenever filters change
//   useEffect(() => {
//     applyFilters();
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
//   ]);

//   // When URL params change, update state
//   useEffect(() => {
//     setJob(jobFromURL);
//     setExp(expFromURL);
//     setCity(cityFromURL);
//   }, [jobFromURL, expFromURL, cityFromURL]);

//   // Clear all filters
//   const clearAllFilters = () => {
//     setExp("");
//     setDatePosted("All");
//     setSalary(150000);
//     setEducation("All");
//     setWorkModes([]);
//     setWorkTypes([]);
//     setDepartment("All");
//     setEnglishLevel("All");
//     setDistance("All");
//     setWorkShifts([]);
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
//   };

//   // Render mobile filter dropdown content
//   const renderMobileFilterContent = () => {
//     if (!activeFilter) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
//         <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
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
//           <div className="p-4 overflow-y-auto max-h-[60vh]">
//             {activeFilter === "experience" && (
//               <div className="space-y-2">
//                 {filterOptions.experience.map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => {
//                       setExp(option === "All" ? "" : option);
//                       setTimeout(closeActiveFilter, 200);
//                     }}
//                     className={`w-full text-left px-4 py-3 rounded-lg ${exp === (option === "All" ? "" : option) ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
//                   >
//                     {option}
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
//                     className={`w-full text-left px-4 py-3 rounded-lg ${datePosted === option ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {activeFilter === "salary" && (
//               <div className="space-y-4">
//                 <div className="flex justify-between text-sm">
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
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="text-center font-medium">
//                   Selected: ₹{salary.toLocaleString()}
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
//                       className={`px-4 py-2 rounded-lg border ${salary === 150000 && range === "All" ? "bg-blue-50 text-blue-600 border-blue-200" : "border-gray-200 hover:bg-gray-50"}`}
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
//                     className={`w-full text-left px-4 py-3 rounded-lg ${
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
//                     {option}
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
//                       className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
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
//     <section className="bg-gray-100 text-black min-h-screen">
//       {/* ================= DESKTOP VIEW (ORIGINAL) ================= */}
//       <div className="hidden lg:block">
//         {/* ================= SEARCH BAR ================= */}
//         <div className="bg-white border-b py-4">
//           <div className="max-w-7xl mx-auto px-4 flex gap-3 relative">
//             {/* JOB TITLE */}
//             <div className="relative flex-1">
//               <input
//                 placeholder="Job Title"
//                 value={job}
//                 onChange={(e) => {
//                   setJob(e.target.value);
//                   setShowJob(true);
//                 }}
//                 onFocus={() => setShowJob(true)}
//                 onBlur={() => setTimeout(() => setShowJob(false), 150)}
//                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
//               />

//               {/* SUGGESTION */}
//               {showJob && job && (
//                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
//                   {jobTitles
//                     .filter((j) => j.toLowerCase().includes(job.toLowerCase()))
//                     .slice(0, 10)
//                     .map((item) => (
//                       <p
//                         key={item}
//                         onClick={() => {
//                           setJob(item);
//                           setShowJob(false);
//                         }}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                       >
//                         {item}
//                       </p>
//                     ))}
//                 </div>
//               )}
//             </div>

//             {/* EXPERIENCE */}
//             <div className="relative w-48">
//               <input
//                 placeholder="Experience"
//                 value={exp}
//                 onChange={(e) => {
//                   setExp(e.target.value);
//                   setShowExp(true);
//                 }}
//                 onFocus={() => setShowExp(true)}
//                 onBlur={() => setTimeout(() => setShowExp(false), 150)}
//                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
//               />

//               {showExp && (
//                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
//                   {experiences
//                     .filter(
//                       (e) =>
//                         exp === "" ||
//                         e.toLowerCase().includes(exp.toLowerCase()),
//                     )
//                     .map((item) => (
//                       <p
//                         key={item}
//                         onClick={() => {
//                           setExp(item);
//                           setShowExp(false);
//                         }}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                       >
//                         {item}
//                       </p>
//                     ))}
//                 </div>
//               )}
//             </div>

//             {/* LOCATION */}
//             <div className="relative w-56">
//               <input
//                 placeholder="Location"
//                 value={city}
//                 onChange={(e) => {
//                   setCity(e.target.value);
//                   setShowCity(true);
//                 }}
//                 onFocus={() => setShowCity(true)}
//                 onBlur={() => setTimeout(() => setShowCity(false), 150)}
//                 className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
//               />

//               {showCity && city && (
//                 <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
//                   {cities
//                     .filter((c) => c.toLowerCase().includes(city.toLowerCase()))
//                     .slice(0, 12)
//                     .map((item) => (
//                       <p
//                         key={item}
//                         onClick={() => {
//                           setCity(item);
//                           setShowCity(false);
//                         }}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                       >
//                         {item}
//                       </p>
//                     ))}
//                 </div>
//               )}
//             </div>

//             {/* SEARCH BTN */}
//             <button
//               onClick={applyFilters}
//               className="bg-orange-500 text-white px-6 rounded-lg hover:bg-orange-600 transition"
//             >
//               Search Jobs
//             </button>
//           </div>
//         </div>

//         {/* ================= MAIN ================= */}
//         <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* ================= FILTERS SIDEBAR ================= */}
//           <div className="bg-white p-4 rounded-xl shadow space-y-5 text-sm">
//             <h3 className="font-semibold text-base">Filters</h3>

//             {/* DATE POSTED */}
//             <div>
//               <p className="font-medium mb-2">Date posted</p>

//               <div className="space-y-1">
//                 {["All", "Last 24 hours", "Last 3 days", "Last 7 days"].map(
//                   (item) => (
//                     <label
//                       key={item}
//                       className="flex items-center gap-2 cursor-pointer"
//                     >
//                       <input
//                         type="radio"
//                         name="date"
//                         checked={datePosted === item}
//                         onChange={() => {
//                           setDatePosted(item);
//                         }}
//                       />
//                       {item}
//                     </label>
//                   ),
//                 )}
//               </div>
//             </div>

//             {/* DISTANCE */}
//             <div>
//               <p className="font-medium mb-2">Distance</p>

//               <div className="space-y-1">
//                 {[
//                   "All",
//                   "Within 5 km",
//                   "Within 10 km",
//                   "Within 20 km",
//                   "Within 50 km",
//                 ].map((item) => (
//                   <label
//                     key={item}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="distance"
//                       checked={distance === item}
//                       onChange={() => {
//                         setDistance(item);
//                       }}
//                     />
//                     {item}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* SALARY */}
//             <div>
//               <p className="font-medium mb-2">Salary</p>

//               <p className="text-xs text-gray-500 mb-1">
//                 Minimum monthly salary
//               </p>

//               <div className="flex justify-between text-xs mb-1">
//                 <span>₹0</span>
//                 <span>₹1.5 Lakhs</span>
//               </div>

//               <input
//                 type="range"
//                 min="0"
//                 max="150000"
//                 step="5000"
//                 value={salary}
//                 onChange={(e) => {
//                   setSalary(Number(e.target.value));
//                 }}
//                 className="w-full"
//               />
//             </div>

//             {/* WORK MODE */}
//             <div>
//               <p className="font-medium mb-2">Work Mode</p>

//               <div className="space-y-1">
//                 {["Work from home", "Work from office", "Work from field"].map(
//                   (item) => (
//                     <label key={item} className="flex gap-2">
//                       <input
//                         type="checkbox"
//                         checked={workModes.includes(item)}
//                         onChange={() => {
//                           setWorkModes((prev) =>
//                             prev.includes(item)
//                               ? prev.filter((m) => m !== item)
//                               : [...prev, item],
//                           );
//                         }}
//                       />
//                       {item}
//                     </label>
//                   ),
//                 )}
//               </div>
//             </div>

//             {/* WORK TYPE */}
//             <div>
//               <p className="font-medium mb-2">Work Type</p>

//               <div className="space-y-1">
//                 {["Full time", "Part time", "Internship"].map((item) => (
//                   <label
//                     key={item}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={workTypes.includes(item)}
//                       onChange={() => {
//                         setWorkTypes((prev) =>
//                           prev.includes(item)
//                             ? prev.filter((t) => t !== item)
//                             : [...prev, item],
//                         );
//                       }}
//                     />
//                     {item}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* WORK SHIFT */}
//             <div>
//               <p className="font-medium mb-2">Work Shift</p>

//               <div className="space-y-1">
//                 {["Day shift", "Night shift"].map((item) => (
//                   <label
//                     key={item}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={workShifts.includes(item)}
//                       onChange={() => {
//                         setWorkShifts((prev) =>
//                           prev.includes(item)
//                             ? prev.filter((s) => s !== item)
//                             : [...prev, item],
//                         );
//                       }}
//                     />
//                     {item}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* SORT BY */}
//             <div>
//               <p className="font-medium mb-2">Sort By</p>

//               <div className="space-y-1">
//                 {[
//                   "Relevant",
//                   "Salary - High to low",
//                   "Date posted - New to Old",
//                 ].map((item) => (
//                   <label
//                     key={item}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="radio"
//                       name="sort"
//                       checked={sortBy === item}
//                       onChange={() => {
//                         setSortBy(item);
//                       }}
//                     />
//                     {item}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ================= JOB LIST ================= */}
//           <div className="lg:col-span-2 space-y-4">
//             <h3 className="font-semibold text-base mb-2">
//               Showing {filteredJobs.length} jobs
//               {(job || exp || city) && (
//                 <span className="text-sm font-normal text-gray-600 ml-2">
//                   {job && `for "${job}"`}
//                   {exp && ` with ${exp} experience`}
//                   {city && ` in ${city}`}
//                 </span>
//               )}
//             </h3>

//             {filteredJobs.length > 0 ? (
//               filteredJobs.map((jobItem) => (
//                 <JobCard key={jobItem.id} job={jobItem} />
//               ))
//             ) : (
//               <div className="bg-white p-8 rounded-xl shadow text-center">
//                 <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
//                 <p className="text-gray-600">
//                   Try changing your search criteria
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* ================= RIGHT SIDE ================= */}
//           <div className="lg:col-span-1">
//             {/* You can add right sidebar content here if needed */}
//           </div>
//         </div>
//       </div>

//       {/* ================= MOBILE VIEW (APNA.CO STYLE) ================= */}
//       <div className="lg:hidden">
//         {/* ================= HEADER ================= */}
//         <div className="bg-white border-b sticky top-0 z-30">
//           <div className="px-4 py-3">
//             {/* ================= SEARCH BAR ================= */}
//             <div className="flex flex-col sm:flex-row gap-2 mb-3">
//               <input
//                 placeholder="Job Title"
//                 value={job}
//                 onChange={(e) => setJob(e.target.value)}
//                 className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
//               />

//               <input
//                 placeholder="Location"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
//               />

//               <button
//                 onClick={applyFilters}
//                 className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-lg flex justify-center items-center"
//               >
//                 <Search size={20} />
//               </button>
//             </div>

//             {/* ================= SEARCH TITLE ================= */}
//             <div className="mb-2">
//               <h2 className="font-semibold text-sm sm:text-base">
//                 {job || city
//                   ? `${job}${job && city ? ", " : ""}${city}`
//                   : "All Jobs"}
//                 <span className="text-gray-600 text-xs sm:text-sm ml-2">
//                   ({filteredJobs.length} jobs found)
//                 </span>
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* ================= FILTERS BAR ================= */}
//         <div className="bg-white border-b px-4 py-3 sticky top-[138px] z-20">
//           <div className="flex justify-between items-center mb-3">
//             <div className="flex items-center gap-2">
//               <Filter size={18} />
//               <span className="font-medium">Filters</span>
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
//                 Clear Filters
//               </button>
//             )}
//           </div>

//           {/* ================= FILTER CHIPS ROW ================= */}
//           <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
//             {filterChips.map((chip) => {
//               const isActive = isFilterActive(chip.key);
//               const displayValue = getFilterDisplayValue(chip.key);

//               return (
//                 <button
//                   key={chip.key}
//                   onClick={() =>
//                     setActiveFilter(activeFilter === chip.key ? null : chip.key)
//                   }
//                   className={`flex items-center gap-2 px-3 py-2 rounded-full border whitespace-nowrap ${isActive ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-white text-gray-700 border-gray-200"}`}
//                 >
//                   {chip.icon}
//                   <span className="text-sm">{displayValue}</span>
//                   {isActive && (
//                     <span className="bg-blue-100 text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                       ✓
//                     </span>
//                   )}
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${activeFilter === chip.key ? "rotate-180" : ""}`}
//                   />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ================= SORT BY ================= */}
//         <div className="bg-white border-b px-4 py-3">
//           <div className="flex items-center gap-2">
//             <SortAsc size={16} />
//             <span className="font-medium">Sort By:</span>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none"
//             >
//               <option value="Relevant">Relevant</option>
//               <option value="Salary - High to low">Salary - High to low</option>
//               <option value="Date posted - New to Old">
//                 Date posted - New to Old
//               </option>
//               <option value="Distance - Near to Far">
//                 Distance - Near to Far
//               </option>
//             </select>
//           </div>
//         </div>

//         {/* ================= FILTER DROPDOWN ================= */}
//         {renderMobileFilterContent()}

//         {/* ================= JOB LIST ================= */}
//         <div className="px-4 py-3">
//           <h3 className="font-semibold text-lg mb-4">
//             {filteredJobs.length} Jobs: Explore based on your Filter
//           </h3>

//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((jobItem) => (
//               <MobileJobCard key={jobItem.id} job={jobItem} />
//             ))
//           ) : (
//             <div className="bg-white rounded-xl p-6 text-center">
//               <div className="text-gray-400 mb-3">
//                 <Briefcase size={40} className="mx-auto" />
//               </div>
//               <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
//               <p className="text-gray-600 mb-4">
//                 Try changing your search criteria
//               </p>
//               <button
//                 onClick={clearAllFilters}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </section>
//   );
// }

// /* ================= DESKTOP JOB CARD ================= */
// function JobCard({ job }) {
//   return (
//     <Link href={`/jobs/${job.id}`}>
//       <div className="bg-white p-4 rounded-xl shadow hover:border-green-500 border cursor-pointer hover:shadow-lg transition">
//         <div className="flex justify-between">
//           <div>
//             <h3 className="font-semibold text-base">{job.title}</h3>
//             <p className="text-sm text-gray-500">{job.company}</p>
//             <p className="text-sm text-gray-500 mt-1">📍 {job.location}</p>
//           </div>
//           <p className="text-sm font-medium">₹{job.salary.toLocaleString()}</p>
//         </div>
//         <div className="flex gap-2 mt-3 flex-wrap text-xs">
//           <span className="bg-gray-100 px-3 py-1 rounded-full">{job.mode}</span>
//           <span className="bg-gray-100 px-3 py-1 rounded-full">{job.type}</span>
//           <span className="bg-gray-100 px-3 py-1 rounded-full">{job.exp}</span>
//           <span className="bg-gray-100 px-3 py-1 rounded-full">
//             {job.shift}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// /* ================= MOBILE JOB CARD ================= */
// function MobileJobCard({ job }) {
//   const [isUrgent] = useState(Math.random() > 0.7);

//   // Calculate days ago
//   const daysAgo = Math.floor(
//     (new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24),
//   );

//   return (
//     <Link href={`/jobs/${job.id}`}>
//       <div className="bg-white rounded-xl border p-4 mb-3 hover:border-blue-300 transition-colors">
//         {/* Job Title and Salary */}
//         <div className="flex justify-between items-start mb-2">
//           <div className="flex-1">
//             <h3 className="font-semibold text-base mb-1">{job.title}</h3>
//             <p className="text-gray-700 font-medium text-sm">{job.company}</p>
//           </div>
//           <div className="text-right">
//             <p className="font-bold">₹{job.salary.toLocaleString()}</p>
//             <p className="text-gray-500 text-xs">monthly</p>
//           </div>
//         </div>

//         {/* Location */}
//         <div className="flex items-center text-gray-600 text-sm mb-3">
//           <MapPin size={14} className="mr-1" />
//           {job.location}
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-3">
//           <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
//             {job.mode}
//           </span>
//           <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
//             {job.type}
//           </span>
//           <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
//             Min. {job.exp}
//           </span>
//           <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
//             {job.englishLevel}
//           </span>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center text-xs text-gray-600">
//           <div className="flex items-center">
//             <Calendar size={12} className="mr-1" />
//             {daysAgo === 0
//               ? "Today"
//               : daysAgo === 1
//                 ? "Yesterday"
//                 : `${daysAgo} days ago`}
//           </div>

//           {isUrgent && (
//             <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
//               Urgently hiring
//             </span>
//           )}
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
} from "lucide-react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const API = "http://localhost:5000/api"; // 👈 YAHAN
  // URL से parameters पढ़ें
  const jobFromURL = searchParams.get("job") || "";
  const expFromURL = searchParams.get("exp") || "";
  const cityFromURL = searchParams.get("city") || "";

  const [job, setJob] = useState(jobFromURL);
  const [exp, setExp] = useState(expFromURL);
  const [city, setCity] = useState(cityFromURL);
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/jobs`);

      console.log("Jobs:", res.data.data); // ✅ Debug

      setJobsData(res.data.data);
      setFilteredJobs(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  // All filters state
  const [salary, setSalary] = useState(150000);
  const [workModes, setWorkModes] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [workShifts, setWorkShifts] = useState([]);
  const [datePosted, setDatePosted] = useState("All");
  const [distance, setDistance] = useState("All");
  const [education, setEducation] = useState("All");
  const [department, setDepartment] = useState("All");
  const [englishLevel, setEnglishLevel] = useState("All");
  const [sortBy, setSortBy] = useState("Relevant");

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
    education: [
      "All",
      "High School",
      "Diploma",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD",
    ],
    workMode: ["Work from home", "Work from office", "Hybrid"],
    workType: ["Full time", "Part time", "Internship", "Contract"],
    department: [
      "All",
      "Engineering",
      "IT",
      "Sales",
      "Marketing",
      "HR",
      "Finance",
      "Operations",
      "Customer Service",
      "Management",
    ],
    englishLevel: ["All", "Basic", "Intermediate", "Fluent", "Advanced"],
    distance: [
      "All",
      "Within 5 km",
      "Within 10 km",
      "Within 20 km",
      "Within 50 km",
    ],
    workShift: ["Day shift", "Night shift", "Flexible", "Rotational"],
    sortBy: [
      "Relevant",
      "Salary - High to low",
      "Date posted - New to Old",
      "Distance - Near to Far",
    ],
  };

  // Filter chips data (MOBILE)
  const filterChips = [
    { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
    { key: "datePosted", label: "Date posted", icon: <Calendar size={16} /> },
    { key: "salary", label: "Salary", icon: <DollarSign size={16} /> },
    { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
    { key: "workMode", label: "Work mode", icon: <Building size={16} /> },
    { key: "workType", label: "Work type", icon: <Clock size={16} /> },
    { key: "department", label: "Department", icon: <Briefcase size={16} /> },
    { key: "englishLevel", label: "English level", icon: <Globe size={16} /> },
    { key: "distance", label: "Distance", icon: <MapPin size={16} /> },
    { key: "workShift", label: "Work shift", icon: <Clock size={16} /> },
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
    i === 15 ? "15+ Years" : `${i} Years`,
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

  // Calculate active filter count (MOBILE)
  useEffect(() => {
    let count = 0;
    if (exp !== "" && exp !== "All") count++;
    if (datePosted !== "All") count++;
    if (salary < 150000) count++;
    if (education !== "All") count++;
    if (workModes.length > 0) count++;
    if (workTypes.length > 0) count++;
    if (department !== "All") count++;
    if (englishLevel !== "All") count++;
    if (distance !== "All") count++;
    if (workShifts.length > 0) count++;
    setFilterCount(count);
  }, [
    exp,
    datePosted,
    salary,
    education,
    workModes,
    workTypes,
    department,
    englishLevel,
    distance,
    workShifts,
  ]);

  // ================= SEARCH FUNCTION =================
  const handleSearch = () => {
    // URL parameters update करें
    const params = new URLSearchParams();
    if (job) params.set("job", job);
    if (exp) params.set("exp", exp);
    if (city) params.set("city", city);

    // URL update करें
    router.push(`/jobs?${params.toString()}`, { scroll: false });

    // Filters apply करें
    applyFilters();
  };

  // Filter function
  // const applyFilters = () => {
  //   const filtered = jobsData.filter((jobItem) => {
  //     // Job title filter
  //     const titleMatch = jobItem.title
  //       .toLowerCase()
  //       .includes(job.toLowerCase());

  //     // Location filter
  //     const locationMatch = jobItem.location
  //       .toLowerCase()
  //       .includes(city.toLowerCase());

  //     // Experience filter
  //     const expMatch =
  //       exp === "All" ||
  //       exp === "" ||
  //       jobItem.exp.toLowerCase().includes(exp.toLowerCase());

  //     // Salary filter
  //     const salaryMatch = jobItem.salary <= salary;

  //     // Work mode filter
  //     const modeMatch =
  //       workModes.length === 0 || workModes.includes(jobItem.mode);

  //     // Work type filter
  //     const typeMatch =
  //       workTypes.length === 0 || workTypes.includes(jobItem.type);

  //     // Date Posted filter
  //     let dateMatch = true;
  //     if (datePosted !== "All") {
  //       const today = new Date();
  //       const jobDate = new Date(jobItem.postedDate);
  //       const diffDays = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

  //       if (datePosted === "Last 24 hours" && diffDays > 1) dateMatch = false;
  //       else if (datePosted === "Last 3 days" && diffDays > 3)
  //         dateMatch = false;
  //       else if (datePosted === "Last 7 days" && diffDays > 7)
  //         dateMatch = false;
  //       else if (datePosted === "Last 15 days" && diffDays > 15)
  //         dateMatch = false;
  //       else if (datePosted === "Last 30 days" && diffDays > 30)
  //         dateMatch = false;
  //     }

  //     // Distance filter
  //     let distanceMatch = true;
  //     if (distance !== "All") {
  //       const maxDistance = parseInt(
  //         distance.replace("Within ", "").replace(" km", ""),
  //       );
  //       if (jobItem.distance > maxDistance) distanceMatch = false;
  //     }

  //     // Education filter
  //     const educationMatch =
  //       education === "All" || jobItem.education === education;

  //     // Department filter
  //     const departmentMatch =
  //       department === "All" || jobItem.department === department;

  //     // English level filter
  //     const englishMatch =
  //       englishLevel === "All" || jobItem.englishLevel === englishLevel;

  //     // Work Shift filter
  //     const shiftMatch =
  //       workShifts.length === 0 || workShifts.includes(jobItem.shift);

  //     return (
  //       titleMatch &&
  //       locationMatch &&
  //       expMatch &&
  //       salaryMatch &&
  //       modeMatch &&
  //       typeMatch &&
  //       dateMatch &&
  //       distanceMatch &&
  //       educationMatch &&
  //       departmentMatch &&
  //       englishMatch &&
  //       shiftMatch
  //     );
  //   });

  //   // Apply sorting
  //   const sorted = [...filtered].sort((a, b) => {
  //     if (sortBy === "Salary - High to low") {
  //       return b.salary - a.salary;
  //     } else if (sortBy === "Date posted - New to Old") {
  //       return new Date(b.postedDate) - new Date(a.postedDate);
  //     } else if (sortBy === "Distance - Near to Far") {
  //       return a.distance - b.distance;
  //     }
  //     return a.id - b.id;
  //   });

  //   setFilteredJobs(sorted);
  // };
  const applyFilters = () => {
    const filtered = jobsData.filter((jobItem) => {
      const titleMatch = jobItem.title
        ?.toLowerCase()
        .includes(job.toLowerCase());

      const locationMatch = jobItem.location
        ?.toLowerCase()
        .includes(city.toLowerCase());

      return titleMatch && locationMatch;
    });

    setFilteredJobs(filtered);
  };

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters();
  }, [
    job,
    city,
    exp,
    salary,
    workModes,
    workTypes,
    workShifts,
    datePosted,
    distance,
    education,
    department,
    englishLevel,
    sortBy,
  ]);

  // When URL params change, update state
  useEffect(() => {
    setJob(jobFromURL);
    setExp(expFromURL);
    setCity(cityFromURL);
  }, [jobFromURL, expFromURL, cityFromURL]);

  // Enter key press handle करें
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setExp("");
    setDatePosted("All");
    setSalary(150000);
    setEducation("All");
    setWorkModes([]);
    setWorkTypes([]);
    setDepartment("All");
    setEnglishLevel("All");
    setDistance("All");
    setWorkShifts([]);
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
      case "education":
        return education === "All" ? "Education" : education;
      case "workMode":
        return workModes.length === 0
          ? "Work mode"
          : `${workModes.length} selected`;
      case "workType":
        return workTypes.length === 0
          ? "Work type"
          : `${workTypes.length} selected`;
      case "department":
        return department === "All" ? "Department" : department;
      case "englishLevel":
        return englishLevel === "All" ? "English level" : englishLevel;
      case "distance":
        return distance === "All" ? "Distance" : distance;
      case "workShift":
        return workShifts.length === 0
          ? "Work shift"
          : `${workShifts.length} selected`;
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
      case "education":
        return education !== "All";
      case "workMode":
        return workModes.length > 0;
      case "workType":
        return workTypes.length > 0;
      case "department":
        return department !== "All";
      case "englishLevel":
        return englishLevel !== "All";
      case "distance":
        return distance !== "All";
      case "workShift":
        return workShifts.length > 0;
      default:
        return false;
    }
  };

  const closeActiveFilter = () => {
    setActiveFilter(null);
  };

  // Render mobile filter dropdown content
  const renderMobileFilterContent = () => {
    if (!activeFilter) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
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
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {activeFilter === "experience" && (
              <div className="space-y-2">
                {filterOptions.experience.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setExp(option === "All" ? "" : option);
                      setTimeout(closeActiveFilter, 200);
                      handleSearch(); // Search trigger करें
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${exp === (option === "All" ? "" : option) ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
                  >
                    {option}
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
                      handleSearch(); // Search trigger करें
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${datePosted === option ? "bg-blue-50 text-blue-600 border border-blue-200" : "hover:bg-gray-50"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {activeFilter === "salary" && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
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
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center font-medium">
                  Selected: ₹{salary.toLocaleString()}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.salaryRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        if (range === "All") setSalary(150000);
                        else if (range === "₹70,000+") setSalary(70000);
                        setTimeout(closeActiveFilter, 200);
                        handleSearch(); // Search trigger करें
                      }}
                      className={`px-4 py-2 rounded-lg border ${salary === 150000 && range === "All" ? "bg-blue-50 text-blue-600 border-blue-200" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {["education", "department", "englishLevel", "distance"].includes(
              activeFilter,
            ) && (
              <div className="space-y-2">
                {filterOptions[activeFilter].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      const setters = {
                        education: setEducation,
                        department: setDepartment,
                        englishLevel: setEnglishLevel,
                        distance: setDistance,
                      };
                      setters[activeFilter](option);
                      setTimeout(closeActiveFilter, 200);
                      handleSearch(); // Search trigger करें
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      {
                        education: education === option,
                        department: department === option,
                        englishLevel: englishLevel === option,
                        distance: distance === option,
                      }[activeFilter]
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {["workMode", "workType", "workShift"].includes(activeFilter) && (
              <div className="space-y-3">
                {filterOptions[activeFilter].map((option) => {
                  const currentArray = {
                    workMode: workModes,
                    workType: workTypes,
                    workShift: workShifts,
                  }[activeFilter];

                  return (
                    <label
                      key={option}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <span className="font-medium">{option}</span>
                      <input
                        type="checkbox"
                        checked={currentArray.includes(option)}
                        onChange={(e) => {
                          const setters = {
                            workMode: setWorkModes,
                            workType: setWorkTypes,
                            workShift: setWorkShifts,
                          };
                          const setter = setters[activeFilter];

                          if (e.target.checked) {
                            setter([...currentArray, option]);
                          } else {
                            setter(
                              currentArray.filter((item) => item !== option),
                            );
                          }
                          handleSearch(); // Search trigger करें
                        }}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  );
                })}
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
                    case "education":
                      setEducation("All");
                      break;
                    case "workMode":
                      setWorkModes([]);
                      break;
                    case "workType":
                      setWorkTypes([]);
                      break;
                    case "department":
                      setDepartment("All");
                      break;
                    case "englishLevel":
                      setEnglishLevel("All");
                      break;
                    case "distance":
                      setDistance("All");
                      break;
                    case "workShift":
                      setWorkShifts([]);
                      break;
                  }
                  handleSearch(); // Search trigger करें
                }}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  closeActiveFilter();
                  handleSearch(); // Search trigger करें
                }}
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
    <section className="bg-gray-100 text-black min-h-screen">
      {/* ================= DESKTOP VIEW (ORIGINAL) ================= */}
      <div className="hidden lg:block">
        {/* ================= SEARCH BAR ================= */}
        <div className="bg-white border-b py-4">
          <div className="max-w-7xl mx-auto px-4 flex gap-3 relative">
            {/* JOB TITLE */}
            <div className="relative flex-1">
              <input
                placeholder="Job Title"
                value={job}
                onChange={(e) => {
                  setJob(e.target.value);
                  setShowJob(true);
                }}
                onFocus={() => setShowJob(true)}
                onBlur={() => setTimeout(() => setShowJob(false), 150)}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
              />

              {/* SUGGESTION */}
              {showJob && job && (
                <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
                  {jobTitles
                    .filter((j) => j.toLowerCase().includes(job.toLowerCase()))
                    .slice(0, 10)
                    .map((item) => (
                      <p
                        key={item}
                        onClick={() => {
                          setJob(item);
                          setShowJob(false);
                          handleSearch(); // Search trigger करें
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {item}
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* EXPERIENCE */}
            <div className="relative w-48">
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
                className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
              />

              {showExp && (
                <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
                  {experiences
                    .filter(
                      (e) =>
                        exp === "" ||
                        e.toLowerCase().includes(exp.toLowerCase()),
                    )
                    .map((item) => (
                      <p
                        key={item}
                        onClick={() => {
                          setExp(item);
                          setShowExp(false);
                          handleSearch(); // Search trigger करें
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {item}
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* LOCATION */}
            <div className="relative w-56">
              <input
                placeholder="Location"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setShowCity(true);
                }}
                onFocus={() => setShowCity(true)}
                onBlur={() => setTimeout(() => setShowCity(false), 150)}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
              />

              {showCity && city && (
                <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
                  {cities
                    .filter((c) => c.toLowerCase().includes(city.toLowerCase()))
                    .slice(0, 12)
                    .map((item) => (
                      <p
                        key={item}
                        onClick={() => {
                          setCity(item);
                          setShowCity(false);
                          handleSearch(); // Search trigger करें
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {item}
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* SEARCH BTN */}
            <button
              onClick={handleSearch} // handleSearch function use करें
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-lg transition"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ================= FILTERS SIDEBAR ================= */}
          <div className="bg-white p-4 rounded-xl shadow space-y-5 text-sm">
            <h3 className="font-semibold text-base">Filters</h3>

            {/* DATE POSTED */}
            <div>
              <p className="font-medium mb-2">Date posted</p>

              <div className="space-y-1">
                {["All", "Last 24 hours", "Last 3 days", "Last 7 days"].map(
                  (item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="date"
                        checked={datePosted === item}
                        onChange={() => {
                          setDatePosted(item);
                          handleSearch(); // Search trigger करें
                        }}
                      />
                      {item}
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* DISTANCE */}
            <div>
              <p className="font-medium mb-2">Distance</p>

              <div className="space-y-1">
                {[
                  "All",
                  "Within 5 km",
                  "Within 10 km",
                  "Within 20 km",
                  "Within 50 km",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="distance"
                      checked={distance === item}
                      onChange={() => {
                        setDistance(item);
                        handleSearch(); // Search trigger करें
                      }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* SALARY */}
            <div>
              <p className="font-medium mb-2">Salary</p>

              <p className="text-xs text-gray-500 mb-1">
                Minimum monthly salary
              </p>

              <div className="flex justify-between text-xs mb-1">
                <span>₹0</span>
                <span>₹1.5 Lakhs</span>
              </div>

              <input
                type="range"
                min="0"
                max="150000"
                step="5000"
                value={salary}
                onChange={(e) => {
                  setSalary(Number(e.target.value));
                  handleSearch(); // Search trigger करें
                }}
                className="w-full"
              />
            </div>

            {/* WORK MODE */}
            <div>
              <p className="font-medium mb-2">Work Mode</p>

              <div className="space-y-1">
                {["Work from home", "Work from office", "Work from field"].map(
                  (item) => (
                    <label key={item} className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={workModes.includes(item)}
                        onChange={() => {
                          setWorkModes((prev) =>
                            prev.includes(item)
                              ? prev.filter((m) => m !== item)
                              : [...prev, item],
                          );
                          handleSearch(); // Search trigger करें
                        }}
                      />
                      {item}
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* WORK TYPE */}
            <div>
              <p className="font-medium mb-2">Work Type</p>

              <div className="space-y-1">
                {["Full time", "Part time", "Internship"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
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
                        handleSearch(); // Search trigger करें
                      }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* WORK SHIFT */}
            <div>
              <p className="font-medium mb-2">Work Shift</p>

              <div className="space-y-1">
                {["Day shift", "Night shift"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={workShifts.includes(item)}
                      onChange={() => {
                        setWorkShifts((prev) =>
                          prev.includes(item)
                            ? prev.filter((s) => s !== item)
                            : [...prev, item],
                        );
                        handleSearch(); // Search trigger करें
                      }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* SORT BY */}
            <div>
              <p className="font-medium mb-2">Sort By</p>

              <div className="space-y-1">
                {[
                  "Relevant",
                  "Salary - High to low",
                  "Date posted - New to Old",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === item}
                      onChange={() => {
                        setSortBy(item);
                        handleSearch(); // Search trigger करें
                      }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ================= JOB LIST ================= */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-base mb-2">
              Showing {filteredJobs.length} jobs
              {(job || exp || city) && (
                <span className="text-sm font-normal text-gray-600 ml-2">
                  {job && `for "${job}"`}
                  {exp && ` with ${exp} experience`}
                  {city && ` in ${city}`}
                </span>
              )}
            </h3>

            {filteredJobs.length > 0 ? (
              filteredJobs.map((jobItem) => (
                <JobCard key={jobItem._id} job={jobItem} />
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl shadow text-center">
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600">
                  Try changing your search criteria
                </p>
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="lg:col-span-1">
            {/* You can add right sidebar content here if needed */}
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW (APNA.CO STYLE) ================= */}
      <div className="lg:hidden">
        {/* ================= HEADER ================= */}
        <div className="bg-white border-b sticky top-0 z-30">
          <div className="px-4 py-3">
            {/* ================= SEARCH BAR ================= */}
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                placeholder="Job Title"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
              />

              <input
                placeholder="Location"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none border border-gray-200"
              />

              <button
                onClick={handleSearch} // handleSearch function use करें
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex justify-center items-center transition-colors"
              >
                <Search size={20} />
              </button>
            </div>

            {/* ================= SEARCH TITLE ================= */}
            <div className="mb-2">
              <h2 className="font-semibold text-sm sm:text-base">
                {job || city
                  ? `${job}${job && city ? ", " : ""}${city}`
                  : "All Jobs"}
                <span className="text-gray-600 text-xs sm:text-sm ml-2">
                  ({filteredJobs.length} jobs found)
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* ================= FILTERS BAR ================= */}
        <div className="bg-white border-b px-4 py-3 sticky top-[138px] z-20">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Filter size={18} />
              <span className="font-medium">Filters</span>
              {filterCount > 0 && (
                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                  {filterCount} Applied
                </span>
              )}
            </div>

            {filterCount > 0 && (
              <button
                onClick={() => {
                  clearAllFilters();
                  handleSearch(); // Search trigger करें
                }}
                className="text-red-600 text-sm font-medium flex items-center gap-1"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>

          {/* ================= FILTER CHIPS ROW ================= */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filterChips.map((chip) => {
              const isActive = isFilterActive(chip.key);
              const displayValue = getFilterDisplayValue(chip.key);

              return (
                <button
                  key={chip.key}
                  onClick={() =>
                    setActiveFilter(activeFilter === chip.key ? null : chip.key)
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border whitespace-nowrap ${isActive ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-white text-gray-700 border-gray-200"}`}
                >
                  {chip.icon}
                  <span className="text-sm">{displayValue}</span>
                  {isActive && (
                    <span className="bg-blue-100 text-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      ✓
                    </span>
                  )}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${activeFilter === chip.key ? "rotate-180" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= SORT BY ================= */}
        <div className="bg-white border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <SortAsc size={16} />
            <span className="font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleSearch(); // Search trigger करें
              }}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none"
            >
              <option value="Relevant">Relevant</option>
              <option value="Salary - High to low">Salary - High to low</option>
              <option value="Date posted - New to Old">
                Date posted - New to Old
              </option>
              <option value="Distance - Near to Far">
                Distance - Near to Far
              </option>
            </select>
          </div>
        </div>

        {/* ================= FILTER DROPDOWN ================= */}
        {renderMobileFilterContent()}

        {/* ================= JOB LIST ================= */}
        <div className="px-4 py-3">
          <h3 className="font-semibold text-lg mb-4">
            {filteredJobs.length} Jobs: Explore based on your Filter
          </h3>

          {filteredJobs.length > 0 ? (
            filteredJobs.map((jobItem) => (
              <JobCard key={jobItem._id} job={jobItem} />
            ))
          ) : (
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="text-gray-400 mb-3">
                <Briefcase size={40} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                Try changing your search criteria
              </p>
              <button
                onClick={() => {
                  clearAllFilters();
                  handleSearch();
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white p-4 rounded-xl shadow hover:border-green-500 border cursor-pointer hover:shadow-lg transition">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-base">{job.title}</h3>

            <p className="text-sm text-gray-500">{job.company}</p>

            <p className="text-sm text-gray-500 mt-1">📍 {job.location}</p>
          </div>

          <p className="text-sm font-medium">
            ₹{job.salary?.min} - ₹{job.salary?.max}
          </p>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap text-xs">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {job.jobType}
          </span>

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {job.experience?.min} - {job.experience?.max} yrs
          </span>
        </div>
      </div>
    </Link>
  );
}

function MobileJobCard({ job }) {
  const daysAgo = Math.floor(
    (new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24),
  );

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl border p-4 mb-3 hover:border-blue-300 transition-colors">
        {/* Title */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base mb-1">{job.title}</h3>

            <p className="text-gray-700 font-medium text-sm">{job.company}</p>
          </div>

          <div className="text-right">
            <p className="font-bold">
              ₹{job.salary?.min} - ₹{job.salary?.max}
            </p>

            <p className="text-gray-500 text-xs">monthly</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          {job.location}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {job.jobType}
          </span>

          <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
            {job.experience?.min} - {job.experience?.max} yrs
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />

            {daysAgo === 0
              ? "Today"
              : daysAgo === 1
                ? "Yesterday"
                : `${daysAgo} days ago`}
          </div>
        </div>
      </div>
    </Link>
  );
}
