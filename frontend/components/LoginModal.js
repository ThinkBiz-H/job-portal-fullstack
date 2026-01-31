"use client";

import { useState, useEffect, useRef } from "react";

export default function LoginModal({ isOpen, onClose, onLogin }) {


  // ✅ Hooks ALWAYS at top
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef([]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const t = setTimeout(() => {
        setTimer((p) => p - 1);
      }, 1000);

      return () => clearTimeout(t);
    }
  }, [step, timer]);

  // ✅ AFTER hooks, conditional return
  if (!isOpen) return null;

  /* ---------------- SEND OTP ---------------- */
  const sendOtp = () => {
    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    alert("OTP Sent ✅ (Demo)");

    setStep(2);
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  /* ---------------- OTP CHANGE ---------------- */
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

  /* ---------------- VERIFY ---------------- */
const verifyOtp = () => {
  if (otp.join("").length !== 6) {
    alert("Enter complete OTP");
    return;
  }

  // Save login
  localStorage.setItem("apnajob_user", mobile);

  // 🔥 Notify Navbar
  if (onLogin) {
    onLogin(mobile);
  }

  alert("Login Success 🎉");

  resetAll();
};


    

  /* ---------------- RESET ---------------- */
  const resetAll = () => {
    setStep(1);
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    onClose();
  };

  /* ---------------- RESEND ---------------- */
  const resendOtp = () => {
    // alert("OTP Resent ✅ (Demo)");

    setTimer(30);
    setOtp(["", "", "", "", "", ""]);

    inputRefs.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center text-black justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={resetAll}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">

        {/* Close */}
        <button
          onClick={resetAll}
          className="absolute top-3 right-3 text-xl text-gray-500"
        >
          ✕
        </button>

        {/* ---------- STEP 1 ---------- */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Enter your mobile number
            </h2>

            <div className="flex items-center border rounded px-3 py-2 mb-4">

              <span className="mr-2 text-gray-600">+91</span>

              <input
                type="tel"
                placeholder="Eg: 9876543210"
                className="w-full outline-none"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
              />

            </div>

            <button
              onClick={sendOtp}
              disabled={mobile.length !== 10}
              className={`w-full py-3 rounded font-medium ${
                mobile.length === 10
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Next
            </button>
          </>
        )}

        {/* ---------- STEP 2 ---------- */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-2">
              Enter OTP
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              OTP sent to <b>+91-{mobile}</b>

              <button
                onClick={() => setStep(1)}
                className="text-blue-600 ml-2"
              >
                ✎
              </button>
            </p>

            {/* OTP BOXES */}
            <div className="flex justify-between gap-2 mb-4">

              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 border rounded text-center text-lg font-semibold focus:border-blue-600 outline-none"
                />
              ))}

            </div>

            <button
              onClick={verifyOtp}
              className="w-full bg-blue-600 text-white py-3 rounded font-medium"
            >
              Verify OTP
            </button>

            {/* TIMER */}
            <div className="text-center text-sm mt-3">

              {timer > 0 ? (
                <span className="text-gray-500">
                  Resend OTP in 00:{timer.toString().padStart(2, "0")}
                </span>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-blue-600 font-medium"
                >
                  Resend OTP
                </button>
              )}

            </div>
          </>
        )}

      </div>

    </div>
  );
}
