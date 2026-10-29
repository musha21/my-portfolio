import { experience } from '../../data/experience';
import { education } from '../../data/education';

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad scroll-mt-20 relative border-t border-white/10 bg-zinc-950"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-6xl mx-auto">
        <p className="section-eyebrow">Professional Experience</p>
        <h2 id="experience-heading" className="section-title mb-10 sm:mb-12">
          Where I&apos;ve built
        </h2>

        <div className="flex flex-col gap-8 mb-16">
          {experience.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              className="border-l border-white/20 pl-4 sm:pl-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <h3 className="text-sm sm:text-lg text-white font-medium leading-snug break-words">
                  <span className="block sm:inline">{job.role}</span>
                  <span className="text-white/50 font-normal"> — {job.company}</span>
                </h3>
                <span className="text-xs tracking-wide text-red-400/90 shrink-0">{job.period}</span>
              </div>
              <ul className="space-y-2">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-white/65 leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="section-eyebrow">Education</p>
        <h3 className="text-xl sm:text-2xl tracking-tight text-white mb-6">Learning path</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {education.map((item) => (
            <div key={item.title} className="border border-white/10 bg-black/40 p-5">
              <h4 className="text-sm font-medium text-white mb-2 leading-snug">{item.title}</h4>
              <p className="text-xs text-white/55">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
