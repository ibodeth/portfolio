import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "tr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  tr: {
    // Navigation
    "nav.home": "Ana Sayfa",
    "nav.skills": "Yetenekler",
    "nav.experience": "Deneyim",
    "nav.projects": "Projeler",
    "nav.certificates": "Sertifikalar",
    "nav.contact": "İletişim",

    // Intro Screen
    "intro.booting": "SİSTEM BAŞLATILIYOR v3.8.4",
    "intro.bypass": "[ Sistemi başlatmak ve sesleri açmak için butona tıklayın ]",
    "intro.startBtn": "SİSTEMİ BAŞLAT",

    // Hero Section
    "hero.badge": "Sistem & Makine Öğrenmesi Mühendisi",
    "hero.subtitle": "Akıllı sistemler, gömülü cihazlar ve yüksek performanslı yazılım geliştirme üzerine çalışıyorum.",
    "hero.paragraph": "Makine öğrenmesi araçları, düşük seviyeli sistem optimizasyonları ve etkileşimli ortamlar geliştiriyorum. Hem yazılım hem donanım tarafında çalışmayı seviyorum; temiz, sürdürülebilir kod yazmak önceliğim.",
    "hero.btnContact": "İletişime Geç",
    "hero.btnProjects": "Projelere Bak",
    "hero.techHeading": "Kullandığım Teknolojiler",
    "hero.explore": "Keşfet",

    // Bento Grid (Skills)
    "skills.badge": "Yetenekler",
    "skills.title": "Teknik Beceri Haritası",
    "skills.desc": "Mühendislik, oyun geliştirme, yapay zeka ve donanım alanlarındaki temel yetkinliklerimin özeti.",
    "skills.aiTitle": "Yapay Zeka & Makine Öğrenmesi",
    "skills.backendTitle": "Arka Uç & Sistem",
    "skills.interactiveTitle": "Etkileşimli Ortamlar",
    "skills.edgeTitle": "Gömülü Sistemler & Donanım",
    "skills.promptTitle": "Prompt Mühendisliği & Vibe Coding",
    "skills.mediaTitle": "Medya & Web",
    "skills.tag.ml": "Makine Öğrenmesi",
    "skills.tag.nn": "Sinir Ağları",
    "skills.tag.cv": "Bilgisayarlı Görü",
    "skills.tag.backend": "Backend Geliştirme",
    "skills.tag.gamedev": "C# / Oyun Geliştirme",
    "skills.tag.physics": "Fizik Motorları",
    "skills.tag.micro": "Mikrodenetleyiciler",
    "skills.tag.llm": "LLM Entegrasyonu",
    "skills.tag.prompt": "Prompt Tasarımı",
    "skills.tag.proto": "Hızlı Prototipleme",
    "skills.tag.video": "Video Düzenleme",
    "skills.tag.nle": "NLE İş Akışları",
    "skills.tag.frontend": "Frontend [Başlangıç]",

    // Bento Grid Visuals labels
    "visual.ml.prop": "İLERİ_YAYILIM",
    "visual.ml.infer": "ÇIKARIM",
    "visual.edge.cpu": "RPi 5 Çekirdek",
    "visual.edge.header": "GPIO BAŞLIK [40-PIN]",
    "visual.prompt.temp": "Sıc: 0.70",
    "visual.prompt.tokens": "TOKEN: 110/sn",
    "visual.media.speed": "HIZ: 2.4x",

    // Operations Canvas (Experience)
    "exp.badge": "Deneyimler",
    "exp.title": "Ne Yaptım, Ne Kattım",
    "exp.desc": "Geliştirici olarak üstlendiğim roller, yönettiğim ekipler ve katıldığım yarışmalardan bir kesit.",

    "exp.op1Title": "TEKNOSEL Yapay Zeka Film Yarışması",
    "exp.op1Role": "Takım Kaptanı @ Neural Frames",
    "exp.op1Result": "4. — Jüriden 62/100",
    "exp.op1Badges": ["Generative AI", "AI Video", "Leadership"],
    "exp.op1Details": "Konya çapında düzenlenen TEKNOSEL Yapay Zeka Film Yarışması'nda Neural Frames ekibini kurdum ve yönettim. Metinden videoya, metinden sese modellerini bir araya getirerek özgün bir sinematik hikâye anlattık. Jüri filmimize 100 üzerinden 62 puan verdi ve 4. olduk. Bu projeyi geliştirirken paha biçilemez deneyimler kazandım; yapay zekanın yaratıcı süreçlerde nasıl kullanılabileceğini, takım yönetimini ve proje teslimini öğrendim.",
    "exp.op1WatchFilm": "Filmi İzle",

    "exp.op2Title": "Cargo Pilot — Akıllı Yük Yönetimi @Divizyon",
    "exp.op2Role": "Backend Geliştirici",
    "exp.op2Result": "Yük Optimizasyon API'si & Veritabanı Tasarımı",
    "exp.op2Badges": ["Swagger", "Docker", "SQL", "Scrum", "Agile"],
    "exp.op2Details": "Ticari bir kargo yönetim sistemi için yüksek performanslı REST API'ler geliştirdim. Swagger ile eksiksiz bir API dokümantasyonu çıkardım. Aynı zamanda Scrum süreçlerine dahil oldum; sprint planlamadan kaynak koordinasyonuna kadar her şeyi deneyimledim.",

    "exp.op3Title": "Mağara Jam 2025 — 72 Saatte Oyun",
    "exp.op3Role": "Proje Lideri @ Koloniler Devs, Coder",
    "exp.op3Result": "Oynanabilir Strateji Oyunu Teslim Edildi",
    "exp.op3Badges": ["Scrum", "Unity", "Prototyping", "Game Dev"],
    "exp.op3Details": "Mağara Jam 2025'te sanatçılar ve programcılardan oluşan bir ekibi 72 saat boyunca yönettim. Scrum ile süreci organize ettim; görev önceliklendirme, asset teslimi, kodlama ve takım koordinasyonunu sağlayarak 'Koloniler' adlı strateji oyununu süre dolmadan bitirdik.",

    // Project Vault
    "proj.badge": "Projeler",
    "proj.title": "Öne Çıkan Projeler",
    "proj.desc": "Gerçek repolar, makine öğrenmesi pipeline'ları ve sistem entegrasyonları.",
    "proj.featuredBadge": "Öne Çıkan",
    "proj.featuredRole": "Backend Geliştirici",
    "proj.featuredDesc": "Kargo operasyonları için geliştirilmiş, ticari düzeyde bir yük yönetim ve ağırlık dağıtım sistemi. Güvenli ve containerized REST API'ler, normalize veritabanı şemaları ve yük dengeleme motorları içeriyor.",

    "proj.deepPiDesc": "Raspberry Pi 5 üzerinde çalışan DeepSeek R1. Bas-konuş ses arayüzü var; modelin düşünce sürecini gerçek zamanlı olarak SSD1306 OLED ekrana yansıtıyor.",
    "proj.noteMasterDesc": "Sınav kağıtlarını değerlendiren otonom bir asistan. OpenCV ile görüntü işliyor, Gemini AI ile görsel bağlamı analiz ediyor, kısmi puanlama ve öğretmen tarzı akıl yürütme yapıyor.",
    "proj.blinkDesc": "Kişisel masaüstü sesli asistanım. Wake-word ile uyandırılıyor, Edge TTS ile Türkçe konuşuyor, SQLite'a geçmiş kaydediyor, arka planda müzik indiriyor.",
    "proj.agroDesc": "Toprak sensörü verilerini değerlendiren çok hedefli ML pipeline'ı. SMOTE ve SHAP kullanarak bitki sağlık risklerini, stres düzeylerini ve uygunluk puanlarını tahmin ediyor.",
    "proj.nvidiaDesc": "Linux'ta harici NVIDIA GPU'lu dizüstüler için hafif bir güç yönetim aracı. Adaptörden çıkıldığında dGPU clock'larını otomatik kilitleyerek pil ömrünü %45 artırıyor.",
    "proj.musicDesc": "Ses dosyasından veya mikrofondan gerçek zamanlı akor tespiti, BPM sayımı ve vuruş takibi yapan bir motor. Keras/TensorFlow modelleri üzerinde çalışıyor.",

    // Certificates Gallery
    "cert.badge": "Sertifikalar",
    "cert.title": "Belgeler & Sertifikalar",
    "cert.desc": "Aldığım sertifikalar, rozetler ve akademik başarılar.",
    "cert.verified": "Doğrulanmış",
    "cert.authority": "Veren Kurum",
    "cert.date": "Tarih",
    "cert.verifyId": "Doğrulama ID",
    "cert.expand": "Büyüt",
    "cert.download": "İndir",
    "cert.empty": "\"src/certificates/\" klasöründe sertifika bulunamadı. PNG, JPG veya WEBP ekleyebilirsiniz.",
    "cert.fallbackDesc": "\"{fileNameWithExt}\" dosyası üzerinden doğrulanmış sertifika.",
    "cert.fallbackAuthority": "Onaylı Kurum",
    "cert.fallbackDate": "Aktif",

    // Contact Gateway
    "contact.badge": "İletişim",
    "contact.title": "Bana Ulaşın",
    "contact.desc": "Bir projeniz mi var, iş birliği teklifi mi, yoksa sadece sohbet mi etmek istiyorsunuz? Mesaj atmaktan çekinmeyin.",
    "contact.academicTitle": "Eğitim",
    "edu.desc": "Akademik yolculuğum, temel teorik eğitimim ve gelişim serüvenim.",
    "contact.neuInstitution": "Necmettin Erbakan Üniversitesi",
    "contact.neuProgram": "Yapay Zeka Operatörlüğü",
    "contact.neuPeriod": "2025 - Günümüz",
    "contact.neuDetails": "Makine öğrenmesi, veritabanı sistemleri, sinir ağı optimizasyonu ve ölçeklenebilir deployment üzerine dersler alıyorum.",
    "contact.hsInstitution": "Konya Anadolu Lisesi",
    "contact.hsProgram": "Ortaöğretim",
    "contact.hsPeriod": "2021 - 2025",
    "contact.hsDetails": "Matematik ve fizik ağırlıklı müfredat; okul kodlama projeleri, yazılım kulübü ve algoritma takımına aktif katılım.",
    "contact.langCard": "Dil Yeterliliği",
    "contact.langLevel": "İngilizce: B1",
    "contact.sendMessage": "Mesaj Gönder",
    "contact.labelName": "İsim",
    "contact.labelEmail": "E-posta",
    "contact.labelSubject": "Konu",
    "contact.labelMessage": "Mesajınız",
    "contact.btnSending": "Gönderiliyor...",
    "contact.btnSend": "Gönder",
    "contact.toastFill": "Lütfen tüm alanları doldurun.",
    "contact.toastSuccess": "Mesajınız iletildi!",
    "contact.toastError": "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
    "contact.placeholderName": "Adınız Soyadınız",
    "contact.placeholderEmail": "eposta@adresiniz.com",
    "contact.placeholderSubject": "İş Birliği Teklifi",
    "contact.placeholderMessage": "Merhaba İbrahim, seninle şu konuyu konuşmak istedim...",
    "contact.direct.email": "E-posta",
    "contact.direct.github": "GitHub",
    "contact.direct.linkedin": "LinkedIn",
    "contact.direct.phone": "Telefon",
    "contact.copyright": "© {year} İbrahim Nuryağınlı. Tüm hakları saklıdır."
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",

    // Intro Screen
    "intro.booting": "SYSTEM BOOTING v3.8.4",
    "intro.bypass": "[ Click the button to start system and enable audio ]",
    "intro.startBtn": "START SYSTEM",

    // Hero Section
    "hero.badge": "Systems & Machine Learning Engineer",
    "hero.subtitle": "I work on intelligent systems, embedded devices, and high-performance software development.",
    "hero.paragraph": "I develop machine learning tools, low-level system optimizations, and interactive environments. I enjoy working on both software and hardware sides; writing clean, maintainable code is my priority.",
    "hero.btnContact": "Get in Touch",
    "hero.btnProjects": "See Projects",
    "hero.techHeading": "Technologies I Use",
    "hero.explore": "Explore",

    // Bento Grid (Skills)
    "skills.badge": "Skills",
    "skills.title": "Technical Skill Map",
    "skills.desc": "A summary of my core competencies in engineering, game development, AI, and hardware.",
    "skills.aiTitle": "AI & Machine Learning",
    "skills.backendTitle": "Backend & Systems",
    "skills.interactiveTitle": "Interactive Environments",
    "skills.edgeTitle": "Embedded Systems & Hardware",
    "skills.promptTitle": "Prompt Engineering & Vibe Coding",
    "skills.mediaTitle": "Media & Web",
    "skills.tag.ml": "Machine Learning",
    "skills.tag.nn": "Neural Networks",
    "skills.tag.cv": "Computer Vision",
    "skills.tag.backend": "Backend Dev",
    "skills.tag.gamedev": "C# / Game Dev",
    "skills.tag.physics": "Physics Engines",
    "skills.tag.micro": "Microcontrollers",
    "skills.tag.llm": "LLM Integration",
    "skills.tag.prompt": "Prompt Design",
    "skills.tag.proto": "Rapid Prototyping",
    "skills.tag.video": "Video Editing",
    "skills.tag.nle": "NLE Workflows",
    "skills.tag.frontend": "Frontend [Beginner]",

    // Bento Grid Visuals labels
    "visual.ml.prop": "FORWARD_PROP",
    "visual.ml.infer": "INFERENCE",
    "visual.edge.cpu": "RPi 5 Core",
    "visual.edge.header": "GPIO HEADER [40-PIN]",
    "visual.prompt.temp": "Temp: 0.70",
    "visual.prompt.tokens": "TOKENS: 110/s",
    "visual.media.speed": "SPEED: 2.4x",

    // Operations Canvas (Experience)
    "exp.badge": "Experience",
    "exp.title": "What I Did, What I Contributed",
    "exp.desc": "A cross-section of the roles I've taken on as a developer, the teams I've managed, and the competitions I've participated in.",

    "exp.op1Title": "TEKNOSEL AI Film Competition",
    "exp.op1Role": "Team Captain @ Neural Frames",
    "exp.op1Result": "4th Place — 62/100 from the Jury",
    "exp.op1Badges": ["Generative AI", "AI Video", "Leadership"],
    "exp.op1Details": "I founded and led the Neural Frames team at the TEKNOSEL AI Film Competition held in Konya. We combined text-to-video and text-to-audio models to tell an original cinematic story. The jury gave our film 62 out of 100, and we finished 4th. I gained invaluable experience during this project — I learned how AI can be used in creative processes, team management, and project delivery.",
    "exp.op1WatchFilm": "Watch Film",

    "exp.op2Title": "Cargo Pilot — Smart Load Management @Divizyon",
    "exp.op2Role": "Backend Developer",
    "exp.op2Result": "Load Optimization API & Database Design",
    "exp.op2Badges": ["Swagger", "Docker", "SQL", "Scrum", "Agile"],
    "exp.op2Details": "I built high-performance REST APIs for a commercial cargo management system. I created comprehensive API documentation with Swagger. I also participated in Scrum processes — I experienced everything from sprint planning to resource coordination.",

    "exp.op3Title": "Mağara Jam 2025 — Game in 72 Hours",
    "exp.op3Role": "Project Lead @ Koloniler Devs, Coder",
    "exp.op3Result": "Playable Strategy Game Delivered",
    "exp.op3Badges": ["Scrum", "Unity", "Prototyping", "Game Dev"],
    "exp.op3Details": "I managed a team of artists and programmers for 72 hours at Mağara Jam 2025. I organized the process with Scrum — handling task prioritization, asset delivery, coding, and team coordination, we finished the strategy game 'Koloniler' before the deadline.",

    // Project Vault
    "proj.badge": "Projects",
    "proj.title": "Featured Projects",
    "proj.desc": "Real repositories, machine learning pipelines, and system integrations.",
    "proj.featuredBadge": "Featured",
    "proj.featuredRole": "Backend Developer",
    "proj.featuredDesc": "A commercial-grade load management and weight distribution system developed for cargo operations. Includes secure, containerized REST APIs, normalized database schemas, and a load balancing engine.",

    "proj.deepPiDesc": "DeepSeek R1 running on a Raspberry Pi 5. Has a push-to-talk voice interface and streams the model's chain-of-thought in real time to an SSD1306 OLED display.",
    "proj.noteMasterDesc": "An autonomous exam grading assistant. It processes images with OpenCV, analyzes visual context via Gemini AI, and performs partial scoring with teacher-style reasoning.",
    "proj.blinkDesc": "My personal desktop voice assistant. Wake-word activated, speaks Turkish via Edge TTS, saves history to SQLite, and downloads music in the background.",
    "proj.agroDesc": "Multi-target ML pipeline that evaluates soil sensor data. Predicts plant health risks, stress levels, and suitability scores using SMOTE and SHAP.",
    "proj.nvidiaDesc": "A lightweight power management tool for Linux laptops with external NVIDIA GPUs. Automatically locks dGPU clocks when unplugged to extend battery life by 45%.",
    "proj.musicDesc": "Real-time chord detection, BPM counting, and beat tracking engine from audio files or microphone input. Runs on Keras/TensorFlow models.",

    // Certificates Gallery
    "cert.badge": "Certificates",
    "cert.title": "Certificates & Credentials",
    "cert.desc": "Certificates, badges, and academic achievements I've earned.",
    "cert.verified": "Verified",
    "cert.authority": "Issued By",
    "cert.date": "Date",
    "cert.verifyId": "Verification ID",
    "cert.expand": "Expand",
    "cert.download": "Download",
    "cert.empty": "No certificates found in \"src/certificates/\". Add PNG, JPG, or WEBP files to display them.",
    "cert.fallbackDesc": "Verified certificate via file \"{fileNameWithExt}\".",
    "cert.fallbackAuthority": "Certified Authority",
    "cert.fallbackDate": "Active",

    // Fallbacks for initial cert mockups
    "cert.meta.cargo_pilot_badge.title": "Divizyon Cargo Pilot Developer Badge",
    "cert.meta.cargo_pilot_badge.authority": "Divizyon Platform",
    "cert.meta.cargo_pilot_badge.date": "November 2025",
    "cert.meta.cargo_pilot_badge.description": "Official badge recognizing strong developer competency in cargo logistics, backend architecture, and Docker deployment.",

    "cert.meta.scrum_cert.title": "Agile Project & Scrum Master Certification",
    "cert.meta.scrum_cert.authority": "Agile Leadership Alliance",
    "cert.meta.scrum_cert.date": "September 2025",
    "cert.meta.scrum_cert.description": "Certification validating Scrum practices, sprint management, and team coordination.",

    "cert.meta.systems_cert.title": "Intelligent Systems & Machine Learning Engineer",
    "cert.meta.systems_cert.authority": "Neural Cognitive Institute",
    "cert.meta.systems_cert.date": "January 2026",
    "cert.meta.systems_cert.description": "Engineering certification validating expertise in deep learning, computer vision, and edge AI hardware integration.",

    "cert.meta.english_cert.title": "B1 English CEFR Proficiency",
    "cert.meta.english_cert.authority": "European Language Framework",
    "cert.meta.english_cert.date": "March 2025",
    "cert.meta.english_cert.description": "Certification validating independent English proficiency in technical writing, speaking, and collaboration.",

    // Contact Gateway
    "contact.badge": "Contact",
    "contact.title": "Get in Touch",
    "contact.desc": "Got a project, a collaboration offer, or just want to chat? Don't hesitate to send a message.",
    "contact.academicTitle": "Education",
    "edu.desc": "My academic journey, core theoretical education and development path.",
    "contact.neuInstitution": "Necmettin Erbakan University",
    "contact.neuProgram": "AI Operations",
    "contact.neuPeriod": "2025 – Present",
    "contact.neuDetails": "Taking courses on machine learning, database systems, neural network optimization, and scalable deployment.",
    "contact.hsInstitution": "Konya Anadolu High School",
    "contact.hsProgram": "Secondary Education",
    "contact.hsPeriod": "2021 – 2025",
    "contact.hsDetails": "Math and physics focused curriculum; active participation in school coding projects, software club, and the algorithm team.",
    "contact.langCard": "Language Proficiency",
    "contact.langLevel": "English: B1",
    "contact.sendMessage": "Send a Message",
    "contact.labelName": "Name",
    "contact.labelEmail": "Email",
    "contact.labelSubject": "Subject",
    "contact.labelMessage": "Your Message",
    "contact.btnSending": "Sending...",
    "contact.btnSend": "Send",
    "contact.toastFill": "Please fill in all fields.",
    "contact.toastSuccess": "Your message has been sent!",
    "contact.toastError": "Failed to send message. Please try again.",
    "contact.placeholderName": "Your Full Name",
    "contact.placeholderEmail": "you@example.com",
    "contact.placeholderSubject": "Collaboration Offer",
    "contact.placeholderMessage": "Hi Ibrahim, I wanted to talk about...",
    "contact.direct.email": "Email",
    "contact.direct.github": "GitHub",
    "contact.direct.linkedin": "LinkedIn",
    "contact.direct.phone": "Phone",
    "contact.copyright": "© {year} İbrahim Nuryağınlı. All rights reserved."
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangInternal] = useState<Language>(() => {
    // Default is English
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio_lang") as Language;
      if (stored === "tr" || stored === "en") return stored;
    }
    return "en";
  });

  const setLang = (newLang: Language) => {
    setLangInternal(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", newLang);
    }
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
