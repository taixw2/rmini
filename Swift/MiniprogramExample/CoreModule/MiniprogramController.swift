//
//  WebviewModal.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/4.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore
import UIKit


class MiniprogramController {
    let appId: String
    //
    let JSContext: JSContextModal
    var routeStack: [WebViewController] = []
    var rootViewController: UINavigationController?
    
    var uid = 0
    
    var launched = false
    
    // XXX: 记录：这里流程有一些瑕疵
    // 通知 JSC 的 init， 调用 onLaunch 钩子
    // 通知原生 launch 的页面
    // 通过 appId 获取 miniprogramController 加载对应的页面
    // 但是此时 miniprogramController 还没有实例化完成
    // 解决方法1： 异步通知 JSC
    // 解决方法2： 等待 miniprogramController 实例化完成
    init(appId: String) {
        self.appId = appId;
        //
        var error: Error? = nil
        let scriptContent = ReaderController.shared.readFilecontent(appId: appId, filename: "main.js", error: &error)
        if error != nil {
            logger.error(error)
        }
        JSContext = JSContextModal(javascriptContent: scriptContent)
        //        // 初始化 webview
        craeteWebview()
        //        // 把 webviewId 传给 init, init 再传回来?
        JSContext.invoke(payload: JSContextPayload(type: InvokeJSCoreType.callInitial, payload: ["webviewId":uid]))
    }
    
    private func craeteWebview() {
        routeStack.append(WebViewController.createWebview(appId: self.appId))
        uid += 1
    }
    
    public func ready(pagePath: String) {
        routeStack.first?.load(pagePath: pagePath)
    }
    
    public func push(pagePath: String) {
        craeteWebview()
        // TODO: 推入路由
        rootViewController?.pushViewController(routeStack.last!, animated: true)
    }
    
    public func pop(len: Int = 1) {
        let currentRouteIndex = routeStack.count - len
        if currentRouteIndex <= 1 {
            routeStack.removeSubrange(1...routeStack.count - 1)
        } else {
            routeStack.removeSubrange(currentRouteIndex...(currentRouteIndex + len))
        }
        
        logger.info(routeStack)
        rootViewController?.popToViewController(routeStack.last!, animated: true)
    }
    
    public func launch() {
        launched = true
        let navigationController = UINavigationController(rootViewController: routeStack.first!)
        navigationController.modalPresentationStyle = .fullScreen
        UIApplication.shared.windows.first!.rootViewController!.present(navigationController, animated: true, completion: nil)
        
        rootViewController = navigationController
    }
}
