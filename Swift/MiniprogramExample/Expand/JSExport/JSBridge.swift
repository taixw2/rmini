//
//  JSBridge.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/26.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore
import UIKit

@objc protocol JSBridgeExports: JSExport {
    static func log(_ msg: String)
    
    static func on(_ method: String, _ appId: String, _ option: JSValue)
    
    static func invoke(_ method: String, _ appId: String, _ option: JSValue)
    
    static func setData(_ path: String, _ appId: String, _ option: JSValue)
}


class JSBridge: NSObject, JSBridgeExports {
    class func on(_ method: String, _ appId: String, _ option: JSValue) {
        logger.info("\(method.lowercased().capitalized)")
        let WechatAPIClass = NSClassFromString("MiniprogramExample.\(method.lowercased().capitalized)") as! WechatAPI.Type;
        let instance = WechatAPIClass.init()
        instance.invoke(appId: appId, option: option)
    }
    
    class func invoke(_ method: String, _ appId: String, _ option: JSValue) {
        logger.info("\(method)")
        print(option)
    }
    
    class func setData(_ webviewId: String, _ appId: String, _ data: JSValue) {
        // todo 通过 appId 和 webviewId 一起找
        guard let webviewController = MiniprogramShareController.shared.miniprogram.find(webviewId: webviewId) else {
            return
        }
        let data = try! data.toDictionary()!.toJSON()
        webviewController.setData(data: data)
    }
    
    class func log(_ msg: String) {
        logger.info("js console-> \(msg)")
    }
    
    
}
