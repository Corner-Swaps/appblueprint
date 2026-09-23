import React, { useState, useEffect } from 'react';
import { 
  RESOURCES_DATA, 
  ResourceCategory, 
  ResourceItem 
} from '../data/resources';
import { 
  ChevronDown, 
  ChevronUp,
  ExternalLink, 
  Check,
  Cpu, 
  Zap, 
  Brain,
  Terminal, 
  Image as ImageIcon, 
  Layers, 
  CheckCircle2, 
  Eye, 
  Palette, 
  Play, 
  CreditCard, 
  Rocket, 
  CheckSquare, 
  AlertCircle, 
  Shield, 
  Key, 
  Scale, 
  Globe, 
  Type,
  GraduationCap,
  Database,
  Activity,
  BarChart2,
  Flame,
  FileText,
  Sparkles,
  Lock,
  Search,
  TrendingUp,
  Code,
  Layout,
  EyeOff,
  ScrollText,
  Waves,
  Shapes,
  Baseline,
  Smartphone,
  Box,
  RefreshCw,
  Mail,
  ShieldCheck,
  Fingerprint,
  FileCode,
  Sliders,
  ListChecks,
  ShieldAlert,
  CheckCheck,
  Globe2,
  BookOpen,
  FileSignature,
  Gauge,
  PieChart,
  Copy,
  HelpCircle,
  Target,
  AlertTriangle
} from 'lucide-react';

interface ResourcesPageProps {
  onBackToChecklist?: () => void;
  collapseSignal?: number;
}

interface SectionConfig {
  id: ResourceCategory;
  title: string;
  badge: string;
  description: string;
  iconBg: string;
  icon: React.ReactNode;
}

export interface TypographyPairing {
  id: string;
  name: string;
  style: string;
  badge: string;
  headingFont: string;
  bodyFont: string;
  headingSample: string;
  bodySample: string;
  prompt: string;
}

export const TYPOGRAPHY_PAIRINGS: TypographyPairing[] = [
  {
    id: 'pair-modern-minimalist',
    name: 'Modern Minimalist',
    style: 'Satoshi + General Sans (Fontshare)',
    badge: '100% Free / Commercial',
    headingFont: 'Satoshi Bold (Fontshare)',
    bodyFont: 'General Sans Regular (Fontshare)',
    headingSample: 'Launch With Precision',
    bodySample: 'Clean geometric proportions and balanced open counter forms crafted for fluid mobile interfaces and modern dashboards.',
    prompt: 'Configure our app typography using Satoshi for display headings and General Sans for body text from Fontshare. Set letter-spacing to -0.02em on headings and line-height to 1.6 on body paragraphs.'
  },
  {
    id: 'pair-apple-native',
    name: 'Apple Native HIG',
    style: 'SF Pro Display + SF Pro Text (System)',
    badge: 'Official Apple System',
    headingFont: 'SF Pro Display (System)',
    bodyFont: 'SF Pro Text (System)',
    headingSample: 'Designed for iOS 18',
    bodySample: 'Translucent Liquid Glass materials, specular refraction borders, and full Dynamic Type support for accessible text scaling.',
    prompt: 'Configure our app to use Apple\'s native system font stack (-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text"). Apply optical letter tracking (-0.022em on 28px+ titles, +0.015em on 13px captions).'
  },
  {
    id: 'pair-fintech-data',
    name: 'FinTech & Analytics',
    style: 'Geist + Geist Mono (Vercel)',
    badge: 'Open Source',
    headingFont: 'Geist Display (Vercel)',
    bodyFont: 'Geist Mono (Tabular Numbers)',
    headingSample: '$142,850.00 ▲ +18.4%',
    bodySample: 'Tabular numeric alignment, zero layout jitter during counter animations, and Swiss geometric precision for high-density dashboards.',
    prompt: 'Import Geist for titles and Geist Mono for numeric dashboard stats and metrics. Enable OpenType tabular figures (font-feature-settings: "tnum") so numbers never wobble during live animations.'
  },
  {
    id: 'pair-friendly-open',
    name: 'Friendly & Approachable',
    style: 'Plus Jakarta Sans + Inter (Self-Hosted)',
    badge: '100% Free Offline',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter (Self-Hosted)',
    headingSample: 'Daily habits made effortless',
    bodySample: 'Warm human geometry with supreme legibility across compact smartphone displays, widgets, and long-form reading screens.',
    prompt: 'Bundle Plus Jakarta Sans and Inter locally in "public/fonts/" with zero CDN requests. Pair Plus Jakarta Sans for titles with Inter for long-form reading without any external network pings.'
  },
  {
    id: 'pair-editorial-luxury',
    name: 'Editorial Luxury',
    style: 'Clash Display + Satoshi (Fontshare)',
    badge: '100% Free Commercial',
    headingFont: 'Clash Display (Fontshare)',
    bodyFont: 'Satoshi (Fontshare)',
    headingSample: 'The Curated Standard',
    bodySample: 'Expressive editorial headline personality balanced by a crisp, ultra-readable geometric sans for navigation and body copy.',
    prompt: 'Integrate Clash Display from Fontshare for hero splash titles and pair with Satoshi for body copy and navigation items. Ensure smooth responsive scaling on mobile displays.'
  }
];

const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: 'ai_models',
    title: 'Frontier AI Models & Coding Agents',
    badge: 'AI Models',
    description: 'AI coding models can read your project files and write code for you directly in your terminal. They help build screens, fix tricky bugs, and connect phone features in minutes instead of weeks. Choose from Google Antigravity, Claude Code, Cursor, and Windsurf depending on your workflow.',
    iconBg: 'bg-purple-600',
    icon: <Brain className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'design',
    title: 'Design Systems & UI/UX Resources',
    badge: 'Design & UX',
    description: 'Great design makes your app feel natural and effortless to use from the very first tap. Learn proven layout structures from Apple and Google so your buttons are comfortable and your screens look clean. Study successful apps to gain design inspiration without copying copyrighted artwork or brand trademarks.',
    iconBg: 'bg-rose-500',
    icon: <Layout className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'typography',
    title: 'Typography & Font Systems',
    badge: 'Typography',
    description: 'Typography controls how easy your app is to read and gives your product a distinct personality. Using system fonts or self-hosted font files keeps your app fast and protects user privacy from third-party tracking. Explore our 5 curated font pairing examples below with copy-ready prompts for your AI agents.',
    iconBg: 'bg-indigo-600',
    icon: <Type className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'github_repos',
    title: 'Curated Open Source Frameworks & SDKs',
    badge: 'Open Source',
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
    title: 'Backend, Database & Cloud Infrastructure',
    badge: 'Cloud & DB',
    description: 'A backend lets your users save accounts, store data in the cloud, and sync across multiple devices. Modern platforms like Supabase and Firebase handle the complex server work automatically. They offer generous free plans that can comfortably support your first thousands of active users without charge. You can always start for free and scale up smoothly as your app grows.',
    iconBg: 'bg-teal-600',
    icon: <Database className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'security',
    title: 'Security, Cryptography & Keychain Auth',
    badge: 'Security',
    description: 'Security protects your users and keeps private login passwords safe on their physical phones. Using the iOS Keychain and Android Keystore hardware chips ensures sensitive data is never exposed. Following these essential guardrails prevents data leaks and helps you pass store security audits on your first try. All security patterns and system APIs shown here are built right into your phone for free.',
    iconBg: 'bg-emerald-600',
    icon: <Lock className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'privacy',
    title: 'Privacy, Apple Manifests & Data Protection',
    badge: 'Privacy',
    description: 'User privacy is one of the most strictly enforced requirements in the Apple App Store and Google Play. You must inform users what data you collect and declare required privacy manifests before publishing. Bundling fonts locally and avoiding hidden ad trackers keeps you completely safe from legal fines. These free privacy templates and tools guarantee you satisfy Apple and Google rules.',
    iconBg: 'bg-indigo-600',
    icon: <EyeOff className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'legal',
    title: 'Legal, Terms of Service & EULA Templates',
    badge: 'Legal',
    description: 'Every published mobile app requires a publicly accessible Privacy Policy and Terms of Service before review. You can create and host these legal documents completely free using simple GitHub Pages. Having clear agreements also shields you from liability and protects your intellectual property. Use our copy-ready legal templates to get permanent HTTPS links in under 5 minutes.',
    iconBg: 'bg-amber-600',
    icon: <ScrollText className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'launch',
    title: 'App Store Launch, ASO & Distribution',
    badge: 'Launch & ASO',
    description: 'Your store listing is the storefront window where people decide whether to download your application. Prepare eye-catching screenshot mockups and clear descriptions that explain your app\'s benefits simply. Avoid common rejection traps like broken demo accounts or prohibited pricing claims in your title. These free mockup tools and checklists guide you step-by-step through submission day.',
    iconBg: 'bg-cyan-600',
    icon: <Rocket className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'analytics',
    title: 'Crash Reporting, Observability & Analytics',
    badge: 'Observability',
    description: 'Crash reporting helps you find and fix unexpected issues before frustrated users leave negative reviews. Privacy-friendly telemetry lets you see which features people enjoy without recording their personal identity. You can monitor performance speeds and battery health to keep your app running silky smooth. The observability tools featured here include robust free plans tailored for indie developers.',
    iconBg: 'bg-violet-600',
    icon: <BarChart2 className="w-6 h-6 text-white stroke-[1.8]" />
  }
];

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onBackToChecklist, collapseSignal }) => {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Close when collapse signal fires
  useEffect(() => {
    if (collapseSignal) {
      setExpandedSectionId(null);
      setExpandedItemId(null);
    }
  }, [collapseSignal]);

  // Listen for collapse signals when switching tabs or clicking dock icon
  useEffect(() => {
    const handleCollapseSubs = () => {
      setExpandedItemId(null);
    };
    const handleCollapseAllResources = () => {
      setExpandedSectionId(null);
      setExpandedItemId(null);
    };
    window.addEventListener('collapse-subsections', handleCollapseSubs);
    window.addEventListener('collapse-resources', handleCollapseAllResources);
    window.addEventListener('collapse-all', handleCollapseAllResources);
    return () => {
      window.removeEventListener('collapse-subsections', handleCollapseSubs);
      window.removeEventListener('collapse-resources', handleCollapseAllResources);
      window.removeEventListener('collapse-all', handleCollapseAllResources);
    };
  }, []);

  const handleCopyPrompt = (id: string, text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleToggleSection = (secId: string) => {
    setExpandedSectionId(prev => (prev === secId ? null : secId));
  };

  const handleToggleItem = (itemId: string) => {
    setExpandedItemId(prev => (prev === itemId ? null : itemId));
  };

  // Authentic Brand Color SVG Icon Renderer for each website/tool
  const renderBrandLogo = (item: ResourceItem) => {
    // 1. Google Gemini
    if (item.id === 'ai-gemini-antigravity' || item.id.includes('gemini')) {
      return (
        <svg className="w-6 h-6 text-[#1A73E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
        </svg>
      );
    }

    // 2. OpenAI
    if (item.id === 'ai-openai-astra' || item.id.includes('openai')) {
      return (
        <svg className="w-6 h-6 text-[#10A37F]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
        </svg>
      );
    }

    // 3. Anthropic / Claude
    if (item.id === 'ai-claude-sonnet' || item.id.includes('claude') || item.id.includes('anthropic')) {
      return (
        <svg className="w-6 h-6 text-[#D97757]" viewBox="0 0 24 24" fill="currentColor">
          <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
        </svg>
      );
    }

    // 4. DeepSeek
    if (item.id === 'ai-deepseek-r1' || item.id.includes('deepseek')) {
      return (
        <svg className="w-6 h-6 text-[#0066FF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45"/>
        </svg>
      );
    }

    // 5. Cursor AI Code Editor (Dark Isometric Pointer)
    if (item.id === 'ai-cursor') {
      return (
        <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 0l16 12-7 2-4 9-5-23z"/>
        </svg>
      );
    }

    // 6. Windsurf by Codeium (Teal Wave Vector)
    if (item.id === 'ai-windsurf') {
      return <Waves className="w-6 h-6 text-[#00A88F] stroke-[2.2]" />;
    }

    // 7. Figma Design Kits
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

    // 8. SF Symbols 6
    if (item.id === 'design-sf-symbols') {
      return <Sparkles className="w-6 h-6 text-[#007AFF] stroke-[2]" />;
    }

    // 9. Lucide Vector Icons
    if (item.id === 'design-lucide-icons') {
      return <Shapes className="w-6 h-6 text-[#F43F5E] stroke-[2]" />;
    }

    // 10. Mobbin Mobile UX
    if (item.id === 'design-mobbin') {
      return <Layers className="w-6 h-6 text-[#6366F1] stroke-[2]" />;
    }

    // 11. Fontshare
    if (item.id.includes('fontshare')) {
      return (
        <svg className="w-6 h-6 text-[#7C3AED]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4h18v3H13.5v13h-3V7H3V4z"/>
        </svg>
      );
    }

    // 12. Bunny Fonts
    if (item.id.includes('bunny')) {
      return (
        <svg className="w-6 h-6 text-[#E056FD]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      );
    }

    // 13. Geist by Vercel
    if (item.id.includes('geist') || item.id.includes('v0')) {
      return (
        <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 20h20L12 2z"/>
        </svg>
      );
    }

    // 14. Uncut Contemporary Typography
    if (item.id === 'type-uncut-curated') {
      return <Baseline className="w-6 h-6 text-[#059669] stroke-[2]" />;
    }

    // 15. Expo & React Native
    if (item.id === 'repo-expo') {
      return <Smartphone className="w-6 h-6 text-[#4630EB] stroke-[2.2]" />;
    }

    // 16. Zustand State Store
    if (item.id === 'repo-zustand') {
      return <Box className="w-6 h-6 text-[#8D6E63] stroke-[2.2]" />;
    }

    // 17. TanStack React Query
    if (item.id === 'repo-tanstack-query') {
      return <RefreshCw className="w-6 h-6 text-[#FF4154] stroke-[2.2]" />;
    }

    // 18. RevenueCat
    if (item.id.includes('revenuecat')) {
      return (
        <svg className="w-6 h-6 text-[#E75252]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.3036.3999c-1.5246 0-3.2129.1508-4.303.4136v14.9997c.3083.1722.8432.28 1.5632.28.7404 0 1.2553-.1072 1.5433-.28v-5.2323a14.8588 14.8588 0 0 0 2.121.1512h.3294l2.8604 5.0588c.432.195 1.0288.3024 1.9348.3024.8033 0 1.38-.1104 1.6476-.3024l-3.437-5.8358c1.4195-.8004 2.326-2.2698 2.326-4.4964C10.8894 1.827 8.4232.4 4.3037.4z"/>
        </svg>
      );
    }

    // 19. Capacitor
    if (item.id.includes('capacitor')) {
      return (
        <svg className="w-6 h-6 text-[#53B9EA]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 3.7l-5.766 5.766 5.725 5.736-3.713 3.712L5.073 3.742 8.786.03l5.736 5.726L20.284 0 24 3.7zM.029 8.785l3.713-3.713 15.173 15.173-3.713 3.714-5.732-5.726L3.7 24 0 20.285l5.754-5.764L.029 8.785z"/>
        </svg>
      );
    }

    // 20. Fastlane
    if (item.id.includes('fastlane')) {
      return (
        <svg className="w-6 h-6 text-[#EA3546]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.144 19.182a1.445 1.445 0 00-1.237-.868l-1.615-4.976-.37-1.135c-.017.01-.112.052-.13.06-.008.01-.025.01-.033.018a.366.366 0 00-.07.037.472.472 0 01-.102.043c-.043.016-.078.034-.12.042-.035.01-.07.027-.104.036-.04.01-.083.025-.126.034-.034.01-.068.017-.103.026a.584.584 0 01-.137.017c-.035.01-.07.01-.103.017-.028 0-.054 0-.08.01h-.16c-.052 0-.095 0-.146-.01-.035 0-.07 0-.095-.01l-.165-.025c-.026-.01-.052-.01-.086-.017a2.456 2.456 0 01-.25-.06 2.498 2.498 0 01-1.633-3.137C1.7 7.97 3.102 7.23 4.417 7.65l.344-1.1A3.673 3.673 0 00.167 8.94a3.674 3.674 0 002.39 4.59 3.877 3.877 0 001.624.128l1.634 5.035a1.432 1.432 0 00-.232.267 1.47 1.47 0 00.387 2.053 1.47 1.47 0 002.2-.662 1.572 1.572 0 00-.03-1.167z"/>
        </svg>
      );
    }

    // 21. Supabase
    if (item.id.includes('supabase')) {
      return (
        <svg className="w-6 h-6 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.362 9.354H12V.312a.312.312 0 0 0-.533-.22L.645 11.23a.625.625 0 0 0 .442 1.066H12v9.042a.312.312 0 0 0 .533.22l10.822-11.138a.625.625 0 0 0-.442-1.066h-.551z"/>
        </svg>
      );
    }

    // 22. Firebase
    if (item.id.includes('firebase')) {
      return (
        <svg className="w-6 h-6 text-[#FFA000]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371z"/>
        </svg>
      );
    }

    // 23. Neon Postgres
    if (item.id === 'backend-neon') {
      return <Database className="w-6 h-6 text-[#00E599] stroke-[2]" />;
    }

    // 24. Cloudflare
    if (item.id.includes('cloudflare')) {
      return (
        <svg className="w-6 h-6 text-[#F38020]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.414 10.424A7.5 7.5 0 0 0 5.2 9.5a5.5 5.5 0 0 0 .8 10.944h13.2a4.5 4.5 0 0 0 .214-8.995v-.025z"/>
        </svg>
      );
    }

    // 25. Resend Email
    if (item.id === 'backend-resend') {
      return <Mail className="w-6 h-6 text-[#1D1D1F] stroke-[2]" />;
    }

    // 26. Upstash Redis
    if (item.id === 'backend-upstash') {
      return <Zap className="w-6 h-6 text-[#10B981] stroke-[2]" />;
    }

    // 27. OWASP MASVS
    if (item.id === 'sec-owasp-masvs') {
      return <ShieldCheck className="w-6 h-6 text-[#003B5C] stroke-[2]" />;
    }

    // 28. TruffleHog Secret Scanner
    if (item.id === 'sec-trufflehog') {
      return <Search className="w-6 h-6 text-[#EC4899] stroke-[2.2]" />;
    }

    // 29. GitGuardian
    if (item.id === 'sec-gitguardian') {
      return <Eye className="w-6 h-6 text-[#1E3A8A] stroke-[2]" />;
    }

    // 30. W3C WebCrypto API
    if (item.id === 'sec-webcrypto') {
      return <Fingerprint className="w-6 h-6 text-[#6366F1] stroke-[2]" />;
    }

    // 31. Apple Privacy Manifests (XML File)
    if (item.id === 'priv-apple-manifest') {
      return <FileCode className="w-6 h-6 text-[#2563EB] stroke-[2]" />;
    }

    // 32. App Tracking Transparency (ATT Permission Toggles)
    if (item.id === 'priv-apple-att') {
      return <Sliders className="w-6 h-6 text-[#374151] stroke-[2]" />;
    }

    // 33. Privacy Nutrition Labels
    if (item.id === 'priv-nutrition-labels') {
      return <ListChecks className="w-6 h-6 text-[#059669] stroke-[2]" />;
    }

    // 34. Privado.ai Privacy Scanner
    if (item.id === 'priv-privado') {
      return <ShieldAlert className="w-6 h-6 text-[#9333EA] stroke-[2]" />;
    }

    // 35. GDPR Checklist
    if (item.id === 'priv-gdpr-checklist') {
      return <CheckCheck className="w-6 h-6 text-[#1D4ED8] stroke-[2]" />;
    }

    // 36. IAPP Privacy Standards
    if (item.id === 'priv-iapp') {
      return <Globe2 className="w-6 h-6 text-[#0D9488] stroke-[2]" />;
    }

    // 37. App Store Guidelines Section 5
    if (item.id === 'legal-store-guidelines') {
      return <BookOpen className="w-6 h-6 text-[#D97706] stroke-[2]" />;
    }

    // 38. Termly Legal Generator
    if (item.id === 'legal-termly') {
      return <FileSignature className="w-6 h-6 text-[#10B981] stroke-[2]" />;
    }

    // 39. Choose Open Source License
    if (item.id === 'legal-choose-license') {
      return <CheckSquare className="w-6 h-6 text-[#2563EB] stroke-[2]" />;
    }

    // 40. Cooley GO Legal Documents
    if (item.id === 'legal-cooley-go') {
      return <Scale className="w-6 h-6 text-[#4F46E5] stroke-[2]" />;
    }

    // 41. Y Combinator SAFE
    if (item.id === 'legal-yc-safe') {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="4" fill="#FF6600" />
          <path d="M7 6l4.5 8.5V20h2v-5.5L18 6h-2.5l-3.2 6.4L9.1 6H7z" fill="white" />
        </svg>
      );
    }

    // 42. TestFlight App Distribution (Official TestFlight Airplane Vector)
    if (item.id === 'launch-testflight') {
      return (
        <svg className="w-6 h-6 text-[#007AFF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      );
    }

    // 43. Appfigures ASO Tools
    if (item.id === 'launch-appfigures') {
      return <Search className="w-6 h-6 text-[#0284C7] stroke-[2]" />;
    }

    // 44. Store Screenshot Specifications
    if (item.id === 'launch-apple-screenshot-specs') {
      return <ImageIcon className="w-6 h-6 text-[#7C3AED] stroke-[2]" />;
    }

    // 45. Sensor Tower Category Insights
    if (item.id === 'launch-sensortower') {
      return <TrendingUp className="w-6 h-6 text-[#10B981] stroke-[2]" />;
    }

    // 46. Sentry
    if (item.id.includes('sentry')) {
      return (
        <svg className="w-6 h-6 text-[#E1567C]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.91 2.505c-.873-1.448-2.972-1.448-3.844 0L6.904 7.92a15.478 15.478 0 0 1 8.53 12.811h-2.221A13.301 13.301 0 0 0 5.784 9.814l-2.926 5.06a7.65 7.65 0 0 1 4.435 5.848H2.194a.365.365 0 0 1-.298-.534l1.413-2.402a5.16 5.16 0 0 0-1.614-.913L.296 19.275a2.182 2.182 0 0 0 .812 2.999 2.24 2.24 0 0 0 1.086.288h6.983a9.322 9.322 0 0 0-3.845-8.318l1.11-1.922a11.47 11.47 0 0 1 4.95 10.24h5.915a17.242 17.242 0 0 0-7.885-15.28l2.244-3.845a.37.37 0 0 1 .504-.13c.255.14 9.75 16.708 9.928 16.9a.365.365 0 0 1-.327.543h-2.287c.029.612.029 1.223 0 1.831h2.297a2.206 2.206 0 0 0 1.922-3.31z"/>
        </svg>
      );
    }

    // 47. PostHog
    if (item.id.includes('posthog')) {
      return (
        <svg className="w-6 h-6 text-[#F5A623]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.854 14.5 5 9.647.854 5.5A.5.5 0 0 0 0 5.854V8.44a.5.5 0 0 0 .146.353L5 13.647l.147.146L9.854 18.5l.146.147v-.049c.065.03.134.049.207.049h2.586a.5.5 0 0 0 .353-.854L9.854 14.5zm0-5-4-4a.487.487 0 0 0-.409-.144.515.515 0 0 0-.356.21.493.493 0 0 0-.089.288V8.44a.5.5 0 0 0 .147.353l9 9a.5.5 0 0 0 .853-.354v-2.585a.5.5 0 0 0-.146-.354l-5-5zm1-4a.5.5 0 0 0-.854.354V8.44a.5.5 0 0 0 .147.353l4 4a.5.5 0 0 0 .853-.354V9.854a.5.5 0 0 0-.146-.354l-4-4zm12.647 11.515a3.863 3.863 0 0 1-2.232-1.1l-4.708-4.707a.5.5 0 0 0-.854.354v6.585a.5.5 0 0 0 .5.5H23.5a.5.5 0 0 0 .5-.5v-.6c0-.276-.225-.497-.499-.532zm-5.394.032a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"/>
        </svg>
      );
    }

    // 48. Apple MetricKit Telemetry
    if (item.id === 'analytics-metrickit') {
      return <Activity className="w-6 h-6 text-[#2563EB] stroke-[2]" />;
    }

    // 49. Mixpanel
    if (item.id === 'analytics-mixpanel') {
      return <PieChart className="w-6 h-6 text-[#7856FF] stroke-[2]" />;
    }

    // 50. Aptabase Privacy Telemetry
    if (item.id === 'analytics-aptabase') {
      return <Gauge className="w-6 h-6 text-[#14B8A6] stroke-[2]" />;
    }

    // 51. Apple Official Brand (Apple HIG, SF Pro, Apple Keychain, Apple EULA, Apple Guidelines)
    if (item.id.includes('apple')) {
      return (
        <svg className="w-6 h-6 text-[#1D1D1F]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.8 1.44-.59.68-1.11 1.77-.97 2.83 1.11.09 2.18-.54 2.81-1.32z"/>
        </svg>
      );
    }

    // 52. Google Play & Material Design
    if (item.id.includes('google') || item.id.includes('play') || item.id.includes('material')) {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M3.6 1.8C3.3 2.1 3.2 2.6 3.2 3.2V20.8C3.2 21.4 3.4 21.9 3.6 22.2L13.8 12L3.6 1.8Z" fill="#0086F8"/>
          <path d="M17.2 8.6L13.8 12L17.2 15.4L21.4 13C22.2 12.5 22.2 11.5 21.4 11L17.2 8.6Z" fill="#FFC400"/>
          <path d="M3.6 22.2C4.1 22.7 4.9 22.8 5.7 22.3L17.2 15.4L13.8 12L3.6 22.2Z" fill="#FF3A44"/>
          <path d="M3.6 1.8L13.8 12L17.2 8.6L5.7 1.7C4.9 1.2 4.1 1.3 3.6 1.8Z" fill="#00F076"/>
        </svg>
      );
    }

    // 53. GitHub Open Source
    if (item.category === 'github_repos' || item.url.includes('github.com')) {
      return (
        <svg className="w-6 h-6 text-[#24292F]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    }

    // Default Fallback Icons
    switch (item.iconName) {
      case 'Type': return <Type className="w-6 h-6 text-indigo-600 stroke-[2]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-purple-600 stroke-[1.8]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-500 stroke-[2]" />;
      case 'Brain': return <Brain className="w-6 h-6 text-purple-600 stroke-[1.8]" />;
      case 'Terminal': return <Terminal className="w-6 h-6 text-slate-800 stroke-[2]" />;
      case 'Palette': return <Palette className="w-6 h-6 text-rose-500 stroke-[2]" />;
      case 'Shield': return <Shield className="w-6 h-6 text-emerald-600 stroke-[2]" />;
      case 'Key': return <Key className="w-6 h-6 text-indigo-600 stroke-[2]" />;
      case 'Scale': return <Scale className="w-6 h-6 text-amber-600 stroke-[2]" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-cyan-600 stroke-[2]" />;
      case 'Database': return <Database className="w-6 h-6 text-teal-600 stroke-[2]" />;
      case 'Activity': return <Activity className="w-6 h-6 text-violet-600 stroke-[2]" />;
      case 'Code': return <Code className="w-6 h-6 text-blue-600 stroke-[2]" />;
      default: return <GraduationCap className="w-6 h-6 text-purple-600 stroke-[2]" />;
    }
  };

  return (
    <div className="space-y-3.5 pb-4">
      
      {/* 1. Centered Title */}
      <div className="pt-2.5 pb-2 flex items-center justify-center w-full">
        <button
          type="button"
          onClick={onBackToChecklist}
          className="active:opacity-75 transition-opacity flex items-center justify-center space-x-1.5 px-3 py-1 rounded-2xl hover:bg-black/5 group max-w-full"
          title="Back to Checklist"
        >
          <h1 className="text-[25px] sm:text-[26px] font-medium tracking-normal text-center select-none text-black font-google truncate">
            Academy & Resources
          </h1>
        </button>
      </div>

      {/* 2. Section Cards */}
      <div className="space-y-4 pt-1">
        {SECTION_CONFIGS.map(sec => {
          const secItems = RESOURCES_DATA.filter(r => r.category === sec.id).slice(0, 6);
          const isSectionOpen = expandedSectionId === sec.id;

          return (
            <div 
              id={sec.id}
              key={sec.id}
              className={`rounded-3xl border border-slate-200/90 bg-white transition-all duration-200 shadow-xs ${
                isSectionOpen 
                  ? 'p-5 sm:p-6 space-y-3' 
                  : 'p-5 pb-3 sm:p-6 sm:pb-3.5 space-y-2.5 flex flex-col justify-between min-h-[168px]'
              }`}
            >
              {/* Section Header Block: clicking text minimizes/toggles section */}
              <div 
                onClick={() => handleToggleSection(sec.id)}
                className={`select-none cursor-pointer ${isSectionOpen ? 'space-y-2.5' : 'flex-1 flex flex-col justify-between'}`}
              >
                <div className="space-y-2 select-none">
                  <div className="w-full flex items-center justify-between select-none">
                    <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                      {/* Squircle Icon on the LEFT */}
                      <div className={`w-12 h-12 rounded-2xl ${sec.iconBg} flex items-center justify-center shrink-0 shadow-xs relative text-white`}>
                        {sec.icon}
                      </div>

                      {/* Clean Title First: Prominent and bold with no subtext above */}
                      <div className="select-none flex-1 min-w-0">
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug select-none font-google">
                          {sec.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Section Description: ALWAYS visible underneath the title! */}
                  <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none pt-0.5">
                    {sec.description}
                  </p>
                </div>

                {/* Drop-Down Arrow: NO circle when pointing DOWN (closed), Light gray circle when pointing UP (open/expanded) */}
                <div className="flex justify-center pt-2 pb-0.5 select-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSection(sec.id);
                    }}
                    className={`apple-press transition-all duration-200 flex items-center justify-center ${
                      !isSectionOpen 
                        ? 'w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-600 shadow-2xs' 
                        : 'w-7 h-7 text-slate-400 hover:text-slate-600'
                    }`}
                    aria-label={isSectionOpen ? "Collapse section" : "Expand section"}
                    title={isSectionOpen ? "Collapse section" : "Expand section"}
                  >
                    <ChevronDown 
                      strokeWidth={2.5}
                      className={`w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isSectionOpen ? 'rotate-180 text-slate-700' : 'text-slate-400'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Collapsed/Expanded Resource Items inside this Section */}
              <div className={`apple-drawer-collapse ${isSectionOpen ? 'expanded' : ''}`}>
                <div className="apple-drawer-content">
                  <div className="space-y-3 pt-2.5 border-t border-black/5">
                    {/* If Typography section, display curated font pairing preview cards */}
                    {sec.id === 'typography' && (
                      <div className="space-y-3 pb-1">
                        <div className="flex items-center space-x-2 pt-0.5 pb-0.5">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-google">
                            Curated Font Pairings &amp; Agent Prompts
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          {TYPOGRAPHY_PAIRINGS.map(pair => (
                            <div 
                              key={pair.id}
                              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5 select-none"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="text-xs font-black text-slate-900 font-google block">
                                    {pair.name}
                                  </span>
                                  <span className="text-[11px] font-medium text-slate-500 block pt-0.5">
                                    {pair.style}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyPrompt(pair.id, pair.prompt);
                                  }}
                                  className="apple-press px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 flex items-center space-x-1 shrink-0 shadow-2xs transition-colors"
                                  title="Copy prompt for your AI coding agent"
                                >
                                  {copiedPromptId === pair.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                                      <span className="text-emerald-700">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3 text-slate-500" />
                                      <span>Copy Prompt</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                                <div className="text-sm font-bold text-slate-900 tracking-tight">
                                  {pair.headingSample}
                                </div>
                                <div className="text-[12px] text-slate-600 leading-relaxed">
                                  {pair.bodySample}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {secItems.map((item, itemIdx) => {
                      const isItemOpen = expandedItemId === item.id;
                      const isApple = item.id.includes('apple') || item.id.includes('att') || item.id.includes('testflight') || item.id.includes('sf-pro');
                      const isGooglePlay = item.id.includes('play') || item.id.includes('google-policy');

                      return (
                        <div 
                          id={item.id}
                          key={item.id}
                          className={`rounded-2xl border transition-all duration-200 shadow-xs ${
                            isItemOpen 
                              ? 'bg-white border-slate-300 p-4 sm:p-5 space-y-2.5' 
                              : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300 p-4 pb-2 sm:p-5 sm:pb-2.5 space-y-2'
                          }`}
                        >
                          {/* Item Header Block: clicking text minimizes/toggles item */}
                          <div 
                            onClick={() => handleToggleItem(item.id)}
                            className="space-y-2 select-none cursor-pointer"
                          >
                            <div className="w-full flex items-center justify-between select-none">
                              <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                                
                                {/* Squircle containing official brand colored logo */}
                                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs relative">
                                  {renderBrandLogo(item)}
                                </div>

                                {/* Title Only: Clean and prominent with no subtext/badge above */}
                                <div className="select-none flex-1 min-w-0">
                                  <h3 
                                    className={`text-sm sm:text-base font-bold tracking-tight leading-snug select-none truncate ${
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
                            <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed select-none pt-0.5">
                              {item.shortDescription}
                            </p>

                            {/* Centered arrow: NO circle when pointing DOWN (closed), Light gray circle when pointing UP (open/expanded) */}
                            <div className="flex justify-center pt-0.5 pb-0 select-none">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleItem(item.id);
                                }}
                                className={`apple-press transition-all duration-200 flex items-center justify-center ${
                                  !isItemOpen 
                                    ? 'w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-600 shadow-2xs' 
                                    : 'w-7 h-7 text-slate-400 hover:text-slate-600'
                                }`}
                                title={isItemOpen ? 'Close information' : 'Expand information'}
                                aria-label={isItemOpen ? 'Close information' : 'Expand information'}
                              >
                                <ChevronDown 
                                  strokeWidth={2.5}
                                  className={`w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                    isItemOpen ? 'rotate-180 text-slate-700' : 'text-slate-400'
                                  }`} 
                                />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Guidance Drawer with Subsections down below */}
                          <div className={`apple-drawer-collapse ${isItemOpen ? 'expanded' : ''}`}>
                            <div className="apple-drawer-content">
                              <div 
                                onClick={() => setExpandedItemId(null)}
                                className="space-y-4 pt-3 border-t border-slate-100/90 text-slate-800 select-none cursor-pointer"
                                title="Click anywhere to minimize"
                              >
                                
                                {/* Subsection 1: Why It Matters & Business Tier Model */}
                                {item.whyItMatters && (
                                  <div className="space-y-1.5">
                                    <div className="flex items-center space-x-1.5 select-none">
                                      <HelpCircle className="w-3.5 h-3.5 text-indigo-600 stroke-[2.2] shrink-0" />
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Why It Matters
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.whyItMatters}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 2: Key Highlights - Icon: Sparkles, Color: text-blue-600 */}
                                {item.keyFeatures && item.keyFeatures.length > 0 && (
                                  <div className="space-y-2 pt-1 border-t border-slate-100/80">
                                    <div className="flex items-center space-x-1.5 select-none">
                                      <Sparkles className="w-3.5 h-3.5 text-blue-600 stroke-[2.2] shrink-0" />
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Key Highlights
                                      </span>
                                    </div>
                                    <div className="space-y-2 pt-0.5">
                                      {item.keyFeatures.map((feat, idx) => (
                                        <div key={idx} className="flex items-start space-x-2.5 text-slate-700">
                                          <span className="font-bold text-slate-900 text-xs shrink-0 mt-0.5 select-none">
                                            {idx + 1}.
                                          </span>
                                          <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-slate-800 flex-1 min-w-0">
                                            {feat}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Subsection 3: Best Used For - Icon: Target, Color: text-purple-600 */}
                                {item.bestUsedFor && (
                                  <div className="space-y-1.5 pt-1 border-t border-slate-100/80">
                                    <div className="flex items-center space-x-1.5 select-none">
                                      <Target className="w-3.5 h-3.5 text-purple-600 stroke-[2.2] shrink-0" />
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Best Used For
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.bestUsedFor}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 4: Free Access & Licensing - Icon: CreditCard, Color: text-emerald-600 */}
                                {item.freeTierInfo && (
                                  <div className="space-y-1.5 pt-1 border-t border-slate-100/80">
                                    <div className="flex items-center space-x-1.5 select-none">
                                      <CreditCard className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2] shrink-0" />
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Free Access &amp; Licensing
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.freeTierInfo}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 4: Quick Start & Integration - Icon: Terminal, Color: text-amber-600 */}
                                {item.quickStart && (
                                  <div className="space-y-1.5 pt-1 border-t border-slate-100/80">
                                    <div className="flex items-center space-x-1.5 select-none">
                                      <Terminal className="w-3.5 h-3.5 text-amber-600 stroke-[2.2] shrink-0" />
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Quick Start &amp; Integration
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.quickStart}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 5: Common Pitfalls & Review Traps - Icon: AlertTriangle, Color: text-rose-600 */}
                                {item.reviewTraps && (
                                  <div className="space-y-1.5 pt-1 border-t border-slate-100/80">
                                    <div className="flex items-center space-x-1.5 select-none">
                                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 stroke-[2.2] shrink-0" />
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Common Pitfalls &amp; Review Traps
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.reviewTraps}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 6: Setup Command / AI Prompt - Styled consistently with Key Highlights with Copy button */}
                                {item.promptOrCommand && (
                                  <div className="space-y-2 pt-1 border-t border-slate-100/80">
                                    <div className="flex items-center justify-between select-none">
                                      <div className="flex items-center space-x-1.5 select-none">
                                        <Terminal className="w-3.5 h-3.5 text-slate-700 stroke-[2.2] shrink-0" />
                                        <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                          {item.promptLabel || 'Install & Setup Command'}
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCopyPrompt(item.id, item.promptOrCommand || '');
                                        }}
                                        className="apple-press px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 flex items-center space-x-1 shrink-0 shadow-2xs transition-colors"
                                        title="Copy to clipboard"
                                      >
                                        {copiedPromptId === item.id ? (
                                          <>
                                            <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                                            <span className="text-emerald-700">Copied!</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3 text-slate-500" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                    <div 
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 select-text cursor-text"
                                    >
                                      <p className="text-slate-800 font-mono text-[12px] leading-relaxed whitespace-pre-line">
                                        {item.promptOrCommand}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Subsection 5: Visit Official Resource Link */}
                                <div className="pt-2">
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

                                {/* Bottom Centered Arrow Close Drawer Trigger */}
                                <div className="pt-1 flex flex-col items-center select-none">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedItemId(null);
                                    }}
                                    className="apple-press w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                    title="Close details"
                                    aria-label="Close details"
                                  >
                                    <ChevronUp 
                                      strokeWidth={2.5}
                                      className="w-4 h-4 stroke-[2.5] text-slate-400" 
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
              </div>
            </div>
          );
        })}
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
