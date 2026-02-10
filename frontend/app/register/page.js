"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Phone,
  Shield,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Key,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default function Register() {
  const router = useRouter();
  // const API = "http://localhost:5000/api";
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [step, setStep] = useState("register"); // register | otp
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
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
        userType: "jobseeker",
      });

      // Send OTP after register
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

    // Auto-focus next input
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
        router.push("/login");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "OTP verification failed";
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${API}/otp/send`, {
        phone: form.phone,
      });
      alert("📱 OTP resent to your mobile number");
    } catch (err) {
      alert("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const renderRegisterStep = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0F2A44] flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Create Your Account
        </h2>
        <p className="text-gray-600 mt-2">
          Join thousands who found their dream job
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleInputChange}
              className={`w-full pl-11 pr-4 py-3 text-black border rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
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

        {/* Email Field */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleInputChange}
              className={`w-full pl-11 pr-4 py-3 text-black border rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
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

        {/* Password Field */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
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
              className={`w-full pl-11 pr-11 py-3 text-black border rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
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

        {/* Confirm Password Field */}
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
              className={`w-full pl-11 pr-11 py-3 text-black border rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
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

        {/* Phone Field */}
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
              className={`w-full pl-11 pr-4 py-3 text-black border rounded-xl focus:ring-2 focus:ring-[#0F2A44] focus:border-[#0F2A44] outline-none transition-colors ${
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
          <p className="mt-1 text-sm text-gray-500">
            We'll send a verification code to this number
          </p>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-[#0F2A44]"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 bg-[#0F2A44] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center pt-4 border-t">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );

  const renderOtpStep = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <button
          onClick={() => setStep("register")}
          className="absolute left-6 top-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0F2A44] flex items-center justify-center mb-4">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Verify Your Number</h2>
        <p className="text-gray-600 mt-2">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-gray-900">+91 {form.phone}</span>
        </p>
      </div>

      <form onSubmit={handleVerifyOtp} className="space-y-8">
        {/* OTP Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Enter Verification Code
          </label>
          <div className="flex justify-center gap-3">
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
                className="w-14 h-14 text-2xl font-bold text-center border-2 border-gray-300 rounded-xl focus:border-[#0F2A44] focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={resendOtp}
                disabled={loading}
                className="text-blue-600 font-semibold hover:text-blue-700 disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading || otp.join("").length !== 6}
          className="w-full py-3.5 px-4 bg-[#0F2A44] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

      {/* Timer & Info */}
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Verification Code Sent
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Check your SMS messages for the 6-digit code
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="p-8">
            {step === "register" ? renderRegisterStep() : renderOtpStep()}
          </div>

          {/* Footer Stats */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-xs text-gray-600">Jobs</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5K+</div>
                <div className="text-xs text-gray-600">Companies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
