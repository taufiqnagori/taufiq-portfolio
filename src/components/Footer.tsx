import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { nav, profile } from "../data/content";

export default function Footer() {
  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-text-faint">
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js & GSAP.
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={handleClick(item.href)}
                data-cursor-hover
                className="font-mono text-[11px] uppercase tracking-widest text-text-dim transition-colors hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-text-dim">
          <a href={profile.github} target="_blank" rel="noreferrer" data-cursor-hover aria-label="GitHub" className="transition-colors hover:text-blue">
            <FiGithub size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor-hover aria-label="LinkedIn" className="transition-colors hover:text-blue">
            <FiLinkedin size={16} />
          </a>
          <a href={`mailto:${profile.email}`} data-cursor-hover aria-label="Email" className="transition-colors hover:text-blue">
            <FiMail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
