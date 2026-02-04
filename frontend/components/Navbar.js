// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import LoginModal from "./LoginModal";

// export default function Navbar() {

//   /* ---------------- AUTH ---------------- */
//   const [user, setUser] = useState(null);

//   /* ---------------- DESKTOP ---------------- */
//   const [showJobs, setShowJobs] = useState(false);
//   const [showCity, setShowCity] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   /* ---------------- MOBILE ---------------- */
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [mobileJobs, setMobileJobs] = useState(false);
//   const [mobileCity, setMobileCity] = useState(false);

//   /* ---------------- LOGIN ---------------- */
//   const [showLogin, setShowLogin] = useState(false);

//   /* ---------------- REFS ---------------- */
//   const jobsRef = useRef(null);
//   const profileRef = useRef(null);

//   /* ---------------- LOAD USER ---------------- */
//   useEffect(() => {
//     const saved = localStorage.getItem("apnajob_user");
//     if (saved) setUser(saved);
//   }, []);

//   /* ---------------- OUTSIDE CLICK ---------------- */
//   useEffect(() => {

//     const handleClick = (e) => {

//       // Jobs dropdown
//       if (jobsRef.current && !jobsRef.current.contains(e.target)) {
//         setShowJobs(false);
//         setShowCity(false);
//       }

//       // Profile dropdown
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setShowProfile(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClick);

//     return () =>
//       document.removeEventListener("mousedown", handleClick);

//   }, []);

//   /* ---------------- LOGOUT ---------------- */
//   const logout = () => {
//     localStorage.removeItem("apnajob_user");
//     setUser(null);
//     setShowProfile(false);
//     setMobileMenu(false);
//   };

//   return (
//     <>
//       <nav className="bg-white text-black shadow-md px-4 md:px-6 py-3 relative z-40">

//         <div className="max-w-7xl mx-auto flex justify-between items-center">

//           {/* LOGO */}
//           <Link href="/" className="text-2xl font-bold text-blue-600">
//             Apna<span className="text-orange-500">Job</span>
//           </Link>

//           {/* ================= DESKTOP MENU ================= */}
//           <div className="hidden md:flex items-center space-x-6">

//             {/* JOBS */}
//             <div ref={jobsRef} className="relative">

//               <button
//                 onClick={() => setShowJobs(!showJobs)}
//                 className="font-medium hover:text-blue-600"
//               >
//                 Jobs ▾
//               </button>

//               {showJobs && (
//                 <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg w-64 mt-2 p-4">

//                   {[
//                     "Work From Home",
//                     "Part Time Jobs",
//                     "Freshers Jobs",
//                     "Full Time Jobs",
//                     "Night Shift Jobs",
//                   ].map((job) => (
//                     <p
//                       key={job}
//                       className="hover:text-blue-600 cursor-pointer"
//                     >
//                       {job}
//                     </p>
//                   ))}

//                   <hr className="my-2" />

//                   <button
//                     onClick={() => setShowCity(!showCity)}
//                     className="w-full text-left hover:text-blue-600"
//                   >
//                     Jobs By City →
//                   </button>

//                   {showCity && (
//                     <div className="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-lg w-72 p-4 grid grid-cols-2 gap-2">

//                       {[
//                         "Delhi","Mumbai","Bangalore","Pune",
//                         "Chennai","Hyderabad","Jaipur","Indore",
//                       ].map((city) => (
//                         <p
//                           key={city}
//                           className="hover:text-orange-500 cursor-pointer"
//                         >
//                           {city}
//                         </p>
//                       ))}

//                     </div>
//                   )}

//                 </div>
//               )}

//             </div>

//             <Link href="#" className="hover:text-blue-600">
//               Job Prep
//             </Link>

//             <Link href="#" className="hover:text-blue-600">
//               Resume Tools
//             </Link>

//           </div>

//           {/* ================= DESKTOP AUTH ================= */}
//           <div className="hidden md:flex items-center space-x-4">

//             {!user ? (

//               <button
//                 onClick={() => setShowLogin(true)}
//                 className="bg-blue-600 hover:bg-orange-500 text-white px-4 py-2 rounded"
//               >
//                 Candidate Login
//               </button>

//             ) : (

//               <div ref={profileRef} className="relative">

//                 <button
//                   onClick={() => setShowProfile(!showProfile)}
//                   className="bg-gray-100 px-4 py-2 rounded font-medium"
//                 >
//                   👤 {user} ▾
//                 </button>

//                 {showProfile && (
//                   <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-40">

//                     <Link
//                       href="/profile"
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       My Profile
//                     </Link>

//                     <button
//                       onClick={logout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//                     >
//                       Logout
//                     </button>

//                   </div>
//                 )}

//               </div>
//             )}

//           </div>

//           {/* ================= MOBILE BUTTON ================= */}
//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="md:hidden text-2xl"
//           >
//             ☰
//           </button>

//         </div>

//         {/* ================= MOBILE MENU ================= */}
//         {mobileMenu && (
//           <div className="md:hidden mt-3 border-t pt-3 space-y-2 px-3 pb-4">

//             {/* Jobs */}
//             <button
//               onClick={() => setMobileJobs(!mobileJobs)}
//               className="w-full text-left font-medium"
//             >
//               Jobs {mobileJobs ? "▲" : "▼"}
//             </button>

//             {mobileJobs && (
//               <div className="pl-4 space-y-1 text-sm">

//                 {[
//                   "Work From Home",
//                   "Part Time Jobs",
//                   "Freshers Jobs",
//                   "Full Time Jobs",
//                   "Night Shift Jobs",
//                 ].map((job) => (
//                   <p key={job}>{job}</p>
//                 ))}

//                 <button
//                   onClick={() => setMobileCity(!mobileCity)}
//                   className="text-blue-600"
//                 >
//                   Jobs By City →
//                 </button>

//                 {mobileCity && (
//                   <div className="pl-3 space-y-1">

//                     {[
//                       "Delhi","Mumbai","Bangalore","Pune",
//                       "Chennai","Hyderabad","Jaipur","Indore",
//                     ].map((city) => (
//                       <p key={city}>{city}</p>
//                     ))}

//                   </div>
//                 )}
//               </div>
//             )}

//             <Link href="#" className="block">Job Prep</Link>
//             <Link href="#" className="block">Resume Tools</Link>

//             {/* AUTH */}
//             {!user ? (
//               <button
//                 onClick={() => {
//                   setShowLogin(true);
//                   setMobileMenu(false);
//                 }}
//                 className="w-full bg-blue-600 text-white py-2 rounded mt-2"
//               >
//                 Candidate Login
//               </button>
//             ) : (
//               <>
//                 <Link
//                   href="/profile"
//                   onClick={() => setMobileMenu(false)}
//                   className="block"
//                 >
//                   My Profile
//                 </Link>

//                 <button
//                   onClick={logout}
//                   className="w-full text-left text-red-500"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}

//           </div>
//         )}

//       </nav>

//       {/* ================= LOGIN MODAL ================= */}
//       <LoginModal
//         isOpen={showLogin}
//         onClose={() => setShowLogin(false)}
//         onLogin={(mobile) => {
//           setUser(mobile);
//           setShowLogin(false);
//         }}
//       />
//     </>
//   );
// // }
// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import LoginModal from "./LoginModal";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const router = useRouter();

//   /* ---------------- AUTH ---------------- */
//   const [user, setUser] = useState(null);
//   const [userType, setUserType] = useState(null);

//   /* ---------------- DESKTOP ---------------- */
//   const [showJobs, setShowJobs] = useState(false);
//   const [showCity, setShowCity] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   /* ---------------- MOBILE ---------------- */
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [mobileJobs, setMobileJobs] = useState(false);
//   const [mobileCity, setMobileCity] = useState(false);

//   /* ---------------- LOGIN ---------------- */
//   const [showLogin, setShowLogin] = useState(false);
//   const [loginType, setLoginType] = useState("candidate");

//   /* ---------------- REFS ---------------- */
//   const jobsRef = useRef(null);
//   const profileRef = useRef(null);

//   /* ---------------- LOAD USER ON MOUNT AND ON STORAGE CHANGE ---------------- */
//   useEffect(() => {
//     // Function to load user from localStorage
//     const loadUser = () => {
//       const savedUser = localStorage.getItem("apnajob_user");
//       const savedType = localStorage.getItem("apnajob_user_type");

//       console.log("Loading user from storage:", savedUser, savedType); // Debug log

//       if (savedUser) {
//         setUser(savedUser);
//         setUserType(savedType || "candidate");
//       } else {
//         setUser(null);
//         setUserType(null);
//       }
//     };

//     // Initial load
//     loadUser();

//     // Listen for storage changes (for login/logout from other tabs/components)
//     const handleStorageChange = (e) => {
//       if (e.key === "apnajob_user" || e.key === "apnajob_user_type") {
//         loadUser();
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     // Cleanup
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   /* ---------------- OUTSIDE CLICK ---------------- */
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (jobsRef.current && !jobsRef.current.contains(e.target)) {
//         setShowJobs(false);
//         setShowCity(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setShowProfile(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   /* ---------------- LOGOUT ---------------- */
//   const logout = () => {
//     localStorage.removeItem("apnajob_user");
//     localStorage.removeItem("apnajob_user_type");
//     setUser(null);
//     setUserType(null);
//     setShowProfile(false);
//     setMobileMenu(false);
//     router.push("/"); // Redirect to home
//   };

//   /* ---------------- HANDLE LOGIN FROM MODAL ---------------- */
//   const handleLoginSuccess = (mobile, type) => {
//     console.log("Login success callback:", mobile, type); // Debug log

//     setUser(mobile);
//     setUserType(type);
//     setShowLogin(false);

//     // Force re-render by updating state
//     setTimeout(() => {
//       if (type === "employer") {
//         router.push("/employer/dashboard");
//       } else {
//         router.push("/profile");
//       }
//     }, 100);
//   };

//   /* ---------------- OPEN LOGIN MODAL ---------------- */
//   const openCandidateLogin = () => {
//     setLoginType("candidate");
//     setShowLogin(true);
//   };

//   const openEmployerLogin = () => {
//     setLoginType("employer");
//     setShowLogin(true);
//   };

//   return (
//     <>
//       <nav className="bg-white text-black shadow-md px-4 md:px-6 py-3 relative z-40">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           {/* LOGO */}
//           <Link href="/" className="text-2xl font-bold text-blue-600">
//             Apna<span className="text-orange-500">Job</span>
//           </Link>

//           {/* ================= DESKTOP MENU ================= */}
//           <div className="hidden md:flex items-center space-x-6">
//             {/* JOBS DROPDOWN */}
//             <div ref={jobsRef} className="relative">
//               <button
//                 onClick={() => setShowJobs(!showJobs)}
//                 className="font-medium hover:text-blue-600"
//               >
//                 Jobs ▾
//               </button>
//               {/* ... rest of jobs dropdown ... */}
//             </div>
//             <Link href="#" className="hover:text-blue-600">
//               Job Prep
//             </Link>
//             <Link href="#" className="hover:text-blue-600">
//               Resume Tools
//             </Link>
//           </div>

//           {/* ================= DESKTOP AUTH ================= */}
//           <div className="hidden md:flex items-center space-x-4">
//             {!user ? (
//               <div className="flex items-center space-x-3">
//                 {/* Candidate Login Button */}
//                 <button
//                   onClick={openCandidateLogin}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
//                 >
//                   Candidate Login
//                 </button>
//                 {/* Employer Login Button */}
//                 <button
//                   onClick={openEmployerLogin}
//                   className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium"
//                 >
//                   Employer Login
//                 </button>
//               </div>
//             ) : (
//               <div ref={profileRef} className="relative">
//                 {/* USER PROFILE BUTTON - THIS SHOULD SHOW AFTER LOGIN */}
//                 <button
//                   onClick={() => setShowProfile(!showProfile)}
//                   className={`px-4 py-2 rounded font-medium flex items-center gap-2 ${
//                     userType === "employer"
//                       ? "bg-orange-100 text-orange-700 border border-orange-300"
//                       : "bg-blue-100 text-blue-700 border border-blue-300"
//                   }`}
//                 >
//                   <span className="text-lg">
//                     {userType === "employer" ? "🏢" : "👤"}
//                   </span>
//                   <span>{user}</span>
//                   <span>▾</span>
//                 </button>

//                 {/* PROFILE DROPDOWN */}
//                 {showProfile && (
//                   <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 border">
//                     <div className="p-2 border-b text-xs text-gray-500">
//                       Logged in as{" "}
//                       <b>
//                         {userType === "employer" ? "Employer" : "Candidate"}
//                       </b>
//                     </div>
//                     <Link
//                       href={
//                         userType === "employer"
//                           ? "/employer/dashboard"
//                           : "/profile"
//                       }
//                       className="block px-4 py-2 hover:bg-gray-100"
//                       onClick={() => setShowProfile(false)}
//                     >
//                       {userType === "employer"
//                         ? "🏢 Dashboard"
//                         : "👤 My Profile"}
//                     </Link>
//                     {userType === "employer" && (
//                       <>
//                         <Link
//                           href="/employer/post-job"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                           onClick={() => setShowProfile(false)}
//                         >
//                           📝 Post a Job
//                         </Link>
//                         <Link
//                           href="/employer/my-jobs"
//                           className="block px-4 py-2 hover:bg-gray-100"
//                           onClick={() => setShowProfile(false)}
//                         >
//                           📋 My Jobs
//                         </Link>
//                       </>
//                     )}
//                     <button
//                       onClick={logout}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 border-t"
//                     >
//                       🚪 Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setMobileMenu(!mobileMenu)}
//             className="md:hidden text-2xl"
//           >
//             ☰
//           </button>
//         </div>

//         {/* ================= MOBILE MENU ================= */}
//         {mobileMenu && (
//           <div className="md:hidden mt-3 border-t pt-3 space-y-2 px-3 pb-4">
//             {/* Mobile menu content */}
//             {!user ? (
//               <div className="space-y-2 mt-2">
//                 <button
//                   onClick={openCandidateLogin}
//                   className="w-full bg-blue-600 text-white py-2 rounded"
//                 >
//                   Candidate Login
//                 </button>
//                 <button
//                   onClick={openEmployerLogin}
//                   className="w-full bg-orange-500 text-white py-2 rounded"
//                 >
//                   Employer Login
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="p-2 bg-gray-100 rounded">
//                   <span className="font-medium">{user}</span>
//                   <span className="text-sm text-gray-600 ml-2">
//                     ({userType === "employer" ? "Employer" : "Candidate"})
//                   </span>
//                 </div>
//                 <Link
//                   href={
//                     userType === "employer" ? "/employer/dashboard" : "/profile"
//                   }
//                   onClick={() => setMobileMenu(false)}
//                   className="block font-medium py-2"
//                 >
//                   {userType === "employer" ? "🏢 Dashboard" : "👤 My Profile"}
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="w-full text-left text-red-500 py-2"
//                 >
//                   🚪 Logout
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* ================= LOGIN MODAL ================= */}
//       <LoginModal
//         isOpen={showLogin}
//         onClose={() => setShowLogin(false)}
//         onLogin={handleLoginSuccess}
//         type={loginType}
//       />
//     </>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  /* ---------------- AUTH ---------------- */
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  /* ---------------- DESKTOP ---------------- */
  const [showJobs, setShowJobs] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  /* ---------------- MOBILE ---------------- */
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileJobs, setMobileJobs] = useState(false);
  const [mobileCity, setMobileCity] = useState(false);

  /* ---------------- LOGIN ---------------- */
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState("candidate");

  /* ---------------- REFS ---------------- */
  const jobsRef = useRef(null);
  const profileRef = useRef(null);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      console.log("Navbar Load:", token, savedUser);

      if (token && savedUser) {
        const parsed = JSON.parse(savedUser);

        setUser(parsed.phone || parsed.name || "User");
        setUserType(parsed.userType);
      } else {
        setUser(null);
        setUserType(null);
      }
    };

    loadUser();

    const handleStorage = (e) => {
      if (e.key === "token" || e.key === "user") {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClick = (e) => {
      if (jobsRef.current && !jobsRef.current.contains(e.target)) {
        setShowJobs(false);
        setShowCity(false);
      }

      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setUserType(null);

    setShowProfile(false);
    setMobileMenu(false);

    router.push("/");
  };

  /* ---------------- LOGIN SUCCESS ---------------- */
  const handleLoginSuccess = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);

      setUser(parsed.phone || parsed.name || "User");
      setUserType(parsed.userType);

      setShowLogin(false);

      setTimeout(() => {
        if (parsed.userType === "employer") {
          router.push("/employer/dashboard");
        } else {
          router.push("/profile");
        }
      }, 100);
    }
  };

  /* ---------------- OPEN LOGIN MODAL ---------------- */
  const openCandidateLogin = () => {
    setLoginType("candidate");
    setShowLogin(true);
  };

  const openEmployerLogin = () => {
    setLoginType("employer");
    setShowLogin(true);
  };

  return (
    <>
      <nav className="bg-white text-black shadow-md px-4 md:px-6 py-3 relative z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Apna<span className="text-orange-500">Job</span>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center space-x-6">
            <div ref={jobsRef} className="relative">
              <button
                onClick={() => setShowJobs(!showJobs)}
                className="font-medium hover:text-blue-600"
              >
                Jobs ▾
              </button>
            </div>

            <Link href="#" className="hover:text-blue-600">
              Job Prep
            </Link>

            <Link href="#" className="hover:text-blue-600">
              Resume Tools
            </Link>
          </div>

          {/* ================= DESKTOP AUTH ================= */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={openCandidateLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                >
                  Candidate Login
                </button>

                <button
                  onClick={openEmployerLogin}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium"
                >
                  Employer Login
                </button>
              </div>
            ) : (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={`px-4 py-2 rounded font-medium flex items-center gap-2 ${
                    userType === "employer"
                      ? "bg-orange-100 text-orange-700 border border-orange-300"
                      : "bg-blue-100 text-blue-700 border border-blue-300"
                  }`}
                >
                  <span className="text-lg">
                    {userType === "employer" ? "🏢" : "👤"}
                  </span>

                  <span>{user}</span>

                  <span>▾</span>
                </button>

                {/* PROFILE DROPDOWN */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 border">
                    <div className="p-2 border-b text-xs text-gray-500">
                      Logged in as{" "}
                      <b>
                        {userType === "employer" ? "Employer" : "Candidate"}
                      </b>
                    </div>

                    <Link
                      href={
                        userType === "employer"
                          ? "/employer/dashboard"
                          : "/profile"
                      }
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowProfile(false)}
                    >
                      {userType === "employer"
                        ? "🏢 Dashboard"
                        : "👤 My Profile"}
                    </Link>

                    {userType === "employer" && (
                      <>
                        <Link
                          href="/employer/post-job"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setShowProfile(false)}
                        >
                          📝 Post a Job
                        </Link>

                        <Link
                          href="/employer/my-jobs"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setShowProfile(false)}
                        >
                          📋 My Jobs
                        </Link>
                      </>
                    )}

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 border-t"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BTN */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenu && (
          <div className="md:hidden mt-3 border-t pt-3 space-y-2 px-3 pb-4">
            {!user ? (
              <div className="space-y-2 mt-2">
                <button
                  onClick={openCandidateLogin}
                  className="w-full bg-blue-600 text-white py-2 rounded"
                >
                  Candidate Login
                </button>

                <button
                  onClick={openEmployerLogin}
                  className="w-full bg-orange-500 text-white py-2 rounded"
                >
                  Employer Login
                </button>
              </div>
            ) : (
              <>
                <div className="p-2 bg-gray-100 rounded">
                  <span className="font-medium">{user}</span>

                  <span className="text-sm text-gray-600 ml-2">
                    ({userType === "employer" ? "Employer" : "Candidate"})
                  </span>
                </div>

                <Link
                  href={
                    userType === "employer" ? "/employer/dashboard" : "/profile"
                  }
                  onClick={() => setMobileMenu(false)}
                  className="block font-medium py-2"
                >
                  {userType === "employer" ? "🏢 Dashboard" : "👤 My Profile"}
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left text-red-500 py-2"
                >
                  🚪 Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ================= LOGIN MODAL ================= */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLoginSuccess}
        type={loginType}
      />
    </>
  );
}
