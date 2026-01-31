"use client";

import JobCard from "../../../components/JobCard";

export default function Jobs() {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Thinkbiz",
      location: "Delhi",
      salary: "₹25k - ₹40k",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "TechSoft",
      location: "Mumbai",
      salary: "₹30k - ₹50k",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "WebWorks",
      location: "Bangalore",
      salary: "₹40k - ₹70k",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Latest Jobs</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
