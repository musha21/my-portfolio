'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '../../data/site';

function LogoIcon() {
  return (
    <svg
      viewBox="0 0 256 256"
      width="22"
      height="22"
      fill="#ffffff"
      aria-label="Portfolio logo"
      className="shrink-0"
    >
      <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = site.nav;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-between md:justify-center p-4 sm:p-5 pointer-events-none"
        role="banner"
      >
        <nav
          className="nav-drop hidden md:flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full pl-3 pr-2 py-2 pointer-events-auto border border-white/10 shadow-2xl shadow-black/50"
          aria-label="Main Navigation"
        >
          <a href="#" className="flex items-center justify-center pr-2 pl-1" aria-label="Home">
            <LogoIcon />
          </a>

          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0 ${
                index === 0
                  ? 'text-white hover:bg-white/15'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            className="bg-white text-gray-900 text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-gray-100 transition-colors ml-1 whitespace-nowrap shrink-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            Connect
          </a>
        </nav>

        <div className="md:hidden flex items-center justify-between w-full pointer-events-auto nav-drop">
          <a
            href="#"
            className="bg-black/60 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-2 border border-white/10 shadow-lg"
          >
            <LogoIcon />
            <span className="text-white text-xs font-semibold tracking-wider">MUSHARRAF</span>
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="bg-black/60 backdrop-blur-md rounded-full p-2 text-white border border-white/10 hover:bg-black/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 flex items-center justify-center z-[70] relative"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] pt-20 pb-6 px-5 shadow-lg bg-zinc-950/98 backdrop-blur-md border-b border-white/10 md:hidden flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col w-full divide-y divide-white/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleLinkClick}
                className="text-white/90 py-3 text-sm font-medium hover:text-red-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={handleLinkClick}
            className="w-full mt-5 bg-white text-gray-900 text-sm font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors text-center shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Connect
          </a>
        </div>
      )}
    </>
  );
}
