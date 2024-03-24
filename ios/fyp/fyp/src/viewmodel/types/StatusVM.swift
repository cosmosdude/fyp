//
//  StatusVM.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 24/3/24.
//

import Foundation

class StatusVM<V, E> {
    
    enum Status {
        case processing
        case success(V)
        case failure(E)
        
        var isProcessing: Bool {
            switch self {
            case .processing: return true
            default: return false
            }
        }
    }
    
    @Published
    var status: Status?
    
}

extension StatusVM.Status where V == Void {
    static var success: Self { .success(()) }
}
