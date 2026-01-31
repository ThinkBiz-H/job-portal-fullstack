// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EmployerLogin() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     if (!email || !password) {
//       alert("Please fill all fields ❌");
//       return;
//     }

//     setLoading(true);

//     // 🔥 DEMO LOGIN (later backend se connect hoga)
//     setTimeout(() => {
//       setLoading(false);

//       // Fake check
//       if (email === "admin@gmail.com" && password === "123456") {
//         alert("Login Successful ✅");

//         router.push("/employer/dashboard");
//       } else {
//         alert("Invalid Email or Password ❌");
//       }
//     }, 1000);
//   };

//   return (
//     <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg border">
//         {/* LOGO / TITLE */}
//         <h2 className="text-2xl font-bold text-center text-black mb-2">
//           Employer Login
//         </h2>

//         <p className="text-sm text-center text-gray-500 mb-6">
//           Login to manage your jobs
//         </p>

//         {/* EMAIL */}
//         <div className="mb-4">
//           <label className="text-sm text-black mb-1 block">Email</label>

//           <input
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
//           />
//         </div>

//         {/* PASSWORD */}
//         <div className="mb-4">
//           <label className="text-sm text-black mb-1 block">Password</label>

//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
//           />
//         </div>

//         {/* LOGIN BTN */}
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* INFO */}
//         <p className="text-xs text-center text-gray-400 mt-4">
//           Demo Login: admin@gmail.com / 123456
//         </p>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployerLogin() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Handle send OTP
  const handleSendOtp = () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number ❌");
      return;
    }

    setLoading(true);

    // 🔥 Simulate OTP sending (in real app, call backend API)
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setCountdown(30);

      // Start countdown for resend OTP
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Store timer reference for cleanup
      window.otpTimer = timer;

      alert(`OTP sent to ${phone} ✅ (Demo OTP: 123456)`);
    }, 1000);
  };

  // Handle login with OTP
  const handleLogin = () => {
    if (!otp) {
      alert("Please enter OTP ❌");
      return;
    }

    setLoading(true);

    // 🔥 DEMO LOGIN
    setTimeout(() => {
      setLoading(false);

      // Fake check
      if (otp === "123456") {
        alert("Login Successful ✅");
        router.push("/employer/dashboard");
      } else {
        alert("Invalid OTP ❌");
      }
    }, 1000);
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (countdown > 0) return;

    handleSendOtp();
  };

  // Clear interval on component unmount
  if (typeof window !== "undefined") {
    window.onbeforeunload = () => {
      if (window.otpTimer) {
        clearInterval(window.otpTimer);
      }
    };
  }

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg border">
        {/* LOGO / TITLE */}
        <h2 className="text-2xl font-bold text-center text-black mb-2">
          Employer Login
        </h2>

        <p className="text-sm text-center text-gray-500 mb-6">
          Login with phone number & OTP
        </p>

        {/* PHONE NUMBER */}
        <div className="mb-4">
          <label className="text-sm text-black mb-1 block">Phone Number</label>
          <div className="flex gap-2">
            <div className="flex items-center border px-3 py-2 rounded-lg bg-gray-50">
              <span className="text-gray-700">+91</span>
            </div>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setPhone(value);
              }}
              disabled={otpSent}
              className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Send OTP Button (shows before OTP is sent) */}
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition mb-4"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            {/* OTP INPUT */}
            <div className="mb-4">
              <label className="text-sm text-black mb-1 block">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 6) setOtp(value);
                }}
                className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
              />

              {/* Resend OTP link */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className={`text-sm ${countdown > 0 ? "text-gray-400" : "text-green-600 hover:text-green-700"}`}
                >
                  {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                </button>
              </div>
            </div>

            {/* VERIFY OTP BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading || !otp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition mb-4"
            >
              {loading ? "Verifying..." : "Verify OTP & Login"}
            </button>

            {/* Change Phone Number */}
            <button
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setPhone("");
                if (window.otpTimer) {
                  clearInterval(window.otpTimer);
                }
              }}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Change Phone Number
            </button>
          </>
        )}

        {/* DEMO INFO */}
        <p className="text-xs text-center text-gray-400 mt-4">
          Demo: Enter any 10-digit number → OTP: 123456
        </p>
      </div>
    </section>
  );
}
