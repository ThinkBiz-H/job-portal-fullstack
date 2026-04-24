// "use client";

// import { useState } from "react";

// export default function ATSChecker() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Upload resume bhai");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setResult(null);

//       const formData = new FormData();
//       formData.append("resume", file);

//       console.log("📤 Sending file:", file.name); // 🔥 debug

//       const res = await fetch("http://localhost:5000/api/ats/scan", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       console.log("📥 Response:", data); // 🔥 debug

//       if (!res.ok) {
//         setError(data.error || "Server error aaya");
//         return;
//       }

//       setResult({
//         score: data.score ?? 0,
//         matched: data.matched ?? [],
//         missing: data.missing ?? [],
//         suggestions: data.suggestions ?? [],
//       });
//     } catch (err) {
//       console.error("❌ FRONTEND ERROR:", err);
//       setError("Backend connect nahi ho raha");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-10 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">ATS Resume Checker</h1>

//       <input
//         type="file"
//         accept=".pdf,.docx"
//         onChange={(e) => {
//           const selected = e.target.files[0];
//           console.log("📂 Selected:", selected); // 🔥 debug
//           setFile(selected);
//         }}
//       />

//       <button
//         onClick={handleUpload}
//         className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Scanning..." : "Check ATS"}
//       </button>

//       {/* ERROR */}
//       {error && <div className="mt-4 text-red-500 font-medium">{error}</div>}

//       {/* RESULT */}
//       {result && (
//         <div className="mt-5 p-4 border rounded bg-gray-50">
//           <h2 className="text-xl font-bold">Score: {result.score}%</h2>

//           <p className="text-green-600 mt-2">
//             Matched:{" "}
//             {result.matched.length ? result.matched.join(", ") : "None"}
//           </p>

//           <p className="text-red-500 mt-1">
//             Missing:{" "}
//             {result.missing.length ? result.missing.join(", ") : "None"}
//           </p>

//           <h3 className="mt-3 font-semibold">Suggestions:</h3>

//           {result.suggestions.length ? (
//             <ul className="list-disc ml-5">
//               {result.suggestions.map((s, i) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No suggestions</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useRef } from "react";
import {
  FileText,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Zap,
  TrendingUp,
  Target,
  Shield,
  ArrowRight,
  Sparkles,
  BarChart3,
  Brain,
  FileSearch,
  CheckCheck,
  PlusCircle,
  RefreshCw,
  Star,
  Award,
  Rocket,
  Clock,
} from "lucide-react";

export default function ATSChecker() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".docx"))
    ) {
      setFile(droppedFile);
      setError("");
      setResult(null);
      setAnalyzed(false);
    } else {
      setError("Please upload PDF or DOCX file only");
    }
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      (selected.type === "application/pdf" || selected.name.endsWith(".docx"))
    ) {
      setFile(selected);
      setError("");
      setResult(null);
      setAnalyzed(false);
    } else if (selected) {
      setError("Please upload PDF or DOCX file only");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a resume first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://localhost:5000/api/ats/scan", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Analysis failed. Please try again.");
        return;
      }

      setResult({
        score: data.score ?? 0,
        matched: data.matched ?? [],
        missing: data.missing ?? [],
        suggestions: data.suggestions ?? [],
      });
      setAnalyzed(true);
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Unable to connect to server. Please check if backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setAnalyzed(false);
    setError("");
  };

  const resetAnalysis = () => {
    setResult(null);
    setAnalyzed(false);
    setFile(null);
    setError("");
  };

  const getScoreConfig = (score) => {
    if (score >= 80)
      return {
        color: "emerald",
        gradient: "from-emerald-500 to-teal-500",
        label: "Excellent",
        icon: "🏆",
        text: "Your resume is highly optimized for ATS systems!",
      };
    if (score >= 60)
      return {
        color: "blue",
        gradient: "from-blue-500 to-indigo-500",
        label: "Good",
        icon: "👍",
        text: "Solid foundation! A few tweaks will make it outstanding.",
      };
    if (score >= 40)
      return {
        color: "amber",
        gradient: "from-amber-500 to-orange-500",
        label: "Fair",
        icon: "📈",
        text: "Room for improvement. Follow suggestions to boost score.",
      };
    return {
      color: "red",
      gradient: "from-red-500 to-rose-500",
      label: "Needs Work",
      icon: "⚠️",
      text: "Significant improvements needed. Start with keyword optimization.",
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Decorative blobs */}
      <div className="fixed top-0 -right-48 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 -left-48 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md opacity-60"></div>
                <div className="relative w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  ATS Optimizer
                </h1>
                <p className="text-xs text-gray-500">
                  AI-Powered Resume Scanner
                </p>
              </div>
            </div>
            {analyzed && (
              <button
                onClick={resetAnalysis}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <RefreshCw className="w-3 h-3" />
                New Scan
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full mb-5 border border-purple-100">
            <Brain className="w-3 h-3 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">
              AI-Powered Analysis
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Beat the{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ATS
            </span>{" "}
            System
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Get instant feedback, keyword matching, and AI suggestions to
            optimize your resume.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div>
            {!analyzed ? (
              <>
                {/* Upload Card */}
                <div
                  className={`relative rounded-2xl transition-all duration-300 cursor-pointer ${
                    dragActive
                      ? "ring-2 ring-purple-500 ring-offset-2 shadow-xl"
                      : "hover:shadow-xl"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="p-10 text-center">
                      {/* Icon */}
                      <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                        {file ? (
                          <FileText className="w-10 h-10 text-purple-600" />
                        ) : (
                          <Upload className="w-10 h-10 text-purple-400" />
                        )}
                      </div>

                      {file ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-base font-medium text-gray-900">
                              {file.name}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile();
                              }}
                              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpload();
                            }}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            {loading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                Analyze Resume
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-gray-900 mb-1">
                            Drop your resume here
                          </p>
                          <p className="text-sm text-gray-500 mb-6">
                            PDF or DOCX up to 5MB
                          </p>
                          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-xl hover:shadow-lg transition-all">
                            <PlusCircle className="w-4 h-4" />
                            Choose file
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mb-2">
                      <FileSearch className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">
                      Keyword Scan
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Instant matching
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">
                      Score Analysis
                    </p>
                    <p className="text-[10px] text-gray-400">0-100 rating</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mb-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">AI Tips</p>
                    <p className="text-[10px] text-gray-400">
                      Smart suggestions
                    </p>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 rounded-xl flex items-start gap-3 border border-red-100 animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </>
            ) : (
              // After Analysis Card
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <CheckCheck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Analysis Complete!
                      </h3>
                      <p className="text-xs text-gray-500">
                        Your resume has been scanned
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="w-full py-2.5 bg-white hover:bg-gray-50 rounded-xl text-sm text-gray-700 transition-colors flex items-center justify-center gap-2 border border-gray-200"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Scan Another Resume
                  </button>
                </div>

                {/* Tips Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Pro Tips
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-0.5">▹</span>
                      Use standard section headings
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-0.5">▹</span>
                      Avoid tables and complex formatting
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-0.5">▹</span>
                      Save as PDF for best compatibility
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Right Column - Results */}
          <div>
            {result ? (
              <div className="space-y-5 animate-in slide-in-from-right-5 fade-in duration-500">
                {/* Score Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        ATS Compatibility
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span
                          className={`text-6xl font-bold bg-gradient-to-r ${getScoreConfig(result.score).gradient} bg-clip-text text-transparent`}
                        >
                          {result.score}
                        </span>
                        <span className="text-gray-400 text-lg">/100</span>
                      </div>
                    </div>
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getScoreConfig(result.score).gradient} shadow-lg`}
                    >
                      <span className="text-3xl">
                        {getScoreConfig(result.score).icon}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl mb-4 bg-gradient-to-r ${getScoreConfig(result.score).gradient} bg-opacity-10`}
                  >
                    <p className="text-sm text-gray-700">
                      {getScoreConfig(result.score).text}
                    </p>
                  </div>

                  <div className="relative pt-1">
                    <div className="flex mb-1 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-gray-600">
                          Score
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-gray-600">
                          {result.score}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100">
                      <div
                        style={{ width: `${result.score}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${getScoreConfig(result.score).gradient} rounded-full transition-all duration-1000`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Keywords Section */}
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="px-5 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-gray-900">
                          Keywords Detected
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {result.matched.length} found
                      </span>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {result.matched.length ? (
                        result.matched.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg border border-emerald-100 hover:scale-105 transition-transform cursor-default"
                          >
                            {kw}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400">
                          No keywords detected
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Missing Keywords */}
                {result.missing.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="px-5 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-semibold text-gray-900">
                            Missing Keywords
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          +{result.missing.length} to add
                        </span>
                      </div>
                    </div>
                    <div className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {result.missing.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg border border-amber-100"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-xl border border-purple-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      AI Recommendations
                    </h3>
                  </div>
                  {result.suggestions.length ? (
                    <ul className="space-y-2">
                      {result.suggestions.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-purple-500 mt-0.5">→</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Great job! No major issues found.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                    <Target className="w-10 h-10 text-purple-400" />
                  </div>
                  <p className="text-gray-600 font-medium">Ready to Scan</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Upload a resume to see ATS score
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    Takes ~10 seconds
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-from-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-right 0.3s ease-out;
        }
        .slide-in-from-top-2 {
          animation: slide-in-from-top 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
