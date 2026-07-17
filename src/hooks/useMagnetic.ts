import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { useSettings } from "../context/SettingsContext";

/**
 * Pointer-follow "magnetic" pull for buttons — nudges the element toward the
 * cursor within its own bounds. Driven entirely by mousemove (never scroll),
 * and the transform is applied via a spring MotionValue so React never
 * re-renders on movement — this cannot contribute to scroll jank.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 14) {
  const { lowPower } = useSettings();
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  if (lowPower) {
    return { ref, style: {}, onMouseMove: undefined, onMouseLeave: undefined };
  }

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}
