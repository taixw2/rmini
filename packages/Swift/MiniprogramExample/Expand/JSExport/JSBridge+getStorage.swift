//
//  JSBridge+getStorage.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension JSBridge {
    // 只支持一种参数形式
    // setStorage("key", "value")
    static func getStorage(option: JSInvokeNativeOption, callback: @escaping (Any?) -> Void) {
        let storage = UserDefaults.standard.dictionary(forKey: option.appId!) ?? [:]
        
        guard let params = option.payload as? [String] else {
            callback(storage)
            return
        }
        
        guard let key: String = params.first else {
            callback(storage)
            return
        }
        
        callback(storage[key])
    }
}
