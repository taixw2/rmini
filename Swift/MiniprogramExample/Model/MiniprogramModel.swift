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
    
    var jsContext: JSContext!
    var routeStacks: [WebViewController] = []
    var rootViewController: UINavigationController?
    
    // 一些 getter, 可能没用到，先定义
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
        if inited { return }
        
        self.createJSContext()
        self.pushRoute(nil)
        inited = true
    }
    
    /// 创建 javascript 上下文
    func createJSContext() {
        let logicFilePath = AppConfig.miniprogramDir.appending(self.appId).appending("/main.js");
        let logicContent = try! String(contentsOfFile: logicFilePath)
        
        let context: JSContext = JSContext()
        context.exceptionHandler = { context, exception in
            logger.error("JS Error: \(self.appId) \(exception!.toString() ?? "没有错误")")
        }

        context.evaluateScript(logicContent)
        // 注入的对象
        context.setObject(JSConsole.self, forKeyedSubscript: "console" as NSCopying & NSObjectProtocol)
        context.setObject(JSBridge.self, forKeyedSubscript: "jsBridge" as NSCopying & NSObjectProtocol)
        
        self.jsContext = context
    }
    
    /// push 路由
    /// 由原生生成一个 webviewId, javascriptCore 通过 webviewId 找到对应的页面进行更新
    /// - Parameter path: 路径
    func pushRoute(_ path: String?) {
        let webviewId = UUID().uuidString
        let pathOrNil: String = path == nil ? "" : path!;
        
        // 更新一下 javascriptCore 记录的路由信息
        // Native 中不记录 pages 列表，传入空让 javascriptCore 去关联 webviewId 和 page
        jsContext.evaluateScript("$$private.pushRoute(\"\(webviewId)\", \"\(pathOrNil)\")")
        
        // 开始实例化 webview
        let webviewModel = WebViewModel(jsContext: jsContext, appId: appId, webviewId: webviewId)
        let webviewController = WebViewController(webviewModel: webviewModel)
        
        // 关闭按钮
        webviewController.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .close, target: self, action: #selector(closeApp))
        
        logger.info(path)

        if routeStacks.isEmpty {
            rootViewController = UINavigationController(rootViewController: webviewController)
            rootViewController?.modalPresentationStyle = .fullScreen
        } else {
            routeStacks.last?.navigationController?.pushViewController(webviewController, animated: true)
        }
        routeStacks.append(webviewController)
    }
    
    func popRoute() {
        _ = routeStacks.popLast()
        jsContext.evaluateScript("$$private.popRoute()")
    }
    
    func launchApp() {
        UIApplication.shared.windows.first!.rootViewController!.present(rootViewController!, animated: true, completion: nil)
    }
    
    @objc func closeApp() {
        rootViewController?.dismiss(animated: true, completion: nil)
    }
    
    func find(webviewId: String) -> WebViewController? {
        return routeStacks.first(where: { $0.webviewModel.webviewId == webviewId })
    }
}
