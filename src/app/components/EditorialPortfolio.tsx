import emailjs from "@emailjs/browser";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

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

function ProjectRow({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  const content = (
    <>
      <span className="index-row__date">{project.year}</span>
      <span className="index-row__main">
        <strong>{project.name}</strong>
        <span>{project.description}</span>
      </span>
      <span className="index-row__stack">{project.stack}</span>
      <span className="index-row__action">
        {project.href ? `${label} ↗` : project.status}
      </span>
    </>
  );

  return project.href ? (
    <a
      className="index-row index-row--link"
      href={project.href}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <div className="index-row">{content}</div>
  );
}

export function EditorialPortfolio() {
  const { lang, setLang } = useLanguage();
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

      <header className="edge-header">
        <a className="wordmark" href="#content" aria-label="İbrahim Nuryağınlı">
          İN
        </a>
        <a
          className="header-cv"
          href={assetUrl("documents/ibrahim-nuryaginli-cv.pdf")}
          target="_blank"
          rel="noreferrer"
        >
          {copy.cv} ↓
        </a>
      </header>

      <main id="content" className="page">
        <section className="intro" aria-labelledby="page-title">
          <div className="intro__identity">
            <p className="intro__role">
              {lang === "tr" ? "Yapay Zeka Geliştirici" : "AI Developer"}
            </p>
            <h1 id="page-title">İbrahim Nuryağınlı</h1>
          </div>
          <div className="intro__statement">
            <p>{copy.intro}</p>
            <div className="intro__meta">
              <span>{copy.availability}</span>
              <span>{copy.location}</span>
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
            </div>
          </div>
        </section>

        <section className="page-section" aria-labelledby="projects-title">
          <header className="section-head">
            <h2 id="projects-title">{copy.projectsTitle}</h2>
            <p>{copy.projectsIntro}</p>
          </header>
          <div className="index-list">
            {PROJECTS[lang].map((project) => (
              <ProjectRow
                key={project.name}
                project={project}
                label={copy.openProject}
              />
            ))}
          </div>
        </section>

        <section className="page-section" aria-labelledby="experience-title">
          <header className="section-head">
            <h2 id="experience-title">{copy.experienceTitle}</h2>
            <p>{copy.experienceIntro}</p>
          </header>
          <div className="experience-list">
            {EXPERIENCE[lang].map((item) => {
              const body = (
                <>
                  <span className="experience-row__period">{item.period}</span>
                  <span className="experience-row__main">
                    <strong>{item.company}</strong>
                    <span className="experience-row__role">{item.role}</span>
                    <span>{item.description}</span>
                  </span>
                  <span className="experience-row__arrow">
                    {item.href ? "↗" : ""}
                  </span>
                </>
              );

              return item.href ? (
                <a
                  className="experience-row experience-row--link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={`${item.company}-${item.period}`}
                >
                  {body}
                </a>
              ) : (
                <div
                  className="experience-row"
                  key={`${item.company}-${item.period}`}
                >
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        <section className="page-section page-section--split">
          <div aria-labelledby="skills-title">
            <header className="section-head section-head--compact">
              <h2 id="skills-title">{copy.skillsTitle}</h2>
            </header>
            <div className="skill-list">
              {SKILLS[lang].map((skill) => (
                <div className="skill-item" key={skill.title}>
                  <h3>{skill.title}</h3>
                  <p>{skill.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div aria-labelledby="education-title">
            <header className="section-head section-head--compact">
              <h2 id="education-title">{copy.educationTitle}</h2>
            </header>
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

        <section className="page-section" aria-labelledby="credentials-title">
          <header className="section-head">
            <h2 id="credentials-title">{copy.credentialsTitle}</h2>
            <p>{copy.credentialsIntro}</p>
          </header>
          <div className="credential-list">
            {credentials.map((credential) => (
              <a
                className="credential-row"
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
                <span className="credential-row__main">
                  <strong>{credential.title}</strong>
                  <span>{credential.authority}</span>
                </span>
                <span className="credential-row__meta">
                  <span>{credential.date}</span>
                  <span>
                    {copy.certificateId}: {credential.verifyId}
                  </span>
                </span>
                <span className="credential-row__arrow">↗</span>
              </a>
            ))}
          </div>

          <aside className="reference-note">
            <div>
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
          className="page-section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-copy">
            <header className="section-head section-head--compact">
              <h2 id="contact-title">{copy.contactTitle}</h2>
              <p>{copy.contactIntro}</p>
            </header>
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

      <footer className="letter-footer">
        <p className="letter-footer__close">
          {copy.signoff}
          <br />
          <span>İbrahim</span>
        </p>
        <p className="letter-footer__ps">
          P.S. {copy.postscript} · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
