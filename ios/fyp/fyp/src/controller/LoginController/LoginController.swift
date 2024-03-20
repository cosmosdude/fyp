//
//  LoginController.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 16/3/24.
//

import UIKit

class LoginController: UIViewController {
    
    @IBOutlet private var usernameField: TextField!
    @IBOutlet private var passwordField: TextField!
    
    @IBOutlet private var rememberMe: CheckBox!
    
    @IBOutlet private var btn: UIButton!
    @IBOutlet private var spinner: UIActivityIndicatorView!
    
    private let defaults = UserDefaults.standard
    
    let loginModel = LoginModel()
    let userModel = UserModel()
    
    deinit {
        defaults.set(rememberMe.isChecked, forKey: "remember")
        defaults.set(usernameField.text, forKey: "remember.username")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        rememberMe.isChecked = defaults.bool(forKey: "remember")
        
        if (rememberMe.isChecked) {
            usernameField.text = defaults.string(forKey: "remember.username")
        }
    }
    
    @IBAction
    private func login() {
        loginModel.set(username: usernameField.text ?? "")
        loginModel.set(password: passwordField.text ?? "")
        btn.isHidden = true
        spinner.isHidden = false
        
        Task {
            do {
                try await loginModel.login()
                try await userModel.fetchUser()
            } catch {
                presentAlert(
                    title: "Error", message: error.localizedDescription
                )
            }
            view?.window?.setRootViewController(SplashController())
            btn.isHidden = false
            spinner.isHidden = true
        }
    }
    
}
