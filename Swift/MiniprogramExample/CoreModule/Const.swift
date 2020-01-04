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


