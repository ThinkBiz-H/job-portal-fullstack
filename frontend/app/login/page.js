"use client";

import { useState } from "react";
import { auth } from "../../services/firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);

  // ✅ Setup Recaptcha (MISSING PART - VERY IMPORTANT)
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal", // visible for testing
          callback: () => {
            console.log("Recaptcha Verified");
          },
          "expired-callback": () => {
            alert("Recaptcha Expired, Reload Page");
          },
        }
      );
    }
  };

  // ✅ Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const fullPhone = "+91" + phone;

    try {
      const result = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier
      );

      setConfirmResult(result);

      alert("OTP Sent ✅");

    } catch (err) {
      console.error("OTP Error:", err);
      alert(err.message); // Show real error
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      alert("Invalid OTP");
      return;
    }

    try {
      await confirmResult.confirm(otp);

      alert("Login Success 🎉");

      window.location.href = "/profile";

    } catch (err) {
      console.error("Verify Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={confirmResult ? verifyOtp : sendOtp}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login with Mobile
        </h2>

        {!confirmResult && (
          <input
            type="tel"
            placeholder="Enter Mobile"
            className="w-full border p-3 mb-4 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            required
          />
        )}

        {confirmResult && (
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
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {confirmResult ? "Verify OTP" : "Send OTP"}
        </button>

        {/* ✅ Recaptcha Container */}
        <div id="recaptcha-container"></div>

      </form>

    </div>
  );
}
