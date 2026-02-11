"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
// import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

  /* ---------------- REFS ---------------- */
  const jobsRef = useRef(null);
  const profileRef = useRef(null);
  const pathname = usePathname();
  /* ================= LOAD USER ================= */

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

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
  }, [pathname]); // 🔥 ROUTE CHANGE = AUTH RELOAD

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
    router.push("/login"); // ✅ direct login page
  };

  const openEmployerLogin = () => {
    router.push("/employer/login");
  };
  return (
    <>
      <nav className="bg-white text-black shadow-md px-4 md:px-6 py-3 relative z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          {/* <Link href="/" className="text-2xl font-bold text-blue-600">
            Apna<span className="text-orange-500">Job</span>
          </Link> */}

          <Link href="/" className="flex items-center">
            <Image
              src="/web-logo/main-logo1.png"
              alt="ApnaJob Logo"
              width={140}
              height={40}
              priority
            />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center space-x-6">
            <div ref={jobsRef} className="relative">
              <Link href="/jobs" className="font-medium hover:text-blue-600">
                Jobs
              </Link>
            </div>
            {/* <Link href="#" className="hover:text-blue-600">
              Job Prep
            </Link> */}
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
                  className="bg-[#0F2A44] hover:bg-orange-500 text-white px-4 py-2 rounded font-medium"
                >
                  Candidate Login
                </button>

                <button
                  onClick={openEmployerLogin}
                  className="bg-orange-500 hover:bg-[#0F2A44] text-white px-4 py-2 rounded font-medium"
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
            {/* MOBILE NAV LINKS */}
            <div className="space-y-2 mb-3">
              <Link
                href="/jobs"
                onClick={() => setMobileMenu(false)}
                className="block font-medium py-2"
              >
                Jobs
              </Link>

              {/* <Link
                href="/job-prep"
                onClick={() => setMobileMenu(false)}
                className="block font-medium py-2"
              >
                Job Prep
              </Link> */}

              <Link
                href="/resume-tools"
                onClick={() => setMobileMenu(false)}
                className="block font-medium py-2"
              >
                Resume Tools
              </Link>
            </div>

            <hr />

            {!user ? (
              <div className="space-y-2 mt-2">
                <button
                  onClick={openCandidateLogin}
                  className="w-full bg-[#0F2A44] text-white py-2 rounded"
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
    </>
  );
}
