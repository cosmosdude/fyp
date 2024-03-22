//
//  +Ext.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

infix operator <-

func <- < T >(_ lhs: inout T, _ rhs: Any) {
    lhs = rhs as! T
}

func <- < T > (_ lhs: inout T, _ rhs: Any?) {
    if let value = rhs as? T {
        lhs = value;
    }
}

prefix operator *

prefix func *(_ value: Any) -> [String: Any]? {
    value as? [String: Any]
}

infix operator ~
func ~<T>(_ lhs: Any, _ rhs: T.Type) -> T? {
    return lhs as? T
}



