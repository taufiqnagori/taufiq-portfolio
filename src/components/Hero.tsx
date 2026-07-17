import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin } from "react-icons/fi";
import { profile } from "../data/content";
import { useSettings } from "../context/SettingsContext";
import { useMagnetic } from "../hooks/useMagnetic";

export default function Hero() {
  const { lowPower } = useSettings();
  const magnetic = useMagnetic<HTMLAnchorElement>(14);

  // Scroll-linked parallax: the hero content drifts up and fades slightly as
  // the viewport scrolls past it. useScroll subscribes once via a passive
  // listener and the values below drive only `transform`/`opacity`, so this
  // never touches layout — it's the cheapest kind of scroll animation there is.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, lowPower ? 0 : 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, lowPower ? 1 : 0]);

  return (
    <section ref={sectionRef} id="home" className="relative flex min-h-screen items-center overflow-hidden py-32">
      {/* A single static glow behind the name — no motion, no 3D, just depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_45%,rgba(255,255,255,0.05),transparent_70%)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-eyebrow mb-6 flex items-center gap-2"
        >
          <FiMapPin className="text-teal" /> {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-shine font-display text-7xl font-black uppercase leading-[0.95] tracking-tight sm:text-8xl md:text-9xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-blue sm:text-base"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-text-dim"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            ref={magnetic.ref}
            href="#projects"
            data-cursor-hover
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            whileHover={{ scale: 1.05 }}
            style={magnetic.style}
            className="rounded-full bg-gradient-to-r from-[#f2f2f2] via-[#b0b0b0] to-[#707070] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#05060a] shadow-[0_10px_32px_-12px_rgba(255, 255, 255,0.55)] transition-shadow hover:shadow-[0_14px_44px_-12px_rgba(190, 190, 190,0.65)]"
          >
            View Projects
          </motion.a>
          <a
            href={profile.resumeFile}
            download="Taufiq-Nagori-Resume.pdf"
            data-cursor-hover
            className="glass-hi flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-text transition-transform hover:scale-105"
          >
            <FiDownload /> Download Resume
          </a>
          <a
            href="#contact"
            data-cursor-hover
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-2 py-3 font-mono text-xs uppercase tracking-widest text-text-dim transition-colors hover:text-text"
          >
            Contact Me →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-14 flex items-center justify-center gap-5 text-text-dim"
        >
          <a href={profile.github} target="_blank" rel="noreferrer" data-cursor-hover aria-label="GitHub" className="transition-colors hover:text-blue">
            <FiGithub size={20} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor-hover aria-label="LinkedIn" className="transition-colors hover:text-blue">
            <FiLinkedin size={20} />
          </a>
          <a href={`mailto:${profile.email}`} data-cursor-hover aria-label="Email" className="transition-colors hover:text-blue">
            <FiMail size={20} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-text-faint"
      >
        <div className="flex flex-col items-center gap-2">
          Scroll
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-blue to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
