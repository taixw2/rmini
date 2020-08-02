//
//  ReadableController.swift
//  MiniprogramExample
//
//  Created by mac on 2020/7/31.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

class ReaderController {
    static let shared: ReaderController = ReaderController()
    
    func readFilecontent(appId: String, filename: String, error: inout Error?) -> String {
        let name = filename.hasPrefix("/") ? filename : "/\(filename)"
        let filePath = AppConfig.miniprogramDir.appending(appId).appending(name)
        do {
            return try String(contentsOfFile: filePath, encoding: .utf8)
        } catch let err {
            error = err
        }
        return ""
    }
}
