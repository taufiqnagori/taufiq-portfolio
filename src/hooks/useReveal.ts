import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal trigger that can never strand content invisible.
 *
 * `whileInView` alone can miss its window when a section is scrolled past
 * quickly or jumped to via an anchor link, leaving `initial={{ opacity: 0 }}`
 * applied forever. This hook layers three triggers, any of which reveals:
 *  1. an immediate rect check on mount (handles direct hash jumps),
 *  2. an IntersectionObserver (the cheap steady-state path),
 *  3. a rAF-throttled scroll/resize rect check (catches anything the
 *     observer misses at high scroll velocity).
 * Reduced-motion users get content revealed instantly.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.9 && r.bottom > 0;
    };

    if (inView()) {
      setShown(true);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (inView()) setShown(true);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShown(true);
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [shown]);

  return { ref, shown };
}
