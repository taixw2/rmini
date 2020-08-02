//
//  URL.swift
//  MiniprogramExample
//
//  Created by mac on 2020/8/2.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension URL {
    var qsParse: [String: String] {
        guard let query = self.query else { return [:]}
        var queryStrings = [String: String]()
        for pair in query.components(separatedBy: "&") {
            let key = pair.components(separatedBy: "=")[0]
            let value = pair
                .components(separatedBy:"=")[1]
                .replacingOccurrences(of: "+", with: " ")
                .removingPercentEncoding ?? ""
            queryStrings[key] = value
        }
        return queryStrings
    }
}
