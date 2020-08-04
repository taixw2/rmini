//
//  WebJSBridge+lifecycle.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

enum WebviewLiffeycle: String {
    case ready = "ready"
}

extension WebviewInvokeNative {
    func liffeycle(target: WebViewController, liffe: String) {
        let lf = WebviewLiffeycle(rawValue: liffe)
        
        switch lf {
        case .ready:
            target.ready()
        default:
            break
        }
    }
}
