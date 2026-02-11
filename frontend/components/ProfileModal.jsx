"use client";

import { useState, useEffect } from "react";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ProfileModal({ type, close, profile, setProfile }) {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(
    profile.userInfo?.image || "/images/freasher.png",
  );

  /* ================= INIT ================= */
  useEffect(() => {
    console.log("🔥 Modal Type:", type);
    switch (type) {
      case "basic":
        setFormData(profile.basic || {});
        break;

      case "userInfo":
        setFormData(profile.userInfo || {});
        setImagePreview(profile.userInfo?.image || "/images/freasher.png");
        break;

      case "education":
        setFormData({
          degree: "",
          college: "",
          field: "",
          batch: "",
          type: "Graduate",
        });
        break;

      case "skills":
        setFormData({ skill: "" });
        break;

      case "language":
        setFormData({ language: "", proficiency: "Basic" });
        break;

      case "experience":
        setFormData({
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        });
        break;

      case "certificate":
        setFormData({
          name: "",
          issuer: "",
          issueDate: "",
          expiryDate: "",
          credentialId: "",
          url: "",
        });
        break;

      case "resume":
        setFormData({ resume: null });
        break;

      default:
        setFormData({});
    }
  }, [type, profile]);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((p) => ({ ...p, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= SUBMIT - FIXED VERSION ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedProfile = { ...profile };

    // ================= UPDATE LOCAL DATA =================
    switch (type) {
      case "basic":
        updatedProfile.basic = formData;
        break;

      case "userInfo":
        updatedProfile.userInfo = {
          ...formData,
          image: imagePreview,
        };
        break;

      case "education":
        const newEducation = {
          degree: String(formData.degree || ""),
          college: String(formData.college || ""),
          field: String(formData.field || ""),
          batch: String(formData.batch || ""),
          type: String(formData.type || ""),
        };

        updatedProfile.education = [
          ...(Array.isArray(profile.education) ? profile.education : []),
          newEducation,
        ];
        break;

      case "skills":
        if (formData.skill?.trim()) {
          updatedProfile.skills = [
            ...(profile.skills || []),
            formData.skill.trim(),
          ];
        }
        break;

      case "experience":
        if (formData.company || formData.position) {
          updatedProfile.experience = [
            ...(profile.experience || []),
            {
              company: String(formData.company || ""),
              position: String(formData.position || ""),
              startDate: formData.startDate || "",
              endDate: formData.endDate || "",
              currentlyWorking: Boolean(formData.currentlyWorking || false),
              description: String(formData.description || ""),
            },
          ];
        }
        break;

      case "certificate":
        if (formData.name) {
          updatedProfile.certificate = [
            ...(profile.certificate || []),
            {
              name: String(formData.name || ""),
              issuer: String(formData.issuer || ""),
              issueDate: formData.issueDate || "",
              expiryDate: formData.expiryDate || "",
              credentialId: String(formData.credentialId || ""),
              url: String(formData.url || ""),
            },
          ];
        }
        break;

      case "language":
        if (formData.language) {
          updatedProfile.language = [
            ...(profile.language || []),
            {
              language: String(formData.language || ""),
              proficiency: String(formData.proficiency || "Basic"),
            },
          ];
        }
        break;

      case "resume":
        if (formData.resume) {
          updatedProfile.resume = formData.resume.name;
        }
        break;
    }

    // ================= CLEAN EDUCATION (NO NEED NOW) =================
    // Removed the extra cleaning since we're already cleaning above

    // ================= FINAL PAYLOAD =================
    const payload = {
      basic: updatedProfile.basic || {},
      userInfo: updatedProfile.userInfo || {},

      // ✅ DIRECT ARRAY - NO STRINGIFICATION
      education: Array.isArray(updatedProfile.education)
        ? updatedProfile.education.map((edu) => ({
            degree: String(edu.degree || ""),
            college: String(edu.college || ""),
            field: String(edu.field || ""),
            batch: String(edu.batch || ""),
            type: String(edu.type || ""),
          }))
        : [],

      // ✅ OTHER ARRAYS
      skills: Array.isArray(updatedProfile.skills)
        ? updatedProfile.skills.map((skill) => String(skill || ""))
        : [],

      experience: Array.isArray(updatedProfile.experience)
        ? updatedProfile.experience.map((exp) => ({
            company: String(exp.company || ""),
            position: String(exp.position || ""),
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            currentlyWorking: Boolean(exp.currentlyWorking || false),
            description: String(exp.description || ""),
          }))
        : [],

      certificate: Array.isArray(updatedProfile.certificate)
        ? updatedProfile.certificate.map((cert) => ({
            name: String(cert.name || ""),
            issuer: String(cert.issuer || ""),
            issueDate: cert.issueDate || "",
            expiryDate: cert.expiryDate || "",
            credentialId: String(cert.credentialId || ""),
            url: String(cert.url || ""),
          }))
        : [],

      language: Array.isArray(updatedProfile.language)
        ? updatedProfile.language.map((lang) => ({
            language: String(lang.language || ""),
            proficiency: String(lang.proficiency || "Basic"),
          }))
        : [],

      resume: String(updatedProfile.resume || ""),
    };

    console.log("✅ Final Payload (Modal):", payload);

    // ================= UPDATE FRONTEND STATE =================
    setProfile(updatedProfile);

    // ================= SEND TO BACKEND =================
    try {
      const token = localStorage.getItem("token");

      
      const res = await fetch(`${API_BASE_URL}/auth/update-jobseeker-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("📥 Backend Response:", data);

      if (data.success) {
        alert("✅ Profile Saved!");
        close();
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("❌ Save Error:", err);
      alert("❌ Error: " + err.message);
    }
  };

  // Basic Modal
  if (type === "basic") {
    return (
      <Modal close={close} title="Edit Basic Details">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border  text-black p-2 rounded"
            required
          />

          <input
            placeholder="Mobile"
            value={formData.mobile || ""}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            type="date"
            value={formData.dob || ""}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full border p-2 rounded text-black"
          />

          <select
            value={formData.gender || ""}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  // User Info Modal
  if (type === "userInfo") {
    return (
      <Modal close={close} title="Edit Profile Information">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={imagePreview}
                className="w-20 h-20 rounded-full border-2 border-blue-100 object-cover"
                alt="Profile"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
            </div>
            <div>
              <p className="text-sm text-gray-500">Click to change photo</p>
              <p className="text-xs text-gray-400">JPG, PNG (max 2MB)</p>
            </div>
          </div>

          <input
            placeholder="Full Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            placeholder="College/University"
            value={formData.college || ""}
            onChange={(e) =>
              setFormData({ ...formData, college: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <input
            placeholder="Location (e.g., New Delhi)"
            value={formData.location || ""}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  // Education Modal
  if (type === "education") {
    return (
      <Modal close={close} title="Add Education">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Degree (e.g., BCA)"
            value={formData.degree || ""}
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            placeholder="College/University"
            value={formData.college || ""}
            onChange={(e) =>
              setFormData({ ...formData, college: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            placeholder="Field of Study"
            value={formData.field || ""}
            onChange={(e) =>
              setFormData({ ...formData, field: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <input
            placeholder="Batch (e.g., 2021-2024)"
            value={formData.batch || ""}
            onChange={(e) =>
              setFormData({ ...formData, batch: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <select
            value={formData.type || "Graduate"}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border p-2 rounded text-black"
          >
            <option value="Graduate">Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
            <option value="Diploma">Diploma</option>
            <option value="Certificate">Certificate</option>
          </select>

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  // Skills Modal
  if (type === "skills") {
    return (
      <Modal close={close} title="Add Skill">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Enter skill (e.g., React.js)"
            value={formData.skill || ""}
            onChange={(e) =>
              setFormData({ ...formData, skill: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            required
          />

          <div className="text-sm text-gray-500">
            <p className="font-medium mb-2">Popular skills:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "React.js",
                "JavaScript",
                "Node.js",
                "MongoDB",
                "TypeScript",
                "Next.js",
                "Tailwind CSS",
              ].map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => setFormData({ skill })}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-black"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  // Language Modal
  if (type === "language") {
    return (
      <Modal close={close} title="Add Language">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Language (e.g., English)"
            value={formData.language || ""}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            required
          />

          <select
            value={formData.proficiency || "Basic"}
            onChange={(e) =>
              setFormData({ ...formData, proficiency: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          >
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Fluent">Fluent</option>
            <option value="Native">Native</option>
          </select>

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  // Experience Modal
  if (type === "experience") {
    return (
      <Modal close={close} title="Add Work Experience">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Company Name"
            value={formData.company || ""}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            placeholder="Position/Role"
            value={formData.position || ""}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              placeholder="Start Date"
              value={formData.startDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full border p-2 rounded text-black"
            />
            <input
              type="date"
              placeholder="End Date"
              value={formData.endDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full border p-2 rounded text-black"
              disabled={formData.currentlyWorking}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.currentlyWorking || false}
              onChange={(e) =>
                setFormData({ ...formData, currentlyWorking: e.target.checked })
              }
              className="h-4 w-4"
              id="currentlyWorking"
            />
            <label htmlFor="currentlyWorking" className="text-sm text-gray-600">
              I currently work here
            </label>
          </div>

          <textarea
            placeholder="Description of your role and responsibilities"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
            rows={3}
          />

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  // Certificate Modal
  if (type === "certificate") {
    return (
      <Modal close={close} title="Add Certification">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Certificate Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded text-black"
            required
          />

          <input
            placeholder="Issuing Organization"
            value={formData.issuer || ""}
            onChange={(e) =>
              setFormData({ ...formData, issuer: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <input
            type="date"
            placeholder="Issue Date"
            value={formData.issueDate || ""}
            onChange={(e) =>
              setFormData({ ...formData, issueDate: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <input
            type="date"
            placeholder="Expiry Date (if any)"
            value={formData.expiryDate || ""}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <input
            placeholder="Credential ID (optional)"
            value={formData.credentialId || ""}
            onChange={(e) =>
              setFormData({ ...formData, credentialId: e.target.value })
            }
            className="w-full border p-2 rounded text-black"
          />

          <input
            placeholder="Credential URL (optional)"
            value={formData.url || ""}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full border p-2 rounded text-black"
          />

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  // Resume Modal
  if (type === "resume") {
    return (
      <Modal close={close} title="Upload Resume">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFormData({ resume: e.target.files[0] })}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div className="text-gray-600">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-2 font-medium">Click to upload resume</p>
                <p className="text-sm text-gray-500 mt-1">
                  PDF, DOC, DOCX (max. 5MB)
                </p>
              </div>
            </label>
          </div>

          {formData.resume && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-700 font-medium">
                Selected: {formData.resume.name}
              </p>
            </div>
          )}

          <Buttons close={close} />
        </form>
      </Modal>
    );
  }

  return null;
}

/* ================= MODAL COMPONENT ================= */
function Modal({ children, close, title }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={close}
              className="text-gray-400 hover:text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ================= BUTTONS COMPONENT ================= */
function Buttons({ close }) {
  return (
    <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
      <button
        type="button"
        onClick={close}
        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
