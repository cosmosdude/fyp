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
    
    private let defaults = UserDefaults.standard
    
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
    
}
