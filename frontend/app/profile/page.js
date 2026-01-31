"use client";

import { useState, useEffect } from "react";
import ProfileModal from "@/components/ProfileModal";

export default function ProfilePage() {
  // 🔥 MAIN PROFILE DATA - localStorage se load karo
  const [profile, setProfile] = useState({
    basic: {
      email: "mahesh@gmail.com",
      mobile: "7852865819",
      dob: "2003-12-04",
      gender: "Male",
    },
    education: [
      {
        degree: "BCA",
        college: "Jai Narain Vyas University - [JNVU], Jodhpur",
        field: "Mobile Application and Web Technology",
        batch: "2021 - 2024",
        type: "Graduate",
      },
    ],
    skills: [
      "Good Communication Skills",
      "HTML5",
      "Responsiveness",
      "Friendly",
      "GitHub",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "TailwindCSS",
      "TypeScript",
      "Next.js",
      "GIT",
      "UX/UI Testing",
      "Architecture",
      "Web applications",
      "Vercel",
      "Firebase",
      "OpenWeatherMap",
      "Media Queries",
      "Front-end app development",
      "Management",
      "Project Work",
      "Web performance optimization",
      "Continuous Deployment",
      "Programming languages",
    ],
    language: [
      { language: "English", proficiency: "Basic" },
      { language: "Hindi", proficiency: "Fluent" },
    ],
    certificate: [],
    resume: "Mahesh_Resume.pdf",
    experience: [],
    userInfo: {
      name: "Mahesh Kumar Vyas",
      college: "JNVU Jodhpur",
      location: "New Delhi",
      image: "/images/freasher.png",
    },
  });

  const [modal, setModal] = useState(null);

  // 🔥 PAGE LOAD PAR LOCALSTORAGE SE DATA LOAD KARO
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // 🔥 PROFILE UPDATE PAR LOCALSTORAGE ME SAVE KARO
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  // 🔥 DELETE FUNCTIONS
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

  // 🔥 RESUME DOWNLOAD HANDLER
  const handleDownloadResume = () => {
    if (profile.resume) {
      const link = document.createElement("a");
      link.href = `/resumes/${profile.resume}`;
      link.download = profile.resume;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - PROFILE SUMMARY */}
          <div className="space-y-6">
            {/* PROFILE CARD */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={profile.userInfo.image}
                    className="w-16 h-16 rounded-full border-2 border-blue-100"
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

              {/* BASIC DETAILS */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Email</span>
                  <span className="text-base font-medium text-black">
                    {profile.basic.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Mobile</span>
                  <span className="text-base font-medium text-black">
                    {profile.basic.mobile}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Date of Birth</span>
                  <span className="text-base font-medium text-black">
                    {profile.basic.dob}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-600">Gender</span>
                  <span className="text-base font-medium text-black">
                    {profile.basic.gender}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setModal("basic")}
                className="w-full mt-4 text-center text-blue-600 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                Edit Details
              </button>
            </div>

            {/* LANGUAGES KNOWN */}
            <div className="bg-white rounded-xl border text-black border-gray-200 shadow-sm p-6">
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
                {profile.language.map((lang, index) => (
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
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* EDUCATION */}
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
                {profile.education.map((edu, index) => (
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
                ))}
              </div>
            </div>

            {/* SKILLS */}
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
                {profile.skills.map((skill, index) => (
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
                ))}
              </div>
            </div>

            {/* WORK EXPERIENCE */}
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
                {profile.experience.length ? (
                  profile.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-gray-700">{exp}</p>
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

            {/* CERTIFICATIONS */}
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
                {profile.certificate.length ? (
                  profile.certificate.map((cert, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <p className="text-sm font-medium text-gray-700">
                        {cert}
                      </p>
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

            {/* RESUME */}
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

      {/* MODAL */}
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
