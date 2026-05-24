import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { BentoGrid } from "./components/BentoGrid";
import { OperationsCanvas } from "./components/OperationsCanvas";
import { ProjectVault } from "./components/ProjectVault";
import { CertificatesGallery } from "./components/CertificatesGallery";
import { ContactGateway } from "./components/ContactGateway";
import { ParticleNetwork } from "./components/ParticleNetwork";
import { NeonBackground } from "./components/NeonBackground";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { useLanguage } from "./context/LanguageContext";

// =========================================================================
// 🎧 SINGLETON AUDIO ENGINE — one shared AudioContext, zero trailing silence
// =========================================================================
let _sharedCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  try {
    if (!_sharedCtx || _sharedCtx.state === "closed") {
      const Cls = window.AudioContext || (window as any).webkitAudioContext;
      _sharedCtx = new Cls();
    }
    // Resume if suspended (browser autoplay policy)
    if (_sharedCtx.state === "suspended") {
      _sharedCtx.resume();
    }
    return _sharedCtx;
  } catch {
    return null;
  }
}

// Typewriter key click — 25 ms white-noise burst, bandpass filtered
const playTypewriterClick = () => {
  const ctx = getAudioCtx();
  if (!ctx) return;
  
  const doPlay = () => {
    try {
      const DURATION = 0.025; // 25 ms — ends sharply
      const bufferSize = Math.ceil(ctx.sampleRate * DURATION);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1300 + Math.random() * 350;
      filter.Q.value = 4.5;

      const gain = ctx.createGain();
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + DURATION);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + DURATION); // buffer source auto-disconnects after stop
    } catch { /* silent fallback */ }
  };

  if (ctx.state === "suspended") {
    ctx.resume().then(doPlay).catch(() => {});
  } else {
    doPlay();
  }
};

// Boot hum — 1.2 s sine sweep, stops exactly when envelope hits zero
const playBootSound = () => {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const doPlay = () => {
    try {
      const DURATION = 1.2;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + DURATION);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + DURATION);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + DURATION); // stops exactly at envelope zero
    } catch { /* silent fallback */ }
  };

  if (ctx.state === "suspended") {
    ctx.resume().then(doPlay).catch(() => {});
  } else {
    doPlay();
  }
};

// UI click blip — 40 ms frequency-drop sweep, guaranteed to play
// Awaits ctx.resume() first so browser autoplay policy never silences it.
const _playClickImpl = () => {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const doPlay = () => {
    try {
      const DURATION = 0.04; // 40 ms
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + DURATION);

      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + DURATION);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + DURATION);
    } catch { /* silent fallback */ }
  };

  if (ctx.state === "suspended") {
    ctx.resume().then(doPlay).catch(() => {});
  } else {
    doPlay();
  }
};

// Expose globally — components call these via (window as any).playUiClick?.()
if (typeof window !== "undefined") {
  (window as any).playUiClick = _playClickImpl;
  // playUiHover intentionally not set — hover sounds removed per user request
}

// =========================================================================
// 🎬 CYBERNETIC MONOSPACE SYSTEM INTRO LOADING SCREEN
// =========================================================================
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const fullName = "İbrahim Nuryağınlı";
  
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullName.length) {
        setText(fullName.substring(0, index + 1));
        playTypewriterClick();
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => playBootSound(), 200);
        setTimeout(() => onComplete(), 1100);
      }
    }, 110);
    return () => clearInterval(interval);
  }, [started, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 w-full h-full bg-[#030712] z-[999] flex flex-col items-center justify-center select-none cursor-pointer"
      onClick={() => {
        getAudioCtx()?.resume().catch(() => {});
        if (!started) setStarted(true);
      }}
    >
      {/* Subtle CRT scanning line overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_50%,transparent_50%)] bg-[length:100%_4px]" />
      
      <div className="flex flex-col items-start gap-4 max-w-md w-full px-8">
        <div className="flex items-center gap-2 text-[0.6rem] font-mono tracking-widest text-slate-500 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
          <span>{t("intro.booting")}</span>
        </div>
        
        <div className="flex items-center text-white font-bold tracking-tight font-sans text-2xl md:text-3xl min-h-[40px]">
          <span>{text}</span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
            className="inline-block w-2.5 h-7 ml-1 bg-indigo-500 shadow-[0_0_8px_#6366f1]"
          />
        </div>

        {!started && (
          <div className="text-[0.55rem] font-mono text-indigo-400/80 animate-pulse mt-2 uppercase tracking-wider">
            {t("intro.bypass")}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// =========================================================================
// 🚀 PRINCIPAL PORTFOLIO APPLICATION CORE
// =========================================================================
export default function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // ─── Lenis smooth scroll (initializes after intro completes) ───────────
  useEffect(() => {
    if (isIntroActive) return; // don't start until portfolio is visible
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isIntroActive]);

  useEffect(() => {
    let currentX = -1000;
    let currentY = -1000;
    let targetX = -1000;
    let targetY = -1000;
    let rafId = 0;
    let isMoving = false;

    const updatePosition = () => {
      if (currentX === -1000) {
        currentX = targetX;
        currentY = targetY;
      } else {
        // Lerp factor of 0.08 for smooth delay trailing
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
      }

      if (spotlightRef.current) {
        // Center the 900x900 spotlight div on the cursor
        const tx = currentX - 450;
        const ty = currentY - 450;
        spotlightRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }

      // Settle and stop the RAF loop if we get extremely close to target
      const dist = Math.hypot(targetX - currentX, targetY - currentY);
      if (dist < 0.15) {
        currentX = targetX;
        currentY = targetY;
        isMoving = false;
        rafId = 0;
        return; // Exits the animation loop, saving 100% CPU/GPU when idle!
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "1";
      }
      if (!isMoving) {
        isMoving = true;
        if (rafId === 0) {
          rafId = requestAnimationFrame(updatePosition);
        }
      }
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }
      // Target far away to reset smoothly. It will fade out and settle there.
      targetX = -1000;
      targetY = -1000;
      if (!isMoving) {
        isMoving = true;
        if (rafId === 0) {
          rafId = requestAnimationFrame(updatePosition);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen selection:bg-indigo-500/30 selection:text-white overflow-x-hidden antialiased relative">
      
      <AnimatePresence mode="wait">
        {isIntroActive ? (
          <IntroScreen key="intro-loader" onComplete={() => setIsIntroActive(false)} />
        ) : (
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* 1. SPECTACULAR VIBRANT AURORA BACKGROUND MESH (Static CSS Multi-Radial-Gradient, 0% GPU load) */}
            <div 
              className="fixed inset-0 overflow-hidden pointer-events-none z-0"
              style={{
                background: `
                  radial-gradient(circle at 10% 10%, rgba(79, 70, 229, 0.08) 0%, transparent 65%),
                  radial-gradient(circle at 90% 90%, rgba(147, 51, 234, 0.08) 0%, transparent 65%),
                  radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                  radial-gradient(circle at 15% 70%, rgba(59, 130, 246, 0.07) 0%, transparent 55%),
                  radial-gradient(circle at 50% 90%, rgba(245, 158, 11, 0.05) 0%, transparent 45%)
                `
              }}
            />

            {/* 2. HIGH-TECH INTERACTIVE NEURAL PARTICLE NETWORK */}
            <ParticleNetwork />

            {/* 2.5 JAW-DROPPING HIGH-FIDELITY BACK-AND-FORTH CURRENT COMMERCIAL NEON BACKGROUNDS */}
            <NeonBackground />

            {/* 3. INTERACTIVE CURSOR SPOTLIGHT TRACKER (900x900 static radial-gradient, moved via GPU translate3d) */}
            <div
              ref={spotlightRef}
              className="pointer-events-none fixed w-[900px] h-[900px] rounded-full z-10"
              style={{
                opacity: 0,
                left: 0,
                top: 0,
                background: "radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, transparent 70%)",
                willChange: "transform",
                transform: "translate3d(-1000px, -1000px, 0)",
                transition: "opacity 0.5s",
              }}
            />

            {/* Main Content Layout */}
            <div className="relative z-20" style={{ zoom: 0.85 }}>
              <Header />
              <main className="relative">
                <HeroSection />
                <BentoGrid />
                <OperationsCanvas />
                <ProjectVault />
                <CertificatesGallery />
                <ContactGateway />
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification Provider */}
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
