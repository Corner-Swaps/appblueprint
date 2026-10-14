import { TroubleshootingScenario } from '../types';

export const TROUBLESHOOTING_DATA: TroubleshootingScenario[] = [
  {
    id: 'ts-guideline-2-1-crash',
    title: 'Apple Guideline 2.1: App Crashes or Loads to Blank Screen for Reviewer',
    category: 'rejection',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 2.1 - App Completeness',
    triggerSymptom: 'Reviewer rejected with: "We discovered one or more bugs in your app... Your app crashed on launch or displayed a blank screen when we attempted to review it on iPad/iPhone running iOS 18/26."',
    rootCauses: [
      'App was tested in an IPv4 environment, but Apple review runs in an isolated IPv6 NAT64 network.',
      'Missing permission description in Info.plist (e.g. NSCameraUsageDescription or NSLocationWhenInUseUsageDescription) causing an unhandled SIGABRT upon access.',
      'Hardcoded screen dimensions or assumption of iPhone dimensions causing iPad multitasking crash.',
      'Empty database state causes unhandled force unwrap `nil` error when demo credentials are used.'
    ],
    immediateFix: [
      'Step 1: Test your app in an IPv6 NAT64 network using macOS Internet Sharing (System Settings -> Sharing -> Internet Sharing -> Create NAT64 Network).',
      'Step 2: Check all `Info.plist` usage description strings. Every hardware or privacy sensor accessed must have a non-empty explanation.',
      'Step 3: Test on iPad simulator with Stage Manager and Split View enabled to ensure layout does not crash.',
      'Step 4: Seed the reviewer account with realistic dummy items so initial view controllers never encounter an unhandled empty nil state.',
      'Step 5: Record an unlisted video showing the app launching cleanly with reviewer credentials and reply via Resolution Center.'
    ],
    codeSnippet: {
      language: 'swift',
      filename: 'SafeUnwrapExample.swift',
      code: `// Avoid force-unwrapping models in UI view controllers
guard let userProfile = viewModel.currentUser else {
    // Render graceful empty state rather than fatalError or force-unwrap
    showEmptyStateView(message: "Welcome! Add your first item.")
    return
}`
    }
  },
  {
    id: 'ts-guideline-3-1-1-iap',
    title: 'Apple Guideline 3.1.1: Bypassing In-App Purchase for Digital Goods',
    category: 'rejection',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 3.1.1 - In-App Purchase',
    triggerSymptom: 'Reviewer rejected with: "Your app offers in-app purchases or subscriptions using payment mechanisms other than the In-App Purchase API."',
    rootCauses: [
      'Linking to a web checkout page (e.g. Stripe, LemonSqueezy) to purchase credits, unlocks, or digital subscriptions.',
      'Mentioning in copy: "Buy cheaper on our website" or "Visit website to subscribe".',
      'Using a 3rd party payment SDK inside the mobile binary for digital features (only allowed for physical goods/services).'
    ],
    immediateFix: [
      'Step 1: Replace all third-party payment gateways for digital goods with Apple StoreKit 2.',
      'Step 2: If physical goods are also sold (e.g. merchandise, physical tickets), separate them completely from digital features.',
      'Step 3: Remove all external links or marketing copy referring to web purchasing unless qualifying under Reader App rules (Guideline 3.1.3a).'
    ]
  },
  {
    id: 'ts-guideline-2-1-iap-sandbox',
    title: 'Apple Guideline 2.1(b): In-App Purchases Unresponsive or Displaying Errors',
    category: 'rejection',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 2.1(b) - App Completeness',
    triggerSymptom: 'Reviewer rejected with: "The In-App Purchase products in the app exhibited one or more bugs. Specifically, there was an error message displayed when we tapped Unlock."',
    rootCauses: [
      'StoreKit 2 product queries take longer on review sandbox servers and timeout without fallback retry.',
      'Paid Apps Agreement in App Store Connect Business section is not accepted or pending banking/tax info.',
      'The In-App Purchase capability is not enabled on the Xcode target attributes.',
      'UI immediately pops an error alert instead of keeping the user in a loading state or offering a silent retry.'
    ],
    immediateFix: [
      'Step 1: Check App Store Connect -> Agreements -> Paid Apps Agreement and confirm status is "Active".',
      'Step 2: Add `com.apple.InAppPurchase` capability to your Xcode target in `project.pbxproj`.',
      'Step 3: Query StoreKit 2 products at app launch with automated retry logic so products are pre-cached before the paywall opens.',
      'Step 4: Gracefully handle cancellation and sandbox latency without displaying red error banners to the reviewer.'
    ],
    codeSnippet: {
      language: 'swift',
      filename: 'StoreKitManager.swift',
      code: `// StoreKit 2 robust product retrieval with retry
func fetchProducts(productIdentifiers: [String], retries: Int = 3) async -> [Product] {
    for _ in 0..<retries {
        do {
            let products = try await Product.products(for: productIdentifiers)
            if !products.isEmpty { return products }
        } catch {
            try? await Task.sleep(nanoseconds: 1_000_000_000)
        }
    }
    return []
}`
    }
  },
  {
    id: 'ts-guideline-4-8-apple-signin',
    title: 'Apple Guideline 4.8: Missing Sign in with Apple Parity',
    category: 'rejection',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 4.8 - Sign in with Apple',
    triggerSymptom: 'Reviewer rejected with: "Apps that use a third-party or social login service to set up or authenticate the user\'s primary account must also offer Sign in with Apple as an equivalent option."',
    rootCauses: [
      'The app provides social login buttons, but omitted Sign in with Apple.',
      'The Sign in with Apple button is placed below the fold or smaller than third-party options.'
    ],
    immediateFix: [
      'Step 1: Add "Sign in with Apple" capability to your Xcode project and App ID in developer.apple.com.',
      'Step 2: Add `ASAuthorizationAppleIDButton` directly adjacent to or above other social login buttons.',
      'Step 3: Handle the user credentials callback, including name and private relay email address on first authentication.'
    ],
    codeSnippet: {
      language: 'swift',
      filename: 'LoginView.swift',
      code: `import AuthenticationServices

SignInWithAppleButton(
    onRequest: { request in
        request.requestedScopes = [.fullName, .email]
    },
    onCompletion: { result in
        switch result {
        case .success(let authResults):
            handleAppleAuth(authResults)
        case .failure(let error):
            print("Auth failed: \\(error)")
        }
    }
)
.signInWithAppleButtonStyle(.black)
.frame(height: 50)`
    }
  },
  {
    id: 'ts-guideline-5-1-1-account-deletion',
    title: 'Apple Guideline 5.1.1(v): Missing In-App Account Deletion',
    category: 'rejection',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 5.1.1(v) - Account Deletion',
    triggerSymptom: 'Rejection stating: "We noticed that your app allows users to create an account, but does not provide an option to initiate account deletion directly in the app."',
    rootCauses: [
      'Account deletion option redirects to an external support email or contact form.',
      'Account deletion option only deactivates the account rather than initiating permanent data deletion.',
      'No web-based deletion request URL provided in store listing metadata for uninstalled users.'
    ],
    immediateFix: [
      'Step 1: Add a visible "Delete Account" button in the Settings / Profile screen.',
      'Step 2: Show a confirmation modal explaining that all personal data will be permanently wiped.',
      'Step 3: Call an endpoint that invalidates auth tokens and queues data deletion within 30 days.',
      'Step 4: Host a public URL (e.g. `https://yourapp.com/delete-account`) allowing users to request deletion from a browser and link this in App Store Connect.'
    ]
  },
  {
    id: 'ts-testflight-external-review',
    title: 'TestFlight Beta Testing & App Store Review Preparation',
    category: 'store_ops',
    platform: 'ios',
    appStoreGuidelineRef: 'App Store Review - TestFlight Guidelines',
    triggerSymptom: 'TestFlight External Testing build is waiting for review or rejected for incomplete demo credentials or test information.',
    rootCauses: [
      'Review notes lacked working test login credentials or 2FA bypass instructions.',
      'Missing privacy policy URL in App Store Connect or invalid test information in "What to Test".',
      'Build missing export compliance encryption declaration in Info.plist (`ITSAppUsesNonExemptEncryption`).'
    ],
    immediateFix: [
      'Step 1: In App Store Connect -> TestFlight -> External Groups, provide complete demo credentials with test data already seeded.',
      'Step 2: Add `<key>ITSAppUsesNonExemptEncryption</key><false/>` to Info.plist to skip export compliance prompts on every upload.',
      'Step 3: Ensure "What to Test" field has clear, concise release notes explaining newly added features.'
    ],
    codeSnippet: {
      language: 'xml',
      filename: 'Info.plist',
      code: `<!-- Skip TestFlight Export Compliance prompt -->
<key>ITSAppUsesNonExemptEncryption</key>
<false/>`
    }
  },
  {
    id: 'ts-universal-links-failure',
    title: 'Apple Universal Links Open in Safari Instead of App',
    category: 'runtime',
    platform: 'ios',
    appStoreGuidelineRef: 'Universal Links & Associated Domains',
    triggerSymptom: 'Tapping a web link (e.g. `https://yourapp.com/invite/123`) opens the website in Safari instead of seamlessly opening the installed app.',
    rootCauses: [
      'AASA (Apple App Site Association) file is served with redirects or incorrect MIME type (`text/html` instead of `application/json`).',
      'Apple CDN cache has not scraped the latest AASA file yet.',
      'User previously tapped the top-right domain link in Safari (e.g. "yourapp.com >"), which instructs iOS to open that domain in Safari for that user.',
      'Missing Associated Domains entitlement (`applinks:yourapp.com`) in Xcode target.'
    ],
    immediateFix: [
      'Step 1: Test AASA URL with `curl -v -L -H "Accept: application/json" https://yourapp.com/.well-known/apple-app-site-association`. Must return HTTP 200 without 301/302 redirects.',
      'Step 2: Check Apple CDN scraper cache directly at: `https://app-site-association.cdn-apple.com/a/v1/yourapp.com`.',
      'Step 3: Verify Associated Domains capability is present in `App.entitlements` with `applinks:yourapp.com`.'
    ],
    codeSnippet: {
      language: 'json',
      filename: 'apple-app-site-association',
      code: `{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "ABCDE12345.com.yourapp.bundle",
        "paths": ["*"],
        "components": [
          {
            "/": "/*",
            "comment": "Matches all routes"
          }
        ]
      }
    ]
  }
}`
    }
  },
  {
    id: 'ts-release-crash-dsym',
    title: 'iOS Release Build Crashes on Launch (Symbolication & dSYM Missing)',
    category: 'build',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 2.1 - Release Crash Diagnostics',
    triggerSymptom: 'App runs in Xcode debug simulator, but crashes immediately when installed from TestFlight or App Store with unsymbolicated crash log.',
    rootCauses: [
      'Release optimization level (-O) exposed concurrency race conditions or uninitialized variables.',
      'dSYM debug symbols were not uploaded to App Store Connect, resulting in hex addresses instead of file/line symbols.',
      'Missing required fonts, assets, or localization bundles in Copy Bundle Resources build phase.'
    ],
    immediateFix: [
      'Step 1: Open Xcode Organizer -> select the Archive -> click "Download Debug Symbols" to fetch store symbols.',
      'Step 2: Check Xcode Build Settings -> "Debug Information Format" is set to "DWARF with dSYM File" for Release configuration.',
      'Step 3: In TestFlight crash feedback, view symbolicated stack trace to pinpoint the failing method.'
    ]
  }
];
