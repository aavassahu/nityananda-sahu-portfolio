import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { name: 'HOME', href: '#home' },
  { name: 'SELECTED WORKS', href: '#gallery' },
  { name: 'ARTIST PROFILE', href: '#about' },
  { name: 'COMMISSIONS', href: '#commissions' },
  { name: 'HONORS', href: '#honors' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section scrollspy
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBFBF9]/95 backdrop-blur-md shadow-sm border-b border-[#D8D2C5]/70 py-3.5'
          : 'bg-[#FBFBF9]/80 backdrop-blur-md border-b border-[#D8D2C5]/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex flex-col group text-left"
        >
          <span className="font-brand text-lg md:text-xl font-bold tracking-[0.16em] text-charcoal group-hover:text-terracotta transition-colors duration-200">
            NITYANANDA SAHU
          </span>
          <span className="font-subtitle text-[0.72rem] tracking-[0.14em] uppercase text-subhead font-semibold mt-0.5">
            Visual Artist &bull; Sculptor &bull; Educator
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs font-semibold tracking-[0.15em] transition-all duration-200 relative py-1.5 ${
                  isActive
                    ? 'text-terracotta font-bold'
                    : 'text-charcoal hover:text-terracotta'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta rounded-full transition-all duration-300" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-charcoal hover:text-terracotta transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-charcoal rounded transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-charcoal rounded transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-charcoal rounded transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBFBF9]/98 backdrop-blur-xl border-b border-[#D8D2C5] px-6 py-6 space-y-4 shadow-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block text-sm font-semibold tracking-[0.16em] text-charcoal hover:text-terracotta py-2 border-b border-[#EFECE6]"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
