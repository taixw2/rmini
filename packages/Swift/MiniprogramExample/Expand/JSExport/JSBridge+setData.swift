//
//  JSBridge+setData.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 7/31/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension JSBridge {
    static func setData(option: JSInvokeNativeOption, callback: @escaping (Any?) -> Void) {
        // 把数据传递给 webviewController
        let miniprogramController = MiniprogramShareController.shared.getMiniprogramController(appId: option.appId!)
        let webviewController = miniprogramController?.getWebview(with: option.webviewId!)
        let payload = option.payload as? [String:Any] ?? [:]
        let data = try! payload.toJSON()
        
        logger.info(data)
        webviewController?.setData(data: data)
        callback("")
    }
}
