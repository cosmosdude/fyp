//
//  fn.swift
//  fyp
//
//  Created by Thwin Htoo Aung on 25/3/24.
//

import Foundation

// A collection of reusable functions

/// Convert given seconds to overtime duratime string
/// i.e %d hr(s) %d min(s)
func overtimeDurationText(seconds s: Int) -> String {
    let m = s / 60
    let h = m / 60
    
    return (h > 0) ? String(
        format: "%d hr(s) %d min(s)", h, m
    ) : String(
        format: "%d min(s)", m
    )
}
