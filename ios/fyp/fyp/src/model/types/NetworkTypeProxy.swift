//
//  NetworkTypeProxy.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

@dynamicMemberLookup
protocol NetworkTypeProxy {
    associatedtype ProxyValue
    
    var value: ProxyValue { get }
    
    init(_ value: ProxyValue)
    
    subscript<T>(dynamicMember keyPath: KeyPath<ProxyValue, T>) -> T { get }
}

extension NetworkTypeProxy {
    
    subscript<T>(dynamicMember keyPath: KeyPath<ProxyValue, T>) -> T {
        get { value[keyPath: keyPath] }
    }
    
}
