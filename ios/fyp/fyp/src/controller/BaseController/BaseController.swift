//
//  BaseController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import UIKit

class BaseNavigationController: UINavigationController {

    init() {
        let tab = BaseTabBarController()
        super.init(rootViewController: tab)
        navigationBar.isHidden = true
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError()
    }
    
}

class BaseTabBarController: UITabBarController {
    
    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
        
    }
    
    required init?(coder: NSCoder) { fatalError() }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        viewControllers = [
//            DashboardController(),
//            LeaveController(),
//            InboxController(),
            ProfileController()
        ]
        tabBar.tintColor = UIColor(named: "primary")
        tabBar.items?.forEach {
            $0.setTitleTextAttributes(
                [
                    .font: UIFont(name: "Inter-Medium", size: 12) as Any,
                    .foregroundColor: UIColor(named: "text") as Any
                ],
                for: .normal
            )
            
            $0.setTitleTextAttributes(
                [
                    .font: UIFont(name: "Inter-Medium", size: 12) as Any,
                    .foregroundColor: UIColor(named: "primary") as Any
                ],
                for: .selected
            )
        }
        tabBar.backgroundColor = .white
        
        setTabItems([
//            .init(title: "Dashboard", image: UIImage(named: "icon.tab.layout-grid")),
            .init(title: "Profile", image: UIImage(named: "icon.tab.user"))
        ])
//        setTabItem(0, title: "Dashboard")
//        setTabItem(0, title: "Profile")
    }
    
    struct TabItem {
        let title: String
        let image: UIImage?
    }
    
    private func setTabItems(_ items: [TabItem]) {
        for (i, each) in items.enumerated() {
            setTabItem(i, title: each.title, image: each.image)
        }
    }
    
    private func setTabItem(_ index: Int, title: String, image: UIImage? = nil) {
        guard let items = tabBar.items else { return }
        guard 0..<items.count ~= index else { return }
        let item = items[index]
        item.title = title
        item.image = image
    }
    
}
