// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState("phone"); // phone | otp
//   const [userType, setUserType] = useState("jobseeker");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const API = "http://localhost:5000/api";

//   /* ================= SEND OTP ================= */
//   const sendOtp = async (e) => {
//     e.preventDefault();

//     if (phone.length !== 10) {
//       alert("Enter valid 10 digit number");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(`${API}/auth/send-otp`, {
//         phone,
//         userType,
//       });

//       alert("OTP Sent ✅");
//       setStep("otp");
//     } catch (err) {
//       alert(err.response?.data?.message || "OTP failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= VERIFY OTP ================= */
//   const verifyOtp = async (e) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       alert("Invalid OTP");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(`${API}/auth/verify-otp`, {
//         phone,
//         otp,
//         userType,
//       });

//       // Save Token
//       localStorage.setItem("token", res.data.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.data));

//       alert("Login Success 🎉");

//       // Redirect by role
//       if (userType === "employer") {
//         router.push("/employer/dashboard");
//       } else {
//         router.push("/profile");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "OTP invalid");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={step === "phone" ? sendOtp : verifyOtp}
//         className="bg-white p-8 rounded shadow w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login with OTP</h2>

//         {/* USER TYPE */}
//         {step === "phone" && (
//           <select
//             className="w-full border p-3 mb-4 rounded"
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//           >
//             <option value="jobseeker">Candidate</option>
//             <option value="employer">Employer</option>
//           </select>
//         )}

//         {/* PHONE */}
//         {step === "phone" && (
//           <input
//             type="tel"
//             placeholder="Enter Mobile Number"
//             className="w-full border p-3 mb-4 rounded"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             maxLength={10}
//             required
//           />
//         )}

//         {/* OTP */}
//         {step === "otp" && (
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             className="w-full border p-3 mb-4 rounded"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             maxLength={6}
//             required
//           />
//         )}

//         <button
//           disabled={loading}
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded"
//         >
//           {loading
//             ? "Please wait..."
//             : step === "phone"
//               ? "Send OTP"
//               : "Verify OTP"}
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const API = "http://localhost:5000/api";

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await axios.post(`${API}/auth/login`, {
//         email,
//         password,
//       });

//       const user = res.data.data;

//       localStorage.setItem("token", user.token);
//       localStorage.setItem("user", JSON.stringify(user));

//       alert("Login Success 🎉");

//       // 🔥 ROLE BASED REDIRECT
//       if (user.userType === "employer") {
//         router.push("/employer/dashboard");
//       } else {
//         router.push("/profile");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Candidate Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-3 mb-4 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-3 mb-4 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded"
//         >
//           {loading ? "Please wait..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import {
//   Mail,
//   Lock,
//   User,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   AlertCircle,
//   Smartphone,
//   Briefcase,
//   Building2,
//   Shield,
//   Sparkles,
// } from "lucide-react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [userType, setUserType] = useState("jobseeker"); // jobseeker or employer

//   const router = useRouter();
//   const API = "http://localhost:5000/api";

//   const validateForm = () => {
//     const newErrors = {};

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(`${API}/auth/login`, {
//         email,
//         password,
//         userType,
//       });

//       const user = res.data.data;

//       localStorage.setItem("token", user.token);
//       localStorage.setItem("user", JSON.stringify(user));

//       // Success animation
//       setTimeout(() => {
//         // Role based redirect
//         if (user.userType === "employer") {
//           router.push("/employer/dashboard");
//         } else {
//           router.push("/profile");
//         }
//       }, 1000);
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "Login failed";
//       setErrors({ general: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
//           <Shield className="w-10 h-10 text-white" />
//         </div>
//         <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
//         <p className="text-gray-600 mt-2">
//           Sign in to continue your job search journey
//         </p>
//       </div>

//       <div className="w-full max-w-md">
//         {/* Card Container */}
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
//           <div className="p-8">
//             {/* User Type Toggle */}
//             <div className="mb-8">
//               <p className="text-sm font-medium text-gray-700 mb-3">
//                 I want to login as:
//               </p>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setUserType("jobseeker")}
//                   className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
//                     userType === "jobseeker"
//                       ? "border-blue-500 bg-blue-50 text-blue-700"
//                       : "border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700"
//                   }`}
//                 >
//                   <User className="w-6 h-6" />
//                   <span className="font-semibold">Job Seeker</span>
//                 </button>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleLogin} className="space-y-6">
//               {/* Email Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                     <Mail className="w-5 h-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="you@example.com"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       if (errors.email) setErrors({ ...errors, email: "" });
//                     }}
//                     className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
//                       errors.email ? "border-red-500" : "border-gray-300"
//                     }`}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <button
//                     type="button"
//                     onClick={() => router.push("/forgot-password")}
//                     className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
//                   >
//                     Forgot Password?
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//                     <Lock className="w-5 h-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       if (errors.password)
//                         setErrors({ ...errors, password: "" });
//                     }}
//                     className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
//                       errors.password ? "border-red-500" : "border-gray-300"
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* General Error */}
//               {errors.general && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-sm text-red-600 flex items-center gap-2">
//                     <AlertCircle className="w-4 h-4 flex-shrink-0" />
//                     {errors.general}
//                   </p>
//                 </div>
//               )}

//               {/* Remember Me */}
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="text-sm text-gray-600">Remember me</span>
//                 </label>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3.5 px-4 font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
//                   userType === "jobseeker"
//                     ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-200 hover:scale-[1.02]"
//                     : "bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-green-200 hover:scale-[1.02]"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Signing In...
//                   </>
//                 ) : (
//                   <>
//                     Sign In as{" "}
//                     {userType === "jobseeker" ? "Job Seeker" : "Employer"}
//                     <ArrowRight className="w-5 h-5" />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Register Link */}
//             <div className="text-center pt-6 border-t">
//               <p className="text-gray-600">
//                 Don't have an account?{" "}
//                 <button
//                   onClick={() => router.push("/register")}
//                   className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
//                 >
//                   Create Account
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const API = "http://localhost:5000/api";

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

      const user = res.data.data;

      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));

      // Success animation
      setTimeout(() => {
        if (user.userType === "employer") {
          router.push("/employer/dashboard");
        } else {
          router.push("/profile");
        }
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
          {/* Header */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
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
                    className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-6 border-t mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => router.push("/register")}
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t px-8 py-4">
            <p className="text-center text-sm text-gray-500">
              Secure login • Protected by encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
