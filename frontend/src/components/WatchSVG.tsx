import React from 'react';

interface WatchSVGProps {
  caseColor: string;
  dialColor: string;
  strapColor: string;
  strapType: string;
  handsColor?: string;
  className?: string;
}

const WatchSVG: React.FC<WatchSVGProps> = ({
  caseColor,
  dialColor,
  strapColor,
  strapType,
  handsColor = "#e5e7eb",
  className = ""
}) => {
  // Simple mapping for colors if they are named, otherwise use the hex
  const getHex = (color: string) => {
    const map: Record<string, string> = {
      'silver': '#e5e7eb',
      'gold': '#d4af37',
      'rose-gold': '#b76e79',
      'black': '#171717',
      'blue': '#1e3a8a',
      'white': '#f8fafc',
      'green': '#14532d',
      'brown': '#78350f',
      'leather-brown': '#8B4513',
      'leather-black': '#222222',
      'steel': '#9ca3af',
    };
    return map[color] || color;
  };

  const caseHex = getHex(caseColor);
  const dialHex = getHex(dialColor);
  const strapHex = getHex(strapColor);
  const handsHex = getHex(handsColor);

  return (
    <svg
      viewBox="0 0 200 400"
      className={`w-full h-full drop-shadow-2xl transition-all duration-500 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Case Gradient */}
        <linearGradient id="caseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={caseHex} stopOpacity="1" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor={caseHex} stopOpacity="1" />
        </linearGradient>

        {/* Dial Inner Shadow/Gradient */}
        <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor={dialHex} stopOpacity="1" />
          <stop offset="90%" stopColor={dialHex} stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </radialGradient>

        {/* Strap Texture (simple pattern) */}
        {strapType === 'leather' && (
          <pattern id="leatherPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 10 L10 0 Z" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          </pattern>
        )}
      </defs>

      {/* Top Strap */}
      <path
        d="M 70 10 L 130 10 L 135 100 L 65 100 Z"
        fill={strapHex}
      />
      {strapType === 'leather' && (
        <path d="M 70 10 L 130 10 L 135 100 L 65 100 Z" fill="url(#leatherPattern)" />
      )}
      {/* Top Strap Stitching */}
      {strapType === 'leather' && (
        <>
          <line x1="75" y1="15" x2="70" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="125" y1="15" x2="130" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" />
        </>
      )}

      {/* Bottom Strap */}
      <path
        d="M 65 300 L 135 300 L 130 390 L 70 390 Z"
        fill={strapHex}
      />
      {strapType === 'leather' && (
        <path d="M 65 300 L 135 300 L 130 390 L 70 390 Z" fill="url(#leatherPattern)" />
      )}
      {/* Bottom Strap Stitching */}
      {strapType === 'leather' && (
        <>
          <line x1="70" y1="310" x2="75" y2="385" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="130" y1="310" x2="125" y2="385" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" />
        </>
      )}

      {/* Lugs */}
      <rect x="65" y="80" width="10" height="30" rx="3" fill="url(#caseGrad)" />
      <rect x="125" y="80" width="10" height="30" rx="3" fill="url(#caseGrad)" />
      <rect x="65" y="290" width="10" height="30" rx="3" fill="url(#caseGrad)" />
      <rect x="125" y="290" width="10" height="30" rx="3" fill="url(#caseGrad)" />

      {/* Crown */}
      <rect x="175" y="190" width="10" height="20" rx="2" fill="url(#caseGrad)" />
      {/* Crown Ridges */}
      <line x1="175" y1="193" x2="185" y2="193" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <line x1="175" y1="197" x2="185" y2="197" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <line x1="175" y1="201" x2="185" y2="201" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <line x1="175" y1="205" x2="185" y2="205" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

      {/* Case */}
      <circle cx="100" cy="200" r="85" fill="url(#caseGrad)" stroke="#111" strokeWidth="2" />

      {/* Bezel */}
      <circle cx="100" cy="200" r="75" fill="none" stroke={caseHex} strokeWidth="6" opacity="0.8" />

      {/* Dial */}
      <circle cx="100" cy="200" r="72" fill="url(#dialGrad)" />

      {/* Hour Markers */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="135"
          x2="100"
          y2={i % 3 === 0 ? "145" : "140"}
          stroke={handsHex}
          strokeWidth={i % 3 === 0 ? "4" : "2"}
          transform={`rotate(${i * 30} 100 200)`}
          strokeLinecap="round"
        />
      ))}

      {/* Hands */}
      {/* Hour Hand */}
      <line
        x1="100" y1="200" x2="100" y2="155"
        stroke={handsHex} strokeWidth="6" strokeLinecap="round"
        transform="rotate(45 100 200)"
        style={{ filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.5))' }}
      />
      {/* Minute Hand */}
      <line
        x1="100" y1="200" x2="100" y2="140"
        stroke={handsHex} strokeWidth="4" strokeLinecap="round"
        transform="rotate(180 100 200)"
        style={{ filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.5))' }}
      />
      {/* Second Hand */}
      <line
        x1="100" y1="210" x2="100" y2="135"
        stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"
        transform="rotate(310 100 200)"
        style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }}
      />

      {/* Center Pin */}
      <circle cx="100" cy="200" r="4" fill="#ef4444" />
      <circle cx="100" cy="200" r="2" fill={handsHex} />

      {/* Glass Reflection */}
      <path
        d="M 35 150 A 72 72 0 0 1 165 150 A 90 90 0 0 0 35 150 Z"
        fill="rgba(255,255,255,0.1)"
      />
    </svg>
  );
};

export default WatchSVG;
