// Shared brand mark: sonar pulse + data signal — reflects sensor data, ML, and
// pipeline work. Used in the navbar; keep src/app/icon.svg in sync.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient
          id="mt-logo-bg"
          x1="4"
          y1="2"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0ea5e9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#5eead4" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#mt-logo-bg)" />
      {/* Sonar transducer */}
      <circle cx="8.5" cy="16" r="2" fill="#04202a" />
      {/* Sonar return arcs */}
      <path
        d="M10.5 16a3.5 3.5 0 0 1 7 0"
        stroke="#04202a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.5 16a6.5 6.5 0 0 1 13 0"
        stroke="#04202a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.5 16a9.5 9.5 0 0 1 19 0"
        stroke="#04202a"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Data / signal output */}
      <path
        d="M17.5 21.5 19.5 15l2 3.5 2-6 2.5 4.5 2-3"
        stroke="#04202a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
