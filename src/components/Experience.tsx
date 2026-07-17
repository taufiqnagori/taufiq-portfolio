import { motion } from "framer-motion";
import { experience } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="experience" className="relative mx-auto max-w-7xl px-6 py-20">
      <SectionHeader index="04" eyebrow="Experience" shown={shown} title="On the job." />

      <div className="mt-14 flex flex-col gap-8">
        {experience.map((job, i) => (
          <motion.div
            key={job.role + job.company}
            initial={{ opacity: 0, x: -20 }}
            animate={shown ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass relative flex flex-col gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-5">
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-[#f2f2f2] to-[#b0b0b0]" />
              <div>
                <h3 className="font-display text-xl font-semibold">{job.role}</h3>
                <p className="mt-1 text-sm text-text-dim">{job.company}</p>
                <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-text-dim">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <span className="font-mono shrink-0 text-xs uppercase tracking-widest text-teal sm:self-start">
              {job.period}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
