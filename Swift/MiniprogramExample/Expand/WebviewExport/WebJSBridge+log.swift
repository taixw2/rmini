//
//  WebJSBridge+log.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 8/1/20.
//  Copyright © 2020 欧阳鑫. All rights reserved.
//
import Foundation

extension WebviewInvokeNative {
    func log(payload: Any?) {
        logger.info(payload as? [String] ?? [])
    }
}
