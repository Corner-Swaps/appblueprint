# App Blueprint — 100-Check Live System Diagnosis Ledger

**Audit Date:** 2026-11-23T00:13:05.203Z  
**Workspace:** `/Users/slava/Downloads/Projects/App Creator`  
**Environment:** Isolated local Vite dev server (`http://127.0.0.1:4173`) driven in live Chromium (`puppeteer-core`) across 4 viewports (`1440×900`, `1024×768`, `768×1024`, `390×844`)  
**Final Result:** **100/100 PASS (0 FAIL)**  

## Hard Runtime Telemetry Summary (Closed-Loop Re-Verification)

| Telemetry Metric | Baseline Run | Post-Fix Re-Verification |
| :--- | :---: | :---: |
| Uncaught JS / Page Errors | 0 | **0** |
| `console.error` Messages | 1 (`404 /favicon.ico`) | **0** |
| Failed Network Requests / CORS / ORB | 0 | **0** |
| HTTP Responses `>= 400` | 1 (`404 /favicon.ico`) | **0** |
| Broken Images (`naturalWidth === 0`) | 0 (after lazy-scroll) | **0** |
| Horizontal Overflow (`scrollWidth > innerWidth`) | 0 across 4 viewports | **0 across 4 viewports** |

## Real Bugs Found & Surgically Fixed

| # | Severity | Issue Found in Live Diagnosis | Root Cause & Minimal Fix | Files Modified | Re-Verified |
| :-: | :--- | :--- | :--- | :--- | :---: |
| 1 | High | `404 /favicon.ico` + `console.error` on `/privacy.html`, `/terms.html`, `/support.html` (Check #100) | Static legal HTML pages omitted `<link rel="icon">`, causing browsers to request nonexistent `/favicon.ico`. Added `<link rel="icon" type="image/png" href="./favicon.png">`. | `public/privacy.html`, `public/terms.html`, `public/support.html`, `privacy.html`, `terms.html`, `support.html` | **PASS** |
| 2 | High | Broken Terms & Privacy links in `PaywallModal` under GitHub Pages subpath `/appblueprint/` (Check #75) | `href="/terms.html"` and `href="/privacy.html"` resolved to domain root instead of `base: "./"`. Changed to relative `./terms.html` and `./privacy.html`. | `src/components/PaywallModal.tsx` | **PASS** |
| 3 | High | `NativeReviewPromptModal` failed to trigger on visit 15 and visit 30 (Checks #34–#36) | `localStorage.setItem("appblueprint_review_prompted_15", "true")` ran synchronously before the 1500ms `setTimeout`, so React 18 StrictMode cleanup cancelled the timer while leaving the prompted flag set. Moved flag persistence inside the timeout callback when the prompt actually executes. | `src/App.tsx` | **PASS** |
| 4 | Medium | Pressing `Escape` failed to close nested StoreKit Payment Sheet, dismissible `PaywallModal`, or `Project Name Locked` modal (Checks #73, #77) | Missing `keydown` `Escape` listeners. Added layered `Escape` handling in `PaywallModal` (closes ONLY top-most nested StoreKit sheet first; second `Escape` closes `PaywallModal` only when `canDismiss && !isNativeProcessing`, never bypassing expired-trial lockout) and in `ProjectsPage` for `lockedNameModal`. | `src/components/PaywallModal.tsx`, `src/components/ProjectsPage.tsx` | **PASS** |
| 5 | Medium | Stale hardcoded `101` requirement count in Website Navbar, Hero, and Explorer placeholder vs live `106` catalog total (Check #94) | Computed live counts dynamically from `SETUP_STEPS_PHASE` and `PHASES_DATA` so Navbar, Hero, and Explorer stay 100% synchronized (`106`). | `src/components/Website/Navbar.tsx`, `src/components/Website/Hero.tsx`, `src/components/Website/InteractiveAuditExplorer.tsx` | **PASS** |
| 6 | Low | Pluralization bug in `Deleted Sections` badge (`"1 items"`) (Check #93) | Added singular/plural guard `delPhase.items.length === 1 ? "item" : "items"`. | `src/App.tsx` | **PASS** |
| 7 | Low | Automated StoreKit 2 test suite failed Test 21 after Build 10 (Check #99) | `scripts/test_storekit_flow_10x.cjs` hardcoded exact `CURRENT_PROJECT_VERSION = 10;`. Updated assertion to validate synchronized build versions `>= 10`. | `scripts/test_storekit_flow_10x.cjs` | **PASS** |

## Complete 100-Check Live Verification Ledger

| ID | Wave | End-to-End Check | Status | Verified Evidence |
| :-: | :--- | :--- | :---: | :--- |
| 001 | Wave 1 | Website root loads HTTP 200 with 0 errors | **PASS** | `status=200, errs=0` |
| 002 | Wave 1 | Website 0 broken images after scrolling lazy images (naturalWidth > 0) | **PASS** | `all loaded` |
| 003 | Wave 1 | Website 0 horizontal overflow & 0 text leaks | **PASS** | `scrollW=1440/1440, leaks=none` |
| 004 | Wave 1 | Brand logo scrolls cleanly to top | **PASS** | `scrollY=0` |
| 005 | Wave 1 | All 7 Navbar anchor links exist and navigate cleanly | **PASS** | `7/7 valid` |
| 006 | Wave 1 | Navbar Platform Switcher syncs Explorer | **PASS** | `all="All (106)", ipad="iPadOS", iosActive=true` |
| 007 | Wave 1 | Navbar search button focuses search input | **PASS** | `focused="explorer-search-input"` |
| 008 | Wave 1 | Global Ctrl+K shortcut focuses search input | **PASS** | `focused="explorer-search-input"` |
| 009 | Wave 1 | Hero search syncs live with Explorer | **PASS** | `explorerVal="StoreKit"` |
| 010 | Wave 1 | Hero quick category filter pill works | **PASS** | `clicked="Store Blockers (64)"` |
| 011 | Wave 2 | All 5 Explorer category pills filter & reset to All Categories | **PASS** | `clicked: Blockers, Design & HIG, Security & Auth, Privacy & Legal, All Categories` |
| 012 | Wave 2 | Explorer full catalog renders all matching requirements | **PASS** | `nav="All (106)", explorer="Showing 12 of 106"` |
| 013 | Wave 2 | Explorer 0-match search shows empty state & reset button | **PASS** | `{"hasEmptyText":true,"hasResetBtn":true}` |
| 014 | Wave 2 | Explorer Reset clears search and restores rules | **PASS** | `inputAfter=""` |
| 015 | Wave 2 | Explorer Grid/List view toggle renders cleanly | **PASS** | `list=true, overflow=false` |
| 016 | Wave 2 | Explorer Load More expands visible cards cleanly | **PASS** | `12 -> 24` |
| 017 | Wave 2 | Explorer card check toggle works without opening modal | **PASS** | `found=true, title="Toggle verification status", modalOpened=false` |
| 018 | Wave 2 | Explorer Copy Prompt shows Copied confirmation | **PASS** | `copiedVisible=true` |
| 019 | Wave 2 | Explorer Detail Inspector Modal opens & ArrowRight navigates | **PASS** | `"Mac Prerequisites" -> "AI Assistant" (role=dialog:false)` |
| 020 | Wave 2 | Escape closes Explorer Inspector Modal and unlocks scroll | **PASS** | `{"open":false,"bodyOverflow":"visible"}` |
| 021 | Wave 3 | PhasesShowcase renders all 10 production phases | **PASS** | `count=10` |
| 022 | Wave 3 | ReadinessCalculator 0% shows Critical Rejection Risk | **PASS** | `0/5 -> Critical Rejection Risk` |
| 023 | Wave 3 | ReadinessCalculator 40% shows Moderate Rejection Risk | **PASS** | `2/5 -> Moderate Rejection Risk` |
| 024 | Wave 3 | ReadinessCalculator 100% shows High Pass Likelihood | **PASS** | `5/5 -> High Pass Likelihood` |
| 025 | Wave 3 | RejectionTraps & FeaturesGrid render cleanly | **PASS** | `{"trapsOk":true,"featOk":true}` |
| 026 | Wave 3 | ScreenshotGallery cycles all 5 slides with 0 broken images | **PASS** | `STEP 1 OF 5 -> STEP 2 OF 5 -> STEP 3 OF 5 -> STEP 4 OF 5 -> STEP 5 OF 5` |
| 027 | Wave 3 | AcademyHighlight section & CTA render cleanly | **PASS** | `{"found":true,"hasBtn":true}` |
| 028 | Wave 3 | FAQSection expands/collapses all 6 questions cleanly | **PASS** | `clicked 6/6` |
| 029 | Wave 3 | Footer internal anchors & legal links valid | **PASS** | `legal=privacy.html, terms.html, support.html` |
| 030 | Wave 3 | privacy.html, terms.html, support.html return 200 with 0 errors/overflow | **PASS** | `privacy.html:200, terms.html:200, support.html:200` |
| 031 | Wave 4 | Launch App transitions cleanly to #app mode with launcher bar | **PASS** | `{"hash":"#app","hasNavDock":true,"hasBackBtn":true}` |
| 032 | Wave 4 | Back to Website & browser Back button sync cleanly | **PASS** | `returned=true, historyBack=true` |
| 033 | Wave 4 | Fresh first-launch initializes default project & 7-day trial | **PASS** | `{"h1":"My Mobile App","hasFreshKey":true,"hasTrialStart":true,"dockLabel":"Checklist Progress 3%"}` |
| 034 | Wave 4 | NativeReviewPromptModal triggers cleanly at visit 15 | **PASS** | `{"open":true,"title":"Enjoying App Blueprint?"}` |
| 035 | Wave 4 | Review modal star selection & Escape dismissal work | **PASS** | `dismissedByEscape=true` |
| 036 | Wave 4 | Review modal visit 30 Submit Rating fires confetti & closes cleanly | **PASS** | `submitted=true, closed=true` |
| 037 | Wave 4 | SplashScreen renders and app recovers cleanly | **PASS** | `splashPresent=true` |
| 038 | Wave 4 | Floating Bottom Dock renders all 3 tabs cleanly | **PASS** | `Checklist Progress 3% \| Academy and Resources \| Projects` |
| 039 | Wave 4 | Clicking Checklist header title switches to Projects tab | **PASS** | `visibleH1="Select Project"` |
| 040 | Wave 4 | Clicking Checklist dock button returns to active project | **PASS** | `visibleH1="My Mobile App"` |
| 041 | Wave 5 | Set Up & Environment renders unconditionally as first pill | **PASS** | `{"ok":true}` |
| 042 | Wave 5 | Set Up & Environment expands showing all setup items | **PASS** | `items=12` |
| 043 | Wave 5 | Expanded requirement drawer renders guide & AI prompt cleanly | **PASS** | `{"hasGuide":true,"hasPrompt":true,"hasLeak":false}` |
| 044 | Wave 5 | Copy Prompt button in requirement drawer shows Copied | **PASS** | `copied=true` |
| 045 | Wave 5 | External links in requirement card use https:// & target=_blank | **PASS** | `links=2, bad=none` |
| 046 | Wave 5 | Toggling checklist item immediately updates dock progress % | **PASS** | `3% -> 4%` |
| 047 | Wave 5 | Checklist completion state persists after page reload | **PASS** | `reloaded=4%` |
| 048 | Wave 5 | Unchecking item persists reverted state after reload | **PASS** | `reverted=3%` |
| 049 | Wave 5 | All 12 Steps expand cleanly with 0 NaN/undefined/overflow | **PASS** | `issues=0, leaks=none` |
| 050 | Wave 5 | Completing all items in a phase reaches 100% & triggers confetti cleanly | **PASS** | `toggled=4, reached100=true` |
| 051 | Wave 6 | Phase accordion opens via keyboard Enter key | **PASS** | `aria-expanded=true` |
| 052 | Wave 6 | Phase accordion collapses via keyboard Space key | **PASS** | `aria-expanded=false` |
| 053 | Wave 6 | Expanded requirement Close Subcategory chevron collapses cleanly | **PASS** | `found=true, collapsed=true, occludedByDock=false` |
| 054 | Wave 6 | Phase bottom Close Section chevron collapses phase cleanly | **PASS** | `found=true, collapsed=true` |
| 055 | Wave 6 | Custom requirement renders and persists after reload | **PASS** | `visible=true` |
| 056 | Wave 6 | Custom requirement cleanup persists after reload | **PASS** | `cleaned=true` |
| 057 | Wave 6 | Deleted Sections pill hides deleted phases and displays count & Restore All | **PASS** | `{"hasDeletedPill":true,"hasBadge2":true,"hasRestoreAll":true,"phase9Hidden":true,"phase10Hidden":true}` |
| 058 | Wave 6 | Restoring single deleted phase restores Step 11 cleanly | **PASS** | `{"phase9Back":true,"phase10StillDeleted":true,"hasBadge1":true}` |
| 059 | Wave 6 | Restored/deleted phase state persists after reload | **PASS** | `persisted=true` |
| 060 | Wave 6 | Restoring last deleted phase removes Deleted Sections pill | **PASS** | `allRestored=true` |
| 061 | Wave 7 | Academy & Resources renders all 10 resource categories | **PASS** | `count=10` |
| 062 | Wave 7 | AI Models category expands cleanly with Cursor & 0 broken icons | **PASS** | `{"hasCursor":true,"brokenImgs":0}` |
| 063 | Wave 7 | Cursor AI Code Editor card displays all subsections & Visit link | **PASS** | `{"why":true,"highlights":true,"connect":true,"prompt":true,"visit":true}` |
| 064 | Wave 7 | Resource AI Prompt Copy button gives Copied feedback | **PASS** | `copied=true` |
| 065 | Wave 7 | All remaining 9 resource categories expand with valid items | **PASS** | `design:12, typography:9, github_repos:10, backend:10, security:10, privacy:10, legal:10, launch:12, analytics:10` |
| 066 | Wave 7 | All resource links are clean https:// (no localhost/launchready/undefined) | **PASS** | `0 bad links` |
| 067 | Wave 7 | Resources tab has 0 horizontal overflow, 0 broken images, 0 leaks | **PASS** | `{"ctx":"resources-tab","overflow":false,"scrollW":1440,"innerW":1440,"brokenImages":[],"leaks":[]}` |
| 068 | Wave 7 | Academy dock button collapses all open categories cleanly | **PASS** | `collapsed=true` |
| 069 | Wave 7 | Clicking Academy & Resources title returns to Checklist | **PASS** | `returned=true` |
| 070 | Wave 7 | Last Academy card clears floating bottom dock cleanly | **PASS** | `{"ok":true,"cardBottom":706,"dockTop":810}` |
| 071 | Wave 8 | Projects tab renders trial state, Restore Purchases & locked Add card | **PASS** | `{"hasTitle":true,"hasRestore":true,"hasTrial":true,"hasAddLocked":true}` |
| 072 | Wave 8 | Restore Purchases in free state shows clean notice | **PASS** | `noticeShown=true` |
| 073 | Wave 8 | Free-tier rename locks name & Escape closes Project Name Locked modal | **PASS** | `renamed=true, modal="Project Name Locked", closedByEscape=true` |
| 074 | Wave 8 | Second rename shows Project Name Locked -> opens PaywallModal | **PASS** | `lockedModal="Project Name Locked", paywallOpen=true` |
| 075 | Wave 8 | PaywallModal Terms & Privacy links use subpath-safe relative URLs (not root /) | **PASS** | `[{"text":"Terms of Use (EULA)","href":"./terms.html"},{"text":"Privacy Policy","href":"./privacy.html"}]` |
| 076 | Wave 8 | Keep This Project opens nested StoreKit Payment Sheet | **PASS** | `sheetOpen=true` |
| 077 | Wave 8 | Escape closes ONLY top-most nested StoreKit sheet first, then PaywallModal | **PASS** | `afterEsc1={"sheetStillOpen":false,"paywallStillOpen":true}, afterEsc2={"sheetStillOpen":false,"paywallStillOpen":false}` |
| 078 | Wave 8 | Expired trial locks Checklist with non-dismissible PaywallModal (Escape cannot bypass) | **PASS** | `{"paywallVisible":true,"hasCloseBtn":false,"stillLockedAfterEsc":true}` |
| 079 | Wave 8 | Unlock for Life completes StoreKit flow and persists across reload | **PASS** | `{"paywallGone":true,"unlimitedKey":true,"unlockedReload":true}` |
| 080 | Wave 8 | Pro Multi-Project full CRUD (create/rename/delete + reload persistence) | **PASS** | `emptyDisabled=true, created="E2E Pro Project", renamed=true, deleted=true` |
| 081 | Wave 9 | Desktop 1440x900 Website: 0 overflow, 0 broken imgs, 0 leaks | **PASS** | `scrollW=1440/1440, broken=0` |
| 082 | Wave 9 | Desktop 1440x900 Web App (all 3 tabs): 0 overflow, 0 broken imgs | **PASS** | `overflow=false, broken=0` |
| 083 | Wave 9 | Tablet Landscape 1024x768 Website: 0 overflow, 0 broken imgs, 0 leaks | **PASS** | `scrollW=1024/1024, broken=0` |
| 084 | Wave 9 | Tablet Landscape 1024x768 Web App (all 3 tabs): 0 overflow, 0 broken imgs | **PASS** | `overflow=false, broken=0` |
| 085 | Wave 9 | Tablet Portrait 768x1024 Website: 0 overflow, 0 broken imgs, 0 leaks | **PASS** | `scrollW=768/768, broken=0` |
| 086 | Wave 9 | Tablet Portrait 768x1024 Web App (all 3 tabs): 0 overflow, 0 broken imgs | **PASS** | `overflow=false, broken=0` |
| 087 | Wave 9 | Mobile 390x844 Website: 0 overflow & hamburger menu + Escape work | **PASS** | `scrollW=390/390, menuOk=true` |
| 088 | Wave 9 | Mobile 390x844 Explorer Inspector Modal fits viewport with visible Close button | **PASS** | `{"found":true,"fitsWidth":true,"fitsHeight":true,"closeVisible":true}` |
| 089 | Wave 9 | Mobile 390x844 Web App & PaywallModal fit cleanly with clickable buttons | **PASS** | `{"found":true,"count":1,"fitsHeight":true,"fitsWidth":true,"rect":{"top":67,"bottom":777,"width":358,"height":710},"viewport":{"width":390,"height":844},"clippedBtns":[]}` |
| 090 | Wave 9 | Mobile 390x844 Legal pages have 0 horizontal overflow | **PASS** | `privacy.html:390/390, terms.html:390/390, support.html:390/390` |
| 091 | Wave 10 | All checklist items have unique IDs & 0 forbidden URLs | **PASS** | `items=106, dups=0` |
| 092 | Wave 10 | All Academy resources have unique IDs & 0 forbidden URLs | **PASS** | `resources=83, dups=0` |
| 093 | Wave 10 | Pluralization check on countdown & deleted item counts | **PASS** | `countdownPluralBug=false, deletedItemsPluralBug=false` |
| 094 | Wave 10 | Navbar catalog count matches live Explorer catalog count | **PASS** | `navbar=106, liveExplorer=106` |
| 095 | Wave 10 | Corrupted localStorage recovers cleanly with 0 page errors | **PASS** | `recovered=true, newPageErrors=0` |
| 096 | Wave 10 | All static assets, fonts, manifest & screenshots return HTTP 200 | **PASS** | `14/14 HTTP 200` |
| 097 | Wave 10 | HTML entry & legal pages have 0 stale launchready.app / localhost URLs | **PASS** | `0 stale URLs` |
| 098 | Wave 10 | StoreKit 2 Product IDs match across JS, Swift & .storekit config | **PASS** | `com.slava.appblueprint.keep_this_project, com.slava.appblueprint.unlimited_projects` |
| 099 | Wave 10 | Automated StoreKit 2 test suite passes cleanly | **PASS** | `[1m================================================================ \| [0m` |
| 100 | Wave 10 | Cumulative hard runtime telemetry: 0 page/console/network/HTTP>=400 errors | **PASS** | `pageErr=0, consoleErr=0, reqFail=0, badHttp=0` |


---

## Factual Accuracy, URL & Config Generator Audit Addendum (2026-11-23)

Following the initial 100/100 live functional audit, a complete line-by-line factual accuracy, URL liveness (199 unique external URLs + 59 YouTube oEmbed checks), and feature-truthfulness audit was executed across all data modules (`src/data/phases.ts`, `src/data/resources.ts`, `src/data/setupSteps.ts`, `src/data/generators.ts`, `src/data/habits.ts`, `src/data/troubleshooting.ts`), React components, and static legal pages.

### Root Issues Found & Fixed
1. **Blind Find-and-Replace Technical Corruptions Eliminated (`0` remaining):**
   - Fixed third-party brand misattributions (`Apple Flutter SDK` → `Google Flutter SDK`, `Apple Firebase Suite` → `Google Firebase Suite`, `Apple Gemini` → `Google Gemini & Antigravity`, `Apple Fonts` → `Google Fonts`, `Apple AdMob` → `Google AdMob`, `Apple UMP` → `Google UMP`, `Fastlane owned by Apple` → `open-source / Google`).
   - Eliminated all duplicated phrases (`Apple and Apple`, `iOS or iOS`, `App Store Connect and App Store Connect`, `Xcode and Xcode`, `App Store / App Store`, `Apple Apple App Store`).
   - Replaced Android-only APIs falsely attributed to iOS with accurate Apple APIs across all 12 phases:
     - App Icon (`p2-app-icon`): Replaced Android Adaptive Icons / `432x432` / `mipmap-*` / `Material You` / `512x512` with opaque `1024x1024px` PNG (`AppIcon.appiconset`), Dark/Tinted & iOS 26 Liquid Glass Icon Composer layers.
     - Keychain (`p4-keychain-keystore`): Replaced `EncryptedSharedPreferences` / `iOS Keystore` / `BiometricPrompt` with Apple Keychain Services (`kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`) & `LocalAuthentication` (`LAContext`).
     - Push Diagnostics (`p10-push-troubleshooting`): Replaced nonexistent iOS Notification Channels with APNs environment (sandbox vs production), `.p8` Auth Key, `aps-environment`, and `UNUserNotificationCenter`.
     - IAP Diagnostics (`p10-iap-troubleshooting` & `p8-storekit-iap-readiness`): Replaced false Android 3-day auto-refund claim with StoreKit 2 `await transaction.finish()`, `Transaction.updates`, and `product.purchase(confirmIn:)` iPadOS presentation context guidance.
     - Background Modes (`p3-background-modes`), Transit Security (`p4-transit-security`), Deep Linking (`p3-deep-linking`, `p10-deep-link-troubleshooting`), Crash Debugging (`p6-crash-reporting`, `p10-crash-debugging`), Release Type (`p9-submission-release-type`), Native Review Prompt (`p10-native-review-prompt`): Removed `iOSManifest.xml`, `WorkManager`, `res/xml/network_security_config.xml`, `assetlinks.json`, `ProGuard`, `logcat`, `Managed publishing`, and deprecated `SKStoreReviewController` (updated to `AppStore.requestReview(in:)`).
     - Screenshots (`p7-screenshots-video`, `launch-applaunchpad`, `launch-birme`): Removed Google Play `1080x2400` / `1024x500 Feature Graphic` dimensions and added Apple Guideline 2.3.7 warning (no pricing/"free" copy in screenshots).
2. **Dead 404 External URLs Replaced (5/5 → verified HTTP 200) & Duplicate Resource URLs Deduplicated (3/3 → 83 unique resources):**
   - Replaced `managing-storage-in-xcode` → `https://developer.apple.com/documentation/xcode`
   - Replaced `hig/navigation` → `https://developer.apple.com/design/human-interface-guidelines/navigation-and-search`
   - Replaced `app-store/in-app-purchases/` → `https://developer.apple.com/in-app-purchase/`
   - Replaced `privado.ai/apple-privacy-manifest` → `https://www.privado.ai/`
   - Replaced vacated FTC Click-to-Cancel 2024 press release (vacated July 8, 2025) → accurate **Subscription Transparency & ROSCA (3.1.2)** guide linking `https://developer.apple.com/app-store/subscriptions/`
   - Updated `Windsurf by Codeium` → **Devin Desktop (formerly Windsurf)** (`https://devin.ai/desktop`), `SF Symbols 6` → `SF Symbols 7`, Xcode 26+ (April 28, 2026 App Store SDK mandate, macOS Sequoia 15.6+ / Tahoe 26+), and current 2026 frontier AI models.
   - Replaced 3 duplicate resource URLs with distinct official resources (`Fontsource`, `Apple Accessibility & Dynamic Type`, `Apple Account Deletion 5.1.1v`) and fixed double-escaped `\\n` prompts.
3. **Mounted & Fixed Config Generators (`src/components/ConfigGenerators.tsx`, `src/data/generators.ts`, `src/components/ResourcesPage.tsx`):**
   - Mounted interactive **Config Generators** inside **Academy & Resources** (matching claims in `FAQSection`, `FeaturesGrid`, `support.html`, and `privacy.html`).
   - Fixed `generateAppEntitlements` by removing erroneous `<key>com.apple.developer.in-app-payments</key>` (Apple Pay, not StoreKit IAP) and adding opt-in Sign in with Apple & Push Notifications entitlements.
   - Fixed `generateAASA` to emit modern Apple `appIDs` + per-path `components` (no longer overridden by wildcard `"/*"`).
4. **Copy, Counts & Placeholder Hygiene:**
   - Synchronized all hardcoded `10 Phases` / `101` counts across Website, App headers, and static legal HTMLs to dynamic **12 Production Phases** and **106 Requirements**.
   - Replaced stale `Corner Swaps: App Creator` & `slava@icloud.com` in `PaywallModal.tsx` with `App Blueprint` & `demo@example.com`, and replaced hardcoded `com.slava.appblueprint` in generic user-facing `setupSteps.ts` prompt with `<BUNDLE_ID>`.

### Re-Verification Results
- **Content Defect & Dead-Link Static Audit:** `0` mangled strings, `0` duplicate resource URLs, `0` dead 404 URLs, `0` forbidden hosts in `src/` & `dist/`.
- **Live Accuracy & Config Generators Browser Suite (`verify_content_and_generators_live.cjs`):** **11/11 PASS** (Desktop `1440×900` + Mobile `390×844`, `0` overflow, `0` runtime errors).
- **Full 100-Check Live E2E Browser Suite (`run_100_checks.cjs`):** **100/100 PASS**, `pageErr=0`, `consoleErr=0`, `reqFail=0`, `badHttp=0`.
- **StoreKit 2 10x Verification Suite (`scripts/test_storekit_flow_10x.cjs`):** **21/21 PASS**.
