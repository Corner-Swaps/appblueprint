import React, { useState, useEffect, useRef } from 'react';
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
  Server,
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
  Target,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  HeartHandshake,
} from 'lucide-react';
import {
  AppleLogo,
  GitHubLogo,
  TestFlightLogo,
  FastlaneLogo,
  RevenueCatLogo,
  OpenAILogo,
  ClaudeLogo,
  GeminiLogo,
  CursorLogo,
  FigmaLogo,
  TailwindLogo,
  CapacitorLogo,
  SupabaseLogo,
  FirebaseLogo,
  CloudflareLogo,
  VercelLogo,
  FlutterLogo,
  ProductHuntLogo,
  SentryLogo,
  MixpanelLogo,
  EUFlagLogo,
  PostHogLogo,
} from '../utils/brandIcons';
import { triggerHaptic } from '../utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';
import { fluidScrollTo } from '../utils/fluidScroll';
import { getCategoryGlowRgb } from '../utils/phaseThemes';

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

const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: 'ai_models',
    title: 'AI Models & Coding Agents',
    badge: 'Core Intelligence',
    description: 'AI coding models inspect your codebase and write code in your terminal. They build screens, fix bugs, and connect device APIs in minutes. Choose from Antigravity, Claude, and Cursor.',
    iconBg: 'bg-purple-600',
    icon: <Brain className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'design',
    title: 'Design Systems & UI/UX',
    badge: 'Interface Systems',
    description: 'Great design makes your app feel natural and effortless to use from the very first tap. Learn proven layout structures from Apple and Google so your buttons are comfortable and your screens look clean. Study successful apps to gain design inspiration without copying copyrighted artwork or brand trademarks.',
    iconBg: 'bg-rose-500',
    icon: <Layout className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'typography',
    title: 'Typography & Font Systems',
    badge: 'Curated Fonts',
    description: 'Typography controls how easy your app is to read and gives your product a distinct personality. Using system fonts or self-hosted font files keeps your app fast and protects user privacy from third-party tracking. Explore curated font systems, pairing guides, and typography resources below with copy-ready prompts for your AI agents.',
    iconBg: 'bg-indigo-600',
    icon: <Type className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'github_repos',
    title: 'Open Source Frameworks & SDKs',
    badge: 'Verified SDKs',
    description: 'Open source libraries provide pre-built building blocks so you never have to reinvent the wheel. Add tactile vibrations, camera access, and offline data storage with battle-tested community code. These packages save hundreds of hours of manual work and work seamlessly across iOS and iPadOS.',
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
    icon: <Server className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'security',
    title: 'Security & Keychain Auth',
    badge: 'Hardware Enclave',
    description: 'Security protects your users and keeps private login passwords safe on their physical phones. Using the iOS Keychain and Secure Enclave hardware chips ensures sensitive data is never exposed. Following these essential guardrails prevents data leaks and helps you pass store security audits on your first try. All security patterns and system APIs shown here are built right into your phone for free.',
    iconBg: 'bg-emerald-600',
    icon: <Lock className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'privacy',
    title: 'Privacy & Store Compliance',
    badge: 'Store Compliance',
    description: 'User privacy is one of the most strictly enforced requirements in the Apple App Store. You must inform users what data you collect and declare required privacy manifests before publishing. Bundling fonts locally and avoiding hidden ad trackers keeps you completely safe from legal fines. These free privacy templates and tools guarantee you satisfy Apple rules.',
    iconBg: 'bg-indigo-600',
    icon: <EyeOff className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'legal',
    title: 'Legal & Privacy Templates',
    badge: 'Terms & Policies',
    description: 'Every published mobile app requires a publicly accessible Privacy Policy and Terms of Service before review. You can create and host these legal documents completely free using simple GitHub Pages. Having clear agreements also shields you from liability and protects your intellectual property. Use our copy-ready legal templates to get permanent HTTPS links in under 5 minutes.',
    iconBg: 'bg-amber-600',
    icon: <ScrollText className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'launch',
    title: 'App Store Launch & Release',
    badge: 'Store Publishing',
    description: 'Your store listing is the storefront window where people decide whether to download your application. Prepare eye-catching screenshot mockups and clear descriptions that explain your app\'s benefits simply. Avoid common rejection traps like broken demo accounts or prohibited pricing claims in your title. These free mockup tools and checklists guide you step-by-step through submission day.',
    iconBg: 'bg-cyan-600',
    icon: <Rocket className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'analytics',
    title: 'Crash Reporting & Diagnostics',
    badge: 'Telemetry & Health',
    description: 'Crash reporting helps you find and fix unexpected issues before frustrated users leave negative reviews. Privacy-friendly telemetry lets you see which features people enjoy without recording their personal identity. You can monitor performance speeds and battery health to keep your app running silky smooth. The observability tools featured here include robust free plans tailored for indie developers.',
    iconBg: 'bg-violet-600',
    icon: <BarChart2 className="w-6 h-6 text-white stroke-[1.8]" />
  }
];

const SECTION_CONFIG_MAP = new Map<string, SectionConfig>(
  SECTION_CONFIGS.map(s => [s.id, s])
);
const DEFAULT_SECTION_ORDER = SECTION_CONFIGS.map(s => s.id);

export const ResourcesPage: React.FC<ResourcesPageProps> = React.memo(({ onBackToChecklist, collapseSignal }) => {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [minimizedSectionId, setMinimizedSectionId] = useState<string | null>(null);
  const [minimizedItemId, setMinimizedItemId] = useState<string | null>(null);
  const pulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemPulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerCategoryPulse = (secId: string) => {
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    setMinimizedSectionId(secId);
    pulseTimeoutRef.current = setTimeout(() => {
      setMinimizedSectionId(null);
    }, 2050);
  };

  const triggerItemPulse = (itemId: string) => {
    if (itemPulseTimeoutRef.current) clearTimeout(itemPulseTimeoutRef.current);
    setMinimizedItemId(itemId);
    itemPulseTimeoutRef.current = setTimeout(() => {
      setMinimizedItemId(null);
    }, 1850);
  };

  // Close when collapse signal fires
  useEffect(() => {
    if (collapseSignal) {
      setExpandedSectionId(null);
      setExpandedItemId(null);
      setMinimizedSectionId(null);
      setMinimizedItemId(null);
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
    copyToClipboard(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const renderTierBadge = (badge?: string) => {
    if (!badge) return null;
    switch (badge) {
      case 'Free':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-google bg-emerald-50 text-emerald-700 border border-emerald-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <CheckCircle2 className="w-2.5 h-2.5 shrink-0 text-emerald-600" />
            <span>100% Free</span>
          </span>
        );
      case 'Open Source':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-google bg-blue-50 text-blue-700 border border-blue-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <Code className="w-2.5 h-2.5 shrink-0 text-blue-600" />
            <span>Open Source</span>
          </span>
        );
      case 'Official':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-google bg-purple-50 text-purple-700 border border-purple-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <ShieldCheck className="w-2.5 h-2.5 shrink-0 text-purple-600" />
            <span>Official</span>
          </span>
        );
      case 'AI Model':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-google bg-indigo-50 text-indigo-700 border border-indigo-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <Brain className="w-2.5 h-2.5 shrink-0 text-indigo-600" />
            <span>AI Model</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-google bg-amber-50 text-amber-700 border border-amber-200/80 tracking-wide inline-flex items-center space-x-1 shadow-2xs">
            <Zap className="w-2.5 h-2.5 shrink-0 text-amber-600" />
            <span>{badge}</span>
          </span>
        );
    }
  };

  const isCollapsingCategoryRef = useRef(false);
  const isCollapsingItemRef = useRef<string | null>(null);

  // Curated Resources State (persisted to localStorage)
  const [resourceItems, setResourceItems] = useState<ResourceItem[]>(() => {
    try {
      const saved = localStorage.getItem('appblueprint_resources_items_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge in any missing default items from RESOURCES_DATA so new official additions always appear
          const existingIds = new Set(parsed.map((item: ResourceItem) => item.id));
          const missingDefaults = RESOURCES_DATA.filter(item => !existingIds.has(item.id));
          if (missingDefaults.length > 0) {
            return [...parsed, ...missingDefaults];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved resource items', e);
    }
    return RESOURCES_DATA;
  });

  useEffect(() => {
    if (resourceItems === RESOURCES_DATA && !localStorage.getItem('appblueprint_resources_items_v1')) {
      return;
    }
    try {
      localStorage.setItem('appblueprint_resources_items_v1', JSON.stringify(resourceItems));
    } catch (e) {
      console.warn('Failed to save resource items', e);
    }
  }, [resourceItems]);

  // Pre-group resource items by category for O(1) lookup per section
  const itemsByCategory = React.useMemo(() => {
    const map = new Map<string, ResourceItem[]>();
    for (const item of resourceItems) {
      const list = map.get(item.category);
      if (list) {
        list.push(item);
      } else {
        map.set(item.category, [item]);
      }
    }
    return map;
  }, [resourceItems]);

  // Category Ordering State (persisted to localStorage)
  const [sectionOrder, setSectionOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('appblueprint_resources_order_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved category order', e);
    }
    return DEFAULT_SECTION_ORDER;
  });

  useEffect(() => {
    if (sectionOrder === DEFAULT_SECTION_ORDER && !localStorage.getItem('appblueprint_resources_order_v1')) {
      return;
    }
    try {
      localStorage.setItem('appblueprint_resources_order_v1', JSON.stringify(sectionOrder));
    } catch (e) {
      console.warn('Failed to save category order', e);
    }
  }, [sectionOrder]);

  // Edit and Add Mode States
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [addingToCategoryId, setAddingToCategoryId] = useState<string | null>(null);
  const [newToolTitle, setNewToolTitle] = useState('');
  const [newToolDesc, setNewToolDesc] = useState('');
  const [newToolUrl, setNewToolUrl] = useState('');
  const [newToolPrompt, setNewToolPrompt] = useState('');

  const handleMoveCategory = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= sectionOrder.length) return;
    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);
    setSectionOrder(newOrder);
    triggerHaptic(ImpactStyle.Light);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const cat = SECTION_CONFIGS.find(s => s.id === categoryId);
    const title = cat ? `"${cat.title}"` : 'this category';
    if (!window.confirm(`Delete category ${title} and all its tools?`)) return;
    setSectionOrder(prev => prev.filter(id => id !== categoryId));
    setResourceItems(prev => prev.filter(item => item.category !== categoryId));
    if (expandedSectionId === categoryId) {
      setExpandedSectionId(null);
    }
    triggerHaptic(ImpactStyle.Medium);
  };

  const handleMoveTool = (categoryId: string, fromCatIdx: number, toCatIdx: number) => {
    const catTools = resourceItems.filter(r => r.category === categoryId);
    if (toCatIdx < 0 || toCatIdx >= catTools.length) return;

    const fromTool = catTools[fromCatIdx];
    const toTool = catTools[toCatIdx];

    setResourceItems(prev => {
      const list = [...prev];
      const globalFromIdx = list.findIndex(r => r.id === fromTool.id);
      const globalToIdx = list.findIndex(r => r.id === toTool.id);
      if (globalFromIdx === -1 || globalToIdx === -1) return prev;

      const [moved] = list.splice(globalFromIdx, 1);
      list.splice(globalToIdx, 0, moved);
      return list;
    });
    triggerHaptic(ImpactStyle.Light);
  };

  const handleDeleteTool = (toolId: string) => {
    const tool = resourceItems.find(r => r.id === toolId);
    const title = tool ? `"${tool.title}"` : 'this tool';
    if (!window.confirm(`Delete tool ${title}?`)) return;
    setResourceItems(prev => prev.filter(r => r.id !== toolId));
    triggerHaptic(ImpactStyle.Medium);
  };

  const handleCreateTool = (categoryId: string) => {
    if (!newToolTitle.trim()) return;
    const catConfig = SECTION_CONFIGS.find(s => s.id === categoryId);
    const newTool: ResourceItem = {
      id: `tool-${Date.now()}`,
      category: categoryId as ResourceCategory,
      categoryLabel: catConfig?.title || 'Curated Resource',
      title: newToolTitle.trim(),
      shortDescription: newToolDesc.trim() || 'Curated development tool',
      whyItMatters: newToolDesc.trim() || 'Accelerates your mobile app development workflow.',
      keyFeatures: ['Official tool support', 'Easy integration', 'Beginner friendly'],
      bestUsedFor: 'Building and enhancing mobile features quickly',
      freeTierInfo: 'Check provider website for current pricing',
      badge: 'Official',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      url: newToolUrl.trim() || 'https://google.com',
      iconName: 'Sparkles',
      promptOrCommand: newToolPrompt.trim() || undefined,
    };
    setResourceItems(prev => [newTool, ...prev]);
    setNewToolTitle('');
    setNewToolDesc('');
    setNewToolUrl('');
    setNewToolPrompt('');
    setAddingToCategoryId(null);
    triggerHaptic(ImpactStyle.Light);
  };

  const getCollapsedPillHeight = (el: HTMLElement, defaultHeight: number): number => {
    try {
      const headerEl = el.firstElementChild as HTMLElement;
      if (headerEl && headerEl.offsetHeight > 40) {
        const computed = window.getComputedStyle(el);
        const pt = parseFloat(computed.paddingTop) || 20;
        const pb = parseFloat(computed.paddingBottom) || 12;
        const bt = parseFloat(computed.borderTopWidth) || 1;
        const bb = parseFloat(computed.borderBottomWidth) || 1;
        return headerEl.offsetHeight + pt + pb + bt + bb;
      }
    } catch {
      // fallback
    }
    return defaultHeight;
  };

  const handleToggleSection = (secId: string, _centerInViewport = false) => {
    if (isCollapsingCategoryRef.current) return;

    if (expandedSectionId === secId) {
      // Minimizing / Collapsing this category
      const targetEl = document.getElementById(secId);
      if (!targetEl) {
        setExpandedItemId(null);
        setExpandedSectionId(null);
        return;
      }

      const rect = targetEl.getBoundingClientRect();
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const elDocTop = currentScroll + rect.top;
      const viewportHeight = window.innerHeight;
      const collapsedHeight = getCollapsedPillHeight(targetEl, 264);
      // Calculate exact scroll target to position the collapsed category pill in the vertical center of the viewport
      const centeredTargetY = Math.max(0, elDocTop - (viewportHeight - collapsedHeight) / 2);
      const diff = Math.abs(currentScroll - centeredTargetY);

      // 1. Immediately fold the category drawer UPWARDS into the pill header
      setExpandedItemId(null);
      setExpandedSectionId(null);
      isCollapsingCategoryRef.current = true;

      // 2. Smoothly glide to the center of the viewport
      if (diff > 8) {
        fluidScrollTo(centeredTargetY, {
          duration: 320,
        });
      }

      setTimeout(() => {
        triggerCategoryPulse(secId);
        isCollapsingCategoryRef.current = false;
      }, 360);
      return;
    }

    // Expanding a new section
    setExpandedItemId(null);
    setExpandedSectionId(secId);
  };

  const handleToggleItem = (itemId: string) => {
    if (expandedItemId === itemId) {
      handleCollapseItem(itemId);
    } else {
      setExpandedItemId(itemId);
    }
  };

  const centerSubsection = (itemId: string) => {
    const el = document.getElementById(itemId);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const itemDocTop = currentScroll + rect.top;
    const viewportHeight = window.innerHeight;
    const itemHeight = rect.height || 100;
    const centeredY = Math.max(0, itemDocTop - (viewportHeight - itemHeight) / 2);
    fluidScrollTo(centeredY, { duration: 380 });
  };

  const handleCollapseItem = (itemId: string) => {
    if (isCollapsingItemRef.current) return;
    isCollapsingItemRef.current = itemId;

    const el = document.getElementById(itemId);
    if (!el) {
      setExpandedItemId(null);
      isCollapsingItemRef.current = null;
      return;
    }

    const rect = el.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const elDocTop = currentScroll + rect.top;
    const viewportHeight = window.innerHeight;
    const collapsedHeight = getCollapsedPillHeight(el, 204);
    // Calculate exact scroll target to position the collapsed tool pill in the vertical center of the viewport
    const centeredTargetY = Math.max(0, elDocTop - (viewportHeight - collapsedHeight) / 2);
    const diff = Math.abs(currentScroll - centeredTargetY);

    // 1. Immediately fold the tool drawer UPWARDS into the sub pill
    setExpandedItemId(null);

    // 2. Smoothly glide to the center of the viewport
    if (diff > 8) {
      fluidScrollTo(centeredTargetY, {
        duration: 320,
      });
    }

    setTimeout(() => {
      triggerItemPulse(itemId);
      isCollapsingItemRef.current = null;
    }, 360);
  };

  const handleDrawerTextClick = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    // If text was actively selected by user, don't collapse
    if (window.getSelection && (window.getSelection()?.toString().length || 0) > 0) {
      return;
    }
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('a') || 
      target.closest('input') || 
      target.closest('textarea') ||
      target.closest('[role="button"]') ||
      target.closest('.apple-press')
    ) {
      return;
    }
    handleCollapseItem(itemId);
  };

  // Authentic Brand Color SVG Icon Renderer for each website/tool
  // Authentic Brand Color SVG & Clean Standard Icon Renderer for each website/tool
  const renderBrandLogo = (item: ResourceItem) => {
    // ----------------------------------------------------
    // CATEGORY 1: TYPOGRAPHY (7 Tools)
    // ----------------------------------------------------
    if (item.id === "type-typewolf") {
      return <Type className="w-6 h-6 text-[#111827] stroke-[2]" />;
    }
    if (item.id === "type-fontshare") {
      return <Type className="w-6 h-6 text-[#7C3AED] stroke-[2]" />;
    }
    if (item.id === "type-bunny-fonts") {
      return <Baseline className="w-6 h-6 text-[#FF70A6] stroke-[2]" />;
    }
    if (item.id === "type-apple-sf-pro") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "type-open-fonts-local" || item.id.includes("fonts")) {
      return <Baseline className="w-6 h-6 text-[#059669] stroke-[2]" />;
    }
    if (item.id === "type-geist-vercel") {
      return <VercelLogo className="w-6 h-6 text-black" />;
    }
    if (item.id === "type-uncut-fonts") {
      return <Baseline className="w-6 h-6 text-[#059669] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 2: AI MODELS & AGENTS (8 Tools)
    // ----------------------------------------------------
    if (item.id === "ai-gemini-antigravity" || item.id.includes("gemini")) {
      return <GeminiLogo className="w-6 h-6 text-[#1A73E8]" />;
    }
    if (item.id === "ai-openai-astra" || item.id.includes("openai")) {
      return <OpenAILogo className="w-6 h-6 text-[#10A37F]" />;
    }
    if (item.id === "ai-claude-sonnet" || item.id.includes("claude") || item.id.includes("anthropic")) {
      return <ClaudeLogo className="w-6 h-6 text-[#D97757]" />;
    }
    if (item.id === "ai-deepseek-r1" || item.id.includes("deepseek")) {
      return <Cpu className="w-6 h-6 text-[#0066FF] stroke-[2]" />;
    }
    if (item.id === "ai-cursor") {
      return <CursorLogo className="w-6 h-6 text-[#1A1A1A]" />;
    }
    if (item.id === "ai-windsurf") {
      return <Waves className="w-6 h-6 text-[#00A88F] stroke-[2.2]" />;
    }
    if (item.id === "ai-v0-vercel") {
      return <VercelLogo className="w-6 h-6 text-black" />;
    }
    if (item.id === "ai-ollama") {
      return <Terminal className="w-6 h-6 text-[#1D1D1F] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 3: DESIGN & UI/UX (10 Tools)
    // ----------------------------------------------------
    if (item.id === "design-apple-design" || item.id === "design-apple-hig") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "design-apple-figma" || item.id.includes("figma")) {
      return <FigmaLogo className="w-6 h-6" />;
    }
    if (item.id === "design-sf-symbols") {
      return <AppleLogo className="w-6 h-6 text-[#007AFF]" />;
    }
    if (item.id === "design-lucide-icons") {
      return <Shapes className="w-6 h-6 text-[#F43F5E] stroke-[2]" />;
    }
    if (item.id === "design-mobbin") {
      return <Layers className="w-6 h-6 text-[#6366F1] stroke-[2]" />;
    }
    if (item.id === "design-tailwind") {
      return <TailwindLogo className="w-6 h-6 text-[#06B6D4]" />;
    }
    if (item.id === "design-shots") {
      return <ImageIcon className="w-6 h-6 text-[#FF4F00] stroke-[2]" />;
    }
    if (item.id === "design-app-mockup") {
      return <Smartphone className="w-6 h-6 text-[#8B5CF6] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 4: OPEN SOURCE REPOS (8 Tools)
    // ----------------------------------------------------
    if (item.id === "repo-capacitor" || item.id.includes("capacitor")) {
      return <CapacitorLogo className="w-6 h-6 text-[#53B9EA]" />;
    }
    if (item.id === "repo-expo") {
      return <Smartphone className="w-6 h-6 text-[#4630EB] stroke-[2.2]" />;
    }
    if (item.id === "repo-revenuecat" || item.id.includes("revenuecat")) {
      return <RevenueCatLogo className="w-6 h-6 text-[#E75252]" />;
    }
    if (item.id === "repo-zustand") {
      return <Box className="w-6 h-6 text-[#8D6E63] stroke-[2.2]" />;
    }
    if (item.id === "repo-tanstack-query") {
      return <RefreshCw className="w-6 h-6 text-[#FF4154] stroke-[2.2]" />;
    }
    if (item.id === "repo-fastlane" || item.id.includes("fastlane")) {
      return <FastlaneLogo className="w-6 h-6 text-[#EA3546]" />;
    }
    if (item.id === "repo-flutter") {
      return <FlutterLogo className="w-6 h-6" />;
    }
    if (item.id === "repo-lucide-react") {
      return <Shapes className="w-6 h-6 text-[#61DAFB] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 5: BACKEND & CLOUD (8 Tools)
    // ----------------------------------------------------
    if (item.id === "backend-supabase" || item.id.includes("supabase")) {
      return <SupabaseLogo className="w-6 h-6 text-[#3ECF8E]" />;
    }
    if (item.id === "backend-firebase" || item.id.includes("firebase")) {
      return <FirebaseLogo className="w-6 h-6 text-[#FFA000]" />;
    }
    if (item.id === "backend-neon") {
      return <Database className="w-6 h-6 text-[#00E599] stroke-[2]" />;
    }
    if (item.id === "backend-cloudflare" || item.id.includes("cloudflare")) {
      return <CloudflareLogo className="w-6 h-6 text-[#F38020]" />;
    }
    if (item.id === "backend-resend") {
      return <Mail className="w-6 h-6 text-[#1D1D1F] stroke-[2]" />;
    }
    if (item.id === "backend-upstash") {
      return <Zap className="w-6 h-6 text-[#10B981] stroke-[2]" />;
    }
    if (item.id === "backend-appwrite") {
      return <Server className="w-6 h-6 text-[#FD366E] stroke-[2]" />;
    }
    if (item.id === "backend-railway") {
      return <Layout className="w-6 h-6 text-[#0B0D0E] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 6: SECURITY & AUTH (8 Tools)
    // ----------------------------------------------------
    if (item.id === "sec-owasp-masvs") {
      return <ShieldCheck className="w-6 h-6 text-[#003B5C] stroke-[2]" />;
    }
    if (item.id === "sec-apple-keychain") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "sec-trufflehog") {
      return <Search className="w-6 h-6 text-[#EC4899] stroke-[2.2]" />;
    }
    if (item.id === "sec-gitguardian") {
      return <Eye className="w-6 h-6 text-[#1E3A8A] stroke-[2]" />;
    }
    if (item.id === "sec-capacitor-secure-storage") {
      return <CapacitorLogo className="w-6 h-6 text-[#53B9EA]" />;
    }
    if (item.id === "sec-w3c-crypto") {
      return <Fingerprint className="w-6 h-6 text-[#6366F1] stroke-[2]" />;
    }
    if (item.id === "sec-haveibeenpwned") {
      return <Terminal className="w-6 h-6 text-[#1B809E] stroke-[2]" />;
    }
    if (item.id === "sec-lets-encrypt") {
      return <Lock className="w-6 h-6 text-[#003A70] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 7: PRIVACY & MANIFESTS (8 Tools)
    // ----------------------------------------------------
    if (item.id === "priv-apple-manifest") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "priv-apple-att") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "priv-nutrition-labels") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "priv-privado") {
      return <ShieldAlert className="w-6 h-6 text-[#9333EA] stroke-[2]" />;
    }
    if (item.id === "priv-termsfeed") {
      return <FileText className="w-6 h-6 text-[#22C55E] stroke-[2]" />;
    }
    if (item.id === "priv-iubenda") {
      return <Shield className="w-6 h-6 text-[#0069FF] stroke-[2]" />;
    }
    if (item.id === "priv-google-data-safety" || item.id === "priv-apple-privacy-nutrition") {
      return <Shield className="w-6 h-6 text-[#0069FF] stroke-[2]" />;
    }
    if (item.id === "priv-duckduckgo-tracker") {
      return <Globe className="w-6 h-6 text-[#DE5833] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 8: LEGAL & POLICIES (8 Tools)
    // ----------------------------------------------------
    if (item.id === "legal-apple-eula") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "legal-store-guidelines") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "legal-termly") {
      return <FileSignature className="w-6 h-6 text-[#10B981] stroke-[2]" />;
    }
    if (item.id === "legal-ftc-click-to-cancel") {
      return <Scale className="w-6 h-6 text-[#002B66] stroke-[2]" />;
    }
    if (item.id === "legal-eu-dsa") {
      return <EUFlagLogo className="w-6 h-6" />;
    }
    if (item.id === "legal-coppa") {
      return <HeartHandshake className="w-6 h-6 text-[#F59E0B] stroke-[2]" />;
    }
    if (item.id === "legal-mit-license") {
      return <CheckSquare className="w-6 h-6 text-[#2563EB] stroke-[2]" />;
    }
    if (item.id === "legal-ugc-safety") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 9: STORE LAUNCH & ASO (10 Tools)
    // ----------------------------------------------------
    if (item.id === "launch-app-store-connect") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "launch-google-play-console") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "launch-testflight") {
      return <TestFlightLogo className="w-6 h-6 text-[#007AFF]" />;
    }
    if (item.id === "launch-review-guidelines") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "launch-google-policy") {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id === "launch-appfigures") {
      return <Search className="w-6 h-6 text-[#0284C7] stroke-[2]" />;
    }
    if (item.id === "launch-sensortower") {
      return <TrendingUp className="w-6 h-6 text-[#10B981] stroke-[2]" />;
    }
    if (item.id === "launch-producthunt") {
      return <ProductHuntLogo className="w-6 h-6 text-[#DA552F]" />;
    }
    if (item.id === "launch-applaunchpad") {
      return <Smartphone className="w-6 h-6 text-[#6366F1] stroke-[2]" />;
    }
    if (item.id === "launch-birme") {
      return <Sliders className="w-6 h-6 text-[#10B981] stroke-[2]" />;
    }

    // ----------------------------------------------------
    // CATEGORY 10: ANALYTICS & CRASHES (8 Tools)
    // ----------------------------------------------------
    if (item.id === "analytics-posthog") {
      return <PostHogLogo className="w-6 h-6 text-[#F54E00]" />;
    }
    if (item.id === "analytics-sentry" || item.id.includes("sentry")) {
      return <SentryLogo className="w-6 h-6 text-[#E1567C]" />;
    }
    if (item.id === "analytics-telemetrydeck") {
      return <BarChart2 className="w-6 h-6 text-[#5856D6] stroke-[2]" />;
    }
    if (item.id === "analytics-mixpanel") {
      return <MixpanelLogo className="w-6 h-6 text-[#7856FF]" />;
    }
    if (item.id === "analytics-firebase-crashlytics") {
      return <FirebaseLogo className="w-6 h-6 text-[#FFA000]" />;
    }
    if (item.id === "analytics-aptabase") {
      return <Activity className="w-6 h-6 text-[#14B8A6] stroke-[2]" />;
    }
    if (item.id === "analytics-amplitude") {
      return <BarChart2 className="w-6 h-6 text-[#1E22AA] stroke-[2]" />;
    }
    if (item.id === "analytics-logrocket") {
      return <Rocket className="w-6 h-6 text-[#764ABC] stroke-[2]" />;
    }

    // Fallbacks based on item properties
    if (item.id.includes("apple")) {
      return <AppleLogo className="w-6 h-6 text-[#1D1D1F]" />;
    }
    if (item.id.includes("google") || item.id.includes("play")) {
      return <Shield className="w-6 h-6 text-[#0069FF] stroke-[2]" />;
    }

    // Default Fallback Icons (distinct per iconName, for user-added custom tools)
    switch (item.iconName) {
      case "Type": return <Type className="w-6 h-6 text-indigo-600 stroke-[2]" />;
      case "Cpu": return <Cpu className="w-6 h-6 text-purple-600 stroke-[1.8]" />;
      case "Zap": return <Zap className="w-6 h-6 text-amber-500 stroke-[2]" />;
      case "Brain": return <Brain className="w-6 h-6 text-purple-600 stroke-[1.8]" />;
      case "Terminal": return <Terminal className="w-6 h-6 text-slate-800 stroke-[2]" />;
      case "Palette": return <Palette className="w-6 h-6 text-rose-500 stroke-[2]" />;
      case "Shield": return <Shield className="w-6 h-6 text-emerald-600 stroke-[2]" />;
      case "Key": return <Key className="w-6 h-6 text-indigo-600 stroke-[2]" />;
      case "Scale": return <Scale className="w-6 h-6 text-amber-600 stroke-[2]" />;
      case "Rocket": return <Rocket className="w-6 h-6 text-cyan-600 stroke-[2]" />;
      case "Database": return <Database className="w-6 h-6 text-teal-600 stroke-[2]" />;
      case "Activity": return <Activity className="w-6 h-6 text-violet-600 stroke-[2]" />;
      case "Code": return <Code className="w-6 h-6 text-blue-600 stroke-[2]" />;
      default: return <GraduationCap className="w-6 h-6 text-purple-600 stroke-[2]" />;
    }
  };

  return (
    <div className="space-y-3.5 pb-4">
      
      {/* 1. Centered Title */}
      <div className="pt-2.5 pb-3 flex items-center justify-center w-full">
        <button
          type="button"
          onClick={onBackToChecklist}
          className="active:opacity-75 transition-opacity flex items-center justify-center space-x-1.5 px-3 py-1 rounded-2xl hover:bg-black/5 group max-w-full min-h-[42px]"
          title="Back to Checklist"
        >
          <h1 className="text-[28px] sm:text-[29px] font-medium tracking-normal text-center select-none text-black font-google leading-tight truncate">
            Academy & Resources
          </h1>
        </button>
      </div>

      {/* 2. Section Cards */}
      <div className="space-y-4 pt-1">
        {sectionOrder.map((secId, secIdx) => {
          const sec = SECTION_CONFIG_MAP.get(secId);
          if (!sec) return null;
          const secItems = itemsByCategory.get(sec.id) || [];
          const isSectionOpen = expandedSectionId === sec.id;
          const isCategoryEditing = editingCategoryId === sec.id;

          return (
            <div 
              key={sec.id}
              className="space-y-2"
            >
              {/* Connected Unified Category Pill */}
              <div 
                id={sec.id}
                style={{
                  '--glow-rgb': getCategoryGlowRgb(sec.iconBg),
                  backgroundColor: '#ffffff',
                } as React.CSSProperties}
                className={`rounded-3xl border border-slate-200/90 bg-white transition-all duration-300 shadow-xs overflow-hidden ${
                  minimizedSectionId === sec.id ? 'apple-section-pulse' : ''
                } ${
                  isCategoryEditing ? 'apple-edit-glow' : ''
                }`}
              >
                {/* Section Header Block: clicking text minimizes/toggles section */}
                <div 
                  role="button"
                  tabIndex={0}
                  aria-expanded={isSectionOpen}
                  onClick={() => handleToggleSection(sec.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleSection(sec.id);
                    }
                  }}
                  className="p-5 pb-3 sm:p-6 sm:pb-3.5 space-y-2.5 select-none cursor-pointer focus:outline-none"
                >
                  <div className="w-full flex items-center justify-between select-none">
                    <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                      {/* Squircle Icon on the LEFT */}
                      <div className={`w-12 h-12 rounded-2xl ${sec.iconBg} flex items-center justify-center shrink-0 shadow-xs relative text-white`}>
                        {sec.icon}
                      </div>

                      {/* Title & Category Badge */}
                      <div className="space-y-1 select-none flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap select-none mt-0.5">
                          <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider font-google ${sec.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                            {sec.badge}
                          </span>
                        </div>

                        <h2 className="text-[18px] sm:text-[20px] font-medium text-slate-900 tracking-tight leading-snug select-none font-google break-words">
                          {sec.title}
                        </h2>
                      </div>
                    </div>

                    {/* Category Right Controls in Edit mode: Move Up, Move Down, Delete */}
                    {isCategoryEditing && (
                      <div className="flex items-center space-x-1.5 shrink-0 self-start mt-0.5" onClick={(e) => e.stopPropagation()}>
                        {secIdx > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerHaptic(ImpactStyle.Light);
                              handleMoveCategory(secIdx, secIdx - 1);
                            }}
                            className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                            title="Move category up"
                            aria-label="Move category up"
                          >
                            <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                          </button>
                        )}

                        {secIdx < sectionOrder.length - 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerHaptic(ImpactStyle.Light);
                              handleMoveCategory(secIdx, secIdx + 1);
                            }}
                            className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                            title="Move category down"
                            aria-label="Move category down"
                          >
                            <ArrowDown className="w-3.5 h-3.5 stroke-[2.2]" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(sec.id);
                          }}
                          className="apple-press w-8 h-8 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center shadow-2xs transition-colors"
                          title="Delete Category"
                          aria-label="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Section Description: ALWAYS visible underneath the title! */}
                  <p className="text-sm sm:text-sm text-slate-600 leading-[22px] select-none pt-0.5">
                    {sec.description}
                  </p>

                  {/* Category Progress Bar: Matches GuardrailSection for exact pill height parity */}
                  <div className="space-y-1 pt-1 select-none">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 select-none font-google tracking-tight">
                      <span>Curated Tools</span>
                      <span className="tabular-nums">{secItems.length} Available</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-black/5 select-none">
                      <div 
                        className={`h-full ${sec.iconBg} rounded-full transition-all duration-500 ease-out`}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Drop-Down Arrow: Pure icon, NO background circle */}
                  <div className="flex justify-center pt-0.5 pb-0 -mb-1 select-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSection(sec.id);
                      }}
                      className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 shrink-0 text-slate-400 hover:text-slate-700"
                      aria-label={isSectionOpen ? "Collapse section" : "Expand section"}
                      title={isSectionOpen ? "Collapse section" : "Expand section"}
                    >
                      <ChevronDown 
                        strokeWidth={2.5}
                        className={`w-4 h-4 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          isSectionOpen ? 'rotate-180 text-slate-800' : 'text-slate-400'
                        }`} 
                      />
                    </button>
                  </div>
                </div>

                {/* Connected Curated Tools Drawer (Inside the same unified pill!) */}
                <div className={`apple-drawer-collapse apple-unified-drawer ${isSectionOpen ? 'expanded' : '!mt-0 !mb-0 !h-0 overflow-hidden'}`}>
                  <div className="apple-drawer-content">
                    {isSectionOpen && (
                      <>
                    {secItems.length === 0 && (
                      <div className="py-6 px-4 text-center space-y-1.5 select-none">
                        <p className="text-xs font-bold text-slate-700 font-google">No tools added yet</p>
                        <p className="text-[11.5px] text-slate-500">Tap "Add" below to start populating this category.</p>
                      </div>
                    )}

                    {/* Curated tools separated by a very thin grey line, matching border-t on top */}
                    <div className="divide-y divide-slate-200/60 border-t border-slate-200/60">
                      {secItems.map((item, itemIdx) => {
                        const isItemOpen = expandedItemId === item.id;
                        const isApple = item.id.includes('apple') || item.id.includes('att') || item.id.includes('testflight') || item.id.includes('sf-pro');

                        return (
                          <div 
                            id={item.id}
                            key={item.id}
                            style={{ '--glow-rgb': getCategoryGlowRgb(sec.iconBg) } as React.CSSProperties}
                            className={`px-4 sm:px-5 transition-colors relative space-y-2.5 ${
                              minimizedItemId === item.id ? 'apple-subitem-pulse' : ''
                            } ${
                              itemIdx === 0 ? 'pt-2 pb-3.5 sm:pt-2.5 sm:pb-4' : 'py-3.5 sm:py-4'
                            }`}
                          >
                            {/* Item Header Block: clicking text minimizes/toggles item */}
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleItem(item.id);
                              }}
                              className="space-y-2.5 select-none cursor-pointer"
                            >
                              <div className="w-full flex items-center justify-between select-none">
                                <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                                  
                                  {/* Squircle containing official brand colored logo */}
                                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs relative">
                                    {renderBrandLogo(item)}
                                  </div>

                                {/* Title & Badges matching Main Application */}
                                <div className="space-y-1 select-none flex-1 min-w-0">

                                  <h3 
                                    className={`text-[18px] sm:text-[20px] font-medium tracking-tight leading-snug select-none break-words ${
                                      isApple 
                                        ? 'text-[#1D1D1F] font-sans' 
                                        : 'text-slate-900 font-google'
                                    }`}
                                  >
                                    {item.title}
                                  </h3>
                                </div>
                              </div>

                              {/* Right Controls: In Edit mode, Move Up, Move Down, Delete */}
                              {isCategoryEditing && (
                                <div className="flex items-center justify-end space-x-1.5 shrink-0 -mr-1 h-12" onClick={(e) => e.stopPropagation()}>
                                  {itemIdx > 0 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerHaptic(ImpactStyle.Light);
                                        handleMoveTool(sec.id, itemIdx, itemIdx - 1);
                                      }}
                                      className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                                      title="Move tool up"
                                      aria-label="Move tool up"
                                    >
                                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.2]" />
                                    </button>
                                  )}

                                  {itemIdx < secItems.length - 1 && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerHaptic(ImpactStyle.Light);
                                        handleMoveTool(sec.id, itemIdx, itemIdx + 1);
                                      }}
                                      className="apple-press w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors"
                                      title="Move tool down"
                                      aria-label="Move tool down"
                                    >
                                      <ArrowDown className="w-3.5 h-3.5 stroke-[2.2]" />
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteTool(item.id);
                                    }}
                                    className="apple-press w-8 h-8 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center shadow-2xs transition-colors"
                                    title="Delete tool"
                                    aria-label="Delete tool"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Subsection: Description directly underneath the title */}
                            <p className="text-sm sm:text-sm text-slate-600 leading-[22px] select-none pt-0.5">
                              {item.shortDescription}
                            </p>

                            {/* Centered arrow: Pure icon, NO background circle */}
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

                          {/* Expanded Guidance Drawer with Subsections in their own pills */}
                          <div className={`apple-drawer-collapse ${isItemOpen ? 'expanded' : '!mt-0 !mb-0 !h-0 overflow-hidden'}`}>
                            <div className="apple-drawer-content">
                              {isItemOpen && (
                              <div 
                                onClick={(e) => handleDrawerTextClick(e, item.id)}
                                className="space-y-3 pt-3 border-t border-slate-100/90 text-slate-800 select-none cursor-pointer"
                                title="Click text to center subsection"
                              >
                                
                                {/* Subsection 1: Why It Matters Pill */}
                                {item.whyItMatters && (
                                  <div 
                                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-1.5 shadow-2xs cursor-pointer transition-colors"
                                  >
                                    <div className="select-none">
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Why It Matters
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.whyItMatters}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 2: Key Highlights Pill */}
                                {item.keyFeatures && item.keyFeatures.length > 0 && (
                                  <div 
                                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-2 shadow-2xs cursor-pointer transition-colors"
                                  >
                                    <div className="select-none">
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
                                          <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm flex-1 min-w-0">
                                            {feat}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Subsection 3: Best Used For Pill */}
                                {item.bestUsedFor && (
                                  <div 
                                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-1.5 shadow-2xs cursor-pointer transition-colors"
                                  >
                                    <div className="select-none">
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Best Used For
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.bestUsedFor}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 4: Free Access & Licensing Pill */}
                                {item.freeTierInfo && (
                                  <div 
                                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-1.5 shadow-2xs cursor-pointer transition-colors"
                                  >
                                    <div className="select-none">
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        Free Access &amp; Licensing
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.freeTierInfo}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 5: How to Connect with AI Pill */}
                                {item.quickStart && (
                                  <div 
                                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-1.5 shadow-2xs cursor-pointer transition-colors"
                                  >
                                    <div className="select-none">
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        How to Connect with AI
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.quickStart}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 6: How to Stay on Track & Avoid Traps Pill */}
                                {item.reviewTraps && (
                                  <div 
                                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-1.5 shadow-2xs cursor-pointer transition-colors"
                                  >
                                    <div className="select-none">
                                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                        How to Stay on Track &amp; Avoid Traps
                                      </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.reviewTraps}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 7: Setup Command / AI Prompt Pill */}
                                {item.promptOrCommand && (
                                  <div 
                                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300/90 space-y-2.5 shadow-2xs cursor-pointer transition-colors"
                                  >
                                    <div className="flex items-center justify-between select-none">
                                      <div className="flex items-center space-x-1.5 select-none">
                                        <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                          {item.promptLabel || 'AI Agent Prompt to Connect It'}
                                        </span>
                                      </div>
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

                                {/* Subsection: Visit Official Resource Link */}
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
                                    className="apple-press w-full h-12 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-[13px] flex items-center justify-center space-x-2 shadow-xs transition-colors"
                                  >
                                    <span>Visit Resource</span>
                                  </a>
                                </div>

                                {/* Tool Drawer Bottom Close Arrow (pure icon, hidden on the very last item) */}
                                {itemIdx < secItems.length - 1 && (
                                  <div className="flex justify-center select-none pt-0.5 pb-0">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerHaptic(ImpactStyle.Light);
                                        handleCollapseItem(item.id);
                                      }}
                                      className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 shrink-0 cursor-pointer"
                                      title="Close subcategory"
                                      aria-label="Close subcategory"
                                    >
                                      <ChevronUp 
                                        strokeWidth={2.5}
                                        className="w-4 h-4 stroke-[2.5] text-slate-400" 
                                      />
                                    </button>
                                  </div>
                                )}
                              </div>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                    </div>

                    {/* Very thin grey line separating tools from bottom action capsule */}
                    <div className="border-t border-slate-200/60" />

                    {/* Academy Category Footer: Chevron upwards arrow (pure icon, no text, no pill) */}
                    <div className="flex justify-center select-none py-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerHaptic(ImpactStyle.Light);
                          setEditingCategoryId(null);
                          setAddingToCategoryId(null);
                          handleToggleSection(sec.id, true);
                        }}
                        className="apple-press transition-all duration-200 flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-700 shrink-0 cursor-pointer"
                        title="Close category"
                        aria-label="Close category"
                      >
                        <ChevronUp 
                          strokeWidth={2.5}
                          className="w-4 h-4 stroke-[2.5] text-slate-400" 
                        />
                      </button>
                    </div>

                    {/* Inline Add Tool Form */}
                    {addingToCategoryId === sec.id && (
                      <form
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleCreateTool(sec.id);
                        }}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-200 mt-2 select-none"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 font-google">
                            Add Curated Tool to {sec.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setNewToolTitle('');
                              setNewToolDesc('');
                              setNewToolUrl('');
                              setNewToolPrompt('');
                              setAddingToCategoryId(null);
                            }}
                            className="apple-press p-1 rounded-full text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={newToolTitle}
                          onChange={(e) => setNewToolTitle(e.target.value)}
                          placeholder="Tool Name (e.g. Supabase, RevenueCat)"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                          autoFocus
                        />
                        <input
                          type="text"
                          value={newToolDesc}
                          onChange={(e) => setNewToolDesc(e.target.value)}
                          placeholder="Short description of this tool"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                        <input
                          type="url"
                          value={newToolUrl}
                          onChange={(e) => setNewToolUrl(e.target.value)}
                          placeholder="Website URL (e.g. https://...)"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                        <textarea
                          value={newToolPrompt}
                          onChange={(e) => setNewToolPrompt(e.target.value)}
                          placeholder="Recommended AI Prompt (Optional)"
                          rows={2}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none font-mono"
                        />
                        <div className="flex justify-end space-x-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setNewToolTitle('');
                              setNewToolDesc('');
                              setNewToolUrl('');
                              setNewToolPrompt('');
                              setAddingToCategoryId(null);
                            }}
                            className="apple-press px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!newToolTitle.trim()}
                            className="apple-press px-4 py-1.5 text-xs bg-slate-900 text-white font-bold rounded-full disabled:opacity-40"
                          >
                            Add Tool
                          </button>
                        </div>
                      </form>
                    )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Action Capsule when category is collapsed while editing */}
              {!isSectionOpen && isCategoryEditing && (
                <div className="flex justify-center pt-2.5 pb-1 select-none animate-in fade-in duration-200">
                  <div className="inline-flex items-center p-1 rounded-full bg-slate-500 border border-slate-400/80 shadow-2xs space-x-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHaptic(ImpactStyle.Light);
                        handleToggleSection(sec.id);
                        setAddingToCategoryId(sec.id);
                      }}
                      className="apple-press px-3.5 py-1.5 rounded-full text-xs font-bold text-white hover:bg-slate-600/80 active:bg-slate-700/80 transition-all duration-200 flex items-center space-x-1.5 cursor-pointer"
                      title="Add curated tool"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5] text-white" />
                      <span>Add</span>
                    </button>

                    <div className="w-[1px] h-3.5 bg-slate-400/80 shrink-0" aria-hidden="true" />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerHaptic(ImpactStyle.Light);
                        setEditingCategoryId(null);
                        setAddingToCategoryId(null);
                      }}
                      className="apple-press px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer bg-purple-600 text-white shadow-xs"
                      title="Done editing"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5] text-white" />
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Clearance space underneath the last resource card for floating dock */}
      <div 
        className="w-full shrink-0 pointer-events-none" 
        style={{ height: 'max(calc(env(safe-area-inset-bottom, 0px) + 140px), 164px)' }} 
        aria-hidden="true" 
      />

    </div>
  );
});
