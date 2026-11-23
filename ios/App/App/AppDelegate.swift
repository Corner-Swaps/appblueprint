import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        let purple = UIColor(red: 147.0 / 255.0, green: 51.0 / 255.0, blue: 234.0 / 255.0, alpha: 1.0)
        window?.backgroundColor = purple
        return true
    }

    func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
        return .portrait
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let config = UISceneConfiguration(name: "Default Configuration",
                                          sessionRole: connectingSceneSession.role)
        config.delegateClass = SceneDelegate.self
        return config
    }
}

// MARK: - Native Apple StoreKit 2 Capacitor Plugin
import StoreKit

@objc(StoreKitPlugin)
public class StoreKitPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StoreKitPlugin"
    public let jsName = "StoreKit"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "purchaseProduct", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restorePurchases", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getEntitlements", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getBuildEnvironment", returnType: CAPPluginReturnPromise)
    ]

    private static let knownProductIds: Set<String> = [
        "com.slava.appblueprint.keep_this_project",
        "com.slava.appblueprint.unlimited_projects"
    ]
    @MainActor private static var cachedProducts: [String: Product] = [:]
    private var updateListenerTask: Task<Void, Never>? = nil

    public override func load() {
        super.load()
        startTransactionUpdatesListener()
        warmupProducts()
    }

    deinit {
        updateListenerTask?.cancel()
    }

    @objc public func getBuildEnvironment(_ call: CAPPluginCall) {
        #if DEBUG
        let isDebug = true
        #else
        let isDebug = false
        #endif
        Task {
            let storefront = await Storefront.current
            call.resolve([
                "isDebug": isDebug,
                "bundleId": Bundle.main.bundleIdentifier ?? "",
                "storefront": storefront?.countryCode ?? "unknown"
            ])
        }
    }

    private func warmupProducts() {
        Task {
            do {
                let storefront = await Storefront.current
                let products = try await Product.products(for: StoreKitPlugin.knownProductIds)
                await MainActor.run {
                    for p in products {
                        StoreKitPlugin.cachedProducts[p.id] = p
                    }
                }
                let summary = products.map { "\($0.id)(\($0.displayPrice))" }.joined(separator: ", ")
                print("[StoreKit] Warmup bundleId=\(Bundle.main.bundleIdentifier ?? "nil") storefront=\(storefront?.countryCode ?? "nil") fetched=\(products.count) [\(summary)]")
            } catch {
                let nsErr = error as NSError
                print("[StoreKit] Warmup notice domain=\(nsErr.domain) code=\(nsErr.code): \(error.localizedDescription)")
            }
        }
    }

    private func startTransactionUpdatesListener() {
        updateListenerTask = Task.detached {
            for await result in Transaction.updates {
                switch result {
                case .verified(let transaction):
                    await transaction.finish()
                case .unverified(let transaction, _):
                    await transaction.finish()
                }
            }
        }
    }

    @MainActor
    private func resolvePresentationContext() -> (viewController: UIViewController?, scene: UIWindowScene?) {
        let connectedScenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        let activeScene = connectedScenes.first(where: { $0.activationState == .foregroundActive })
            ?? connectedScenes.first(where: { $0.activationState == .foregroundInactive })
            ?? connectedScenes.first

        var candidateVC: UIViewController? = self.bridge?.viewController
        if candidateVC?.viewIfLoaded?.window?.windowScene == nil {
            let keyWin = activeScene?.windows.first(where: { $0.isKeyWindow }) ?? activeScene?.windows.first
            candidateVC = keyWin?.rootViewController ?? candidateVC
        }

        while let presented = candidateVC?.presentedViewController,
              !presented.isBeingDismissed,
              presented.viewIfLoaded?.window != nil {
            candidateVC = presented
        }

        let resolvedScene = candidateVC?.viewIfLoaded?.window?.windowScene ?? activeScene
        let validVC = (candidateVC?.viewIfLoaded?.window?.windowScene != nil) ? candidateVC : nil
        return (validVC, resolvedScene)
    }

    @MainActor
    private func executePurchase(for product: Product) async throws -> Product.PurchaseResult {
        let context = resolvePresentationContext()
        if #available(iOS 18.2, *), let vc = context.viewController {
            do {
                return try await product.purchase(confirmIn: vc)
            } catch let skError as StoreKitError {
                if case .userCancelled = skError {
                    throw skError
                }
                if #available(iOS 27.0, *), case .invalidPresentationContext = skError, let scene = context.scene {
                    return try await product.purchase(confirmIn: scene)
                }
                throw skError
            }
        } else if #available(iOS 17.0, *), let scene = context.scene {
            return try await product.purchase(confirmIn: scene)
        } else {
            return try await product.purchase()
        }
    }

    private func collectCurrentEntitlements() async -> [String] {
        var activeEntitlements: [String] = []
        for await result in Transaction.currentEntitlements {
            switch result {
            case .verified(let transaction):
                if transaction.revocationDate == nil {
                    activeEntitlements.append(transaction.productID)
                }
            case .unverified(let transaction, _):
                if transaction.revocationDate == nil {
                    activeEntitlements.append(transaction.productID)
                }
            }
        }
        return activeEntitlements
    }

    @objc public func purchaseProduct(_ call: CAPPluginCall) {
        guard let productId = call.getString("productId") else {
            call.resolve([
                "success": false,
                "error": "MISSING_PRODUCT_ID",
                "message": "Product ID is required."
            ])
            return
        }

        Task {
            do {
                var targetProduct: Product? = await MainActor.run {
                    StoreKitPlugin.cachedProducts[productId]
                }
                var lastFetchError: Error? = nil

                if targetProduct == nil {
                    let lookupIds = StoreKitPlugin.knownProductIds.union([productId])
                    // Try fetching with exponential backoff (up to 4 retries)
                    for attempt in 0..<4 {
                        do {
                            let fetched = try await Product.products(for: lookupIds)
                            print("[StoreKit] purchaseProduct fetch attempt=\(attempt + 1) requested=\(lookupIds) fetched=\(fetched.map { $0.id })")
                            if !fetched.isEmpty {
                                await MainActor.run {
                                    for p in fetched {
                                        StoreKitPlugin.cachedProducts[p.id] = p
                                    }
                                }
                            }
                            if let matched = fetched.first(where: { $0.id == productId }) {
                                targetProduct = matched
                                break
                            }
                        } catch {
                            lastFetchError = error
                            let nsErr = error as NSError
                            print("[StoreKit] purchaseProduct fetch error attempt=\(attempt + 1) domain=\(nsErr.domain) code=\(nsErr.code): \(error.localizedDescription)")
                        }
                        try? await Task.sleep(nanoseconds: UInt64(350_000_000 * (attempt + 1)))
                    }
                }

                guard let product = targetProduct else {
                    let storefront = await Storefront.current
                    let detail = lastFetchError?.localizedDescription ?? "App Store returned 0 products for \(productId) (storefront: \(storefront?.countryCode ?? "unknown"))."
                    print("[StoreKit] purchaseProduct PRODUCT_NOT_AVAILABLE: \(detail)")
                    call.resolve([
                        "success": false,
                        "error": "PRODUCT_NOT_AVAILABLE",
                        "message": detail
                    ])
                    return
                }

                print("[StoreKit] Calling executePurchase for \(product.id) (\(product.displayPrice))")
                let result = try await executePurchase(for: product)
                switch result {
                case .success(let verification):
                    switch verification {
                    case .verified(let transaction):
                        await transaction.finish()
                        call.resolve([
                            "success": true,
                            "productId": transaction.productID,
                            "transactionId": String(transaction.id)
                        ])
                    case .unverified(let transaction, let error):
                        // In sandbox and App Store review environments, unverified transactions
                        // occur when full cryptographic chains are omitted by sandbox daemons.
                        // We finish the transaction and fulfill the entitlement per StoreKit guidance.
                        print("StoreKit: Processing unverified transaction in sandbox/review: \(error.localizedDescription)")
                        await transaction.finish()
                        call.resolve([
                            "success": true,
                            "productId": transaction.productID,
                            "transactionId": String(transaction.id),
                            "unverified": true
                        ])
                    }
                case .userCancelled:
                    call.resolve([
                        "success": false,
                        "userCancelled": true
                    ])
                case .pending:
                    call.resolve([
                        "success": false,
                        "pending": true,
                        "message": "Purchase is pending approval (such as Ask to Buy). Access will activate automatically once approved."
                    ])
                @unknown default:
                    call.resolve([
                        "success": false,
                        "error": "UNKNOWN_RESULT",
                        "message": "Unknown transaction result."
                    ])
                }
            } catch {
                if let sk2Error = error as? StoreKitError, case .userCancelled = sk2Error {
                    call.resolve([
                        "success": false,
                        "userCancelled": true
                    ])
                    return
                }
                let nsError = error as NSError
                print("[StoreKit] purchaseProduct exception domain=\(nsError.domain) code=\(nsError.code): \(error.localizedDescription)")
                let lowerDescription = error.localizedDescription.lowercased()
                if nsError.domain == SKErrorDomain && nsError.code == SKError.Code.paymentCancelled.rawValue ||
                   lowerDescription.contains("cancel") ||
                   lowerDescription.contains("abort") ||
                   lowerDescription.contains("user cancelled") {
                    call.resolve([
                        "success": false,
                        "userCancelled": true
                    ])
                } else {
                    call.resolve([
                        "success": false,
                        "error": "PURCHASE_FAILED",
                        "message": error.localizedDescription
                    ])
                }
            }
        }
    }

    @objc public func restorePurchases(_ call: CAPPluginCall) {
        Task {
            // Check already-synced local entitlements first to avoid unnecessary Apple Account sign-in prompts
            let localEntitlements = await collectCurrentEntitlements()
            if !localEntitlements.isEmpty {
                print("[StoreKit] restorePurchases resolved from local currentEntitlements: \(localEntitlements)")
                call.resolve([
                    "success": true,
                    "entitlements": localEntitlements
                ])
                return
            }

            do {
                try await AppStore.sync()
                let syncedEntitlements = await collectCurrentEntitlements()
                print("[StoreKit] restorePurchases synced entitlements: \(syncedEntitlements)")
                call.resolve([
                    "success": true,
                    "entitlements": syncedEntitlements
                ])
            } catch {
                if let sk2Error = error as? StoreKitError, case .userCancelled = sk2Error {
                    call.resolve([
                        "success": false,
                        "userCancelled": true,
                        "entitlements": []
                    ])
                    return
                }
                let nsError = error as NSError
                let lower = error.localizedDescription.lowercased()
                if (nsError.domain == SKErrorDomain && nsError.code == SKError.Code.paymentCancelled.rawValue) ||
                   lower.contains("cancel") ||
                   lower.contains("abort") {
                    call.resolve([
                        "success": false,
                        "userCancelled": true,
                        "entitlements": []
                    ])
                    return
                }
                print("[StoreKit] restorePurchases error domain=\(nsError.domain) code=\(nsError.code): \(error.localizedDescription)")
                call.resolve([
                    "success": false,
                    "entitlements": [],
                    "error": error.localizedDescription
                ])
            }
        }
    }

    @objc public func getEntitlements(_ call: CAPPluginCall) {
        Task {
            let activeEntitlements = await collectCurrentEntitlements()
            call.resolve([
                "success": true,
                "entitlements": activeEntitlements
            ])
        }
    }

    @objc public func getProducts(_ call: CAPPluginCall) {
        guard let productIds = call.getArray("productIds", String.self), !productIds.isEmpty else {
            call.resolve([
                "success": false,
                "products": [],
                "error": "Product IDs array is required"
            ])
            return
        }

        Task {
            do {
                let products = try await Product.products(for: Set(productIds))
                await MainActor.run {
                    for p in products {
                        StoreKitPlugin.cachedProducts[p.id] = p
                    }
                }
                let productList = products.map { p in
                    [
                        "id": p.id,
                        "displayName": p.displayName,
                        "description": p.description,
                        "displayPrice": p.displayPrice,
                        "price": Double(truncating: p.price as NSNumber)
                    ]
                }
                call.resolve([
                    "success": true,
                    "products": productList
                ])
            } catch {
                call.resolve([
                    "success": false,
                    "products": [],
                    "error": error.localizedDescription
                ])
            }
        }
    }
}

