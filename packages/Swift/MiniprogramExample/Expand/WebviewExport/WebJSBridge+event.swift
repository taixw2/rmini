//
//  WebJSBridge+event.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation
import ObjectMapper

class EventPayload: NSObject, ObjectMapper.Mappable {
    var method: String?
    var payload: Any?
    
    required init?(map: Map) {
    }
    
    func mapping(map: Map) {
        method <- map["method"]
        payload <- map["payload"]
    }
}


extension WebviewInvokeNative {
    func event(target: WebViewController, option: WebviewInvokeNativeOption) {
        let eventPayload = EventPayload(JSON: option.payload as? [String: Any] ?? [:])
        
        let miniprogramController = MiniprogramShareController.shared.getMiniprogramController(appId: target.appId)
        let payload = ["lifecycle":eventPayload?.method, "payload": eventPayload?.payload, "webviewId": target.webviewId]
        let jscPayload = JSContextPayload.init(type: .callPageLifecycle, payload: payload as Dictionary<String, Any>)
        miniprogramController?.JSContext.invoke(payload: jscPayload)
    }
}
