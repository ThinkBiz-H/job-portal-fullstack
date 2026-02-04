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

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

  const API = "http://localhost:5000/api";
  const { id } = params;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // ================= FETCH JOB =================
  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${API}/jobs/${id}`);

      setJob(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Job not found");
      setLoading(false);
    }
  };

  // ================= APPLY JOB =================
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Pehle Login Karo");
        router.push("/login");
        return;
      }

      setApplying(true);

      await axios.post(
        `${API}/jobs/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Job Apply Ho Gayi 🎉");

      // Refresh job data
      fetchJob();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Apply Failed");
    } finally {
      setApplying(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-10 text-center text-black">Loading job details...</div>
    );
  }

  // ================= NOT FOUND =================
  if (!job) {
    return (
      <div className="p-10 text-center text-black">
        <h2 className="text-xl font-bold">Job Not Found ❌</h2>

        <button
          onClick={() => router.push("/jobs")}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  // ================= UI =================
  return (
    <section className="bg-gray-100 min-h-screen py-6 text-black">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow p-6">
          {/* TITLE */}
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.company}</p>

          <p className="mt-1 text-sm">📍 {job.location}</p>

          {/* SALARY */}
          <p className="mt-3 text-lg font-semibold">
            ₹{job.salary?.min || 0} - ₹{job.salary?.max || 0}
          </p>

          {/* TAGS */}
          <div className="flex gap-2 mt-4 flex-wrap text-xs">
            <Tag text={job.jobType} />
            {job.isFeatured && <Tag text="Featured" />}
            {job.isActive && <Tag text="Active" />}
          </div>

          <hr className="my-5" />

          {/* DETAILS */}
          <div className="space-y-3 text-sm">
            <Row label="Job Type" value={job.jobType} />
            <Row label="Location" value={job.location} />
            <Row
              label="Experience"
              value={`${job.experience?.min} - ${job.experience?.max} Years`}
            />
            <Row label="Applications" value={job.totalApplications} />
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Job Description</h3>

            <p className="text-gray-700 text-sm leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* APPLY */}
          <button
            onClick={handleApply}
            disabled={applying}
            className={`mt-6 w-full py-2 rounded-lg text-white ${
              applying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {applying ? "Applying..." : "Apply for Job"}
          </button>

          {/* BACK */}
          <button
            onClick={() => router.push("/jobs")}
            className="mt-3 w-full border py-2 rounded-lg"
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    </section>
  );
}

/* COMPONENTS */

function Tag({ text }) {
  return <span className="bg-gray-100 px-3 py-1 rounded-full">{text}</span>;
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
