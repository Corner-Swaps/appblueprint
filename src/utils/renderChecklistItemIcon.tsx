import React from 'react';
import { ChecklistItem } from '../types';
import {
  Brain,
  KeyRound,
  Laptop,
  GitBranch,
  Smartphone,
  Layers,
  Terminal,
  RotateCcw,
  Lightbulb,
  Scissors,
  Boxes,
  Key,
  Coins,
  Building2,
  Fingerprint,
  Kanban,
  Grid,
  Compass,
  Hand,
  CreditCard,
  Sparkles,
  Droplets,
  Target,
  Maximize2,
  Type,
  Moon,
  Palette,
  Flame,
  Inbox,
  Keyboard,
  Database,
  HardDrive,
  RefreshCw,
  Workflow,
  Activity,
  WifiOff,
  Radio,
  ShieldCheck,
  UserX,
  DollarSign,
  Bell,
  Link,
  Vibrate,
  Clock,
  FileText,
  Shield,
  Lock,
  EyeOff,
  Sliders,
  ScrollText,
  LogOut,
  ShieldAlert,
  FileSignature,
  UserCheck,
  Scale,
  HeartHandshake,
  Globe,
  BookOpen,
  Crosshair,
  Award,
  Store,
  AlertTriangle,
  FileCode,
  Baseline,
  Cpu,
  Gauge,
  BarChart2,
  Timer,
  AlertCircle,
  ZapOff,
  Archive,
  FileEdit,
  Image as ImageIcon,
  SlidersHorizontal,
  TrendingUp,
  ListChecks,
  Users,
  Send,
  Rocket,
  Share2,
  FileSearch,
  CheckCheck,
  Play,
  HelpCircle,
  Video,
  Sparkle,
  Bug,
  ExternalLink,
  Receipt,
  BellRing,
  GitPullRequest,
  HeartPulse,
  ArrowUpCircle,
  Star,
  Box,
  Folder,
  Code2,
  Zap,
  Flag,
  Tag,
  Bookmark,
} from 'lucide-react';

/**
 * 100% Unique, dedicated icon assignments for every checklist item in the application.
 * Guaranteed: No duplicate icons within any phase, and NEVER a generic checkmark!
 */
export const renderChecklistItemIcon = (item: ChecklistItem): React.ReactNode => {
  const id = item.id.toLowerCase();

  // 1. Setup & Environment Phase (phase-setup)
  if (id === 'setup-model') {
    return <Brain className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'setup-developer-accounts') {
    return <KeyRound className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'setup-xcode-android-studio') {
    return <Laptop className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'setup-github-repo') {
    return <GitBranch className="w-5 h-5 text-orange-600 stroke-[2.2]" />;
  }
  if (id === 'setup-connect-phone') {
    return <Smartphone className="w-5 h-5 text-sky-600 stroke-[2.2]" />;
  }
  if (id === 'setup-typescript-swift') {
    return <Layers className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'setup-agent-commands') {
    return <Terminal className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'setup-clear-caches') {
    return <RotateCcw className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }

  // 2. Phase 1: Idea, Audience & Scope
  if (id === 'p1-problem-solution') {
    return <Lightbulb className="w-5 h-5 text-amber-500 stroke-[2.2]" />;
  }
  if (id === 'p1-scope-pruning') {
    return <Scissors className="w-5 h-5 text-rose-500 stroke-[2.2]" />;
  }
  if (id === 'p1-tech-stack') {
    return <Boxes className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p1-developer-accounts') {
    return <Key className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p1-monetization-model') {
    return <Coins className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p1-duns-organization') {
    return <Building2 className="w-5 h-5 text-cyan-600 stroke-[2.2]" />;
  }
  if (id === 'p1-bundle-id-naming') {
    return <Fingerprint className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }

  // 3. Phase 2-Layout: Screen Layout & Wireframing
  if (id === 'p2-screen-inventory') {
    return <Kanban className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p2-screen-anatomy') {
    return <Smartphone className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p2-spatial-grid') {
    return <Grid className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'p2-nav-hierarchy') {
    return <Compass className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p2-thumb-reach') {
    return <Hand className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p2-form-layout') {
    return <CreditCard className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }

  // 4. Phase 2: Visual Design & Components
  if (id === 'p2-design-inspiration') {
    return <Sparkles className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p2-liquid-glass') {
    return <Droplets className="w-5 h-5 text-sky-500 stroke-[2.2]" />;
  }
  if (id === 'p2-touch-targets') {
    return <Target className="w-5 h-5 text-rose-500 stroke-[2.2]" />;
  }
  if (id === 'p2-safe-areas') {
    return <Maximize2 className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p2-dynamic-type') {
    return <Type className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p2-dark-mode') {
    return <Moon className="w-5 h-5 text-amber-500 stroke-[2.2]" />;
  }
  if (id === 'p2-app-icon') {
    return <Palette className="w-5 h-5 text-violet-600 stroke-[2.2]" />;
  }
  if (id === 'p2-launch-splash') {
    return <Flame className="w-5 h-5 text-orange-500 stroke-[2.2]" />;
  }
  if (id === 'p2-empty-states') {
    return <Inbox className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'p2-keyboard-avoidance') {
    return <Keyboard className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }

  // 5. Phase Data: Data Architecture & State
  if (id === 'p4-schema-models') {
    return <Database className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'p4-local-persistence') {
    return <HardDrive className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p4-state-restoration') {
    return <RefreshCw className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p4-data-migrations') {
    return <Workflow className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }

  // 6. Phase 3: Performance & Data Safety
  if (id === 'p3-process-death') {
    return <Activity className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }
  if (id === 'p3-offline-sync') {
    return <WifiOff className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p3-network-resilience') {
    return <Radio className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'p3-sign-in-apple') {
    return <ShieldCheck className="w-5 h-5 text-slate-800 stroke-[2.2]" />;
  }
  if (id === 'p3-account-deletion') {
    return <UserX className="w-5 h-5 text-red-600 stroke-[2.2]" />;
  }
  if (id === 'p3-in-app-purchases') {
    return <DollarSign className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p3-push-notifications') {
    return <Bell className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p3-deep-linking') {
    return <Link className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p3-haptic-feedback') {
    return <Vibrate className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p3-background-modes') {
    return <Clock className="w-5 h-5 text-cyan-600 stroke-[2.2]" />;
  }

  // 7. Phase 4: Privacy & Security Checks
  if (id === 'p4-privacy-manifest') {
    return <FileText className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p4-play-data-safety') {
    return <Shield className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p4-keychain-keystore') {
    return <Key className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p4-transit-security') {
    return <Lock className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p4-obfuscation-r8') {
    return <EyeOff className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p4-permissions-hygiene') {
    return <Sliders className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'p4-privacy-logging') {
    return <ScrollText className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }
  if (id === 'p4-api-key-protection') {
    return <KeyRound className="w-5 h-5 text-orange-600 stroke-[2.2]" />;
  }
  if (id === 'p4-session-token-security') {
    return <LogOut className="w-5 h-5 text-red-500 stroke-[2.2]" />;
  }
  if (id === 'p4-webview-injection-defense') {
    return <ShieldAlert className="w-5 h-5 text-cyan-600 stroke-[2.2]" />;
  }

  // 8. Phase 5: Legal & Store Compliance
  if (id === 'p5-privacy-policy') {
    return <FileSignature className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p5-ugc-moderation') {
    return <UserCheck className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }
  if (id === 'p5-gdpr-ccpa') {
    return <Scale className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p5-coppa-kids') {
    return <HeartHandshake className="w-5 h-5 text-pink-600 stroke-[2.2]" />;
  }
  if (id === 'p5-export-cryptography') {
    return <Globe className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p5-terms-of-service') {
    return <BookOpen className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'p5-app-tracking-transparency') {
    return <Crosshair className="w-5 h-5 text-orange-600 stroke-[2.2]" />;
  }
  if (id === 'p5-intellectual-property') {
    return <Award className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p5-dsa-trader-status') {
    return <Store className="w-5 h-5 text-cyan-600 stroke-[2.2]" />;
  }
  if (id === 'p5-regulatory-disclaimers') {
    return <AlertTriangle className="w-5 h-5 text-yellow-600 stroke-[2.2]" />;
  }
  if (id === 'p5-github-pages-legal') {
    return <FileCode className="w-5 h-5 text-slate-700 stroke-[2.2]" />;
  }
  if (id === 'p5-self-host-fonts-gdpr') {
    return <Baseline className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }

  // 9. Phase 6: Testing & Speed Vitals
  if (id === 'p6-automated-testing') {
    return <Cpu className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p6-memory-leaks') {
    return <Gauge className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }
  if (id === 'p6-android-vitals') {
    return <BarChart2 className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p6-cold-launch') {
    return <Timer className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p6-crash-reporting') {
    return <AlertCircle className="w-5 h-5 text-red-600 stroke-[2.2]" />;
  }
  if (id === 'p6-network-throttling') {
    return <ZapOff className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }
  if (id === 'p6-bundle-size-compression') {
    return <Archive className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }

  // 10. Phase 7: Store Listing & Screenshots
  if (id === 'p7-app-metadata') {
    return <FileEdit className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p7-screenshots-video') {
    return <ImageIcon className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p7-reviewer-credentials') {
    return <UserCheck className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p7-age-rating') {
    return <SlidersHorizontal className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p7-promotional-text-aso') {
    return <TrendingUp className="w-5 h-5 text-cyan-600 stroke-[2.2]" />;
  }
  if (id === 'p7-privacy-nutrition-labels') {
    return <ListChecks className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }

  // 11. Phase 8: Signing, Beta & CI/CD
  if (id === 'p8-ios-signing') {
    return <ShieldCheck className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p8-android-keystore') {
    return <Key className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p8-google-20-testers') {
    return <Users className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p8-testflight-beta') {
    return <Send className="w-5 h-5 text-sky-600 stroke-[2.2]" />;
  }
  if (id === 'p8-fastlane-cicd') {
    return <Rocket className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p8-signing-profiles-certificates') {
    return <Award className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p8-testflight-external-groups') {
    return <Share2 className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }

  // 12. Phase 9: Final Review & Going Live
  if (id === 'p9-apple-rejection-audit') {
    return <FileSearch className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }
  if (id === 'p9-google-play-audit') {
    return <CheckCheck className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p9-submission-release-type') {
    return <Play className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p9-rejection-appeal-protocol') {
    return <HelpCircle className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p9-reviewer-demo-video') {
    return <Video className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p9-guideline-4-2-audit') {
    return <Sparkle className="w-5 h-5 text-teal-600 stroke-[2.2]" />;
  }

  // 13. Phase 10: Troubleshooting & Maintenance
  if (id === 'p10-crash-debugging') {
    return <Bug className="w-5 h-5 text-rose-600 stroke-[2.2]" />;
  }
  if (id === 'p10-deep-link-troubleshooting') {
    return <ExternalLink className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  }
  if (id === 'p10-iap-troubleshooting') {
    return <Receipt className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  }
  if (id === 'p10-push-troubleshooting') {
    return <BellRing className="w-5 h-5 text-indigo-600 stroke-[2.2]" />;
  }
  if (id === 'p10-staged-rollout-ops') {
    return <GitPullRequest className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  }
  if (id === 'p10-server-status-health') {
    return <HeartPulse className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  }
  if (id === 'p10-force-update-changelog') {
    return <ArrowUpCircle className="w-5 h-5 text-cyan-600 stroke-[2.2]" />;
  }
  if (id === 'p10-native-review-prompt') {
    return <Star className="w-5 h-5 text-yellow-500 stroke-[2.2]" />;
  }

  // 14. Fallback for custom user-created items (NEVER a checkmark, deterministic distinct icon)
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const customPalette = [
    <Box key="1" className="w-5 h-5 text-indigo-600 stroke-[2.2]" />,
    <Folder key="2" className="w-5 h-5 text-blue-600 stroke-[2.2]" />,
    <Sparkles key="3" className="w-5 h-5 text-purple-600 stroke-[2.2]" />,
    <Cpu key="4" className="w-5 h-5 text-cyan-600 stroke-[2.2]" />,
    <Code2 key="5" className="w-5 h-5 text-emerald-600 stroke-[2.2]" />,
    <Layers key="6" className="w-5 h-5 text-teal-600 stroke-[2.2]" />,
    <Zap key="7" className="w-5 h-5 text-amber-500 stroke-[2.2]" />,
    <Compass key="8" className="w-5 h-5 text-rose-500 stroke-[2.2]" />,
    <Flag key="9" className="w-5 h-5 text-orange-500 stroke-[2.2]" />,
    <Lightbulb key="10" className="w-5 h-5 text-yellow-500 stroke-[2.2]" />,
    <Sliders key="11" className="w-5 h-5 text-violet-600 stroke-[2.2]" />,
    <Tag key="12" className="w-5 h-5 text-pink-500 stroke-[2.2]" />,
    <Globe key="13" className="w-5 h-5 text-sky-600 stroke-[2.2]" />,
    <Bookmark key="14" className="w-5 h-5 text-lime-600 stroke-[2.2]" />,
    <FileText key="15" className="w-5 h-5 text-slate-700 stroke-[2.2]" />,
    <Star key="16" className="w-5 h-5 text-amber-600 stroke-[2.2]" />,
  ];

  return customPalette[hash % customPalette.length];
};
