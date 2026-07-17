import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    // Kept intentionally short: the site is already mounted underneath, so
    // this is a brand moment, not a real wait.
    const duration = 600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 64 64"
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <defs>
              <linearGradient id="loadg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f2f2f2" />
                <stop offset="55%" stopColor="#b0b0b0" />
                <stop offset="100%" stopColor="#707070" />
              </linearGradient>
            </defs>
            <motion.polygon
              points="32,8 54,22 54,44 32,58 10,44 10,22"
              fill="none"
              stroke="url(#loadg)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.svg>

          <motion.p
            className="mt-6 font-display text-sm tracking-[0.3em] text-text-dim uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Taufiq Nagori
          </motion.p>

          <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#f2f2f2] via-[#b0b0b0] to-[#707070]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-text-faint">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
