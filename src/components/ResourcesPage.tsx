import React, { useState } from 'react';
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
  BrainCircuit, 
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
  GraduationCap,
  Database,
  Activity,
  BarChart2,
  Flame,
  FileText,
  Sparkles,
  Lock,
  Search,
  TrendingUp
} from 'lucide-react';

interface ResourcesPageProps {
  onBackToChecklist?: () => void;
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
    title: 'Frontier AI Models & Coding Agents',
    badge: 'AI Models',
    description: 'Premier frontier reasoning models, multimodal context windows, and autonomous coding tools.',
    iconBg: 'bg-purple-600',
    icon: <Brain className="w-6 h-6 text-white stroke-[1.8]" />
  },
  {
    id: 'design',
    title: 'Design Systems & UI/UX Resources',
    badge: 'Design & UX',
    description: 'Authentic Apple & Google design manuals, pixel-perfect icon libraries, and mobile pattern teardowns.',
    iconBg: 'bg-rose-500',
    icon: <Palette className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'github_repos',
    title: 'Curated Open Source Frameworks & SDKs',
    badge: 'Open Source',
    description: 'Battle-tested mobile runtimes, native SDK wrappers, in-app purchase kits, and automated UI testing.',
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
    description: 'Serverless Postgres databases, edge functions, instant social auth, and storage with generous free tiers.',
    iconBg: 'bg-teal-600',
    icon: <Database className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'security',
    title: 'Security, Cryptography & Keychain Auth',
    badge: 'Security',
    description: 'OWASP verification standards, hardware keychain/keystore encryption, and pre-commit secret leak scanners.',
    iconBg: 'bg-emerald-600',
    icon: <Shield className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'privacy',
    title: 'Privacy, Apple Manifests & Data Protection',
    badge: 'Privacy',
    description: 'Required Apple PrivacyInfo.xcprivacy generators, App Tracking Transparency (ATT) guidelines, and GDPR checklists.',
    iconBg: 'bg-indigo-600',
    icon: <Key className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'legal',
    title: 'Legal, Terms of Service & EULA Templates',
    badge: 'Legal',
    description: 'Store-compliant Privacy Policy generators, standard Apple EULA templates, and open-source software license guides.',
    iconBg: 'bg-amber-600',
    icon: <Scale className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'launch',
    title: 'App Store Launch, ASO & Distribution',
    badge: 'Launch & ASO',
    description: 'Official store review guidelines, free App Store screenshot creators, keyword optimization checklists, and TestFlight setup.',
    iconBg: 'bg-cyan-600',
    icon: <Rocket className="w-6 h-6 text-white stroke-[1.6]" />
  },
  {
    id: 'analytics',
    title: 'Crash Reporting, Observability & Analytics',
    badge: 'Observability',
    description: 'Real-time crash stack traces, privacy-first mobile analytics without cookies, and user retention telemetry with generous free tiers.',
    iconBg: 'bg-violet-600',
    icon: <Activity className="w-6 h-6 text-white stroke-[1.6]" />
  }
];

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onBackToChecklist }) => {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const handleToggleSection = (secId: string) => {
    setExpandedSectionId(prev => {
      const next = prev === secId ? null : secId;
      if (next) {
        setTimeout(() => {
          const el = document.getElementById(secId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 120);
      }
      return next;
    });
  };

  const handleToggleItem = (itemId: string) => {
    setExpandedItemId(prev => {
      const next = prev === itemId ? null : itemId;
      if (next) {
        setTimeout(() => {
          const el = document.getElementById(itemId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
      return next;
    });
  };

  // Pure White SVG Icon Renderer for each website/tool - triple-checked official company logos
  const renderResourceWhiteIcon = (item: ResourceItem) => {
    const c = "w-6 h-6 text-white";
    
    // 1. Anthropic / Claude (Official Claude Sunburst Logo)
    if (item.id.includes('claude') || item.id.includes('anthropic')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
        </svg>
      );
    }

    // 2. OpenAI (Official OpenAI Rosette / Spiral Logo)
    if (item.id.includes('openai')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
        </svg>
      );
    }

    // 3. Google Gemini
    if (item.id.includes('gemini')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/>
        </svg>
      );
    }

    // 4. DeepSeek (Official Whale Logo)
    if (item.id.includes('deepseek')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45"/>
        </svg>
      );
    }

    // 5. v0 by Vercel
    if (item.id.includes('v0')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 20h20L12 2z"/>
        </svg>
      );
    }

    // 6. Cursor & Windsurf (Official Isometric 3D Cube)
    if (item.id.includes('cursor')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 5.2v9.6L12 22l-9-5.2V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4zm0 2.7l4.5 2.6v5.2L12 17.4l-4.5-2.6V9.6L12 7z"/>
        </svg>
      );
    }

    // 7. Figma (Official 5-Bubble Logo)
    if (item.id.includes('figma')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zm0-8c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4zm8-4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0zm0 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V8z"/>
        </svg>
      );
    }

    // 8. Apple (HIG, ATT, Privacy Manifests, EULA, Guidelines, TestFlight)
    if (item.id.includes('apple') || item.id.includes('att') || item.id.includes('testflight')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.8 1.44-.59.68-1.11 1.77-.97 2.83 1.11.09 2.18-.54 2.81-1.32z"/>
        </svg>
      );
    }

    // 9. Google Material 3 (Official Google 'G')
    if (item.id.includes('material')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
        </svg>
      );
    }

    // 10. Google Play Developer Policy Center
    if (item.id.includes('google-policy') || item.id.includes('play')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/>
        </svg>
      );
    }

    // 11. Capacitor (Official Dual-Chevron Logo)
    if (item.id.includes('capacitor')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 3.7l-5.766 5.766 5.725 5.736-3.713 3.712L5.073 3.742 8.786.03l5.736 5.726L20.284 0 24 3.7zM.029 8.785l3.713-3.713 15.173 15.173-3.713 3.714-5.732-5.726L3.7 24 0 20.285l5.754-5.764L.029 8.785z"/>
        </svg>
      );
    }

    // 12. RevenueCat (Official Cat Logo)
    if (item.id.includes('revenuecat')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.3036.3999c-1.5246 0-3.2129.1508-4.303.4136v14.9997c.3083.1722.8432.28 1.5632.28.7404 0 1.2553-.1072 1.5433-.28v-5.2323a14.8588 14.8588 0 0 0 2.121.1512h.3294l2.8604 5.0588c.432.195 1.0288.3024 1.9348.3024.8033 0 1.38-.1104 1.6476-.3024l-3.437-5.8358c1.4195-.8004 2.326-2.2698 2.326-4.4964C10.8894 1.827 8.4232.4 4.3037.4zm15.4543 0c-1.3788 0-2.624.2707-3.6901.7945-2.4552 1.203-3.9609 3.7376-3.9609 7.3627 0 4.8245 2.6552 7.7155 7.1659 7.7155.9 0 1.5868-.3014 2.005.2554.4194.5568-.3582 1.2165-.7746 1.5105-1.6338 1.1544-5.7217-.1024-9.4908-.4804C5.5994 17.015.9264 16.3009.146 19.1928c-.4104 1.5264.1225 2.5013.6421 3.0503 1.044 1.1046 2.882 1.357 4.344 1.357a13.959 13.959 0 0 0 2.0508-.1558 1.311 1.311 0 0 0 1.023-.8063c.1674-.4254.0861-.904-.212-1.2562a1.3464 1.3464 0 0 0-1.2352-.4523c-1.5012.2706-3.6213.8685-4.4343.0105-.2748-.291-.2268-1.0037 0-1.2257.6048-.8748 4.493-.5393 8.4127-.0293 4.329.4344 8.4023 1.8609 10.945.6351.9955-.48 2.318-1.1941 2.318-3.792h-.0012c0-1.1473-.1489-2.274-.4476-3.3797-1.3818.1872-2.4783.2857-3.2883.2941-2.845 0-4.869-1.4484-4.869-5.0963 0-3.648 2.0461-5.1573 5.0179-5.1573 1.2011 0 2.129.2512 3.1405.7336.1062-.9234-.1058-2.1605-.5906-2.8523-.78-.4608-2.0014-.6703-3.2038-.6703zM4.51 3.1889c2.0579 0 3.2108.7111 3.2108 2.4421 0 1.6824-1.0912 2.3554-2.8816 2.3554a10.2838 10.2838 0 0 1-1.7706-.1511V3.3166a7.7782 7.7782 0 0 1 1.4413-.1277z"/>
        </svg>
      );
    }

    // 13. Fastlane (Official Fastlane Icon)
    if (item.id.includes('fastlane')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.144 19.182a1.445 1.445 0 00-1.237-.868l-1.615-4.976-.37-1.135c-.017.01-.112.052-.13.06-.008.01-.025.01-.033.018a.366.366 0 00-.07.037.472.472 0 01-.102.043c-.043.016-.078.034-.12.042-.035.01-.07.027-.104.036-.04.01-.083.025-.126.034-.034.01-.068.017-.103.026a.584.584 0 01-.137.017c-.035.01-.07.01-.103.017-.028 0-.054 0-.08.01h-.16c-.052 0-.095 0-.146-.01-.035 0-.07 0-.095-.01l-.165-.025c-.026-.01-.052-.01-.086-.017a2.456 2.456 0 01-.25-.06 2.498 2.498 0 01-1.633-3.137C1.7 7.97 3.102 7.23 4.417 7.65l.344-1.1A3.673 3.673 0 00.167 8.94a3.674 3.674 0 002.39 4.59 3.877 3.877 0 001.624.128l1.634 5.035a1.432 1.432 0 00-.232.267 1.47 1.47 0 00.387 2.053 1.47 1.47 0 002.2-.662 1.572 1.572 0 00-.03-1.167zM11.901.412a3.656 3.656 0 00-3.62 3.697c.01.54.147 1.09.38 1.58L4.381 8.8a1.468 1.468 0 00-.327-.138 1.47 1.47 0 00-1.83.997c-.233.78.214 1.596.996 1.83.103.032.207.05.31.05.404.025.8-.11 1.09-.38.2-.18.354-.4.43-.678a1.44 1.44 0 00.018-.764l4.237-3.08.962-.702c-.017-.018-.077-.086-.094-.103l-.026-.026c-.017-.018-.035-.036-.052-.06a.46.46 0 01-.07-.087 1.952 1.952 0 00-.076-.103c-.026-.026-.043-.06-.07-.086a1.027 1.027 0 01-.068-.11.56.56 0 00-.06-.096.746.746 0 01-.06-.12c-.017-.034-.034-.06-.043-.095l-.026-.07c-.006-.017-.014-.042-.023-.06-.01-.034-.025-.07-.034-.094-.016-.044-.025-.096-.042-.147l-.025-.096c-.01-.05-.017-.11-.026-.163 0-.025-.01-.05-.018-.085a2.269 2.269 0 01-.017-.26 2.502 2.502 0 012.475-2.526 2.502 2.502 0 012.526 2.475l1.152-.01C15.576 2.01 13.92.386 11.9.41z"/>
        </svg>
      );
    }

    // 14. Supabase
    if (item.id.includes('supabase')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.362 9.354H12V.312a.312.312 0 0 0-.533-.22L.645 11.23a.625.625 0 0 0 .442 1.066H12v9.042a.312.312 0 0 0 .533.22l10.822-11.138a.625.625 0 0 0-.442-1.066h-.551z"/>
        </svg>
      );
    }

    // 15. Cloudflare
    if (item.id.includes('cloudflare')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.414 10.424A7.5 7.5 0 0 0 5.2 9.5a5.5 5.5 0 0 0 .8 10.944h13.2a4.5 4.5 0 0 0 .214-8.995v-.025z"/>
        </svg>
      );
    }

    // 16. Google Firebase (Official Flame)
    if (item.id.includes('firebase')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z"/>
        </svg>
      );
    }

    // 17. Neon Postgres
    if (item.id.includes('neon')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h4l8 11.2V4h4v16h-4L8 8.8V20H4V4z"/>
        </svg>
      );
    }

    // 18. Sentry (Official Sentry Icon)
    if (item.id.includes('sentry')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.91 2.505c-.873-1.448-2.972-1.448-3.844 0L6.904 7.92a15.478 15.478 0 0 1 8.53 12.811h-2.221A13.301 13.301 0 0 0 5.784 9.814l-2.926 5.06a7.65 7.65 0 0 1 4.435 5.848H2.194a.365.365 0 0 1-.298-.534l1.413-2.402a5.16 5.16 0 0 0-1.614-.913L.296 19.275a2.182 2.182 0 0 0 .812 2.999 2.24 2.24 0 0 0 1.086.288h6.983a9.322 9.322 0 0 0-3.845-8.318l1.11-1.922a11.47 11.47 0 0 1 4.95 10.24h5.915a17.242 17.242 0 0 0-7.885-15.28l2.244-3.845a.37.37 0 0 1 .504-.13c.255.14 9.75 16.708 9.928 16.9a.365.365 0 0 1-.327.543h-2.287c.029.612.029 1.223 0 1.831h2.297a2.206 2.206 0 0 0 1.922-3.31z"/>
        </svg>
      );
    }

    // 19. PostHog (Official Hedgehog Logo)
    if (item.id.includes('posthog')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.854 14.5 5 9.647.854 5.5A.5.5 0 0 0 0 5.854V8.44a.5.5 0 0 0 .146.353L5 13.647l.147.146L9.854 18.5l.146.147v-.049c.065.03.134.049.207.049h2.586a.5.5 0 0 0 .353-.854L9.854 14.5zm0-5-4-4a.487.487 0 0 0-.409-.144.515.515 0 0 0-.356.21.493.493 0 0 0-.089.288V8.44a.5.5 0 0 0 .147.353l9 9a.5.5 0 0 0 .853-.354v-2.585a.5.5 0 0 0-.146-.354l-5-5zm1-4a.5.5 0 0 0-.854.354V8.44a.5.5 0 0 0 .147.353l4 4a.5.5 0 0 0 .853-.354V9.854a.5.5 0 0 0-.146-.354l-4-4zm12.647 11.515a3.863 3.863 0 0 1-2.232-1.1l-4.708-4.707a.5.5 0 0 0-.854.354v6.585a.5.5 0 0 0 .5.5H23.5a.5.5 0 0 0 .5-.5v-.6c0-.276-.225-.497-.499-.532zm-5.394.032a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zM.854 15.5a.5.5 0 0 0-.854.354v2.293a.5.5 0 0 0 .5.5h2.293c.222 0 .39-.135.462-.309a.493.493 0 0 0-.109-.545L.854 15.501zM5 14.647.854 10.5a.5.5 0 0 0-.854.353v2.586a.5.5 0 0 0 .146.353L4.854 18.5l.146.147h2.793a.5.5 0 0 0 .353-.854L5 14.647z"/>
        </svg>
      );
    }

    // 20. Lucide Icons (Official Folded Polygon Logo)
    if (item.id.includes('lucide')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="15.5" />
          <polyline points="22 8.5 12 15.5 2 8.5" />
          <polyline points="2 15.5 12 8.5 22 15.5" />
          <line x1="12" y1="2" x2="12" y2="8.5" />
        </svg>
      );
    }

    // 21. GitHub Repositories (Official GitHub Octocat)
    if (item.category === 'github_repos' || item.url.includes('github.com')) {
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    }

    // 22. Named Lucide Icons (Rendered in solid crisp white with thinner 1.6 lines)
    switch (item.iconName) {
      case 'Cpu': return <Cpu className={`${c} stroke-[1.6]`} />;
      case 'Zap': return <Zap className={`${c} stroke-[1.6]`} />;
      case 'Brain': return <Brain className={`${c} stroke-[1.8]`} />;
      case 'BrainCircuit': return <Brain className={`${c} stroke-[1.8]`} />;
      case 'Terminal': return <Terminal className={`${c} stroke-[1.6]`} />;
      case 'Image': return <ImageIcon className={`${c} stroke-[1.6]`} />;
      case 'Layers': return <Layers className={`${c} stroke-[1.6]`} />;
      case 'CheckCircle2': return <CheckCircle2 className={`${c} stroke-[1.6]`} />;
      case 'Eye': return <Eye className={`${c} stroke-[1.6]`} />;
      case 'Palette': return <Palette className={`${c} stroke-[1.6]`} />;
      case 'Play': return <Play className={`${c} stroke-[1.6]`} />;
      case 'CreditCard': return <CreditCard className={`${c} stroke-[1.6]`} />;
      case 'Rocket': return <Rocket className={`${c} stroke-[1.6]`} />;
      case 'CheckSquare': return <CheckSquare className={`${c} stroke-[1.6]`} />;
      case 'AlertCircle': return <AlertCircle className={`${c} stroke-[1.6]`} />;
      case 'Shield': return <Shield className={`${c} stroke-[1.6]`} />;
      case 'Key': return <Key className={`${c} stroke-[1.6]`} />;
      case 'Scale': return <Scale className={`${c} stroke-[1.6]`} />;
      case 'Globe': return <Globe className={`${c} stroke-[1.6]`} />;
      case 'Database': return <Database className={`${c} stroke-[1.6]`} />;
      case 'Activity': return <Activity className={`${c} stroke-[1.6]`} />;
      case 'BarChart2': return <BarChart2 className={`${c} stroke-[1.6]`} />;
      case 'Flame': return <Flame className={`${c} stroke-[1.6]`} />;
      case 'FileText': return <FileText className={`${c} stroke-[1.6]`} />;
      case 'Sparkles': return <Sparkles className={`${c} stroke-[1.6]`} />;
      case 'Lock': return <Lock className={`${c} stroke-[1.6]`} />;
      case 'Search': return <Search className={`${c} stroke-[1.6]`} />;
      case 'TrendingUp': return <TrendingUp className={`${c} stroke-[1.6]`} />;
      default: return <GraduationCap className={`${c} stroke-[1.6]`} />;
    }
  };

  return (
    <div className="space-y-3.5 pb-4">
      
      {/* 1. Centered Title (Exact same size and style as project title) */}
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

      {/* 2. Section Cards (Exact same layout & collapsible behavior as Phase cards) */}
      <div className="space-y-4 pt-1">
        {SECTION_CONFIGS.map(sec => {
          const secItems = RESOURCES_DATA.filter(r => r.category === sec.id).slice(0, 6);
          const isSectionOpen = expandedSectionId === sec.id;

          return (
            <div 
              id={sec.id}
              key={sec.id}
              className="space-y-4"
            >
              {/* Section Header Card: Clean standalone pill */}
              <div 
                className="rounded-3xl border border-slate-200/90 bg-white transition-all duration-200 shadow-xs p-5 pb-1 sm:p-6 sm:pb-1.5 space-y-2"
              >
                {/* Section Header Block: Matching Phase Header exactly */}
                <div 
                  onClick={() => handleToggleSection(sec.id)}
                  className="space-y-2.5 select-none cursor-pointer"
                >
                  <div className="w-full flex items-center justify-between select-none">
                    <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                      {/* Squircle Icon on the LEFT */}
                      <div className={`w-12 h-12 rounded-2xl ${sec.iconBg} flex items-center justify-center shrink-0 shadow-xs relative text-white`}>
                        {sec.icon}
                      </div>

                      {/* Title & Badge */}
                      <div className="space-y-1 select-none flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap select-none mt-0.5">
                          <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${sec.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                            {sec.badge}
                          </span>
                          <span className="text-xs text-slate-400 select-none">•</span>
                          <span className="text-xs font-bold text-slate-700 select-none">
                            6 Curated Tools
                          </span>
                        </div>

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

                  {/* Drop-Down Arrow: Centered directly BELOW Section Description with tight, clean spacing */}
                  <div className="flex justify-center -mt-0.5 pb-0 select-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSection(sec.id);
                      }}
                      className="apple-press p-0 text-slate-400 hover:text-slate-600 transition-colors"
                      aria-label={isSectionOpen ? "Collapse section" : "Expand section"}
                      title={isSectionOpen ? "Collapse section" : "Expand section"}
                    >
                      <ChevronDown 
                        strokeWidth={2.5}
                        className={`w-4 h-4 text-slate-400 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          isSectionOpen ? 'rotate-180 text-slate-600' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsed/Expanded Resource Items inside this Section: NOT in a pill, styled exactly like the main section! */}
              <div className={`apple-drawer-collapse ${isSectionOpen ? 'expanded' : ''}`}>
                <div className="apple-drawer-content">
                  <div className="space-y-4 pt-1">
                    {secItems.map((item, itemIdx) => {
                      const isItemOpen = expandedItemId === item.id;

                      return (
                        <div 
                          id={item.id}
                          key={item.id}
                          className={`rounded-3xl border border-slate-200/90 bg-white transition-all duration-200 shadow-xs ${
                            isItemOpen 
                              ? 'p-5 sm:p-6 space-y-2.5' 
                              : 'p-5 pb-1 sm:p-6 sm:pb-1.5 space-y-2'
                          }`}
                        >
                          {/* Item Header Block: Exact match of main section */}
                          <div 
                            onClick={() => handleToggleItem(item.id)}
                            className="space-y-2.5 select-none cursor-pointer"
                          >
                            <div className="w-full flex items-center justify-between select-none">
                              <div className="flex items-center space-x-3.5 pr-2 select-none flex-1 min-w-0">
                                {/* Themed Squircle with White Vector Icon on LEFT side of the pill */}
                                <div className={`w-12 h-12 rounded-2xl ${sec.iconBg} flex items-center justify-center shrink-0 shadow-xs relative text-white`}>
                                  {renderResourceWhiteIcon(item)}
                                </div>

                                {/* Title & Badge */}
                                <div className="space-y-1 select-none flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap select-none mt-0.5">
                                    <span className={`h-[18px] px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${sec.iconBg} text-white shadow-xs select-none shrink-0 inline-flex items-center justify-center pt-[1px] leading-none`}>
                                      TOOL {itemIdx + 1}
                                    </span>
                                  </div>

                                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug select-none font-google">
                                    {item.title}
                                  </h3>
                                </div>
                              </div>
                            </div>

                            {/* Subsection: Description directly underneath the title */}
                            <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed select-none pt-0.5">
                              {item.shortDescription}
                            </p>

                            {/* Centered arrow to pop down subsections drawer */}
                            <div className="flex justify-center -mt-0.5 pb-0 select-none">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleItem(item.id);
                                }}
                                className="apple-press p-0 text-slate-400 hover:text-slate-600 transition-colors"
                                title={isItemOpen ? 'Close information' : 'Expand information'}
                                aria-label={isItemOpen ? 'Close information' : 'Expand information'}
                              >
                                <ChevronDown 
                                  strokeWidth={2.5}
                                  className={`w-4 h-4 text-slate-400 stroke-[2.5] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-slate-600 ${
                                    isItemOpen ? 'rotate-180 text-slate-600' : ''
                                  }`} 
                                />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Guidance Drawer with Subsections down below (Clean flow, NOT inside nested pills) */}
                          <div className={`apple-drawer-collapse ${isItemOpen ? 'expanded' : ''}`}>
                            <div className="apple-drawer-content">
                              <div className="space-y-4 pt-3 border-t border-slate-100/90 text-slate-800 select-none">
                                
                                {/* Subsection 1: Why It Matters */}
                                {item.whyItMatters && (
                                  <div className="space-y-1.5">
                                    <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                      Why It Matters
                                    </span>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.whyItMatters}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 2: Key Highlights (No copy button) */}
                                {item.keyFeatures && item.keyFeatures.length > 0 && (
                                  <div className="space-y-2 pt-1 border-t border-slate-100/80">
                                    <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                      Key Highlights
                                    </span>
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

                                {/* Subsection 3: Best Used For */}
                                {item.bestUsedFor && (
                                  <div className="space-y-1.5 pt-1 border-t border-slate-100/80">
                                    <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                      Best Used For
                                    </span>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.bestUsedFor}
                                    </p>
                                  </div>
                                )}

                                {/* Subsection 4: Free Access Details & Licensing */}
                                {item.freeTierInfo && (
                                  <div className="space-y-1.5 pt-1 border-t border-slate-100/80">
                                    <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block font-google">
                                      Free Access & Licensing
                                    </span>
                                    <p className="text-slate-700 leading-relaxed text-[13.5px] sm:text-sm">
                                      {item.freeTierInfo}
                                    </p>
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
                                    className="apple-press p-0 text-slate-400 hover:text-slate-600 transition-colors"
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
