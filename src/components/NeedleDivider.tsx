/**
 * NeedleDivider — desktop only.
 * Centred needle SVG with a 1px #C4B99A rule line on either side.
 * Opacity 0.6 on the whole assembly.
 *
 * Placed between Services and HowItWorks.
 */
export default function NeedleDivider() {
  return (
    <div
      className="hidden lg:flex relative items-center justify-center py-12 opacity-60"
      aria-hidden="true"
    >
      {/* Left rule line */}
      <div className="flex-1 rule-h" />

      {/* Needle SVG — exact spec from CONTEXT.md */}
      <div className="bg-parchment px-8">
        <svg
          width="48"
          height="20"
          viewBox="0 0 48 20"
          fill="none"
          aria-hidden="true"
        >
          <line x1="0"  y1="10" x2="16" y2="10" stroke="#C4B99A" strokeWidth="0.8" />
          <ellipse cx="20" cy="10" rx="3" ry="6"  stroke="#C4B99A" strokeWidth="0.8" fill="none" />
          <line x1="23" y1="10" x2="44" y2="1"  stroke="#C4B99A" strokeWidth="0.8" />
          <line x1="44" y1="1"  x2="48" y2="19" stroke="#C4B99A" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Right rule line */}
      <div className="flex-1 rule-h" />
    </div>
  )
}
