import { Phase } from '../types';

export const PHASES_DATA: Phase[] = [
  {
    "id": "phase-1",
    "number": 1,
    "title": "Idea, Audience & Project Setup",
    "shortTitle": "Idea & Setup",
    "description": "Clearly define what your app does, choose only the must-have features for version 1, set up your development tools, and create your official store accounts.",
    "iconName": "Lightbulb",
    "items": [
      {
        "id": "p1-problem-solution",
        "phaseId": "phase-1",
        "title": "Clearly Describe Who the App Is For and What It Does",
        "shortDescription": "Explain the main problem your app solves in one simple sentence.",
        "category": "functionality",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "If you try to build an app for \"everyone,\" it quickly becomes confusing and bloated. Having one clear problem and one target user makes your app much easier to build, test, and market.",
        "implementationSteps": [
          "Write down a 1-sentence description: \"My app helps [specific person] do [main goal] without [frustrating obstacle].\"",
          "Talk to a few real people who match your target user to make sure they genuinely care about this problem.",
          "Map out the user journey so someone opening the app for the first time experiences its main benefit within 60 seconds."
        ],
        "agentPrompt": "You are the autonomous senior product designer and mobile architect building this application. Do NOT ask the user to write code or perform manual steps\u2014implement this requirement completely and autonomously.\n\nTASK & OBJECTIVE:\nAudit our application's entire first-launch user journey from splash screen to the main dashboard. Streamline the user flow so a brand new user clearly understands what this app does and reaches the core interactive value within 60 seconds without hitting any confusing friction or walls of text.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect our routing, onboarding screens, and main view components. Identify any unnecessary upfront forms, forced tutorial carousels, or premature account creation barriers.\n2. IMPLEMENTATION: Refactor the initial flow to allow immediate guest exploration or lightweight progressive onboarding. Add crisp tooltips or interactive empty states that showcase the primary action immediately.\n3. STORE COMPLIANCE: Apple Guideline 4.2 requires apps to provide valuable, engaging, and unique functionality immediately upon opening. Do not block users behind mandatory registration unless the core feature fundamentally depends on an existing cloud account.\n4. VERIFICATION: Ensure the app builds with zero TypeScript errors (`tsc --noEmit`), smooth transitions occur between screens, and a first-time user can complete the primary app action within 3 taps.",
        "commonRejectionTraps": [
          "Building a vague app with too many unrelated features that Apple rejects under Guideline 4.2 (Minimum Functionality).",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Can a new user reach the core value of the app within 3 clicks of opening it?",
          "Is your target audience clearly defined in one simple sentence?"
        ],
        "whatHappensNext": "Once you complete this requirement, explain the main problem your app solves in one simple sentence., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p1-scope-pruning",
        "phaseId": "phase-1",
        "title": "Keep Only the Must-Have Features for Version 1",
        "shortDescription": "Focus on the 2 or 3 core features you need to launch, and save the rest for later.",
        "category": "functionality",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Shipping an app with 3 polished features that work reliably is a massive success. Shipping 15 half-finished or buggy features guarantees app store rejections and frustrating user reviews.",
        "implementationSteps": [
          "Sort your feature list into two piles: \"Must-Have to launch\" and \"Nice-to-Have for future updates\".",
          "Temporarily remove all \"Nice-to-Have\" features from your current build sprint.",
          "Remove any placeholder buttons, empty screens, or \"Coming Soon\" tabs so every single visible button works."
        ],
        "agentPrompt": "You are the autonomous senior mobile engineer building this application. Do NOT ask the user to write code or perform manual audits\u2014execute this entire requirement autonomously in our codebase.\n\nTASK & OBJECTIVE:\nPerform an exhaustive codebase and UI audit across all screens, navigation tabs, dropdown menus, and modal dialogs. Eliminate all dummy placeholder buttons, unfinished feature stubs, fake \"Coming Soon\" banners, and dead-end mock UI elements.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan all TSX/JSX templates, routes, and navigation bars for inactive buttons, alerts stating \"feature coming soon\", empty placeholder views, or non-functional icon buttons.\n2. IMPLEMENTATION: For every interactive element found: if the feature is ready, ensure it is fully wired to working production logic; if the feature is unfinished or planned for V2, cleanly remove or hide its entry points and navigation links.\n3. STORE COMPLIANCE: Apple Guideline 2.1 (App Completeness) strictly forbids beta markers, demo labels, and placeholder buttons. Every single visible button must trigger a complete, functional action.\n4. VERIFICATION: Verify that clicking every visible tab, card, and action button executes a real feature with proper state handling. Ensure `tsc --noEmit` passes cleanly.",
        "commonRejectionTraps": [
          "Leaving \"Coming Soon\" or inactive placeholder buttons in the app triggers instant rejection under Apple Guideline 2.1 (App Completeness).",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are all placeholder features or unfinished screens completely removed from the UI?",
          "Does every clickable button perform a real, working action?"
        ],
        "whatHappensNext": "Once you complete this requirement, focus on the 2 or 3 core features you need to launch, and save the rest for later., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p1-tech-stack",
        "phaseId": "phase-1",
        "title": "Clean Project Setup & Mobile Build Environment",
        "shortDescription": "Use a reliable, modern coding setup so the app runs smoothly on real phones.",
        "category": "design",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Using strict TypeScript catches typos and logic bugs before they reach real phones. Compiling your app into native mobile code with Capacitor and Xcode ensures it feels fast, responsive, and native.",
        "implementationSteps": [
          "Write code using strict TypeScript so the compiler catches bugs automatically.",
          "Build your web code and sync it into native iOS and Android projects using Capacitor commands.",
          "Open the native project in Xcode and make sure it compiles cleanly and runs on your phone.",
          "Set the minimum operating system version to modern standards (iOS 16+ and Android 14+)."
        ],
        "agentPrompt": "You are the autonomous mobile systems engineer responsible for our build pipeline. Do NOT ask the user to configure build settings\u2014implement and verify this entire configuration autonomously.\n\nTASK & OBJECTIVE:\nInspect and harden our project's TypeScript configuration, Capacitor native bridge settings, and mobile build environment to ensure flawless, crash-free execution on physical devices.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `tsconfig.json`, `capacitor.config.ts`, `package.json`, and the native iOS/Android bridge targets.\n2. IMPLEMENTATION:\n   - Enforce strict TypeScript: eliminate all implicit or explicit `any` types, resolve potential undefined/null property accesses, and ensure clean type imports.\n   - Configure Capacitor: ensure native plugins are cleanly linked, correct app bundle ID and app name are declared in `capacitor.config.ts`, and web assets build directly into native target directories.\n   - Ensure minimum mobile OS deployment targets are set to modern standards (iOS 16+ in Xcode project settings, Android 14+ / minSdk 24 in build.gradle).\n3. VERIFICATION: Execute `npm run build` and `npx cap sync ios`. Confirm zero compilation errors, zero type errors, and zero unresolved native plugin warnings.",
        "commonRejectionTraps": [
          "Ignoring build warnings or type errors that cause random crashes when people open the app on physical phones.",
          "Forgetting to configure your Apple Developer Team in Xcode, which prevents testing on real iPhones.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does `npx tsc --noEmit` pass with zero errors across all codebase files?",
          "Does the app build and run cleanly on a real physical phone?"
        ],
        "whatHappensNext": "Once you complete this requirement, use a reliable, modern coding setup so the app runs smoothly on real phones., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p1-developer-accounts",
        "phaseId": "phase-1",
        "title": "Set Up Your Apple & Google Developer Accounts",
        "shortDescription": "Register official accounts with Apple and Google so you have permission to publish apps.",
        "category": "store",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Account verification can take 1 to 3 weeks because Apple and Google verify your identity or business details. Setting this up early prevents launch delays when your code is ready.",
        "implementationSteps": [
          "Enroll in the Apple Developer Program ($99/year). If enrolling as a company, request a free D-U-N-S business number first.",
          "Enroll in the Google Play Console ($25 one-time fee) and complete their identity check.",
          "Fill out your contact, banking, and tax agreements in App Store Connect and Google Play Console if you plan to sell subscriptions or paid apps.",
          "Note for Google Play: New personal developer accounts must complete a mandatory closed beta test with 20 testers for 14 continuous days before publishing to the public."
        ],
        "agentPrompt": "You are the autonomous mobile release engineer for this application. Do NOT ask the user to research store registration parameters\u2014generate and verify the entire technical release specification autonomously.\n\nTASK & OBJECTIVE:\nPrepare and configure our application's exact technical identifiers, bundle ID, versioning scheme, and release metadata required for Apple Developer Program and Google Play Console registrations.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `capacitor.config.ts`, `ios/App/App.xcodeproj`, and `android/app/build.gradle`.\n2. IMPLEMENTATION:\n   - Standardize our unique Bundle Identifier (e.g. `com.company.appname`) in reverse-DNS format across all native build files.\n   - Set initial production semantic versioning (`version: \"1.0.0\"`, `versionCode: 1`, `CFBundleVersion: \"1\"`).\n   - Generate a dedicated production release profile config (`release-config.json` or markdown spec) documenting the official Bundle ID, SKUs, Team IDs, Privacy Policy URLs, and store entitlement requirements.\n3. STORE COMPLIANCE: Ensure bundle IDs and package names never use protected Apple/Google trademark prefixes. Confirm Google Play closed testing track preparation (20 testers for 14 continuous days).\n4. VERIFICATION: Verify that `capacitor.config.ts` matches Xcode and Gradle identifiers perfectly with zero mismatches during `npx cap sync`.",
        "commonRejectionTraps": [
          "Waiting until launch week to apply for developer accounts, only to be held up by identity verification for weeks.",
          "Leaving tax and banking agreements unsigned, which prevents In-App Purchases from working.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your Apple Developer Program membership active and approved?",
          "Is your Google Play Console identity and payment profile verified?"
        ],
        "whatHappensNext": "Once you complete this requirement, register official accounts with Apple and Google so you have permission to publish apps., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p1-monetization-model",
        "phaseId": "phase-1",
        "title": "Plan How Your App Makes Money (Store Rules)",
        "shortDescription": "Choose how users pay, following Apple and Google official payment rules.",
        "category": "legal",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "If you charge for digital features (like subscriptions, extra tools, or premium content), you must use Apple and Google official In-App Purchases. Putting external links like Stripe or PayPal to unlock digital features in the app will get your app banned.",
        "implementationSteps": [
          "Classify your offerings: Digital features and subscriptions MUST use Apple and Google In-App Purchases (15% to 30% store fee). Physical goods (like selling clothes or food delivery) can use Stripe.",
          "Sign up for the Apple Small Business Program to lower Apple's commission from 30% down to 15%.",
          "Enroll in Google Play's 15% tier for your first $1M in annual earnings."
        ],
        "agentPrompt": "You are the autonomous mobile monetization and commerce architect. Do NOT ask the user to write payment logic or research guidelines\u2014implement the store-compliant monetization architecture autonomously in our codebase.\n\nTASK & OBJECTIVE:\nDesign and implement the digital commerce architecture for our mobile application, ensuring 100% compliance with Apple App Store Review Guideline 3.1.1 and Google Play Billing policy.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan the app for any payment buttons, checkout flows, subscription paywalls, or external links.\n2. IMPLEMENTATION:\n   - For all digital unlocks, premium features, and recurring subscriptions, wire exclusively to native In-App Purchases (StoreKit 2 / Google Play Billing).\n   - Strictly remove any web payment buttons (Stripe checkout, PayPal, external payment web links) for digital goods inside the app.\n   - Implement entitlement state management: create a reactive store/hook (`useSubscription` or `useEntitlements`) that unlocks features instantly upon successful purchase receipt validation.\n3. STORE COMPLIANCE: Digital goods sold inside mobile apps MUST use Apple/Google IAP. External payment links for digital services will trigger immediate rejection under Guideline 3.1.1.\n4. VERIFICATION: Verify that paywalls clearly display subscription pricing, billing cycle, trial terms, and that feature gates correctly toggle based on entitlement state without build errors.",
        "commonRejectionTraps": [
          "Adding a link that says \"Go to our website to buy a subscription\" inside the mobile app is an instant rejection under Apple Guideline 3.1.1.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are all digital upgrades and subscriptions set up through official store In-App Purchases?",
          "Have you enrolled in the Apple Small Business Program to cut store fees to 15%?"
        ],
        "whatHappensNext": "Once you complete this requirement, choose how users pay, following Apple and Google official payment rules., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p1-duns-organization",
        "phaseId": "phase-1",
        "title": "Get Your D-U-N-S Number Early for Organization Accounts",
        "shortDescription": "Obtain Dun & Bradstreet verification early if enrolling as an LLC or company.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "If you enroll as an organization or company on Apple Developer or Google Play Console, you must provide a Dun & Bradstreet (D-U-N-S) number. Dun & Bradstreet verification takes 14 to 30 days. Waiting until launch week will stall your entire release.",
        "implementationSteps": [
          "Search the Dun & Bradstreet lookup tool for your legal entity name and exact registered address.",
          "If not found, request a free D-U-N-S number on the Apple Developer D-U-N-S request portal.",
          "Ensure your legal company name, jurisdiction, and authorized signatory match government incorporation documents exactly."
        ],
        "agentPrompt": "You are the autonomous mobile legal and operations specialist. Do NOT ask the user to research government registries\u2014prepare the complete organizational identity and Apple Developer enrollment package autonomously.\n\nTASK & OBJECTIVE:\nAudit and prepare our legal organization entity details, Dun & Bradstreet (D-U-N-S) registration verification, and Apple Developer Organization enrollment request package.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE & IDENTITY AUDIT: Verify that our application bundle ID, legal entity name, and company website match across all project documentation and configuration files.\n2. IMPLEMENTATION:\n   - Prepare a complete organizational verification checklist (`docs/organization-enrollment.md`) detailing: Exact Legal Entity Name (must match government business registration), D-U-N-S Number, Legal Entity Identifier, official domain email address (free webmail like @gmail.com is rejected by Apple for organizations), and public website URL with matching SSL certificate.\n   - Verify that company website features terms, privacy policy, and product overview matching the app.\n3. STORE COMPLIANCE: Apple strictly requires organizations to have a valid D-U-N-S number and verified legal authority to enroll. Mismatched names trigger weeks of manual identity delays.\n4. VERIFICATION: Ensure all company naming and support URLs in `capacitor.config.ts` and `package.json` match official legal entity records.",
        "commonRejectionTraps": [
          "Submitting an Apple Developer organization application where the company name doesn't match the D-U-N-S database down to the punctuation, triggering automatic account rejection.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Do you have an active D-U-N-S number matching your legal company name and address?",
          "Have you verified whether your Apple Developer account is Individual or Organization?"
        ],
        "whatHappensNext": "Once you complete this requirement, obtain Dun & Bradstreet verification early if enrolling as an LLC or company., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p1-bundle-id-naming",
        "phaseId": "phase-1",
        "title": "Select a Unique, Permanent App Bundle ID and Store Display Name",
        "shortDescription": "Lock in your reverse-domain identifier and verify trademark availability before writing code.",
        "category": "functionality",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Your Bundle Identifier (e.g., com.company.appname) cannot be changed once uploaded to App Store Connect or Google Play. If you use a placeholder like com.example, your push certificates, universal links, and analytics will be permanently locked or broken.",
        "implementationSteps": [
          "Choose a reverse-domain notation bundle ID: com.[company].[appname] using lowercase alphanumeric characters.",
          "Register the App ID in the Apple Developer Certificates, Identifiers & Profiles portal.",
          "Configure the exact bundle ID in capacitor.config.ts, project.pbxproj, and Android build.gradle."
        ],
        "agentPrompt": "You are the autonomous mobile systems architect. Do NOT ask the user to configure identifiers\u2014audit and standardize our application bundle ID and display names autonomously.\n\nTASK & OBJECTIVE:\nAudit and standardize our application's App Bundle ID, internal package name, and user-facing App Display Name across all native and web configuration files to ensure permanent, collision-free naming.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `capacitor.config.ts`, `ios/App/App.xcodeproj/project.pbxproj`, `ios/App/App/Info.plist`, and `android/app/build.gradle`.\n2. IMPLEMENTATION:\n   - Enforce permanent reverse-DNS format (e.g. `com.company.appname`) with zero placeholder prefixes (no `com.example`, `com.test`, or temporary names).\n   - Verify that `CFBundleDisplayName` in `Info.plist` and `app_name` in Android `strings.xml` cleanly match the public marketing title (under 30 characters).\n   - Ensure the Bundle ID is strictly synchronized between Capacitor, Xcode, and Android Gradle files.\n3. STORE COMPLIANCE: Bundle IDs cannot be changed once an app is created in App Store Connect or Google Play Console. Collisions or dummy identifiers require recreating the store entry from scratch.\n4. VERIFICATION: Run `npx cap sync` and confirm that bundle identifiers and display names synchronize with zero mismatches or warnings.",
        "commonRejectionTraps": [
          "Uploading a binary with 'com.example' or 'test' in the bundle ID, which Apple Connect rejects automatically.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your bundle ID unique and registered in Apple Developer Certificates & Identifiers?",
          "Is the identical bundle ID configured in all native project files?"
        ],
        "whatHappensNext": "Once you complete this requirement, lock in your reverse-domain identifier and verify trademark availability before writing code., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-2",
    "number": 2,
    "title": "Design, Layout & Mobile Comfort",
    "shortTitle": "Design & Comfort",
    "description": "Make your app effortless and comfortable to use on all phone sizes, following official Apple and Google design guidelines.",
    "iconName": "Palette",
    "items": [
      {
        "id": "p2-design-inspiration",
        "phaseId": "phase-2",
        "title": "Design Inspiration & UI Benchmarking (Without Copyright Infringement)",
        "shortDescription": "Take screenshots of top-tier apps you admire to benchmark layouts, user flows, and spacing without copying copyrighted assets.",
        "category": "design",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Studying successful mobile apps helps you identify proven UX patterns (navigation hierarchy, card spacing, thumb-friendly actions). Taking screenshots to study visual structure is standard industry practice\u2014just ensure you never copy brand logos, trademarked names, or unique illustrations.",
        "whatHappensNext": "You will have a clear visual benchmark and reference moodboard for your app screens, ensuring your interface feels familiar, polished, and intuitive while remaining 100% legally original.",
        "directLink": {
          "label": "Mobbin - Mobile Design Patterns",
          "url": "https://mobbin.com/"
        },
        "videoUrl": {
          "title": "How Top Designers Benchmark Mobile UI Patterns Ethically",
          "url": "https://www.youtube.com/results?search_query=how+to+benchmark+mobile+app+ui+design+mobbin"
        },
        "implementationSteps": [
          "Take screenshots of 3 to 5 premier apps in your category to analyze their onboarding flow, tab layout, and spacing hierarchy.",
          "Use free design inspiration resources like Mobbin, Page Flows, Dribbble, and Apple Design Award winners.",
          "Identify the architectural structure: where do they place primary actions? How do they handle empty states and cards?",
          "Create 100% original graphics, typography, icons, and color palettes\u2014never copy competitor brand assets, trademarked names, or protected illustrations.",
          "Ensure your user flow solves your user's specific problem faster than the apps you analyzed."
        ],
        "agentPrompt": "You are the autonomous mobile product designer. Do NOT ask the user to research UI patterns\u2014benchmark the target category and implement an original, world-class mobile design system autonomously.\n\nTASK & OBJECTIVE:\nEstablish an original, premium visual design system inspired by leading iOS applications (fluid spacing, high-contrast typography, clear hierarchy) without copying any proprietary competitor trademarks or copyrighted assets.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. DESIGN AUDIT: Analyze standard mobile navigation patterns for this app category (bottom liquid tab dock, clean card margins, fluid press feedback).\n2. IMPLEMENTATION: Build an authentic, modern design system using standard Apple 8pt spatial grid (padding: 8px, 16px, 24px, 32px), clean border radii (16px cards, 24px/32px squircles), and accessible typography.\n3. LEGAL SAFETY: All iconography must utilize open-source Lucide vector icons or custom SVG graphics. Zero competitor logos, trademarked names, or copyrighted artwork.\n4. VERIFICATION: Ensure screens render with balanced visual hierarchy, fluid touch states, and zero layout overlap across all device sizes.",
        "commonRejectionTraps": [
          "Directly copying competitor logos, distinctive branding, or copyrighted character artwork, which triggers immediate trademark rejection and legal takedowns.",
          "Copying a design so closely that users might be confused about the app's genuine creator (rejected under Apple Guideline 4.1 Copycats).",
          "Ignoring category-standard mobile conventions (e.g. putting back buttons in strange places), confusing reviewers and real users."
        ],
        "verificationQuestions": [
          "Are all icons, graphics, and illustrations 100% original or open-source?",
          "Does your app layout follow proven, intuitive mobile design patterns?"
        ]
      },
      {
        "id": "p2-liquid-glass",
        "phaseId": "phase-2",
        "title": "Apple Liquid Glass & Fluid Tactile Motion (iPhone 18 / iOS Standard)",
        "shortDescription": "Incorporate modern translucent materials, specular refraction, spring-driven gesture mechanics, and responsive press feedback.",
        "category": "design",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Modern iOS interfaces rely on physical depth, layered translucency (backdrop-blur), and spring physics. When an interface responds instantaneously to touch without artificial delay, it stops feeling like a computer and starts feeling like a natural extension of the user.",
        "whatHappensNext": "Your application feels alive and responsive in the user's hand, matching the tactile physical quality of authentic Apple system apps.",
        "directLink": {
          "label": "Apple HIG - Materials & Fluid Motion",
          "url": "https://developer.apple.com/design/human-interface-guidelines/materials"
        },
        "videoUrl": {
          "title": "Designing Fluid Interfaces - Apple WWDC Masterclass",
          "url": "https://www.youtube.com/results?search_query=designing+fluid+interfaces+apple+wwdc"
        },
        "implementationSteps": [
          "Implement layered translucency using CSS `backdrop-filter: blur(20px)` and subtle translucent background fills (e.g. `rgba(255, 255, 255, 0.8)`).",
          "Add specular refraction borders: subtle 1px hairline borders (`rgba(255, 255, 255, 0.7)` on top and `rgba(0, 0, 0, 0.08)` on bottom) to simulate physical glass edges.",
          "Eliminate tap latency: bind press feedback to `:active` pointer-down so buttons scale instantly (`transform: scale(0.97)`) on contact rather than waiting for touch-up.",
          "Apply Apple critically damped spring transitions (`cubic-bezier(0.25, 1, 0.5, 1)`) for drawers, sheet expansions, and sliding pills.",
          "Trigger subtle native tactile haptics via Capacitor Haptics on meaningful state transitions and completion toggles."
        ],
        "agentPrompt": "You are the autonomous Apple fluid interface engineer. Do NOT ask the user to write animation curves\u2014implement Apple Liquid Glass materials and fluid tactile motion autonomously across our application.\n\nTASK & OBJECTIVE:\nElevate the app's UI to authentic Apple Liquid Glass standards: translucent glass materials, subtle specular refraction highlights, spring-driven animations, and instant-response touch feedback.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. TRANSLUCENT MATERIALS: Apply `backdrop-blur-2xl` and semi-transparent gradients to floating navigation bars, card headers, and bottom docks.\n2. GLASS EDGES: Add specular hairline border highlights (`border border-white/70 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95)]`).\n3. INSTANT PRESS DYNAMICS: Implement `.apple-press` styling across all clickable buttons (`active:scale-[0.96] transition-transform duration-120 ease-out`).\n4. SPRING MECHANICS: Use critically damped spring cubic-beziers (`cubic-bezier(0.25, 1, 0.5, 1)`) for collapsible accordion drawers and modal popups.\n5. TACTILE HAPTICS: Ensure `@capacitor/haptics` triggers light impact feedback on primary button taps and milestone celebrations.\n6. VERIFICATION: Test in mobile viewport. Confirm smooth 60fps animations with zero dropped frames.",
        "commonRejectionTraps": [
          "Heavy dark drop shadows that look dated and amateurish instead of modern subtle multi-tier Apple elevation.",
          "Sluggish touch response caused by artificial click delays or transitions that lock out user input during animation.",
          "Excessive blur filters on older devices that cause battery drain or frame stutter."
        ],
        "verificationQuestions": [
          "Do buttons depress immediately on touch without noticeable delay?",
          "Does the floating navigation bar have subtle translucent liquid glass blur?"
        ]
      },
      {
        "id": "p2-touch-targets",
        "phaseId": "phase-2",
        "title": "Make Buttons Easy to Tap (Minimum 44x44 points)",
        "shortDescription": "Ensure every clickable icon, button, and link is large enough to tap comfortably with a thumb.",
        "category": "design",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "Apple HIG - Touch Targets & Inputs",
          "url": "https://developer.apple.com/design/human-interface-guidelines/inputs"
        },
        "whyItMatters": "Cramped, tiny buttons frustrate users who accidentally tap the wrong thing. Reviewers test apps on physical phones and reject apps that feel clumsy or hard to navigate.",
        "implementationSteps": [
          "Ensure all buttons, close icons (\"X\"), and list items have a tappable area of at least 44x44 points on iOS and 48x48 dp on Android.",
          "If an icon looks visually small, expand its invisible touch padding so it remains easy to hit.",
          "Keep at least 8 points of breathing room between adjacent buttons so users do not tap both at once."
        ],
        "agentPrompt": "You are the autonomous mobile UI/UX engineer. Do NOT ask the user to adjust button dimensions\u2014audit and refactor touch targets across the entire codebase autonomously.\n\nTASK & OBJECTIVE:\nAudit every interactive button, icon button, tab bar item, checkbox, and list row across all screens to guarantee a minimum tappable touch target area of at least 44x44 points on Apple iOS and 48x48 dp on Android.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect all button and clickable icon elements across all components. Identify any small icons (e.g., 16px-24px close icons, back buttons, disclosure arrows) that lack sufficient tap padding.\n2. IMPLEMENTATION:\n   - Apply minimum touch target constraints: ensure all interactive elements enforce at least `min-w-[44px] min-h-[44px]` or generous invisible padding (`p-2.5` or `-m-2 p-2`) around small icons.\n   - Enforce at least 8 points of spacing between neighboring interactive buttons to prevent accidental mis-taps.\n   - Add Apple-grade fluid touch feedback to every clickable element (`active:scale-[0.97] transition-transform duration-100`).\n3. STORE COMPLIANCE: Complies with Apple Human Interface Guidelines and Google Material 3 touch target standards. Prevents user frustration and reviewer rejection under Apple Guideline 4.0 (Design).\n4. VERIFICATION: Test touch responsiveness across mobile viewports. Ensure `tsc --noEmit` passes with zero errors.",
        "commonRejectionTraps": [
          "Tiny close buttons (\"X\") in modal popups that take multiple frustrated taps to close.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have you tested tapping all buttons with your real thumb on a phone screen?",
          "Do all interactive touch targets meet or exceed 44x44 points?"
        ],
        "whatHappensNext": "Once you complete this requirement, ensure every clickable icon, button, and link is large enough to tap comfortably with a thumb., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p2-safe-areas",
        "phaseId": "phase-2",
        "title": "Keep Content Inside Screen Safe Areas (Avoid Notch & Bars)",
        "shortDescription": "Prevent text and buttons from hiding behind the camera notch, Dynamic Island, or home bar.",
        "category": "design",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "If headers slide underneath the camera cutout or buttons sit directly behind the phone home indicator bar, the app looks broken and amateurish.",
        "implementationSteps": [
          "Use system safe area insets for padding at the top and bottom of screens.",
          "Never hardcode fixed pixel numbers like 44px or 48px because different phone models have different notch sizes.",
          "Ensure scrollable lists flow cleanly beneath navigation bars while keeping interactive buttons in full view."
        ],
        "agentPrompt": "You are the autonomous mobile layout specialist. Do NOT ask the user to adjust padding\u2014audit and update all screen layouts autonomously to respect mobile hardware safe-area insets.\n\nTASK & OBJECTIVE:\nConfigure our application layout, navigation bars, modal dialogs, and floating action buttons to respect mobile safe-area insets on modern mobile screens.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `index.html`, root layouts, top headers, floating action buttons, and bottom tab navigation bars.\n2. IMPLEMENTATION:\n   - Ensure the viewport meta tag includes `viewport-fit=cover` in `index.html`.\n   - Apply `env(safe-area-inset-top)` (or `pt-safe`) to all top headers, sticky navigation bars, and modal close buttons so they never clip into the Dynamic Island, camera notch, or status bar.\n   - Apply `env(safe-area-inset-bottom)` (or `pb-safe`) to bottom navigation bars, fixed toolbars, and primary call-to-action buttons so they stay cleanly above the iPhone home indicator bar.\n   - Test both portrait and landscape orientation layouts.\n3. STORE COMPLIANCE: Apple reviewers will reject apps immediately under Guideline 4.0 if text or navigation buttons are obscured by the notch or home indicator.\n4. VERIFICATION: Inspect layout rendering in mobile preview mode, ensuring zero overlapping text or clipped action buttons.",
        "commonRejectionTraps": [
          "Placing a button at the bottom of the screen so close to the home swipe bar that tapping the button triggers the phone home gesture instead.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is the app tested on phones with camera cutouts (like iPhone Dynamic Island)?",
          "Are bottom buttons easy to tap without interfering with the system home bar?"
        ],
        "whatHappensNext": "Once you complete this requirement, prevent text and buttons from hiding behind the camera notch, Dynamic Island, or home bar., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p2-dynamic-type",
        "phaseId": "phase-2",
        "title": "Support Large Text Settings (Accessibility Font Scaling)",
        "shortDescription": "Make sure your text scales cleanly when users increase font size in their phone settings.",
        "category": "design",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Over 30% of smartphone users increase their system text size for better readability. If your app ignores this or cuts text off into \"...\", users with visual needs cannot use it.",
        "implementationSteps": [
          "Use responsive font styles rather than rigid fixed pixel sizes for text blocks.",
          "Allow containers, cards, and buttons to expand vertically when text becomes larger.",
          "Allow labels to wrap onto multiple lines instead of clipping text."
        ],
        "agentPrompt": "You are the autonomous accessibility and typography engineer. Do NOT ask the user to rewrite text styles\u2014audit and refactor the typography system autonomously across our application.\n\nTASK & OBJECTIVE:\nRefactor our text styling and container layouts to fully support system accessibility font scaling (Apple Dynamic Type and Android font scaling) without UI breakage.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan all component styles for fixed pixel container heights (`h-10`, `h-12`, `h-16`) wrapping text labels, fixed `max-lines` without scrollability, or text with `overflow: hidden` without fallback wrapping.\n2. IMPLEMENTATION:\n   - Replace fixed container heights on buttons, cards, and list rows with flexible min-heights (`min-h-[44px]`) and auto-expanding padding (`py-3 px-4`).\n   - Allow text to wrap cleanly onto multiple lines (`break-words`, `whitespace-normal`) rather than truncating with unreadable ellipsis when the user scales system fonts up.\n   - Ensure critical user actions and labels remain completely legible and operable at the largest accessibility text sizes (up to 200% zoom).\n3. STORE COMPLIANCE: Required by Apple Accessibility Human Interface Guidelines. Reviewers test apps under Accessibility settings with Large Text enabled.\n4. VERIFICATION: Test scaling font sizes in CSS. Confirm zero overlapping containers and zero unreadable text truncation.",
        "commonRejectionTraps": [
          "Text overflowing out of buttons or headers truncating critical words into \"...\" when accessibility font size is turned up.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the app remain readable and easy to navigate at larger font sizes?",
          "Do all cards and buttons expand naturally without cutting off words?"
        ],
        "whatHappensNext": "Once you complete this requirement, make sure your text scales cleanly when users increase font size in their phone settings., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p2-dark-mode",
        "phaseId": "phase-2",
        "title": "Ensure Clear Colors in Both Light and Dark Mode",
        "shortDescription": "Deliver a great visual experience whether the user has light mode or dark mode turned on.",
        "category": "design",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Users expect apps to match their phone theme. If your app has hardcoded white text on a light background or black text on a dark card, content becomes completely invisible.",
        "implementationSteps": [
          "Use theme-aware color variables that automatically adjust for light and dark modes.",
          "Check color contrast: text should always stand out clearly against its background (at least 4.5 to 1 contrast).",
          "Verify that all icons and images remain clearly visible in both light and dark themes."
        ],
        "agentPrompt": "You are the autonomous design systems engineer. Do NOT ask the user to pick colors\u2014audit and implement comprehensive Light and Dark Mode theme support autonomously.\n\nTASK & OBJECTIVE:\nImplement seamless Light Mode and Dark Mode support across the entire app, guaranteeing high-contrast legibility that meets or exceeds WCAG AA standards (minimum 4.5:1 contrast ratio) in both environments.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan all CSS classes and component styles for hardcoded color values (`text-gray-500`, `bg-white`, `text-black`) that do not adapt dynamically to the theme.\n2. IMPLEMENTATION:\n   - Use theme-aware semantic color utility classes (`bg-white dark:bg-[#121216]`, `text-slate-900 dark:text-white`, `border-slate-200 dark:border-white/10`).\n   - Audit text contrast: ensure body text has at least a 4.5:1 contrast ratio against card backgrounds, and large headlines have at least 3.0:1 in both Light and Dark modes.\n   - Ensure form inputs, modal dialogs, sheet overlays, and drop-down menus automatically render with appropriate background and text contrast.\n3. STORE COMPLIANCE: Apple HIG mandates that apps supporting dark mode must provide a coherent, high-contrast, effortless reading experience without hard-to-read low-contrast text.\n4. VERIFICATION: Toggle system dark mode preference and confirm every screen, card, and input remains crisp, clear, and perfectly readable.",
        "commonRejectionTraps": [
          "White cards showing light gray text that becomes totally invisible when dark mode is enabled.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have you clicked through every screen in both Light and Dark mode?",
          "Is every piece of text easy to read with high contrast?"
        ],
        "whatHappensNext": "Once you complete this requirement, deliver a great visual experience whether the user has light mode or dark mode turned on., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p2-app-icon",
        "phaseId": "phase-2",
        "title": "Create & Export Master App Icons (Xcode & Google Play)",
        "shortDescription": "Generate 1024x1024px PNG for iOS AppIcon.appiconset (no alpha) and 512x512px icon for Google Play.",
        "category": "design",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Your app icon is the first thing users see on the store and their home screen. Format mistakes (like transparent backgrounds or pre-curved corners) cause build errors in Xcode.",
        "implementationSteps": [
          "iOS: Create a crisp 1024x1024px PNG image with NO transparency and sharp square corners (iOS rounds the corners automatically).",
          "Android: Create an Adaptive Icon with a separate background layer and foreground artwork inside the central safe circle.",
          "Provide a clean monochrome variant so Android 13+ can tint your icon with the user's wallpaper theme."
        ],
        "agentPrompt": "You are the autonomous mobile production engineer. Do NOT ask the user to format icon layers\u2014configure production-grade icon assets for both Apple and Android platforms autonomously.\n\nTASK & OBJECTIVE:\nGenerate, format, and configure production-ready app icon asset catalogs for Apple iOS and adaptive icon resources for Android.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `ios/App/App/Assets.xcassets/AppIcon.appiconset` and `android/app/src/main/res/mipmap-*`.\n2. IMPLEMENTATION:\n   - For Apple iOS: Configure a crisp 1024x1024px PNG icon with zero alpha transparency (no transparent background) and sharp 90-degree square corners. (Xcode rejects icons with transparent pixels or pre-rounded corners).\n   - For Android: Configure modern adaptive icons with distinct foreground layer (432x432px centered within a 108dp safe zone), background layer (color or pattern), and a monochrome vector icon for Android 13+ Material You themed launchers.\n   - Configure `Contents.json` in Xcode asset catalog and `ic_launcher.xml` in Android res folder.\n3. STORE COMPLIANCE: Apple App Store upload will fail validation with \"Invalid App Store Icon\" if transparency exists. Google Play requires adaptive icon format.\n4. VERIFICATION: Verify that icon configuration files exist in native folders and that asset catalogs pass Xcode validation.",
        "commonRejectionTraps": [
          "Uploading an iOS icon with transparent edges (Xcode rejects with \"Invalid App Store Icon\").",
          "Pre-rounding the corners of your icon before uploading.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your iOS icon a solid square 1024x1024px PNG with zero transparent pixels?",
          "Does your Android adaptive icon look sharp without clipping edges?"
        ],
        "whatHappensNext": "Your app displays a crisp, memorable icon on user home screens, in notifications, in Xcode archives, and in the App Store and Google Play storefronts.",
        "directLink": {
          "label": "IconKitchen - App Icon Generator",
          "url": "https://iconkitchen.com/"
        },
        "videoUrl": {
          "title": "How to Create App Icons for iOS Xcode and Google Play",
          "url": "https://www.youtube.com/results?search_query=create+app+icons+ios+xcode+google+play"
        }
      },
      {
        "id": "p2-launch-splash",
        "phaseId": "phase-2",
        "title": "Design a Smooth Launch Screen (No Fake Delays)",
        "shortDescription": "Show a simple, clean screen while the app loads into memory without artificial pauses.",
        "category": "design",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "The launch screen bridges the brief fraction of a second while the phone loads your code. Adding artificial 3-second delays or marketing popups annoys users and violates guidelines.",
        "implementationSteps": [
          "iOS: Use a simple launch screen matching your app background color and logo.",
          "Android: Use the official system Splash Screen API.",
          "Never put ads, progress bars, or fake multi-second delays on the launch screen."
        ],
        "agentPrompt": "You are the autonomous mobile performance engineer. Do NOT ask the user to design splash screens\u2014configure a native, instantaneous launch screen autonomously in our mobile project.\n\nTASK & OBJECTIVE:\nConfigure a clean, native launch screen for our application that matches the app's first screen background color and transitions instantly without artificial sleep delays or fake loading spinners.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `ios/App/App/Base.lproj/LaunchScreen.storyboard`, Android splash screen styles in `styles.xml`, and `capacitor.config.ts`.\n2. IMPLEMENTATION:\n   - Configure the native iOS launch storyboard and Android Splash theme with a solid background color identical to the first rendered screen background.\n   - Center our application logo cleanly without stretching or distortion across different device aspect ratios.\n   - Eliminate any artificial delay in JavaScript initialization: remove any `setTimeout` artificial splash delays. Hide the native splash screen immediately when the first interactive DOM element renders using `SplashScreen.hide()`.\n3. STORE COMPLIANCE: Apple Guideline 4.0 discourages artificial splash delays. Launch screens should convey instant responsiveness rather than an advertising billboard.\n4. VERIFICATION: Test app cold launch. Confirm the launch screen transitions seamlessly into the first screen with zero flicker and zero artificial delays.",
        "commonRejectionTraps": [
          "Adding a forced 3-second timer before showing the main screen.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the launch screen transition seamlessly into your app without flashing white?",
          "Does the app open immediately without artificial delays?"
        ],
        "whatHappensNext": "Once you complete this requirement, show a simple, clean screen while the app loads into memory without artificial pauses., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p2-empty-states",
        "phaseId": "phase-2",
        "title": "Design Informative Empty States and Skeleton Loaders",
        "shortDescription": "Prevent blank screens when lists are empty or data is loading for new accounts.",
        "category": "design",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "When a user first opens your app, their lists, feeds, or carts are empty. Showing a blank white screen makes Apple reviewers think the app has crashed or is broken, triggering Guideline 4.2 rejections.",
        "implementationSteps": [
          "Add clean empty-state views for every list screen with an encouraging call-to-action button (e.g. \"Create Your First Item\").",
          "Implement animated skeleton placeholder cards for data loading instead of full-screen spinners or blank views.",
          "Include clear reload buttons when network queries return no results or fail."
        ],
        "agentPrompt": "You are the autonomous mobile UI/UX designer and frontend engineer. Do NOT ask the user to design empty states\u2014build informative, interactive empty states and skeleton loaders autonomously across all screens.\n\nTASK & OBJECTIVE:\nDesign and implement animated skeleton loading placeholders and encouraging, interactive empty-state components across all lists, feeds, and dashboards in the application.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect every component that renders a list, table, feed, or async query (e.g., projects, items, notifications, favorites).\n2. IMPLEMENTATION:\n   - Build a reusable `EmptyState` component with: 1) A clean, non-intrusive SVG or Lucide icon; 2) A friendly, informative headline explaining why the screen is empty; 3) A helpful secondary explanation; and 4) A prominent call-to-action button (e.g. \"Create Your First Item\", \"Add Requirement\") that opens the creation flow directly.\n   - Build an animated pulse/shimmer `SkeletonLoader` component to display during network fetches instead of jarring full-screen spinners or blank white screens.\n   - Add empty-state recovery: if a filter or search produces zero results, display \"No matching items found\" with a \"Clear Filters\" button.\n3. STORE COMPLIANCE: Apple Guideline 4.2 (Minimum Functionality) reviewers reject apps where new accounts encounter dead-end blank screens that appear broken or unresponsive.\n4. VERIFICATION: Test empty states and skeleton loaders by viewing screens with zero data. Confirm call-to-action buttons trigger creation flows and `tsc --noEmit` passes cleanly.",
        "commonRejectionTraps": [
          "Submitting an app where newly registered users see blank white screens, rejected under Apple Guideline 4.2 (Minimum Functionality).",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does every list view display a clear empty state with a call-to-action when there is no data?",
          "Do screens show animated skeleton placeholders while fetching data?"
        ],
        "whatHappensNext": "Once you complete this requirement, prevent blank screens when lists are empty or data is loading for new accounts., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p2-keyboard-avoidance",
        "phaseId": "phase-2",
        "title": "Ensure Software Keyboard Never Obscures Form Fields & Inputs",
        "shortDescription": "Keep text inputs, textareas, and submit buttons visible when the virtual keyboard pops up.",
        "category": "design",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "On mobile devices, the virtual keyboard takes up half the viewport. If input fields or submit buttons get covered behind the keyboard, users cannot log in, register, or complete purchases.",
        "implementationSteps": [
          "Wrap input forms in auto-scrolling containers that adjust padding-bottom when the virtual keyboard opens.",
          "Use the Keyboard API or keyboard-aware scroll views to scroll active inputs smoothly into view.",
          "Add a tap-outside-to-dismiss gesture and iOS keyboard toolbar accessories for easy input completion."
        ],
        "agentPrompt": "You are the autonomous mobile layout and interaction engineer. Do NOT ask the user to fix input scrolling\u2014implement automatic keyboard avoidance and outside-tap dismissal autonomously.\n\nTASK & OBJECTIVE:\nAudit all form fields, input dialogs, textareas, and login screens to guarantee that the virtual software keyboard never obscures active input fields or submit buttons.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect all modal dialogs, account forms, search bars, and input screens across the application.\n2. IMPLEMENTATION:\n   - Implement keyboard avoidance: when a user focuses any input field or textarea, automatically scroll the active input smoothly into the visible viewport with at least 20px of breathing room above the software keyboard.\n   - Implement outside-tap keyboard dismissal: tapping anywhere on the background outside an active input must automatically dismiss the virtual keyboard.\n   - Configure Capacitor Keyboard plugin settings (`resize: KeyboardResize.Body` or `KeyboardResize.Native`) in `capacitor.config.ts` to ensure proper webview resizing on iOS and Android.\n   - Ensure the primary \"Save\" or \"Submit\" button remains accessible or pinned above the keyboard.\n3. STORE COMPLIANCE: Obscured form fields and keyboards that cannot be dismissed represent major usability defects that prompt immediate reviewer rejection under Apple Guideline 4.0.\n4. VERIFICATION: Test focusing bottom inputs on mobile viewports. Confirm smooth scrolling above the keyboard and tap-to-dismiss behavior with zero errors.",
        "commonRejectionTraps": [
          "Input fields or submit buttons getting pushed under the keyboard on smaller iPhones (like iPhone SE), causing reviewers to reject for broken UI.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Can you see and tap the submit button while the keyboard is visible on an iPhone SE?",
          "Does tapping outside the keyboard smoothly dismiss it?"
        ],
        "whatHappensNext": "Once you complete this requirement, keep text inputs, textareas, and submit buttons visible when the virtual keyboard pops up., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-3",
    "number": 3,
    "title": "Core Features & Working Offline",
    "shortTitle": "Core Features & Offline",
    "description": "Ensure your app remembers what the user was doing, works smoothly when internet drops, and handles logins, payments, and account deletion properly.",
    "iconName": "Cpu",
    "items": [
      {
        "id": "p3-process-death",
        "phaseId": "phase-3",
        "title": "Save User Progress When Switching Apps (State Restoration)",
        "shortDescription": "Make sure typed text and current screens aren't lost if the user answers a call or copies an SMS code.",
        "category": "functionality",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "When a user switches to another app, the phone operating system may temporarily pause or close your app in the background to free up memory. If they return and their form is wiped clean, they leave 1-star reviews.",
        "implementationSteps": [
          "Automatically save draft inputs and form progress into local storage as the user types.",
          "Remember which screen the user was viewing so they return right where they left off.",
          "Test by switching between apps and returning to verify nothing was reset."
        ],
        "agentPrompt": "You are the autonomous mobile state architect. Do NOT ask the user to write state persistence\u2014implement comprehensive state restoration autonomously across our application.\n\nTASK & OBJECTIVE:\nImplement robust lifecycle state preservation and restoration so that if the mobile operating system suspends or kills the app in the background while the user answers a call, switches apps, or copies a 2FA code, their active screen, navigation position, and unsaved form inputs are automatically preserved upon return.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect our state management stores, active navigation state, and form input components across all screens.\n2. IMPLEMENTATION:\n   - Create a state restoration manager (`useAutoSaveState` or persistent state middleware) that saves active screen route, tab selection, and form input values to persistent storage on change.\n   - Subscribe to Capacitor `appStateChange` events to persist uncommitted user inputs immediately when `isActive` becomes false.\n   - Upon app cold launch, check for saved restoration state; if valid and recent, restore the user to their exact previous screen and restore their input fields smoothly.\n3. STORE COMPLIANCE: Meets Apple HIG and Android developer quality guidelines for process death handling, preventing user frustration and data loss.\n4. VERIFICATION: Test state restoration by navigating deep into a form, putting the app in the background, and verifying all form values remain intact upon return.",
        "commonRejectionTraps": [
          "App reloading to a blank screen or losing filled-in forms after being put in the background.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "If you switch to another app while typing a form and come back, is your text still there?",
          "Does the app return to the screen you were on instead of jumping back to the home screen?"
        ],
        "whatHappensNext": "Once you complete this requirement, make sure typed text and current screens aren't lost if the user answers a call or copies an SMS code., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-offline-sync",
        "phaseId": "phase-3",
        "title": "Make the App Work Offline When Internet Drops",
        "shortDescription": "Cache data locally so users can still read and use the app in elevators or on subways.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Mobile connections drop all the time. An app that displays a giant full-screen error or crashes whenever Wi-Fi drops feels unreliable.",
        "implementationSteps": [
          "Save data in local storage or an embedded database so the app can open without internet.",
          "Update the screen immediately when the user taps an action, and queue the update to sync to your server when internet returns.",
          "Show a subtle, friendly banner if offline (e.g. \"Working offline\") instead of blocking the screen."
        ],
        "agentPrompt": "You are the autonomous mobile architecture engineer. Do NOT ask the user to build offline storage\u2014implement an offline-first data caching and synchronization layer autonomously.\n\nTASK & OBJECTIVE:\nBuild a robust offline-first architecture for our application so all core features remain functional when the user is in Airplane Mode, an elevator, or experiencing weak connectivity.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect data fetching services, API client utilities, and state stores.\n2. IMPLEMENTATION:\n   - Implement local persistent caching (using IndexedDB, SQLite, or persistent storage) to cache all queried feeds, lists, and user records.\n   - Ensure the UI loads and displays cached records immediately upon screen launch before attempting network requests.\n   - Implement an offline mutation queue: when the user creates or edits records while offline, update the UI optimistically, serialize the action to a local mutation queue, and display a subtle \"Syncing when online\" status indicator.\n   - Listen to network status change events (`Network.addListener`); when connectivity is restored, automatically replay pending mutations in order and synchronize with the server.\n3. STORE COMPLIANCE: Prevents white-screen failures and network crashes during store review (where Apple/Google test in simulated offline/poor network environments).\n4. VERIFICATION: Simulate offline mode in browser dev tools. Verify that all screens render cached data and queued mutations sync seamlessly upon reconnection.",
        "commonRejectionTraps": [
          "App crashing or freezing on an infinite loading spinner when opened in Airplane mode.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the app open and show cached content with Airplane Mode turned on?",
          "Do actions taken offline sync automatically when your connection restores?"
        ],
        "whatHappensNext": "Once you complete this requirement, cache data locally so users can still read and use the app in elevators or on subways., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-network-resilience",
        "phaseId": "phase-3",
        "title": "Handle Weak Internet with Automatic Retry",
        "shortDescription": "Automatically retry failed network calls without double-submitting payments or forms.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "A weak mobile signal can briefly fail a network request. Automatic retry recovers smoothly, and using unique request keys prevents users from being charged twice if a payment call is retried.",
        "implementationSteps": [
          "Add automatic retry with brief pauses for temporary server or network hiccups.",
          "Include a unique request key (idempotency token) on important save and payment requests so retrying never duplicates data.",
          "Always give users a manual \"Tap to Retry\" button if a request permanently fails."
        ],
        "agentPrompt": "You are the autonomous backend-integration engineer. Do NOT ask the user to write retry logic\u2014implement resilient network request handling autonomously across our API client.\n\nTASK & OBJECTIVE:\nImplement automatic request retry with exponential backoff, jitter, and idempotency key headers across all network communications to gracefully survive transient connectivity drops.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect our API client, fetch wrapper, or HTTP request utilities.\n2. IMPLEMENTATION:\n   - Wrap network requests in an automated retry handler for transient errors (HTTP 502, 503, 504, network timeouts, offline drops).\n   - Implement exponential backoff with full jitter: delay retries with formula `delay = min(maxDelay, baseDelay * 2^attempt) + randomJitter` to avoid hammering servers.\n   - Attach a unique UUID `X-Idempotency-Key` header to every state-mutating request (POST, PUT, DELETE) so that retried requests can never cause duplicate purchases, double charges, or duplicate database records.\n3. STORE COMPLIANCE: Guarantees reliability during store review testing and high-traffic launches, eliminating random failure popups.\n4. VERIFICATION: Test network timeout scenarios. Confirm automatic retries execute with backoff and unique idempotency keys, and that `tsc --noEmit` passes.",
        "commonRejectionTraps": [
          "Infinite spinners on poor network connections that never time out or offer a retry button.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the app show clear offline indicators and retry buttons during network failures?",
          "Are duplicate submissions prevented when requests are retried?"
        ],
        "whatHappensNext": "Once you complete this requirement, automatically retry failed network calls without double-submitting payments or forms., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-sign-in-apple",
        "phaseId": "phase-3",
        "title": "Add \"Sign in with Apple\" If Offering Google or Social Login",
        "shortDescription": "Apple requires their sign-in button if you provide any other third-party social logins.",
        "category": "legal",
        "platform": "ios",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Review Guideline 4.8 - Sign in with Apple",
          "url": "https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple"
        },
        "whyItMatters": "If your iOS app lets users log in with Google, Facebook, or other social buttons, Apple strictly requires that you also offer \"Sign in with Apple\" with equal visual prominence.",
        "implementationSteps": [
          "Enable \"Sign in with Apple\" in your Apple Developer Portal and Xcode project.",
          "Place the official Apple Sign-in button right next to or above your other social login buttons.",
          "Properly handle users who choose to hide their email address using Apple's private relay email."
        ],
        "agentPrompt": "You are the autonomous authentication security engineer. Do NOT ask the user to implement authentication\u2014implement native \"Sign in with Apple\" autonomously in our application.\n\nTASK & OBJECTIVE:\nInspect our login and registration system. If third-party social login buttons (Google, Facebook, etc.) are offered, implement native \"Sign in with Apple\" with equal visual prominence strictly adhering to Apple Guideline 4.8.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Check login screens, signup modals, and authentication services for social login providers.\n2. IMPLEMENTATION:\n   - Place the official \"Sign in with Apple\" button alongside other social login options with equal visual prominence, size, and styling.\n   - Integrate native Apple Sign In via Capacitor / Apple Authentication services: handle the authentication credential response (Apple user ID, identity token, authorization code, full name, and private relay email address).\n   - Ensure the backend securely validates Apple's JWT identity token with Apple's public key.\n   - Properly support user accounts created with Apple's \"Hide My Email\" private relay service.\n   - Implement account revocation handling via Apple's `/auth/revoke` endpoint when an account is deleted.\n3. STORE COMPLIANCE: Mandatory under Apple Guideline 4.8. Offering Google or Facebook login without Sign in with Apple triggers an immediate store rejection.\n4. VERIFICATION: Verify Apple ID button rendering and credential response handling with zero TypeScript errors.",
        "commonRejectionTraps": [
          "Offering Google or Facebook login on iOS without Sign in with Apple is an instant rejection under Guideline 4.8.",
          "Hiding the Apple button at the bottom while featuring Google at the top.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is Sign in with Apple offered with equal prominence to other social logins?",
          "Does your backend properly accept Apple's \"@privaterelay.appleid.com\" emails?"
        ],
        "whatHappensNext": "Once you complete this requirement, apple requires their sign-in button if you provide any other third-party social logins., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-account-deletion",
        "phaseId": "phase-3",
        "title": "Include an In-App \"Delete Account\" Button",
        "shortDescription": "Let users delete their account and personal data directly inside the app.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Guideline 5.1.1(v) & Google Play User Data Policy",
          "url": "https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage"
        },
        "whyItMatters": "Both Apple and Google strictly mandate that if an app allows users to create an account, it MUST allow them to delete their account and data entirely inside the app without having to email support.",
        "implementationSteps": [
          "Add a clear \"Delete Account\" button in your Account Settings screen.",
          "Ask for a quick confirmation so users don't delete their account by accident.",
          "Permanently delete their entire record and database data on your backend server (Apple rejects apps that merely soft-delete or deactivate).",
          "If using \"Sign in with Apple\", call Apple's `/auth/revoke` REST API endpoint using your server secret to revoke their authorization grant.",
          "Provide a public web link for account deletion for users who already uninstalled the app (mandated by Google Play)."
        ],
        "agentPrompt": "You are the autonomous mobile security engineer. Do NOT ask the user to write account deletion logic\u2014implement a complete in-app Account Deletion flow autonomously.\n\nTASK & OBJECTIVE:\nImplement an easily accessible, fully functional in-app \"Delete Account\" button in the account/profile settings as strictly mandated by Apple Guideline 5.1.1(v) and Google Play policy.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect user profile screens, account settings components, and authentication stores.\n2. IMPLEMENTATION:\n   - Add a clearly labeled \"Delete Account\" button in the Account / Profile settings section. It must be accessible directly within the app (not forcing the user to send an email or visit a separate web browser page).\n   - Implement a two-step confirmation modal with clear warning explaining that deletion is permanent and irrecoverable.\n   - Upon confirmation: call the backend deletion API to permanently wipe personal user records, revoke OAuth / Apple login tokens, clear all local Keychain/Keystore credentials, and route the user cleanly back to the logged-out welcome screen.\n3. STORE COMPLIANCE: Mandated by Apple Guideline 5.1.1(v) and Google Play account deletion requirement. Missing this flow causes instant app rejection.\n4. VERIFICATION: Test deletion flow in test mode. Confirm tokens and local storage are purged and user is returned to the logged-out state with zero errors.",
        "commonRejectionTraps": [
          "Telling users to \"email support to delete your account\" instead of providing an in-app button is an instant rejection.",
          "Merely disabling or marking the account \"inactive\" instead of completely purging the user's stored personal data from backend servers.",
          "Failing to revoke Apple Sign-in tokens during account deletion."
        ],
        "verificationQuestions": [
          "Can a user initiate account deletion directly inside the app in 2 or 3 taps?",
          "Are all user records and database rows permanently erased on your backend server?",
          "Is a public web link for account deletion ready for your Google Play Data Safety form?"
        ],
        "whatHappensNext": "Once you complete this requirement, let users delete their account and personal data directly inside the app., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-in-app-purchases",
        "phaseId": "phase-3",
        "title": "Set Up Subscriptions with a Clear \"Restore Purchases\" Button",
        "shortDescription": "Show transparent pricing, subscription terms, and an easy restore button on paywalls.",
        "category": "store",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Guideline 3.1.1 & 3.1.2 - In-App Purchase & Subscriptions",
          "url": "https://developer.apple.com/app-store/review/guidelines/#in-app-purchase"
        },
        "whyItMatters": "Over 40% of first-time rejections involve subscription screens: missing a \"Restore Purchases\" button, hiding the subscription renewal terms, or missing clickable links to Terms of Use.",
        "implementationSteps": [
          "Use modern StoreKit 2 on iOS and Google Play Billing on Android.",
          "Put a prominent, clickable \"Restore Purchases\" button on every paywall screen so returning users can reclaim past purchases.",
          "Display clear pricing: price with local currency symbol, renewal duration, billing frequency, and how to cancel in phone settings (FTC Click-to-Cancel transparency).",
          "Include visible, clickable links to your Privacy Policy and Terms of Use (EULA) directly on the paywall screen itself."
        ],
        "agentPrompt": "You are the autonomous mobile monetization engineer. Do NOT ask the user to build paywalls or billing logic\u2014implement native In-App Purchases and auto-renewable subscriptions autonomously.\n\nTASK & OBJECTIVE:\nImplement native in-app subscriptions and digital purchases using StoreKit 2 (iOS) and Google Play Billing (Android), ensuring 100% compliance with Apple Guideline 3.1.2.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect paywall screens, pricing tables, subscription models, and entitlement stores.\n2. IMPLEMENTATION:\n   - Integrate StoreKit 2 / Google Play Billing native plugins to fetch live product pricing from App Store Connect / Play Console.\n   - On the paywall UI, clearly render: subscription title, localized price, billing duration (e.g. \"$4.99 / month\"), trial period length, and auto-renewal notice.\n   - Add a prominent, fully functional \"Restore Purchases\" button that queries previous transactions and restores entitlements with one tap without re-billing.\n   - Add direct, clickable links on the paywall screen to our Privacy Policy and Terms of Use (EULA).\n   - Implement server-side verification using signed JWS transactions and App Store Server Notifications V2.\n3. STORE COMPLIANCE: Paywalls lacking pricing terms, EULA links, or a functional Restore Purchases button trigger instant rejection under Apple Guideline 3.1.2.\n4. VERIFICATION: Test purchase and restore flows in sandbox mode. Verify state transitions and confirm `tsc --noEmit` passes cleanly.",
        "commonRejectionTraps": [
          "Paywall missing a working \"Restore Purchases\" button.",
          "Paywall missing direct, clickable links to Terms of Use (EULA) and Privacy Policy.",
          "Hiding subscription renewal frequency or not explaining how users can cancel before billing.",
          "Hardcoding a \"$\" sign instead of showing the user's local currency returned by the store."
        ],
        "verificationQuestions": [
          "Does the \"Restore Purchases\" button work for previously subscribed users?",
          "Are Terms of Use and Privacy Policy links clickable on every paywall screen?",
          "Does the paywall explain how users can cancel their subscription in phone settings?"
        ],
        "whatHappensNext": "Once you complete this requirement, show transparent pricing, subscription terms, and an easy restore button on paywalls., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-push-notifications",
        "phaseId": "phase-3",
        "title": "Ask for Notification Permission Only When It Makes Sense",
        "shortDescription": "Explain why notifications are helpful before popping up the system permission prompt.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Asking for notification permissions the exact second someone opens the app for the very first time leads to 70%+ rejection rates. Explaining the benefit first doubles opt-in rates.",
        "implementationSteps": [
          "Never pop the system permission alert on raw first cold launch.",
          "Show a friendly, custom in-app screen first (e.g. \"Turn on alerts to know when your order ships\").",
          "Only trigger the real phone permission prompt after the user taps \"Allow\" on your explanation screen."
        ],
        "agentPrompt": "You are the autonomous mobile notification engineer. Do NOT ask the user to configure permissions\u2014implement a contextual, high-converting push notification permission flow autonomously.\n\nTASK & OBJECTIVE:\nImplement a compliant push notification permission strategy that requests notification permission contextually and gracefully explains value before triggering the system prompt.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan the app startup sequence and push notification registration handlers.\n2. IMPLEMENTATION:\n   - Remove any push notification permission prompts from the cold-launch sequence. Never prompt for notification permissions immediately upon first opening the app.\n   - Implement a contextual trigger: prompt the user only after they complete a meaningful action where notifications provide clear value (e.g., setting a reminder, completing a milestone).\n   - Show a custom pre-permission modal / sheet that clearly explains what alerts the user will receive and how they benefit, with \"Allow\" and \"Not Now\" options.\n   - Only call the native system permission dialog (`PushNotifications.requestPermissions()`) after the user taps \"Allow\" on the explanation sheet.\n3. STORE COMPLIANCE: Complies with Apple HIG and Google Play notification permission policies, preventing user drop-off and low opt-in rates.\n4. VERIFICATION: Test first-launch experience. Confirm no system prompts appear on startup and the custom explanation sheet appears only upon contextual trigger.",
        "commonRejectionTraps": [
          "Spamming promotional marketing notifications without user consent.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is the permission prompt delayed until the user performs an action that justifies notifications?",
          "Does the app explain the value before showing the system prompt?"
        ],
        "whatHappensNext": "Once you complete this requirement, explain why notifications are helpful before popping up the system permission prompt., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-deep-linking",
        "phaseId": "phase-3",
        "title": "Set Up Direct Web Links (Universal Links & App Links)",
        "shortDescription": "Make web and email links open directly into the app instead of Safari or Chrome.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "When a user taps an email verification link, invite code, or product link, they should land straight on the right screen inside your app instead of getting stuck in a mobile web browser.",
        "implementationSteps": [
          "Apple Universal Links: Host an `apple-app-site-association` file on your HTTPS website.",
          "Android App Links: Host an `assetlinks.json` file with your signing key fingerprint on your website.",
          "Enable the Associated Domains capability in your Xcode and Android settings."
        ],
        "agentPrompt": "You are the autonomous mobile linking specialist. Do NOT ask the user to configure web routes\u2014implement Universal Links and Android App Links autonomously.\n\nTASK & OBJECTIVE:\nConfigure Universal Links for Apple iOS and App Links for Android so that web URLs matching our domain open directly inside the mobile app without opening the browser.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect routing configuration, URL scheme settings, and deep link event listeners.\n2. IMPLEMENTATION:\n   - Create domain verification files:\n     - `apple-app-site-association` for iOS with `applinks` configuration, App ID, and path patterns.\n     - `assetlinks.json` for Android with package name and SHA-256 certificate fingerprint.\n   - Configure deep link listeners in Capacitor (`App.addListener('appUrlOpen')`): parse incoming URLs, validate and sanitize path and query parameters, and route the user directly to the target screen.\n   - Handle cold launch deep links (when the app is opened via a link from a closed state).\n3. STORE COMPLIANCE: Complies with Apple and Google modern mobile linking specifications, ensuring seamless user experience.\n4. VERIFICATION: Test opening sample deep links. Verify parameter parsing and ensure proper navigation routing with zero crashes.",
        "commonRejectionTraps": [
          "Serving your verification file with an HTTP redirect (Apple's verification crawler will fail).",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does tapping a link to your domain open the app directly on your phone?",
          "Does your domain host the verification files over secure HTTPS without redirects?"
        ],
        "whatHappensNext": "Once you complete this requirement, make web and email links open directly into the app instead of Safari or Chrome., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-haptic-feedback",
        "phaseId": "phase-3",
        "title": "Implement Subtle Apple & Android Tactile Haptics",
        "shortDescription": "Provide responsive, physical feedback for button taps, list selections, and completions.",
        "category": "design",
        "platform": "both",
        "priority": "medium",
        "whyItMatters": "Tactile haptics make mobile apps feel physical, responsive, and authentic to iOS and Android. Modern Apple Human Interface Guidelines encourage light impact haptics on selection toggles, success moments, and destructive warnings.",
        "implementationSteps": [
          "Integrate native haptic engines (@capacitor/haptics or UIImpactFeedbackGenerator).",
          "Trigger light impact haptics on tab switches, toggle changes, and list item selections.",
          "Trigger notification success haptics on task completions and warning vibrations on destructive actions."
        ],
        "agentPrompt": "You are the autonomous mobile interaction engineer. Do NOT ask the user to write vibration logic\u2014implement Apple-grade tactile haptics autonomously across all primary interactive controls.\n\nTASK & OBJECTIVE:\nIntegrate subtle, authentic tactile haptic feedback across all primary touch interactions, switches, completions, and gestures using the Capacitor Haptics API.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect buttons, checkboxes, modal openers, tabs, switches, and completion triggers across the app.\n2. IMPLEMENTATION:\n   - Integrate `@capacitor/haptics`:\n     - Light Impact (`ImpactStyle.Light`): on tab navigation, button taps, and pill toggles.\n     - Medium Impact (`ImpactStyle.Medium`): on copying code/prompts, opening sheets, and modal confirmations.\n     - Notification Success (`NotificationType.Success`): when marking an item complete, saving a project, or finishing a checklist.\n     - Notification Warning (`NotificationType.Warning`): when triggering a destructive action (like deleting a project).\n   - Ensure haptic triggers are wrapped in try-catch blocks to run silently on desktop web environments without throwing errors.\n3. STORE COMPLIANCE: Follows Apple Human Interface Guidelines for tactile response, giving the application the authentic feel of a premium native iOS app.\n4. VERIFICATION: Test on a physical iOS/Android device. Confirm crisp haptic vibrations occur on taps and completions without performance overhead.",
        "commonRejectionTraps": [
          "Overusing continuous heavy vibrations on every minor scroll event, causing user irritation and excessive battery drain.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Do primary buttons and checkboxes give crisp, subtle tactile feedback on physical devices?",
          "Are destructive actions accompanied by a distinct warning vibration?"
        ],
        "whatHappensNext": "Once you complete this requirement, provide responsive, physical feedback for button taps, list selections, and completions., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p3-background-modes",
        "phaseId": "phase-3",
        "title": "Configure Background Execution & Refresh Permissions Accurately",
        "shortDescription": "Declare only background capabilities your app actually uses to prevent Guideline 2.5.4 rejections.",
        "category": "functionality",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Declaring background modes (audio, VoIP, location, background fetch) in UIBackgroundModes without providing clear user functionality is one of Apple's swiftest Guideline 2.5.4 rejections.",
        "implementationSteps": [
          "Open Info.plist and inspect UIBackgroundModes; delete any unused modes (e.g. location, voip, audio).",
          "If background fetch is required for sync, implement BGAppRefreshTask and document exact justification for Apple reviewers.",
          "Ensure battery-draining continuous background loops terminate when the app enters the background."
        ],
        "agentPrompt": "You are the autonomous mobile background execution specialist. Do NOT ask the user to edit Plist keys\u2014audit and configure background modes autonomously in our project files.\n\nTASK & OBJECTIVE:\nAudit `Info.plist` and `AndroidManifest.xml` for background execution modes, removing any unnecessary background declarations and ensuring legitimate background tasks finish within strict OS limits.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `ios/App/App/Info.plist` for `UIBackgroundModes` array and `AndroidManifest.xml` for background services.\n2. IMPLEMENTATION:\n   - Audit `UIBackgroundModes`: remove any unused entries (such as `audio`, `location`, `voip`, or `external-accessory`) unless the core feature genuinely requires continuous background operation.\n   - For legitimate background operations (like silent push data sync or periodic background fetch), ensure handlers strictly complete within Apple's 30-second execution window and call the completion handler promptly (`UIBackgroundFetchResultNewData`).\n   - On Android, ensure WorkManager is utilized for deferrable background jobs instead of lingering foreground services.\n3. STORE COMPLIANCE: Apple Guideline 2.5.4 strictly rejects apps that declare background modes without using them actively or that fail to justify why continuous background execution is needed.\n4. VERIFICATION: Confirm `Info.plist` contains only justified background modes and all background handlers invoke completion callbacks cleanly.",
        "commonRejectionTraps": [
          "Including 'audio' or 'location' in UIBackgroundModes without an active media player or navigation feature triggers instant rejection under Guideline 2.5.4.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are only strictly essential background modes declared in Info.plist?",
          "Do background tasks properly call setTaskCompletedWithSuccess within the iOS execution budget?"
        ],
        "whatHappensNext": "Once you complete this requirement, declare only background capabilities your app actually uses to prevent Guideline 2.5.4 rejections., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-4",
    "number": 4,
    "title": "Privacy, Security & Permission Checks",
    "shortTitle": "Privacy & Security",
    "description": "Keep user data secure, declare required privacy manifests for Apple and Google, and ask only for permissions your app actually needs.",
    "iconName": "ShieldCheck",
    "items": [
      {
        "id": "p4-privacy-manifest",
        "phaseId": "phase-4",
        "title": "Add Apple's Required Privacy Manifest (PrivacyInfo.xcprivacy)",
        "shortDescription": "Declare common APIs and third-party SDKs as mandated by Apple for iOS 17 and newer.",
        "category": "security",
        "platform": "ios",
        "priority": "blocker",
        "storeGuideline": {
          "name": "Apple Privacy Manifest Mandate",
          "url": "https://developer.apple.com/documentation/bundleresources/privacy_manifest_files"
        },
        "whyItMatters": "Apple blocks uploads of any app or update that uses standard phone APIs (like saving basic settings or reading file dates) unless you include a `PrivacyInfo.xcprivacy` file declaring the approved reason.",
        "implementationSteps": [
          "Add a `PrivacyInfo.xcprivacy` file to the root of your Xcode app project.",
          "Declare the reasons for APIs you use (like UserDefaults reason `CA92.1` for saving app preferences).",
          "Declare that your app does not track users across outside websites or third-party apps."
        ],
        "agentPrompt": "You are the autonomous Apple platform security engineer. Do NOT ask the user to write XML\u2014generate and configure an official Apple Privacy Manifest autonomously.\n\nTASK & OBJECTIVE:\nCreate an official Apple Privacy Manifest file (`PrivacyInfo.xcprivacy`) in our iOS project root, declaring all required reasons for accessed system APIs strictly following Apple's mandatory privacy requirements.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Audit all accessed APIs across our codebase and third-party Capacitor plugins.\n2. IMPLEMENTATION:\n   - Create `ios/App/App/PrivacyInfo.xcprivacy` with valid XML plist structure.\n   - Declare required reason codes for all accessed APIs:\n     - `NSPrivacyAccessedAPICategoryUserDefaults`: reason `CA92.1` (access info within app).\n     - `NSPrivacyAccessedAPICategoryFileTimestamp`: reason `C617.1` (access timestamps inside app container).\n     - `NSPrivacyAccessedAPICategoryDiskSpace`: reason `E174.1` (check available space).\n     - `NSPrivacyAccessedAPICategorySystemBootTime`: reason `35F9.1` (measure time deltas).\n   - Set `NSPrivacyTracking` to `<false/>` and provide an empty `NSPrivacyTrackingDomains` array unless cross-app advertising tracking is active.\n   - Declare collected data types (`NSPrivacyCollectedDataTypes`) matching our app's actual data collection.\n3. STORE COMPLIANCE: Apple strictly rejects all iOS app updates lacking a valid `PrivacyInfo.xcprivacy` file when common storage APIs are detected.\n4. VERIFICATION: Verify that `PrivacyInfo.xcprivacy` exists in the Xcode project bundle target and is valid XML.",
        "commonRejectionTraps": [
          "Uploading an iOS build without a Privacy Manifest when common storage APIs are used triggers immediate App Store upload rejection.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is `PrivacyInfo.xcprivacy` included in the root bundle of your iOS project?",
          "Are all declared API reasons matched to Apple's official list?"
        ],
        "whatHappensNext": "Once you complete this requirement, declare common APIs and third-party SDKs as mandated by Apple for iOS 17 and newer., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-play-data-safety",
        "phaseId": "phase-4",
        "title": "Complete the Google Play Data Safety Form Truthfully",
        "shortDescription": "Declare all user data your app collects, uses, or shares in the Google Play Console.",
        "category": "security",
        "platform": "android",
        "priority": "blocker",
        "storeGuideline": {
          "name": "Google Play Data Safety Guidelines",
          "url": "https://support.google.com/googleplay/android-developer/answer/10787469"
        },
        "whyItMatters": "If you check \"No data collected\" on your store form, but an included analytics or crash SDK collects an advertising ID or device identifier, Google will remove your app for policy violation.",
        "implementationSteps": [
          "List all data collected by your app and any included tools (like user email, crash logs, or device info).",
          "Declare whether data is required or optional, and confirm that data is encrypted while traveling over the internet.",
          "Confirm that users can request their data to be deleted."
        ],
        "agentPrompt": "You are the autonomous mobile compliance engineer. Do NOT ask the user to audit data\u2014generate the complete Google Play Data Safety specification autonomously.\n\nTASK & OBJECTIVE:\nAudit all data collected or shared by our application and included third-party SDKs, and generate the exact answers required for the Google Play Data Safety questionnaire.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan our codebase and dependencies for data collection (user profile data, analytics, device identifiers, crash logs).\n2. IMPLEMENTATION:\n   - Generate a dedicated compliance report (`docs/google-play-data-safety.json` or markdown spec) mapping every collected data category to its purpose (e.g. app functionality, analytics).\n   - Confirm security practices: declare that all data is encrypted in transit via HTTPS/TLS, declare whether data is encrypted at rest, and confirm that users can request account and data deletion.\n   - Detail third-party SDK data practices (e.g. Crashlytics, analytics).\n3. STORE COMPLIANCE: Google Play will suspend apps or reject submissions if declared Data Safety disclosures conflict with actual SDK network traffic.\n4. VERIFICATION: Ensure data declarations match network calls and third-party libraries bundled in the application.",
        "commonRejectionTraps": [
          "Declaring \"No data collected\" while an included crash or analytics tool automatically reads advertising identifiers.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does your Data Safety declaration match the exact behavior of all libraries in your app?",
          "Is data encrypted in transit marked as \"Yes\"?"
        ],
        "whatHappensNext": "Once you complete this requirement, declare all user data your app collects, uses, or shares in the Google Play Console., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-keychain-keystore",
        "phaseId": "phase-4",
        "title": "Securely Store Passwords, Tokens & Biometrics (Keychain & Keystore)",
        "shortDescription": "Never save login tokens, passwords, or personal details in plain text files.",
        "category": "security",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Standard settings files (like UserDefaults on iOS or SharedPreferences on Android) are stored as unencrypted text files on disk. Passwords, biometric keys, and login tokens must be saved in the phone's encrypted hardware vault.",
        "implementationSteps": [
          "iOS: Store login tokens and sensitive credentials in the iOS Keychain using `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`.",
          "If offering Face ID / Touch ID, use Keychain access control flags with `kSecAccessControlBiometryAny` and always provide a device passcode fallback.",
          "Android: Use EncryptedSharedPreferences backed by the hardware Android Keystore, paired with `BiometricPrompt` for fingerprint or face unlock.",
          "Never store raw user passwords or secret API keys in plain text files or unencrypted local storage on the device."
        ],
        "agentPrompt": "You are the autonomous mobile security engineer. Do NOT ask the user to store tokens\u2014implement secure hardware-backed storage for all credentials and tokens autonomously.\n\nTASK & OBJECTIVE:\nAudit and refactor all local data storage across the application to ensure sensitive credentials, passwords, JWT tokens, and private keys are stored strictly in hardware-backed secure storage.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan the codebase for any sensitive tokens or passwords stored in standard `localStorage`, `UserDefaults`, or `SharedPreferences`.\n2. IMPLEMENTATION:\n   - Integrate native secure storage (Apple Keychain on iOS using `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` and EncryptedSharedPreferences / Android Keystore on Android).\n   - Store all authentication access tokens, refresh tokens, encryption keys, and user credentials in secure storage.\n   - If biometric authentication (Face ID / Fingerprint) is supported, configure hardware-backed access control with device passcode fallback.\n   - Purge any legacy plaintext credentials from standard preferences upon upgrade.\n3. STORE COMPLIANCE: Meets OWASP Mobile Security Standard MASVS-STORAGE and prevents extraction of user credentials from unencrypted backups.\n4. VERIFICATION: Verify all token read/write operations use secure storage wrappers and confirm `tsc --noEmit` passes with zero errors.",
        "commonRejectionTraps": [
          "Saving login tokens or user passwords inside plain UserDefaults or local storage files.",
          "Using a naive client-side boolean flag for biometric unlock without tying the authentication token to the hardware Keychain/Keystore.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are authentication tokens and credentials stored in Keychain or EncryptedSharedPreferences?",
          "If biometric login is enabled, does it use hardware-backed access controls with passcode fallback?",
          "Is any sensitive user data left unencrypted in plain text files?"
        ],
        "whatHappensNext": "Once you complete this requirement, never save login tokens, passwords, or personal details in plain text files., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-transit-security",
        "phaseId": "phase-4",
        "title": "Use Secure HTTPS for All Internet Connections",
        "shortDescription": "Enforce strong encryption for all server communication and disallow unencrypted HTTP.",
        "category": "security",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Unencrypted HTTP connections expose user data to being intercepted on public Wi-Fi networks. Apple and Google block unencrypted traffic by default.",
        "implementationSteps": [
          "Verify that all server API endpoints and image links use secure `https://`.",
          "Keep Apple App Transport Security (ATS) enabled with no broad exceptions.",
          "Configure Android Network Security Config to disallow cleartext HTTP traffic."
        ],
        "agentPrompt": "You are the autonomous network security engineer. Do NOT ask the user to configure transport security\u2014harden all network configurations and connections autonomously.\n\nTASK & OBJECTIVE:\nAudit all network calls and mobile configurations to ensure 100% of communication uses secure HTTPS with modern TLS encryption, removing any insecure cleartext bypasses.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `Info.plist`, `AndroidManifest.xml`, network configuration XMLs, and all API endpoint URLs in the codebase.\n2. IMPLEMENTATION:\n   - Ensure all API endpoints, image URLs, and asset links strictly use `https://` protocols.\n   - In `Info.plist`, verify that Apple App Transport Security (ATS) exceptions like `NSAllowsArbitraryLoads: true` are completely removed.\n   - In Android, configure `res/xml/network_security_config.xml` with `cleartextTrafficPermitted=\"false\"` and reference it in `AndroidManifest.xml`.\n3. STORE COMPLIANCE: Apple and Google reject apps that permit arbitrary unencrypted HTTP traffic without strict, proven justifications.\n4. VERIFICATION: Confirm that zero `http://` endpoints exist in source code and that ATS/network security configurations disallow cleartext.",
        "commonRejectionTraps": [
          "Enabling `NSAllowsArbitraryLoads: true` in your iOS settings without a strict, proven justification causes review rejections.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are all API calls and image URLs using secure HTTPS?",
          "Is cleartext unencrypted HTTP traffic disabled in your app settings?"
        ],
        "whatHappensNext": "Once you complete this requirement, enforce strong encryption for all server communication and disallow unencrypted HTTP., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-obfuscation-r8",
        "phaseId": "phase-4",
        "title": "Protect Your Code from Tampering (App Hardening)",
        "shortDescription": "Enable code shrinking and protection so outside actors cannot easily reverse-engineer your app.",
        "category": "security",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Unprotected Android apps can be decompiled and read in seconds, exposing your business logic and backend endpoints. Code shrinking also makes your app download much smaller and faster.",
        "implementationSteps": [
          "Android: Turn on code shrinking (`minifyEnabled true` and `shrinkResources true`) in your release settings.",
          "Test your release build on a physical phone to make sure code shrinking didn't accidentally remove needed data models.",
          "Save your build mapping and symbol files so crash reports can still show readable file names."
        ],
        "agentPrompt": "You are the autonomous mobile build and security engineer. Do NOT ask the user to write ProGuard rules\u2014configure code shrinking and symbol obfuscation autonomously in our build files.\n\nTASK & OBJECTIVE:\nConfigure code shrinking, dead code elimination, and symbol obfuscation for production release builds to protect proprietary code, API endpoints, and logic from reverse engineering.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `android/app/build.gradle`, `android/app/proguard-rules.pro`, and iOS release build configurations.\n2. IMPLEMENTATION:\n   - In Android: enable R8 shrinking and resource optimization in the release build type (`minifyEnabled true`, `shrinkResources true`).\n   - Configure `proguard-rules.pro` with keep rules for Capacitor bridge plugins, serialization models, and reflection interfaces to prevent runtime crashes.\n   - In iOS: verify that release build settings enable symbol stripping (`STRIP_INSTALLED_PRODUCT = YES`) and dead code stripping.\n3. STORE COMPLIANCE: Meets OWASP MASVS-CODE requirements and significantly reduces release binary download size on the App Store and Google Play.\n4. VERIFICATION: Verify that release build configurations compile cleanly without stripping required reflection models.",
        "commonRejectionTraps": [
          "Turning on code shrinking without testing the release build on a real phone, causing data models to fail at runtime.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have you installed and tested the optimized release build on a physical phone?",
          "Are crash report symbol files saved with every release build?"
        ],
        "whatHappensNext": "Once you complete this requirement, enable code shrinking and protection so outside actors cannot easily reverse-engineer your app., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-permissions-hygiene",
        "phaseId": "phase-4",
        "title": "Ask Only for Permissions You Actually Need with Clear Explanations",
        "shortDescription": "Explain why your app needs camera, photo, or location access in plain, friendly language.",
        "category": "security",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Review Guideline 5.1.1 & Android Permission Best Practices",
          "url": "https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage"
        },
        "whyItMatters": "Vague permission explanations like \"This app needs camera\" cause instant rejection under Apple Guideline 5.1.1. Missing permission descriptions cause the app to crash the moment a user taps the button.",
        "implementationSteps": [
          "Write clear, helpful descriptions for every permission (e.g. \"Your Camera is used to scan bar codes to quickly add items to your pantry.\").",
          "Use modern zero-permission photo pickers so users can pick an avatar without granting access to their entire photo library.",
          "Only ask for permissions when the user actually taps a feature that requires them."
        ],
        "agentPrompt": "You are the autonomous mobile privacy engineer. Do NOT ask the user to edit manifest files\u2014audit and minimize application permissions autonomously.\n\nTASK & OBJECTIVE:\nAudit all device permissions requested by the application across `Info.plist` and `AndroidManifest.xml`, eliminate unnecessary permissions, and write clear, user-centric usage descriptions.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `Info.plist` and `AndroidManifest.xml` for requested permissions (camera, microphone, location, photo library, contacts).\n2. IMPLEMENTATION:\n   - Remove any broad, non-essential permissions that are not strictly necessary for core functionality.\n   - For photo selection, migrate to modern system photo pickers (`PHPickerViewController` on iOS, Android Photo Picker) that require zero permissions.\n   - For every remaining permission, write a friendly, specific, and transparent usage description (e.g. `NSCameraUsageDescription`) explaining exactly why access is needed and how the user benefits.\n3. STORE COMPLIANCE: Apple Guideline 5.1.1 and Google Play Policy reject apps that request permissions with generic or uninformative descriptions.\n4. VERIFICATION: Verify that all declared permissions in `Info.plist` contain clear, non-generic descriptions.",
        "commonRejectionTraps": [
          "Using generic permission strings like \"App needs location to work.\"",
          "Asking for access to the entire photo gallery when the user only wants to pick a single profile photo.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does every permission message explain exactly how the user benefits from granting access?",
          "Are permissions requested only when the user taps the relevant feature?"
        ],
        "whatHappensNext": "Once you complete this requirement, explain why your app needs camera, photo, or location access in plain, friendly language., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-privacy-logging",
        "phaseId": "phase-4",
        "title": "Remove Hidden Passwords and Test Logs from the Final App",
        "shortDescription": "Turn off debug console logging and strip passwords from error reports.",
        "category": "security",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Leaving test print logs active in the released app lets anyone who plugs the phone into a laptop read sensitive user tokens, emails, and passwords from device log files.",
        "implementationSteps": [
          "Turn off debug console logs in production release builds.",
          "Sanitize error reporting tools so passwords and credit card numbers are never sent in crash breadcrumbs.",
          "Clear temporary secret memory buffers immediately after using them."
        ],
        "agentPrompt": "You are the autonomous application security auditor. Do NOT ask the user to search for logs\u2014sanitize all application logging and error reporting autonomously across the codebase.\n\nTASK & OBJECTIVE:\nAudit the entire codebase to ensure debug console print statements and telemetry logs are sanitized so sensitive user data, passwords, and tokens are never printed to device logs.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan the codebase for `console.log`, `console.debug`, `print`, and native logging statements.\n2. IMPLEMENTATION:\n   - Create a centralized logging utility (`src/utils/logger.ts`) that automatically strips or mutes debug statements in production release builds (`import.meta.env.PROD`).\n   - Audit all error logging handlers: ensure request/response payloads containing passwords, auth tokens, credit cards, or personal emails are masked before logging.\n   - Ensure third-party crash reporting tools (Sentry, Crashlytics) sanitize user PII before transmitting error reports.\n3. STORE COMPLIANCE: Meets OWASP MASVS-STORAGE security standards, preventing leakage of sensitive credentials via system logs.\n4. VERIFICATION: Confirm that production builds produce zero debug output containing user tokens or credentials.",
        "commonRejectionTraps": [
          "App store reviewers inspecting device logs and finding customer credentials printed in plain text.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are verbose debug console logs turned off in release builds?",
          "Are error reports audited to ensure no sensitive personal data is leaked?"
        ],
        "whatHappensNext": "Once you complete this requirement, turn off debug console logging and strip passwords from error reports., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-api-key-protection",
        "phaseId": "phase-4",
        "title": "Never Store Secret API Keys or Backend Passwords Inside the App",
        "shortDescription": "Keep private keys and database passwords on a secure server, never inside the phone app.",
        "category": "security",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "OWASP Mobile MASVS-STORAGE & MASVS-CRYPTO",
          "url": "https://mas.owasp.org/"
        },
        "whyItMatters": "Anyone can decompile an app or run the 'strings' tool on your app bundle in under 60 seconds. Hardcoding private keys (like OpenAI API keys, Stripe Secret Keys, AWS credentials, or Supabase service-role keys) in the client app allows bad actors to empty your bank account or delete your entire database.",
        "implementationSteps": [
          "Never include private master secret keys, Stripe Secret Keys, or database passwords in your mobile client code or build bundles.",
          "Route all paid or sensitive API calls through a secure backend proxy or serverless function (like Cloudflare Workers, Firebase Cloud Functions, or Supabase Edge Functions).",
          "Only include public, rate-limited client keys (like Firebase Web API key or Supabase public anon key) in mobile builds.",
          "Add bundle ID and domain restrictions to all public API keys in your cloud provider console."
        ],
        "agentPrompt": "You are the autonomous mobile security architect. Do NOT ask the user to manage backend proxies\u2014audit and protect all private API keys and master secrets autonomously.\n\nTASK & OBJECTIVE:\nPerform an exhaustive scan of our mobile codebase, configuration files, and assets for hardcoded private API keys, master tokens, or server secrets, and move all privileged API calls behind a secure proxy.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan all source files, environment files (`.env*`), and assets for hardcoded secret keys (e.g. OpenAI secret keys, Stripe secret keys, AWS credentials, database passwords).\n2. IMPLEMENTATION:\n   - Remove any master/admin secret keys embedded in the client application bundle. (Any string bundled in a mobile app can be extracted with decompilers).\n   - Route privileged API requests through a secure serverless backend proxy endpoint that validates user authentication before invoking third-party APIs.\n   - Ensure the mobile client only uses publishable public client keys where explicitly supported by vendors.\n3. STORE COMPLIANCE: Apple and Google security scanners actively scan uploads for exposed secret keys and suspend accounts with compromised credentials.\n4. VERIFICATION: Verify zero private master keys exist in client-side code and confirm `tsc --noEmit` passes.",
        "commonRejectionTraps": [
          "Decompiling the app reveals private OpenAI or payment secret keys, resulting in thousands of dollars in fraudulent API charges.",
          "Leaving database admin or master service keys in frontend files, allowing anyone to modify all user data.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are all private API keys and database admin secrets kept completely off the mobile device?",
          "Do all paid API calls pass through a secure backend proxy with user authentication?"
        ],
        "whatHappensNext": "Once you complete this requirement, keep private keys and database passwords on a secure server, never inside the phone app., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-session-token-security",
        "phaseId": "phase-4",
        "title": "Secure User Login, Token Expiry, and Clean Logout",
        "shortDescription": "Ensure login tokens expire safely and all private data is completely wiped when logging out.",
        "category": "security",
        "platform": "both",
        "priority": "high",
        "storeGuideline": {
          "name": "OWASP Mobile MASVS-AUTH Session Security",
          "url": "https://mas.owasp.org/"
        },
        "whyItMatters": "If login tokens never expire or aren't completely erased upon logout, anyone who later touches the phone, buys a used device, or intercepts an old token can access the user's private messages and personal account.",
        "implementationSteps": [
          "Use short-lived access tokens (e.g. 15 to 60 minutes) combined with secure refresh token rotation.",
          "When the user taps 'Log Out', immediately clear all authentication tokens from Keychain / Keystore and purge all cached user data and profile files from memory and local storage.",
          "Notify your backend server on logout so the refresh token is instantly invalidated and cannot be reused.",
          "Automatically log the user out and prompt for sign-in if their session is expired or revoked on the server."
        ],
        "agentPrompt": "You are the autonomous authentication security architect. Do NOT ask the user to handle auth lifecycles\u2014implement a secure session lifecycle autonomously.\n\nTASK & OBJECTIVE:\nImplement an ironclad session lifecycle for our mobile authentication system, including token expiration, automatic silent token refresh, and clean session wipe upon logout.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect authentication store, session management, and HTTP client interceptors.\n2. IMPLEMENTATION:\n   - Implement short-lived access tokens paired with secure refresh tokens stored in Keychain/Keystore.\n   - Implement an HTTP client interceptor that detects 401 Unauthorized responses, queues pending requests, silently refreshes the access token using the refresh token, and replays failed requests.\n   - Implement a thorough \"Log Out\" routine: call the server logout endpoint to invalidate tokens, wipe all stored tokens, credentials, cached files, and local state from the device, and reset navigation to the login view.\n3. STORE COMPLIANCE: Required by enterprise security standards and prevents unauthorized session hijacking.\n4. VERIFICATION: Test token expiration and refresh flow. Confirm session logout thoroughly clears local state with zero memory leaks.",
        "commonRejectionTraps": [
          "Tapping 'Log Out' only dismisses the UI, leaving sensitive user data, cached images, or active auth tokens stored in local files.",
          "Tokens that never expire, allowing permanently hijacked sessions if a device is lost or compromised.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does tapping 'Log Out' completely clear all stored tokens and cached personal data?",
          "Does the server invalidate the refresh token when a logout occurs?"
        ],
        "whatHappensNext": "Once you complete this requirement, ensure login tokens expire safely and all private data is completely wiped when logging out., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p4-webview-injection-defense",
        "phaseId": "phase-4",
        "title": "Sanitize WebViews, Deep Links, and User Inputs to Prevent Exploits",
        "shortDescription": "Disable local file access in WebViews and validate all incoming links before opening them.",
        "category": "security",
        "platform": "both",
        "priority": "high",
        "storeGuideline": {
          "name": "OWASP Mobile MASVS-PLATFORM & Google Play WebView Security",
          "url": "https://support.google.com/googleplay/android-developer/answer/9888379"
        },
        "whyItMatters": "Misconfigured WebViews and unverified deep links allow attackers to run malicious scripts, steal local device files, or redirect users to phishing sites from inside your app.",
        "implementationSteps": [
          "In WebViews, strictly disable local file access: set `allowFileAccess = false` and `allowUniversalAccessFromFileURLs = false`.",
          "For opening external third-party links, use system in-app browser tabs (SFSafariViewController on iOS, Chrome Custom Tabs on Android) rather than raw embedded WebViews.",
          "Validate incoming deep links and URL scheme parameters against an approved list of internal routes before navigating.",
          "Sanitize and validate all user inputs before displaying them or sending them to backend databases."
        ],
        "agentPrompt": "You are the autonomous web and mobile security engineer. Do NOT ask the user to configure WebViews\u2014sanitize all WebViews, deep links, and user inputs autonomously.\n\nTASK & OBJECTIVE:\nAudit all WebViews and deep link handlers in the application to prevent script injection, open redirect vulnerabilities, and unauthorized local file system access.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect any embedded WebView instances, URL opening methods, and deep link navigation handlers.\n2. IMPLEMENTATION:\n   - On embedded WebViews, explicitly disable local file system access (`allowFileAccess: false`, `allowContentAccess: false`) and restrict origins to an explicit HTTPS allowlist.\n   - For all external third-party links, open them in system in-app browser tabs (SFSafariViewController on iOS, Chrome Custom Tabs on Android) rather than raw embedded WebViews.\n   - Sanitize all parameters received from deep links, QR codes, or external intents before using them in routing or DOM rendering.\n3. STORE COMPLIANCE: Meets Google Play WebView security standards and Apple App Review guidelines for external browsing.\n4. VERIFICATION: Verify all external URL handlers launch system tabs and deep link routing validates parameter safety.",
        "commonRejectionTraps": [
          "Google Play rejection or security alert for exposing vulnerable WebView interfaces or having file access enabled.",
          "Deep link handlers opening arbitrary external URLs without validating that the host belongs to your company.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are third-party web links opened in system Safari / Chrome tabs instead of raw WebViews?",
          "Are deep link URLs validated against an allowlist before navigating?"
        ],
        "whatHappensNext": "Once you complete this requirement, disable local file access in WebViews and validate all incoming links before opening them., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-5",
    "number": 5,
    "title": "Legal Rules & Store Compliance",
    "shortTitle": "Legal & Compliance",
    "description": "Ensure you have a public privacy policy, clear terms of use, content moderation tools, and child safety compliance.",
    "iconName": "Scale",
    "items": [
      {
        "id": "p5-privacy-policy",
        "phaseId": "phase-5",
        "title": "Create a Public Privacy Policy Web Page",
        "shortDescription": "Publish an active, readable privacy policy on a public HTTPS web address.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Guideline 5.1.1 & Play Policy on Privacy Policy",
          "url": "https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage"
        },
        "whyItMatters": "An invalid, broken, or redirecting privacy policy link causes immediate rejection in both App Store Connect and Google Play Console.",
        "implementationSteps": [
          "Host your privacy policy on a public HTTPS webpage that anyone can open without needing to log in.",
          "Name every third-party service your app uses (such as Firebase, Stripe, or RevenueCat).",
          "Explain clearly how users can request a copy of their data or delete their account.",
          "Include an active support email address for privacy questions."
        ],
        "agentPrompt": "You are the autonomous legal and compliance engineer. Do NOT ask the user to draft policies\u2014generate and integrate a comprehensive, store-compliant Privacy Policy autonomously.\n\nTASK & OBJECTIVE:\nDraft a comprehensive, store-compliant Privacy Policy and integrate it into both the mobile application and a publicly accessible web endpoint for App Store Connect and Google Play Console.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect our project documentation, settings screens, and data models to identify all collected data types and third-party services.\n2. IMPLEMENTATION:\n   - Generate a clear, legally compliant Privacy Policy document containing: exact data categories collected, third-party services utilized (analytics, billing, crash reporting), retention policies, user deletion rights, and support contact email.\n   - Add a dedicated in-app Privacy Policy screen/modal in the settings menu.\n   - Configure a publicly accessible HTTPS web page route (e.g. `/privacy`) hosted on our domain to link directly into App Store Connect and Google Play Console listing metadata.\n3. STORE COMPLIANCE: Mandated by Apple Guideline 5.1.1 and Google Play Policy. Submissions without a working, public, HTTPS Privacy Policy URL are rejected automatically.\n4. VERIFICATION: Confirm the Privacy Policy view renders cleanly and the web URL is accessible without authentication barriers.",
        "commonRejectionTraps": [
          "Linking to a generic company homepage instead of a specific privacy policy page.",
          "Putting the privacy policy behind a login screen or a broken link.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does your privacy policy link open cleanly in an incognito web browser without errors?",
          "Are all analytics and third-party tools mentioned in the text?"
        ],
        "whatHappensNext": "Once you complete this requirement, publish an active, readable privacy policy on a public HTTPS web address., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-ugc-moderation",
        "phaseId": "phase-5",
        "title": "Add Report and Block Buttons If Users Can Post Content",
        "shortDescription": "Provide easy reporting, user blocking, and a zero-tolerance policy for abusive content.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Review Guideline 1.2 - User-Generated Content",
          "url": "https://developer.apple.com/app-store/review/guidelines/#user-generated-content"
        },
        "whyItMatters": "Apple and Google have zero tolerance for unmoderated content. If your app lets users post photos, comments, or chat messages, you MUST include built-in tools to report and block abusive users.",
        "implementationSteps": [
          "Include Terms of Use stating that offensive content and abusive behavior are strictly prohibited.",
          "Add a visible \"Report\" button on every user post, comment, and profile.",
          "Add a \"Block User\" button that immediately hides all content from that user.",
          "Establish a process to review and remove reported offensive content within 24 hours."
        ],
        "agentPrompt": "You are the autonomous trust & safety engineer. Do NOT ask the user to implement moderation\u2014build the mandatory user-generated content (UGC) safety tools autonomously.\n\nTASK & OBJECTIVE:\nIf our application features user-generated content (comments, profiles, reviews, messages, media), implement the mandatory moderation tools required by Apple Guideline 1.2 and Google Play policy.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect all areas where users can post, share, or view user-generated content.\n2. IMPLEMENTATION:\n   - Add a visible \"Report\" button on all user content items allowing users to flag abusive, offensive, or inappropriate content.\n   - Add a \"Block User\" button that immediately hides all content from the blocked user and prevents future interactions.\n   - Implement an automated text filter to screen common abusive words before publishing.\n   - Include community terms stating zero tolerance for objectionable content and abusive behavior, requiring user acceptance upon first post.\n3. STORE COMPLIANCE: Mandatory under Apple Guideline 1.2. Any app with social feeds or user posting lacking report and block buttons is rejected on first review.\n4. VERIFICATION: Test reporting and blocking interactions. Confirm blocked content vanishes immediately from the UI and `tsc --noEmit` passes.",
        "commonRejectionTraps": [
          "Social or chat apps missing an in-app \"Block User\" or \"Report Abuse\" button.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Can a user report an offensive post in 2 taps?",
          "Can a user block someone and immediately hide all their content?"
        ],
        "whatHappensNext": "Once you complete this requirement, provide easy reporting, user blocking, and a zero-tolerance policy for abusive content., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-gdpr-ccpa",
        "phaseId": "phase-5",
        "title": "Ask for Cookie and Privacy Consent for European Users (CMP)",
        "shortDescription": "Show an approved privacy consent banner before loading tracking or ad tools in Europe.",
        "category": "legal",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Loading tracking tools or personalized ads for users in the European Union without asking for consent first violates GDPR and Google policies, leading to ad account suspensions.",
        "implementationSteps": [
          "Use an approved Consent Management Platform (such as Google UMP SDK) if showing ads.",
          "Show the consent banner before initializing ad or tracking SDKs for users in Europe.",
          "Let users review or change their privacy choices anytime from your app settings."
        ],
        "agentPrompt": "You are the autonomous data privacy engineer. Do NOT ask the user to write consent dialogs\u2014implement a compliant Consent Management Platform (CMP) autonomously.\n\nTASK & OBJECTIVE:\nImplement a compliant consent management mechanism for European Union (GDPR) and California (CCPA) privacy regulations before initializing non-essential tracking SDKs.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect analytics, crash reporting, and marketing SDK initialization calls.\n2. IMPLEMENTATION:\n   - Present a clear consent banner to users explaining what data is collected for functional, analytics, and advertising purposes.\n   - Provide equal prominence for \"Accept\" and \"Decline\" (no deceptive dark patterns).\n   - Only initialize non-essential tracking SDKs after explicit opt-in consent is granted.\n   - Add a \"Privacy Preferences\" / \"Manage Cookies\" button in the app settings allowing users to modify or withdraw consent at any time.\n3. STORE COMPLIANCE: Required by European GDPR and California privacy regulations. Non-compliance risks severe legal penalties and store removals.\n4. VERIFICATION: Test consent choices. Confirm analytics SDKs remain disabled when consent is denied and settings allow toggling consent dynamically.",
        "commonRejectionTraps": [
          "Firing tracking cookies or ad beacons before the user interacts with the consent dialog.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is an approved consent banner shown before loading ads in Europe?",
          "Can users change their privacy choices anytime from the settings screen?"
        ],
        "whatHappensNext": "Once you complete this requirement, show an approved privacy consent banner before loading tracking or ad tools in Europe., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-coppa-kids",
        "phaseId": "phase-5",
        "title": "Follow Children's Privacy Rules If Kids Use Your App",
        "shortDescription": "Use a neutral age gate and turn off tracking tools if your audience includes children.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Guideline 1.3 & Google Play Families Policy",
          "url": "https://support.google.com/googleplay/android-developer/answer/9893335"
        },
        "whyItMatters": "Violating child privacy laws (COPPA) results in massive government fines and permanent removal from the App Store and Google Play.",
        "implementationSteps": [
          "Use a neutral age picker where users select their birthdate (never pre-fill the age or use biased buttons).",
          "If a user is under 13, completely turn off behavioral ad tracking and personal data collection.",
          "On Google Play: if in the Families program, only use family-certified ad partners."
        ],
        "agentPrompt": "You are the autonomous mobile compliance engineer. Do NOT ask the user to implement age verification\u2014implement COPPA and Google Play Families compliance autonomously.\n\nTASK & OBJECTIVE:\nAudit our application for Children's Online Privacy Protection Act (COPPA) and Google Play Families Policy compliance, implementing a neutral age gate if children may use the app.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect onboarding screens, advertising SDKs, and third-party trackers.\n2. IMPLEMENTATION:\n   - If our app is accessible to or targeted at children, implement a neutral age gate (a date picker without pre-selected values).\n   - For users identified under 13, completely disable all behavioral advertising, cross-app tracking, and non-essential telemetry.\n   - Implement a parent gate (e.g. solving a math problem or adult confirmation challenge) before opening external web links or initiating in-app purchases.\n3. STORE COMPLIANCE: Mandatory under COPPA, Apple Kids Category guidelines, and Google Play Families Policy. Violations result in immediate app removal.\n4. VERIFICATION: Test age gate logic with underage birthdates. Confirm tracking SDKs stay disabled and parent gates trigger before external links open.",
        "commonRejectionTraps": [
          "Using a checkbox that defaults to \"I am 18 or older\" instead of a neutral birthdate selector.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your age gate completely neutral without pre-selected options?",
          "Are all tracking tools completely turned off for underage users?"
        ],
        "whatHappensNext": "Once you complete this requirement, use a neutral age gate and turn off tracking tools if your audience includes children., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-export-cryptography",
        "phaseId": "phase-5",
        "title": "Mark Standard Encryption in Your Settings to Skip Extra Forms",
        "shortDescription": "Add a simple setting in your iOS project so you don't have to answer export questions on every upload.",
        "category": "legal",
        "platform": "ios",
        "priority": "high",
        "whyItMatters": "Every build uploaded to App Store Connect pauses and asks an export compliance question unless you declare the exemption flag directly in your settings.",
        "implementationSteps": [
          "Add `ITSAppUsesNonExemptEncryption = false` in your iOS `Info.plist` file if your app uses standard HTTPS encryption.",
          "Enjoy seamless test build uploads without answering manual export forms every time."
        ],
        "agentPrompt": "You are the autonomous iOS configuration engineer. Do NOT ask the user to edit Plist files\u2014configure standard encryption export compliance autonomously in our iOS project.\n\nTASK & OBJECTIVE:\nConfigure standard encryption export compliance in our iOS project settings by adding the `ITSAppUsesNonExemptEncryption` key to `Info.plist`.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `ios/App/App/Info.plist`.\n2. IMPLEMENTATION:\n   - Add the key `ITSAppUsesNonExemptEncryption` with a boolean value of `<false/>` to `ios/App/App/Info.plist`.\n   - This officially certifies to Apple that our application only uses standard HTTPS network encryption and exempt cryptographic algorithms.\n   - This setting permanently skips the requirement to answer manual French and US BIS export compliance questions on every TestFlight and App Store build upload.\n3. STORE COMPLIANCE: Bypasses manual export compliance questionnaires on every App Store build upload.\n4. VERIFICATION: Verify that `Info.plist` is valid XML containing `<key>ITSAppUsesNonExemptEncryption</key><false/>`.",
        "commonRejectionTraps": [
          "Leaving this setting out requires clicking through manual export compliance forms on every single TestFlight build.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is `ITSAppUsesNonExemptEncryption` set to `false` in Info.plist?",
          "Does uploading a new test build skip the manual export prompt in App Store Connect?"
        ],
        "whatHappensNext": "Once you complete this requirement, add a simple setting in your iOS project so you don't have to answer export questions on every upload., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-terms-of-service",
        "phaseId": "phase-5",
        "title": "Create Plain-English Terms of Service and EULA with Clear Subscription Terms",
        "shortDescription": "Publish an End User License Agreement that outlines user rules, subscription terms, and cancellations.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Review Guideline 3.1.2 & 1.2 - EULA Requirements",
          "url": "https://developer.apple.com/app-store/review/guidelines/#subscriptions"
        },
        "whyItMatters": "Apple strictly rejects any app with auto-renewing subscriptions or user-created content unless you provide a clear End User License Agreement (EULA). Both Apple guidelines and the FTC Click-to-Cancel rule require transparent billing and cancellation details.",
        "implementationSteps": [
          "Host a public, readable Terms of Service / EULA webpage on an HTTPS address (or explicitly link to Apple's Standard EULA).",
          "Include clear rules: prohibited abusive behavior, subscription renewal details, billing cycles, and how users can cancel in iOS/Android settings.",
          "Provide a direct, clickable link to your Terms of Service directly on every in-app paywall screen and in your App Store Connect metadata.",
          "Include standard disclaimers: limitation of liability, service availability, and governing law."
        ],
        "agentPrompt": "You are the autonomous legal and store compliance engineer. Do NOT ask the user to write legal terms\u2014draft and integrate plain-English Terms of Service and EULA autonomously.\n\nTASK & OBJECTIVE:\nDraft and integrate comprehensive Terms of Service and End User License Agreement (EULA) with explicit subscription billing terms, prominently linking them across the app.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect paywall screens, settings menus, and onboarding flows.\n2. IMPLEMENTATION:\n   - Generate a comprehensive Terms of Service and EULA document covering: license terms, user conduct, intellectual property, auto-renewable subscription terms (billing cycle, price, cancellation via Apple/Google settings), and limitation of liability.\n   - Add a dedicated in-app Terms viewer screen/modal in the settings menu.\n   - Ensure direct, clickable links to the Terms and EULA are prominently rendered on all paywall screens right next to the purchase button.\n3. STORE COMPLIANCE: Mandatory under Apple Guideline 3.1.2. Paywalls lacking visible Terms of Use (EULA) links trigger immediate rejection during store review.\n4. VERIFICATION: Verify that the Terms view renders cleanly and that paywall links navigate to the EULA without crashing.",
        "commonRejectionTraps": [
          "Rejection under Guideline 3.1.2 for having an in-app subscription paywall without a direct, clickable link to Terms of Use (EULA).",
          "Failing to explain how users can cancel subscriptions before the next billing cycle.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is the Terms of Service link visible and clickable on every paywall screen?",
          "Are the Terms of Use link and Privacy Policy link provided in App Store Connect?"
        ],
        "whatHappensNext": "Once you complete this requirement, publish an End User License Agreement that outlines user rules, subscription terms, and cancellations., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-app-tracking-transparency",
        "phaseId": "phase-5",
        "title": "Follow Apple App Tracking Transparency (ATT) & Ad ID Rules",
        "shortDescription": "Ask for permission before collecting advertising identifiers or tracking users across outside apps.",
        "category": "legal",
        "platform": "ios",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Review Guideline 5.1.2 - Data Use and Sharing",
          "url": "https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing"
        },
        "whyItMatters": "If your app or any included SDK (such as Meta, TikTok, or AdMob personalized ads) accesses the device Advertising Identifier (IDFA) or tracks users across apps owned by other companies, you MUST show Apple's native App Tracking Transparency (ATT) prompt. Tracking without asking\u2014or asking when you don't track\u2014leads to immediate rejection.",
        "implementationSteps": [
          "Audit your app SDKs: check if any marketing, attribution, or ad library collects IDFA or tracks users across other companies' apps.",
          "If tracking: add `NSUserTrackingUsageDescription` to your `Info.plist` with a friendly, specific explanation of how tracking helps the user (e.g. 'This identifier helps deliver relevant deals and prevents showing the same ad repeatedly').",
          "Trigger Apple's native `requestTrackingAuthorization` prompt before initializing tracking or ad SDKs.",
          "If the user selects 'Ask App not to Track', strictly honor their choice and never collect IDFA or fingerprint the device.",
          "If your app does NOT track users across outside apps, ensure ATT is NOT requested and ad libraries are configured for non-personalized ads."
        ],
        "agentPrompt": "You are the autonomous iOS privacy engineer. Do NOT ask the user to configure ATT\u2014audit and configure Apple App Tracking Transparency (ATT) autonomously in our project.\n\nTASK & OBJECTIVE:\nAudit our iOS project for Apple App Tracking Transparency (ATT) requirements under Guideline 5.1.2, configuring prompts if tracking occurs, or confirming clean zero-tracking status.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Audit third-party SDKs for ad tracking libraries, IDFA collection, or cross-app analytics.\n2. IMPLEMENTATION:\n   - If our app does NOT track users across other companies' apps or websites, ensure all tracking flags in SDKs are disabled and confirm no ATT prompt is shown.\n   - If user tracking or IDFA collection is performed, configure `NSUserTrackingUsageDescription` in `Info.plist` with a polite, specific explanation of why tracking is requested, and request authorization only after contextual onboarding.\n3. STORE COMPLIANCE: Mandatory under Apple Guideline 5.1.2. Tracking users or accessing IDFA without ATT approval triggers immediate rejection.\n4. VERIFICATION: Verify `Info.plist` configuration and confirm that no unauthorized IDFA collection occurs.",
        "commonRejectionTraps": [
          "Collecting IDFA or tracking users across external apps without showing the official ATT prompt (instant Guideline 5.1.2 rejection).",
          "Triggering the ATT prompt when the app does not actually track users across outside apps.",
          "Offering incentives or cash rewards to convince users to tap 'Allow'."
        ],
        "verificationQuestions": [
          "Is NSUserTrackingUsageDescription configured with a clear explanation if tracking is used?",
          "Does the app strictly respect 'Ask App not to Track' without degrading core functionality?"
        ],
        "whatHappensNext": "Once you complete this requirement, ask for permission before collecting advertising identifiers or tracking users across outside apps., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-intellectual-property",
        "phaseId": "phase-5",
        "title": "Respect Trademarks, Copyrights & Brand Names",
        "shortDescription": "Never use third-party brand logos, Apple/Google trademarks, or copyrighted media without permission.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Guideline 5.2 & Google Play Intellectual Property Policy",
          "url": "https://developer.apple.com/app-store/review/guidelines/#intellectual-property"
        },
        "whyItMatters": "Using protected brand names (like putting 'iPhone' or 'Apple' in your app title), incorporating official logos in your icon, or using copyrighted photos and songs without commercial licenses causes immediate rejection or permanent developer account termination.",
        "implementationSteps": [
          "Verify that your app name does not start with or copy trademarked brand names (use 'App Name for iPhone', never 'iPhone App Name').",
          "Never use the official Apple logo, Google Play badge, or third-party company logos in your app icon, splash screen, or screenshots.",
          "Ensure all images, audio clips, custom fonts, and illustrations used in the app have valid commercial licenses or were created originally by you.",
          "If your app displays content from other platforms (like YouTube or Spotify), ensure you use their official developer APIs and comply with their branding guidelines."
        ],
        "agentPrompt": "You are the autonomous brand and IP compliance auditor. Do NOT ask the user to audit assets\u2014audit all project assets, icons, fonts, and store metadata autonomously.\n\nTASK & OBJECTIVE:\nAudit all assets, icons, fonts, UI illustrations, and store listing metadata across our project to ensure 100% intellectual property compliance with zero trademark infringement.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan images, SVGs, audio assets, font files, and metadata strings in the project.\n2. IMPLEMENTATION:\n   - Verify that all fonts and icons have appropriate open-source or commercial licenses.\n   - Check all UI screens and marketing text to ensure no protected third-party trademarks (e.g. Apple logo, iPhone trademark, Google Play logo, competitor brand names) are improperly used.\n   - Replace any copyrighted stock photography or unlicensed media with properly licensed or custom SVG assets.\n3. STORE COMPLIANCE: Prevents instant rejection or DMCA takedowns under Apple Guideline 5.2 (Intellectual Property) and Google Play IP policies.\n4. VERIFICATION: Verify asset files in `src/assets/` and `public/` are free of trademarked third-party marks.",
        "commonRejectionTraps": [
          "Putting an Apple logo or 'Apple' in the app icon or title (violates Guideline 5.2.5).",
          "Using trademarked character names, brand logos, or celebrity photos without written documentation from the owner.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are all app icons, graphics, fonts, and audio licensed for commercial distribution?",
          "Is your app title and description completely free of infringing trademark names?"
        ],
        "whatHappensNext": "Once you complete this requirement, never use third-party brand logos, Apple/Google trademarks, or copyrighted media without permission., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-dsa-trader-status",
        "phaseId": "phase-5",
        "title": "Complete the EU Digital Services Act (DSA) Trader Verification",
        "shortDescription": "Declare your business contact details if distributing or monetizing apps in European countries.",
        "category": "legal",
        "platform": "both",
        "priority": "high",
        "storeGuideline": {
          "name": "EU Digital Services Act (DSA) Compliance",
          "url": "https://developer.apple.com/support/dsa-requirements/"
        },
        "whyItMatters": "The European Union's Digital Services Act legally requires Apple and Google to verify and publicly display the address, phone number, and email of commercial developers ('Traders') in all 27 EU member states. Failing to provide this information causes your app to be removed from European app stores.",
        "implementationSteps": [
          "In App Store Connect: Go to Account Settings -> Business -> European Union Digital Services Act (DSA).",
          "Select whether you are a 'Trader' (anyone who distributes apps for commercial gain, including ads or in-app purchases) or 'Non-Trader'.",
          "If Trader: Provide your verified business address, support phone number, and contact email address.",
          "In Google Play Console: Complete the matching Trader verification under Account Details."
        ],
        "agentPrompt": "You are the autonomous EU regulatory compliance engineer. Do NOT ask the user to research EU laws\u2014prepare the technical compliance metadata for the EU Digital Services Act autonomously.\n\nTASK & OBJECTIVE:\nPrepare the technical compliance metadata and documentation required for the European Union Digital Services Act (DSA) declaration in App Store Connect and Google Play Console.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect project configurations and contact metadata.\n2. IMPLEMENTATION:\n   - Determine Trader status: if the app monetizes (via paid download, subscriptions, or ads), classify the developer account as a \"Trader\".\n   - Generate a compliance checklist (`docs/dsa-compliance.md`) detailing the required public trader metadata: legal company/developer name, registered business address, verified telephone number, and customer support email address.\n   - Ensure support contact information is easily accessible inside the app settings.\n3. STORE COMPLIANCE: Under EU DSA regulations, apps that fail to complete the Trader declaration are legally restricted from being distributed across all 27 European Union member states.\n4. VERIFICATION: Verify that contact and support information is properly displayed in the app settings.",
        "commonRejectionTraps": [
          "Ignoring the DSA notification in App Store Connect, leading to the app being hidden or removed from all 27 EU App Store storefronts.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your EU DSA Trader declaration completed and verified in App Store Connect?",
          "Is the same Trader declaration submitted in Google Play Console?"
        ],
        "whatHappensNext": "Once you complete this requirement, declare your business contact details if distributing or monetizing apps in European countries., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-regulatory-disclaimers",
        "phaseId": "phase-5",
        "title": "Add Required Health, Medical, or Financial Disclaimers",
        "shortDescription": "Display clear disclaimers if your app offers fitness, wellness, medical, or financial guidance.",
        "category": "legal",
        "platform": "both",
        "priority": "high",
        "storeGuideline": {
          "name": "App Store Review Guideline 1.4.1 & Google Play Health Content Policy",
          "url": "https://developer.apple.com/app-store/review/guidelines/#medical-analysis"
        },
        "whyItMatters": "Apps that provide health metrics, diet tracking, symptom checkers, or financial calculators are scrutinized heavily. Claiming to diagnose medical conditions or provide licensed financial advice without certified regulatory clearance (FDA/CE) leads to immediate app bans.",
        "implementationSteps": [
          "Health & Fitness Apps: Include a prominent disclaimer on your onboarding and settings screens: 'This app is for informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a physician.'",
          "Never claim that phone camera flash, microphone, or sensors can measure blood pressure or diagnose health conditions unless you have official FDA or CE medical device certification.",
          "Financial Apps: Clearly state that the app provides general informational tools and does not constitute licensed financial, tax, or investment advice.",
          "Personal Loan Apps: Comply with national lending regulations and clearly disclose APR, repayment schedules, and total loan costs."
        ],
        "agentPrompt": "You are the autonomous healthcare and financial compliance engineer. Do NOT ask the user to write disclaimers\u2014implement required regulatory disclaimers autonomously across the application.\n\nTASK & OBJECTIVE:\nIf our application features health tracking, symptom assessment, wellness guidance, or financial management, implement prominent regulatory disclaimers across onboarding and settings screens.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect onboarding flows, input forms, and calculation/assessment screens.\n2. IMPLEMENTATION:\n   - If health-related: add a conspicuous disclaimer stating that the app is for informational, educational, or wellness purposes only and does NOT constitute professional medical advice, diagnosis, or treatment.\n   - If finance-related: add a disclaimer stating that content does NOT constitute professional financial, investment, or legal advice.\n   - Display disclaimers on onboarding and require user acknowledgement before accessing sensitive calculation or assessment features.\n3. STORE COMPLIANCE: Apple Guideline 1.4 (Physical Harm) and Google Play Health Policy require explicit, prominent disclaimers for health and financial apps.\n4. VERIFICATION: Confirm disclaimers render clearly with proper contrast on mobile viewports without layout distortion.",
        "commonRejectionTraps": [
          "Claiming the app can diagnose illnesses or measure blood pressure using the camera, causing an instant ban under Guideline 1.4.1.",
          "Giving specific medical or investment guidance without prominent informational disclaimers.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are appropriate medical or financial disclaimers visible in the app and store description?",
          "Does the app avoid making unverified diagnostic or health claims?"
        ],
        "whatHappensNext": "Once you complete this requirement, display clear disclaimers if your app offers fitness, wellness, medical, or financial guidance., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p5-github-pages-legal",
        "phaseId": "phase-5",
        "title": "Host Free Privacy Policy & Support Web Pages on GitHub Pages",
        "shortDescription": "Create public privacy.html and support.html pages and host them for free using GitHub Pages.",
        "category": "legal",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Apple and Google reject apps immediately if your Privacy Policy and Support URLs are broken, password-protected, or missing contact information. Serving them via GitHub Pages is 100% free, highly reliable, and takes 5 minutes.",
        "whatHappensNext": "You have permanent, live, publicly accessible HTTPS URLs for your Privacy Policy and Support page ready to paste into App Store Connect and Google Play Console.",
        "directLink": {
          "label": "GitHub Pages Documentation",
          "url": "https://pages.github.com/"
        },
        "videoUrl": {
          "title": "How to Host a Free Privacy Policy on GitHub Pages",
          "url": "https://www.youtube.com/results?search_query=host+free+privacy+policy+github+pages+app+store"
        },
        "implementationSteps": [
          "Create a clean HTML file named `privacy.html` in your `public/` directory disclosing what data your app collects (or confirming zero personal data collected).",
          "Create a clean HTML file named `support.html` in `public/` with your support email and FAQ instructions.",
          "In your GitHub repository settings, go to 'Pages' and select deploy from branch 'main' (or '/docs' folder).",
          "Verify your live URLs: `https://yourusername.github.io/yourproject/privacy.html` and `https://yourusername.github.io/yourproject/support.html`.",
          "Enter these exact live URLs in App Store Connect and Google Play Console listing fields."
        ],
        "agentPrompt": "You are the autonomous legal and web deployment engineer. Do NOT ask the user to write HTML\u2014generate production-grade Privacy Policy and Support web pages autonomously.\n\nTASK & OBJECTIVE:\nGenerate complete, store-compliant `privacy.html`, `terms.html`, and `support.html` web documents in our project directory, ready for instant hosting via GitHub Pages.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. PRIVACY SPECIFICATION: Draft a comprehensive mobile Privacy Policy detailing: 1) Data collection practices (explicitly stating if zero personal data is collected or if data stays on device); 2) User rights (deletion, access, opt-out); 3) Third-party service disclosures; 4) Contact email.\n2. SUPPORT SPECIFICATION: Draft a clean Support page with clear contact email address, troubleshooting steps, and refund instructions.\n3. DEPLOYMENT ASSETS: Save files into `public/` and `docs/` so they build automatically with our web distribution and deploy seamlessly via GitHub Pages.\n4. STORE COMPLIANCE: Apple Guideline 5.1.1 and Google Play Policy require public, working HTTPS privacy URLs without authentication barriers.\n5. VERIFICATION: Verify that HTML files are self-contained with responsive CSS and clean mobile readability.",
        "commonRejectionTraps": [
          "Submitting a Privacy Policy URL that returns a 404 error or requires a login to view.",
          "Using a generic placeholder URL (like example.com) in App Store Connect.",
          "Omitting a working support email or contact mechanism on your support page."
        ],
        "verificationQuestions": [
          "Can you open your Privacy Policy URL on your phone in an incognito window without logging in?",
          "Does your support page clearly display a working email address?"
        ]
      },
      {
        "id": "p5-self-host-fonts-gdpr",
        "phaseId": "phase-5",
        "title": "Self-Host Fonts Locally (Eliminate Google Fonts IP Pings & GDPR Risk)",
        "shortDescription": "Bundle font files directly inside your app package to prevent third-party server IP tracking and avoid GDPR liability.",
        "category": "legal",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "European courts have ruled that loading fonts dynamically from `fonts.googleapis.com` transmits European user IP addresses to foreign servers without consent, leading to GDPR cease-and-desist warnings. Bundling fonts locally inside your app bundle protects user privacy, eliminates network pings, and guarantees offline typography.",
        "whatHappensNext": "All typography loads instantaneously from the local device bundle with zero network requests, zero GDPR privacy tracking, and full offline support.",
        "directLink": {
          "label": "Bunny Fonts (Privacy-First Open Fonts)",
          "url": "https://fonts.bunny.net/"
        },
        "videoUrl": {
          "title": "Why You Must Self-Host Fonts for GDPR Compliance",
          "url": "https://www.youtube.com/results?search_query=self+host+fonts+gdpr+compliance+google+fonts"
        },
        "implementationSteps": [
          "Download your desired font files (.woff2, .ttf, or .otf) directly to your project (e.g. `public/fonts/` or `src/assets/fonts/`).",
          "Declare fonts using CSS `@font-face` rules pointing to local relative paths rather than remote Google CDN URLs.",
          "Alternatively, utilize system font stacks (-apple-system, BlinkMacSystemFont, 'SF Pro', Roboto) which are built directly into iOS and Android hardware.",
          "Remove any external `<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com...\">` tags from `index.html`.",
          "Verify in browser network tab that opening the app produces zero outbound font requests."
        ],
        "agentPrompt": "You are the autonomous privacy and security engineer. Do NOT ask the user to manage font files\u2014audit and configure 100% local, self-hosted typography across our codebase autonomously.\n\nTASK & OBJECTIVE:\nAudit all CSS files, HTML templates, and component imports. Eliminate all external remote font CDN pings (`fonts.googleapis.com`, `fonts.gstatic.com`) and configure local font assets or system font stacks to ensure full GDPR compliance.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan `index.html`, `src/index.css`, and CSS files for external font stylesheet links or `@import url('https://fonts.googleapis.com...')`.\n2. IMPLEMENTATION:\n   - Remove remote font requests from `index.html`.\n   - Ensure all fonts are bundled locally in `public/fonts/` with `@font-face` rules or utilize the native Apple SF Pro / Android Roboto system font stack.\n   - Configure Tailwind typography configuration to prioritize local system fonts (`fontFamily: { sans: ['Google Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'] }`).\n3. STORE & LEGAL COMPLIANCE: Complies strictly with EU GDPR and German data protection standards. Guarantees that opening the app transmits zero unsolicited IP telemetry to third-party ad networks or CDN servers.\n4. VERIFICATION: Inspect Network DevTools tab on cold launch. Confirm zero outbound requests to external font servers.",
        "commonRejectionTraps": [
          "Sending user IP addresses to third-party font servers without consent, triggering European GDPR privacy complaints and legal notices.",
          "Failing to disclose third-party font server telemetry in your App Store Privacy Nutrition labels.",
          "Experiencing unstyled flash of text (FOUT) or blank screens when the user opens the app while offline or on an airplane."
        ],
        "verificationQuestions": [
          "Are all fonts served from local files or native system font stacks?",
          "Does the network tab show zero external font requests on launch?"
        ]
      }
    ]
  },
  {
    "id": "phase-6",
    "number": 6,
    "title": "Testing, Speed & Battery Health",
    "shortTitle": "Testing & Speed",
    "description": "Verify that your app runs reliably, doesn't drain battery, opens in under 2 seconds, and alerts you immediately if a crash occurs.",
    "iconName": "FlaskConical",
    "items": [
      {
        "id": "p6-automated-testing",
        "phaseId": "phase-6",
        "title": "Test the App's Main User Journey Automatically",
        "shortDescription": "Write automated tests for core user actions like logging in and saving data.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Testing everything by hand on 20 different phone models takes hours. Automated tests catch hidden bugs and breakages the moment you change code.",
        "implementationSteps": [
          "Write automated tests for calculations, state management, and critical business logic.",
          "Test the main user journey (logging in, creating an item, making a purchase) from start to finish.",
          "Run automated tests before compiling any release build."
        ],
        "agentPrompt": "You are the autonomous mobile QA engineer. Do NOT ask the user to write test cases\u2014write and configure automated integration tests autonomously for our application.\n\nTASK & OBJECTIVE:\nWrite automated integration tests for our application's primary user journey (such as onboarding, viewing items, adding a record, and completing a task) to prevent regressions.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect existing testing tools in `package.json`, component structure, and key state flows.\n2. IMPLEMENTATION:\n   - Configure a modern testing suite (Vitest / Playwright / Jest) in our project.\n   - Write comprehensive tests covering: 1) Initial application render and routing; 2) User interaction with primary controls; 3) State persistence across reloads; and 4) Error and offline boundary handling.\n   - Add a test script (`npm run test`) in `package.json` that executes all test suites and asserts clean passes.\n3. STORE COMPLIANCE: Ensures every build released to Apple TestFlight and Google Play is robust, stable, and verified against regressions.\n4. VERIFICATION: Execute the automated test command and confirm 100% test pass rate with zero failures.",
        "commonRejectionTraps": [
          "Releasing bugs on specific screen sizes or older phone models that were skipped during manual testing.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Do all automated tests pass cleanly before creating a release build?",
          "Is the main user flow verified from start to finish?"
        ],
        "whatHappensNext": "Once you complete this requirement, write automated tests for core user actions like logging in and saving data., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p6-memory-leaks",
        "phaseId": "phase-6",
        "title": "Check That the App Doesn't Run Out of Memory or Freeze",
        "shortDescription": "Audit your app so it frees up memory when screens are closed.",
        "category": "functionality",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "If an app keeps holding onto old screens in memory, the phone will eventually run out of RAM and abruptly force-close your app.",
        "implementationSteps": [
          "Profile the app in Xcode Instruments or Android Studio Memory Profiler.",
          "Navigate back and forth between screens 20 times to confirm memory usage returns to normal when screens close.",
          "Clean up active timers and listeners when components unmount."
        ],
        "agentPrompt": "You are the autonomous mobile performance engineer. Do NOT ask the user to profile memory\u2014inspect, profile, and eliminate memory leaks autonomously across our application.\n\nTASK & OBJECTIVE:\nAudit our codebase for memory leaks, unclosed listeners, and detached DOM/native views to ensure memory usage remains low and stable over extended user sessions.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Scan all React/Vue/Svelte components, `useEffect` hooks, event listeners, intervals, and subscription observables.\n2. IMPLEMENTATION:\n   - Ensure every `addEventListener`, `setInterval`, and Capacitor plugin listener has a corresponding cleanup handler in component unmount lifecycle.\n   - Implement virtualization or windowing for long scrollable lists to keep DOM node counts minimal.\n   - Downsample high-resolution images and release cached object URLs (`URL.revokeObjectURL`) when no longer needed.\n   - Verify that navigating back and forth between screens repeatedly releases allocated memory smoothly without memory buildup.\n3. STORE COMPLIANCE: Prevents out-of-memory (OOM) operating system kills on older mobile devices, maintaining 99.9%+ crash-free sessions.\n4. VERIFICATION: Verify that all hooks have proper cleanup returns and confirm `tsc --noEmit` passes cleanly.",
        "commonRejectionTraps": [
          "App abruptly crashing after 10 minutes of continuous use due to memory exhaustion.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have you tested clicking back and forth between screens repeatedly without the app slowing down?",
          "Does memory usage stay stable during extended app sessions?"
        ],
        "whatHappensNext": "Once you complete this requirement, audit your app so it frees up memory when screens are closed., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p6-android-vitals",
        "phaseId": "phase-6",
        "title": "Keep Crashes and Freezes Extremely Low",
        "shortDescription": "Keep screen freezes (ANR) below 0.47% to avoid Google Play search ranking penalties.",
        "category": "functionality",
        "platform": "android",
        "priority": "blocker",
        "storeGuideline": {
          "name": "Google Play Core Vitals Thresholds",
          "url": "https://support.google.com/googleplay/android-developer/answer/9844486"
        },
        "whyItMatters": "Google Play automatically down-ranks or adds a warning banner (\"This app may crash on your device\") to any app that freezes or crashes above their bad behavior threshold.",
        "implementationSteps": [
          "Never do heavy data parsing, disk saving, or network calls on the main screen thread.",
          "Keep your crash-free user session rate above 99.5%.",
          "Fix any freeze triggers so buttons always respond instantly when tapped."
        ],
        "agentPrompt": "You are the autonomous Android performance engineer. Do NOT ask the user to optimize code\u2014audit and optimize our application against Google Play Android Vitals thresholds autonomously.\n\nTASK & OBJECTIVE:\nAudit and optimize our application to ensure it strictly beats Google Play Android Vitals thresholds: user-perceived crash rate under 1.09% and App Not Responding (ANR) rate under 0.47%.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect long-running computations, file operations, JSON parsing, and database transactions.\n2. IMPLEMENTATION:\n   - Offload all disk I/O, heavy computations, and network calls to asynchronous background tasks, ensuring the main UI thread never blocks for more than 16ms (60 FPS target).\n   - Add try-catch error boundaries around all asynchronous operations to prevent uncaught promise rejections from crashing the app.\n   - Optimize heavy loops and reduce layout reflows during scrolling animations.\n3. STORE COMPLIANCE: Exceeding Google Play bad behavior thresholds (ANR > 0.47%, Crash > 1.09%) results in algorithmic downranking and loss of store search visibility.\n4. VERIFICATION: Test all interactions on low-spec Android emulation. Confirm zero UI thread freezes and zero uncaught exceptions.",
        "commonRejectionTraps": [
          "Freezing the screen while loading local database items during app startup.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your crash-free user session rate above 99.5%?",
          "Do all buttons react immediately when tapped without freezing the UI?"
        ],
        "whatHappensNext": "Once you complete this requirement, keep screen freezes (ANR) below 0.47% to avoid Google Play search ranking penalties., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p6-cold-launch",
        "phaseId": "phase-6",
        "title": "Make the App Open Fast (Under 2 Seconds)",
        "shortDescription": "Optimize startup speed so users aren't staring at a blank screen.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Users abandon slow-loading apps. iOS will terminate an app if it takes too long to launch, and users perceive anything over 2 seconds as sluggish.",
        "implementationSteps": [
          "Measure the time from tapping the app icon to the first interactive screen (target under 1 second on modern phones).",
          "Delay initializing non-essential third-party analytics or ad tools until AFTER the first screen is visible.",
          "Load initial screen data efficiently so users see content immediately."
        ],
        "agentPrompt": "You are the autonomous mobile startup performance engineer. Do NOT ask the user to tune startup performance\u2014optimize our application cold launch sequence autonomously to render in under 2 seconds.\n\nTASK & OBJECTIVE:\nOptimize our application's cold launch sequence to achieve fully interactive screen rendering in under 2.0 seconds on physical mobile devices.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `index.html`, `main.tsx`, initial imports, bundle chunks, and third-party SDK initializations.\n2. IMPLEMENTATION:\n   - Defer initialization of non-essential SDKs (analytics, error reporting, marketing tools) until after the first screen is rendered and interactive (`requestIdleCallback` or post-mount).\n   - Use dynamic `import()` code-splitting for secondary screens, modals, and heavy libraries to reduce initial JavaScript bundle size.\n   - Pre-cache critical CSS and fonts to prevent layout shift (CLS) during boot.\n   - Measure startup timing using `performance.mark()` and ensure time-to-interactive (TTI) stays strictly under 2.0 seconds.\n3. STORE COMPLIANCE: Apple and Android watchdogs automatically kill apps that take too long to start up, triggering immediate launch crashes.\n4. VERIFICATION: Test launch speed in production build. Confirm instantaneous transition from splash to dashboard.",
        "commonRejectionTraps": [
          "Initializing 10 different third-party SDKs at the exact same moment on launch, stalling startup.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the initial screen render in under 2 seconds on a mid-range phone?",
          "Are optional analytics tools initialized in the background after the first screen loads?"
        ],
        "whatHappensNext": "Once you complete this requirement, optimize startup speed so users aren't staring at a blank screen., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p6-crash-reporting",
        "phaseId": "phase-6",
        "title": "Set Up Instant Crash Alerts to Fix Bugs Quickly",
        "shortDescription": "Add a crash reporting tool so you can see the exact line number of any bug.",
        "category": "cicd",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Without crash reporting, you have no idea why an app crashed on a user's phone. Proper crash reporting shows you the exact screen, phone model, and code line that caused the issue.",
        "implementationSteps": [
          "Integrate a reputable crash reporting tool (such as Firebase Crashlytics or Sentry).",
          "Configure your build scripts to upload symbol files automatically with every release.",
          "Trigger a deliberate test crash in development to verify that full details appear on your dashboard."
        ],
        "agentPrompt": "You are the autonomous mobile observability engineer. Do NOT ask the user to integrate tracking\u2014integrate real-time crash reporting and diagnostic breadcrumbs autonomously.\n\nTASK & OBJECTIVE:\nIntegrate a real-time crash and error reporting solution (such as Sentry or Firebase Crashlytics) and configure it to capture stack traces, device context, and user breadcrumbs.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect root error boundaries, unhandled promise rejection listeners, and build scripts.\n2. IMPLEMENTATION:\n   - Configure the crash reporting SDK with global unhandled error handlers and unhandled promise rejection hooks.\n   - Implement breadcrumb logging: automatically record route transitions, network requests, and user button taps leading up to any crash.\n   - Configure automated source map and native debug symbol (dSYM / ProGuard mapping) uploads during CI/CD builds so all stack traces display exact source filenames and line numbers.\n   - Ensure user personal data (passwords, tokens, emails) is strictly sanitized and omitted from crash payloads.\n3. STORE COMPLIANCE: Enables immediate hotfix triage within minutes of release rather than waiting for negative store reviews.\n4. VERIFICATION: Trigger a test caught error in development mode. Confirm breadcrumbs and stack traces format cleanly with zero compilation errors.",
        "commonRejectionTraps": [
          "Launching to production without crash reporting, leaving you completely blind when users report bugs.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does a deliberate test crash produce a clear, readable report on your crash dashboard?",
          "Are symbol files uploaded automatically during release builds?"
        ],
        "whatHappensNext": "Once you complete this requirement, add a crash reporting tool so you can see the exact line number of any bug., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p6-network-throttling",
        "phaseId": "phase-6",
        "title": "Test Under 3G Latency & Flaky Connection Throttling",
        "shortDescription": "Prevent app hangs, infinite loaders, and unhandled white screens on slow cellular connections.",
        "category": "functionality",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Apple App Review and real users test on cellular data with high ping and packet loss. If your app hangs indefinitely on slow requests or throws unhandled white screens, it will be rejected under Guideline 2.1.",
        "implementationSteps": [
          "Test the app using Network Link Conditioner set to '3G' or 'Very Bad Network'.",
          "Set strict 15-second request timeouts with user-friendly retry banners.",
          "Cache recent GET responses so slow connections render stale data immediately rather than an empty screen."
        ],
        "agentPrompt": "You are the autonomous mobile network reliability engineer. Do NOT ask the user to test slow networks\u2014implement graceful network degradation, timeouts, and offline banners autonomously.\n\nTASK & OBJECTIVE:\nHarden all application data fetching and mutations against high latency, packet loss, and flaky mobile connections (3G/Edge simulation), ensuring the UI never hangs indefinitely.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect fetch utilities, state loaders, and asynchronous action dispatchers.\n2. IMPLEMENTATION:\n   - Implement an explicit timeout on all network requests (e.g., abort controller timeout after 10 seconds) so queries fail fast rather than hanging indefinitely.\n   - When a network request times out or fails due to poor connectivity, display a non-intrusive floating toast/banner with a prominent \"Retry\" button.\n   - Ensure the UI gracefully renders existing cached data while alerting the user of connectivity issues without destroying visible content.\n   - Prevent blocking the main thread or disabling navigation while background network queries are in flight.\n3. STORE COMPLIANCE: Apple and Google reviewers intentionally test apps behind simulated throttled networks and NAT64 IPv6-only environments; unhandled network hangs cause instant review failure.\n4. VERIFICATION: Test with artificial latency and dropped packets in dev tools. Confirm timeouts trigger friendly retry alerts and cached data persists.",
        "commonRejectionTraps": [
          "App stalling on an infinite spinner when a backend request takes longer than 15 seconds during Apple review.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does every API call have a timeout handler that shows a clear retry option?",
          "Does the app remain completely responsive when network speed is throttled to 3G?"
        ],
        "whatHappensNext": "Once you complete this requirement, prevent app hangs, infinite loaders, and unhandled white screens on slow cellular connections., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p6-bundle-size-compression",
        "phaseId": "phase-6",
        "title": "Optimize Binary Download Size & Asset Compression",
        "shortDescription": "Keep over-the-air binary download under Apple's 200MB cellular limit with WebP compression.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Apps over 200MB cannot be downloaded over cellular networks without explicit user confirmation on iOS. Bloated bundles directly harm app download conversion rates by up to 30%.",
        "implementationSteps": [
          "Convert all PNG and JPEG graphics to WebP or SVG format with lossless vector scaling.",
          "Enable tree-shaking, dynamic code-splitting, and minification in your bundler config.",
          "Run Xcode Archive analysis to verify the uncompressed universal binary size is well under 100MB."
        ],
        "agentPrompt": "You are the autonomous mobile performance and bundle optimization engineer. Do NOT ask the user to analyze bundles\u2014audit and compress application assets and JavaScript chunks autonomously.\n\nTASK & OBJECTIVE:\nAnalyze our production build bundle, optimize code-splitting, tree-shake unused dependencies, and compress all image assets to achieve the fastest possible download times on mobile networks.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `vite.config.ts`, `package.json`, and the `public/` and `src/assets/` asset folders.\n2. IMPLEMENTATION:\n   - Configure dynamic imports (`React.lazy` / `import()`) in routing to split secondary routes, modals, and heavy utilities into on-demand chunks.\n   - Audit icon and utility libraries: ensure selective named imports are used (e.g. importing individual icons from `lucide-react`) to enable full tree-shaking and eliminate unused icon bundles.\n   - Compress all PNG/JPEG images into modern WebP format or optimized SVGs, ensuring no single image asset exceeds 200KB.\n   - Configure build minification (Terser / esbuild) with `drop_console: true` in production release builds.\n3. STORE COMPLIANCE: Keeping the initial cellular over-the-air download package compact dramatically improves conversion rates on App Store and Google Play listings.\n4. VERIFICATION: Run `npm run build`. Verify chunk sizes and confirm that the primary bundle stays well within optimal performance thresholds.",
        "commonRejectionTraps": [
          "Accidentally bundling raw test video assets or uncompressed 4K images into the application package.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your final production IPA/AAB package download size under 100MB?",
          "Are all non-vector static images compressed using WebP or modern image formats?"
        ],
        "whatHappensNext": "Once you complete this requirement, keep over-the-air binary download under Apple's 200MB cellular limit with WebP compression., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-7",
    "number": 7,
    "title": "App Store Listing, Pictures & ASO",
    "shortTitle": "Store Listing & ASO",
    "description": "Write clear titles and descriptions, prepare clean screenshots showing real features, and create reviewer demo logins.",
    "iconName": "Image",
    "items": [
      {
        "id": "p7-app-metadata",
        "phaseId": "phase-7",
        "title": "Write Clear App Store Titles, Descriptions, and Keywords",
        "shortDescription": "Follow character limits and avoid forbidden promotional words like \"Free\" or \"#1 App\".",
        "category": "store",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Guideline 2.3 & Play Store Listing Policy",
          "url": "https://developer.apple.com/app-store/review/guidelines/#accurate-metadata"
        },
        "whyItMatters": "Using prohibited claims (like \"Best App 2026\", \"Free Download\", or mentioning \"Android\" on the Apple App Store) causes instant metadata rejection.",
        "implementationSteps": [
          "App Store: Name (up to 30 chars), Subtitle (up to 30 chars), Keywords (up to 100 chars comma-separated with NO spaces).",
          "Google Play: App Title (up to 30 chars), Short Description (up to 80 chars), Full Description (up to 4000 chars).",
          "Never mention competitor platforms (no \"Android\" on Apple, no \"iPhone\" on Google).",
          "Never put pricing claims in titles (no \"Free\", \"Sale\", or \"Discount\")."
        ],
        "agentPrompt": "You are the autonomous App Store Optimization (ASO) specialist and copywriter. Do NOT ask the user to write marketing copy\u2014generate a complete, store-compliant metadata package autonomously.\n\nTASK & OBJECTIVE:\nGenerate a high-converting, fully store-compliant metadata package for Apple App Store and Google Play listings, with zero use of forbidden promotional buzzwords.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect our application features, unique selling points, and target user problems.\n2. IMPLEMENTATION:\n   - App Title: under 30 characters, clean, descriptive, and memorable.\n   - Subtitle: under 30 characters, highlighting the core benefit.\n   - Keyword Field: exactly 100 characters of high-relevance, comma-separated keywords without spaces.\n   - Description: formatted with structured paragraphs, feature bullet points, and social proof.\n   - Ensure ZERO use of prohibited promotional claims like \"Free\", \"Best App\", \"#1\", or competitor trademark names.\n   - Save the complete metadata package to `docs/app-store-metadata.json` or markdown spec.\n3. STORE COMPLIANCE: Apple Guideline 2.3 and Google Play metadata policy reject submissions containing price references, superlative claims (\"#1\"), or spammy keyword stuffing.\n4. VERIFICATION: Verify character counts of title (<=30), subtitle (<=30), and keyword field (<=100).",
        "commonRejectionTraps": [
          "Putting \"Free\" or price claims in your app title on either store.",
          "Writing \"Also available on Android\" in your Apple App Store description.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are your title and subtitle both under 30 characters?",
          "Are all competitor platform mentions stripped from your text and keywords?"
        ],
        "whatHappensNext": "Once you complete this requirement, follow character limits and avoid forbidden promotional words like \"Free\" or \"#1 App\"., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p7-screenshots-video",
        "phaseId": "phase-7",
        "title": "Create High-Resolution Store Screenshots (Exact Dimensions & Tools)",
        "shortDescription": "Prepare screenshots for 6.9\" iPhone 16 Pro Max, 6.7\", 6.5\", 13\" iPad Pro, and Google Play phone/tablets.",
        "category": "store",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "App Store Connect blocks submission if required screenshot dimensions (specifically 6.9\" / 6.7\" iPhone displays) are missing. Screenshots must show the real app, not just abstract drawings.",
        "implementationSteps": [
          "iOS: Export screenshots for 6.9\" / 6.7\" iPhone displays (e.g. 1290x2796px or 1320x2868px) and iPad if iPad-compatible.",
          "Google Play: Provide at least 2 phone screenshots and a 1024x500px Feature Graphic banner.",
          "Make sure device mockup frames match the target platform (no Android frames in Apple screenshots)."
        ],
        "agentPrompt": "You are the autonomous mobile marketing designer. Do NOT ask the user to design screenshots\u2014plan and generate specifications for high-converting app store screenshot mockups autonomously.\n\nTASK & OBJECTIVE:\nPlan, design, and specify high-converting app store screenshot mockups showcasing real in-app UI across modern Apple iPhone and Google Play dimensions.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect key user workflows, high-value screens, and visual components in our app.\n2. IMPLEMENTATION:\n   - Outline 5 distinct screenshot frames:\n     1. Hook Frame: The primary value proposition in action.\n     2. Core Feature: The main interactive tool that solves the user's problem.\n     3. Secondary Feature: Offline capability, smart sync, or workflow optimization.\n     4. Insights & Analytics: Beautiful dashboards or progress tracking.\n     5. Privacy & Security: Local hardware encryption and zero-tracking pledge.\n   - Specify exact pixel dimensions: 1290x2796px (6.7\"/6.9\" iPhone Display) and 1080x2400px (Android Phone).\n   - Use authentic in-app UI with legible benefit headlines above each screen mockup.\n3. STORE COMPLIANCE: Apple Guideline 2.3 strictly requires screenshots to display actual in-app footage rather than generic lifestyle advertisements.\n4. VERIFICATION: Ensure screenshot plan documents exact dimensions, captions, and screen states ready for export.",
        "commonRejectionTraps": [
          "Uploading screenshots with incorrect pixel dimensions.",
          "Showing an Android phone mockup frame in an Apple App Store screenshot.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are all required screenshot sizes exported at high resolution without pixelation?",
          "Do your screenshots showcase real, working app features?"
        ],
        "whatHappensNext": "Your store listing displays pixel-perfect screenshot mockups with legible benefit headlines, meeting all App Store Connect and Google Play upload requirements on the first try.",
        "directLink": {
          "label": "Shots.so - Free Screenshot Mockup Tool",
          "url": "https://shots.so/"
        },
        "videoUrl": {
          "title": "How to Create App Store Screenshots Fast (Free Tools)",
          "url": "https://www.youtube.com/results?search_query=create+app+store+screenshots+fast+free+tools"
        }
      },
      {
        "id": "p7-reviewer-credentials",
        "phaseId": "phase-7",
        "title": "Provide a Demo Login for the Store Reviewer",
        "shortDescription": "Give the reviewer an active demo account with pre-filled sample data and two-factor bypassed.",
        "category": "store",
        "platform": "both",
        "priority": "blocker",
        "storeGuideline": {
          "name": "App Store Review Guideline 2.1 - App Completeness",
          "url": "https://developer.apple.com/app-store/review/guidelines/#performance"
        },
        "whyItMatters": "Over 25% of all rejections happen because the reviewer could not log into the app, got stuck on a 2FA phone text, or opened a completely empty screen and thought the app was broken.",
        "implementationSteps": [
          "Create a dedicated demo account (e.g. `reviewer@yourapp.com`) with two-factor SMS authentication turned off.",
          "Pre-fill the demo account with realistic sample items, saved projects, or profile info so they never see a blank screen.",
          "In App Store Connect review notes, provide the username, password, and brief instructions on how to test core features."
        ],
        "agentPrompt": "You are the autonomous store release coordinator. Do NOT ask the user to configure test accounts\u2014configure dedicated app review credentials and sample data autonomously.\n\nTASK & OBJECTIVE:\nConfigure a dedicated test account and realistic sample data for Apple and Google app reviewers, eliminating all onboarding friction and empty states during store review.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect authentication logic, demo data fixtures, and account validation services.\n2. IMPLEMENTATION:\n   - Create a dedicated demo reviewer account with two-factor authentication (2FA) disabled.\n   - Pre-populate the demo account with rich, realistic sample records (e.g. sample tasks, completed items, activity history) so the reviewer never lands on an empty screen.\n   - If the app includes subscriptions, grant full active entitlement status to the reviewer demo account.\n   - Generate exact \"App Review Notes\" documenting the login credentials, test phone number / SMS code, and step-by-step instructions on how to test every feature.\n3. STORE COMPLIANCE: Apple Guideline 2.1 mandates providing functional review credentials; missing or 2FA-blocked reviewer logins trigger immediate review rejection.\n4. VERIFICATION: Verify the demo account logs in seamlessly and displays populated sample data with zero errors.",
        "commonRejectionTraps": [
          "The reviewer attempts to log in and gets blocked by an SMS code sent to a phone number they don't have.",
          "Opening to a blank empty screen that makes the reviewer think the app is broken.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have you tested logging into the app using the exact demo credentials you provided?",
          "Is the demo account pre-populated with realistic sample content?"
        ],
        "whatHappensNext": "Once you complete this requirement, give the reviewer an active demo account with pre-filled sample data and two-factor bypassed., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p7-age-rating",
        "phaseId": "phase-7",
        "title": "Answer the Age Rating Questionnaire Honestly",
        "shortDescription": "Declare any mature themes, gambling, or unrestricted web browsing accurately.",
        "category": "store",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "If your app allows unrestricted web browsing to any website or contains user discussions, it must receive an appropriate age rating. Inaccuracies result in review rejection.",
        "implementationSteps": [
          "Answer the questionnaire truthfully in App Store Connect and Google Play Console.",
          "Declare if your app includes simulated gambling, mature humor, or user interactions.",
          "Unrestricted Web Browsing: If users can type any URL into an in-app browser, rate the app 17+."
        ],
        "agentPrompt": "You are the autonomous store compliance specialist. Do NOT ask the user to research questionnaires\u2014audit content and generate accurate age rating questionnaire responses autonomously.\n\nTASK & OBJECTIVE:\nAudit all application features against the International Age Rating Coalition (IARC) and Apple age rating questionnaires, generating exact, truthful declarations.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect all app content, media, user communication features, and data access.\n2. IMPLEMENTATION:\n   - Audit questions for: violence, adult content, profanity, gambling/simulated gambling, user-generated content, location sharing, and unrestricted internet access.\n   - If users can share content, declare user-to-user interaction truthfully.\n   - Generate a comprehensive age rating declaration document (`docs/age-rating-guide.md`) detailing the exact answers to select in App Store Connect and Google Play Console to receive the appropriate age badge (e.g. 4+, 9+, 12+).\n3. STORE COMPLIANCE: Mismatches between declared age ratings and actual app content trigger immediate review rejection or post-launch removal.\n4. VERIFICATION: Verify that all declared questionnaire responses align strictly with the app's real functionality.",
        "commonRejectionTraps": [
          "Rating an app 4+ when it includes an open in-app browser that can load mature web content.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does your age rating accurately reflect all content accessible inside the app?"
        ],
        "whatHappensNext": "Once you complete this requirement, declare any mature themes, gambling, or unrestricted web browsing accurately., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p7-promotional-text-aso",
        "phaseId": "phase-7",
        "title": "Craft High-Converting Promotional Text and Strategic ASO Keywords",
        "shortDescription": "Optimize the 170-character instant-edit promo text and 100-character keyword field for discovery.",
        "category": "store",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Promotional text (up to 170 characters) is the only field in App Store Connect that you can edit at ANY time without submitting a new binary build. Keywords determine search discovery.",
        "implementationSteps": [
          "Write a 170-character promotional text highlighting your core value or seasonal launch campaign.",
          "Build a 100-character keyword field using comma-separated single words without spaces (e.g. 'fitness,workout,tracker,timer').",
          "Do not repeat words already in your app title or subtitle in the keyword field."
        ],
        "agentPrompt": "You are the autonomous App Store Optimization (ASO) specialist and copywriter. Do NOT ask the user to draft marketing copy\u2014craft high-converting promotional text and keyword strings autonomously.\n\nTASK & OBJECTIVE:\nGenerate high-converting App Store promotional text and an optimized 100-character keyword string to maximize search discoverability on Apple App Store and Google Play.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE & FEATURE AUDIT: Review our application's core problem-solving features, user benefits, and target market.\n2. IMPLEMENTATION:\n   - Promotional Text (Apple): craft a 170-character marketing hook highlighting the latest update, unique value proposition, or seasonal launch benefit. (Promotional text can be updated anytime without submitting a new binary build).\n   - Keyword String (Apple): craft an exact 100-character keyword field containing high-relevance, single-word search terms separated strictly by commas with ZERO spaces (e.g. `habit,tracker,routine,planner,checklist,goals,focus,daily`). Do not repeat words already in the app title or category name.\n   - Google Play Short Description: craft an engaging, 80-character summary that compels users to tap \"Install\".\n   - Save the complete ASO text assets to `docs/app-store-aso-text.json` or markdown spec.\n3. STORE COMPLIANCE: Apple Guideline 2.3 prohibits keyword stuffing, using trademarked competitor names, or including spaces in the keyword string (spaces consume valuable character budget).\n4. VERIFICATION: Validate that the keyword string is <= 100 characters, promotional text is <= 170 characters, and short description is <= 80 characters.",
        "commonRejectionTraps": [
          "Using competitor brand names or trademarked terms in the keyword field, causing metadata rejection under Guideline 2.3.7.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is the promotional text under 170 characters and punchy?",
          "Is the keyword field comma-separated without unnecessary spaces, punctuation, or duplicate title words?"
        ],
        "whatHappensNext": "Once you complete this requirement, optimize the 170-character instant-edit promo text and 100-character keyword field for discovery., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p7-privacy-nutrition-labels",
        "phaseId": "phase-7",
        "title": "Complete App Store Privacy Nutrition Labels Accurately",
        "shortDescription": "Disclose all data types collected by your app code and third-party SDKs in App Store Connect.",
        "category": "security",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Every data type collected by your app OR third-party SDKs (Crashlytics, Mixpanel, Stripe) must be disclosed on App Store Connect. Discrepancies between your app's actual network traffic and your disclosures result in immediate submission rejection.",
        "implementationSteps": [
          "Audit all third-party SDKs in your project (analytics, crash reporters, ad networks) for collected data types.",
          "In App Store Connect > App Privacy, declare each data type (e.g. Contact Info, User ID, Usage Data, Diagnostics).",
          "Specify whether each data type is linked to the user's identity and whether it is used for tracking."
        ],
        "agentPrompt": "You are the autonomous mobile privacy and compliance engineer. Do NOT ask the user to decode privacy categories\u2014generate the exact App Store Privacy Nutrition Labels specification autonomously.\n\nTASK & OBJECTIVE:\nGenerate an exhaustive mapping of all data collected by our application code and third-party SDKs, formatted for the App Store Connect Privacy Nutrition Label questionnaire.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect all dependencies, telemetry SDKs, authentication flows, and storage mechanisms.\n2. IMPLEMENTATION:\n   - Generate a detailed specification document (`docs/privacy-nutrition-labels.md`) classifying all data into Apple's official categories:\n     - Contact Info (Name, Email Address)\n     - User Content (User photos, files, or created projects)\n     - Identifiers (User ID, Device ID)\n     - Usage Data (Product Interaction, Crash Data, Performance Diagnostics)\n   - For every collected category, specify: 1) Purpose of Collection (App Functionality, Analytics, Developer Communications); 2) Whether data is linked to the user's identity; and 3) Whether data is used for tracking purposes across other apps.\n3. STORE COMPLIANCE: Apple App Store Connect requires 100% truthful completion of Privacy Nutrition Labels before submitting any build. Discrepancies between labels and actual network traffic result in immediate rejection.\n4. VERIFICATION: Confirm that privacy declarations match the contents of `PrivacyInfo.xcprivacy` and our in-app Privacy Policy.",
        "commonRejectionTraps": [
          "Declaring 'We do not collect data' while including Firebase Analytics or Sentry, which collect device identifiers and diagnostics.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have all third-party SDK data collections been added to App Privacy in App Store Connect?",
          "Do your disclosures match your PrivacyInfo.xcprivacy manifest exactly?"
        ],
        "whatHappensNext": "Once you complete this requirement, disclose all data types collected by your app code and third-party SDKs in App Store Connect., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-8",
    "number": 8,
    "title": "App Signing, Testing & CI/CD",
    "shortTitle": "Signing & Testing",
    "description": "Set up your official developer certificates, create your Android signing key, and test with beta users on TestFlight and Google Play.",
    "iconName": "Wrench",
    "items": [
      {
        "id": "p8-ios-signing",
        "phaseId": "phase-8",
        "title": "Set Up Apple Code Signing Certificates",
        "shortDescription": "Configure distribution certificates, App ID capabilities, and provisioning profiles.",
        "category": "cicd",
        "platform": "ios",
        "priority": "blocker",
        "whyItMatters": "Apple devices only run code signed with a valid Apple Developer Certificate. Mismatched certificates or missing capabilities prevent you from building release archives.",
        "implementationSteps": [
          "Create an Apple Distribution Certificate in your Apple Developer account.",
          "Ensure your App ID includes all required capabilities (like Push Notifications or Sign in with Apple).",
          "Create an App Store Distribution Provisioning Profile matching your App ID.",
          "Select your Apple Distribution profile for release archiving in Xcode."
        ],
        "agentPrompt": "You are the autonomous iOS DevOps engineer. Do NOT ask the user to configure certificates\u2014configure Apple code signing certificates and provisioning profiles autonomously.\n\nTASK & OBJECTIVE:\nConfigure Apple code signing, distribution certificates, and provisioning profiles for our project in Xcode, ensuring all needed entitlements are cleanly integrated.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `ios/App/App.xcodeproj`, `ios/App/App/App.entitlements`, and bundle identifier settings.\n2. IMPLEMENTATION:\n   - Configure automatic or manual code signing for Release and Debug configurations.\n   - Set up the explicit App ID matching our bundle identifier (`com.company.appname`) in Apple Developer settings.\n   - Configure required capabilities in `App.entitlements` (e.g. Associated Domains for Universal Links, Push Notifications, In-App Purchase).\n   - Ensure the Apple Distribution certificate and App Store provisioning profile are properly referenced in the Xcode build settings.\n3. STORE COMPLIANCE: Release builds uploaded to App Store Connect must be signed with a valid Apple Distribution certificate and App Store profile.\n4. VERIFICATION: Verify that Xcode archive validation completes without provisioning or entitlement mismatches.",
        "commonRejectionTraps": [
          "Archiving with a development certificate instead of an App Store Distribution certificate.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your release build signed with a valid Apple Distribution Certificate?",
          "Do all capabilities in your Xcode project match your Developer Portal settings?"
        ],
        "whatHappensNext": "Once you complete this requirement, configure distribution certificates, App ID capabilities, and provisioning profiles., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p8-android-keystore",
        "phaseId": "phase-8",
        "title": "Create and Securely Save Your Android Signing Key",
        "shortDescription": "Generate your private upload keystore and enroll in Google Play App Signing.",
        "category": "cicd",
        "platform": "android",
        "priority": "blocker",
        "whyItMatters": "If you lose your Android private signing key and did not enroll in Google Play App Signing, you can never update your app again and must publish an entirely new listing.",
        "implementationSteps": [
          "Generate an upload keystore file using the `keytool` command.",
          "Store your keystore file and passwords in an encrypted password manager (never commit passwords to GitHub).",
          "Enroll in Google Play App Signing so Google safely manages your master signing key."
        ],
        "agentPrompt": "You are the autonomous Android DevOps engineer. Do NOT ask the user to run keytool\u2014generate and configure a secure Android release upload keystore autonomously.\n\nTASK & OBJECTIVE:\nGenerate a secure Android release upload keystore using `keytool` and configure Gradle to sign release builds securely without checking secrets into version control.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `android/app/build.gradle`, `.gitignore`, and project environment configs.\n2. IMPLEMENTATION:\n   - Generate a 2048-bit RSA release keystore command with 25-year validity (`-validity 10000`).\n   - Configure `android/app/build.gradle` with a `signingConfigs.release` block that reads keystore path, alias, and passwords securely from local environment variables or an untracked `key.properties` file.\n   - Add `*.keystore`, `*.jks`, and `key.properties` to `.gitignore` so secrets are never committed to public repositories.\n   - Document the secure backup protocol for the upload key (losing the key prevents publishing updates on Google Play).\n3. STORE COMPLIANCE: Android App Bundles (.aab) uploaded to Google Play Console must be signed with a valid release keystore.\n4. VERIFICATION: Verify that release build signing configuration reads environment variables correctly without syntax errors.",
        "commonRejectionTraps": [
          "Accidentally committing keystore passwords into a public GitHub repository.",
          "Losing your keystore file without having a backup.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your upload keystore file and password backed up in a secure vault?",
          "Is Google Play App Signing turned on in the Google Play Console?"
        ],
        "whatHappensNext": "Once you complete this requirement, generate your private upload keystore and enroll in Google Play App Signing., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p8-google-20-testers",
        "phaseId": "phase-8",
        "title": "Complete Google's 14-Day Closed Beta with 20 Testers",
        "shortDescription": "Fulfill Google's mandatory closed test requirement for personal developer accounts.",
        "category": "store",
        "platform": "android",
        "priority": "blocker",
        "storeGuideline": {
          "name": "Google Play Closed Testing Requirement",
          "url": "https://support.google.com/googleplay/android-developer/answer/14151465"
        },
        "whyItMatters": "Personal Google Play accounts created after November 13, 2023 CANNOT release to the public until at least 20 testers remain opted-in for 14 continuous days.",
        "implementationSteps": [
          "Publish your build to the \"Closed Testing\" track in Google Play Console.",
          "Invite at least 20 unique testers using a Google Group or email list.",
          "Ensure all 20 testers install the app and keep it on their phones for 14 full continuous days.",
          "Collect tester feedback to answer Google's production readiness questionnaire."
        ],
        "agentPrompt": "You are the autonomous Google Play release specialist. Do NOT ask the user to manage beta tracks\u2014configure Google Play's mandatory 20-tester closed testing track autonomously.\n\nTASK & OBJECTIVE:\nConfigure and manage the Google Play closed testing track for new personal developer accounts, meeting the mandatory requirement of 20 testers enrolled for 14 continuous days.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect release build artifacts, versioning, and testing documentation.\n2. IMPLEMENTATION:\n   - Configure the Closed Testing track in Google Play Console with targeted email list or Google Group.\n   - Generate the web opt-in and Android opt-in links for recruited testers.\n   - Prepare a tester engagement kit: clear onboarding instructions, feedback channels (in-app feedback or Google Form), and daily usage prompts to maintain active engagement for 14 continuous days.\n   - Draft the production access questionnaire answers detailing the test feedback received and bug fixes applied during testing.\n3. STORE COMPLIANCE: Mandatory for all personal developer accounts created after November 2023. Google Play will not grant production access without 14 continuous days of testing.\n4. VERIFICATION: Confirm closed testing track configuration and tester engagement documentation are prepared.",
        "commonRejectionTraps": [
          "Applying for production before the full 14 days have passed or with fewer than 20 active testers.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have at least 20 testers remained opted-in for 14 continuous days?",
          "Are your responses ready for Google's production access questionnaire?"
        ],
        "whatHappensNext": "Once you complete this requirement, fulfill Google's mandatory closed test requirement for personal developer accounts., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p8-testflight-beta",
        "phaseId": "phase-8",
        "title": "Send Test Builds to Friends and Beta Testers (TestFlight)",
        "shortDescription": "Distribute builds to up to 100 team members and 10,000 public beta testers on iOS.",
        "category": "cicd",
        "platform": "ios",
        "priority": "high",
        "whyItMatters": "TestFlight lets real users test your app on physical iPhones before you submit for public review, catching layout quirks and bugs early.",
        "implementationSteps": [
          "Internal Testing: Add team members (builds are ready immediately without store review).",
          "External Testing: Submit for quick Beta App Review, then share a public link with up to 10,000 testers.",
          "Include a brief note explaining what new features testers should check."
        ],
        "agentPrompt": "You are the autonomous iOS release coordinator. Do NOT ask the user to configure TestFlight\u2014configure Apple TestFlight internal and external beta distribution autonomously.\n\nTASK & OBJECTIVE:\nConfigure Apple TestFlight beta distribution for our iOS application, setting up internal team testing and external public beta groups with structured test instructions.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect app build numbers, release notes, and TestFlight configuration scripts.\n2. IMPLEMENTATION:\n   - Set up Internal Testing for up to 100 team members with instantaneous build availability upon upload.\n   - Configure External Testing for up to 10,000 public beta testers via public link or email invitation.\n   - Write clear \"What to Test\" release notes highlighting new features, critical workflows, and feedback instructions.\n   - Configure crash and screenshot feedback capture so testers can submit diagnostic reports directly from TestFlight.\n3. STORE COMPLIANCE: TestFlight builds catch edge-case crashes on real user hardware before the public App Store submission.\n4. VERIFICATION: Verify that build versioning increments cleanly and release notes are formatted properly for App Store Connect.",
        "commonRejectionTraps": [
          "Using placeholder test notes like \"bug fixes\" for external beta review.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Has your release candidate build been tested on multiple physical iPhone models via TestFlight?"
        ],
        "whatHappensNext": "Once you complete this requirement, distribute builds to up to 100 team members and 10,000 public beta testers on iOS., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p8-fastlane-cicd",
        "phaseId": "phase-8",
        "title": "Automate Building and Uploading Your App (CI/CD)",
        "shortDescription": "Automate compilation, testing, and store uploads using Fastlane or GitHub Actions.",
        "category": "cicd",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Building and uploading manually from a laptop is slow and prone to forgetting steps. Automation ensures every build is compiled cleanly and version numbers increment automatically.",
        "implementationSteps": [
          "Configure automated build commands for iOS and Android.",
          "Set up automatic build number incrementing so you never accidentally upload duplicate version numbers.",
          "Use GitHub Actions or local release scripts to upload to TestFlight and Google Play."
        ],
        "agentPrompt": "You are the autonomous mobile DevOps engineer. Do NOT ask the user to write deployment scripts\u2014implement an automated CI/CD build and upload pipeline autonomously.\n\nTASK & OBJECTIVE:\nImplement an automated continuous integration and deployment pipeline using Fastlane and GitHub Actions to build, test, and upload native bundles autonomously.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect project build scripts, dependencies, and deployment workflows.\n2. IMPLEMENTATION:\n   - Create a `fastlane/Fastfile` with automated lanes:\n     - `lane :test`: runs TypeScript checks (`tsc --noEmit`) and unit tests.\n     - `lane :beta`: increments build numbers, builds iOS `.ipa` and Android `.aab`, and uploads directly to TestFlight and Google Play Internal Testing.\n   - Create a `.github/workflows/deploy.yml` workflow file that executes automated lanes on push to the main branch.\n   - Configure secure handling of App Store Connect API keys and Google Play Service Account JSON keys via environment secrets.\n3. STORE COMPLIANCE: Eliminates human error during releases and ensures consistent, reproducible binary builds.\n4. VERIFICATION: Verify Fastlane configuration syntax and ensure build commands execute cleanly.",
        "commonRejectionTraps": [
          "Trying to upload a build with a version or build number that has already been used.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does your build script automatically increment version numbers?",
          "Can you build and upload to test tracks with a single command?"
        ],
        "whatHappensNext": "Once you complete this requirement, automate compilation, testing, and store uploads using Fastlane or GitHub Actions., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p8-signing-profiles-certificates",
        "phaseId": "phase-8",
        "title": "Manage Distribution Certificates and Provisioning Profiles",
        "shortDescription": "Set up Apple Distribution certs and provisioning profiles to avoid archive signing failures.",
        "category": "cicd",
        "platform": "ios",
        "priority": "blocker",
        "whyItMatters": "Expired Apple Distribution Certificates or mismatched App Store Provisioning Profiles prevent Xcode from archiving or cause 'Invalid Signature' errors during App Store validation.",
        "implementationSteps": [
          "In the Apple Developer portal, create an Apple Distribution Certificate and download it to your Keychain.",
          "Create an App Store Distribution Provisioning Profile bound to your explicit App ID and Distribution Certificate.",
          "In Xcode Signing & Capabilities, configure 'Automatic Signing' with your team or verify manual profiles match your bundle ID."
        ],
        "agentPrompt": "You are the autonomous iOS DevOps and release engineer. Do NOT ask the user to manage certificates in keychain\u2014configure distribution signing identities and provisioning profiles autonomously.\n\nTASK & OBJECTIVE:\nConfigure and verify Xcode distribution signing identities, team entitlements, and provisioning profiles for App Store release builds.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect `ios/App/App.xcodeproj/project.pbxproj`, `ios/App/App/App.entitlements`, and build configuration settings.\n2. IMPLEMENTATION:\n   - Configure Release build configurations to use Apple Distribution signing identity.\n   - Verify that all project capabilities declared in `App.entitlements` (such as Push Notifications, In-App Purchase, Keychain Sharing, Associated Domains) are properly provisioned in the Apple Developer Portal App ID.\n   - Set up automatic signing resolution in Xcode or provide Fastlane `match` configuration for reproducible team certificate management.\n   - Ensure the correct Team ID and Bundle ID are set across all build targets.\n3. STORE COMPLIANCE: Invalid or expired provisioning profiles cause Xcode archive validation and App Store Connect upload processing to fail immediately with \"Invalid Provisioning Profile\" or \"Missing Entitlement\".\n4. VERIFICATION: Verify Xcode project configuration files to ensure signing settings and entitlement files are valid.",
        "commonRejectionTraps": [
          "Using a Development provisioning profile instead of App Store Distribution profile when creating the archive, causing validation failure.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your Apple Distribution Certificate valid and trusted in macOS Keychain?",
          "Does the provisioning profile include all entitlements declared in your .entitlements file?"
        ],
        "whatHappensNext": "Once you complete this requirement, set up Apple Distribution certs and provisioning profiles to avoid archive signing failures., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p8-testflight-external-groups",
        "phaseId": "phase-8",
        "title": "Organize Public & External Beta Testing Groups in TestFlight",
        "shortDescription": "Distribute beta builds via TestFlight public links and collect real device logs before launch.",
        "category": "store",
        "platform": "ios",
        "priority": "high",
        "whyItMatters": "Testing with only internal team members misses real-world device fragmentation. External TestFlight testing lets you distribute to up to 10,000 users via a public link and requires a mini Apple beta review.",
        "implementationSteps": [
          "In App Store Connect > TestFlight, create an External Group (e.g., 'Beta Community Testers').",
          "Add clear 'What to Test' notes and test login credentials for the TestFlight review team.",
          "Enable Public Link to distribute the beta build to testers without collecting emails upfront."
        ],
        "agentPrompt": "You are the autonomous iOS release coordinator. Do NOT ask the user to write beta instructions\u2014organize public and external beta testing groups with structured release notes in TestFlight autonomously.\n\nTASK & OBJECTIVE:\nConfigure and organize Apple TestFlight external beta testing groups, writing structured \"What to Test\" release notes and tester feedback channels for public beta evaluation.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect the latest changes, user workflows, and test focus areas for the current release.\n2. IMPLEMENTATION:\n   - Create structured \"What to Test\" release notes for TestFlight: highlight the 3 primary workflows for testers to evaluate, specify edge cases (like offline mode or purchasing), and provide clear bug reporting steps.\n   - Configure an external testing group with a public invitation link for up to 10,000 public beta testers.\n   - Provide demo credentials and testing instructions for Apple's TestFlight Beta App Review team so external builds pass beta review within 24 hours.\n   - Document feedback triage procedures to review tester crash reports and feedback screenshots submitted via TestFlight.\n3. STORE COMPLIANCE: TestFlight external beta builds undergo an expedited Apple review; providing clear reviewer notes ensures rapid approval.\n4. VERIFICATION: Ensure TestFlight release notes and tester onboarding documentation are formatted cleanly in the project docs.",
        "commonRejectionTraps": [
          "Submitting an external TestFlight build with empty 'What to Test' notes, which Apple rejects during TestFlight review.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Has at least one external TestFlight build been tested on physical devices outside your local WiFi?",
          "Are 'What to Test' instructions clearly written for beta testers?"
        ],
        "whatHappensNext": "Once you complete this requirement, distribute beta builds via TestFlight public links and collect real device logs before launch., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-9",
    "number": 9,
    "title": "Final Review Check & Going Live",
    "shortTitle": "Submission & Review",
    "description": "Do a final audit against top rejection rules, choose manual release so you control launch timing, and know how to reply if a reviewer has questions.",
    "iconName": "Send",
    "items": [
      {
        "id": "p9-apple-rejection-audit",
        "phaseId": "phase-9",
        "title": "Do a Final Check Against Apple's Most Common Rejection Rules",
        "shortDescription": "Audit against top rejection reasons: broken buttons, placeholder text, and missing privacy details.",
        "category": "store",
        "platform": "ios",
        "priority": "blocker",
        "storeGuideline": {
          "name": "Apple App Store Review Guidelines",
          "url": "https://developer.apple.com/app-store/review/guidelines/"
        },
        "whyItMatters": "Over 85% of rejections stem from the same 5 issues: broken buttons or crashes, placeholder text, missing subscription restore buttons, or missing privacy details.",
        "implementationSteps": [
          "Verify zero broken links, zero placeholder text (\"Lorem Ipsum\"), and zero crashes.",
          "Verify that digital goods use In-App Purchase and paywalls have restore buttons.",
          "Verify that in-app account deletion is functional and easy to find.",
          "Confirm that the app provides real native utility beyond just being a mobile website."
        ],
        "agentPrompt": "You are the autonomous Apple App Store review auditor. Do NOT ask the user to audit guidelines\u2014execute an exhaustive pre-submission audit against Apple's top rejection rules autonomously.\n\nTASK & OBJECTIVE:\nExecute an exhaustive pre-submission audit of the entire codebase, assets, and metadata against the top causes of Apple App Store rejections, generating a sign-off verification report.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Audit the entire application against Apple App Store Review Guidelines.\n2. IMPLEMENTATION:\n   - Guideline 2.1 (App Completeness): Verify zero placeholder buttons, zero \"Coming Soon\" alerts, and zero crashes on clean launch.\n   - Guideline 3.1.1 (In-App Purchase): Verify digital purchases strictly use StoreKit 2 with zero external payment links.\n   - Guideline 4.0 (Design): Verify 44x44pt touch targets, safe-area inset compliance, and dynamic type support.\n   - Guideline 4.8 (Sign in with Apple): Verify native Apple login is present if social logins exist.\n   - Guideline 5.1.1 (Account Deletion): Verify in-app delete account button is fully functional.\n   - Privacy Manifest: Verify `PrivacyInfo.xcprivacy` is included in the root bundle.\n3. STORE COMPLIANCE: Eliminates 95%+ of common rejection causes before Apple reviewers inspect the build.\n4. VERIFICATION: Generate a comprehensive pre-flight compliance audit report confirming all items pass.",
        "commonRejectionTraps": [
          "App crashing on an IPv6-only network (Apple tests in an IPv6 cellular environment).",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the app work cleanly on cellular and Wi-Fi networks?",
          "Are all dummy text strings and placeholder buttons completely removed?"
        ],
        "whatHappensNext": "Once you complete this requirement, audit against top rejection reasons: broken buttons, placeholder text, and missing privacy details., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p9-google-play-audit",
        "phaseId": "phase-9",
        "title": "Do a Final Check Against Google Play Policies",
        "shortDescription": "Verify target Android version, permissions, and policy compliance.",
        "category": "store",
        "platform": "android",
        "priority": "blocker",
        "storeGuideline": {
          "name": "Google Play Developer Policy Center",
          "url": "https://play.google.com/about/developer-content-policy/"
        },
        "whyItMatters": "Google Play uses automated static analyzers that immediately reject builds targeting outdated Android versions or requesting broad permissions without justification.",
        "implementationSteps": [
          "Verify that your app targets modern Android (API 34+).",
          "If using background foreground services, verify that you provided video proof in your console form.",
          "Verify that no broad storage permissions are requested if you only need photo picking."
        ],
        "agentPrompt": "You are the autonomous Google Play policy compliance auditor. Do NOT ask the user to audit policies\u2014execute an exhaustive pre-submission audit against Google Play developer policies autonomously.\n\nTASK & OBJECTIVE:\nExecute an exhaustive pre-submission audit against all Google Play developer policies, verifying technical requirements and store listing declarations autonomously.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect Android manifest, Gradle configurations, SDK versions, and store listing metadata.\n2. IMPLEMENTATION:\n   - Verify Target SDK Version is set to modern Android standards (API 34+).\n   - Verify 64-bit architecture support in release build configurations.\n   - Audit background location permissions: ensure background location is not requested unless strictly justified.\n   - Audit Data Safety declarations against third-party SDK network calls.\n   - Verify in-app account deletion link and public web deletion URL.\n3. STORE COMPLIANCE: Prevents policy strikes, submission rejections, or account suspensions on Google Play.\n4. VERIFICATION: Verify Gradle configurations meet Google Play requirements and that no policy violations exist.",
        "commonRejectionTraps": [
          "Using a background service without providing a video recording proving the service is user-visible.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the app compile against target Android 34 or higher?",
          "Are all permission justifications filled out in the Play Console?"
        ],
        "whatHappensNext": "Once you complete this requirement, verify target Android version, permissions, and policy compliance., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p9-submission-release-type",
        "phaseId": "phase-9",
        "title": "Choose Manual Release So You Decide Exactly When to Go Live",
        "shortDescription": "Select \"Manually release this version\" instead of automatic release to coordinate your launch.",
        "category": "store",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "With automatic release, your app goes live the second the reviewer clicks approve (which could be 3:00 AM on Sunday). Manual release lets you coordinate announcements and marketing.",
        "implementationSteps": [
          "In App Store Connect, set Version Release to \"Manually release this version\".",
          "In Google Play Console, turn on \"Managed publishing\".",
          "Enable a 7-day phased rollout so initial updates roll out to a small percentage of users first."
        ],
        "agentPrompt": "You are the autonomous mobile release manager. Do NOT ask the user to manage release settings\u2014configure the phased and manual release strategy autonomously.\n\nTASK & OBJECTIVE:\nConfigure the release release strategy in App Store Connect and Google Play Console to \"Manually release this version\" and set up phased rollouts for controlled deployment.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect project release configurations and launch deployment documentation.\n2. IMPLEMENTATION:\n   - Configure the version release type in App Store Connect to \"Manually release this version\" (or \"Phased Release over 7 days\").\n   - Configure Google Play Console staged rollout parameters.\n   - Ensure the app does not publish automatically upon review approval, giving our team full control to coordinate marketing campaigns, verify server scalability, and launch during optimal business hours.\n   - Draft the deployment checklist for launch day activation.\n3. STORE COMPLIANCE: Best-practice deployment protocol recommended by Apple and Google release teams.\n4. VERIFICATION: Document manual release procedure and phased release timeline in the release guide.",
        "commonRejectionTraps": [
          "Releasing to 100% of users immediately, catching an unforeseen server bug that affects all users at once.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is \"Manually release this version\" selected in App Store Connect?",
          "Is phased release turned on to roll out gradually?"
        ],
        "whatHappensNext": "Once you complete this requirement, select \"Manually release this version\" instead of automatic release to coordinate your launch., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p9-rejection-appeal-protocol",
        "phaseId": "phase-9",
        "title": "Know How to Reply Politely If the Reviewer Rejects Your App",
        "shortDescription": "Respond constructively in the Resolution Center with a polite explanation or short demo video.",
        "category": "store",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Getting rejected on your first try is completely normal (over 40% of first submissions are rejected). Responding calmly with a short explanation or video resolves the issue fast.",
        "implementationSteps": [
          "Do not panic or send an angry reply. Read the exact guideline cited by the reviewer.",
          "If the reviewer misunderstood a feature, record a brief, friendly Loom video showing how it works and share the link.",
          "If it was a real bug, fix it, upload a new build number, and politely explain the fix you made."
        ],
        "agentPrompt": "You are the autonomous App Review communications specialist. Do NOT ask the user to draft appeals\u2014prepare standardized, courteous, and highly effective appeal protocols autonomously.\n\nTASK & OBJECTIVE:\nPrepare standardized, courteous, and highly effective appeal protocols and communication templates for Apple App Review and Google Play appeals in the event of reviewer pushback.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Review common rejection scenarios and prepare structured response frameworks.\n2. IMPLEMENTATION:\n   - Draft courteous, structured appeal templates for Apple App Review and Google Play.\n   - Structure includes: 1) Courteous acknowledgement; 2) Exact technical clarification of how the feature functions; 3) Demonstration video links; 4) Store guideline citations; and 5) Code/documentation references proving compliance.\n   - Document guidelines on when to submit an expedited review request for critical time-sensitive launches or bug fixes.\n3. STORE COMPLIANCE: Prevents confrontational developer replies that prolong review cycles; enables quick resolutions within 24 hours.\n4. VERIFICATION: Ensure appeal response templates are documented and ready for instant use.",
        "commonRejectionTraps": [
          "Submitting the exact same unchanged build without answering the reviewer's questions.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Do you have a video recording tool (like Loom) ready to show how complex features work?",
          "Do you know where the App Store Resolution Center is in App Store Connect?"
        ],
        "whatHappensNext": "Once you complete this requirement, respond constructively in the Resolution Center with a polite explanation or short demo video., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p9-reviewer-demo-video",
        "phaseId": "phase-9",
        "title": "Provide Screen Recording Walkthrough and Clear Review Notes",
        "shortDescription": "Include an unlisted video link and demo credentials for Apple reviewers in App Store Connect.",
        "category": "store",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "If your app requires special hardware, Bluetooth accessories, or geo-restricted accounts, Apple reviewers will reject under Guideline 2.1 if they cannot immediately use it. A short video walkthrough uploaded to YouTube (unlisted) prevents this.",
        "implementationSteps": [
          "Record a 60-90 second screen capture demonstrating full onboarding, core feature usage, and in-app purchase flow.",
          "Upload the video as an unlisted link on YouTube or Vimeo.",
          "Paste the video link into the 'App Review Information > Notes' field in App Store Connect alongside test credentials."
        ],
        "agentPrompt": "You are the autonomous store release coordinator. Do NOT ask the user to write reviewer instructions\u2014create comprehensive App Reviewer Notes and a demonstration walkthrough script autonomously.\n\nTASK & OBJECTIVE:\nDraft comprehensive App Review Information, reviewer credentials, test account instructions, and a video walkthrough demonstration script for Apple and Google app review teams.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect authentication flows, hardware dependencies, permission prompts, and core user actions.\n2. IMPLEMENTATION:\n   - Prepare the \"App Review Information\" notes to paste into App Store Connect and Google Play Console:\n     - Demo Account Username & Password (with 2FA disabled).\n     - Step-by-step instructions guiding the reviewer through the core value path in under 2 minutes.\n     - Clarification on any hardware or external dependencies (Bluetooth, camera, physical accessories) with a link to an unlisted YouTube/Vimeo demonstration video showing the feature on a real physical device.\n     - Direct phone number and email of our release engineer for emergency reviewer questions.\n3. STORE COMPLIANCE: Reviewers who cannot log in or understand hardware features will reject the app under Guideline 2.1 (App Completeness). A clear walkthrough prevents 90%+ of review misunderstandings.\n4. VERIFICATION: Verify that demo account credentials work smoothly and reviewer instructions cover every gated feature.",
        "commonRejectionTraps": [
          "Apple reviewer unable to test due to SMS 2FA requiring a real phone number; not providing a universal test bypass code like '000000' leads to rejection.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are test account credentials and SMS bypass codes provided in App Review Notes?",
          "If the app relies on external accessories, is a walkthrough video link included?"
        ],
        "whatHappensNext": "Once you complete this requirement, include an unlisted video link and demo credentials for Apple reviewers in App Store Connect., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p9-guideline-4-2-audit",
        "phaseId": "phase-9",
        "title": "Audit Guideline 4.2 Minimum Functionality and Value Differentiation",
        "shortDescription": "Ensure the app delivers native capabilities and is not rejected as a simple web wrapper.",
        "category": "store",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Guideline 4.2 is the #1 most common Apple rejection rule. Apple specifically rejects apps that are essentially repackaged websites without native capabilities like push notifications, offline support, or haptics.",
        "implementationSteps": [
          "Verify the app offers distinct value beyond what a user could get from opening your website in Safari.",
          "Ensure offline access, native push notifications, or camera/haptics are clearly utilized.",
          "Remove any marketing splash that refers to the app as a website or web portal."
        ],
        "agentPrompt": "You are the autonomous Apple App Store review auditor. Do NOT ask the user to research guidelines\u2014audit our app against Apple Guideline 4.2 (Minimum Functionality) autonomously.\n\nTASK & OBJECTIVE:\nExecute an in-depth audit of our application against Apple Guideline 4.2 (Minimum Functionality) to ensure rich native differentiation beyond a simple repackaged website.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect UI architecture, offline handling, native plugin integrations, and device capability usage.\n2. IMPLEMENTATION:\n   - Verify that the application provides lasting, engaging utility beyond a static brochure or web view wrapper.\n   - Ensure the app leverages native mobile capabilities: 1) Offline data persistence; 2) Tactile haptic feedback; 3) Fluid gesture-driven navigation; 4) Native push notifications or local reminders; and 5) Mobile camera or hardware integration where applicable.\n   - If the app loads web content, ensure it is wrapped in rich native UI chrome with native tabs, offline caching, and responsive native controls.\n3. STORE COMPLIANCE: Apple Guideline 4.2 is one of the most common rejection causes for hybrid/web apps (\"Your app provides a limited user experience as it is not noticeably different than a website\").\n4. VERIFICATION: Generate a Guideline 4.2 compliance summary documenting all native features and confirm zero white-screen offline states.",
        "commonRejectionTraps": [
          "Submitting an app that is simply an iframe or WebView loading a responsive marketing site without native integrations.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does the app offer distinct native mobile features beyond your standard website?",
          "Does the app function smoothly without an active internet connection?"
        ],
        "whatHappensNext": "Once you complete this requirement, ensure the app delivers native capabilities and is not rejected as a simple web wrapper., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      }
    ]
  },
  {
    "id": "phase-10",
    "number": 10,
    "title": "Troubleshooting & Live App Care",
    "shortTitle": "Troubleshooting & Care",
    "description": "Diagnose release bugs, fix deep links or subscription testing issues, and monitor early reviews.",
    "iconName": "Activity",
    "items": [
      {
        "id": "p10-crash-debugging",
        "phaseId": "phase-10",
        "title": "How to Troubleshoot a Crash That Only Happens in the Released App",
        "shortDescription": "Diagnose crashes that work fine on your laptop but crash when downloaded from the store.",
        "category": "security",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Apps often run fine in development, but crash in production if code shrinking accidentally removed a needed data model or reflection class.",
        "implementationSteps": [
          "Inspect device log files on your phone using macOS Console.app or Android logcat.",
          "If the crash mentions a missing class, add a keep rule in your code shrinking settings.",
          "Always test the signed release build on a physical phone before submitting to the store."
        ],
        "agentPrompt": "You are the autonomous mobile production diagnostics engineer. Do NOT ask the user to debug crashes\u2014set up production crash triage and automated hotfix protocols autonomously.\n\nTASK & OBJECTIVE:\nSet up a production crash triage and debugging protocol to automatically isolate, symbolicate, and diagnose fatal crashes that only occur on released physical devices.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect error handling, logging utilities, and native crash symbol configuration.\n2. IMPLEMENTATION:\n   - Configure automatic crash symbolication using uploaded dSYM and ProGuard mapping files.\n   - Implement diagnostic state capture: upon an unhandled crash, serialize device model, OS version, free disk space, network connectivity, and user breadcrumb history.\n   - Create a hotfix workflow: reproduce the crash with an automated regression test, apply the targeted fix, bump the patch version (`1.0.1`), and generate a release build ready for emergency submission.\n3. STORE COMPLIANCE: Enables immediate response to production regressions, preventing low App Store ratings and high uninstall rates.\n4. VERIFICATION: Test symbolication and error boundary recovery with a simulated crash in development mode.",
        "commonRejectionTraps": [
          "Assuming a build works because it worked in debug mode, without testing the signed release build.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Have you installed and tested the final signed release build on a physical phone?",
          "Are code shrinking keep rules configured for all saved data models?"
        ],
        "whatHappensNext": "Once you complete this requirement, diagnose crashes that work fine on your laptop but crash when downloaded from the store., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p10-deep-link-troubleshooting",
        "phaseId": "phase-10",
        "title": "How to Fix Web Links That Don't Open the App",
        "shortDescription": "Diagnose why shared web links open the browser instead of routing directly into your app.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Deep links fail silently. If your website file has a minor typo or an HTTP redirect, links will open in Safari or Chrome without showing any error message.",
        "implementationSteps": [
          "Check that your website file returns HTTP 200 with no redirects.",
          "Verify that the domain format in your app project does not include \"https://\" or trailing slashes.",
          "Query Apple's CDN cache scraper to verify that Apple successfully cached your configuration file."
        ],
        "agentPrompt": "You are the autonomous mobile deep-linking specialist. Do NOT ask the user to test links\u2014build a diagnostic and verification suite for Universal Links and Android App Links autonomously.\n\nTASK & OBJECTIVE:\nBuild a diagnostic and verification suite for Universal Links and Android App Links to quickly isolate and fix broken links, SSL certificate errors, or dropped query parameters.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect deep link handling logic, domain verification endpoints, and URL routing tables.\n2. IMPLEMENTATION:\n   - Build a diagnostic script to validate domain endpoint headers for `apple-app-site-association` and `assetlinks.json` (`Content-Type: application/json`, HTTP 200, valid SSL certificate, zero redirects).\n   - Test deep link parsing across cold-launch and warm-launch states, verifying that query parameters and path segments pass cleanly into view controllers without dropping state.\n   - Provide fallback redirection: if a user clicks a universal link on an unsupported browser, route them gracefully to a web landing page or store install prompt.\n3. STORE COMPLIANCE: Ensures high user retention and seamless marketing campaign attribution.\n4. VERIFICATION: Execute link verification tests and confirm correct route dispatching with zero console warnings.",
        "commonRejectionTraps": [
          "Redirecting your verification link with an HTTP 301/302 redirect.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does your verification file return HTTP 200 without redirects?",
          "Is your domain listed correctly in your app capabilities?"
        ],
        "whatHappensNext": "Once you complete this requirement, diagnose why shared web links open the browser instead of routing directly into your app., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p10-iap-troubleshooting",
        "phaseId": "phase-10",
        "title": "How to Fix In-App Purchase and Subscription Testing Issues",
        "shortDescription": "Diagnose missing products, sandbox errors, or auto-refunded Google purchases.",
        "category": "store",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "Payment bugs directly stop you from making money. On Android, if a purchase is not acknowledged in code within 3 days, Google automatically refunds and cancels the user's purchase.",
        "implementationSteps": [
          "App Store Connect: Verify that your Paid Applications agreement is active and bank info is accepted.",
          "Check that product IDs in your code match the exact ID created in App Store Connect and Google Play.",
          "Android: Verify that your backend or client code acknowledges every purchase within 3 days."
        ],
        "agentPrompt": "You are the autonomous In-App Purchases and billing systems engineer. Do NOT ask the user to test purchases\u2014build an end-to-end IAP diagnostic test suite autonomously.\n\nTASK & OBJECTIVE:\nBuild an end-to-end IAP diagnostic test suite for StoreKit 2 and Google Play Billing to isolate and resolve failed payments, pending transactions, and subscription renewal issues.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect purchase flows, receipt validation services, and entitlement state stores.\n2. IMPLEMENTATION:\n   - Create a local StoreKit Testing configuration file (`StoreKit.configuration`) in Xcode to simulate purchases, subscription renewals, failed transactions, billing grace periods, and family sharing locally without connecting to live App Store servers.\n   - Implement graceful UI handling for all transaction states: `purchasing` (loading spinner), `purchased` (instant unlock), `failed` (friendly user message), and `pending` (Ask to Buy parental approval).\n   - Implement robust purchase restoration that syncs all historical valid transactions with one click.\n3. STORE COMPLIANCE: StoreKit 2 sandbox testing is mandatory to prevent broken paywalls and revenue loss on launch day.\n4. VERIFICATION: Verify that local StoreKit testing configuration is in place and all purchase states trigger appropriate UI feedback.",
        "commonRejectionTraps": [
          "Forgetting to acknowledge Android purchases, causing Google to auto-refund and cancel the subscription.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Are In-App Purchases tested using official Sandbox test accounts?",
          "Is purchase acknowledgment handled properly on Android?"
        ],
        "whatHappensNext": "Once you complete this requirement, diagnose missing products, sandbox errors, or auto-refunded Google purchases., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p10-push-troubleshooting",
        "phaseId": "phase-10",
        "title": "How to Fix Push Notifications That Don't Arrive",
        "shortDescription": "Diagnose why push tokens register successfully but notifications never show up on phones.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Push notification delivery bugs can be tricky because Apple and Google silently drop notifications if the server environment (sandbox vs production) does not match.",
        "implementationSteps": [
          "Check APNs Environment: send to the sandbox push server for development builds, and the production server for App Store builds.",
          "Android: Verify that the notification is assigned to an active Notification Channel with importance set to default or high.",
          "Verify that your server updates the device token whenever the phone generates a new one."
        ],
        "agentPrompt": "You are the autonomous push notification systems engineer. Do NOT ask the user to debug notifications\u2014create an end-to-end push notification diagnostic suite autonomously.\n\nTASK & OBJECTIVE:\nCreate an end-to-end push notification diagnostic suite to verify APNs and FCM token registration, payload parsing, background handling, and notification tap routing.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect push notification registration handlers, token storage, and tap-action routing.\n2. IMPLEMENTATION:\n   - Implement APNs and FCM token registration listeners that log valid device tokens and registration status in development mode.\n   - Verify handling of notification payloads: foreground alert presentation, background silent data pushes, and badge count increment/decrement.\n   - Ensure tapping a notification deep-links the user directly to the relevant content screen rather than dumping them onto the root dashboard.\n   - Add verification for notification channel configuration on Android 13+ (mandatory notification permission and notification channels).\n3. STORE COMPLIANCE: Guarantees reliable communication with users and prevents silent delivery failures.\n4. VERIFICATION: Test push notification registration and deep-link routing with sample payloads, ensuring zero runtime errors.",
        "commonRejectionTraps": [
          "Sending production push payloads to a development sandbox token.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does your push server environment (sandbox vs production) match your app build?",
          "Do Android notifications have an active Notification Channel assigned?"
        ],
        "whatHappensNext": "Once you complete this requirement, diagnose why push tokens register successfully but notifications never show up on phones., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p10-staged-rollout-ops",
        "phaseId": "phase-10",
        "title": "Release to a Small Percentage First and Reply to Early Reviews",
        "shortDescription": "Monitor crash rates during your 7-day phased rollout and respond kindly to early user feedback.",
        "category": "store",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Catching a bug when only 1% of users have updated lets you pause the rollout, fix the issue, and release an update before 99% of your users ever notice.",
        "implementationSteps": [
          "Monitor crash dashboards hourly after starting your Day 1 (1%) phased release.",
          "If the crash rate spikes above 0.5%, immediately click \"Pause Phased Release\" in App Store Connect.",
          "Respond to any negative reviews within 24 hours with an empathetic message and a direct support email."
        ],
        "agentPrompt": "You are the autonomous mobile release operations engineer. Do NOT ask the user to monitor rollouts\u2014configure a staged rollout strategy and live app monitoring protocols autonomously.\n\nTASK & OBJECTIVE:\nConfigure a staged release (phased rollout) strategy for public store updates and set up automated health monitoring protocols to protect users from unexpected release regressions.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect release management configs, version tags, and review response procedures.\n2. IMPLEMENTATION:\n   - Configure Apple 7-day phased release schedule (Day 1: 1%, Day 2: 2%, Day 3: 5%, Day 4: 10%, Day 5: 20%, Day 6: 50%, Day 7: 100%) and Google Play staged rollout percentages.\n   - Set up automated alerting thresholds: define rules to pause rollout immediately if crash-free sessions drop below 99.5% or negative reviews spike.\n   - Create standardized, empathetic response templates to engage with early user reviews, resolve reported issues, and encourage positive rating updates.\n3. STORE COMPLIANCE: Standard industry best practice to mitigate release risks and protect app store rating averages.\n4. VERIFICATION: Document phased rollout timeline and emergency pause procedures in the release operations guide.",
        "commonRejectionTraps": [
          "Ignoring negative reviews reporting a crash that only happens on a specific phone model.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is your team checking crash dashboards during the rollout?",
          "Is someone designated to reply to new store reviews within 24 hours?"
        ],
        "whatHappensNext": "Once you complete this requirement, monitor crash rates during your 7-day phased rollout and respond kindly to early user feedback., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p10-server-status-health",
        "phaseId": "phase-10",
        "title": "Set Up Live API Health Checks, Sentry Alerts & Backend Scalability",
        "shortDescription": "Configure uptime monitors, 5xx alert webhooks, and database connection pooling for launch spikes.",
        "category": "security",
        "platform": "both",
        "priority": "blocker",
        "whyItMatters": "If your mobile app goes viral on launch day or gets featured by Apple, traffic can spike 100x within minutes. Without server health alerts and autoscaling, your backend crashes and gives all users 500 Internal Server Errors.",
        "implementationSteps": [
          "Set up uptime monitoring (e.g. BetterStack, UptimeRobot) pinging your /health endpoint every 60 seconds.",
          "Configure automated Slack or email alerts when API latency exceeds 1500ms or error rate exceeds 1%.",
          "Enable connection pooling on your database and verify CDN caching for static assets."
        ],
        "agentPrompt": "You are the autonomous mobile DevOps and infrastructure engineer. Do NOT ask the user to configure monitoring\u2014implement live API health checks and error alerting autonomously.\n\nTASK & OBJECTIVE:\nImplement live API health checks, automated backend status indicators, and client-side error alerting to catch server degradation before users encounter failed requests.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect API client configuration, base URL settings, and error boundary components.\n2. IMPLEMENTATION:\n   - Implement a lightweight client-side health-check probe (`/api/health`) that periodically verifies backend availability with low overhead.\n   - If the backend is unreachable or returning 5xx status codes, display a subtle non-blocking status banner (\"Connecting to service...\") while continuing to serve cached local data.\n   - Configure client-side telemetry to alert our operations team (via Sentry, LogRocket, or webhooks) if API error rates exceed 1% over a 5-minute rolling window.\n   - Ensure network failure handlers never show raw JSON error dumps to users.\n3. STORE COMPLIANCE: Backend outages during initial post-launch traffic surges cause immediate 1-star reviews. Graceful degradation and real-time monitoring protect app store reputation.\n4. VERIFICATION: Test simulated API failure responses (500/503). Confirm the application degrades gracefully to offline mode with user-friendly notices.",
        "commonRejectionTraps": [
          "Backend API crashing under review load because the database ran out of connection pools, causing Apple reviewers to reject for server unavailability.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Is there an automated alert sent to your team if the API goes down?",
          "Can your database handle concurrent connections during an App Store traffic surge?"
        ],
        "whatHappensNext": "Once you complete this requirement, configure uptime monitors, 5xx alert webhooks, and database connection pooling for launch spikes., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p10-force-update-changelog",
        "phaseId": "phase-10",
        "title": "Implement In-App Version Check & Critical Force-Update Prompt",
        "shortDescription": "Notify or require users to update if a breaking API schema change or security flaw is patched.",
        "category": "functionality",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "When you inevitably push a critical backend schema change or fix a severe security flaw, users on old app versions will suffer broken features. A remote version check allows you to prompt or require users to update to the latest build.",
        "implementationSteps": [
          "Create a remote configuration endpoint or Firebase Remote Config key with minimum_supported_version.",
          "On app launch, compare current app build version with minimum required version.",
          "If below minimum, present a non-dismissible modal with an 'Update on App Store' button linking directly to the store page."
        ],
        "agentPrompt": "You are the autonomous mobile release engineer. Do NOT ask the user to write version checks\u2014implement an in-app remote version check and critical force-update mechanism autonomously.\n\nTASK & OBJECTIVE:\nImplement an in-app version check mechanism on application launch that compares the installed version against a remote configuration, displaying a friendly update prompt or mandatory force-update modal.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. CODEBASE INSPECTION: Inspect app startup lifecycle, version constants, and modal dialog system.\n2. IMPLEMENTATION:\n   - Create a version check service (`src/services/versionCheck.ts`) that queries a lightweight remote JSON config or API endpoint containing `minimumSupportedVersion`, `latestVersion`, and `updateUrl`.\n   - If installed version < `minimumSupportedVersion`: display a non-dismissible modal explaining that a critical update is required, with a single button linking directly to the App Store / Google Play listing.\n   - If installed version < `latestVersion` (but >= minimum): display a dismissible banner informing the user of exciting new features with an optional \"Update Now\" action.\n   - Include a \"What's New\" changelog sheet highlighting new features after the app is updated.\n3. STORE COMPLIANCE: Allows emergency sunsetting of broken legacy API versions without breaking older clients silently or leaving security flaws unpatched.\n4. VERIFICATION: Test version check with simulated lower versions. Confirm force-update modal blocks interaction and links directly to store URLs with zero errors.",
        "commonRejectionTraps": [
          "Showing a force-update screen to Apple reviewers during initial App Store submission, preventing them from testing the submitted build.",
          "Failing to verify this feature under slow cellular network conditions or offline airplane mode, leading to silent review rejection.",
          "Submitting without documenting this feature in your App Review Notes or store declaration questionnaire."
        ],
        "verificationQuestions": [
          "Does your app have a way to prompt users when a mandatory security update is released?",
          "Does the update button open directly to your app's App Store / Google Play URL?"
        ],
        "whatHappensNext": "Once you complete this requirement, notify or require users to update if a breaking API schema change or security flaw is patched., ensuring full compliance with store policies and delivering an intuitive experience for your users."
      },
      {
        "id": "p10-native-review-prompt",
        "phaseId": "phase-10",
        "title": "Native In-App Store Review Prompt (After 15 & 30 Active Visits)",
        "shortDescription": "Prompt users for store ratings using Apple SKStoreReviewController and Google In-App Review after 15 and 30 positive visits.",
        "category": "store",
        "platform": "both",
        "priority": "high",
        "whyItMatters": "Apple and Google strictly prohibit annoying review popups on first launch or after errors. Requesting a rating using the official native store review dialog after positive milestones (e.g. 15th and 30th visits) maximizes 5-star ratings without breaking store guidelines.",
        "whatHappensNext": "Delighted, repeat users are presented with the native store rating dialog right when they have proven engagement, generating authentic positive ratings without taking them out of your app.",
        "directLink": {
          "label": "Apple Store Review Guidelines",
          "url": "https://developer.apple.com/design/human-interface-guidelines/ratings-and-reviews"
        },
        "videoUrl": {
          "title": "How to Implement Native In-App Ratings on iOS & Android",
          "url": "https://www.youtube.com/results?search_query=implement+native+in-app+ratings+skstorereviewcontroller+capacitor"
        },
        "implementationSteps": [
          "Track app session visit count in local storage (`launchready_visit_count`).",
          "When the user reaches milestone 15, trigger the native rating dialog (`SKStoreReviewController.requestReview()` on iOS, In-App Review API on Android).",
          "Prompt again at milestone 30, and never prompt again afterwards to respect user space.",
          "Never show the rating prompt when the app launches, during critical user flows, or immediately after an error.",
          "Never gate features or offer bribes/rewards for leaving 5-star reviews (strictly illegal under store rules)."
        ],
        "agentPrompt": "You are the autonomous mobile growth and store compliance engineer. Do NOT ask the user to implement review dialogs\u2014implement session-milestone native rating prompts autonomously.\n\nTASK & OBJECTIVE:\nImplement a compliant, native in-app review prompt triggered after exactly 15 and 30 successful app sessions using official Apple and Google store review APIs.\n\nSPECIFIC EXECUTION REQUIREMENTS:\n1. SESSION TRACKING: Create a lightweight hook or utility tracking active app sessions (`visitCount`) in persistent storage.\n2. CONDITIONAL TRIGGER: At exactly session count 15 and session count 30, trigger the authentic native rating dialog.\n3. PERMANENT SUPPRESSION: Once session count 30 prompt has fired, set a permanent flag preventing any further prompts.\n4. STORE COMPLIANCE: Apple Guideline 5.6.1 strictly limits rating prompts to 3 times per 365-day period and forbids custom review gating (e.g. asking \"Are you enjoying the app?\" and only routing positive users to the store). Must invoke native system review APIs directly.\n5. VERIFICATION: Test visit counter increments and confirm dialog displays gracefully without interrupting active user workflows.",
        "commonRejectionTraps": [
          "Using custom 'review gating' dialogs that filter happy users to the App Store and unhappy users to an email form (instant rejection under Apple Guideline 5.6.1).",
          "Offering in-app coins, discounts, or unlocked features in exchange for leaving a 5-star review (leads to developer account termination).",
          "Prompting for ratings on first launch before the user has experienced any value."
        ],
        "verificationQuestions": [
          "Does the rating dialog only trigger after positive user engagement (15 and 30 sessions)?",
          "Are you using official system review APIs without prohibited rating bribes or gating?"
        ]
      }
    ]
  }
];
