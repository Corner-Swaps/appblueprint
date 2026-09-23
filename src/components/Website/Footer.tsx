import React from 'react';
import { Rocket, ShieldCheck, Heart, Mail } from 'lucide-react';

interface FooterProps {
  onLaunchApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLaunchApp }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md">
                <img 
                  src="./favicon.png" 
                  alt="App Blueprint Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './logo.png';
                  }}
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-google">
                App Blueprint
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The zero-to-store mobile production operating system. Guiding indie builders and AI agents from raw idea to Apple App Store and Google Play approval without missing a single requirement.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={onLaunchApp}
                className="apple-press inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                <Rocket className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Launch Interactive Web App</span>
              </button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Product &amp; System
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#explorer" className="hover:text-white transition-colors">Screens &amp; 101 Rules</a></li>
              <li><a href="#phases" className="hover:text-white transition-colors">10 Production Phases</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Pass Readiness Calculator</a></li>
              <li><a href="#why-apps-fail" className="hover:text-white transition-colors">Why Apps Fail Review</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">AI Coding Prompts</a></li>
              <li><a href="#screenshots" className="hover:text-white transition-colors">App Store Screenshots</a></li>
              <li><a href="#academy" className="hover:text-white transition-colors">Launch Academy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Legal & Support Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Legal &amp; Trust
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="privacy.html" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="terms.html" className="hover:text-white transition-colors">
                  Terms of Service &amp; EULA
                </a>
              </li>
              <li>
                <a href="support.html" className="hover:text-white transition-colors">
                  Customer Support &amp; FAQ
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Corner-Swaps/appblueprint" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center space-x-1"
                >
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Contact: goloubov@gmail.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p>
              &copy; 2026 App Blueprint. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-600">
              Apple, App Store, iOS, TestFlight, and iPhone are trademarks of Apple Inc. Google Play and Android are trademarks of Google LLC.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Built with precision for indie builders</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
