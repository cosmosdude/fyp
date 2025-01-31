//
//  SplashController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 16/3/24.
//

import UIKit

class SplashController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if LoginModel.isAuthorized && UserModel.user != nil {
            view.window?.setRootViewController(BaseNavigationController())
        } else {
            view.window?.setRootViewController(
                LoginController()
            )
        }
    }

}
