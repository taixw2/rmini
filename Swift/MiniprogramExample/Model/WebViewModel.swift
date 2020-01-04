//
//  WebViewModal.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/26.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore

class WebViewModel {
    
    let jsContext: JSContext
    
    let webviewId: String
    
    let appId: String
    
    init(jsContext: JSContext, appId: String, webviewId: String) {
        self.jsContext = jsContext
        self.webviewId = webviewId
        self.appId = appId
    }

    // getter
    var fileName: String {
        let route = jsContext.evaluateScript("$$private.getRoute(\"\(self.webviewId)\")")?.toDictionary() ?? [:]
        let path = route["path"] as? String;
        var fileName = path?.toUnderline() ?? ""
        _ = fileName.removeFirst()
        return fileName;
    }
    
    var filePath: String {
        return AppConfig.miniprogramDir.appending(appId).appending("/").appending(fileName).appending(".html")
    }
        
    var html: String {
        return try! String(contentsOfFile: filePath, encoding: .utf8)
    }
    
    var initData: [AnyHashable: Any] {
        return jsContext.evaluateScript("$$private.getInitData(\"\(webviewId)\")")?.toDictionary() ?? [:]
    }
    
    // invoke native javascriptCore
    func onLoad() {
        jsContext.evaluateScript("$$private.callLifecycle(\"\(webviewId)\", \"onLoad\")")
    }
    
    func onShow() {
        jsContext.evaluateScript("$$private.callLifecycle(\"\(webviewId)\", \"onShow\")")
    }
    
    func onHide() {
        jsContext.evaluateScript("$$private.callLifecycle(\"\(webviewId)\", \"onHide\")")
    }
    
    func onUnload() {
        jsContext.evaluateScript("$$private.callLifecycle(\"\(webviewId)\", \"onUnload\")")
    }
    
    func callMethod(event: String) {
        jsContext.evaluateScript("$$private.callMethod(\"\(webviewId)\", \(event))")
    }

}
