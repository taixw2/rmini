//
//  JSContextController.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/26.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore
import UIKit


class MiniprogramShareController {
    
    static let shared = MiniprogramShareController()
    
    private var ref: [String: MiniprogramController] = [:]
    
    func getMiniprogramController(appId: String) -> MiniprogramController? {
        return ref[appId]
    }
    
    
    func launchApp(appId: String) {
        var miniprogram: MiniprogramController? = ref[appId]
        if miniprogram == nil  {
            miniprogram = MiniprogramController(appId: appId)
        }

        // TODO: 如果已经运行超过额定数量了，则清空一部分长期未运行的
        ref[appId] = miniprogram
        miniprogram?.launch()
    }
}
