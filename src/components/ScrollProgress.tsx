import { motion, useScroll, useSpring } from "framer-motion";
import { useSettings } from "../context/SettingsContext";

/** Thin gradient bar pinned to the top edge that fills with scroll progress.
 * Framer's useScroll subscribes via a single passive listener and drives the
 * bar purely through a transform (scaleX) — no layout, no re-renders, so it
 * costs nothing extra on the scroll thread. */
export default function ScrollProgress() {
  const { lowPower } = useSettings();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  if (lowPower) return null;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-white via-[#b0b0b0] to-[#707070]"
    />
  );
}
