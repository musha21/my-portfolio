'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '../../data/site';

const degToRad = (deg) => (deg * Math.PI) / 180;
const polarToCart = (cx, cy, r, angleDeg) => {
  const rad = degToRad(angleDeg);
  return {
    x: Number((cx + r * Math.cos(rad)).toFixed(2)),
    y: Number((cy + r * Math.sin(rad)).toFixed(2)),
  };
};

const CX = -110;
const CY = 300;

const ARC_LAYOUT = [
  { radius: 330, startAngle: -92, endAngle: 16, dotAngle: -46 },
  { radius: 395, startAngle: -56, endAngle: 60, dotAngle: 2 },
  { radius: 460, startAngle: -14, endAngle: 72, dotAngle: 44 },
];

const computedArcs = ARC_LAYOUT.map((layout, i) => {
  const stats = site.heroStats[i] || { number: '0', suffix: '', label: '' };
  const arc = { ...layout, ...stats };
  const deltaDeg = arc.endAngle - arc.startAngle;
  const deltaRad = degToRad(deltaDeg);
  const arcLength = Number((arc.radius * deltaRad).toFixed(2));
  const start = polarToCart(CX, CY, arc.radius, arc.startAngle);
  const end = polarToCart(CX, CY, arc.radius, arc.endAngle);
  const dot = polarToCart(CX, CY, arc.radius, arc.dotAngle);
  const d = `M ${start.x} ${start.y} A ${arc.radius} ${arc.radius} 0 0 1 ${end.x} ${end.y}`;

  const lineDelay = Number((0.4 + i * 0.22).toFixed(2));
  const markDelay = Number((lineDelay + 0.9).toFixed(2));
  const ringDelay = Number((markDelay + 0.3).toFixed(2));
  const numDelay = Number((markDelay + 0.15).toFixed(2));
  const labelDelay = Number((markDelay + 0.3).toFixed(2));

  return {
    ...arc,
    arcLength,
    start,
    end,
    dot,
    d,
    lineDelay,
    markDelay,
    ringDelay,
    numDelay,
    labelDelay,
    gradId: `arc-grad-${i}`,
  };
});

function resolveImage(localPath, fallback) {
  return localPath || fallback;
}

export default function Hero() {
  const gridRef = useRef(null);
  const maskLayerRef = useRef(null);
  const [baseSrc, setBaseSrc] = useState(site.heroImages.baseFallback);
  const [altSrc, setAltSrc] = useState(site.heroImages.alternateFallback);

  const pointerRef = useRef({
    targetMouseX: -999,
    targetMouseY: -999,
    currentMouseX: -999,
    currentMouseY: -999,
    targetGridX: 0,
    targetGridY: 0,
    currentGridX: 0,
    currentGridY: 0,
  });

  useEffect(() => {
    const tryLocal = (path, fallback, setter) => {
      const img = new Image();
      img.onload = () => setter(path);
      img.onerror = () => setter(fallback);
      img.src = path;
    };

    tryLocal(site.heroImages.base, site.heroImages.baseFallback, setBaseSrc);
    tryLocal(
      site.heroImages.alternate,
      site.heroImages.alternateFallback,
      setAltSrc
    );
  }, []);

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice && maskLayerRef.current) {
      const staticMask =
        'radial-gradient(circle 320px at 70% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0) 100%)';
      maskLayerRef.current.style.maskImage = staticMask;
      maskLayerRef.current.style.webkitMaskImage = staticMask;
      maskLayerRef.current.style.maskSize = '100% 100%';
      maskLayerRef.current.style.webkitMaskSize = '100% 100%';
      return;
    }

    const handlePointerMove = (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      pointerRef.current.targetMouseX = clientX;
      pointerRef.current.targetMouseY = clientY;

      const normalizedX = clientX / width;
      const normalizedY = clientY / height;
      pointerRef.current.targetGridX = (normalizedX - 0.5) * 16;
      pointerRef.current.targetGridY = (normalizedY - 0.5) * 16;
    };

    const handlePointerLeave = () => {
      pointerRef.current.targetMouseX = -999;
      pointerRef.current.targetMouseY = -999;
      pointerRef.current.targetGridX = 0;
      pointerRef.current.targetGridY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let animId = null;

    const renderLoop = () => {
      const p = pointerRef.current;

      p.currentMouseX += (p.targetMouseX - p.currentMouseX) * 0.1;
      p.currentMouseY += (p.targetMouseY - p.currentMouseY) * 0.1;
      p.currentGridX += (p.targetGridX - p.currentGridX) * 0.06;
      p.currentGridY += (p.targetGridY - p.currentGridY) * 0.06;

      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${p.currentGridX.toFixed(2)}px, ${p.currentGridY.toFixed(2)}px, 0)`;
      }

      if (maskLayerRef.current) {
        const x = Math.round(p.currentMouseX);
        const y = Math.round(p.currentMouseY);

        if (x < -500 || y < -500) {
          maskLayerRef.current.style.maskImage = 'none';
          maskLayerRef.current.style.webkitMaskImage = 'none';
        } else {
          const maskVal = `radial-gradient(circle 260px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.40) 75%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0) 100%)`;
          maskLayerRef.current.style.maskImage = maskVal;
          maskLayerRef.current.style.webkitMaskImage = maskVal;
          maskLayerRef.current.style.maskSize = '100% 100%';
          maskLayerRef.current.style.webkitMaskSize = '100% 100%';
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section
      className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden bg-black select-none"
      aria-label="Hero Section"
    >
      <div
        ref={gridRef}
        className="absolute -inset-8 z-0 pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tech-grid-pattern"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid-pattern)" />
        </svg>
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[center_20%] sm:bg-center bg-cover animate-ken-burns will-change-transform scale-100"
          style={{
            backgroundImage: `url('${resolveImage(baseSrc, site.heroImages.baseFallback)}')`,
          }}
        />
        <div className="absolute inset-0 bg-red-950/20 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-950/30 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 sm:via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 sm:from-black/70 via-black/30 sm:via-black/20 to-transparent" />
      </div>

      <div
        ref={maskLayerRef}
        className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-[center_20%] sm:bg-center bg-cover"
          style={{
            backgroundImage: `url('${resolveImage(altSrc, site.heroImages.alternateFallback)}')`,
          }}
        />
        <div className="absolute inset-0 bg-red-900/10 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 sm:via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 sm:from-black/70 via-transparent to-transparent" />
      </div>

      <div
        className="absolute inset-y-0 right-0 z-40 pointer-events-none hidden lg:block w-[min(42vw,420px)] overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 380 700"
          preserveAspectRatio="xMaxYMid meet"
          className="h-full w-full max-w-full"
        >
          <defs>
            {computedArcs.map((arc) => (
              <linearGradient
                key={arc.gradId}
                id={arc.gradId}
                gradientUnits="userSpaceOnUse"
                x1={arc.start.x}
                y1={arc.start.y}
                x2={arc.end.x}
                y2={arc.end.y}
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="22%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="85%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {computedArcs.map((arc) => (
            <g key={arc.label}>
              <path
                d={arc.d}
                fill="none"
                stroke={`url(#${arc.gradId})`}
                strokeWidth="1.1"
                className="arc-line"
                style={{
                  '--dash-len': arc.arcLength,
                  animationDelay: `${arc.lineDelay}s`,
                }}
              />
              <circle
                cx={arc.dot.x}
                cy={arc.dot.y}
                r="7"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                className="arc-ring"
                style={{ animationDelay: `${arc.ringDelay}s` }}
              />
              <circle
                cx={arc.dot.x}
                cy={arc.dot.y}
                r="3.4"
                fill="#ffffff"
                className="arc-dot"
                style={{ animationDelay: `${arc.markDelay}s` }}
              />
              <text
                x={arc.dot.x - 14}
                y={arc.dot.y + 4}
                textAnchor="end"
                fill="#ffffff"
                fontSize="28"
                letterSpacing="-1"
                className="arc-text font-bold"
                style={{ animationDelay: `${arc.numDelay}s` }}
              >
                {arc.number}
                <tspan fontSize="16" dy="-9">
                  {arc.suffix}
                </tspan>
              </text>
              <text
                x={arc.dot.x - 14}
                y={arc.dot.y + 22}
                textAnchor="end"
                fill="#ffffff"
                fontSize="8"
                fontWeight="600"
                letterSpacing="1.5"
                opacity="0.8"
                className="arc-text uppercase"
                style={{ animationDelay: `${arc.labelDelay}s` }}
              >
                {arc.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-50 pointer-events-auto px-5 sm:px-8 md:px-12 pt-8 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-16 md:pb-24">
        <div className="max-w-lg md:max-w-xl">
          <p className="hero-rise delay-eyebrow text-[10px] sm:text-xs font-semibold tracking-[0.1em] sm:tracking-[0.12em] text-white/90 uppercase mb-2 sm:mb-4">
            <span className="md:hidden">{site.mobileTitle}</span>
            <span className="hidden md:inline">{site.title}</span>
          </p>

          <h1 className="hero-rise delay-heading text-3xl sm:text-5xl md:text-6xl leading-[1.08] tracking-[-0.06em] sm:tracking-[-0.08em] text-white font-normal mb-3 sm:mb-5">
            {site.name}
          </h1>

          <p className="hero-rise delay-paragraph text-sm sm:text-base text-white/90 leading-snug sm:leading-relaxed mb-3 sm:mb-3 font-medium">
            {site.pitch}
          </p>

          <p className="hero-rise delay-paragraph hidden sm:block text-sm text-white/70 leading-relaxed mb-6 sm:mb-8 font-light max-w-md">
            {site.shortBio}
          </p>

          <div
            className="hero-rise delay-paragraph flex lg:hidden items-stretch gap-2 mb-5"
            aria-label="Key stats"
          >
            {site.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex-1 min-w-0 border border-white/15 bg-black/40 backdrop-blur-sm px-1.5 sm:px-2 py-2.5 text-center"
              >
                <p className="text-sm sm:text-base font-semibold text-white leading-none mb-1">
                  {stat.number}
                  <span className="text-[10px] sm:text-xs align-super">{stat.suffix}</span>
                </p>
                <p className="text-[8px] sm:text-[9px] uppercase tracking-wide text-white/60 leading-tight break-words">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="hero-rise delay-cta flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
            <a
              href="#projects"
              className="cta-shine-btn inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-black/20 bg-white text-gray-900 font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black"
            >
              <span className="relative z-10">View My Projects</span>
              <span className="cta-shine-bar" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
