import { site } from '../../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 sm:px-8 md:px-12 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-white/50 tracking-wide break-words">{site.copyright}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <a
            href={site.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={site.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a href="#contact" className="text-white/60 hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
