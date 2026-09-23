import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is App Blueprint?',
      a: 'App Blueprint is an interactive production operating system designed to guide mobile developers and indie hackers through all 10 phases required to successfully launch an app on the Apple App Store and Google Play Store without rejections.',
    },
    {
      q: 'Does it support both iOS and Android?',
      a: 'Yes! Every checklist requirement clearly tags whether it applies to iOS, Android, or both. It covers platform-specific rules like Apple Privacy Manifests, Sign in with Apple parity, Android Keystore encryption, and Google Play closed testing.',
    },
    {
      q: 'How do I use this with AI coding tools (Claude, Cursor, ChatGPT)?',
      a: 'Every requirement has a dedicated "AI Agent Prompt" button. Click "Copy Agent Prompt" and paste it into Cursor, Claude Code, ChatGPT, or GitHub Copilot. The prompt contains explicit system instructions and code inspection requirements to autonomously execute the check in your codebase.',
    },
    {
      q: 'Where is my project data stored?',
      a: '100% on your local device. App Blueprint is architected with a zero-trust, client-side first approach. None of your unpublished app names, checklist states, or custom items are transmitted to external servers or ad networks.',
    },
    {
      q: 'Can I generate store configuration files like Privacy manifests?',
      a: 'Yes! In the Resources section of the app, our built-in Config Generators allow you to generate store-ready Apple Privacy Manifest (PrivacyInfo.xcprivacy XML), Universal Links JSON, Android App Links JSON, and Markdown Privacy Policies in seconds.',
    },
    {
      q: 'Can I track multiple apps simultaneously?',
      a: 'Yes. The Multi-Project manager lets you create unlimited independent projects with their own color badges, custom steps, reordered phases, and individual progress meters.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Got Questions?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-google">
          Frequently Asked Questions
        </h2>

        <p className="text-base text-slate-600">
          Everything you need to know about using App Blueprint to ship your mobile apps.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between space-x-4 cursor-pointer"
              >
                <span className="text-base sm:text-lg font-bold text-slate-900 font-google">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
