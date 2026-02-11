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
  const API = process.env.NEXT_PUBLIC_API_URL;

  // const API = "http://localhost:5000/api";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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
        <h1 className="text-2xl font-bold text-black flex items-center gap-2">
          <Eye size={22} /> Applicant Details
        </h1>

        <hr />

        {/* USER INFO */}
        <div className="text-black">
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
        <div className="text-black">
          <p>
            <b>Job:</b> {app.job?.title}
          </p>
          <p>
            <b>Location:</b> {app.job?.location}
          </p>
        </div>

        {/* STATUS */}
        <div>
          {/* SKILLS */}
          {/* DATE OF BIRTH */}
          {app.applicant?.dateOfBirth && (
            <div>
              <p className="font-semibold mb-2 text-black">Date of Birth</p>
              <p className="text-gray-700 text-base">
                {" "}
                {new Date(app.applicant.dateOfBirth).toLocaleDateString(
                  "en-IN",
                )}
              </p>
            </div>
          )}

          {/* LANGUAGES */}
          {app.applicant?.jobseekerProfile?.languages?.length > 0 && (
            <div>
              <p className="font-semibold mb-2 text-gray-700">Languages</p>

              <div className="space-y-1">
                {app.applicant.jobseekerProfile.languages.map((lang, i) => (
                  <p key={i} className="text-gray-700 text-base font-semibold">
                    {lang.language} — {lang.proficiency}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {app.applicant?.jobseekerProfile?.experience?.length > 0 && (
            <div>
              <p className="font-semibold mb-2 text-gray-700">Experience</p>

              {app.applicant.jobseekerProfile.experience.map((exp, i) => (
                <div key={i} className="border p-3 rounded mb-2">
                  <p className="font-medium text-lg text-black">
                    {exp.position}
                  </p>
                  <p className="text-base text-gray-600">{exp.company}</p>

                  <p className="text-base text-gray-600">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {exp.currentlyWorking
                      ? "Present"
                      : new Date(exp.endDate).toLocaleDateString()}
                  </p>

                  <p className="text-base mt-1 text-gray-600">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* CERTIFICATIONS */}
          {app.applicant?.jobseekerProfile?.certifications?.length > 0 && (
            <div>
              <p className="font-semibold mb-2 text-gray-700">Certifications</p>

              {app.applicant.jobseekerProfile.certifications.map((cert, i) => (
                <div key={i} className="border p-3 rounded mb-2">
                  <p className="font-medium text-gray-700 text-lg">
                    {cert.name}
                  </p>

                  <p className="text-base text-gray-600">{cert.issuer}</p>

                  <p className="text-base text-gray-600">
                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  </p>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      className="text-gray-700 text-base underline "
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* RESUME */}
          {app.applicant?.resume && (
            <div>
              <p className="font-semibold mb-2 text-gray-700">Resume</p>

              <a
                href={`${API_BASE_URL.replace("/api", "")}/uploads/resumes/${app.applicant.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 underline text-base"
              >
                📄 View / Download Resume
              </a>
            </div>
          )}
          <p className="text-base text-gray-700">
            <b>Status:</b> {app.status}
          </p>
          <p className="text-base text-gray-700">
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
          className="mt-4 px-4 py-2 text-white bg-[#0F2A44] rounded"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}
