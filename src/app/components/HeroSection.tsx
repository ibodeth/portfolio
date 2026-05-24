import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

const playClick = () => (window as any).playUiClick?.();

const techLogos = [
  {
    name: "Python",
    color: "#3776AB",
    shadowColor: "rgba(55, 118, 171, 0.45)",
    url: "https://www.python.org",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.97 2c-3.155 0-5.83 2.052-5.83 5.485v2.8h5.955v0.815H4.295c-1.62 0-2.82 1.3-2.82 2.915v4.86c0 1.615 1.3 2.915 2.82 2.915h1.16v-2.735c0-1.615 1.29-2.915 2.82-2.915h3.04v-3.21h-2.935v-1c0-1.615 1.3-2.915 2.82-2.915h2.935V4.735c0-1.615-1.29-2.735-2.82-2.735H11.97zm.058 20c3.155 0 5.83-2.052 5.83-5.485v-2.8h-5.955v-0.815h7.8c1.62 0 2.82-1.3 2.82-2.915v-4.86c0-1.615-1.3-2.915-2.82-2.915h-1.16v2.735c0 1.615-1.29 2.915-2.82 2.915h-3.04v3.21h2.935v1c0 1.615-1.3 2.915-2.82 2.915h-2.935v2.735c0 1.615 1.29 2.735 2.82 2.735h2.935z" />
        <circle cx="9.05" cy="5.25" r="0.8" />
        <circle cx="14.95" cy="18.75" r="0.8" />
      </svg>
    ),
  },
  {
    name: "C#",
    color: "#a855f7",
    shadowColor: "rgba(168, 85, 247, 0.45)",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 22,7.8 22,16.2 12,22 2,16.2 2,7.8" />
        <path d="M9 14.5 C7 14.5 6 13.5 6 12 C6 10.5 7 9.5 9 9.5" />
        <path d="M14 8 L13 16 M17 8 L16 16 M12 11 L18 11 M11 13 L17 13" />
      </svg>
    ),
  },
  {
    name: "Docker",
    color: "#2496ED",
    shadowColor: "rgba(36, 150, 237, 0.45)",
    url: "https://www.docker.com",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.937 0h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.937 0h2.12c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.12c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.937 0h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H5.172c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm2.937-2.937h2.119c.102 0 .186-.084.186-.186V5.836c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm2.937 0h2.119c.102 0 .186-.084.186-.186V5.836c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-5.874 0h2.12c.102 0 .186-.084.186-.186V5.836c0-.102-.084-.186-.186-.186h-2.12c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm5.874-2.937h2.119c.102 0 .186-.084.186-.186V2.9c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-8.811 8.811h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H2.235c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM23.99 12.39c-.198-.445-1.378-1.597-3.957-1.597h-.077c-.156.011-.303.047-.442.106-.525-.873-1.637-2.617-3.711-2.617H11.04v7.697c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-3.589z" />
      </svg>
    ),
  },
  {
    name: "Swagger",
    color: "#85EA2D",
    shadowColor: "rgba(133, 234, 45, 0.45)",
    url: "https://swagger.io",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12,2 2,7.8 2,16.2 12,22 22,16.2 22,7.8" />
        <polygon points="12,6.5 18,10 12,13.5 6,10" />
        <line x1="12" y1="13.5" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: "Unity",
    color: "#FFFFFF",
    shadowColor: "rgba(255, 255, 255, 0.45)",
    url: "https://unity.com",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12,2 2,7.8 2,16.2 12,22 22,16.2 22,7.8" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="7.8" x2="22" y2="16.2" />
        <line x1="2" y1="16.2" x2="22" y2="7.8" />
      </svg>
    ),
  },
  {
    name: "Linux",
    color: "#FCC624",
    shadowColor: "rgba(252, 198, 36, 0.45)",
    url: "https://www.linux.org",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c-1.9 0-3.5 1.5-3.5 3.5 0 .5.1 1 .3 1.5 C7.2 8, 6 10, 6 12.5c0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5c0-2.5-1.2-4.5-2.8-5.5.2-.5.3-1 .3-1.5C15.5 3.5 13.9 2 12 2z" />
        <path d="M9.5 18.5c-2 0-3.5 1.5-3.5 3.5h12c0-2-1.5-3.5-3.5-3.5h-5z" />
        <path d="M10.5 5.5h3L12 6.5z" />
      </svg>
    ),
  },
  {
    name: "SQL Databases",
    color: "#10B981",
    shadowColor: "rgba(16, 185, 129, 0.45)",
    url: "https://www.postgresql.org",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3s-3.58 3-8 3s-8 1.34-8 3z" />
        <path d="M4 11c0 1.66 3.58 3 8 3s8-1.34 8-3V9c0 1.66-3.58 3-8 3s-8-1.34-8-3v2z" />
        <path d="M4 16c0 1.66 3.58 3 8 3s8-1.34 8-3v-2c0 1.66-3.58 3-8 3s-8-1.34-8-3v2z" />
      </svg>
    ),
  },
  {
    name: "Git VCS",
    color: "#F05032",
    shadowColor: "rgba(240, 80, 50, 0.45)",
    url: "https://git-scm.com",
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="6" y1="9" x2="6" y2="15" />
        <path d="M6 18 C 6 12 18 12 18 15" />
      </svg>
    ),
  },
];

export function HeroSection() {
  const { t } = useLanguage();
  const scrollToSection = (id: string) => {
    const targetEl = document.getElementById(id) as HTMLElement | null;
    if (targetEl) {
      window.scrollTo({ top: targetEl.offsetTop, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <section
      id="home"
      className="relative w-full flex flex-col justify-center items-center overflow-hidden pt-20 pb-16 px-4 sm:px-6 md:px-8 bg-transparent"
      style={{ minHeight: "calc(100vh / 0.85)" }}
    >
      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center gap-6 text-center max-w-3xl"
      >
        {/* Modern minimal pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800/80 bg-slate-900/20 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="tracking-wider text-slate-300 font-medium font-sans text-xs">
            {t("hero.badge")}
          </span>
        </motion.div>

        {/* Main heading with solid, premium typography */}
        <h1
          className="font-bold tracking-tight text-white leading-[1.1] select-none font-sans"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)",
          }}
        >
          İbrahim Nuryağınlı
        </h1>

        {/* Subtitle */}
        <h2
          className="text-slate-300 font-medium tracking-wide text-sm md:text-lg max-w-xl font-sans leading-relaxed"
        >
          {t("hero.subtitle")}
        </h2>

        {/* Human-written statement describing genuine competencies */}
        <p
          className="max-w-2xl text-slate-400 font-sans text-sm md:text-base leading-relaxed"
        >
          {t("hero.paragraph")}
        </p>

        {/* Clean, high-end buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-2"
        >
          <Button
            size="lg"
            className="px-7 font-sans font-medium text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer transition-all duration-300 rounded-lg shadow-sm"
            onClick={() => { playClick(); scrollToSection("contact"); }}
          >
            {t("hero.btnContact")}
            <Sparkles className="ml-2 w-4 h-4 text-indigo-200" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="px-7 font-sans border-slate-800 bg-slate-950/10 text-slate-300 hover:text-white cursor-pointer hover:bg-slate-900/30 transition-all duration-300 rounded-lg"
            onClick={() => { playClick(); scrollToSection("projects"); }}
          >
            {t("hero.btnProjects")}
            <ArrowUpRight className="ml-2 w-4 h-4 text-slate-400 group-hover:text-white" />
          </Button>
        </motion.div>

        {/* JAW-DROPPING GLOWING NEON TECH LOGO SPOTLIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-2xl mt-12 pt-8 border-t border-slate-800/40"
        >
          <p className="text-[0.65rem] font-bold tracking-widest text-slate-500 uppercase font-mono mb-6">
            {t("hero.techHeading")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {techLogos.map((tech) => (
              <div key={tech.name} className="relative group">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-slate-950/90 border border-slate-800 text-[0.68rem] font-semibold tracking-wide font-sans text-slate-200 pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out shadow-xl whitespace-nowrap z-50 backdrop-blur-sm">
                  {tech.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-slate-950" />
                </div>

                <motion.div
                  initial={false}
                  whileHover={{
                    scale: 1.22,
                    filter: `drop-shadow(0 0 8px ${tech.shadowColor}) drop-shadow(0 0 18px ${tech.shadowColor}) drop-shadow(0 0 32px ${tech.shadowColor})`,
                  }}
                  transition={{ duration: 0.18 }}
                  onClick={() => { playClick(); window.open(tech.url, "_blank", "noopener,noreferrer"); }}
                  className="flex items-center justify-center p-2.5 sm:p-3 cursor-pointer"
                  style={{
                    color: tech.color,
                    filter: "none",
                    transition: "filter 0.25s ease",
                  }}
                >
                  {tech.svg}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Clean down arrow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => { playClick(); scrollToSection("skills"); }}
      >
        <span className="text-slate-500 text-[0.625rem] tracking-widest uppercase font-sans font-semibold">
          {t("hero.explore")}
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-slate-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
