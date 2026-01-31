// "use client";

// import { useState } from "react";
// import Link from "next/link";

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
//   },
// ];

// // 🔥 AUTO CREATE MORE (30+)
// for (let i = 6; i <= 35; i++) {
//   jobsData.push({
//     id: i,
//     title: [
//       "Frontend Developer",
//       "React Developer",
//       "Web Developer",
//       "Node Developer",
//     ][i % 4],
//     company: "Company " + i,
//     location: ["Delhi", "Noida", "Gurgaon", "Pune", "Mumbai"][i % 5],
//     salary: 15000 + i * 1000,
//     type: ["Full time", "Part time", "Internship"][i % 3],
//     mode: ["Work from office", "Work from home"][i % 2],
//     exp: `${i % 6} Years`,
//   });
// }

// export default function JobsPage() {
//   const [title, setTitle] = useState("");
//   const [exp, setExp] = useState("");
//   const [city, setCity] = useState("");
//   const [salary, setSalary] = useState(150000);
//   const [workModes, setWorkModes] = useState([]);
//   const [workTypes, setWorkTypes] = useState([]);
//   const [showTitle, setShowTitle] = useState(false);
//   const [showExp, setShowExp] = useState(false);
//   const [showCity, setShowCity] = useState(false);

//   /* ===== FILTER USKE BAAD ===== */
//   const filteredJobs = jobsData.filter((job) => {
//     return (
//       job.title.toLowerCase().includes(title.toLowerCase()) &&
//       job.location.toLowerCase().includes(city.toLowerCase()) &&
//       job.exp.toLowerCase().includes(exp.toLowerCase()) &&
//       job.salary <= salary &&
//       (workModes.length === 0 || workModes.includes(job.mode)) &&
//       (workTypes.length === 0 || workTypes.includes(job.type))
//     );
//   });

//   /* SUGGESTION DATA */
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

//   return (
//     <section className="bg-gray-100 text-black min-h-screen">
//       {/* ================= SEARCH BAR ================= */}
//       <div className="bg-white border-b py-4">
//         <div className="max-w-7xl mx-auto px-4 flex gap-3 relative">
//           {/* JOB TITLE */}
//           <div className="relative flex-1">
//             <input
//               placeholder="Job Title"
//               value={title}
//               onChange={(e) => {
//                 setTitle(e.target.value);
//                 setShowTitle(true);
//               }}
//               onFocus={() => setShowTitle(true)}
//               onBlur={() => setTimeout(() => setShowTitle(false), 150)}
//               className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
//             />

//             {/* SUGGESTION */}
//             {showTitle && title && (
//               <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
//                 {jobTitles
//                   .filter((j) => j.toLowerCase().includes(title.toLowerCase()))
//                   .slice(0, 10)
//                   .map((item) => (
//                     <p
//                       key={item}
//                       onClick={() => {
//                         setTitle(item);
//                         setShowTitle(false);
//                       }}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                     >
//                       {item}
//                     </p>
//                   ))}
//               </div>
//             )}
//           </div>

//           {/* EXPERIENCE */}
//           <div className="relative w-48">
//             <input
//               placeholder="Experience"
//               value={exp}
//               onChange={(e) => {
//                 setExp(e.target.value);
//                 setShowExp(true);
//               }}
//               onFocus={() => setShowExp(true)}
//               onBlur={() => setTimeout(() => setShowExp(false), 150)}
//               className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
//             />

//             {showExp && (
//               <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
//                 {experiences
//                   .filter(
//                     (e) =>
//                       exp === "" || e.toLowerCase().includes(exp.toLowerCase()),
//                   )
//                   .map((item) => (
//                     <p
//                       key={item}
//                       onClick={() => {
//                         setExp(item);
//                         setShowExp(false);
//                       }}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                     >
//                       {item}
//                     </p>
//                   ))}
//               </div>
//             )}
//           </div>

//           {/* LOCATION */}
//           <div className="relative w-56">
//             <input
//               placeholder="Location"
//               value={city}
//               onChange={(e) => {
//                 setCity(e.target.value);
//                 setShowCity(true);
//               }}
//               onFocus={() => setShowCity(true)}
//               onBlur={() => setTimeout(() => setShowCity(false), 150)}
//               className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
//             />

//             {showCity && city && (
//               <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
//                 {cities
//                   .filter((c) => c.toLowerCase().includes(city.toLowerCase()))
//                   .slice(0, 12)
//                   .map((item) => (
//                     <p
//                       key={item}
//                       onClick={() => {
//                         setCity(item);
//                         setShowCity(false);
//                       }}
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                     >
//                       {item}
//                     </p>
//                   ))}
//               </div>
//             )}
//           </div>

//           {/* SEARCH BTN */}
//           <button className="bg-orange-500 text-white px-6 rounded-lg">
//             Search Jobs
//           </button>
//         </div>
//       </div>

//       {/* ================= MAIN ================= */}
//       <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//         {/* ================= FILTERS ================= */}
//         <div className="bg-white p-4 rounded-xl shadow space-y-5 text-sm">
//           <h3 className="font-semibold text-base">Filters</h3>

//           {/* DATE POSTED */}
//           <div>
//             <p className="font-medium mb-2">Date posted</p>

//             <div className="space-y-1">
//               {["All", "Last 24 hours", "Last 3 days", "Last 7 days"].map(
//                 (item) => (
//                   <label
//                     key={item}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input type="radio" name="date" />
//                     {item}
//                   </label>
//                 ),
//               )}
//             </div>
//           </div>

//           {/* DISTANCE */}
//           <div>
//             <p className="font-medium mb-2">Distance</p>

//             <div className="space-y-1">
//               {[
//                 "All",
//                 "Within 5 km",
//                 "Within 10 km",
//                 "Within 20 km",
//                 "Within 50 km",
//               ].map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input type="radio" name="distance" />
//                   {item}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* SALARY */}
//           <div>
//             <p className="font-medium mb-2">Salary</p>

//             <p className="text-xs text-gray-500 mb-1">Minimum monthly salary</p>

//             <div className="flex justify-between text-xs mb-1">
//               <span>₹0</span>
//               <span>₹1.5 Lakhs</span>
//             </div>

//             <input
//               type="range"
//               min="0"
//               max="150000"
//               step="5000"
//               value={salary}
//               onChange={(e) => setSalary(Number(e.target.value))}
//               className="w-full"
//             />
//           </div>

//           {/* WORK MODE */}
//           <div>
//             <p className="font-medium mb-2">Work Mode</p>

//             <div className="space-y-1">
//               {["Work from home", "Work from office", "Work from field"].map(
//                 (item) => (
//                   <label key={item} className="flex gap-2">
//                     <input
//                       type="checkbox"
//                       checked={workModes.includes(item)}
//                       onChange={() =>
//                         setWorkModes((prev) =>
//                           prev.includes(item)
//                             ? prev.filter((m) => m !== item)
//                             : [...prev, item],
//                         )
//                       }
//                     />
//                     {item}
//                   </label>
//                 ),
//               )}
//             </div>
//           </div>

//           {/* WORK TYPE */}
//           <div>
//             <p className="font-medium mb-2">Work Type</p>

//             <div className="space-y-1">
//               {["Full time", "Part time", "Internship"].map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={workTypes.includes(item)}
//                     onChange={() =>
//                       setWorkTypes((prev) =>
//                         prev.includes(item)
//                           ? prev.filter((t) => t !== item)
//                           : [...prev, item],
//                       )
//                     }
//                   />
//                   {item}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* WORK SHIFT */}
//           <div>
//             <p className="font-medium mb-2">Work Shift</p>

//             <div className="space-y-1">
//               {["Day shift", "Night shift"].map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input type="checkbox" />
//                   {item}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* SORT BY */}
//           <div>
//             <p className="font-medium mb-2">Sort By</p>

//             <div className="space-y-1">
//               {[
//                 "Relevant",
//                 "Salary - High to low",
//                 "Date posted - New to Old",
//               ].map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input type="radio" name="sort" />
//                   {item}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ================= JOB LIST ================= */}
//         <div className="lg:col-span-2 space-y-4">
//           <h3 className="font-semibold text-base mb-2">
//             Showing {filteredJobs.length} jobs
//           </h3>

//           {filteredJobs.map((job) => (
//             <JobCard key={job.id} job={job} />
//           ))}
//         </div>

//         {/* ================= RIGHT SIDE ================= */}
//         <div className="lg:col-span-1">
//           {/* You can add right sidebar content here if needed */}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ================= JOB CARD ================= */
// // function JobCard({ job }) {
// //   return (
// //     <div className="bg-white p-4 rounded-xl shadow hover:border-green-500 border">
// //       <div className="flex justify-between">
// //         <div>
// //           <h3 className="font-semibold text-base">{job.title}</h3>

// //           <p className="text-sm text-gray-500">{job.company}</p>

// //           <p className="text-sm text-gray-500 mt-1">📍 {job.location}</p>
// //         </div>

// //         <p className="text-sm font-medium">₹{job.salary.toLocaleString()}</p>
// //       </div>

// //       <div className="flex gap-2 mt-3 flex-wrap text-xs">
// //         <Tag text={job.mode} />
// //         <Tag text={job.type} />
// //         <Tag text={job.exp} />
// //       </div>
// //     </div>
// //   );
// // }
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
//           <Tag text={job.mode} />
//           <Tag text={job.type} />
//           <Tag text={job.exp} />
//         </div>
//       </div>
//     </Link>
//   );
// }

// /* TAG */
// function Tag({ text }) {
//   return <span className="bg-gray-100 px-3 py-1 rounded-full">{text}</span>;
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* DUMMY JOBS */
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Satsai Pvt Ltd",
    location: "New Delhi",
    salary: 28000,
    type: "Full time",
    mode: "Work from office",
    exp: "2 Years",
    postedDate: "2024-01-10",
    distance: 8,
    shift: "Day shift",
  },
  {
    id: 2,
    title: "Web Developer",
    company: "Dragons Consultancy",
    location: "Noida",
    salary: 20000,
    type: "Full time",
    mode: "Work from office",
    exp: "3 Years",
    postedDate: "2024-01-14",
    distance: 15,
    shift: "Day shift",
  },
  {
    id: 3,
    title: "MERN Stack Developer",
    company: "Vastora Tech",
    location: "Noida",
    salary: 25000,
    type: "Full time",
    mode: "Work from office",
    exp: "Any Experience",
    postedDate: "2024-01-15",
    distance: 3,
    shift: "Night shift",
  },
  {
    id: 4,
    title: "React Developer",
    company: "TechSoft",
    location: "Gurgaon",
    salary: 35000,
    type: "Full time",
    mode: "Work from home",
    exp: "1 Years",
    postedDate: "2024-01-12",
    distance: 25,
    shift: "Day shift",
  },
  {
    id: 5,
    title: "Backend Developer",
    company: "Infosys",
    location: "Bangalore",
    salary: 45000,
    type: "Full time",
    mode: "Work from office",
    exp: "4 Years",
    postedDate: "2024-01-09",
    distance: 45,
    shift: "Night shift",
  },
];

// 🔥 AUTO CREATE MORE (30+)
for (let i = 6; i <= 35; i++) {
  const daysAgo = i % 10;
  const postedDate = new Date();
  postedDate.setDate(postedDate.getDate() - daysAgo);

  jobsData.push({
    id: i,
    title: [
      "Frontend Developer",
      "React Developer",
      "Web Developer",
      "Node Developer",
    ][i % 4],
    company: "Company " + i,
    location: ["Delhi", "Noida", "Gurgaon", "Pune", "Mumbai"][i % 5],
    salary: 15000 + i * 1000,
    type: ["Full time", "Part time", "Internship"][i % 3],
    mode: ["Work from office", "Work from home"][i % 2],
    exp: `${i % 6} Years`,
    postedDate: postedDate.toISOString().split("T")[0],
    distance: (i % 50) + 1,
    shift: ["Day shift", "Night shift"][i % 2],
  });
}

export default function JobsPage() {
  // Search form states (temporary)
  const [tempTitle, setTempTitle] = useState("");
  const [tempExp, setTempExp] = useState("");
  const [tempCity, setTempCity] = useState("");

  // Applied filter states (after search)
  const [title, setTitle] = useState("");
  const [exp, setExp] = useState("");
  const [city, setCity] = useState("");

  const [salary, setSalary] = useState(150000);
  const [workModes, setWorkModes] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [showCity, setShowCity] = useState(false);

  // New filter states
  const [datePosted, setDatePosted] = useState("All");
  const [distance, setDistance] = useState("All");
  const [workShifts, setWorkShifts] = useState([]);
  const [sortBy, setSortBy] = useState("Relevant");

  // Applied jobs state
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  // Apply filters when component mounts or search button clicked
  const applyFilters = () => {
    // Update applied filters with current temp values
    setTitle(tempTitle);
    setExp(tempExp);
    setCity(tempCity);

    const filtered = jobsData.filter((job) => {
      // Basic filters
      const titleMatch = job.title
        .toLowerCase()
        .includes(tempTitle.toLowerCase());
      const locationMatch = job.location
        .toLowerCase()
        .includes(tempCity.toLowerCase());
      const expMatch = job.exp.toLowerCase().includes(tempExp.toLowerCase());
      const salaryMatch = job.salary <= salary;
      const modeMatch = workModes.length === 0 || workModes.includes(job.mode);
      const typeMatch = workTypes.length === 0 || workTypes.includes(job.type);

      // Date Posted filter
      let dateMatch = true;
      if (datePosted !== "All") {
        const today = new Date();
        const jobDate = new Date(job.postedDate);
        const diffDays = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

        if (datePosted === "Last 24 hours" && diffDays > 1) dateMatch = false;
        else if (datePosted === "Last 3 days" && diffDays > 3)
          dateMatch = false;
        else if (datePosted === "Last 7 days" && diffDays > 7)
          dateMatch = false;
      }

      // Distance filter
      let distanceMatch = true;
      if (distance !== "All") {
        const maxDistance = parseInt(
          distance.replace("Within ", "").replace(" km", ""),
        );
        if (job.distance > maxDistance) distanceMatch = false;
      }

      // Work Shift filter
      const shiftMatch =
        workShifts.length === 0 || workShifts.includes(job.shift);

      return (
        titleMatch &&
        locationMatch &&
        expMatch &&
        salaryMatch &&
        modeMatch &&
        typeMatch &&
        dateMatch &&
        distanceMatch &&
        shiftMatch
      );
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "Salary - High to low") {
        return b.salary - a.salary;
      } else if (sortBy === "Date posted - New to Old") {
        return new Date(b.postedDate) - new Date(a.postedDate);
      }
      return a.id - b.id;
    });

    setFilteredJobs(sorted);
  };

  // Apply filters on initial render
  useEffect(() => {
    applyFilters();
  }, []);

  /* SUGGESTION DATA */
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

  return (
    <section className="bg-gray-100 text-black min-h-screen">
      {/* ================= SEARCH BAR ================= */}
      <div className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 relative">
          {/* JOB TITLE */}
          <div className="relative flex-1">
            <input
              placeholder="Job Title"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onFocus={() => setShowTitle(true)}
              onBlur={() => setTimeout(() => setShowTitle(false), 150)}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
            />

            {/* SUGGESTION */}
            {showTitle && tempTitle && (
              <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
                {jobTitles
                  .filter((j) =>
                    j.toLowerCase().includes(tempTitle.toLowerCase()),
                  )
                  .slice(0, 10)
                  .map((item) => (
                    <p
                      key={item}
                      onClick={() => {
                        setTempTitle(item);
                        setShowTitle(false);
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
              value={tempExp}
              onChange={(e) => setTempExp(e.target.value)}
              onFocus={() => setShowExp(true)}
              onBlur={() => setTimeout(() => setShowExp(false), 150)}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
            />

            {showExp && (
              <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
                {experiences
                  .filter(
                    (e) =>
                      tempExp === "" ||
                      e.toLowerCase().includes(tempExp.toLowerCase()),
                  )
                  .map((item) => (
                    <p
                      key={item}
                      onClick={() => {
                        setTempExp(item);
                        setShowExp(false);
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
              value={tempCity}
              onChange={(e) => setTempCity(e.target.value)}
              onFocus={() => setShowCity(true)}
              onBlur={() => setTimeout(() => setShowCity(false), 150)}
              className="w-full bg-gray-100 px-4 py-2 rounded-lg outline-none"
            />

            {showCity && tempCity && (
              <div className="absolute bg-white w-full shadow rounded mt-1 z-30 max-h-48 overflow-auto">
                {cities
                  .filter((c) =>
                    c.toLowerCase().includes(tempCity.toLowerCase()),
                  )
                  .slice(0, 12)
                  .map((item) => (
                    <p
                      key={item}
                      onClick={() => {
                        setTempCity(item);
                        setShowCity(false);
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
            onClick={applyFilters}
            className="bg-orange-500 text-white px-6 rounded-lg hover:bg-orange-600 transition"
          >
            Search Jobs
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ================= FILTERS ================= */}
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
                        applyFilters();
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
                      applyFilters();
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

            <p className="text-xs text-gray-500 mb-1">Minimum monthly salary</p>

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
                applyFilters();
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
                        applyFilters();
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
                      applyFilters();
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
                      applyFilters();
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
                      applyFilters();
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
            {(title || exp || city) && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                {title && `for "${title}"`}
                {exp && ` with ${exp} experience`}
                {city && ` in ${city}`}
              </span>
            )}
          </h3>

          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="lg:col-span-1">
          {/* You can add right sidebar content here if needed */}
        </div>
      </div>
    </section>
  );
}

/* ================= JOB CARD ================= */
function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white p-4 rounded-xl shadow hover:border-green-500 border cursor-pointer hover:shadow-lg transition">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-base">{job.title}</h3>

            <p className="text-sm text-gray-500">{job.company}</p>

            <p className="text-sm text-gray-500 mt-1">📍 {job.location}</p>
          </div>

          <p className="text-sm font-medium">₹{job.salary.toLocaleString()}</p>
        </div>

        <div className="flex gap-2 mt-3 flex-wrap text-xs">
          <Tag text={job.mode} />
          <Tag text={job.type} />
          <Tag text={job.exp} />
          <Tag text={job.shift} />
        </div>
      </div>
    </Link>
  );
}

/* TAG */
function Tag({ text }) {
  return <span className="bg-gray-100 px-3 py-1 rounded-full">{text}</span>;
}
