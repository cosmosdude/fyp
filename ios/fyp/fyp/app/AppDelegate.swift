//
//  AppDelegate.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 15/3/24.
//

import UIKit
import UserNotifications

class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        UNUserNotificationCenter.current().delegate = self
        UNUserNotificationCenter.current().requestAuthorization(
            options: [.alert, .badge, .sound]
        ) { success, error in
            
        }
        // Override point for customization after application launch.
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(
        _ application: UIApplication,
        configurationForConnecting connectingSceneSession: UISceneSession,
        options: UIScene.ConnectionOptions
    ) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        let config = UISceneConfiguration(
            name: "Default Configuration",
            sessionRole: connectingSceneSession.role
        )
        
        UITabBarItem.appearance().setTitleTextAttributes(
            [
                .font: UIFont(name: "Inter", size: 12) as Any,
                .foregroundColor: UIColor(named: "neutral-900") as Any
            ],
            for: .normal
        )
        
        UITabBarItem.appearance().setTitleTextAttributes(
            [
                .font: UIFont(name: "Inter-Bold", size: 12) as Any,
                .foregroundColor: UIColor(named: "primary") as Any
            ],
            for: .selected
        )
        return config
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

extension AppDelegate: UNUserNotificationCenterDelegate {
    
    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        print(deviceToken.base64EncodedString())
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        print("Did Receive")
        completionHandler()
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        print("Will Present", notification.request.content.userInfo)
        let userInfo = notification.request.content.userInfo
        let payload = NotiPayload(payload: userInfo)
        
        if let userId = payload?.userId, userId == UserModel.user?.id {
            completionHandler([.badge, .banner, .sound])
            NotificationCenter.default.post(.didReceiveRemoteNotification)
        } else {
            completionHandler([])
        }
    }
    
}

struct NotiPayload {
    let payload: [String: Any]
    
    init?(payload: Any) {
        guard let payload = payload as? [String: Any] else { return nil }
        guard let fyp = payload["fyp"] as? [String: Any] else { return nil}
        self.payload = fyp
    }
    
    var userId: String? { payload["user_id"] as? String }
    var type: String? { payload["type"] as? String }
}

extension Notification {
    static let didReceiveRemoteNotification = Notification(name: .didReceiveRemoteNotification)
}

extension NSNotification.Name {
    static let didReceiveRemoteNotification = NSNotification.Name(rawValue: "tha.fyp.didReceiveRemoteNotification")
}
