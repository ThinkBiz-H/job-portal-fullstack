// "use client";

// import { useState } from "react";
// import html2pdf from "html2pdf.js";

// export default function ResumeBuilder() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     skills: [],
//     skillInput: "",
//     summary: "",

//     education: [{ degree: "", college: "", year: "" }],
//     experience: [
//       {
//         company: "",
//         role: "",
//         startMonth: "",
//         startYear: "",
//         endMonth: "",
//         endYear: "",
//         isPresent: false,
//         description: "",
//       },
//     ],
//     projects: [{ title: "", description: "" }],
//   });

//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");

//   // handle array changes
//   const handleArrayChange = (section, index, field, value) => {
//     const updated = [...form[section]];
//     updated[index][field] = value;
//     setForm({ ...form, [section]: updated });
//   };
//   const generateProjectPoints = async (index) => {
//     setLoading(true);
//     try {
//       const project = form.projects[index];

//       const res = await fetch("http://localhost:5000/api/ai/project-points", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           projects: project.description,
//           skills: form.skills.join(","),
//         }),
//       });

//       const data = await res.json();

//       const updated = [...form.projects];
//       updated[index].description = data.points;

//       setForm({ ...form, projects: updated });
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const addSkill = () => {
//     const value = form.skillInput.trim();

//     if (!value) return;

//     // 🔥 case-insensitive check
//     if (form.skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
//       return;
//     }

//     setForm({
//       ...form,
//       skills: [...form.skills, value],
//       skillInput: "",
//     });
//   };

//   const removeSkill = (skill) => {
//     setForm({
//       ...form,
//       skills: form.skills.filter((s) => s !== skill),
//     });
//   };
//   const addItem = (section, template) => {
//     setForm({
//       ...form,
//       [section]: [...form[section], template],
//     });
//   };

//   const removeItem = (section, index) => {
//     const updated = [...form[section]];
//     updated.splice(index, 1);
//     setForm({ ...form, [section]: updated });
//   };

//   // AI Summary
//   const generateSummary = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/ai/summary", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           skills: form.skills,
//           education: JSON.stringify(form.education),
//           projects: JSON.stringify(form.projects),
//         }),
//       });

//       const data = await res.json();
//       setForm({ ...form, summary: data.summary });
//     } catch (error) {
//       console.error("AI Error:", error);
//       setForm({
//         ...form,
//         summary:
//           "Failed to generate summary. Please check your backend server.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadPDF = () => {
//     const element = document.getElementById("resume");
//     html2pdf()
//       .set({
//         margin: 0.5,
//         filename: `${form.name || "resume"}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2, letterRendering: true },
//         jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//       })
//       .from(element)
//       .save();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
//       {/* Hero Header */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 PrimeResume
//               </h1>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={generateSummary}
//                 className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="animate-spin h-4 w-4 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Generating...
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 10V3L4 14h7v7l9-11h-7z"
//                       />
//                     </svg>
//                     AI Summary
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={downloadPDF}
//                 className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* LEFT SIDE - FORM with TABS */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//             {/* Tabs */}
//             <div className="flex border-b border-gray-200 bg-gray-50/80">
//               {[
//                 {
//                   id: "basic",
//                   label: "Basic Info",
//                   icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
//                 },
//                 {
//                   id: "education",
//                   label: "Education",
//                   icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
//                 },
//                 {
//                   id: "experience",
//                   label: "Experience",
//                   icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//                 },
//                 {
//                   id: "projects",
//                   label: "Projects",
//                   icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
//                 },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
//                     activeTab === tab.id
//                       ? "bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                   }`}
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d={tab.icon}
//                     />
//                   </svg>
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <div className="p-6 overflow-y-auto max-h-[70vh]">
//               {/* Basic Info Tab */}
//               {activeTab === "basic" && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John Doe"
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       onChange={(e) =>
//                         setForm({ ...form, name: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="john@example.com"
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       onChange={(e) =>
//                         setForm({ ...form, email: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       placeholder="+1 234 567 8900"
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       onChange={(e) =>
//                         setForm({ ...form, phone: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">
//                       Skills (comma separated)
//                     </label>
//                     <input
//                       value={form.skillInput}
//                       onChange={(e) =>
//                         setForm({ ...form, skillInput: e.target.value })
//                       }
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           e.preventDefault(); // 🔥 ye important hai
//                           addSkill();
//                         }
//                       }}
//                       placeholder="Type skill and press Enter"
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-xl"
//                     />

//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {form.skills.map((skill, i) => (
//                         <span
//                           key={i}
//                           onClick={() => removeSkill(skill)}
//                           className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer"
//                         >
//                           {skill} ❌
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   {form.summary && (
//                     <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                       <label className="block text-sm font-semibold text-blue-800 mb-1">
//                         ✨ AI Generated Summary
//                       </label>
//                       <p className="text-gray-700 text-sm">{form.summary}</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Education Tab */}
//               {activeTab === "education" && (
//                 <div className="space-y-4">
//                   {form.education.map((edu, i) => (
//                     <div
//                       key={i}
//                       className="relative p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:shadow-md transition-all"
//                     >
//                       <button
//                         onClick={() => removeItem("education", i)}
//                         className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition"
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                       </button>
//                       <input
//                         placeholder="Degree (e.g., B.Tech Computer Science)"
//                         className="w-full mb-2 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "education",
//                             i,
//                             "degree",
//                             e.target.value,
//                           )
//                         }
//                       />
//                       <input
//                         placeholder="College / University"
//                         className="w-full mb-2 px-3 py-2 border border-gray-200 rounded-lg"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "education",
//                             i,
//                             "college",
//                             e.target.value,
//                           )
//                         }
//                       />
//                       <input
//                         placeholder="Year (e.g., 2020-2024)"
//                         className="w-full px-3 py-2 border border-gray-200 rounded-lg"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "education",
//                             i,
//                             "year",
//                             e.target.value,
//                           )
//                         }
//                       />
//                     </div>
//                   ))}
//                   <button
//                     onClick={() =>
//                       addItem("education", {
//                         degree: "",
//                         college: "",
//                         year: "",
//                       })
//                     }
//                     className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 4v16m8-8H4"
//                       />
//                     </svg>
//                     Add Education
//                   </button>
//                 </div>
//               )}

//               {/* Experience Tab */}
//               {activeTab === "experience" && (
//                 <div className="space-y-4">
//                   {form.experience.map((exp, i) => (
//                     <div
//                       key={i}
//                       className="relative p-4 border border-gray-200 rounded-xl bg-gray-50/50"
//                     >
//                       <button
//                         onClick={() => removeItem("experience", i)}
//                         className="absolute top-2 right-2 text-red-400 hover:text-red-600"
//                       >
//                         ❌
//                       </button>

//                       <input
//                         placeholder="Company Name"
//                         className="w-full mb-2 px-3 py-2 border rounded-lg"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "experience",
//                             i,
//                             "company",
//                             e.target.value,
//                           )
//                         }
//                       />

//                       <input
//                         placeholder="Role / Title"
//                         className="w-full mb-2 px-3 py-2 border rounded-lg"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "experience",
//                             i,
//                             "role",
//                             e.target.value,
//                           )
//                         }
//                       />

//                       {/* 🔥 START DATE */}
//                       <div className="flex gap-2 mb-2">
//                         <select
//                           className="w-1/2 p-2 border rounded-lg"
//                           onChange={(e) =>
//                             handleArrayChange(
//                               "experience",
//                               i,
//                               "startMonth",
//                               e.target.value,
//                             )
//                           }
//                         >
//                           <option value="">Start Month</option>
//                           {[
//                             "Jan",
//                             "Feb",
//                             "Mar",
//                             "Apr",
//                             "May",
//                             "Jun",
//                             "Jul",
//                             "Aug",
//                             "Sep",
//                             "Oct",
//                             "Nov",
//                             "Dec",
//                           ].map((m) => (
//                             <option key={m}>{m}</option>
//                           ))}
//                         </select>

//                         <input
//                           type="number"
//                           placeholder="Start Year"
//                           className="w-1/2 p-2 border rounded-lg"
//                           onChange={(e) =>
//                             handleArrayChange(
//                               "experience",
//                               i,
//                               "startYear",
//                               e.target.value,
//                             )
//                           }
//                         />
//                       </div>

//                       {/* 🔥 PRESENT CHECKBOX */}
//                       <div className="flex items-center gap-2 mb-2">
//                         <input
//                           type="checkbox"
//                           checked={exp.isPresent}
//                           onChange={(e) =>
//                             handleArrayChange(
//                               "experience",
//                               i,
//                               "isPresent",
//                               e.target.checked,
//                             )
//                           }
//                         />
//                         <label>Currently Working (Present)</label>
//                       </div>

//                       {/* 🔥 END DATE (hide if present) */}
//                       {!exp.isPresent && (
//                         <div className="flex gap-2 mb-2">
//                           <select
//                             className="w-1/2 p-2 border rounded-lg"
//                             onChange={(e) =>
//                               handleArrayChange(
//                                 "experience",
//                                 i,
//                                 "endMonth",
//                                 e.target.value,
//                               )
//                             }
//                           >
//                             <option value="">End Month</option>
//                             {[
//                               "Jan",
//                               "Feb",
//                               "Mar",
//                               "Apr",
//                               "May",
//                               "Jun",
//                               "Jul",
//                               "Aug",
//                               "Sep",
//                               "Oct",
//                               "Nov",
//                               "Dec",
//                             ].map((m) => (
//                               <option key={m}>{m}</option>
//                             ))}
//                           </select>

//                           <input
//                             type="number"
//                             placeholder="End Year"
//                             className="w-1/2 p-2 border rounded-lg"
//                             onChange={(e) =>
//                               handleArrayChange(
//                                 "experience",
//                                 i,
//                                 "endYear",
//                                 e.target.value,
//                               )
//                             }
//                           />
//                         </div>
//                       )}

//                       <textarea
//                         rows={2}
//                         placeholder="Work description..."
//                         className="w-full px-3 py-2 border rounded-lg"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "experience",
//                             i,
//                             "description",
//                             e.target.value,
//                           )
//                         }
//                       />
//                     </div>
//                   ))}

//                   <button
//                     onClick={() =>
//                       addItem("experience", {
//                         company: "",
//                         role: "",
//                         startMonth: "",
//                         startYear: "",
//                         endMonth: "",
//                         endYear: "",
//                         isPresent: false,
//                         description: "",
//                       })
//                     }
//                     className="w-full py-3 border-2 border-dashed rounded-xl"
//                   >
//                     + Add Experience
//                   </button>
//                 </div>
//               )}

//               {/* Projects Tab */}
//               {activeTab === "projects" && (
//                 <div className="space-y-4">
//                   {form.projects.map((proj, i) => (
//                     <div
//                       key={i}
//                       className="relative p-4 border border-gray-200 rounded-xl bg-gray-50/50"
//                     >
//                       <button
//                         onClick={() => removeItem("projects", i)}
//                         className="absolute top-2 right-2 text-red-400 hover:text-red-600"
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                       </button>
//                       <input
//                         placeholder="Project Title"
//                         className="w-full mb-2 px-3 py-2 border border-gray-200 rounded-lg"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "projects",
//                             i,
//                             "title",
//                             e.target.value,
//                           )
//                         }
//                       />
//                       <textarea
//                         rows={2}
//                         placeholder="Project description, tech stack, impact..."
//                         className="w-full px-3 py-2 border border-gray-200 rounded-lg"
//                         onChange={(e) =>
//                           handleArrayChange(
//                             "projects",
//                             i,
//                             "description",
//                             e.target.value,
//                           )
//                         }
//                       />
//                       <button
//                         onClick={() => generateProjectPoints(i)}
//                         className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm"
//                       >
//                         ⚡ Generate Points
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() =>
//                       addItem("projects", { title: "", description: "" })
//                     }
//                     className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 4v16m8-8H4"
//                       />
//                     </svg>
//                     Add Project
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT SIDE - RESUME PREVIEW (PRIME DESIGN) */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-24">
//             <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5 text-indigo-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//                 Live Preview
//               </h2>
//             </div>
//             <div className="p-6 overflow-y-auto max-h-[80vh] bg-white">
//               <div id="resume" className="prose max-w-none">
//                 {/* Header */}
//                 <div className="border-b-4 border-indigo-600 pb-4 mb-4">
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     {form.name || "Your Name"}
//                   </h1>
//                   <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
//                     {form.email && (
//                       <span className="flex items-center gap-1">
//                         📧 {form.email}
//                       </span>
//                     )}
//                     {form.phone && (
//                       <span className="flex items-center gap-1">
//                         📞 {form.phone}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* AI Summary */}
//                 {form.summary && (
//                   <div className="mb-5 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border-l-4 border-indigo-500">
//                     <p className="text-gray-700 text-sm leading-relaxed">
//                       {form.summary}
//                     </p>
//                   </div>
//                 )}

//                 {/* Skills */}
//                 {form.skills && (
//                   <div className="mb-5">
//                     <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
//                       <span className="w-1 h-5 bg-indigo-600 rounded-full"></span>
//                       Technical Skills
//                     </h2>
//                     <div className="flex flex-wrap gap-2">
//                       {form.skills.map((s, i) => (
//                         <span
//                           key={i}
//                           className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
//                         >
//                           {s.trim()}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Education */}
//                 {form.education.some((e) => e.degree || e.college) && (
//                   <div className="mb-5">
//                     <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <span className="w-1 h-5 bg-indigo-600 rounded-full"></span>
//                       Education
//                     </h2>
//                     <div className="space-y-2">
//                       {form.education.map((e, i) =>
//                         e.degree || e.college ? (
//                           <div
//                             key={i}
//                             className="border-l-2 border-gray-200 pl-3"
//                           >
//                             <p className="font-semibold text-gray-800">
//                               {e.degree || "Degree"}
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               {e.college} {e.year && `• ${e.year}`}
//                             </p>
//                           </div>
//                         ) : null,
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Experience */}
//                 {form.experience.some((e) => e.company || e.role) && (
//                   <div className="mb-5">
//                     <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <span className="w-1 h-5 bg-indigo-600 rounded-full"></span>
//                       Work Experience
//                     </h2>
//                     <div className="space-y-3">
//                       {form.experience.map((e, i) =>
//                         e.company || e.role ? (
//                           <div
//                             key={i}
//                             className="border-l-2 border-gray-200 pl-3"
//                           >
//                             <p className="font-semibold text-gray-800">
//                               {e.role || "Role"} {e.company && `@ ${e.company}`}
//                             </p>
//                             {(e.startMonth || e.startYear) && (
//                               <p className="text-xs text-gray-500">
//                                 {e.startMonth} {e.startYear} -{" "}
//                                 {e.isPresent
//                                   ? "Present"
//                                   : `${e.endMonth || ""} ${e.endYear || ""}`}
//                               </p>
//                             )}
//                             {e.description && (
//                               <p className="text-sm text-gray-600 mt-1">
//                                 {e.description}
//                               </p>
//                             )}
//                           </div>
//                         ) : null,
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Projects */}
//                 {form.projects.some((p) => p.title) && (
//                   <div className="mb-5">
//                     <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <span className="w-1 h-5 bg-indigo-600 rounded-full"></span>
//                       Projects
//                     </h2>
//                     <div className="space-y-3">
//                       {form.projects.map((p, i) =>
//                         p.title ? (
//                           <div
//                             key={i}
//                             className="border-l-2 border-gray-200 pl-3"
//                           >
//                             <p className="font-semibold text-gray-800">
//                               {p.title}
//                             </p>
//                             {p.description && (
//                               <ul className="text-sm text-gray-600 mt-1 list-disc ml-5">
//                                 {p.description.split("\n").map((line, i) => (
//                                   <li key={i}>{line}</li>
//                                 ))}
//                               </ul>
//                             )}
//                           </div>
//                         ) : null,
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    skillInput: "",
    summary: "",

    education: [{ degree: "", college: "", year: "" }],
    experience: [
      {
        company: "",
        role: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        isPresent: false,
        description: "",
      },
    ],
    projects: [{ title: "", description: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...form[section]];
    updated[index][field] = value;
    setForm({ ...form, [section]: updated });
  };

  const generateProjectPoints = async (index) => {
    setLoading(true);
    try {
      const project = form.projects[index];
      const res = await fetch("http://localhost:5000/api/ai/project-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: project.description,
          skills: form.skills.join(","),
        }),
      });
      const data = await res.json();
      const updated = [...form.projects];
      updated[index].description = data.points;
      setForm({ ...form, projects: updated });
      showToast("✨ Project points generated!", "success");
    } catch (err) {
      console.log(err);
      showToast("Failed to generate points", "error");
    } finally {
      setLoading(false);
    }
  };

  const addSkill = () => {
    const value = form.skillInput.trim();
    if (!value) return;
    if (form.skills.some((s) => s.toLowerCase() === value.toLowerCase())) {
      showToast("Skill already exists!", "error");
      return;
    }
    setForm({
      ...form,
      skills: [...form.skills, value],
      skillInput: "",
    });
    showToast(`✓ ${value} added`, "success");
  };

  const removeSkill = (skill) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skill),
    });
    showToast(`✗ ${skill} removed`, "info");
  };

  const addItem = (section, template) => {
    setForm({
      ...form,
      [section]: [...form[section], template],
    });
    showToast(`+ New ${section.slice(0, -1)} added`, "success");
  };

  const removeItem = (section, index) => {
    const updated = [...form[section]];
    updated.splice(index, 1);
    setForm({ ...form, [section]: updated });
    showToast(`- ${section.slice(0, -1)} removed`, "info");
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: form.skills,
          education: JSON.stringify(form.education),
          projects: JSON.stringify(form.projects),
        }),
      });
      const data = await res.json();
      setForm({ ...form, summary: data.summary });
      showToast("🎯 AI Summary generated!", "success");
    } catch (error) {
      console.error("AI Error:", error);
      setForm({
        ...form,
        summary:
          "Failed to generate summary. Please check your backend server.",
      });
      showToast("AI Summary failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume");
    html2pdf()
      .set({
        margin: 0.5,
        filename: `${form.name || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
    showToast("📄 PDF downloaded!", "success");
  };

  const tabs = [
    {
      id: "basic",
      label: "Basic",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    { id: "education", label: "Edu", icon: "M12 14l9-5-9-5-9 5 9 5z" },
    {
      id: "experience",
      label: "Work",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      id: "projects",
      label: "Proj",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Toast Notification - Responsive */}
      {toast.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm md:max-w-md animate-in slide-in-from-top-2 fade-in duration-300">
          <div
            className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 justify-center ${
              toast.type === "success"
                ? "bg-emerald-500"
                : toast.type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
            } text-white font-medium text-sm`}
          >
            {toast.type === "success" && "✅"}
            {toast.type === "error" && "❌"}
            {toast.type === "info" && "ℹ️"}
            <span className="truncate">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header - Fully Responsive */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  PrimeResume
                </h1>
                <p className="text-[10px] sm:text-xs text-purple-300/70 hidden sm:block">
                  AI Powered Resume Builder
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <button
                onClick={generateSummary}
                disabled={loading}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl transition-all flex items-center gap-1 sm:gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-3 w-3 sm:h-4 sm:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                )}
                <span className="hidden sm:inline">
                  {loading ? "AI..." : "AI Summary"}
                </span>
                <span className="sm:hidden">{loading ? "AI" : "AI"}</span>
              </button>
              <button
                onClick={downloadPDF}
                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl transition-all flex items-center gap-1 sm:gap-2"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Tab Switcher */}
        {isMobile && (
          <div className="flex gap-1 mb-4 bg-white/10 rounded-xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* LEFT SIDE - GLASS FORM */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden order-1 lg:order-none">
            {/* Desktop Tabs */}
            {!isMobile && (
              <div className="flex border-b border-white/10 bg-black/20 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white border-b-2 border-purple-500 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={tab.icon}
                      />
                    </svg>
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Tab Content - Responsive Scroll */}
            <div className="p-3 sm:p-5 md:p-6 overflow-y-auto max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] custom-scroll">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-purple-200 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-purple-200 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-purple-200 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-purple-200 mb-1">
                      Skills
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={form.skillInput}
                        onChange={(e) =>
                          setForm({ ...form, skillInput: e.target.value })
                        }
                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        placeholder="Type skill and press Enter"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm placeholder-gray-400"
                      />
                      <button
                        onClick={addSkill}
                        className="px-3 sm:px-4 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg sm:rounded-xl text-white text-sm font-medium transition"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {form.skills.map((skill, i) => (
                        <span
                          key={i}
                          onClick={() => removeSkill(skill)}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm cursor-pointer hover:scale-105 transition-all"
                        >
                          {skill} ✕
                        </span>
                      ))}
                    </div>
                  </div>
                  {form.summary && (
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl border border-purple-500/50">
                      <label className="block text-xs sm:text-sm font-semibold text-purple-200 mb-1">
                        ✨ AI Summary
                      </label>
                      <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                        {form.summary}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <div className="space-y-3 sm:space-y-4">
                  {form.education.map((edu, i) => (
                    <div
                      key={i}
                      className="relative p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <button
                        onClick={() => removeItem("education", i)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs sm:text-sm"
                      >
                        ✕
                      </button>
                      <input
                        placeholder="Degree"
                        className="w-full mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            i,
                            "degree",
                            e.target.value,
                          )
                        }
                      />
                      <input
                        placeholder="College"
                        className="w-full mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            i,
                            "college",
                            e.target.value,
                          )
                        }
                      />
                      <input
                        placeholder="Year"
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            i,
                            "year",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addItem("education", {
                        degree: "",
                        college: "",
                        year: "",
                      })
                    }
                    className="w-full py-2 sm:py-3 border-2 border-dashed border-white/30 rounded-xl text-purple-300 text-sm hover:border-purple-500 transition-all flex items-center justify-center gap-2"
                  >
                    + Add Education
                  </button>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <div className="space-y-3 sm:space-y-4">
                  {form.experience.map((exp, i) => (
                    <div
                      key={i}
                      className="relative p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <button
                        onClick={() => removeItem("experience", i)}
                        className="absolute top-2 right-2 text-red-400 text-xs sm:text-sm"
                      >
                        ✕
                      </button>
                      <input
                        placeholder="Company"
                        className="w-full mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            i,
                            "company",
                            e.target.value,
                          )
                        }
                      />
                      <input
                        placeholder="Role"
                        className="w-full mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            i,
                            "role",
                            e.target.value,
                          )
                        }
                      />
                      <div className="flex gap-2 mb-2">
                        <select
                          className="flex-1 p-1.5 sm:p-2 bg-white/10 rounded-lg text-white text-xs sm:text-sm"
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              i,
                              "startMonth",
                              e.target.value,
                            )
                          }
                        >
                          <option value="">Start Month</option>
                          {[
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ].map((m) => (
                            <option key={m}>{m}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder="Year"
                          className="w-20 sm:w-24 p-1.5 sm:p-2 bg-white/10 rounded-lg text-white text-sm"
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              i,
                              "startYear",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <label className="flex items-center gap-2 mb-2 text-white text-xs sm:text-sm">
                        <input
                          type="checkbox"
                          checked={exp.isPresent}
                          onChange={(e) =>
                            handleArrayChange(
                              "experience",
                              i,
                              "isPresent",
                              e.target.checked,
                            )
                          }
                        />
                        Currently Working
                      </label>
                      {!exp.isPresent && (
                        <div className="flex gap-2 mb-2">
                          <select
                            className="flex-1 p-1.5 sm:p-2 bg-white/10 rounded-lg text-white text-xs sm:text-sm"
                            onChange={(e) =>
                              handleArrayChange(
                                "experience",
                                i,
                                "endMonth",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">End Month</option>
                            {[
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ].map((m) => (
                              <option key={m}>{m}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            placeholder="Year"
                            className="w-20 sm:w-24 p-1.5 sm:p-2 bg-white/10 rounded-lg text-white text-sm"
                            onChange={(e) =>
                              handleArrayChange(
                                "experience",
                                i,
                                "endYear",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      )}
                      <textarea
                        rows={2}
                        placeholder="Description"
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            i,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addItem("experience", {
                        company: "",
                        role: "",
                        startMonth: "",
                        startYear: "",
                        endMonth: "",
                        endYear: "",
                        isPresent: false,
                        description: "",
                      })
                    }
                    className="w-full py-2 sm:py-3 border-2 border-dashed border-white/30 rounded-xl text-purple-300 text-sm hover:border-purple-500 transition-all"
                  >
                    + Add Experience
                  </button>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <div className="space-y-3 sm:space-y-4">
                  {form.projects.map((proj, i) => (
                    <div
                      key={i}
                      className="relative p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <button
                        onClick={() => removeItem("projects", i)}
                        className="absolute top-2 right-2 text-red-400 text-xs sm:text-sm"
                      >
                        ✕
                      </button>
                      <input
                        placeholder="Project Title"
                        className="w-full mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            i,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                      <textarea
                        rows={3}
                        placeholder="Description"
                        className="w-full mb-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 rounded-lg text-white text-sm"
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            i,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                      <button
                        onClick={() => generateProjectPoints(i)}
                        className="w-full py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg rounded-lg text-xs sm:text-sm text-white transition-all"
                      >
                        ⚡ AI Generate Points
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addItem("projects", { title: "", description: "" })
                    }
                    className="w-full py-2 sm:py-3 border-2 border-dashed border-white/30 rounded-xl text-purple-300 text-sm hover:border-purple-500 transition-all"
                  >
                    + Add Project
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - RESUME PREVIEW - Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden sticky top-20 sm:top-24 border border-gray-200 order-2 lg:order-none">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Live Preview
              </h2>
            </div>
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[60vh] sm:max-h-[70vh] bg-white custom-scroll">
              <div id="resume">
                <div className="border-b-3 sm:border-b-4 border-purple-600 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
                    {form.name || "Your Name"}
                  </h1>
                  <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                    {form.email && (
                      <span className="break-all">📧 {form.email}</span>
                    )}
                    {form.phone && <span>📞 {form.phone}</span>}
                  </div>
                </div>
                {form.summary && (
                  <div className="mb-4 sm:mb-5 bg-purple-50 p-3 sm:p-4 rounded-xl border-l-4 border-purple-600">
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                      {form.summary}
                    </p>
                  </div>
                )}
                {form.skills.length > 0 && (
                  <div className="mb-4 sm:mb-5">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {form.skills.map((s, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm"
                        >
                          ⚡ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {form.education.some((e) => e.degree) && (
                  <div className="mb-4 sm:mb-5">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Education
                    </h2>
                    {form.education.map(
                      (e, i) =>
                        e.degree && (
                          <div key={i} className="mb-2">
                            <p className="font-semibold text-sm sm:text-base">
                              {e.degree}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm">
                              {e.college} {e.year}
                            </p>
                          </div>
                        ),
                    )}
                  </div>
                )}
                {form.experience.some((e) => e.company) && (
                  <div className="mb-4 sm:mb-5">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Experience
                    </h2>
                    {form.experience.map(
                      (e, i) =>
                        e.company && (
                          <div key={i} className="mb-3">
                            <p className="font-semibold text-sm sm:text-base">
                              {e.role} @ {e.company}
                            </p>
                            <p className="text-xs text-gray-500">
                              {e.startMonth} {e.startYear} -{" "}
                              {e.isPresent
                                ? "Present"
                                : `${e.endMonth} ${e.endYear}`}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm mt-1">
                              {e.description}
                            </p>
                          </div>
                        ),
                    )}
                  </div>
                )}
                {form.projects.some((p) => p.title) && (
                  <div className="mb-4 sm:mb-5">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Projects
                    </h2>
                    {form.projects.map(
                      (p, i) =>
                        p.title && (
                          <div key={i} className="mb-3">
                            <p className="font-semibold text-sm sm:text-base">
                              {p.title}
                            </p>
                            <div className="text-gray-600 text-xs sm:text-sm whitespace-pre-wrap">
                              {p.description}
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-top 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
  





























