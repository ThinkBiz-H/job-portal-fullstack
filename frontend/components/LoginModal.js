
"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  type = "jobseeker",
}) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [userType, setUserType] = useState(type);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setUserType(type); // 🔥 Candidate / Employer sync
      setStep(1);
      setMobile("");
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
    }
  }, [type, isOpen]);

  const inputRefs = useRef([]);
  const router = useRouter();

  const API = "http://localhost:5000/api";

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const t = setTimeout(() => {
        setTimer((p) => p - 1);
      }, 1000);

      return () => clearTimeout(t);
    }
  }, [step, timer]);

  if (!isOpen) return null;

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/auth/send-otp`, {
        phone: mobile,
        userType,
      });

      alert("OTP Sent ✅ (Check terminal)");

      setStep(2);
      setTimer(30);
      setOtp(["", "", "", "", "", ""]);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      alert(err.response?.data?.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/verify-otp`, {
        phone: mobile,
        otp: finalOtp,
        userType,
      });

      // Save auth
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      if (onLogin) {
        onLogin(mobile, userType);
      }

      alert("Login Success 🎉");

      resetAll();

      // Redirect
      if (userType === "employer") {
        router.push("/employer/dashboard");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET ================= */
  const resetAll = () => {
    setStep(1);
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setUserType(type);
    onClose();
  };

  /* ================= RESEND ================= */
  const resendOtp = () => {
    sendOtp();
  };

  /* ================= OTP INPUT ================= */
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }

      setOtp(newOtp);
    }
  };

  /* ================= SWITCH TYPE ================= */
  const switchUserType = (newType) => {
    setUserType(newType);
    setMobile("");
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={resetAll}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
        {/* Close */}
        <button
          onClick={resetAll}
          className="absolute top-3 right-3 text-xl text-gray-500"
        >
          ✕
        </button>

        {/* USER TYPE */}
        {step === 1 && (
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => switchUserType("jobseeker")}
              className={`flex-1 py-2 rounded ${
                userType === "jobseeker"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Candidate
            </button>

            <button
              onClick={() => switchUserType("employer")}
              className={`flex-1 py-2 rounded ${
                userType === "employer"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Employer
            </button>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Login</h2>

            <div className="flex border rounded px-3 py-2 mb-4">
              <span className="mr-2">+91</span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
                className="w-full outline-none"
                placeholder="9876543210"
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-2">Enter OTP</h2>

            <p className="text-sm mb-4">+91 {mobile}</p>

            <div className="flex gap-2 mb-5 justify-between">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 border text-center text-xl"
                />
              ))}
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center text-sm mt-3">
              {timer > 0 ? (
                <span>Resend in {timer}s</span>
              ) : (
                <button onClick={resendOtp} className="text-blue-600">
                  Resend
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
