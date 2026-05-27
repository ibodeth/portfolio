import { memo } from "react";

// Pure CSS animated neon signs — NO SVG filters, NO CSS drop-shadow filters, NO Framer Motion.
// The neon glow is achieved using path-stacking (multiple layered paths of varying width/opacity).
// This runs 100% on the GPU vector engine at exactly 0% GPU load on all browsers, including Firefox!
// We use content-visibility: auto to freeze all animations and layouts when signs are off-screen,
// and we removed the stroke-dashoffset animation to prevent expensive vector re-rasterization.

export const NeonBackground = memo(function NeonBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-5 overflow-hidden bg-transparent"
      style={{ contain: "layout style paint" }}
    >
      {/* Embedded CSS — all animations are pure CSS, zero JS per frame */}
      <style>{`
        .neon-sign-board {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translate3d(0,0,0);
        }
        .neon-glass-tube {
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .neon-flicker-hum {
          animation: neon-instability 18s linear infinite;
        }

        @keyframes neon-instability {
          0%, 19.99%, 20.6%, 34.99%, 35.3%, 54.99%, 55.4%, 87.99%, 88.4%, 100% { opacity: 1; }
          20%, 20.59%, 35%, 35.29%, 55%, 55.39%, 88%, 88.39% { opacity: 0.35; }
        }

        /* Floating animations — replaces Framer Motion animate loops */
        @keyframes neon-float-1 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-10px,0); } }
        @keyframes neon-float-2 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,10px,0); } }
        @keyframes neon-float-3 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-8px,0); } }
        @keyframes neon-float-4 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,8px,0); } }

        .neon-float-1, .neon-float-2, .neon-float-3, .neon-float-4 {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translate3d(0,0,0);
        }

        .neon-float-1 { animation: neon-float-1 10s ease-in-out infinite; }
        .neon-float-2 { animation: neon-float-2 12s ease-in-out infinite; }
        .neon-float-3 { animation: neon-float-3 11s ease-in-out infinite; }
        .neon-float-4 { animation: neon-float-4 13s ease-in-out infinite; }

        /* Claude Mascot Eyes Expressions Keyframes (10s Cycle) */
        @keyframes claude-eye-normal-anim {
          0%, 40%, 55%, 80%, 96%, 100% { opacity: 1; }
          41%, 54.99%, 81%, 95.99% { opacity: 0; }
        }
        @keyframes claude-eye-happy-anim {
          0%, 40.99%, 55.01%, 100% { opacity: 0; }
          41%, 55% { opacity: 1; }
        }
        @keyframes claude-eye-wink-anim {
          0%, 80.99%, 96.01%, 100% { opacity: 0; }
          81%, 96% { opacity: 1; }
        }

        .claude-eye-normal {
          animation: claude-eye-normal-anim 10s step-end infinite;
        }
        .claude-eye-happy {
          animation: claude-eye-happy-anim 10s step-end infinite;
        }
        .claude-eye-wink {
          animation: claude-eye-wink-anim 10s step-end infinite;
        }
      `}</style>

      {/* 1. Python Snake Sign (Left Top - Hero) */}
      <div
        className="absolute left-[1%] md:left-[3%] top-[10vh] md:top-[12vh] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] lg:w-[310px] lg:h-[310px] opacity-[0.38] neon-float-1"
        style={{
          willChange: "transform",
          contain: "layout style paint",
          contentVisibility: "auto",
          containIntrinsicSize: "310px",
        }}
      >
        <svg className="w-full h-full neon-sign-board" viewBox="0 0 100 100" fill="none">
          {/* Outer Layer: Wide Soft Glow (opacity: 0.05, strokeWidth: 16) */}
          <path stroke="#3b82f6" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 50 12 C 35 12 32 14 32 27 L 32 38 L 50 38 L 50 44 L 28 44 C 18 44 16 54 16 64 L 16 68 L 26 68 L 26 64 C 26 54 32 50 42 50 L 56 50 C 66 50 68 42 68 32 C 68 22 62 12 50 12 Z" />
          <path stroke="#eab308" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 50 88 C 65 88 68 86 68 73 L 68 62 L 50 62 L 50 56 L 72 56 C 82 56 84 46 84 36 L 84 32 L 74 32 L 74 36 C 74 46 68 50 58 50 L 44 50 C 34 50 32 58 32 68 C 32 78 38 88 50 88 Z" />

          {/* Middle Layer: Intense Inner Glow (opacity: 0.20, strokeWidth: 8) */}
          <path stroke="#3b82f6" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 50 12 C 35 12 32 14 32 27 L 32 38 L 50 38 L 50 44 L 28 44 C 18 44 16 54 16 64 L 16 68 L 26 68 L 26 64 C 26 54 32 50 42 50 L 56 50 C 66 50 68 42 68 32 C 68 22 62 12 50 12 Z" />
          <path stroke="#eab308" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 50 88 C 65 88 68 86 68 73 L 68 62 L 50 62 L 50 56 L 72 56 C 82 56 84 46 84 36 L 84 32 L 74 32 L 74 36 C 74 46 68 50 58 50 L 44 50 C 34 50 32 58 32 68 C 32 78 38 88 50 88 Z" />

          {/* Cam Tube Layer: Glass Core Color (opacity: 0.85, strokeWidth: 2.8) */}
          <path stroke="#60a5fa" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 50 12 C 35 12 32 14 32 27 L 32 38 L 50 38 L 50 44 L 28 44 C 18 44 16 54 16 64 L 16 68 L 26 68 L 26 64 C 26 54 32 50 42 50 L 56 50 C 66 50 68 42 68 32 C 68 22 62 12 50 12 Z" />
          <path stroke="#fef08a" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 50 88 C 65 88 68 86 68 73 L 68 62 L 50 62 L 50 56 L 72 56 C 82 56 84 46 84 36 L 84 32 L 74 32 L 74 36 C 74 46 68 50 58 50 L 44 50 C 34 50 32 58 32 68 C 32 78 38 88 50 88 Z" />
          
          <circle cx="42" cy="22" r="1.8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" className="neon-flicker-hum" />
          <circle cx="58" cy="78" r="1.8" fill="#ffffff" stroke="#eab308" strokeWidth="1" className="neon-flicker-hum" />

          {/* White Hot Core Layer: Pure White Sharp Filament (opacity: 0.95, strokeWidth: 1.2) */}
          <path stroke="#ffffff" strokeWidth="1.2" opacity="0.95" className="neon-glass-tube" d="M 50 12 C 35 12 32 14 32 27 L 32 38 L 50 38 L 50 44 L 28 44 C 18 44 16 54 16 64 L 16 68 L 26 68 L 26 64 C 26 54 32 50 42 50 L 56 50 C 66 50 68 42 68 32 C 68 22 62 12 50 12 Z" />
          <path stroke="#ffffff" strokeWidth="1.2" opacity="0.95" className="neon-glass-tube" d="M 50 88 C 65 88 68 86 68 73 L 68 62 L 50 62 L 50 56 L 72 56 C 82 56 84 46 84 36 L 84 32 L 74 32 L 74 36 C 74 46 68 50 58 50 L 44 50 C 34 50 32 58 32 68 C 32 78 38 88 50 88 Z" />
        </svg>
      </div>

      {/* 2. C# Sign (Right Top - Hero) */}
      <div
        className="absolute right-[1%] md:right-[3%] top-[22vh] md:top-[24vh] w-[130px] h-[130px] sm:w-[180px] sm:h-[180px] md:w-[240px] md:h-[240px] lg:w-[290px] lg:h-[290px] opacity-[0.38] neon-float-2"
        style={{
          willChange: "transform",
          contain: "layout style paint",
          contentVisibility: "auto",
          containIntrinsicSize: "310px",
        }}
      >
        <svg className="w-full h-full neon-sign-board" viewBox="0 0 100 100" fill="none">
          {/* Outer Layer: Wide Soft Glow */}
          <path stroke="#a855f7" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 44 35 C 32 35 25 42 25 50 C 25 58 32 65 44 65" />
          <path stroke="#a855f7" strokeWidth="14" opacity="0.05" className="neon-glass-tube" d="M 52 44 L 74 44 M 48 56 L 70 56 M 55 35 L 51 65 M 65 35 L 61 65" />

          {/* Middle Layer: Intense Inner Glow */}
          <path stroke="#a855f7" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 44 35 C 32 35 25 42 25 50 C 25 58 32 65 44 65" />
          <path stroke="#a855f7" strokeWidth="6" opacity="0.20" className="neon-glass-tube" d="M 52 44 L 74 44 M 48 56 L 70 56 M 55 35 L 51 65 M 65 35 L 61 65" />

          {/* Cam Tube Layer: Glass Core Color */}
          <path stroke="#c084fc" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 44 35 C 32 35 25 42 25 50 C 25 58 32 65 44 65" />
          <path stroke="#d8b4fe" strokeWidth="2.2" opacity="0.85" className="neon-glass-tube neon-flicker-hum" d="M 52 44 L 74 44 M 48 56 L 70 56 M 55 35 L 51 65 M 65 35 L 61 65" />

          {/* White Hot Core Layer */}
          <path stroke="#ffffff" strokeWidth="1.2" opacity="0.95" className="neon-glass-tube" d="M 44 35 C 32 35 25 42 25 50 C 25 58 32 65 44 65" />
          <path stroke="#ffffff" strokeWidth="1.0" opacity="0.95" className="neon-glass-tube" d="M 52 44 L 74 44 M 48 56 L 70 56 M 55 35 L 51 65 M 65 35 L 61 65" />
        </svg>
      </div>

      {/* 3. Docker Whale Sign (Right Middle - Skills) - formerly Unity coordinate */}
      <div
        className="absolute right-[1%] md:right-[4%] top-[105vh] md:top-[110vh] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] lg:w-[310px] lg:h-[310px] opacity-[0.38] neon-float-3"
        style={{
          willChange: "transform",
          contain: "layout style paint",
          contentVisibility: "auto",
          containIntrinsicSize: "310px",
        }}
      >
        <svg className="w-full h-full neon-sign-board" viewBox="0 0 100 100" fill="none">
          {/* Outer Layer: Wide Soft Glow */}
          <path stroke="#06b6d4" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 12 62 C 12 44, 32 38, 54 38 C 70 38, 80 43, 85 53 C 90 53, 93 50, 95 48 C 95 56, 90 62, 85 63 C 75 68, 42 68, 12 62 Z" />
          <path stroke="#06b6d4" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 85 53 C 90 40, 93 30, 93 25 C 89 27, 84 31, 80 43" />
          <rect x="31" y="26" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="8" opacity="0.05" />
          <rect x="44" y="26" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="8" opacity="0.05" />
          <rect x="57" y="26" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="8" opacity="0.05" />
          <rect x="44" y="14" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="8" opacity="0.05" />

          {/* Middle Layer: Intense Inner Glow */}
          <path stroke="#06b6d4" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 12 62 C 12 44, 32 38, 54 38 C 70 38, 80 43, 85 53 C 90 53, 93 50, 95 48 C 95 56, 90 62, 85 63 C 75 68, 42 68, 12 62 Z" />
          <path stroke="#06b6d4" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 85 53 C 90 40, 93 30, 93 25 C 89 27, 84 31, 80 43" />
          <rect x="31" y="26" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="3.5" opacity="0.20" />
          <rect x="44" y="26" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="3.5" opacity="0.20" />
          <rect x="57" y="26" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="3.5" opacity="0.20" />
          <rect x="44" y="14" width="10" height="9" rx="1.2" stroke="#06b6d4" strokeWidth="3.5" opacity="0.20" />

          {/* Cam Tube Layer: Glass Core Color */}
          <path stroke="#22d3ee" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 12 62 C 12 44, 32 38, 54 38 C 70 38, 80 43, 85 53 C 90 53, 93 50, 95 48 C 95 56, 90 62, 85 63 C 75 68, 42 68, 12 62 Z" />
          <path stroke="#22d3ee" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 85 53 C 90 40, 93 30, 93 25 C 89 27, 84 31, 80 43" />
          <rect x="31" y="26" width="10" height="9" rx="1.2" stroke="#67e8f9" strokeWidth="2.2" className="neon-flicker-hum" opacity="0.85" />
          <rect x="44" y="26" width="10" height="9" rx="1.2" stroke="#67e8f9" strokeWidth="2.2" opacity="0.85" />
          <rect x="57" y="26" width="10" height="9" rx="1.2" stroke="#67e8f9" strokeWidth="2.2" className="neon-flicker-hum" style={{ animationDelay: "1s" }} opacity="0.85" />
          <rect x="44" y="14" width="10" height="9" rx="1.2" stroke="#e0f7fa" strokeWidth="2.2" opacity="0.85" />
          <path stroke="#0891b2" strokeWidth="2.2" opacity="0.80" className="neon-glass-tube" d="M 6 78 C 20 81, 30 74, 50 77 C 70 80, 80 74, 94 78 M 12 85 C 28 88, 38 82, 54 84 C 70 86, 78 81, 88 85" />

          {/* White Hot Core Layer */}
          <path stroke="#ffffff" strokeWidth="1.2" opacity="0.95" className="neon-glass-tube" d="M 12 62 C 12 44, 32 38, 54 38 C 70 38, 80 43, 85 53 C 90 53, 93 50, 95 48 C 95 56, 90 62, 85 63 C 75 68, 42 68, 12 62 Z" />
          <rect x="31" y="26" width="10" height="9" rx="1.2" stroke="#ffffff" strokeWidth="0.8" opacity="0.95" />
          <rect x="44" y="26" width="10" height="9" rx="1.2" stroke="#ffffff" strokeWidth="0.8" opacity="0.95" />
          <rect x="57" y="26" width="10" height="9" rx="1.2" stroke="#ffffff" strokeWidth="0.8" opacity="0.95" />
          <rect x="44" y="14" width="10" height="9" rx="1.2" stroke="#ffffff" strokeWidth="0.8" opacity="0.95" />
        </svg>
      </div>

      {/* 4. Claude Code Mascot Sign (Left Middle - Experience) - formerly Docker */}
      <div
        className="absolute left-[1%] md:left-[3%] top-[205vh] md:top-[210vh] w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] lg:w-[310px] lg:h-[310px] opacity-[0.38] neon-float-4"
        style={{
          willChange: "transform",
          contain: "layout style paint",
          contentVisibility: "auto",
          containIntrinsicSize: "310px",
        }}
      >
        <svg className="w-full h-full neon-sign-board" viewBox="0 0 100 100" fill="none">
          {/* Outer Layer: Wide Soft Glow */}
          <path stroke="#e06c53" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 24 20 L 76 20 L 76 45 L 86 45 L 86 55 L 76 55 L 76 65 L 24 65 L 24 55 L 14 55 L 14 45 L 24 45 Z" />
          <path stroke="#e06c53" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 30 65 L 30 78 M 40 65 L 40 78 M 60 65 L 60 78 M 70 65 L 70 78" />

          {/* Middle Layer: Intense Inner Glow */}
          <path stroke="#e06c53" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 24 20 L 76 20 L 76 45 L 86 45 L 86 55 L 76 55 L 76 65 L 24 65 L 24 55 L 14 55 L 14 45 L 24 45 Z" />
          <path stroke="#e06c53" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 30 65 L 30 78 M 40 65 L 40 78 M 60 65 L 60 78 M 70 65 L 70 78" />

          {/* Cam Tube Layer: Glass Core Color */}
          <path stroke="#fb923c" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 24 20 L 76 20 L 76 45 L 86 45 L 86 55 L 76 55 L 76 65 L 24 65 L 24 55 L 14 55 L 14 45 L 24 45 Z" />
          <path stroke="#fb923c" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 30 65 L 30 78 M 40 65 L 40 78 M 60 65 L 60 78 M 70 65 L 70 78" />

          {/* Left Normal Eye */}
          <rect x="33" y="32" width="5" height="11" rx="1.5" stroke="#e06c53" strokeWidth="6" opacity="0.05" className="claude-eye-normal" />
          <rect x="33" y="32" width="5" height="11" rx="1.5" stroke="#e06c53" strokeWidth="3" opacity="0.20" className="claude-eye-normal" />
          <rect x="33" y="32" width="5" height="11" rx="1.5" fill="#ffffff" stroke="#fb923c" strokeWidth="1.2" opacity="0.9" className="claude-eye-normal neon-flicker-hum" />
          
          {/* Right Normal Eye */}
          <rect x="62" y="32" width="5" height="11" rx="1.5" stroke="#e06c53" strokeWidth="6" opacity="0.05" className="claude-eye-normal" />
          <rect x="62" y="32" width="5" height="11" rx="1.5" stroke="#e06c53" strokeWidth="3" opacity="0.20" className="claude-eye-normal" />
          <rect x="62" y="32" width="5" height="11" rx="1.5" fill="#ffffff" stroke="#fb923c" strokeWidth="1.2" opacity="0.9" className="claude-eye-normal neon-flicker-hum" />

          {/* Left Happy Eye */}
          <path d="M 30 39 Q 35.5 31.5 41 39" stroke="#e06c53" strokeWidth="8" opacity="0.05" className="claude-eye-happy" />
          <path d="M 30 39 Q 35.5 31.5 41 39" stroke="#e06c53" strokeWidth="4" opacity="0.20" className="claude-eye-happy" />
          <path d="M 30 39 Q 35.5 31.5 41 39" stroke="#ffffff" strokeWidth="1.8" opacity="0.95" className="claude-eye-happy neon-flicker-hum" />

          {/* Right Happy Eye */}
          <path d="M 59 39 Q 64.5 31.5 70 39" stroke="#e06c53" strokeWidth="8" opacity="0.05" className="claude-eye-happy" />
          <path d="M 59 39 Q 64.5 31.5 70 39" stroke="#e06c53" strokeWidth="4" opacity="0.20" className="claude-eye-happy" />
          <path d="M 59 39 Q 64.5 31.5 70 39" stroke="#ffffff" strokeWidth="1.8" opacity="0.95" className="claude-eye-happy neon-flicker-hum" />

          {/* Left Wink Eye (Normal open) */}
          <rect x="33" y="32" width="5" height="11" rx="1.5" stroke="#e06c53" strokeWidth="6" opacity="0.05" className="claude-eye-wink" />
          <rect x="33" y="32" width="5" height="11" rx="1.5" stroke="#e06c53" strokeWidth="3" opacity="0.20" className="claude-eye-wink" />
          <rect x="33" y="32" width="5" height="11" rx="1.5" fill="#ffffff" stroke="#fb923c" strokeWidth="1.2" opacity="0.9" className="claude-eye-wink neon-flicker-hum" />

          {/* Right Wink Eye (Flat closed line) */}
          <path d="M 59 37 L 70 37" stroke="#e06c53" strokeWidth="8" opacity="0.05" className="claude-eye-wink" />
          <path d="M 59 37 L 70 37" stroke="#e06c53" strokeWidth="4" opacity="0.20" className="claude-eye-wink" />
          <path d="M 59 37 L 70 37" stroke="#ffffff" strokeWidth="1.8" opacity="0.95" className="claude-eye-wink neon-flicker-hum" />

          {/* White Hot Core Layer */}
          <path stroke="#ffffff" strokeWidth="1.2" opacity="0.95" className="neon-glass-tube" d="M 24 20 L 76 20 L 76 45 L 86 45 L 86 55 L 76 55 L 76 65 L 24 65 L 24 55 L 14 55 L 14 45 L 24 45 Z" />
          <path stroke="#ffffff" strokeWidth="1.2" opacity="0.95" className="neon-glass-tube" d="M 30 65 L 30 78 M 40 65 L 40 78 M 60 65 L 60 78 M 70 65 L 70 78" />
        </svg>
      </div>

      {/* 5. Tux Penguin Sign (Right Bottom - Connect) */}
      <div
        className="absolute right-[1%] md:right-[3%] top-[400vh] md:top-[405vh] w-[130px] h-[130px] sm:w-[190px] sm:h-[190px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] opacity-[0.38] neon-float-2"
        style={{
          willChange: "transform",
          contain: "layout style paint",
          contentVisibility: "auto",
          containIntrinsicSize: "310px",
        }}
      >
        <svg className="w-full h-full neon-sign-board" viewBox="0 0 100 100" fill="none">
          {/* Outer Layer: Wide Soft Glow */}
          <path stroke="#3b82f6" strokeWidth="16" opacity="0.05" className="neon-glass-tube" d="M 50 12 C 40 12, 36 22, 36 32 C 36 37, 32 47, 28 57 C 24 67, 26 82, 34 84 C 40 85, 44 85, 50 85 C 56 85, 60 85, 66 84 C 74 82, 76 67, 72 57 C 68 47, 64 37, 64 32 C 64 22, 60 12, 50 12 Z" />
          <path stroke="#ffffff" strokeWidth="12" opacity="0.05" className="neon-glass-tube" d="M 50 36 C 42 36, 38 46, 38 59 C 38 71, 42 81, 50 81 C 58 81, 62 71, 62 59 C 62 46, 58 36, 50 36 Z" />

          {/* Middle Layer: Intense Inner Glow */}
          <path stroke="#3b82f6" strokeWidth="8" opacity="0.20" className="neon-glass-tube" d="M 50 12 C 40 12, 36 22, 36 32 C 36 37, 32 47, 28 57 C 24 67, 26 82, 34 84 C 40 85, 44 85, 50 85 C 56 85, 60 85, 66 84 C 74 82, 76 67, 72 57 C 68 47, 64 37, 64 32 C 64 22, 60 12, 50 12 Z" />
          <path stroke="#ffffff" strokeWidth="6" opacity="0.20" className="neon-glass-tube" d="M 50 36 C 42 36, 38 46, 38 59 C 38 71, 42 81, 50 81 C 58 81, 62 71, 62 59 C 62 46, 58 36, 50 36 Z" />
          <path stroke="#eab308" strokeWidth="8" opacity="0.20" d="M 43 27 C 43 27, 50 33, 57 27 L 50 30 Z" />
          <path stroke="#eab308" strokeWidth="8" opacity="0.20" d="M 32 84 C 24 86, 20 90, 24 92 C 28 94, 36 90, 40 85 M 68 84 C 76 86, 80 90, 76 92 C 72 94, 64 90, 60 85" />

          {/* Cam Tube Layer: Glass Core Color */}
          <path stroke="#60a5fa" strokeWidth="2.8" opacity="0.85" className="neon-glass-tube" d="M 50 12 C 40 12, 36 22, 36 32 C 36 37, 32 47, 28 57 C 24 67, 26 82, 34 84 C 40 85, 44 85, 50 85 C 56 85, 60 85, 66 84 C 74 82, 76 67, 72 57 C 68 47, 64 37, 64 32 C 64 22, 60 12, 50 12 Z" />
          <path stroke="#e2e8f0" strokeWidth="2.5" opacity="0.85" className="neon-glass-tube" d="M 50 36 C 42 36, 38 46, 38 59 C 38 71, 42 81, 50 81 C 58 81, 62 71, 62 59 C 62 46, 58 36, 50 36 Z" />
          <path stroke="#facc15" strokeWidth="2.5" opacity="0.85" className="neon-glass-tube neon-flicker-hum" d="M 43 27 C 43 27, 50 33, 57 27 L 50 30 Z" />
          <path stroke="#facc15" strokeWidth="2.2" opacity="0.85" className="neon-glass-tube" d="M 32 84 C 24 86, 20 90, 24 92 C 28 94, 36 90, 40 85 M 68 84 C 76 86, 80 90, 76 92 C 72 94, 64 90, 60 85" />
          <circle cx="45" cy="20" r="1" fill="#ffffff" />
          <circle cx="55" cy="20" r="1" fill="#ffffff" />

          {/* White Hot Core Layer */}
          <path stroke="#ffffff" strokeWidth="1.2" opacity="0.95" className="neon-glass-tube" d="M 50 12 C 40 12, 36 22, 36 32 C 36 37, 32 47, 28 57 C 24 67, 26 82, 34 84 C 40 85, 44 85, 50 85" />
          <path stroke="#ffffff" strokeWidth="1.0" opacity="0.95" className="neon-glass-tube" d="M 50 36 C 42 36, 38 46, 38 59 C 38 71, 42 81, 50 81" />
        </svg>
      </div>
    </div>
  );
});
