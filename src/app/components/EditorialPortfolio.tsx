import emailjs from "@emailjs/browser";
import { motion, useReducedMotion } from "motion/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SignalGlyph, SoftSignalScene } from "./SoftSignalScene";

type Copy = {
  locale: string;
  cv: string;
  intro: string;
  availability: string;
  location: string;
  languageLabel: string;
  projectsTitle: string;
  projectsIntro: string;
  experienceTitle: string;
  experienceIntro: string;
  skillsTitle: string;
  educationTitle: string;
  credentialsTitle: string;
  credentialsIntro: string;
  referenceTitle: string;
  referenceBody: string;
  referenceLink: string;
  contactTitle: string;
  contactIntro: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  send: string;
  sending: string;
  optional: string;
  nameError: string;
  emailError: string;
  messageError: string;
  success: string;
  failure: string;
  close: string;
  ongoing: string;
  openProject: string;
  certificateId: string;
  signoff: string;
  postscript: string;
};

type Project = {
  year: string;
  name: string;
  description: string;
  stack: string;
  href?: string;
  status?: string;
};

type Experience = {
  period: string;
  company: string;
  role: string;
  description: string;
  href?: string;
};

type CredentialMetadata = {
  title?: string;
  authority?: string;
  issuer?: string;
  date?: string;
  issue_date?: string;
  verifyId?: string;
  credential_id?: string;
};

type Credential = {
  fileName: string;
  title: string;
  authority: string;
  date: string;
  verifyId: string;
  image: string;
};

const COPY: Record<"tr" | "en", Copy> = {
  tr: {
    locale: "tr-TR",
    cv: "CV / PDF",
    intro:
      "Lojistik, elektrikli araç şarjı ve müşteri desteği için .NET, Python, FastAPI, MSSQL, bilgisayarlı görü ve LLM tabanlı sistemler geliştiriyorum.",
    availability: "Monokon’da yapay zeka ve dijital dönüşüm stajyeri",
    location: "Konya, Türkiye",
    languageLabel: "Dil",
    projectsTitle: "Seçili işler",
    projectsIntro:
      "Yük planlama, masaüstü otomasyonu, sınav değerlendirme ve tarımsal veri projeleri.",
    experienceTitle: "Deneyim",
    experienceIntro:
      "2026’da lojistik, bilgi teknolojileri ve elektrikli araç altyapısında üstlendiğim roller.",
    skillsTitle: "Çalıştığım araçlar",
    educationTitle: "Eğitim",
    credentialsTitle: "Belgeler",
    credentialsIntro:
      "Program katılımları, teknik eğitimler ve doğrulanabilir başarı belgeleri.",
    referenceTitle: "TNC Group referansı",
    referenceBody:
      "TNC Group, 13 Nisan–18 Mayıs 2026 tarihli programda Excel, AutoCAD, Python ve Blender çalışmalarımı değerlendirdi.",
    referenceLink: "Referans mektubunu aç",
    contactTitle: "İletişim",
    contactIntro:
      "İş, staj ve ürün geliştirme konuşmaları için e-posta gönderebilir veya formu kullanabilirsiniz.",
    nameLabel: "Ad soyad",
    emailLabel: "E-posta adresi",
    subjectLabel: "Konu",
    messageLabel: "Mesaj",
    send: "Mesajı gönder",
    sending: "Gönderiliyor…",
    optional: "isteğe bağlı",
    nameError: "Mesajı kimin gönderdiğini yazın.",
    emailError: "Geçerli bir e-posta adresi yazın.",
    messageError: "Ne hakkında konuşmak istediğinizi yazın.",
    success: "Mesaj gönderildi. E-postayla dönüş yapacağım.",
    failure:
      "Mesaj gönderilemedi. Doğrudan ibodeth@proton.me adresine yazabilirsiniz.",
    close: "Kapat",
    ongoing: "Devam ediyor",
    openProject: "Projeyi aç",
    certificateId: "Belge no",
    signoff: "Görüşmek üzere,",
    postscript: "Portfolyo Temmuz 2026’da güncellendi.",
  },
  en: {
    locale: "en-US",
    cv: "Résumé / PDF",
    intro:
      "I build systems for logistics, EV charging, and customer support with .NET, Python, FastAPI, MSSQL, computer vision, and LLMs.",
    availability: "AI & Digital Transformation Intern at Monokon",
    location: "Konya, Türkiye",
    languageLabel: "Language",
    projectsTitle: "Selected work",
    projectsIntro:
      "Load planning, desktop automation, exam assessment, and agricultural-data projects.",
    experienceTitle: "Experience",
    experienceIntro:
      "Roles across logistics, information technology, and EV infrastructure in 2026.",
    skillsTitle: "Tools I work with",
    educationTitle: "Education",
    credentialsTitle: "Credentials",
    credentialsIntro:
      "Programme participation, technical training, and verifiable certificates.",
    referenceTitle: "TNC Group reference",
    referenceBody:
      "TNC Group reviewed my Excel, AutoCAD, Python, and Blender work during its 13 April–18 May 2026 programme.",
    referenceLink: "Open the reference letter",
    contactTitle: "Contact",
    contactIntro:
      "For work, internships, or product development, email me directly or use the form.",
    nameLabel: "Full name",
    emailLabel: "Email address",
    subjectLabel: "Subject",
    messageLabel: "Message",
    send: "Send message",
    sending: "Sending…",
    optional: "optional",
    nameError: "Tell me who is sending the message.",
    emailError: "Enter a valid email address.",
    messageError: "Tell me what you would like to discuss.",
    success: "Message sent. I’ll reply by email.",
    failure:
      "The message could not be sent. Email ibodeth@proton.me directly instead.",
    close: "Close",
    ongoing: "In progress",
    openProject: "Open project",
    certificateId: "Credential ID",
    signoff: "Speak soon,",
    postscript: "Portfolio updated in July 2026.",
  },
};

const PROJECTS: Record<"tr" | "en", Project[]> = {
  tr: [
    {
      year: "2026",
      name: "CargoPilot",
      description:
        "Yaklaşık 25 kişilik çevik ekipte lojistik ve yük planlama ihtiyaçlarının çalışan bir ürüne dönüşmesine backend tarafında katkı.",
      stack: ".NET · MSSQL · REST API · Docker · Kanban",
      href: "https://cargopilot.divizyon.org/",
    },
    {
      year: "2026–",
      name: "Zelgent AI",
      description:
        "Shopify mağazaları için ürün, stok, fiyat ve mağaza politikalarını kullanan ajan tabanlı satış ve müşteri destek sistemi.",
      stack: "LLM ajanları · Shopify · Ürün geliştirme",
      status: "Devam ediyor",
    },
    {
      year: "2026",
      name: "Blink",
      description:
        "Sesli komut, ekran analizi ve sistem kontrolünü güvenli bir komut altyapısında birleştiren masaüstü asistanı.",
      stack: "Python · PyQt5 · Gemini API · Edge TTS",
      href: "https://github.com/ibodeth/Blink",
    },
    {
      year: "2025",
      name: "NoteMaster",
      description:
        "Sınav kâğıtlarını OpenCV ve Gemini ile analiz eden, kısmi puanlama yapabilen değerlendirme asistanı.",
      stack: "Flutter · Python · OpenCV · Gemini",
      href: "https://github.com/ibodeth/NoteMasterAI",
    },
    {
      year: "2025",
      name: "Agro-ML Predictor",
      description:
        "Toprak sensörü verilerinden bitki sağlık riski, stres düzeyi ve uygunluk puanı üreten çok hedefli ML pipeline’ı.",
      stack: "Python · scikit-learn · SMOTE · SHAP",
      href:
        "https://github.com/ibodeth/agro-cevresel-simulasyon-verisiyle-bitki-sagliginin-cok-hedefli-makine-ogrenmesi-ile-tahmini",
    },
  ],
  en: [
    {
      year: "2026",
      name: "CargoPilot",
      description:
        "Backend contribution in an agile team of roughly 25 people, turning logistics and load-planning requirements into a working product.",
      stack: ".NET · MSSQL · REST API · Docker · Kanban",
      href: "https://cargopilot.divizyon.org/",
    },
    {
      year: "2026–",
      name: "Zelgent AI",
      description:
        "An agent-based sales and support system for Shopify stores, grounded in product, stock, price, and store-policy data.",
      stack: "LLM agents · Shopify · Product development",
      status: "In progress",
    },
    {
      year: "2026",
      name: "Blink",
      description:
        "A desktop assistant combining voice commands, screen analysis, and system control through a constrained command layer.",
      stack: "Python · PyQt5 · Gemini API · Edge TTS",
      href: "https://github.com/ibodeth/Blink",
    },
    {
      year: "2025",
      name: "NoteMaster",
      description:
        "An assessment assistant that reads exam papers with OpenCV and Gemini and supports partial scoring.",
      stack: "Flutter · Python · OpenCV · Gemini",
      href: "https://github.com/ibodeth/NoteMasterAI",
    },
    {
      year: "2025",
      name: "Agro-ML Predictor",
      description:
        "A multi-target ML pipeline estimating plant-health risk, stress level, and suitability from soil-sensor data.",
      stack: "Python · scikit-learn · SMOTE · SHAP",
      href:
        "https://github.com/ibodeth/agro-cevresel-simulasyon-verisiyle-bitki-sagliginin-cok-hedefli-makine-ogrenmesi-ile-tahmini",
    },
  ],
};

const EXPERIENCE: Record<"tr" | "en", Experience[]> = {
  tr: [
    {
      period: "Haz–Ağu 2026",
      company: "Monokon Elektrikli Şarj İstasyonları",
      role: "Yapay Zekâ ve Dijital Dönüşüm Stajyeri",
      description:
        "Elektrikli araç şarj sistemleri için kestirimci bakım prototipi; dijitalleşme ve yapay zeka altyapısı için teknik yol haritası desteği.",
    },
    {
      period: "Mar–May 2026",
      company: "Divizyon & Uçak Yazılım",
      role: "Backend Geliştirici",
      description:
        "Lojistik ve yük planlama gereksinimlerini geliştirme görevlerine dönüştürme, sorumlu olunan modülleri ürüne entegre etme.",
      href: "https://cargopilot.divizyon.org/",
    },
    {
      period: "Nis–May 2026",
      company: "TNC Group · Arch of Sigma",
      role: "Bilgi Teknolojileri Stajyeri",
      description:
        "Excel, AutoCAD, Python ve Blender’ı veri işleme, teknik çizim, temel otomasyon ve 3B modellemede birleştiren uygulamalı program.",
    },
    {
      period: "Devam ediyor",
      company: "Tılsım Creative",
      role: "Ortak Kurucu ve Yazılım Geliştirici",
      description:
        "Şirketler için web sitesi, yapay zeka çözümü ve tanıtım içeriği geliştiriyorum.",
    },
  ],
  en: [
    {
      period: "Jun–Aug 2026",
      company: "Monokon EV Charging Stations",
      role: "AI & Digital Transformation Intern",
      description:
        "A predictive-maintenance prototype for EV charging systems and technical roadmap support for AI and digital infrastructure.",
    },
    {
      period: "Mar–May 2026",
      company: "Divizyon & Uçak Yazılım",
      role: "Backend Developer",
      description:
        "Translated logistics and load-planning requirements into development tasks and integrated assigned modules into the product.",
      href: "https://cargopilot.divizyon.org/",
    },
    {
      period: "Apr–May 2026",
      company: "TNC Group · Arch of Sigma",
      role: "Information Technology Intern",
      description:
        "An applied programme combining Excel, AutoCAD, Python, and Blender for data work, technical drawing, automation, and 3D modelling.",
    },
    {
      period: "Ongoing",
      company: "Tılsım Creative",
      role: "Co-founder & Software Developer",
      description:
        "I build websites, AI solutions, and promotional content for companies.",
    },
  ],
};

const SKILLS: Record<"tr" | "en", Array<{ title: string; body: string }>> = {
  tr: [
    {
      title: "Yapay zeka ve veri",
      body: "Makine öğrenmesi · Veri analizi · Bilgisayarlı görü · LLM orkestrasyon ve ajanlar · Fine-tuning",
    },
    {
      title: "Backend",
      body: "Python · C# · TypeScript · FastAPI · .NET 8 · REST API · MSSQL · WebSocket · CQRS",
    },
    {
      title: "Frontend ve mobil",
      body: "React · Flutter · React Native · Tailwind CSS · Shadcn",
    },
    {
      title: "DevOps ve araçlar",
      body: "Docker · Nginx · Git/GitHub · Linux · Raspberry Pi · Arduino · Unity · Blender · AutoCAD",
    },
  ],
  en: [
    {
      title: "AI and data",
      body: "Machine learning · Data analysis · Computer vision · LLM orchestration and agents · Fine-tuning",
    },
    {
      title: "Backend",
      body: "Python · C# · TypeScript · FastAPI · .NET 8 · REST API · MSSQL · WebSocket · CQRS",
    },
    {
      title: "Frontend and mobile",
      body: "React · Flutter · React Native · Tailwind CSS · Shadcn",
    },
    {
      title: "DevOps and tools",
      body: "Docker · Nginx · Git/GitHub · Linux · Raspberry Pi · Arduino · Unity · Blender · AutoCAD",
    },
  ],
};

const CERTIFICATE_TRANSLATIONS: Record<
  string,
  { title: string; authority: string }
> = {
  "Arch Of Sigma Bilgi Teknolojileri Stajı": {
    title: "Arch of Sigma Information Technology Internship",
    authority: "TNC Group · Arch of Sigma",
  },
  "genc2030-yapay-zeka-atolyesi": {
    title: "GENC2030 Digital Skills & AI Workshop",
    authority: "Ministry of Youth and Sports",
  },
  "Savunma Sanayii Kampüs": {
    title: "Defence Industry Campus Participation Certificate",
    authority: "Defence Industry Academy",
  },
  Uygulamalı_İstatistik_Okulu: {
    title: "Applied Statistics School Certificate",
    authority: "Turkish Statistical Institute · Social Innovation Agency",
  },
  "datathon-2026": {
    title: "Datathon 2026 Participation Certificate",
    authority: "BTK Academy · Google · Entrepreneurship Foundation",
  },
  "coderspace-teknoloji-zirvesi": {
    title: "Coderspace Technology Summit",
    authority: "Coderspace",
  },
};

const CERTIFICATE_DATES: Record<
  string,
  { tr: string; en: string }
> = {
  "Arch Of Sigma Bilgi Teknolojileri Stajı": {
    tr: "Mayıs 2026",
    en: "May 2026",
  },
  "genc2030-yapay-zeka-atolyesi": {
    tr: "1 Haziran 2026",
    en: "1 June 2026",
  },
  "Savunma Sanayii Kampüs": {
    tr: "Şubat 2026",
    en: "February 2026",
  },
  Uygulamalı_İstatistik_Okulu: {
    tr: "Nisan 2026",
    en: "April 2026",
  },
  "datathon-2026": {
    tr: "9–14 Haziran 2026",
    en: "9–14 June 2026",
  },
  "coderspace-teknoloji-zirvesi": {
    tr: "10 Haziran 2026",
    en: "10 June 2026",
  },
};

const certificateImages = import.meta.glob(
  "../../certificates/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const certificateMetadata = import.meta.glob("../../certificates/*.json", {
  eager: true,
  import: "default",
}) as Record<string, CredentialMetadata>;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function createCredentials(lang: "tr" | "en"): Credential[] {
  return Object.entries(certificateImages)
    .map(([path, image]) => {
      const fileNameWithExtension = path.split("/").pop() || "";
      const fileName = fileNameWithExtension.replace(/\.[^.]+$/, "");
      const metadataPath = Object.keys(certificateMetadata).find((candidate) =>
        candidate.endsWith(`/${fileName}.json`),
      );
      const metadata = metadataPath
        ? certificateMetadata[metadataPath]
        : undefined;
      const english = CERTIFICATE_TRANSLATIONS[fileName];

      return {
        fileName,
        title:
          lang === "en" && english
            ? english.title
            : metadata?.title || fileName.replace(/[_-]/g, " "),
        authority:
          lang === "en" && english
            ? english.authority
            : metadata?.authority || metadata?.issuer || "-",
        date:
          CERTIFICATE_DATES[fileName]?.[lang] ||
          metadata?.date ||
          metadata?.issue_date ||
          "2026",
        verifyId:
          metadata?.verifyId || metadata?.credential_id || "-",
        image,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, lang));
}

function ProjectCard({
  project,
  label,
  index,
}: {
  project: Project;
  label: string;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const content = (
    <>
      <span className="project-card__topline">
        <span>{project.year}</span>
        <span>{project.href ? "↗" : project.status}</span>
      </span>
      <strong>{project.name}</strong>
      <span className="project-card__description">{project.description}</span>
      {index === 0 ? (
        <svg
          className="project-card__trace"
          viewBox="0 0 520 150"
          aria-hidden="true"
        >
          <motion.path
            d="M24 104 C92 26 152 132 226 66 C302 0 362 116 496 38"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <circle cx="24" cy="104" r="7" />
          <rect x="218" y="58" width="16" height="16" rx="4" />
          <path d="M487 29 L506 35 L493 48Z" />
        </svg>
      ) : null}
      <span className="project-card__stack">{project.stack}</span>
      <span className="project-card__action">
        {project.href ? label : project.status}
        <span aria-hidden="true">{project.href ? " ↗" : ""}</span>
      </span>
    </>
  );

  return project.href ? (
    <a
      className={`project-card project-card--${index + 1}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <article className={`project-card project-card--${index + 1}`}>
      {content}
    </article>
  );
}

function SectionHeading({
  id,
  title,
  body,
  glyph,
}: {
  id: string;
  title: string;
  body?: string;
  glyph: "loop" | "weave" | "stack" | "signal";
}) {
  return (
    <header className="section-heading">
      <div>
        <h2 id={id}>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      <SignalGlyph variant={glyph} />
    </header>
  );
}

export function EditorialPortfolio() {
  const { lang, setLang } = useLanguage();
  const reducedMotion = useReducedMotion();
  const copy = COPY[lang];
  const credentials = useMemo(() => createCredentials(lang), [lang]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<
    { kind: "success" | "error"; message: string } | undefined
  >();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.remove("dark");
    document.title =
      lang === "tr"
        ? "İbrahim Nuryağınlı · Yapay Zeka Geliştirici"
        : "İbrahim Nuryağınlı · AI Developer";
  }, [lang]);

  const errors = {
    name: formData.name.trim() ? "" : copy.nameError,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : copy.emailError,
    message: formData.message.trim() ? "" : copy.messageError,
  };

  const markTouched = (field: string) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const updateField = (
    field: "name" | "email" | "subject" | "message",
    value: string,
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFormStatus(undefined);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (errors.name || errors.email || errors.message) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus(undefined);

    try {
      if (
        !EMAILJS_SERVICE_ID ||
        !EMAILJS_TEMPLATE_ID ||
        !EMAILJS_PUBLIC_KEY
      ) {
        throw new Error("Email service is not configured.");
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          user_name: formData.name,
          from_email: formData.email,
          user_email: formData.email,
          reply_to: formData.email,
          subject: formData.subject || "Portfolio Contact",
          message: formData.message,
          time: new Date().toLocaleString(copy.locale),
          to_email: "ibodeth@proton.me",
        },
        EMAILJS_PUBLIC_KEY,
      );

      setFormStatus({ kind: "success", message: copy.success });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch {
      setFormStatus({ kind: "error", message: copy.failure });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#content">
        {lang === "tr" ? "İçeriğe geç" : "Skip to content"}
      </a>

      <header className="floating-nav">
        <a className="wordmark" href="#content" aria-label="İbrahim Nuryağınlı">
          İbrahim<span>/26</span>
        </a>
        <nav aria-label={lang === "tr" ? "Ana navigasyon" : "Primary navigation"}>
          <a href="#work">{lang === "tr" ? "İşler" : "Work"}</a>
          <a href="#experience">{lang === "tr" ? "Deneyim" : "Experience"}</a>
          <a href="#credentials">{lang === "tr" ? "Belgeler" : "Credentials"}</a>
        </nav>
        <div className="floating-nav__actions">
          <span className="language-switch" aria-label={copy.languageLabel}>
            <button
              type="button"
              className={lang === "tr" ? "is-active" : ""}
              aria-pressed={lang === "tr"}
              onClick={() => setLang("tr")}
            >
              TR
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </span>
          <a
            className="nav-cv"
            href={assetUrl("documents/ibrahim-nuryaginli-cv.pdf")}
            target="_blank"
            rel="noreferrer"
          >
            {copy.cv} ↓
          </a>
        </div>
      </header>

      <main id="content" className="page">
        <section
          className="map-hero"
          aria-labelledby="page-title"
          onPointerMove={(event) => {
            if (reducedMotion) return;
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty(
              "--spot-x",
              `${event.clientX - rect.left}px`,
            );
            event.currentTarget.style.setProperty(
              "--spot-y",
              `${event.clientY - rect.top}px`,
            );
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--spot-x", "72%");
            event.currentTarget.style.setProperty("--spot-y", "34%");
          }}
        >
          <div className="map-hero__spotlight" aria-hidden="true" />
          <motion.div
            className="map-hero__copy"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="map-hero__identity">
              İbrahim Nuryağınlı
              <span>
                {lang === "tr"
                  ? "Yapay zekâ geliştirici"
                  : "AI developer"}
              </span>
            </p>
            <h1 id="page-title">
              {lang === "tr"
                ? "Fikirden çalışan sisteme."
                : "From idea to working system."}
            </h1>
            <p className="map-hero__lede">{copy.intro}</p>
            <div className="map-hero__actions">
              <a className="primary-link" href="#work">
                {lang === "tr" ? "İşleri keşfet" : "Explore the work"}
                <span aria-hidden="true"> ↓</span>
              </a>
              <a
                className="quiet-link"
                href="mailto:ibodeth@proton.me"
              >
                {lang === "tr" ? "Bir şey üretelim" : "Let’s build something"}
                <span aria-hidden="true"> ↗</span>
              </a>
            </div>
            <div className="map-hero__meta">
              <span>{copy.availability}</span>
              <span>{copy.location}</span>
            </div>
          </motion.div>
          <motion.div
            className="map-hero__scene"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
              delay: reducedMotion ? 0 : 0.16,
            }}
          >
            <SoftSignalScene lang={lang} />
          </motion.div>
        </section>

        <section
          id="work"
          className="page-section work-section"
          aria-labelledby="projects-title"
        >
          <SectionHeading
            id="projects-title"
            title={copy.projectsTitle}
            body={copy.projectsIntro}
            glyph="loop"
          />
          <motion.div
            className="project-field"
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
          >
            {PROJECTS[lang].map((project, index) => (
              <motion.div
                className={`project-field__item project-field__item--${index + 1}`}
                key={project.name}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.42,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                <ProjectCard
                  project={project}
                  label={copy.openProject}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section
          id="experience"
          className="page-section experience-section"
          aria-labelledby="experience-title"
        >
          <div className="experience-section__intro">
            <SectionHeading
              id="experience-title"
              title={copy.experienceTitle}
              body={copy.experienceIntro}
              glyph="weave"
            />
            <p className="experience-section__aside">
              {lang === "tr"
                ? "Lojistikten elektrikli araç altyapısına, her rol gerçek bir probleme temas ediyor."
                : "From logistics to EV infrastructure, every role touches a real operational problem."}
            </p>
          </div>
          <div className="experience-flow">
            <svg
              className="experience-flow__line"
              viewBox="0 0 90 620"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path d="M48 0 C8 120 78 190 40 310 C2 430 82 500 44 620" />
            </svg>
            <div className="experience-flow__items">
              {EXPERIENCE[lang].map((item, index) => {
                const body = (
                  <>
                    <span className="experience-card__period">{item.period}</span>
                    <span className="experience-card__body">
                      <strong>{item.company}</strong>
                      <span className="experience-card__role">{item.role}</span>
                      <span>{item.description}</span>
                    </span>
                    <span className="experience-card__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    className="experience-card"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    key={`${item.company}-${item.period}`}
                  >
                    {body}
                  </a>
                ) : (
                  <article
                    className="experience-card"
                    key={`${item.company}-${item.period}`}
                  >
                    {body}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="page-section capability-section"
          aria-labelledby="skills-title"
        >
          <div className="capability-section__skills">
            <SectionHeading
              id="skills-title"
              title={copy.skillsTitle}
              glyph="stack"
            />
            <div className="capability-list">
              {SKILLS[lang].map((skill) => (
                <article className="capability-item" key={skill.title}>
                  <h3>{skill.title}</h3>
                  <p>{skill.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="capability-section__education" aria-labelledby="education-title">
            <h2 id="education-title">{copy.educationTitle}</h2>
            <div className="education-list">
              <article>
                <p>2025–</p>
                <h3>Necmettin Erbakan Üniversitesi</h3>
                <span>
                  {lang === "tr"
                    ? "Yapay Zekâ Operatörlüğü · Önlisans · 2. sınıf"
                    : "AI Operations · Associate Degree · Year 2"}
                </span>
              </article>
              <article>
                <p>2021–2025</p>
                <h3>Konya Anadolu Lisesi</h3>
                <span>{lang === "tr" ? "Sayısal" : "Science track"}</span>
              </article>
              <article>
                <p>{lang === "tr" ? "Dil" : "Language"}</p>
                <h3>{lang === "tr" ? "İngilizce" : "English"}</h3>
                <span>B1</span>
              </article>
            </div>
          </div>
        </section>

        <section
          id="credentials"
          className="page-section credentials-section"
          aria-labelledby="credentials-title"
        >
          <SectionHeading
            id="credentials-title"
            title={copy.credentialsTitle}
            body={copy.credentialsIntro}
            glyph="signal"
          />
          <div className="credential-gallery">
            {credentials.map((credential, index) => (
              <a
                className={`credential-tile credential-tile--${index + 1}`}
                href={credential.image}
                target="_blank"
                rel="noreferrer"
                key={credential.fileName}
              >
                <img
                  src={credential.image}
                  alt=""
                  width="320"
                  height="180"
                  loading="lazy"
                />
                <span className="credential-tile__veil">
                  <strong>{credential.title}</strong>
                  <span>{credential.authority}</span>
                  <span>{credential.date}</span>
                  <span className="credential-tile__id">
                    {copy.certificateId}: {credential.verifyId}
                  </span>
                </span>
                <span className="credential-tile__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>

          <aside className="reference-note">
            <SignalGlyph variant="loop" />
            <div className="reference-note__copy">
              <h3>{copy.referenceTitle}</h3>
              <p>{copy.referenceBody}</p>
            </div>
            <a
              href={assetUrl("documents/ibrahim-nuryaginli-reference.pdf")}
              target="_blank"
              rel="noreferrer"
            >
              {copy.referenceLink} ↗
            </a>
          </aside>
        </section>

        <section
          id="contact"
          className="page-section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-copy">
            <SectionHeading
              id="contact-title"
              title={copy.contactTitle}
              body={copy.contactIntro}
              glyph="weave"
            />
            <div className="contact-links">
              <a href="mailto:ibodeth@proton.me">ibodeth@proton.me ↗</a>
              <a
                href="https://github.com/ibodeth"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/ibrahimnuryaginli/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a href="tel:+905466109004">+90 546 610 90 04</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">{copy.nameLabel}</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                aria-invalid={Boolean(touched.name && errors.name)}
                aria-describedby="name-help"
                onBlur={() => markTouched("name")}
                onChange={(event) => updateField("name", event.target.value)}
              />
              <span id="name-help" className="field-help">
                {touched.name ? errors.name : ""}
              </span>
            </div>

            <div className="form-field">
              <label htmlFor="email">{copy.emailLabel}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                aria-invalid={Boolean(touched.email && errors.email)}
                aria-describedby="email-help"
                onBlur={() => markTouched("email")}
                onChange={(event) => updateField("email", event.target.value)}
              />
              <span id="email-help" className="field-help">
                {touched.email ? errors.email : ""}
              </span>
            </div>

            <div className="form-field">
              <label htmlFor="subject">
                {copy.subjectLabel} <span>({copy.optional})</span>
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(event) => updateField("subject", event.target.value)}
              />
              <span className="field-help" aria-hidden="true" />
            </div>

            <div className="form-field">
              <label htmlFor="message">{copy.messageLabel}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby="message-help"
                onBlur={() => markTouched("message")}
                onChange={(event) => updateField("message", event.target.value)}
              />
              <span id="message-help" className="field-help">
                {touched.message ? errors.message : ""}
              </span>
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              data-state={
                isSubmitting
                  ? "loading"
                  : formStatus?.kind === "success"
                    ? "success"
                    : formStatus?.kind === "error"
                      ? "error"
                      : "idle"
              }
            >
              {isSubmitting ? copy.sending : copy.send}
            </button>

            <p
              className={`form-status ${
                formStatus ? `form-status--${formStatus.kind}` : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {formStatus?.message || ""}
            </p>
          </form>
        </section>
      </main>

      <footer className="statement-footer">
        <p>
          {lang === "tr"
            ? "Bir fikrin varsa, birlikte çalıştırabiliriz."
            : "If you have an idea, we can make it run."}
        </p>
        <div className="statement-footer__meta">
          <span>İbrahim Nuryağınlı</span>
          <span>
            {copy.postscript} · {new Date().getFullYear()}
          </span>
          <a href="#content">{lang === "tr" ? "Yukarı çık" : "Back to top"} ↑</a>
        </div>
      </footer>
    </div>
  );
}
