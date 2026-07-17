import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, education } from "../data/content";
import { useSettings } from "../context/SettingsContext";
import { useReveal } from "../hooks/useReveal";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { lowPower } = useSettings();
  const { ref, shown } = useReveal<HTMLElement>();

  useEffect(() => {
    if (lowPower || !timelineRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // The vertical line fills in step with scroll progress through the timeline block
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".edu-node").forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 82%",
            },
            delay: i * 0.05,
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [lowPower]);

  return (
    <section ref={ref} id="about" className="relative mx-auto max-w-7xl px-6 py-20">
      <SectionHeader index="01" eyebrow="About" shown={shown} />

      <div className="mt-10 grid gap-16 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Building where <span className="text-gradient">engineering</span> meets applied ML.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-dim">{profile.summaryExpanded}</p>
        </motion.div>

        <div ref={timelineRef} className="relative lg:col-span-3">
          <div className="relative pl-10">
            <div className="absolute left-[7px] top-0 h-full w-px bg-border" />
            <div
              ref={lineRef}
              className="absolute left-[7px] top-0 h-full w-px bg-gradient-to-b from-[#f2f2f2] via-[#b0b0b0] to-[#707070]"
              style={{ transform: "scaleY(0)" }}
            />

            <div className="flex flex-col gap-12">
              {education.map((e) => (
                <div key={e.degree} className="edu-node relative">
                  <span className="absolute -left-10 top-1 h-3.5 w-3.5 rounded-full border-2 border-blue bg-[#05060a]" />
                  <p className="font-mono text-xs uppercase tracking-widest text-teal">{e.period}</p>
                  <h3 className="font-display mt-2 text-xl font-semibold">{e.degree}</h3>
                  <p className="mt-1 text-sm text-text-dim">
                    {e.school} — {e.location}
                  </p>
                  <p className="mt-1 font-mono text-sm text-blue">{e.score}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
