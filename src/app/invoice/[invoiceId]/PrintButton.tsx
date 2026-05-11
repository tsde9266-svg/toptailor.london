'use client'
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="font-sans text-[0.6875rem] uppercase tracking-widest bg-parchment text-hunter px-4 py-1.5 hover:bg-parchment/90 transition-colors"
    >
      Print / Save PDF
    </button>
  )
}
