import React, { useEffect } from 'react';
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

  return (
    <div className="website-root min-h-screen max-w-full overflow-x-hidden bg-[#FAF8F6] text-[#1E2022] font-sans selection:bg-slate-900 selection:text-white flex flex-col antialiased">
      {/* Navigation Bar */}
      <Navbar onLaunchApp={onLaunchApp} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onLaunchApp={onLaunchApp} />

        {/* Live Interactive 54-Check Audit Explorer & AI Prompt Copier */}
        <InteractiveAuditExplorer onLaunchApp={onLaunchApp} />

        {/* 10 Guided Production Phases */}
        <PhasesShowcase onLaunchApp={onLaunchApp} />

        {/* Store Approval Probability Calculator */}
        <ReadinessCalculator onLaunchApp={onLaunchApp} />

        {/* Why Apps Fail & Rejection Traps */}
        <RejectionTrapsSection onLaunchApp={onLaunchApp} />

        {/* Core Engineered Features & AI Coding Prompts */}
        <FeaturesGrid onLaunchApp={onLaunchApp} />

        {/* App Store Screenshot Gallery */}
        <ScreenshotGallery />

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
