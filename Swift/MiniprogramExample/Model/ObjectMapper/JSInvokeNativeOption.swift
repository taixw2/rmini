//
//  JSInvokeNativeOption.swift
//  MiniprogramExample
//
//  Created by mac on 2020/7/31.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation
import ObjectMapper

class JSInvokeNativeOption: NSObject, ObjectMapper.Mappable {
    var sessionId: String?
    var appId: String?
    var isSync: Bool?
    var method: InvokeNativeMethod?
    var webviewId: Int?
    var payload: Any?
    
    required init?(map: Map) {
    }
    
    func mapping(map: Map) {
        sessionId <- map["sessionId"]
        isSync <- map["sync"]
        method <- map["method"]
        webviewId <- map["webviewId"]
        payload <- map["payload"]
        appId <- map["appId"]
    }
    
    func invoke() -> Any? {
        var res: Any? = nil
        var callbacked = false
        method?.load(options: self, { (response) in
            res = response
            callbacked = true
        })
        
        if !(isSync ?? false) {
            return nil
        }
        while !callbacked {
            // no get response
        }
        return res
    }
}
