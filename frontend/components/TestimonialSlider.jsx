"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Shiwangi Singla",
    rating: 4.5,
    image:  "/images/freasher.png",
    text: "Thanks Apna for helping me find a job without much hassle. If you are a fresher or skilled person, you can easily find a job through the Apna app.",
  },
  {
    name: "Jenil Ghevariya",
    rating: 4.5,
    image:  "/images/freasher.png",
    text: "This app is very helpful if you are looking for a job. The team is also very supportive and friendly.",
  },
  {
    name: "Kaynat Mansuri",
    rating: 4.5,
    image:  "/images/freasher.png",
    text: "It is definitely a great app with correct job information. I would recommend it to my friends.",
  },
];

export default function TestimonialSlider() {
  const sliderRef = useRef(null);

  /* AUTO SCROLL */
  useEffect(() => {
    const slider = sliderRef.current;
    let scroll = 0;

    const interval = setInterval(() => {
      scroll += 360;

      if (scroll >= slider.scrollWidth / 2) {
        scroll = 0;
      }

      slider.scrollTo({
        left: scroll,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white overflow-hidden">

      {/* MAIN WRAPPER */}
     <div className="w-full flex flex-col lg:flex-row min-h-[320px]">

        {/* LEFT GREEN (25%) */}
       <div className="w-full lg:w-1/4 bg-green-700 text-white px-6 md:px-10 py-10 flex flex-col justify-center">


          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl mb-6">
            “
          </div>

          <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-6">
            Join the community of 5 crore satisfied job seekers...
          </h2>

          <div className="flex items-center gap-1 text-yellow-400 text-lg">
            ⭐ ⭐ ⭐ ⭐ ⭐
          </div>

          <p className="text-sm mt-1 opacity-90">
            Play Store Ratings
          </p>

        </div>


        {/* RIGHT SLIDER (75%) */}
        <div className="w-full lg:w-3/4 bg-[#eaf7f2] py-8 md:py-10 px-4 md:pl-8 overflow-hidden">


          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide"
          >

            {/* DUPLICATE FOR LOOP */}
            {[...testimonials, ...testimonials].map((item, i) => (
              <div
                key={i}
                className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] bg-white p-6 rounded-xl shadow-md"

              >

                {/* USER */}
                <div className="flex items-center gap-3 mb-4">

                  <Image
                    src={item.image}
                    width={108}
                    height={108}
                    alt={item.name}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-xl text-black">
                      {item.name}
                    </h4>

                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      ⭐⭐⭐⭐⭐
                      <span className="text-gray-900 ml-1">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                </div>

                {/* TEXT */}
                <p className="text-gray-500 text-lg leading-relaxed">
                  "{item.text}"
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
