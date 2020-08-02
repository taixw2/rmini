//
//  JSBridge+console.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension JSBridge {
    static func console(option: JSInvokeNativeOption, callback: @escaping (Any?) -> Void) {
        // 把数据传递给 webviewController
        let messages = option.payload as? [String] ?? []
        switch messages.first {
        case "error":
            logger.error("📲JSCore->Native: \(messages)")
        case "warn":
            logger.warn("📲JSCore->Native: \(messages)")
        default:
            logger.info("📲JSCore->Native: \(messages)")
        }
        callback("")
    }
}
