import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ enabled }: { enabled: boolean }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch.current || !enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled, x, y]);

  if (isTouch.current || !enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden rounded-full border border-[#f2f2f2] md:block"
      style={{
        x: springX,
        y: springY,
        width: hovering ? 44 : 20,
        height: hovering ? 44 : 20,
        marginLeft: hovering ? -12 : 0,
        marginTop: hovering ? -12 : 0,
        backgroundColor: hovering ? "rgba(255, 255, 255,0.12)" : "transparent",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    />
  );
}
