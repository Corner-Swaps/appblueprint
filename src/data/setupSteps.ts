import { Phase } from '../types';

export const SETUP_STEPS_PHASE: Phase = {
  id: 'phase-setup',
  number: 0,
  title: 'Step 0: Set Up & Development Environment',
  shortTitle: 'Set Up Steps',
  description: 'Complete these essential setup steps before diving into the project steps. Choose your AI model, register developer accounts, install Xcode and Android Studio, configure GitHub, and connect your phone to run tests.',
  iconName: 'Laptop',
  items: [
    {
      id: 'setup-model',
      phaseId: 'phase-setup',
      title: 'Choose Your AI Coding Environment & Frontier Model',
      shortDescription: 'Pick the right AI coding assistant (Antigravity by Google, Claude Code, Cursor, or Windsurf) for your project.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Modern autonomous AI coding agents can inspect your whole codebase, generate native screens, resolve TypeScript errors, and connect device APIs. Picking a capable frontier reasoning model saves weeks of manual coding.',
      whatHappensNext: 'You will have a specialized AI coding assistant configured on your computer with full terminal access, ready to read specifications and write production-grade code autonomously.',
      directLink: {
        label: 'Google Antigravity & AI Developer Tools',
        url: 'https://ai.google.dev/'
      },
      videoUrl: {
        title: 'How to Build Mobile Apps with Modern AI Coding Agents',
        url: 'https://www.youtube.com/results?search_query=build+mobile+app+ai+coding+agent+cursor+claude+code'
      },
      implementationSteps: [
        'Select your primary AI environment: Antigravity by Google, Claude Code CLI, Cursor, or Windsurf.',
        'Choose a frontier reasoning model (e.g. Gemini 1.5 Pro / Ultra, Claude 3.5 Sonnet, or GPT-4o) with strong software architecture capabilities.',
        'Verify your AI agent has read and write access to your project workspace folder and terminal execution permissions.',
        'Ensure the agent is instructed to write production-grade code with zero placeholders or dummy data.'
      ],
      agentPrompt: `You are the autonomous senior mobile software architect configuring our development environment.

TASK & OBJECTIVE:
Verify and configure our AI agent toolchain and workspace directory. Ensure our terminal environment has Node.js (v18+), npm/pnpm, Git, and TypeScript compiler accessible.

EXECUTION PROTOCOL FOR THE AGENT:
1. ENVIRONMENT INSPECTION: Run 'node -v', 'npm -v', 'git --version', and 'npx tsc --version' to verify installed versions.
2. CONFIGURATION: Check that project root contains 'package.json', 'tsconfig.json', and valid lockfiles.
3. CODEBASE SCAN: Ensure TypeScript compiler flags in 'tsconfig.json' enforce strict mode without allowing implicit any.
4. ZERO REGRESSIONS: Ensure all workspace dependencies are installed with clean exit code.`,
      commonRejectionTraps: [
        'Relying on AI agents without strict TypeScript validation, leading to silent runtime crashes on physical devices.',
        'Accepting placeholder or "Coming Soon" code stubs that Apple rejects under Guideline 2.1 (App Completeness).',
        'Accidentally committing private AI API keys or environment secrets directly into client-side code.'
      ],
      verificationQuestions: [
        'Is your AI coding assistant configured and able to modify files in your project directory?',
        'Does the AI model have access to terminal commands for testing and building?'
      ]
    },
    {
      id: 'setup-developer-accounts',
      phaseId: 'phase-setup',
      title: 'Enroll in Apple Developer Program & Google Play Console',
      shortDescription: 'Register official developer accounts so you have legal authorization to test on phones and publish to the stores.',
      category: 'store',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Identity and business verification takes 1 to 3 weeks. Apple charges $99/year and Google charges a $25 one-time fee. Doing this upfront prevents launch delays when your app is finished.',
      whatHappensNext: 'Your developer status is officially recognized by Apple and Google. You gain access to TestFlight beta distribution, push notifications, native capabilities, and App Store Connect.',
      directLink: {
        label: 'Enroll in Apple Developer Program',
        url: 'https://developer.apple.com/programs/enroll/'
      },
      videoUrl: {
        title: 'Apple Developer Account Enrollment Step-by-Step Guide',
        url: 'https://www.youtube.com/results?search_query=apple+developer+account+enrollment+step+by+step'
      },
      implementationSteps: [
        'Go to developer.apple.com and enroll with your Apple ID ($99/year). If enrolling as an organization, request a free D-U-N-S business number first.',
        'Go to play.google.com/console and create a Google Play Developer account ($25 one-time registration fee).',
        'Upload your government ID or business documentation for identity verification.',
        'Fill out required banking, tax, and trader declarations in App Store Connect and Google Play Console if offering in-app purchases or paid downloads.',
        'Note for Google Play personal accounts: Plan for the mandatory closed test requirement (20 testers for 14 continuous days).'
      ],
      agentPrompt: `You are the autonomous mobile release engineer responsible for store registrations and identifier mapping.

TASK & OBJECTIVE:
Inspect and standardize our app's unique Bundle Identifier and package name across all native configuration files.

EXECUTION PROTOCOL FOR THE AGENT:
1. CODEBASE INSPECTION: Inspect 'capacitor.config.ts', 'ios/App/App.xcodeproj/project.pbxproj', and Android build files.
2. STANDARDIZATION: Ensure the appId follows canonical reverse-DNS format (e.g. 'com.yourname.appname') and contains no reserved trademark terms.
3. CREDENTIAL MAPPING: Document our App Store Team ID, Bundle ID, and SKU in a clean markdown reference for store deployment.
4. ZERO REGRESSIONS: Verify that 'npx cap sync' runs without identifier mismatch warnings.`,
      commonRejectionTraps: [
        'Waiting until your app is finished to register developer accounts, causing weeks of identity review delays.',
        'Mismatch between legal account holder name and government photo ID or banking records.',
        'Attempting to publish health, financial, or kids apps under personal accounts rather than verified legal entities.'
      ],
      verificationQuestions: [
        'Has your Apple Developer enrollment been approved and showing "Active"?',
        'Have you accepted all required store agreements in App Store Connect?'
      ]
    },
    {
      id: 'setup-xcode-android-studio',
      phaseId: 'phase-setup',
      title: 'Download & Install Xcode (Mac) and Android Studio',
      shortDescription: 'Install the official Apple and Google IDEs and command-line tools to compile native mobile binaries.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Xcode is the only software authorized to compile and code-sign iOS apps for iPhones. Android Studio provides the Android SDK and Gradle build engine for Google Play packages.',
      whatHappensNext: 'Your Mac will possess the official compilers, simulators, and device bridging tools required to transform TypeScript code into real native mobile applications.',
      directLink: {
        label: 'Download Xcode from Mac App Store',
        url: 'https://apps.apple.com/us/app/xcode/id497799835'
      },
      videoUrl: {
        title: 'How to Install Xcode and Command Line Tools on Mac',
        url: 'https://www.youtube.com/results?search_query=install+xcode+command+line+tools+mac'
      },
      implementationSteps: [
        'Open the Mac App Store and download the latest version of Xcode (requires ~20 GB free disk space).',
        'Open Terminal and install command line developer tools: xcode-select --install',
        'Open Xcode once to accept the license agreement and let it install required system components.',
        'Download and install Android Studio from developer.android.com/studio to build Android APK/AAB packages.',
        'In Xcode Settings > Platforms, download the latest iOS Simulator runtime.'
      ],
      agentPrompt: `You are the autonomous mobile systems engineer verifying local native compilation toolchains.

TASK & OBJECTIVE:
Inspect and verify the local Xcode command-line tools and mobile build environment.

EXECUTION PROTOCOL FOR THE AGENT:
1. RUN DIAGNOSTICS: Run 'xcode-select -p' and 'xcrun simctl list devices' to confirm command line developer tools are active.
2. VERIFY CAPACITOR CLI: Run 'npx cap doctor' to diagnose any missing native dependencies or path misconfigurations.
3. FIX PATHS: If Xcode tools are unlinked, specify the command 'sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer'.
4. ZERO REGRESSIONS: Ensure native iOS project workspace opens cleanly without schema migration errors.`,
      commonRejectionTraps: [
        'Using an outdated Xcode version that Apple refuses to accept on App Store Connect.',
        'Missing command line developer tools, causing automated build scripts to fail with cryptic exit codes.',
        'Insufficient disk space during installation leading to corrupted Xcode platforms and derived data.'
      ],
      verificationQuestions: [
        'Does `xcodebuild -version` run in your terminal without errors?',
        'Does Xcode open and show your Apple ID in Settings > Accounts?'
      ]
    },
    {
      id: 'setup-github-repo',
      phaseId: 'phase-setup',
      title: 'Initialize Git & GitHub Repository for Cloud Backups & Localhost Tests',
      shortDescription: 'Store your codebase safely in the cloud, track revision history, and run local testing servers.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'A private GitHub repository protects your app from accidental data loss, allows safe branching for new features, and enables instant localhost web previewing during development.',
      whatHappensNext: 'Every line of code is securely backed up and versioned. You can preview changes live in your browser on localhost and roll back mistakes with a single git command.',
      directLink: {
        label: 'Create a New Repository on GitHub',
        url: 'https://github.com/new'
      },
      videoUrl: {
        title: 'Git & GitHub Tutorial for Beginners',
        url: 'https://www.youtube.com/results?search_query=git+and+github+tutorial+for+beginners+mobile+app'
      },
      implementationSteps: [
        'Initialize local git tracking in your project root: git init',
        'Create a comprehensive .gitignore file to exclude node_modules, build outputs, and private .env secrets.',
        'Create a private repository on GitHub (e.g. github.com/new).',
        'Link your local folder to GitHub: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git',
        'Push your initial commit: git add . && git commit -m "Initial commit" && git push -u origin main',
        'Run local dev server: npm run dev to test the app on your computer browser at http://localhost:5173'
      ],
      agentPrompt: `You are the autonomous senior DevOps engineer configuring our project's version control.

TASK & OBJECTIVE:
Inspect and harden our project's Git repository, .gitignore file, and local testing configurations.

EXECUTION PROTOCOL FOR THE AGENT:
1. INSPECT .GITIGNORE: Ensure 'node_modules', 'dist', 'build', '.env', '.DS_Store', 'DerivedData', and sensitive private keys are strictly ignored.
2. VERIFY STATUS: Run 'git status' to ensure no sensitive credential files or large binary caches are tracked.
3. SCRIPT AUDIT: Confirm 'npm run dev' and 'npm run build' are properly defined in 'package.json'.
4. ZERO REGRESSIONS: Ensure project compiles cleanly and local dev server spins up with zero errors.`,
      commonRejectionTraps: [
        'Accidentally committing sensitive API secret keys or payment tokens to a public GitHub repository.',
        'Missing a proper .gitignore, causing gigabytes of generated cache files to bloat the repository.',
        'Failing to back up work to GitHub, leading to catastrophic data loss if a laptop breaks or updates fail.'
      ],
      verificationQuestions: [
        'Is your code pushed to a private GitHub repository?',
        'Does `npm run dev` start a local testing server on your computer?'
      ]
    },
    {
      id: 'setup-connect-phone',
      phaseId: 'phase-setup',
      title: 'Connect Physical iPhone to Xcode & Enable Developer Mode',
      shortDescription: 'Pair your real phone via cable or Wi-Fi to test tactile haptics, animations, and real touch interactions.',
      category: 'functionality',
      platform: 'ios',
      priority: 'blocker',
      whyItMatters: 'Computer simulators cannot replicate real thumb reachability, battery consumption, offline cell signal drops, or tactile vibrations. Testing on your real iPhone is crucial before store submission.',
      whatHappensNext: 'The actual app runs directly on your iPhone hardware. You can tap real buttons, test performance in your hand, and show friends your working prototype.',
      directLink: {
        label: 'Apple Developer Mode Documentation',
        url: 'https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device'
      },
      videoUrl: {
        title: 'How to Run Xcode Apps on a Real Physical iPhone',
        url: 'https://www.youtube.com/results?search_query=how+to+run+xcode+app+on+real+physical+iphone'
      },
      implementationSteps: [
        'Connect your iPhone to your Mac using a USB-C or Lightning cable.',
        'Unlock your iPhone and tap "Trust This Computer" when prompted.',
        'On your iPhone, go to Settings > Privacy & Security > scroll down to Developer Mode, toggle it ON, and restart your iPhone.',
        'After restart, unlock your iPhone and tap "Turn On" in the Developer Mode confirmation prompt.',
        'Open your project in Xcode (npx cap open ios), select your target device at the top bar, and click the Play button to build and install.'
      ],
      agentPrompt: `You are the autonomous mobile release engineer configuring device deployment.

TASK & OBJECTIVE:
Inspect native iOS project signing configuration to ensure seamless deployment to a physical iPhone.

EXECUTION PROTOCOL FOR THE AGENT:
1. INSPECT PROJECT: Open 'ios/App/App.xcodeproj' and inspect signing settings.
2. AUTOMATIC SIGNING: Confirm that 'CODE_SIGN_STYLE = Automatic' is enabled so Xcode automatically provisions developer certificates.
3. RUN CHECKS: Run 'xcrun devicectl list devices' in terminal to detect connected physical iOS hardware.
4. ZERO REGRESSIONS: Ensure bundle identifier matches the Apple Developer provisioning profile.`,
      commonRejectionTraps: [
        'Testing solely on desktop simulators and getting rejected for device-specific crashes or camera permission bugs.',
        'Forgetting to turn on Developer Mode in iOS Settings, preventing Xcode from mounting developer disk images.',
        'Ignoring safe-area margins on real devices where Dynamic Island or home indicators obscure buttons.'
      ],
      verificationQuestions: [
        'Is Developer Mode enabled in your iPhone Settings > Privacy & Security?',
        'Does your physical iPhone appear in Xcode as a run destination?'
      ]
    },
    {
      id: 'setup-typescript-swift',
      phaseId: 'phase-setup',
      title: 'TypeScript Frontend with Native Swift & Kotlin Bridge',
      shortDescription: 'Understand how modern TypeScript combines with native Swift and Kotlin for maximum speed and store compliance.',
      category: 'design',
      platform: 'both',
      priority: 'high',
      whyItMatters: 'TypeScript gives you rapid UI iteration, strong type safety, and cross-platform flexibility. Capacitor bridges your TypeScript code directly into native Swift for iOS and Kotlin for Android.',
      whatHappensNext: 'You have a clean mental model of how your frontend code transforms into native Swift view controllers and Kotlin activities with full access to device hardware.',
      directLink: {
        label: 'Capacitor Native Bridge Architecture',
        url: 'https://capacitorjs.com/docs/core-apis'
      },
      videoUrl: {
        title: 'How Capacitor Bridges Web Apps into Native iOS Swift',
        url: 'https://www.youtube.com/results?search_query=how+capacitor+bridges+web+to+native+swift+ios'
      },
      implementationSteps: [
        'Write your frontend in TypeScript with strict typing to prevent null pointers and logic bugs.',
        'Use Capacitor plugins for native phone features (haptics, camera, keychain, network status).',
        'When you run npm run build && npx cap sync ios, Capacitor bundles your code and updates the native Swift project in Xcode.',
        'If you need custom native capabilities, you can write native Swift extensions directly in ios/App/App/ directory.',
        'For Android, Capacitor generates a standard Gradle project in android/ directory using Kotlin and Java.'
      ],
      agentPrompt: `You are the autonomous senior mobile architect responsible for our native bridge layer.

TASK & OBJECTIVE:
Inspect and verify our TypeScript compilation and native bridge synchronization pipeline.

EXECUTION PROTOCOL FOR THE AGENT:
1. COMPILE TS: Run 'npx tsc --noEmit' and resolve any remaining type errors.
2. ASSET BUNDLE: Run 'npm run build' to generate the optimized web distribution.
3. SYNC NATIVE: Run 'npx cap sync ios' and 'npx cap sync android' to update native platforms.
4. VERIFY NATIVE PLUGINS: Ensure all Capacitor plugins (Haptics, Storage, StatusBar) are linked without missing pod warnings.`,
      commonRejectionTraps: [
        'Forgetting to run "npm run build" before syncing to Xcode, resulting in an outdated app build on your phone.',
        'Using unsupported web browser APIs (like localStorage without size limits) that fail or clear unexpectedly on mobile.',
        'Bloating the web bundle with heavy dependencies, causing slow app launch times that trigger store rejection.'
      ],
      verificationQuestions: [
        'Does `npx tsc --noEmit` pass with zero errors across all files?',
        'Does `npx cap sync ios` complete without missing plugin warnings?'
      ]
    },
    {
      id: 'setup-agent-commands',
      phaseId: 'phase-setup',
      title: 'Commands for AI Agents to Build & Run to Xcode & Phone',
      shortDescription: 'Copy-ready terminal commands and prompts for your AI agents to build, sync, and deploy your app.',
      category: 'functionality',
      platform: 'both',
      priority: 'high',
      whyItMatters: 'Instead of manually clicking through complex menus, you can give your AI coding agent these standardized terminal commands to build your project and launch it on your phone automatically.',
      whatHappensNext: 'Your AI agent can autonomously compile your code, sync native plugins, open Xcode, and deploy test builds without requiring manual intervention.',
      directLink: {
        label: 'Capacitor CLI Command Reference',
        url: 'https://capacitorjs.com/docs/cli'
      },
      videoUrl: {
        title: 'Automating Mobile App Builds with Terminal Commands',
        url: 'https://www.youtube.com/results?search_query=automate+capacitor+xcode+build+terminal+commands'
      },
      implementationSteps: [
        'Step 1 (iOS Compile & Sync): npm run build && npx cap sync ios',
        'Step 2 (Open in Xcode): npx cap open ios',
        'Step 3 (Build to Physical Phone): Select your connected phone in Xcode top bar and press Cmd+R (or click Play).',
        'Step 4 (iOS App Store Archive): In Xcode, select Any iOS Device (arm64) > Product > Archive > Distribute App.',
        'Step 5 (Android Compile & Sync): npm run build && npx cap sync android',
        'Step 6 (Open in Android Studio): npx cap open android',
        'Step 7 (Google Play AAB Build): cd android && ./gradlew bundleRelease && cd .. (generates release AAB package).'
      ],
      agentPrompt: `You are the autonomous build automation engineer for this mobile project.

TASK & OBJECTIVE:
Execute our end-to-end mobile compilation and native synchronization pipeline for both Apple iOS and Google Play Android.

EXECUTION PROTOCOL FOR THE AGENT:
1. WEB ASSET BUILD:
   Run: npm run build
   Verify the build succeeds with clean exit code 0.

2. APPLE iOS SYNC & XCODE WORKSPACE:
   Run: npx cap sync ios
   Verify web assets and plugins copy cleanly to ios/App/App/public.
   Open Xcode workspace: npx cap open ios
   Automated CLI test build:
   xcodebuild -workspace ios/App/App.xcworkspace -scheme App -destination 'generic/platform=iOS' build

3. GOOGLE PLAY ANDROID SYNC & PRODUCTION AAB:
   Run: npx cap sync android
   Open Android Studio: npx cap open android
   Build release Android App Bundle (AAB):
   cd android && ./gradlew bundleRelease && cd ..
   Verify release binary is generated in 'android/app/build/outputs/bundle/release/app-release.aab'.

4. ZERO REGRESSIONS: Confirm zero compilation errors and report readiness to deploy to physical devices and store consoles.`,
      commonRejectionTraps: [
        'Trying to build an Xcode archive with Debug profile rather than Release configuration.',
        'Attempting to upload to App Store Connect without incrementing CFBundleVersion in Xcode.',
        'Submitting raw APK files to Google Play instead of the mandatory Android App Bundle (.aab) format.'
      ],
      verificationQuestions: [
        'Does `npm run build && npx cap sync ios` execute cleanly in your terminal?',
        'Does `npx cap open ios` launch your Xcode workspace properly?'
      ]
    },
    {
      id: 'setup-clear-caches',
      phaseId: 'phase-setup',
      title: 'System Maintenance: Clear Caches & Keep Computer Storage Clean',
      shortDescription: 'Free up tens of gigabytes of disk space and resolve strange compiler bugs by clearing Xcode DerivedData and package caches.',
      category: 'functionality',
      platform: 'both',
      priority: 'medium',
      whyItMatters: 'Over time, Xcode accumulates gigabytes of cached "DerivedData" build artifacts, and npm keeps duplicate packages. Clearing these caches keeps your Mac fast and prevents mysterious compilation errors.',
      whatHappensNext: 'Your computer reclaims significant storage space, and your next build starts fresh without corrupted cache files or stale dependencies.',
      directLink: {
        label: 'Xcode DerivedData Management Guide',
        url: 'https://developer.apple.com/documentation/xcode/managing-storage-in-xcode'
      },
      videoUrl: {
        title: 'How to Clear Xcode DerivedData and Free Up Mac Disk Space',
        url: 'https://www.youtube.com/results?search_query=how+to+clear+xcode+deriveddata+free+disk+space+mac'
      },
      implementationSteps: [
        'Clear Xcode DerivedData (often 20+ GB): rm -rf ~/Library/Developer/Xcode/DerivedData',
        'Clear npm package cache: npm cache clean --force',
        'Clean Android Gradle cache (if using Android): cd android && ./gradlew clean && cd ..',
        'Clean CocoaPods cache (if applicable): pod cache clean --all',
        'Re-build cleanly: npm run build && npx cap sync'
      ],
      agentPrompt: `You are the autonomous system optimization engineer maintaining our build environment.

TASK & OBJECTIVE:
Inspect and safely clear bloated temporary build caches, intermediate files, and stale dependencies.

EXECUTION PROTOCOL FOR THE AGENT:
1. SAFE DERIVEDDATA CLEANUP: Execute 'rm -rf ~/Library/Developer/Xcode/DerivedData' to clear intermediate Xcode compilation artifacts.
2. NPM CACHE CLEANUP: Execute 'npm cache clean --force' to remove stale cached packages.
3. FRESH REBUILD: Execute 'npm run build && npx cap sync ios' to re-create a clean, optimized distribution.
4. STORAGE VERIFICATION: Verify that disk space is restored and the subsequent build compiles with zero errors.`,
      commonRejectionTraps: [
        'Wasting hours debugging mysterious build failures caused by corrupted Xcode DerivedData rather than actual code bugs.',
        'Letting disk space fall below 10 GB, which causes Xcode archive generation to fail silently without clear error messages.',
        'Accidentally deleting source files instead of temporary cache directories. Always verify paths before deleting.'
      ],
      verificationQuestions: [
        'Have you cleared your Xcode DerivedData folder recently?',
        'Does your Mac have at least 25 GB of free storage for smooth builds?'
      ]
    }
  ]
};
