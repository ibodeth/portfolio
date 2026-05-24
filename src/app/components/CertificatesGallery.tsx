import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Calendar, ShieldCheck, ChevronLeft, ChevronRight, X, ZoomIn, Download } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "../context/LanguageContext";

const playClick = () => (window as any).playUiClick?.();

// =========================================================================
// ⚠️ NO-CODE CERTIFICATE UPLOAD INSTRUCTIONS (Metadata Sidecar System):
// 1. Drop your new certificate image file (PNG/JPG/WEBP) in "src/certificates/".
//    Let's say it is named: "kubernetes_cert.png"
// 2. In the same folder, drop a simple text file named: "kubernetes_cert.json"
// 3. Put your certificate details directly inside the JSON file like this:
//    {
//      "title": "Certified Kubernetes Administrator",
//      "authority": "Cloud Native Computing Foundation",
//      "date": "December 2026",
//      "verifyId": "CKA-1102-99",
//      "description": "Demonstrates core expertise in Kubernetes deployment, scheduling, cluster architecture, and troubleshooting workflows."
//    }
// - That's it! Vite will automatically read, parse, and link them dynamically
//   at build time. Zero React coding or edits required!
// =========================================================================

// High-fidelity custom metadata dictionary for initial certificates (fallback if sidecar JSON is not present)
const customMetadata: Record<string, { title: string; authority: string; date: string; verifyId: string; description: string }> = {
  cargo_pilot_badge: {
    title: "Divizyon Cargo Pilot Developer Verification Badge",
    authority: "Divizyon Platform Systems",
    date: "November 2025",
    verifyId: "DIV-CP-9972",
    description: "",
  },
  scrum_cert: {
    title: "Agile Project Sprints & Scrum Master Certification",
    authority: "Agile Leadership Alliance",
    date: "September 2025",
    verifyId: "ALA-SCRUM-8842",
    description: "",
  },
  systems_cert: {
    title: "Intelligent Systems & Machine Learning Engineer",
    authority: "Neural Cognitive Institute",
    date: "January 2026",
    verifyId: "NCI-ML-1104",
    description: "",
  },
  english_cert: {
    title: "B1 English CEFR Proficiency Credentials",
    authority: "European Language Framework",
    date: "March 2025",
    verifyId: "CEFR-ENG-B1-504",
    description: "International standard verification validating independent English language competencies in technical document writing, speaking, and collaboration.",
  },
};

// Eagerly glob import all images and .json sidecar metadata files inside src/certificates
const certImages = import.meta.glob("../../certificates/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}", { eager: true });
const certMetadata = import.meta.glob("../../certificates/*.json", { eager: true });

export function CertificatesGallery() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Convert the dynamic imported assets glob map into structured React certificates list inside component
  const certificates = Object.keys(certImages).map((key, index) => {
    const fileNameWithExt = key.split("/").pop() || "";
    const fileName = fileNameWithExt.split(".").slice(0, -1).join(".");
    
    // Dynamic fallback formatting for titles: my_cert_name.png -> My Cert Name
    const fallbackTitle = fileName
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Resolve the image URL from Vite's imported module
    const imagePath = (certImages[key] as any)?.default || "";
    
    // Attempt to find a matching JSON sidecar file (e.g. my_cert.json for my_cert.png)
    const matchingMetaKey = Object.keys(certMetadata).find((metaKey) => {
      const metaFileName = metaKey.split("/").pop()?.split(".").slice(0, -1).join(".") || "";
      return metaFileName === fileName;
    });

    // Extract raw JSON content parsed eagerly by Vite
    const jsonMeta = matchingMetaKey ? (certMetadata[matchingMetaKey] as any).default || (certMetadata[matchingMetaKey] as any) : null;

    // Use translations for fallback metadata if key exists
    const translatedMeta = {
      title: t(`cert.meta.${fileName}.title`),
      authority: t(`cert.meta.${fileName}.authority`),
      date: t(`cert.meta.${fileName}.date`),
      description: t(`cert.meta.${fileName}.description`),
    };

    return {
      id: `cert-dyn-${index}`,
      title: jsonMeta?.title || (translatedMeta.title !== `cert.meta.${fileName}.title` ? translatedMeta.title : null) || customMetadata[fileName]?.title || fallbackTitle,
      authority: jsonMeta?.authority || (translatedMeta.authority !== `cert.meta.${fileName}.authority` ? translatedMeta.authority : null) || customMetadata[fileName]?.authority || t("cert.fallbackAuthority"),
      date: jsonMeta?.date || (translatedMeta.date !== `cert.meta.${fileName}.date` ? translatedMeta.date : null) || customMetadata[fileName]?.date || t("cert.fallbackDate"),
      verifyId: jsonMeta?.verifyId || customMetadata[fileName]?.verifyId || `VERIFY-ID-${index + 1045}`,
      image: imagePath,
      description: jsonMeta?.description || (translatedMeta.description !== `cert.meta.${fileName}.description` ? translatedMeta.description : null) || customMetadata[fileName]?.description || t("cert.fallbackDesc").replace("{fileNameWithExt}", fileNameWithExt),
    };
  });

  // Smooth Auto-Play Slideshow timer
  useEffect(() => {
    if (certificates.length <= 1 || isPaused || lightboxId !== null) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % certificates.length);
    }, 4500); // Progress to the next slide every 4.5 seconds

    return () => clearInterval(interval);
  }, [isPaused, lightboxId]);

  const handleNext = () => {
    if (certificates.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    if (certificates.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const currentLightbox = certificates.find((c) => c.id === lightboxId);

  return (
    <section
      id="certificates"
      className="relative py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header (Dynamic folder badge removed) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <span className="text-sm font-semibold text-indigo-400 font-sans tracking-wide block mb-2 animate-pulse">
            {t("cert.badge")}
          </span>
          <h2
            className="text-white font-bold tracking-tight font-sans"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            {t("cert.title")}
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-sans">
            {t("cert.desc")}
          </p>
        </motion.div>

        {certificates.length === 0 ? (
          /* Empty State fallback */
          <div className="text-center py-16 border border-dashed border-slate-800 bg-slate-950/20 rounded-2xl p-6">
            <p className="text-slate-500 font-mono text-sm">{t("cert.empty")}</p>
          </div>
        ) : (
          /* Dynamic Interactive Slide Gallery */
          <div className="relative max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            {/* Navigation Arrow Left */}
            <button
              onClick={() => { playClick(); handlePrev(); }}
              className="hidden md:flex p-3 rounded-full border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/60 backdrop-blur-sm cursor-pointer transition-all shrink-0 z-20"
              aria-label="Previous Certificate"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Certificate View Deck Wrapper */}
            <div 
              className="w-full overflow-hidden py-4 px-2"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center bg-slate-950/20 border border-slate-900/60 rounded-2xl p-6 md:p-8 backdrop-blur-md relative min-h-[520px] lg:min-h-[380px]">
                
                {/* Symmetrical active top accent glow */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px]"
                  style={{
                    background: "linear-gradient(to right, #6366f1, #3b82f6, transparent)",
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col lg:flex-row gap-8 items-center w-full"
                  >
                    {/* Left Column: Zoomable Image Card */}
                    <div className="w-full lg:w-[45%] shrink-0 group relative overflow-hidden rounded-xl border border-slate-850 bg-slate-950 shadow-2xl aspect-[4/3] flex items-center justify-center">
                      <img
                        src={certificates[activeSlide].image}
                        alt={certificates[activeSlide].title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      />
                      
                      {/* Image Hover overlay */}
                      <div 
                        className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                        onClick={() => { playClick(); setLightboxId(certificates[activeSlide].id); }}
                      >
                        <motion.div 
                          className="p-3.5 rounded-full bg-slate-900/90 border border-slate-800 text-white shadow-lg flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                        >
                          <ZoomIn className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs font-semibold font-sans tracking-wide">{t("cert.expand")}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Right Column: Certificate Details */}
                    <div className="w-full lg:w-[55%] flex flex-col justify-between self-stretch py-2">
                      <div>
                        <div className="flex items-center gap-2.5 mb-3.5">
                          <div className="p-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5">
                            <Award className="w-4 h-4 text-indigo-400 animate-pulse" />
                          </div>
                          <span className="text-[0.625rem] font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded uppercase font-mono">
                            {t("cert.verified")}
                          </span>
                        </div>

                        <h3 className="text-slate-100 font-bold tracking-tight text-lg md:text-xl font-sans mb-3.5 leading-snug">
                          {certificates[activeSlide].title}
                        </h3>

                        {certificates[activeSlide].description && (
                          <p className="text-slate-400 text-xs md:text-sm font-sans leading-relaxed mb-6">
                            {certificates[activeSlide].description}
                          </p>
                        )}
                      </div>

                      {/* Metadata tags */}
                      <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-800/40 mt-auto">
                        <div className="space-y-1">
                          <span className="flex items-center gap-1.5 text-[0.65rem] text-slate-500 font-medium uppercase font-mono tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            {t("cert.authority")}
                          </span>
                          <span className="block text-slate-200 text-xs font-semibold font-sans truncate">
                            {certificates[activeSlide].authority}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="flex items-center gap-1.5 text-[0.65rem] text-slate-500 font-medium uppercase font-mono tracking-wider">
                            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                            {t("cert.date")}
                          </span>
                          <span className="block text-slate-200 text-xs font-semibold font-sans truncate">
                            {certificates[activeSlide].date}
                          </span>
                        </div>

                        <div className="col-span-2 space-y-1 mt-1">
                          <span className="block text-[0.65rem] text-slate-500 font-medium uppercase font-mono tracking-wider">
                            {t("cert.verifyId")}
                          </span>
                          <span className="inline-block text-[0.65rem] font-bold font-mono tracking-tight bg-slate-900 border border-slate-850 text-indigo-300 px-2 py-1 rounded">
                            {certificates[activeSlide].verifyId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

            {/* Navigation Arrow Right */}
            <button
              onClick={handleNext}
              className="hidden md:flex p-3 rounded-full border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/60 backdrop-blur-sm cursor-pointer transition-all shrink-0 z-20"
              aria-label="Next Certificate"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Small Screen Nav Indicators */}
        {certificates.length > 0 && (
          <div className="flex md:hidden justify-center items-center gap-4 mt-6">
            <button onClick={() => { playClick(); handlePrev(); }} className="p-2 border border-slate-800 bg-slate-950/40 text-slate-400 rounded-full cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[0.65rem] font-bold text-slate-500 font-mono tracking-widest uppercase">
              {activeSlide + 1} / {certificates.length}
            </span>
            <button onClick={() => { playClick(); handleNext(); }} className="p-2 border border-slate-800 bg-slate-950/40 text-slate-400 rounded-full cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ================= LIGHTBOX OVERLAY MODAL ================= */}
      <AnimatePresence>
        {lightboxId && currentLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4"
            onClick={() => setLightboxId(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => { playClick(); setLightboxId(null); }}
              className="absolute top-6 right-6 p-2 rounded-full border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox content wrapper */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border border-slate-850 rounded-2xl bg-slate-950 overflow-hidden max-h-[70vh] flex items-center justify-center shadow-2xl">
                <img
                  src={currentLightbox.image}
                  alt={currentLightbox.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Details banner below image */}
              <div className="text-center max-w-2xl px-2">
                <h4 className="text-slate-100 font-bold text-base md:text-lg font-sans">
                  {currentLightbox.title}
                </h4>
                <p className="text-indigo-400 text-xs font-semibold font-sans mt-1">
                  {t("cert.authority")}: {currentLightbox.authority} • {currentLightbox.date}
                </p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="text-[0.625rem] font-bold font-mono bg-slate-900 border border-slate-850 text-slate-400 px-2 py-0.5 rounded uppercase tracking-wider">
                    {t("cert.verifyId")}: {currentLightbox.verifyId}
                  </span>
                  
                  <a
                    href={currentLightbox.image}
                    download={`${currentLightbox.title.toLowerCase().replace(/\s+/g, "_")}`}
                    className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold font-sans tracking-wide text-indigo-400 hover:text-white transition-colors cursor-pointer bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t("cert.download")}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
