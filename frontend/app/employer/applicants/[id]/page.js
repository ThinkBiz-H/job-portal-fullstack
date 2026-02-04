// // app/employer/applicants/detail/[id]/page.jsx
// "use client";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   Phone,
//   Calendar,
//   Briefcase,
//   MapPin,
//   FileText,
//   Download,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Users,
//   Award,
//   Globe,
//   GraduationCap,
//   Building,
//   ExternalLink,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";

// export default function ApplicantDetailPage() {
//   const [loading, setLoading] = useState(true);
//   const [applicant, setApplicant] = useState(null);
//   const [error, setError] = useState(null);
//   const params = useParams();
//   const router = useRouter();

//   const applicantId = params.id;

//   const fetchApplicantDetails = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       if (!token) {
//         router.push("/login");
//         return;
//       }

//       // यह endpoint आपके backend पर depend करेगा
//       const res = await axios.get(
//         `http://localhost:5000/api/applications/${applicantId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       // Backend response format के according adjust करें
//       const data = res.data.data || res.data;

//       setApplicant({
//         id: data._id,
//         name: data.applicant?.name || "N/A",
//         email: data.applicant?.email || "N/A",
//         phone: data.applicant?.phone || "Not provided",
//         jobTitle: data.job?.title || "N/A",
//         jobId: data.job?._id,
//         status: data.status || "pending",
//         appliedDate: data.appliedAt || data.createdAt,
//         coverLetter: data.coverLetter || "No cover letter provided",
//         resumeUrl: data.resume?.url || "#",
//         experience: data.applicant?.experience || "N/A",
//         education: data.applicant?.education || "N/A",
//         skills: data.applicant?.skills || ["Communication", "Problem Solving"],
//         location: data.applicant?.location || "India",
//         portfolio: data.applicant?.portfolio,
//         linkedin: data.applicant?.linkedin,
//         notes: data.notes || [],
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching applicant details:", err);
//       setError("Failed to load applicant details");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (applicantId) {
//       fetchApplicantDetails();
//     }
//   }, [applicantId]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "accepted":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "rejected":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "shortlisted":
//         return "bg-purple-100 text-purple-800 border-purple-200";
//       case "reviewed":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       default:
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//     }
//   };

//   const updateStatus = async (newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.patch(
//         `http://localhost:5000/api/applications/${applicantId}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setApplicant({ ...applicant, status: newStatus });
//       alert(`Status updated to ${newStatus}`);
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert("Failed to update status");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading applicant details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !applicant) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
//             <XCircle className="text-red-600" size={32} />
//           </div>
//           <h3 className="mt-4 text-xl font-semibold text-gray-900">
//             {error || "Applicant not found"}
//           </h3>
//           <p className="mt-2 text-gray-600">
//             The requested applicant details could not be loaded.
//           </p>
//           <Link href="/employer/applicants">
//             <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
//               Back to Applicants
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link href="/employer/applicants">
//                 <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <ArrowLeft size={20} />
//                 </button>
//               </Link>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Applicant Details
//                 </h1>
//                 <p className="text-gray-600">View and manage application</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <span
//                 className={`px-4 py-2 rounded-full border ${getStatusColor(applicant.status)} capitalize font-medium`}
//               >
//                 {applicant.status}
//               </span>
//               <a
//                 href={applicant.resumeUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//               >
//                 <Download size={18} />
//                 Download Resume
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* LEFT COLUMN - PROFILE */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* PROFILE CARD */}
//             <div className="bg-white rounded-xl border shadow-sm p-6">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
//                     <User className="text-emerald-600" size={32} />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-900">
//                       {applicant.name}
//                     </h2>
//                     <p className="text-gray-600">{applicant.email}</p>
//                     <div className="flex items-center gap-4 mt-2">
//                       <div className="flex items-center gap-1 text-gray-500">
//                         <Briefcase size={16} />
//                         <span>{applicant.jobTitle}</span>
//                       </div>
//                       <div className="flex items-center gap-1 text-gray-500">
//                         <Calendar size={16} />
//                         <span>
//                           Applied on{" "}
//                           {new Date(applicant.appliedDate).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             },
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* CONTACT INFO */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <Mail className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-500">Email</p>
//                     <p className="font-medium">{applicant.email}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <Phone className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-500">Phone</p>
//                     <p className="font-medium">{applicant.phone}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <MapPin className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-500">Location</p>
//                     <p className="font-medium">{applicant.location}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <GraduationCap className="text-gray-400" size={20} />
//                   <div>
//                     <p className="text-sm text-gray-500">Education</p>
//                     <p className="font-medium">{applicant.education}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* COVER LETTER */}
//             <div className="bg-white rounded-xl border shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Cover Letter
//               </h3>
//               <div className="prose max-w-none">
//                 <p className="text-gray-700 whitespace-pre-line">
//                   {applicant.coverLetter}
//                 </p>
//               </div>
//             </div>

//             {/* SKILLS */}
//             <div className="bg-white rounded-xl border shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Skills
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {applicant.skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full font-medium"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN - ACTIONS */}
//           <div className="space-y-6">
//             {/* STATUS ACTIONS */}
//             <div className="bg-white rounded-xl border shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Update Status
//               </h3>
//               <div className="space-y-3">
//                 <button
//                   onClick={() => updateStatus("reviewed")}
//                   className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
//                     applicant.status === "reviewed"
//                       ? "bg-blue-50 border-blue-200"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <Eye className="text-blue-600" size={16} />
//                     </div>
//                     <div className="text-left">
//                       <p className="font-medium">Mark as Reviewed</p>
//                       <p className="text-sm text-gray-500">
//                         Application has been reviewed
//                       </p>
//                     </div>
//                   </div>
//                   {applicant.status === "reviewed" && (
//                     <CheckCircle className="text-blue-600" size={20} />
//                   )}
//                 </button>

//                 <button
//                   onClick={() => updateStatus("shortlisted")}
//                   className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
//                     applicant.status === "shortlisted"
//                       ? "bg-purple-50 border-purple-200"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                       <Users className="text-purple-600" size={16} />
//                     </div>
//                     <div className="text-left">
//                       <p className="font-medium">Shortlist</p>
//                       <p className="text-sm text-gray-500">
//                         Move to shortlisted candidates
//                       </p>
//                     </div>
//                   </div>
//                   {applicant.status === "shortlisted" && (
//                     <CheckCircle className="text-purple-600" size={20} />
//                   )}
//                 </button>

//                 <button
//                   onClick={() => updateStatus("accepted")}
//                   className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
//                     applicant.status === "accepted"
//                       ? "bg-green-50 border-green-200"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <CheckCircle className="text-green-600" size={16} />
//                     </div>
//                     <div className="text-left">
//                       <p className="font-medium">Accept</p>
//                       <p className="text-sm text-gray-500">
//                         Offer the position
//                       </p>
//                     </div>
//                   </div>
//                   {applicant.status === "accepted" && (
//                     <CheckCircle className="text-green-600" size={20} />
//                   )}
//                 </button>

//                 <button
//                   onClick={() => updateStatus("rejected")}
//                   className={`w-full flex items-center justify-between p-4 rounded-lg border transition-colors ${
//                     applicant.status === "rejected"
//                       ? "bg-red-50 border-red-200"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
//                       <XCircle className="text-red-600" size={16} />
//                     </div>
//                     <div className="text-left">
//                       <p className="font-medium">Reject</p>
//                       <p className="text-sm text-gray-500">
//                         Decline this application
//                       </p>
//                     </div>
//                   </div>
//                   {applicant.status === "rejected" && (
//                     <CheckCircle className="text-red-600" size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* QUICK ACTIONS */}
//             <div className="bg-white rounded-xl border shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Quick Actions
//               </h3>
//               <div className="space-y-3">
//                 <a
//                   href={`mailto:${applicant.email}`}
//                   className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <Mail size={18} />
//                     <span>Send Email</span>
//                   </div>
//                   <ExternalLink size={16} className="text-gray-400" />
//                 </a>
//                 <a
//                   href={applicant.resumeUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-3">
//                     <FileText size={18} />
//                     <span>View Resume</span>
//                   </div>
//                   <ExternalLink size={16} className="text-gray-400" />
//                 </a>
//                 {applicant.linkedin && (
//                   <a
//                     href={applicant.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Globe size={18} />
//                       <span>View LinkedIn</span>
//                     </div>
//                     <ExternalLink size={16} className="text-gray-400" />
//                   </a>
//                 )}
//               </div>
//             </div>

//             {/* JOB DETAILS */}
//             <div className="bg-white rounded-xl border shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Job Details
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <Briefcase className="text-gray-400" size={18} />
//                   <div>
//                     <p className="text-sm text-gray-500">Position</p>
//                     <p className="font-medium">{applicant.jobTitle}</p>
//                   </div>
//                 </div>
//                 <Link href={`/employer/jobs/${applicant.jobId}`}>
//                   <button className="w-full flex items-center justify-center gap-2 p-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
//                     <span>View Job Posting</span>
//                     <ChevronRight size={16} />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Eye } from "lucide-react"; // ✅ IMPORTANT

export default function ApplicantDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState(null);

  const API = "http://localhost:5000/api";

  useEffect(() => {
    if (id) {
      fetchApplicant();
    }
  }, [id]);

  const fetchApplicant = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.get(`${API}/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApp(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log("Applicant Load Error:", err);
      alert("Failed to load applicant");
      router.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!app) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Eye size={22} /> Applicant Details
        </h1>

        <hr />

        {/* USER INFO */}
        <div>
          <p>
            <b>Name:</b> {app.applicant?.name}
          </p>
          <p>
            <b>Email:</b> {app.applicant?.email}
          </p>
          <p>
            <b>Phone:</b> {app.applicant?.phone}
          </p>
        </div>

        {/* JOB INFO */}
        <div>
          <p>
            <b>Job:</b> {app.job?.title}
          </p>
          <p>
            <b>Location:</b> {app.job?.location}
          </p>
        </div>

        {/* STATUS */}
        <div>
          <p>
            <b>Status:</b> {app.status}
          </p>
          <p>
            <b>Applied:</b> {new Date(app.appliedAt).toLocaleDateString()}
          </p>
        </div>

        {/* COVER LETTER */}
        {app.coverLetter && (
          <div>
            <p className="font-medium">Cover Letter</p>
            <p className="text-gray-700">{app.coverLetter}</p>
          </div>
        )}

        {/* BACK */}
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}
  