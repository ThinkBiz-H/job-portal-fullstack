
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Users,
  Zap,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Shield,
  TrendingUp,
  Target,
} from "lucide-react";

export default function EmployerSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #22c55e 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5 Crore+</div>
                <div className="text-gray-600">Active Job Seekers</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">48 Hours</div>
                <div className="text-gray-600">Avg. Hiring Time</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-gray-600">Verified Profiles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-2xl opacity-20"></div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-2xl opacity-20"></div>

          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl
            border border-gray-200
            flex flex-col lg:flex-row
            items-center justify-between
            px-6 md:px-14 py-12 md:py-16
            gap-10 md:gap-16
            shadow-2xl hover:shadow-3xl
            transition-all duration-500"
          >
            {/* IMAGE SECTION */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative">
                <Image
                  src="/images/employer.png"
                  width={500}
                  height={500}
                  alt="Employer hiring candidates"
                  className="object-contain drop-shadow-2xl"
                />

                {/* Floating Badges */}
                <div className="absolute -top-4 -left-4 z-10">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#0F2A44] rounded-full text-orange-400 text-sm font-bold shadow-xl">
                    <TrendingUp className="w-4 h-4" />
                    FAST HIRING
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 z-10">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full text-white text-sm font-bold shadow-xl">
                    <Target className="w-4 h-4" />
                    SMART MATCHING
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute -z-10 inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(45deg, #22c55e 25%, transparent 25%),
                                  linear-gradient(-45deg, #22c55e 25%, transparent 25%),
                                  linear-gradient(45deg, transparent 75%, #22c55e 75%),
                                  linear-gradient(-45deg, transparent 75%, #22c55e 75%)`,
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
                  }}
                ></div>
              </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 
                bg-[#0F2A44]
                rounded-full border border-green-200"
              >
                <Building2 className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-bold text-orange-400 uppercase tracking-widest">
                  APNA FOR EMPLOYERS
                </span>
                <Briefcase className="w-5 h-5 text-orange-400" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ready to Hire <br />
                <span className="text-transparent bg-clip-text bg-orange-400">
                  Top Talent?
                </span>
              </h2>

              <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
                Access India's largest verified talent pool of 5 crore+ active
                job seekers. Find the perfect match for your team in just 48
                hours.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#0F2A44] flex-shrink-0" />
                  <span className="text-orange-400 font-medium">
                    AI-powered candidate matching
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#0F2A44] flex-shrink-0" />
                  <span className="text-orange-400 font-medium">
                    Verified profiles with skill validation
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-[#0F2A44] flex-shrink-0" />
                  <span className="text-orange-400 font-medium">
                    Zero commission, direct hiring
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/employer/login"
                  className="group relative inline-flex items-center justify-center gap-3
                    bg-[#0F2A44]
                    text-white font-bold text-lg
                    px-8 py-4 rounded-xl
                    hover:shadow-2xl hover:shadow-green-200 hover:scale-105
                    transition-all duration-300
                    overflow-hidden"
                >
                  <span className="relative z-10">Post Job Free</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href=""
                  className="group inline-flex items-center justify-center gap-3
                    bg-white border-2 border-gray-300
                    text-gray-800 font-semibold text-lg
                    px-8 py-4 rounded-xl
                    hover:border-green-400 hover:bg-green-50
                    transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-4">
                  Trusted by 50,000+ companies
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold">🏆</span>
                    </div>
                    <span className="text-sm text-gray-700">Fortune 500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">⭐</span>
                    </div>
                    <span className="text-sm text-gray-700">Startups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-bold">🏢</span>
                    </div>
                    <span className="text-sm text-gray-700">Enterprises</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">10M+</div>
            <div className="text-gray-600 text-sm">Monthly Applications</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">85%</div>
            <div className="text-gray-600 text-sm">Hiring Success Rate</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-gray-600 text-sm">Cities Covered</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-gray-900">₹0</div>
            <div className="text-gray-600 text-sm">Commission Fees</div>
          </div>
        </div>
      </div>
    </section>
  );
}
