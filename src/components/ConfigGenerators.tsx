import React, { useState } from 'react';
import { 
  generatePrivacyManifest, 
  generateAASA, 
  generateAppEntitlements, 
  generatePrivacyPolicy,
  PrivacyManifestConfig
} from '../data/generators';
import { copyToClipboard } from '../utils/clipboard';
import { 
  FileCode, 
  Copy, 
  CheckCheck, 
  Download, 
  ShieldCheck, 
  Link, 
  FileText,
  Key
} from 'lucide-react';

export const ConfigGenerators: React.FC = () => {
  const [activeGenerator, setActiveGenerator] = useState<'privacy-manifest' | 'aasa' | 'entitlements' | 'privacy-policy'>('privacy-manifest');
  const [copied, setCopied] = useState(false);

  // Privacy Manifest State
  const [manifestConfig, setManifestConfig] = useState<PrivacyManifestConfig>({
    tracking: false,
    trackingDomains: [],
    useUserDefaults: true,
    useFileTimestamp: true,
    useDiskSpace: true,
    useSystemBootTime: false,
    collectEmail: true,
    collectName: true,
    collectLocation: false,
  });
  const [domainInput, setDomainInput] = useState('');

  // AASA State
  const [teamId, setTeamId] = useState('ABCDE12345');
  const [bundleId, setBundleId] = useState('com.yourcompany.app');
  const [pathsInput, setPathsInput] = useState('/invite/*, /product/*, /auth/*');

  // Apple Entitlements State
  const [associatedDomains, setAssociatedDomains] = useState('example.com, api.example.com');
  const [enableSignInWithApple, setEnableSignInWithApple] = useState(false);
  const [enablePushNotifications, setEnablePushNotifications] = useState(false);

  // Privacy Policy State
  const [policyAppName, setPolicyAppName] = useState('My Awesome App');
  const [policyCompany, setPolicyCompany] = useState('Acme Software Inc.');
  const [policyEmail, setPolicyEmail] = useState('privacy@example.com');
  const [selectedSdks, setSelectedSdks] = useState<string[]>(['Firebase Analytics', 'RevenueCat In-App Purchases', 'Sentry Crash Reporting']);

  const allSdks = [
    'Firebase Analytics',
    'AdAttributionKit / Mobile Ads',
    'RevenueCat In-App Purchases',
    'Sentry Crash Reporting',
    'Stripe Payments',
    'Mixpanel',
    'OneSignal Push'
  ];

  // Generated contents
  const generatedManifest = generatePrivacyManifest(manifestConfig);
  const generatedAasa = generateAASA(
    teamId, 
    bundleId, 
    pathsInput.split(',').map(p => p.trim()).filter(Boolean)
  );
  const generatedEntitlements = generateAppEntitlements({
    domains: associatedDomains.split(',').map(d => d.trim()).filter(Boolean),
    signInWithApple: enableSignInWithApple,
    pushNotifications: enablePushNotifications,
  });
  const generatedPolicy = generatePrivacyPolicy(
    policyAppName, 
    policyCompany, 
    policyEmail, 
    selectedSdks
  );

  const getCurrentCode = () => {
    switch (activeGenerator) {
      case 'privacy-manifest': return { code: generatedManifest, filename: 'PrivacyInfo.xcprivacy', type: 'application/xml' };
      case 'aasa': return { code: generatedAasa, filename: 'apple-app-site-association', type: 'application/json' };
      case 'entitlements': return { code: generatedEntitlements, filename: 'App.entitlements', type: 'application/xml' };
      case 'privacy-policy': return { code: generatedPolicy, filename: 'PRIVACY_POLICY.md', type: 'text/markdown' };
    }
  };

  const current = getCurrentCode();

  const handleCopy = () => {
    copyToClipboard(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([current.code], { type: current.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = current.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddDomain = () => {
    if (domainInput.trim() && !manifestConfig.trackingDomains.includes(domainInput.trim())) {
      setManifestConfig({
        ...manifestConfig,
        trackingDomains: [...manifestConfig.trackingDomains, domainInput.trim()]
      });
      setDomainInput('');
    }
  };

  const handleRemoveDomain = (dom: string) => {
    setManifestConfig({
      ...manifestConfig,
      trackingDomains: manifestConfig.trackingDomains.filter(d => d !== dom)
    });
  };

  const toggleSdk = (sdk: string) => {
    if (selectedSdks.includes(sdk)) {
      setSelectedSdks(selectedSdks.filter(s => s !== sdk));
    } else {
      setSelectedSdks([...selectedSdks, sdk]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Generator Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setActiveGenerator('privacy-manifest')}
          className={`apple-press px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeGenerator === 'privacy-manifest'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Privacy Manifest</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveGenerator('aasa')}
          className={`apple-press px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeGenerator === 'aasa'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
          }`}
        >
          <Link className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Apple AASA</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveGenerator('entitlements')}
          className={`apple-press px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeGenerator === 'entitlements'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
          }`}
        >
          <Key className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Entitlements</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveGenerator('privacy-policy')}
          className={`apple-press px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
            activeGenerator === 'privacy-policy'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
          }`}
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Privacy Policy</span>
        </button>
      </div>

      {/* Form & Live Preview */}
      <div className="space-y-4">
        
        {/* Form Inputs */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 space-y-3.5">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-google">
            Configure Parameters
          </h3>

          {/* Privacy Manifest Form */}
          {activeGenerator === 'privacy-manifest' && (
            <div className="space-y-3.5 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-slate-700">
                Required for all App Store submissions (introduced in iOS 17+). Declare which Required Reason APIs your app or SDKs call.
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Required-Reason APIs:</span>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useUserDefaults}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useUserDefaults: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>NSUserDefaults (CA92.1 - App Data Storage)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useFileTimestamp}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useFileTimestamp: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>File Timestamps (C617.1 - File Management)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useDiskSpace}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useDiskSpace: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Disk Space (E174.1 - Caching & Storage Limits)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useSystemBootTime}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useSystemBootTime: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>System Boot Time (35F9.1 - Internal Diagnostics)</span>
                </label>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.tracking}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, tracking: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="font-bold text-slate-900">Collects Data for Tracking (ATT)</span>
                </label>

                <div>
                  <span className="font-bold text-slate-700 block mb-1">Tracking Domains:</span>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      placeholder="e.g. analytics.example.com"
                      className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/15"
                    />
                    <button
                      type="button"
                      onClick={handleAddDomain}
                      className="apple-press px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold shrink-0 cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  {manifestConfig.trackingDomains.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {manifestConfig.trackingDomains.map(d => (
                        <span key={d} className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[11px] flex items-center space-x-1">
                          <span>{d}</span>
                          <button type="button" onClick={() => handleRemoveDomain(d)} className="text-rose-600 ml-1 font-bold" aria-label={`Remove ${d}`}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AASA Form */}
          {activeGenerator === 'aasa' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Apple Developer Team ID (10 chars):
                </label>
                <input
                  type="text"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  placeholder="e.g. ABCDE12345"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  iOS Bundle Identifier:
                </label>
                <input
                  type="text"
                  value={bundleId}
                  onChange={(e) => setBundleId(e.target.value)}
                  placeholder="e.g. com.yourcompany.app"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  URL Paths to Handle (comma-separated):
                </label>
                <input
                  type="text"
                  value={pathsInput}
                  onChange={(e) => setPathsInput(e.target.value)}
                  placeholder="/invite/*, /product/*"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-[11px] text-slate-700 leading-relaxed break-words">
                Host this file at <code className="text-purple-700 font-mono font-bold break-all">https://yourdomain.com/.well-known/apple-app-site-association</code> — must return HTTP 200 without redirects and <code>application/json</code>.
              </div>
            </div>
          )}

          {/* Apple Entitlements Form */}
          {activeGenerator === 'entitlements' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Associated Domains (comma-separated):
                </label>
                <input
                  type="text"
                  value={associatedDomains}
                  onChange={(e) => setAssociatedDomains(e.target.value)}
                  placeholder="e.g. example.com, app.example.com"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Domains are automatically prefixed with <code>applinks:</code>.
                </span>
              </div>

              <div className="space-y-2 pt-1">
                <span className="font-bold text-slate-900 block">Optional Entitlements:</span>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSignInWithApple}
                    onChange={(e) => setEnableSignInWithApple(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Sign in with Apple (<code>com.apple.developer.applesignin</code>)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enablePushNotifications}
                    onChange={(e) => setEnablePushNotifications(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Push Notifications (<code>aps-environment</code>)</span>
                </label>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-slate-700 leading-relaxed">
                Add this <code className="text-blue-700 font-mono font-bold">App.entitlements</code> file to your Xcode target under Signing &amp; Capabilities. Note: Standard StoreKit In-App Purchases are enabled via Xcode Capabilities and do not require an entitlements key.
              </div>
            </div>
          )}

          {/* Privacy Policy Form */}
          {activeGenerator === 'privacy-policy' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  App Name:
                </label>
                <input
                  type="text"
                  value={policyAppName}
                  onChange={(e) => setPolicyAppName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Company / Developer Legal Name:
                </label>
                <input
                  type="text"
                  value={policyCompany}
                  onChange={(e) => setPolicyCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Contact / Privacy Email:
                </label>
                <input
                  type="email"
                  value={policyEmail}
                  onChange={(e) => setPolicyEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Active Third-Party SDKs:
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {allSdks.map(sdk => (
                    <label key={sdk} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSdks.includes(sdk)}
                        onChange={() => toggleSdk(sdk)}
                        className="rounded text-blue-600"
                      />
                      <span>{sdk}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Live Code Preview */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-slate-500 truncate">
              Live Preview: {current.filename}
            </span>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="apple-press px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="apple-press px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 font-mono text-[11px] sm:text-xs shadow-sm max-h-[340px] flex flex-col">
            <pre className="p-4 overflow-auto leading-relaxed text-slate-200 flex-1 select-text">
              <code>{current.code}</code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
