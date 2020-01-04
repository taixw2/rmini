//
//  JSConsole.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/26.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import JavaScriptCore

@objc protocol JSConsoleExports: JSExport {
    static func log(_ msg: String)
    
    static func info(_ msg: String)
}

class JSConsole: NSObject, JSConsoleExports {
    class func log(_ msg: String) {
        logger.info("js console-> \(msg)")
    }
    
    class func info(_ msg: String) {
        logger.info("js console-> \(msg)")
    }
}
