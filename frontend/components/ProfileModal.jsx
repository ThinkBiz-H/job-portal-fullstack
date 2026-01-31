"use client";

import { useState, useEffect } from "react";

export default function ProfileModal({ type, close, profile, setProfile }) {
  // Skill suggestions
  const skillSuggestions = [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Tailwind CSS",
    "Bootstrap",
    "CSS3",
    "HTML5",
    "Git",
    "GitHub",
    "REST APIs",
    "GraphQL",
    "Redux",
    "Context API",
    "Firebase",
    "AWS",
    "Docker",
    "Python",
    "Java",
    "C++",
    "PHP",
    "MySQL",
    "PostgreSQL",
    "UI/UX Design",
    "Figma",
    "Adobe XD",
    "Agile Methodology",
    "Scrum",
    "Jira",
    "Communication Skills",
    "Problem Solving",
    "Team Leadership",
    "Project Management",
    "DevOps",
    "CI/CD",
    "Testing",
    "Jest",
    "Cypress",
    "Webpack",
    "Vite",
  ];

  // Certificate suggestions
  const certificateSuggestions = [
    "Web Development",
    "React Developer",
    "Node.js",
    "Python",
    "Data Science",
    "AWS Certified Developer",
    "Azure Fundamentals",
    "Google Cloud Associate",
    "Cyber Security",
    "AI ML",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
    "UI/UX Design",
    "Digital Marketing",
    "Project Management Professional",
    "Salesforce Administrator",
    "Oracle Certified Professional",
    "SAP Certified",
  ];

  // Initialize form data based on modal type
  const [formData, setFormData] = useState(() => {
    switch (type) {
      case "basic":
        return { ...profile.basic };
      case "userInfo":
        return { ...profile.userInfo };
      case "education":
        return {
          degree: "",
          college: "",
          field: "",
          batch: "",
          type: "Graduate",
        };
      case "skills":
        return { skill: "", suggestions: [] };
      case "language":
        return { language: "", proficiency: "Basic" };
      case "experience":
        return { experience: "" };
      case "certificate":
        return { certificate: "", suggestions: [] };
      case "resume":
        return { resume: "" };
      default:
        return {};
    }
  });

  // Filter suggestions based on input
  const [filteredSkillSuggestions, setFilteredSkillSuggestions] = useState([]);
  const [filteredCertSuggestions, setFilteredCertSuggestions] = useState([]);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showCertSuggestions, setShowCertSuggestions] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    profile.userInfo.image || "/images/freasher.png",
  );

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPEG, PNG, etc.)");
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImagePreview(imageUrl);
        setFormData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Filter suggestions based on input
    if (type === "skills" && name === "skill") {
      if (value.trim() === "") {
        setFilteredSkillSuggestions(skillSuggestions.slice(0, 10));
      } else {
        const filtered = skillSuggestions
          .filter((skill) => skill.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 10);
        setFilteredSkillSuggestions(filtered);
      }
      setShowSkillSuggestions(true);
    }

    if (type === "certificate" && name === "certificate") {
      if (value.trim() === "") {
        setFilteredCertSuggestions(certificateSuggestions.slice(0, 10));
      } else {
        const filtered = certificateSuggestions
          .filter((cert) => cert.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 10);
        setFilteredCertSuggestions(filtered);
      }
      setShowCertSuggestions(true);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (type === "skills") {
      setShowSkillSuggestions(false);
    } else if (type === "certificate") {
      setShowCertSuggestions(false);
    }
  };

  // Initialize suggestions on mount
  useEffect(() => {
    if (type === "skills") {
      setFilteredSkillSuggestions(skillSuggestions.slice(0, 10));
    } else if (type === "certificate") {
      setFilteredCertSuggestions(certificateSuggestions.slice(0, 10));
    }
  }, [type]);

  // Update image preview when profile changes
  useEffect(() => {
    if (type === "userInfo" && profile.userInfo.image) {
      setImagePreview(profile.userInfo.image);
    }
  }, [profile.userInfo.image, type]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    switch (type) {
      case "basic":
        setProfile((prev) => ({
          ...prev,
          basic: { ...formData },
        }));
        break;

      case "userInfo":
        setProfile((prev) => ({
          ...prev,
          userInfo: {
            ...formData,
            image: imagePreview,
          },
        }));
        break;

      case "education":
        setProfile((prev) => ({
          ...prev,
          education: [...prev.education, { ...formData }],
        }));
        break;

      case "skills":
        if (formData.skill.trim()) {
          // Check if skill already exists
          if (!profile.skills.includes(formData.skill.trim())) {
            setProfile((prev) => ({
              ...prev,
              skills: [...prev.skills, formData.skill.trim()],
            }));
          }
        }
        break;

      case "language":
        if (formData.language.trim()) {
          // Check if language already exists
          const languageExists = profile.language.some(
            (lang) =>
              lang.language.toLowerCase() === formData.language.toLowerCase(),
          );
          if (!languageExists) {
            setProfile((prev) => ({
              ...prev,
              language: [...prev.language, { ...formData }],
            }));
          }
        }
        break;

      case "experience":
        if (formData.experience.trim()) {
          setProfile((prev) => ({
            ...prev,
            experience: [...prev.experience, formData.experience.trim()],
          }));
        }
        break;

      case "certificate":
        if (formData.certificate.trim()) {
          // Check if certificate already exists
          if (!profile.certificate.includes(formData.certificate.trim())) {
            setProfile((prev) => ({
              ...prev,
              certificate: [...prev.certificate, formData.certificate.trim()],
            }));
          }
        }
        break;

      case "resume":
        if (formData.resume) {
          // Handle file upload - in a real app, you'd upload to a server
          // For now, just store the filename
          const fileName = formData.resume.name || "resume.pdf";
          setProfile((prev) => ({
            ...prev,
            resume: fileName,
          }));
        }
        break;

      default:
        break;
    }

    close();
  };

  // Render different forms based on modal type
  const renderForm = () => {
    switch (type) {
      case "basic":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        );

      case "userInfo":
        return (
          <div className="space-y-4">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <label
                  htmlFor="profile-image-upload"
                  className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
                  title="Change photo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500">
                Click camera icon to upload photo
              </p>
            </div>

            {/* Other fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College/University
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree/Course
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300  text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., BCA, B.Tech, MCA"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College/University
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., JNVU Jodhpur"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Computer Science"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch
                </label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2021 - 2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Certificate">Certificate</option>
                  <option value="School">School</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Skill
              </label>
              <input
                type="text"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                onFocus={() => setShowSkillSuggestions(true)}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., React, Node.js, MongoDB"
                required
              />

              {/* Suggestions Dropdown */}
              {showSkillSuggestions && filteredSkillSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500">
                      Suggestions
                    </p>
                  </div>
                  {filteredSkillSuggestions.map((skill, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(skill, "skill")}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Type to see suggestions or add custom skill
              </p>
            </div>

            {/* Already added skills */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">
                  Current Skills ({profile.skills.length})
                </p>
                <span className="text-xs text-gray-500">Click ✕ to remove</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded flex items-center gap-1"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No skills added yet
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case "language":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., English, Hindi, Spanish"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency Level
              </label>
              <select
                name="proficiency"
                value={formData.proficiency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
            </div>

            {/* Already added languages */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Current Languages
              </p>
              <div className="space-y-2">
                {profile.language.map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-700">
                      {lang.language}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Experience
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Describe your work experience, role, responsibilities, etc."
                required
              />
            </div>

            {/* Already added experiences */}
            {profile.experience.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Current Experiences
                </p>
                <div className="space-y-2">
                  {profile.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <p className="text-sm text-gray-700">{exp}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "certificate":
        return (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certification Name
              </label>
              <input
                type="text"
                name="certificate"
                value={formData.certificate}
                onChange={handleChange}
                onFocus={() => setShowCertSuggestions(true)}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., AWS Certified Developer, Google Analytics Certified"
                required
              />

              {/* Suggestions Dropdown */}
              {showCertSuggestions && filteredCertSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500">
                      Suggestions
                    </p>
                  </div>
                  {filteredCertSuggestions.map((cert, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(cert, "certificate")}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Type to see suggestions or add custom certification
              </p>
            </div>

            {/* Already added certificates */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Current Certifications
              </p>
              <div className="space-y-2">
                {profile.certificate.map((cert, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p className="text-sm text-gray-700">{cert}</p>
                  </div>
                ))}
                {profile.certificate.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No certifications added yet
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case "resume":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  name="resume"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      resume: e.target.files[0],
                    }));
                  }}
                  accept=".pdf"
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer inline-block"
                >
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
                    <p className="mt-2">Click to upload resume</p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF files only (max. 5MB)
                    </p>
                  </div>
                </label>
                {formData.resume && (
                  <p className="mt-3 text-sm text-green-600">
                    Selected: {formData.resume.name}
                  </p>
                )}
              </div>
            </div>
            {profile.resume && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">
                  Current Resume: {profile.resume}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Get modal title based on type
  const getModalTitle = () => {
    const titles = {
      basic: "Edit Basic Details",
      userInfo: "Edit Profile Information",
      education: "Add Education",
      skills: "Add Skills",
      language: "Add Language",
      experience: "Add Work Experience",
      certificate: "Add Certification",
      resume: "Upload Resume",
    };
    return titles[type] || "Edit";
  };

  // Close suggestions when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".relative")) {
      setShowSkillSuggestions(false);
      setShowCertSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {getModalTitle()}
            </h3>
            <button
              onClick={close}
              className="text-gray-400 hover:text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Modal Form */}
          <form onSubmit={handleSubmit}>
            {renderForm()}

            {/* Modal Actions */}
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
                {type === "basic" || type === "userInfo"
                  ? "Save Changes"
                  : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
