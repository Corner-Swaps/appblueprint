import UIKit
import SwiftUI
import CoreText
import Capacitor
import StoreKit

// MARK: - App Font Manager (Matches Essential Timer Dynamic Font Registration)
enum AppFontManager {
    static var hasRegistered: Bool = false
    
    static func registerFonts() {
        guard !hasRegistered else { return }
        hasRegistered = true
        let fontNames = ["GoogleSans-Medium", "GoogleSans-Regular", "GoogleSans-Bold"]
        for name in fontNames {
            let urls = [
                Bundle.main.url(forResource: name, withExtension: "ttf"),
                Bundle.main.url(forResource: name, withExtension: "ttf", subdirectory: "Fonts"),
                Bundle.main.url(forResource: name, withExtension: "ttf", subdirectory: "public/fonts"),
                Bundle.main.bundleURL.appendingPathComponent("public/fonts/\(name).ttf"),
                Bundle.main.bundleURL.appendingPathComponent("Fonts/\(name).ttf")
            ].compactMap { $0 }
            
            for url in urls {
                if FileManager.default.fileExists(atPath: url.path),
                   let dataProvider = CGDataProvider(url: url as CFURL),
                   let font = CGFont(dataProvider) {
                    var error: Unmanaged<CFError>?
                    CTFontManagerRegisterGraphicsFont(font, &error)
                    break
                }
            }
        }
    }
    
    static func googleSansMedium(size: CGFloat) -> Font {
        registerFonts()
        if UIFont(name: "GoogleSans-Medium", size: size) != nil {
            return Font.custom("GoogleSans-Medium", size: size)
        } else if UIFont(name: "Google Sans Medium", size: size) != nil {
            return Font.custom("Google Sans Medium", size: size)
        } else {
            return Font.system(size: size, weight: .medium, design: .default)
        }
    }
}

// MARK: - Native SwiftUI Splash Intro View (Exact Essential Timer Match: 120 FPS Metal ProMotion)
struct BlueprintSplashIntroView: View {
    var onFinished: () -> Void
    
    @State private var drawProgress: CGFloat = 0.0
    @State private var hasTriggeredDismiss: Bool = false
    
    var body: some View {
        ZStack {
            // Vibrant purple background matching button purple #9333ea
            Color(red: 147.0 / 255.0, green: 51.0 / 255.0, blue: 234.0 / 255.0)
                .ignoresSafeArea()
            
            // Soft central ambient glow
            RadialGradient(
                colors: [
                    Color.white.opacity(0.08),
                    Color.clear
                ],
                center: .center,
                startRadius: 20,
                endRadius: 280
            )
            .ignoresSafeArea()
            
            // 1. Centered Original Rocket Logo (201x201) with optical -48 offset
            ZStack {
                Image("blueprint_logo_white")
                    .resizable()
                    .renderingMode(.template)
                    .foregroundColor(.white)
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 201, height: 201)
                    .blur(radius: (1.0 - drawProgress) * 5.0)
                    .opacity(Double(drawProgress))
                    .scaleEffect(0.92 + 0.08 * drawProgress)
            }
            .offset(y: -48)
            .contentShape(Rectangle())
            
            // 2. Title Positioned Lower at the Bottom
            VStack {
                Spacer()
                
                Text("App Blueprint")
                    .font(AppFontManager.googleSansMedium(size: 34))
                    .foregroundColor(.white)
                    .shadow(
                        color: Color.black.opacity(0.40 * Double(drawProgress)),
                        radius: 8 * drawProgress,
                        x: 0,
                        y: 2
                    )
                    .blur(radius: (1.0 - drawProgress) * 5.0)
                    .opacity(Double(drawProgress))
                    .scaleEffect(0.94 + 0.06 * drawProgress)
                    .padding(.bottom, 50)
            }
            .ignoresSafeArea()
        }
        .contentShape(Rectangle())
        .onTapGesture {
            dismissIntro()
        }
        .onAppear {
            AppFontManager.registerFonts()
            startAnimationSequence()
        }
    }
    
    private func startAnimationSequence() {
        // Smooth, slow appearance expanding gently with subtle blur dissipation over 1.55s
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.08) {
            withAnimation(.timingCurve(0.20, 0.0, 0.15, 1.0, duration: 1.55)) {
                drawProgress = 1.0
            }
        }
        
        // Hold full view cleanly for a natural breath (0.55s), then smoothly dismiss
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.18) {
            dismissIntro()
        }
    }
    
    private func dismissIntro() {
        guard !hasTriggeredDismiss else { return }
        hasTriggeredDismiss = true
        onFinished()
    }
}

// MARK: - Native StoreKit Plugin
@objc(NativeReviewPlugin)
public class NativeReviewPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NativeReviewPlugin"
    public let jsName = "NativeReview"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "requestReview", returnType: CAPPluginReturnPromise)
    ]

    @objc public func requestReview(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if let windowScene = UIApplication.shared.connectedScenes.first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
                SKStoreReviewController.requestReview(in: windowScene)
                call.resolve(["success": true])
            } else if let windowScene = self.bridge?.viewController?.view.window?.windowScene {
                SKStoreReviewController.requestReview(in: windowScene)
                call.resolve(["success": true])
            } else {
                call.resolve(["success": false, "error": "No active window scene"])
            }
        }
    }
}

// MARK: - Root Bridge View Controller with Native Splash Presentation
class PortraitBridgeViewController: CAPBridgeViewController {
    private var splashHostingController: UIHostingController<BlueprintSplashIntroView>?

    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        return .portrait
    }
    override var preferredInterfaceOrientationForPresentation: UIInterfaceOrientation {
        return .portrait
    }
    override var shouldAutorotate: Bool {
        return false
    }
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }

    override func viewDidLoad() {
        let purpleColor = UIColor(red: 147.0 / 255.0, green: 51.0 / 255.0, blue: 234.0 / 255.0, alpha: 1.0)
        view.backgroundColor = purpleColor
        super.viewDidLoad()
        view.backgroundColor = purpleColor
        webView?.backgroundColor = purpleColor
        webView?.scrollView.backgroundColor = purpleColor
        webView?.isOpaque = false
        webView?.scrollView.bounces = false
        webView?.scrollView.alwaysBounceVertical = false
        showNativeSplash()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        let purpleColor = UIColor(red: 147.0 / 255.0, green: 51.0 / 255.0, blue: 234.0 / 255.0, alpha: 1.0)
        view.backgroundColor = purpleColor
        webView?.backgroundColor = purpleColor
        webView?.scrollView.backgroundColor = purpleColor
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        splashHostingController?.view.frame = view.bounds
    }

    private func showNativeSplash() {
        let purpleColor = UIColor(red: 147.0 / 255.0, green: 51.0 / 255.0, blue: 234.0 / 255.0, alpha: 1.0)
        let splashView = BlueprintSplashIntroView { [weak self] in
            guard let self = self, let hosting = self.splashHostingController else { return }
            UIView.animate(withDuration: 0.35, delay: 0, options: [.curveEaseOut], animations: {
                hosting.view.alpha = 0
            }) { _ in
                hosting.view.removeFromSuperview()
                hosting.removeFromParent()
                self.splashHostingController = nil
            }
        }
        let hosting = UIHostingController(rootView: splashView)
        hosting.view.backgroundColor = purpleColor
        hosting.view.isOpaque = true
        hosting.view.frame = UIScreen.main.bounds
        hosting.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        self.addChild(hosting)
        self.view.addSubview(hosting.view)
        hosting.didMove(toParent: self)
        self.splashHostingController = hosting
    }
}

// MARK: - Scene Delegate
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        let purpleColor = UIColor(red: 147.0 / 255.0, green: 51.0 / 255.0, blue: 234.0 / 255.0, alpha: 1.0)
        window = UIWindow(windowScene: windowScene)
        window?.backgroundColor = purpleColor
        window?.rootViewController = PortraitBridgeViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}
