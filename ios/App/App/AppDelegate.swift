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
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise)
    ]

    private var updateListenerTask: Task<Void, Never>? = nil

    public override func load() {
        super.load()
        startTransactionUpdatesListener()
    }

    deinit {
        updateListenerTask?.cancel()
    }

    private func startTransactionUpdatesListener() {
        updateListenerTask = Task.detached {
            for await result in Transaction.updates {
                if case .verified(let transaction) = result {
                    await transaction.finish()
                }
            }
        }
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
                // Fetch products with sandbox warmup retry
                var products = try await Product.products(for: [productId])
                if products.isEmpty {
                    try? await Task.sleep(nanoseconds: 600_000_000)
                    products = try await Product.products(for: [productId])
                }

                guard let product = products.first else {
                    call.resolve([
                        "success": false,
                        "error": "PRODUCT_NOT_AVAILABLE",
                        "message": "Product currently unavailable from App Store. Please check your network connection or App Store Connect configuration."
                    ])
                    return
                }

                let result = try await product.purchase()
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
                    case .unverified(_, let error):
                        call.resolve([
                            "success": false,
                            "error": "UNVERIFIED_TRANSACTION",
                            "message": error.localizedDescription
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
                let nsError = error as NSError
                if nsError.domain == SKErrorDomain && nsError.code == SKError.Code.paymentCancelled.rawValue {
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
            do {
                try await AppStore.sync()
                var activeEntitlements: [String] = []
                for await result in Transaction.currentEntitlements {
                    if case .verified(let transaction) = result {
                        if transaction.revocationDate == nil {
                            activeEntitlements.append(transaction.productID)
                        }
                    }
                }
                call.resolve([
                    "success": true,
                    "entitlements": activeEntitlements
                ])
            } catch {
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
            var activeEntitlements: [String] = []
            for await result in Transaction.currentEntitlements {
                if case .verified(let transaction) = result {
                    if transaction.revocationDate == nil {
                        activeEntitlements.append(transaction.productID)
                    }
                }
            }
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

