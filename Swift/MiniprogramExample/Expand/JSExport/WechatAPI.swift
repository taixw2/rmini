//
//  WechatAPI.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/30.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore

class WechatAPI {
    required init() {}
    func invoke(appId: String, option: JSValue) {}
}

class Navigateto: WechatAPI {
    override func invoke(appId: String, option: JSValue) {
        let payload: [String: String] = option.toDictionary()?["payload"] as! [String : String];
        let url = payload["url"];
        MiniprogramShareController.shared.miniprogram.pushRoute(url)
    }
}

