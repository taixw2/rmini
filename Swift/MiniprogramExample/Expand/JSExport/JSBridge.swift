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
    static func invoke(_ payload: String)
}


class JSBridge: NSObject, JSBridgeExports {
    class func invoke(_ payload: String) {
        let invokeOption = JSInvokeNativeOption(JSONString: payload)
        invokeOption?.invoke()
    }
}
