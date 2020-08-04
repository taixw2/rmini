//
//  String.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/24.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import Foundation

extension String {
    func matches(_ regexp: String) -> [String] {
        do {
            let regex = try NSRegularExpression(pattern: regexp)
            let results = regex.matches(in: self,
                                        range: NSRange(self.startIndex..., in: self))
            return results.map {
                String(self[Range($0.range, in: self)!])
            }
        } catch let error {
            print("invalid regex: \(error.localizedDescription)")
            return []
        }
    }
    
    func toUnderline() -> String {
        return self.replacingOccurrences(of: "/", with: "_")
    }
    
    func toDiagonal() -> String {
        return self.replacingOccurrences(of: "_", with: "/")
    }
}
