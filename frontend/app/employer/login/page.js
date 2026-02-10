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
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EmployerLogin() {
//   const router = useRouter();

//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [countdown, setCountdown] = useState(0);

//   // Handle send OTP
//   const handleSendOtp = () => {
//     if (!phone || phone.length !== 10) {
//       alert("Please enter a valid 10-digit phone number ❌");
//       return;
//     }

//     setLoading(true);

//     // 🔥 Simulate OTP sending (in real app, call backend API)
//     setTimeout(() => {
//       setLoading(false);
//       setOtpSent(true);
//       setCountdown(30);

//       // Start countdown for resend OTP
//       const timer = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);

//       // Store timer reference for cleanup
//       window.otpTimer = timer;

//       alert(`OTP sent to ${phone} ✅ (Demo OTP: 123456)`);
//     }, 1000);
//   };

//   // Handle login with OTP
//   const handleLogin = () => {
//     if (!otp) {
//       alert("Please enter OTP ❌");
//       return;
//     }

//     setLoading(true);

//     // 🔥 DEMO LOGIN
//     setTimeout(() => {
//       setLoading(false);

//       // Fake check
//       if (otp === "123456") {
//         alert("Login Successful ✅");
//         router.push("/employer/dashboard");
//       } else {
//         alert("Invalid OTP ❌");
//       }
//     }, 1000);
//   };

//   // Handle resend OTP
//   const handleResendOtp = () => {
//     if (countdown > 0) return;

//     handleSendOtp();
//   };

//   // Clear interval on component unmount
//   if (typeof window !== "undefined") {
//     window.onbeforeunload = () => {
//       if (window.otpTimer) {
//         clearInterval(window.otpTimer);
//       }
//     };
//   }

//   return (
//     <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg border">
//         {/* LOGO / TITLE */}
//         <h2 className="text-2xl font-bold text-center text-black mb-2">
//           Employer Login
//         </h2>

//         <p className="text-sm text-center text-gray-500 mb-6">
//           Login with phone number & OTP
//         </p>

//         {/* PHONE NUMBER */}
//         <div className="mb-4">
//           <label className="text-sm text-black mb-1 block">Phone Number</label>
//           <div className="flex gap-2">
//             <div className="flex items-center border px-3 py-2 rounded-lg bg-gray-50">
//               <span className="text-gray-700">+91</span>
//             </div>
//             <input
//               type="tel"
//               placeholder="Enter 10-digit phone number"
//               value={phone}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, "");
//                 if (value.length <= 10) setPhone(value);
//               }}
//               disabled={otpSent}
//               className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
//             />
//           </div>
//         </div>

//         {/* Send OTP Button (shows before OTP is sent) */}
//         {!otpSent ? (
//           <button
//             onClick={handleSendOtp}
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition mb-4"
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         ) : (
//           <>
//             {/* OTP INPUT */}
//             <div className="mb-4">
//               <label className="text-sm text-black mb-1 block">Enter OTP</label>
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, "");
//                   if (value.length <= 6) setOtp(value);
//                 }}
//                 className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
//               />

//               {/* Resend OTP link */}
//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={handleResendOtp}
//                   disabled={countdown > 0}
//                   className={`text-sm ${countdown > 0 ? "text-gray-400" : "text-green-600 hover:text-green-700"}`}
//                 >
//                   {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
//                 </button>
//               </div>
//             </div>

//             {/* VERIFY OTP BUTTON */}
//             <button
//               onClick={handleLogin}
//               disabled={loading || !otp}
//               className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition mb-4"
//             >
//               {loading ? "Verifying..." : "Verify OTP & Login"}
//             </button>

//             {/* Change Phone Number */}
//             <button
//               onClick={() => {
//                 setOtpSent(false);
//                 setOtp("");
//                 setPhone("");
//                 if (window.otpTimer) {
//                   clearInterval(window.otpTimer);
//                 }
//               }}
//               className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
//             >
//               Change Phone Number
//             </button>
//           </>
//         )}

//         {/* DEMO INFO */}
//         <p className="text-xs text-center text-gray-400 mt-4">
//           Demo: Enter any 10-digit number → OTP: 123456
//         </p>
//       </div>
//     </section>
//   );
// // }
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function EmployerLogin() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API = "http://localhost:5000/api";

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("Email and password required ❌");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(`${API}/auth/login`, {
//         email,
//         password,
//       });

//       // extra safety
//       if (res.data.data.userType !== "employer") {
//         alert("This is not an employer account ❌");
//         return;
//       }

//       localStorage.setItem("token", res.data.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.data));

//       alert("Employer Login Successful ✅");

//       router.push("/employer/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg border">
//         <h2 className="text-2xl font-bold text-center text-black mb-6">
//           Employer Login
//         </h2>

//         <form onSubmit={handleLogin}>
//           {/* EMAIL */}
//           <div className="mb-4">
//             <label className="text-sm text-black mb-1 block">Email</label>
//             <input
//               type="email"
//               placeholder="Enter company email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
//               required
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="mb-6">
//             <label className="text-sm text-black mb-1 block">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg outline-none focus:border-green-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-xs text-center text-gray-500 mt-4">
//           Use the email & password created during registration
//         </p>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Shield,
  Users,
  Briefcase,
} from "lucide-react";

export default function EmployerLogin() {
  const router = useRouter();
  const API = "http://localhost:5000/api";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      if (res.data.data.userType !== "employer") {
        setErrors({ general: "This is not an employer account ❌" });
        return;
      }

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      setTimeout(() => {
        router.push("/employer/dashboard");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
          <Building2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Employer Portal</h1>
        <p className="text-gray-600 mt-2">Hire top talent for your company</p>
      </div>

      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-8">
            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="company@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
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
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-sm text-green-600 hover:text-green-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: "" });
                    }}
                    className={`w-full pl-11 pr-11 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
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

              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Login as Employer
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-6 border-t mt-6">
              <p className="text-gray-600">
                Don't have an employer account?{" "}
                <button
                  onClick={() => router.push("/employer/register")}
                  className="font-semibold text-green-600 hover:text-green-700 hover:underline"
                >
                  Register Now
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
        </div>
      </div>

      {/* Features */}
    </div>
  );
}
