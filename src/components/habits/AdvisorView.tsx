import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Rocket, 
  CheckCircle2, 
  Circle,
  Code, 
  ExternalLink, 
  Key, 
  FileText, 
  Smartphone,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';

interface AdvisorViewProps {
  completedCount: number;
  totalCount: number;
  onOpenChecklist: () => void;
}

interface Trap {
  id: string;
  rule: string;
  title: string;
  platform: 'Apple' | 'Google' | 'Both';
  severity: 'BLOCKER' | 'CRITICAL' | 'WARNING';
  remedy: string;
  codeSnippet?: string;
}

const CRITICAL_TRAPS: Trap[] = [
  {
    id: 'apple-2-1',
    rule: 'Apple Guideline 2.1',
    title: 'Incomplete Information & Missing Reviewer Login',
    platform: 'Apple',
    severity: 'BLOCKER',
    remedy: 'Create a permanent, dedicated demo user with pre-loaded sample data. Provide exact credentials, OTP bypass codes (e.g. 000000), and a video demonstration link in App Store Connect Review Notes.',
    codeSnippet: `// Example Review Notes for App Store Connect:\nUser: demo_reviewer@launchready.app\nPass: AppReview2026!Secure\nSMS 2FA Bypass: 000000\nDemo Video: https://launchready.app/review-walkthrough.mp4`
  },
  {
    id: 'apple-5-1-1-v',
    rule: 'Apple Guideline 5.1.1(v)',
    title: 'Mandatory In-App Account Deletion',
    platform: 'Apple',
    severity: 'BLOCKER',
    remedy: 'If users can create an account in your app, they MUST be able to initiate immediate deletion inside the app. Requiring email requests or web portals will trigger immediate rejection.',
    codeSnippet: `// SettingsView.tsx -> Account Deletion Endpoint\nasync function deleteUserAccount() {\n  const confirmed = await promptDestructiveConfirm();\n  if (confirmed) {\n    await api.delete('/v1/users/me');\n    await auth.clearTokens();\n  }\n}`
  },
  {
    id: 'privacy-manifest',
    rule: 'Apple Privacy Manifest',
    title: 'PrivacyInfo.xcprivacy Required Reason APIs',
    platform: 'Apple',
    severity: 'BLOCKER',
    remedy: 'All third-party SDKs and your app target must declare NSPrivacyAccessedAPITypes for disk space, user defaults, system boot time, and file timestamps.',
    codeSnippet: `<!-- PrivacyInfo.xcprivacy -->\n<key>NSPrivacyAccessedAPITypes</key>\n<array>\n  <dict>\n    <key>NSPrivacyAccessedAPIType</key>\n    <string>NSPrivacyAccessedAPICategoryUserDefaults</string>\n    <key>NSPrivacyAccessedAPITypeReasons</key>\n    <array><string>CA92.1</string></array>\n  </dict>\n</array>`
  },
  {
    id: 'google-20-testers',
    rule: 'Google Play 20-Tester Rule',
    title: '14-Day Continuous Closed Testing Requirement',
    platform: 'Google',
    severity: 'BLOCKER',
    remedy: 'Personal Google Play developer accounts created after Nov 2023 must recruit 20+ testers opted in for at least 14 days before applying for Production access.',
    codeSnippet: `# Track closed testers in Google Play Console:\nClosed testing (Alpha) track -> Testers -> 20 opted in\nMonitor 14 days consecutive opt-in before clicking Apply for Production.`
  },
  {
    id: 'apple-3-1-1',
    rule: 'Apple Guideline 3.1.1',
    title: 'In-App Purchases & StoreKit 2 Non-Consumable Restore',
    platform: 'Apple',
    severity: 'CRITICAL',
    remedy: 'Must include a clearly visible "Restore Purchases" button on every paywall and provide Terms of Use (EULA) and Privacy Policy links before purchase.',
  },
];

export const AdvisorView: React.FC<AdvisorViewProps> = ({
  completedCount,
  totalCount,
  onOpenChecklist,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const [selectedTrap, setSelectedTrap] = useState<Trap | null>(CRITICAL_TRAPS[0]);
  const [verifiedItems, setVerifiedItems] = useState<Record<string, boolean>>({
    'check-1': true,
    'check-2': true,
  });

  const toggleVerified = (id: string) => {
    setVerifiedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checks = [
    { id: 'check-1', title: 'Reviewer Test Account Credentials configured', sub: 'Demo login & test credentials ready for App Review Notes' },
    { id: 'check-2', title: 'PrivacyInfo.xcprivacy declared in Xcode', sub: 'Required Reason APIs verified with no missing SDK signatures' },
    { id: 'check-3', title: 'In-App Account Deletion button functional', sub: 'Instant account purge compliant with Guideline 5.1.1(v)' },
    { id: 'check-4', title: 'Terms of Service & Privacy Policy URLs live', sub: 'Public HTTPS URLs accessible without login or paywall' },
    { id: 'check-5', title: 'StoreKit 2 / Google Billing purchase restore tested', sub: 'Restore Purchases button present on paywalls' },
  ];

  const checksPassed = Object.values(verifiedItems).filter(Boolean).length;
  const checksPercent = Math.round((checksPassed / checks.length) * 100);

  return (
    <div className="w-full pb-36 px-4 ios-safe-top space-y-6 max-w-xl mx-auto text-white">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-6 h-6 stroke-white text-white" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">
              App Store Intelligence
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              App Launch Advisor
            </h1>
          </div>
        </div>

        <button
          onClick={onOpenChecklist}
          className="apple-press px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center space-x-1.5 transition-all"
        >
          <span>Checklist</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-white" />
        </button>
      </div>

      {/* Main Readiness Gauge Card */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Launch Readiness Score
            </span>
            <h2 className="text-3xl font-black text-white mt-0.5">
              {percent}% Ready
            </h2>
            <p className="text-xs text-white/70 mt-1">
              {completedCount} of {totalCount} production requirements completed
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-bold text-xs flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 stroke-white text-white" />
            <span>{percent >= 80 ? 'Optimal' : 'Action Required'}</span>
          </div>
        </div>

        {/* Section Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-white/70 font-semibold">
            <span>Overall Submission Velocity</span>
            <span>{percent}%</span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-3 text-xs leading-relaxed text-white/90">
          <Info className="w-4 h-4 stroke-white text-white shrink-0 mt-0.5" />
          <p>
            {percent >= 80 ? (
              <>Your app is approaching store production readiness! Verify all critical blockers and run your final release archive on Xcode.</>
            ) : (
              <>Focus on high-priority security and guideline items to prevent immediate rejection by Apple and Google review engines.</>
            )}
          </p>
        </div>
      </div>

      {/* Interactive Store Pre-Flight Checks */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 stroke-white text-white" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Pre-Flight Review Guardrails
            </h3>
          </div>
          <span className="text-xs font-semibold text-white/60">
            {checksPassed}/{checks.length} Verified
          </span>
        </div>

        {/* Progress bar for guardrails */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${checksPercent}%` }}
          />
        </div>

        <div className="space-y-2.5 pt-1">
          {checks.map(check => {
            const isDone = Boolean(verifiedItems[check.id]);
            return (
              <div 
                key={check.id}
                onClick={() => toggleVerified(check.id)}
                className={`apple-press p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isDone 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="pr-3">
                  <span className={`text-xs font-bold block ${isDone ? 'text-white' : 'text-white/80'}`}>
                    {check.title}
                  </span>
                  <span className="text-[11px] text-white/60 block mt-0.5">
                    {check.sub}
                  </span>
                </div>

                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0 bg-white/10 text-white"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 stroke-white fill-white/20 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 stroke-white/40" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 5 Rejection Traps & Instant Remedies */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-4 shadow-2xl">
        <div className="flex items-center space-x-2.5">
          <AlertTriangle className="w-5 h-5 stroke-white text-white" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Top Store Rejection Traps
          </h3>
        </div>
        <p className="text-xs text-white/70">
          The 5 most frequent reasons Apple & Google reject newly submitted apps:
        </p>

        <div className="space-y-3 pt-1">
          {CRITICAL_TRAPS.map(trap => {
            const isSelected = selectedTrap?.id === trap.id;
            return (
              <div 
                key={trap.id}
                onClick={() => setSelectedTrap(isSelected ? null : trap)}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all cursor-pointer"
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                        {trap.platform}
                      </span>
                      <span className="text-[10px] font-bold text-white/60">
                        {trap.rule}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {trap.title}
                    </h4>
                  </div>
                  <ChevronRight className={`w-4 h-4 stroke-white text-white shrink-0 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                </div>

                {isSelected && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-white/10 text-xs">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                        Advisor Remedy:
                      </span>
                      <p className="text-white/80 leading-relaxed">
                        {trap.remedy}
                      </p>
                    </div>

                    {trap.codeSnippet && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-white/60 flex items-center space-x-1">
                          <Code className="w-3 h-3 stroke-white" />
                          <span>Implementation Reference:</span>
                        </span>
                        <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-white/90 font-mono text-[11px] overflow-x-auto">
                          {trap.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
