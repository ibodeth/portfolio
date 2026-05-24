import { motion } from "motion/react";
import { Mail, Github, Phone, GraduationCap, Send, Loader2, Award, Linkedin } from "lucide-react";
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
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
// 3. Create an Email Template with these variables:
//    {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    Set "To Email" to: ibodeth@proton.me, ibrahimnuryaginli2007@gmail.com
// 4. Go to Account → General → copy your Public Key
// 5. Replace the values below:
// ═══════════════════════════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""; // ← Replace with your EmailJS public key

const playClick = () => (window as any).playUiClick?.();

export function ContactGateway() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const academic = [
    {
      institution: t("contact.neuInstitution"),
      program: t("contact.neuProgram"),
      period: t("contact.neuPeriod"),
      details: t("contact.neuDetails"),
    },
    {
      institution: t("contact.hsInstitution"),
      program: t("contact.hsProgram"),
      period: t("contact.hsPeriod"),
      details: t("contact.hsDetails"),
    },
  ];

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
      value: "+90 546 185 90 03",
      href: "tel:+905461859003",
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
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-8 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-sm font-semibold text-indigo-400 font-sans tracking-wide block mb-2">
              {t("contact.badge")}
            </span>
            <h2
              className="text-white font-bold tracking-tight font-sans"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
              }}
            >
              {t("contact.title")}
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base font-sans">
              {t("contact.desc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Academic Credentials (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3.5 mb-2">
                <GraduationCap className="w-6 h-6 text-indigo-500" />
                <h3 className="text-slate-200 font-semibold tracking-tight text-xl font-sans">
                  {t("contact.academicTitle")}
                </h3>
              </div>

              {academic.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Card className="border border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/15 transition-all duration-300">
                    <CardHeader className="p-5 pb-2">
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-slate-100 font-semibold tracking-tight text-[1.02rem] md:text-base font-sans">
                          {item.institution}
                        </CardTitle>
                        <span className="text-indigo-400 text-xs font-mono shrink-0 font-medium">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs md:text-sm font-sans font-medium mt-0.5">
                        {item.program}
                      </p>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                        {item.details}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Language Proficiency Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="border border-slate-800/80 bg-slate-900/10 hover:bg-slate-900/15 transition-all duration-300">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-100 font-semibold text-sm md:text-base font-sans">
                        {t("contact.langCard")}
                      </span>
                    </div>
                    <Badge
                      className="border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/10 text-emerald-400 text-[0.75rem] font-mono tracking-tight font-semibold py-0.5 px-3 rounded"
                      variant="outline"
                    >
                      {t("contact.langLevel")}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column: Interactive Form & Direct Contacts (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="border border-slate-800 bg-slate-950/20 backdrop-blur-md p-6">
                <h3 className="text-slate-200 font-semibold tracking-tight text-xl font-sans mb-5">
                  {t("contact.sendMessage")}
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-400 font-sans">
                        {t("contact.labelName")} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t("contact.placeholderName")}
                        className="w-full h-10 px-3.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-sm font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-400 font-sans">
                        {t("contact.labelEmail")} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t("contact.placeholderEmail")}
                        className="w-full h-10 px-3.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-sm font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-slate-400 font-sans">
                      {t("contact.labelSubject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t("contact.placeholderSubject")}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-sm font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-400 font-sans">
                      {t("contact.labelMessage")} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={t("contact.placeholderMessage")}
                      className="w-full px-3.5 py-3 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-100 text-sm font-sans placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={playClick}
                    className="w-full h-10 text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-600/10 cursor-pointer font-sans font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-200" />
                        {t("contact.btnSending")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-indigo-200" />
                        {t("contact.btnSend")}
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              {/* Direct Channels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {contacts.map((contact, index) => {
                  const ContactIcon = contact.icon;
                  return (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      onMouseEnter={undefined}
                      onClick={playClick}
                      className="flex flex-col items-center justify-center text-center border border-slate-800/80 rounded-xl p-3 bg-slate-950/20 hover:bg-slate-900/20 group hover:border-slate-700/80 cursor-pointer transition-all duration-300"
                    >
                      <div
                        className="p-2 rounded-lg border mb-2"
                        style={{
                          background: `${contact.color}08`,
                          borderColor: `${contact.color}15`,
                        }}
                      >
                        <ContactIcon className="w-4.5 h-4.5" style={{ color: contact.color }} />
                      </div>
                      <div className="overflow-hidden w-full">
                        <span className="block text-[0.625rem] text-slate-500 font-sans tracking-wider uppercase font-medium">
                          {contact.label}
                        </span>
                        <span className="block text-[0.7rem] text-slate-300 group-hover:text-white transition-colors truncate font-mono mt-0.5 px-1">
                          {contact.value}
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-20 text-center border-t border-slate-900/80 pt-8"
        >
          <p className="text-slate-500 font-sans text-xs">
            {t("contact.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
