//
//  ManagerVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation
import Combine
import TANetworking

final class ManagerVM {
    
    private var personalManagers = [Manager]()
    private var hrManagers = [Manager]()
    
    @Published
    private(set) var selectedManager: Manager?
    
    var selectedIndex: IndexPath? {
        didSet {
            guard let selectedIndex else { return selectedManager = nil }
            
            selectedManager = managers[selectedIndex.section][selectedIndex.row]
        }
    }
    
    @Published
    private(set) var managers = [ItemGroup<String, [Manager]>]()
    
    let userService = UserService(accessToken: LoginModel.accessToken)
    
    func fetchManagers() {
        Task(operation: _fetchManagers)
    }
    
    @Sendable
    private func _fetchManagers() async {
        personalManagers = (try? await userService.fetchManagers(.assigned))?
            .map(Manager.init) ?? []
        hrManagers = (try? await userService.fetchManagers(.hr))?
            .map(Manager.init) ?? []
        
        managers = [
            ItemGroup(info: "Manager", items: personalManagers),
            ItemGroup(info: "HR Managers", items: hrManagers)
        ]
    }
}
