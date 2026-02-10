
"use client";
import EmployerHeader from "@/components/EmployerHeader";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Building,
  MapPin,
  Globe,
  Phone,
  Mail,
  Calendar,
  Users,
  Award,
  Shield,
  CheckCircle,
  Edit,
  Save,
  Upload,
  Camera,
  X,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  FileText,
  Briefcase,
  DollarSign,
  Target,
  BarChart3,
  Star,
  Heart,
  Clock,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  Download,
  Share2,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  ExternalLink,
  Verified,
  Sparkles,
  TrendingUp,
  Zap,
  Coffee,
  Users as UsersIcon,
  HeartHandshake,
  Lightbulb,
  Rocket,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("company");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  // ✅ FIXED: Initialize with default values
  const [companyProfile, setCompanyProfile] = useState({
    companyName: "",
    tagline: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    foundedYear: "",
    companySize: "",
    companyType: "",
    industry: "",
    headquarters: "",
    locations: [],
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    mission: "",
    vision: "",
    values: [],
    specialties: [],
    benefits: [],
    teamSize: "",
    avgEmployeeTenure: "",
    workCulture: "",
    logo: "",
    coverPhoto: "",
    isVerified: false,
    verificationLevel: "basic",
    documentsVerified: [],
    totalJobsPosted: 0,
    totalHires: 0,
    avgResponseTime: "0 days",
    candidateSatisfaction: "0/5",
  });

  // Form State
  const [formData, setFormData] = useState({ ...companyProfile });
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newValue, setNewValue] = useState("");

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ==================== API FUNCTIONS ====================

  // ✅ FIXED: Fetch Profile with proper logging
  const fetchProfile = async () => {
    try {
      const savedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!savedToken) {
        router.push("/login");
        return;
      }

      setToken(savedToken);
      setLoading(true);

      console.log(
        "Fetching profile with token:",
        savedToken.substring(0, 20) + "...",
      );

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        setUserData(data.data);

        if (data.data.userType === "employer" && data.data.profile) {
          const backendProfile = data.data.profile;

          console.log("Backend Profile:", backendProfile);
          console.log("Founded Year from backend:", backendProfile.foundedYear);
          console.log("Company Size from backend:", backendProfile.companySize);
          console.log("Team Size from backend:", backendProfile.teamSize);

          // ✅ FIXED: Create new profile object
          const mergedProfile = {
            companyName: backendProfile.companyName || "",
            tagline: backendProfile.tagline || "",
            description: backendProfile.description || "",
            email: backendProfile.email || data.data.email || "",
            phone: backendProfile.phone || data.data.phone || "",
            website: backendProfile.website || "",
            // ✅ IMPORTANT: Handle all cases for foundedYear
            foundedYear: backendProfile.foundedYear
              ? backendProfile.foundedYear.toString()
              : backendProfile.foundedYear === 0
                ? ""
                : "",
            // ✅ IMPORTANT: Handle companySize properly
            companySize: backendProfile.companySize || "1-10",
            companyType: backendProfile.companyType || "",
            industry: backendProfile.industry || "",
            headquarters: backendProfile.headquarters || "",
            locations: backendProfile.locations || [],
            linkedin: backendProfile.linkedin || "",
            twitter: backendProfile.twitter || "",
            facebook: backendProfile.facebook || "",
            instagram: backendProfile.instagram || "",
            mission: backendProfile.mission || "",
            vision: backendProfile.vision || "",
            values: backendProfile.values || [],
            specialties: backendProfile.specialties || [],
            benefits: backendProfile.benefits || [],
            teamSize: backendProfile.teamSize || "",
            avgEmployeeTenure: backendProfile.avgEmployeeTenure || "",
            workCulture: backendProfile.workCulture || "",
            logo: backendProfile.logo || "",
            coverPhoto: backendProfile.coverPhoto || "",
            isVerified: backendProfile.isVerified || false,
            verificationLevel: backendProfile.verificationLevel || "basic",
            documentsVerified: backendProfile.documentsVerified || [],
            totalJobsPosted: backendProfile.totalJobsPosted || 0,
            totalHires: backendProfile.totalHires || 0,
            avgResponseTime: backendProfile.avgResponseTime || "0 days",
            candidateSatisfaction:
              backendProfile.candidateSatisfaction || "0/5",
          };

          console.log("Merged Profile to set:", mergedProfile);
          console.log("Company Size in merged:", mergedProfile.companySize);
          console.log("Founded Year in merged:", mergedProfile.foundedYear);
          console.log("Team Size in merged:", mergedProfile.teamSize);

          // ✅ FIXED: Use functional update to ensure state updates
          setCompanyProfile((prev) => {
            console.log("Previous Company Profile:", prev);
            return mergedProfile;
          });

          setFormData((prev) => {
            console.log("Previous Form Data:", prev);
            return mergedProfile;
          });

          // Force re-render
          setTimeout(() => {
            console.log("After setting - Company Profile:", companyProfile);
          }, 100);
        }
      } else {
        console.error("Failed to fetch profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Save Profile with proper data conversion
  const handleSaveProfile = async () => {
    if (!token) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      // ✅ FIXED: Prepare data properly
      const profileToSend = {
        companyName: formData.companyName,
        tagline: formData.tagline,
        description: formData.description,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        // Convert foundedYear to number or null
        foundedYear: formData.foundedYear
          ? parseInt(formData.foundedYear)
          : null,
        // Ensure companySize is sent
        companySize: formData.companySize || "1-10",
        companyType: formData.companyType,
        industry: formData.industry,
        headquarters: formData.headquarters,
        locations: formData.locations,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        facebook: formData.facebook,
        instagram: formData.instagram,
        mission: formData.mission,
        vision: formData.vision,
        values: formData.values,
        specialties: formData.specialties,
        benefits: formData.benefits,
        teamSize: formData.teamSize,
        avgEmployeeTenure: formData.avgEmployeeTenure,
        workCulture: formData.workCulture,
        logo: formData.logo,
        coverPhoto: formData.coverPhoto,
        isVerified: formData.isVerified,
        verificationLevel: formData.verificationLevel,
        documentsVerified: formData.documentsVerified,
        totalJobsPosted: formData.totalJobsPosted,
        totalHires: formData.totalHires,
        avgResponseTime: formData.avgResponseTime,
        candidateSatisfaction: formData.candidateSatisfaction,
      };

      console.log("Sending to backend:", profileToSend);
      console.log("Company Size sending:", profileToSend.companySize);
      console.log("Founded Year sending:", profileToSend.foundedYear);

      const response = await fetch(`${API_BASE_URL}/auth/updateprofile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile: profileToSend,
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.success) {
        // Update local state immediately
        if (data.data.profile) {
          console.log("Updated profile from backend:", data.data.profile);
          setCompanyProfile(data.data.profile);
          setFormData(data.data.profile);
        } else {
          // Fallback: Update with what we sent
          setCompanyProfile(profileToSend);
        }

        setIsEditing(false);
        alert("Profile updated successfully!");

        // Refresh profile data after a short delay
        setTimeout(() => {
          fetchProfile();
        }, 500);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  // Rest of the functions remain same...
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowChangePassword(false);
      } else {
        alert(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  const handleImageUpload = async (type, file) => {
    if (!file || !token) {
      alert("Please select an image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      setFormData((prev) => ({
        ...prev,
        [type === "logo" ? "logo" : "coverPhoto"]: base64Image,
      }));

      setCompanyProfile((prev) => ({
        ...prev,
        [type === "logo" ? "logo" : "coverPhoto"]: base64Image,
      }));

      alert("Image updated! Don't forget to save the profile.");
    };
    reader.readAsDataURL(file);
  };

  // ==================== HELPER FUNCTIONS ====================

  useEffect(() => {
    console.log("Component mounted, fetching profile...");
    fetchProfile();
  }, []);

  // ✅ FIXED: Add useEffect to log state changes
  useEffect(() => {
    console.log("Company Profile updated:", companyProfile);
    console.log("Form Data updated:", formData);
  }, [companyProfile, formData]);

  const handleInputChange = (field, value) => {
    console.log(`Changing ${field} to:`, value);

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Also update companyProfile for immediate display
    if (
      field === "logo" ||
      field === "coverPhoto" ||
      field === "foundedYear" ||
      field === "companySize" ||
      field === "teamSize" ||
      field === "headquarters"
    ) {
      setCompanyProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayAdd = (field, value, setValueFunction) => {
    if (value.trim()) {
      const newArray = [...(formData[field] || []), value.trim()];
      setFormData((prev) => ({
        ...prev,
        [field]: newArray,
      }));
      setValueFunction("");
    }
  };

  const handleArrayRemove = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;
    if (image.startsWith("data:image")) return image;
    if (image.startsWith("/")) return image;
    return `/${image}`;
  };

  const getVerificationBadge = () => {
    if (companyProfile.verificationLevel === "advanced") {
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          <Shield size={14} />
          Advanced Verified
        </div>
      );
    }
    if (companyProfile.isVerified) {
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <CheckCircle size={14} />
          Verified Company
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
        <Shield size={14} />
        Not Verified
      </div>
    );
  };

  // ==================== UI COMPONENTS ====================

  const profileStats = [
    {
      label: "Profile Completion",
      value:
        companyProfile.companyName && companyProfile.description
          ? "85%"
          : "30%",
      color: "green",
      icon: <User size={20} />,
    },
    {
      label: "Verification Status",
      value: companyProfile.isVerified ? "Verified ✓" : "Not Verified",
      color: companyProfile.isVerified ? "blue" : "yellow",
      icon: <Shield size={20} />,
    },
    {
      label: "Jobs Posted",
      value: companyProfile.totalJobsPosted || "0",
      color: "purple",
      icon: <Briefcase size={20} />,
    },
    {
      label: "Candidate Rating",
      value: companyProfile.candidateSatisfaction || "0/5",
      color: "yellow",
      icon: <Star size={20} />,
    },
  ];

  const tabs = [
    { id: "company", label: "Company Info", icon: <Building size={18} /> },
    { id: "jobs", label: "Job History", icon: <Briefcase size={18} /> },
    { id: "team", label: "Team & Culture", icon: <UsersIcon size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
    { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
  ];

  if (loading && !companyProfile.companyName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ✅ FIXED: Company Size Dropdown Component
  const CompanySizeDropdown = ({ isEditing }) => {
    const companySizeOptions = [
      { value: "", label: "Select Company Size" },
      { value: "1-10", label: "1-10 employees" },
      { value: "11-50", label: "11-50 employees" },
      { value: "51-200", label: "51-200 employees" },
      { value: "201-500", label: "201-500 employees" },
      { value: "500+", label: "500+ employees" },
    ];

    return (
      <div>
        <label className="block text-base font-medium text-gray-700 mb-2">
          Company Size
        </label>
        {isEditing ? (
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Users size={18} />
            </div>
            <select
              value={formData.companySize || ""}
              onChange={(e) => {
                console.log("Company Size selected:", e.target.value);
                handleInputChange("companySize", e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              {companySizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-700">
            <Users size={18} />
            <span>
              {companyProfile.companySize
                ? `${companyProfile.companySize} employees`
                : "Not set"}
            </span>
          </div>
        )}
      </div>
    );
  };

  // ✅ FIXED: Contact Information Fields
  const contactFields = [
    {
      label: "Email",
      value: "email",
      icon: <Mail size={18} />,
      type: "email",
    },
    {
      label: "Phone",
      value: "phone",
      icon: <Phone size={18} />,
      type: "tel",
    },
    {
      label: "Website",
      value: "website",
      icon: <Globe size={18} />,
      type: "url",
    },
    {
      label: "Founded Year",
      value: "foundedYear",
      icon: <Calendar size={18} />,
      type: "number",
      placeholder: "e.g., 2020",
    },
    {
      label: "Industry",
      value: "industry",
      icon: <Briefcase size={18} />,
      type: "text",
      placeholder: "e.g., Technology",
    },
    {
      label: "Company Type",
      value: "companyType",
      icon: <Building size={18} />,
      type: "text",
      placeholder: "e.g., Private Limited",
    },
  ];

  const renderCompanyTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-[#0F2A44]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-4 py-2 bg-[#0F2A44] text-white rounded-lg  disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#0F2A44] text-white rounded-lg  flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.companyName || ""}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full px-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0F2A44] focus:border-transparent"
                placeholder="Enter company name"
              />
            ) : (
              <div className="text-lg font-semibold text-gray-900">
                {companyProfile.companyName || "Not set"}
              </div>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Tagline
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.tagline || ""}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                className="w-full px-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0F2A44] focus:border-transparent"
                placeholder="Describe your company in one line"
              />
            ) : (
              <div className="text-gray-700">
                {companyProfile.tagline || "No tagline set"}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Company Description *
            </label>
            {isEditing ? (
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Tell candidates about your company culture, mission, and what makes you unique"
              />
            ) : (
              <div className="text-gray-700 whitespace-pre-line">
                {companyProfile.description || "No description added yet"}
              </div>
            )}
          </div>

          {/* Logo and Cover Photo */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.logo || ""}
                onChange={(e) => handleInputChange("logo", e.target.value)}
                className="w-full px-4 py-2.5 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter logo URL or upload above"
              />
            ) : (
              <div className="text-gray-700">
                {companyProfile.logo ? "Logo set" : "No logo"}
              </div>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Cover Photo URL
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.coverPhoto || ""}
                onChange={(e) =>
                  handleInputChange("coverPhoto", e.target.value)
                }
                className="w-full px-4 py-2.5  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter cover photo URL or upload above"
              />
            ) : (
              <div className="text-gray-700">
                {companyProfile.coverPhoto
                  ? "Cover photo set"
                  : "No cover photo"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactFields.map((field) => (
            <div key={field.value}>
              <label className="block text-base font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              {isEditing ? (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {field.icon}
                  </div>
                  <input
                    type={field.type}
                    value={formData[field.value] || ""}
                    onChange={(e) =>
                      handleInputChange(field.value, e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2.5  text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={
                      field.placeholder || `Enter ${field.label.toLowerCase()}`
                    }
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  {field.icon}
                  <span>{companyProfile[field.value] || "Not set"}</span>
                </div>
              )}
            </div>
          ))}

          {/* ✅ FIXED: Company Size Dropdown */}
          <CompanySizeDropdown isEditing={isEditing} />

          {/* Team Size */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Team Size
            </label>
            {isEditing ? (
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Users size={18} />
                </div>
                <input
                  type="text"
                  value={formData.teamSize || ""}
                  onChange={(e) =>
                    handleInputChange("teamSize", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 50 employees"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-700">
                <Users size={18} />
                <span>{companyProfile.teamSize || "Not set"}</span>
              </div>
            )}
          </div>

          {/* Headquarters */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Headquarters
            </label>
            {isEditing ? (
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  value={formData.headquarters || ""}
                  onChange={(e) =>
                    handleInputChange("headquarters", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2.5 text-black   border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter headquarters location"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} />
                <span>{companyProfile.headquarters || "Not set"}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rest of the tabs remain same... */}
      {/* Locations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Office Locations</h3>
          {isEditing && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Add new location"
                className="px-3 py-2  text-black border border-gray-300 rounded-lg"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleArrayAdd("locations", newLocation, setNewLocation)
                }
              />
              <button
                onClick={() =>
                  handleArrayAdd("locations", newLocation, setNewLocation)
                }
                className="px-3 py-2 bg-[#0F2A44] text-white rounded-lg hover:bg-green-700"
              >
                <Plus size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {(companyProfile.locations || []).length > 0 ? (
            companyProfile.locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 text-black bg-gray-100 rounded-lg"
              >
                <MapPin size={16} className="text-gray-600" />
                <span>{location}</span>
                {isEditing && (
                  <button
                    onClick={() => handleArrayRemove("locations", index)}
                    className="text-black hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No locations added</div>
          )}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Social Media Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              label: "LinkedIn",
              value: "linkedin",
              icon: <Linkedin size={18} className="text-blue-600" />,
            },
            {
              label: "Twitter",
              value: "twitter",
              icon: <Twitter size={18} className="text-blue-400" />,
            },
            {
              label: "Facebook",
              value: "facebook",
              icon: <Facebook size={18} className="text-blue-700" />,
            },
            {
              label: "Instagram",
              value: "instagram",
              icon: <Instagram size={18} className="text-pink-600" />,
            },
          ].map((social) => (
            <div key={social.value}>
              <label className="block text-base font-medium text-gray-700 mb-2">
                {social.label}
              </label>
              {isEditing ? (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {social.icon}
                  </div>
                  <input
                    type="url"
                    value={formData[social.value] || ""}
                    onChange={(e) =>
                      handleInputChange(social.value, e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={`https://${social.value.toLowerCase()}.com/company`}
                  />
                </div>
              ) : companyProfile[social.value] ? (
                <a
                  href={companyProfile[social.value]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  {social.icon}
                  <span>Visit Profile</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <div className="text-gray-500">Not provided</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ✅ FIXED: Company Info Display Section
  const CompanyInfoDisplay = () => (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
      {/* Headquarters */}
      <div className="flex items-center gap-1">
        <MapPin size={16} />
        <span className={companyProfile.headquarters ? "" : "text-gray-400"}>
          {companyProfile.headquarters || "Set headquarters"}
        </span>
      </div>

      {/* Team Size */}
      <div className="flex items-center gap-1">
        <Users size={16} />
        <span className={companyProfile.teamSize ? "" : "text-gray-400"}>
          {companyProfile.teamSize || "Set team size"}
        </span>
      </div>

      {/* Founded Year */}
      <div className="flex items-center gap-1">
        <Calendar size={16} />
        <span className={companyProfile.foundedYear ? "" : "text-gray-400"}>
          Since {companyProfile.foundedYear || "Year"}
        </span>
      </div>

      {/* Company Size */}
      <div className="flex items-center gap-1">
        <Building size={16} />
        <span className={companyProfile.companySize ? "" : "text-gray-400"}>
          {companyProfile.companySize
            ? `${companyProfile.companySize} employees`
            : "Set company size"}
        </span>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Account Settings
        </h3>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-600">
                Update your account password
              </p>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {showChangePassword ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showChangePassword && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h3 className="text-lg font-bold text-red-700 mb-4">Danger Zone</h3>
        <p className="text-gray-600 mb-6">
          These actions are irreversible. Please proceed with caution.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Delete Account</div>
              <div className="text-sm text-gray-600">
                Permanently delete your company account
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Export Data</div>
              <div className="text-sm text-gray-600">
                Download all your company data
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download size={16} />
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-sm opacity-90 mb-1">Current Plan</div>
            <div className="text-2xl font-bold">Free Plan</div>
            <div className="opacity-90 mt-1">Perfect for getting started</div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <div className="text-sm">Expires on</div>
            <div className="font-bold">Never</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Jobs Limit</div>
            <div className="text-xl font-bold">5</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Applicants</div>
            <div className="text-xl font-bold">100</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Support</div>
            <div className="text-xl font-bold">Basic</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Analytics</div>
            <div className="text-xl font-bold">Basic</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Upgrade Plan</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Starter",
              price: "₹4,999",
              period: "/month",
              features: ["5 Active Jobs", "100 Applications", "Basic Support"],
              current: false,
            },
            {
              name: "Professional",
              price: "₹9,999",
              period: "/month",
              features: [
                "Unlimited Jobs",
                "Unlimited Applications",
                "Priority Support",
                "Advanced Analytics",
              ],
              current: false,
              popular: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "",
              features: [
                "Everything in Pro",
                "Custom Solutions",
                "Dedicated Manager",
                "API Access",
              ],
              current: false,
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`border rounded-xl p-6 ${plan.current ? "border-green-500 ring-2 ring-green-200" : "border-gray-200"} ${plan.popular ? "relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-lg font-bold text-gray-900">
                  {plan.name}
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-lg font-medium ${plan.current ? "bg-green-600 text-white hover:bg-green-700" : "border border-gray-300 hover:bg-gray-50"}`}
              >
                {plan.current ? "Current Plan" : "Upgrade Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <EmployerHeader />
      <div className="min-h-screen bg-gray-50">
        {/* Header with Cover Photo */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600">
            {companyProfile.coverPhoto ? (
              <img
                src={getImageUrl(companyProfile.coverPhoto)}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <Camera size={40} className="mx-auto mb-2 opacity-50" />
                  <div className="text-sm opacity-70">Add cover photo</div>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="absolute top-4 right-4">
                <label className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white flex items-center gap-2">
                  <Camera size={18} />
                  {companyProfile.coverPhoto ? "Change Cover" : "Add Cover"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload("coverPhoto", e.target.files[0])
                    }
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                  {companyProfile.logo ? (
                    <img
                      src={getImageUrl(companyProfile.logo)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Building size={48} className="text-white" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 border-4 border-white">
                    <Camera size={18} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload("logo", e.target.files[0])
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {companyProfile.companyName || "Your Company Name"}
                      </h1>
                      {getVerificationBadge()}
                    </div>
                    <p className="text-gray-600 mb-3">
                      {companyProfile.tagline ||
                        "Add a tagline for your company"}
                    </p>
                    {/* ✅ FIXED: Company Info Display */}
                    <CompanyInfoDisplay />
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Share2 size={20} />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {profileStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${stat.color === "green" ? "bg-green-100 text-green-600" : stat.color === "blue" ? "bg-blue-100 text-blue-600" : stat.color === "purple" ? "bg-purple-100 text-purple-600" : "bg-yellow-100 text-yellow-600"}`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${activeTab === tab.id ? "bg-green-50 text-green-700 border-r-4 border-green-600" : "hover:bg-gray-50"}`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight className="ml-auto" size={18} />
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    href="/employer/post-job"
                    className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <Plus size={16} />
                    Post New Job
                  </Link>
                  <Link
                    href="/employer/my-jobs"
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Briefcase size={16} />
                    View All Jobs
                  </Link>
                  <Link
                    href="/employer/applicants"
                    className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                  >
                    <UsersIcon size={16} />
                    Manage Applicants
                  </Link>
                  <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg w-full text-left">
                    <Download size={16} />
                    Download Report
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeTab === "company" && renderCompanyTab()}
              {activeTab === "settings" && renderSettingsTab()}
              {activeTab === "billing" && renderBillingTab()}
            </div>
          </div>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Delete Account
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone and all your data will be permanently lost.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm text-red-700 font-medium mb-1">
                    Warning
                  </div>
                  <ul className="text-xs text-red-600 list-disc list-inside space-y-1">
                    <li>All job postings will be deleted</li>
                    <li>Applicant data will be lost</li>
                    <li>Billing information will be removed</li>
                    <li>This action cannot be reversed</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      alert(
                        "Account deletion requested. We'll contact you shortly.",
                      );
                    }}
                    className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
