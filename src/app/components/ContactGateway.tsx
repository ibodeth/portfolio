import { motion } from "motion/react";
import { Mail, Github, Phone, Send, Loader2, Award, Linkedin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useLanguage } from "../context/LanguageContext";
import emailjs from "@emailjs/browser";

// ═══════════════════════════════════════════════════════════════════════════
// 📧 EmailJS Configuration
// ═══════════════════════════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

const playClick = () => (window as any).playUiClick?.();

export function ContactGateway() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contacts = [
    {
      label: t("contact.direct.email"),
      value: "ibodeth@proton.me",
      href: "mailto:ibodeth@proton.me",
      icon: Mail,
      color: "#3b82f6", // blue
    },
    {
      label: t("contact.direct.github"),
      value: "github.com/ibodeth",
      href: "https://github.com/ibodeth",
      icon: Github,
      color: "#a855f7", // purple
    },
    {
      label: t("contact.direct.linkedin"),
      value: "linkedin.com/in/ibrahimnuryaginli",
      href: "https://www.linkedin.com/in/ibrahimnuryaginli/",
      icon: Linkedin,
      color: "#0a66c2", // LinkedIn blue
    },
    {
      label: t("contact.direct.phone"),
      value: "546 610 90 04",
      href: "tel:+905466109004",
      icon: Phone,
      color: "#10b981", // emerald
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t("contact.toastFill"));
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          user_name: formData.name,
          name: formData.name,
          
          from_email: formData.email,
          user_email: formData.email,
          email: formData.email,
          reply_to: formData.email,
          
          subject: formData.subject || "Portfolio Contact",
          msg_subject: formData.subject || "Portfolio Contact",
          
          message: formData.message,
          msg: formData.message,
          
          time: new Date().toLocaleString("tr-TR"),
          to_email: "ibodeth@proton.me",
        },
        EMAILJS_PUBLIC_KEY
      );

      toast.success(t("contact.toastSuccess"));

      // Trigger celebratory visual confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#6366f1", "#a855f7", "#3b82f6", "#10b981"],
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("EmailJS error:", error);
      const errMsg = error?.text || error?.message || "Unknown error";
      toast.error(`${t("contact.toastError")} [EmailJS: ${errMsg}]`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center py-6 lg:pt-24 lg:pb-8 px-6 md:px-8 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-sm font-semibold text-indigo-400 font-sans tracking-wide block mb-1">
              {t("contact.badge")}
            </span>
            <h2
              className="text-white font-bold tracking-tight font-sans animate-pulse"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.35rem)",
              }}
            >
              {t("contact.title")}
            </h2>
            <p className="text-slate-400 mt-1 max-w-xl text-xs md:text-sm font-sans leading-relaxed">
              {t("contact.desc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Direct Contacts & Info (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4 self-stretch">
              <div className="space-y-4">
                <div>
                  <h3 className="text-slate-200 font-bold tracking-tight text-lg font-sans">
                    Doğrudan İletişim / Direct Channels
                  </h3>
                  <p className="text-slate-400 text-xs font-sans mt-1.5 leading-relaxed">
                    İş teklifleri, projeler veya sadece sohbet etmek için aşağıdaki kanallardan bana doğrudan ulaşabilirsiniz.
                  </p>
                </div>

                {/* Direct Stacked Channels */}
                <div className="space-y-2">
                  {contacts.map((contact, index) => {
                    const ContactIcon = contact.icon;
                    return (
                      <motion.a
                        key={index}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        onClick={playClick}
                        className="flex items-center justify-between border border-slate-800/80 rounded-xl p-3 bg-slate-900/10 hover:bg-slate-900/20 group hover:border-slate-700/60 cursor-pointer transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg border"
                            style={{
                              background: `${contact.color}08`,
                              borderColor: `${contact.color}15`,
                            }}
                          >
                            <ContactIcon className="w-4 h-4" style={{ color: contact.color }} />
                          </div>
                          <div>
                            <span className="block text-[0.6rem] text-slate-500 font-sans tracking-wider uppercase font-semibold">
                              {contact.label}
                            </span>
                            <span className="block text-xs text-slate-300 group-hover:text-white transition-colors font-mono mt-0.5">
                              {contact.value}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <Card className="border border-slate-800 bg-slate-950/20 backdrop-blur-md p-4.5 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-slate-200 font-semibold tracking-tight text-lg font-sans mb-3.5">
                    {t("contact.sendMessage")}
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="name" className="text-[10px] font-semibold text-slate-400 font-sans">
                          {t("contact.labelName")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("contact.placeholderName")}
                          className="w-full h-9 px-3 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-xs font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className="text-[10px] font-semibold text-slate-400 font-sans">
                          {t("contact.labelEmail")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t("contact.placeholderEmail")}
                          className="w-full h-9 px-3 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-xs font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="subject" className="text-[10px] font-semibold text-slate-400 font-sans">
                        {t("contact.labelSubject")}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t("contact.placeholderSubject")}
                        className="w-full h-9 px-3 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-xs font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="message" className="text-[10px] font-semibold text-slate-400 font-sans">
                        {t("contact.labelMessage")} <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={2.5}
                        placeholder={t("contact.placeholderMessage")}
                        className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-xs font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300 resize-none animate-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={playClick}
                      className="w-full h-9 text-xs text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-600/10 cursor-pointer font-sans font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-200" />
                          {t("contact.btnSending")}
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-indigo-200" />
                          {t("contact.btnSend")}
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 text-center border-t border-slate-900/80 pt-2.5"
        >
          <p className="text-slate-500 font-sans text-[10px]">
            {t("contact.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
