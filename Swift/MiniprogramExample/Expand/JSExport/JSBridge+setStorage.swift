//
//  JSBridge+setStorage.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension JSBridge {
    // 只支持一种参数形式
    // setStorage("key", "value")
    static func setStorage(option: JSInvokeNativeOption, callback: @escaping (Any?) -> Void) {
        var storage = UserDefaults.standard.dictionary(forKey: option.appId!) ?? [:]
        guard let newItem = option.payload as? [Any] else {
            callback([:])
            return
        }
        guard let key = newItem.first as? String else {
            callback([:])
            return
        }
        storage[key] = newItem.last
        callback([key:newItem.last])
        UserDefaults.standard.setValue(storage, forKey: option.appId!)
    }
}
