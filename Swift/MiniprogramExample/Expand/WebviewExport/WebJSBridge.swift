//
//  WebJSBridge.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension WebviewInvokeNative {
    func load(target: WebViewController, options: WebviewInvokeNativeOption) {
        switch self {
        case .lifecycle:
            self.liffeycle(target: target, liffe: options.payload as? String ?? "")
        case .log:
            self.log(payload: options.payload)
        case .event:
            self.event(target: target, option: options)
        default:
            logger.warn("method no support \(self)")
        }
    }
}

