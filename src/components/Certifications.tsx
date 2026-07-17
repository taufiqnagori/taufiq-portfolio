import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { certifications } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import SectionHeader from "./SectionHeader";

export default function Certifications() {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="certifications" className="relative mx-auto max-w-7xl px-6 py-20">
      <SectionHeader index="05" eyebrow="Certifications" shown={shown} title="Continuous, deliberate learning." />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 20 }}
            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            data-cursor-hover
            className="glass group flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:border-teal/50 hover:shadow-[0_0_30px_rgba(110, 110, 110,0.14)]"
          >
            <span className="glass-hi flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-teal transition-transform duration-300 group-hover:scale-110">
              <FiAward size={18} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold leading-snug">{cert.name}</h3>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-wide text-text-dim">{cert.issuer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
