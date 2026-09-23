import React, { useState } from 'react';
import { 
  generatePrivacyManifest, 
  generateAASA, 
  generateAssetLinks, 
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
  Smartphone
} from 'lucide-react';

export const ConfigGenerators: React.FC = () => {
  const [activeGenerator, setActiveGenerator] = useState<'privacy-manifest' | 'aasa' | 'assetlinks' | 'privacy-policy'>('privacy-manifest');
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

  // AssetLinks State
  const [androidPackage, setAndroidPackage] = useState('com.yourcompany.app');
  const [sha256, setSha256] = useState('14:6D:E9:DE:0F:1F:B1:A7:28:C2:59:E4:05:BF:F3:3D:A1:02:64:14:0F:7B:64:89:12:F1:C9:83:8A:DF:28:D2');

  // Privacy Policy State
  const [policyAppName, setPolicyAppName] = useState('My Awesome App');
  const [policyCompany, setPolicyCompany] = useState('Acme Software Inc.');
  const [policyEmail, setPolicyEmail] = useState('privacy@acme.com');
  const [selectedSdks, setSelectedSdks] = useState<string[]>(['Firebase Analytics', 'RevenueCat', 'Sentry Crash Reporting']);

  const allSdks = [
    'Firebase Analytics',
    'Google AdMob',
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
  const generatedAssetLinks = generateAssetLinks(androidPackage, sha256);
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
      case 'assetlinks': return { code: generatedAssetLinks, filename: 'assetlinks.json', type: 'application/json' };
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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="liquid-glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-apple-indigo to-apple-purple flex items-center justify-center text-white shadow-apple-md">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-apple-gray-900 dark:text-white">
              Store Configuration & Policy File Generators
            </h2>
            <p className="text-xs sm:text-sm text-apple-gray-500 dark:text-apple-gray-400">
              Generate valid Apple Privacy Manifests, Universal Links AASA files, Android AssetLinks, and Store-Compliant Privacy Policies.
            </p>
          </div>
        </div>

        {/* Generator Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
          <button
            onClick={() => setActiveGenerator('privacy-manifest')}
            className={`apple-press p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeGenerator === 'privacy-manifest'
                ? 'bg-apple-blue text-white border-apple-blue shadow-apple-sm'
                : 'bg-white dark:bg-apple-gray-900 text-apple-gray-700 dark:text-apple-300 border-apple-gray-200 dark:border-apple-gray-800 hover:border-apple-blue'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="truncate">Privacy Manifest</span>
          </button>

          <button
            onClick={() => setActiveGenerator('aasa')}
            className={`apple-press p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeGenerator === 'aasa'
                ? 'bg-apple-blue text-white border-apple-blue shadow-apple-sm'
                : 'bg-white dark:bg-apple-gray-900 text-apple-gray-700 dark:text-apple-300 border-apple-gray-200 dark:border-apple-gray-800 hover:border-apple-blue'
            }`}
          >
            <Link className="w-4 h-4" />
            <span className="truncate">Apple AASA (Links)</span>
          </button>

          <button
            onClick={() => setActiveGenerator('assetlinks')}
            className={`apple-press p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeGenerator === 'assetlinks'
                ? 'bg-apple-blue text-white border-apple-blue shadow-apple-sm'
                : 'bg-white dark:bg-apple-gray-900 text-apple-gray-700 dark:text-apple-300 border-apple-gray-200 dark:border-apple-gray-800 hover:border-apple-blue'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="truncate">Android AssetLinks</span>
          </button>

          <button
            onClick={() => setActiveGenerator('privacy-policy')}
            className={`apple-press p-3 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeGenerator === 'privacy-policy'
                ? 'bg-apple-blue text-white border-apple-blue shadow-apple-sm'
                : 'bg-white dark:bg-apple-gray-900 text-apple-gray-700 dark:text-apple-300 border-apple-gray-200 dark:border-apple-gray-800 hover:border-apple-blue'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="truncate">Privacy Policy</span>
          </button>
        </div>
      </div>

      {/* Two Column Form & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Inputs (Left) */}
        <div className="lg:col-span-5 liquid-glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-apple-gray-400">
            Configure Parameters
          </h3>

          {/* Privacy Manifest Form */}
          {activeGenerator === 'privacy-manifest' && (
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-apple-blue/5 border border-apple-blue/15 text-apple-gray-700 dark:text-apple-300">
                Mandatory for iOS 17+. Declare which Required Reason APIs your app or libraries call.
              </div>

              <div className="space-y-2">
                <span className="font-bold text-apple-gray-900 dark:text-white block">Required-Reason APIs:</span>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useUserDefaults}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useUserDefaults: e.target.checked })}
                    className="rounded text-apple-blue"
                  />
                  <span>NSUserDefaults (CA92.1 - App Data Storage)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useFileTimestamp}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useFileTimestamp: e.target.checked })}
                    className="rounded text-apple-blue"
                  />
                  <span>File Timestamps (C617.1 - File Management)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useDiskSpace}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useDiskSpace: e.target.checked })}
                    className="rounded text-apple-blue"
                  />
                  <span>Disk Space (E174.1 - Caching & Storage Limits)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.useSystemBootTime}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, useSystemBootTime: e.target.checked })}
                    className="rounded text-apple-blue"
                  />
                  <span>System Boot Time (35F9.1 - Internal Diagnostics)</span>
                </label>
              </div>

              <div className="pt-2 border-t border-apple-gray-200 dark:border-apple-gray-800 space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={manifestConfig.tracking}
                    onChange={(e) => setManifestConfig({ ...manifestConfig, tracking: e.target.checked })}
                    className="rounded text-apple-blue"
                  />
                  <span className="font-bold text-apple-gray-900 dark:text-white">Collects Data for Tracking (ATT)</span>
                </label>

                <div>
                  <span className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">Tracking Domains:</span>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      placeholder="e.g. analytics.example.com"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 outline-none"
                    />
                    <button
                      onClick={handleAddDomain}
                      className="apple-press px-3 py-1.5 bg-apple-blue text-white rounded-lg font-semibold"
                    >
                      Add
                    </button>
                  </div>

                  {manifestConfig.trackingDomains.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {manifestConfig.trackingDomains.map(d => (
                        <span key={d} className="px-2 py-0.5 rounded bg-apple-gray-200 dark:bg-apple-gray-800 text-[11px] flex items-center space-x-1">
                          <span>{d}</span>
                          <button onClick={() => handleRemoveDomain(d)} className="text-apple-red ml-1">×</button>
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
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  Apple Developer Team ID (10 chars):
                </label>
                <input
                  type="text"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  placeholder="e.g. ABCDE12345"
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  iOS Bundle Identifier:
                </label>
                <input
                  type="text"
                  value={bundleId}
                  onChange={(e) => setBundleId(e.target.value)}
                  placeholder="e.g. com.yourcompany.app"
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  URL Paths to Handle (comma-separated):
                </label>
                <input
                  type="text"
                  value={pathsInput}
                  onChange={(e) => setPathsInput(e.target.value)}
                  placeholder="/invite/*, /product/*"
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-[11px] text-apple-gray-700 dark:text-apple-300 leading-relaxed">
                Host this file on your server at: <br />
                <code className="text-apple-purple font-mono font-bold">https://yourdomain.com/.well-known/apple-app-site-association</code>
                <br />Must return HTTP 200 without redirects and `application/json` MIME type.
              </div>
            </div>
          )}

          {/* AssetLinks Form */}
          {activeGenerator === 'assetlinks' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  Android Package Name:
                </label>
                <input
                  type="text"
                  value={androidPackage}
                  onChange={(e) => setAndroidPackage(e.target.value)}
                  placeholder="e.g. com.yourcompany.app"
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  Google Play App Signing SHA-256 Fingerprint:
                </label>
                <input
                  type="text"
                  value={sha256}
                  onChange={(e) => setSha256(e.target.value)}
                  placeholder="14:6D:E9:..."
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 font-mono text-[11px]"
                />
                <span className="text-[10px] text-apple-gray-400 mt-1 block">
                  Find in Google Play Console → Setup → App Signing → App signing key certificate.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-[11px] text-apple-gray-700 dark:text-apple-300 leading-relaxed">
                Host this file on your server at: <br />
                <code className="text-apple-blue font-mono font-bold">https://yourdomain.com/.well-known/assetlinks.json</code>
              </div>
            </div>
          )}

          {/* Privacy Policy Form */}
          {activeGenerator === 'privacy-policy' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  App Name:
                </label>
                <input
                  type="text"
                  value={policyAppName}
                  onChange={(e) => setPolicyAppName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800"
                />
              </div>

              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  Company / Developer Legal Name:
                </label>
                <input
                  type="text"
                  value={policyCompany}
                  onChange={(e) => setPolicyCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800"
                />
              </div>

              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  Contact / Privacy Email:
                </label>
                <input
                  type="email"
                  value={policyEmail}
                  onChange={(e) => setPolicyEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-apple-gray-100 dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800"
                />
              </div>

              <div>
                <label className="font-bold text-apple-gray-700 dark:text-apple-300 block mb-1">
                  Active Third-Party SDKs:
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {allSdks.map(sdk => (
                    <label key={sdk} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSdks.includes(sdk)}
                        onChange={() => toggleSdk(sdk)}
                        className="rounded text-apple-blue"
                      />
                      <span>{sdk}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Live Code Preview (Right) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-apple-gray-400">
              Live Preview: {current.filename}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="apple-press px-3 py-1.5 bg-apple-gray-200 dark:bg-apple-gray-800 hover:bg-apple-blue hover:text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-apple-green" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="apple-press px-3 py-1.5 bg-apple-blue text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-apple-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-apple-gray-950 border border-apple-gray-800 font-mono text-xs shadow-apple-lg max-h-[500px] flex flex-col">
            <pre className="p-5 overflow-auto leading-relaxed text-apple-gray-200 flex-1">
              <code>{current.code}</code>
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
};
