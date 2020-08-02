//
//  JSBridge+getStorage.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//

import Foundation

extension JSBridge {
    static func getStorage(option: JSInvokeNativeOption, callback: @escaping (Any?) -> Void) {
        logger.info(option.payload)
        callback([])
    }
}
