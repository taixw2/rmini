//
//  JSContextModal.swift
//  MiniprogramExample
//
//  Created by mac on 2020/7/31.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation
import JavaScriptCore

class JSContextPayload {
    let type: Int
    let payload: Dictionary<String, Any>

    init(type: Int, payload: Dictionary<String, Any>) {
        self.type = type
        self.payload = payload
    }
}

class JSContextModal {
    let context: JSContext
    
    init(javascriptContent: String) {
        let context: JSContext = JSContext()
        context.exceptionHandler = { context, exception in
            logger.error("JS Error: \(exception!.toString() ?? "没有错误")")
        }
        
        context.evaluateScript("console.log('hello miniprogram')")
        // TODO: 注入 jsbridge
        self.context = context
    }
    
    func invoke(payload: JSContextPayload) {
        let payloadJSON = try! payload.payload.toJSON()
        let scriptContent = "__payload__.nativeInvoke({ type: \(payload.type), payload: \(payloadJSON) })"
        
        logger.info("execscript: \(scriptContent)")
        self.context.evaluateScript(scriptContent)
    }
}
