import { motion } from "motion/react";
import { Terminal, Mic, Battery, ArrowUpRight, Cpu, Music, Eye, Briefcase } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../context/LanguageContext";

const playClick = () => (window as any).playUiClick?.();

export function ProjectVault() {
  const { t } = useLanguage();

  const featuredProject = {
    id: "proj-cargo",
    name: "Divizyon Cargo Pilot",
    role: t("proj.featuredRole"),
    description: t("proj.featuredDesc"),
    stack: ["Golang", "Docker", "Swagger", "SQL", "Agile", "Scrum", "Kanban"],
    icon: Briefcase,
    color: "#6366f1", // indigo accent
    github: "https://cargopilot.divizyon.org/", // live project link
  };

  const projects = [
    {
      id: "proj-2",
      name: "NoteMaster",
      description: t("proj.noteMasterDesc"),
      stack: ["Flutter", "Dart", "Python", "OpenCV", "Gemini AI"],
      icon: Terminal,
      color: "#6366f1", // indigo
      github: "https://github.com/ibodeth/NoteMasterAI",
    },
    {
      id: "proj-3",
      name: "Blink",
      description: t("proj.blinkDesc"),
      stack: ["Python", "PyQt5", "Gemini API", "Picovoice", "Edge TTS"],
      icon: Mic,
      color: "#a855f7", // purple
      github: "https://github.com/ibodeth/Blink",
    },
    {
      id: "proj-4",
      name: "Agro-ML Predictor",
      description: t("proj.agroDesc"),
      stack: ["Python", "Scikit-Learn", "SMOTE", "SHAP", "Pandas"],
      icon: Eye,
      color: "#10b981", // emerald
      github: "https://github.com/ibodeth/agro-cevresel-simulasyon-verisiyle-bitki-sagliginin-cok-hedefli-makine-ogrenmesi-ile-tahmini",
    },
    {
      id: "proj-5",
      name: "NVIDIA Linux Battery Optimizer",
      description: t("proj.nvidiaDesc"),
      stack: ["Bash", "udev", "nvidia-smi", "Systemd"],
      icon: Battery,
      color: "#3b82f6", // blue
      github: "https://github.com/ibodeth/nvidia-laptop-battery-optimizer",
    },
  ];

  const handleCardClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const FeaturedIcon = featuredProject.icon;

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex flex-col justify-center py-6 lg:pt-24 lg:pb-8 px-4 sm:px-6 md:px-8 bg-transparent overflow-hidden"
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
          <span className="text-sm font-semibold text-indigo-400 font-sans tracking-wide block mb-2 animate-pulse">
            {t("proj.badge")}
          </span>
          <h2
            className="text-white font-bold tracking-tight font-sans"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            {t("proj.title")}
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-sans">
            {t("proj.desc")}
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="space-y-6">
          {/* 1. Featured Spotlight Project Banner (Cargo Pilot) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="w-full cursor-pointer select-none"
            onClick={() => { playClick(); handleCardClick(featuredProject.github); }}
          >
            <Card className="border border-indigo-500/30 bg-indigo-950/10 hover:bg-indigo-950/15 hover:border-indigo-500/50 backdrop-blur-md transition-all duration-300 relative overflow-hidden p-5 md:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Symmetrical active top glow line */}
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: "linear-gradient(to right, #6366f1, #3b82f6, transparent)",
                }}
              />
              
              <div className="flex-1">
                {/* Featured Pill & Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5">
                    <FeaturedIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[0.625rem] font-bold tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 uppercase font-mono">
                    {t("proj.featuredBadge")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-slate-100 font-bold tracking-tight text-xl md:text-2xl font-sans group-hover:text-white mb-2">
                  {featuredProject.name}
                </h3>
                <span className="text-slate-400 text-xs font-mono tracking-tight block mb-3">
                  {featuredProject.role}
                </span>

                {/* Description */}
                <p className="text-slate-300 text-xs md:text-sm font-sans leading-relaxed max-w-4xl mb-6">
                  {featuredProject.description}
                </p>

                {/* Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/40">
                  {featuredProject.stack.map((tech) => (
                    <Badge
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md border-slate-800/80 bg-slate-950/20 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-[0.7rem] font-sans"
                      variant="outline"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Button Indicator */}
              <div className="shrink-0 flex items-center justify-center p-3 rounded-full border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors self-end md:self-center">
                <ArrowUpRight className="w-5 h-5 text-indigo-400" />
              </div>
            </Card>
          </motion.div>

          {/* 2. Symmetrical 4-Column Grid for Open Source Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((project, index) => {
              const ProjIcon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Card
                    onClick={() => { playClick(); handleCardClick(project.github); }}
                    className="h-full border border-slate-800/80 bg-slate-950/20 hover:bg-slate-900/20 hover:border-slate-700/60 backdrop-blur-md transition-all duration-300 relative overflow-hidden group flex flex-col justify-between p-4.5 cursor-pointer select-none"
                  >
                    {/* Subtle top glow accent */}
                    <div
                      className="absolute inset-x-0 top-0 h-[3px] opacity-40 transition-opacity group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(to right, ${project.color}, transparent)`,
                      }}
                    />

                    <div>
                      {/* Header: Icon & Top Action */}
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className="p-2 rounded-lg border"
                          style={{
                            background: `${project.color}08`,
                            borderColor: `${project.color}15`,
                          }}
                        >
                          <ProjIcon className="w-5 h-5" style={{ color: project.color }} />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-slate-100 font-semibold tracking-tight text-lg md:text-xl font-sans group-hover:text-white mb-3">
                        {project.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-slate-400 text-xs md:text-sm font-sans leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer: Badges */}
                    <div>
                      {/* Stack tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/30">
                        {project.stack.map((tech) => (
                          <Badge
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md border-slate-800/80 bg-slate-950/20 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-[0.7rem] font-sans"
                            variant="outline"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
