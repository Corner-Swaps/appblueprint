import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

interface NavbarProps {
  onLaunchApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Audit Explorer', href: '#explorer' },
    { label: '10 Phases', href: '#phases' },
    { label: 'Pass Calculator', href: '#calculator' },
    { label: 'Why Apps Fail', href: '#why-apps-fail' },
    { label: 'Screenshots', href: '#screenshots' },
    { label: 'Academy', href: '#academy' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF8F6]/90 backdrop-blur-md border-b border-black/5 shadow-xs py-3' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a 
            href="#" 
            className="flex items-center space-x-3 group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-black/8 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <img 
                src="./favicon.png" 
                alt="App Blueprint Logo" 
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  // Fallback to logo.png if favicon not found
                  (e.target as HTMLImageElement).src = './logo.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight font-google">
                  App Blueprint
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  OS 2026
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Mobile Production Readiness
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-1.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/8 shadow-2xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs lg:text-[13px] font-semibold text-slate-600 hover:text-slate-950 px-3 py-1.5 rounded-full hover:bg-black/4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="support.html"
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 px-3 py-2 rounded-xl transition-colors"
            >
              Support &amp; Docs
            </a>

            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs lg:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5 stroke-[2.4]" />
              <span>Launch Web App</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
            </button>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={onLaunchApp}
              className="sm:hidden apple-press inline-flex items-center space-x-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-2xs"
            >
              <Rocket className="w-3.5 h-3.5 stroke-[2.4]" />
              <span>Launch App</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="apple-press w-10 h-10 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[2.2]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-black/8 bg-white/95 backdrop-blur-lg rounded-2xl px-4 shadow-lg space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-semibold text-slate-700 hover:text-blue-600 py-2 px-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
              <a
                href="support.html"
                className="block text-sm font-semibold text-slate-600 py-2 px-2"
              >
                Support &amp; Customer Care
              </a>
              <a
                href="privacy.html"
                className="block text-sm font-semibold text-slate-600 py-2 px-2"
              >
                Privacy Policy
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLaunchApp();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white text-sm font-bold py-3 rounded-xl shadow-xs"
              >
                <Rocket className="w-4 h-4 stroke-[2.2]" />
                <span>Launch Interactive App</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
