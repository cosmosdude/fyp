//
//  AnyJSON.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 19/3/24.
//

import Foundation

// [Ref](https://github.com/cosmosdude/AnyJSON/blob/main/AnyJSON.swift)

/// Swift Decodable Compatible JSON structure.
public struct AnyJSON: Decodable {
    
    /// Underlying JSON
    private let value: Any!
    
    private struct Key: CodingKey {
        var stringValue: String
        
        init?(stringValue: String) {
            self.stringValue = stringValue
        }
        // JSON has no int key
        var intValue: Int?
        init?(intValue: Int) { nil }
    }
    
    public init(from decoder: Decoder) throws {
        
        if let object = try? decoder.container(keyedBy: Key.self) {
            // Object representation
            // parse each key as Swift Dictionary
            var result: [String: Self] = [:]
            for each in object.allKeys {
                result[each.stringValue] = try object.decode(
                    Self.self, forKey: each
                )
            }
            value = result
        } else if var array = try? decoder.unkeyedContainer() {
            let count = array.count ?? 0
            var jsons = [Self]()
            for _ in 0..<count {
                jsons.append(try array.decode(Self.self))
            }
            value = jsons
        } else if let ctx = try? decoder.singleValueContainer() {
            if let int = try? ctx.decode(Int.self) {
                value = int
            } else if let double = try? ctx.decode(Double.self) {
                value = double
            } else if let string = try? ctx.decode(String.self) {
                value = string
            } else if let bool = try? ctx.decode(Bool.self) {
                value = bool
            } else {
                value = nil
            }
        } else {
            value = nil
        }
    }
    
    /// Try to get underlying value as Integer
    public var integer: Int? {
        value as? Int
    }
    
    /// Try to get underlying value as Double
    public var double: Double? {
        value as? Double
    }
    
    /// Try to get underlying value as String
    public var string: String? {
        value as? String
    }
    
    public var bool: Bool? {
        value as? Bool
    }
    
    /// Try to get underlying value as Array
    public var array: [Self]? {
        value as? [Self]
    }
    
    /// Try to get underlying value as Dictionary
    public var dictionary: [String: Self]? {
        value as? [String: Self]
    }
    
    /// Test if the value is null.
    public var isNull: Bool {
        value == nil
    }
    
    /// Forcely get as null
    public var null: Any? {
        return nil
    }
    
    /// Get Recursive JSON structure.
    public var json: Any {
        if let int = integer {
            return int
        } else if let double = double {
            return double
        } else if let string = string {
            return string
        } else if let bool = bool {
            return bool
        } else if let array = array {
            return array.map { $0.json }
        } else if let dictionary = dictionary {
            var result = [String: Any]()
            for (key, value) in dictionary {
                result[key] = value.json
            }
            return result
        } else {
            return Any?.none as Any
        }
    }
}
