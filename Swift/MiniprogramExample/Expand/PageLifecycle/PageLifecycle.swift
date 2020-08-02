//
//  PageLifecycle.swift
//  MiniprogramExample
//
//  Created by mac on 2020/8/2.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension PageLifecycle {
    func load(appId: String, webviewController: WebViewController) {
        guard let miniprogramController = getMiniprogramController(appId: appId) else {
            logger.info("miniprogram controller 已销毁")
            return
        }
        switch self {
        case .onLoad:
            callOnLoad(miniprogramController: miniprogramController, webviewController: webviewController)
        case .onReady:
            callOnReady(miniprogramController: miniprogramController, webviewController: webviewController)
            break
        case .onHide:
            callOnHide(miniprogramController: miniprogramController, webviewController: webviewController)
            break
        case .onShow:
            callOnShow(miniprogramController: miniprogramController, webviewController: webviewController)
            break
        case .onUnload:
            callOnUnLoad(miniprogramController: miniprogramController, webviewController: webviewController)
            break
        }
    }
    
    private func getMiniprogramController(appId: String) -> MiniprogramController? {
        return MiniprogramShareController.shared.getMiniprogramController(appId: appId)
    }
    
    private func createPayload(_ webviewController: WebViewController, _ lifecycle: String, _ payload: Any? = nil) -> JSContextPayload {
        return .init(type: .callPageLifecycle, payload: ["lifecycle": lifecycle, "webviewId": webviewController.webviewId, "payload": payload ?? ""])
    }
    
    private func callOnLoad(miniprogramController: MiniprogramController, webviewController: WebViewController) {
        miniprogramController.JSContext.invoke(payload: createPayload(webviewController, "onLoad", webviewController.queryOption))
    }
    
    
    private func callOnUnLoad(miniprogramController: MiniprogramController, webviewController: WebViewController) {
        miniprogramController.JSContext.invoke(payload: createPayload(webviewController, "onUnload"))
    }
    
    
    private func callOnShow(miniprogramController: MiniprogramController, webviewController: WebViewController) {
        miniprogramController.JSContext.invoke(payload: createPayload(webviewController, "onShow"))
    }
    
    
    private func callOnReady(miniprogramController: MiniprogramController, webviewController: WebViewController) {
        miniprogramController.JSContext.invoke(payload: createPayload(webviewController, "onReady"))
    }
    
    private func callOnHide(miniprogramController: MiniprogramController, webviewController: WebViewController) {
        miniprogramController.JSContext.invoke(payload: createPayload(webviewController, "onHide"))
    }
    
}
