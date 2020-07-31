//
//  Const.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/25.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import Foundation
import UIKit

enum System {
    static let homeDirectory = NSHomeDirectory()
    static let tempDirectory = NSTemporaryDirectory()
    static let screenBounds = UIScreen.main.bounds
    static let screenSize = UIScreen.main.bounds.size
    static let bundlePath = Bundle.main.bundlePath
    static let screenWidth = System.screenSize.width
    static let screenHeight = System.screenSize.height
}


enum AppConfig {
    static let miniprogramDir = System.homeDirectory.appending("/Documents/miniprogram/")
    static let libraryDir = System.homeDirectory.appending("/Documents/library/")
    static let tempMiniprogramDir = System.tempDirectory.appending("miniprogram/")
}

enum InvokeJSCoreType {
//    * 1. 调用 Page 的生命周期
    static let callPageLifecycle = 1
    // * 2. 调用 App 的生命周期
    static let callLifecycle = 2
    // * 3. 调用回调函数
    static let callCallback = 3
    // * 4. 进入路由
    static let callPushRouter = 4
    // * 5. 退出路由
    static let callPopRouter = 5
    // * 6. 初始化 Page
    static let callInitial = 6
    
}

