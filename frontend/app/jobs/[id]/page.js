// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// /* SAME DUMMY JOBS */
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

// // AUTO MORE
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

// export default function JobDetailPage() {
//   const params = useParams();
//   const router = useRouter();

//   const id = Number(params.id);

//   const [applicants, setApplicants] = useState(0);
//   const [applied, setApplied] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const job = jobsData.find((j) => j.id === id);

//   /* LOAD COUNT */
//   useEffect(() => {
//     const saved = localStorage.getItem(`job_${id}_apply`);
//     const isApplied = localStorage.getItem(`job_${id}_done`);

//     if (saved) {
//       setApplicants(Number(saved));
//     }

//     if (isApplied) {
//       setApplied(true);
//     }
//   }, [id]);

//   /* APPLY HANDLER */
//   const handleApply = () => {
//     if (applied) return;

//     const newCount = applicants + 1;

//     setApplicants(newCount);
//     setApplied(true);

//     localStorage.setItem(`job_${id}_apply`, newCount);
//     localStorage.setItem(`job_${id}_done`, "yes");

//     setShowSuccess(true);

//     setTimeout(() => {
//       setShowSuccess(false);
//     }, 3000);
//   };

//   const similarJobs = jobsData.filter((j) => j.id !== id).slice(0, 5);

//   if (!job) {
//     return (
//       <div className="p-10 text-center text-black">
//         <h2 className="text-xl font-bold">Job Not Found ❌</h2>

//         <button
//           onClick={() => router.push("/jobs")}
//           className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
//         >
//           Back to Jobs
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-gray-100 min-h-screen py-6 text-black">
//       {showSuccess && (
//         <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50">
//           🎉 Congratulations! You have successfully applied.
//         </div>
//       )}
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* ================= LEFT ================= */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
//           <h1 className="text-2xl font-bold">{job.title}</h1>
//           <p className="text-gray-600">{job.company}</p>

//           <p className="mt-1 text-sm">📍 {job.location}</p>

//           <p className="mt-3 text-lg font-semibold">
//             ₹{job.salary.toLocaleString()} / month
//           </p>

//           {/* TAGS */}
//           <div className="flex gap-2 mt-4 flex-wrap text-xs">
//             <Tag text={job.mode} />
//             <Tag text={job.type} />
//             <Tag text={job.exp} />
//           </div>

//           <hr className="my-5" />

//           {/* HIGHLIGHTS */}
//           <div className="bg-blue-50 p-4 rounded mb-5">
//             <p className="font-semibold mb-2">Job Highlights</p>

//             <ul className="text-sm space-y-1 text-gray-700">
//               <li>🔥 Urgently Hiring</li>

//               <li>👥 {applicants >= 100 ? "100+" : applicants} Applicants</li>

//               <li>🏥 Health Insurance</li>
//               <li>🍽️ Food Facility</li>
//             </ul>
//           </div>

//           {/* DETAILS */}
//           <div className="space-y-3 text-sm">
//             <Row label="Work Mode" value={job.mode} />
//             <Row label="Job Type" value={job.type} />
//             <Row label="Experience" value={job.exp} />
//             <Row label="Location" value={job.location} />
//           </div>

//           {/* DESCRIPTION */}
//           <div className="mt-6">
//             <h3 className="font-semibold mb-2">Job Description</h3>

//             <p className="text-gray-700 text-sm leading-relaxed">
//               We are hiring for {job.title}. Candidate should have good
//               knowledge in React, JavaScript and modern web technologies.
//             </p>
//           </div>

//           {/* APPLY */}
//           <button
//             onClick={handleApply}
//             disabled={applied}
//             className={`mt-6 w-full py-2 rounded-lg text-white ${
//               applied
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             {applied ? "Already Applied ✅" : "Apply for Job"}
//           </button>

//           {/* BACK */}
//           <button
//             onClick={() => router.push("/jobs")}
//             className="mt-3 w-full border py-2 rounded-lg"
//           >
//             ← Back to Jobs
//           </button>
//         </div>

//         {/* ================= RIGHT ================= */}
//         <div className="bg-white rounded-xl shadow p-4">
//           <h3 className="font-semibold mb-4">Similar Jobs</h3>

//           <div className="space-y-3">
//             {similarJobs.map((j) => (
//               <div
//                 key={j.id}
//                 onClick={() => router.push(`/jobs/${j.id}`)}
//                 className="border rounded p-3 cursor-pointer hover:bg-gray-50"
//               >
//                 <p className="font-medium text-sm">{j.title}</p>

//                 <p className="text-xs text-gray-500">{j.company}</p>

//                 <p className="text-xs mt-1">📍 {j.location}</p>

//                 <p className="text-xs font-semibold mt-1">
//                   ₹{j.salary.toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* SMALL COMPONENTS */

// function Tag({ text }) {
//   return <span className="bg-gray-100 px-3 py-1 rounded-full">{text}</span>;
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex justify-between">
//       <span className="text-gray-500">{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// }
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function JobDetailPage() {
//   const params = useParams();
//   const router = useRouter();

//   const API = "http://localhost:5000/api";

//   const { id } = params;

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH SINGLE JOB =================
//   useEffect(() => {
//     fetchJob();
//   }, [id]);

//   const fetchJob = async () => {
//     try {
//       const res = await axios.get(`${API}/jobs/${id}`);

//       setJob(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       alert("Job not found");
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-10 text-center text-black">Loading job details...</div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="p-10 text-center text-black">
//         <h2 className="text-xl font-bold">Job Not Found ❌</h2>

//         <button
//           onClick={() => router.push("/jobs")}
//           className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
//         >
//           Back to Jobs
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-gray-100 min-h-screen py-6 text-black">
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="bg-white rounded-xl shadow p-6">
//           {/* TITLE */}
//           <h1 className="text-2xl font-bold">{job.title}</h1>
//           <p className="text-gray-600">{job.company}</p>

//           <p className="mt-1 text-sm">📍 {job.location}</p>

//           {/* SALARY */}
//           <p className="mt-3 text-lg font-semibold">
//             ₹{job.salary?.min || 0} - ₹{job.salary?.max || 0}
//           </p>

//           {/* TAGS */}
//           <div className="flex gap-2 mt-4 flex-wrap text-xs">
//             <Tag text={job.jobType} />
//             {job.isFeatured && <Tag text="Featured" />}
//             {job.isActive && <Tag text="Active" />}
//           </div>

//           <hr className="my-5" />

//           {/* DETAILS */}
//           <div className="space-y-3 text-sm">
//             <Row label="Job Type" value={job.jobType} />
//             <Row label="Location" value={job.location} />
//             <Row
//               label="Experience"
//               value={`${job.experience?.min} - ${job.experience?.max} Years`}
//             />
//             <Row label="Applications" value={job.totalApplications} />
//           </div>

//           {/* DESCRIPTION */}
//           <div className="mt-6">
//             <h3 className="font-semibold mb-2">Job Description</h3>

//             <p className="text-gray-700 text-sm leading-relaxed">
//               {job.description}
//             </p>
//           </div>

//           {/* APPLY (Future Ready) */}
//           <button
//             disabled
//             className="mt-6 w-full py-2 rounded-lg text-white bg-gray-400 cursor-not-allowed"
//           >
//             Apply (Coming Soon)
//           </button>

//           {/* BACK */}
//           <button
//             onClick={() => router.push("/jobs")}
//             className="mt-3 w-full border py-2 rounded-lg"
//           >
//             ← Back to Jobs
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* SMALL COMPONENTS */

// function Tag({ text }) {
//   return <span className="bg-gray-100 px-3 py-1 rounded-full">{text}</span>;
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex justify-between">
//       <span className="text-gray-500">{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// }

// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function JobDetailPage() {
//   const params = useParams();
//   const router = useRouter();

//   const API = "http://localhost:5000/api";
//   const { id } = params;

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [applying, setApplying] = useState(false);

//   // ================= FETCH JOB =================
//   useEffect(() => {
//     fetchJob();
//   }, [id]);

//   const fetchJob = async () => {
//     try {
//       const res = await axios.get(`${API}/jobs/${id}`);

//       setJob(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       alert("Job not found");
//       setLoading(false);
//     }
//   };

//   // ================= APPLY JOB =================
//   const handleApply = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Pehle Login Karo");
//         router.push("/login");
//         return;
//       }

//       setApplying(true);

//       await axios.post(
//         `${API}/jobs/${id}/apply`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("Job Apply Ho Gayi 🎉");

//       // Refresh job data
//       fetchJob();
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "Apply Failed");
//     } finally {
//       setApplying(false);
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="p-10 text-center text-black">Loading job details...</div>
//     );
//   }

//   // ================= NOT FOUND =================
//   if (!job) {
//     return (
//       <div className="p-10 text-center text-black">
//         <h2 className="text-xl font-bold">Job Not Found ❌</h2>

//         <button
//           onClick={() => router.push("/jobs")}
//           className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
//         >
//           Back to Jobs
//         </button>
//       </div>
//     );
//   }

//   // ================= UI =================
//   return (
//     <section className="bg-gray-100 min-h-screen py-6 text-black">
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="bg-white rounded-xl shadow p-6">
//           {/* TITLE */}
//           <h1 className="text-2xl font-bold">{job.title}</h1>
//           <p className="text-gray-600">{job.company}</p>

//           <p className="mt-1 text-sm">📍 {job.location}</p>

//           {/* SALARY */}
//           <p className="mt-3 text-lg font-semibold">
//             ₹{job.salary?.min || 0} - ₹{job.salary?.max || 0}
//           </p>

//           {/* TAGS */}
//           <div className="flex gap-2 mt-4 flex-wrap text-xs">
//             <Tag text={job.jobType} />
//             {job.isFeatured && <Tag text="Featured" />}
//             {job.isActive && <Tag text="Active" />}
//           </div>

//           <hr className="my-5" />

//           {/* DETAILS */}
//           <div className="space-y-3 text-sm">
//             <Row label="Job Type" value={job.jobType} />
//             <Row label="Location" value={job.location} />
//             <Row
//               label="Experience"
//               value={`${job.experience?.min} - ${job.experience?.max} Years`}
//             />
//             <Row label="Applications" value={job.totalApplications} />
//           </div>

//           {/* DESCRIPTION */}
//           <div className="mt-6">
//             <h3 className="font-semibold mb-2">Job Description</h3>

//             <p className="text-gray-700 text-sm leading-relaxed">
//               {job.description}
//             </p>
//           </div>

//           {/* APPLY */}
//           <button
//             onClick={handleApply}
//             disabled={applying}
//             className={`mt-6 w-full py-2 rounded-lg text-white ${
//               applying
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             {applying ? "Applying..." : "Apply for Job"}
//           </button>

//           {/* BACK */}
//           <button
//             onClick={() => router.push("/jobs")}
//             className="mt-3 w-full border py-2 rounded-lg"
//           >
//             ← Back to Jobs
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* COMPONENTS */

// function Tag({ text }) {
//   return <span className="bg-gray-100 px-3 py-1 rounded-full">{text}</span>;
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex justify-between">
//       <span className="text-gray-500">{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// // }
// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ArrowLeft,
//   Briefcase,
//   Building,
//   MapPin,
//   DollarSign,
//   Clock,
//   Calendar,
//   Users,
//   FileText,
//   CheckCircle,
//   Award,
//   Zap,
//   Mail,
//   Phone,
//   ExternalLink,
//   ChevronRight,
//   GraduationCap,
//   Target,
//   Heart,
//   Shield,
//   Sparkles,
//   Tag as TagIcon,
//   UserCheck,
//   Layers,
//   BookOpen,
//   Coffee,
//   Globe,
//   Home,
//   Cpu,
//   Palette,
//   BarChart,
//   TrendingUp,
//   Server,
//   Eye,
//   MessageSquare,
//   Star,
//   Bookmark,
//   Share2,
// } from "lucide-react";
// import Link from "next/link";

// export default function JobDetailPage() {
//   const params = useParams();
//   const router = useRouter();

//   const API = "http://localhost:5000/api";
//   const { id } = params;

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [applying, setApplying] = useState(false);
//   const [hasApplied, setHasApplied] = useState(false);
//   const [saved, setSaved] = useState(false);

//   // ================= FETCH JOB =================
//   useEffect(() => {
//     fetchJob();
//     checkIfApplied();
//     checkIfSaved();
//   }, [id]);

//   const fetchJob = async () => {
//     try {
//       const res = await axios.get(`${API}/jobs/${id}`);
//       console.log("Job Data:", res.data.data);
//       setJob(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       alert("Job not found");
//       setLoading(false);
//     }
//   };

//   const checkIfApplied = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.get(`${API}/jobs/${id}/check-apply`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setHasApplied(res.data.hasApplied);
//     } catch (err) {
//       console.log("Check apply error:", err);
//     }
//   };

//   const checkIfSaved = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       // You need to implement this API endpoint
//       const res = await axios.get(`${API}/jobs/${id}/check-save`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSaved(res.data.saved);
//     } catch (err) {
//       console.log("Check save error:", err);
//     }
//   };

//   // ================= APPLY JOB =================
//   const handleApply = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login first to apply");
//         router.push("/login");
//         return;
//       }

//       setApplying(true);

//       await axios.post(
//         `${API}/jobs/${id}/apply`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("✅ Job Applied Successfully!");
//       setHasApplied(true);

//       // Refresh job data
//       fetchJob();
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.message || "Application Failed");
//     } finally {
//       setApplying(false);
//     }
//   };

//   const handleSaveJob = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please login to save jobs");
//         return;
//       }

//       const endpoint = saved
//         ? `${API}/jobs/${id}/unsave`
//         : `${API}/jobs/${id}/save`;

//       await axios.post(
//         endpoint,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       setSaved(!saved);
//       alert(saved ? "Job removed from saved" : "Job saved!");
//     } catch (err) {
//       console.log("Save error:", err);
//     }
//   };

//   const handleShare = () => {
//     const url = window.location.href;
//     navigator.clipboard.writeText(url);
//     alert("Link copied to clipboard!");
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   // ================= NOT FOUND =================
//   if (!job) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Briefcase className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Job Not Found
//           </h2>
//           <p className="text-gray-600 mb-6">
//             The job you're looking for doesn't exist or has been removed.
//           </p>
//           <button
//             onClick={() => router.push("/jobs")}
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
//           >
//             Browse All Jobs
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Helper functions to format data
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const getDaysAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Yesterday";
//     return `${diffDays} days ago`;
//   };

//   const getCategoryIcon = (category) => {
//     const icons = {
//       Engineering: <Cpu size={18} className="text-blue-600" />,
//       Design: <Palette size={18} className="text-purple-600" />,
//       Product: <BarChart size={18} className="text-green-600" />,
//       Marketing: <TrendingUp size={18} className="text-pink-600" />,
//       Sales: <Users size={18} className="text-orange-600" />,
//       Support: <MessageSquare size={18} className="text-teal-600" />,
//       Operations: <Server size={18} className="text-indigo-600" />,
//       Other: <Briefcase size={18} className="text-gray-600" />,
//     };
//     return icons[category] || <Briefcase size={18} className="text-gray-600" />;
//   };

//   // Destructure job data with fallbacks
//   // const {
//   //   title = "Job Title",
//   //   company = "Company",
//   //   location = "Location Not Specified",
//   //   salary = { min: 0, max: 0, currency: "INR" },
//   //   experience = { min: 0, max: 0 },
//   //   jobType = "Full Time",
//   //   workMode = "Office",
//   //   category = "Other",
//   //   description = "",
//   //   responsibilities = [],
//   //   requirements = [],
//   //   benefits = [],
//   //   skillsRequired = [],
//   //   vacancies = 1,
//   //   deadline = "",
//   //   applyLink = "",
//   //   contactEmail = "",
//   //   contactPhone = "",
//   //   isUrgent = false,
//   //   isFeatured = false,
//   //   totalViews = 0,
//   //   totalApplications = 0,
//   //   createdAt = new Date().toISOString(),
//   //   postedBy = {},
//   // } = job;
//   // Job data ko destructure करते समय
//   const {
//     title = "Job Title",
//     company = "Company",
//     location = "Location Not Specified",
//     salary = { min: 0, max: 0, currency: "INR" },
//     experience = { min: 0, max: 0 },
//     jobType = "Full Time",
//     workMode = "Office",
//     category = "Other",
//     description = "",
//     responsibilities = [],
//     requirements = [],
//     benefits = [],

//     // 🔴 यहाँ दोनों possibilities check करो
//     skillsRequired = [], // MongoDB में यही field है
//     skills = [], // कहीं यह field हो सकता है

//     vacancies = 1,
//     deadline = "",
//     applyLink = "",
//     contactEmail = "",
//     contactPhone = "",
//     isUrgent = false,
//     isFeatured = false,
//     totalViews = 0,
//     totalApplications = 0,
//     createdAt = new Date().toISOString(),
//     postedBy = {},
//   } = job;

//   // 🔴 Skills ko combine करो दोनों sources से
//   const allSkills =
//     skillsRequired.length > 0
//       ? skillsRequired
//       : skills.length > 0
//         ? skills
//         : [];
//   // Convert strings to arrays if needed
//   const responsibilitiesList = Array.isArray(responsibilities)
//     ? responsibilities
//     : responsibilities.split("\n").filter((item) => item.trim());

//   const requirementsList = Array.isArray(requirements)
//     ? requirements
//     : requirements.split("\n").filter((item) => item.trim());

//   const benefitsList = Array.isArray(benefits)
//     ? benefits
//     : benefits.split("\n").filter((item) => item.trim());

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       {/* Navigation */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => router.push("/jobs")}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
//             >
//               <ArrowLeft size={20} />
//               <span className="font-medium">Back to Jobs</span>
//             </button>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleShare}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//                 title="Share"
//               >
//                 <Share2 size={20} className="text-gray-600" />
//               </button>

//               <button
//                 onClick={handleSaveJob}
//                 className={`p-2 rounded-lg transition ${saved ? "bg-yellow-50 text-yellow-600" : "hover:bg-gray-100 text-gray-600"}`}
//                 title={saved ? "Remove from saved" : "Save job"}
//               >
//                 <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Job Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Job Header */}
//             <div className="bg-white rounded-2xl shadow-lg border p-6">
//               <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
//                 <div className="flex-1">
//                   <div className="flex items-start gap-4 mb-4">
//                     <div className="p-3 bg-blue-100 rounded-xl">
//                       <Briefcase className="w-8 h-8 text-blue-600" />
//                     </div>
//                     <div>
//                       <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                         {title}
//                       </h1>
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="flex items-center gap-2">
//                           <Building size={18} className="text-gray-500" />
//                           <span className="font-medium text-gray-700">
//                             {company}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <MapPin size={18} className="text-gray-500" />
//                           <span className="text-gray-600">{location}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2">
//                     <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium flex items-center gap-2">
//                       <Clock size={16} />
//                       {jobType}
//                     </span>
//                     <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium flex items-center gap-2">
//                       {workMode === "Remote" ? (
//                         <Globe size={16} />
//                       ) : workMode === "Hybrid" ? (
//                         <Home size={16} />
//                       ) : (
//                         <Building size={16} />
//                       )}
//                       {workMode}
//                     </span>
//                     <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium flex items-center gap-2">
//                       {getCategoryIcon(category)}
//                       {category}
//                     </span>
//                     {isUrgent && (
//                       <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-medium flex items-center gap-2">
//                         <Zap size={16} />
//                         Urgent Hiring
//                       </span>
//                     )}
//                     {isFeatured && (
//                       <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-medium flex items-center gap-2">
//                         <Award size={16} />
//                         Featured
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Salary & Apply */}
//                 <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
//                   <div className="text-center mb-4">
//                     <p className="text-2xl font-bold text-gray-900">
//                       ₹{salary.min} - ₹{salary.max} LPA
//                     </p>
//                     <p className="text-gray-600 text-sm">Annual Package</p>
//                   </div>

//                   <button
//                     onClick={handleApply}
//                     disabled={applying || hasApplied}
//                     className={`w-full py-3 rounded-lg font-medium transition-all ${
//                       hasApplied
//                         ? "bg-green-100 text-green-700 cursor-default"
//                         : applying
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
//                     }`}
//                   >
//                     {hasApplied ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <CheckCircle size={18} />
//                         Applied Successfully
//                       </span>
//                     ) : applying ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Applying...
//                       </span>
//                     ) : (
//                       "Apply Now"
//                     )}
//                   </button>

//                   <div className="mt-4 text-center text-sm text-gray-600">
//                     {totalApplications} applications • {totalViews} views
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center justify-center gap-2 mb-1">
//                     <Users size={18} className="text-blue-600" />
//                     <span className="font-bold text-gray-900">{vacancies}</span>
//                   </div>
//                   <div className="text-sm text-gray-600">Vacancies</div>
//                 </div>
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center justify-center gap-2 mb-1">
//                     <Target size={18} className="text-purple-600" />
//                     <span className="font-bold text-gray-900">
//                       {experience.min} - {experience.max} yrs
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-600">Experience</div>
//                 </div>
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center justify-center gap-2 mb-1">
//                     <Calendar size={18} className="text-green-600" />
//                     <span className="font-bold text-gray-900">
//                       {deadline ? formatDate(deadline) : "Open"}
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-600">Deadline</div>
//                 </div>
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <div className="flex items-center justify-center gap-2 mb-1">
//                     <Eye size={18} className="text-orange-600" />
//                     <span className="font-bold text-gray-900">
//                       {getDaysAgo(createdAt)}
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-600">Posted</div>
//                 </div>
//               </div>
//             </div>

//             {/* Job Description */}
//             <div className="bg-white rounded-2xl shadow-lg border p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <FileText size={20} className="text-blue-600" />
//                 Job Description
//               </h2>
//               <div className="prose prose-gray max-w-none">
//                 <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                   {description || "No description provided."}
//                 </p>
//               </div>
//             </div>
//             {/* Skills Required */}
//             {allSkills.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg border p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <Shield size={20} className="text-indigo-600" />
//                   Skills Required
//                 </h2>
//                 <div className="flex flex-wrap gap-3">
//                   {allSkills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium border border-indigo-100 hover:bg-indigo-100 transition"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Skills count */}
//                 <div className="mt-4 text-sm text-gray-500">
//                   {allSkills.length} skill{allSkills.length !== 1 ? "s" : ""}{" "}
//                   required
//                 </div>
//               </div>
//             )}
//             {/* Responsibilities */}
//             {responsibilitiesList.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg border p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <Layers size={20} className="text-purple-600" />
//                   Key Responsibilities
//                 </h2>
//                 <ul className="space-y-3">
//                   {responsibilitiesList.map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <CheckCircle
//                         size={18}
//                         className="text-green-500 mt-1 flex-shrink-0"
//                       />
//                       <span className="text-gray-700">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Requirements */}
//             {requirementsList.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg border p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <UserCheck size={20} className="text-red-600" />
//                   Requirements & Qualifications
//                 </h2>
//                 <ul className="space-y-3">
//                   {requirementsList.map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <Target
//                         size={18}
//                         className="text-red-500 mt-1 flex-shrink-0"
//                       />
//                       <span className="text-gray-700">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Skills Required */}
//             {skillsRequired.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg border p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <Shield size={20} className="text-indigo-600" />
//                   Skills Required
//                 </h2>
//                 <div className="flex flex-wrap gap-3">
//                   {skillsRequired.map((skill, index) => (
//                     <span
//                       key={index}
//                       className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium border border-indigo-100"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Benefits */}
//             {benefitsList.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-lg border p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <Sparkles size={20} className="text-yellow-600" />
//                   Benefits & Perks
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {benefitsList.map((benefit, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
//                     >
//                       <Heart size={18} className="text-yellow-600" />
//                       <span className="text-gray-700">{benefit}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Sidebar */}
//           <div className="space-y-6">
//             {/* Apply Now Card */}
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-4">
//                 Apply for this Job
//               </h3>

//               {applyLink ? (
//                 <a
//                   href={applyLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2 mb-3"
//                 >
//                   <ExternalLink size={18} />
//                   Apply on Company Website
//                 </a>
//               ) : (
//                 <button
//                   onClick={handleApply}
//                   disabled={applying || hasApplied}
//                   className={`w-full py-3 rounded-lg font-medium transition mb-3 ${
//                     hasApplied
//                       ? "bg-green-100 text-green-700 cursor-default"
//                       : applying
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
//                   }`}
//                 >
//                   {hasApplied
//                     ? "✓ Already Applied"
//                     : applying
//                       ? "Applying..."
//                       : "Quick Apply"}
//                 </button>
//               )}

//               <div className="space-y-3 text-sm">
//                 <p className="text-gray-600">
//                   Applications close:{" "}
//                   <span className="font-medium">
//                     {deadline ? formatDate(deadline) : "Open until filled"}
//                   </span>
//                 </p>
//                 <p className="text-gray-600">
//                   Total vacancies:{" "}
//                   <span className="font-medium">{vacancies}</span>
//                 </p>
//                 <p className="text-gray-600">
//                   Already applied:{" "}
//                   <span className="font-medium">
//                     {totalApplications} candidates
//                   </span>
//                 </p>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="bg-white rounded-2xl shadow-lg border p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-4">
//                 Contact Information
//               </h3>
//               <div className="space-y-3">
//                 {contactEmail && (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Mail size={18} className="text-gray-600" />
//                     <div>
//                       <p className="text-sm text-gray-500">Email</p>
//                       <p className="font-medium text-gray-900">
//                         {contactEmail}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//                 {contactPhone && (
//                   <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Phone size={18} className="text-gray-600" />
//                     <div>
//                       <p className="text-sm text-gray-500">Phone</p>
//                       <p className="font-medium text-gray-900">
//                         {contactPhone}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Job Overview */}
//             <div className="bg-white rounded-2xl shadow-lg border p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-4">
//                 Job Overview
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="text-gray-600">Job Type</span>
//                   <span className="font-medium">{jobType}</span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="text-gray-600">Work Mode</span>
//                   <span className="font-medium">{workMode}</span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="text-gray-600">Experience</span>
//                   <span className="font-medium">
//                     {experience.min} - {experience.max} years
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="text-gray-600">Salary</span>
//                   <span className="font-medium">
//                     ₹{salary.min} - ₹{salary.max} LPA
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-b">
//                   <span className="text-gray-600">Category</span>
//                   <span className="font-medium">{category}</span>
//                 </div>
//                 <div className="flex justify-between items-center py-2">
//                   <span className="text-gray-600">Posted</span>
//                   <span className="font-medium">{getDaysAgo(createdAt)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Company Info */}
//             <div className="bg-white rounded-2xl shadow-lg border p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-4">
//                 About Company
//               </h3>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Building className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-gray-900">{company}</h4>
//                   <p className="text-sm text-gray-600">{location}</p>
//                 </div>
//               </div>
//               <p className="text-gray-700 text-sm">
//                 {postedBy.name
//                   ? `Posted by: ${postedBy.name}`
//                   : "Posted by company"}
//               </p>
//             </div>

//             {/* Report Job */}
//             <div className="bg-white rounded-2xl shadow-lg border p-6">
//               <h3 className="font-bold text-lg text-gray-900 mb-4">
//                 See something wrong?
//               </h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 If this job seems fake, misrepresented, or inappropriate, please
//                 report it.
//               </p>
//               <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
//                 Report Job
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* COMPONENTS */

// function Tag({ text, icon, color = "gray" }) {
//   const colorClasses = {
//     blue: "bg-blue-100 text-blue-700 border-blue-200",
//     purple: "bg-purple-100 text-purple-700 border-purple-200",
//     green: "bg-green-100 text-green-700 border-green-200",
//     yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
//     red: "bg-red-100 text-red-700 border-red-200",
//     gray: "bg-gray-100 text-gray-700 border-gray-200",
//   };

//   return (
//     <span
//       className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${colorClasses[color]}`}
//     >
//       {icon}
//       {text}
//     </span>
//   );
// }

// function Row({ label, value, icon }) {
//   return (
//     <div className="flex justify-between items-center py-2 border-b">
//       <div className="flex items-center gap-2 text-gray-600">
//         {icon}
//         <span>{label}</span>
//       </div>
//       <span className="font-medium">{value}</span>
//     </div>
//   );
// }
"use client";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Award,
  Zap,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Target,
  Heart,
  Shield,
  Sparkles,
  Tag as TagIcon,
  UserCheck,
  Layers,
  BookOpen,
  Coffee,
  Globe,
  Home,
  Cpu,
  Palette,
  BarChart,
  TrendingUp,
  Server,
  Eye,
  MessageSquare,
  Star,
  Bookmark,
  Share2,
} from "lucide-react";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

  const API = "http://localhost:5000/api";
  const { id } = params;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  // ================= FETCH JOB =================
  useEffect(() => {
    fetchJob();
    checkIfApplied();
    checkIfSaved();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${API}/jobs/${id}`);
      console.log("Job Detail Data:", res.data.data);
      setJob(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Job not found");
      setLoading(false);
    }
  };

  const checkIfApplied = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API}/jobs/${id}/check-apply`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHasApplied(res.data.hasApplied);
    } catch (err) {
      console.log("Check apply error:", err);
    }
  };

  const checkIfSaved = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // You need to implement this API endpoint
      const res = await axios.get(`${API}/jobs/${id}/check-save`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved(res.data.saved);
    } catch (err) {
      console.log("Check save error:", err);
    }
  };

  // ================= APPLY JOB =================
  // const handleApply = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       alert("Please login first to apply");
  //       router.push("/login");
  //       return;
  //     }

  //     setApplying(true);

  //     await axios.post(
  //       `${API}/jobs/${id}/apply`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     alert("✅ Job Applied Successfully!");
  //     setHasApplied(true);

  //     // Refresh job data
  //     fetchJob();
  //   } catch (err) {
  //     console.log(err);
  //     alert(err.response?.data?.message || "Application Failed");
  //   } finally {
  //     setApplying(false);
  //   }
  // };
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        router.push("/login");
        return;
      }

      setApplying(true);

      const res = await axios.post(
        `${API}/jobs/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ Success toast
      toast.success("🎉 Applied Successfully!");

      setHasApplied(true);

      // ✅ Update count
      setJob((prev) => ({
        ...prev,
        totalApplications: res.data.totalApplications,
      }));
    } catch (err) {
      console.log(err);

      // ✅ Error toast
      toast.error(err.response?.data?.message || "Application Failed");
    } finally {
      setApplying(false);
    }
  };

  const handleSaveJob = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to save jobs");
        return;
      }

      const endpoint = saved
        ? `${API}/jobs/${id}/unsave`
        : `${API}/jobs/${id}/save`;

      await axios.post(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setSaved(!saved);
      alert(saved ? "Job removed from saved" : "Job saved!");
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  // Helper functions to format data
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysAgo = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Engineering: <Cpu size={18} className="text-blue-600" />,
      Design: <Palette size={18} className="text-purple-600" />,
      Product: <BarChart size={18} className="text-green-600" />,
      Marketing: <TrendingUp size={18} className="text-pink-600" />,
      Sales: <Users size={18} className="text-orange-600" />,
      Support: <MessageSquare size={18} className="text-teal-600" />,
      Operations: <Server size={18} className="text-indigo-600" />,
      Other: <Briefcase size={18} className="text-gray-600" />,
    };
    return icons[category] || <Briefcase size={18} className="text-gray-600" />;
  };

  // Function to get skills from job
  const getSkills = () => {
    if (!job) return [];

    // पहले skillsRequired check करो
    if (job.skillsRequired) {
      if (Array.isArray(job.skillsRequired)) {
        return job.skillsRequired;
      }
      if (typeof job.skillsRequired === "string" && job.skillsRequired.trim()) {
        return [job.skillsRequired];
      }
    }

    // फिर skills check करो
    if (job.skills) {
      if (Array.isArray(job.skills)) {
        return job.skills;
      }
      if (typeof job.skills === "string" && job.skills.trim()) {
        return [job.skills];
      }
    }

    return [];
  };

  // Destructure job data with fallbacks
  const {
    title = "Job Title",
    company = "Company",
    location = "Location Not Specified",
    salary = { min: 0, max: 0, currency: "INR" },
    experience = { min: 0, max: 0 },
    jobType = "Full Time",
    workMode = "Office",
    category = "Other",
    description = "",
    responsibilities = [],
    requirements = [],
    benefits = [],
    vacancies = 1,
    deadline = "",
    applyLink = "",
    contactEmail = "",
    contactPhone = "",
    isUrgent = false,
    isFeatured = false,
    totalViews = 0,
    totalApplications = 0,
    createdAt = new Date().toISOString(),
    postedBy = {},
  } = job;

  // Convert strings to arrays if needed
  const responsibilitiesList = Array.isArray(responsibilities)
    ? responsibilities
    : responsibilities && typeof responsibilities === "string"
      ? responsibilities.split("\n").filter((item) => item.trim())
      : [];

  const requirementsList = Array.isArray(requirements)
    ? requirements
    : requirements && typeof requirements === "string"
      ? requirements.split("\n").filter((item) => item.trim())
      : [];

  const benefitsList = Array.isArray(benefits)
    ? benefits
    : benefits && typeof benefits === "string"
      ? benefits.split("\n").filter((item) => item.trim())
      : [];

  // Get skills using the function
  const skills = getSkills();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/jobs")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Jobs</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Share"
              >
                <Share2 size={20} className="text-gray-600" />
              </button>

              <button
                onClick={handleSaveJob}
                className={`p-2 rounded-lg transition ${saved ? "bg-yellow-50 text-yellow-600" : "hover:bg-gray-100 text-gray-600"}`}
                title={saved ? "Remove from saved" : "Save job"}
              >
                <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Briefcase className="w-8 h-8 text-[#0F2A44]" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-orange-400 mb-2">
                        {title}
                      </h1>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Building size={18} className="text-gray-500" />
                          <span className="font-medium text-gray-700">
                            {company}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={18} className="text-gray-500" />
                          <span className="text-gray-600">{location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-blue-100 text-[#0F2A44] rounded-full font-medium flex items-center gap-2">
                      <Clock size={16} />
                      {jobType}
                    </span>
                    <span className="px-4 py-2 bg-orange-100 text-[#0F2A44] rounded-full font-medium flex items-center gap-2">
                      {workMode === "Remote" ? (
                        <Globe size={16} />
                      ) : workMode === "Hybrid" ? (
                        <Home size={16} />
                      ) : (
                        <Building size={16} />
                      )}
                      {workMode}
                    </span>
                    {/* <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium flex items-center gap-2">
                      {getCategoryIcon(category)}
                      {category}
                    </span> */}
                    {isUrgent && (
                      <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-medium flex items-center gap-2">
                        <Zap size={16} />
                        Urgent Hiring
                      </span>
                    )}
                    {isFeatured && (
                      <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-medium flex items-center gap-2">
                        <Award size={16} />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Salary & Apply */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{salary.min} - ₹{salary.max} LPA
                    </p>
                    <p className="text-gray-600 text-sm">Annual Package</p>
                  </div>

                  <button
                    onClick={handleApply}
                    disabled={applying || hasApplied}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      hasApplied
                        ? "bg-[#0F2A44] text-orange-400 cursor-default"
                        : applying
                          ? "bg-[#0F2A44] cursor-not-allowed"
                          : "bg-[#0F2A44] text-white shadow-md"
                    }`}
                  >
                    {hasApplied ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle size={18} />
                        Applied Successfully
                      </span>
                    ) : applying ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Applying...
                      </span>
                    ) : (
                      "Apply Now"
                    )}
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    {totalApplications} applications • {totalViews} views
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users size={18} className="text-blue-600" />
                    <span className="font-bold text-gray-900">{vacancies}</span>
                  </div>
                  <div className="text-sm text-gray-600">Vacancies</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Target size={18} className="text-purple-600" />
                    <span className="font-bold text-gray-900">
                      {experience.min}Year
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Calendar size={18} className="text-green-600" />
                    <span className="font-bold text-gray-900">
                      {deadline ? formatDate(deadline) : "Open"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Deadline</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Eye size={18} className="text-orange-600" />
                    <span className="font-bold text-gray-900">
                      {getDaysAgo(createdAt)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">Posted</div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            {description && (
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Job Description
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>
            )}

            {/* Skills Required */}
            {skills.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-indigo-600" />
                  Required Skills ({skills.length})
                </h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-lg font-medium border border-indigo-100 hover:bg-indigo-100 transition shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {responsibilitiesList.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Layers size={20} className="text-purple-600" />
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {responsibilitiesList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-green-500 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {requirementsList.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserCheck size={20} className="text-red-600" />
                  Requirements & Qualifications
                </h2>
                <ul className="space-y-3">
                  {requirementsList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Target
                        size={18}
                        className="text-red-500 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefitsList.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-yellow-600" />
                  Benefits & Perks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefitsList.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
                    >
                      <Heart size={18} className="text-yellow-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Apply Now Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Apply for this Job
              </h3>

              {applyLink ? (
                <a
                  href={applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2 mb-3"
                >
                  <ExternalLink size={18} />
                  Apply on Company Website
                </a>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={applying || hasApplied}
                  className={`w-full py-3 rounded-lg font-medium transition mb-3 ${
                    hasApplied
                      ? "bg-green-100 text-green-700 cursor-default"
                      : applying
                        ? "bg-[#0F2A44] cursor-not-allowed"
                        : "bg-[#0F2A44] text-white shadow-md"
                  }`}
                >
                  {hasApplied
                    ? "✓ Already Applied"
                    : applying
                      ? "Applying..."
                      : "Quick Apply"}
                </button>
              )}

              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  Applications close:{" "}
                  <span className="font-medium">
                    {deadline ? formatDate(deadline) : "Open until filled"}
                  </span>
                </p>
                <p className="text-gray-600">
                  Total vacancies:{" "}
                  <span className="font-medium">{vacancies}</span>
                </p>
                <p className="text-gray-600">
                  Already applied:{" "}
                  <span className="font-medium">
                    {totalApplications} candidates
                  </span>
                </p>
              </div>
            </div>

            {/* Contact Information */}
            {(contactEmail || contactPhone) && (
              <div className="bg-white rounded-2xl shadow-lg border p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {contactEmail && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail size={18} className="text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">
                          {contactEmail}
                        </p>
                      </div>
                    </div>
                  )}
                  {contactPhone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone size={18} className="text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">
                          {contactPhone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Job Overview */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Job Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Job Type</span>
                  <span className="font-medium  text-black">{jobType}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Work Mode</span>
                  <span className="font-medium text-black">{workMode}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-black">
                    {experience.min} - {experience.max} years
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Salary</span>
                  <span className="font-medium text-black">
                    ₹{salary.min} - ₹{salary.max} LPA
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-black">{category}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium text-black">
                    {getDaysAgo(createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                About Company
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{company}</h4>
                  <p className="text-sm text-gray-600">{location}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                {postedBy && postedBy.name
                  ? `Posted by: ${postedBy.name}`
                  : "Posted by company"}
              </p>
            </div>

            {/* Report Job */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                See something wrong?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                If this job seems fake, misrepresented, or inappropriate, please
                report it.
              </p>
              <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                Report Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Tag({ text, icon, color = "gray" }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    red: "bg-red-100 text-red-700 border-red-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${colorClasses[color]}`}
    >
      {icon}
      {text}
    </span>
  );
}

function Row({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}
