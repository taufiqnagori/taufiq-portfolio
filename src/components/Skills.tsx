import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import SectionHeader from "./SectionHeader";

function SkillNode({ label, index, shown }: { label: string; index: number; shown: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `perspective(500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className="glass group relative flex items-center justify-center rounded-xl px-4 py-3 text-center transition-shadow duration-200 hover:border-blue/60 hover:shadow-[0_0_24px_rgba(255, 255, 255,0.25)]"
        data-cursor-hover
      >
        <span className="font-mono text-sm text-text transition-colors group-hover:text-blue">{label}</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="skills" className="relative mx-auto max-w-7xl px-6 py-20">
      <SectionHeader index="02" eyebrow="Skills" shown={shown} title="A working toolkit, not a checklist." />

      <div className="mt-14 flex flex-col gap-12">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-mono mb-4 text-xs uppercase tracking-[0.2em] text-teal">{category}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((skill, i) => (
                <SkillNode key={skill} label={skill} index={i} shown={shown} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
