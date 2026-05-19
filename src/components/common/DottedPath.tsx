export function DottedPath() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-24 z-0 h-[720px] w-full overflow-visible text-deepGreen/90"
      viewBox="0 0 1180 720"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        className="animate-dash"
        d="M-40 265 C130 120 415 130 570 190 C760 264 885 205 1210 290"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="20 28"
      />
      <path
        className="animate-dash"
        d="M-80 590 C150 430 340 620 535 525 C700 445 880 500 1000 620 C1080 700 1150 690 1240 620"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="18 26"
      />
    </svg>
  );
}
