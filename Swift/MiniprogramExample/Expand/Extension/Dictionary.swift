//
//  Dictionary.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/26.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import Foundation

extension Dictionary {
    
    func toJSON() throws -> String {
        do {
            let JSONData = try JSONSerialization.data(withJSONObject: self, options: [])
            return String(data: JSONData, encoding: .utf8)!
        } catch {
            throw error
        }
    }
}
