"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ROW 1 DATA */
const row1 = [
  { name: "Delivery Person", jobs: "4,110 openings" },
  { name: "Telecalling / BPO", jobs: "4,095 openings" },
  { name: "Accounts / Finance", jobs: "3,677 openings" },
  { name: "Field Sales", jobs: "3,513 openings" },
  { name: "Business Development", jobs: "1,997 openings" },
  { name: "Chemical Engineer", jobs: "1 openings" },
];

/* ROW 2 DATA */
const row2 = [
  { name: "Nurse / Patient Care", jobs: "121 openings" },
  { name: "Electrician / Wireman", jobs: "120 openings" },
  { name: "Security Guard", jobs: "113 openings" },
  { name: "Labour / Factory Worker", jobs: "153 openings" },
  { name: "Maid / Baby Care", jobs: "141 openings" },
  { name: "Software Developer", jobs: "158 openings" },
];

/* AUTO SCROLL HOOK */
function useAutoScroll(ref) {
  const interval = useRef(null);

  const start = () => {
    interval.current = setInterval(() => {
      if (!ref.current) return;

      ref.current.scrollLeft += 1;

      if (
        ref.current.scrollLeft >=
        ref.current.scrollWidth / 2
      ) {
        ref.current.scrollLeft = 0;
      }
    }, 20);
  };

  const stop = () => {
    clearInterval(interval.current);
  };

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  return { start, stop };
}

export default function TrendingRolesSlider() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const row1Scroll = useAutoScroll(row1Ref);
  const row2Scroll = useAutoScroll(row2Ref);

  return (
    <section className="bg-white py-14 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="text-2xl md:text-5xl font-bold text-center  text-orange-400 mb-10">
          Trending job roles on Apna
        </h2>

        {/* ===== ROW 1 ===== */}
        <div
          ref={row1Ref}
          onMouseEnter={row1Scroll.stop}
          onMouseLeave={row1Scroll.start}
          className="flex gap-4 overflow-x-scroll  scrollbar-hide mb-5 text-black text-4xl"
        >
          {[...row1, ...row1].map((item, i) => (
            <RoleCard key={i} item={item} />
          ))}
        </div>

        {/* ===== ROW 2 ===== */}
        <div
          ref={row2Ref}
          onMouseEnter={row2Scroll.stop}
          onMouseLeave={row2Scroll.start}
          className="flex gap-4 overflow-x-scroll scrollbar-hide text-black text-4xl"
        >
          {[...row2, ...row2].map((item, i) => (
            <RoleCard key={i} item={item} />
          ))}
        </div>

        {/* BUTTON */}
        <div className="text-center mt-10">
          <Link     
            href="/jobs"
            className="inline-flex items-center gap-2
            border border-green-600
            text-green-600
            px-8 py-3 rounded-lg
            hover:bg-green-600 hover:text-white
            transition"
          >
            View all →
          </Link>
        </div>

      </div>

    </section>
  );
}

/* CARD COMPONENT */
function RoleCard({ item }) {
  return (
    <Link
      href="/jobs"
      className="min-w-[260px]
      bg-white border rounded-xl
      px-5 py-4
      flex items-center gap-4
      hover:border-orange-500
      hover:shadow-md
      transition"
    >

      {/* ICON */}
      <div className="w-10 h-10 bg-gray-100 rounded-full
      flex items-center justify-center">
        📄
      </div>

      {/* TEXT */}
      <div className="flex-1">

        <h3 className="font-medium text-sm truncate">
          {item.name}
        </h3>

        <p className="text-xs text-gray-500">
          {item.jobs}
        </p>

      </div>

      <span className="text-gray-400">›</span>

    </Link>
  );
}
