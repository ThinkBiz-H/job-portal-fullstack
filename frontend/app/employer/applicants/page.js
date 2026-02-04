// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   Search,
//   Filter,
//   MoreVertical,
//   Eye,
//   Mail,
//   Phone,
//   Download,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   User,
//   GraduationCap,
//   Briefcase,
//   MapPin,
//   DollarSign,
//   Star,
//   MessageSquare,
//   Video,
//   ThumbsUp,
//   ThumbsDown,
//   Archive,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Users,
//   FileText,
//   BookOpen,
//   Award,
//   TrendingUp,
//   MoreHorizontal,
//   ExternalLink,
//   Shield,
//   Coffee,
//   Globe,
//   Linkedin,
//   Github,
//   Twitter,
//   Facebook,
//   Instagram,
//   Heart,
//   Flag,
//   Bell,
//   Settings,
//   Zap,
//   Target,
//   BarChart3,
//   Filter as FilterIcon,
//   SortAsc,
//   SortDesc,
// } from "lucide-react";

// export default function ApplicantsPage() {
//   const [loading, setLoading] = useState(true);
//   const [applicants, setApplicants] = useState([]);
//   const [filteredApplicants, setFilteredApplicants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [jobFilter, setJobFilter] = useState("all");
//   const [experienceFilter, setExperienceFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedApplicants, setSelectedApplicants] = useState([]);
//   const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [stats, setStats] = useState({
//     total: 0,
//     new: 0,
//     reviewed: 0,
//     shortlisted: 0,
//     rejected: 0,
//     hired: 0,
//     interviewScheduled: 0,
//   });

//   const applicantsPerPage = viewMode === "grid" ? 12 : 10;

//   // Sample applicants data
//   const sampleApplicants = [
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       email: "rahul.sharma@example.com",
//       phone: "+91 98765 43210",
//       location: "Bangalore, Karnataka",
//       currentRole: "Senior Frontend Developer",
//       currentCompany: "TechCorp",
//       experience: "5 years",
//       education: "B.Tech Computer Science, IIT Delhi",
//       skills: ["React", "TypeScript", "Next.js", "Redux", "GraphQL"],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/rahulsharma",
//       github: "https://github.com/rahulsharma",
//       appliedFor: "Senior Frontend Developer (React)",
//       jobId: 1,
//       appliedDate: "2024-01-20",
//       status: "shortlisted",
//       rating: 4.5,
//       notes: "Strong React experience, good communication skills",
//       lastContact: "2 days ago",
//       interviewScheduled: "2024-01-25 14:00",
//       salaryExpectation: "₹18 LPA",
//       noticePeriod: "30 days",
//       tags: ["React Expert", "Immediate Joiner", "Top Candidate"],
//     },
//     {
//       id: 2,
//       name: "Priya Patel",
//       email: "priya.patel@example.com",
//       phone: "+91 87654 32109",
//       location: "Mumbai, Maharashtra",
//       currentRole: "Full Stack Developer",
//       currentCompany: "InnovateTech",
//       experience: "3 years",
//       education: "M.Tech Software Engineering, BITS Pilani",
//       skills: ["Node.js", "React", "MongoDB", "AWS", "Docker"],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/priyapatel",
//       github: "https://github.com/priyapatel",
//       appliedFor: "Full Stack Engineer",
//       jobId: 2,
//       appliedDate: "2024-01-18",
//       status: "new",
//       rating: 4.2,
//       notes: "",
//       lastContact: "",
//       interviewScheduled: "",
//       salaryExpectation: "₹15 LPA",
//       noticePeriod: "60 days",
//       tags: ["Full Stack", "AWS Certified"],
//     },
//     {
//       id: 3,
//       name: "Amit Kumar",
//       email: "amit.kumar@example.com",
//       phone: "+91 76543 21098",
//       location: "Delhi NCR",
//       currentRole: "DevOps Engineer",
//       currentCompany: "CloudTech Solutions",
//       experience: "4 years",
//       education: "B.E. Computer Engineering, Delhi University",
//       skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/amitkumar",
//       github: "https://github.com/amitkumar",
//       appliedFor: "DevOps Engineer",
//       jobId: 3,
//       appliedDate: "2024-01-15",
//       status: "interview_scheduled",
//       rating: 4.7,
//       notes: "Technical interview scheduled for tomorrow",
//       lastContact: "1 day ago",
//       interviewScheduled: "2024-01-26 11:00",
//       salaryExpectation: "₹20 LPA",
//       noticePeriod: "45 days",
//       tags: ["DevOps", "AWS Expert", "Immediate Joiner"],
//     },
//     {
//       id: 4,
//       name: "Sneha Reddy",
//       email: "sneha.reddy@example.com",
//       phone: "+91 65432 10987",
//       location: "Hyderabad, Telangana",
//       currentRole: "UI/UX Designer",
//       currentCompany: "DesignStudio",
//       experience: "2 years",
//       education: "M.Des Interaction Design, NID",
//       skills: [
//         "Figma",
//         "Adobe XD",
//         "UI Design",
//         "User Research",
//         "Prototyping",
//       ],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/snehareddy",
//       github: "https://github.com/snehareddy",
//       appliedFor: "UI/UX Designer",
//       jobId: 4,
//       appliedDate: "2024-01-22",
//       status: "reviewed",
//       rating: 3.8,
//       notes: "Good portfolio, needs more product experience",
//       lastContact: "3 days ago",
//       interviewScheduled: "",
//       salaryExpectation: "₹10 LPA",
//       noticePeriod: "30 days",
//       tags: ["UI/UX", "Figma Expert"],
//     },
//     {
//       id: 5,
//       name: "Rajesh Gupta",
//       email: "rajesh.gupta@example.com",
//       phone: "+91 94321 09876",
//       location: "Pune, Maharashtra",
//       currentRole: "Product Manager",
//       currentCompany: "ProductLabs",
//       experience: "6 years",
//       education: "MBA, IIM Bangalore",
//       skills: [
//         "Product Strategy",
//         "Agile",
//         "Data Analysis",
//         "User Research",
//         "Roadmapping",
//       ],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/rajeshgupta",
//       github: "https://github.com/rajeshgupta",
//       appliedFor: "Product Manager",
//       jobId: 5,
//       appliedDate: "2024-01-10",
//       status: "rejected",
//       rating: 3.5,
//       notes: "Experience mismatch with our requirements",
//       lastContact: "1 week ago",
//       interviewScheduled: "",
//       salaryExpectation: "₹25 LPA",
//       noticePeriod: "90 days",
//       tags: ["Product", "Strategy"],
//     },
//     {
//       id: 6,
//       name: "Ananya Singh",
//       email: "ananya.singh@example.com",
//       phone: "+91 83210 98765",
//       location: "Chennai, Tamil Nadu",
//       currentRole: "Data Scientist",
//       currentCompany: "DataInsights",
//       experience: "3 years",
//       education: "M.Tech Data Science, IIIT Hyderabad",
//       skills: [
//         "Python",
//         "Machine Learning",
//         "TensorFlow",
//         "SQL",
//         "Data Analysis",
//       ],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/ananyasingh",
//       github: "https://github.com/ananyasingh",
//       appliedFor: "Data Scientist",
//       jobId: 6,
//       appliedDate: "2024-01-19",
//       status: "shortlisted",
//       rating: 4.3,
//       notes: "Strong ML background, good academic record",
//       lastContact: "2 days ago",
//       interviewScheduled: "2024-01-28 15:00",
//       salaryExpectation: "₹18 LPA",
//       noticePeriod: "60 days",
//       tags: ["Data Science", "ML Expert"],
//     },
//     {
//       id: 7,
//       name: "Vikram Joshi",
//       email: "vikram.joshi@example.com",
//       phone: "+91 72109 87654",
//       location: "Gurgaon, Haryana",
//       currentRole: "Backend Developer",
//       currentCompany: "BackendMasters",
//       experience: "4 years",
//       education: "B.Tech IT, NIT Warangal",
//       skills: ["Java", "Spring Boot", "Microservices", "Kafka", "PostgreSQL"],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/vikramjoshi",
//       github: "https://github.com/vikramjoshi",
//       appliedFor: "Backend Developer (Node.js)",
//       jobId: 7,
//       appliedDate: "2024-01-17",
//       status: "hired",
//       rating: 4.8,
//       notes: "Excellent backend skills, joined last week",
//       lastContact: "1 week ago",
//       interviewScheduled: "",
//       salaryExpectation: "₹16 LPA",
//       noticePeriod: "30 days",
//       tags: ["Backend", "Java Expert", "Hired"],
//     },
//     {
//       id: 8,
//       name: "Meera Nair",
//       email: "meera.nair@example.com",
//       phone: "+91 61098 76543",
//       location: "Kochi, Kerala",
//       currentRole: "QA Engineer",
//       currentCompany: "TestPro",
//       experience: "2 years",
//       education: "B.Tech Computer Science, Kerala University",
//       skills: [
//         "Selenium",
//         "Jest",
//         "Cypress",
//         "Test Automation",
//         "Manual Testing",
//       ],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/meeranair",
//       github: "https://github.com/meeranair",
//       appliedFor: "QA Engineer",
//       jobId: 8,
//       appliedDate: "2024-01-21",
//       status: "new",
//       rating: 3.9,
//       notes: "",
//       lastContact: "",
//       interviewScheduled: "",
//       salaryExpectation: "₹8 LPA",
//       noticePeriod: "45 days",
//       tags: ["QA", "Automation"],
//     },
//     {
//       id: 9,
//       name: "Arjun Mehta",
//       email: "arjun.mehta@example.com",
//       phone: "+91 50987 65432",
//       location: "Ahmedabad, Gujarat",
//       currentRole: "Mobile Developer",
//       currentCompany: "MobileFirst",
//       experience: "3 years",
//       education: "B.Tech Computer Engineering, Gujarat University",
//       skills: ["Flutter", "Dart", "React Native", "iOS", "Android"],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/arjunmehta",
//       github: "https://github.com/arjunmehta",
//       appliedFor: "Mobile Developer (Flutter)",
//       jobId: 9,
//       appliedDate: "2024-01-16",
//       status: "interview_scheduled",
//       rating: 4.1,
//       notes: "Good Flutter portfolio, scheduled interview",
//       lastContact: "1 day ago",
//       interviewScheduled: "2024-01-27 10:00",
//       salaryExpectation: "₹12 LPA",
//       noticePeriod: "30 days",
//       tags: ["Mobile", "Flutter"],
//     },
//     {
//       id: 10,
//       name: "Pooja Desai",
//       email: "pooja.desai@example.com",
//       phone: "+91 49876 54321",
//       location: "Jaipur, Rajasthan",
//       currentRole: "Business Analyst",
//       currentCompany: "AnalyticsPro",
//       experience: "5 years",
//       education: "MBA Finance, SP Jain",
//       skills: [
//         "Data Analysis",
//         "SQL",
//         "Excel",
//         "Power BI",
//         "Requirement Gathering",
//       ],
//       resumeUrl: "#",
//       linkedin: "https://linkedin.com/in/poojadesai",
//       github: "https://github.com/poojadesai",
//       appliedFor: "Business Analyst",
//       jobId: 10,
//       appliedDate: "2024-01-14",
//       status: "reviewed",
//       rating: 4.0,
//       notes: "Good analytical skills, needs domain knowledge",
//       lastContact: "4 days ago",
//       interviewScheduled: "",
//       salaryExpectation: "₹14 LPA",
//       noticePeriod: "60 days",
//       tags: ["Business Analysis", "Data"],
//     },
//   ];

//   const jobs = [
//     { id: 1, title: "Senior Frontend Developer (React)", applicants: 56 },
//     { id: 2, title: "Full Stack Engineer", applicants: 42 },
//     { id: 3, title: "DevOps Engineer", applicants: 28 },
//     { id: 4, title: "UI/UX Designer", applicants: 38 },
//     { id: 5, title: "Product Manager", applicants: 34 },
//     { id: 6, title: "Data Scientist", applicants: 25 },
//     { id: 7, title: "Backend Developer", applicants: 31 },
//     { id: 8, title: "QA Engineer", applicants: 19 },
//     { id: 9, title: "Mobile Developer", applicants: 22 },
//     { id: 10, title: "Business Analyst", applicants: 27 },
//   ];

//   const statusOptions = [
//     {
//       value: "all",
//       label: "All Applicants",
//       color: "gray",
//       icon: <Users size={16} />,
//     },
//     { value: "new", label: "New", color: "blue", icon: <Bell size={16} /> },
//     {
//       value: "reviewed",
//       label: "Reviewed",
//       color: "purple",
//       icon: <Eye size={16} />,
//     },
//     {
//       value: "shortlisted",
//       label: "Shortlisted",
//       color: "green",
//       icon: <CheckCircle size={16} />,
//     },
//     {
//       value: "interview_scheduled",
//       label: "Interview",
//       color: "yellow",
//       icon: <Calendar size={16} />,
//     },
//     {
//       value: "rejected",
//       label: "Rejected",
//       color: "red",
//       icon: <XCircle size={16} />,
//     },
//     {
//       value: "hired",
//       label: "Hired",
//       color: "emerald",
//       icon: <Award size={16} />,
//     },
//   ];

//   const experienceOptions = [
//     { value: "all", label: "All Experience" },
//     { value: "0-1", label: "Fresher (0-1 years)" },
//     { value: "1-3", label: "Junior (1-3 years)" },
//     { value: "3-6", label: "Mid (3-6 years)" },
//     { value: "6+", label: "Senior (6+ years)" },
//   ];

//   const sortOptions = [
//     { value: "newest", label: "Newest First" },
//     { value: "oldest", label: "Oldest First" },
//     { value: "rating", label: "Highest Rating" },
//     { value: "experience", label: "Most Experience" },
//     { value: "name", label: "Name (A-Z)" },
//   ];

//   const actionOptions = [
//     { label: "Shortlist", value: "shortlist", color: "green" },
//     { label: "Reject", value: "reject", color: "red" },
//     { label: "Schedule Interview", value: "interview", color: "yellow" },
//     { label: "Mark as Hired", value: "hire", color: "emerald" },
//     { label: "Send Email", value: "email", color: "blue" },
//     { label: "Download Resumes", value: "download", color: "purple" },
//   ];

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setApplicants(sampleApplicants);
//       setFilteredApplicants(sampleApplicants);

//       // Calculate stats
//       const total = sampleApplicants.length;
//       const newApps = sampleApplicants.filter((a) => a.status === "new").length;
//       const reviewed = sampleApplicants.filter(
//         (a) => a.status === "reviewed",
//       ).length;
//       const shortlisted = sampleApplicants.filter(
//         (a) => a.status === "shortlisted",
//       ).length;
//       const rejected = sampleApplicants.filter(
//         (a) => a.status === "rejected",
//       ).length;
//       const hired = sampleApplicants.filter((a) => a.status === "hired").length;
//       const interviewScheduled = sampleApplicants.filter(
//         (a) => a.status === "interview_scheduled",
//       ).length;

//       setStats({
//         total,
//         new: newApps,
//         reviewed,
//         shortlisted,
//         rejected,
//         hired,
//         interviewScheduled,
//       });

//       setLoading(false);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     let filtered = [...applicants];

//     // Search filter
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (applicant) =>
//           applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           applicant.currentRole
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           applicant.skills.some((skill) =>
//             skill.toLowerCase().includes(searchQuery.toLowerCase()),
//           ) ||
//           applicant.appliedFor
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()),
//       );
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter(
//         (applicant) => applicant.status === statusFilter,
//       );
//     }

//     // Job filter
//     if (jobFilter !== "all") {
//       filtered = filtered.filter(
//         (applicant) => applicant.jobId.toString() === jobFilter,
//       );
//     }

//     // Experience filter
//     if (experienceFilter !== "all") {
//       const [min, max] = experienceFilter.split("-");
//       filtered = filtered.filter((applicant) => {
//         const exp = parseInt(applicant.experience);
//         if (max === "+") return exp >= parseInt(min);
//         return exp >= parseInt(min) && exp <= parseInt(max);
//       });
//     }

//     // Sort
//     filtered.sort((a, b) => {
//       let compareA, compareB;

//       switch (sortBy) {
//         case "newest":
//           compareA = new Date(a.appliedDate);
//           compareB = new Date(b.appliedDate);
//           return sortOrder === "desc"
//             ? compareB - compareA
//             : compareA - compareB;
//         case "oldest":
//           compareA = new Date(a.appliedDate);
//           compareB = new Date(b.appliedDate);
//           return sortOrder === "asc"
//             ? compareB - compareA
//             : compareA - compareB;
//         case "rating":
//           compareA = a.rating;
//           compareB = b.rating;
//           break;
//         case "experience":
//           compareA = parseInt(a.experience);
//           compareB = parseInt(b.experience);
//           break;
//         case "name":
//           compareA = a.name.toLowerCase();
//           compareB = b.name.toLowerCase();
//           return sortOrder === "asc"
//             ? compareA.localeCompare(compareB)
//             : compareB.localeCompare(compareA);
//         default:
//           return 0;
//       }

//       if (sortOrder === "desc") {
//         return compareB - compareA;
//       } else {
//         return compareA - compareB;
//       }
//     });

//     setFilteredApplicants(filtered);
//     setCurrentPage(1);
//   }, [
//     searchQuery,
//     statusFilter,
//     jobFilter,
//     experienceFilter,
//     sortBy,
//     sortOrder,
//     applicants,
//   ]);

//   const indexOfLastApplicant = currentPage * applicantsPerPage;
//   const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
//   const currentApplicants = filteredApplicants.slice(
//     indexOfFirstApplicant,
//     indexOfLastApplicant,
//   );
//   const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "new":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "reviewed":
//         return "bg-purple-100 text-purple-800 border-purple-200";
//       case "shortlisted":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "interview_scheduled":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "rejected":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "hired":
//         return "bg-emerald-100 text-emerald-800 border-emerald-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "new":
//         return <Bell size={14} />;
//       case "reviewed":
//         return <Eye size={14} />;
//       case "shortlisted":
//         return <CheckCircle size={14} />;
//       case "interview_scheduled":
//         return <Calendar size={14} />;
//       case "rejected":
//         return <XCircle size={14} />;
//       case "hired":
//         return <Award size={14} />;
//       default:
//         return <Clock size={14} />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const getTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Yesterday";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
//     return formatDate(dateString);
//   };

//   const handleStatusChange = (applicantId, newStatus) => {
//     setApplicants((prev) =>
//       prev.map((applicant) =>
//         applicant.id === applicantId
//           ? { ...applicant, status: newStatus }
//           : applicant,
//       ),
//     );
//   };

//   const handleSelectApplicant = (applicantId) => {
//     setSelectedApplicants((prev) =>
//       prev.includes(applicantId)
//         ? prev.filter((id) => id !== applicantId)
//         : [...prev, applicantantId],
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedApplicants.length === currentApplicants.length) {
//       setSelectedApplicants([]);
//     } else {
//       setSelectedApplicants(currentApplicants.map((applicant) => applicant.id));
//     }
//   };

//   const handleBulkAction = (action) => {
//     // Implement bulk actions
//     alert(`Bulk ${action} for ${selectedApplicants.length} applicants`);
//     setSelectedApplicants([]);
//   };

//   const ApplicantCard = ({ applicant }) => (
//     <div className="bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300">
//       <div className="p-4">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
//               {applicant.name.charAt(0)}
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900">{applicant.name}</h3>
//               <p className="text-sm text-gray-600">{applicant.currentRole}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-1">
//             <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
//               <Eye size={16} />
//             </button>
//             <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg">
//               <Mail size={16} />
//             </button>
//             <div className="relative group">
//               <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
//                 <MoreVertical size={16} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Status */}
//         <div className="flex items-center justify-between mb-3">
//           <span
//             className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(applicant.status)}`}
//           >
//             {getStatusIcon(applicant.status)}
//             {statusOptions.find((s) => s.value === applicant.status)?.label}
//           </span>
//           <div className="flex items-center gap-1">
//             <Star size={14} className="text-yellow-500 fill-current" />
//             <span className="text-sm font-medium">{applicant.rating}</span>
//           </div>
//         </div>

//         {/* Job Applied */}
//         <div className="mb-3">
//           <p className="text-xs text-gray-500 mb-1">Applied for</p>
//           <p className="text-sm font-medium text-gray-900 truncate">
//             {applicant.appliedFor}
//           </p>
//         </div>

//         {/* Details */}
//         <div className="space-y-2 mb-4">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <MapPin size={14} />
//             <span>{applicant.location}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <Briefcase size={14} />
//             <span>{applicant.experience} experience</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <DollarSign size={14} />
//             <span>Expected: {applicant.salaryExpectation}</span>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="mb-4">
//           <p className="text-xs text-gray-500 mb-1">Skills</p>
//           <div className="flex flex-wrap gap-1">
//             {applicant.skills.slice(0, 3).map((skill, index) => (
//               <span
//                 key={index}
//                 className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
//               >
//                 {skill}
//               </span>
//             ))}
//             {applicant.skills.length > 3 && (
//               <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//                 +{applicant.skills.length - 3}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-2">
//           {applicant.status === "new" && (
//             <button
//               onClick={() => handleStatusChange(applicant.id, "shortlisted")}
//               className="flex-1 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium hover:bg-green-100 transition"
//             >
//               Shortlist
//             </button>
//           )}
//           {applicant.status === "shortlisted" && (
//             <button
//               onClick={() =>
//                 handleStatusChange(applicant.id, "interview_scheduled")
//               }
//               className="flex-1 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-sm font-medium hover:bg-yellow-100 transition"
//             >
//               Schedule Interview
//             </button>
//           )}
//           <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
//             View
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading applicants...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 Applicants
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Manage and review all job applications
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <Download size={20} />
//               </button>
//               <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <RefreshCw size={20} />
//               </button>
//               <div className="flex bg-gray-100 p-1 rounded-lg">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
//                 >
//                   <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i} className="bg-gray-600 rounded-sm"></div>
//                     ))}
//                   </div>
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
//                 >
//                   <div className="w-4 h-4 flex flex-col gap-0.5">
//                     {[...Array(3)].map((_, i) => (
//                       <div key={i} className="h-1 bg-gray-600 rounded-sm"></div>
//                     ))}
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
//           <div className="bg-white rounded-xl p-4 border border-gray-200">
//             <div className="text-2xl font-bold text-gray-900">
//               {stats.total}
//             </div>
//             <div className="text-sm text-gray-600">Total</div>
//           </div>
//           <div className="bg-white rounded-xl p-4 border border-gray-200">
//             <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
//             <div className="text-sm text-gray-600">New</div>
//           </div>
//           <div className="bg-white rounded-xl p-4 border border-gray-200">
//             <div className="text-2xl font-bold text-purple-600">
//               {stats.reviewed}
//             </div>
//             <div className="text-sm text-gray-600">Reviewed</div>
//           </div>
//           <div className="bg-white rounded-xl p-4 border border-gray-200">
//             <div className="text-2xl font-bold text-green-600">
//               {stats.shortlisted}
//             </div>
//             <div className="text-sm text-gray-600">Shortlisted</div>
//           </div>
//           <div className="bg-white rounded-xl p-4 border border-gray-200">
//             <div className="text-2xl font-bold text-yellow-600">
//               {stats.interviewScheduled}
//             </div>
//             <div className="text-sm text-gray-600">Interview</div>
//           </div>
//           <div className="bg-white rounded-xl p-4 border border-gray-200">
//             <div className="text-2xl font-bold text-red-600">
//               {stats.rejected}
//             </div>
//             <div className="text-sm text-gray-600">Rejected</div>
//           </div>
//           <div className="bg-white rounded-xl p-4 border border-gray-200">
//             <div className="text-2xl font-bold text-emerald-600">
//               {stats.hired}
//             </div>
//             <div className="text-sm text-gray-600">Hired</div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             {/* Search */}
//             <div className="relative flex-1">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search applicants by name, skills, or job..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
//               >
//                 <FilterIcon size={18} />
//                 Filters
//                 {showFilters ? (
//                   <ChevronUp size={16} />
//                 ) : (
//                   <ChevronDown size={16} />
//                 )}
//               </button>

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
//               >
//                 {sortOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() =>
//                   setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//                 }
//                 className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 {sortOrder === "asc" ? (
//                   <SortAsc size={18} />
//                 ) : (
//                   <SortDesc size={18} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Advanced Filters */}
//           {showFilters && (
//             <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Status
//                 </label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 >
//                   {statusOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Job Position
//                 </label>
//                 <select
//                   value={jobFilter}
//                   onChange={(e) => setJobFilter(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 >
//                   <option value="all">All Jobs</option>
//                   {jobs.map((job) => (
//                     <option key={job.id} value={job.id}>
//                       {job.title} ({job.applicants})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Experience Level
//                 </label>
//                 <select
//                   value={experienceFilter}
//                   onChange={(e) => setExperienceFilter(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 >
//                   {experienceOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}

//           {/* Bulk Actions */}
//           {selectedApplicants.length > 0 && (
//             <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <span className="text-blue-600 font-medium">
//                     {selectedApplicants.length}
//                   </span>
//                 </div>
//                 <span className="text-sm text-gray-700">
//                   {selectedApplicants.length} applicant(s) selected
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
//                   <option>Bulk Actions</option>
//                   {actionOptions.map((action) => (
//                     <option key={action.value} value={action.value}>
//                       {action.label}
//                     </option>
//                   ))}
//                 </select>
//                 <button className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
//                   Apply
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Applicants Grid/List */}
//         {viewMode === "grid" ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
//             {currentApplicants.map((applicant) => (
//               <ApplicantCard key={applicant.id} applicant={applicant} />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                       Applicant
//                     </th>
//                     <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                       Applied For
//                     </th>
//                     <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                       Status
//                     </th>
//                     <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                       Experience
//                     </th>
//                     <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                       Applied Date
//                     </th>
//                     <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {currentApplicants.map((applicant) => (
//                     <tr key={applicant.id} className="hover:bg-gray-50">
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                             {applicant.name.charAt(0)}
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900">
//                               {applicant.name}
//                             </div>
//                             <div className="text-sm text-gray-600">
//                               {applicant.email}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="font-medium text-gray-900">
//                           {applicant.appliedFor}
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {applicant.currentCompany}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <span
//                           className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(applicant.status)}`}
//                         >
//                           {getStatusIcon(applicant.status)}
//                           {
//                             statusOptions.find(
//                               (s) => s.value === applicant.status,
//                             )?.label
//                           }
//                         </span>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="font-medium text-gray-900">
//                           {applicant.experience}
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {applicant.location}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="text-sm text-gray-900">
//                           {formatDate(applicant.appliedDate)}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {getTimeAgo(applicant.appliedDate)}
//                         </div>
//                       </td>
//                       <td className="py-4 px-4">
//                         <div className="flex items-center gap-1">
//                           <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
//                             <Eye size={16} />
//                           </button>
//                           <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg">
//                             <Mail size={16} />
//                           </button>
//                           <button className="p-1.5 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg">
//                             <MessageSquare size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredApplicants.length > 0 && (
//           <div className="flex items-center justify-between">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">{indexOfFirstApplicant + 1}</span>{" "}
//               to{" "}
//               <span className="font-medium">
//                 {Math.min(indexOfLastApplicant, filteredApplicants.length)}
//               </span>{" "}
//               of{" "}
//               <span className="font-medium">{filteredApplicants.length}</span>{" "}
//               applicants
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 <ChevronLeft size={18} />
//               </button>
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (currentPage <= 3) {
//                   pageNum = i + 1;
//                 } else if (currentPage >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = currentPage - 2 + i;
//                 }

//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setCurrentPage(pageNum)}
//                     className={`w-10 h-10 rounded-lg font-medium ${currentPage === pageNum ? "bg-green-600 text-white" : "border border-gray-300 hover:bg-gray-50"}`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {filteredApplicants.length === 0 && (
//           <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-10 h-10 text-gray-400" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               No applicants found
//             </h2>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               {searchQuery || statusFilter !== "all" || jobFilter !== "all"
//                 ? "Try adjusting your search or filter criteria"
//                 : "No applications received yet. Promote your jobs to attract candidates."}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               {searchQuery || statusFilter !== "all" || jobFilter !== "all" ? (
//                 <button
//                   onClick={() => {
//                     setSearchQuery("");
//                     setStatusFilter("all");
//                     setJobFilter("all");
//                   }}
//                   className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
//                 >
//                   Clear Filters
//                 </button>
//               ) : (
//                 <Link
//                   href="/employer/my-jobs"
//                   className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
//                 >
//                   View Job Listings
//                 </Link>
//               )}
//               <Link
//                 href="/employer/post-job"
//                 className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
//               >
//                 Post New Job
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Mail,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Briefcase,
  MapPin,
  Filter,
  User,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function ApplicantsPage() {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const perPage = 8;

  /* ================= FETCH APPLICANTS ================= */
  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/applications/my-applicants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      /* ================= CONVERT BACKEND DATA ================= */
      const formatted = res.data.data.map((app) => ({
        id: app._id,
        name: app.applicant?.name || "N/A",
        email: app.applicant?.email || "N/A",
        appliedFor: app.job?.title || "N/A",
        status: app.status || "pending",
        appliedDate: app.appliedAt,
        experience: "N/A",
        location: "India",
        skills: ["Communication", "Problem Solving", "Teamwork"],
        rating: 0,
        resumeUrl: app.resume?.url || "#",
      }));

      setApplicants(formatted);
      setFilteredApplicants(formatted);
      setLoading(false);
    } catch (err) {
      console.log("Applicants Error:", err);

      alert("Session expired");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  /* ================= FILTER AND SORT ================= */
  useEffect(() => {
    let filtered = [...applicants];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.appliedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
      );
    } else if (sortBy === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
      );
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredApplicants(filtered);
    setCurrentPage(1);
  }, [searchQuery, applicants, statusFilter, sortBy]);

  /* ================= PAGINATION ================= */
  const last = currentPage * perPage;
  const first = last - perPage;
  const current = filteredApplicants.slice(first, last);

  const totalPages = Math.ceil(filteredApplicants.length / perPage);

  /* ================= STATUS BADGE STYLING ================= */
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: <Clock size={12} />,
      },
      reviewed: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: <Eye size={12} />,
      },
      shortlisted: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: <Users size={12} />,
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: <XCircle size={12} />,
      },
      accepted: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: <CheckCircle size={12} />,
      },
    };

    const style = statusStyles[status] || statusStyles.pending;

    return (
      <div
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${style.bg} ${style.border} ${style.text} capitalize text-xs font-medium`}
      >
        {style.icon}
        {status}
      </div>
    );
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Users className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Applicants
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage all job applications in one place
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchApplicants}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={18} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <Download size={18} />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredApplicants.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {applicants.filter((a) => a.status === "pending").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Reviewed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {applicants.filter((a) => a.status === "reviewed").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Shortlisted</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {applicants.filter((a) => a.status === "shortlisted").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Accepted</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {applicants.filter((a) => a.status === "accepted").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* FILTER BAR */}
        <div className="bg-white rounded-xl border shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* SEARCH */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  placeholder="Search by name, email, or job title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* APPLICANTS GRID/CARDS */}
        {current.length === 0 ? (
          <div className="bg-white rounded-xl border shadow-sm p-12 text-center">
            <Users className="mx-auto text-gray-300" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">
              No applicants found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No applications have been submitted yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {current.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  {/* HEADER */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="text-emerald-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{app.name}</h3>
                        <p className="text-sm text-gray-500">{app.email}</p>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  {/* JOB INFO */}
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Briefcase size={16} />
                      <span className="font-medium">Applied for:</span>
                      <span className="ml-1">{app.appliedFor}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin size={16} />
                      <span>{app.location}</span>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {app.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DATE & ACTIONS */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Applied on{" "}
                      {new Date(app.appliedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/employer/applicants/${app.id}`}>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                          <Eye size={16} />
                          View Details
                        </button>
                      </Link>
                      <a
                        href={`mailto:${app.email}`}
                        className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        title="Send Email"
                      >
                        <Mail size={16} />
                      </a>
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        title="View Resume"
                      >
                        <FileText size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Showing {first + 1} to {Math.min(last, filteredApplicants.length)}{" "}
              of {filteredApplicants.length} applicants
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === pageNum
                          ? "bg-emerald-600 text-white"
                          : "border hover:bg-gray-50"
                      } transition-colors`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   Search,
//   Eye,
//   Mail,
//   Download,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   Users,
// } from "lucide-react";

// export default function ApplicantsPage() {
//   const [loading, setLoading] = useState(true);
//   const [applicants, setApplicants] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const perPage = 10;

//   /* ================= FETCH APPLICANTS ================= */
//   const fetchApplicants = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Login again");
//         window.location.href = "/login";
//         return;
//       }

//       const res = await axios.get(
//         "http://localhost:5000/api/applications/my-applicants",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       setApplicants(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.log("Applicants Error:", err);

//       alert("Session expired");
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//   }, []);

//   /* ================= FILTER ================= */
//   const filtered = applicants.filter(
//     (app) =>
//       app.applicant?.name?.toLowerCase().includes(search.toLowerCase()) ||
//       app.job?.title?.toLowerCase().includes(search.toLowerCase()),
//   );

//   /* ================= PAGINATION ================= */
//   const last = currentPage * perPage;
//   const first = last - perPage;
//   const current = filtered.slice(first, last);

//   const totalPages = Math.ceil(filtered.length / perPage);

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Applicants</h1>
//             <p className="text-gray-600">Total: {filtered.length}</p>
//           </div>

//           <div className="flex gap-2">
//             <button className="p-2 border rounded">
//               <Download size={18} />
//             </button>
//             <button onClick={fetchApplicants} className="p-2 border rounded">
//               <RefreshCw size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         {/* SEARCH */}
//         <div className="mb-4">
//           <input
//             placeholder="Search by name or job..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border px-4 py-2 rounded-lg"
//           />
//         </div>

//         {/* TABLE */}
//         <div className="bg-white border rounded-xl overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Candidate</th>
//                 <th className="p-3 text-left">Job</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Applied</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {current.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-8">
//                     No applicants found
//                   </td>
//                 </tr>
//               )}

//               {current.map((app) => (
//                 <tr key={app._id} className="border-t">
//                   <td className="p-3">
//                     <div>
//                       <p className="font-medium">{app.applicant?.name}</p>
//                       <p className="text-xs text-gray-500">
//                         {app.applicant?.email}
//                       </p>
//                     </div>
//                   </td>

//                   <td className="p-3">{app.job?.title}</td>

//                   <td className="p-3 text-center">
//                     <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
//                       {app.status}
//                     </span>
//                   </td>

//                   <td className="p-3 text-center">
//                     {new Date(app.appliedAt).toLocaleDateString()}
//                   </td>

//                   <td className="p-3 text-center">
//                     <div className="flex justify-center gap-2">
//                       <Link
//                         href={`/employer/applicants/${app._id}`}
//                         className="p-2 hover:bg-gray-100 rounded"
//                       >
//                         <Eye size={16} />
//                       </Link>

//                       <a
//                         href={`mailto:${app.applicant?.email}`}
//                         className="p-2 hover:bg-gray-100 rounded"
//                       >
//                         <Mail size={16} />
//                       </a>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-3 mt-6">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="p-2 border rounded disabled:opacity-40"
//             >
//               <ChevronLeft />
//             </button>

//             <span className="px-3 py-2">
//               {currentPage} / {totalPages}
//             </span>

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="p-2 border rounded disabled:opacity-40"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
