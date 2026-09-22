# LaunchReady OS — The Zero-to-AppStore & Google Play Production Blueprint

A modern, high-fidelity production readiness operating system and interactive checklist suite designed to guide mobile developers from raw idea to Apple App Store and Google Play approval without missing a single requirement.

Built strictly according to:
- **2026 Apple App Store Review Guidelines** (Guidelines 1.2, 2.1, 2.3, 3.1.1, 4.2, 4.8, 5.1.1)
- **Apple Human Interface Guidelines (HIG)** (Liquid glass materials, 44x44pt touch targets, Dynamic Type, fluid springs)
- **Google Play Developer Policies & Core Vitals** (Target API 34+, 20-tester closed testing rule, Data Safety Section, Foreground Service justifications)
- **Zero-Trust Security & Privacy Regulations** (Apple `PrivacyInfo.xcprivacy` manifests, Android Keystore, SQLCipher, GDPR/CCPA CMP, COPPA age gating, US BIS EAR99 export encryption)

---

## How to Run Locally

```bash
# In this directory:
npm run dev
```

Visit `http://localhost:3000` in your browser.

To build for production:
```bash
npm run build
```
The optimized static build will be placed in the `dist/` folder.

---

# Part 1: What We Have in the App Right Now

### 1. Architecture & Tech Stack
- **Framework & Language**: React 18 with 100% strict TypeScript (`.tsx`, `.ts`), bundled with Vite.
- **Styling & Design System**: Tailwind CSS with custom Apple HIG tactile styling (smooth squircle borders, spring transitions, fluid drawers, touch-target expansion, safe area insets).
- **Native Mobile Wrapper**: Capacitor (`@capacitor/cli`, `@capacitor/core`, `@capacitor/ios`) with a full native Xcode project (`ios/App/App.xcodeproj`) configured for iOS 16+.
- **Iconography**: Lucide React icons.

---

### 2. Active Screen & User Features in `src/App.tsx`
1. **Top Navigation Bar**:
   - **All Phases Pill Button**: Displays total phases, completed vs. total verified count, and overall percentage. Tapping it resets any filter and smoothly scrolls to the top. Contains an integrated **Menu** pill that opens the dedicated All Phases view.
   - **All Phases Menu Button (Squircle)**: Opens the full-screen phases reordering and overview manager.
   - **Folder Button (Squircle)**: Opens the Multi-Project manager bottom sheet modal.
2. **Multi-Project Management**:
   - Create unlimited custom projects (e.g., "My Mobile App", "Fitness Tracker v1").
   - Each project has independent checklist progress, custom items, custom phases, and custom phase ordering.
   - Delete projects (with confirmation safeguards; at least one project must remain).
   - Fully persisted locally via `localStorage` under `launchready_projects_v6`.
3. **Phase Sections (`GuardrailSection.tsx`)**:
   - Each phase has its own custom visual theme (custom colored squircle icons, badges, progress bars, and borders).
   - Shows live section progress percentage (`X of Y Verified`) and progress bar.
   - Expandable/collapsible accordion drawer with touch-drag protection (distinguishes scrolling from deliberate taps).
   - Edit mode to reorder items (up/down), delete items, or add custom requirements on the fly.
4. **Interactive Requirement Cards**:
   - **The Checklist Checkmark ("The Little Click")**: Instant toggle button to mark any requirement complete or incomplete with immediate progress updates.
   - **Metadata Badges**: Platform tag (`iOS`, `Android`, or `iOS + Android`) and direct clickable store rule links.
   - **Deep-Dive Expandable Guidance**:
     - *Why It Matters* (clear, plain English explanation for beginner developers)
     - *Step-by-Step Implementation Guide* (simple, actionable steps)
     - *Ready-to-Use Agent Prompt* (plug-and-play prompt with 1-click copy for AI coding agents)
     - *Store Review Traps to Avoid* (red flags flagged by Apple and Google review teams)
     - *Verification Questions* (self-audit criteria)
5. **Dedicated All Phases Page (`AllPhasesPage.tsx`)**:
   - Full-screen sheet showing high-level status of every phase.
   - Allows reordering phases up or down (saved per-project).
   - Allows creating brand new custom phases or deleting custom phases.
   - Tap any phase to jump directly to it in the main feed and auto-expand its drawer.

---

### 3. Additional Modular Engines in the Codebase
- **Policy & Config Generators (`src/data/generators.ts` & `src/components/ConfigGenerators.tsx`)**:
  - Apple Privacy Manifest (`PrivacyInfo.xcprivacy`) XML generator with Required Reason API mappings (`CA92.1`, `C617.1`, `E174.1`, `35F9.1`).
  - Apple Universal Links (`apple-app-site-association`) JSON generator.
  - Android App Links (`assetlinks.json`) JSON generator with SHA-256 fingerprint support.
  - GDPR/CCPA-compliant Markdown Privacy Policy generator.
- **Troubleshooting Diagnostic Scenarios (`src/data/troubleshooting.ts` & `src/components/TroubleshootingWizard.tsx`)**:
  - Symptom-based playbooks covering Apple Guideline 2.1 (launch crashes/blank screens on IPv6), Guideline 3.1.1 (IAP bypasses), Guideline 4.8 (Sign in with Apple parity), Guideline 5.1.1(v) (account deletion), Android Foreground Service approvals, and Universal Link failures.
- **Readiness Meter (`src/components/ReadinessMeter.tsx`)**:
  - Store Pass Probability calculation engine weighting blockers vs. high/medium priority items.

---

# Part 2: Every Phase & Everything Written in Those Phases (Plain English + Agent Prompts)

Source file: `src/data/phases.ts`  
There are **10 Phases** containing **54 Total Production Checklist Requirements**.

---

## Phase 1: Idea, Audience & Project Setup
> **Description**: Clearly define what your app does, choose only the must-have features for version 1, set up your development tools, and create your official store accounts.  
> **Icon**: `Lightbulb` | **Short Title**: Idea & Setup

### Item 1.1: Clearly Describe Who the App Is For and What It Does (`p1-problem-solution`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: blocker
- **Short Description**: Explain the main problem your app solves in one simple sentence.
- **Why It Matters**: If you try to build an app for "everyone," it quickly becomes confusing and bloated. Having one clear problem and one target user makes your app much easier to build, test, and market.
- **Step-by-Step Implementation**:
  1. Write down a 1-sentence description: "My app helps [specific person] do [main goal] without [frustrating obstacle]."
  2. Talk to a few real people who match your target user to make sure they genuinely care about this problem.
  3. Map out the user journey so someone opening the app for the first time experiences its main benefit within 60 seconds.
- **Ready-to-Use Agent Prompt**:
  > *"Review our current app user journey from first launch to the main screen. Help me streamline the experience so a new user clearly understands what this app does and reaches its core value within 60 seconds, without feeling overwhelmed."*
- **Store Review Traps to Avoid**:
  - Building a vague app with too many unrelated features that Apple rejects under Guideline 4.2 (Minimum Functionality).
- **Verification Questions**:
  - Can a new user reach the core value of the app within 3 clicks of opening it?
  - Is your target audience clearly defined in one simple sentence?

### Item 1.2: Keep Only the Must-Have Features for Version 1 (`p1-scope-pruning`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: blocker
- **Short Description**: Focus on the 2 or 3 core features you need to launch, and save the rest for later.
- **Why It Matters**: Shipping an app with 3 polished features that work reliably is a massive success. Shipping 15 half-finished or buggy features guarantees app store rejections and frustrating user reviews.
- **Step-by-Step Implementation**:
  1. Sort your feature list into two piles: "Must-Have to launch" and "Nice-to-Have for future updates".
  2. Temporarily remove all "Nice-to-Have" features from your current build sprint.
  3. Remove any placeholder buttons, empty screens, or "Coming Soon" tabs so every single visible button works.
- **Ready-to-Use Agent Prompt**:
  > *"Scan our codebase and all UI screens for any placeholder text, dummy buttons, unfinished tabs, or "Coming Soon" banners. Remove or hide anything that isn't fully built yet so every clickable button performs a complete, working action."*
- **Store Review Traps to Avoid**:
  - Leaving "Coming Soon" or inactive placeholder buttons in the app triggers instant rejection under Apple Guideline 2.1 (App Completeness).
- **Verification Questions**:
  - Are all placeholder features or unfinished screens completely removed from the UI?
  - Does every clickable button perform a real, working action?

### Item 1.3: Clean Project Setup & Mobile Build Environment (`p1-tech-stack`)
- **Platform**: iOS + Android | **Category**: design | **Priority**: blocker
- **Short Description**: Use a reliable, modern coding setup so the app runs smoothly on real phones.
- **Why It Matters**: Using strict TypeScript catches typos and logic bugs before they reach real phones. Compiling your app into native mobile code with Capacitor and Xcode ensures it feels fast, responsive, and native.
- **Step-by-Step Implementation**:
  1. Write code using strict TypeScript so the compiler catches bugs automatically.
  2. Build your web code and sync it into native iOS and Android projects using Capacitor commands.
  3. Open the native project in Xcode and make sure it compiles cleanly and runs on your phone.
  4. Set the minimum operating system version to modern standards (iOS 16+ and Android 14+).
- **Ready-to-Use Agent Prompt**:
  > *"Check our TypeScript types, project configuration, and Capacitor settings. Ensure that "tsc --noEmit" passes with zero type errors, remove any "any" types, and verify that our project compiles and syncs cleanly into native iOS without warnings."*
- **Store Review Traps to Avoid**:
  - Ignoring build warnings or type errors that cause random crashes when people open the app on physical phones.
  - Forgetting to configure your Apple Developer Team in Xcode, which prevents testing on real iPhones.
- **Verification Questions**:
  - Does `npx tsc --noEmit` pass with zero errors across all codebase files?
  - Does the app build and run cleanly on a real physical phone?

### Item 1.4: Set Up Your Apple & Google Developer Accounts (`p1-developer-accounts`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: blocker
- **Short Description**: Register official accounts with Apple and Google so you have permission to publish apps.
- **Why It Matters**: Account verification can take 1 to 3 weeks because Apple and Google verify your identity or business details. Setting this up early prevents launch delays when your code is ready.
- **Step-by-Step Implementation**:
  1. Enroll in the Apple Developer Program ($99/year). If enrolling as a company, request a free D-U-N-S business number first.
  2. Enroll in the Google Play Console ($25 one-time fee) and complete their identity check.
  3. Fill out your contact, banking, and tax agreements in App Store Connect and Google Play Console if you plan to sell subscriptions or paid apps.
  4. Note for Google Play: New personal developer accounts must complete a mandatory closed beta test with 20 testers for 14 continuous days before publishing to the public.
- **Ready-to-Use Agent Prompt**:
  > *"Guide me step-by-step through setting up my Apple Developer and Google Play Console accounts. Tell me exactly what documents, bundle IDs, and information I need ready so my account approval goes smoothly."*
- **Store Review Traps to Avoid**:
  - Waiting until launch week to apply for developer accounts, only to be held up by identity verification for weeks.
  - Leaving tax and banking agreements unsigned, which prevents In-App Purchases from working.
- **Verification Questions**:
  - Is your Apple Developer Program membership active and approved?
  - Is your Google Play Console identity and payment profile verified?

### Item 1.5: Plan How Your App Makes Money (Store Rules) (`p1-monetization-model`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: high
- **Short Description**: Choose how users pay, following Apple and Google official payment rules.
- **Why It Matters**: If you charge for digital features (like subscriptions, extra tools, or premium content), you must use Apple and Google official In-App Purchases. Putting external links like Stripe or PayPal to unlock digital features in the app will get your app banned.
- **Step-by-Step Implementation**:
  1. Classify your offerings: Digital features and subscriptions MUST use Apple and Google In-App Purchases (15% to 30% store fee). Physical goods (like selling clothes or food delivery) can use Stripe.
  2. Sign up for the Apple Small Business Program to lower Apple's commission from 30% down to 15%.
  3. Enroll in Google Play's 15% tier for your first $1M in annual earnings.
- **Ready-to-Use Agent Prompt**:
  > *"Review our app's business model. If we sell digital features or subscriptions, write a clear checklist of what In-App Purchases we need to configure in App Store Connect and Google Play, and explain how to apply for Apple's 15% Small Business Program."*
- **Store Review Traps to Avoid**:
  - Adding a link that says "Go to our website to buy a subscription" inside the mobile app is an instant rejection under Apple Guideline 3.1.1.
- **Verification Questions**:
  - Are all digital upgrades and subscriptions set up through official store In-App Purchases?
  - Have you enrolled in the Apple Small Business Program to cut store fees to 15%?


---

## Phase 2: Design, Layout & Mobile Comfort
> **Description**: Make your app effortless and comfortable to use on all phone sizes, following official Apple and Google design guidelines.  
> **Icon**: `Palette` | **Short Title**: Design & Comfort

### Item 2.1: Make Buttons Easy to Tap (Minimum 44x44 points) (`p2-touch-targets`)
- **Platform**: iOS + Android | **Category**: design | **Priority**: blocker
- **Store Guideline**: [Apple HIG - Touch Targets & Inputs](https://developer.apple.com/design/human-interface-guidelines/inputs)
- **Short Description**: Ensure every clickable icon, button, and link is large enough to tap comfortably with a thumb.
- **Why It Matters**: Cramped, tiny buttons frustrate users who accidentally tap the wrong thing. Reviewers test apps on physical phones and reject apps that feel clumsy or hard to navigate.
- **Step-by-Step Implementation**:
  1. Ensure all buttons, close icons ("X"), and list items have a tappable area of at least 44x44 points on iOS and 48x48 dp on Android.
  2. If an icon looks visually small, expand its invisible touch padding so it remains easy to hit.
  3. Keep at least 8 points of breathing room between adjacent buttons so users do not tap both at once.
- **Ready-to-Use Agent Prompt**:
  > *"Audit all interactive buttons, icon buttons, and list rows across our app. Ensure every clickable element has a minimum tappable area of at least 44x44 points on iOS and 48x48 dp on Android, with at least 8 points of spacing between neighboring buttons to prevent accidental mis-taps."*
- **Store Review Traps to Avoid**:
  - Tiny close buttons ("X") in modal popups that take multiple frustrated taps to close.
- **Verification Questions**:
  - Have you tested tapping all buttons with your real thumb on a phone screen?
  - Do all interactive touch targets meet or exceed 44x44 points?

### Item 2.2: Keep Content Inside Screen Safe Areas (Avoid Notch & Bars) (`p2-safe-areas`)
- **Platform**: iOS + Android | **Category**: design | **Priority**: blocker
- **Short Description**: Prevent text and buttons from hiding behind the camera notch, Dynamic Island, or home bar.
- **Why It Matters**: If headers slide underneath the camera cutout or buttons sit directly behind the phone home indicator bar, the app looks broken and amateurish.
- **Step-by-Step Implementation**:
  1. Use system safe area insets for padding at the top and bottom of screens.
  2. Never hardcode fixed pixel numbers like 44px or 48px because different phone models have different notch sizes.
  3. Ensure scrollable lists flow cleanly beneath navigation bars while keeping interactive buttons in full view.
- **Ready-to-Use Agent Prompt**:
  > *"Configure our app layout to properly respect safe area insets on modern mobile screens. Ensure our top navigation bars never get covered by the Dynamic Island or camera notch, and our bottom tab bars or action buttons stay cleanly above the home indicator bar."*
- **Store Review Traps to Avoid**:
  - Placing a button at the bottom of the screen so close to the home swipe bar that tapping the button triggers the phone home gesture instead.
- **Verification Questions**:
  - Is the app tested on phones with camera cutouts (like iPhone Dynamic Island)?
  - Are bottom buttons easy to tap without interfering with the system home bar?

### Item 2.3: Support Large Text Settings (Accessibility Font Scaling) (`p2-dynamic-type`)
- **Platform**: iOS + Android | **Category**: design | **Priority**: high
- **Short Description**: Make sure your text scales cleanly when users increase font size in their phone settings.
- **Why It Matters**: Over 30% of smartphone users increase their system text size for better readability. If your app ignores this or cuts text off into "...", users with visual needs cannot use it.
- **Step-by-Step Implementation**:
  1. Use responsive font styles rather than rigid fixed pixel sizes for text blocks.
  2. Allow containers, cards, and buttons to expand vertically when text becomes larger.
  3. Allow labels to wrap onto multiple lines instead of clipping text.
- **Ready-to-Use Agent Prompt**:
  > *"Test and update our text styling to support system accessibility font scaling. Ensure text can grow when users enable larger font sizes in their phone settings without getting cut off, overflowing containers, or turning into unreadable "..." dots."*
- **Store Review Traps to Avoid**:
  - Text overflowing out of buttons or headers truncating critical words into "..." when accessibility font size is turned up.
- **Verification Questions**:
  - Does the app remain readable and easy to navigate at larger font sizes?
  - Do all cards and buttons expand naturally without cutting off words?

### Item 2.4: Ensure Clear Colors in Both Light and Dark Mode (`p2-dark-mode`)
- **Platform**: iOS + Android | **Category**: design | **Priority**: high
- **Short Description**: Deliver a great visual experience whether the user has light mode or dark mode turned on.
- **Why It Matters**: Users expect apps to match their phone theme. If your app has hardcoded white text on a light background or black text on a dark card, content becomes completely invisible.
- **Step-by-Step Implementation**:
  1. Use theme-aware color variables that automatically adjust for light and dark modes.
  2. Check color contrast: text should always stand out clearly against its background (at least 4.5 to 1 contrast).
  3. Verify that all icons and images remain clearly visible in both light and dark themes.
- **Ready-to-Use Agent Prompt**:
  > *"Check our app in both Light Mode and Dark Mode. Ensure all background and text colors maintain a high contrast ratio (at least 4.5:1) so every screen is effortlessly readable in dark rooms and bright sunlight alike."*
- **Store Review Traps to Avoid**:
  - White cards showing light gray text that becomes totally invisible when dark mode is enabled.
- **Verification Questions**:
  - Have you clicked through every screen in both Light and Dark mode?
  - Is every piece of text easy to read with high contrast?

### Item 2.5: Create Clean, High-Quality App Icons (`p2-app-icon`)
- **Platform**: iOS + Android | **Category**: design | **Priority**: blocker
- **Short Description**: Prepare a 1024x1024px icon for iOS and layered adaptive icons for Android.
- **Why It Matters**: Your app icon is the first thing users see on the store and their home screen. Format mistakes (like transparent backgrounds or pre-curved corners) cause build errors in Xcode.
- **Step-by-Step Implementation**:
  1. iOS: Create a crisp 1024x1024px PNG image with NO transparency and sharp square corners (iOS rounds the corners automatically).
  2. Android: Create an Adaptive Icon with a separate background layer and foreground artwork inside the central safe circle.
  3. Provide a clean monochrome variant so Android 13+ can tint your icon with the user's wallpaper theme.
- **Ready-to-Use Agent Prompt**:
  > *"Help me prepare our production app icons. Generate or configure a 1024x1024px PNG icon for iOS (no transparency, no pre-rounded corners) and modern Android adaptive icon layers (foreground, background, and monochrome themed variant)."*
- **Store Review Traps to Avoid**:
  - Uploading an iOS icon with transparent edges (Xcode rejects with "Invalid App Store Icon").
  - Pre-rounding the corners of your icon before uploading.
- **Verification Questions**:
  - Is your iOS icon a solid square 1024x1024px PNG with zero transparent pixels?
  - Does your Android adaptive icon look sharp without clipping edges?

### Item 2.6: Design a Smooth Launch Screen (No Fake Delays) (`p2-launch-splash`)
- **Platform**: iOS + Android | **Category**: design | **Priority**: high
- **Short Description**: Show a simple, clean screen while the app loads into memory without artificial pauses.
- **Why It Matters**: The launch screen bridges the brief fraction of a second while the phone loads your code. Adding artificial 3-second delays or marketing popups annoys users and violates guidelines.
- **Step-by-Step Implementation**:
  1. iOS: Use a simple launch screen matching your app background color and logo.
  2. Android: Use the official system Splash Screen API.
  3. Never put ads, progress bars, or fake multi-second delays on the launch screen.
- **Ready-to-Use Agent Prompt**:
  > *"Set up a clean, native launch screen for our app that matches our background color and displays our logo smoothly. Make sure the app transitions into the first screen immediately without any artificial sleep delays or fake loading spinners."*
- **Store Review Traps to Avoid**:
  - Adding a forced 3-second timer before showing the main screen.
- **Verification Questions**:
  - Does the launch screen transition seamlessly into your app without flashing white?
  - Does the app open immediately without artificial delays?


---

## Phase 3: Core Features & Working Offline
> **Description**: Ensure your app remembers what the user was doing, works smoothly when internet drops, and handles logins, payments, and account deletion properly.  
> **Icon**: `Cpu` | **Short Title**: Core Features & Offline

### Item 3.1: Save User Progress When Switching Apps (State Restoration) (`p3-process-death`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: blocker
- **Short Description**: Make sure typed text and current screens aren't lost if the user answers a call or copies an SMS code.
- **Why It Matters**: When a user switches to another app, the phone operating system may temporarily pause or close your app in the background to free up memory. If they return and their form is wiped clean, they leave 1-star reviews.
- **Step-by-Step Implementation**:
  1. Automatically save draft inputs and form progress into local storage as the user types.
  2. Remember which screen the user was viewing so they return right where they left off.
  3. Test by switching between apps and returning to verify nothing was reset.
- **Ready-to-Use Agent Prompt**:
  > *"Implement state restoration in our app so that if the phone operating system temporarily suspends our app while the user answers a call or copies a code, their active screen, navigation position, and unsaved form inputs are automatically preserved when they return."*
- **Store Review Traps to Avoid**:
  - App reloading to a blank screen or losing filled-in forms after being put in the background.
- **Verification Questions**:
  - If you switch to another app while typing a form and come back, is your text still there?
  - Does the app return to the screen you were on instead of jumping back to the home screen?

### Item 3.2: Make the App Work Offline When Internet Drops (`p3-offline-sync`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Cache data locally so users can still read and use the app in elevators or on subways.
- **Why It Matters**: Mobile connections drop all the time. An app that displays a giant full-screen error or crashes whenever Wi-Fi drops feels unreliable.
- **Step-by-Step Implementation**:
  1. Save data in local storage or an embedded database so the app can open without internet.
  2. Update the screen immediately when the user taps an action, and queue the update to sync to your server when internet returns.
  3. Show a subtle, friendly banner if offline (e.g. "Working offline") instead of blocking the screen.
- **Ready-to-Use Agent Prompt**:
  > *"Set up local data caching so our app remains functional even if the user is in Airplane Mode or in an elevator. Display cached data instantly, let users take actions offline, and automatically sync changes to the server when the internet connection is restored."*
- **Store Review Traps to Avoid**:
  - App crashing or freezing on an infinite loading spinner when opened in Airplane mode.
- **Verification Questions**:
  - Does the app open and show cached content with Airplane Mode turned on?
  - Do actions taken offline sync automatically when your connection restores?

### Item 3.3: Handle Weak Internet with Automatic Retry (`p3-network-resilience`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Automatically retry failed network calls without double-submitting payments or forms.
- **Why It Matters**: A weak mobile signal can briefly fail a network request. Automatic retry recovers smoothly, and using unique request keys prevents users from being charged twice if a payment call is retried.
- **Step-by-Step Implementation**:
  1. Add automatic retry with brief pauses for temporary server or network hiccups.
  2. Include a unique request key (idempotency token) on important save and payment requests so retrying never duplicates data.
  3. Always give users a manual "Tap to Retry" button if a request permanently fails.
- **Ready-to-Use Agent Prompt**:
  > *"Add automatic retry with exponential backoff and jitter to our API calls for transient network drops. Add an "X-Idempotency-Key" unique header to important POST requests so retrying a purchase or save never accidentally double-submits."*
- **Store Review Traps to Avoid**:
  - Infinite spinners on poor network connections that never time out or offer a retry button.
- **Verification Questions**:
  - Does the app show clear offline indicators and retry buttons during network failures?
  - Are duplicate submissions prevented when requests are retried?

### Item 3.4: Add "Sign in with Apple" If Offering Google or Social Login (`p3-sign-in-apple`)
- **Platform**: iOS | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Review Guideline 4.8 - Sign in with Apple](https://developer.apple.com/app-store/review/guidelines/#sign-in-with-apple)
- **Short Description**: Apple requires their sign-in button if you provide any other third-party social logins.
- **Why It Matters**: If your iOS app lets users log in with Google, Facebook, or other social buttons, Apple strictly requires that you also offer "Sign in with Apple" with equal visual prominence.
- **Step-by-Step Implementation**:
  1. Enable "Sign in with Apple" in your Apple Developer Portal and Xcode project.
  2. Place the official Apple Sign-in button right next to or above your other social login buttons.
  3. Properly handle users who choose to hide their email address using Apple's private relay email.
- **Ready-to-Use Agent Prompt**:
  > *"If our app offers Google, Facebook, or other social login buttons on iOS, add the official "Sign in with Apple" button with equal visual prominence. Handle the authentication response including private relay email addresses properly."*
- **Store Review Traps to Avoid**:
  - Offering Google or Facebook login on iOS without Sign in with Apple is an instant rejection under Guideline 4.8.
  - Hiding the Apple button at the bottom while featuring Google at the top.
- **Verification Questions**:
  - Is Sign in with Apple offered with equal prominence to other social logins?
  - Does your backend properly accept Apple's "@privaterelay.appleid.com" emails?

### Item 3.5: Include an In-App "Delete Account" Button (`p3-account-deletion`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Guideline 5.1.1(v) & Google Play User Data Policy](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage)
- **Short Description**: Let users delete their account and personal data directly inside the app.
- **Why It Matters**: Both Apple and Google strictly mandate that if an app allows users to create an account, it MUST allow them to delete their account and data entirely inside the app without having to email support.
- **Step-by-Step Implementation**:
  1. Add a clear "Delete Account" button in your Account Settings screen.
  2. Ask for a quick confirmation so users don't delete their account by accident.
  3. Permanently delete their entire record and database data on your backend server (Apple rejects apps that merely soft-delete or deactivate).
  4. If using "Sign in with Apple", call Apple's `/auth/revoke` REST API endpoint using your server secret to revoke their authorization grant.
  5. Provide a public web link for account deletion for users who already uninstalled the app (mandated by Google Play).
- **Ready-to-Use Agent Prompt**:
  > *"Add an easily accessible "Delete Account" button inside our Account / Settings screen. When the user confirms deletion, revoke their login tokens (including calling Apple's /auth/revoke if Sign in with Apple is used), permanently wipe all their stored personal data and records from our database, and return them to the logged-out screen."*
- **Store Review Traps to Avoid**:
  - Telling users to "email support to delete your account" instead of providing an in-app button is an instant rejection.
  - Merely disabling or marking the account "inactive" instead of completely purging the user's stored personal data from backend servers.
  - Failing to revoke Apple Sign-in tokens during account deletion.
- **Verification Questions**:
  - Can a user initiate account deletion directly inside the app in 2 or 3 taps?
  - Are all user records and database rows permanently erased on your backend server?
  - Is a public web link for account deletion ready for your Google Play Data Safety form?

### Item 3.6: Set Up Subscriptions with a Clear "Restore Purchases" Button (`p3-in-app-purchases`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: blocker
- **Store Guideline**: [App Store Guideline 3.1.1 & 3.1.2 - In-App Purchase & Subscriptions](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase)
- **Short Description**: Show transparent pricing, subscription terms, and an easy restore button on paywalls.
- **Why It Matters**: Over 40% of first-time rejections involve subscription screens: missing a "Restore Purchases" button, hiding the subscription renewal terms, or missing clickable links to Terms of Use.
- **Step-by-Step Implementation**:
  1. Use modern StoreKit 2 on iOS and Google Play Billing on Android.
  2. Put a prominent, clickable "Restore Purchases" button on every paywall screen so returning users can reclaim past purchases.
  3. Display clear pricing: price with local currency symbol, renewal duration, billing frequency, and how to cancel in phone settings (FTC Click-to-Cancel transparency).
  4. Include visible, clickable links to your Privacy Policy and Terms of Use (EULA) directly on the paywall screen itself.
- **Ready-to-Use Agent Prompt**:
  > *"Implement in-app subscriptions using StoreKit 2. Ensure every paywall screen clearly displays the subscription price, renewal terms, billing frequency, clear cancellation instructions, a clickable Privacy Policy link, Terms of Use (EULA) link, and a fully functional "Restore Purchases" button."*
- **Store Review Traps to Avoid**:
  - Paywall missing a working "Restore Purchases" button.
  - Paywall missing direct, clickable links to Terms of Use (EULA) and Privacy Policy.
  - Hiding subscription renewal frequency or not explaining how users can cancel before billing.
  - Hardcoding a "$" sign instead of showing the user's local currency returned by the store.
- **Verification Questions**:
  - Does the "Restore Purchases" button work for previously subscribed users?
  - Are Terms of Use and Privacy Policy links clickable on every paywall screen?
  - Does the paywall explain how users can cancel their subscription in phone settings?

### Item 3.7: Ask for Notification Permission Only When It Makes Sense (`p3-push-notifications`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Explain why notifications are helpful before popping up the system permission prompt.
- **Why It Matters**: Asking for notification permissions the exact second someone opens the app for the very first time leads to 70%+ rejection rates. Explaining the benefit first doubles opt-in rates.
- **Step-by-Step Implementation**:
  1. Never pop the system permission alert on raw first cold launch.
  2. Show a friendly, custom in-app screen first (e.g. "Turn on alerts to know when your order ships").
  3. Only trigger the real phone permission prompt after the user taps "Allow" on your explanation screen.
- **Ready-to-Use Agent Prompt**:
  > *"Configure push notifications cleanly. Delay asking for notification permission until the user performs an action where notifications are genuinely helpful, and show a friendly explanation screen before triggering the system permission prompt."*
- **Store Review Traps to Avoid**:
  - Spamming promotional marketing notifications without user consent.
- **Verification Questions**:
  - Is the permission prompt delayed until the user performs an action that justifies notifications?
  - Does the app explain the value before showing the system prompt?

### Item 3.8: Set Up Direct Web Links (Universal Links & App Links) (`p3-deep-linking`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Make web and email links open directly into the app instead of Safari or Chrome.
- **Why It Matters**: When a user taps an email verification link, invite code, or product link, they should land straight on the right screen inside your app instead of getting stuck in a mobile web browser.
- **Step-by-Step Implementation**:
  1. Apple Universal Links: Host an `apple-app-site-association` file on your HTTPS website.
  2. Android App Links: Host an `assetlinks.json` file with your signing key fingerprint on your website.
  3. Enable the Associated Domains capability in your Xcode and Android settings.
- **Ready-to-Use Agent Prompt**:
  > *"Configure Universal Links for iOS and App Links for Android. Set up the required domain verification files (`apple-app-site-association` and `assetlinks.json`) so shared links from emails or websites open directly inside our app."*
- **Store Review Traps to Avoid**:
  - Serving your verification file with an HTTP redirect (Apple's verification crawler will fail).
- **Verification Questions**:
  - Does tapping a link to your domain open the app directly on your phone?
  - Does your domain host the verification files over secure HTTPS without redirects?


---

## Phase 4: Privacy, Security & Permission Checks
> **Description**: Keep user data secure, declare required privacy manifests for Apple and Google, and ask only for permissions your app actually needs.  
> **Icon**: `ShieldCheck` | **Short Title**: Privacy & Security

### Item 4.1: Add Apple's Required Privacy Manifest (PrivacyInfo.xcprivacy) (`p4-privacy-manifest`)
- **Platform**: iOS | **Category**: security | **Priority**: blocker
- **Store Guideline**: [Apple Privacy Manifest Mandate](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)
- **Short Description**: Declare common APIs and third-party SDKs as mandated by Apple for iOS 17 and newer.
- **Why It Matters**: Apple blocks uploads of any app or update that uses standard phone APIs (like saving basic settings or reading file dates) unless you include a `PrivacyInfo.xcprivacy` file declaring the approved reason.
- **Step-by-Step Implementation**:
  1. Add a `PrivacyInfo.xcprivacy` file to the root of your Xcode app project.
  2. Declare the reasons for APIs you use (like UserDefaults reason `CA92.1` for saving app preferences).
  3. Declare that your app does not track users across outside websites or third-party apps.
- **Ready-to-Use Agent Prompt**:
  > *"Create an official Apple Privacy Manifest file (`PrivacyInfo.xcprivacy`) in our iOS project root. Declare any standard APIs we access (like UserDefaults reason CA92.1 or file timestamps) and declare tracking as false."*
- **Store Review Traps to Avoid**:
  - Uploading an iOS build without a Privacy Manifest when common storage APIs are used triggers immediate App Store upload rejection.
- **Verification Questions**:
  - Is `PrivacyInfo.xcprivacy` included in the root bundle of your iOS project?
  - Are all declared API reasons matched to Apple's official list?

### Item 4.2: Complete the Google Play Data Safety Form Truthfully (`p4-play-data-safety`)
- **Platform**: Android | **Category**: security | **Priority**: blocker
- **Store Guideline**: [Google Play Data Safety Guidelines](https://support.google.com/googleplay/android-developer/answer/10787469)
- **Short Description**: Declare all user data your app collects, uses, or shares in the Google Play Console.
- **Why It Matters**: If you check "No data collected" on your store form, but an included analytics or crash SDK collects an advertising ID or device identifier, Google will remove your app for policy violation.
- **Step-by-Step Implementation**:
  1. List all data collected by your app and any included tools (like user email, crash logs, or device info).
  2. Declare whether data is required or optional, and confirm that data is encrypted while traveling over the internet.
  3. Confirm that users can request their data to be deleted.
- **Ready-to-Use Agent Prompt**:
  > *"Audit all data our app and included SDKs collect (like user emails, analytics events, or device IDs). Give me the exact answers to fill into Google Play's Data Safety questionnaire so our listing stays fully compliant."*
- **Store Review Traps to Avoid**:
  - Declaring "No data collected" while an included crash or analytics tool automatically reads advertising identifiers.
- **Verification Questions**:
  - Does your Data Safety declaration match the exact behavior of all libraries in your app?
  - Is data encrypted in transit marked as "Yes"?

### Item 4.3: Securely Store Passwords, Tokens & Biometrics (Keychain & Keystore) (`p4-keychain-keystore`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: blocker
- **Short Description**: Never save login tokens, passwords, or personal details in plain text files.
- **Why It Matters**: Standard settings files (like UserDefaults on iOS or SharedPreferences on Android) are stored as unencrypted text files on disk. Passwords, biometric keys, and login tokens must be saved in the phone's encrypted hardware vault.
- **Step-by-Step Implementation**:
  1. iOS: Store login tokens and sensitive credentials in the iOS Keychain using `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`.
  2. If offering Face ID / Touch ID, use Keychain access control flags with `kSecAccessControlBiometryAny` and always provide a device passcode fallback.
  3. Android: Use EncryptedSharedPreferences backed by the hardware Android Keystore, paired with `BiometricPrompt` for fingerprint or face unlock.
  4. Never store raw user passwords or secret API keys in plain text files or unencrypted local storage on the device.
- **Ready-to-Use Agent Prompt**:
  > *"Ensure all sensitive user credentials, authentication tokens, and secret keys are stored securely in the hardware-backed iOS Keychain and Android Keystore. If biometric authentication (Face ID / Fingerprint) is supported, configure hardware-backed access control flags with a device passcode fallback, and never save plaintext credentials in standard preferences."*
- **Store Review Traps to Avoid**:
  - Saving login tokens or user passwords inside plain UserDefaults or local storage files.
  - Using a naive client-side boolean flag for biometric unlock without tying the authentication token to the hardware Keychain/Keystore.
- **Verification Questions**:
  - Are authentication tokens and credentials stored in Keychain or EncryptedSharedPreferences?
  - If biometric login is enabled, does it use hardware-backed access controls with passcode fallback?
  - Is any sensitive user data left unencrypted in plain text files?

### Item 4.4: Use Secure HTTPS for All Internet Connections (`p4-transit-security`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: blocker
- **Short Description**: Enforce strong encryption for all server communication and disallow unencrypted HTTP.
- **Why It Matters**: Unencrypted HTTP connections expose user data to being intercepted on public Wi-Fi networks. Apple and Google block unencrypted traffic by default.
- **Step-by-Step Implementation**:
  1. Verify that all server API endpoints and image links use secure `https://`.
  2. Keep Apple App Transport Security (ATS) enabled with no broad exceptions.
  3. Configure Android Network Security Config to disallow cleartext HTTP traffic.
- **Ready-to-Use Agent Prompt**:
  > *"Audit our network calls to ensure all communication with our servers uses secure HTTPS with modern TLS encryption. Verify that arbitrary HTTP loading bypasses are disabled in our app settings."*
- **Store Review Traps to Avoid**:
  - Enabling `NSAllowsArbitraryLoads: true` in your iOS settings without a strict, proven justification causes review rejections.
- **Verification Questions**:
  - Are all API calls and image URLs using secure HTTPS?
  - Is cleartext unencrypted HTTP traffic disabled in your app settings?

### Item 4.5: Protect Your Code from Tampering (App Hardening) (`p4-obfuscation-r8`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: high
- **Short Description**: Enable code shrinking and protection so outside actors cannot easily reverse-engineer your app.
- **Why It Matters**: Unprotected Android apps can be decompiled and read in seconds, exposing your business logic and backend endpoints. Code shrinking also makes your app download much smaller and faster.
- **Step-by-Step Implementation**:
  1. Android: Turn on code shrinking (`minifyEnabled true` and `shrinkResources true`) in your release settings.
  2. Test your release build on a physical phone to make sure code shrinking didn't accidentally remove needed data models.
  3. Save your build mapping and symbol files so crash reports can still show readable file names.
- **Ready-to-Use Agent Prompt**:
  > *"Enable code shrinking and obfuscation (R8/ProGuard on Android and symbol stripping on iOS) for our release builds to keep our code and API endpoints safe from reverse-engineering."*
- **Store Review Traps to Avoid**:
  - Turning on code shrinking without testing the release build on a real phone, causing data models to fail at runtime.
- **Verification Questions**:
  - Have you installed and tested the optimized release build on a physical phone?
  - Are crash report symbol files saved with every release build?

### Item 4.6: Ask Only for Permissions You Actually Need with Clear Explanations (`p4-permissions-hygiene`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: blocker
- **Store Guideline**: [App Store Review Guideline 5.1.1 & Android Permission Best Practices](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage)
- **Short Description**: Explain why your app needs camera, photo, or location access in plain, friendly language.
- **Why It Matters**: Vague permission explanations like "This app needs camera" cause instant rejection under Apple Guideline 5.1.1. Missing permission descriptions cause the app to crash the moment a user taps the button.
- **Step-by-Step Implementation**:
  1. Write clear, helpful descriptions for every permission (e.g. "Your Camera is used to scan bar codes to quickly add items to your pantry.").
  2. Use modern zero-permission photo pickers so users can pick an avatar without granting access to their entire photo library.
  3. Only ask for permissions when the user actually taps a feature that requires them.
- **Ready-to-Use Agent Prompt**:
  > *"Review all phone permissions requested in our app. Ensure every permission prompt includes a friendly, clear explanation of why it's needed and how it helps the user. Use zero-permission modern photo pickers where possible."*
- **Store Review Traps to Avoid**:
  - Using generic permission strings like "App needs location to work."
  - Asking for access to the entire photo gallery when the user only wants to pick a single profile photo.
- **Verification Questions**:
  - Does every permission message explain exactly how the user benefits from granting access?
  - Are permissions requested only when the user taps the relevant feature?

### Item 4.7: Remove Hidden Passwords and Test Logs from the Final App (`p4-privacy-logging`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: high
- **Short Description**: Turn off debug console logging and strip passwords from error reports.
- **Why It Matters**: Leaving test print logs active in the released app lets anyone who plugs the phone into a laptop read sensitive user tokens, emails, and passwords from device log files.
- **Step-by-Step Implementation**:
  1. Turn off debug console logs in production release builds.
  2. Sanitize error reporting tools so passwords and credit card numbers are never sent in crash breadcrumbs.
  3. Clear temporary secret memory buffers immediately after using them.
- **Ready-to-Use Agent Prompt**:
  > *"Scan our codebase to ensure that debug console print statements (`console.log`, `print`, `Log.d`) and error reports are sanitized so sensitive user emails, passwords, and tokens are never printed to device logs."*
- **Store Review Traps to Avoid**:
  - App store reviewers inspecting device logs and finding customer credentials printed in plain text.
- **Verification Questions**:
  - Are verbose debug console logs turned off in release builds?
  - Are error reports audited to ensure no sensitive personal data is leaked?

### Item 4.8: Never Store Secret API Keys or Backend Passwords Inside the App (`p4-api-key-protection`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: blocker
- **Store Guideline**: [OWASP Mobile MASVS-STORAGE & MASVS-CRYPTO](https://mas.owasp.org/)
- **Short Description**: Keep private keys and database passwords on a secure server, never inside the phone app.
- **Why It Matters**: Anyone can decompile an app or run the 'strings' tool on your app bundle in under 60 seconds. Hardcoding private keys (like OpenAI API keys, Stripe Secret Keys, AWS credentials, or Supabase service-role keys) in the client app allows bad actors to empty your bank account or delete your entire database.
- **Step-by-Step Implementation**:
  1. Never include private master secret keys, Stripe Secret Keys, or database passwords in your mobile client code or build bundles.
  2. Route all paid or sensitive API calls through a secure backend proxy or serverless function (like Cloudflare Workers, Firebase Cloud Functions, or Supabase Edge Functions).
  3. Only include public, rate-limited client keys (like Firebase Web API key or Supabase public anon key) in mobile builds.
  4. Add bundle ID and domain restrictions to all public API keys in your cloud provider console.
- **Ready-to-Use Agent Prompt**:
  > *"Scan our entire mobile codebase for any hardcoded private API keys, master tokens, or server passwords (such as OpenAI secret keys, Stripe secret keys, or database credentials). Move all sensitive API requests behind a secure serverless backend proxy so secret credentials are never exposed in the client app."*
- **Store Review Traps to Avoid**:
  - Decompiling the app reveals private OpenAI or payment secret keys, resulting in thousands of dollars in fraudulent API charges.
  - Leaving database admin or master service keys in frontend files, allowing anyone to modify all user data.
- **Verification Questions**:
  - Are all private API keys and database admin secrets kept completely off the mobile device?
  - Do all paid API calls pass through a secure backend proxy with user authentication?

### Item 4.9: Secure User Login, Token Expiry, and Clean Logout (`p4-session-token-security`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: high
- **Store Guideline**: [OWASP Mobile MASVS-AUTH Session Security](https://mas.owasp.org/)
- **Short Description**: Ensure login tokens expire safely and all private data is completely wiped when logging out.
- **Why It Matters**: If login tokens never expire or aren't completely erased upon logout, anyone who later touches the phone, buys a used device, or intercepts an old token can access the user's private messages and personal account.
- **Step-by-Step Implementation**:
  1. Use short-lived access tokens (e.g. 15 to 60 minutes) combined with secure refresh token rotation.
  2. When the user taps 'Log Out', immediately clear all authentication tokens from Keychain / Keystore and purge all cached user data and profile files from memory and local storage.
  3. Notify your backend server on logout so the refresh token is instantly invalidated and cannot be reused.
  4. Automatically log the user out and prompt for sign-in if their session is expired or revoked on the server.
- **Ready-to-Use Agent Prompt**:
  > *"Implement a secure session lifecycle for our authentication system. Ensure access tokens expire and refresh securely, invalidate active sessions on the server upon logout, and completely wipe all cached personal user data, tokens, and temporary files from the device whenever the user logs out."*
- **Store Review Traps to Avoid**:
  - Tapping 'Log Out' only dismisses the UI, leaving sensitive user data, cached images, or active auth tokens stored in local files.
  - Tokens that never expire, allowing permanently hijacked sessions if a device is lost or compromised.
- **Verification Questions**:
  - Does tapping 'Log Out' completely clear all stored tokens and cached personal data?
  - Does the server invalidate the refresh token when a logout occurs?

### Item 4.10: Sanitize WebViews, Deep Links, and User Inputs to Prevent Exploits (`p4-webview-injection-defense`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: high
- **Store Guideline**: [OWASP Mobile MASVS-PLATFORM & Google Play WebView Security](https://support.google.com/googleplay/android-developer/answer/9888379)
- **Short Description**: Disable local file access in WebViews and validate all incoming links before opening them.
- **Why It Matters**: Misconfigured WebViews and unverified deep links allow attackers to run malicious scripts, steal local device files, or redirect users to phishing sites from inside your app.
- **Step-by-Step Implementation**:
  1. In WebViews, strictly disable local file access: set `allowFileAccess = false` and `allowUniversalAccessFromFileURLs = false`.
  2. For opening external third-party links, use system in-app browser tabs (SFSafariViewController on iOS, Chrome Custom Tabs on Android) rather than raw embedded WebViews.
  3. Validate incoming deep links and URL scheme parameters against an approved list of internal routes before navigating.
  4. Sanitize and validate all user inputs before displaying them or sending them to backend databases.
- **Ready-to-Use Agent Prompt**:
  > *"Audit all WebViews and deep link handlers in our app. Ensure local file access is disabled on all WebViews, open third-party external links in standard Safari/Chrome custom tabs, and sanitize all deep link URL parameters to prevent injection or open redirect vulnerabilities."*
- **Store Review Traps to Avoid**:
  - Google Play rejection or security alert for exposing vulnerable WebView interfaces or having file access enabled.
  - Deep link handlers opening arbitrary external URLs without validating that the host belongs to your company.
- **Verification Questions**:
  - Are third-party web links opened in system Safari / Chrome tabs instead of raw WebViews?
  - Are deep link URLs validated against an allowlist before navigating?


---

## Phase 5: Legal Rules & Store Compliance
> **Description**: Ensure you have a public privacy policy, clear terms of use, content moderation tools, and child safety compliance.  
> **Icon**: `Scale` | **Short Title**: Legal & Compliance

### Item 5.1: Create a Public Privacy Policy Web Page (`p5-privacy-policy`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Guideline 5.1.1 & Play Policy on Privacy Policy](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage)
- **Short Description**: Publish an active, readable privacy policy on a public HTTPS web address.
- **Why It Matters**: An invalid, broken, or redirecting privacy policy link causes immediate rejection in both App Store Connect and Google Play Console.
- **Step-by-Step Implementation**:
  1. Host your privacy policy on a public HTTPS webpage that anyone can open without needing to log in.
  2. Name every third-party service your app uses (such as Firebase, Stripe, or RevenueCat).
  3. Explain clearly how users can request a copy of their data or delete their account.
  4. Include an active support email address for privacy questions.
- **Ready-to-Use Agent Prompt**:
  > *"Help me draft a clear, store-compliant Privacy Policy for our app. It must explain what data we collect, list our third-party services, explain how users can delete their data, and be hosted at a publicly accessible HTTPS web address."*
- **Store Review Traps to Avoid**:
  - Linking to a generic company homepage instead of a specific privacy policy page.
  - Putting the privacy policy behind a login screen or a broken link.
- **Verification Questions**:
  - Does your privacy policy link open cleanly in an incognito web browser without errors?
  - Are all analytics and third-party tools mentioned in the text?

### Item 5.2: Add Report and Block Buttons If Users Can Post Content (`p5-ugc-moderation`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Review Guideline 1.2 - User-Generated Content](https://developer.apple.com/app-store/review/guidelines/#user-generated-content)
- **Short Description**: Provide easy reporting, user blocking, and a zero-tolerance policy for abusive content.
- **Why It Matters**: Apple and Google have zero tolerance for unmoderated content. If your app lets users post photos, comments, or chat messages, you MUST include built-in tools to report and block abusive users.
- **Step-by-Step Implementation**:
  1. Include Terms of Use stating that offensive content and abusive behavior are strictly prohibited.
  2. Add a visible "Report" button on every user post, comment, and profile.
  3. Add a "Block User" button that immediately hides all content from that user.
  4. Establish a process to review and remove reported offensive content within 24 hours.
- **Ready-to-Use Agent Prompt**:
  > *"If users can post messages, comments, or photos in our app, add a "Report Post" button, a "Block User" button to immediately hide their content, and include a zero-tolerance policy against abusive content in our terms."*
- **Store Review Traps to Avoid**:
  - Social or chat apps missing an in-app "Block User" or "Report Abuse" button.
- **Verification Questions**:
  - Can a user report an offensive post in 2 taps?
  - Can a user block someone and immediately hide all their content?

### Item 5.3: Ask for Cookie and Privacy Consent for European Users (CMP) (`p5-gdpr-ccpa`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: high
- **Short Description**: Show an approved privacy consent banner before loading tracking or ad tools in Europe.
- **Why It Matters**: Loading tracking tools or personalized ads for users in the European Union without asking for consent first violates GDPR and Google policies, leading to ad account suspensions.
- **Step-by-Step Implementation**:
  1. Use an approved Consent Management Platform (such as Google UMP SDK) if showing ads.
  2. Show the consent banner before initializing ad or tracking SDKs for users in Europe.
  3. Let users review or change their privacy choices anytime from your app settings.
- **Ready-to-Use Agent Prompt**:
  > *"Add a compliant consent banner for users in Europe and California if our app uses analytics or ads. Let users easily change or withdraw their consent at any time from the app settings."*
- **Store Review Traps to Avoid**:
  - Firing tracking cookies or ad beacons before the user interacts with the consent dialog.
- **Verification Questions**:
  - Is an approved consent banner shown before loading ads in Europe?
  - Can users change their privacy choices anytime from the settings screen?

### Item 5.4: Follow Children's Privacy Rules If Kids Use Your App (`p5-coppa-kids`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Guideline 1.3 & Google Play Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335)
- **Short Description**: Use a neutral age gate and turn off tracking tools if your audience includes children.
- **Why It Matters**: Violating child privacy laws (COPPA) results in massive government fines and permanent removal from the App Store and Google Play.
- **Step-by-Step Implementation**:
  1. Use a neutral age picker where users select their birthdate (never pre-fill the age or use biased buttons).
  2. If a user is under 13, completely turn off behavioral ad tracking and personal data collection.
  3. On Google Play: if in the Families program, only use family-certified ad partners.
- **Ready-to-Use Agent Prompt**:
  > *"If children might use our app, implement a neutral birthdate age gate. Completely disable all ad tracking and behavioral analytics for users under 13 to comply with children's privacy laws."*
- **Store Review Traps to Avoid**:
  - Using a checkbox that defaults to "I am 18 or older" instead of a neutral birthdate selector.
- **Verification Questions**:
  - Is your age gate completely neutral without pre-selected options?
  - Are all tracking tools completely turned off for underage users?

### Item 5.5: Mark Standard Encryption in Your Settings to Skip Extra Forms (`p5-export-cryptography`)
- **Platform**: iOS | **Category**: legal | **Priority**: high
- **Short Description**: Add a simple setting in your iOS project so you don't have to answer export questions on every upload.
- **Why It Matters**: Every build uploaded to App Store Connect pauses and asks an export compliance question unless you declare the exemption flag directly in your settings.
- **Step-by-Step Implementation**:
  1. Add `ITSAppUsesNonExemptEncryption = false` in your iOS `Info.plist` file if your app uses standard HTTPS encryption.
  2. Enjoy seamless test build uploads without answering manual export forms every time.
- **Ready-to-Use Agent Prompt**:
  > *"Add the `ITSAppUsesNonExemptEncryption = false` flag to our iOS `Info.plist` file so Apple knows our app only uses standard HTTPS internet encryption, skipping manual export compliance forms on every upload."*
- **Store Review Traps to Avoid**:
  - Leaving this setting out requires clicking through manual export compliance forms on every single TestFlight build.
- **Verification Questions**:
  - Is `ITSAppUsesNonExemptEncryption` set to `false` in Info.plist?
  - Does uploading a new test build skip the manual export prompt in App Store Connect?

### Item 5.6: Create Plain-English Terms of Service and EULA with Clear Subscription Terms (`p5-terms-of-service`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Review Guideline 3.1.2 & 1.2 - EULA Requirements](https://developer.apple.com/app-store/review/guidelines/#subscriptions)
- **Short Description**: Publish an End User License Agreement that outlines user rules, subscription terms, and cancellations.
- **Why It Matters**: Apple strictly rejects any app with auto-renewing subscriptions or user-created content unless you provide a clear End User License Agreement (EULA). Both Apple guidelines and the FTC Click-to-Cancel rule require transparent billing and cancellation details.
- **Step-by-Step Implementation**:
  1. Host a public, readable Terms of Service / EULA webpage on an HTTPS address (or explicitly link to Apple's Standard EULA).
  2. Include clear rules: prohibited abusive behavior, subscription renewal details, billing cycles, and how users can cancel in iOS/Android settings.
  3. Provide a direct, clickable link to your Terms of Service directly on every in-app paywall screen and in your App Store Connect metadata.
  4. Include standard disclaimers: limitation of liability, service availability, and governing law.
- **Ready-to-Use Agent Prompt**:
  > *"Help me draft a clear, store-compliant Terms of Service and End User License Agreement (EULA) for our app. Make sure it includes subscription billing frequency, clear cancellation instructions, content rules, and limitation of liability, and ensure direct links are visible on our paywall screen."*
- **Store Review Traps to Avoid**:
  - Rejection under Guideline 3.1.2 for having an in-app subscription paywall without a direct, clickable link to Terms of Use (EULA).
  - Failing to explain how users can cancel subscriptions before the next billing cycle.
- **Verification Questions**:
  - Is the Terms of Service link visible and clickable on every paywall screen?
  - Are the Terms of Use link and Privacy Policy link provided in App Store Connect?

### Item 5.7: Follow Apple App Tracking Transparency (ATT) & Ad ID Rules (`p5-app-tracking-transparency`)
- **Platform**: iOS | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Review Guideline 5.1.2 - Data Use and Sharing](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing)
- **Short Description**: Ask for permission before collecting advertising identifiers or tracking users across outside apps.
- **Why It Matters**: If your app or any included SDK (such as Meta, TikTok, or AdMob personalized ads) accesses the device Advertising Identifier (IDFA) or tracks users across apps owned by other companies, you MUST show Apple's native App Tracking Transparency (ATT) prompt. Tracking without asking—or asking when you don't track—leads to immediate rejection.
- **Step-by-Step Implementation**:
  1. Audit your app SDKs: check if any marketing, attribution, or ad library collects IDFA or tracks users across other companies' apps.
  2. If tracking: add `NSUserTrackingUsageDescription` to your `Info.plist` with a friendly, specific explanation of how tracking helps the user.
  3. Trigger Apple's native `requestTrackingAuthorization` prompt before initializing tracking or ad SDKs.
  4. If the user selects 'Ask App not to Track', strictly honor their choice and never collect IDFA or fingerprint the device.
  5. If your app does NOT track users across outside apps, ensure ATT is NOT requested and ad libraries are configured for non-personalized ads.
- **Ready-to-Use Agent Prompt**:
  > *"Audit all third-party analytics and advertising SDKs in our iOS app. If we track users across other companies' apps or collect IDFA, configure Apple's App Tracking Transparency (ATT) prompt with a friendly NSUserTrackingUsageDescription. If we do not track, verify that ATT is not triggered and tracking flags are disabled."*
- **Store Review Traps to Avoid**:
  - Collecting IDFA or tracking users across external apps without showing the official ATT prompt (instant Guideline 5.1.2 rejection).
  - Triggering the ATT prompt when the app does not actually track users across outside apps.
  - Offering incentives or cash rewards to convince users to tap 'Allow'.
- **Verification Questions**:
  - Is NSUserTrackingUsageDescription configured with a clear explanation if tracking is used?
  - Does the app strictly respect 'Ask App not to Track' without degrading core functionality?

### Item 5.8: Respect Trademarks, Copyrights & Brand Names (`p5-intellectual-property`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: blocker
- **Store Guideline**: [App Store Guideline 5.2 & Google Play Intellectual Property Policy](https://developer.apple.com/app-store/review/guidelines/#intellectual-property)
- **Short Description**: Never use third-party brand logos, Apple/Google trademarks, or copyrighted media without permission.
- **Why It Matters**: Using protected brand names (like putting 'iPhone' or 'Apple' in your app title), incorporating official logos in your icon, or using copyrighted photos and songs without commercial licenses causes immediate rejection or permanent developer account termination.
- **Step-by-Step Implementation**:
  1. Verify that your app name does not start with or copy trademarked brand names (use 'App Name for iPhone', never 'iPhone App Name').
  2. Never use the official Apple logo, Google Play badge, or third-party company logos in your app icon, splash screen, or screenshots.
  3. Ensure all images, audio clips, custom fonts, and illustrations used in the app have valid commercial licenses or were created originally by you.
  4. If your app displays content from other platforms (like YouTube or Spotify), ensure you use their official developer APIs and comply with their branding guidelines.
- **Ready-to-Use Agent Prompt**:
  > *"Audit all app assets, icons, fonts, sound effects, and store listing metadata for intellectual property compliance. Verify that no protected trademarks (like Apple, iPhone, Google, or other brands) or unlicensed media are used in our app or marketing materials."*
- **Store Review Traps to Avoid**:
  - Putting an Apple logo or 'Apple' in the app icon or title (violates Guideline 5.2.5).
  - Using trademarked character names, brand logos, or celebrity photos without written documentation from the owner.
- **Verification Questions**:
  - Are all app icons, graphics, fonts, and audio licensed for commercial distribution?
  - Is your app title and description completely free of infringing trademark names?

### Item 5.9: Complete the EU Digital Services Act (DSA) Trader Verification (`p5-dsa-trader-status`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: high
- **Store Guideline**: [EU Digital Services Act (DSA) Compliance](https://developer.apple.com/support/dsa-requirements/)
- **Short Description**: Declare your business contact details if distributing or monetizing apps in European countries.
- **Why It Matters**: The European Union's Digital Services Act legally requires Apple and Google to verify and publicly display the address, phone number, and email of commercial developers ('Traders') in all 27 EU member states. Failing to provide this information causes your app to be removed from European app stores.
- **Step-by-Step Implementation**:
  1. In App Store Connect: Go to Account Settings -> Business -> European Union Digital Services Act (DSA).
  2. Select whether you are a 'Trader' (anyone who distributes apps for commercial gain, including ads or in-app purchases) or 'Non-Trader'.
  3. If Trader: Provide your verified business address, support phone number, and contact email address.
  4. In Google Play Console: Complete the matching Trader verification under Account Details.
- **Ready-to-Use Agent Prompt**:
  > *"Guide me through the steps to complete the European Union Digital Services Act (DSA) Trader status declaration in App Store Connect and Google Play Console so our app remains available across European storefronts."*
- **Store Review Traps to Avoid**:
  - Ignoring the DSA notification in App Store Connect, leading to the app being hidden or removed from all 27 EU App Store storefronts.
- **Verification Questions**:
  - Is your EU DSA Trader declaration completed and verified in App Store Connect?
  - Is the same Trader declaration submitted in Google Play Console?

### Item 5.10: Add Required Health, Medical, or Financial Disclaimers (`p5-regulatory-disclaimers`)
- **Platform**: iOS + Android | **Category**: legal | **Priority**: high
- **Store Guideline**: [App Store Review Guideline 1.4.1 & Google Play Health Content Policy](https://developer.apple.com/app-store/review/guidelines/#medical-analysis)
- **Short Description**: Display clear disclaimers if your app offers fitness, wellness, medical, or financial guidance.
- **Why It Matters**: Apps that provide health metrics, diet tracking, symptom checkers, or financial calculators are scrutinized heavily. Claiming to diagnose medical conditions or provide licensed financial advice without certified regulatory clearance (FDA/CE) leads to immediate app bans.
- **Step-by-Step Implementation**:
  1. Health & Fitness Apps: Include a prominent disclaimer on your onboarding and settings screens: 'This app is for informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a physician.'
  2. Never claim that phone camera flash, microphone, or sensors can measure blood pressure or diagnose health conditions unless you have official FDA or CE medical device certification.
  3. Financial Apps: Clearly state that the app provides general informational tools and does not constitute licensed financial, tax, or investment advice.
  4. Personal Loan Apps: Comply with national lending regulations and clearly disclose APR, repayment schedules, and total loan costs.
- **Ready-to-Use Agent Prompt**:
  > *"If our app relates to health, wellness, symptoms, fitness, or personal finance, add clear and prominent disclaimers on onboarding and settings screens clarifying that the app is for informational purposes only and is not medical or financial advice."*
- **Store Review Traps to Avoid**:
  - Claiming the app can diagnose illnesses or measure blood pressure using the camera, causing an instant ban under Guideline 1.4.1.
  - Giving specific medical or investment guidance without prominent informational disclaimers.
- **Verification Questions**:
  - Are appropriate medical or financial disclaimers visible in the app and store description?
  - Does the app avoid making unverified diagnostic or health claims?


---

## Phase 6: Testing, Speed & Battery Health
> **Description**: Verify that your app runs reliably, doesn't drain battery, opens in under 2 seconds, and alerts you immediately if a crash occurs.  
> **Icon**: `FlaskConical` | **Short Title**: Testing & Speed

### Item 6.1: Test the App's Main User Journey Automatically (`p6-automated-testing`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Write automated tests for core user actions like logging in and saving data.
- **Why It Matters**: Testing everything by hand on 20 different phone models takes hours. Automated tests catch hidden bugs and breakages the moment you change code.
- **Step-by-Step Implementation**:
  1. Write automated tests for calculations, state management, and critical business logic.
  2. Test the main user journey (logging in, creating an item, making a purchase) from start to finish.
  3. Run automated tests before compiling any release build.
- **Ready-to-Use Agent Prompt**:
  > *"Write automated tests for our app's primary user journey (such as logging in, viewing items, and saving data) so we can be confident that new changes don't accidentally break existing features."*
- **Store Review Traps to Avoid**:
  - Releasing bugs on specific screen sizes or older phone models that were skipped during manual testing.
- **Verification Questions**:
  - Do all automated tests pass cleanly before creating a release build?
  - Is the main user flow verified from start to finish?

### Item 6.2: Check That the App Doesn't Run Out of Memory or Freeze (`p6-memory-leaks`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: blocker
- **Short Description**: Audit your app so it frees up memory when screens are closed.
- **Why It Matters**: If an app keeps holding onto old screens in memory, the phone will eventually run out of RAM and abruptly force-close your app.
- **Step-by-Step Implementation**:
  1. Profile the app in Xcode Instruments or Android Studio Memory Profiler.
  2. Navigate back and forth between screens 20 times to confirm memory usage returns to normal when screens close.
  3. Clean up active timers and listeners when components unmount.
- **Ready-to-Use Agent Prompt**:
  > *"Inspect our app for memory leaks or unclosed listeners that could cause memory usage to climb over time. Ensure that opening and closing screens repeatedly frees up memory smoothly."*
- **Store Review Traps to Avoid**:
  - App abruptly crashing after 10 minutes of continuous use due to memory exhaustion.
- **Verification Questions**:
  - Have you tested clicking back and forth between screens repeatedly without the app slowing down?
  - Does memory usage stay stable during extended app sessions?

### Item 6.3: Keep Crashes and Freezes Extremely Low (`p6-android-vitals`)
- **Platform**: Android | **Category**: functionality | **Priority**: blocker
- **Store Guideline**: [Google Play Core Vitals Thresholds](https://support.google.com/googleplay/android-developer/answer/9844486)
- **Short Description**: Keep screen freezes (ANR) below 0.47% to avoid Google Play search ranking penalties.
- **Why It Matters**: Google Play automatically down-ranks or adds a warning banner ("This app may crash on your device") to any app that freezes or crashes above their bad behavior threshold.
- **Step-by-Step Implementation**:
  1. Never do heavy data parsing, disk saving, or network calls on the main screen thread.
  2. Keep your crash-free user session rate above 99.5%.
  3. Fix any freeze triggers so buttons always respond instantly when tapped.
- **Ready-to-Use Agent Prompt**:
  > *"Make sure heavy computations, data loading, or file saving happen on background tasks rather than freezing the main screen. This keeps our app fast and prevents Android "App Not Responding" warnings."*
- **Store Review Traps to Avoid**:
  - Freezing the screen while loading local database items during app startup.
- **Verification Questions**:
  - Is your crash-free user session rate above 99.5%?
  - Do all buttons react immediately when tapped without freezing the UI?

### Item 6.4: Make the App Open Fast (Under 2 Seconds) (`p6-cold-launch`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Optimize startup speed so users aren't staring at a blank screen.
- **Why It Matters**: Users abandon slow-loading apps. iOS will terminate an app if it takes too long to launch, and users perceive anything over 2 seconds as sluggish.
- **Step-by-Step Implementation**:
  1. Measure the time from tapping the app icon to the first interactive screen (target under 1 second on modern phones).
  2. Delay initializing non-essential third-party analytics or ad tools until AFTER the first screen is visible.
  3. Load initial screen data efficiently so users see content immediately.
- **Ready-to-Use Agent Prompt**:
  > *"Optimize our app's startup performance. Defer loading optional third-party SDKs until after the first screen renders so the app opens instantly on users' phones in under 2 seconds."*
- **Store Review Traps to Avoid**:
  - Initializing 10 different third-party SDKs at the exact same moment on launch, stalling startup.
- **Verification Questions**:
  - Does the initial screen render in under 2 seconds on a mid-range phone?
  - Are optional analytics tools initialized in the background after the first screen loads?

### Item 6.5: Set Up Instant Crash Alerts to Fix Bugs Quickly (`p6-crash-reporting`)
- **Platform**: iOS + Android | **Category**: cicd | **Priority**: blocker
- **Short Description**: Add a crash reporting tool so you can see the exact line number of any bug.
- **Why It Matters**: Without crash reporting, you have no idea why an app crashed on a user's phone. Proper crash reporting shows you the exact screen, phone model, and code line that caused the issue.
- **Step-by-Step Implementation**:
  1. Integrate a reputable crash reporting tool (such as Firebase Crashlytics or Sentry).
  2. Configure your build scripts to upload symbol files automatically with every release.
  3. Trigger a deliberate test crash in development to verify that full details appear on your dashboard.
- **Ready-to-Use Agent Prompt**:
  > *"Integrate a crash reporting tool (like Crashlytics or Sentry) and configure it to automatically upload symbol files so that if a crash happens on a user's phone, we can see the exact file and line number to fix it immediately."*
- **Store Review Traps to Avoid**:
  - Launching to production without crash reporting, leaving you completely blind when users report bugs.
- **Verification Questions**:
  - Does a deliberate test crash produce a clear, readable report on your crash dashboard?
  - Are symbol files uploaded automatically during release builds?


---

## Phase 7: App Store Listing, Pictures & ASO
> **Description**: Write clear titles and descriptions, prepare clean screenshots showing real features, and create reviewer demo logins.  
> **Icon**: `Image` | **Short Title**: Store Listing & ASO

### Item 7.1: Write Clear App Store Titles, Descriptions, and Keywords (`p7-app-metadata`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: blocker
- **Store Guideline**: [App Store Guideline 2.3 & Play Store Listing Policy](https://developer.apple.com/app-store/review/guidelines/#accurate-metadata)
- **Short Description**: Follow character limits and avoid forbidden promotional words like "Free" or "#1 App".
- **Why It Matters**: Using prohibited claims (like "Best App 2026", "Free Download", or mentioning "Android" on the Apple App Store) causes instant metadata rejection.
- **Step-by-Step Implementation**:
  1. App Store: Name (up to 30 chars), Subtitle (up to 30 chars), Keywords (up to 100 chars comma-separated with NO spaces).
  2. Google Play: App Title (up to 30 chars), Short Description (up to 80 chars), Full Description (up to 4000 chars).
  3. Never mention competitor platforms (no "Android" on Apple, no "iPhone" on Google).
  4. Never put pricing claims in titles (no "Free", "Sale", or "Discount").
- **Ready-to-Use Agent Prompt**:
  > *"Write an engaging, store-compliant App Store and Google Play listing. Provide an app title under 30 characters, a clear subtitle, strong keywords without spaces, and an informative description without using forbidden words like "Free" or "#1 App"."*
- **Store Review Traps to Avoid**:
  - Putting "Free" or price claims in your app title on either store.
  - Writing "Also available on Android" in your Apple App Store description.
- **Verification Questions**:
  - Are your title and subtitle both under 30 characters?
  - Are all competitor platform mentions stripped from your text and keywords?

### Item 7.2: Create Clean Screenshots Showing Real App Features (`p7-screenshots-video`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: blocker
- **Short Description**: Prepare high-resolution screenshots showing actual in-app screens for all required sizes.
- **Why It Matters**: App Store Connect blocks submission if required screenshot dimensions (specifically 6.9" / 6.7" iPhone displays) are missing. Screenshots must show the real app, not just abstract drawings.
- **Step-by-Step Implementation**:
  1. iOS: Export screenshots for 6.9" / 6.7" iPhone displays (e.g. 1290x2796px or 1320x2868px) and iPad if iPad-compatible.
  2. Google Play: Provide at least 2 phone screenshots and a 1024x500px Feature Graphic banner.
  3. Make sure device mockup frames match the target platform (no Android frames in Apple screenshots).
- **Ready-to-Use Agent Prompt**:
  > *"Help me plan the screenshot mockups for our app store listing. Outline the 4 or 5 key screens to highlight, with clean captions explaining the main benefit of each screen using real in-app UI."*
- **Store Review Traps to Avoid**:
  - Uploading screenshots with incorrect pixel dimensions.
  - Showing an Android phone mockup frame in an Apple App Store screenshot.
- **Verification Questions**:
  - Are all required screenshot sizes exported at high resolution without pixelation?
  - Do your screenshots showcase real, working app features?

### Item 7.3: Provide a Demo Login for the Store Reviewer (`p7-reviewer-credentials`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: blocker
- **Store Guideline**: [App Store Review Guideline 2.1 - App Completeness](https://developer.apple.com/app-store/review/guidelines/#performance)
- **Short Description**: Give the reviewer an active demo account with pre-filled sample data and two-factor bypassed.
- **Why It Matters**: Over 25% of all rejections happen because the reviewer could not log into the app, got stuck on a 2FA phone text, or opened a completely empty screen and thought the app was broken.
- **Step-by-Step Implementation**:
  1. Create a dedicated demo account (e.g. `reviewer@yourapp.com`) with two-factor SMS authentication turned off.
  2. Pre-fill the demo account with realistic sample items, saved projects, or profile info so they never see a blank screen.
  3. In App Store Connect review notes, provide the username, password, and brief instructions on how to test core features.
- **Ready-to-Use Agent Prompt**:
  > *"Create a dedicated test account for Apple and Google app reviewers (with two-factor authentication disabled). Pre-fill the account with realistic sample data so the reviewer can explore the app immediately without hitting empty screens."*
- **Store Review Traps to Avoid**:
  - The reviewer attempts to log in and gets blocked by an SMS code sent to a phone number they don't have.
  - Opening to a blank empty screen that makes the reviewer think the app is broken.
- **Verification Questions**:
  - Have you tested logging into the app using the exact demo credentials you provided?
  - Is the demo account pre-populated with realistic sample content?

### Item 7.4: Answer the Age Rating Questionnaire Honestly (`p7-age-rating`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: high
- **Short Description**: Declare any mature themes, gambling, or unrestricted web browsing accurately.
- **Why It Matters**: If your app allows unrestricted web browsing to any website or contains user discussions, it must receive an appropriate age rating. Inaccuracies result in review rejection.
- **Step-by-Step Implementation**:
  1. Answer the questionnaire truthfully in App Store Connect and Google Play Console.
  2. Declare if your app includes simulated gambling, mature humor, or user interactions.
  3. Unrestricted Web Browsing: If users can type any URL into an in-app browser, rate the app 17+.
- **Ready-to-Use Agent Prompt**:
  > *"Guide me through answering Apple and Google's age rating questionnaires accurately based on our app's content, so our app receives the correct age badge without review delays."*
- **Store Review Traps to Avoid**:
  - Rating an app 4+ when it includes an open in-app browser that can load mature web content.
- **Verification Questions**:
  - Does your age rating accurately reflect all content accessible inside the app?


---

## Phase 8: App Signing, Testing & CI/CD
> **Description**: Set up your official developer certificates, create your Android signing key, and test with beta users on TestFlight and Google Play.  
> **Icon**: `Wrench` | **Short Title**: Signing & Testing

### Item 8.1: Set Up Apple Code Signing Certificates (`p8-ios-signing`)
- **Platform**: iOS | **Category**: cicd | **Priority**: blocker
- **Short Description**: Configure distribution certificates, App ID capabilities, and provisioning profiles.
- **Why It Matters**: Apple devices only run code signed with a valid Apple Developer Certificate. Mismatched certificates or missing capabilities prevent you from building release archives.
- **Step-by-Step Implementation**:
  1. Create an Apple Distribution Certificate in your Apple Developer account.
  2. Ensure your App ID includes all required capabilities (like Push Notifications or Sign in with Apple).
  3. Create an App Store Distribution Provisioning Profile matching your App ID.
  4. Select your Apple Distribution profile for release archiving in Xcode.
- **Ready-to-Use Agent Prompt**:
  > *"Help me configure Apple Distribution signing certificates and provisioning profiles for our app ID in Xcode, ensuring all needed capabilities (like Push Notifications or Associated Domains) are enabled."*
- **Store Review Traps to Avoid**:
  - Archiving with a development certificate instead of an App Store Distribution certificate.
- **Verification Questions**:
  - Is your release build signed with a valid Apple Distribution Certificate?
  - Do all capabilities in your Xcode project match your Developer Portal settings?

### Item 8.2: Create and Securely Save Your Android Signing Key (`p8-android-keystore`)
- **Platform**: Android | **Category**: cicd | **Priority**: blocker
- **Short Description**: Generate your private upload keystore and enroll in Google Play App Signing.
- **Why It Matters**: If you lose your Android private signing key and did not enroll in Google Play App Signing, you can never update your app again and must publish an entirely new listing.
- **Step-by-Step Implementation**:
  1. Generate an upload keystore file using the `keytool` command.
  2. Store your keystore file and passwords in an encrypted password manager (never commit passwords to GitHub).
  3. Enroll in Google Play App Signing so Google safely manages your master signing key.
- **Ready-to-Use Agent Prompt**:
  > *"Generate a secure Android release upload keystore using `keytool`. Give me clear instructions on how to back it up safely so I never lose access to publish app updates."*
- **Store Review Traps to Avoid**:
  - Accidentally committing keystore passwords into a public GitHub repository.
  - Losing your keystore file without having a backup.
- **Verification Questions**:
  - Is your upload keystore file and password backed up in a secure vault?
  - Is Google Play App Signing turned on in the Google Play Console?

### Item 8.3: Complete Google's 14-Day Closed Beta with 20 Testers (`p8-google-20-testers`)
- **Platform**: Android | **Category**: store | **Priority**: blocker
- **Store Guideline**: [Google Play Closed Testing Requirement](https://support.google.com/googleplay/android-developer/answer/14151465)
- **Short Description**: Fulfill Google's mandatory closed test requirement for personal developer accounts.
- **Why It Matters**: Personal Google Play accounts created after November 13, 2023 CANNOT release to the public until at least 20 testers remain opted-in for 14 continuous days.
- **Step-by-Step Implementation**:
  1. Publish your build to the "Closed Testing" track in Google Play Console.
  2. Invite at least 20 unique testers using a Google Group or email list.
  3. Ensure all 20 testers install the app and keep it on their phones for 14 full continuous days.
  4. Collect tester feedback to answer Google's production readiness questionnaire.
- **Ready-to-Use Agent Prompt**:
  > *"Outline a step-by-step plan to recruit and run a 14-day closed beta test with 20 testers for my personal Google Play Console account, including how to collect feedback to qualify for production access."*
- **Store Review Traps to Avoid**:
  - Applying for production before the full 14 days have passed or with fewer than 20 active testers.
- **Verification Questions**:
  - Have at least 20 testers remained opted-in for 14 continuous days?
  - Are your responses ready for Google's production access questionnaire?

### Item 8.4: Send Test Builds to Friends and Beta Testers (TestFlight) (`p8-testflight-beta`)
- **Platform**: iOS | **Category**: cicd | **Priority**: high
- **Short Description**: Distribute builds to up to 100 team members and 10,000 public beta testers on iOS.
- **Why It Matters**: TestFlight lets real users test your app on physical iPhones before you submit for public review, catching layout quirks and bugs early.
- **Step-by-Step Implementation**:
  1. Internal Testing: Add team members (builds are ready immediately without store review).
  2. External Testing: Submit for quick Beta App Review, then share a public link with up to 10,000 testers.
  3. Include a brief note explaining what new features testers should check.
- **Ready-to-Use Agent Prompt**:
  > *"Set up Apple TestFlight distribution so I can share test builds with internal team members immediately and send public beta links to up to 10,000 testers before our official launch."*
- **Store Review Traps to Avoid**:
  - Using placeholder test notes like "bug fixes" for external beta review.
- **Verification Questions**:
  - Has your release candidate build been tested on multiple physical iPhone models via TestFlight?

### Item 8.5: Automate Building and Uploading Your App (CI/CD) (`p8-fastlane-cicd`)
- **Platform**: iOS + Android | **Category**: cicd | **Priority**: high
- **Short Description**: Automate compilation, testing, and store uploads using Fastlane or GitHub Actions.
- **Why It Matters**: Building and uploading manually from a laptop is slow and prone to forgetting steps. Automation ensures every build is compiled cleanly and version numbers increment automatically.
- **Step-by-Step Implementation**:
  1. Configure automated build commands for iOS and Android.
  2. Set up automatic build number incrementing so you never accidentally upload duplicate version numbers.
  3. Use GitHub Actions or local release scripts to upload to TestFlight and Google Play.
- **Ready-to-Use Agent Prompt**:
  > *"Help me set up an automated build and release script using Fastlane or GitHub Actions that increments our build number, compiles the app, and uploads it to TestFlight and Google Play automatically."*
- **Store Review Traps to Avoid**:
  - Trying to upload a build with a version or build number that has already been used.
- **Verification Questions**:
  - Does your build script automatically increment version numbers?
  - Can you build and upload to test tracks with a single command?


---

## Phase 9: Final Review Check & Going Live
> **Description**: Do a final audit against top rejection rules, choose manual release so you control launch timing, and know how to reply if a reviewer has questions.  
> **Icon**: `Send` | **Short Title**: Submission & Review

### Item 9.1: Do a Final Check Against Apple's Most Common Rejection Rules (`p9-apple-rejection-audit`)
- **Platform**: iOS | **Category**: store | **Priority**: blocker
- **Store Guideline**: [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- **Short Description**: Audit against top rejection reasons: broken buttons, placeholder text, and missing privacy details.
- **Why It Matters**: Over 85% of rejections stem from the same 5 issues: broken buttons or crashes, placeholder text, missing subscription restore buttons, or missing privacy details.
- **Step-by-Step Implementation**:
  1. Verify zero broken links, zero placeholder text ("Lorem Ipsum"), and zero crashes.
  2. Verify that digital goods use In-App Purchase and paywalls have restore buttons.
  3. Verify that in-app account deletion is functional and easy to find.
  4. Confirm that the app provides real native utility beyond just being a mobile website.
- **Ready-to-Use Agent Prompt**:
  > *"Run a final pre-submission audit on our app against Apple's top review guidelines. Check that there are no placeholder text strings ("Lorem Ipsum", "Coming Soon"), no broken links, and that all buttons work on both Wi-Fi and cellular networks."*
- **Store Review Traps to Avoid**:
  - App crashing on an IPv6-only network (Apple tests in an IPv6 cellular environment).
- **Verification Questions**:
  - Does the app work cleanly on cellular and Wi-Fi networks?
  - Are all dummy text strings and placeholder buttons completely removed?

### Item 9.2: Do a Final Check Against Google Play Policies (`p9-google-play-audit`)
- **Platform**: Android | **Category**: store | **Priority**: blocker
- **Store Guideline**: [Google Play Developer Policy Center](https://play.google.com/about/developer-content-policy/)
- **Short Description**: Verify target Android version, permissions, and policy compliance.
- **Why It Matters**: Google Play uses automated static analyzers that immediately reject builds targeting outdated Android versions or requesting broad permissions without justification.
- **Step-by-Step Implementation**:
  1. Verify that your app targets modern Android (API 34+).
  2. If using background foreground services, verify that you provided video proof in your console form.
  3. Verify that no broad storage permissions are requested if you only need photo picking.
- **Ready-to-Use Agent Prompt**:
  > *"Perform a pre-submission audit against Google Play's latest policy rules. Confirm our app targets Android 14+ (API 34/35), that foreground services are properly declared, and that no broad permissions are requested without justification."*
- **Store Review Traps to Avoid**:
  - Using a background service without providing a video recording proving the service is user-visible.
- **Verification Questions**:
  - Does the app compile against target Android 34 or higher?
  - Are all permission justifications filled out in the Play Console?

### Item 9.3: Choose Manual Release So You Decide Exactly When to Go Live (`p9-submission-release-type`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: high
- **Short Description**: Select "Manually release this version" instead of automatic release to coordinate your launch.
- **Why It Matters**: With automatic release, your app goes live the second the reviewer clicks approve (which could be 3:00 AM on Sunday). Manual release lets you coordinate announcements and marketing.
- **Step-by-Step Implementation**:
  1. In App Store Connect, set Version Release to "Manually release this version".
  2. In Google Play Console, turn on "Managed publishing".
  3. Enable a 7-day phased rollout so initial updates roll out to a small percentage of users first.
- **Ready-to-Use Agent Prompt**:
  > *"Configure our release settings in App Store Connect and Google Play to "Manual Release" and set up a 7-day phased rollout so we control the exact moment our app goes live to the public."*
- **Store Review Traps to Avoid**:
  - Releasing to 100% of users immediately, catching an unforeseen server bug that affects all users at once.
- **Verification Questions**:
  - Is "Manually release this version" selected in App Store Connect?
  - Is phased release turned on to roll out gradually?

### Item 9.4: Know How to Reply Politely If the Reviewer Rejects Your App (`p9-rejection-appeal-protocol`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: high
- **Short Description**: Respond constructively in the Resolution Center with a polite explanation or short demo video.
- **Why It Matters**: Getting rejected on your first try is completely normal (over 40% of first submissions are rejected). Responding calmly with a short explanation or video resolves the issue fast.
- **Step-by-Step Implementation**:
  1. Do not panic or send an angry reply. Read the exact guideline cited by the reviewer.
  2. If the reviewer misunderstood a feature, record a brief, friendly Loom video showing how it works and share the link.
  3. If it was a real bug, fix it, upload a new build number, and politely explain the fix you made.
- **Ready-to-Use Agent Prompt**:
  > *"Prepare a friendly, professional response template for the App Store Resolution Center in case a reviewer has a question or misunderstanding about how a feature works."*
- **Store Review Traps to Avoid**:
  - Submitting the exact same unchanged build without answering the reviewer's questions.
- **Verification Questions**:
  - Do you have a video recording tool (like Loom) ready to show how complex features work?
  - Do you know where the App Store Resolution Center is in App Store Connect?


---

## Phase 10: Troubleshooting & Live App Care
> **Description**: Diagnose release bugs, fix deep links or subscription testing issues, and monitor early reviews.  
> **Icon**: `Activity` | **Short Title**: Troubleshooting & Care

### Item 10.1: How to Troubleshoot a Crash That Only Happens in the Released App (`p10-crash-debugging`)
- **Platform**: iOS + Android | **Category**: security | **Priority**: blocker
- **Short Description**: Diagnose crashes that work fine on your laptop but crash when downloaded from the store.
- **Why It Matters**: Apps often run fine in development, but crash in production if code shrinking accidentally removed a needed data model or reflection class.
- **Step-by-Step Implementation**:
  1. Inspect device log files on your phone using macOS Console.app or Android logcat.
  2. If the crash mentions a missing class, add a keep rule in your code shrinking settings.
  3. Always test the signed release build on a physical phone before submitting to the store.
- **Ready-to-Use Agent Prompt**:
  > *"Help me diagnose an error that only occurs in the production release build. Show me how to check device logs, inspect symbolicated stack traces, and verify that code shrinking didn't accidentally remove necessary classes."*
- **Store Review Traps to Avoid**:
  - Assuming a build works because it worked in debug mode, without testing the signed release build.
- **Verification Questions**:
  - Have you installed and tested the final signed release build on a physical phone?
  - Are code shrinking keep rules configured for all saved data models?

### Item 10.2: How to Fix Web Links That Don't Open the App (`p10-deep-link-troubleshooting`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Diagnose why shared web links open the browser instead of routing directly into your app.
- **Why It Matters**: Deep links fail silently. If your website file has a minor typo or an HTTP redirect, links will open in Safari or Chrome without showing any error message.
- **Step-by-Step Implementation**:
  1. Check that your website file returns HTTP 200 with no redirects.
  2. Verify that the domain format in your app project does not include "https://" or trailing slashes.
  3. Query Apple's CDN cache scraper to verify that Apple successfully cached your configuration file.
- **Ready-to-Use Agent Prompt**:
  > *"Diagnose why our web deep links are opening the mobile browser instead of our app. Check our domain verification files, SSL certificate, URL path format, and Apple CDN cache status."*
- **Store Review Traps to Avoid**:
  - Redirecting your verification link with an HTTP 301/302 redirect.
- **Verification Questions**:
  - Does your verification file return HTTP 200 without redirects?
  - Is your domain listed correctly in your app capabilities?

### Item 10.3: How to Fix In-App Purchase and Subscription Testing Issues (`p10-iap-troubleshooting`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: blocker
- **Short Description**: Diagnose missing products, sandbox errors, or auto-refunded Google purchases.
- **Why It Matters**: Payment bugs directly stop you from making money. On Android, if a purchase is not acknowledged in code within 3 days, Google automatically refunds and cancels the user's purchase.
- **Step-by-Step Implementation**:
  1. App Store Connect: Verify that your Paid Applications agreement is active and bank info is accepted.
  2. Check that product IDs in your code match the exact ID created in App Store Connect and Google Play.
  3. Android: Verify that your backend or client code acknowledges every purchase within 3 days.
- **Ready-to-Use Agent Prompt**:
  > *"Help me troubleshoot an In-App Purchase sandbox error. Check that our product IDs match exactly, that tax and banking agreements are signed, and that sandbox test accounts are configured properly."*
- **Store Review Traps to Avoid**:
  - Forgetting to acknowledge Android purchases, causing Google to auto-refund and cancel the subscription.
- **Verification Questions**:
  - Are In-App Purchases tested using official Sandbox test accounts?
  - Is purchase acknowledgment handled properly on Android?

### Item 10.4: How to Fix Push Notifications That Don't Arrive (`p10-push-troubleshooting`)
- **Platform**: iOS + Android | **Category**: functionality | **Priority**: high
- **Short Description**: Diagnose why push tokens register successfully but notifications never show up on phones.
- **Why It Matters**: Push notification delivery bugs can be tricky because Apple and Google silently drop notifications if the server environment (sandbox vs production) does not match.
- **Step-by-Step Implementation**:
  1. Check APNs Environment: send to the sandbox push server for development builds, and the production server for App Store builds.
  2. Android: Verify that the notification is assigned to an active Notification Channel with importance set to default or high.
  3. Verify that your server updates the device token whenever the phone generates a new one.
- **Ready-to-Use Agent Prompt**:
  > *"Help me debug why push notifications are not displaying on test phones. Verify that the notification permission was granted, that the device token is registered, and that the APNs environment matches our build type."*
- **Store Review Traps to Avoid**:
  - Sending production push payloads to a development sandbox token.
- **Verification Questions**:
  - Does your push server environment (sandbox vs production) match your app build?
  - Do Android notifications have an active Notification Channel assigned?

### Item 10.5: Release to a Small Percentage First and Reply to Early Reviews (`p10-staged-rollout-ops`)
- **Platform**: iOS + Android | **Category**: store | **Priority**: high
- **Short Description**: Monitor crash rates during your 7-day phased rollout and respond kindly to early user feedback.
- **Why It Matters**: Catching a bug when only 1% of users have updated lets you pause the rollout, fix the issue, and release an update before 99% of your users ever notice.
- **Step-by-Step Implementation**:
  1. Monitor crash dashboards hourly after starting your Day 1 (1%) phased release.
  2. If the crash rate spikes above 0.5%, immediately click "Pause Phased Release" in App Store Connect.
  3. Respond to any negative reviews within 24 hours with an empathetic message and a direct support email.
- **Ready-to-Use Agent Prompt**:
  > *"Guide me on how to monitor crash rates during our 7-day phased rollout, how to safely pause the rollout if a bug is found, and how to write helpful, empathetic replies to early user reviews."*
- **Store Review Traps to Avoid**:
  - Ignoring negative reviews reporting a crash that only happens on a specific phone model.
- **Verification Questions**:
  - Is your team checking crash dashboards during the rollout?
  - Is someone designated to reply to new store reviews within 24 hours?


---

## Developer Academy & Resource Hub (Graduation Cap 🎓)
The app now includes a dedicated **Academy & Resource Hub** accessible from the fourth icon in the floating dock. It curates the industry's best 100% free and open-source tools, repositories, and AI models across 5 categories:

1. **AI Models & Coding Agents**:
   - **Claude 3.7 & 3.5 Sonnet (Anthropic)**: Multi-file refactoring, architectural review, and autonomous agent loops.
   - **OpenAI o3-mini & o1**: Deep step-by-step reasoning for tough algorithms, cryptography, and race conditions.
   - **Gemini 2.0 Flash & 1.5 Pro (Google DeepMind)**: 1M+ token context window for ingesting entire repositories and video crash recordings.
   - **DeepSeek R1 & V3**: Open-weight reasoning models that can run 100% locally and privately via Ollama.
   - **v0 by Vercel**: Rapid generative UI producing production-ready React & Tailwind CSS screens from prompts.
   - **Cursor & Windsurf**: Leading AI-native code editors with full-codebase semantic indexing.
   - **Recraft.ai & Midjourney**: Generative vector SVGs and 1024x1024 Apple HIG app icons.

2. **Design & UI/UX (Free & Open Source)**:
   - **Apple Human Interface Guidelines (HIG)** & **Google Material Design 3**.
   - **Lucide Icons**: 1,400+ tree-shakeable open-source vector icons.
   - **Mobbin**: Extensive library of real iOS and Android onboarding, paywall, and account deletion screen patterns.
   - **Figma iOS 18 & Android 15 UI Kits**: Official community Figma files with native navigation, keyboards, and status bars.
   - **Coolors & Realtime Colors**: WCAG accessible color palette generators.
   - **LottieFiles & dotLottie**: 60fps lightweight vector animations.

3. **Open-Source GitHub Repositories & Boilerplates**:
   - **Capacitor (`ionic-team/capacitor`)**: Native runtime transforming web apps into native iOS/Android apps.
   - **Supabase (`supabase/supabase`)**: Open-source Postgres, Auth, real-time database, and edge storage.
   - **RevenueCat Purchases SDKs**: Open-source client SDKs for StoreKit 2 and Google Play Billing.
   - **Fastlane (`fastlane/fastlane`)**: Automates screenshots, code signing, and App Store / Google Play deployments.
   - **Maestro (`mobile-dev-inc/maestro`)**: Declarative YAML-based mobile UI automation.
   - **Sentry Mobile SDK**: Real-time crash alerting and symbolicated stack traces.

4. **Security & Privacy Toolkit**:
   - **OWASP Mobile Application Security (MASVS & MASTG)**.
   - **Gitleaks (`gitleaks/gitleaks`)**: Fast secret detection tool preventing credential leaks.
   - **TruffleHog**: High-entropy secret and credential finder with live verification.
   - **Apple Privacy Manifest Generator**: Automatic generation of `PrivacyInfo.xcprivacy`.

5. **Legal & Compliance**:
   - **Apple App Store Review Guidelines (Official)** & **Google Play Developer Policy Center**.
   - **Choose A License (GitHub)**: Simple, plain-English open-source licensing guide.
   - **EU Digital Services Act (DSA) Hub**: European Commission Trader verification guidance.
   - **Free Privacy Policy & Terms of Service Generators**: Store-compliant legal document generators.


