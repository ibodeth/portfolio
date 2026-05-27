import { motion } from "motion/react";
import { useState } from "react";
import { ChevronRight, Award, Briefcase, Gamepad2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useLanguage } from "../context/LanguageContext";

const playClick = () => (window as any).playUiClick?.();

export function OperationsCanvas() {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState<string | undefined>("op-1");

  const operations = [
    {
      id: "op-1",
      title: t("exp.op1Title"),
      role: t("exp.op1Role"),
      result: t("exp.op1Result"),
      badges: (t("exp.op1Badges") as any) || [],
      details: t("exp.op1Details"),
      icon: Award,
      color: "#6366f1",
    },
    {
      id: "op-2",
      title: t("exp.op2Title"),
      role: t("exp.op2Role"),
      result: t("exp.op2Result"),
      badges: (t("exp.op2Badges") as any) || [],
      details: t("exp.op2Details"),
      icon: Briefcase,
      color: "#a855f7",
    },
    {
      id: "op-3",
      title: t("exp.op3Title"),
      role: t("exp.op3Role"),
      result: t("exp.op3Result"),
      badges: (t("exp.op3Badges") as any) || [],
      details: t("exp.op3Details"),
      icon: Gamepad2,
      color: "#3b82f6",
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex flex-col justify-center py-6 lg:pt-24 lg:pb-8 px-4 sm:px-6 md:px-8 bg-transparent"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-sm font-semibold text-indigo-400 font-sans tracking-wide block mb-2">
            {t("exp.badge")}
          </span>
          <h2
            className="text-white font-bold tracking-tight font-sans"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            {t("exp.title")}
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-sans">
            {t("exp.desc")}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800/80 ml-4 md:ml-6 pl-6 md:pl-10 space-y-6">
          <Accordion
            type="single"
            collapsible
            value={activeItem}
            onValueChange={setActiveItem}
            className="w-full space-y-4"
          >
            {operations.map((op, index) => {
              const OpIcon = op.icon;
              const isActive = activeItem === op.id;

              return (
                <motion.div
                  key={op.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="relative group"
                >
                  {/* Timeline node icon */}
                  <div
                    className={`absolute -left-[43px] md:-left-[59px] top-4 w-9 h-9 rounded-full border transition-all duration-300 flex items-center justify-center z-10 ${
                      isActive
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/25 scale-105"
                        : "bg-slate-950 border-slate-800 text-slate-400 group-hover:border-slate-700"
                    }`}
                    style={{
                      backgroundColor: isActive ? op.color : "",
                      borderColor: isActive ? op.color : "",
                    }}
                  >
                    <OpIcon className="w-4 h-4" />
                  </div>

                  <Card
                    className={`border transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "border-slate-700/60 bg-slate-900/10 shadow-lg shadow-indigo-500/[0.01]"
                        : "border-slate-800/80 bg-slate-950/20 hover:bg-slate-900/10 hover:border-slate-800"
                    }`}
                  >
                    {/* Unified hover border light */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                        style={{ backgroundColor: op.color }}
                        layoutId="activeTimelineBorder"
                      />
                    )}

                    <CardContent className="p-0">
                      <AccordionItem value={op.id} className="border-none">
                        <AccordionTrigger onClick={playClick} className="w-full hover:no-underline px-5 py-4 text-left flex items-start justify-between gap-4 font-sans select-none outline-none">
                          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-slate-100 font-semibold tracking-tight text-[1.05rem] md:text-lg">
                                {op.title}
                              </h3>
                              <p className="text-slate-400 text-xs md:text-sm font-medium mt-0.5">
                                {op.role}
                              </p>
                            </div>
                            <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 pr-2">
                              <span className="text-indigo-400 text-xs md:text-sm font-mono tracking-tight font-medium" style={{ color: op.color }}>
                                {op.result}
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {op.badges.map((badge) => (
                                  <Badge
                                    key={badge}
                                    className="px-2.5 py-0.5 rounded-md border-slate-800/80 bg-slate-950/20 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-[0.7rem] font-sans"
                                    variant="outline"
                                  >
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5 pt-0 border-t border-slate-800/40 bg-slate-950/10 text-slate-400 text-sm font-sans leading-relaxed">
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {op.details}
                          </motion.div>
                        </AccordionContent>
                      </AccordionItem>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
