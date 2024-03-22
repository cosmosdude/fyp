//
//  ItemGroup.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 22/3/24.
//

import Foundation

struct ItemGroup<Info, Items> {
    
    var info: Info
    var items: Items
    
    init(info: Info = Void(), items: Items = Void()) {
        self.info = info
        self.items = items
    }
    
}

extension ItemGroup where Items: Collection {
    var count: Int { items.count }
}

extension ItemGroup where Items: RandomAccessCollection {
    subscript(_ i: Items.Index) -> Items.Element {
        items[i]
    }
}
