//
//  JSBridge+navigatorTo.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension JSBridge {
    static func navigateTo(option: JSInvokeNativeOption, callback: @escaping (Any?) -> Void) {
        let prefix = "pages"
        guard let payload = option.payload as? [[String:Any]] else {
            logger.warn("参数错误")
            return
        }
        guard let url = payload.first?["url"] else {
            logger.warn("缺少 url 参数")
            return
        }
        
        let miniprogramController = MiniprogramShareController.shared.getMiniprogramController(appId: option.appId!)
        miniprogramController?.push(pagePath: "\(prefix)\(url)")
        callback("")
    }
}
