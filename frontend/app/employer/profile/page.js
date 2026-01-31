"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("company");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // Company Profile Data
  const [companyProfile, setCompanyProfile] = useState({
    // Basic Info
    companyName: "TechCorp Solutions Pvt. Ltd.",
    tagline: "Building the Future of Technology",
    description:
      "We are a leading technology company specializing in innovative software solutions, AI/ML products, and digital transformation services for enterprises worldwide.",

    // Contact Info
    email: "careers@techcorp.com",
    phone: "+91 98765 43210",
    website: "https://techcorp.com",
    foundedYear: "2018",
    companySize: "100-500",
    companyType: "Private Limited",
    industry: "Information Technology & Services",

    // Location
    headquarters: "Bangalore, Karnataka, India",
    locations: ["Bangalore", "Mumbai", "Delhi", "Remote"],

    // Social Media
    linkedin: "https://linkedin.com/company/techcorp",
    twitter: "https://twitter.com/techcorp",
    facebook: "https://facebook.com/techcorp",
    instagram: "https://instagram.com/techcorp",

    // About
    mission:
      "To empower businesses through innovative technology solutions that drive growth and efficiency.",
    vision:
      "To be the world's most trusted technology partner for digital transformation.",
    values: [
      "Innovation",
      "Integrity",
      "Customer Focus",
      "Excellence",
      "Collaboration",
    ],

    // Specialties
    specialties: [
      "Software Development",
      "AI & Machine Learning",
      "Cloud Computing",
      "Digital Transformation",
      "Mobile Applications",
      "Web Development",
    ],

    // Benefits
    benefits: [
      "Health Insurance",
      "Flexible Working Hours",
      "Remote Work Options",
      "Learning & Development Budget",
      "Stock Options",
      "Paid Time Off",
      "Annual Bonuses",
      "Team Outings",
    ],

    // Team & Culture
    teamSize: "250+ Employees",
    avgEmployeeTenure: "3.2 years",
    workCulture: "Fast-paced, Collaborative, Innovative",

    // Verification
    isVerified: true,
    verificationLevel: "advanced",
    documentsVerified: ["Company Registration", "GST", "PAN", "Bank Account"],

    // Statistics
    totalJobsPosted: 24,
    totalHires: 156,
    avgResponseTime: "2.4 days",
    candidateSatisfaction: "4.8/5",

    // Settings
    notifications: {
      email: true,
      push: true,
      applicationAlerts: true,
      jobAlerts: true,
      newsletter: false,
    },

    // Billing
    plan: "Professional",
    planExpiry: "2024-12-31",
    billingCycle: "Annual",
    nextBillingDate: "2024-12-31",
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Form State
  const [formData, setFormData] = useState({ ...companyProfile });
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newValue, setNewValue] = useState("");

  // Stats for dashboard
  const profileStats = [
    {
      label: "Profile Completion",
      value: "85%",
      color: "green",
      icon: <User size={20} />,
    },
    {
      label: "Verification Status",
      value: "Verified ✓",
      color: "blue",
      icon: <Shield size={20} />,
    },
    {
      label: "Response Rate",
      value: "94%",
      color: "purple",
      icon: <BarChart3 size={20} />,
    },
    {
      label: "Candidate Rating",
      value: "4.8/5",
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

  const recentActivities = [
    {
      id: 1,
      text: "Profile updated - Company description",
      time: "2 hours ago",
      type: "edit",
    },
    {
      id: 2,
      text: "New job posted - Senior Frontend Developer",
      time: "1 day ago",
      type: "job",
    },
    {
      id: 3,
      text: "Profile verification completed",
      time: "3 days ago",
      type: "verification",
    },
    {
      id: 4,
      text: "Billing plan upgraded to Professional",
      time: "1 week ago",
      type: "billing",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayAdd = (field, value, setValueFunction) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setValueFunction("");
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCompanyProfile(formData);
      setIsEditing(false);
      setLoading(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Simulate password change
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowChangePassword(false);
  };

  const handleImageUpload = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfileImage(reader.result);
        } else {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
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
    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
        <CheckCircle size={14} />
        Verified Company
      </div>
    );
  };

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
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <div className="text-lg font-semibold text-gray-900">
                {companyProfile.companyName}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your company in one line"
              />
            ) : (
              <div className="text-gray-700">{companyProfile.tagline}</div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description *
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Tell candidates about your company culture, mission, and what makes you unique"
              />
            ) : (
              <div className="text-gray-700 whitespace-pre-line">
                {companyProfile.description}
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
          {[
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
              type: "text",
            },
            {
              label: "Company Size",
              value: "companySize",
              icon: <Users size={18} />,
              type: "text",
            },
            {
              label: "Industry",
              value: "industry",
              icon: <Briefcase size={18} />,
              type: "text",
            },
          ].map((field) => (
            <div key={field.value}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              {isEditing ? (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {field.icon}
                  </div>
                  <input
                    type={field.type}
                    value={formData[field.value]}
                    onChange={(e) =>
                      handleInputChange(field.value, e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-700">
                  {field.icon}
                  <span>{companyProfile[field.value]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
                className="px-3 py-2 border border-gray-300 rounded-lg"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleArrayAdd("locations", newLocation, setNewLocation)
                }
              />
              <button
                onClick={() =>
                  handleArrayAdd("locations", newLocation, setNewLocation)
                }
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {companyProfile.locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
            >
              <MapPin size={16} className="text-gray-600" />
              <span>{location}</span>
              {isEditing && (
                <button
                  onClick={() => handleArrayRemove("locations", index)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {isEditing && formData.locations.length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Preview:
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.locations.map((location, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
                >
                  {location}
                </div>
              ))}
            </div>
          </div>
        )}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {social.label}
              </label>
              {isEditing ? (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {social.icon}
                  </div>
                  <input
                    type="url"
                    value={formData[social.value]}
                    onChange={(e) =>
                      handleInputChange(social.value, e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Account Settings
        </h3>

        {/* Change Password */}
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

        {/* Notification Settings */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">
            Notification Preferences
          </h4>
          <div className="space-y-3">
            {Object.entries(companyProfile.notifications).map(
              ([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === "email" && "Receive email notifications"}
                      {key === "push" && "Browser push notifications"}
                      {key === "applicationAlerts" &&
                        "Alerts for new applications"}
                      {key === "jobAlerts" && "Job posting reminders"}
                      {key === "newsletter" && "Monthly newsletter"}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setCompanyProfile((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [key]: e.target.checked,
                          },
                        }))
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition ${value ? "bg-green-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transform transition ${value ? "translate-x-7" : "translate-x-1"} translate-y-0.5`}
                      ></div>
                    </div>
                  </div>
                </label>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
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

          <div className="flex items-center justify-between p-4 border border-yellow-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">
                Deactivate Account
              </div>
              <div className="text-sm text-gray-600">
                Temporarily deactivate your account
              </div>
            </div>
            <button className="px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50">
              Deactivate
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
      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-sm opacity-90 mb-1">Current Plan</div>
            <div className="text-2xl font-bold">{companyProfile.plan} Plan</div>
            <div className="opacity-90 mt-1">Perfect for growing companies</div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <div className="text-sm">Expires on</div>
            <div className="font-bold">{companyProfile.planExpiry}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Jobs Limit</div>
            <div className="text-xl font-bold">Unlimited</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Applicants</div>
            <div className="text-xl font-bold">Unlimited</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Support</div>
            <div className="text-xl font-bold">Priority</div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-sm opacity-90">Analytics</div>
            <div className="text-xl font-bold">Advanced</div>
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Billing Details
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Billing Cycle</div>
              <div className="text-sm text-gray-600">
                How often you're billed
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-lg font-medium">
              {companyProfile.billingCycle}
            </div>
          </div>

          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Next Billing Date</div>
              <div className="text-sm text-gray-600">
                When your next payment is due
              </div>
            </div>
            <div className="font-medium">{companyProfile.nextBillingDate}</div>
          </div>

          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Payment Method</div>
              <div className="text-sm text-gray-600">Visa ending in 4242</div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Plans */}
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
              current: true,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header with Cover Photo */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600">
          {coverImage ? (
            <img
              src={coverImage}
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

          {/* Cover Photo Upload */}
          {isEditing && (
            <div className="absolute top-4 right-4">
              <label className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white flex items-center gap-2">
                <Camera size={18} />
                {coverImage ? "Change Cover" : "Add Cover"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload("cover", e.target.files[0])
                  }
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Profile Photo and Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Building size={48} className="text-white" />
                  </div>
                )}
              </div>

              {/* Profile Photo Upload */}
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-700 border-4 border-white">
                  <Camera size={18} className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload("profile", e.target.files[0])
                    }
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-1 pb-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {companyProfile.companyName}
                    </h1>
                    {getVerificationBadge()}
                  </div>
                  <p className="text-gray-600 mb-3">{companyProfile.tagline}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {companyProfile.headquarters}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      {companyProfile.teamSize}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      Since {companyProfile.foundedYear}
                    </div>
                  </div>
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
        {/* Stats */}
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
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tabs Navigation */}
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

            {/* Quick Actions */}
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

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="text-sm">
                    <div className="text-gray-800">{activity.text}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "company" && renderCompanyTab()}
            {activeTab === "settings" && renderSettingsTab()}
            {activeTab === "billing" && renderBillingTab()}
            {/* Add other tabs as needed */}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
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
  );
}
