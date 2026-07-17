import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title?: React.ReactNode;
  shown: boolean;
}

/** Shared eyebrow + heading block so every section aligns on the same grid:
 * a numbered index, a short rule, the label, then the heading beneath. */
export default function SectionHeader({ index, eyebrow, title, shown }: SectionHeaderProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        className="flex items-center gap-3"
      >
        <span className="font-mono text-xs text-text-faint">{index}</span>
        <span className="h-px w-8 bg-border" />
        <span className="section-eyebrow">{eyebrow}</span>
      </motion.div>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.05 }}
          className="font-display mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl"
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
}
