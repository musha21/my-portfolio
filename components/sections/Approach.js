import { site } from '../../data/site';

export default function Approach() {
  return (
    <section
      id="approach"
      className="section-pad scroll-mt-20 relative border-t border-white/10 bg-black"
      aria-labelledby="approach-heading"
    >
      <div className="max-w-6xl mx-auto">
        <p className="section-eyebrow">My Approach</p>
        <h2 id="approach-heading" className="section-title mb-6 sm:mb-8 max-w-2xl">
          {site.approach.headline}
        </h2>
        <div className="max-w-3xl space-y-5">
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            {site.approach.body}
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            {site.approach.values}
          </p>
        </div>
      </div>
    </section>
  );
}
