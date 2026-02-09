// "use client";

// import { useState, useEffect } from "react";
// import ProfileModal from "@/components/ProfileModal";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const API = "http://localhost:5000/api";
//   const router = useRouter();

//   const [profile, setProfile] = useState({
//     basic: {
//       email: "",
//       mobile: "",
//       dob: "",
//       gender: "",
//     },
//     education: [],
//     skills: [],
//     language: [],
//     certificate: [],
//     resume: "",
//     experience: [],
//     userInfo: {
//       name: "",
//       college: "",
//       location: "",
//       image: "/images/freasher.png",
//     },
//   });

//   const [modal, setModal] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         router.push("/login");
//         return;
//       }

//       console.log("🔄 Fetching profile...");
//       const res = await axios.get(`${API}/auth/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("📥 Profile API Response:", res.data);

//       const user = res.data.data;

//       // Map backend → frontend format
//       const mappedProfile = {
//         basic: {
//           email: user.email || "",
//           mobile: user.phone || "",
//           dob: user.dob || user.dateOfBirth || "",
//           gender: user.gender || "",
//         },
//         userInfo: {
//           name: user.name || "",
//           college: user.college || "",
//           location: user.location || "",
//           image: user.profileImage || "/images/freasher.png",
//         },
//         skills: user.jobseekerProfile?.skills?.map((s) => s.name) || [],
//         education: user.jobseekerProfile?.educationDetails || [],
//         experience: user.jobseekerProfile?.experience || [],
//         certificate: user.jobseekerProfile?.certifications || [],
//         language: user.jobseekerProfile?.languages || [],
//         resume: user.resume || user.jobseekerProfile?.resume || "",
//       };

//       console.log("🗺️ Mapped profile:", mappedProfile);
//       setProfile(mappedProfile);
//       setLoading(false);
//     } catch (err) {
//       console.log("❌ Fetch Profile Error:", err);
//       alert("Please login again");
//       router.push("/login");
//     }
//   };

//   // 🔥 DELETE FUNCTIONS
//   const deleteExperience = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       experience: prev.experience.filter((_, i) => i !== index),
//     }));
//   };

//   const deleteEducation = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       education: prev.education.filter((_, i) => i !== index),
//     }));
//   };

//   const deleteSkill = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       skills: prev.skills.filter((_, i) => i !== index),
//     }));
//   };

//   const deleteCertificate = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       certificate: prev.certificate.filter((_, i) => i !== index),
//     }));
//   };

//   const deleteLanguage = (index) => {
//     setProfile((prev) => ({
//       ...prev,
//       language: prev.language.filter((_, i) => i !== index),
//     }));
//   };

//   const deleteResume = () => {
//     setProfile((prev) => ({
//       ...prev,
//       resume: "",
//     }));
//   };

//   // 🔥 RESUME DOWNLOAD HANDLER
//   const handleDownloadResume = () => {
//     if (profile.resume) {
//       const link = document.createElement("a");
//       link.href = `http://localhost:5000/uploads/resumes/${profile.resume}`;
//       link.download = profile.resume;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   // 🔥 SAVE PROFILE TO BACKEND - FIXED VERSION
//   const saveProfileToBackend = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // ✅ CLEAN DATA BEFORE SENDING
//       const cleanedData = {
//         basic: profile.basic,
//         userInfo: profile.userInfo,

//         // ✅ EDUCATION को proper array format में भेजो
//         education: Array.isArray(profile.education)
//           ? profile.education.map((edu) => ({
//               degree: String(edu.degree || ""),
//               college: String(edu.college || ""),
//               field: String(edu.field || ""),
//               batch: String(edu.batch || ""),
//               type: String(edu.type || ""),
//             }))
//           : [],

//         // ✅ SKILLS को proper format में
//         skills: Array.isArray(profile.skills)
//           ? profile.skills.map((skill) => String(skill || ""))
//           : [],

//         // ✅ EXPERIENCE को proper format में
//         experience: Array.isArray(profile.experience)
//           ? profile.experience.map((exp) => ({
//               company: String(exp.company || ""),
//               position: String(exp.position || ""),
//               startDate: exp.startDate || "",
//               endDate: exp.endDate || "",
//               currentlyWorking: Boolean(exp.currentlyWorking || false),
//               description: String(exp.description || ""),
//             }))
//           : [],

//         // ✅ CERTIFICATE को proper format में
//         certificate: Array.isArray(profile.certificate)
//           ? profile.certificate.map((cert) => ({
//               name: String(cert.name || ""),
//               issuer: String(cert.issuer || ""),
//               issueDate: cert.issueDate || "",
//               expiryDate: cert.expiryDate || "",
//               credentialId: String(cert.credentialId || ""),
//               url: String(cert.url || ""),
//             }))
//           : [],

//         // ✅ LANGUAGE को proper format में
//         language: Array.isArray(profile.language)
//           ? profile.language.map((lang) => ({
//               language: String(lang.language || ""),
//               proficiency: String(lang.proficiency || "Basic"),
//             }))
//           : [],

//         resume: String(profile.resume || ""),
//       };

//       console.log("💾 Saving CLEANED data to backend:", cleanedData);

//       const res = await axios.put(
//         `${API}/auth/update-jobseeker-profile`,
//         cleanedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       console.log("✅ Save response:", res.data);

//       if (res.data.success) {
//         alert("Profile saved successfully!");
//         fetchProfile();
//       }
//     } catch (err) {
//       console.log("❌ Save Profile Error:", err.response?.data || err.message);
//       alert(
//         "Failed to save profile: " +
//           (err.response?.data?.message || err.message),
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-gray-50 min-h-screen py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* SAVE BUTTON */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={saveProfileToBackend}
//             className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
//           >
//             💾 Save Profile
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* LEFT COLUMN - PROFILE SUMMARY */}
//           <div className="space-y-6">
//             {/* PROFILE CARD */}
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={profile.userInfo.image}
//                     className="w-16 h-16 rounded-full border-2 border-blue-100 object-cover"
//                     alt="Profile"
//                   />
//                   <div>
//                     <h3 className="font-bold text-xl text-gray-900">
//                       {profile.userInfo.name}
//                     </h3>
//                     <p className="text-base text-gray-600">
//                       {profile.userInfo.college}
//                     </p>
//                     <p className="text-base text-gray-500">
//                       {profile.userInfo.location}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setModal("userInfo")}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-700"
//                 >
//                   Edit
//                 </button>
//               </div>

//               {/* BASIC DETAILS */}
//               <div className="space-y-3 pt-4 border-t">
//                 {[
//                   { label: "Email", value: profile.basic.email },
//                   { label: "Mobile", value: profile.basic.mobile },
//                   { label: "Date of Birth", value: profile.basic.dob },
//                   { label: "Gender", value: profile.basic.gender },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex justify-between items-center">
//                     <span className="text-base text-gray-600">
//                       {item.label}
//                     </span>
//                     <span className="text-base font-medium text-black">
//                       {item.value || "Not set"}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => setModal("basic")}
//                 className="w-full mt-4 text-center text-blue-600 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
//               >
//                 Edit Details
//               </button>
//             </div>

//             {/* LANGUAGES KNOWN */}
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h4 className="font-semibold text-black">Languages known</h4>
//                 <button
//                   onClick={() => setModal("language")}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-700"
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-2 text-black">
//                 {profile.language.length > 0 ? (
//                   profile.language.map((lang, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center py-2"
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-medium text-black">
//                           {lang.language}
//                         </span>
//                         <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
//                           {lang.proficiency}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => deleteLanguage(index)}
//                         className="text-gray-400 hover:text-red-500 text-sm"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-sm">No languages added</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN - MAIN CONTENT */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* EDUCATION */}
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h4 className="font-bold text-gray-900 text-lg">Education</h4>
//                   <p className="text-sm text-gray-500">
//                     Your academic qualifications
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setModal("education")}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-700"
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {profile.education.length > 0 ? (
//                   profile.education.map((edu, index) => (
//                     <div
//                       key={index}
//                       className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
//                     >
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h5 className="font-semibold text-gray-900">
//                             {edu.degree} - {edu.field}
//                           </h5>
//                           <p className="text-sm text-gray-600 mt-1">
//                             {edu.college}
//                           </p>
//                           <div className="flex items-center gap-3 mt-2">
//                             <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
//                               {edu.batch}
//                             </span>
//                             <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
//                               {edu.type}
//                             </span>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => deleteEducation(index)}
//                           className="text-gray-400 hover:text-red-500"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8">
//                     <p className="text-gray-500">No education added yet</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* SKILLS */}
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h4 className="font-bold text-gray-900 text-lg">Skills</h4>
//                   <p className="text-sm text-gray-500">
//                     Get noticed for the right job by adding your skills
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setModal("skills")}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-700"
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {profile.skills.length > 0 ? (
//                   profile.skills.map((skill, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg"
//                     >
//                       <span className="text-sm font-medium text-blue-700">
//                         {skill}
//                       </span>
//                       <button
//                         onClick={() => deleteSkill(index)}
//                         className="text-blue-400 hover:text-red-500 ml-1"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No skills added yet</p>
//                 )}
//               </div>
//             </div>

//             {/* WORK EXPERIENCE */}
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h4 className="font-bold text-gray-900 text-lg">
//                     Work Experience
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     Your professional work history
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setModal("experience")}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-700"
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 {profile.experience.length > 0 ? (
//                   profile.experience.map((exp, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
//                     >
//                       <div>
//                         <p className="text-sm font-medium text-gray-700">
//                           {exp.position} at {exp.company}
//                         </p>
//                         {exp.description && (
//                           <p className="text-sm text-gray-500 mt-1">
//                             {exp.description}
//                           </p>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => deleteExperience(index)}
//                         className="text-gray-400 hover:text-red-500"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8">
//                     <p className="text-gray-500">
//                       No work experience added yet
//                     </p>
//                     <p className="text-sm text-gray-400 mt-1">
//                       Add your work experience to improve job matches
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* CERTIFICATIONS */}
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h4 className="font-bold text-gray-900 text-lg">
//                     Certifications
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     Your professional certifications
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setModal("certificate")}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-700"
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 {profile.certificate.length > 0 ? (
//                   profile.certificate.map((cert, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
//                     >
//                       <p className="text-sm font-medium text-gray-700">
//                         {cert.name || cert}
//                       </p>
//                       <button
//                         onClick={() => deleteCertificate(index)}
//                         className="text-gray-400 hover:text-red-500"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8">
//                     <p className="text-gray-500">No certifications added</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* RESUME */}
//             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h4 className="font-bold text-gray-900 text-lg">Resume</h4>
//                   <p className="text-sm text-gray-500">
//                     Upload your latest resume
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setModal("resume")}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-700"
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
//                 {profile.resume ? (
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <span className="text-blue-600 font-bold">📄</span>
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {profile.resume}
//                         </p>
//                         <p className="text-xs text-gray-500">PDF Document</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={handleDownloadResume}
//                         className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
//                       >
//                         Download
//                       </button>
//                       <button
//                         onClick={deleteResume}
//                         className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-6">
//                     <p className="text-gray-500 mb-2">No resume uploaded</p>
//                     <p className="text-sm text-gray-400">
//                       Upload your resume to apply for jobs faster
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {modal && (
//         <ProfileModal
//           type={modal}
//           close={() => setModal(null)}
//           profile={profile}
//           setProfile={setProfile}
//         />
//       )}
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import ProfileModal from "@/components/ProfileModal";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const API = "http://localhost:5000/api";
  const router = useRouter();

  const [profile, setProfile] = useState({
    basic: {
      email: "",
      mobile: "",
      dob: "",
      gender: "",
    },
    education: [],
    skills: [],
    language: [],
    certificate: [],
    resume: "",
    experience: [],
    userInfo: {
      name: "",
      college: "",
      location: "",
      image: "/images/freasher.png",
    },
  });

  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB");
  };
  useEffect(() => {
    fetchProfile();
    fetchAppliedJobs(); // 🔥 ADD
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      console.log("🔄 Fetching profile...");
      const res = await axios.get(`${API}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📥 Profile API Response:", res.data);

      const user = res.data.data;

      const mappedProfile = {
        basic: {
          email: user.email || "",
          mobile: user.phone || "",
          dob: user.dob || user.dateOfBirth || "",
          gender: user.gender || "",
        },
        userInfo: {
          name: user.name || "",
          college: user.college || "",
          location: user.location || "",
          image: user.profileImage || "/images/freasher.png",
        },
        skills: user.jobseekerProfile?.skills?.map((s) => s.name) || [],
        education: user.jobseekerProfile?.educationDetails || [],
        experience: user.jobseekerProfile?.experience || [],
        certificate: user.jobseekerProfile?.certifications || [],
        language: user.jobseekerProfile?.languages || [],
        resume: user.resume || user.jobseekerProfile?.resume || "",
      };

      console.log("🗺️ Mapped profile:", mappedProfile);
      setProfile(mappedProfile);
      setLoading(false);
    } catch (err) {
      console.log("❌ Fetch Profile Error:", err);
      alert("Please login again");
      router.push("/login");
    }
  };
  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(`${API}/applications/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📥 Applied Jobs:", res.data);

      if (res.data.success) {
        setAppliedJobs(res.data.data);
      }
    } catch (err) {
      console.log("❌ Fetch Applied Jobs Error:", err);
    }
  };

  const deleteExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const deleteEducation = (index) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const deleteSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const deleteCertificate = (index) => {
    setProfile((prev) => ({
      ...prev,
      certificate: prev.certificate.filter((_, i) => i !== index),
    }));
  };

  const deleteLanguage = (index) => {
    setProfile((prev) => ({
      ...prev,
      language: prev.language.filter((_, i) => i !== index),
    }));
  };

  const deleteResume = () => {
    setProfile((prev) => ({
      ...prev,
      resume: "",
    }));
  };

  const handleDownloadResume = () => {
    if (profile.resume) {
      const link = document.createElement("a");
      link.href = `http://localhost:5000/uploads/resumes/${profile.resume}`;
      link.download = profile.resume;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const saveProfileToBackend = async () => {
    try {
      const token = localStorage.getItem("token");

      const cleanedData = {
        basic: profile.basic,
        userInfo: profile.userInfo,

        education: Array.isArray(profile.education)
          ? profile.education.map((edu) => ({
              degree: String(edu.degree || ""),
              college: String(edu.college || ""),
              field: String(edu.field || ""),
              batch: String(edu.batch || ""),
              type: String(edu.type || ""),
            }))
          : [],

        skills: Array.isArray(profile.skills)
          ? profile.skills.map((skill) => String(skill || ""))
          : [],

        experience: Array.isArray(profile.experience)
          ? profile.experience.map((exp) => ({
              company: String(exp.company || ""),
              position: String(exp.position || ""),
              startDate: exp.startDate || "",
              endDate: exp.endDate || "",
              currentlyWorking: Boolean(exp.currentlyWorking || false),
              description: String(exp.description || ""),
            }))
          : [],

        certificate: Array.isArray(profile.certificate)
          ? profile.certificate.map((cert) => ({
              name: String(cert.name || ""),
              issuer: String(cert.issuer || ""),
              issueDate: cert.issueDate || "",
              expiryDate: cert.expiryDate || "",
              credentialId: String(cert.credentialId || ""),
              url: String(cert.url || ""),
            }))
          : [],

        language: Array.isArray(profile.language)
          ? profile.language.map((lang) => ({
              language: String(lang.language || ""),
              proficiency: String(lang.proficiency || "Basic"),
            }))
          : [],

        resume: String(profile.resume || ""),
      };

      console.log("💾 Saving CLEANED data to backend:", cleanedData);

      const res = await axios.put(
        `${API}/auth/update-jobseeker-profile`,
        cleanedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("✅ Save response:", res.data);

      if (res.data.success) {
        alert("Profile saved successfully!");
        fetchProfile();
      }
    } catch (err) {
      console.log("❌ Save Profile Error:", err.response?.data || err.message);
      alert(
        "Failed to save profile: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end mb-6">
          <button
            onClick={saveProfileToBackend}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            💾 Save Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.userInfo.image}
                    className="w-16 h-16 rounded-full border-2 border-blue-100 object-cover"
                    alt="Profile"
                  />
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">
                      {profile.userInfo.name}
                    </h3>
                    <p className="text-base text-gray-600">
                      {profile.userInfo.college}
                    </p>
                    <p className="text-base text-gray-500">
                      {profile.userInfo.location}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModal("userInfo")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-3 pt-4 border-t">
                {[
                  { label: "Email", value: profile.basic.email },
                  { label: "Mobile", value: profile.basic.mobile },
                  { label: "Date of Birth", value: profile.basic.dob },
                  { label: "Gender", value: profile.basic.gender },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-base text-gray-600">
                      {item.label}
                    </span>
                    <span className="text-base font-medium text-black">
                      {item.value || "Not set"}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setModal("basic")}
                className="w-full mt-4 text-center text-blue-600 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                Edit Details
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-black">Languages known</h4>
                <button
                  onClick={() => setModal("language")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-2 text-black">
                {profile.language.length > 0 ? (
                  profile.language.map((lang, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-black">
                          {lang.language}
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                          {lang.proficiency}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteLanguage(index)}
                        className="text-gray-400 hover:text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No languages added</p>
                )}
              </div>
            </div>
            {/* ================= APPLIED JOBS ================= */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Jobs Applied
                  </h4>
                  <p className="text-sm text-gray-500">
                    Jobs you have applied for
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {appliedJobs.length > 0 ? (
                  <>
                    {/* SHOW ONLY FIRST 3 JOBS */}
                    {appliedJobs.slice(0, 3).map((app, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              {app.job?.title || "Job Title"}
                            </h5>

                            <p className="text-sm text-gray-600 mt-1">
                              {app.job?.companyName || "Company"} •{" "}
                              {app.job?.location || "Location"}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              Applied on:{" "}
                              {new Date(app.appliedAt).toLocaleDateString()}
                            </p>
                          </div>

                          {/* STATUS */}
                          <span
                            className={`text-xs px-3 py-1 rounded-full capitalize font-medium
                ${
                  app.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : app.status === "shortlisted"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
                          >
                            {app.status || "pending"}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* VIEW ALL BUTTON */}
                    {appliedJobs.length > 3 && (
                      <div className="text-center mt-4">
                        <button
                          onClick={() => router.push("/my-applications")}
                          className="px-5 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                        >
                          View All Applications →
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      You have not applied to any jobs yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Education</h4>
                  <p className="text-sm text-gray-500">
                    Your academic qualifications
                  </p>
                </div>
                <button
                  onClick={() => setModal("education")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-4">
                {profile.education.length > 0 ? (
                  profile.education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            {edu.degree} - {edu.field}
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">
                            {edu.college}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {edu.batch}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {edu.type}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEducation(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No education added yet</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Skills</h4>
                  <p className="text-sm text-gray-500">
                    Get noticed for the right job by adding your skills
                  </p>
                </div>
                <button
                  onClick={() => setModal("skills")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  + Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm font-medium text-blue-700">
                        {skill}
                      </span>
                      <button
                        onClick={() => deleteSkill(index)}
                        className="text-blue-400 hover:text-red-500 ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Work Experience
                  </h4>
                  <p className="text-sm text-gray-500">
                    Your professional work history
                  </p>
                </div>
                <button
                  onClick={() => setModal("experience")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-3">
                {profile.experience.length > 0 ? (
                  profile.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <p className="text-base font-semibold text-gray-800">
                          {exp.position || "Role"} at {exp.company || "Company"}
                        </p>

                        {(exp.startDate ||
                          exp.endDate ||
                          exp.currentlyWorking) && (
                          <p className="text-base text-gray-700 mt-1">
                            {formatDate(exp.startDate)}{" "}
                            {exp.currentlyWorking
                              ? " - Present"
                              : exp.endDate
                                ? ` - ${formatDate(exp.endDate)}`
                                : ""}
                          </p>
                        )}

                        {exp.description && (
                          <p className="text-base text-gray-500 mt-1">
                            {exp.description}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => deleteExperience(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No work experience added yet
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add your work experience to improve job matches
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Certifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    Your professional certifications
                  </p>
                </div>
                <button
                  onClick={() => setModal("certificate")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-3">
                {profile.certificate.length > 0 ? (
                  profile.certificate.map((cert, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <p className="text-base font-semibold text-gray-800">
                          {cert?.name || cert}
                        </p>

                        {cert?.issuer && (
                          <p className="text-base text-gray-700 mt-1">
                            Issuer: {cert.issuer}
                          </p>
                        )}

                        {(cert?.issueDate || cert?.expiryDate) && (
                          <p className="text-base text-gray-700">
                            {cert.issueDate
                              ? `Issued: ${formatDate(cert.issueDate)}`
                              : ""}
                            {cert.expiryDate
                              ? ` | Expiry: ${formatDate(cert.expiryDate)}`
                              : ""}
                          </p>
                        )}

                        {cert?.credentialId && (
                          <p className="text-base text-gray-700">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}

                        {cert?.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-base text-blue-600 hover:underline"
                          >
                            View Credential
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => deleteCertificate(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No certifications added</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Resume</h4>
                  <p className="text-sm text-gray-500">
                    Upload your latest resume
                  </p>
                </div>
                <button
                  onClick={() => setModal("resume")}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  + Add
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                {profile.resume ? (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">📄</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {profile.resume}
                        </p>
                        <p className="text-xs text-gray-500">PDF Document</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDownloadResume}
                        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        Download
                      </button>
                      <button
                        onClick={deleteResume}
                        className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-2">No resume uploaded</p>
                    <p className="text-sm text-gray-400">
                      Upload your resume to apply for jobs faster
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <ProfileModal
          type={modal}
          close={() => setModal(null)}
          profile={profile}
          setProfile={setProfile}
        />
      )}
    </section>
  );
}
