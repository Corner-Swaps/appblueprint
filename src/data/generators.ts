export interface PrivacyManifestConfig {
  tracking: boolean;
  trackingDomains: string[];
  useUserDefaults: boolean;
  useFileTimestamp: boolean;
  useDiskSpace: boolean;
  useSystemBootTime: boolean;
  collectEmail: boolean;
  collectName: boolean;
  collectLocation: boolean;
}

export function generatePrivacyManifest(config: PrivacyManifestConfig): string {
  const apiTypes: string[] = [];

  if (config.useUserDefaults) {
    apiTypes.push(`        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string>
            </array>
        </dict>`);
  }

  if (config.useFileTimestamp) {
    apiTypes.push(`        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>C617.1</string>
            </array>
        </dict>`);
  }

  if (config.useDiskSpace) {
    apiTypes.push(`        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryDiskSpace</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>E174.1</string>
            </array>
        </dict>`);
  }

  if (config.useSystemBootTime) {
    apiTypes.push(`        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategorySystemBootTime</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>35F9.1</string>
            </array>
        </dict>`);
  }

  const trackingDomainsXml = config.trackingDomains.length > 0
    ? `    <key>NSPrivacyTrackingDomains</key>
    <array>
${config.trackingDomains.map(d => `        <string>${d}</string>`).join('\n')}
    </array>`
    : `    <key>NSPrivacyTrackingDomains</key>
    <array/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>NSPrivacyTracking</key>
    <${config.tracking ? 'true' : 'false'}/>
${trackingDomainsXml}
    <key>NSPrivacyCollectedDataTypes</key>
    <array/>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
${apiTypes.join('\n')}
    </array>
</dict>
</plist>`;
}

export function generateAASA(teamId: string, bundleId: string, paths: string[] = ['*']): string {
  const cleanTeam = teamId.trim() || 'TEAM_ID';
  const cleanBundle = bundleId.trim() || 'com.example.app';
  const formattedPaths = paths.length > 0 ? paths : ['*'];

  return JSON.stringify(
    {
      applinks: {
        apps: [],
        details: [
          {
            appID: `${cleanTeam}.${cleanBundle}`,
            paths: formattedPaths,
            components: [
              {
                '/': '/*',
                comment: 'Universal Links route mapping'
              }
            ]
          }
        ]
      },
      webcredentials: {
        apps: [`${cleanTeam}.${cleanBundle}`]
      }
    },
    null,
    2
  );
}

export function generateAssetLinks(packageName: string, sha256Fingerprint: string): string {
  const cleanPackage = packageName.trim() || 'com.example.app';
  const cleanFingerprint = sha256Fingerprint.trim() || '14:6D:E9:DE:0F:1F:B1:A7:28:C2:59:E4:05:BF:F3:3D:A1:02:64:14:0F:7B:64:89:12:F1:C9:83:8A:DF:28:D2';

  return JSON.stringify(
    [
      {
        relation: [
          'delegate_permission/common.handle_all_urls',
          'delegate_permission/common.get_login_creds'
        ],
        target: {
          namespace: 'android_app',
          package_name: cleanPackage,
          sha256_cert_fingerprints: [cleanFingerprint]
        }
      }
    ],
    null,
    2
  );
}

export function generatePrivacyPolicy(
  appName: string,
  companyName: string,
  contactEmail: string,
  sdks: string[] = []
): string {
  const app = appName.trim() || 'Our Application';
  const company = companyName.trim() || 'Our Company';
  const email = contactEmail.trim() || 'privacy@example.com';
  const date = new Date().toISOString().split('T')[0];

  return `# Privacy Policy for ${app}
**Last updated:** ${date}

${company} ("we", "our", or "us") operates the ${app} mobile application (the "App"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our App and the choices you have associated with that data.

---

### 1. Information We Collect
We collect several different types of information for various purposes to provide and improve our service to you:
- **Account & Contact Data:** When you create an account, we may collect your email address, display name, and authentication tokens.
- **Usage & Diagnostic Data:** We may collect information on how the App is accessed and used (session durations, screens viewed, crash logs, and operating system version).
- **Device Information:** Device model, operating system version, unique device identifiers, and language settings.

---

### 2. Third-Party Service Providers & SDKs
We may employ third-party companies and individuals to facilitate our App ("Service Providers"), provide services on our behalf, or assist us in analyzing how our App is used. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

Included Third-Party Services:
${sdks.length > 0 ? sdks.map(s => `- **${s}**`).join('\n') : '- Standard analytics and crash reporting providers (e.g., Firebase, Sentry).'}

---

### 3. Security of Data
The security of your data is important to us. All data in transit is encrypted using Transport Layer Security (TLS 1.3). Sensitive credentials and authentication tokens stored on your device are encrypted using hardware-backed keychains (Apple Keychain / Android Keystore). However, no method of transmission over the Internet is 100% secure.

---

### 4. Account & Data Deletion (User Rights)
In accordance with Apple App Store Guideline 5.1.1(v) and Google Play User Data policies, users have the right to request the permanent deletion of their account and all associated personal data:
- **In-App:** You can initiate permanent account deletion at any time by navigating to **Settings > Account > Delete Account**.
- **Web Deletion Request:** You can also request complete account deletion by contacting us at [${email}](mailto:${email}).

Upon receiving your deletion request, your authentication tokens will be immediately invalidated and your personal data permanently purged from our active databases within 30 days.

---

### 5. Children's Privacy (COPPA / GDPR-K)
Our App does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us at ${email}.

---

### 6. Contact Us
If you have any questions about this Privacy Policy, please contact us:
- By email: [${email}](mailto:${email})
- By visiting: ${company}
`;
}

export function generateTermsOfService(
  appName: string,
  companyName: string,
  supportEmail: string,
  hasSubscriptions: boolean = true,
  hasUGC: boolean = false
): string {
  const app = appName || 'Our Mobile Application';
  const company = companyName || 'The Company';
  const email = supportEmail || 'support@example.com';
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return `# End User License Agreement (EULA) & Terms of Service for ${app}
**Last updated:** ${date}

Please read these Terms of Service and End User License Agreement ("Agreement", "Terms") carefully before using the ${app} mobile application (the "App") operated by ${company} ("us", "we", or "our").

By downloading, installing, or using the App, you agree to be bound by the terms and conditions of this Agreement. If you do not agree to the terms of this Agreement, do not download, install, or use the App.

---

### 1. License Grant
${company} grants you a revocable, non-exclusive, non-transferable, limited license to download, install, and use the App solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement and applicable App Store / Google Play terms.

---

### 2. User Conduct & Prohibited Activities
You agree not to:
- Decompile, reverse engineer, disassemble, or attempt to derive the source code of the App.
- Make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App.
- Violate any applicable laws, rules, or regulations in connection with your access or use of the App.
- Use the App for sending unauthorized commercial communications, spam, or abusive messages.

${hasUGC ? `---

### 3. User-Generated Content & Zero-Tolerance Abuse Policy
If the App allows you to post content, comments, photos, or messages:
- You retain ownership of your content, but grant us a worldwide, royalty-free license to host and display it within the App.
- There is a **strict zero-tolerance policy** for objectionable, abusive, defamatory, harassing, hateful, or sexually explicit content.
- Users can flag or report objectionable content using in-app "Report" buttons and block abusive users using the in-app "Block" feature.
- Any reported content will be reviewed, and offending users will be permanently banned within 24 hours in accordance with App Store Review Guideline 1.2.
` : ''}
${hasSubscriptions ? `---

### 4. Subscriptions, Payments & Auto-Renewal Terms
The App may offer premium features through auto-renewing subscriptions ("Paid Subscriptions"):
- **Billing & Renewal:** Subscriptions automatically renew at the end of each subscription period (e.g. monthly or annually) unless auto-renewal is canceled at least 24 hours prior to the expiration of the current cycle.
- **Payment Processing:** Payment is charged to your Apple ID / Google Play account upon purchase confirmation. Pricing is displayed in your local currency on the paywall screen.
- **How to Cancel Anytime (Click-to-Cancel):** You may manage or cancel your subscription at any time directly through your phone settings:
  - **iOS:** Open **Settings** > tap your **Apple ID Profile** > **Subscriptions** > tap **${app}** > select **Cancel Subscription**.
  - **Android:** Open **Google Play Store** > tap your **Profile Icon** > **Payments & subscriptions** > **Subscriptions** > tap **${app}** > **Cancel subscription**.
- **Restore Purchases:** You can restore previously purchased subscriptions on new or existing devices at any time by tapping the "Restore Purchases" button on the paywall screen.
- **Refunds:** All in-app purchase and subscription transactions are processed directly by Apple or Google under their respective terms. Refund requests must be directed to Apple or Google support.
` : ''}
---

### 5. Medical, Health & Professional Disclaimers
The content, calculations, and information provided within the App are for general informational and educational purposes only. The App does NOT provide medical, clinical, or professional licensed advice. Always seek the advice of a qualified physician or licensed healthcare provider with any questions regarding medical conditions.

---

### 6. Intellectual Property
The App, including all copyrights, patents, trademarks, trade secrets, and other intellectual property rights, is and remains the sole property of ${company}. All rights not expressly granted to you are reserved.

---

### 7. Limitation of Liability & Warranty Disclaimer
To the maximum extent permitted by applicable law, the App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. In no event shall ${company} be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access or use of the App.

---

### 8. Contact Information
If you have any questions or complaints regarding these Terms or the App, please contact:
- **Support Email:** [${email}](mailto:${email})
- **Company:** ${company}
`;
}

