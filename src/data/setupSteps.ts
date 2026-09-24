import { Phase } from '../types';

export const SETUP_STEPS_PHASE: Phase = {
  id: 'phase-setup',
  number: 0,
  title: 'Set Up & Environment',
  shortTitle: 'Set Up',
  description: 'Complete these 11 foundational steps before diving into your project checklist. Configure your Mac, select your AI assistant, register developer accounts, install Xcode, and connect your phone.',
  iconName: 'Laptop',
  items: [
    {
      id: 'setup-prerequisites',
      phaseId: 'phase-setup',
      title: 'Mac Prerequisites & Node.js 20+ LTS',
      shortDescription: 'Install Node.js (v20+ LTS), npm, and Git on your Mac so your computer can build mobile applications.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Mobile development tools like Vite, React, TypeScript, and Capacitor run on top of Node.js. Installing the long-term stable (LTS) release of Node.js guarantees that all packages, build scripts, and native compilers run smoothly without mysterious version incompatibilities.',
      whatHappensNext: 'Your computer has the foundational runtime required to install mobile dependencies, run local test servers, and compile your app for iOS and Android.',
      directLink: {
        label: 'Download Node.js 20 LTS (Official Site)',
        url: 'https://nodejs.org/'
      },
      videoUrl: {
        title: 'Mac Terminal & Node.js Setup Guide',
        url: 'https://www.youtube.com/watch?v=ENrzD9HAZK4'
      },
      implementationSteps: [
        'Open the Terminal application on your Mac (press Command + Space, type "Terminal", and press Enter).',
        'Verify if Node.js is already installed by running: node -v. If it shows v20.x or higher, you are good to go!',
        'If not installed, download and run the macOS Installer (.pkg) for Node.js LTS from nodejs.org, or install Homebrew and run: brew install node@20.',
        'Install Xcode Command Line Tools by running: xcode-select --install (click "Install" on the Apple prompt).',
        'Verify your setup by running: git --version, node -v, and npm -v in Terminal.'
      ],
      agentPrompt: `You are the autonomous senior mobile DevOps and systems architect preparing our local development environment.

TASK & OBJECTIVE:
Inspect and verify our Mac system runtime prerequisites: Node.js (v20+ LTS), npm/pnpm, Git, and Apple Command Line Tools.

EXECUTION PROTOCOL FOR THE AGENT:
1. RUN DIAGNOSTICS: Execute 'node -v', 'npm -v', 'git --version', and 'xcode-select -p' in the terminal.
2. ENVIRONMENT CHECK: Ensure Node version is >= 20.0.0. If an older version is detected, provide the precise 'nvm use 20' or 'brew install node@20' command.
3. DEPENDENCY INTEGRITY: Inspect 'package.json' for valid scripts ('dev', 'build', 'preview') and verify that 'npm run build' completes with zero compilation warnings.
4. ZERO REGRESSIONS: Ensure all workspace dependencies are installed with exit code 0 and no deprecated peer dependency collisions.`,
      commonRejectionTraps: [
        'Using odd-numbered or bleeding-edge Node versions (e.g. Node 21 or 23) which frequently break native mobile compiler plugins.',
        'Installing global npm packages with "sudo", which breaks directory permissions and causes build scripts to fail.',
        'Skipping the Apple Command Line Tools installation (xcode-select --install), which causes native C++ plugins to fail compilation.'
      ],
      verificationQuestions: [
        'Does running "node -v" in Terminal output v20.x.x or higher?',
        'Does running "git --version" output a working version of Git?'
      ]
    },
    {
      id: 'setup-model',
      phaseId: 'phase-setup',
      title: 'Choose AI Coding Assistant & Models',
      shortDescription: 'Select a frontier AI coding assistant (Google Antigravity, Cursor, Windsurf, or Claude Code) and connect it to your project.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Modern AI coding tools create entire screens, wire up database actions, and debug complex native issues for you. Choosing a frontier model (like Gemini 2.5 Pro / Flash, Claude 3.7 Sonnet, or GPT-4o) ensures your assistant understands full Apple Human Interface Guidelines and store compliance rules.',
      whatHappensNext: 'Your AI assistant is connected to your project workspace, ready to turn plain-English descriptions into complete, production-ready screens.',
      directLink: {
        label: 'Google AI Developer Tools & Antigravity',
        url: 'https://ai.google.dev/'
      },
      videoUrl: {
        title: 'AI Coding Agents Setup Guide',
        url: 'https://www.youtube.com/watch?v=2hsHF_RKKWU'
      },
      implementationSteps: [
        'Select an AI coding environment: Google Antigravity, Cursor, Windsurf, or Claude Code.',
        'Open your project folder in your chosen editor so the AI can read files, inspect configurations, and make edits autonomously.',
        'Select a frontier reasoning model (such as Gemini 2.5 Pro / Flash, Claude 3.7 Sonnet, or GPT-4o) with large context memory.',
        'Provide your AI assistant with the golden instruction: "Always write complete, working code with zero dummy buttons, fake alerts, or unfinished placeholders."'
      ],
      agentPrompt: `You are the autonomous senior mobile software architect configuring our development environment.

TASK & OBJECTIVE:
Inspect and verify our AI assistant toolchain, workspace folder, and TypeScript compiler settings.

EXECUTION PROTOCOL FOR THE AGENT:
1. WORKSPACE AUDIT: Verify that the project root contains 'package.json', 'tsconfig.json', 'capacitor.config.ts', and valid lockfiles.
2. STRICT TYPING: Verify that 'tsconfig.json' enforces strict mode ('"strict": true', '"noImplicitAny": true') to catch runtime bugs before device deployment.
3. CONTEXT INTEGRATION: Ensure the AI agent can inspect both the web application ('src/') and native wrappers ('ios/', 'android/').
4. ZERO REGRESSIONS: Confirm that 'npx tsc --noEmit' passes with zero errors.`,
      commonRejectionTraps: [
        'Letting an AI assistant insert fake "Coming Soon" buttons—Apple strictly rejects apps with placeholder features under Guideline 2.1.',
        'Accepting code changes without running the app on a real phone to verify how it actually feels in your hand.',
        'Accidentally committing private API keys, database passwords, or secret tokens into git.'
      ],
      verificationQuestions: [
        'Can your AI assistant read, edit, and create files in your project directory?',
        'When you request a change, does your AI make the edit and show you the working result on screen?'
      ]
    },
    {
      id: 'setup-github-repo',
      phaseId: 'phase-setup',
      title: 'Initialize Git & Private Cloud Backup',
      shortDescription: 'Safely back up your app to a private GitHub repository so you never lose your progress or code.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Think of Git as an automatic time-machine backup for your entire app. If an AI edit breaks something or your computer has hardware trouble, you can instantly roll back to the exact second everything was working perfectly.',
      whatHappensNext: 'Every feature and screen you create is backed up securely in private cloud storage. You can experiment freely with zero fear of losing work.',
      directLink: {
        label: 'Create Private Repository on GitHub',
        url: 'https://github.com/new'
      },
      videoUrl: {
        title: 'Git & GitHub Setup for Beginners',
        url: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
      },
      implementationSteps: [
        'Create a free account at github.com if you do not already have one.',
        'Create a new PRIVATE repository named after your app (keep it Private so your business logic and ideas stay secure).',
        'Tell your AI assistant: "Initialize git in this project, set up our .gitignore to keep private keys safe, and back up our code to our private GitHub repository."',
        'Commit your progress regularly after completing each major screen or feature.'
      ],
      agentPrompt: `You are the autonomous senior DevOps engineer configuring our project's version control.

TASK & OBJECTIVE:
Inspect, harden, and verify our project's Git repository, .gitignore configuration, and backup pipeline.

EXECUTION PROTOCOL FOR THE AGENT:
1. HARDEN .GITIGNORE: Verify that '.gitignore' strictly excludes 'node_modules', 'dist', 'build', '.env', '.env.local', '.DS_Store', 'DerivedData', '*.keystore', and private signing certificates.
2. VERIFY CLEAN STATUS: Run 'git status' to ensure no sensitive credentials or large binary caches are tracked.
3. SCRIPT AUDIT: Confirm 'npm run dev', 'npm run build', and 'npx tsc' are properly configured in 'package.json'.
4. ZERO REGRESSIONS: Ensure project compiles cleanly and local dev server spins up with zero errors.`,
      commonRejectionTraps: [
        'Creating a Public GitHub repository and accidentally publishing private Supabase, Firebase, or Stripe API keys.',
        'Making large UI changes without committing first, making it difficult to revert an AI hallucination or unwanted refactor.',
        'Tracking bloated build directories like "node_modules" or "DerivedData" in git, which slows down repositories.'
      ],
      verificationQuestions: [
        'Is your project code backed up to a private repository on GitHub?',
        'Does your .gitignore prevent sensitive ".env" files from being tracked?'
      ]
    },
    {
      id: 'setup-xcode-tools',
      phaseId: 'phase-setup',
      title: 'Install Xcode & Apple Developer Tools',
      shortDescription: 'Install Apple’s official development tool from the Mac App Store so your computer can build for iPhone and iPad.',
      category: 'functionality',
      platform: 'ios',
      priority: 'blocker',
      whyItMatters: 'To install an app on an iPhone or submit it to the App Store, Apple requires a free Mac application called Xcode. You do not need to write code inside Xcode yourself—your AI assistant handles that—Xcode simply needs to be on your Mac to build the native binary.',
      whatHappensNext: 'Your Mac has Apple’s official iOS SDK and simulator engines ready to compile your app and deploy it to your physical iPhone.',
      directLink: {
        label: 'Download Xcode from the Mac App Store',
        url: 'https://apps.apple.com/us/app/xcode/id497799835'
      },
      videoUrl: {
        title: 'Install Xcode & iOS Simulators Guide',
        url: 'https://www.youtube.com/watch?v=yvp1_-dc7qc'
      },
      implementationSteps: [
        'Open the Mac App Store, search for "Xcode", and click Get / Install (requires macOS 14+ and ~25 GB free disk space).',
        'Open Xcode once after downloading, agree to the Apple License Agreement, and let it install its background components.',
        'In Xcode, go to Settings > Platforms and ensure at least one iOS Simulator runtime is installed.',
        'Tell your AI assistant: "Verify that Xcode and command-line tools are linked and ready to build our iOS project."'
      ],
      agentPrompt: `You are the autonomous mobile systems engineer verifying Apple native compilation toolchains.

TASK & OBJECTIVE:
Inspect and verify local Xcode installation, command-line developer tools, and Capacitor iOS project configuration.

EXECUTION PROTOCOL FOR THE AGENT:
1. RUN DIAGNOSTICS: Run 'xcode-select -p' to verify path points to '/Applications/Xcode.app/Contents/Developer'.
2. VERIFY SIMULATORS: Run 'xcrun simctl list devices' to confirm available iOS simulator runtimes.
3. HEALTH CHECK: Run 'npx cap doctor' to detect any missing CocoaPods or native dependency warnings.
4. ZERO REGRESSIONS: Ensure 'ios/App/App.xcodeproj' workspace compiles cleanly without schema migration errors.`,
      commonRejectionTraps: [
        'Running an outdated version of Xcode—Apple requires all submissions to be built with the latest release SDK.',
        'Running low on Mac hard drive space (less than 20 GB free), which causes Xcode builds to silently freeze or crash.',
        'Never opening Xcode once after downloading to let it finish its initial license agreement and component installation.'
      ],
      verificationQuestions: [
        'Did you open Xcode at least once and accept the Apple license agreement?',
        'Does your Mac have at least 25 GB of free storage space for fast builds?'
      ]
    },
    {
      id: 'setup-android-studio',
      phaseId: 'phase-setup',
      title: 'Install Android Studio & Android SDK',
      shortDescription: 'Install Google’s official development environment and SDK tools if you plan to launch on Google Play.',
      category: 'functionality',
      platform: 'android',
      priority: 'high',
      whyItMatters: 'Android Studio provides the Android SDK, Google Play emulator images, and the Gradle build system required to compile Android App Bundles (.aab) for Google Play. If you are building for Android, this tool is required.',
      whatHappensNext: 'Your computer is equipped with the Android SDK (API 34/35) and JDK 17/21 to build, test, and release Android apps.',
      directLink: {
        label: 'Download Android Studio (Official Site)',
        url: 'https://developer.android.com/studio'
      },
      videoUrl: {
        title: 'Android Studio Setup for Beginners',
        url: 'https://www.youtube.com/watch?v=JMBtuNqy2QI'
      },
      implementationSteps: [
        'Download and install Android Studio (Ladybug or newer) from developer.android.com/studio.',
        'Open Android Studio, select "Standard Setup", and let it download the Android SDK platform, Build-Tools, and Android Emulator.',
        'In Android Studio Settings > Languages & Frameworks > Android SDK, ensure Android 14 (API 34) or Android 15 (API 35) is checked.',
        'Tell your AI assistant: "Check that our Android project builds cleanly and syncs with Capacitor."'
      ],
      agentPrompt: `You are the autonomous Android release engineer configuring our Google Play build pipeline.

TASK & OBJECTIVE:
Inspect and verify our Android build toolchain, Gradle wrapper, Android SDK path, and JDK compatibility.

EXECUTION PROTOCOL FOR THE AGENT:
1. ENVIRONMENT INSPECTION: Verify 'ANDROID_HOME' or local.properties points to a valid Android SDK directory.
2. GRADLE & JDK CHECK: Ensure Java version is JDK 17 or 21 (compatible with modern Android Gradle Plugin 8.x+).
3. 16KB PAGE COMPLIANCE: Ensure native Android configuration is aligned for Android 15+ 16KB page size requirements.
4. ZERO REGRESSIONS: Verify that 'npx cap sync android' completes and 'cd android && ./gradlew tasks' runs cleanly.`,
      commonRejectionTraps: [
        'Targeting an outdated Android SDK—Google Play rejects new app submissions that do not target the latest Android API level.',
        'Mismatched Java JDK versions (using Java 8 instead of Java 17/21) causing Gradle build failures.',
        'Forgetting to configure 16KB memory page size alignment for Android 15+ native libraries.'
      ],
      verificationQuestions: [
        'Is Android Studio installed with Android SDK API 34/35 configured?',
        'Does your computer have Java JDK 17 or 21 installed for Gradle?'
      ]
    },
    {
      id: 'setup-developer-accounts',
      phaseId: 'phase-setup',
      title: 'Enroll Apple & Google Developer Accounts',
      shortDescription: 'Register official accounts with Apple ($99/yr) and Google ($25 one-time) so you have legal authorization to publish.',
      category: 'store',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Apple and Google require identity verification before allowing anyone to publish apps or test with external users on TestFlight. This review can take 1 to 2 weeks, so enrolling right away ensures your launch is never blocked waiting for account approval.',
      whatHappensNext: 'Your developer identity is officially verified. You gain access to App Store Connect, Google Play Console, TestFlight beta testing, and in-app purchase setups.',
      directLink: {
        label: 'Enroll in the Apple Developer Program',
        url: 'https://developer.apple.com/programs/enroll/'
      },
      videoUrl: {
        title: 'Developer Accounts & Identity Verification',
        url: 'https://www.youtube.com/watch?v=FWcmdBhCHgs'
      },
      implementationSteps: [
        'Enroll in the Apple Developer Program ($99/year) at developer.apple.com. Individual accounts require government photo ID; Company accounts require a free D-U-N-S business number.',
        'Create your Google Play Developer Account ($25 one-time fee) at play.google.com/console and complete identity verification.',
        'Choose a store-safe App Name (max 30 characters). Avoid trademarked words (e.g. do NOT include "Apple", "iPhone", or "ChatGPT" in your title to prevent instant Guideline 5.2.5 rejections).',
        'Choose a permanent reverse-DNS Bundle Identifier (e.g. "com.yourname.appname" or "com.yourcompany.appname"). This ID is permanent and cannot be changed once published.',
        'Sign all pending Paid Applications and Tax Agreements in App Store Connect (Agreements, Tax, and Banking).',
        'Google Play Requirement: Personal developer accounts must recruit 20 testers for a 14-day closed test before requesting production access.'
      ],
      agentPrompt: `You are the autonomous mobile release engineer responsible for store registrations and identifier mapping.

TASK & OBJECTIVE:
Standardize our app's unique Bundle Identifier and package name across all native configuration files.

EXECUTION PROTOCOL FOR THE AGENT:
1. CODEBASE INSPECTION: Inspect 'capacitor.config.ts', 'ios/App/App.xcodeproj/project.pbxproj', and 'android/app/build.gradle'.
2. STANDARDIZATION: Ensure the appId follows canonical reverse-DNS format (e.g. 'com.yourname.appname') with zero reserved or trademarked terms.
3. CREDENTIAL MAPPING: Document our App Store Team ID, Bundle ID, and SKU in a clean markdown reference for store deployment.
4. ZERO REGRESSIONS: Verify that 'npx cap sync' runs without identifier mismatch warnings.`,
      commonRejectionTraps: [
        'Waiting until your app is 100% finished to register—identity verification takes up to 2 weeks and will delay your launch.',
        'Using a name or credit card that does not match your official government photo ID.',
        'Forgetting to sign the latest Paid Applications and Tax agreements in App Store Connect, which disables TestFlight and In-App Purchases.'
      ],
      verificationQuestions: [
        'Does your Apple Developer account show "Active" with your membership confirmed?',
        'Have you completed identity verification in Google Play Console?'
      ]
    },
    {
      id: 'setup-connect-phone',
      phaseId: 'phase-setup',
      title: 'Connect Physical Phone & Developer Mode',
      shortDescription: 'Plug your real iPhone or Android phone into your computer to test touch gestures, animations, and tactile feel.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'A computer screen can never tell you if a button is too small for a thumb, if text is hard to read in bright sunlight, or if animations drop frames. Testing on your real phone is the single greatest secret to building an app people love.',
      whatHappensNext: 'Your app opens directly on your physical phone screen. You can hold it, tap the buttons, and experience it exactly like your future users will.',
      directLink: {
        label: 'Apple Developer Mode Documentation',
        url: 'https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device'
      },
      videoUrl: {
        title: 'Run on Physical iPhone Guide',
        url: 'https://www.youtube.com/watch?v=ZqEwUnNB-dg'
      },
      implementationSteps: [
        'Connect your iPhone to your Mac using a USB charging cable.',
        'Unlock your phone and tap "Trust This Computer" on the popup.',
        'On your iPhone, go to Settings > Privacy & Security, scroll down to "Developer Mode", turn it ON, and restart your phone.',
        'After restarting, unlock your phone and tap "Turn On" in the confirmation prompt.',
        'In Xcode: Open ios/App/App.xcworkspace, select the blue "App" target on the left, go to "Signing & Capabilities", and select your Personal Team or Apple Developer Team under "Team" (check "Automatically manage signing").',
        'Tell your AI assistant: "Build our app and install it onto my connected physical iPhone."'
      ],
      agentPrompt: `You are the autonomous mobile release engineer configuring physical device deployment.

TASK & OBJECTIVE:
Inspect native iOS signing configurations to ensure seamless deployment to a connected physical iPhone.

EXECUTION PROTOCOL FOR THE AGENT:
1. INSPECT SIGNING: Inspect 'ios/App/App.xcodeproj' and verify that 'CODE_SIGN_STYLE = Automatic' is enabled with a valid Development Team ID.
2. DETECT HARDWARE: Run 'xcrun devicectl list devices' in terminal to detect connected physical iOS hardware.
3. BUILD & DEPLOY: Execute the standard build command:
   xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Debug -destination "id=<DEVICE_ID>" -derivedDataPath ios/DerivedData build
   xcrun devicectl device install app --device <DEVICE_ID> "ios/DerivedData/Build/Products/Debug-iphoneos/App.app"
   xcrun devicectl device process launch --device <DEVICE_ID> com.slava.appblueprint
4. ZERO REGRESSIONS: Ensure app launches cleanly on the physical phone screen with zero runtime crashes.`,
      commonRejectionTraps: [
        'Only testing in a browser simulator and missing buttons that collide with the phone home bar, notch, or Dynamic Island.',
        'Forgetting to turn on Developer Mode in iPhone Settings, which prevents your computer from installing test builds.',
        'Submitting to the App Store without testing on a physical device, leading to surprise crashes during Apple review.'
      ],
      verificationQuestions: [
        'Is Developer Mode enabled in iPhone Settings > Privacy & Security?',
        'Did the app open and run directly on your physical iPhone screen?'
      ]
    },
    {
      id: 'setup-app-assets',
      phaseId: 'phase-setup',
      title: 'App Icon & Splash Screen Asset Specs',
      shortDescription: 'Generate pixel-perfect app icons (1024x1024 without alpha) and native splash screens that follow store specs.',
      category: 'design',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Submitting an app icon with transparent pixels, rounded corners, or low resolution triggers immediate automated rejection from App Store Connect. Apple requires a single 1024x1024 PNG with 100% solid opacity and automatically applies the rounded corner mask on devices.',
      whatHappensNext: 'Your app has crisp, professional icons on home screens, App Store listings, notification banners, and launch screens.',
      directLink: {
        label: 'Apple HIG - App Icons Guidelines',
        url: 'https://developer.apple.com/design/human-interface-guidelines/app-icons'
      },
      videoUrl: {
        title: 'App Icon & Splash Screen Design Specs',
        url: 'https://www.youtube.com/watch?v=MtCzNJ1EA4E'
      },
      implementationSteps: [
        'Create your master app icon at exactly 1024 x 1024 pixels in square format.',
        'IMPORTANT: Keep corners square (do NOT round the corners yourself) and ensure 100% solid background (NO transparent pixels).',
        'Place your main symbol in the center 80% safe zone so it is never clipped by the OS squircle mask.',
        'Create a native LaunchScreen storyboard or splash asset that matches your app\'s initial background color.',
        'Tell your AI assistant: "Generate and synchronize our production app icons and splash screens across iOS and Android."'
      ],
      agentPrompt: `You are the autonomous mobile asset optimization engineer.

TASK & OBJECTIVE:
Inspect, validate, and synchronize production app icons and launch screen assets across iOS and Android native asset catalogs.

EXECUTION PROTOCOL FOR THE AGENT:
1. SPECIFICATION AUDIT:
   - iOS App Store Icon: Must be 1024x1024 PNG, Color Space sRGB or Display P3, 8-bit or 16-bit, completely opaque (no alpha channel).
   - Verify no alpha channel: Run 'python3 -c "from PIL import Image; im=Image.open(\\"ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png\\"); print(im.mode)"' (must be 'RGB', not 'RGBA').
2. NATIVE ASSET CATALOGS:
   - iOS: Populate 'ios/App/App/Assets.xcassets/AppIcon.appiconset' and 'Splash.imageset'.
   - Android: Populate 'android/app/src/main/res/mipmap-*' with adaptive icon foreground and background.
3. STORYBOARD SYNC: Ensure 'LaunchScreen.storyboard' background color matches WKWebView backgroundColor in 'capacitor.config.ts' for zero-flash launches.
4. ZERO REGRESSIONS: Ensure 'npx cap sync' completes cleanly and app icon renders sharply on test devices.`,
      commonRejectionTraps: [
        'Uploading an icon with transparency (alpha channel)—App Store Connect rejects the upload with error ITMS-90717.',
        'Rounding icon corners in Photoshop or Figma—Apple automatically rounds corners; pre-rounding creates ugly black borders.',
        'Mismatched splash screen colors causing a bright white flash during cold app launch.'
      ],
      verificationQuestions: [
        'Is your master icon 1024x1024 pixels with 100% solid opacity (no transparency)?',
        'Does the splash screen match your app\'s initial theme without flashing?'
      ]
    },
    {
      id: 'setup-typescript-swift',
      phaseId: 'phase-setup',
      title: 'TypeScript, React & The Native Bridge',
      shortDescription: 'Understand how your app connects modern web code (React & Tailwind) to native phone features like haptics.',
      category: 'design',
      platform: 'both',
      priority: 'high',
      whyItMatters: 'You do not need to learn Swift or Kotlin to build world-class mobile apps. You build your user interface using friendly, modern web building blocks (TypeScript, React, Tailwind CSS), and Capacitor automatically translates them into native phone features like tactile vibrations, camera, and secure storage.',
      whatHappensNext: 'You understand how your screens communicate with your phone\'s hardware, giving you native 120fps performance without writing complex Swift or Kotlin.',
      directLink: {
        label: 'Capacitor Native Bridge Architecture',
        url: 'https://capacitorjs.com/docs/core-apis'
      },
      videoUrl: {
        title: 'Capacitor Native Bridge Architecture',
        url: 'https://www.youtube.com/watch?v=JMBtuNqy2QI'
      },
      implementationSteps: [
        'Design and build your screens using clean React components (buttons, cards, navigation bars).',
        'When you want hardware features (like physical vibrations or camera access), ask your AI assistant to import the official Capacitor plugin.',
        'Whenever you make changes, tell your AI assistant: "Build our web assets and sync them to iOS and Android."',
        'Test on your physical phone to confirm that buttons buzz and page transitions feel native.'
      ],
      agentPrompt: `You are the autonomous senior mobile architect responsible for our native bridge layer.

TASK & OBJECTIVE:
Inspect and verify our TypeScript compilation, bundle optimization, and native bridge synchronization pipeline.

EXECUTION PROTOCOL FOR THE AGENT:
1. COMPILE TS: Run 'npx tsc --noEmit' and resolve any remaining type errors.
2. ASSET BUNDLE: Run 'npm run build' to generate the production web distribution in 'dist/'.
3. SYNC NATIVE: Run 'npx cap sync ios' and 'npx cap sync android' to copy web assets to native bundles.
4. VERIFY NATIVE PLUGINS: Ensure all Capacitor plugins (@capacitor/haptics, @capacitor/status-bar) are linked without missing pod warnings.`,
      commonRejectionTraps: [
        'Forgetting to build and sync before opening Xcode, causing an older version of your app to run on the phone.',
        'Using desktop web browser features that do not exist on mobile phones without testing on hardware.',
        'Adding massive, uncompressed images that make your app slow to load on mobile cellular data.'
      ],
      verificationQuestions: [
        'Does your app sync to iOS without warnings or missing plugin errors?',
        'Do touch interactions and tactile vibrations feel crisp on your phone?'
      ]
    },
    {
      id: 'setup-agent-commands',
      phaseId: 'phase-setup',
      title: 'Master AI Agent Build Commands',
      shortDescription: 'The plain-language prompt cheat sheet you can give your AI assistant to build, test, and release your app automatically.',
      category: 'functionality',
      platform: 'both',
      priority: 'high',
      whyItMatters: 'You never need to memorize complex terminal commands or Xcode menu settings. Whenever you want to test on your phone or prepare a release, just copy and paste these plain-language requests to your AI assistant.',
      whatHappensNext: 'Your AI assistant handles compiling code, synchronizing native files, and deploying the app to your phone without you clicking through technical menus.',
      directLink: {
        label: 'Capacitor CLI Command Reference',
        url: 'https://capacitorjs.com/docs/cli'
      },
      videoUrl: {
        title: 'Automate Mobile Builds with AI',
        url: 'https://www.youtube.com/watch?v=SSv--IrWH3c'
      },
      implementationSteps: [
        'To test on your phone: Tell your AI: "Build our app and install it onto my connected physical iPhone."',
        'To check for errors: Tell your AI: "Run a type check and verify our codebase has zero errors."',
        'To free up disk space: Tell your AI: "Clear our temporary Xcode build caches and DerivedData, and rebuild."',
        'To add tactile feel: Tell your AI: "Connect subtle tactile vibrations (haptics) to our primary buttons and toggles."',
        'To prepare for TestFlight: Tell your AI: "Create a release archive in Xcode and get our app ready for App Store Connect."',
        'To test on Android: Tell your AI: "Build and bundle our app for Android testing."'
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
   Verify web assets copy cleanly to ios/App/App/public.
   Automated test build:
   xcodebuild -workspace ios/App/App.xcworkspace -scheme App -destination 'generic/platform=iOS' build

3. GOOGLE PLAY ANDROID SYNC & PRODUCTION AAB:
   Run: npx cap sync android
   Build release Android App Bundle (AAB):
   cd android && ./gradlew bundleRelease && cd ..
   Verify release binary is generated in 'android/app/build/outputs/bundle/release/app-release.aab'.

4. ZERO REGRESSIONS: Confirm zero compilation errors and report readiness to deploy to physical devices and store consoles.`,
      commonRejectionTraps: [
        'Submitting a test build with debug settings turned on instead of a clean production release.',
        'Forgetting to increment your build number (CFBundleVersion) before uploading a new build to App Store Connect.',
        'Uploading raw test APKs to Google Play instead of the required Android App Bundle (.aab) format.'
      ],
      verificationQuestions: [
        'Can your AI assistant successfully build and deploy your app with one prompt?',
        'Does your app launch cleanly without crashing on your test device?'
      ]
    },
    {
      id: 'setup-clear-caches',
      phaseId: 'phase-setup',
      title: 'Clear Build Caches & Troubleshoot',
      shortDescription: 'Free up disk space and fix strange build hiccups by having your AI clear temporary compiler caches.',
      category: 'functionality',
      platform: 'both',
      priority: 'medium',
      whyItMatters: 'As you build your app, Xcode, npm, and Gradle create temporary cache files that can consume 20+ gigabytes of disk space. If a build ever acts strange or your Mac is running low on room, a quick cache clean fixes it immediately in 10 seconds.',
      whatHappensNext: 'Your computer reclaims gigabytes of free storage space, and your next build starts completely fresh with no stuck files.',
      directLink: {
        label: 'Xcode DerivedData Storage Management',
        url: 'https://developer.apple.com/documentation/xcode/managing-storage-in-xcode'
      },
      videoUrl: {
        title: 'Clear Xcode DerivedData & Fix Bugs',
        url: 'https://www.youtube.com/watch?v=MtCzNJ1EA4E'
      },
      implementationSteps: [
        'If a build ever gets stuck or fails unexpectedly, do not worry—it is almost always just temporary cached files.',
        'Tell your AI assistant: "Clear our Xcode DerivedData cache, clean temporary package caches, and run a fresh build."',
        'Let your AI run the cleanup and rebuild your project.',
        'Verify that your Mac gained free space and your app builds with zero errors.'
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
        'Spending hours stressing over a strange build error when simply clearing the Xcode cache solves it in 10 seconds.',
        'Letting your Mac get down to less than 10 GB of free space, which causes Xcode to fail with confusing errors.',
        'Deleting original project files by mistake instead of just the temporary cache folder.'
      ],
      verificationQuestions: [
        'Does your Mac have plenty of free disk space for building apps?',
        'Does your project build cleanly from a fresh start?'
      ]
    }
  ]
};
