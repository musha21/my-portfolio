import { skillGroups } from '../../data/skills';

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-pad scroll-mt-20 relative border-t border-white/10 bg-zinc-950"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto">
        <p className="section-eyebrow">Technical Skills</p>
        <h2 id="skills-heading" className="section-title mb-10 sm:mb-12">
          Tools I use to build
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillGroups.map((group) => (
            <div key={group.title} className="border border-white/10 bg-black/40 p-5 sm:p-6">
              <h3 className="text-sm font-semibold tracking-wide text-white mb-4">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[11px] sm:text-xs tracking-wide text-white/70 border border-white/15 px-2.5 py-1"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
