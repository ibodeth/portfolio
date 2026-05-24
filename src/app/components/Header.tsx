import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Certificates", href: "#certificates", id: "certificates" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const playClick = () => (window as any).playUiClick?.();

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-0.5 bg-slate-950/50 border border-slate-800/60 p-0.5 rounded-full backdrop-blur-sm select-none shrink-0">
      <button
        onClick={() => { playClick(); setLang("tr"); }}
        className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider transition-all cursor-pointer font-mono ${
          lang === "tr"
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-500 hover:text-slate-300"
        }`}
      >
        TR
      </button>
      <button
        onClick={() => { playClick(); setLang("en"); }}
        className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider transition-all cursor-pointer font-mono ${
          lang === "en"
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-500 hover:text-slate-300"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export function Header() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    setIsMobileMenuOpen(false);
    const targetEl = document.querySelector(href) as HTMLElement | null;
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-[#030712]/80 border-b border-slate-800/40 backdrop-blur-md"
          : "py-4 bg-transparent"
      }`}
    >
      {/* Scroll progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 origin-left z-[100] pointer-events-none"
        style={{ scaleX: scrollYProgress, willChange: "transform" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 border-indigo-500/40 group-hover:border-indigo-400/70 transition-all duration-300 shrink-0"
            style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,0.4))" }}
          >
            <img
              src="https://github.com/ibodeth.png"
              alt="ibodeth"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors tracking-tight font-mono text-sm md:text-base">
            ibodeth
          </span>
        </a>

        {/* Desktop nav, Switcher and Mobile toggle wrapped in flex container */}
        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 border border-slate-900/60 p-1.5 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-slate-800/60 rounded-full border border-slate-700/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(`nav.${item.id}`)}</span>
                </a>
              );
            })}
          </nav>

          <LanguageSwitcher />

          {/* Mobile toggle */}
          <button
            onClick={() => { playClick(); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            className="md:hidden p-2 text-slate-400 hover:text-slate-200 cursor-pointer rounded-lg border border-slate-800/40 bg-slate-950/20 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-slate-800 bg-[#030712]/95 backdrop-blur-lg absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-5 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
                      isActive
                        ? "bg-indigo-600/10 text-indigo-400 font-semibold border-l-2 border-indigo-500"
                        : "text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"
                    }`}
                  >
                    <span>{t(`nav.${item.id}`)}</span>
                    <ArrowRight className={`w-4 h-4 transition-opacity ${isActive ? "opacity-100 text-indigo-400" : "opacity-30"}`} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
