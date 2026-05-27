import { motion } from "motion/react";
import { GraduationCap, Calendar, BookOpen, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useLanguage } from "../context/LanguageContext";

const playClick = () => (window as any).playUiClick?.();

export function EducationSection() {
  const { t, lang } = useLanguage();

  const academic = [
    {
      institution: t("contact.neuInstitution"),
      program: t("contact.neuProgram"),
      period: t("contact.neuPeriod"),
      details: t("contact.neuDetails"),
      icon: GraduationCap,
      color: "#6366f1", // Indigo
    },
    {
      institution: t("contact.hsInstitution"),
      program: t("contact.hsProgram"),
      period: t("contact.hsPeriod"),
      details: t("contact.hsDetails"),
      icon: BookOpen,
      color: "#10b981", // Emerald
    },
    {
      institution: t("contact.langCard"),
      program: t("contact.langLevel"),
      period: "CEFR B1",
      details: lang === "tr"
        ? "Teknik doküman okuma, yabancı kaynak araştırmaları, yazılı iletişim ve küresel yazılım toplulukları ile aktif işbirliği yeteneği."
        : "Technical document reading, research capabilities, written communication, and active collaboration with global software communities.",
      icon: Award,
      color: "#f59e0b", // Amber
    },
  ];

  return (
    <section
      id="education"
      className="relative min-h-screen w-full flex flex-col justify-center py-6 lg:pt-24 lg:pb-8 px-4 sm:px-6 md:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-left"
        >
          <span className="text-sm font-semibold text-indigo-400 font-sans tracking-wide block mb-2">
            {t("contact.academicTitle")}
          </span>
          <h2
            className="text-white font-bold tracking-tight font-sans"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            {t("contact.academicTitle")}
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-sans">
            {t("edu.desc")}
          </p>
        </motion.div>

        {/* Education & Language Symmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {academic.map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="relative group h-full"
              >
                {/* Glassmorphic Floating Card */}
                <Card 
                  onClick={playClick}
                  className="h-full border border-slate-800/80 bg-slate-950/20 hover:bg-slate-900/15 hover:border-slate-700/60 backdrop-blur-md transition-all duration-300 relative overflow-hidden cursor-pointer shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex flex-col justify-between"
                >
                  {/* Subtle top accent line */}
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(to right, ${item.color}, transparent)`,
                    }}
                  />

                  <CardContent className="p-4.5 flex flex-col justify-between h-full flex-1">
                    <div>
                      {/* Header block with Icon, Info and Date */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2.5 rounded-lg border border-slate-800/60 shrink-0"
                            style={{
                              background: `${item.color}08`,
                              borderColor: `${item.color}15`,
                            }}
                          >
                            <ItemIcon className="w-5 h-5 shrink-0" style={{ color: item.color }} />
                          </div>
                          <div>
                            <h3 className="text-slate-100 font-bold tracking-tight text-[1.05rem] font-sans leading-snug">
                              {item.institution}
                            </h3>
                            <p className="text-slate-400 text-xs font-sans font-medium mt-0.5" style={{ color: item.color }}>
                              {item.program}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 self-start px-2.5 py-0.5 rounded bg-slate-900/60 border border-slate-800/40">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-slate-400 text-[0.68rem] font-mono font-medium">
                            {item.period}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans mt-3 pt-3 border-t border-slate-900/60">
                        {item.details}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
