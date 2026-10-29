import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { site } from '../../data/site';

export default function Contact() {
  const { contact } = site;
  const emailHref = contact.email ? `mailto:${contact.email}` : '#contact';

  return (
    <section
      id="contact"
      className="section-pad scroll-mt-20 relative border-t border-white/10 bg-zinc-950"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        <p className="section-eyebrow">Let&apos;s Connect</p>
        <h2 id="contact-heading" className="section-title mb-6 sm:mb-8 max-w-2xl">
          {contact.headline}
        </h2>
        <div className="max-w-3xl space-y-4 mb-10">
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">{contact.body}</p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">{contact.invite}</p>
          <p className="text-sm sm:text-base text-white font-medium">{contact.cta}</p>
        </div>

        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2.5 sm:gap-4">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm text-white border border-white/20 px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm text-white border border-white/20 px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-colors"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          {contact.email ? (
            <a
              href={emailHref}
              className="inline-flex items-center justify-center gap-2 text-sm text-gray-900 bg-white px-4 py-3 sm:py-2.5 hover:bg-gray-100 transition-colors"
            >
              <Mail size={16} />
              Email
            </a>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 text-sm text-white/40 border border-white/10 px-4 py-3 sm:py-2.5 text-center">
              <Mail size={16} className="shrink-0" />
              <span className="truncate">Add email in data/site.js</span>
            </span>
          )}
          {contact.portfolioUrl ? (
            <a
              href={contact.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm text-white border border-white/20 px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-colors"
            >
              <Globe size={16} />
              Portfolio
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
