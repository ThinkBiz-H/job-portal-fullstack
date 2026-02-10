// // "use client";

// // import { useState, useEffect, useRef } from "react";

// // export default function LoginModal({ isOpen, onClose, onLogin }) {

// //   // ✅ Hooks ALWAYS at top
// //   const [step, setStep] = useState(1);
// //   const [mobile, setMobile] = useState("");
// //   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
// //   const [timer, setTimer] = useState(30);

// //   const inputRefs = useRef([]);

// //   /* ---------------- TIMER ---------------- */
// //   useEffect(() => {
// //     if (step === 2 && timer > 0) {
// //       const t = setTimeout(() => {
// //         setTimer((p) => p - 1);
// //       }, 1000);

// //       return () => clearTimeout(t);
// //     }
// //   }, [step, timer]);

// //   // ✅ AFTER hooks, conditional return
// //   if (!isOpen) return null;

// //   /* ---------------- SEND OTP ---------------- */
// //   const sendOtp = () => {
// //     if (mobile.length !== 10) {
// //       alert("Enter valid mobile number");
// //       return;
// //     }

// //     alert("OTP Sent ✅ (Demo)");

// //     setStep(2);
// //     setTimer(30);
// //     setOtp(["", "", "", "", "", ""]);

// //     setTimeout(() => {
// //       inputRefs.current[0]?.focus();
// //     }, 100);
// //   };

// //   /* ---------------- OTP CHANGE ---------------- */
// //   const handleOtpChange = (e, index) => {
// //     const value = e.target.value.replace(/\D/, "");

// //     if (!value) return;

// //     const newOtp = [...otp];
// //     newOtp[index] = value;
// //     setOtp(newOtp);

// //     if (index < 5) {
// //       inputRefs.current[index + 1]?.focus();
// //     }
// //   };

// //   const handleKeyDown = (e, index) => {
// //     if (e.key === "Backspace") {
// //       const newOtp = [...otp];

// //       if (otp[index]) {
// //         newOtp[index] = "";
// //       } else if (index > 0) {
// //         newOtp[index - 1] = "";
// //         inputRefs.current[index - 1]?.focus();
// //       }

// //       setOtp(newOtp);
// //     }
// //   };

// //   /* ---------------- VERIFY ---------------- */
// // const verifyOtp = () => {
// //   if (otp.join("").length !== 6) {
// //     alert("Enter complete OTP");
// //     return;
// //   }

// //   // Save login
// //   localStorage.setItem("apnajob_user", mobile);

// //   // 🔥 Notify Navbar
// //   if (onLogin) {
// //     onLogin(mobile);
// //   }

// //   alert("Login Success 🎉");

// //   resetAll();
// // };

// //   /* ---------------- RESET ---------------- */
// //   const resetAll = () => {
// //     setStep(1);
// //     setMobile("");
// //     setOtp(["", "", "", "", "", ""]);
// //     setTimer(30);
// //     onClose();
// //   };

// //   /* ---------------- RESEND ---------------- */
// //   const resendOtp = () => {
// //     // alert("OTP Resent ✅ (Demo)");

// //     setTimer(30);
// //     setOtp(["", "", "", "", "", ""]);

// //     inputRefs.current[0]?.focus();
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center text-black justify-center">

// //       {/* Overlay */}
// //       <div
// //         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
// //         onClick={resetAll}
// //       ></div>

// //       {/* Modal */}
// //       <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">

// //         {/* Close */}
// //         <button
// //           onClick={resetAll}
// //           className="absolute top-3 right-3 text-xl text-gray-500"
// //         >
// //           ✕
// //         </button>

// //         {/* ---------- STEP 1 ---------- */}
// //         {step === 1 && (
// //           <>
// //             <h2 className="text-xl font-bold mb-4">
// //               Enter your mobile number
// //             </h2>

// //             <div className="flex items-center border rounded px-3 py-2 mb-4">

// //               <span className="mr-2 text-gray-600">+91</span>

// //               <input
// //                 type="tel"
// //                 placeholder="Eg: 9876543210"
// //                 className="w-full outline-none"
// //                 value={mobile}
// //                 onChange={(e) => setMobile(e.target.value)}
// //                 maxLength={10}
// //               />

// //             </div>

// //             <button
// //               onClick={sendOtp}
// //               disabled={mobile.length !== 10}
// //               className={`w-full py-3 rounded font-medium ${
// //                 mobile.length === 10
// //                   ? "bg-blue-600 text-white"
// //                   : "bg-gray-300 text-gray-500"
// //               }`}
// //             >
// //               Next
// //             </button>
// //           </>
// //         )}

// //         {/* ---------- STEP 2 ---------- */}
// //         {step === 2 && (
// //           <>
// //             <h2 className="text-xl font-bold mb-2">
// //               Enter OTP
// //             </h2>

// //             <p className="text-sm text-gray-500 mb-4">
// //               OTP sent to <b>+91-{mobile}</b>

// //               <button
// //                 onClick={() => setStep(1)}
// //                 className="text-blue-600 ml-2"
// //               >
// //                 ✎
// //               </button>
// //             </p>

// //             {/* OTP BOXES */}
// //             <div className="flex justify-between gap-2 mb-4">

// //               {otp.map((digit, i) => (
// //                 <input
// //                   key={i}
// //                   ref={(el) => (inputRefs.current[i] = el)}
// //                   type="text"
// //                   maxLength={1}
// //                   value={digit}
// //                   onChange={(e) => handleOtpChange(e, i)}
// //                   onKeyDown={(e) => handleKeyDown(e, i)}
// //                   className="w-12 h-12 border rounded text-center text-lg font-semibold focus:border-blue-600 outline-none"
// //                 />
// //               ))}

// //             </div>

// //             <button
// //               onClick={verifyOtp}
// //               className="w-full bg-blue-600 text-white py-3 rounded font-medium"
// //             >
// //               Verify OTP
// //             </button>

// //             {/* TIMER */}
// //             <div className="text-center text-sm mt-3">

// //               {timer > 0 ? (
// //                 <span className="text-gray-500">
// //                   Resend OTP in 00:{timer.toString().padStart(2, "0")}
// //                 </span>
// //               ) : (
// //                 <button
// //                   onClick={resendOtp}
// //                   className="text-blue-600 font-medium"
// //                 >
// //                   Resend OTP
// //                 </button>
// //               )}

// //             </div>
// //           </>
// //         )}

// //       </div>

// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect, useRef } from "react";

// export default function LoginModal({ isOpen, onClose, onLogin, type = "candidate" }) {

//   // ✅ Hooks ALWAYS at top
//   const [step, setStep] = useState(1);
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [timer, setTimer] = useState(30);
//   const [userType, setUserType] = useState(type); // "candidate" or "employer"

//   const inputRefs = useRef([]);

//   /* ---------------- TIMER ---------------- */
//   useEffect(() => {
//     if (step === 2 && timer > 0) {
//       const t = setTimeout(() => {
//         setTimer((p) => p - 1);
//       }, 1000);

//       return () => clearTimeout(t);
//     }
//   }, [step, timer]);

//   // ✅ AFTER hooks, conditional return
//   if (!isOpen) return null;

//   /* ---------------- SEND OTP ---------------- */
//   const sendOtp = () => {
//     if (mobile.length !== 10) {
//       alert("Enter valid mobile number");
//       return;
//     }

//     alert(`OTP Sent to ${userType === "employer" ? "Employer" : "Candidate"} ✅ (Demo)`);

//     setStep(2);
//     setTimer(30);
//     setOtp(["", "", "", "", "", ""]);

//     setTimeout(() => {
//       inputRefs.current[0]?.focus();
//     }, 100);
//   };

//   /* ---------------- OTP CHANGE ---------------- */
//   const handleOtpChange = (e, index) => {
//     const value = e.target.value.replace(/\D/, "");

//     if (!value) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const newOtp = [...otp];

//       if (otp[index]) {
//         newOtp[index] = "";
//       } else if (index > 0) {
//         newOtp[index - 1] = "";
//         inputRefs.current[index - 1]?.focus();
//       }

//       setOtp(newOtp);
//     }
//   };

//   /* ---------------- VERIFY OTP ---------------- */
//   const verifyOtp = () => {
//     if (otp.join("").length !== 6) {
//       alert("Enter complete OTP");
//       return;
//     }

//     // Save login with user type
//     localStorage.setItem("apnajob_user", mobile);
//     localStorage.setItem("apnajob_user_type", userType);

//     // 🔥 Notify Navbar with user type
//     if (onLogin) {
//       onLogin(mobile, userType);
//     }

//     alert(`${userType === "employer" ? "Employer" : "Candidate"} Login Success 🎉`);

//     resetAll();
//   };

//   /* ---------------- RESET ---------------- */
//   const resetAll = () => {
//     setStep(1);
//     setMobile("");
//     setOtp(["", "", "", "", "", ""]);
//     setTimer(30);
//     setUserType(type); // Reset to original type
//     onClose();
//   };

//   /* ---------------- RESEND OTP ---------------- */
//   const resendOtp = () => {
//     alert("OTP Resent ✅ (Demo)");
//     setTimer(30);
//     setOtp(["", "", "", "", "", ""]);
//     inputRefs.current[0]?.focus();
//   };

//   /* ---------------- SWITCH USER TYPE ---------------- */
//   const switchUserType = (newType) => {
//     setUserType(newType);
//     // Reset form when switching
//     setMobile("");
//     setStep(1);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center text-black justify-center">

//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//         onClick={resetAll}
//       ></div>

//       {/* Modal */}
//       <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">

//         {/* Close */}
//         <button
//           onClick={resetAll}
//           className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>

//         {/* USER TYPE SELECTION - Only in Step 1 */}
//         {step === 1 && (
//           <div className="mb-4">
//             <h2 className="text-lg font-bold mb-2">Login as:</h2>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => switchUserType("candidate")}
//                 className={`flex-1 py-2 rounded-lg font-medium border ${
//                   userType === "candidate"
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-gray-100 text-gray-700 border-gray-300"
//                 }`}
//               >
//                 👤 Candidate
//               </button>
//               <button
//                 onClick={() => switchUserType("employer")}
//                 className={`flex-1 py-2 rounded-lg font-medium border ${
//                   userType === "employer"
//                     ? "bg-orange-500 text-white border-orange-500"
//                     : "bg-gray-100 text-gray-700 border-gray-300"
//                 }`}
//               >
//                 🏢 Employer
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ---------- STEP 1: MOBILE INPUT ---------- */}
//         {step === 1 && (
//           <>
//             <h2 className="text-xl font-bold mb-4">
//               {userType === "employer" ? "Employer Login" : "Candidate Login"}
//             </h2>

//             <div className="mb-1">
//               <label className="block text-sm text-gray-600 mb-1">
//                 Enter your mobile number
//               </label>
//               <div className="flex items-center border rounded-lg px-3 py-2 mb-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
//                 <span className="mr-2 text-gray-700 font-medium">+91</span>
//                 <input
//                   type="tel"
//                   placeholder="Eg: 9876543210"
//                   className="w-full outline-none text-lg"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   maxLength={10}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={sendOtp}
//               disabled={mobile.length !== 10}
//               className={`w-full py-3 rounded-lg font-medium ${
//                 mobile.length === 10
//                   ? userType === "employer"
//                     ? "bg-orange-500 hover:bg-orange-600 text-white"
//                     : "bg-blue-600 hover:bg-blue-700 text-white"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               Send OTP
//             </button>

//             <p className="text-xs text-gray-500 text-center mt-3">
//               We'll send a 6-digit OTP to this number
//             </p>
//           </>
//         )}

//         {/* ---------- STEP 2: OTP VERIFICATION ---------- */}
//         {step === 2 && (
//           <>
//             <div className="mb-4">
//               <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
//                 userType === "employer"
//                   ? "bg-orange-100 text-orange-700"
//                   : "bg-blue-100 text-blue-700"
//               }`}>
//                 {userType === "employer" ? "🏢 Employer Login" : "👤 Candidate Login"}
//               </div>
//             </div>

//             <h2 className="text-xl font-bold mb-2">
//               Enter OTP
//             </h2>

//             <p className="text-sm text-gray-500 mb-4">
//               OTP sent to <b>+91 {mobile}</b>
//               <button
//                 onClick={() => setStep(1)}
//                 className="text-blue-600 ml-2 hover:underline"
//               >
//                 Change number
//               </button>
//             </p>

//             {/* OTP BOXES */}
//             <div className="flex justify-between gap-2 mb-6">
//               {otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={(el) => (inputRefs.current[i] = el)}
//                   type="text"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(e, i)}
//                   onKeyDown={(e) => handleKeyDown(e, i)}
//                   onPaste={(e) => {
//                     e.preventDefault();
//                     const paste = e.clipboardData.getData('text').slice(0, 6);
//                     const pasteArray = paste.split('');
//                     const newOtp = [...otp];
//                     pasteArray.forEach((char, idx) => {
//                       if (idx < 6 && /^\d+$/.test(char)) {
//                         newOtp[idx] = char;
//                       }
//                     });
//                     setOtp(newOtp);

//                     // Focus on last filled input
//                     const lastIndex = Math.min(pasteArray.length - 1, 5);
//                     setTimeout(() => inputRefs.current[lastIndex]?.focus(), 10);
//                   }}
//                   className={`w-12 h-12 border-2 rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 ${
//                     userType === "employer"
//                       ? "focus:border-orange-500 focus:ring-orange-200"
//                       : "focus:border-blue-500 focus:ring-blue-200"
//                   }`}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={verifyOtp}
//               disabled={otp.join("").length !== 6}
//               className={`w-full py-3 rounded-lg font-medium ${
//                 otp.join("").length === 6
//                   ? userType === "employer"
//                     ? "bg-orange-500 hover:bg-orange-600 text-white"
//                     : "bg-blue-600 hover:bg-blue-700 text-white"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               Verify OTP & Login
//             </button>

//             {/* TIMER & RESEND */}
//             <div className="text-center text-sm mt-4">
//               {timer > 0 ? (
//                 <span className="text-gray-500">
//                   Resend OTP in 00:{timer.toString().padStart(2, "0")}
//                 </span>
//               ) : (
//                 <button
//                   onClick={resendOtp}
//                   className="text-blue-600 font-medium hover:underline"
//                 >
//                   Resend OTP
//                 </button>
//               )}
//             </div>

//             {/* SWITCH USER TYPE IN STEP 2 */}
//             <div className="text-center mt-4 pt-4 border-t">
//               <p className="text-sm text-gray-600">
//                 {userType === "employer"
//                   ? "Looking for jobs? "
//                   : "Are you an employer? "}
//                 <button
//                   onClick={() => switchUserType(userType === "employer" ? "candidate" : "employer")}
//                   className="font-medium text-blue-600 hover:underline"
//                 >
//                   {userType === "employer" ? "Candidate Login" : "Employer Login"}
//                 </button>
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

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
