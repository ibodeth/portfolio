import { motion } from "motion/react";
import { Eye, Cpu, Gamepad, Video, Terminal, MessageSquareCode } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const playClick = () => (window as any).playUiClick?.();

export function BentoGrid() {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const boxes = [
    {
      id: 1,
      title: t("skills.aiTitle"),
      tags: [t("skills.tag.ml"), t("skills.tag.nn"), t("skills.tag.cv"), "Python"],
      icon: Eye,
      color: "#6366f1", // indigo
      visual: "ml-cluster",
    },
    {
      id: 2,
      title: t("skills.backendTitle"),
      tags: [t("skills.tag.backend"), "Docker", "Linux", "C#"],
      icon: Terminal,
      color: "#a855f7", // purple
      visual: "backend-terminal",
    },
    {
      id: 3,
      title: t("skills.interactiveTitle"),
      tags: ["Unity Engine", t("skills.tag.gamedev"), t("skills.tag.physics")],
      icon: Gamepad,
      color: "#3b82f6", // blue
      visual: "game-nodes",
    },
    {
      id: 4,
      title: t("skills.edgeTitle"),
      tags: [t("skills.tag.micro"), "Raspberry Pi", "IoT", "Linux"],
      icon: Cpu,
      color: "#ef4444", // red/coral
      visual: "circuit",
    },
    {
      id: 5,
      title: t("skills.promptTitle"),
      tags: [t("skills.tag.llm"), "Vibe Coding", t("skills.tag.prompt"), t("skills.tag.proto")],
      icon: MessageSquareCode,
      color: "#f59e0b", // amber
      visual: "prompt-weights",
    },
    {
      id: 6,
      title: t("skills.mediaTitle"),
      tags: [t("skills.tag.video"), t("skills.tag.nle"), t("skills.tag.frontend")],
      icon: Video,
      color: "#10b981", // emerald
      visual: "timeline",
    },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex flex-col justify-center py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-sm font-semibold text-indigo-400 font-sans tracking-wide block mb-2 animate-pulse">
            {t("skills.badge")}
          </span>
          <h2
            className="text-white font-bold tracking-tight font-sans"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            {t("skills.title")}
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-sans">
            {t("skills.desc")}
          </p>
        </motion.div>

        {/* Bento Grid: 3 columns on large screens, 2 on medium, 1 on mobile. Perfectly symmetrical and filled! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {boxes.map((box, index) => {
            const isHovered = hoveredCard === box.id;
            return (
              <motion.div
                key={box.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                className="h-full"
                onMouseEnter={() => setHoveredCard(box.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={playClick}
              >
                <Card
                  className="h-full border border-slate-800/80 bg-slate-950/20 hover:bg-slate-900/20 hover:border-slate-700/60 backdrop-blur-md transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[360px]"
                  style={{
                    boxShadow: isHovered ? `0 0 25px -10px ${box.color}15` : "none",
                  }}
                >
                  {/* Subtle hover glow sphere */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${box.color}10, transparent 70%)`,
                    }}
                  />

                  {/* Top Header */}
                  <CardHeader className="p-6 pb-2 relative z-10 flex flex-row items-center justify-between space-y-0">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg border border-slate-800/60"
                          style={{
                            background: `${box.color}08`,
                            borderColor: `${box.color}15`,
                          }}
                        >
                          <box.icon className="w-5 h-5" style={{ color: box.color }} />
                        </div>
                        <h3
                          className="text-slate-100 font-semibold tracking-tight font-sans text-lg"
                        >
                          {box.title}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Content (Badges) */}
                  <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between relative z-10">
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {box.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="px-2.5 py-0.5 rounded-md border-slate-800/80 bg-slate-950/20 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-[0.7rem] font-sans"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Standardized, premium, minimal, functional visualizations */}
                    <div className="w-full h-28 overflow-hidden relative rounded-lg border border-slate-800/40 bg-slate-950/20 backdrop-blur-sm shadow-inner group">
                      
                      {/* 1. Intelligence / Real Deep Neural Network Visualizer */}
                      {box.visual === "ml-cluster" && (
                        <div className="absolute inset-0 flex flex-col justify-between p-3 select-none">
                          {/* Embedded CSS for real-time forward propagation pulses */}
                          <style>{`
                            @keyframes synapse-pulse-slow {
                              from { stroke-dashoffset: 40; }
                              to { stroke-dashoffset: 0; }
                            }
                            /* Pulse connections ONLY when the card is hovered */
                            .group:hover .synapse-path-pulse {
                              stroke-dasharray: 4, 12;
                              animation: synapse-pulse-slow 2s linear infinite;
                            }
                            @keyframes node-glow-pulse {
                              0%, 100% { transform: scale(1); opacity: 0.75; }
                              50% { transform: scale(1.35); opacity: 1; }
                            }
                            /* Pulse nodes ONLY when the card is hovered (GPU-accelerated scale+opacity, 0% SVG filter cost) */
                            .group:hover .neural-node-active {
                              transform-origin: center;
                              animation: node-glow-pulse 3s ease-in-out infinite;
                            }
                            @keyframes neon-electric-sweep {
                              from { stroke-dashoffset: 115; }
                              to { stroke-dashoffset: 0; }
                            }
                          `}</style>

                          <div className="flex justify-between items-center text-[0.55rem] font-mono text-slate-500 uppercase tracking-widest leading-none">
                            <span>DEEP_NEURAL_NETWORK_MLP</span>
                            <div className="flex items-center gap-1">
                              <span className="text-indigo-400 font-bold">{t("visual.ml.prop")}</span>
                              <span className={`w-1.5 h-1.5 rounded-full bg-indigo-500 ${isHovered ? "animate-ping" : ""}`} />
                            </div>
                          </div>

                          {/* Interactive Neural Net SVG */}
                          <div className="flex-1 w-full h-16 my-1 bg-slate-950/40 rounded border border-slate-900/60 overflow-hidden flex items-center justify-center relative">
                            <svg className="w-full h-full p-2" viewBox="0 0 200 100" fill="none">
                              {/* Synapses (Weight Connections) */}
                              {/* Layer 0 (x=25) to Layer 1 (x=75) */}
                              {[20, 40, 60, 80].map((y1) => 
                                [10, 30, 50, 70, 90].map((y2) => (
                                  <g key={`s0-1-${y1}-${y2}`}>
                                    <line x1="25" y1={y1} x2="75" y2={y2} stroke="#312e81" strokeWidth="0.5" opacity="0.25" />
                                    <line x1="25" y1={y1} x2="75" y2={y2} stroke="#6366f1" strokeWidth="0.7" className="synapse-path-pulse" opacity="0.35" />
                                  </g>
                                ))
                              )}
                              
                              {/* Layer 1 (x=75) to Layer 2 (x=125) */}
                              {[10, 30, 50, 70, 90].map((y1) => 
                                [10, 30, 50, 70, 90].map((y2) => (
                                  <g key={`s1-2-${y1}-${y2}`}>
                                    <line x1="75" y1={y1} x2="125" y2={y2} stroke="#3b0764" strokeWidth="0.5" opacity="0.25" />
                                    <line x1="75" y1={y1} x2="125" y2={y2} stroke="#a855f7" strokeWidth="0.7" className="synapse-path-pulse" opacity="0.35" style={{ animationDelay: "0.5s" }} />
                                  </g>
                                ))
                              )}

                              {/* Layer 2 (x=125) to Layer 3 (x=175) */}
                              {[10, 30, 50, 70, 90].map((y1) => 
                                [30, 50, 70].map((y2) => (
                                  <g key={`s2-3-${y1}-${y2}`}>
                                    <line x1="125" y1={y1} x2="175" y2={y2} stroke="#083344" strokeWidth="0.5" opacity="0.25" />
                                    <line x1="125" y1={y1} x2="175" y2={y2} stroke="#06b6d4" strokeWidth="0.7" className="synapse-path-pulse" opacity="0.35" style={{ animationDelay: "1s" }} />
                                  </g>
                                ))
                              )}

                              {/* Nodes Rendering */}
                              {/* Input Layer Nodes (Indigo, x=25) */}
                              {[20, 40, 60, 80].map((y, i) => (
                                <g key={`n0-${i}`} className="neural-node-active text-indigo-400" style={{ animationDelay: `${i * 0.2}s` }}>
                                  <circle cx="25" cy={y} r="3" fill="#6366f1" opacity="0.15" />
                                  <circle cx="25" cy={y} r="1.5" fill="#ffffff" stroke="#6366f1" strokeWidth="0.8" />
                                </g>
                              ))}

                              {/* Hidden Layer 1 Nodes (Purple, x=75) */}
                              {[10, 30, 50, 70, 90].map((y, i) => (
                                <g key={`n1-${i}`} className="neural-node-active text-purple-400" style={{ animationDelay: `${i * 0.15}s` }}>
                                  <circle cx="75" cy={y} r="3" fill="#a855f7" opacity="0.15" />
                                  <circle cx="75" cy={y} r="1.5" fill="#ffffff" stroke="#a855f7" strokeWidth="0.8" />
                                </g>
                              ))}

                              {/* Hidden Layer 2 Nodes (Fuchsia/Pink, x=125) */}
                              {[10, 30, 50, 70, 90].map((y, i) => (
                                <g key={`n2-${i}`} className="neural-node-active text-pink-400" style={{ animationDelay: `${i * 0.25}s` }}>
                                  <circle cx="125" cy={y} r="3" fill="#ec4899" opacity="0.15" />
                                  <circle cx="125" cy={y} r="1.5" fill="#ffffff" stroke="#ec4899" strokeWidth="0.8" />
                                </g>
                              ))}

                              {/* Output Layer Nodes (Cyan, x=175) */}
                              {[30, 50, 70].map((y, i) => (
                                <g key={`n3-${i}`} className="neural-node-active text-cyan-400" style={{ animationDelay: `${i * 0.3}s` }}>
                                  <circle cx="175" cy={y} r="3.5" fill="#06b6d4" opacity="0.2" />
                                  <circle cx="175" cy={y} r="1.8" fill="#ffffff" stroke="#06b6d4" strokeWidth="1" />
                                </g>
                              ))}
                            </svg>
                          </div>

                          <div className="text-[0.45rem] font-mono text-indigo-400 flex justify-between leading-none">
                            <span>OPTIMIZATION: AdamW [lr=1e-4]</span>
                            <span>{t("visual.ml.infer")}: 1.2ms</span>
                          </div>
                        </div>
                      )}

                      {/* 2. Systems & Backend Core (Dynamic API Terminal) */}
                      {box.visual === "backend-terminal" && (
                        <div className="absolute inset-0 flex flex-col justify-between p-3 select-none">
                          <div className="flex justify-between items-center text-[0.55rem] font-mono text-slate-500 uppercase tracking-widest leading-none">
                            <span>BACKEND_API_SERVICE</span>
                            <span className="text-purple-400 font-bold">UP</span>
                          </div>

                          {/* Interactive terminal output */}
                          <div className="relative w-full h-12 bg-slate-950/70 border border-slate-900/60 rounded p-1 font-mono text-[0.42rem] overflow-hidden flex flex-col justify-center gap-0.5">
                            <div className="flex items-center justify-between text-purple-300">
                              <span>GET /api/v1/cargo-pilot</span>
                              <span className="text-emerald-400">200 OK</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-400">
                              <span>POST /api/v1/load-distributor</span>
                              <span className="text-emerald-400 animate-pulse">201 OK</span>
                            </div>
                            <div className="text-slate-500 text-[0.36rem] truncate">
                              db.query("SELECT * FROM weight_balance") &rarr; 12ms
                            </div>
                          </div>

                          <div className="text-[0.45rem] font-mono text-purple-400 flex justify-between leading-none">
                            <span>DOCKER_PORT: 8080</span>
                            <span>SWAGGER_DOCS_ACTIVE</span>
                          </div>
                        </div>
                      )}

                      {/* 3. Interactive Environments & Game Dev (3D Pathfinder) */}
                      {box.visual === "game-nodes" && (
                        <div className="absolute inset-0 flex flex-col justify-between p-3 select-none">
                          <div className="flex justify-between items-center text-[0.55rem] font-mono text-slate-500 uppercase tracking-widest leading-none">
                            <span>PHYSICS_ENGINE_3D</span>
                            <span className="text-blue-400 font-bold">A* ACTIVE</span>
                          </div>
                          
                          {/* Integrated Pathfinder and Physics container */}
                          <div className="relative w-full h-12 flex items-center justify-center overflow-hidden border border-slate-900/60 bg-slate-950/40 rounded">
                            {/* Grid background */}
                            <div className="absolute inset-0 opacity-10" style={{
                              backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
                              backgroundSize: "8px 8px"
                            }} />

                            {/* Concentric gravity fields */}
                            <circle cx="50%" cy="50%" r="20" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="1.5 1.5" className="absolute opacity-30" />
                            <circle cx="50%" cy="50%" r="10" stroke="#3b82f6" strokeWidth="0.5" className="absolute opacity-20" />

                            {/* Pathfinder Trajectory */}
                            <svg className="absolute inset-0 w-full h-full text-blue-500" viewBox="0 0 100 50">
                              <path
                                d="M 10 35 L 30 15 L 50 35 L 70 15 L 90 35"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="1.2"
                                strokeDasharray="15, 100"
                                className="neon-glass-tube"
                                style={{
                                  animation: isHovered ? "neon-electric-sweep 4s linear infinite" : "none",
                                }}
                              />
                              <path d="M 10 35 L 30 15 L 50 35 L 70 15 L 90 35" fill="none" stroke="#3b82f6" strokeWidth="0.6" opacity="0.15" />
                            </svg>

                            {/* Floating collider sphere */}
                            <motion.div
                              className="w-4 h-4 rounded-full border border-blue-500/80 bg-blue-500/10 flex items-center justify-center relative z-10"
                              animate={isHovered ? {
                                y: [0, -5, 3, 0],
                                x: [0, 4, -4, 0]
                              } : { x: 0, y: 0 }}
                              transition={isHovered ? {
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              } : { duration: 0.2 }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            </motion.div>
                          </div>

                          <div className="text-[0.45rem] font-mono text-blue-400 flex justify-between leading-none">
                            <span>GRAVITY: v=[0, -9.81, 0]</span>
                            <span>HEURISTIC: MANHATTAN</span>
                          </div>
                        </div>
                      )}

                      {/* 4. Edge Devices & Hardware (Blinking Broadcom CPU Board GPIO) */}
                      {box.visual === "circuit" && (
                        <div className="absolute inset-0 flex items-center justify-between p-3 select-none">
                          {/* 1. Labeled CPU Chip block */}
                          <div className="w-[45%] h-full border border-slate-800 bg-slate-950/40 rounded-lg p-1.5 flex flex-col justify-between relative overflow-hidden shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                              <div className="w-12 h-12 border border-red-500 rounded-sm" />
                            </div>
                            <div className="flex justify-between items-center text-[0.48rem] font-mono text-red-400 font-semibold leading-none">
                              <span>{t("visual.edge.cpu")}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            </div>
                            <div className="my-0.5 text-center">
                              <span className="block text-[0.52rem] font-mono font-bold text-slate-300">
                                BCM2712
                              </span>
                            </div>
                            <div className="text-[0.45rem] font-mono text-slate-500 flex justify-between leading-none">
                              <span>I2C BUS</span>
                              <span>0x3C</span>
                            </div>
                          </div>

                          {/* 2. Labeled Board Signals & Blinking GPIO Pin grid */}
                          <div className="w-[55%] h-full pl-3 flex flex-col justify-between">
                            <span className="text-[0.55rem] font-mono text-slate-500 uppercase tracking-widest leading-none block">
                              {t("visual.edge.header")}
                            </span>
                            {/* Pin Matrix Grid */}
                            <div className="grid grid-cols-10 gap-0.5 w-full my-0.5">
                              {[...Array(20)].map((_, i) => {
                                const isGrounded = [3, 8, 14, 19].includes(i);
                                const isPower = [0, 1].includes(i);
                                const isActivePin = isHovered && [2, 5, 7, 11, 16].includes(i);
                                return (
                                  <motion.div
                                    key={i}
                                    className="h-1.5 w-1.5 rounded-full border border-slate-800"
                                    style={{
                                      backgroundColor: isPower
                                        ? "#ef4444"
                                        : isGrounded
                                        ? "#1e293b"
                                        : "#334155",
                                    }}
                                    animate={
                                      isActivePin
                                        ? {
                                            backgroundColor: ["#ef4444", "#3b82f6", "#ef4444"],
                                            scale: [1, 1.2, 1],
                                          }
                                        : undefined
                                    }
                                    transition={
                                      isHovered
                                        ? {
                                            duration: 1 + (i % 2) * 0.5,
                                            repeat: Infinity,
                                          }
                                        : { duration: 0 }
                                    }
                                  />
                                );
                              })}
                            </div>
                            <div className="flex justify-between items-center text-[0.48rem] font-mono text-slate-500 leading-none">
                              <span>SPI / UART active</span>
                              <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 5. Prompt Engineering & Vibe Coding (Prompt context weight parser) */}
                      {box.visual === "prompt-weights" && (
                        <div className="absolute inset-0 flex flex-col justify-between p-3 select-none">
                          <div className="flex justify-between items-center text-[0.55rem] font-mono text-slate-500 uppercase tracking-widest leading-none">
                            <span>LLM_CONTEXT_ENGINE</span>
                            <span className="text-amber-400 animate-pulse">VIBE ACTIVE</span>
                          </div>

                          {/* Dynamic slider prompts and streaming output */}
                          <div className="relative w-full h-12 bg-slate-950/60 border border-slate-900/60 rounded p-1.5 flex flex-col justify-between overflow-hidden">
                             {/* Sliders */}
                            <div className="flex items-center gap-2">
                              <span className="text-[0.38rem] font-mono text-slate-400 w-10">{t("visual.prompt.temp")}</span>
                              <div className="flex-1 h-1 bg-slate-800 rounded relative overflow-hidden">
                                <motion.div 
                                  className="absolute top-0 bottom-0 left-0 bg-amber-500" 
                                  animate={isHovered ? { width: ["70%", "85%", "60%", "70%"] } : { width: "70%" }} 
                                  transition={isHovered ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }} 
                                />
                              </div>
                            </div>
                            {/* Output streaming */}
                            <div className="text-[0.4rem] font-mono text-amber-300/90 truncate flex items-center gap-1 bg-amber-500/5 px-1 py-0.5 rounded border border-amber-500/10">
                              <span className={`w-1 h-1 rounded-full bg-amber-500 shrink-0 ${isHovered ? "animate-ping" : ""}`} />
                              <span>Prompt: "Optimize low-level hardware..."</span>
                            </div>
                          </div>

                          <div className="text-[0.45rem] font-mono text-amber-400 flex justify-between leading-none">
                            <span>{t("visual.prompt.tokens")}</span>
                            <span>SYSTEM_PROMPT: 98.4% weight</span>
                          </div>
                        </div>
                      )}

                      {/* 6. Creative Media & Web (waveform NLE Timeline + Tag animation!) */}
                      {box.visual === "timeline" && (
                        <div className="absolute inset-0 flex flex-col justify-between p-3 select-none">
                           <div className="flex justify-between items-center text-[0.55rem] font-mono text-slate-500 uppercase tracking-widest leading-none">
                            <span>NLE_TIMELINE & WEB</span>
                            <span className={`text-emerald-400 ${isHovered ? "animate-pulse" : ""}`}>120 FPS</span>
                          </div>

                          {/* Simplified Timeline */}
                          <div className="relative w-full h-12 bg-slate-950/60 border border-slate-900/60 rounded p-1 overflow-hidden flex flex-col justify-center gap-1">
                            {/* Playhead line scrolling across */}
                            <motion.div
                              className="absolute top-0 bottom-0 w-[1.5px] bg-emerald-400 z-10"
                              style={{ boxShadow: "0 0 8px #10b981" }}
                              animate={isHovered ? {
                                left: ["0%", "100%", "0%"],
                              } : { left: "0%" }}
                              transition={isHovered ? {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              } : { duration: 0 }}
                            />
                            
                            {/* HTML tags tag animation */}
                            <div className="h-3.5 rounded bg-emerald-500/5 border border-emerald-500/10 text-[0.35rem] font-mono text-emerald-400 px-1 truncate flex items-center justify-between">
                              <span>clip_car_det.mp4</span>
                              <span className="text-indigo-400 font-bold shrink-0">{`<div className="neon" />`}</span>
                            </div>
                            
                            {/* Audio Track A1 */}
                            <div className="h-3.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[0.35rem] font-mono text-emerald-400 px-1 truncate flex items-center">
                              <svg className="w-full h-1 text-emerald-500/40" viewBox="0 0 100 10">
                                <path d="M 0 5 Q 10 1, 20 8 Q 30 2, 40 9 Q 50 3, 60 8 Q 70 2, 80 9 Q 90 4, 100 5" fill="none" stroke="currentColor" strokeWidth="1" />
                              </svg>
                            </div>
                          </div>

                          <div className="text-[0.45rem] font-mono text-emerald-400 flex justify-between leading-none">
                            <span>{t("visual.media.speed")}</span>
                            <span>HTML5 / TAILWIND</span>
                          </div>
                        </div>
                      )}
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
