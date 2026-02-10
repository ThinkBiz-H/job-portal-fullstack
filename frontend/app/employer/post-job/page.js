"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EmployerHeader from "@/components/EmployerHeader";
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
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        // const res = await fetch("http://localhost:5000/api/auth/me", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          const companyName =
            data.data?.employerProfile?.companyName || data.data?.name || "";

          setForm((prev) => ({
            ...prev,
            company: companyName,
          }));
        }
      } catch (err) {
        console.log("Company Fetch Error:", err);
      }
    };

    fetchCompany();
  }, []);

  // Form state
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    currency: "INR",
    type: "full-time",
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
    screeningQuestions: [],
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
    { value: "full-time", label: "Full Time", icon: <Clock size={18} /> },
    { value: "part-time", label: "Part Time", icon: <Clock size={18} /> },
    { value: "contract", label: "Contract", icon: <FileText size={18} /> },
    {
      value: "internship",
      label: "Internship",
      icon: <GraduationCap size={18} />,
    },
    { value: "freelance", label: "Freelance", icon: <Sun size={18} /> },
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
  const addQuestion = () => {
    setForm((prev) => ({
      ...prev,
      screeningQuestions: [
        ...prev.screeningQuestions,
        {
          question: "",
          type: "text",
          required: true,
          options: [],
        },
      ],
    }));
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...form.screeningQuestions];

    updated[index] = {
      ...updated[index],
      [key]: value,
    };

    // 🔥 MCQ select hote hi options init kar do
    if (key === "type" && value === "mcq" && !updated[index].options) {
      updated[index].options = [""];
    }

    // 🔥 agar text / yesno ho to options hata do
    if (key === "type" && value !== "mcq") {
      updated[index].options = [];
    }

    setForm((prev) => ({
      ...prev,
      screeningQuestions: updated,
    }));
  };

  const removeQuestion = (index) => {
    const updated = form.screeningQuestions.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, screeningQuestions: updated }));
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

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/login");
        return;
      }

      // const API = "http://localhost:5000/api";
      const API =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      const jobData = {
        title: form.title,
        company: form.company,
        location: form.location,

        salary: {
          min: Number(form.salaryMin),
          max: Number(form.salaryMax),
        },

        jobType: form.type,
        workMode: form.workMode,

        experience: {
          min: Number(form.experienceMin),
          max: Number(form.experienceMax),
        },

        description: form.description,

        // ये arrays में convert करो
        responsibilities: form.responsibilities
          ? form.responsibilities.split("\n").filter((line) => line.trim())
          : [],
        requirements: form.requirements
          ? form.requirements.split("\n").filter((line) => line.trim())
          : [],
        benefits: form.benefits
          ? form.benefits.split("\n").filter((line) => line.trim())
          : [],

        // 🔴 IMPORTANT: `skillsRequired` field use करो
        skillsRequired: form.skills, // यही field MongoDB में है

        vacancies: Number(form.vacancies),
        deadline: form.deadline,
        category: form.category,
        applyLink: form.applyLink,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        isUrgent: form.isUrgent,
        isFeatured: form.isFeatured,
        screeningQuestions: form.screeningQuestions,
      };
      console.log("Sending job data:", jobData); // Debug log

      const response = await axios.post(`${API}/jobs`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data); // Debug log

      if (response.data.success) {
        alert("🎉 Job Posted Successfully!");
        router.push("/jobs"); // public jobs page
      } else {
        alert(response.data.message || "Job post failed");
      }
    } catch (err) {
      console.log("POST JOB ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Job post failed");
    } finally {
      setLoading(false);
    }
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
          <button className="px-6 py-3 bg-[#0F2A44] text-white rounded-lg font-medium hover:bg-orange-400 transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <EmployerHeader />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Navigation */}

        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center text-xl font-bold">
                <Link
                  href="/employer/dashboard"
                  className="flex items-center  gap-2 text-gray-700 hover:text-gray-900"
                >
                  <ArrowLeft size={20} />
                  <span className="text-base">Back to Dashboard</span>
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-[#0F2A44] hover:bg-orange-400 transition"
                >
                  {previewMode ? <EyeOff size={18} /> : <Eye size={18} />}
                  {previewMode ? "Edit Mode" : "Preview Mode"}
                </button>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= step ? "bg-green-100 text-[#0F2A44] border-2 border-orange-400" : "bg-gray-100 text-gray-400"}`}
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
                    <label className="block text-base font-medium text-gray-700 mb-2">
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
                        className="w-full pl-10 pr-4 py-3 border text-black focus:ring-[#0F2A44] border-gray-300 rounded-xl focus:ring-2  focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Company & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
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
                          className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-xl bg-gray-50 cursor-not-allowed"
                          readOnly
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
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
                          className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none transition"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Job Type & Work Mode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
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
                            className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition ${form.type === type.value ? "border-[#0F2A44] bg-blue-50 text-black" : "border-gray-200 hover:border-gray-300"}`}
                          >
                            {type.icon}
                            <span>{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
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
                            className={`flex-1 py-3 rounded-lg border flex items-center justify-center gap-2 transition ${form.workMode === mode.value ? "border-[#0F2A44] bg-blue-50 text-black" : "border-gray-200 hover:border-gray-300"}`}
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
                    <label className="block text-base font-medium text-gray-700 mb-2">
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
                          className={`p-3 rounded-lg border flex items-center gap-1 justify-center transition ${form.salaryMin === range.min ? "border-[#0F2A44] bg-blue-50 text-black" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          <DollarSign size={16} />
                          {range.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-base text-gray-600 mb-1">
                          Minimum (LPA)
                        </label>
                        <input
                          type="number"
                          name="salaryMin"
                          value={form.salaryMin}
                          onChange={handleChange}
                          placeholder="8"
                          className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-base text-gray-600 mb-1">
                          Maximum (LPA)
                        </label>
                        <input
                          type="number"
                          name="salaryMax"
                          value={form.salaryMax}
                          onChange={handleChange}
                          placeholder="15"
                          className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience & Vacancies */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Experience Required
                      </label>
                      <select
                        name="experienceMin"
                        value={form.experienceMin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-black border border-[#0F2A44] rounded-xl"
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
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Number of Vacancies
                      </label>
                      <select
                        name="vacancies"
                        value={form.vacancies}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border text-black border-[#0F2A44] rounded-xl"
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
                    <label className="block text-base  font-medium text-gray-700 mb-2">
                      Job Description *
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Describe the job responsibilities, what you're looking for in a candidate, and what makes this role exciting..."
                      className="w-full p-4 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none resize-none"
                      required
                    />
                    <div className="mt-2 text-sm text-gray-900">
                      Tip: Include key responsibilities, team information, and
                      growth opportunities.
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div>
                    <label className="block text-base  font-medium text-gray-700 mb-2">
                      Key Responsibilities
                    </label>
                    <textarea
                      name="responsibilities"
                      value={form.responsibilities}
                      onChange={handleChange}
                      rows={4}
                      placeholder="List the main responsibilities and tasks for this role (one per line)..."
                      className="w-full p-4 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Requirements & Qualifications
                    </label>
                    <textarea
                      name="requirements"
                      value={form.requirements}
                      onChange={handleChange}
                      rows={4}
                      placeholder="List the required skills, education, and experience (one per line)..."
                      className="w-full p-4  text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
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
                        className="flex-1 px-4 py-2  text-black border border-[#0F2A44] rounded-lg"
                        onKeyDown={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addSkill())
                        }
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-[#0F2A44]    rounded-lg transition flex items-center gap-1"
                      >
                        <Plus size={18} />
                        Add
                      </button>
                    </div>

                    {/* Popular Skills */}
                    <div className="mb-3">
                      <div className="text-base font-bold text-gray-600 mb-2">
                        Popular Skills:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularSkills.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addPopularSkill(skill)}
                            className={`px-3 py-1 rounded-full text-base text-black ${form.skills.includes(skill) ? "bg-blue-50 text-orange-400 border border-[#0F2A44]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
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
                              className="flex items-center gap-1 bg-blue-50 text-[#0F2A44] px-3 py-1.5 rounded-lg"
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
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-orange-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Additional Information
                    </h2>
                  </div>

                  {/* Benefits & Perks */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Benefits & Perks
                    </label>
                    <textarea
                      name="benefits"
                      value={form.benefits}
                      onChange={handleChange}
                      rows={4}
                      placeholder="List the benefits and perks (e.g., Health insurance, Flexible hours, Learning budget, etc.)"
                      className="w-full p-4 text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Job Category */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
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
                          className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition ${
                            form.category === category.value
                              ? "border-[#0F2A44] bg-purple-50 text-orange-400"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
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
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Application Deadline
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-black border border-gray-300 rounded-xl"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        Application Link/Email
                      </label>
                      <input
                        type="text"
                        name="applyLink"
                        value={form.applyLink}
                        onChange={handleChange}
                        placeholder="https://apply.example.com OR email@example.com"
                        className="w-full px-4 text-black py-3 border border-[#0F2A44] rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Flags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex items-center gap-3 p-4 border border-[#0F2A44] rounded-xl cursor-pointer hover:bg-gray-200">
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

                    <label className="flex items-center gap-3 p-4 border border-[#0F2A44] rounded-xl cursor-pointer hover:bg-gray-200">
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
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Contact Information
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="email"
                          name="contactEmail"
                          value={form.contactEmail}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 text-black border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="tel"
                          name="contactPhone"
                          value={form.contactPhone}
                          onChange={handleChange}
                          placeholder="Contact phone number"
                          className="w-full pl-10 pr-4 py-2.5 text-black border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 🔥 SCREENING QUESTIONS (NO UI CHANGE) */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Screening Questions (Optional)
                    </label>

                    <div className="space-y-4">
                      {form.screeningQuestions.map((q, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-300 rounded-xl space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-800">
                              Question {index + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeQuestion(index)}
                              className="text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={q.question}
                            onChange={(e) =>
                              updateQuestion(index, "question", e.target.value)
                            }
                            placeholder="Enter your question"
                            className="w-full px-3 py-2 border rounded-lg text-black"
                          />

                          <div className="flex gap-3">
                            <select
                              value={q.type}
                              onChange={(e) =>
                                updateQuestion(index, "type", e.target.value)
                              }
                              className="px-3 py-2 border rounded-lg bg-[#0F2A44]"
                            >
                              <option value="text">Text</option>
                              <option value="yesno">Yes / No</option>
                              <option value="mcq">MCQ</option>
                            </select>

                            <label className="flex items-center gap-2 text-base text-black">
                              <input
                                type="checkbox"
                                checked={q.required}
                                onChange={(e) =>
                                  updateQuestion(
                                    index,
                                    "required",
                                    e.target.checked,
                                  )
                                }
                              />
                              Required
                            </label>
                          </div>
                          {/* MCQ Options */}
                          {q.type === "mcq" && (
                            <div className="space-y-2">
                              {(q.options || []).map((opt, optIndex) => (
                                <div key={optIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const updated = [...(q.options || [])];
                                      updated[optIndex] = e.target.value;
                                      updateQuestion(index, "options", updated);
                                    }}
                                    placeholder={`Option ${optIndex + 1}`}
                                    className="flex-1 px-3 py-2 border rounded-lg text-black"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = q.options.filter(
                                        (_, i) => i !== optIndex,
                                      );
                                      updateQuestion(index, "options", updated);
                                    }}
                                    className="text-red-500"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))}

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuestion(index, "options", [
                                    ...(q.options || []),
                                    "",
                                  ])
                                }
                                className="text-sm flex items-center gap-2 text-blue-600"
                              >
                                <Plus size={14} />
                                Add Option
                              </button>
                            </div>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addQuestion}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-base bg-[#0F2A44]"
                      >
                        <Plus size={16} />
                        Add Question
                      </button>
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
                        className="px-6 py-3 bg-[#0F2A44] border  border-gray-300 rounded-xl transition flex items-center gap-2"
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
                        className="px-6 py-3 bg-[#0F2A44] hover:bg-orange- text-white rounded-xl font-medium transition flex items-center gap-2"
                      >
                        Continue to Next Step
                        <ArrowLeft className="rotate-180" size={18} />
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setPreviewMode(true)}
                          className="px-6 py-3 border border-[#0F2A44] bg-[#0F2A44] rounded-xl hover:bg-gray-100 transition"
                        >
                          Preview
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-[#0F2A44] text-white rounded-xl font-medium transition flex items-center gap-2 disabled:opacity-50"
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
    </>
  );
}
