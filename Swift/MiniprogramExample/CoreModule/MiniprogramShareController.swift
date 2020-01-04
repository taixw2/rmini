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
    
    private var ref: [String: MiniprogramModal] = [:]
    
    private var currentAppId: String!
    
    var miniprogram: MiniprogramModal! {
        return ref[currentAppId]
    }
    
    func launchApp(appId: String) {
        currentAppId = appId
        guard let miniprogram = self.ref[appId] else {
            ref[appId] = MiniprogramModal(appId: appId)
            ref[appId]?.launchApp()
            return
        };
        miniprogram.launchApp()
    }
}
