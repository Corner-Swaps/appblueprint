import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { InteractiveAuditExplorer } from './InteractiveAuditExplorer';
import { PhasesShowcase } from './PhasesShowcase';
import { ReadinessCalculator } from './ReadinessCalculator';
import { RejectionTrapsSection } from './RejectionTrapsSection';
import { FeaturesGrid } from './FeaturesGrid';
import { ScreenshotGallery } from './ScreenshotGallery';
import { AcademyHighlight } from './AcademyHighlight';
import { FAQSection } from './FAQSection';
import { Footer } from './Footer';

interface WebsiteProps {
  onLaunchApp: () => void;
}

export const Website: React.FC<WebsiteProps> = ({ onLaunchApp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState<'all' | 'ios' | 'android'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Smooth scroll support for hash links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#app') {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global ⌘K keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('explorer-search-input') || document.getElementById('hero-search-input');
        if (searchInput) {
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => (searchInput as HTMLInputElement).focus(), 300);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="website-root min-h-screen max-w-full overflow-x-hidden bg-[#FAF8F6] text-[#1E2022] font-sans selection:bg-slate-900 selection:text-white flex flex-col antialiased">
      {/* Mobbin-Style Floating Navigation Bar */}
      <Navbar 
        onLaunchApp={onLaunchApp} 
        activePlatform={activePlatform}
        onSelectPlatform={setActivePlatform}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Curated Discovery Hero */}
        <Hero 
          onLaunchApp={onLaunchApp}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activePlatform={activePlatform}
          onSelectPlatform={setActivePlatform}
          onSelectCategory={setActiveCategory}
        />

        {/* Mobbin Screen & Rule Catalog (The Core Visual Feed & Inspector) */}
        <InteractiveAuditExplorer 
          onLaunchApp={onLaunchApp}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activePlatform={activePlatform}
          onSelectPlatform={setActivePlatform}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 10 Guided Production Phases */}
        <PhasesShowcase onLaunchApp={onLaunchApp} />

        {/* Store Approval Probability Calculator */}
        <ReadinessCalculator onLaunchApp={onLaunchApp} />

        {/* Why Apps Fail & Rejection Traps */}
        <RejectionTrapsSection onLaunchApp={onLaunchApp} />

        {/* Core Engineered Features & AI Coding Prompts */}
        <FeaturesGrid onLaunchApp={onLaunchApp} />

        {/* Mobbin App Flows Showcase */}
        <ScreenshotGallery onLaunchApp={onLaunchApp} />

        {/* App Launch Academy Masterclass */}
        <AcademyHighlight onLaunchApp={onLaunchApp} />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onLaunchApp={onLaunchApp} />
    </div>
  );
};
