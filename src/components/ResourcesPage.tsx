import React, { useState, useEffect } from 'react';
import { 
  RESOURCES_DATA, 
  ResourceCategory, 
  ResourceItem 
} from '../data/resources';
import { copyToClipboard } from '../utils/clipboard';
import { 
  ChevronDown, 
  ChevronUp,
  ExternalLink, 
  Check,
  Brain,
  Layers, 
  CheckCircle2, 
  Lock, 
  Code,
  Layout,
  EyeOff, 
  ScrollText, 
  Waves, 
  Shapes, 
  Type,
  Database,
  Sparkles,
  ShieldCheck,
  Rocket,
  BarChart2,
  Copy,
  Zap
} from 'lucide-react';

export interface ResourcesPageProps {
  onBackToChecklist?: () => void;
  collapseSignal?: number;
  activeCategoryId?: ResourceCategory;
  onSelectCategory?: (categoryId: ResourceCategory) => void;
}

interface SectionConfig {
  id: ResourceCategory;
  title: string;
  badge: string;
  description: string;
  iconBg: string;
  icon: React.ReactNode;
}

export const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: 'ai_models',
    title: 'AI Models & Coding Agents',
    badge: 'Core Intelligence',
    description: 'AI coding models can inspect your codebase and write code directly in your terminal. They generate screens, fix bugs, and connect device APIs in minutes. Choose from Google Antigravity, Claude Code, Cursor, and Windsurf.',
    iconBg: 'bg-purple-600',
    icon: <Brain className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'design',
    title: 'Design Systems & UI/UX',
    badge: 'Interface Systems',
    description: 'Great design makes your app feel natural and effortless to use from the very first tap. Learn proven layout structures from Apple and Google so your buttons are comfortable and your screens look clean. Study successful apps to gain design inspiration without copying copyrighted artwork or brand trademarks.',
    iconBg: 'bg-rose-500',
    icon: <Layout className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'typography',
    title: 'Typography & Font Systems',
    badge: 'Curated Fonts',
    description: 'Typography controls how easy your app is to read and gives your product a distinct personality. Using system fonts or self-hosted font files keeps your app fast and protects user privacy from third-party tracking. Explore curated font systems, pairing guides, and typography resources below with copy-ready prompts for your AI agents.',
    iconBg: 'bg-indigo-600',
    icon: <Type className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'github_repos',
    title: 'Open Source Frameworks & SDKs',
    badge: 'Verified SDKs',
    description: 'Open source libraries provide pre-built building blocks so you never have to reinvent the wheel. Add tactile vibrations, camera access, and offline data storage with battle-tested community code. These packages save hundreds of hours of manual work and work seamlessly across iOS and Android.',
    iconBg: 'bg-blue-600',
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  },
  {
    id: 'backend',
    title: 'Backend, Database & Cloud',
    badge: 'Serverless Cloud',
    description: 'A backend lets your users save accounts, store data in the cloud, and sync across multiple devices. Modern platforms like Supabase and Firebase handle the complex server work automatically. They offer generous free plans that can comfortably support your first thousands of active users without charge. You can always start for free and scale up smoothly as your app grows.',
    iconBg: 'bg-teal-600',
    icon: <Database className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'security',
    title: 'Security & Keychain Auth',
    badge: 'Hardware Enclave',
    description: 'Security protects your users and keeps private login passwords safe on their physical phones. Using the iOS Keychain and Android Keystore hardware chips ensures sensitive data is never exposed. Following these essential guardrails prevents data leaks and helps you pass store security audits on your first try. All security patterns and system APIs shown here are built right into your phone for free.',
    iconBg: 'bg-emerald-600',
    icon: <Lock className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'privacy',
    title: 'Privacy & Store Compliance',
    badge: 'Store Compliance',
    description: 'User privacy is one of the most strictly enforced requirements in the Apple App Store and Google Play. You must inform users what data you collect and declare required privacy manifests before publishing. Bundling fonts locally and avoiding hidden ad trackers keeps you completely safe from legal fines. These free privacy templates and tools guarantee you satisfy Apple and Google rules.',
    iconBg: 'bg-indigo-600',
    icon: <EyeOff className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'legal',
    title: 'Legal & Privacy Templates',
    badge: 'Terms & Policies',
    description: 'Every published mobile app requires a publicly accessible Privacy Policy and Terms of Service before review. You can create and host these legal documents completely free using simple GitHub Pages. Having clear agreements also shields you from liability and protects your intellectual property. Use our copy-ready legal templates to get permanent HTTPS links in under 5 minutes.',
    iconBg: 'bg-amber-600',
    icon: <ScrollText className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'launch',
    title: 'App Store Launch & Release',
    badge: 'Store Publishing',
    description: 'Your store listing is the storefront window where people decide whether to download your application. Prepare eye-catching screenshot mockups and clear descriptions that explain your app\'s benefits simply. Avoid common rejection traps like broken demo accounts or prohibited pricing claims in your title. These free mockup tools and checklists guide you step-by-step through submission day.',
    iconBg: 'bg-cyan-600',
    icon: <Rocket className="w-6 h-6 text-white stroke-[2]" />
  },
  {
    id: 'analytics',
    title: 'Crash Reporting & Diagnostics',
    badge: 'Telemetry & Health',
    description: 'Crash reporting helps you find and fix unexpected issues before frustrated users leave negative reviews. Privacy-friendly telemetry lets you see which features people enjoy without recording their personal identity. You can monitor performance speeds and battery health to keep your app running silky smooth. The observability tools featured here include robust free plans tailored for indie developers.',
    iconBg: 'bg-violet-600',
    icon: <BarChart2 className="w-6 h-6 text-white stroke-[2]" />
  }
];

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ 
  collapseSignal,
  activeCategoryId: controlledCategoryId,
  onSelectCategory,
}) => {
  const [internalCategoryId, setInternalCategoryId] = useState<ResourceCategory>('ai_models');
  const selectedCategoryId = controlledCategoryId || internalCategoryId;
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Close when collapse signal fires
  useEffect(() => {
    if (collapseSignal) {
      setExpandedItemId(null);
    }
  }, [collapseSignal]);

  const handleSelectCategory = (catId: ResourceCategory) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setInternalCategoryId(catId);
    }
    setExpandedItemId(null);
  };

  const handleCopyPrompt = (id: string, text: string) => {
    copyToClipboard(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleToggleItem = (itemId: string) => {
    setExpandedItemId(prev => (prev === itemId ? null : itemId));
  };

  const activeConfig = SECTION_CONFIGS.find(s => s.id === selectedCategoryId) || SECTION_CONFIGS[0];
  const secItems = RESOURCES_DATA.filter(r => r.category === activeConfig.id);

  // Authentic Brand Color SVG Icon Renderer for each website/tool
  const renderBrandLogo = (item: ResourceItem) => {
    if (item.id === 'ai-gemini-antigravity' || item.id.includes('gemini')) {
      return (
        <svg className="w-6 h-6 text-[#1A73E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
        </svg>
      );
    }

    if (item.id === 'ai-openai-astra' || item.id.includes('openai')) {
      return (
        <svg className="w-6 h-6 text-[#10A37F]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
        </svg>
      );
    }

    if (item.id === 'ai-claude-sonnet' || item.id.includes('claude') || item.id.includes('anthropic')) {
      return (
        <svg className="w-6 h-6 text-[#D97757]" viewBox="0 0 24 24" fill="currentColor">
          <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
        </svg>
      );
    }

    if (item.id === 'ai-cursor') {
      return (
        <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 0l16 12-7 2-4 9-5-23z"/>
        </svg>
      );
    }

    if (item.id === 'ai-windsurf') {
      return <Waves className="w-6 h-6 text-[#00A88F] stroke-[2.2]" />;
    }

    if (item.id.includes('figma')) {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z" fill="#0ACF83"/>
          <path d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z" fill="#A259FF"/>
          <path d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z" fill="#F24E1E"/>
          <path d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z" fill="#FF7262"/>
          <circle cx="16" cy="12" r="4" fill="#1ABCFE"/>
        </svg>
      );
    }

    if (item.id === 'design-sf-symbols') {
      return <Sparkles className="w-6 h-6 text-[#007AFF] stroke-[2]" />;
    }

    if (item.id === 'design-lucide-icons') {
      return <Shapes className="w-6 h-6 text-[#F43F5E] stroke-[2]" />;
    }

    if (item.id === 'design-mobbin') {
      return <Layers className="w-6 h-6 text-[#6366F1] stroke-[2]" />;
    }

    if (item.id.includes('fontshare')) {
      return (
        <svg className="w-6 h-6 text-[#7C3AED]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4h18v3H13.5v13h-3V7H3V4z"/>
        </svg>
      );
    }

    if (item.id.includes('google-fonts')) {
      return (
        <svg className="w-6 h-6 text-[#EA4335]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/>
        </svg>
      );
    }

    return (
      <div className={`w-8 h-8 rounded-xl ${activeConfig.iconBg} flex items-center justify-center text-white`}>
        <Sparkles className="w-4 h-4 stroke-[2]" />
      </div>
    );
  };

  // Tier Badge renderer that STRICTLY NEVER renders "Free Tier"
  const renderTierBadge = (badge?: string) => {
    if (!badge || badge === 'Free Tier' || badge.toLowerCase().includes('tier')) return null;
    switch (badge) {
      case 'Free':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <CheckCircle2 className="w-2.5 h-2.5 shrink-0 text-emerald-600" />
            <span>100% Free</span>
          </span>
        );
      case 'Open Source':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <Code className="w-2.5 h-2.5 shrink-0 text-blue-600" />
            <span>Open Source</span>
          </span>
        );
      case 'Official':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5 shrink-0 text-purple-600" />
            <span>Official</span>
          </span>
        );
      case 'AI Model':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <Brain className="w-2.5 h-2.5 shrink-0 text-indigo-600" />
            <span>AI Model</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pb-4">
      {/* Mobile Category Switcher Bar (< lg): Horizontal scrolling pills */}
      <div className="lg:hidden -mx-4 px-4 overflow-x-auto no-scrollbar flex items-center space-x-2 select-none pb-1 mb-4">
        {SECTION_CONFIGS.map(cat => {
          const isActive = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.id)}
              className={`apple-press px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center space-x-2 transition-all border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <div className={`w-4.5 h-4.5 rounded-lg ${cat.iconBg} flex items-center justify-center text-white shrink-0 shadow-2xs`}>
                <span className="text-[10px] font-black">{cat.title.slice(0, 1)}</span>
              </div>
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* The Big Panel containing the active resource category */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-black/8 shadow-xl p-4 sm:p-6 lg:p-7 space-y-4 lg:mt-0">
        {/* Active Category Header */}
        <div className="space-y-2.5 pb-3 border-b border-black/5">
          <div className="flex items-center space-x-3.5">
            <div className={`w-12 h-12 rounded-2xl ${activeConfig.iconBg} flex items-center justify-center shrink-0 shadow-xs text-white`}>
              {activeConfig.icon}
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${activeConfig.iconBg} text-white shadow-xs inline-flex items-center justify-center pt-[1px] leading-none`}>
                  {activeConfig.badge}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-700">
                  {secItems.length} Curated Tools
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug font-google">
                {activeConfig.title}
              </h2>
            </div>
          </div>
          <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed pt-0.5">
            {activeConfig.description}
          </p>
        </div>

        {/* Tools and Resources List for Active Category */}
        <div className="space-y-3 pt-1">
          {secItems.map((item) => {
            const isItemOpen = expandedItemId === item.id;
            const isApple = item.id.includes('apple') || item.id.includes('att') || item.id.includes('testflight') || item.id.includes('sf-pro');
            const isGooglePlay = item.id.includes('play') || item.id.includes('google-policy');

            return (
              <div 
                id={item.id}
                key={item.id}
                className="rounded-3xl border border-slate-200/90 bg-white transition-all duration-200 shadow-xs p-5 pb-3 sm:p-6 sm:pb-3.5 space-y-2"
              >
                {/* Item Header Block: clicking text minimizes/toggles item */}
                <div 
                  onClick={() => handleToggleItem(item.id)}
                  className="space-y-2 select-none cursor-pointer"
                >
                  <div className="w-full flex items-center justify-between select-none">
                    <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                      
                      {/* Squircle containing official brand colored logo */}
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs relative">
                        {renderBrandLogo(item)}
                      </div>

                      {/* Title & Platform Tag (NO Free Tier badge) */}
                      <div className="space-y-1 select-none flex-1 min-w-0">
                        {item.platform && item.platform !== 'both' && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              {item.platform === 'ios' ? 'iOS' : 'Android'}
                            </span>
                          </div>
                        )}
                        <h3 
                          className={`text-base sm:text-lg font-black tracking-tight leading-snug select-none break-words ${
                            isApple 
                              ? 'text-[#1D1D1F] font-sans' 
                              : isGooglePlay 
                                ? 'text-[#202124] font-google' 
                                : 'text-slate-900 font-google'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Subsection: Description directly underneath the title */}
                  <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none pt-0.5">
                    {item.shortDescription}
                  </p>

                  {/* Centered arrow: Pure icon */}
                  <div className="flex justify-center pt-0.5 pb-0 select-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleItem(item.id);
                      }}
                      className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 shrink-0"
                      title={isItemOpen ? 'Close information' : 'Expand information'}
                      aria-label={isItemOpen ? 'Close information' : 'Expand information'}
                    >
                      <ChevronDown 
                        strokeWidth={2.5}
                        className={`w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          isItemOpen ? 'rotate-180 text-slate-800' : 'text-slate-400'
                        }`} 
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded Guidance Drawer with Subsections in their own cards */}
                <div className={`apple-drawer-collapse ${isItemOpen ? 'expanded' : ''}`}>
                  <div className="apple-drawer-content">
                    <div 
                      onClick={() => setExpandedItemId(null)}
                      className="space-y-3 pt-3 border-t border-slate-100/90 text-slate-800 select-none cursor-pointer"
                      title="Click anywhere to minimize"
                    >
                      {/* Subsection 1: Why It Matters */}
                      {item.whyItMatters && (
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 shadow-2xs">
                          <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                            Why It Matters
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                            {item.whyItMatters}
                          </p>
                        </div>
                      )}

                      {/* Subsection 2: Key Highlights */}
                      {item.keyFeatures && item.keyFeatures.length > 0 && (
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 shadow-2xs">
                          <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                            Key Highlights
                          </span>
                          <div className="space-y-1.5 pt-0.5">
                            {item.keyFeatures.map((feat, idx) => (
                              <div key={idx} className="flex items-start space-x-2.5 text-slate-700">
                                <span className="font-bold text-slate-900 text-xs shrink-0 mt-0.5">
                                  {idx + 1}.
                                </span>
                                <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm flex-1 min-w-0">
                                  {feat}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Subsection 3: Best Used For */}
                      {item.bestUsedFor && (
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 shadow-2xs">
                          <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                            Best Used For
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                            {item.bestUsedFor}
                          </p>
                        </div>
                      )}

                      {/* Subsection 4: Free Access & Licensing (details only, no badge) */}
                      {item.freeTierInfo && (
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 shadow-2xs">
                          <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                            Free Access &amp; Licensing
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                            {item.freeTierInfo}
                          </p>
                        </div>
                      )}

                      {/* Subsection 5: How to Connect with AI */}
                      {item.quickStart && (
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 shadow-2xs">
                          <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                            How to Connect with AI
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                            {item.quickStart}
                          </p>
                        </div>
                      )}

                      {/* Subsection 6: Avoid Traps */}
                      {item.reviewTraps && (
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 shadow-2xs">
                          <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                            How to Stay on Track &amp; Avoid Traps
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                            {item.reviewTraps}
                          </p>
                        </div>
                      )}

                      {/* Subsection 7: AI Prompt to Connect It */}
                      {item.promptOrCommand && (
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 shadow-2xs">
                          <div className="flex items-center justify-between select-none">
                            <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                              {item.promptLabel || 'AI Agent Prompt to Connect It'}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyPrompt(item.id, item.promptOrCommand || '');
                              }}
                              className="apple-press px-2.5 py-1 rounded-full text-[11px] font-bold bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center space-x-1 shrink-0 shadow-2xs transition-colors cursor-pointer"
                              title="Copy prompt for your AI coding agent"
                            >
                              {copiedPromptId === item.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                                  <span className="text-emerald-700 font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-500" />
                                  <span>Copy Prompt</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="pt-0.5 select-text font-google">
                            <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm whitespace-pre-line font-google">
                              {item.promptOrCommand}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Subsection 8: Official Resource Link Button */}
                      <div className="pt-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            try {
                              window.open(item.url, '_blank');
                            } catch {}
                          }}
                          className="apple-press w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors"
                        >
                          <span>Visit Official Resource</span>
                          <ExternalLink className="w-3.5 h-3.5 stroke-[2.2] text-white/80" />
                        </a>
                      </div>

                      {/* Close details button at bottom */}
                      <div className="pt-1 flex flex-col items-center select-none">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedItemId(null);
                          }}
                          className="apple-press w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                          title="Close details"
                          aria-label="Close details"
                        >
                          <ChevronUp 
                            strokeWidth={2.5}
                            className="w-4 h-4 stroke-[2.5] text-slate-500 hover:text-slate-700" 
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Clearance space underneath the last resource card for floating dock */}
      <div 
        className="w-full shrink-0 pointer-events-none" 
        style={{ height: 'max(calc(env(safe-area-inset-bottom, 0px) + 94px), 112px)' }} 
        aria-hidden="true" 
      />
    </div>
  );
};
