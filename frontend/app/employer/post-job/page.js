// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function PostJobPage() {
// //   const router = useRouter();

// //   const [form, setForm] = useState({
// //     title: "",
// //     company: "",
// //     location: "",
// //     salary: "",
// //     type: "Full time",
// //     mode: "Work from office",
// //     exp: "",
// //     description: "",
// //   });

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // 🔥 Abhi demo alert (baad me API lagegi)
// //     alert("✅ Job Posted Successfully!");

// //     console.log("JOB DATA:", form);

// //     // Redirect to dashboard
// //     router.push("/employer/dashboard");
// //   };

// //   return (
// //     <section className="bg-gray-100 min-h-screen p-6 text-black">
// //       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
// //         {/* HEADER */}
// //         <h1 className="text-2xl font-bold mb-2">Post New Job</h1>
// //         <p className="text-gray-500 text-sm mb-6">
// //           Fill details to publish a job
// //         </p>

// //         {/* FORM */}
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {/* JOB TITLE */}
// //           <Input
// //             label="Job Title"
// //             name="title"
// //             value={form.title}
// //             onChange={handleChange}
// //             placeholder="Frontend Developer"
// //           />

// //           {/* COMPANY */}
// //           <Input
// //             label="Company Name"
// //             name="company"
// //             value={form.company}
// //             onChange={handleChange}
// //             placeholder="Infosys Pvt Ltd"
// //           />

// //           {/* LOCATION */}
// //           <Input
// //             label="Location"
// //             name="location"
// //             value={form.location}
// //             onChange={handleChange}
// //             placeholder="Delhi / Noida"
// //           />

// //           {/* SALARY */}
// //           <Input
// //             label="Salary (per month)"
// //             name="salary"
// //             value={form.salary}
// //             onChange={handleChange}
// //             placeholder="25000"
// //             type="number"
// //           />

// //           {/* EXPERIENCE */}
// //           <Input
// //             label="Experience Required"
// //             name="exp"
// //             value={form.exp}
// //             onChange={handleChange}
// //             placeholder="2 Years"
// //           />

// //           {/* WORK TYPE */}
// //           <Select
// //             label="Job Type"
// //             name="type"
// //             value={form.type}
// //             onChange={handleChange}
// //             options={["Full time", "Part time", "Internship"]}
// //           />

// //           {/* WORK MODE */}
// //           <Select
// //             label="Work Mode"
// //             name="mode"
// //             value={form.mode}
// //             onChange={handleChange}
// //             options={["Work from office", "Work from home", "Work from field"]}
// //           />

// //           {/* DESCRIPTION */}
// //           <div>
// //             <p className="text-sm mb-1">Job Description</p>

// //             <textarea
// //               name="description"
// //               value={form.description}
// //               onChange={handleChange}
// //               rows="4"
// //               placeholder="Write job details..."
// //               className="w-full border rounded px-3 py-2 outline-none"
// //             />
// //           </div>

// //           {/* BUTTONS */}
// //           <div className="flex gap-3 pt-4">
// //             <button
// //               type="submit"
// //               className="bg-green-600 text-white px-6 py-2 rounded-lg"
// //             >
// //               Publish Job
// //             </button>

// //             <button
// //               type="button"
// //               onClick={() => router.back()}
// //               className="border px-6 py-2 rounded-lg"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ================= SMALL COMPONENTS ================= */

// // function Input({ label, ...props }) {
// //   return (
// //     <div>
// //       <p className="text-sm mb-1">{label}</p>

// //       <input
// //         {...props}
// //         required
// //         className="w-full border rounded px-3 py-2 outline-none"
// //       />
// //     </div>
// //   );
// // }

// // function Select({ label, options, ...props }) {
// //   return (
// //     <div>
// //       <p className="text-sm mb-1">{label}</p>

// //       <select
// //         {...props}
// //         className="w-full border rounded px-3 py-2 outline-none"
// //       >
// //         {options.map((item) => (
// //           <option key={item}>{item}</option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   Briefcase,
//   Building,
//   MapPin,
//   DollarSign,
//   Clock,
//   FileText,
//   Globe,
//   TrendingUp,
//   Sparkles,
//   Upload,
//   AlertCircle,
//   CheckCircle2,
// } from "lucide-react";

// export default function PostJobPage() {
//   const router = useRouter();

//   // Form state - Abhi hardcoded, baad me backend se company details fetch honge
//   const [form, setForm] = useState({
//     title: "",
//     company: "TechCorp Pvt Ltd", // Baad me user profile se auto fill hoga
//     location: "",
//     salaryMin: "",
//     salaryMax: "",
//     type: "Full-time",
//     workMode: "Hybrid",
//     experienceMin: "",
//     experienceMax: "",
//     description: "",
//     skills: "",
//     benefits: "",
//     deadline: "",
//     vacancies: "1",
//   });

//   const [loading, setLoading] = useState(false);
//   const [activeStep, setActiveStep] = useState(1);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const addSkill = (skill) => {
//     const skillsArray = form.skills.split(",").filter((s) => s.trim());
//     if (skill && !skillsArray.includes(skill.trim())) {
//       setForm((prev) => ({
//         ...prev,
//         skills: [...skillsArray, skill.trim()].join(", "),
//       }));
//     }
//   };

//   const removeSkill = (skillToRemove) => {
//     const skillsArray = form.skills.split(",").filter((s) => s.trim());
//     setForm((prev) => ({
//       ...prev,
//       skills: skillsArray.filter((skill) => skill !== skillToRemove).join(", "),
//     }));
//   };

//   const validateStep1 = () => {
//     const newErrors = {};
//     if (!form.title.trim()) newErrors.title = "Job title is required";
//     if (!form.location.trim()) newErrors.location = "Location is required";
//     if (!form.description.trim())
//       newErrors.description = "Job description is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (activeStep === 1 && !validateStep1()) return;
//     setActiveStep((prev) => Math.min(prev + 1, 3));
//   };

//   const prevStep = () => {
//     setActiveStep((prev) => Math.max(prev - 1, 1));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // 🔥 Yaha pe baad me API call hoga
//     // try {
//     //   const response = await fetch('/api/employer/jobs', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(form)
//     //   });
//     //
//     //   if (response.ok) {
//     //     router.push('/employer/dashboard');
//     //   }
//     // } catch (error) {
//     //   console.error('Error posting job:', error);
//     // } finally {
//     //   setLoading(false);
//     // }

//     // 🔥 For now, demo simulation
//     setTimeout(() => {
//       setLoading(false);
//       alert("🎉 Job Posted Successfully!");
//       router.push("/employer/dashboard");
//     }, 1500);
//   };

//   const jobTypes = [
//     { value: "Full-time", label: "Full Time", icon: <Clock size={16} /> },
//     { value: "Part-time", label: "Part Time", icon: <Clock size={16} /> },
//     { value: "Contract", label: "Contract", icon: <FileText size={16} /> },
//     {
//       value: "Internship",
//       label: "Internship",
//       icon: <TrendingUp size={16} />,
//     },
//     { value: "Remote", label: "Remote", icon: <Globe size={16} /> },
//   ];

//   const workModes = [
//     { value: "On-site", label: "On-site" },
//     { value: "Hybrid", label: "Hybrid" },
//     { value: "Remote", label: "Remote" },
//   ];

//   const experienceOptions = [
//     "Fresher",
//     "0-1 Years",
//     "1-2 Years",
//     "2-5 Years",
//     "5-8 Years",
//     "8+ Years",
//     "10+ Years",
//   ];

//   const salaryRanges = [
//     "₹0-3 LPA",
//     "₹3-6 LPA",
//     "₹6-10 LPA",
//     "₹10-15 LPA",
//     "₹15-25 LPA",
//     "₹25-50 LPA",
//     "₹50+ LPA",
//   ];

//   return (
//     <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* HEADER */}
//         <div className="mb-8">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 group"
//           >
//             <ArrowLeft
//               size={20}
//               className="group-hover:-translate-x-1 transition-transform"
//             />
//             <span>Back to Dashboard</span>
//           </button>

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 <Sparkles className="text-yellow-500" size={24} />
//                 Post a New Job Opening
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Fill in the details below to attract the best talent
//               </p>
//             </div>

//             <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 1 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
//               >
//                 1
//               </div>
//               <div className="h-1 w-8 bg-gray-200"></div>
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 2 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
//               >
//                 2
//               </div>
//               <div className="h-1 w-8 bg-gray-200"></div>
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= 3 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
//               >
//                 3
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FORM */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           <form onSubmit={handleSubmit} className="p-6 md:p-8">
//             {/* STEP 1: Basic Information */}
//             {activeStep === 1 && (
//               <div className="space-y-6 animate-fadeIn">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <Briefcase className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Basic Job Information
//                   </h2>
//                 </div>

//                 {/* Job Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Job Title *
//                   </label>
//                   <div className="relative">
//                     <Briefcase
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={20}
//                     />
//                     <input
//                       type="text"
//                       name="title"
//                       value={form.title}
//                       onChange={handleChange}
//                       placeholder="e.g., Senior Frontend Developer"
//                       className={`w-full pl-10 pr-4 py-3 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
//                     />
//                   </div>
//                   {errors.title && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.title}
//                     </p>
//                   )}
//                 </div>

//                 {/* Company & Location */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Company *
//                     </label>
//                     <div className="relative">
//                       <Building
//                         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                         size={20}
//                       />
//                       <input
//                         type="text"
//                         name="company"
//                         value={form.company}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
//                         readOnly
//                       />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Auto-filled from your profile
//                     </p>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Location *
//                     </label>
//                     <div className="relative">
//                       <MapPin
//                         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                         size={20}
//                       />
//                       <input
//                         type="text"
//                         name="location"
//                         value={form.location}
//                         onChange={handleChange}
//                         placeholder="e.g., Bangalore, Karnataka"
//                         className={`w-full pl-10 pr-4 py-3 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
//                       />
//                     </div>
//                     {errors.location && (
//                       <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                         <AlertCircle size={14} />
//                         {errors.location}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Job Type & Work Mode */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Job Type
//                     </label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {jobTypes.map((type) => (
//                         <button
//                           key={type.value}
//                           type="button"
//                           onClick={() =>
//                             setForm((prev) => ({ ...prev, type: type.value }))
//                           }
//                           className={`p-3 rounded-lg border ${form.type === type.value ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 hover:border-gray-300"} transition flex items-center justify-center gap-2`}
//                         >
//                           {type.icon}
//                           <span>{type.label}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Work Mode
//                     </label>
//                     <div className="flex gap-2">
//                       {workModes.map((mode) => (
//                         <button
//                           key={mode.value}
//                           type="button"
//                           onClick={() =>
//                             setForm((prev) => ({
//                               ...prev,
//                               workMode: mode.value,
//                             }))
//                           }
//                           className={`flex-1 py-3 rounded-lg border ${form.workMode === mode.value ? "border-green-500 bg-green-50 text-green-600" : "border-gray-200 hover:border-gray-300"} transition`}
//                         >
//                           {mode.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Job Description */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Job Description *
//                   </label>
//                   <div
//                     className={`border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-xl overflow-hidden`}
//                   >
//                     <textarea
//                       name="description"
//                       value={form.description}
//                       onChange={handleChange}
//                       rows={6}
//                       placeholder="Describe the job responsibilities, requirements, and expectations..."
//                       className="w-full p-4 outline-none resize-none"
//                     />
//                     <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
//                       <div className="flex justify-between">
//                         <span>Markdown supported</span>
//                         <span>{form.description.length}/5000 characters</span>
//                       </div>
//                     </div>
//                   </div>
//                   {errors.description && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle size={14} />
//                       {errors.description}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* STEP 2: Requirements & Compensation */}
//             {activeStep === 2 && (
//               <div className="space-y-6 animate-fadeIn">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-purple-100 rounded-lg">
//                     <TrendingUp className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Requirements & Compensation
//                   </h2>
//                 </div>

//                 {/* Experience */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Experience Required
//                   </label>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                     {experienceOptions.map((exp) => (
//                       <button
//                         key={exp}
//                         type="button"
//                         onClick={() => {
//                           if (exp === "Fresher") {
//                             setForm((prev) => ({
//                               ...prev,
//                               experienceMin: "0",
//                               experienceMax: "0",
//                             }));
//                           } else {
//                             const [min, max] = exp
//                               .split("-")[0]
//                               .split("+")[0]
//                               .split("-")[0];
//                             setForm((prev) => ({
//                               ...prev,
//                               experienceMin: min.trim(),
//                               experienceMax: max ? max.trim() : "15",
//                             }));
//                           }
//                         }}
//                         className={`p-3 rounded-lg border ${form.experienceMin && exp.includes(form.experienceMin) ? "border-purple-500 bg-purple-50 text-purple-600" : "border-gray-200 hover:border-gray-300"} transition`}
//                       >
//                         {exp}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Skills */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Required Skills
//                   </label>
//                   <div className="flex gap-2 mb-3">
//                     <input
//                       type="text"
//                       placeholder="Add a skill (e.g., React, Node.js)"
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           e.preventDefault();
//                           addSkill(e.target.value);
//                           e.target.value = "";
//                         }
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         const input = e.target.previousElementSibling;
//                         addSkill(input.value);
//                         input.value = "";
//                       }}
//                       className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
//                     >
//                       Add
//                     </button>
//                   </div>
//                   {form.skills && (
//                     <div className="flex flex-wrap gap-2">
//                       {form.skills
//                         .split(",")
//                         .filter((s) => s.trim())
//                         .map((skill, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
//                           >
//                             <span>{skill.trim()}</span>
//                             <button
//                               type="button"
//                               onClick={() => removeSkill(skill.trim())}
//                               className="text-blue-900 hover:text-blue-700"
//                             >
//                               ×
//                             </button>
//                           </div>
//                         ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Salary Range */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Salary Range (Annual)
//                   </label>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                     {salaryRanges.map((range) => (
//                       <button
//                         key={range}
//                         type="button"
//                         onClick={() =>
//                           setForm((prev) => ({ ...prev, salaryMin: range }))
//                         }
//                         className={`p-3 rounded-lg border ${form.salaryMin === range ? "border-green-500 bg-green-50 text-green-600" : "border-gray-200 hover:border-gray-300"} transition flex items-center gap-1`}
//                       >
//                         <DollarSign size={16} />
//                         {range}
//                       </button>
//                     ))}
//                   </div>
//                   <div className="mt-4 grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">
//                         Minimum (₹)
//                       </label>
//                       <input
//                         type="number"
//                         name="salaryMin"
//                         value={form.salaryMin}
//                         onChange={handleChange}
//                         placeholder="300000"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">
//                         Maximum (₹)
//                       </label>
//                       <input
//                         type="number"
//                         name="salaryMax"
//                         value={form.salaryMax}
//                         onChange={handleChange}
//                         placeholder="600000"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Number of Vacancies
//                     </label>
//                     <select
//                       name="vacancies"
//                       value={form.vacancies}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl"
//                     >
//                       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((num) => (
//                         <option key={num} value={num}>
//                           {num} position{num > 1 ? "s" : ""}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Application Deadline
//                     </label>
//                     <input
//                       type="date"
//                       name="deadline"
//                       value={form.deadline}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl"
//                       min={new Date().toISOString().split("T")[0]}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3: Preview & Submit */}
//             {activeStep === 3 && (
//               <div className="space-y-6 animate-fadeIn">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-green-100 rounded-lg">
//                     <CheckCircle2 className="w-6 h-6 text-green-600" />
//                   </div>
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Preview & Publish
//                   </h2>
//                 </div>

//                 {/* Job Preview Card */}
//                 <div className="border border-gray-200 rounded-2xl p-6 bg-gradient-to-r from-gray-50 to-white">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {form.title || "Job Title"}
//                       </h3>
//                       <p className="text-gray-600">{form.company}</p>
//                     </div>
//                     <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
//                       {form.type}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <MapPin size={18} />
//                       <span>{form.location || "Location"}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Clock size={18} />
//                       <span>{form.workMode}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <TrendingUp size={18} />
//                       <span>
//                         {form.experienceMin
//                           ? `${form.experienceMin}-${form.experienceMax} Years`
//                           : "Experience"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <DollarSign size={18} />
//                       <span>
//                         {form.salaryMin
//                           ? `₹${form.salaryMin} - ₹${form.salaryMax}`
//                           : "Salary"}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <h4 className="font-medium text-gray-900 mb-2">
//                       Job Description
//                     </h4>
//                     <p className="text-gray-600 whitespace-pre-line">
//                       {form.description || "No description provided"}
//                     </p>
//                   </div>

//                   {form.skills && (
//                     <div>
//                       <h4 className="font-medium text-gray-900 mb-2">
//                         Required Skills
//                       </h4>
//                       <div className="flex flex-wrap gap-2">
//                         {form.skills
//                           .split(",")
//                           .filter((s) => s.trim())
//                           .map((skill, index) => (
//                             <span
//                               key={index}
//                               className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
//                             >
//                               {skill.trim()}
//                             </span>
//                           ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <div className="text-sm text-gray-500">
//                       <p>
//                         ⏰ Applications close:{" "}
//                         {form.deadline || "No deadline set"}
//                       </p>
//                       <p>
//                         👥 Vacancies: {form.vacancies} position
//                         {form.vacancies > 1 ? "s" : ""}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Publish Options */}
//                 <div className="border border-gray-200 rounded-xl p-4">
//                   <h4 className="font-medium text-gray-900 mb-3">
//                     Publishing Options
//                   </h4>
//                   <div className="space-y-3">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="publishOption"
//                         defaultChecked
//                         className="text-green-600"
//                       />
//                       <span className="flex-1">
//                         <span className="font-medium">Publish Now</span>
//                         <p className="text-sm text-gray-500">
//                           Job will be visible to candidates immediately
//                         </p>
//                       </span>
//                     </label>
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="publishOption"
//                         className="text-green-600"
//                       />
//                       <span className="flex-1">
//                         <span className="font-medium">Save as Draft</span>
//                         <p className="text-sm text-gray-500">
//                           Job will be saved but not published
//                         </p>
//                       </span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* NAVIGATION BUTTONS */}
//             <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
//               <div>
//                 {activeStep > 1 && (
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
//                   >
//                     Previous
//                   </button>
//                 )}
//               </div>

//               <div className="flex gap-3">
//                 {activeStep < 3 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition flex items-center gap-2"
//                   >
//                     Continue to Next Step
//                     <ArrowLeft className="rotate-180" size={18} />
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Publishing...
//                       </>
//                     ) : (
//                       <>
//                         <Sparkles size={18} />
//                         Publish Job Opening
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* HELPER TEXT */}
//         <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
//           <div className="flex items-start gap-3">
//             <AlertCircle className="text-blue-600 mt-0.5" size={20} />
//             <div>
//               <h4 className="font-medium text-blue-900 mb-1">
//                 Pro Tips for Better Results
//               </h4>
//               <ul className="text-sm text-blue-700 space-y-1">
//                 <li>• Be specific in your job title and description</li>
//                 <li>• Include salary range to attract more candidates</li>
//                 <li>• Add relevant skills for better matching</li>
//                 <li>• Set a realistic application deadline</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animation */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Globe,
  TrendingUp,
  Sparkles,
  Upload,
  AlertCircle,
  CheckCircle2,
  Code,
  Cpu,
  Database,
  Smartphone,
  Cloud,
  Server,
  Palette,
  BarChart,
  Users,
  Calendar,
  Target,
  Award,
  Zap,
  Shield,
  Heart,
  Coffee,
  Home,
  Sun,
  Moon,
  Languages,
  GraduationCap,
  BookOpen,
  Video,
  Phone,
  Mail,
  MessageSquare,
  ExternalLink,
  X,
  Plus,
  Trash2,
  Save,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: "",
    company: "TechCorp Solutions Pvt. Ltd.",
    location: "",
    salaryMin: "",
    salaryMax: "",
    currency: "INR",
    type: "Full-time",
    workMode: "Hybrid",
    experienceMin: "",
    experienceMax: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    skills: [],
    newSkill: "",
    vacancies: "1",
    deadline: "",
    category: "Engineering",
    tags: ["Remote Friendly", "Flexible Hours"],
    applyLink: "",
    contactEmail: "hr@techcorp.com",
    contactPhone: "",
    isUrgent: false,
    isFeatured: false,
  });

  const jobCategories = [
    { value: "Engineering", label: "Engineering", icon: <Cpu size={18} /> },
    { value: "Design", label: "Design", icon: <Palette size={18} /> },
    { value: "Product", label: "Product", icon: <BarChart size={18} /> },
    { value: "Marketing", label: "Marketing", icon: <TrendingUp size={18} /> },
    { value: "Sales", label: "Sales", icon: <Users size={18} /> },
    { value: "Support", label: "Support", icon: <MessageSquare size={18} /> },
    { value: "Operations", label: "Operations", icon: <Server size={18} /> },
    { value: "Other", label: "Other", icon: <Briefcase size={18} /> },
  ];

  const jobTypes = [
    { value: "Full-time", label: "Full Time", icon: <Clock size={18} /> },
    { value: "Part-time", label: "Part Time", icon: <Clock size={18} /> },
    { value: "Contract", label: "Contract", icon: <FileText size={18} /> },
    {
      value: "Internship",
      label: "Internship",
      icon: <GraduationCap size={18} />,
    },
    { value: "Freelance", label: "Freelance", icon: <Sun size={18} /> },
  ];

  const workModes = [
    { value: "On-site", label: "On-site", icon: <Building size={18} /> },
    { value: "Hybrid", label: "Hybrid", icon: <Home size={18} /> },
    { value: "Remote", label: "Remote", icon: <Globe size={18} /> },
  ];

  const experienceLevels = [
    { value: "fresher", label: "Fresher (0-1 years)" },
    { value: "junior", label: "Junior (1-3 years)" },
    { value: "mid", label: "Mid-level (3-6 years)" },
    { value: "senior", label: "Senior (6-10 years)" },
    { value: "lead", label: "Lead (10+ years)" },
  ];

  const salaryRanges = [
    { min: "0", max: "3", label: "₹0-3 LPA" },
    { min: "3", max: "6", label: "₹3-6 LPA" },
    { min: "6", max: "10", label: "₹6-10 LPA" },
    { min: "10", max: "15", label: "₹10-15 LPA" },
    { min: "15", max: "25", label: "₹15-25 LPA" },
    { min: "25", max: "50", label: "₹25-50 LPA" },
    { min: "50", max: "100", label: "₹50+ LPA" },
  ];

  const popularSkills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "Next.js",
    "Vue.js",
    "Angular",
    "Flutter",
    "React Native",
    "Swift",
    "UI/UX Design",
    "Figma",
    "Adobe XD",
    "Product Management",
    "Agile",
    "DevOps",
    "CI/CD",
    "Machine Learning",
    "Data Science",
    "Blockchain",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addSkill = () => {
    if (form.newSkill.trim() && !form.skills.includes(form.newSkill.trim())) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, form.newSkill.trim()],
        newSkill: "",
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const addPopularSkill = (skill) => {
    if (!form.skills.includes(skill)) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("🎉 Job Posted Successfully!");
      router.push("/employer/my-jobs");
    }, 1500);
  };

  const nextStep = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const JobPreview = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {form.title || "Job Title Here"}
              </h1>
              <p className="text-gray-600">{form.company}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {form.type}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {form.workMode}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {form.category}
            </span>
            {form.isUrgent && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                🔥 Urgent Hiring
              </span>
            )}
            {form.isFeatured && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                ⭐ Featured
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {form.salaryMin && form.salaryMax
              ? `₹${form.salaryMin} - ₹${form.salaryMax} LPA`
              : "Salary Not Specified"}
          </div>
          <div className="text-sm text-gray-500 mt-1">Annual Package</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin size={18} className="text-gray-500" />
          <span>{form.location || "Location"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Users size={18} className="text-gray-500" />
          <span>
            {form.experienceMin && form.experienceMax
              ? `${form.experienceMin}-${form.experienceMax} years`
              : "Experience"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={18} className="text-gray-500" />
          <span>
            {form.vacancies} vacancy{form.vacancies > 1 ? "ies" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={18} className="text-gray-500" />
          <span>{form.deadline || "No deadline"}</span>
        </div>
      </div>

      {form.description && (
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {form.description}
          </p>
        </div>
      )}

      {form.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {form.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Posted just now</div>
            <div className="text-sm text-gray-600">By {form.company}</div>
          </div>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/employer/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                {previewMode ? <EyeOff size={18} /> : <Eye size={18} />}
                {previewMode ? "Edit Mode" : "Preview Mode"}
              </button>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= step ? "bg-green-100 text-green-600 border-2 border-green-600" : "bg-gray-100 text-gray-400"}`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-8 h-0.5 ${activeStep > step ? "bg-green-600" : "bg-gray-300"}`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Sparkles className="text-yellow-500" />
            Create New Job Posting
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the details below to attract the best talent for your
            company
          </p>
        </div>

        {previewMode ? (
          <JobPreview />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Step 1: Basic Information */}
            {activeStep === 1 && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Basic Job Information
                  </h2>
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g., Senior Frontend Developer (React)"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Company & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <div className="relative">
                      <Building
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g., Bangalore, Karnataka (Remote/On-site)"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Job Type & Work Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {jobTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, type: type.value }))
                          }
                          className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition ${form.type === type.value ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          {type.icon}
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Mode *
                    </label>
                    <div className="flex gap-2">
                      {workModes.map((mode) => (
                        <button
                          key={mode.value}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              workMode: mode.value,
                            }))
                          }
                          className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition ${form.workMode === mode.value ? "border-green-500 bg-green-50 text-green-600" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          {mode.icon}
                          <span>{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range (Annual)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {salaryRanges.map((range, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            salaryMin: range.min,
                            salaryMax: range.max,
                          }))
                        }
                        className={`p-3 rounded-lg border flex items-center gap-1 justify-center transition ${form.salaryMin === range.min ? "border-green-500 bg-green-50 text-green-600" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <DollarSign size={16} />
                        {range.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Minimum (LPA)
                      </label>
                      <input
                        type="number"
                        name="salaryMin"
                        value={form.salaryMin}
                        onChange={handleChange}
                        placeholder="8"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Maximum (LPA)
                      </label>
                      <input
                        type="number"
                        name="salaryMax"
                        value={form.salaryMax}
                        onChange={handleChange}
                        placeholder="15"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience & Vacancies */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Required
                    </label>
                    <select
                      name="experienceMin"
                      value={form.experienceMin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    >
                      <option value="">Select minimum experience</option>
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i}>
                          {i} year{i !== 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Vacancies
                    </label>
                    <select
                      name="vacancies"
                      value={form.vacancies}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 50].map(
                        (num) => (
                          <option key={num} value={num}>
                            {num} position{num > 1 ? "s" : ""}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details & Requirements */}
            {activeStep === 2 && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Details & Requirements
                  </h2>
                </div>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the job responsibilities, what you're looking for in a candidate, and what makes this role exciting..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    required
                  />
                  <div className="mt-2 text-sm text-gray-500">
                    Tip: Include key responsibilities, team information, and
                    growth opportunities.
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Responsibilities
                  </label>
                  <textarea
                    name="responsibilities"
                    value={form.responsibilities}
                    onChange={handleChange}
                    rows={4}
                    placeholder="List the main responsibilities and tasks for this role (one per line)..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requirements & Qualifications
                  </label>
                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    rows={4}
                    placeholder="List the required skills, education, and experience (one per line)..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={form.newSkill}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          newSkill: e.target.value,
                        }))
                      }
                      placeholder="Add a skill (e.g., React, Node.js)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-1"
                    >
                      <Plus size={18} />
                      Add
                    </button>
                  </div>

                  {/* Popular Skills */}
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-2">
                      Popular Skills:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addPopularSkill(skill)}
                          className={`px-3 py-1 rounded-full text-sm ${form.skills.includes(skill) ? "bg-green-100 text-green-700 border border-green-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Skills */}
                  {form.skills.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-2">
                        Selected Skills ({form.skills.length}):
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="text-blue-900 hover:text-blue-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Additional Info & Publish */}
            {activeStep === 3 && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Additional Information
                  </h2>
                </div>

                {/* Benefits & Perks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits & Perks
                  </label>
                  <textarea
                    name="benefits"
                    value={form.benefits}
                    onChange={handleChange}
                    rows={4}
                    placeholder="List the benefits and perks (e.g., Health insurance, Flexible hours, Learning budget, etc.)"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Job Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Category
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {jobCategories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            category: category.value,
                          }))
                        }
                        className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition ${form.category === category.value ? "border-purple-500 bg-purple-50 text-purple-600" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        {category.icon}
                        <span className="text-sm">{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={form.deadline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Link/Email
                    </label>
                    <input
                      type="text"
                      name="applyLink"
                      value={form.applyLink}
                      onChange={handleChange}
                      placeholder="https://apply.example.com OR email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    />
                  </div>
                </div>

                {/* Flags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="isUrgent"
                      checked={form.isUrgent}
                      onChange={handleChange}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        Urgent Hiring
                      </div>
                      <div className="text-sm text-gray-500">
                        Mark this job as urgent
                      </div>
                    </div>
                    <Zap className="ml-auto text-yellow-500" size={20} />
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={form.isFeatured}
                      onChange={handleChange}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        Featured Job
                      </div>
                      <div className="text-sm text-gray-500">
                        Highlight this job listing
                      </div>
                    </div>
                    <Award className="ml-auto text-purple-500" size={20} />
                  </label>
                </div>

                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Information
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="email"
                        name="contactEmail"
                        value={form.contactEmail}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        name="contactPhone"
                        value={form.contactPhone}
                        onChange={handleChange}
                        placeholder="Contact phone number"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between">
                <div>
                  {activeStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition flex items-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      Previous Step
                    </button>
                  )}
                </div>

                <div className="flex gap-3">
                  {activeStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition flex items-center gap-2"
                    >
                      Continue to Next Step
                      <ArrowLeft className="rotate-180" size={18} />
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setPreviewMode(true)}
                        className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
                      >
                        Preview
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition flex items-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Publish Job
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Tips for Better Results
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Be specific with job titles and requirements</li>
                <li>• Include salary range to attract more candidates</li>
                <li>• Highlight benefits and growth opportunities</li>
                <li>• Use relevant skills for better matching</li>
                <li>• Set a realistic application deadline</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
