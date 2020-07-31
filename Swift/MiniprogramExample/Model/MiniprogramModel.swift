//
//  WebviewModal.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/4.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore
import UIKit

class MiniprogramModal {
    var inited = false
    let appId: String
    
    var routeStacks: [WebViewController] = []
    var rootMiniprogramViewController: UINavigationController?
    
    let JSContext: JSContextModal
    
    // 一些 getter, 可能没用到，先定义
    // 当前路由栈的深度
    // 可以用于限制深度
    var length: Int {
        return routeStacks.count
    }
    
    var home: WebViewController {
        return routeStacks.first!
    }
    
    var currentPage: WebViewController {
        return routeStacks.last!
    }
    
    init(appId: String) {
        self.appId = appId;
        
        var error: Error? = nil
        let scriptContent = ReaderController.shared.readFilecontent(appId: appId, filename: "main.js", error: &error)
        if error == nil {
            logger.error(error)
        }
        JSContext = JSContextModal(javascriptContent: scriptContent)
        // 初始化 webview
        
        // 把 webviewId 传给 init, init 再传回来?
        JSContext.invoke(payload: JSContextPayload(type: InvokeJSCoreType.callInitial, payload: [:]))
    }
    
    func launchApp() {
        UIApplication.shared.windows.first!.rootViewController!.present(rootMiniprogramViewController!, animated: true, completion: nil)
    }
    
    @objc func closeApp() {
        rootMiniprogramViewController?.dismiss(animated: true, completion: nil)
    }
    
    func find(webviewId: String) -> WebViewController? {
        return routeStacks.first(where: { $0.webviewModel.webviewId == webviewId })
    }
}
