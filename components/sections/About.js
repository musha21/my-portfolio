import { site } from '../../data/site';

export default function About() {
  return (
    <section
      id="about"
      className="section-pad scroll-mt-20 relative border-t border-white/10 bg-black"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <p className="section-eyebrow">About Me</p>
        <h2 id="about-heading" className="section-title mb-8 sm:mb-10">
          Software engineer with a design-minded approach
        </h2>
        <div className="grid gap-5 sm:gap-6 max-w-3xl">
          {site.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-sm sm:text-base text-white/70 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
