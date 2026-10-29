import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-pad scroll-mt-20 relative border-t border-white/10 bg-black"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">
        <p className="section-eyebrow">Featured Projects</p>
        <h2 id="projects-heading" className="section-title mb-10 sm:mb-12">
          Products that solve real problems
        </h2>

        <div className="flex flex-col gap-10 sm:gap-14">
          {projects.map((project) => (
            <article
              key={project.id}
              className="border border-white/10 bg-zinc-950/60 p-4 sm:p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                <div className="min-w-0">
                  <p className="text-xs tracking-[0.2em] text-red-400/90 mb-2">{project.id}</p>
                  <h3 className="text-xl sm:text-3xl tracking-tight text-white mb-1 break-words">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/60">{project.subtitle}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 shrink-0 w-full md:w-auto">
                  <a
                    href={project.github}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-white/70 hover:text-white border border-white/15 px-3 py-2.5 sm:py-2 transition-colors w-full sm:w-auto"
                    target={project.github.startsWith('http') ? '_blank' : undefined}
                    rel={project.github.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                  <a
                    href={project.live}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-gray-900 bg-white hover:bg-gray-100 px-3 py-2.5 sm:py-2 transition-colors w-full sm:w-auto"
                    target={project.live.startsWith('http') ? '_blank' : undefined}
                    rel={project.live.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-3xl">
                {project.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.16em] text-white/50 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-white/75 pl-3 border-l border-red-500/50"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.16em] text-white/50 mb-3">
                    Technologies
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="text-[11px] sm:text-xs text-white/70 border border-white/15 px-2.5 py-1"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
