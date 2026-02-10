
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Lock,
  Phone,
  Shield,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default function EmployerRegister() {
  const router = useRouter();
  const API = "http://localhost:5000/api";

  const [step, setStep] = useState("register");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Company name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        userType: "employer",
      });

      await axios.post(`${API}/otp/send`, {
        phone: form.phone,
      });

      setStep("otp");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter complete 6-digit OTP ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/otp/verify`, {
        phone: form.phone,
        otp: otpString,
      });

      alert("✅ Account verified successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/employer/login");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "OTP verification failed";
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const renderRegisterStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0F2A44] flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Hire Top Talent</h2>
        <p className="text-gray-600 mt-2">Create your employer account</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        {/* Company Name */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter your company name"
              value={form.name}
              onChange={handleInputChange}
              className={`w-full pl-11 pr-4 py-3  text-black border rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Business Email
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="company@example.com"
              value={form.email}
              onChange={handleInputChange}
              className={`w-full pl-11 pr-4 py-3  text-black border rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleInputChange}
              className={`w-full pl-11 pr-11 py-3  text-black border rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-11 pr-11 py-3  text-black border rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              maxLength={10}
              value={form.phone}
              onChange={handleInputChange}
              className={`w-full pl-11 pr-4 py-3  text-black border rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-[#0F2A44] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            <>
              Register & Send OTP
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-4 border-t">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/employer/login")}
            className="text-[#0F2A44] font-semibold hover:text-green-700 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );

  const renderOtpStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={() => setStep("register")}
          className="absolute left-6 top-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0F2A44] flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Verify Your Number</h2>
        <p className="text-gray-600 mt-2">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-gray-900">+91 {form.phone}</span>
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digit && index > 0) {
                  document.getElementById(`otp-${index - 1}`).focus();
                }
              }}
              className="w-12 h-12 text-xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-[#0F2A44] focus:ring-2 focus:ring-[#0F2A44] outline-none transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join("").length !== 6}
          className="w-full py-3.5 px-4 bg-[#0F2A44] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying...
            </>
          ) : (
            <>
              Verify & Continue
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-8">
            {step === "register" ? renderRegisterStep() : renderOtpStep()}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-gray-200 p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-gray-900">5 Cr+</div>
                <div className="text-xs text-gray-600">Active Job Seekers</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">95%</div>
                <div className="text-xs text-gray-600">Hiring Success</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">48H</div>
                <div className="text-xs text-gray-600">Avg. Fill Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
