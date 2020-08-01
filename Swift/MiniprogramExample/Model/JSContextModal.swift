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
    
    let prefixScript = """

    var module = { exports: {} };
    function __vm(global) {
    """
    let subfixScript = "}; __vm.call(module.exports, module.exports)"
    
    init(javascriptContent: String) {
        let context: JSContext = JSContext()
        context.exceptionHandler = { context, exception in
            let sourcemap = exception?.toDictionary()
            logger.error("JS Error: \(exception?.toString() ?? "没有错误") :\(String(describing: sourcemap?["line"] ?? "")):\(String(describing: sourcemap?["column"] ?? ""))")
        }
        
        context.evaluateScript("console.log('hello miniprogram')")
        context.setObject(JSBridge.self, forKeyedSubscript: "__JSB" as NSCopying & NSObjectProtocol)
        
        let script = "\(prefixScript)\(javascriptContent)\(subfixScript)"
        context.evaluateScript(script)
        self.context = context
    }
    
    func invoke(payload: JSContextPayload) {
        let payloadJSON = try! payload.payload.toJSON()
        let scriptContent = "module.exports.__polyfill__.nativeInvoke({ type: \(payload.type), payload: \(payloadJSON) })"
        
        logger.info("execscript: \(scriptContent)")
        self.context.evaluateScript(scriptContent)
    }
}
