import { HabitTask, CalendarDay, PastelColorTheme } from '../types';

export const INITIAL_HABITS: HabitTask[] = [
  {
    id: 'task-architecture-mvp',
    title: 'Define Problem & MVP Scope',
    subtitle: '3/3 Core Specs Defined',
    badgeText: 'v1.0 Frozen',
    category: 'architecture',
    currentValue: 3,
    targetValue: 3,
    unit: 'specs',
    step: 1,
    streakDays: 1,
    streakLabel: 'Step 1',
    colorTheme: 'cyan',
    iconName: 'lightbulb',
    isCompleted: true,
    phaseId: 'phase-1',
    priority: 'blocker',
    whyItMatters: 'Apps without a razor-sharp single problem focus fail Apple App Store Guideline 4.2 (Minimum Functionality). Scoping the boundary prevents rejection.',
    implementationSteps: [
      'Draft 1-sentence value proposition for ideal target user persona',
      'Conduct 10+ user interviews validating acute pain point frequency',
      'Classify features into MoSCoW (Must, Should, Could, Won\'t have for v1.0)'
    ],
    commonRejectionTraps: [
      'Leaving "Coming Soon" or placeholder buttons triggers instant rejection under Guideline 2.1.'
    ],
    storeGuidelineRef: 'Apple Guideline 4.2 (Minimum Functionality)',
    completedDates: ['2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06', '2026-09-07', '2026-09-08']
  },
  {
    id: 'task-ui-hig',
    title: 'Native UI/UX & Apple HIG',
    subtitle: '44pt Touch & Safe Areas',
    badgeText: 'HIG Verified',
    category: 'architecture',
    currentValue: 4,
    targetValue: 5,
    unit: 'screens',
    step: 1,
    streakDays: 2,
    streakLabel: 'Step 2',
    colorTheme: 'coral',
    iconName: 'activity',
    isCompleted: false,
    phaseId: 'phase-2',
    priority: 'high',
    whyItMatters: 'Apple strictly rejects apps with clipped navigation bars under Dynamic Island or touch targets under 44x44pt.',
    implementationSteps: [
      'Audit all buttons to ensure 44x44pt minimum touch bounding box',
      'Respect Dynamic Island, notch, and home indicator safe-areas seamlessly',
      'Provide fluid spring animations matching authentic iOS feel'
    ],
    commonRejectionTraps: [
      'Text overlapping the status bar or notch on iPhone 16 Pro Max.'
    ],
    storeGuidelineRef: 'Apple Human Interface Guidelines (Touch & Layout)',
    completedDates: ['2026-09-03', '2026-09-04', '2026-09-05']
  },
  {
    id: 'task-architecture-offline',
    title: 'Core Architecture & Offline Cache',
    subtitle: 'SQLite Cache & Network Fallback',
    badgeText: 'Resilient',
    category: 'architecture',
    currentValue: 2,
    targetValue: 3,
    unit: 'layers',
    step: 1,
    streakDays: 3,
    streakLabel: 'Step 3',
    colorTheme: 'periwinkle',
    iconName: 'zap',
    isCompleted: false,
    phaseId: 'phase-3',
    priority: 'blocker',
    whyItMatters: 'Reviewers test apps in airplane mode. Launching into an infinite spinner or unhandled network crash triggers immediate 2.1 rejection.',
    implementationSteps: [
      'Implement local caching layer for immediate data render on cold start',
      'Display clear offline indicator banners with retry buttons',
      'Validate memory footprint under 120MB'
    ],
    commonRejectionTraps: [
      'Crashing when launched without internet connection.'
    ],
    storeGuidelineRef: 'Apple Guideline 2.1 (Performance & Crashes)',
    completedDates: ['2026-09-03']
  },
  {
    id: 'task-security-manifest',
    title: 'Data Security & Privacy Manifest',
    subtitle: 'PrivacyInfo.xcprivacy & AES-256',
    badgeText: 'iOS 17+ Required',
    category: 'security',
    currentValue: 2,
    targetValue: 2,
    unit: 'manifests',
    step: 1,
    streakDays: 4,
    streakLabel: 'Step 4',
    colorTheme: 'blush',
    iconName: 'shield',
    isCompleted: true,
    phaseId: 'phase-4',
    priority: 'blocker',
    whyItMatters: 'Apple strictly rejects all apps and third-party SDKs that fail to include a valid PrivacyInfo.xcprivacy declaring required reason APIs.',
    implementationSteps: [
      'Audit all dependencies for declared required reason APIs',
      'Generate PrivacyInfo.xcprivacy and link into app target resources',
      'Store sensitive tokens strictly in Keychain (iOS) and EncryptedSharedPreferences (Android)'
    ],
    commonRejectionTraps: [
      'Storing authentication tokens in UserDefaults or unencrypted AsyncStorage.'
    ],
    storeGuidelineRef: 'Apple Privacy Manifest & Guideline 5.1.1',
    completedDates: ['2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06', '2026-09-07', '2026-09-08']
  },
  {
    id: 'task-legal-gdpr',
    title: 'Legal: GDPR & Delete Account',
    subtitle: 'Guideline 5.1.1(v) Compliant',
    badgeText: 'Mandatory',
    category: 'legal',
    currentValue: 1,
    targetValue: 1,
    unit: 'flow',
    step: 1,
    streakDays: 5,
    streakLabel: 'Step 5',
    colorTheme: 'mint',
    iconName: 'scale',
    isCompleted: true,
    phaseId: 'phase-5',
    priority: 'blocker',
    whyItMatters: 'Apple Guideline 5.1.1(v) mandates that if your app supports account creation, you must also offer complete in-app account deletion.',
    implementationSteps: [
      'Add visible "Initiate Account Deletion" button inside Settings',
      'Implement backend cascade deletion wiping all PII and analytics associations',
      'Host accessible Privacy Policy URL without requiring logins'
    ],
    commonRejectionTraps: [
      'Forcing users to email support or submit a contact form to delete their account.'
    ],
    storeGuidelineRef: 'Apple Guideline 5.1.1(v) & Google Play Account Deletion',
    completedDates: ['2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06', '2026-09-07', '2026-09-08']
  },
  {
    id: 'task-store-iap',
    title: 'In-App Purchases & StoreKit 2',
    subtitle: 'Restore Purchases & Subscriptions',
    badgeText: 'StoreKit 2',
    category: 'store',
    currentValue: 2,
    targetValue: 2,
    unit: 'products',
    step: 1,
    streakDays: 6,
    streakLabel: 'Step 6',
    colorTheme: 'peach',
    iconName: 'store',
    isCompleted: true,
    phaseId: 'phase-6',
    priority: 'blocker',
    whyItMatters: 'Guideline 3.1.1 requires native StoreKit for digital features. Every paywall MUST have a visible Restore Purchases button and Terms link.',
    implementationSteps: [
      'Configure Product IDs in App Store Connect and Google Play Console',
      'Add Transaction.updates listener on app boot',
      'Provide clearly visible Restore Purchases button on all paywalls'
    ],
    commonRejectionTraps: [
      'Missing Restore Purchases button or missing Terms of Use (EULA) links.'
    ],
    storeGuidelineRef: 'Apple Guideline 3.1.1 (In-App Purchase)',
    completedDates: ['2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06']
  },
  {
    id: 'task-qa-testers',
    title: '20-Tester QA & Crash Reporting',
    subtitle: 'Google Play 14-Day Closed Test',
    badgeText: '20/20 Testers Active',
    category: 'qa',
    currentValue: 20,
    targetValue: 20,
    unit: 'testers',
    step: 1,
    streakDays: 7,
    streakLabel: 'Step 7',
    colorTheme: 'sky',
    iconName: 'smartphone',
    isCompleted: true,
    phaseId: 'phase-7',
    priority: 'blocker',
    whyItMatters: 'Google Play requires personal developer accounts to maintain 20+ testers opted into a closed test for 14 continuous days before production access.',
    implementationSteps: [
      'Recruit 20+ opt-in testers through Google Play Console closed testing track',
      'Maintain active daily engagement to prevent tester drop-off',
      'Integrate Firebase Crashlytics to monitor crash-free sessions (>99.5%)'
    ],
    commonRejectionTraps: [
      'Testers opting out drops count below 20 and resets the 14-day timer.'
    ],
    storeGuidelineRef: 'Google Play 20-Tester Policy',
    completedDates: ['2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06', '2026-09-07', '2026-09-08', '2026-09-09']
  },
  {
    id: 'task-store-assets',
    title: 'App Store Connect & Play Assets',
    subtitle: '6.7" Screenshots & 1024x1024 Icon',
    badgeText: 'Assets Ready',
    category: 'store',
    currentValue: 4,
    targetValue: 4,
    unit: 'assets',
    step: 1,
    streakDays: 8,
    streakLabel: 'Step 8',
    colorTheme: 'lavender',
    iconName: 'book',
    isCompleted: true,
    phaseId: 'phase-8',
    priority: 'high',
    whyItMatters: 'Upload failure occurs if icon has transparency alpha channel or screenshots do not match required pixel dimensions (1290x2796 for 6.7").',
    implementationSteps: [
      'Generate 1024x1024 app icon with zero alpha transparency',
      'Capture 6.7" iPhone 16 Pro Max and 6.5" iPhone Plus screenshots',
      'Write compelling subtitle and keywords under 100 characters'
    ],
    commonRejectionTraps: [
      'Alpha channel in App Store icon or misleading screenshots.'
    ],
    storeGuidelineRef: 'Apple Guideline 2.3 (Accurate Metadata)',
    completedDates: ['2026-09-04', '2026-09-05', '2026-09-06', '2026-09-07']
  },
  {
    id: 'task-store-submission',
    title: 'Store Submission & Metadata',
    subtitle: 'Reviewer Account & 2FA Bypass',
    badgeText: 'Ready for Review',
    category: 'launch',
    currentValue: 1,
    targetValue: 1,
    unit: 'build',
    step: 1,
    streakDays: 9,
    streakLabel: 'Step 9',
    colorTheme: 'cyan',
    iconName: 'rocket',
    isCompleted: true,
    phaseId: 'phase-9',
    priority: 'blocker',
    whyItMatters: 'Accurate App Privacy Nutrition declarations, localized 6.7" screenshots, and demo reviewer credentials prevent Guideline 2.1 and 2.3 rejections.',
    implementationSteps: [
      'Provide dedicated reviewer test credentials with pre-populated demo data',
      'Include OTP / SMS 2FA bypass code in App Review Notes',
      'Complete Data Safety and Privacy Nutrition declaration matching code reality'
    ],
    commonRejectionTraps: [
      'Submitting without reviewer login credentials triggers instant 2.1 rejection.'
    ],
    storeGuidelineRef: 'App Store Guideline 2.1 & 2.3',
    completedDates: ['2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06', '2026-09-07', '2026-09-08', '2026-09-09']
  },
  {
    id: 'task-post-launch',
    title: 'Post-Launch Operations & Ops',
    subtitle: 'Crash Monitoring & SKStoreReview',
    badgeText: 'Live Ops',
    category: 'launch',
    currentValue: 2,
    targetValue: 2,
    unit: 'monitors',
    step: 1,
    streakDays: 10,
    streakLabel: 'Step 10',
    colorTheme: 'coral',
    iconName: 'sparkles',
    isCompleted: true,
    phaseId: 'phase-10',
    priority: 'medium',
    whyItMatters: 'Monitoring crash-free user rate and prompting reviews at optimal moments drives app store ranking and retention.',
    implementationSteps: [
      'Set up Crashlytics alert thresholds for crash-free sessions (>99.5%)',
      'Implement SKStoreReviewController after positive user milestones',
      'Establish staged phased rollout (1% -> 2% -> 5% -> 10% -> 20% -> 50% -> 100%)'
    ],
    commonRejectionTraps: [
      'Spamming users with rating prompts on cold boot.'
    ],
    storeGuidelineRef: 'Apple Guideline 5.6.1 (App Store Reviews)',
    completedDates: ['2026-09-06', '2026-09-07', '2026-09-08']
  }
];

export const CALENDAR_DAYS: CalendarDay[] = [];

// Rich dark OLED card themes matching CoursePal screenshot palette:
export const PASTEL_THEMES: Record<PastelColorTheme, {
  bg: string;
  iconBg: string;
  iconColor: string;
  borderColor: string;
  barColor: string;
}> = {
  cyan: {
    bg: 'bg-[#0E243A]',
    iconBg: 'bg-[#143552]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#1E4D7A]/60',
    barColor: 'bg-[#0284C7]'
  },
  coral: {
    bg: 'bg-[#33161C]',
    iconBg: 'bg-[#4A1E27]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#6B2C3A]/60',
    barColor: 'bg-[#FF4D6D]'
  },
  periwinkle: {
    bg: 'bg-[#182338]',
    iconBg: 'bg-[#223352]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#334B75]/60',
    barColor: 'bg-[#6366F1]'
  },
  blush: {
    bg: 'bg-[#2E162B]',
    iconBg: 'bg-[#451F41]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#612D5A]/60',
    barColor: 'bg-[#D946EF]'
  },
  mint: {
    bg: 'bg-[#142E16]',
    iconBg: 'bg-[#1C4521]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#296931]/60',
    barColor: 'bg-[#22C55E]'
  },
  peach: {
    bg: 'bg-[#332212]',
    iconBg: 'bg-[#4D331A]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#6E4926]/60',
    barColor: 'bg-[#F97316]'
  },
  sky: {
    bg: 'bg-[#102B38]',
    iconBg: 'bg-[#173F52]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#255E7A]/60',
    barColor: 'bg-[#0EA5E9]'
  },
  lavender: {
    bg: 'bg-[#231633]',
    iconBg: 'bg-[#36224F]/80',
    iconColor: 'text-white',
    borderColor: 'border-[#4F3173]/60',
    barColor: 'bg-[#A855F7]'
  }
};
