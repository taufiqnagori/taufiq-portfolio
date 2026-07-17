import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="projects" className="relative mx-auto max-w-7xl px-6 py-20">
      <SectionHeader
        index="03"
        eyebrow="Projects"
        shown={shown}
        title="Models and systems built to be used, not just demoed."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass group relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:border-violet/50 hover:shadow-[0_0_40px_rgba(190,190,190,0.15)]"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-teal">{project.period}</p>
            <h3 className="font-display mt-3 text-xl font-semibold leading-snug">{project.title}</h3>

            <ul className="mt-4 flex flex-col gap-2.5 text-sm leading-relaxed text-text-dim">
              {project.description.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-dim"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-5 pt-2 text-text-dim">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="flex items-center gap-1.5 text-sm transition-colors hover:text-blue"
                aria-label={`${project.title} on GitHub`}
              >
                <FiGithub /> Code
              </a>
              {project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="flex items-center gap-1.5 text-sm transition-colors hover:text-blue"
                  aria-label={`${project.title} live demo`}
                >
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
