//
//  main.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 16/3/24.
//

import Foundation
import UIKit

_ = UIApplicationMain(
    CommandLine.argc, CommandLine.unsafeArgv,
    nil,
    NSStringFromClass(AppDelegate.self)
)


let aa: Any = ["Hello": "World"]

(*aa)?["Hello"]
