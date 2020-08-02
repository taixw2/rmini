//
//  JSInvokeNativeOption.swift
//  MiniprogramExample
//
//  Created by mac on 2020/7/31.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation
import ObjectMapper

class WebviewInvokeNativeOption: NSObject, ObjectMapper.Mappable {
    var type: WebviewInvokeNative?
    var payload: Any?
    
    required init?(map: Map) {
    }

    func mapping(map: Map) {
        type <- map["type"]
        payload <- map["payload"]
    }
    
    func invoke(target: WebViewController) {
        type?.load(target: target, options: self)
    }
}
