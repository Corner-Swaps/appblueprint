import { TroubleshootingScenario } from '../types';

export const TROUBLESHOOTING_DATA: TroubleshootingScenario[] = [
  {
    id: 'ts-guideline-2-1-crash',
    title: 'Apple Guideline 2.1: App Crashes or Loads to Blank Screen for Reviewer',
    category: 'rejection',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 2.1 - App Completeness',
    triggerSymptom: 'Reviewer rejected with: "We discovered one or more bugs in your app... Your app crashed on launch or displayed a blank screen when we attempted to review it on iPad/iPhone running iOS 18."',
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
    id: 'ts-guideline-4-8-apple-signin',
    title: 'Apple Guideline 4.8: Missing Sign in with Apple Parity',
    category: 'rejection',
    platform: 'ios',
    appStoreGuidelineRef: 'Guideline 4.8 - Sign in with Apple',
    triggerSymptom: 'Reviewer rejected with: "Apps that use a third-party or social login service (such as Google Sign-In or Facebook) to set up or authenticate the user\'s primary account must also offer Sign in with Apple as an equivalent option."',
    rootCauses: [
      'The app provides Google, Facebook, Twitter/X, or GitHub login buttons, but omitted Sign in with Apple.',
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
            print("Auth failed: \(error)")
        }
    }
)
.signInWithAppleButtonStyle(.black)
.frame(height: 50)`
    }
  },
  {
    id: 'ts-guideline-5-1-1-account-deletion',
    title: 'Apple Guideline 5.1.1(v) & Google Play: Missing In-App Account Deletion',
    category: 'rejection',
    platform: 'both',
    appStoreGuidelineRef: 'Guideline 5.1.1(v) - Account Deletion',
    googlePlayPolicyRef: 'Google Play User Data - Account Deletion Requirement',
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
      'Step 4: Host a public URL (e.g. `https://yourapp.com/delete-account`) allowing users to request deletion from a browser and link this in Google Play Console.'
    ]
  },
  {
    id: 'ts-google-foreground-service',
    title: 'Google Play Rejection: Foreground Service Permission Without Justification',
    category: 'rejection',
    platform: 'android',
    googlePlayPolicyRef: 'Google Play Foreground Services Policy (Android 14+)',
    triggerSymptom: 'Google Play automated review rejection: "Your declared Foreground Service is not permitted under the policy... You must provide a valid justification and video proof."',
    rootCauses: [
      'Requesting generic `FOREGROUND_SERVICE` permission in Android 14+ without specifying the sub-type permission.',
      'Using a foreground service for background syncing or tasks that should use WorkManager instead.',
      'Missing or invalid video link demonstrating the user-initiated foreground service in action.'
    ],
    immediateFix: [
      'Step 1: Replace generic foreground services with `androidx.work:work-runtime-ktx` (WorkManager) for non-immediate background sync.',
      'Step 2: If a real-time foreground service is required (e.g. media playback, active navigation, call): declare the specific permission like `FOREGROUND_SERVICE_MEDIA_PLAYBACK` in AndroidManifest.xml.',
      'Step 3: Record a 30-second screen video showing the user tapping "Play" or "Start Route" and the persistent notification appearing in the notification shade.',
      'Step 4: Submit the video link in the Play Console declaration form.'
    ],
    codeSnippet: {
      language: 'xml',
      filename: 'AndroidManifest.xml',
      code: `<!-- Android 14+ specific foreground service type -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" />

<service
    android:name=".sync.DataSyncService"
    android:foregroundServiceType="dataSync"
    android:exported="false" />`
    }
  },
  {
    id: 'ts-google-20-testers',
    title: 'Google Play 20-Tester / 14-Day Closed Testing Qualification Issues',
    category: 'store_ops',
    platform: 'android',
    googlePlayPolicyRef: 'Closed Testing Requirements for Personal Developer Accounts',
    triggerSymptom: 'Unable to apply for Production Access after 14 days, or application for production access was rejected by Google.',
    rootCauses: [
      'Testers uninstalled the app or opted out before the 14 continuous days were completed.',
      'Testers never opened or engaged with the app during the test window.',
      'Answers to the Google Play questionnaire ("How did you recruit testers? What feedback did you get?") were generic, one-word, or appeared automated.'
    ],
    immediateFix: [
      'Step 1: Maintain a buffer: recruit 25-30 testers rather than exactly 20 to safeguard against dropouts.',
      'Step 2: Have testers actively open and use the app every 2-3 days and submit written feedback via Google Play testing link.',
      'Step 3: Push at least 1 update to the closed testing track during the 14 days to prove active iteration.',
      'Step 4: In the production access questionnaire, provide thorough, authentic answers: detail the specific feedback received (e.g. "Users requested larger font size on checkout") and explain the code fixes made.'
    ]
  },
  {
    id: 'ts-universal-links-failure',
    title: 'Universal Links / App Links Open in Browser Instead of App',
    category: 'runtime',
    platform: 'both',
    triggerSymptom: 'Tapping a web link (e.g. `https://yourapp.com/invite/123`) opens the website in Safari or Chrome instead of seamlessly opening the installed app.',
    rootCauses: [
      'AASA (Apple App Site Association) file is served with redirects or incorrect MIME type (`text/html` instead of `application/json`).',
      'Apple CDN cache has not scraped the latest AASA file yet.',
      'User previously tapped the top-right domain link in Safari (e.g. "yourapp.com >"), which instructs iOS to permanently open that domain in Safari for that user.',
      'Android `assetlinks.json` has incorrect SHA-256 fingerprint (used debug keystore fingerprint instead of Google Play App Signing key).'
    ],
    immediateFix: [
      'Step 1: Test AASA URL with `curl -v -L -H "Accept: application/json" https://yourapp.com/.well-known/apple-app-site-association`. Must return HTTP 200 without 301/302 redirects.',
      'Step 2: Check Apple CDN scraper cache directly at: `https://app-site-association.cdn-apple.com/a/v1/yourapp.com`.',
      'Step 3: On Android, get the SHA-256 fingerprint from Google Play Console -> Setup -> App Signing -> App signing key certificate (NOT the upload key!).',
      'Step 4: Run `adb shell pm get-app-links com.yourapp` to verify verification status.'
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
    id: 'ts-release-crash-proguard',
    title: 'Release Build Crashes on Launch (Works in Debug Mode)',
    category: 'build',
    platform: 'android',
    triggerSymptom: 'App runs perfectly in Xcode/Android Studio debug simulator, but crashes immediately with `ClassNotFoundException` or `NullPointerException` when installed from Release APK or Play Store.',
    rootCauses: [
      'R8 / ProGuard obfuscation stripped serialized data model classes, so JSON parsing fails at runtime.',
      'Reflection-based libraries (Gson, Retrofit, Kotlinx Serialization) cannot find renamed field names.',
      'Missing native C++ libraries for 64-bit architectures (`arm64-v8a`).'
    ],
    immediateFix: [
      'Step 1: Run `adb logcat -s AndroidRuntime:E` while launching the release build to inspect the exact fatal exception stack trace.',
      'Step 2: Add `@Keep` annotation to all serialized data classes, or add keep rules in `proguard-rules.pro`.',
      'Step 3: If using Retrofit/Gson, keep model package: `-keepclassmembers class com.yourapp.data.models.** { <fields>; }`.',
      'Step 4: Rebuild release APK and test on physical device with `adb install -r app-release.apk` before uploading to console.'
    ],
    codeSnippet: {
      language: 'groovy',
      filename: 'proguard-rules.pro',
      code: `# Keep JSON Data Models
-keep class com.yourapp.models.** { *; }
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}
-keepattributes Signature
-keepattributes *Annotation*`
    }
  }
];
