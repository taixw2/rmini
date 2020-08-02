//
//  JSBridge.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/26.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore
import UIKit

@objc protocol JSBridgeExports: JSExport {
    static func invoke(_ payload: String) -> Any?
}

class JSBridge: NSObject, JSBridgeExports {
    class func invoke(_ payload: String) -> Any? {
        let invokeOption = JSInvokeNativeOption(JSONString: payload)
        return invokeOption?.invoke()
    }
}

extension InvokeNativeMethod {
    func load(options: JSInvokeNativeOption, _ callback: @escaping (Any?) -> Void) {
        switch self {
        case .setData:
            JSBridge.setData(option: options, callback: callback)
        case .launch:
            JSBridge.launch(option: options, callback: callback)
        case .console:
            JSBridge.console(option: options, callback: callback)
        case .navigateTo:
            JSBridge.navigateTo(option: options, callback: callback)
        case .setStorage:
            JSBridge.setStorage(option: options, callback: callback)
        case .getStorage:
            JSBridge.getStorage(option: options, callback: callback)
        default:
            logger.warn("method no support \(self)")
        }
    }
}
