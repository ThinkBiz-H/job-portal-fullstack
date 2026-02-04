"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // phone | otp
  const [userType, setUserType] = useState("jobseeker");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const API = "http://localhost:5000/api";

  /* ================= SEND OTP ================= */
  const sendOtp = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Enter valid 10 digit number");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/auth/send-otp`, {
        phone,
        userType,
      });

      alert("OTP Sent ✅");
      setStep("otp");
    } catch (err) {
      alert(err.response?.data?.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Invalid OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/verify-otp`, {
        phone,
        otp,
        userType,
      });

      // Save Token
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      alert("Login Success 🎉");

      // Redirect by role
      if (userType === "employer") {
        router.push("/employer/dashboard");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={step === "phone" ? sendOtp : verifyOtp}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login with OTP</h2>

        {/* USER TYPE */}
        {step === "phone" && (
          <select
            className="w-full border p-3 mb-4 rounded"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="jobseeker">Candidate</option>
            <option value="employer">Employer</option>
          </select>
        )}

        {/* PHONE */}
        {step === "phone" && (
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            className="w-full border p-3 mb-4 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            required
          />
        )}

        {/* OTP */}
        {step === "otp" && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-3 mb-4 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading
            ? "Please wait..."
            : step === "phone"
              ? "Send OTP"
              : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
