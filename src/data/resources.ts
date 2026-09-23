export type ResourceCategory = 
  | 'ai_models' 
  | 'design' 
  | 'typography'
  | 'github_repos' 
  | 'backend' 
  | 'security' 
  | 'privacy' 
  | 'legal' 
  | 'launch' 
  | 'analytics';

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  categoryLabel: string;
  badge: 'Free' | 'Open Source' | 'Official' | 'AI Model' | 'Free Tier';
  badgeColor: string; // Tailwind color classes
  platform?: 'ios' | 'android' | 'both';
  shortDescription: string;
  whyItMatters: string;
  keyFeatures: string[];
  bestUsedFor: string;
  freeTierInfo: string;
  quickStart?: string;
  reviewTraps?: string;
  url: string;
  iconName: string;
  promptOrCommand?: string;
  promptLabel?: string;
}

export const RESOURCE_CATEGORIES: { id: ResourceCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Resources' },
  { id: 'ai_models', label: 'AI Models & Agents' },
  { id: 'design', label: 'Design & UI/UX' },
  { id: 'typography', label: 'Typography & Fonts' },
  { id: 'github_repos', label: 'Open Source Repos' },
  { id: 'backend', label: 'Backend & Cloud' },
  { id: 'security', label: 'Security & Auth' },
  { id: 'privacy', label: 'Privacy & Manifests' },
  { id: 'legal', label: 'Legal & Policies' },
  { id: 'launch', label: 'Store Launch & ASO' },
  { id: 'analytics', label: 'Analytics & Crashes' }
];

export const RESOURCES_DATA: ResourceItem[] = [

  // ==========================================
  // TYPOGRAPHY & FONT SYSTEMS (6 FREE RESOURCES)
  // ==========================================
  {
    id: 'type-fontshare',
    title: 'Fontshare (Indian Type Foundry)',
    category: 'typography',
    categoryLabel: '100% Free Professional Fonts',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'A free font service by the Indian Type Foundry offering world-class professional fonts that are 100% free for personal and commercial mobile app use.',
    whyItMatters: 'Unlike commercial font libraries with thousands in licensing fees, Fontshare gives you top-tier typefaces (Satoshi, General Sans, Cabinet Grotesk, Clash Display) with zero royalties and complete commercial freedom.',
    keyFeatures: [
      '100% free for personal and commercial mobile applications with no royalty fees.',
      'Full variable font weight support for silky smooth font rendering across iOS and Android.',
      'Includes complete OpenType tabular numbers, ligatures, and international language glyphs.'
    ],
    bestUsedFor: 'Modern mobile app UI interfaces, bold dashboard numbers, clean body paragraphs, and distinctive brand typography.',
    freeTierInfo: '100% completely free with no hidden fees, no subscriptions, and full commercial permission.',
    quickStart: 'Download the font package files (.woff2 / .ttf) and place them in \'public/fonts/\'. Register local @font-face rules in your root stylesheet with \'font-display: swap\' and assign font-family variables across Tailwind and CSS components.',
    reviewTraps: 'Never load font files from remote CDN servers at runtime without offline fallback. App Store reviewers test in airplane mode, and network font failure causes layout shifts or unrendered glyphs that trigger rejection.',
    url: 'https://www.fontshare.com/',
    iconName: 'Type',
    promptOrCommand: 'Configure our typography system to use Satoshi and General Sans from Fontshare. Set up local @font-face rules with variable font weights (300 to 900) and ensure smooth tabular number rendering for all statistics.',
    promptLabel: 'AI Prompt for Fontshare'
  },
  {
    id: 'type-bunny-fonts',
    title: 'Bunny Fonts (Privacy-First Open Fonts)',
    category: 'typography',
    categoryLabel: 'GDPR-Compliant Open Fonts',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'A privacy-first drop-in replacement for Google Fonts that serves open-source fonts with zero tracking, zero IP logging, and full GDPR compliance.',
    whyItMatters: 'European courts have ruled that loading fonts from Google Fonts pings user IP addresses without consent. Bunny Fonts eliminates all IP logging and provides easy zip downloads to bundle fonts locally in your app.',
    keyFeatures: [
      'Strict zero-logging privacy policy ensures 100% compliance with EU GDPR and global privacy laws.',
      'Drop-in replacement for every open-source Google Font family (Inter, Poppins, Roboto, Outfit).',
      'Provides direct download bundles so you can self-host font files locally inside your app package.'
    ],
    bestUsedFor: 'Privacy-first apps that need standard open-source typefaces without transmitting user IP addresses to third-party ad networks.',
    freeTierInfo: '100% free open-source font distribution with no rate limits and zero cost.',
    quickStart: 'Download the font package files (.woff2 / .ttf) and place them in \'public/fonts/\'. Register local @font-face rules in your root stylesheet with \'font-display: swap\' and assign font-family variables across Tailwind and CSS components.',
    reviewTraps: 'Never load font files from remote CDN servers at runtime without offline fallback. App Store reviewers test in airplane mode, and network font failure causes layout shifts or unrendered glyphs that trigger rejection.',
    url: 'https://fonts.bunny.net/',
    iconName: 'ShieldCheck',
    promptOrCommand: 'Audit our CSS font loading. Replace any external font links with local self-hosted font files downloaded from Bunny Fonts, eliminating all remote network pings on mobile launch.',
    promptLabel: 'AI Prompt for Privacy Fonts'
  },
  {
    id: 'type-apple-sf-pro',
    title: 'Apple SF Pro & SF Compact',
    category: 'typography',
    categoryLabel: 'Official Apple iOS System Font',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Apple\'s official system font family designed specifically for maximum legibility, optical sizing, and Dynamic Type scaling on iPhone and iPad.',
    whyItMatters: 'Using Apple\'s native system font stack costs zero extra kilobytes in your bundle, renders instantaneously with zero network lag, and automatically supports user accessibility text zoom in iOS Settings.',
    keyFeatures: [
      'Built directly into every iPhone, iPad, Mac, and Apple Watch hardware display.',
      'Automatic optical sizing adjusts letter-spacing and proportions seamlessly between titles and captions.',
      'Native Dynamic Type compatibility ensures smooth scaling when users increase text size in iOS Settings.'
    ],
    bestUsedFor: 'Building authentic Apple-standard interfaces that feel completely native, ultra-crisp, and seamlessly integrated into iOS.',
    freeTierInfo: 'Included free with all Apple operating systems and available for free developer download via developer.apple.com.',
    quickStart: 'Download the font package files (.woff2 / .ttf) and place them in \'public/fonts/\'. Register local @font-face rules in your root stylesheet with \'font-display: swap\' and assign font-family variables across Tailwind and CSS components.',
    reviewTraps: 'Never load font files from remote CDN servers at runtime without offline fallback. App Store reviewers test in airplane mode, and network font failure causes layout shifts or unrendered glyphs that trigger rejection.',
    url: 'https://developer.apple.com/fonts/',
    iconName: 'Apple',
    promptOrCommand: 'Apply Apple\'s native system font stack across all text styles. Configure font-family to prioritize \'-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text\' with optical letter tracking (-0.02em for display titles, +0.03em for small captions).',
    promptLabel: 'AI Prompt for Apple Typography'
  },
  {
    id: 'type-google-fonts-local',
    title: 'Google Fonts (Self-Hosted Library)',
    category: 'typography',
    categoryLabel: 'World\'s Largest Open Font Library',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Over 1,500 open-source font families available under open licenses like SIL Open Font License, with direct downloads for local offline app bundling.',
    whyItMatters: 'Google Fonts contains the world\'s most popular open typefaces (Inter, Plus Jakarta Sans, Outfit, Space Grotesk). Downloading the TTF/WOFF2 files directly to your project keeps your app offline-ready and 100% privacy-compliant.',
    keyFeatures: [
      'Extensive catalog of over 1,500 free, open-source font families with full commercial rights.',
      'Search and filter by category (Sans Serif, Serif, Display, Monospace) and character set.',
      'Download full font family packages directly to bundle into your mobile app assets folder.'
    ],
    bestUsedFor: 'Finding modern open-source typefaces and downloading the raw font files to embed locally in your mobile project.',
    freeTierInfo: '100% free and open-source under SIL Open Font License or Apache 2.0.',
    quickStart: 'Download the font package files (.woff2 / .ttf) and place them in \'public/fonts/\'. Register local @font-face rules in your root stylesheet with \'font-display: swap\' and assign font-family variables across Tailwind and CSS components.',
    reviewTraps: 'Never load font files from remote CDN servers at runtime without offline fallback. App Store reviewers test in airplane mode, and network font failure causes layout shifts or unrendered glyphs that trigger rejection.',
    url: 'https://fonts.google.com/',
    iconName: 'Globe',
    promptOrCommand: 'Download the \'Inter\' or \'Plus Jakarta Sans\' font files from Google Fonts into our \'public/fonts/\' directory and create clean @font-face rules so the app loads fonts 100% offline without remote CDN pings.',
    promptLabel: 'AI Prompt for Local Font Bundling'
  },
  {
    id: 'type-geist-vercel',
    title: 'Geist & Geist Mono (Vercel)',
    category: 'typography',
    categoryLabel: 'Modern Technical Typography',
    badge: 'Open Source',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    platform: 'both',
    shortDescription: 'A precision geometric typeface and monospace font family crafted specifically for modern developer interfaces, readable code, and data-dense dashboards.',
    whyItMatters: 'Geist combines Swiss typography design with high-legibility tabular figures, making financial data, timestamps, analytics dashboards, and code snippets look clean, modern, and razor-sharp.',
    keyFeatures: [
      'Designed with precision pixel-grid alignment for supreme clarity on high-density Retina phone displays.',
      'Geist Mono includes slashed zeros, clear bracket distinctions, and balanced operator spacing.',
      'Free and open-source under the SIL Open Font License for unrestricted commercial app use.'
    ],
    bestUsedFor: 'Developer tools, productivity apps, finance and crypto dashboards, and applications requiring clean monospace formatting.',
    freeTierInfo: '100% free and open source with full commercial usage permissions.',
    quickStart: 'Download the font package files (.woff2 / .ttf) and place them in \'public/fonts/\'. Register local @font-face rules in your root stylesheet with \'font-display: swap\' and assign font-family variables across Tailwind and CSS components.',
    reviewTraps: 'Never load font files from remote CDN servers at runtime without offline fallback. App Store reviewers test in airplane mode, and network font failure causes layout shifts or unrendered glyphs that trigger rejection.',
    url: 'https://vercel.com/font',
    iconName: 'Code',
    promptOrCommand: 'Import Geist for primary headings and Geist Mono for all numeric counters, IDs, and code blocks. Configure tabular figures (\'tnum\') in CSS so numbers never jitter during counter animations.',
    promptLabel: 'AI Prompt for Geist Typography'
  },
  {
    id: 'type-uncut-curated',
    title: 'Uncut.wtf (Contemporary Fonts)',
    category: 'typography',
    categoryLabel: 'Contemporary Display Fonts',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'A curated catalog of contemporary, cutting-edge typefaces created by independent type designers, all available with 100% free commercial licenses.',
    whyItMatters: 'If your app needs a distinctive personality—such as an editorial serif for reading apps, a luxury headline font, or a brutalist display face—Uncut provides high-fashion typefaces without expensive licensing fees.',
    keyFeatures: [
      'Curated collection of expressive, trend-setting typefaces with unique visual character.',
      'All listed typefaces have verified free commercial licenses with zero hidden royalty traps.',
      'Direct font file downloads (.otf, .woff2) ready for immediate local mobile embedding.'
    ],
    bestUsedFor: 'Hero welcome screens, brand logos, editorial publications, lifestyle apps, and unique display headings.',
    freeTierInfo: '100% free with open licenses verified by independent designers.',
    quickStart: 'Download the font package files (.woff2 / .ttf) and place them in \'public/fonts/\'. Register local @font-face rules in your root stylesheet with \'font-display: swap\' and assign font-family variables across Tailwind and CSS components.',
    reviewTraps: 'Never load font files from remote CDN servers at runtime without offline fallback. App Store reviewers test in airplane mode, and network font failure causes layout shifts or unrendered glyphs that trigger rejection.',
    url: 'https://uncut.wtf/',
    iconName: 'Sparkles',
    promptOrCommand: 'Integrate an expressive contemporary display font for our app\'s splash and header typography, pairing it cleanly with an accessible geometric sans body font.',
    promptLabel: 'AI Prompt for Editorial Typography'
  },
  // ==========================================
  // 1. AI MODELS & CODING AGENTS (8 RESOURCES)
  // ==========================================
  {
    id: 'ai-gemini-antigravity',
    title: 'Google Gemini',
    category: 'ai_models',
    categoryLabel: 'Multimodal AI & Reasoning Model',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Google\'s flagship multimodal AI model family (Gemini 2.0 Flash & Pro) with 2,000,000 token context window, deep reasoning, and native coding capabilities.',
    whyItMatters: 'Massive context allows feeding entire multi-package mobile repositories, native Xcode projects, and documentation simultaneously for end-to-end coding loops and rapid prototyping.',
    keyFeatures: [
      'Native multimodal reasoning with image, video, audio, and code understanding.',
      'Massive 2,000,000 token context window ingests entire full-stack mobile codebases.',
      'Fast real-time responses with Gemini 2.0 Flash for coding assistance, debugging, and drafting architectures.'
    ],
    bestUsedFor: 'End-to-end coding, debugging mobile apps, analyzing UI screenshots, large-scale codebase refactoring, and technical questions.',
    freeTierInfo: 'Free to use on web and mobile at gemini.google.com with access to Gemini 2.0 Flash.',
    quickStart: 'Configure your developer terminal with CLI access to Google Gemini. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://gemini.google.com',
    iconName: 'Sparkles',
  },
  {
    id: 'ai-openai-astra',
    title: 'OpenAI o3-mini & GPT-4o',
    category: 'ai_models',
    categoryLabel: 'STEM Reasoning & Interactive Canvas',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'OpenAI\'s state-of-the-art STEM reasoning models with interactive Canvas editor and real-time multimodal developer capabilities.',
    whyItMatters: 'o3-mini provides deep step-by-step mathematical reasoning to solve complex state transitions, cryptographic logic, and difficult algorithmic bugs.',
    keyFeatures: [
      'Interactive Canvas interface allows line-by-line co-editing and targeted code improvements.',
      'High-tier benchmark reasoning for tricky concurrency, state machines, and mathematical formulas.',
      'Broad ecosystem integration across web, terminal, and IDE extensions.'
    ],
    bestUsedFor: 'Algorithmic problem solving, complex regex & state-machine logic, and interactive line-by-line refactoring in Canvas.',
    freeTierInfo: 'Free on ChatGPT web and mobile with daily quotas for GPT-4o and o3-mini; free developer playground credits upon onboarding.',
    quickStart: 'Configure your developer terminal with CLI access to OpenAI o3-mini & GPT-4o. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://chatgpt.com',
    iconName: 'Cpu',
    promptOrCommand: 'curl https://api.openai.com/v1/chat/completions',
    promptLabel: 'API Endpoint'
  },
  {
    id: 'ai-claude-sonnet',
    title: 'Claude 3.7 Sonnet',
    category: 'ai_models',
    categoryLabel: 'Hybrid Reasoning & Terminal Agent',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Frontier hybrid reasoning model and terminal agent capable of autonomous project-wide refactoring and deep architectural adherence.',
    whyItMatters: 'Claude leads coding benchmarks for deep architectural understanding, adhering strictly to complex guidelines, and generating production-ready code with minimal human intervention.',
    keyFeatures: [
      'Unmatched multi-file code refactoring and project-wide context awareness.',
      'Powers leading terminal and desktop coding agents (Claude Code, Cursor, Windsurf).',
      'Understands mobile UI screenshots and accurately translates visual designs into clean code.'
    ],
    bestUsedFor: 'Multi-file architecture, comprehensive code audits, terminal-driven test fixing, and writing strict TypeScript schemas.',
    freeTierInfo: 'Free web tier on Claude.ai with generous recurring quota; pay-as-you-go developer API.',
    quickStart: 'Configure your developer terminal with CLI access to Claude 3.7 Sonnet. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://claude.ai',
    iconName: 'Sparkles',
    promptOrCommand: 'npm install -g @anthropic-ai/claude-code',
    promptLabel: 'Install Claude Code'
  },
  {
    id: 'ai-deepseek-r1',
    title: 'DeepSeek R1 & V3',
    category: 'ai_models',
    categoryLabel: 'Open Weight Reasoning Powerhouse',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Open-weight reasoning powerhouse matching frontier performance on math and code benchmarks, available for 100% offline private execution.',
    whyItMatters: 'DeepSeek provides frontier-level coding logic with permissive open weights, allowing indie developers to run powerful coding models 100% offline and privately via Ollama.',
    keyFeatures: [
      'Open-weight accessibility: can be run 100% offline and private on your local machine using Ollama.',
      'High reasoning benchmark performance on code synthesis and logical puzzles.',
      'Extreme cost efficiency for high-volume automated testing pipelines and CI/CD scripts.'
    ],
    bestUsedFor: '100% private offline development, proprietary codebase analysis, CI/CD automated lint checks, and budget-conscious batch scripting.',
    freeTierInfo: '100% free and open-source under permissive MIT license; run locally on your Mac/PC or use free web chat.',
    quickStart: 'Configure your developer terminal with CLI access to DeepSeek R1 & V3. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://chat.deepseek.com',
    iconName: 'Brain',
    promptOrCommand: 'ollama run deepseek-r1:14b',
    promptLabel: 'Run Offline via Ollama'
  },
  {
    id: 'ai-cursor',
    title: 'Cursor AI Code Editor',
    category: 'ai_models',
    categoryLabel: 'Agentic VS Code Fork',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'The premier VS Code fork built from the ground up for agentic pair programming, codebase-wide indexing, and multi-file editing.',
    whyItMatters: 'Deeply indexes your repository locally with embeddings, enabling natural language questions across hundreds of files simultaneously.',
    keyFeatures: [
      '@Codebase indexing understands your entire project structure and symbols.',
      'Multi-file Agent mode automatically applies coordinated diffs across multiple files.',
      'Instant inline Tab completion predicts your next cursor location and code edits.'
    ],
    bestUsedFor: 'Daily rapid mobile & web development, repository-wide feature additions, and interactive AI pair programming.',
    freeTierInfo: 'Permanent Free plan with 2,000 completions and 50 slow premium requests every month; compatible with all VS Code extensions.',
    quickStart: 'Configure your developer terminal with CLI access to Cursor AI Code Editor. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://cursor.com',
    iconName: 'Terminal'
  },
  {
    id: 'ai-windsurf',
    title: 'Windsurf by Codeium',
    category: 'ai_models',
    categoryLabel: 'Collaborative Agentic IDE',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Next-generation AI editor introducing deep collaborative agentic flows (Cascade) that seamlessly transition between developer and AI control.',
    whyItMatters: 'Combines deep codebase awareness with real-time terminal execution monitoring to catch and fix compilation errors automatically.',
    keyFeatures: [
      'Cascade Flow provides collaborative agentic execution with full developer oversight.',
      'Deep context engine analyzes real-time terminal outputs and compiler diagnostics.',
      'Super-fast context retrieval across local files and external web documentation.'
    ],
    bestUsedFor: 'Building complex features where AI inspects compiler warnings and automatically writes unit test suites.',
    freeTierInfo: 'Permanent Free plan with unlimited single-line autocompletes and recurring free Cascade credits every day.',
    quickStart: 'Configure your developer terminal with CLI access to Windsurf by Codeium. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://codeium.com/windsurf',
    iconName: 'Terminal'
  },
  {
    id: 'ai-v0-vercel',
    title: 'v0 by Vercel',
    category: 'ai_models',
    categoryLabel: 'Generative UI Platform',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Generative UI workbench that generates production-grade React, Tailwind, and React Native components from plain English prompts.',
    whyItMatters: 'Eliminates hundreds of hours spent designing and coding basic UI boilerplate like modals, forms, dashboard widgets, and settings screens.',
    keyFeatures: [
      'Generates accessible, responsive React components using Tailwind CSS and Radix UI.',
      'Instant live browser preview with copy-paste CLI integration directly into your project.',
      'Iterative prompt editing: click any element and prompt the AI to restyle or refactor it.'
    ],
    bestUsedFor: 'Rapidly creating mockups, customer-facing forms, dashboards, and mobile component layouts without opening Figma.',
    freeTierInfo: 'Free plan with 200 monthly credits refreshed every month; generated code is 100% yours to export and use commercially.',
    quickStart: 'Configure your developer terminal with CLI access to v0 by Vercel. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://v0.dev',
    iconName: 'Layers',
    promptOrCommand: 'npx v0 add [component-id]',
    promptLabel: 'Import Component'
  },
  {
    id: 'ai-ollama',
    title: 'Ollama Local Runtime',
    category: 'ai_models',
    categoryLabel: 'Local AI Model CLI & Server',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Get up and running with Llama 3.3, DeepSeek R1, Qwen 2.5 Coder, and Mistral locally on macOS, Linux, and Windows with a single terminal command.',
    whyItMatters: 'Empowers developers to build local, zero-latency, privacy-first AI features into native mobile backends without paying cloud API bills.',
    keyFeatures: [
      'Single command download and local GPU-accelerated inference (Metal on Apple Silicon).',
      'OpenAI-compatible local HTTP REST API listening on localhost:11434.',
      'Full model library including Qwen 2.5 Coder, Llama 3.3, and DeepSeek R1 reasoning models.'
    ],
    bestUsedFor: 'Private offline coding on flights, developing local AI-powered mobile apps, and running local automated testing loops.',
    freeTierInfo: '100% free and open source (MIT license); unlimited local inference on your own hardware forever.',
    quickStart: 'Configure your developer terminal with CLI access to Ollama Local Runtime. Authorize workspace permissions to inspect your project files, enforce TypeScript strict mode, and instruct the agent to run automated build checks after every edit.',
    reviewTraps: 'Never commit raw API keys or client secrets into public GitHub repositories or client-side bundles. Always store credentials in .env.local, inspect all agent-generated code for security vulnerabilities, and verify licenses.',
    url: 'https://ollama.com',
    iconName: 'Terminal',
    promptOrCommand: 'brew install ollama && ollama run qwen2.5-coder:7b',
    promptLabel: 'Install & Run'
  },

  // ==========================================
  // 2. DESIGN & UI/UX RESOURCES (8 RESOURCES)
  // ==========================================
  {
    id: 'design-apple-hig',
    title: 'Apple Human Interface Guidelines',
    category: 'design',
    categoryLabel: 'Official Design Specification',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Apple\'s definitive design guidelines covering visual layout, fluid motion, gestures, typography, and dark mode compliance.',
    whyItMatters: 'Apps that follow the HIG feel authentically native, delight users, and receive priority editorial consideration and features on the App Store.',
    keyFeatures: [
      'Detailed specifications for navigation bars, tab bars, sheets, and touch targets (minimum 44x44 pt).',
      'Principles of fluid spring motion, haptic feedback, and authentic Apple typography scales.',
      'Clear accessibility rules for Dynamic Type, VoiceOver, and high-contrast color ratios.'
    ],
    bestUsedFor: 'Reviewing app layout, ensuring touch target compliance, designing navigation hierarchies, and preparing for App Review.',
    freeTierInfo: '100% free and open documentation provided by Apple for all developers worldwide.',
    quickStart: 'Study layout specifications for Apple Human Interface Guidelines on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://developer.apple.com/design/human-interface-guidelines',
    iconName: 'Eye'
  },
  {
    id: 'design-apple-figma',
    title: 'Apple Official Design Kits',
    category: 'design',
    categoryLabel: 'Official UI Kits & Templates',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Official Apple Figma design kits containing every native iOS, iPadOS, macOS, and watchOS UI component and system template.',
    whyItMatters: 'Designing with official components guarantees that your buttons, segmented controls, sheets, and pickers match native iOS pixel-for-pixel.',
    keyFeatures: [
      'Comprehensive libraries of native iOS 18 system controls, keyboards, status bars, and widgets.',
      'Pre-configured dark mode color styles, dynamic type text styles, and SF Pro variants.',
      'Official Apple Device Frames for creating stunning App Store marketing screenshots.'
    ],
    bestUsedFor: 'Designing pixel-perfect mockups in Figma that developers can implement with 1:1 fidelity in SwiftUI, React Native, or Capacitor.',
    freeTierInfo: '100% free Figma community file published and updated continuously by Apple Design.',
    quickStart: 'Study layout specifications for Apple Official Design Kits on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://developer.apple.com/design/resources',
    iconName: 'Palette'
  },
  {
    id: 'design-sf-symbols',
    title: 'SF Symbols 6',
    category: 'design',
    categoryLabel: 'System Icon Library',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Over 6,000 consistent, highly configurable symbols designed to integrate seamlessly with Apple\'s San Francisco system typography.',
    whyItMatters: 'Supports multicolor rendering, hierarchical opacity, and built-in Apple spring animations (bounce, pulse, scale) that make native interfaces feel alive.',
    keyFeatures: [
      '6,000+ vector symbols designed to align optically with text baselines at all weights.',
      'Native support for Apple Spring Animations (Wiggle, Pulse, Bounce, Rotate) in iOS 17 & 18.',
      'Exportable to custom vector SVGs for cross-platform web and mobile use.'
    ],
    bestUsedFor: 'Tab bar icons, navigation bar buttons, status indicators, and subtle tactile UI animations in iOS apps.',
    freeTierInfo: 'Free native macOS app download for all registered Apple developers.',
    quickStart: 'Study layout specifications for SF Symbols 6 on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://developer.apple.com/sf-symbols',
    iconName: 'CheckCircle2'
  },
  {
    id: 'design-google-material',
    title: 'Google Material Design 3',
    category: 'design',
    categoryLabel: 'Cross-Platform Design System',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'android',
    shortDescription: 'Google\'s open-source design system featuring dynamic color algorithms, elevation tokens, responsive layouts, and accessible components.',
    whyItMatters: 'Essential reference when designing Android apps or cross-platform Flutter/React Native apps that need to respect Android platform conventions.',
    keyFeatures: [
      'Dynamic Material You theming that extracts harmonious palettes from user wallpapers.',
      'Exhaustive component guidelines covering bottom sheets, navigation rails, and cards.',
      'Open-source Figma libraries and ready-to-use Flutter and Android Jetpack Compose code.'
    ],
    bestUsedFor: 'Designing Android-first applications, cross-platform apps, and accessible responsive web dashboards.',
    freeTierInfo: '100% free, open-source design system and documentation published by Google.',
    quickStart: 'Study layout specifications for Google Material Design 3 on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://m3.material.io',
    iconName: 'Palette'
  },
  {
    id: 'design-lucide-icons',
    title: 'Lucide Vector Icon Library',
    category: 'design',
    categoryLabel: 'Open Source Vector Icons',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Community-run fork of Feather icons with 1,400+ beautiful, consistent, open-source vector icons optimized for modern mobile apps.',
    whyItMatters: 'Clean 24x24 grid with customizable stroke width (1.5 to 2.5) provides a clean, modern aesthetic that feels right at home in modern iOS and web apps.',
    keyFeatures: [
      'Over 1,400+ crisp, minimal icons covering utility, navigation, media, and development.',
      'First-class packages for React, React Native, Vue, Svelte, and raw SVGs.',
      'Tree-shakeable: only the icons you import are bundled into your production app.'
    ],
    bestUsedFor: 'Application icon buttons, menu lists, category badges, and settings screen icons with zero layout shift.',
    freeTierInfo: '100% free and open source under permissive ISC license; zero attribution required.',
    quickStart: 'Study layout specifications for Lucide Vector Icon Library on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://lucide.dev',
    iconName: 'CheckSquare',
    promptOrCommand: 'npm install lucide-react',
    promptLabel: 'Install Library'
  },
  {
    id: 'design-mobbin',
    title: 'Mobbin Mobile UX Patterns',
    category: 'design',
    categoryLabel: 'Real-World App Teardowns',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'The world\'s largest mobile app design reference library featuring thousands of real-world iOS and Android screenshots and onboarding flows.',
    whyItMatters: 'Save hours of guesswork by studying how top apps (Airbnb, Uber, Duolingo, Revolut) design their paywalls, onboarding sequences, and settings.',
    keyFeatures: [
      '300,000+ searchable screens filtered by UI patterns (Paywalls, Empty States, Bottom Sheets).',
      'Complete end-to-end user flows captured directly from the latest App Store releases.',
      'Interactive zoom and side-by-side version comparison across major app updates.'
    ],
    bestUsedFor: 'Benchmarking paywalls, crafting intuitive onboarding screens, and finding inspiration for complex mobile user flows.',
    freeTierInfo: 'Generous free tier with searchable access to thousands of mobile app screens and flows.',
    quickStart: 'Study layout specifications for Mobbin Mobile UX Patterns on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://mobbin.com',
    iconName: 'Layers'
  },
  {
    id: 'design-tailwind',
    title: 'Tailwind CSS & UI',
    category: 'design',
    categoryLabel: 'Utility-First Styling Framework',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Utility-first CSS framework and design patterns that enable rapid styling of responsive, accessible user interfaces without leaving your HTML.',
    whyItMatters: 'Standardizes spacing, typography, and color tokens across your entire project, making AI code generation and manual edits blazing fast.',
    keyFeatures: [
      'Zero runtime overhead: purges unused styles for ultra-lightweight mobile stylesheets.',
      'Consistent design tokens for padding, margins, rounded corners, and color palettes.',
      'Seamless support for dark mode, animations, transitions, and dynamic viewport heights.'
    ],
    bestUsedFor: 'Styling Capacitor hybrid apps, React Native (via NativeWind), and modern responsive web frontends.',
    freeTierInfo: 'Tailwind CSS core is 100% free and open-source (MIT); extensive free documentation and official code snippets.',
    quickStart: 'Study layout specifications for Tailwind CSS & UI on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://tailwindcss.com',
    iconName: 'Palette',
    promptOrCommand: 'npm install -D tailwindcss postcss autoprefixer',
    promptLabel: 'Install Tailwind'
  },
  {
    id: 'design-shots-mockup',
    title: 'Shots.so Mockup Studio',
    category: 'design',
    categoryLabel: 'Browser Mockup Studio',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Fast browser-based mockup studio to frame your app screenshots in authentic iPhone 16 Pro, iPad, and MacBook device frames.',
    whyItMatters: 'Professional marketing screenshots and social share cards drastically improve App Store click-through rates and early download conversion.',
    keyFeatures: [
      'Realistic 3D iPhone 16 Pro, iPad Pro, and Android device frames with customizable angles.',
      'Customizable background gradients, studio lighting, shadows, and device colors.',
      'Instant export in high-resolution PNG format optimized for Product Hunt and social media.'
    ],
    bestUsedFor: 'Creating promotional graphics for App Store product pages, Twitter/X launch announcements, and portfolio showcases.',
    freeTierInfo: '100% free browser tool with zero watermarks and instant high-res downloads.',
    quickStart: 'Study layout specifications for Shots.so Mockup Studio on mobile viewports. Ensure all interactive tap targets exceed 44x44 pt, observe safe area insets (\'env(safe-area-inset-top)\'), and implement smooth spring transitions for all modal sheets.',
    reviewTraps: 'Avoid placing buttons too close to the home indicator or status bar. Violating minimum 44x44 pt touch targets or using non-standard navigation gestures will trigger App Store Review Guideline 4.0 Design rejections.',
    url: 'https://shots.so',
    iconName: 'Image'
  },

  // ==========================================
  // 3. CURATED OPEN SOURCE REPOS & SDKS (8 RESOURCES)
  // ==========================================
  {
    id: 'repo-capacitor',
    title: 'Capacitor by Ionic',
    category: 'github_repos',
    categoryLabel: 'Native Mobile Runtime',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Cross-platform native runtime enabling web apps (React, Vue, Vite) to run with 100% native iOS Swift & Android Java APIs.',
    whyItMatters: 'Build your entire app using modern web technologies (Vite, React, Tailwind) while maintaining direct access to native device hardware, Keychain, and App Store in-app purchases.',
    keyFeatures: [
      'Zero-lock-in architecture: outputs clean, standard Xcode and Android Studio projects.',
      'Rich official plugin ecosystem (Camera, Biometrics, Geolocation, Push Notifications).',
      'Enables rapid web hot-reloading during development with live on-device testing.'
    ],
    bestUsedFor: 'Turning web apps into top-tier native iOS and Android apps with full App Store distribution and native performance.',
    freeTierInfo: '100% free and open source under permissive MIT license.',
    quickStart: 'Install the library via your package manager (\'npm install @capacitor/capacitor\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://capacitorjs.com',
    iconName: 'Terminal',
    promptOrCommand: 'npm install @capacitor/core @capacitor/cli && npx cap init',
    promptLabel: 'Setup Capacitor'
  },
  {
    id: 'repo-expo',
    title: 'Expo & React Native',
    category: 'github_repos',
    categoryLabel: 'Universal React Native Framework',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Universal native platform for React with hot reloading, file-based routing, native component bridges, and automated cloud builds.',
    whyItMatters: 'Expo eliminates the need for native Xcode and Android Studio configuration for most standard apps, making mobile development feel like building for the web.',
    keyFeatures: [
      'Expo Router provides file-based routing matching modern Next.js conventions.',
      'EAS Build automates compiling iOS IPA and Android AAB binaries in the cloud.',
      'Over-the-air (OTA) updates allow pushing critical bug fixes without waiting for App Store review.'
    ],
    bestUsedFor: 'Building 100% native React Native applications with cross-platform code sharing across iOS, Android, and Web.',
    freeTierInfo: 'Expo framework is 100% free and open-source (MIT); generous free tier on EAS for indie builds.',
    quickStart: 'Install the library via your package manager (\'npm install expo\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://expo.dev',
    iconName: 'Terminal',
    promptOrCommand: 'npx create-expo-app@latest my-app',
    promptLabel: 'Create Expo App'
  },
  {
    id: 'repo-revenuecat',
    title: 'RevenueCat Purchases SDK',
    category: 'github_repos',
    categoryLabel: 'In-App Subscriptions Infrastructure',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'In-app subscriptions and purchase infrastructure SDK wrapping Apple StoreKit 2 and Google Play Billing into a unified API.',
    whyItMatters: 'Building subscription receipt validation, paywall experimentation, and cancellation tracking from scratch takes months. RevenueCat solves it in hours.',
    keyFeatures: [
      'Cross-platform entitlements: grants user access across iOS, Android, and web checkout.',
      'Server-side receipt validation with automatic handling of grace periods, refunds, and renewals.',
      'Visual paywall builder with built-in remote A/B testing directly from the dashboard.'
    ],
    bestUsedFor: 'Monetizing mobile apps with auto-renewing subscriptions, lifetime purchases, and paywall experiments.',
    freeTierInfo: 'Free tier up to $2,500/month in tracked monthly revenue with zero monthly platform fee.',
    quickStart: 'Install the library via your package manager (\'npm install revenuecat\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://www.revenuecat.com',
    iconName: 'CreditCard',
    promptOrCommand: 'npm install @revenuecat/purchases-capacitor',
    promptLabel: 'Install Purchases SDK'
  },
  {
    id: 'repo-zustand',
    title: 'Zustand State Store',
    category: 'github_repos',
    categoryLabel: 'Bearbones State Management',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'A small, fast, scalable bearbones state-management solution using simplified flux principles without boilerplate or context hell.',
    whyItMatters: 'Weighs under 1kB, avoids unnecessary re-renders with selective state subscriptions, and seamlessly integrates with localStorage for persistent state.',
    keyFeatures: [
      'Zero boilerplate: create global state stores with simple, readable TypeScript hooks.',
      'Built-in persist middleware automatically saves state to localStorage or Capacitor Preferences.',
      'Selective subscriptions prevent entire view trees from re-rendering on minor updates.'
    ],
    bestUsedFor: 'Managing global app state like user preferences, checklist completion status, and active project metadata.',
    freeTierInfo: '100% free and open source under permissive MIT license.',
    quickStart: 'Install the library via your package manager (\'npm install zustand\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://github.com/pmndrs/zustand',
    iconName: 'Zap',
    promptOrCommand: 'npm install zustand',
    promptLabel: 'Install Zustand'
  },
  {
    id: 'repo-tanstack-query',
    title: 'TanStack React Query',
    category: 'github_repos',
    categoryLabel: 'Async State & Data Fetching',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Powerful asynchronous state management, server cache synchronization, offline mutation queues, and automatic retries.',
    whyItMatters: 'Eliminates hundreds of lines of manual useEffect and loading/error boolean states, making apps resilient to spotty mobile cellular connections.',
    keyFeatures: [
      'Automatic background refetching and cache invalidation when internet connectivity restores.',
      'Optimistic updates: update mobile UI instantly before network requests complete.',
      'Built-in garbage collection, deduplication, and window focus refetching.'
    ],
    bestUsedFor: 'Syncing remote API data, handling mobile offline data queues, and caching backend database queries.',
    freeTierInfo: '100% free and open-source under permissive MIT license.',
    quickStart: 'Install the library via your package manager (\'npm install tanstack-query\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://tanstack.com/query',
    iconName: 'Zap',
    promptOrCommand: 'npm install @tanstack/react-query',
    promptLabel: 'Install TanStack Query'
  },
  {
    id: 'repo-fastlane',
    title: 'Fastlane Automated Deployment',
    category: 'github_repos',
    categoryLabel: 'iOS & Android Release Automation',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'The open-source industry standard for automating building, signing, capturing screenshots, and deploying iOS and Android apps to TestFlight and Play Store.',
    whyItMatters: 'Replaces tedious manual 45-minute Xcode archiving and certificate management with a single terminal command: fastlane beta.',
    keyFeatures: [
      'match: automatically syncs iOS code signing identities and provisioning profiles via git.',
      'deliver: automatically uploads binary builds, metadata, and App Store screenshots.',
      'gym: compiles and packages sleek iOS IPA archives with optimal bitcode and symbol maps.'
    ],
    bestUsedFor: 'Automating TestFlight beta deployments, App Store submission pipelines, and continuous integration (CI/CD) workflows.',
    freeTierInfo: '100% free and open-source tool maintained by the mobile developer community (MIT).',
    quickStart: 'Install the library via your package manager (\'npm install fastlane\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://fastlane.tools',
    iconName: 'Rocket',
    promptOrCommand: 'brew install fastlane && fastlane init',
    promptLabel: 'Install Fastlane'
  },
  {
    id: 'repo-flutter',
    title: 'Google Flutter SDK',
    category: 'github_repos',
    categoryLabel: 'Multi-Platform UI Toolkit',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Google\'s open-source UI toolkit for compiling natively compiled applications for mobile, web, and desktop from a single Dart codebase.',
    whyItMatters: 'High-performance Impeller rendering engine guarantees consistent 120 FPS animations without JavaScript bridge overhead.',
    keyFeatures: [
      'Fast stateful hot reload allows seeing code changes on physical devices in sub-seconds.',
      'Extensive catalog of pixel-accurate Material Design and iOS Cupertino widgets.',
      'Single codebase compiles down to native ARM machine code for iOS and Android.'
    ],
    bestUsedFor: 'Apps requiring complex 2D custom canvas graphics, ultra-smooth gaming-grade UI animations, and unified multi-platform parity.',
    freeTierInfo: '100% free and open-source under permissive BSD-3 license.',
    quickStart: 'Install the library via your package manager (\'npm install flutter\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://flutter.dev',
    iconName: 'Play',
    promptOrCommand: 'flutter create my_app',
    promptLabel: 'Create Flutter App'
  },
  {
    id: 'repo-lucide-react',
    title: 'Lucide React Components',
    category: 'github_repos',
    categoryLabel: 'Icon Components for React',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Tree-shakeable React icon components for Lucide with clean SVG output, dynamic sizing, customizable strokes, and zero dependencies.',
    whyItMatters: 'Guarantees that your icons render with exact pixel sharpness, zero layout shift, and optimal bundle size.',
    keyFeatures: [
      'Over 1,400+ pure React SVG components ready to drop into JSX.',
      'Supports all standard SVG props: className, strokeWidth, size, color.',
      'Fully tree-shakeable: only bundle the exact icons your application imports.'
    ],
    bestUsedFor: 'Navigation icons, action buttons, status pills, and empty state illustrations across React and React Native web apps.',
    freeTierInfo: '100% free and open source under permissive ISC license.',
    quickStart: 'Install the library via your package manager (\'npm install lucide-react\'). Run \'npx cap sync\' to bridge native Swift and Kotlin plugins, then import into your project components.',
    reviewTraps: 'Always verify the library is actively maintained and supports the latest iOS and Android SDK versions. Unmaintained native plugins often fail CocoaPods or Gradle builds and can introduce deprecated store APIs.',
    url: 'https://github.com/lucide-icons/lucide',
    iconName: 'CheckSquare',
    promptOrCommand: 'npm install lucide-react',
    promptLabel: 'Install Icons'
  },

  // ==========================================
  // 4. BACKEND, DATABASE & CLOUD (8 RESOURCES)
  // ==========================================
  {
    id: 'backend-supabase',
    title: 'Supabase Database & Auth',
    category: 'backend',
    categoryLabel: 'Postgres Database & Realtime Auth',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Dedicated Postgres database, instant row-level security (RLS), edge functions, social auth, and realtime subscriptions.',
    whyItMatters: 'Combines the flexibility of standard relational SQL with the developer experience of instant REST and GraphQL APIs, eliminating backend boilerplate.',
    keyFeatures: [
      'Full Postgres database with complete SQL capabilities, extensions (pgvector), and triggers.',
      'Row Level Security (RLS) policies enforce security directly at the database engine level.',
      'Built-in social authentication (Sign in with Apple, Google) and S3-compatible file storage.'
    ],
    bestUsedFor: 'Mobile app backends, real-time sync, user authentication, and secure relational database storage.',
    freeTierInfo: 'Free plan includes 2 projects, 500MB database storage, 1GB file storage, and 50,000 monthly active users.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://supabase.com',
    iconName: 'Database',
    promptOrCommand: 'npm install @supabase/supabase-js',
    promptLabel: 'Install Supabase SDK'
  },
  {
    id: 'backend-firebase',
    title: 'Google Firebase Suite',
    category: 'backend',
    categoryLabel: 'Mobile App Backend Suite',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Google\'s comprehensive mobile backend suite providing Cloud Firestore, FCM Push Notifications, Authentication, and Crashlytics.',
    whyItMatters: 'Firebase Cloud Messaging (FCM) is the industry standard for sending push notifications reliably to millions of iOS and Android devices for free.',
    keyFeatures: [
      'Cloud Firestore real-time NoSQL database with automatic offline synchronization.',
      'Firebase Cloud Messaging (FCM) delivers unlimited free push notifications.',
      'Remote Config enables updating app behavior and conducting A/B tests without app updates.'
    ],
    bestUsedFor: 'Push notification delivery, real-time collaborative feeds, and rapid mobile authentication.',
    freeTierInfo: 'Generous Spark plan is 100% free with 1GB storage, 50k reads/day, and unlimited FCM push notifications.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://firebase.google.com',
    iconName: 'Flame'
  },
  {
    id: 'backend-neon',
    title: 'Neon Serverless Postgres',
    category: 'backend',
    categoryLabel: 'Serverless Branching Postgres',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Fully managed serverless Postgres with instant branching, bottomless storage, and zero-dollar scale-to-zero compute.',
    whyItMatters: 'Branching allows you to create an instant copy of your production database for testing pull requests without touching live user data.',
    keyFeatures: [
      'Instant database branching works like git branches for your database schema and data.',
      'Scales to zero when idle: saves compute hours and eliminates idle server expenses.',
      'Modern connection pooling supports high-concurrency serverless edge functions.'
    ],
    bestUsedFor: 'Serverless APIs, preview deployment testing, and modern applications using Prisma, Drizzle, or Kysely ORMs.',
    freeTierInfo: 'Permanent Free Tier with 0.5GB storage, 1 compute branch, and no credit card required.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://neon.tech',
    iconName: 'Database'
  },
  {
    id: 'backend-cloudflare',
    title: 'Cloudflare Workers & R2',
    category: 'backend',
    categoryLabel: 'Global Edge Runtime & Storage',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Global edge runtime running across 300+ cities with zero egress-fee S3-compatible R2 object storage.',
    whyItMatters: 'Zero egress fees on R2 storage means serving user profile pictures, videos, and app assets never produces shock bandwidth bills.',
    keyFeatures: [
      'Sub-millisecond cold starts executing code on edge locations nearest to your user.',
      'Cloudflare R2 provides S3-compatible object storage with exactly $0 in egress fees.',
      'Built-in DDoS protection, automated SSL termination, and global edge caching.'
    ],
    bestUsedFor: 'Serving user media uploads, hosting lightweight edge API proxies, and caching mobile backend responses.',
    freeTierInfo: '100,000 free Worker requests per day; 10GB free R2 storage with zero bandwidth egress costs.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://workers.cloudflare.com',
    iconName: 'Globe',
    promptOrCommand: 'npm create cloudflare@latest',
    promptLabel: 'Deploy Edge Worker'
  },
  {
    id: 'backend-resend',
    title: 'Resend Transactional Email',
    category: 'backend',
    categoryLabel: 'Transactional Email API',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'The developer-first email platform with React Email templates, instant deliverability, and webhook tracking.',
    whyItMatters: 'Write beautiful, responsive transactional emails (welcome emails, password resets, receipt confirmations) using standard React components.',
    keyFeatures: [
      'First-class React Email support: write email templates as clean JSX components.',
      'Industry-leading deliverability with automatic SPF, DKIM, and DMARC verification.',
      'Real-time delivery, open, and click tracking webhooks for automated user lifecycle events.'
    ],
    bestUsedFor: 'Sending auth verification codes, welcome emails, subscription invoices, and user invite notifications.',
    freeTierInfo: 'Free plan includes 3,000 emails per month (100 emails/day) with custom domain support.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://resend.com',
    iconName: 'FileText',
    promptOrCommand: 'npm install resend',
    promptLabel: 'Install Resend'
  },
  {
    id: 'backend-upstash',
    title: 'Upstash Serverless Redis',
    category: 'backend',
    categoryLabel: 'Serverless Redis & Rate Limiting',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Serverless Redis with per-request pricing, ideal for rate limiting and mobile app session caching.',
    whyItMatters: 'Provides sub-millisecond memory caching and rate limiting over standard HTTP REST, eliminating persistent TCP connection limits on mobile backends.',
    keyFeatures: [
      'REST-based Redis client works seamlessly across edge functions, Cloudflare Workers, and mobile.',
      'Upstash Ratelimit package protects authentication endpoints and AI generation quotas.',
      'Zero maintenance: automatic persistence, replication, and global edge caching.'
    ],
    bestUsedFor: 'API rate limiting, user session storage, leaderboards, and temporary token caching.',
    freeTierInfo: 'Free plan includes 10,000 commands per day with zero credit card required.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://upstash.com',
    iconName: 'Zap',
    promptOrCommand: 'npm install @upstash/redis',
    promptLabel: 'Install Upstash Redis'
  },
  {
    id: 'backend-appwrite',
    title: 'Appwrite Backend Suite',
    category: 'backend',
    categoryLabel: 'Open Source BaaS Suite',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Self-hostable or cloud-managed backend suite with database, storage, authentication, and localization APIs.',
    whyItMatters: 'A powerful open-source alternative for developers who want complete ownership over their infrastructure and user data compliance.',
    keyFeatures: [
      'Complete authentication suite supporting email, phone SMS, magic URLs, and OAuth2.',
      'Flexible document database with advanced queries, permissions, and indexing.',
      'Built-in file encryption, virus scanning, and automated image thumbnail generation.'
    ],
    bestUsedFor: 'Self-hosted privacy-conscious mobile apps, indie games, and applications requiring European data sovereignty.',
    freeTierInfo: 'Open source is 100% free to self-host via Docker; cloud tier offers free developer starter plan.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://appwrite.io',
    iconName: 'Database',
    promptOrCommand: 'docker run -d -p 80:80 -p 443:443 appwrite/appwrite',
    promptLabel: 'Run via Docker'
  },
  {
    id: 'backend-railway',
    title: 'Railway Cloud Deployment',
    category: 'backend',
    categoryLabel: 'Modern Infrastructure Platform',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Instant cloud deployment for Node.js, Python, Go backends, Docker containers, and managed databases with zero DevOps setup.',
    whyItMatters: 'Deploy custom REST APIs, background workers, and databases simply by connecting your GitHub repository.',
    keyFeatures: [
      'Git-push deployments: push code to GitHub and Railway builds and deploys your service.',
      'One-click provisioning of Postgres, Redis, MySQL, and MongoDB databases.',
      'Built-in observability, live log streaming, CPU/RAM telemetry, and automated SSL.'
    ],
    bestUsedFor: 'Hosting custom backend APIs, automated cron workers, webhooks, and private microservices.',
    freeTierInfo: '$5.00 free monthly usage credit on starter tier; pay only for exact second-by-second resources used.',
    quickStart: 'Initialize the client SDK in your mobile environment with public environment variables. Enforce Row Level Security (RLS) across all database tables and configure offline caching with optimistic UI state updates.',
    reviewTraps: 'Leaving database tables without Row Level Security (RLS) policies enabled allows anyone with your public API key to read, alter, or delete customer records. Always test policy isolation before publishing.',
    url: 'https://railway.com',
    iconName: 'Rocket'
  },

  // ==========================================
  // 5. SECURITY, CRYPTOGRAPHY & KEYCHAIN (8 RESOURCES)
  // ==========================================
  {
    id: 'sec-owasp-masvs',
    title: 'OWASP Mobile Security Standard',
    category: 'security',
    categoryLabel: 'Official Security Benchmark',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'The industry gold standard for mobile app security requirements and verification checklists for iOS and Android developers.',
    whyItMatters: 'Provides actionable security controls covering storage, cryptography, authentication, network communication, and platform interaction.',
    keyFeatures: [
      'MASVS-STORAGE: Guidelines to prevent sensitive data leaks in logs, backups, and caches.',
      'MASVS-CRYPTO: Verifies that only proven cryptographic algorithms and hardware keystores are used.',
      'MASVS-NETWORK: Standards for TLS certificate pinning, forward secrecy, and secure transports.'
    ],
    bestUsedFor: 'Pre-launch security audits, compliance verification, and building enterprise-grade security guardrails.',
    freeTierInfo: '100% free open documentation and checklists published by the OWASP Foundation.',
    quickStart: 'Integrate secure hardware-backed storage via the native OS Keychain (iOS) and EncryptedSharedPreferences (Android). Wrap all cryptographic keys and auth tokens in dedicated security helper modules with automatic session expiry.',
    reviewTraps: 'Storing sensitive user auth tokens or personal information in unencrypted localStorage or plain SQLite will fail store security scans and violate MASVS security standards. Always use hardware Keychain or Keystore.',
    url: 'https://mas.owasp.org',
    iconName: 'Shield'
  },
  {
    id: 'sec-apple-keychain',
    title: 'Apple Keychain & Enclave',
    category: 'security',
    categoryLabel: 'Hardware-Backed Key Storage',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Apple\'s official guide on hardware-backed cryptographic key generation, biometric authentication, and secure token storage.',
    whyItMatters: 'Guarantees that sensitive authentication tokens and private keys survive app uninstalls and cannot be extracted from backups or jailbroken devices.',
    keyFeatures: [
      'Hardware-isolated Secure Enclave performs biometric (Face ID / Touch ID) authentication.',
      'Encrypted SQLite database protected by hardware-bound AES-256 keys.',
      'Access control flags require biometric presence before decrypting sensitive tokens.'
    ],
    bestUsedFor: 'Storing user passwords, session tokens, encryption keys, and biometric authentication credentials.',
    freeTierInfo: 'Native iOS platform framework; 100% free and built into every iOS device.',
    quickStart: 'Integrate secure hardware-backed storage via the native OS Keychain (iOS) and EncryptedSharedPreferences (Android). Wrap all cryptographic keys and auth tokens in dedicated security helper modules with automatic session expiry.',
    reviewTraps: 'Storing sensitive user auth tokens or personal information in unencrypted localStorage or plain SQLite will fail store security scans and violate MASVS security standards. Always use hardware Keychain or Keystore.',
    url: 'https://developer.apple.com/documentation/security/keychain_services',
    iconName: 'Key'
  },
  {
    id: 'sec-trufflehog',
    title: 'TruffleHog Secret Scanner',
    category: 'security',
    categoryLabel: 'Open Source Secret Scanner',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Open-source scanner that finds leaked API keys, tokens, and private keys across git history and local filesystem directories.',
    whyItMatters: 'Accidentally pushing an OpenAI, Stripe, or AWS private key to GitHub can compromise your infrastructure and incur thousands of dollars in damages within minutes.',
    keyFeatures: [
      'Detects over 800+ credential types across git commit history and file trees.',
      'Live verification: tests whether discovered keys are currently active and valid.',
      'Integrates seamlessly as a pre-commit hook to catch secrets before they are ever pushed.'
    ],
    bestUsedFor: 'Pre-commit git hooks, scanning repositories before public release, and security hygiene.',
    freeTierInfo: '100% free and open-source CLI under permissive license.',
    quickStart: 'Integrate secure hardware-backed storage via the native OS Keychain (iOS) and EncryptedSharedPreferences (Android). Wrap all cryptographic keys and auth tokens in dedicated security helper modules with automatic session expiry.',
    reviewTraps: 'Storing sensitive user auth tokens or personal information in unencrypted localStorage or plain SQLite will fail store security scans and violate MASVS security standards. Always use hardware Keychain or Keystore.',
    url: 'https://github.com/trufflesecurity/trufflehog',
    iconName: 'Shield',
    promptOrCommand: 'brew install trufflehog && trufflehog filesystem .',
    promptLabel: 'Scan Current Repo'
  },
  {
    id: 'sec-gitguardian',
    title: 'GitGuardian Secret Detection',
    category: 'security',
    categoryLabel: 'Automated Code Security',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Automated secret scanning for GitHub repositories with instant alerts when private API keys are accidentally committed.',
    whyItMatters: 'Provides 24/7 continuous monitoring across public and private repositories to alert developers immediately when credentials are leaked.',
    keyFeatures: [
      'Real-time GitHub pull request integration and automated commit scanning.',
      'Detailed remediation guides with exact steps to revoke and rotate compromised keys.',
      'Covers 350+ API key formats including OpenAI, Anthropic, Stripe, and Google Cloud.'
    ],
    bestUsedFor: 'Continuous monitoring of private development repositories and automated CI/CD secret scanning.',
    freeTierInfo: 'Free plan for individual developers and small teams (up to 25 members) with unlimited public and private repo scans.',
    quickStart: 'Integrate secure hardware-backed storage via the native OS Keychain (iOS) and EncryptedSharedPreferences (Android). Wrap all cryptographic keys and auth tokens in dedicated security helper modules with automatic session expiry.',
    reviewTraps: 'Storing sensitive user auth tokens or personal information in unencrypted localStorage or plain SQLite will fail store security scans and violate MASVS security standards. Always use hardware Keychain or Keystore.',
    url: 'https://www.gitguardian.com',
    iconName: 'Shield'
  },
  {
    id: 'sec-capacitor-vault',
    title: 'Capacitor Secure Storage',
    category: 'security',
    categoryLabel: 'Native Mobile Keychain Wrapper',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'iOS Keychain and Android Keystore wrapper ensuring sensitive user tokens and credentials never touch unencrypted localStorage.',
    whyItMatters: 'Plain web localStorage on mobile is unencrypted and easily inspectable. This plugin stores all data in the device hardware keychain.',
    keyFeatures: [
      'Drop-in replacement for localStorage with asynchronous get/set/remove methods.',
      'Backs data with iOS Keychain Services and Android Keystore AES-256 encryption.',
      'Data survives app updates and remains inaccessible to unauthorized apps.'
    ],
    bestUsedFor: 'Storing JWT auth tokens, user refresh tokens, and encryption secrets in Capacitor and web hybrid mobile apps.',
    freeTierInfo: '100% free and open source under permissive MIT license.',
    quickStart: 'Integrate secure hardware-backed storage via the native OS Keychain (iOS) and EncryptedSharedPreferences (Android). Wrap all cryptographic keys and auth tokens in dedicated security helper modules with automatic session expiry.',
    reviewTraps: 'Storing sensitive user auth tokens or personal information in unencrypted localStorage or plain SQLite will fail store security scans and violate MASVS security standards. Always use hardware Keychain or Keystore.',
    url: 'https://github.com/martinkasa/capacitor-secure-storage-plugin',
    iconName: 'Lock',
    promptOrCommand: 'npm install capacitor-secure-storage-plugin',
    promptLabel: 'Install Plugin'
  },
  {
    id: 'sec-webcrypto',
    title: 'W3C Web Cryptography API',
    category: 'security',
    categoryLabel: 'Native Standard Cryptography',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Standard cryptographic algorithms (AES-256-GCM, SHA-256, HMAC, PBKDF2) implemented in native C++ inside mobile browser runtimes.',
    whyItMatters: 'Hardware-accelerated native crypto operations run hundreds of times faster than JavaScript crypto libraries and are immune to timing attacks.',
    keyFeatures: [
      'Hardware-accelerated AES-GCM symmetric encryption and decryption.',
      'Native SHA-256, SHA-384, and SHA-512 hashing algorithms with zero external dependencies.',
      'Secure random value generation (crypto.getRandomValues) for cryptographically sound UUIDs.'
    ],
    bestUsedFor: 'End-to-end user data encryption, biometric payload verification, and generating secure tokens.',
    freeTierInfo: 'Native web platform standard built into all modern browsers, iOS WebKit, and Android WebView.',
    quickStart: 'Integrate secure hardware-backed storage via the native OS Keychain (iOS) and EncryptedSharedPreferences (Android). Wrap all cryptographic keys and auth tokens in dedicated security helper modules with automatic session expiry.',
    reviewTraps: 'Storing sensitive user auth tokens or personal information in unencrypted localStorage or plain SQLite will fail store security scans and violate MASVS security standards. Always use hardware Keychain or Keystore.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API',
    iconName: 'Key'
  },
  {
    id: 'sec-hibp',
    title: 'Have I Been Pwned',
    category: 'security',
    categoryLabel: 'Credential Breach Database',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Check if user passwords or email addresses have appeared in known data breaches to enforce strong auth guardrails.',
    whyItMatters: 'Warns users during account registration if their password has appeared in a data breach, protecting your app against credential stuffing attacks.',
    keyFeatures: [
      'Pwned Passwords API uses k-anonymity: your password is never sent over the network.',
      'Database of over 850 million breached passwords constantly updated from global breaches.',
      'Instant SHA-1 hash prefix lookup with millisecond response times.'
    ],
    bestUsedFor: 'Validating password strength on sign-up screens and alerting users of compromised credentials.',
    freeTierInfo: 'The Pwned Passwords API is 100% free to query without an API key or account.',
    quickStart: 'Integrate secure hardware-backed storage via the native OS Keychain (iOS) and EncryptedSharedPreferences (Android). Wrap all cryptographic keys and auth tokens in dedicated security helper modules with automatic session expiry.',
    reviewTraps: 'Storing sensitive user auth tokens or personal information in unencrypted localStorage or plain SQLite will fail store security scans and violate MASVS security standards. Always use hardware Keychain or Keystore.',
    url: 'https://haveibeenpwned.com/API/v3',
    iconName: 'Key',
    promptOrCommand: 'curl https://api.pwnedpasswords.com/range/21BD1',
    promptLabel: 'K-Anonymity Query'
  },
  {
    id: 'sec-letsencrypt',
    title: 'Let\'s Encrypt & Certbot',
    category: 'security',
    categoryLabel: 'Free Automated TLS / SSL',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Free, automated, open Certificate Authority providing TLS/SSL certificates to secure all backend API communication.',
    whyItMatters: 'Apple App Transport Security (ATS) strictly enforces modern TLS encryption for all mobile network connections. Let\'s Encrypt provides free certificates.',
    keyFeatures: [
      'Automated renewal via Certbot: set it up once and certificates renew automatically forever.',
      'Broad trust store compatibility across all iOS, Android, and web client operating systems.',
      'Protects mobile user data from man-in-the-middle attacks on public Wi-Fi networks.'
    ],
    bestUsedFor: 'Securing custom backend API servers, webhook endpoints, and staging servers with zero annual certificate costs.',
    freeTierInfo: '100% free non-profit certificate authority operated for the public\'s benefit.',
    quickStart: 'Install Certbot on your web server via snap: "sudo certbot --nginx" or "sudo certbot certonly --standalone". Test auto-renewal using "sudo certbot renew --dry-run".',
    reviewTraps: 'Apple ATS automatically blocks insecure HTTP connections. Always ensure your domain certificate is active before submitting for App Store review.',
    url: 'https://letsencrypt.org',
    iconName: 'Lock'
  },

  // ==========================================
  // 6. PRIVACY, MANIFESTS & DATA PROTECTION (8 RESOURCES)
  // ==========================================
  {
    id: 'priv-apple-manifest',
    title: 'Apple Privacy Manifests',
    category: 'privacy',
    categoryLabel: 'Mandatory iOS 17+ Requirement',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Official Apple guide for required third-party SDK manifests, declared API reasons, and tracking domains starting in iOS 17.',
    whyItMatters: 'Mandatory for all App Store submissions. Failing to declare reasons for APIs like UserDefaults or FileTimestamps results in automatic App Store rejection.',
    keyFeatures: [
      'Exhaustive list of Required Reason APIs (UserDefaults, FileTimestamps, SystemBootTime, DiskSpace).',
      'Format specification for PrivacyInfo.xcprivacy property list files.',
      'Xcode automated privacy report generation aggregates all dependencies into a single summary.'
    ],
    bestUsedFor: 'Auditing app dependencies, generating PrivacyInfo.xcprivacy files, and passing App Store review verification.',
    freeTierInfo: 'Official developer documentation and native Xcode tooling provided 100% free by Apple.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://developer.apple.com/documentation/bundleresources/privacy_manifest_files',
    iconName: 'Shield'
  },
  {
    id: 'priv-apple-att',
    title: 'App Tracking Transparency (ATT)',
    category: 'privacy',
    categoryLabel: 'Mandatory User Consent Framework',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Mandatory iOS framework and user authorization dialog required for apps that track users or access IDFA across third-party apps and websites.',
    whyItMatters: 'Apple strictly rejects apps that collect device identifiers for tracking without displaying the ATT permission prompt before tracking begins.',
    keyFeatures: [
      'ATTrackingManager requestTrackingAuthorization API prompts users for tracking consent.',
      'Clear definition of what constitutes \'tracking\' versus allowed first-party fraud prevention.',
      'Rules for configuring NSUserTrackingUsageDescription with a transparent, clear user rationale.'
    ],
    bestUsedFor: 'Apps integrating advertising SDKs (Meta, Google AdMob) or cross-app analytics trackers.',
    freeTierInfo: 'Official native iOS framework included free in the iOS SDK.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://developer.apple.com/documentation/apptrackingtransparency',
    iconName: 'Eye'
  },
  {
    id: 'priv-nutrition-labels',
    title: 'Apple Privacy Nutrition Labels',
    category: 'privacy',
    categoryLabel: 'App Store Connect Privacy Disclosure',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Official reference for declaring data collection categories, data linked to users, and tracking purposes in App Store Connect.',
    whyItMatters: 'Inaccurate or missing privacy declarations in App Store Connect will result in immediate review rejection or removal of your app from the store.',
    keyFeatures: [
      'Comprehensive data taxonomy: Contact Info, Health & Fitness, Financial Info, Location, Identifiers.',
      'Distinction between Data Used to Track You vs. Data Linked to You vs. Data Not Linked to You.',
      'Detailed rules for optional data disclosures versus required continuous disclosures.'
    ],
    bestUsedFor: 'Completing the App Privacy questionnaire in App Store Connect before publishing app updates.',
    freeTierInfo: 'Official free developer guide provided by Apple.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://developer.apple.com/app-store/app-privacy-details',
    iconName: 'FileText'
  },
  {
    id: 'priv-privado',
    title: 'Privado.ai Privacy Manifest Generator',
    category: 'privacy',
    categoryLabel: 'Automated Manifest Scanner',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Free automated tool to scan your mobile codebase and generate a compliant PrivacyInfo.xcprivacy manifest file.',
    whyItMatters: 'Manually auditing every CocoaPod, Swift package, and npm dependency for Required Reason APIs takes days. This tool scans code in seconds.',
    keyFeatures: [
      'Scans your source code and third-party dependencies for Apple Required Reason APIs.',
      'Generates a compliant PrivacyInfo.xcprivacy file ready to drag-and-drop into Xcode.',
      'Identifies tracking domains and suggests appropriate official Apple approved reason codes.'
    ],
    bestUsedFor: 'Generating compliant Apple privacy manifests for iOS apps using Capacitor, React Native, or native Swift.',
    freeTierInfo: '100% free online privacy manifest generator tool.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://www.privado.ai',
    iconName: 'Shield'
  },
  {
    id: 'priv-gdpr-checklist',
    title: 'GDPR.eu Developer Compliance Checklist',
    category: 'privacy',
    categoryLabel: 'European Privacy Law Guide',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'The definitive developer checklist for GDPR compliance, right to be forgotten (account deletion), and user data export handling.',
    whyItMatters: 'Apple App Store guideline 5.1.1(v) requires apps that support account creation to also allow users to initiate deletion of their account within the app.',
    keyFeatures: [
      'Step-by-step technical checklist covering consent, data minimization, and encryption.',
      'Requirements for implementing in-app account deletion and user data export features.',
      'Standard data breach response protocols and 72-hour notification requirements.'
    ],
    bestUsedFor: 'Auditing account deletion workflows, designing privacy consent banners, and ensuring EU regulatory compliance.',
    freeTierInfo: 'Free public resource co-funded by the Horizon 2020 programme of the European Union.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://gdpr.eu/checklist',
    iconName: 'CheckSquare'
  },
  {
    id: 'priv-iapp',
    title: 'IAPP Global Privacy Guidelines',
    category: 'privacy',
    categoryLabel: 'Global Privacy Benchmarks',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Leading global resource for global privacy laws, CCPA/CPRA California requirements, and COPPA children\'s privacy compliance.',
    whyItMatters: 'Understanding state and international privacy regulations prevents expensive regulatory fines and protects user goodwill.',
    keyFeatures: [
      'Comprehensive tracker of US state privacy laws (California CCPA, Virginia, Colorado).',
      'COPPA guidelines for apps directed towards children under 13 years of age.',
      'Standard data processing agreements (DPA) and vendor risk assessment templates.'
    ],
    bestUsedFor: 'Structuring global privacy policies, handling opt-out requests, and ensuring children\'s app privacy compliance.',
    freeTierInfo: 'Extensive free public resource library, tracker charts, and developer privacy articles.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://iapp.org',
    iconName: 'Globe'
  },
  {
    id: 'priv-termsfeed',
    title: 'TermsFeed Privacy Policy Generator',
    category: 'privacy',
    categoryLabel: 'Store-Compliant Policy Generator',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Privacy policy generator tailored specifically to App Store and Google Play requirements including analytics, crash, and ad disclosures.',
    whyItMatters: 'Both Apple and Google require a publicly accessible URL pointing to your privacy policy in store metadata and inside the app itself.',
    keyFeatures: [
      'Pre-built clauses for Firebase, Supabase, Google AdMob, RevenueCat, and Sentry.',
      'Generates free hosted URLs that meet App Store Connect metadata URL requirements.',
      'Automatic compliance with GDPR, CCPA/CPRA, and CalOPPA requirements.'
    ],
    bestUsedFor: 'Generating your initial App Store and Google Play compliant Privacy Policy URL in minutes.',
    freeTierInfo: 'Basic privacy policy generator is 100% free with free online hosting.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://www.termsfeed.com/privacy-policy-generator',
    iconName: 'FileText'
  },
  {
    id: 'priv-dpc-mobile',
    title: 'DPC Mobile App Standards',
    category: 'privacy',
    categoryLabel: 'Regulatory Privacy Framework',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Official guidance on mobile device identifiers, location access consent, background tracking, and data minimization principles.',
    whyItMatters: 'Helps developers understand when explicit background location permission is justifiable and how to handle Bluetooth and Wi-Fi beacons legally.',
    keyFeatures: [
      'Guidelines on persistent device fingerprinting and identifier rotation.',
      'Clear standards for background geolocation tracking vs. foreground-only access.',
      'Rules regarding mobile sensor access (accelerometer, microphone, camera) consent.'
    ],
    bestUsedFor: 'Auditing background location usage, sensor permissions, and sensitive hardware access rationales.',
    freeTierInfo: '100% free regulatory guidance and downloadable PDFs published by the Data Protection Commission.',
    quickStart: 'Audit your app\'s third-party SDK dependencies. Generate \'PrivacyInfo.xcprivacy\' declaring all required reason APIs and data collection types, ensuring 100% parity with your public Privacy Policy page.',
    reviewTraps: 'Apple strictly enforces Privacy Manifest requirements (NSPrivacyAccessedAPITypes). Failure to declare required reason APIs used by your dependencies will cause App Store Connect upload rejections.',
    url: 'https://www.dataprotection.ie',
    iconName: 'Shield'
  },

  // ==========================================
  // 7. LEGAL, TERMS OF SERVICE & EULA (8 RESOURCES)
  // ==========================================
  {
    id: 'legal-apple-eula',
    title: 'Apple Standard Store EULA',
    category: 'legal',
    categoryLabel: 'Official App Store Default EULA',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Official Apple default EULA that automatically protects apps on the App Store when custom terms are not supplied by the developer.',
    whyItMatters: 'Provides essential legal liability limitations, intellectual property protections, and governing law terms without hiring an expensive lawyer.',
    keyFeatures: [
      'Limits developer legal liability to the maximum extent permitted by applicable law.',
      'Restricts unauthorized reverse engineering, decompiling, or modification of your app.',
      'Accepted automatically by all App Store users prior to downloading your application.'
    ],
    bestUsedFor: 'Indie apps and startups launching on iOS that want bulletproof Apple-approved legal protection on Day 1.',
    freeTierInfo: '100% free standard legal terms provided by Apple for all iOS developers.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://www.apple.com/legal/internet-services/itunes/dev/minterms',
    iconName: 'Scale'
  },
  {
    id: 'legal-store-guidelines',
    title: 'Store Guidelines: Section 5',
    category: 'legal',
    categoryLabel: 'Mandatory Store Legal Requirements',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Apple\'s mandatory rules regarding auto-renewing subscriptions, cancellation links, refund disclosures, and user-generated content policies.',
    whyItMatters: 'Violating Section 5.1 (Privacy) or 5.6 (Developer Code of Conduct) can lead to immediate termination of your Apple Developer account.',
    keyFeatures: [
      'Section 3.1.2: Strict rules on auto-renewing subscription terms, free trials, and clear pricing disclosures.',
      'Section 1.2: Mandatory reporting mechanisms and block buttons for User-Generated Content (UGC) apps.',
      'Requirements for clear links to Terms of Use (EULA) directly on paywalls and subscription screens.'
    ],
    bestUsedFor: 'Auditing subscription paywall text, terms links, and UGC moderation workflows to avoid rejection.',
    freeTierInfo: 'Official developer guidelines updated continuously and published free by Apple.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://developer.apple.com/app-store/review/guidelines/#legal',
    iconName: 'Scale'
  },
  {
    id: 'legal-termly',
    title: 'Termly Terms Generator',
    category: 'legal',
    categoryLabel: 'Custom SaaS Terms Generator',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Comprehensive terms of service and acceptable use policy generator tailored to mobile SaaS and indie subscription applications.',
    whyItMatters: 'Creates custom legal agreements covering intellectual property ownership, user account termination, payment terms, and warranty disclaimers.',
    keyFeatures: [
      'Covers mobile in-app purchases, recurring subscription renewals, and refund policies.',
      'Includes acceptable use policies prohibiting abusive behavior, spamming, and scraping.',
      'Provides hosted embeddable web links or raw HTML/Markdown export.'
    ],
    bestUsedFor: 'Generating professional custom Terms of Service for mobile apps with paid tiers and user accounts.',
    freeTierInfo: 'Free plan includes 1 free legal policy with hosted URL and auto-updates.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://termly.io/products/terms-and-conditions-generator',
    iconName: 'FileText'
  },
  {
    id: 'legal-choose-license',
    title: 'Choose Open Source License',
    category: 'legal',
    categoryLabel: 'Software Licensing Guide',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Official GitHub guide to understanding MIT, Apache 2.0, BSD-3, and GPL-3 licenses for software bundling and commercial redistribution.',
    whyItMatters: 'Using GPL-licensed code inside a proprietary closed-source mobile app can legally compel you to open-source your entire proprietary codebase.',
    keyFeatures: [
      'Clear breakdown of permissive licenses (MIT, Apache 2.0) vs. copyleft licenses (GPL, AGPL).',
      'Guidance on patent grants, trademark restrictions, and copyright notice preservation.',
      'Searchable recommendations based on whether you want community contributions or maximum reuse.'
    ],
    bestUsedFor: 'Auditing third-party open-source libraries before bundling them into your commercial mobile binary.',
    freeTierInfo: '100% free open-source resource created and hosted by GitHub.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://choosealicense.com',
    iconName: 'CheckSquare'
  },
  {
    id: 'legal-cooley-go',
    title: 'Cooley GO Legal Documents',
    category: 'legal',
    categoryLabel: 'Elite Tech Firm Legal Templates',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Free legal documents for startups and indie founders from premier tech law firm Cooley LLP (advisor agreements, NDAs, founder stock).',
    whyItMatters: 'Cooley represents the world\'s top venture-backed companies. Their free generators provide institutional-grade legal templates at zero cost.',
    keyFeatures: [
      'Non-Disclosure Agreements (One-way and Mutual NDAs) tailored for tech startups.',
      'Advisor and Independent Contractor agreements with complete IP assignment clauses.',
      'Founder stock purchase agreements and standard 83(b) tax election forms.'
    ],
    bestUsedFor: 'Protecting intellectual property with contractors, onboarding advisors, and formalizing co-founder ownership.',
    freeTierInfo: '100% free document generators and legal guides provided by Cooley LLP.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://www.cooleygo.com',
    iconName: 'Scale'
  },
  {
    id: 'legal-yc-safe',
    title: 'Y Combinator SAFE Documents',
    category: 'legal',
    categoryLabel: 'Industry Standard Investment Contracts',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Standard industry investment contracts (SAFE - Simple Agreement for Future Equity) created by Y Combinator for early-stage startup fundraising.',
    whyItMatters: 'The universal legal standard for raising angel and seed investment without negotiating complex debt terms or paying thousands in legal drafting fees.',
    keyFeatures: [
      'Post-money SAFE agreements (Valuation Cap, Discount, and MFN variants).',
      'Simple, transparent terms that eliminate disputes over ownership dilution.',
      'Accepted by virtually every top angel investor and venture capital fund worldwide.'
    ],
    bestUsedFor: 'Raising early-stage capital from angels, friends & family, or tech accelerators.',
    freeTierInfo: '100% free downloadable document templates and legal user guides from Y Combinator.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://www.ycombinator.com/documents',
    iconName: 'FileText'
  },
  {
    id: 'legal-trademark',
    title: 'LegalZoom Entity & Trademark',
    category: 'legal',
    categoryLabel: 'Brand & Trademark Clearance',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Free tool to check app name availability across US state corporate registries and federal USPTO trademark databases before branding.',
    whyItMatters: 'Launching under a trademarked app name can lead to cease-and-desist letters, sudden App Store removals, and forced rebrands right after traction.',
    keyFeatures: [
      'Instant search across all 50 US state corporate and LLC registration databases.',
      'Preliminary trademark clearance to check for conflicting software names in Class 9 & 42.',
      'Educational guides on registering LLCs and protecting digital mobile brand assets.'
    ],
    bestUsedFor: 'Checking app name and brand availability before buying domains, registering social handles, or submitting to stores.',
    freeTierInfo: '100% free search tool with zero registration required.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://www.legalzoom.com/business/business-formation/entity-name-search',
    iconName: 'Search'
  },
  {
    id: 'legal-creative-commons',
    title: 'Creative Commons License Selector',
    category: 'legal',
    categoryLabel: 'Creative Content Licensing',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'both',
    shortDescription: 'Interactive tool to choose the appropriate Creative Commons license (CC BY 4.0, CC0 Public Domain) for your app\'s content and assets.',
    whyItMatters: 'Ensures that sounds, icons, graphics, and educational content used in your app are licensed legally for commercial mobile distribution.',
    keyFeatures: [
      'Interactive questionnaire guides you to the exact appropriate license type.',
      'Clear human-readable summaries alongside full legal code recognized in international courts.',
      'CC0 Public Domain dedication allows releasing digital assets with zero attribution requirements.'
    ],
    bestUsedFor: 'Licensing educational modules, curated checklists, templates, and digital media assets.',
    freeTierInfo: '100% free legal tool provided by the Creative Commons non-profit organization.',
    quickStart: 'Draft your custom legal agreement using this template. Host the resulting HTML file permanently on a public HTTPS domain (such as free GitHub Pages) and register the live URL in App Store Connect and Google Play Console.',
    reviewTraps: 'Apps with user-generated content or subscriptions that lack an active, clickable Terms of Service (EULA) and Privacy Policy link are automatically rejected under App Store Guidelines 1.2, 3.1.2, and 5.1.1.',
    url: 'https://creativecommons.org/choose',
    iconName: 'CheckSquare'
  },

  // ==========================================
  // 8. APP STORE LAUNCH, ASO & DISTRIBUTION (8 RESOURCES)
  // ==========================================
  {
    id: 'launch-testflight',
    title: 'TestFlight & App Store',
    category: 'launch',
    categoryLabel: 'Official Beta Testing Platform',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Apple\'s official portal for beta testing with up to 10,000 external testers, submitting builds, and managing app metadata.',
    whyItMatters: 'Collect crash logs, screenshot feedback, and real-device performance metrics from real users before releasing your app publicly to the store.',
    keyFeatures: [
      'Distribute test builds to up to 10,000 external testers using simple public invite links.',
      'Testers can submit contextual feedback and screenshots directly from inside the app.',
      'Automatic symbolication of crash logs to pinpoint exact line numbers of test crashes.'
    ],
    bestUsedFor: 'Private beta testing, staging release verification, and collecting pre-launch user feedback on iOS.',
    freeTierInfo: 'Included 100% free with any active Apple Developer Program account.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://appstoreconnect.apple.com',
    iconName: 'Rocket'
  },
  {
    id: 'launch-google-play',
    title: 'Google Play Console',
    category: 'launch',
    categoryLabel: 'Official Android Distribution Portal',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'android',
    shortDescription: 'Google\'s official console for Android app distribution, internal test tracks, Play Billing setup, and Android vitals monitoring.',
    whyItMatters: 'Offers staged rollouts (e.g. release to 5% of users first), allowing developers to detect bugs and halt rollouts before affecting all users.',
    keyFeatures: [
      'Internal, Closed, and Open testing tracks with instant deployment to trusted testers.',
      'Android Vitals dashboard monitors crash rates, ANR (Application Not Responding) rates, and slow renders.',
      'Staged percentage rollouts minimize the blast radius of unexpected release bugs.'
    ],
    bestUsedFor: 'Publishing Android applications, managing Play Store store listings, and monitoring app stability.',
    freeTierInfo: 'Free after a one-time $25 registration fee for the lifetime of your Google Developer account.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://play.google.com/console',
    iconName: 'Play'
  },
  {
    id: 'launch-apple-guidelines',
    title: 'Apple Store Review Guidelines',
    category: 'launch',
    categoryLabel: 'Official Submission Rules',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Apple\'s definitive rules on safety, performance, business models, design standards, and common rejection triggers.',
    whyItMatters: 'Reading and complying with the guidelines before submitting prevents 99% of app rejections, saving weeks of delay.',
    keyFeatures: [
      'Complete breakdown of Guideline 2.1 (App Completeness) and Guideline 4.0 (Design & Minimum Functionality).',
      'Clear rules on required metadata, demo account credentials, and accurate screenshots.',
      'App Review appeal procedures and direct resolution guidelines with the Review Board.'
    ],
    bestUsedFor: 'Pre-flight launch audits, verifying compliance, and drafting responses to App Review messages.',
    freeTierInfo: '100% free official documentation published and updated regularly by Apple.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://developer.apple.com/app-store/review/guidelines',
    iconName: 'FileText'
  },
  {
    id: 'launch-appfigures',
    title: 'Appfigures ASO Keyword Tools',
    category: 'launch',
    categoryLabel: 'App Store Optimization & Analytics',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Free keyword suggestions, ranking rank trackers, and category competitor analysis for iOS App Store and Google Play.',
    whyItMatters: 'Over 65% of all mobile app downloads originate directly from App Store searches. Effective App Store Optimization (ASO) drives organic downloads.',
    keyFeatures: [
      'Keyword search volume estimation and competitor ranking difficulty scores.',
      'Track your app\'s keyword position movements across US and international App Stores.',
      'Featured App Store tracker alerts you immediately when Apple features your app.'
    ],
    bestUsedFor: 'Researching app title keywords, subtitle optimization, and tracking organic download rankings.',
    freeTierInfo: 'Generous free tier includes keyword tracking, daily rank updates, and top chart metrics.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://appfigures.com',
    iconName: 'Search'
  },
  {
    id: 'launch-apple-screenshot-specs',
    title: 'Store Screenshot Specifications',
    category: 'launch',
    categoryLabel: 'Store Asset Resolution Requirements',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Official Apple documentation specifying exact pixel resolutions, aspect ratios, and format requirements for all iPhone & iPad models.',
    whyItMatters: 'Submitting screenshots with incorrect pixel dimensions or incorrect color profiles causes immediate hard errors in App Store Connect.',
    keyFeatures: [
      'Exact pixel dimensions for 6.9\" iPhone 16 Pro Max (1320 x 2868) and 6.7\" Displays (1290 x 2796).',
      'iPad Pro 13-inch and 11-inch screenshot requirements and aspect ratios.',
      'Color space rules (sRGB or Display P3) and file format specifications (PNG or JPEG).'
    ],
    bestUsedFor: 'Verifying image dimensions before uploading marketing screenshots to App Store Connect.',
    freeTierInfo: '100% free official documentation provided by Apple.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications',
    iconName: 'Image'
  },
  {
    id: 'launch-sensortower',
    title: 'Sensor Tower Category Insights',
    category: 'launch',
    categoryLabel: 'Competitive Intelligence & Trends',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Free category trend reports, top chart movements, and app download estimates for competitive intelligence.',
    whyItMatters: 'Understand category dynamics, discover rising competitor apps, and spot emerging consumer trends before finalizing your app\'s feature roadmap.',
    keyFeatures: [
      'Live category rankings across Free, Paid, and Top Grossing charts across all global countries.',
      'Download and revenue estimate trends for top apps in your target niche.',
      'Historical chart performance tracking to analyze the impact of competitor updates.'
    ],
    bestUsedFor: 'Market sizing, competitive benchmarking, and choosing the optimal category for your app launch.',
    freeTierInfo: 'Free public access to global store rankings, top charts, and category trend data.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://sensortower.com',
    iconName: 'TrendingUp'
  },
  {
    id: 'launch-producthunt',
    title: 'Product Hunt Launch Community',
    category: 'launch',
    categoryLabel: 'Tech Discovery Community',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'The world\'s top discovery community for tech products; free launch platform to drive thousands of early adopters and press coverage on Day 1.',
    whyItMatters: 'A successful Product Hunt launch frequently drives thousands of initial downloads, valuable user feedback, and organic coverage in tech publications.',
    keyFeatures: [
      'Free launch listing seen by hundreds of thousands of active tech enthusiasts and investors.',
      'Direct user feedback and discussion thread with early adopters and beta testers.',
      'Product of the Day badges provide lasting social proof and credibility for your app website.'
    ],
    bestUsedFor: 'Public launch day, acquiring early power users, and building initial viral momentum.',
    freeTierInfo: '100% free to schedule, launch, and feature products for all creators worldwide.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://www.producthunt.com',
    iconName: 'Rocket'
  },
  {
    id: 'launch-appicon',
    title: 'AppIcon.co Multi-Resolution Asset Generator',
    category: 'launch',
    categoryLabel: 'App Icon Generator',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Free online tool to generate all required iOS AppIcon and Android adaptive icon sizes from a single 1024x1024 asset.',
    whyItMatters: 'Apple and Android require over 20 different icon sizes for notifications, spotlight search, settings, and home screen displays.',
    keyFeatures: [
      'Generates complete AppIcon.appiconset directory ready to drop directly into Xcode Assets.xcassets.',
      'Generates Android adaptive icons with separate foreground and background layers.',
      'Outputs clean JSON manifest and all resolutions in crisp, uncompressed PNG format.'
    ],
    bestUsedFor: 'Exporting your 1024x1024 app icon into the exact folder structure required by Xcode and Android Studio.',
    freeTierInfo: '100% free web tool with zero registration and instant ZIP archive download.',
    quickStart: 'Capture high-resolution screenshots on an iPhone 16 Pro Max (1290x2796) and Android flagship device. Verify test demo credentials, configure age ratings, and test release builds via TestFlight and Google Play Internal Testing.',
    reviewTraps: 'Providing invalid demo credentials, placeholder \'lorem ipsum\' text, non-functional links, or misleading store screenshots triggers immediate review rejection. Double-check all submission metadata.',
    url: 'https://www.appicon.co',
    iconName: 'Image'
  },

  // ==========================================
  // 9. CRASH REPORTING & OBSERVABILITY (8 RESOURCES)
  // ==========================================
  {
    id: 'analytics-sentry',
    title: 'Sentry Real-Time Error Tracking',
    category: 'analytics',
    categoryLabel: 'Real-Time Error Tracking',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Real-time error tracking with stack traces, breadcrumbs, user session replays, and mobile performance tracing.',
    whyItMatters: 'Pinpoints the exact line of code that caused a crash in production, along with breadcrumb logs showing every user tap leading up to the failure.',
    keyFeatures: [
      'Automatic symbolication: resolves obfuscated stack traces back to original TypeScript and Swift source lines.',
      'Session Replay: watch a visual reconstruction of what the user saw right before an error occurred.',
      'Performance monitoring tracks slow mobile screen renders, slow network calls, and app startup times.'
    ],
    bestUsedFor: 'Monitoring production crashes, diagnosing edge-case user errors, and tracking mobile app performance.',
    freeTierInfo: 'Developer Free plan includes 5,000 errors, 10,000 performance transactions, and 50 session replays per month.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://sentry.io',
    iconName: 'Activity',
    promptOrCommand: 'npm install @sentry/capacitor @sentry/react',
    promptLabel: 'Install Sentry'
  },
  {
    id: 'analytics-posthog',
    title: 'PostHog Analytics & Replays',
    category: 'analytics',
    categoryLabel: 'Open Source Product Suite',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Complete product analytics suite with event tracking, funnel analysis, heatmaps, session recording, and feature flags.',
    whyItMatters: 'Combines product analytics, feature flags, and session recordings in one place, allowing you to see exactly where users drop off in your onboarding funnel.',
    keyFeatures: [
      'Conversion funnels identify exact drop-off points in user registration and subscription flows.',
      'Session recordings provide visual video-like playback of user interactions and rage clicks.',
      'Feature flags allow rolling out features gradually to a percentage of users without app updates.'
    ],
    bestUsedFor: 'Analyzing feature adoption, optimizing onboarding conversion, and diagnosing UI friction.',
    freeTierInfo: 'Incredible Free plan includes 1,000,000 events and 5,000 session recordings every month for free.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://posthog.com',
    iconName: 'BarChart2',
    promptOrCommand: 'npm install posthog-js',
    promptLabel: 'Install PostHog'
  },
  {
    id: 'analytics-metrickit',
    title: 'Apple MetricKit Telemetry',
    category: 'analytics',
    categoryLabel: 'Native iOS Telemetry Framework',
    badge: 'Official',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    platform: 'ios',
    shortDescription: 'Built-in, privacy-preserving iOS performance telemetry reporting battery usage, hang rates, launch times, and disk writes.',
    whyItMatters: 'Runs at the operating system level with 0% runtime CPU penalty and zero third-party tracking, fully compliant with Apple privacy standards.',
    keyFeatures: [
      'Reports aggregate daily metrics on app launch times, hang rates, and memory termination events.',
      'Detailed power metrics: analyzes CPU energy, GPU energy, display power, and network power.',
      'Direct integration with Xcode Organizer: view production diagnostic reports without external SDKs.'
    ],
    bestUsedFor: 'Diagnosing app battery drain, eliminating main-thread UI hangs, and optimizing cold launch speed on iOS.',
    freeTierInfo: 'Built natively into iOS and Xcode; 100% free for all registered Apple developers.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://developer.apple.com/documentation/metrickit',
    iconName: 'Activity'
  },
  {
    id: 'analytics-mixpanel',
    title: 'Mixpanel Event Analytics',
    category: 'analytics',
    categoryLabel: 'Product Analytics Platform',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Advanced event-driven user behavior tracking, retention cohort analysis, and conversion funnel dashboards.',
    whyItMatters: 'Measures user retention curves and cohort behavior to prove product-market fit and understand which features drive long-term engagement.',
    keyFeatures: [
      'Interactive cohort analysis reveals what behaviors correlate with long-term 30-day retention.',
      'Deep funnel breakdown by platform, country, app version, and acquisition channel.',
      'Simple client SDKs with automatic event batching to conserve mobile device battery.'
    ],
    bestUsedFor: 'Tracking user retention, conversion funnels, subscription churn, and feature engagement metrics.',
    freeTierInfo: 'Free plan includes up to 20,000,000 monthly events with unlimited seats and core analytics features.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://mixpanel.com',
    iconName: 'BarChart2',
    promptOrCommand: 'npm install mixpanel-browser',
    promptLabel: 'Install Mixpanel'
  },
  {
    id: 'analytics-firebase-crashlytics',
    title: 'Firebase Crashlytics & Analytics',
    category: 'analytics',
    categoryLabel: 'Real-Time Crash Reporter',
    badge: 'Free',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Industry-standard lightweight crash reporter providing real-time crash stack traces and app engagement stats.',
    whyItMatters: 'Groups millions of crashes into organized clusters ranked by user impact, ensuring you fix the bugs affecting the most users first.',
    keyFeatures: [
      'Real-time crash alerts with immediate notification when a new crash spike occurs.',
      'Velocity alerts notify you when an issue increases in severity on a new release.',
      'Comprehensive crash-free user percentage tracking (industry benchmark: 99.5%+).'
    ],
    bestUsedFor: 'Monitoring crash-free user rates and triaging fatal mobile app exceptions.',
    freeTierInfo: '100% free with unlimited crash reporting and telemetry storage.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://firebase.google.com/products/crashlytics',
    iconName: 'Flame'
  },
  {
    id: 'analytics-aptabase',
    title: 'Aptabase Privacy-First Analytics',
    category: 'analytics',
    categoryLabel: 'Lightweight Mobile Analytics',
    badge: 'Open Source',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    platform: 'both',
    shortDescription: 'Privacy-friendly, lightweight alternative to Google Analytics with no cookies, no IP logging, and full GDPR compliance out of the box.',
    whyItMatters: 'Weighs under 10kB, collects zero personal data, and does not require an Apple ATT permission prompt, keeping user onboarding friction-free.',
    keyFeatures: [
      '100% GDPR, CCPA, and PECR compliant with zero personal data collection or cross-site tracking.',
      'Extremely lightweight client SDK designed specifically for mobile and desktop applications.',
      'Self-hostable open-source server or fully managed cloud service with European data residency.'
    ],
    bestUsedFor: 'Privacy-conscious mobile apps that want clean event tracking without showing an Apple ATT tracking dialog.',
    freeTierInfo: 'Free cloud plan includes 20,000 events per month; 100% free to self-host with Docker.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://aptabase.com',
    iconName: 'Activity',
    promptOrCommand: 'npm install @aptabase/web',
    promptLabel: 'Install Aptabase'
  },
  {
    id: 'analytics-telemetrydeck',
    title: 'TelemetryDeck ATT-Free Analytics',
    category: 'analytics',
    categoryLabel: 'Privacy-Preserving Telemetry',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Privacy-focused analytics SDK for iOS, macOS, and web that collects zero personal data, eliminating the need for ATT prompts.',
    whyItMatters: 'Allows iOS developers to track active users, feature clicks, and system versions while guaranteeing complete user privacy compliance.',
    keyFeatures: [
      'Cryptographically hashed user identifiers that change periodically to prevent persistent tracking.',
      'Does not require an App Tracking Transparency (ATT) prompt on iOS.',
      'Clean native Swift and web SDKs with automated background event batching.'
    ],
    bestUsedFor: 'Indie iOS developers seeking simple, compliant usage metrics without legal privacy headaches.',
    freeTierInfo: 'Free plan includes up to 100,000 monthly signals (events) with unlimited apps.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://telemetrydeck.com',
    iconName: 'BarChart2'
  },
  {
    id: 'analytics-grafana',
    title: 'Grafana Cloud & OpenTelemetry',
    category: 'analytics',
    categoryLabel: 'Open Full-Stack Observability',
    badge: 'Free Tier',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    platform: 'both',
    shortDescription: 'Full-stack observability dashboard for API backend logs, server metrics, trace waterfalls, and uptime monitoring.',
    whyItMatters: 'Visualizes your entire mobile backend architecture in real-time, pinpointing slow database queries and failing API microservices before users notice.',
    keyFeatures: [
      'Unified dashboards combining Prometheus metrics, Loki log streams, and Tempo distributed traces.',
      'OpenTelemetry native support: zero vendor lock-in with standard open instrumentation.',
      'Automated synthetic alerts: receive instant Slack/Discord/Email notifications when your API goes down.'
    ],
    bestUsedFor: 'Backend server monitoring, distributed request tracing, and API uptime alerting.',
    freeTierInfo: 'Permanent Free plan includes 10,000 metrics, 50GB logs, 50GB traces, and 3 synthetic monitoring checks.',
    quickStart: 'Initialize the monitoring SDK at the very top of \'main.tsx\' before rendering any UI. Enable breadcrumbs, automatic uncaught exception handling, and network performance tracking while ensuring all user PII is stripped.',
    reviewTraps: 'Transmitting user identifiers or tracking data across apps without obtaining user consent via App Tracking Transparency (ATT) on iOS leads to immediate rejection and potential developer account suspension.',
    url: 'https://grafana.com',
    iconName: 'Activity'
  }
];
