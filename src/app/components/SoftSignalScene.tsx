import { motion, useReducedMotion } from "motion/react";

type SceneProps = {
  lang: "tr" | "en";
};

const LABELS = {
  tr: {
    work: "İŞLER",
    experience: "DENEYİM",
    skills: "ARAÇLAR",
    credentials: "BELGELER",
    contact: "İLETİŞİM",
    center: "YAPAY ZEKÂ + ÜRÜN",
    label: "İbrahim’in iş, deneyim, araç, belge ve iletişim alanlarını bağlayan portfolyo haritası",
  },
  en: {
    work: "WORK",
    experience: "EXPERIENCE",
    skills: "TOOLS",
    credentials: "CREDENTIALS",
    contact: "CONTACT",
    center: "AI + PRODUCT",
    label: "A portfolio map connecting İbrahim’s work, experience, tools, credentials, and contact",
  },
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function SoftSignalScene({ lang }: SceneProps) {
  const reducedMotion = useReducedMotion();
  const labels = LABELS[lang];
  const draw = reducedMotion
    ? { initial: false, animate: { pathLength: 1, opacity: 1 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 1.1, ease: EASE, delay: 0.22 },
      };

  const node = (delay: number) =>
    reducedMotion
      ? { initial: false, animate: { opacity: 1, scale: 1 } }
      : {
          initial: { opacity: 0, scale: 0.94 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.42, ease: EASE, delay },
        };

  return (
    <figure className="signal-scene">
      <svg
        className="signal-scene__svg"
        viewBox="0 0 760 620"
        role="img"
        aria-label={labels.label}
      >
        <motion.path
          className="signal-scene__orbit"
          d="M144 166 C250 44 498 34 626 150 C738 252 696 442 550 530 C388 628 160 548 82 386 C42 302 72 222 144 166Z"
          {...draw}
        />
        <motion.path
          className="signal-scene__route"
          d="M183 157 C267 216 286 284 372 310 C466 339 508 268 588 183 M372 310 C281 340 250 402 202 477 M372 310 C448 382 501 423 583 461"
          {...draw}
        />
        <motion.path
          className="signal-scene__scribble"
          d="M94 274 C120 251 141 257 153 278 C164 298 183 303 207 286"
          {...draw}
        />

        <motion.g className="signal-scene__center" {...node(0.08)}>
          <path d="M285 247 C318 209 419 202 463 240 C501 273 491 352 447 382 C399 416 305 397 275 352 C253 320 257 280 285 247Z" />
          <text x="375" y="300" textAnchor="middle">
            İBRAHİM
          </text>
          <text className="signal-scene__sub" x="375" y="330" textAnchor="middle">
            {labels.center}
          </text>
        </motion.g>

        <motion.a
          className="signal-node signal-node--work"
          href="#work"
          aria-label={labels.work}
          {...node(0.16)}
        >
          <path d="M91 107 C112 84 177 82 203 104 C226 124 220 168 196 186 C169 205 108 196 88 169 C73 149 75 124 91 107Z" />
          <text x="149" y="145" textAnchor="middle">
            {labels.work}
          </text>
        </motion.a>

        <motion.a
          className="signal-node signal-node--experience"
          href="#experience"
          aria-label={labels.experience}
          {...node(0.24)}
        >
          <path d="M548 105 L668 125 L649 206 L529 185Z" />
          <text x="599" y="160" textAnchor="middle">
            {labels.experience}
          </text>
        </motion.a>

        <motion.a
          className="signal-node signal-node--skills"
          href="#skills"
          aria-label={labels.skills}
          {...node(0.32)}
        >
          <path d="M47 327 L119 283 L188 330 L154 414 L69 405Z" />
          <text x="116" y="354" textAnchor="middle">
            {labels.skills}
          </text>
        </motion.a>

        <motion.a
          className="signal-node signal-node--credentials"
          href="#credentials"
          aria-label={labels.credentials}
          {...node(0.4)}
        >
          <path d="M130 449 C160 421 231 424 255 455 C277 484 255 530 219 541 C181 553 125 532 113 498 C106 479 112 464 130 449Z" />
          <text x="187" y="488" textAnchor="middle">
            {labels.credentials}
          </text>
        </motion.a>

        <motion.a
          className="signal-node signal-node--contact"
          href="#contact"
          aria-label={labels.contact}
          {...node(0.48)}
        >
          <path d="M523 414 C555 389 624 399 649 428 C673 456 656 501 621 521 C585 542 525 529 506 494 C489 464 497 435 523 414Z" />
          <text x="581" y="468" textAnchor="middle">
            {labels.contact}
          </text>
        </motion.a>

        <motion.g
          className="signal-scene__accent"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.42, ease: EASE, delay: 0.54 }}
        >
          <path d="M663 321 L686 312 L677 337Z" />
          <path d="M257 91 C275 69 293 70 308 84" />
        </motion.g>
      </svg>
      <figcaption>
        <span>{lang === "tr" ? "Alanı keşfet" : "Explore the field"}</span>
        <span aria-hidden="true">↘</span>
      </figcaption>
    </figure>
  );
}

type GlyphProps = {
  variant: "loop" | "weave" | "stack" | "signal";
};

const GLYPH_PATHS: Record<GlyphProps["variant"], string[]> = {
  loop: [
    "M8 38 C18 8 66 5 79 31 C91 55 66 76 42 64 C18 52 24 22 50 22 C72 22 89 43 98 64",
  ],
  weave: [
    "M5 18 C31 7 43 70 69 59 C88 52 83 19 104 15",
    "M8 58 C29 68 46 12 70 24 C92 35 87 61 108 65",
  ],
  stack: [
    "M10 18 C35 8 76 8 105 20",
    "M6 40 C37 29 78 31 111 42",
    "M13 63 C43 52 76 55 103 65",
  ],
  signal: [
    "M6 53 C23 53 24 18 41 18 C59 18 58 67 76 67 C93 67 94 33 111 33",
  ],
};

export function SignalGlyph({ variant }: GlyphProps) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      className={`signal-glyph signal-glyph--${variant}`}
      viewBox="0 0 118 80"
      aria-hidden="true"
    >
      {GLYPH_PATHS[variant].map((path, index) => (
        <motion.path
          key={path}
          d={path}
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            duration: 0.72,
            ease: EASE,
            delay: index * 0.08,
          }}
        />
      ))}
    </svg>
  );
}
