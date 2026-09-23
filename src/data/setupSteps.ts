import { Phase } from '../types';

export const SETUP_STEPS_PHASE: Phase = {
  id: 'phase-setup',
  number: 0,
  title: 'Set Up & Environment',
  shortTitle: 'Set Up',
  description: 'Complete these essential setup steps before diving into the project steps. Choose your AI assistant, register developer accounts, install Xcode and Android Studio, configure GitHub, and connect your phone to run tests.',
  iconName: 'Laptop',
  items: [
    {
      id: 'setup-model',
      phaseId: 'phase-setup',
      title: 'Choose AI Coding Model',
      shortDescription: 'Pick the right AI coding assistant (Antigravity by Google, Claude Code, Cursor, or Windsurf) for your project.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Modern AI coding tools can create full screens, connect buttons, and fix bugs for you. Picking a capable AI assistant lets you build your entire app without having to write code by hand.',
      whatHappensNext: 'You will have your AI assistant connected to your project folder, ready to turn your ideas and prompts into working screens.',
      directLink: {
        label: 'Google Antigravity & AI Developer Tools',
        url: 'https://ai.google.dev/'
      },
      videoUrl: {
        title: 'AI Coding Agents Guide',
        url: 'https://www.youtube.com/watch?v=2hsHF_RKKWU'
      },
      implementationSteps: [
        'Pick an AI tool you enjoy working with: Antigravity by Google, Cursor, Windsurf, or Claude Code.',
        'Open your project folder in your chosen AI tool so it can read and update your app files.',
        'Use a capable model (like Gemini 2.0 Pro / Ultra, Claude 3.7 Sonnet, or GPT-4o) so it understands full app design and store guidelines.',
        'Tell your AI assistant: "Always write complete, working code with zero dummy buttons or unfinished placeholders."'
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
        'Letting an AI assistant insert fake "Coming Soon" buttons—Apple rejects apps that have unfinished features (Guideline 2.1).',
        'Accepting code with hidden errors without testing the screen on your real phone.',
        'Accidentally sharing your private API keys or passwords in public files.'
      ],
      verificationQuestions: [
        'Can your AI assistant open and edit files in your project folder?',
        'When you give your AI a prompt, does it make the change and show you the result on screen?'
      ]
    },
    {
      id: 'setup-developer-accounts',
      phaseId: 'phase-setup',
      title: 'Enroll Developer Accounts',
      shortDescription: 'Register official accounts with Apple and Google so you have legal permission to test on phones and launch.',
      category: 'store',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Apple and Google require identity verification before letting anyone put apps on people\'s phones. This review can take 1 to 3 weeks, so registering right away ensures your launch is never delayed.',
      whatHappensNext: 'Your developer status is officially recognized by Apple and Google. You can install your app directly on your phone and invite friends to test it through TestFlight.',
      directLink: {
        label: 'Enroll in Apple Developer Program',
        url: 'https://developer.apple.com/programs/enroll/'
      },
      videoUrl: {
        title: 'Developer Accounts Setup',
        url: 'https://www.youtube.com/watch?v=FWcmdBhCHgs'
      },
      implementationSteps: [
        'Go to developer.apple.com, sign in with your Apple ID, and enroll in the Apple Developer Program ($99/year). If enrolling as a company, request a free D-U-N-S business number first.',
        'Go to play.google.com/console and create your Google Play Developer account ($25 one-time registration fee).',
        'Submit your photo ID (or business registration if applying as a company) for identity verification.',
        'Sign the store agreements and fill out your banking details in App Store Connect and Google Play Console if offering subscriptions or paid features.',
        'Google Play reminder: Personal accounts must run a 14-day closed test with 20 friends before going public.'
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
        'Waiting until your app is 100% finished to register—identity checks take up to 2 weeks and will delay your launch.',
        'Using a name or credit card that doesn\'t match your government photo ID.',
        'Forgetting to accept the latest store agreements in App Store Connect, which freezes your ability to test on real phones.'
      ],
      verificationQuestions: [
        'Does your Apple Developer account show "Active" with your membership confirmed?',
        'Have you completed the identity verification in Google Play Console?'
      ]
    },
    {
      id: 'setup-xcode-android-studio',
      phaseId: 'phase-setup',
      title: 'Install Xcode & Android Studio',
      shortDescription: 'Install the official Apple and Google tools so your computer can build your app for iPhone and Android.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'To put an app on an iPhone, Apple requires a free Mac program called Xcode. Android uses Android Studio. You don\'t need to write code inside them—your AI assistant handles that—they just need to be on your computer to build the app.',
      whatHappensNext: 'Your computer has everything it needs to transform your app design into a real, installable mobile app on your iPhone or Android phone.',
      directLink: {
        label: 'Download Xcode from Mac App Store',
        url: 'https://apps.apple.com/us/app/xcode/id497799835'
      },
      videoUrl: {
        title: 'Install Xcode & Tools',
        url: 'https://www.youtube.com/watch?v=yvp1_-dc7qc'
      },
      implementationSteps: [
        'Open the Mac App Store, search for "Xcode", and click Get/Install (requires ~20 GB free space).',
        'Open Xcode once after it downloads, accept the license terms, and let it install its background components.',
        'If you plan to launch on Android, download and install Android Studio from developer.android.com/studio.',
        'Tell your AI assistant: "Check that Xcode and our command-line tools are ready to build iOS apps."'
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
        'Running an outdated version of Xcode—Apple requires apps to be built with the latest release.',
        'Running low on Mac hard drive space (less than 20 GB free) which causes builds to freeze.',
        'Never opening Xcode once after downloading to let it finish its initial setup.'
      ],
      verificationQuestions: [
        'Did you open Xcode and accept the initial setup agreement?',
        'Does your Mac have at least 25 GB of free storage for smooth builds?'
      ]
    },
    {
      id: 'setup-github-repo',
      phaseId: 'phase-setup',
      title: 'Initialize Git & GitHub',
      shortDescription: 'Safely back up your app to private cloud storage so you never lose your work or progress.',
      category: 'functionality',
      platform: 'both',
      priority: 'blocker',
      whyItMatters: 'Think of GitHub as an automatic time-machine backup for your app. If an AI edit breaks something or your laptop has an issue, you can instantly restore your app to the exact moment it was working perfectly.',
      whatHappensNext: 'Every screen and feature you build is safely saved in the cloud. You can experiment freely without fear of losing your progress.',
      directLink: {
        label: 'Create a New Repository on GitHub',
        url: 'https://github.com/new'
      },
      videoUrl: {
        title: 'Git & GitHub Basics',
        url: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
      },
      implementationSteps: [
        'Create a free account at github.com if you don\'t have one yet.',
        'Create a new Private repository on GitHub to store your app code.',
        'Tell your AI assistant: "Initialize git in this project, set up our .gitignore to keep private keys safe, and back up our code to our private GitHub repo."',
        'Tell your AI assistant: "Start our local testing server so I can preview the app in my computer browser."'
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
        'Accidentally making your GitHub repository public and exposing private API keys or secrets.',
        'Making big changes without saving a backup first, making it harder to undo an AI mistake.',
        'Forgetting to keep private .env files out of your cloud backup.'
      ],
      verificationQuestions: [
        'Is your project code backed up to a private repository on GitHub?',
        'Can you view and test your app live on your computer screen?'
      ]
    },
    {
      id: 'setup-connect-phone',
      phaseId: 'phase-setup',
      title: 'Connect Physical iPhone',
      shortDescription: 'Plug your real phone into your computer to test touch gestures, animations, and how it feels in your hand.',
      category: 'functionality',
      platform: 'ios',
      priority: 'blocker',
      whyItMatters: 'A computer screen can never tell you if a button is too small for a thumb, if text is hard to read in sunlight, or if animations feel choppy. Testing on your real phone is the secret to building an app people love.',
      whatHappensNext: 'Your app opens right on your iPhone or Android phone. You can hold it, tap the buttons, and experience it exactly like your future users will.',
      directLink: {
        label: 'Apple Developer Mode Documentation',
        url: 'https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device'
      },
      videoUrl: {
        title: 'Run on Physical iPhone',
        url: 'https://www.youtube.com/watch?v=ZqEwUnNB-dg'
      },
      implementationSteps: [
        'Plug your iPhone into your Mac using a charging cable.',
        'Unlock your phone and tap "Trust This Computer" when the popup appears.',
        'On your iPhone, go to Settings > Privacy & Security, scroll down to "Developer Mode", turn it ON, and restart your phone.',
        'After restarting, unlock your phone and tap "Turn On" in the confirmation prompt.',
        'Tell your AI assistant: "Build and install our app onto my connected iPhone."'
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
        'Only testing on a computer screen and missing buttons that are too close to the phone\'s home bar or Dynamic Island.',
        'Forgetting to turn on Developer Mode in iPhone Settings, which prevents your computer from installing the test build.',
        'Submitting to the App Store without testing on a physical device, leading to surprise crashes during Apple\'s review.'
      ],
      verificationQuestions: [
        'Is Developer Mode enabled in your iPhone Settings > Privacy & Security?',
        'Did the app open and run directly on your physical iPhone screen?'
      ]
    },
    {
      id: 'setup-typescript-swift',
      phaseId: 'phase-setup',
      title: 'TypeScript & Native Bridge',
      shortDescription: 'Understand how your app connects simple web designs to native phone features like haptics and the camera.',
      category: 'design',
      platform: 'both',
      priority: 'high',
      whyItMatters: 'You don\'t need to learn Swift or Kotlin to build for iPhone and Android. You create your app using friendly web building blocks (TypeScript, React, Tailwind), and a tool called Capacitor automatically translates it into native phone features like tactile vibrations, camera, and offline storage.',
      whatHappensNext: 'You understand how your screens talk to your phone\'s hardware, giving you native performance without writing complex native code.',
      directLink: {
        label: 'Capacitor Native Bridge Architecture',
        url: 'https://capacitorjs.com/docs/core-apis'
      },
      videoUrl: {
        title: 'Capacitor Native Bridge',
        url: 'https://www.youtube.com/watch?v=JMBtuNqy2QI'
      },
      implementationSteps: [
        'Design and build your screens using clean web components (buttons, cards, menus).',
        'When you want phone features (like tactile buzzes or camera access), ask your AI to connect the official Capacitor plugin.',
        'Whenever you want to test on your phone, tell your AI assistant: "Build our web assets and sync them to iOS."',
        'Test the feature on your phone to confirm that buttons buzz and screens transition smoothly.'
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
        'Forgetting to ask your AI to build and sync before opening Xcode, which loads an older version of your app.',
        'Using desktop web features that don\'t work on phones without checking on a real device.',
        'Adding huge, uncompressed image files that make your app slow to load on mobile data.'
      ],
      verificationQuestions: [
        'Does your app sync to iOS without warnings or missing plugin errors?',
        'Do touch interactions and vibrations feel crisp on your phone?'
      ]
    },
    {
      id: 'setup-agent-commands',
      phaseId: 'phase-setup',
      title: 'AI Agent Build Commands',
      shortDescription: 'Simple instructions you can give your AI assistant to build, test, and launch your app automatically.',
      category: 'functionality',
      platform: 'both',
      priority: 'high',
      whyItMatters: 'You never need to remember complex terminal code. Whenever you want to test on your phone or prepare a release, just copy and paste these plain-language requests to your AI assistant.',
      whatHappensNext: 'Your AI assistant handles building the code, syncing the phone files, and deploying the app to your phone without you clicking through technical menus.',
      directLink: {
        label: 'Capacitor CLI Command Reference',
        url: 'https://capacitorjs.com/docs/cli'
      },
      videoUrl: {
        title: 'Automate Build Commands',
        url: 'https://www.youtube.com/watch?v=SSv--IrWH3c'
      },
      implementationSteps: [
        'To test on your phone: Tell your AI: "Build our app and sync it to our connected iPhone."',
        'To check for errors: Tell your AI: "Run a type check and make sure our codebase has zero errors."',
        'To prepare for the App Store: Tell your AI: "Create a release archive in Xcode and get our app ready for App Store Connect."',
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
        'Submitting a test build with debug settings turned on instead of a clean production release.',
        'Forgetting to increase your app version number (e.g., from 1.0 to 1.1) before uploading a new build to Apple.',
        'Uploading raw test packages to Google Play instead of the official App Bundle format.'
      ],
      verificationQuestions: [
        'Can your AI assistant successfully build and deploy your app with one prompt?',
        'Does your app launch cleanly without crashing on your test device?'
      ]
    },
    {
      id: 'setup-clear-caches',
      phaseId: 'phase-setup',
      title: 'Clear Build Caches',
      shortDescription: 'Free up storage space and fix strange build hiccups by having your AI clear temporary files.',
      category: 'functionality',
      platform: 'both',
      priority: 'medium',
      whyItMatters: 'As you build your app, Xcode and build tools create temporary files that can take up 20+ gigabytes of space. If a build ever acts strange or your Mac is running low on room, a quick cache clean fixes it immediately.',
      whatHappensNext: 'Your computer reclaims gigabytes of free storage space, and your next build starts completely fresh with no stuck files.',
      directLink: {
        label: 'Xcode DerivedData Management Guide',
        url: 'https://developer.apple.com/documentation/xcode/managing-storage-in-xcode'
      },
      videoUrl: {
        title: 'Clear Xcode DerivedData',
        url: 'https://www.youtube.com/watch?v=MtCzNJ1EA4E'
      },
      implementationSteps: [
        'If a build ever gets stuck or fails unexpectedly, don\'t panic—it is usually just temporary cached files.',
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
        'Spending hours stressing over a weird build bug when simply clearing the Xcode cache solves it in 10 seconds.',
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
