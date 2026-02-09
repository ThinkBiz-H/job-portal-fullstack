"use client";

export default function CompanySlider() {
  const logos = [
    "swigee.png",
    "uber.png",
    "zomato.png",
    // "flipkart.png",
    "jio.png",
    "amazon.png",
    "tcs.png",
    "infosys.png",
    "wipro.png",
    "accenture.png",
  ];

  return (
    <div className="overflow-hidden py-4">
      <div className="flex gap-12 w-max animate-scroll items-center">
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={`/logos/${logo}`}
            alt={logo}
            className="h-8 md:h-10 object-contain"
          />
        ))}
      </div>
    </div>
  );
}
