import React, { useState, useEffect } from 'react';
import { Rocket, Menu, X, ArrowRight, Search, Apple, Smartphone, Globe } from 'lucide-react';

interface NavbarProps {
  onLaunchApp: () => void;
  activePlatform?: 'all' | 'ios' | 'android';
  onSelectPlatform?: (platform: 'all' | 'ios' | 'android') => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onLaunchApp, 
  activePlatform = 'all', 
  onSelectPlatform,
  onOpenSearch 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Screens & Rules', href: '#explorer' },
    { label: '10 Phases', href: '#phases' },
    { label: 'Pass Calculator', href: '#calculator' },
    { label: 'Why Apps Fail', href: '#why-apps-fail' },
    { label: 'App Flows', href: '#screenshots' },
    { label: 'Academy', href: '#academy' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handlePlatformClick = (platform: 'all' | 'ios' | 'android') => {
    if (onSelectPlatform) {
      onSelectPlatform(platform);
    }
    const explorerEl = document.getElementById('explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchTrigger = () => {
    if (onOpenSearch) {
      onOpenSearch();
    }
    const searchInput = document.getElementById('explorer-search-input') || document.getElementById('hero-search-input');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => (searchInput as HTMLInputElement).focus(), 300);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF8F6]/92 backdrop-blur-md border-b border-black/6 shadow-xs py-2.5 sm:py-3' 
          : 'bg-transparent py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Monogram (Mobbin Style) */}
          <a 
            href="#" 
            className="flex items-center space-x-2.5 group focus:outline-hidden shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white shadow-xs border border-black/10 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <img 
                src="./favicon.png" 
                alt="App Blueprint Logo" 
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './logo.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-base font-bold text-slate-900 tracking-tight font-google">
                  App Blueprint
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded-md text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  2026
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium hidden md:block">
                Mobile Production &amp; Design System
              </span>
            </div>
          </a>

          {/* Mobbin Signature Platform Switcher (Center-Left) */}
          <div className="hidden md:flex items-center p-1 bg-white/90 backdrop-blur-md rounded-full border border-black/8 shadow-2xs">
            <button
              type="button"
              onClick={() => handlePlatformClick('all')}
              className={`apple-press inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activePlatform === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-black/4'
              }`}
            >
              <Globe className="w-3 h-3 stroke-[2.2]" />
              <span>All (101)</span>
            </button>
            <button
              type="button"
              onClick={() => handlePlatformClick('ios')}
              className={`apple-press inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activePlatform === 'ios'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-black/4'
              }`}
            >
              <Apple className="w-3 h-3 stroke-[2.2]" />
              <span>iOS HIG</span>
            </button>
            <button
              type="button"
              onClick={() => handlePlatformClick('android')}
              className={`apple-press inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activePlatform === 'android'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-black/4'
              }`}
            >
              <Smartphone className="w-3 h-3 stroke-[2.2]" />
              <span>Android Play</span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-black/6 shadow-2xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-slate-600 hover:text-slate-950 px-2.5 py-1 rounded-full hover:bg-black/4 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action CTAs (Search Trigger + Launch App Pill) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search Shortcut Trigger (Mobbin Style) */}
            <button
              type="button"
              onClick={handleSearchTrigger}
              className="apple-press hidden sm:inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 border border-black/8 shadow-2xs text-xs font-medium transition-all cursor-pointer"
              title="Search rules and screens"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
              <span className="text-slate-500">Search rules...</span>
              <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            <a
              href="support.html"
              className="hidden lg:inline-flex text-xs font-semibold text-slate-600 hover:text-slate-950 px-2.5 py-1.5 transition-colors"
            >
              Support
            </a>

            {/* Launch App Pill (Mobbin Dark Button Style) */}
            <button
              type="button"
              onClick={onLaunchApp}
              className="apple-press inline-flex items-center space-x-1.5 sm:space-x-2 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              <Rocket className="w-3.5 h-3.5 text-blue-400 stroke-[2.4]" />
              <span>Launch Web App</span>
              <ArrowRight className="w-3 h-3 text-slate-400 hidden sm:inline" />
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="apple-press xl:hidden w-9 h-9 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 stroke-[2.2]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu with Mobbin Platform Selector */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-2.5 pt-3 pb-4 border-t border-black/8 bg-white/95 backdrop-blur-lg rounded-2xl px-4 shadow-lg space-y-3">
            {/* Mobile Platform Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  handlePlatformClick('all');
                  setIsMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold text-center ${
                  activePlatform === 'all' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                }`}
              >
                All (101)
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePlatformClick('ios');
                  setIsMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold text-center ${
                  activePlatform === 'ios' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                }`}
              >
                iOS HIG
              </button>
              <button
                type="button"
                onClick={() => {
                  handlePlatformClick('android');
                  setIsMobileMenuOpen(false);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold text-center ${
                  activePlatform === 'android' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                }`}
              >
                Android
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm font-semibold text-slate-700 hover:text-slate-950 py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
              <a
                href="support.html"
                className="block text-sm font-semibold text-slate-600 py-1 px-2"
              >
                Support &amp; Customer Care
              </a>
              <a
                href="privacy.html"
                className="block text-sm font-semibold text-slate-600 py-1 px-2"
              >
                Privacy Policy
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLaunchApp();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-slate-950 text-white text-sm font-bold py-2.5 rounded-xl shadow-xs"
              >
                <Rocket className="w-4 h-4 stroke-[2.2] text-blue-400" />
                <span>Launch Interactive App</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
