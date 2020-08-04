//
//  Launch.swift
//  MiniprogramExample
//
//  Created by 欧阳鑫 on 2019/12/25.
//  Copyright © 2019 欧阳鑫. All rights reserved.
//

import Foundation
import SDDownloadManager

class Launch {
    static let shared: Launch = Launch()
    
    // 启动 初始化目录
    func launch() {
        logger.info("当前 home 目录: \(System.homeDirectory)")
        logger.info("当前 小程序 目录: \(AppConfig.miniprogramDir)")
        
        // TODO: 将运行时下载到本地
        logger.info("当前 小程序依赖 目录: \(AppConfig.libraryDir)")
        
        var error: Error? = nil
        fs.mkDir(path: AppConfig.miniprogramDir, error: &error);
        fs.mkDir(path: AppConfig.tempMiniprogramDir, error: &error);
        fs.mkDir(path: AppConfig.libraryDir, error: &error);
        
        print(error ?? "初始化正常")
    }
}
